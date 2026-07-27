/* DCC beta measurement worker (S-DCC-BETA-CONFIDENCE-001, 2026-07-27).
 *
 * Single purpose: capture the beta cohort's before/after 5-point confidence
 * readings, and keep them structurally unmixable with production data.
 *
 * It is bound to the dcc-beta-measurement D1 database and nothing else. It has
 * no binding to dcc-data, and dcc-data has no binding to it. When the product
 * flips to general availability, the production baseline query runs against
 * dcc-data and cannot see a single row written here, with no filter to forget.
 *
 * PII discipline (ADR-0027): no raw email, no name, no IP. Only the SHA-256
 * hash the tester's own browser computed, and only if they chose to give an
 * email at all.
 *
 * Canadian English. No em-dashes.
 */

const ALLOWED_ORIGIN = "https://twobirds-kramerica.github.io";

const IP_LIMIT_PER_HOUR = 60;
const IP_LIMIT_WINDOW_SECONDS = 3600;

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

function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") || "unknown";
}

async function rateLimited(env, key) {
  if (!env.RATELIMIT) return false;
  const current = parseInt((await env.RATELIMIT.get(key)) || "0", 10);
  if (current >= IP_LIMIT_PER_HOUR) return true;
  await env.RATELIMIT.put(key, String(current + 1), { expirationTtl: IP_LIMIT_WINDOW_SECONDS });
  return false;
}

/* A hex SHA-256 or nothing. Anything else is discarded rather than stored, so a
   raw email accidentally posted here can never land in the database. */
function safeHash(v) {
  const s = String(v || "").trim().toLowerCase();
  return /^[0-9a-f]{64}$/.test(s) ? s : null;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders() });

    const url = new URL(request.url);

    if (url.pathname === "/health") return json({ ok: true, cohort: "beta" });

    if (url.pathname === "/confidence" && request.method === "POST") {
      try {
        if (await rateLimited(env, `dccbeta:confidence:${clientIp(request)}`)) {
          return json({ ok: false, error: "rate limited" }, 429);
        }

        const b = await request.json();

        /* The cohort is asserted here, server-side, not trusted from the client.
           There is deliberately no code path that writes any other value: the
           column's CHECK constraint would reject it anyway. */
        const cohort = "beta";

        const phase = String(b.phase || "");
        if (phase !== "before" && phase !== "after") {
          return json({ ok: false, error: "phase must be before or after" }, 400);
        }

        const confidence = parseInt(b.confidence, 10);
        if (!(confidence >= 1 && confidence <= 5)) {
          return json({ ok: false, error: "confidence must be 1 to 5" }, 400);
        }

        const module = String(b.module || "").slice(0, 60);
        if (!module) return json({ ok: false, error: "module required" }, 400);

        const now = new Date();

        await env.BETA_DB.prepare(
          "INSERT INTO confidence_beta (cohort, module, phase, confidence, lang, email_hash, client_id, recorded_at, ts) " +
          "VALUES (?,?,?,?,?,?,?,?,?)")
          .bind(
            cohort,
            module,
            phase,
            confidence,
            String(b.lang || "").slice(0, 8),
            safeHash(b.emailHash),
            String(b.cid || "").slice(0, 64),
            now.toISOString(),
            now.getTime())
          .run();

        return json({ ok: true, cohort: cohort, recordedAt: now.toISOString() });
      } catch (e) {
        return json({ ok: false, error: String(e).slice(0, 200) }, 500);
      }
    }

    return json({ ok: false, error: "not found" }, 404);
  },
};
