/*
 * Field Feedback Worker -- sovereign backend for the in-flow feedback widget.
 *
 * Cross-product: this one Worker captures feedback from twobirds-kramerica.github.io
 * (Digital Confidence Centre), aaron-deck.pages.dev, kevscasa-preview.pages.dev, and
 * elite-karate-preview.pages.dev. It is NOT a DCC-only Worker -- do not narrow the
 * ALLOWED_ORIGINS list without checking the other products first.
 *
 * Endpoints:
 *   POST /submit        Accept a widget bundle {transcript, pins[], context, ...},
 *                       stamp authoritative server time, store in KV. Returns {ok:true, id}.
 *   GET  /list?since=&key=   Return recent feedback as JSON. Guarded by a shared
 *                            secret (?key= compared to env FEEDBACK_READ_KEY).
 *   GET  /health        Liveness probe. Returns {ok:true}.
 *
 * Storage: Cloudflare KV (binding FEEDBACK). Each bundle is stored under
 *   key  feedback:<serverTimestamp>:<random>  so a lexicographic list is time-ordered.
 *
 * No secrets are hardcoded. FEEDBACK_READ_KEY is a Worker secret.
 *
 * Vendored 2026-08-01 (S-DCC-FEEDBACK-WORKER-VENDOR-001) from the live deployed
 * source (pulled via the Cloudflare Developer Platform MCP, workers_get_worker_code)
 * and cross-checked byte-for-logic against the copy already committed at
 * C:\twobirds\two-birds-portfolio\tools\field-feedback\worker\worker.js (2026-07-03,
 * commit 26c11700) -- identical. This copy exists so digital-confidence, the repo
 * whose beta actually depends on this Worker, also has recoverable source instead
 * of relying on a sibling repo nobody would think to check if this one were lost.
 *
 * Canadian English. No em-dashes.
 */

// Origins allowed to POST from a browser. Reads (/list) are guarded by the
// shared secret instead, so they are callable from a script with no Origin.
var ALLOWED_ORIGINS = [
  "https://twobirds-kramerica.github.io",
  "https://aaron-deck.pages.dev",
  "https://kevscasa-preview.pages.dev",
  "https://elite-karate-preview.pages.dev"
];

var KEY_PREFIX = "feedback:";
var MAX_LIST = 200;
var FEEDBACK_TTL_SECONDS = 60 * 60 * 24 * 180; // 180 days

function pickOrigin(request) {
  var origin = request.headers.get("Origin") || "";
  if (ALLOWED_ORIGINS.indexOf(origin) !== -1) { return origin; }
  return "";
}

function corsHeaders(request) {
  var origin = pickOrigin(request);
  var h = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
  if (origin) { h["Access-Control-Allow-Origin"] = origin; }
  return h;
}

function json(body, status, request, extraHeaders) {
  var headers = { "Content-Type": "application/json; charset=utf-8" };
  var cors = corsHeaders(request);
  for (var k in cors) { headers[k] = cors[k]; }
  if (extraHeaders) { for (var j in extraHeaders) { headers[j] = extraHeaders[j]; } }
  return new Response(JSON.stringify(body), { status: status || 200, headers: headers });
}

// Constant-time-ish string compare so the read key is not trivially timed.
function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") { return false; }
  if (a.length !== b.length) { return false; }
  var out = 0;
  for (var i = 0; i < a.length; i++) { out |= (a.charCodeAt(i) ^ b.charCodeAt(i)); }
  return out === 0;
}

// Fixed-window rate limit: N writes per IP per hour, tracked in the same
// FEEDBACK KV under an "rl:" prefix (same pattern as clarity-proxy /
// email-gate / dcc-data). The Origin check alone is spoofable by any
// non-browser client, so without this a script could flood KV unboundedly.
var RL_LIMIT = 20; // submissions per IP per hour
async function rateLimited(request, env) {
  var ip = request.headers.get("CF-Connecting-IP") || "unknown";
  var bucket = Math.floor(Date.now() / 3600000);
  var key = "rl:" + ip + ":" + bucket;
  var count = parseInt((await env.FEEDBACK.get(key)) || "0", 10);
  if (count >= RL_LIMIT) { return true; }
  await env.FEEDBACK.put(key, String(count + 1), { expirationTtl: 3700 });
  return false;
}

