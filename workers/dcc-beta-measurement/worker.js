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
 * ---------------------------------------------------------------------------
 * INTEGRITY LAYER (S-DCC-CONFIDENCE-AUDIT-001, 2026-08-02)
 *
 * v1 proved beta rows cannot contaminate production data (ADR-0043). It did not
 * establish that the rows themselves are trustworthy, which is a different
 * question and the one a funder actually asks. Two gaps were closed here:
 *
 *   1. SERVER-SIDE DE-DUP. v1's only defence against one person answering the
 *      same question twice was a localStorage flag in confidence-quiz.js, which
 *      any browser cleanup erases. Now every write is checked against the last
 *      DEDUP_WINDOW_DAYS of readings for the same module and phase, matched on
 *      the email hash first (it survives a storage clear and spans devices) and
 *      the device id second.
 *
 *      The suspected duplicate is FLAGGED AND KEPT, not rejected. This is the
 *      important design choice. An auditor's question is never "is your data
 *      perfect," it is "what did you exclude, on what rule, and how many" -- and
 *      that is only answerable if the excluded rows still exist to be counted.
 *      Dropping them would make the pipeline look tidier and be less defensible.
 *
 *   2. DAILY VOLUME ANOMALY RECORD. v1 counted nothing per day, so an
 *      implausible spike would have flowed into an aggregate unnoticed. A cron
 *      now writes one row per day into daily_volume with the count, the trailing
 *      baseline, the threshold, and a pass/fail verdict.
 *
 *      The threshold is a Poisson bound, not mean plus k standard deviations.
 *      For low daily counts the Gaussian rule is documented as unreliable: both
 *      the mean and the standard deviation are themselves distorted by the
 *      outlier being hunted (NISTIR 8526). Counts per day are Poisson-shaped, so
 *      a Poisson tail bound is the fitted test. Standard c-chart limits are also
 *      invalid when the average count is below about 2, which is exactly where a
 *      small beta cohort sits, so an absolute floor (ANOMALY_ABSOLUTE_FLOOR)
 *      keeps the rule quiet until volumes are large enough for it to mean
 *      anything.
 *
 * WHAT IS DELIBERATELY NOT HERE
 *   No CAPTCHA / Turnstile. Turnstile's own risk signals correlate with screen
 *   readers, hardened browsers and non-standard browser APIs, so the visitors it
 *   most often challenges are disproportionately the ones DCC exists to serve.
 *   Trading a real accessibility failure for a marginal integrity gain is the
 *   wrong trade for this audience. No IP storage either: it stays out of the
 *   database per ADR-0027, and it is a weak identity signal regardless, since
 *   households, carrier NAT and public library terminals all share one.
 *
 * Canadian English. No em-dashes.
 */

const ALLOWED_ORIGIN = "https://twobirds-kramerica.github.io";

const IP_LIMIT_PER_HOUR = 60;
const IP_LIMIT_WINDOW_SECONDS = 3600;

/* De-dup lookback. 7 days matches the attempt-series window already established
   for this instrument in hal-stack/research/dcc-quiz-baseline-research-2026-07-29.md:
   a learner returning after a week or more is plausibly re-learning, and is
   treated as a fresh series rather than a duplicate. */
const DEDUP_WINDOW_DAYS = 7;

/* Anomaly rule constants. Both are recorded into daily_volume.method on every
   run, so a later reader can see which rule produced a verdict rather than
   having to trust that it never changed. */
const ANOMALY_BASELINE_DAYS = 14;
const ANOMALY_P_VALUE = 0.001;
const ANOMALY_ABSOLUTE_FLOOR = 20;

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

/* Has this person already answered this exact question recently?
 *
 * Two identities, checked in order of strength:
 *   email hash  strongest available without an account. It is derived from
 *               something the tester knows rather than something their browser
 *               stores, so it survives clearing localStorage and follows them
 *               to a second device. Only present if they gave an email at beta
 *               sign-up, so it covers some testers, not all.
 *   client id   an opaque random per-device value. Catches the ordinary repeat
 *               submission. Does NOT survive a storage clear, because the next
 *               visit mints a brand new id. That residual gap is real, is not
 *               closable without an account, and is disclosed rather than
 *               papered over.
 *
 * Returns a flag tag, or null when the reading looks clean.
 */
