-- dcc-beta-measurement schema (S-DCC-BETA-CONFIDENCE-001, 2026-07-27)
--
-- THIS IS A SEPARATE D1 DATABASE FROM dcc-data. That separation is the point.
-- Beta-cohort confidence readings must never be readable by, or mixed into, a
-- future production baseline. Three independent layers enforce that:
--
--   1. Database boundary  - this DB (dcc-beta-measurement) is bound ONLY to the
--                           dcc-beta-measurement Worker. The dcc-data Worker,
--                           which will host production measurement, has no
--                           binding to it and physically cannot query it.
--   2. Table naming       - the single table is named confidence_beta. There is
--                           no un-suffixed confidence table in this database, so
--                           a production query copied here would fail loudly
--                           rather than return beta rows.
--   3. CHECK constraint   - cohort is NOT NULL and CHECK (cohort = 'beta'). SQLite
--                           itself rejects any row that is not beta-cohort. A
--                           production write into this table is impossible, not
--                           merely discouraged.
--
-- PII: no raw email, no name, no IP. email_hash is the SHA-256 the tester's own
-- browser computes (js/beta.js), matching ADR-0027's discipline and the same
-- algorithm the dcc-data Worker uses server-side. It is nullable: a tester who
-- skipped the optional email still contributes an anonymous before/after pair
-- via client_id.

CREATE TABLE IF NOT EXISTS confidence_beta (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  cohort      TEXT    NOT NULL DEFAULT 'beta' CHECK (cohort = 'beta'),
  module      TEXT    NOT NULL,
  phase       TEXT    NOT NULL CHECK (phase IN ('before', 'after')),
  confidence  INTEGER NOT NULL CHECK (confidence BETWEEN 1 AND 5),
  lang        TEXT,
  email_hash  TEXT,
  client_id   TEXT,
  recorded_at TEXT    NOT NULL,
  ts          INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_conf_beta_module ON confidence_beta(module);
CREATE INDEX IF NOT EXISTS idx_conf_beta_client ON confidence_beta(client_id);
