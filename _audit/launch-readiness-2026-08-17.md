# DCC Adults — Launch-Readiness Audit (ux-launch-auditor, first run)

**Date:** 2026-08-17
**Target:** Digital Confidence Centre, Adults surface — https://twobirds-kramerica.github.io/digital-confidence/
**Auditor:** ux-launch-auditor (`C:\twobirds\two-birds-portfolio\.claude\agents\ux-launch-auditor.md`)
**Source of truth audited:** `origin/main` @ `a24b30d` (the deployed tree). NOTE: the local working copy at `C:\twobirds\digital-confidence\` was **6 commits behind** the deployed site at audit time — all source findings below were re-verified against an `origin/main` snapshot, not the stale working tree.

---

## VERDICT: **NO-GO (5 blockers)**

One decisive reason: **the product's own locked launch decision is not what shipped** — the homepage lesson grid matches neither Aaron's locked Phase-1 curation (6 of the 14 locked modules absent, 2 of them unreachable from anywhere) nor any module count the site tells its visitors (16, 29, and 13 are all live simultaneously), and one documented inviolable (the A++ text-size tier) is silently gone.

The good news is real and should be said plainly: **the rendering layer is in strong shape.** Dark mode, the zoom matrix, the WCAG 320px reflow floor, console cleanliness, link integrity, the read-aloud voice guard (RI-011 fix), the dyslexia toggle, and reduced-motion all passed live checks. "It's not usable" is not a rendering problem today — it is an IA/curation-integrity problem plus one inviolable regression.

---

## BLOCKERS

### 1. Inviolable regression — the A++ text-size tier no longer exists anywhere on the site
- **What + where:** The text-size control shipped at the V2 cutover (`49e8c86` "promote dcc-v2 to site root") is a 3-tier `A− / A / A+` group (`index.html:40-45`, `data-text-size="s|default|l"`). `PRODUCT.md:47` requires "A/A+/A++ text-size toggle present on every page"; DCC `CLAUDE.md:45` requires "Support 4-level font size system already in place — do not break it."
- **Condition it fails at:** every page, every condition — `grep -rln 'A++' index.html modules/ js/ css/` on the deployed tree returns nothing.
- **User consequence:** a low-vision senior gets exactly one "larger" step (19px → 24px, measured live on modules/module-2.html). The old top tier for the users who need it most is gone, silently.
- **Evidence:** live Playwright run — tiers returned `["s:A−","default:A","l:A+"]`, body font 19px → 24px after A+ (max). Grep of origin/main snapshot: zero `A++` occurrences. History: `A++` last present in the classic site archived by `e31d001`.
- **Fix (smallest-correct):** either (a) add the fourth tier (`data-text-size="xl"`, ~28-29px body) to the shared header partial + `css/tokens.css`, or (b) if 3-tier was a deliberate V2 design decision, file the ADR and update PRODUCT.md + CLAUDE.md in the same commit — an inviolable that changed with no paper trail is a regression by definition.
- **Class:** inviolable regression.

### 2. IA drift — the homepage lesson grid contradicts Aaron's LOCKED Phase-1 curation
- **What + where:** `MVP-PHASE1-CURATION.md` (locked by Aaron 2026-07-23) names 14 launch modules. The live homepage grid (`index.html`, 13 `modules/` links) is missing **six** of them — module-2-5 (Common Digital Tasks), module-5 (Email & Messages), module-4 (App Store Safety), module-12 (Getting the Help You Deserve), module-13 (Social Media), module-29 (Slow Down Before You Buy) — and instead features **five modules that are NOT in the locked set**: module-30, module-ai-health, module-ai-literacy (explicitly Phase-2 in the curation doc), module-fact-check, module-visual-ai (Phase-2 "Visual AI bonus").
- **Condition it fails at:** Lane C inventory diff, all conditions.
- **User consequence:** the launch set Aaron curated for anxiety-first onboarding is not the set a visitor sees; two locked Phase-1 modules (module-12, module-29) cannot be reached from the homepage by ANY click path at all (BFS crawl from index over all root + modules pages).
- **Evidence:** `C:\twobirds\digital-confidence\_audit\reach.py` run against the origin/main snapshot — "unreachable from index: 16" includes `modules/module-12.html` and `modules/module-29-slow-down-before-you-buy.html`. Homepage link list extracted from `index.html` (13 links, enumerated above). Curation doc: `C:\twobirds\digital-confidence\MVP-PHASE1-CURATION.md` (note: this file is untracked/local-only — itself a finding, see CONDITIONS #6).
- **Fix:** make the homepage grid exactly the locked 14 (or re-lock a new set with Aaron); remove the five non-Phase-1 cards or get them ratified into the set.
- **Class:** IA drift (the "5 missing here, 13 missing there" recurring class — this is its third documented occurrence).

### 3. The site tells visitors three different module counts, none of which match reality
- **What + where:** `about.html:214` — "The programme's 29 modules"; `faq.html:102/126/168` — "16 modules" (three times); homepage grid — 13 lessons visible; actual deployed inventory — 35 EN adult module pages (39 files incl. 4 FR twins).
- **Condition it fails at:** Lane E trust sweep / RECENCY CONTRACT (these are C3-class numbers — a library coordinator evaluating DCC reads them in the first thirty seconds).
- **User consequence:** an evaluator who reads the FAQ (16), then About (29), then counts the homepage (13) concludes the site is unmaintained — the exact "abandoned" signal the trust sweep exists to catch. A learner is told the certificate comes "after finishing all 16 modules" with no way to know which 16.
- **Evidence:** grep of origin/main snapshot, line numbers above; file inventory count from `ls modules/*.html` (39).
- **Fix:** one authoritative count (the locked Phase-1 number), sourced per the claim-spec (`data-claim` or declared-facts entry), applied to about.html + faq.html in the same commit as Blocker 2's grid fix.
- **Class:** IA drift / unsourced C3 number.

### 4. Certificate dead end — the FAQ promises a Certificate of Completion that no page links to
- **What + where:** `faq.html:168` promises a "Certificate of Completion after finishing all 16 modules and the final assessment." `certificate.html` exists but has **zero inbound links** on the entire deployed site (grep across all root, modules/, fr/ pages — only self-references), and `final-quiz.html` links no certificate (verified live after clicking nav "Final assessment": `finalQuizLinksCertificate: false`).
- **Condition it fails at:** Lane D task completion — the "complete the programme" journey's final step.
- **User consequence:** a senior who finishes the final assessment — the site's single biggest effort ask — hits a dead end at the exact moment of reward; the promised certificate is unreachable.
- **Evidence:** live walk (func-run, 2026-08-17): final-quiz.html loaded, h1 "Final Assessment", no certificate href present. Inbound-link grep on origin/main snapshot: `certificate.html` self-only.
- **Fix:** link certificate.html from the final-quiz completion state (and only there, if gating is intended).
- **Class:** CTA promise / task dead-end.

### 5. "See all the lessons" lands on ONE card — the documented Lesson-3 incident, still live
- **What + where:** `index.html:84` `<a class="btn btn-secondary" href="#lessons">See all the lessons</a>`. The comment above it (`index.html:81-83`) says it was re-pointed to #lessons to fix exactly this — but at 1280×800 the post-click viewport shows the "Choose a topic" heading + ONE flagship practice card; the multi-card groups are below the fold.
- **Condition it fails at:** 1280×800, 100% zoom, light — the most forgiving cell on the matrix; worse at every other cell.
- **User consequence:** a senior clicks a button promising "all the lessons" and sees one card — for a user who takes the screen literally (the DCC audience), that IS all the lessons.
- **Evidence:** `C:\twobirds\digital-confidence\_audit\launch-readiness-2026-08-17\walk-1-see-all-lessons.png` (live click-through screenshot); measured 0 lesson-grid cards fully in viewport after the click. Recurring class documented in `hal-stack/governance/ux-qa-lessons-2026-07-28.md` Lesson 3 — this citation is the same incident, not a new class.
- **Fix:** land the anchor at the first lesson GROUP (e.g. `#everyday-confidence`) or move the flagship practice card out of the anchor's first viewport — whichever keeps 3+ lesson cards visible after the click.
- **Class:** CTA promise.

---

## CONDITIONS / WATCH (real friction, not launch-blocking)

1. **16 Phase-2 modules are orphaned but sitemap-advertised.** `sitemap.xml` lists 43 module URLs including all 16 pages unreachable from index (the Phase-2 set). Search engines will land cold seniors (journey-map class A2 — "module pages are landing pages") on unlaunched content. The pages themselves carry the full header/escape-hatch so it degrades safely, but if Phase-2 is not launched, it should be `noindex` or out of the sitemap. Also: `module-28`/`module-29` have zero inbound links even counting prev/next chains.
2. **accessibility.html has zero inbound links.** The accessibility statement — the page an AODA reviewer (journey class A6) looks for — is unreachable. One footer link fixes it.
3. **faq-fr.html has zero inbound links** (checked root, modules/, fr/). Francophone FAQ orphaned.
4. **Consent bar button order violates PAIRED-ACTION PLACEMENT (design-ui-gates 2026-07-30).** Live order is [Accept] [Reject] — affirmative LEFT. Aaron's standing rule: positive/go-forward RIGHT. Same class as the confidence-quiz fix of 2026-07-28.
5. **Duplicate-module cleanup from the curation doc is still open:** module-8 vs module-18 ("Stay Connected" twice), module-9 vs module-ai-literacy. The curation doc flagged it 2026-07-23; both twins are still deployed.
6. **MVP-PHASE1-CURATION.md is untracked** — the locked launch decision exists only on this one machine. Commit it (it is the source of truth Blocker 2 is judged against).
7. **PRODUCT.md internal drift:** says "29 adult modules" (line 15) and "wired to all 32 modules" (line 52), and references `speech-config.js` + `module-1-wizard.html`, neither of which exists in the deployed tree (read-aloud now lives in `js/dcc.js` + `js/readaloud-discoverable.js`). Update after Blockers 1-3 settle the real numbers.
8. **Local working tree was 6 commits behind origin/main** — any agent auditing or editing DCC from this machine without fetching first is operating on a site that no longer exists.

---

## WHAT PASSED (verified live, 2026-08-17)

- **Dark mode (inviolable-adjacent):** body/bg/text flip correctly on all 4 sampled pages at all cells; screenshots (`index-dark-375w-100z.png`, `module-2-dark-1280w-200z.png`, etc.) show clean, readable renders incl. nav, breadcrumbs, badges.
- **Conditions matrix rendering:** 26 cells (4 pages × light/dark × 375/1280/640-equiv widths, + 320px SC 1.4.10 floor on module-2 both schemes): zero horizontal scroll, zero overflowing elements, zero console errors or page errors.
- **`quality/overlap-check.py` (product's own tool):** 0 overlaps across 5 widths × 4 zooms (100-200%) on index, module-2, module-25, module-1-fr — header-row selector scope.
- **Read-aloud:** control present on all sampled pages, speaks on click, status label is the authored "Reading with: your device's voice" (no raw OS voice-name leak — Lesson 2 / RI-011 compliant); `noAcceptableVoice()` code-orange guard confirmed in deployed `js/dcc.js:439-556`.
- **Dyslexia toggle:** live click flips body font Merriweather → OpenDyslexic, persists across pages.
- **Reduced motion:** `prefers-reduced-motion: reduce` emulation → transition durations drop to 0s.
- **Escape hatch:** "All lessons" nav + breadcrumb + "← Back to all lessons" visible in first viewport on module pages incl. at 320px; "Back to all lessons" click lands on index (verified).
- **Links:** all 30 unique hrefs on index.html return HTTP 200 (incl. external antifraudcentre link).
- **FR twin (module-1-fr):** renders clean at all sampled cells; FR nav targets (fr/index.html etc.) exist and resolve.
- **"Try a 5-minute lesson" CTA:** lands on scam-defence-helper.html, which self-frames immediately ("This is pretend. Nothing here is real.") and shows "5 minutes to your first win" — promise kept.

---

## COVERAGE STAMP (COMPLETENESS FAILURE-SIGNAL RULE applies to this audit itself)

- **Lane C (IA completeness): COMPLETE.** Full inventory: 60 root HTML + 39 modules/ HTML + 7 fr/ HTML enumerated from the origin/main deployed snapshot; every module's inbound links counted; full BFS reachability from index run (`_audit/reach.py`). classic/ archive (~60+ pages) inventoried as present but not link-audited (it is an archived surface).
- **Lane A (inviolables): SAMPLE — 5 pages** (index, module-2, module-25, module-28, module-1-fr) source-checked; **function verified live on module-2 + index only.** NOT verified: focus traps on modals (no modal opened in headless run — beta wizard requires cohort flag), read-aloud curated-voice QUALITY on a real device (headless spoke, but which voice a real iPad picks was not audited), quiz-page template class (final-quiz loaded but its interactive flow not exercised).
- **Lane B (conditions matrix): 26 of 26 planned cells run** (4 pages × 2 schemes × 3 widths + 2 × 320px floor cells). Emulation notes: zoom emulated as viewport-width division (the repo's own overlap-check convention), NOT real Ctrl-+ zoom; 125%/150% intermediate zooms covered only by overlap-check.py's header-row scope, not full-page; text-only scaling (SC 1.4.12 text-spacing) NOT tested; real Android Chrome dark mode NOT tested (CLAUDE.md requires it — emulated dark only).
- **Lane D (task completion): 4 CTA walks run live** (See all lessons / Try 5-minute / open module-2 + return home / Final assessment nav). NOT walked: full quiz completion, certificate flow (blocked by Blocker 4), FR cold-entry walk.
- **Lane E (trust sweep): console clean on 4 pages; 30/30 index links HTTP-checked; placeholder/lorem grep clean on index + all modules.** NOT swept: every page's console (only 4 pages), image integrity beyond what screenshots show, fr/ pages' links.
- **modal-cta measure-cta-gap.py: NOT RUN** (it targets the beta welcome wizard against localhost; the wizard did not render on the live cold visit — noted, not skipped silently).

**UNVERIFIED list (not blockers, not assertions):** modal focus traps; real-device (iPad/Android) rendering; curated-voice selection on devices with Clara/Sylvie installed; SC 1.4.12 text-spacing overrides; classic/ archive integrity; whether the A− tier was an Aaron-approved trade for A++ (no ADR found, but the audit did not exhaustively search session logs).

---

## For Aaron's call (max 3)

1. **Is 3-tier text sizing (A−/A/A+) your decision or a regression?** If you approved trading A++ for A− at the V2 cutover, say so and Blocker 1 becomes a paperwork fix (ADR + PRODUCT.md). If not, it's a real accessibility loss for your lowest-vision users.
2. **Is the homepage grid's actual 13 (with five non-Phase-1 AI/feed modules) a deliberate re-curation of your locked 14?** Someone made that call in the V2 build — either ratify it or restore the locked set. The certificate/count fixes (Blockers 3-4) follow whichever number you pick.
3. **Phase-2 orphans in the sitemap:** launch them quietly (discoverable via search but not the grid — current state), hide them (`noindex`), or hold them out of the deploy entirely. Current state is the worst of the three because it's unchosen.