async function duplicateFlag(env, emailHash, clientId, module, phase, nowMs) {
  const since = nowMs - DEDUP_WINDOW_DAYS * 86400000;

  if (emailHash) {
    const hit = await env.BETA_DB.prepare(
      "SELECT 1 FROM confidence_beta WHERE email_hash = ? AND module = ? AND phase = ? AND ts > ? LIMIT 1")
      .bind(emailHash, module, phase, since).first();
    if (hit) return "dup:email";
  }

  if (clientId) {
    const hit = await env.BETA_DB.prepare(
      "SELECT 1 FROM confidence_beta WHERE client_id = ? AND module = ? AND phase = ? AND ts > ? LIMIT 1")
      .bind(clientId, module, phase, since).first();
    if (hit) return "dup:cid";
  }

  return null;
}

/* Smallest count k for which P(X >= k) < ANOMALY_P_VALUE under Poisson(lambda).
   Summed directly from the PMF, which is exact and cheap at these magnitudes.
   The 400 cap is a safety stop, not a statistical choice. */
function poissonUpperBound(lambda) {
  let term = Math.exp(-lambda);
  let cumulative = term;
  for (let k = 1; k <= 400; k++) {
    if (1 - cumulative < ANOMALY_P_VALUE) return k;
    term = term * lambda / k;
    cumulative += term;
  }
  return 400;
}

