# DCC Beta Program + Validation Tooling — Plan (Aaron dictation, 2026-07-20)

**Captured live so nothing is lost.** This is a PLAN/SPEC, not yet built. Anchored to **ADR-0027** (Accepted 2026-07-03) which already authorizes the sovereign backend (Cloudflare Worker + D1), low-friction email-as-key account, aggregate no-PII analytics, and one-way feedback collection for DCC. Most of what Aaron wants here is a bounded extension of ADR-0027, NOT a new architectural fight.

## The good news (architecture already decided)
- **Backend / database:** ADR-0027 = Cloudflare Worker + D1, sovereign, near-zero cost. The "database for beta users" Aaron wants = this.
- **Login / "know who they are":** ADR-0027 = email-as-key, no password (lowest friction). For BETA specifically, we identify testers (they consented, invited friends/family) — a small, consent-based extension: a named beta list vs the public product's hashed-anonymous default. Flag as a mini-ADR note.
- **Feedback backend:** ADR-0027 already includes one-way feedback/bug collection.

## Workstreams

### 1. Logo (already flagged, in progress)
DCC logo must be present + locked. The running audit is reporting what mark ("fabric") is currently used so Aaron can confirm + lock it into the brand. See `dcc-feedback-log-2026-07-20.md`.

### 2. UX/UI/QC validation tooling (RESEARCH — "get a tool if we don't have one")
Aaron wants a stronger UX/UI/QC validation capability: RPA, agent orchestration, before/after management, better validation + embedding. Research: what does the FOUNDING BOARD use (if anything)? What RPA / tool / MCP / skills should we hook up?
- **What we ALREADY have** (confirm + strengthen, don't rebuild): `ux-reviewer`, `build-validator`, `output-quality` agents; Playwright MCP; axe-core; `hal-stack/verification/verify-gate.py`; the design-languages reference; Anthropic frontend-design skill.
- **Gap to scope:** an RPA end-to-end "testing bot" that walks the full beta flow (invite → signup → site → feedback) and confirms it works all the way through; before/after validation harness; orchestration of the QC agents into one gate.

### 3. RPA end-to-end testing bot (BUILD, after scope)
A testing bot that runs the ACTUAL beta flows end-to-end (every path a beta tester touches) and confirms completion. Likely Playwright-driven. Must run before beta launch + on every update.

### 4. Beta backend (BUILD per ADR-0027, after Aaron's go)
- Cloudflare Worker + D1: beta-user table (email + optional name + invited-by + consent + timestamp), feedback table, aggregate events.
- **Beta feedback mechanism** (DECISION NEEDED): (a) a dedicated, crystal-clear "Beta feedback" button on the site, (b) reuse the existing feedback button + tell them how, or (c) a form. Recommendation after research.
- **Invite-a-friend flow:** preamble ("thanks for checking this out; want to invite a friend? enter their email") → friend added to beta list → friend gets an invite email → their own beta path.

### 5. Cache / stale-version problem for non-savvy seniors (RESEARCH + BUILD)
Real risk: DCC has a service worker; when we push updates, non-technical seniors may see a stale cached version. Options Aaron raised: (a) a senior-friendly "Get the latest version" button (framed as that, NOT "clear cache"), covered in the orientation video/email; (b) auto-refresh cache every visit (Aaron doubts this makes sense). Research beta best practice; recommend. (Note: we already bump service-worker CACHE_NAME on deploys — but that doesn't always reach returning SW-cached visitors instantly, which is exactly the risk.)

### 6. Beta invite email + orientation (DRAFT — see `dcc-beta-invite-email-2026-07-20.md`)
- Friends-and-family invite, spoken to as SENIORS: warm, "good news, DCC is launched, I'd love your feedback," no obligation, welcome feedback any way (digital especially helpful), tell them HOW to give feedback, invite-a-friend option.
- Optional fun orientation VIDEO (LOON): "thanks for being part of the beta, here's the site, here's how I'd love feedback." (Could be LOON's second real production.)

### 7. Marketing database (BUILD with beta backend)
Beta users captured into the DB double as a marketing list (with consent) — feeds future updates + the content pipeline.

## Decisions needed from Aaron (before build)
1. **Beta feedback mechanism:** dedicated button / reuse existing / form? (recommendation coming from research)
2. **Cache handling:** "get latest version" button + orientation, or auto-refresh? (recommendation coming)
3. **Beta identity:** OK to store beta testers' email + name (consented) so you know who they are? (small extension of ADR-0027's hashed-anonymous default — needs a one-line ADR note)
4. **Orientation video:** yes/no (LOON can make it)
5. **Scope + timing:** this is a multi-sprint program — which pieces first? (recommend: validation tooling + RPA bot + backend before any real senior touches it)

## Guardrails
- Everything stays sovereign (Cloudflare, our stack) + PII-disciplined per ADR-0027.
- DCC is NOT launch-ready (no UX pass, IA questionable) — beta invites do NOT go out until the mechanical fixes + Aaron's UX sign-off are done.
- Nothing external sent without Aaron's review (outreach gate).
