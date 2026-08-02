# field-feedback Worker

Sovereign, cross-product feedback-capture backend for the in-flow "Tell us
what you think" widget (`C:\twobirds\digital-confidence\feedback-widget.js`
loads this on DCC pages). The same Worker also serves Command Deck
(`aaron-deck.pages.dev`), KevsCasa preview, and Elite Karate preview -- it is
NOT DCC-only. Do not narrow its allow-list or assume every entry it returns
is DCC feedback; check each item's `context.url`.

## What it does

- `POST /submit` -- browser-only (checked via `Origin` allow-list), rate
  limited to 20/hr/IP, writes each feedback bundle to Cloudflare KV under
  key `feedback:<serverTimestamp>:<random>`.
- `GET /list?key=...&since=...&limit=...` -- returns stored feedback as
  JSON. Gated by the `FEEDBACK_READ_KEY` secret (query param `key`).
- `GET /health` -- liveness probe, `{"ok":true}`.

Live URL: `https://field-feedback.twobirdsinnovation.workers.dev`

## Storage

Cloudflare KV, binding `FEEDBACK`, namespace id `7e8603e81dce443e9b02dfe06cbfc35c`
(existing namespace -- see `wrangler.toml` in this directory; do not run
`kv namespace create` again, that would orphan the binding from the real data).

## Provenance (2026-08-01, S-DCC-FEEDBACK-WORKER-VENDOR-001)

This Worker was deployed-only with no source in version control until this
sprint. Its source was pulled live via the Cloudflare Developer Platform MCP
(`workers_get_worker_code`) and found to be logically identical to a copy
already committed (2026-07-03) at
`C:\twobirds\two-birds-portfolio\tools\field-feedback\worker\worker.js` --
that repo already had it, `digital-confidence` did not. This directory is
that same source vendored into the repo whose beta program actually depends
on it, so a `digital-confidence`-only session isn't stranded if the sibling
repo is ever unavailable.

The `FEEDBACK_READ_KEY` secret's original value was not recorded anywhere
(Cloudflare secrets are write-only via API/CLI -- there is no way to read
back an existing value). It was rotated to a new value on 2026-08-01 as part
of this sprint. Rotating it only affects `/list` (read) auth -- it does not
touch `/submit` (capture), so this was safe to do without breaking the live
widget.

## Redeploying (if the Worker is ever lost/corrupted)

```powershell
cd C:\twobirds\digital-confidence\workers\field-feedback
npx wrangler deploy
```

The KV namespace id in `wrangler.toml` already points at the real,
populated `FEEDBACK` namespace, so a redeploy from this directory restores
the Worker with its existing data intact. The `FEEDBACK_READ_KEY` secret is
NOT part of the deploy (secrets are set independently) -- if the Worker is
deleted and recreated (not just redeployed), you must set it again:

```powershell
cd C:\twobirds\digital-confidence\workers\field-feedback
npx wrangler secret put FEEDBACK_READ_KEY
```

(paste the current value from `C:\twobirds\two-birds-portfolio\hal-stack\integrations\field-feedback\.env`,
or generate + record a new one if it's genuinely lost -- see "Rotating the
read key" below).

## Checking for new feedback

```powershell
cd C:\twobirds\digital-confidence\workers\field-feedback
$env:PYTHONIOENCODING = "utf-8"   # feedback can contain emoji; avoids a cp1252 crash on Windows
$env:FEEDBACK_ENDPOINT = "https://field-feedback.twobirdsinnovation.workers.dev"
$env:FEEDBACK_READ_KEY = (Get-Content "C:\twobirds\two-birds-portfolio\hal-stack\integrations\field-feedback\.env" | Select-String "FEEDBACK_READ_KEY=(.*)").Matches.Groups[1].Value
python read-feedback.py
```

Or simpler, just load the `.env` values by hand and run:

```
python read-feedback.py --endpoint https://field-feedback.twobirdsinnovation.workers.dev --key <value from the .env file above>
```

Useful flags: `--since <iso-timestamp-or-cursor>` to page forward,
`--beta-only` to show only items tagged `context.betaTester`, `--json` for
the raw response.

Verified working end to end 2026-08-01: retrieved all 4 real KV entries,
including the `beta-readiness-check-2026-07-27` probe (left in place per the
production deletion guard -- do not delete without Aaron's confirmation).

## Rotating the read key

Only needed if the key is compromised or lost again. Generate a fresh value
and set it (from this directory, in Bash -- PowerShell pipes add a trailing
newline that breaks the exact-match comparison, use Bash `printf` instead):

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
printf '%s' "<the generated value>" | npx wrangler secret put FEEDBACK_READ_KEY --name field-feedback
```

Then update `C:\twobirds\two-birds-portfolio\hal-stack\integrations\field-feedback\.env`
with the new value. Allow up to ~60 seconds for the change to propagate to
all Cloudflare edge nodes before it works everywhere.

## Out of scope (deliberately not touched by this sprint)

The `dcc-data` Worker's D1 `feedback` table (`C:\twobirds\digital-confidence\workers\dcc-data\schema.sql`)
is dead code -- no live page writes to it, everything real goes to this
Worker's KV instead. Marking it retired is a data-storage decision that
needs its own ADR (per the ADR RULE) and was explicitly out of scope for
this fix. See `C:\twobirds\digital-confidence\_feedback\dcc-adult-beta-finalization-2026-07-27.md`,
item M2, for the full context.