function median(values) {
  if (!values.length) return 0;
  const s = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function utcDay(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

/* Writes one daily_volume row for the given UTC day. Idempotent: re-running for
   the same day overwrites that day's verdict rather than appending a second one,
   so a manual re-run cannot silently create two disagreeing records. */
async function recordDailyVolume(env, dayMs) {
  const day = utcDay(dayMs);
  const dayStart = Date.parse(day + "T00:00:00Z");
  const dayEnd = dayStart + 86400000;

  const todayRow = await env.BETA_DB.prepare(
    "SELECT COUNT(*) AS n, COUNT(DISTINCT client_id) AS clients, " +
    "SUM(CASE WHEN flags IS NOT NULL THEN 1 ELSE 0 END) AS flagged " +
    "FROM confidence_beta WHERE ts >= ? AND ts < ?")
    .bind(dayStart, dayEnd).first();

  const submissions = (todayRow && todayRow.n) || 0;
  const flagged = (todayRow && todayRow.flagged) || 0;
  const clients = (todayRow && todayRow.clients) || 0;

  /* Trailing baseline: the ANOMALY_BASELINE_DAYS days immediately before this
     one. Days with zero submissions count as zeros rather than being skipped,
     because a quiet product is the honest baseline for a spike. */
  const baselineStart = dayStart - ANOMALY_BASELINE_DAYS * 86400000;
  const priorRows = await env.BETA_DB.prepare(
    "SELECT CAST((ts - ?) / 86400000 AS INTEGER) AS bucket, COUNT(*) AS n " +
    "FROM confidence_beta WHERE ts >= ? AND ts < ? GROUP BY bucket")
    .bind(baselineStart, baselineStart, dayStart).all();

  const buckets = new Array(ANOMALY_BASELINE_DAYS).fill(0);
  for (const r of (priorRows.results || [])) {
    if (r.bucket >= 0 && r.bucket < ANOMALY_BASELINE_DAYS) buckets[r.bucket] = r.n;
  }

  /* Median is the robust estimate of the Poisson rate: unlike the mean it is not
     dragged upward by a spike already sitting inside the baseline window. */
  const baselineMedian = median(buckets);
  const lambda = Math.max(baselineMedian, 0.5);
  const poissonThreshold = poissonUpperBound(lambda);
  const threshold = Math.max(poissonThreshold, ANOMALY_ABSOLUTE_FLOOR);
  const anomaly = submissions >= threshold ? 1 : 0;

  const method = "poisson p<" + ANOMALY_P_VALUE +
    " lambda=" + lambda +
    " floor=" + ANOMALY_ABSOLUTE_FLOOR +
    " baseline=" + ANOMALY_BASELINE_DAYS + "d";

  await env.BETA_DB.prepare(
    "INSERT INTO daily_volume (day, submissions, flagged_dup, distinct_clients, " +
    "baseline_median, baseline_days, threshold, anomaly, method, computed_at) " +
    "VALUES (?,?,?,?,?,?,?,?,?,?) " +
    "ON CONFLICT(day) DO UPDATE SET submissions=excluded.submissions, " +
    "flagged_dup=excluded.flagged_dup, distinct_clients=excluded.distinct_clients, " +
    "baseline_median=excluded.baseline_median, baseline_days=excluded.baseline_days, " +
    "threshold=excluded.threshold, anomaly=excluded.anomaly, method=excluded.method, " +
    "computed_at=excluded.computed_at")
    .bind(day, submissions, flagged, clients, baselineMedian, ANOMALY_BASELINE_DAYS,
      threshold, anomaly, method, new Date().toISOString())
    .run();

  return { day, submissions, flagged, threshold, anomaly };
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
        const emailHash = safeHash(b.emailHash);
        const clientId = String(b.cid || "").slice(0, 64);

        const flags = await duplicateFlag(
          env, emailHash, clientId, module, phase, now.getTime());

        await env.BETA_DB.prepare(
          "INSERT INTO confidence_beta (cohort, module, phase, confidence, lang, email_hash, client_id, recorded_at, ts, flags) " +
          "VALUES (?,?,?,?,?,?,?,?,?,?)")
          .bind(
            cohort,
            module,
            phase,
            confidence,
            String(b.lang || "").slice(0, 8),
            emailHash,
            clientId,
            now.toISOString(),
            now.getTime(),
            flags)
          .run();

        /* The reader is never told they were flagged, and their on-page result
           is unaffected. Flagging is an analysis concern, not a scolding: a
           senior who cleared their browser and answered again has done nothing
           wrong, and telling them so would be both confusing and unkind. */
        return json({ ok: true, cohort: cohort, recordedAt: now.toISOString() });
      } catch (e) {
        return json({ ok: false, error: String(e).slice(0, 200) }, 500);
      }
    }

    /* The audit surface. Aggregate counts only, no row-level data, no
       identifiers of any kind. It exists so the integrity of the dataset can be
       checked by someone who is not Aaron and does not have wrangler installed,
       which is the whole point of the word "auditable". Every headline number
       is published next to the count that was excluded to produce it. */
    if (url.pathname === "/stats" && request.method === "GET") {
      try {
        const totals = await env.BETA_DB.prepare(
          "SELECT COUNT(*) AS received, " +
          "SUM(CASE WHEN flags IS NULL THEN 1 ELSE 0 END) AS clean, " +
          "SUM(CASE WHEN flags IS NOT NULL THEN 1 ELSE 0 END) AS flagged, " +
          "COUNT(DISTINCT client_id) AS distinct_devices, " +
          "COUNT(DISTINCT email_hash) AS distinct_emails " +
          "FROM confidence_beta").first();

        /* A paired reading is the only unit the confidence delta can be computed
           from. Counting pairs separately by identity strength matters: a pair
           matched on email hash survived a storage clear and a device change,
           a pair matched only on device id did not have to. */
        const pairs = await env.BETA_DB.prepare(
          "SELECT COUNT(*) AS n FROM (" +
          "  SELECT module, client_id FROM confidence_beta " +
          "  WHERE flags IS NULL AND client_id != '' " +
          "  GROUP BY module, client_id " +
          "  HAVING SUM(phase = 'before') > 0 AND SUM(phase = 'after') > 0)").first();

        const anomalies = await env.BETA_DB.prepare(
          "SELECT day, submissions, threshold, baseline_median, method FROM daily_volume " +
          "WHERE anomaly = 1 ORDER BY day DESC LIMIT 20").all();

        const lastRun = await env.BETA_DB.prepare(
          "SELECT day, computed_at FROM daily_volume ORDER BY day DESC LIMIT 1").first();

        return json({
          ok: true,
          cohort: "beta",
          note: "Beta cohort only. Self-selected, non-probability sample. Not a population estimate.",
          dedupWindowDays: DEDUP_WINDOW_DAYS,
          received: (totals && totals.received) || 0,
          analysed: (totals && totals.clean) || 0,
          excludedAsDuplicate: (totals && totals.flagged) || 0,
          distinctDevices: (totals && totals.distinct_devices) || 0,
          distinctEmailIdentities: (totals && totals.distinct_emails) || 0,
          pairedBeforeAfter: (pairs && pairs.n) || 0,
          anomalousDays: anomalies.results || [],
          volumeCheckLastRanFor: lastRun ? lastRun.day : null,
          volumeCheckLastRanAt: lastRun ? lastRun.computed_at : null,
        });
      } catch (e) {
        return json({ ok: false, error: String(e).slice(0, 200) }, 500);
      }
    }

    return json({ ok: false, error: "not found" }, 404);
  },

  /* Daily volume check. Runs after midnight UTC and scores the day that just
     closed, so it always sees a complete day rather than a partial one.
     Deliberately writes a row EVERY day, not only on anomalies: a continuous
     record of "we checked, and it was normal" is what makes the exceptional
     row credible later. An absent record proves nothing. */
  async scheduled(controller, env, ctx) {
    ctx.waitUntil(recordDailyVolume(env, Date.now() - 86400000));
  },
};
