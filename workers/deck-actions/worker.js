/* Command Deck actions worker — two-way write-back from Aaron's private
   dashboard (aaron-deck.pages.dev) to Notion.

   POST /action  { notion_page_id, action: "done" | "note", notes }
     - always appends a paragraph note to the page body (works on ANY page,
       regardless of that database's property schema)
     - for action "done", additionally best-effort sets a Status property
       (property name/value overridable via [vars]); failure is swallowed
       because the appended note is the durable record.

   NOTION_API_KEY is a SECRET read from env — never hardcoded here.
   Set it with:  npx wrangler secret put NOTION_API_KEY
*/

const ALLOWED_ORIGINS = [
  "https://aaron-deck.pages.dev",
  "http://localhost:8765",
  "http://localhost:9100",
];
const NOTION_VERSION = "2022-06-28";

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}
function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json" }, cors(origin)),
  });
}
function notion(path, method, body, key) {
  return fetch("https://api.notion.com/v1" + path, {
    method: method,
    headers: {
      "Authorization": "Bearer " + key,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(origin) });

    const url = new URL(request.url);
    if (url.pathname !== "/action" || request.method !== "POST")
      return json({ ok: false, error: "not found" }, 404, origin);
    if (!env.NOTION_API_KEY)
      return json({ ok: false, error: "worker not configured (NOTION_API_KEY missing)" }, 500, origin);

    let b;
    try { b = await request.json(); }
    catch (e) { return json({ ok: false, error: "bad json" }, 400, origin); }

    const pageId = String(b.notion_page_id || "").trim();
    const action = String(b.action || "").trim();
    if (!pageId) return json({ ok: false, error: "notion_page_id required" }, 400, origin);
    if (action !== "done" && action !== "note")
      return json({ ok: false, error: "action must be 'done' or 'note'" }, 400, origin);

    const stamp = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";
    const noteText = action === "done"
      ? "Marked done via Command Deck — " + stamp
      : "Command Deck note (" + stamp + "): " + String(b.notes || "").slice(0, 1800);

    try {
      // 1) Append a paragraph note to the page body — universally safe.
      const appendRes = await notion("/blocks/" + pageId + "/children", "PATCH", {
        children: [{
          object: "block",
          type: "paragraph",
          paragraph: { rich_text: [{ type: "text", text: { content: noteText } }] },
        }],
      }, env.NOTION_API_KEY);
      if (!appendRes.ok) {
        const t = await appendRes.text();
        return json({ ok: false, error: "notion append failed", status: appendRes.status, detail: t.slice(0, 300) }, 502, origin);
      }

      // 2) For "done", best-effort Status property write-back (swallow failure).
      let statusSet = false;
      if (action === "done") {
        const prop = env.STATUS_PROP || "Status";
        const doneVal = env.STATUS_DONE || "Done";
        const r = await notion("/pages/" + pageId, "PATCH", {
          properties: { [prop]: { status: { name: doneVal } } },
        }, env.NOTION_API_KEY);
        statusSet = r.ok;
      }
      return json({ ok: true, action: action, statusSet: statusSet }, 200, origin);
    } catch (e) {
      return json({ ok: false, error: String(e).slice(0, 200) }, 500, origin);
    }
  },
};
