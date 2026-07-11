/* DCC data worker (ADR-0027) — sovereign Cloudflare Worker + D1.
   Aggregate (no-PII) analytics, low-friction email-KEY progress (email stored
   HASHED only), and one-way feedback. No name, no raw email, no IP stored. */

const ALLOWED_ORIGIN = "https://twobirds-kramerica.github.io";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json" }, corsHeaders()),
  });
}
async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(str).trim().toLowerCase()));
  return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}

/* Rate limiting (S-WORKER-HARDENING-001, 2026-07-11): reuses the fixed-window
   KV counter pattern shipped in clarity/workers/clarity-proxy (ad13056) --
   self-expiring keys via KV expirationTtl, no cleanup job needed. Shares the
   account's RATELIMIT KV namespace with a "dcc:" key prefix. */
const IP_LIMIT_PER_HOUR = 30;
const IP_LIMIT_WINDOW_SECONDS = 3600;

function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") || "unknown";
}
async function checkAndIncrement(env, key, limit, windowSeconds) {
  const current = parseInt((await env.RATELIMIT.get(key)) || "0", 10);
  if (current >= limit) return { blocked: true };
  await env.RATELIMIT.put(key, String(current + 1), { expirationTtl: windowSeconds });
  return { blocked: false };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders() });
    const url = new URL(request.url);
    try {
      if (env.RATELIMIT && ["/event", "/progress", "/feedback"].includes(url.pathname)) {
        const ip = clientIp(request);
        const limit = await checkAndIncrement(env, `dcc:${url.pathname}:${ip}`, IP_LIMIT_PER_HOUR, IP_LIMIT_WINDOW_SECONDS);
        if (limit.blocked) return json({ ok: false, error: "rate limited" }, 429);
      }
      // Aggregate event (no PII). body: { cid, type, lesson, value }
      if (url.pathname === "/event" && request.method === "POST") {
        const b = await request.json();
        await env.DB.prepare("INSERT INTO events (client_id, event_type, lesson, value, ts) VALUES (?,?,?,?,?)")
          .bind(String(b.cid || "").slice(0, 64), String(b.type || "").slice(0, 40),
                String(b.lesson || "").slice(0, 60), String(b.value || "").slice(0, 40), Date.now())
          .run();
        return json({ ok: true });
      }
      // Save progress by email HASH. body: { email, data }
      if (url.pathname === "/progress" && request.method === "POST") {
        const b = await request.json();
        if (!b.email) return json({ ok: false, error: "email required" }, 400);
        const h = await sha256(b.email);
        await env.DB.prepare(
          "INSERT INTO progress (email_hash, data, updated_ts) VALUES (?,?,?) " +
          "ON CONFLICT(email_hash) DO UPDATE SET data=excluded.data, updated_ts=excluded.updated_ts")
          .bind(h, JSON.stringify(b.data || {}).slice(0, 4000), Date.now()).run();
        return json({ ok: true });
      }
      // Load progress. GET /progress?e=<email>
      if (url.pathname === "/progress" && request.method === "GET") {
        const email = url.searchParams.get("e");
        if (!email) return json({ ok: false }, 400);
        const h = await sha256(email);
        const row = await env.DB.prepare("SELECT data FROM progress WHERE email_hash=?").bind(h).first();
        return json({ ok: true, data: row ? JSON.parse(row.data) : null });
      }
      // One-way feedback. body: { text }
      if (url.pathname === "/feedback" && request.method === "POST") {
        const b = await request.json();
        const text = String(b.text || "").slice(0, 2000);
        if (text.trim()) await env.DB.prepare("INSERT INTO feedback (text, ts) VALUES (?,?)").bind(text, Date.now()).run();
        return json({ ok: true });
      }
      return json({ ok: false, error: "not found" }, 404);
    } catch (e) {
      return json({ ok: false, error: String(e).slice(0, 200) }, 500);
    }
  },
};
