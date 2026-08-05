/* DCC AI HELP-CHAT WORKER --- PROTOTYPE, NOT DEPLOYED (S-DCC-AI-CHAT-PROTO-001)
 * ============================================================================
 * Built for Notion Product Backlog 3b3a09cf-876a-815a-9682-c57bd53431ed per
 * the recommendation in hal-stack/research/dcc-voice-support-shared-vps-
 * feasibility-2026-08-04.md (text-first Cloudflare Worker, not voice/VPS).
 *
 * THIS IS A PROTOTYPE FOR AARON'S REVIEW. It has never been deployed to
 * Cloudflare and is not linked from any live DCC page. This is DCC's first
 * backend/AI-API call and first PII-in-transit-to-a-third-party surface for
 * a product that has otherwise been fully static -- do not deploy this
 * Worker (`wrangler deploy`) or wire the widget into a live page without
 * Aaron's explicit sign-off.
 *
 * WHAT IT DOES
 * POST /chat  { message: string, history?: [{role, content}] }
 * -> By default, answers using Cloudflare Workers AI (env.AI binding), which
 *    needs no API key and costs $0 within the free daily Neuron allowance
 *    (research: Path A). If env.ANTHROPIC_API_KEY is set as a Worker secret,
 *    the Worker instead calls Claude Haiku 4.5 directly for higher answer
 *    quality (research: Path B, ~US$0.01-0.02/conversation with caching).
 *    Aaron decides which path to run by whether he sets that secret -- this
 *    prototype does not create, request, or assume any such credential.
 *
 * PRIVACY / PIPEDA
 * The widget UI (v2-lab/ai-chat-widget.js) shows a plain-language notice
 * before/at first use that messages are sent to an AI service and sensitive
 * info should not be shared. This Worker itself stores nothing server-side --
 * no D1, no KV logging of message content. Only a per-IP rate-limit COUNTER
 * (not the message text) is written to KV, self-expiring via TTL.
 *
 * RATE LIMITING
 * Reuses the existing shared RATELIMIT KV namespace (same account resource
 * already used by dcc-data and dcc-beta-measurement per the CLOUDFLARE
 * WORKERS KV DEPLOY SEQUENCE rule -- no new KV namespace created), with a
 * "dccchat:" key prefix. Two independent caps:
 *   - per-IP: 8 messages / rolling hour (a real conversation fits; a bot
 *     spamming the endpoint does not)
 *   - global daily: 250 messages / UTC day, so a runaway cost scenario is
 *     capped even before Aaron notices (Workers AI free tier is ~1,300
 *     responses/day; Haiku 4.5 at 250 msgs/day is worst-case a few dollars).
 * Both caps are conservative starting points -- tune via IP_LIMIT_PER_HOUR /
 * DAILY_GLOBAL_LIMIT below once real usage data exists.
 */

const ALLOWED_ORIGIN = "https://twobirds-kramerica.github.io";
const LOCALHOST_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function corsHeadersFor(origin) {
  const allow =
    origin && LOCALHOST_RE.test(origin) ? origin : ALLOWED_ORIGIN;
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
    headers: Object.assign(
      { "Content-Type": "application/json" },
      corsHeadersFor(origin)
    ),
  });
}

// --- Rate limiting (fixed-window KV counter -- same pattern as dcc-data /
// dcc-beta-measurement, itself reused from clarity/workers/clarity-proxy) ---
const IP_LIMIT_PER_HOUR = 8;
const IP_WINDOW_SECONDS = 3600;
const DAILY_GLOBAL_LIMIT = 250;
const DAILY_WINDOW_SECONDS = 90000; // slightly over 24h so the window always
// outlives a day's traffic before self-expiring; not a precision UTC-midnight
// reset, just a safety valve.

function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") || "unknown";
}
async function checkAndIncrement(env, key, limit, windowSeconds) {
  const current = parseInt((await env.RATELIMIT.get(key)) || "0", 10);
  if (current >= limit) return { blocked: true };
  await env.RATELIMIT.put(key, String(current + 1), {
    expirationTtl: windowSeconds,
  });
  return { blocked: false };
}

