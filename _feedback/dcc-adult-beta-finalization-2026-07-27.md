# DCC Adult — Beta Finalization Plan

**Date:** 2026-07-27
**Author:** Fable overnight run (two-birds-portfolio + digital-confidence)
**Scope:** DCC **Adult** only. DCC Kids is explicitly out of scope (Aaron: Adult first, Kids can wait).
**Status:** Plan complete. Nothing in here has been built this session — this document is the honest gap list and the sequence.

**Live URL verified this session:** `https://twobirds-kramerica.github.io/digital-confidence/` → HTTP 200.

Anchors (read, not re-litigated):
- `C:\twobirds\two-birds-portfolio\hal-stack\architecture\decisions\ADR-0027-dcc-aggregate-data-and-low-friction-account.md`
- `C:\twobirds\two-birds-portfolio\hal-stack\research\dcc-beta-program-research-2026-07-20.md` (Part B best practices)
- `C:\twobirds\digital-confidence\_feedback\dcc-beta-program-plan-2026-07-20.md` (Aaron's dictated plan)
- `C:\twobirds\digital-confidence\PRODUCT.md` (anti-references — these OUTRANK the research recommendations, per DESIGN GATE)
- `C:\twobirds\two-birds-portfolio\hal-stack\sprint-system\sprint-queue.md` → `S-DCC-QUIZ-BASELINE-RESEARCH-001` (filed 2026-07-27, not yet run)

---

## 1. What is actually built today (verified, not assumed)

| Piece | State | Evidence |
|---|---|---|
| Live Adult site (v2) | **Live**, 200 OK | `https://twobirds-kramerica.github.io/digital-confidence/` |
| Sovereign backend Worker + D1 | **Built and deployed** | `C:\twobirds\digital-confidence\workers\dcc-data\worker.js` + `schema.sql` (tables `events`, `progress`, `feedback`); `POST /feedback` returns **200** live |
| Email capture (beta list) | **Prototype only** | `C:\twobirds\digital-confidence\js\beta.js` — POSTs email to `dcc-data /progress` (hashed server-side), but only renders behind a `?beta=1` URL flag |
| Feedback widget | **Built and its backend works, but it loads on only 2 of ~41 pages** | `C:\twobirds\digital-confidence\feedback-widget.js` → `https://field-feedback.twobirdsinnovation.workers.dev/submit`. Verified live: `/health` 200, `/submit` with an allowed Origin returns `{"ok":true,...}`. Loaded only by `index.html` and `scam-defence-helper.html` |
| `field-feedback` Worker source | **Deployed but NOT in version control anywhere** | Source read via Cloudflare MCP only; no `wrangler.toml`/`worker.js` in any repo |
| Privacy policy | **Exists** | `C:\twobirds\digital-confidence\privacy.html` |
| Consent banner | **Exists but gates nothing** | `C:\twobirds\digital-confidence\js\dcc.js` lines 132-169 — no analytics script exists anywhere in the repo for it to enable/disable |
| Service worker (root v2) | **Kill switch, not a cache** | `C:\twobirds\digital-confidence\sw.js` — deletes all caches and unregisters itself. Root has no caching SW |
| Module quiz (v2, live) | **Simple inline click-quiz** | `C:\twobirds\digital-confidence\js\module.js` lines 12-30 — one attempt, options disabled after first click, all questions visible at once, no confidence rating |
| Before/after + 5-point confidence measurement | **Exists only in the archived `/classic/` site** | `C:\twobirds\digital-confidence\classic\js\quiz-check.js`, `classic\js\measurement.js`. **Zero** `modules/*.html` files reference them |
| Live-outcome verification | **Registered** | `hal-stack\verification\verify-specs.json` has `dcc-adults` and `dcc-classic` entries |
| Beta journey (end-to-end) spec | **Does not exist** | no match for "beta" anywhere in `hal-stack\verification\` |
| Beta invite email | **Drafted, tone-anchored, awaiting Aaron** | `C:\twobirds\digital-confidence\_feedback\beta-tester-invite-email-2026-07-26.md` |

### Two findings that change the plan

**Finding A — the stale-cache workstream is moot for Adult v2, delete it from the plan.**
The 2026-07-20 research (§B2) recommends building a senior-friendly "A new version is ready — tap to refresh" service-worker prompt. The root v2 site **has no caching service worker** — `sw.js` is a deliberate kill switch that wipes caches and unregisters. There is nothing to go stale and nothing to prompt about. Building the update-prompt would be building a solution to a problem this site does not have. **Recommendation: drop workstream 5 from the beta plan entirely** and re-open it only if a caching SW is ever reintroduced at root. (The `/classic/` archive still has its own SW, but beta testers are sent to root.)

**Finding B — the measurement story Aaron wants for funders regressed when v2 shipped.**
The per-module before/after quiz with the **5-point confidence slider** — exactly the instrument Aaron described wanting for government/funder reporting — was built and works, but it lives only under `/classic/`. The live v2 Adult modules carry a simpler single-attempt click-quiz with **no confidence rating and no before/after delta**. This is not a missing feature to invent; it is a working feature that did not get carried across the v2 rebuild. That materially changes the effort estimate (port + redesign, not design from scratch) and it is the single most important thing for Aaron to know before he decides what this beta is *for* (see §3).

---

## 2. The gap list, honestly graded

### MUST — beta cannot responsibly launch without these

**M1. Feedback does not reach the pages testers actually use.**
The feedback widget loads on 2 pages. None of the ~39 module pages carry it. A tester who gets confused inside module 7 — the exact signal this beta exists to capture — has no way to say so without navigating back to the homepage. This is the highest-value, lowest-effort fix in the whole plan.

**M1a. It must not be a floating bubble.** `PRODUCT.md` anti-references (lines 26-34) explicitly name *"floating overlays that cover content (? Help buttons, feedback bubbles — these are current anti-patterns already on the live site)"*. Per DESIGN GATE, **anti-references outrank the design plan**, and they also outrank the research doc's §B1 recommendation. The research and the anti-reference actually agree once read closely — §B1 says "not an icon-only floating bubble they won't recognise." Reconciled recommendation: **an in-flow, full-width "Tell us what you think" block at the end of every module** (where a senior has just finished something and has an opinion), plus a plain labelled footer link site-wide. No overlay, no FAB.

**M2. The feedback backend works, but its source code exists nowhere and nobody has the retrieval key.**

*This item was investigated live via the Cloudflare MCP rather than escalated to Aaron. The first read of the evidence was wrong and is corrected here.*

**What `field-feedback` actually is (verified 2026-07-27 via `workers_get_worker_code`):** a deliberate, well-built **cross-product** feedback-capture Worker, not a DCC orphan. Its allow-list covers `twobirds-kramerica.github.io`, `aaron-deck.pages.dev`, `kevscasa-preview.pages.dev`, and `elite-karate-preview.pages.dev`. It writes each bundle to a KV namespace (`FEEDBACK`, key `feedback:<iso-ts>:<rand>`), rate-limits 20/hr/IP, and exposes a `GET /list` read endpoint gated by a `FEEDBACK_READ_KEY` secret.

**Live probes this session:**
- `GET /health` → `{"ok":true}`
- `POST /submit` with an allowed `Origin` → `{"ok":true,"id":"2026-07-27T18:56:00.745Z:owueh8y7"}` — **the capture path works end to end.**
- `GET /list` with no key → `{"ok":false,"error":"unauthorized"}` (401), **not** `read_key_not_configured` (500). That distinction matters: the secret **is** set, so the read path is functional.

*(The probe above wrote one real KV entry tagged `beta-readiness-check-2026-07-27` / "safe to delete". It has been left in place — no deletion without Aaron's confirmation, per the production deletion guard.)*

**So the real gaps are narrower than "wrong backend":**
1. **No source in any repo.** `field-feedback` is deployed-only — no `wrangler.toml`, no `worker.js`, no KV binding config under version control in `digital-confidence` or `two-birds-portfolio`. If it were deleted or corrupted it could not be redeployed from source. This is the genuine risk.
2. **No retrieval path Aaron can actually use.** The read endpoint works, but there is no documented script and no record of the `FEEDBACK_READ_KEY` value. A beta that captures feedback nobody retrieves is the same as a beta that captures nothing.
3. **The `dcc-data` D1 `feedback` table is dead code.** Real feedback goes to KV in a different Worker. The D1 table answers 200 and is never written to by any live page.

**Revised recommendation — do NOT consolidate onto `dcc-data`.** `field-feedback` is the better design (one cross-product capture surface, already working). Instead: **(a)** vendor its source into `C:\twobirds\digital-confidence\workers\field-feedback\` with a `wrangler.toml` so it is recoverable; **(b)** write a small `read-feedback.py` retrieval script and record the read key alongside the other secrets; **(c)** mark the `dcc-data` D1 `feedback` table as retired in favour of KV. **(c) is a data-storage decision and needs an ADR** at build time (ADR RULE) — it supersedes part of ADR-0027's storage assumption.

**M3. Beta identity capture is a hidden-flag prototype, not a flow.**
`js/beta.js` only appears behind `?beta=1` and only if the page has a `#main` element. For a real beta it needs: a real first-visit step, name + email + an **unchecked, separable** CASL consent box, `invited_by` stored, and the invite-a-friend step carrying **the referrer's full name** in the invite (the CASL referral exception requires it — research §B4). ADR-0027 already anticipates this as a consented extension and calls for a mini-ADR note; that note is still unwritten.

**M4. Nothing verifies the beta journey end to end.**
The one genuine tooling gap the 2026-07-20 research named is still open: no `beta-flow` spec exists. `verify-gate.py` proves a page renders; it does not prove that invite → landing → email submit → return → feedback submit actually completes. Diana's "what happens when step 3 fails?" is currently unanswerable. Sprint filed as `S-DCC-BETA-FLOW-SPEC-001` (see §5) — **not built this session** because it is a real build item with a backend fixture, not a trivial add.

**M5. Aaron's own UX sign-off.** Human-only, non-negotiable, and already the plan's own guardrail plus the standing outreach product gate. No invite goes out before it.

### SHOULD — cheap, do them in the same pass

- **S1. The consent banner currently gates nothing.** It offers "performance" and "marketing" toggles with no analytics behind them. Either wire the sovereign `dcc-data /event` call to the performance toggle, or soften the copy to describe what actually happens. Leaving it as-is implies tracking that does not exist — the same honesty class as the NO FAKE TIMESTAMPS rule.
- **S2. Confirm the "we got it" success state** on the feedback path, explicitly, on a real device. Seniors need unambiguous confirmation that an action worked (research §B1).
- **S3. Plain-English tester task list** to accompany the already-drafted invite email — one ask at a time, not a wall of questions (research §B5).

### DEFER — explicitly NOT beta blockers

- **D1. Service-worker refresh prompt — do not build.** Moot (Finding A).
- **D2. Quiz UX rework + 5-point confidence baseline.** Gated on `S-DCC-QUIZ-BASELINE-RESEARCH-001`, which was filed 2026-07-27 and has not run. See the trade-off in §3 — this is Aaron's call, not a default.
- **D3. Magic-link verification.** ADR-0027 already deferred it; email-as-key is sufficient for non-sensitive progress data.
- **D4. GA4.** Do not add. The sovereign `dcc-data /event` path already exists and is the ADR-0027-sanctioned route.
- **D5. Everything DCC Kids.**

---

## 3. The one decision Aaron has to make first

**These two betas are not the same beta, and trying to run both at once is what will stall this.**

**Beta as a usability test (recommended).** 8-15 seniors, 3-4 weeks, goal = find out where real Brendas get stuck. Needs M1-M5 only. Could be ready in roughly two focused build sprints plus Aaron's sign-off. Produces: verbatim feedback, observed friction, a list of fixes. Produces **no** before/after confidence numbers.

**Beta as an outcome-measurement pilot.** Same testers, but the point is generating the funder-grade before/after statistic. Needs everything above **plus** the research sprint to run, plus porting/redesigning the confidence instrument across the live v2 modules, plus a decision on the anonymous session window. Realistically several more sprints, and it front-loads measurement design onto a product whose usability has not yet been validated by a single senior.

**Recommendation, moderate-high confidence:** run the **usability beta now**, and treat the measurement instrument as a second cohort. Rationale: (1) measuring confidence change on a flow that still confuses people measures the confusion, not the teaching; (2) the research sprint has real open questions (session window, actual Canadian funder requirements) that should not be guessed at under beta time pressure; (3) M1 alone — feedback on module pages — is the difference between a beta that generates signal and one that generates silence, and it is days of work, not weeks.

**The honest cost of that recommendation:** the first cohort produces no outcome statistic, so it cannot be cited in a grant application. Aaron should accept that consciously rather than discover it later.

---

## 4. Critical-path sequence

1. ~~Confirm what `field-feedback` is~~ — **resolved autonomously 2026-07-27** (see M2). No Aaron action needed.
2. **Decide** usability-beta vs measurement-beta (§3). ← *the only true blocker on Aaron*
3. **Vendor the `field-feedback` source into the repo + write the retrieval script** (M2.1, M2.2) — do this first; it is small and it is what makes beta feedback readable.
4. **ADR** for the KV-vs-D1 feedback storage clarification + the ADR-0027 beta-list consent note (M2.3, M3).
5. **Build:** in-flow feedback block on all module pages + footer link (M1, M1a, S2) — runs through DESIGN GATE against `PRODUCT.md` anti-references.
6. **Build:** real beta first-visit capture with CASL-safe consent + invite-a-friend with referrer name (M3), plus the consent-banner honesty fix (S1).
7. **Build:** `beta-flow` journey spec; register it so the nightly sweep covers it (M4).
8. **Gate:** `build-validator` → `output-quality` → `verify-gate.py --product dcc-adults` → `beta-flow` → `ux-reviewer` → QA/QC/UAT verdict.
9. **Aaron's UX sign-off** (M5), then finalize the tester task list (S3) and send the already-drafted invite.

---

## 5. Sprints to file

- **`S-DCC-FEEDBACK-WORKER-VENDOR-001`** (P1, small) — vendor the deployed `field-feedback` Worker source into `C:\twobirds\digital-confidence\workers\field-feedback\` with a `wrangler.toml`, write a `read-feedback.py` retrieval script against `GET /list`, record the read key with the other secrets, and mark the `dcc-data` D1 `feedback` table retired (ADR at build time). **Do this first — it is what makes beta feedback recoverable and readable.** Not blocked on anything.
- **`S-DCC-BETA-FEEDBACK-SURFACE-001`** (P1) — in-flow feedback block on all Adult module pages + footer link; reconcile with `PRODUCT.md` anti-references (no floating bubble). Keeps the existing `field-feedback` backend.
- **`S-DCC-BETA-IDENTITY-CONSENT-001`** (P1) — real first-visit name/email/consent capture, CASL-safe invite-a-friend with referrer name, consent-banner honesty fix, ADR-0027 mini-ADR note.
- **`S-DCC-BETA-FLOW-SPEC-001`** (P1) — the end-to-end Playwright journey spec named as the single tooling gap in the 2026-07-20 research. Sovereign build on Playwright we already own; **do not** route through third-party gstack QA skills (not on the trusted-author allowlist).
- **`S-DCC-QUIZ-BASELINE-RESEARCH-001`** — already filed 2026-07-27, unchanged, sequenced **after** the usability beta under the §3 recommendation.

**Deliberately not filed:** any service-worker update-prompt sprint (Finding A).