async function handleSubmit(request, env) {
  // Only allow real browser origins to write.
  if (!pickOrigin(request)) {
    return json({ ok: false, error: "origin_not_allowed" }, 403, request);
  }
  if (await rateLimited(request, env)) {
    return json({ ok: false, error: "rate_limited" }, 429, request);
  }
  var bundle;
  try {
    bundle = await request.json();
  } catch (e) {
    return json({ ok: false, error: "invalid_json" }, 400, request);
  }
  if (!bundle || typeof bundle !== "object") {
    return json({ ok: false, error: "empty_bundle" }, 400, request);
  }

  var now = new Date();
  var serverTimestamp = now.toISOString();
  // Authoritative server time wins over the client hint.
  bundle.timestamp = serverTimestamp;
  bundle.serverTimestamp = serverTimestamp;
  // NOTE (S-SECURITY-WORKER-URL-PII-HARDENING-001, 2026-08-15): no longer
  // storing the submitter's IP (bundle.receivedFrom) -- the rate-limit key
  // above already carries the abuse signal and self-expires; retaining it on
  // the durable feedback record served no purpose but identifiability.
  bundle.cfCountry = (request.cf && request.cf.country) || "";

  var rand = Math.random().toString(36).slice(2, 10);
  var id = serverTimestamp + ":" + rand;
  var key = KEY_PREFIX + id;

  // FEEDBACK_TTL_SECONDS: bounded retention -- privacy.html promises optional
  // feedback is "retained only until ... no longer needed for the purpose
  // given", not forever. 180 days (~6 months) covers an active
  // development/beta review window without indefinite retention.
  await env.FEEDBACK.put(key, JSON.stringify(bundle), { expirationTtl: FEEDBACK_TTL_SECONDS });

  return json({ ok: true, id: id }, 200, request);
}

async function handleList(request, env) {
  var url = new URL(request.url);
  // Prefer the X-Feedback-Key header (S-SECURITY-WORKER-URL-PII-HARDENING-001,
  // 2026-08-15) -- a query-string key lands in Cloudflare request logs; a
  // header does not. ?key= kept working during the transition.
  var providedKey = request.headers.get("X-Feedback-Key") || url.searchParams.get("key") || "";
  var expected = env.FEEDBACK_READ_KEY || "";

  if (!expected) {
    return json({ ok: false, error: "read_key_not_configured" }, 500, request);
  }
  if (!safeEqual(providedKey, expected)) {
    return json({ ok: false, error: "unauthorized" }, 401, request);
  }

  // since= is an ISO timestamp (or the id form ISO:rand). Only keys strictly
  // greater than the marker are returned, so it doubles as a cursor.
  var since = url.searchParams.get("since") || "";
  var limit = parseInt(url.searchParams.get("limit") || "", 10);
  if (isNaN(limit) || limit < 1 || limit > MAX_LIST) { limit = MAX_LIST; }

  var startAfter = since ? (KEY_PREFIX + since) : undefined;

  var items = [];
  var listed = await env.FEEDBACK.list({
    prefix: KEY_PREFIX,
    limit: limit,
    startAfter: startAfter
  });

  for (var i = 0; i < listed.keys.length; i++) {
    var k = listed.keys[i];
    var raw = await env.FEEDBACK.get(k.name);
    var parsed = null;
    try { parsed = raw ? JSON.parse(raw) : null; } catch (e) { parsed = { corrupt: true, raw: raw }; }
    items.push({ id: k.name.slice(KEY_PREFIX.length), bundle: parsed });
  }

  return json({
    ok: true,
    count: items.length,
    complete: listed.list_complete === true,
    cursor: items.length ? items[items.length - 1].id : since,
    items: items
  }, 200, request);
}

export default {
  async fetch(request, env) {
    var url = new URL(request.url);
    var path = url.pathname;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (path === "/health") {
      return json({ ok: true }, 200, request);
    }

    if (path === "/submit") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "method_not_allowed" }, 405, request);
      }
      return handleSubmit(request, env);
    }

    if (path === "/list") {
      if (request.method !== "GET") {
        return json({ ok: false, error: "method_not_allowed" }, 405, request);
      }
      return handleList(request, env);
    }

    return json({ ok: false, error: "not_found" }, 404, request);
  }
};