// --- DCC tone + safety system prompt ---------------------------------------
// Canadian English, plain language, patient/anxiety-first (PRODUCT.md brand
// personality), with explicit PIPEDA-adjacent guardrails against collecting
// sensitive info and explicit escalation to real institutions for anything
// involving money, fraud, or legal/financial decisions.
const SYSTEM_PROMPT =
  "You are the Digital Confidence Centre's help assistant. Digital " +
  "Confidence Centre (DCC) is a free Canadian digital literacy programme " +
  "for adults, especially seniors, learning how to use their devices, " +
  "spot online scams, and stay safe online.\n\n" +
  "Speak like a patient, knowledgeable neighbour, not a textbook. Use " +
  "plain language, short sentences, and Canadian English (colour, " +
  "favourite, cheque). Never sound condescending. Reassure before you " +
  "instruct -- the person you are talking to may be a little afraid of " +
  "getting something wrong.\n\n" +
  "Rules you must always follow:\n" +
  "- Never ask the person for passwords, PINs, account numbers, Social " +
  "Insurance Numbers, credit card numbers, or other sensitive personal or " +
  "financial details. If they start to share this kind of information, " +
  "gently tell them not to share it here and explain why.\n" +
  "- You cannot see or store anything beyond this conversation, and this " +
  "chat sends messages to an AI service to write a reply -- if it is ever " +
  "relevant, remind the person not to share anything here they would not " +
  "want a computer program to read.\n" +
  "- You are not a substitute for a bank, the police, a lawyer, or a " +
  "financial advisor. For anything involving money already lost, a " +
  "suspected scam in progress, or a legal or financial decision, tell them " +
  "to contact their bank directly using the number on the back of their " +
  "card (never a number from an email or text message), and, for scams, " +
  "the Canadian Anti-Fraud Centre at 1-888-495-8501.\n" +
  "- Keep answers short: a few sentences, not a lecture. Offer to explain " +
  "more if they would like.\n" +
  "- If a DCC learning module likely covers their question well (for " +
  "example, modules on phishing, passwords, or video calling), mention it " +
  "by name so they can read more there.\n" +
  "- If you are not sure of an answer, say so plainly rather than " +
  "guessing.";

const MAX_MESSAGE_CHARS = 600;
const MAX_HISTORY_TURNS = 6; // matches the research's "~6 exchanges/conversation" costing assumption

function sanitizeHistory(rawHistory) {
  if (!Array.isArray(rawHistory)) return [];
  return rawHistory
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-MAX_HISTORY_TURNS * 2)
    .map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, MAX_MESSAGE_CHARS),
    }));
}

// --- Path A: Cloudflare Workers AI (default, no API key, $0 at this volume) -
async function answerWithWorkersAI(env, history, message) {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: message },
  ];
  const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    messages,
    max_tokens: 400,
  });
  return (result && (result.response || result.result)) || "";
}

// --- Path B: Claude Haiku 4.5, only if Aaron has set the secret himself ----
async function answerWithHaiku(env, history, message) {
  const anthropicMessages = [...history, { role: "user", content: message }];
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: anthropicMessages,
    }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(
      "Anthropic API error " + resp.status + ": " + JSON.stringify(data).slice(0, 200)
    );
  }
  if (data.stop_reason === "refusal") {
    return "I'm not able to help with that one. Could you rephrase, or ask something else about staying safe online?";
  }
  return (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeadersFor(origin) });
    }
    const url = new URL(request.url);
    if (url.pathname !== "/chat" || request.method !== "POST") {
      return json({ ok: false, error: "not found" }, 404, origin);
    }

    try {
      if (env.RATELIMIT) {
        const ip = clientIp(request);
        const ipLimit = await checkAndIncrement(
          env,
          "dccchat:ip:" + ip,
          IP_LIMIT_PER_HOUR,
          IP_WINDOW_SECONDS
        );
        if (ipLimit.blocked) {
          return json(
            {
              ok: false,
              error:
                "You've sent quite a few messages recently. Please wait a bit before sending more.",
            },
            429,
            origin
          );
        }
        const today = new Date().toISOString().slice(0, 10);
        const dailyLimit = await checkAndIncrement(
          env,
          "dccchat:daily:" + today,
          DAILY_GLOBAL_LIMIT,
          DAILY_WINDOW_SECONDS
        );
        if (dailyLimit.blocked) {
          return json(
            {
              ok: false,
              error:
                "This chat has reached its limit for today. Please try again tomorrow, or explore the learning modules in the meantime.",
            },
            429,
            origin
          );
        }
      }

      const body = await request.json();
      const message = String(body.message || "").trim().slice(0, MAX_MESSAGE_CHARS);
      if (!message) {
        return json({ ok: false, error: "message required" }, 400, origin);
      }
      const history = sanitizeHistory(body.history);

      const reply = env.ANTHROPIC_API_KEY
        ? await answerWithHaiku(env, history, message)
        : await answerWithWorkersAI(env, history, message);

      return json(
        { ok: true, reply: reply || "Sorry, I couldn't come up with an answer just now. Please try again." },
        200,
        origin
      );
    } catch (e) {
      return json({ ok: false, error: String(e).slice(0, 200) }, 500, origin);
    }
  },
};
