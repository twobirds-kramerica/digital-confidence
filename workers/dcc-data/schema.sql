-- DCC data worker schema (ADR-0027). No PII: email is stored HASHED only.
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id TEXT,      -- opaque random client id (no PII)
  event_type TEXT,     -- lesson_view | lesson_complete | quiz_before | quiz_after | ...
  lesson TEXT,
  value TEXT,          -- e.g. score, or answer bucket
  ts INTEGER
);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);

CREATE TABLE IF NOT EXISTS progress (
  email_hash TEXT PRIMARY KEY,  -- SHA-256 of the email; raw email never stored
  data TEXT,                    -- JSON blob of lesson progress
  updated_ts INTEGER
);

CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT,           -- free-form; one-way, never a reply channel
  ts INTEGER
);
