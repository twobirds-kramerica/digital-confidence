-- dcc-beta-measurement migration 002: audit-defensibility integrity layer
-- (S-DCC-CONFIDENCE-AUDIT-001, 2026-08-02)
--
-- WHY THIS EXISTS
--   The v1 schema (migration 001 = schema.sql) proved the beta cohort's readings
--   cannot be mixed with production data (ADR-0043). It did NOT establish that
--   the readings themselves are trustworthy. Two gaps were found by reading the
--   deployed Worker on 2026-08-02:
--
--     1. Nothing server-side stopped the same device sending a second "before"
--        for the same module. The only de-dup was a localStorage flag, which is
--        cleared by any browser cleanup.
--     2. Nothing counted submissions per day, so an implausible volume spike
--        would have flowed straight into an aggregate statistic unflagged.
--
--   A funder or auditor does not need the data to be perfect. They need the
--   cleaning rule to be stated in advance, applied mechanically, and countable.
--   That is what this migration adds.
--
-- NON-DESTRUCTIVE BY CONSTRUCTION
--   Additive only: one nullable column, two indexes, one new table. No DROP, no
--   DELETE, no ALTER of an existing column, no rewrite of existing rows. Per the
--   production deletion guard, nothing here needs Aaron's sign-off to run, and
--   nothing here can lose a reading.
--
--   NOTE: suspected-duplicate readings are FLAGGED AND KEPT, never rejected and
--   never deleted. That is deliberate. An auditor's question is "how many did you
--   throw away, and on what rule" — which is only answerable if the discarded
--   rows still exist to be counted. Silently dropping a duplicate would make the
--   pipeline look cleaner and be less defensible.
--
-- Canadian English. No em-dashes.

-- 1. Per-row integrity verdict. NULL = clean, the normal case.
--    Values written by the Worker are a comma-separated tag list, currently:
--      dup:cid    second reading for this module+phase from the same device id
--                 inside the de-dup window
--      dup:email  same, matched on the SHA-256 email hash instead, which is the
--                 stronger signal because it survives a localStorage clear and
--                 spans devices
--    Analysis queries exclude any row where flags IS NOT NULL, and report the
--    excluded count alongside the headline number.
ALTER TABLE confidence_beta ADD COLUMN flags TEXT;

-- 2. Indexes supporting the de-dup lookup on the write path and the daily
--    volume rollup on the cron path. idx_conf_beta_client already exists on
--    client_id alone; this one covers the full de-dup predicate.
CREATE INDEX IF NOT EXISTS idx_conf_beta_dedup ON confidence_beta(client_id, module, phase, ts);
CREATE INDEX IF NOT EXISTS idx_conf_beta_email ON confidence_beta(email_hash, module, phase, ts);
CREATE INDEX IF NOT EXISTS idx_conf_beta_ts ON confidence_beta(ts);

-- 3. One row per UTC day, written by the Worker's scheduled() cron handler.
--    This is the anomaly record. It exists so that the sentence "submissions on
--    2026-09-14 were 40x the trailing median and were excluded" can be supported
--    by a row that was written on 2026-09-14, rather than reconstructed later by
--    the person who has an interest in the answer.
CREATE TABLE IF NOT EXISTS daily_volume (
  day              TEXT    PRIMARY KEY,        -- UTC date, YYYY-MM-DD
  submissions      INTEGER NOT NULL,           -- all rows recorded that day
  flagged_dup      INTEGER NOT NULL DEFAULT 0, -- of those, how many carry a flag
  distinct_clients INTEGER NOT NULL DEFAULT 0,
  baseline_median  REAL,                       -- trailing median, days with data
  baseline_days    INTEGER,                    -- how many days fed the baseline
  threshold        REAL,                       -- the number that had to be beaten
  anomaly          INTEGER NOT NULL DEFAULT 0, -- 1 = review before reporting
  method           TEXT,                       -- the rule applied, recorded per row
  computed_at      TEXT    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_daily_volume_anomaly ON daily_volume(anomaly, day);
