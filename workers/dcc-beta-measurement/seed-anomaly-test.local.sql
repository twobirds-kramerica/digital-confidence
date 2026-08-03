-- LOCAL TEST FIXTURE ONLY (S-DCC-CONFIDENCE-AUDIT-001, 2026-08-02).
-- Applied with `wrangler d1 execute ... --local` against the miniflare database.
-- NEVER run this against --remote: it fabricates readings, which is exactly the
-- thing the integrity layer exists to make detectable.
--
-- Builds a 14 day baseline of 2 readings per day, then 2 readings on the day the
-- cron will score (2026-08-02 UTC), so a NORMAL day can be verified first.

WITH RECURSIVE d(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM d WHERE n < 14),
     r(i) AS (SELECT 1 UNION ALL SELECT 2)
INSERT INTO confidence_beta (cohort, module, phase, confidence, lang, client_id, recorded_at, ts)
SELECT 'beta', 'baseline-module', 'before', 3, 'en-CA',
       'baseline-' || n || '-' || i,
       '2026-08-02T12:00:00Z',
       (CAST(strftime('%s', '2026-08-02') AS INTEGER) - n * 86400) * 1000 + 43200000
FROM d, r;

-- Two readings on the scored day itself: a plausible, quiet day.
INSERT INTO confidence_beta (cohort, module, phase, confidence, lang, client_id, recorded_at, ts)
SELECT 'beta', 'baseline-module', 'before', 4, 'en-CA', 'scoreday-' || i,
       '2026-08-02T12:00:00Z',
       CAST(strftime('%s', '2026-08-02') AS INTEGER) * 1000 + 43200000
FROM (SELECT 1 AS i UNION ALL SELECT 2);
