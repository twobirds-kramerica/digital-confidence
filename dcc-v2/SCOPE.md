# DCC Adult v2, Phase 1 Scope and Content-Parity Audit

**Sprint:** V2-1 (inventory + content-parity audit, no code)
**Date:** 2026-07-10
**Plan:** `C:\twobirds\two-birds-portfolio\hal-stack\product-intelligence\dcc-v2-full-site-rebuild-plan-2026-07-10.md`
**Governing decisions:** ADR-0008 (generator architecture), ADR-0004 (no auth), ADR-0015 (kids separate). Old site stays byte-for-byte untouched; all v2 output lands under `dcc-v2\`.

**Audit completeness stamp:** 42 root `module-*.html` files enumerated (3 `-wizard` variants + 1 `module-template.html` excluded = 38 content pages). 33 module JSONs in `build\content\modules\` enumerated. Generator run: `build.py --brand=warm-hearth` to a temp scratch directory produced 32 pages (1 JSON errored, see drift list). All 32 generated pages were text-diffed against their live root HTML. Method and limits: visible text inside `<main>` was extracted from both files, normalized, and sequence-diffed. This compares learning content; it does NOT compare head metadata, link targets, image sources, data attributes, sidebar/footer markup outside `<main>`, or JS behaviour. Scratch output was deleted after the audit.

---

## 1. In-scope page list (yes / no / defer)

### 1.1 Adult module core: 30 pages, ALL YES for phase 1

The "29-module adult core" branding counts 29 numbered modules; module-2-5 makes it 30 physical pages.

| Page | v2 phase 1 | Source for v2 | Notes |
|---|---|---|---|
| module-1.html | yes | JSON (drift fixes needed) | |
| module-2.html | yes | JSON (drift fixes needed) | |
| module-2-5.html | yes | JSON (drift fixes needed) | |
| module-3.html | yes | JSON (drift fixes needed) | largest early-module drift |
| module-4.html | yes | JSON (drift fixes needed) | |
| module-5.html | yes | JSON (drift fixes needed) | known PDF-tip case, confirmed |
| module-6.html | yes | JSON (drift fixes needed) | |
| module-7.html | yes | JSON (drift fixes needed) | |
| module-8.html | yes | JSON (drift fixes needed) | two full stories missing from JSON |
| module-9.html | yes | JSON (drift fixes needed) | |
| module-10.html | yes | JSON (drift fixes needed) | |
| module-11.html | yes | JSON (drift fixes needed) | |
| module-12.html | yes | JSON (drift fixes needed) | |
| module-13.html | yes | JSON (drift fixes needed) | |
| module-14.html | yes | JSON (drift fixes needed) | |
| module-15.html | yes | JSON (drift fixes needed) | |
| module-16-travel-safety.html | yes | JSON (drift fixes needed) | |
| module-17-ai-research.html | yes | JSON (drift fixes needed) | |
| module-18-staying-connected.html | yes | JSON (title fix + coach block) | |
| module-19-digital-legacy.html | yes | JSON (title fix + coach block) | |
| module-20-internet-plan.html | yes | JSON (title fix + coach block) | |
| module-21-mobile-plan.html | yes | JSON (title fix + coach block) | |
| module-22-tv-home-phone.html | yes | JSON (title fix + large drift) | subscription-traps section missing from JSON |
| module-23-online-marketplace.html | yes | JSON (title fix + coach block) | |
| module-24-communication.html | yes | JSON (title fix + coach block) | |
| module-25-outage-detection.html | yes | JSON (title fix + coach block) | |
| module-26-notifications.html | yes | JSON (title fix + coach block) | |
| module-27-inbox-spam.html | yes | JSON (title fix + coach block) | placeholder title is live in production too |
| module-28-emotional-scams.html | yes | NO JSON, port to JSON first | see Section 3 |
| module-29-slow-down-before-you-buy.html | yes | JSON (title fix + coach block) | placeholder title is live in production too |

### 1.2 Adult special modules: 4 pages, DEFER to phase 2 (early)

| Page | v2 phase 1 | Reasoning |
|---|---|---|
| module-ai-literacy.html | defer (phase 2, first in line) | JSON exists but has the worst drift of any module (parity ratio 0.705, a whole cautionary story and two sections missing). High-value page; generate it as soon as its JSON is rewritten. |
| module-visual-ai.html | defer (phase 2) | JSON exists, drift small (title, one note, nav). Cheap to bring in early. |
| module-ai-health.html | defer (phase 2) | No JSON. Standard module shape (442 lines, no scenario engine), portable. Port when phase 1 core is done. |
| module-fact-check.html | defer (phase 2) | No JSON. Standard module shape (484 lines), portable. Same as ai-health. |

Rationale for deferring all four: phase 1's job is to fix the facade for the core learning path (landing page cards link to the numbered modules). Two specials have no JSON and two need JSON rework; pulling them in would delay the moment Aaron's core complaint is fixed. They are phase 2 items, not drops.

### 1.3 Youth modules: 4 pages, NO for adult v2 (defer indefinitely to a youth/kids decision)

| Page | v2 phase 1 | Reasoning |
|---|---|---|
| module-ads-youth.html | no | Youth vertical is architecturally separate (ADR-0015 spirit). Its JSON is also broken (see drift list). |
| module-ai-literacy-youth.html | no | Same. JSON exists and is close to parity, but audience is out of adult v2 scope. |
| module-gems-youth.html | no | No JSON, scenario-engine page (100+ scenario references, inline JS the generator cannot produce). Hand-crafted only. |
| module-pressure-youth.html | no | Same as gems-youth (102 scenario references). |

### 1.4 Wizard variants and template: NO (not pages to rebuild)

| Page | v2 phase 1 | Reasoning |
|---|---|---|
| module-1-wizard.html, module-2-wizard.html, module-3-wizard.html | no | Separate interaction model (the `v2\` wizard lab). Fate is an Aaron decision per the plan; not part of this rebuild. |
| module-template.html | no | Authoring scaffold, not content. |

### 1.5 Support pages

| Page | v2 phase 1 | Reasoning |
|---|---|---|
| dcc-v2\index.html | yes | Already exists; card links rewired to v2 modules in Sprint V2-4. |
| about.html | yes | Plan recommendation, confirmed. Hand-build on shell (Sprint V2-5). |
| privacy.html | yes | Confirmed. |
| terms.html | yes | Confirmed. |
| disclaimer.html | yes (REVISION, added) | Every live module footer links Privacy, Terms, Disclaimer as a set. If the v2 footer keeps that set, pointing Disclaimer at an old-design page is a facade leak on every single page. Small page, cheap to include. |
| faq.html | yes | Confirmed. |
| glossary.html | yes | Confirmed. |
| final-quiz.html | yes | Confirmed. |
| resources\support-directory.html | yes | Confirmed. |
| certificate.html | yes (REVISION, added) | final-quiz flows directly into the certificate. Shipping the quiz on v2 but dead-ending its success state into the old design breaks the one moment of celebration in the course. Include with final-quiz. |
| digital-literacy-101.html | yes (REVISION, added) | It is module-1's "previous" link (Foundations). The very first back-navigation a learner can make from v2 module-1 should not drop them into the old site. Module-shaped; hand-build or port. |
| scam-simulator.html | defer | Interactive JS tool, not on the core lesson path. Phase 2+. |
| search.html | defer | JS-driven, depends on site-wide index. Revisit after v2 URL structure settles. |
| scam-defence-helper.html (in dcc-v2\) | yes (already v2) | Shipped with the v2 landing page. |

### 1.6 Explicitly deferred content surfaces (confirmed from the plan, no change)

| Surface | Approx size | Status |
|---|---|---|
| answers\ | ~60 pages | defer, stays on old design |
| tips\ | ~22 pages | defer |
| geo-content\ | ~22 pages | defer |
| resources\ deep pages incl. scam-deep-dives\ | ~60 pages | defer (support-directory only exception) |
| kids\ | ~30 pages | defer, separate vertical |
| lang\fr\ | ~17 pages | defer, v2 phase 1 is English only (on the record per plan risk 9) |
| family.html, family-setup.html, brenda-guide\, accessibility.html, for-libraries.html, facilitator-guide.html, beta-*, admin*, marketing/internal pages | various | defer, not on the learner path |

**Phase 1 page count: 30 module pages (generated) + 12 support pages (index, about, privacy, terms, disclaimer, faq, glossary, final-quiz, certificate, support-directory, digital-literacy-101, scam-defence-helper already done) = 42 pages.**

---

## 2. JSON drift list (fixes required before v2 generation)

Diff basis: generated warm-hearth output vs live root HTML, text inside `<main>`. "Live-only" = content on the live page missing from JSON. Parity ratios ranged 0.705 to 0.997.

### 2.1 Build-blocking defect

1. **`module-ads-youth.json` crashes the generator** (`sequence item 3: expected str instance, list found`), and because build.py returns exit 1 on any module error, this single file makes every full build report failure. Fix or exclude before any v2 generation run, even though the youth module itself is out of scope.

### 2.2 Systematic drift (affects most or all modules)

2. **"From your coach" empathy blocks are missing from every JSON.** Every live module carries a unique, per-module coach paragraph. The schema has no field for it. This is the single largest uniform content loss: ~32 unique blocks must be ported into JSON (new schema field or a section type) or v2 loses a signature feature of the current site.
3. **Placeholder titles in the wholesale-migrated JSONs.** Modules 18 through 27 and 29 (and the special/youth JSONs) have slug-derived titles like `Module 20 Internet Plan`, rendering h1s like "Module 20: Module 20 Internet Plan". Live pages 18 to 26 have correct hand-written h1s (the real titles to copy back into JSON). **Modules 27 and 29 have the placeholder h1 LIVE IN PRODUCTION** ("Module 27: Module 27 Inbox Spam", "Module 29: Module 29 Slow Down Before You Buy"). Fix in JSON for v2; the live-site defect is noted here, not fixed (old site untouched rule). Correct titles for 27/29 need writing, likely from their meta descriptions.
4. **Category labels missing.** Live pages show a category label ("Safety First", "Daily Life", "Staying Independent") above the h1. No JSON field exists. Needed for the Gord-facing "Protect your money" style grouping in Sprint V2-2 anyway; add a `category` field and backfill all modules.
5. **Duplicate quiz risk.** Modules with a populated JSON `quiz` array (roughly modules 1 to 17) ALSO carry the live interactive quiz embedded as `raw_html` sections. Generated output therefore contains two quizzes: the live-matching interactive one plus a second "Check Your Understanding" radio-button quiz that does not exist on live. Decision needed at template time (Sprint V2-3): render ONE quiz per module, either from the structured `quiz` array (preferred, cleaner for the v2 template) or the raw_html one, and strip the other from each JSON.
6. **Tip/warning box labels.** Live boxes carry varied visible titles ("Tip", "Watch Out", "Helpful Hint", "Practical Tip", "Good to Know", "Reassuring Fact", "Important", "Our Recommendation"); the generator emits icon-only boxes. Add an optional `label` to tip/warning section types and backfill.
7. **DCC Kids cross-link blocks** ("Also for children" / "Also available for kids" with per-module lesson links) exist live on modules 1, 2, 3, 9, 13 and are absent from JSON. Port as a section type or shell partial with per-module data.
8. **"Try it today" action blocks** (modules 7, 8, 13) and **micro-action checkboxes** ("I browsed a delivery app...", module 9 and 10) are live-only. Port into JSON.
9. Cosmetic: module-nav labels differ (live "← Previous: Escape Hatch" vs generated "← Module 1: Mastering the Escape Hatch"); encouragement-card paragraph splits differ. Template decision, not content loss.

### 2.3 Per-module substantive drift (live-only content to port into JSON)

| Module | Live-only content missing from JSON |
|---|---|
| module-2 | "Go deeper: Scam Deep Dives" link section (5 deep-dive links); "Avoid These Tech Support Traps" list |
| module-3 | "Your Security Dictionary" (9 term definitions); passphrase method examples; "Two Scams Every Canadian Should Know" plus Smishing, WhatsApp Account Takeover, and Messenger "Family Emergency" scam entries with source line; "Which Accounts Most Need the Double Lock" list; kids block |
| module-5 | PDF-viewer fake-install-prompt safety section (the known commit 955a291 case, confirmed by this audit: real vs fake prompts, Adobe Reader note, close-the-tab guidance) |
| module-8 | Harold's Story (text-first etiquette); Jean's Story plus The Globe Rule; "What Not to Post Publicly" list; "A Final Note" closing section |
| module-9 | Family safe word call-back paragraph; "I tried an AI tool" checkbox; kids block |
| module-10 | Live title is "Grocery & Food Delivery Apps" (JSON: "Grocery & Food Delivery"); Cost Breakdown Example; Understanding Uber Eats Fees; Canadian Pick; How Payments Work; delivery-app checkbox |
| module-11 | Live title "Ride-Sharing Apps — Uber & Lyft"; Golden Rule of Ride-Sharing Safety; Which App Should I Use; "completed all 11 modules" celebration block |
| module-12 | Dorothy's Discovery story; Margaret's Moment story; Keep a Call Log; Your Most Powerful Phrase; expanded Critical Warning (remote access) |
| module-13 | Profile vs Page; Our Recommendation; Your Old Posts May Still Be Public; The Reverse Image Trick; If Someone Is Pretending to Be You; Ask Before You Post Others' Photos; Gift Cards Are a Scam Signal; Watch for DM Scams; Following Family on Instagram; RCMP paragraph wording differs; kids block |
| module-14 | How-to-mute paragraph; privacy-fit conclusion; Start with Just One (with undo reassurance); Your Decision Framework |
| module-15 | Privacy Protection; Lab Results note; Specialist Referrals; Prescriptions After a Video Visit; Language Support; HealthLine Ontario; Bring Your Medications; Not All Labs Are Connected; A Word on Comfort (pharmacist); health-privacy-breach section |
| module-16 | Banking Rule; How to Switch to Mobile Data; Charging Rule; Fake Booking Sites; Too-Good-to-Be-True Deals; Unofficial Taxis and Guides; Emergency Assistance From Abroad; two confidence checks |
| module-17 | The 3-Second Rule; A Simple Checking Habit; The Golden Rule for AI Privacy; three confidence checks |
| module-21 | Quiz-completion encouragement block |
| module-22 | **Largest single-module drift:** the whole "Section 9: Subscription Traps" block (free-trial auto-renewal trap with subscribe-and-cancel method, promotional-rate expiry trap with retention-call script, Paper Calendar Method, bill-phrase warnings, confidence check) plus the matching "what you will learn" line |
| module-ai-literacy | Fourth cautionary story (stale transit times) and heading change to "Four Cautionary Stories"; expanded 3-Second Rule steps; The Golden Rule for AI Answers; "AI and real-time information" section with check-at-source list; Success State checklist; breadcrumb/title |
| module-ai-literacy-youth | Intro wording ("involving AI (artificial intelligence)"); safe-space wording; Success State checklist; placeholder title |
| module-visual-ai | Live title "📷 Show Me! — Your Camera as a Learning Tool" (JSON: "Show Me! Visual AI Guide (Bonus)"); Important note; confidence-check wording; back-home nav |
| module-27, module-29 | Cleanest pair (ratio 0.997). Only the category label, coach block, and the shared placeholder-title defect (2.2 item 3) |
| modules 1, 4, 6, 7, 18, 19, 20, 23, 24, 25, 26, 2-5 | Systematic items only (coach block, category, labels, titles where noted); no additional large unique sections found |

---

## 3. Modules with no JSON: decisions

| Module | Decision | Reasoning |
|---|---|---|
| module-28-emotional-scams | **Port to JSON** (required for phase 1) | It is part of the numbered adult core; v2 phase 1 generates the full core. Standard module shape (542 lines, ordinary quiz, no scenario engine). Porting is the ADR-0008-compliant path; hand-building would fork one module out of thirty. |
| module-ai-health | **Port to JSON, phase 2** | Standard shape (442 lines, no scenario engine). Not on the phase 1 core path, so port it when the specials come in with phase 2. |
| module-fact-check | **Port to JSON, phase 2** | Same profile (484 lines). Same reasoning. |
| module-gems-youth | **Defer (hand-crafted, youth)** | Scenario-engine page (100+ scenario references, inline JS the generator cannot emit). Gotchas doc already records youth modules as non-generatable. Out of adult v2 scope regardless. |
| module-pressure-youth | **Defer (hand-crafted, youth)** | Same (102 scenario references). |

---

## 4. Phase 1 confirmation

Last night's recommendation is **confirmed with three additions**:

- **Confirmed in:** 30-page adult module core (generated), index, about, privacy, terms, support-directory, glossary, faq, final-quiz.
- **Added (this audit):** disclaimer.html (footer-set completeness), certificate.html (final-quiz flows into it), digital-literacy-101.html (module-1's previous link).
- **Confirmed deferred:** answers\, tips\, geo-content\, resources\ deep pages, fr\, kids\, youth modules, adult specials (to phase 2), scam-simulator, search, wizard variants.

Sequencing note for Sprint V2-4: generation is blocked until (at minimum) drift items 2.1 and 2.2 items 2, 3, 5 are resolved and module-28 is ported. The per-module 2.3 ports can land module by module, but a module must not be generated into `dcc-v2\` until its row in 2.3 is cleared, or v2 ships content that is behind the old site (plan risk 2).

Next sprint: V2-2 (shared v2 shell). Gated on the DESIGN GATE (PRODUCT.md anti-references, /impeccable audit) and an Aaron review. Not started by this sprint.

---

## 5. Sprint V2-6 plumbing decisions (2026-07-11)

Recorded per the rebuild plan's instruction that these are explicit decisions, not silent defaults.

1. **Service worker / caching.** The root `sw.js` scope already covers `dcc-v2\` (network-first for HTML, stale-while-revalidate for assets), so v2 pages are always fresh when online and offline-capable after first visit. Decision: do NOT precache the ~42 v2 pages on install (v2 is still a noindex preview; precaching would inflate every visitor's install for a surface most have not opened). `CACHE_NAME` bumped `dcc-v20 -> dcc-v21` to force-propagate this sprint's shared-asset changes (`dcc-v2\css\core.css`, v2 JS). Revisit precache at V2-7 cutover.
2. **SEO / canonical / sitemap.** Every v2 page carries `<meta name="robots" content="noindex,nofollow">` (preview banner comment marks it). While that holds there is no duplicate-content exposure, so: no v2 entries in `sitemap.xml`, no canonical tags added. The canonical policy (v2 self-canonical vs canonical-to-old) is decided at the V2-7 cutover decision, filed to Aaron's Notion backlog. Removing the noindex is part of that same decision, never done unilaterally.
3. **Progress continuity (plan risk 11).** Where progress has real stakes, v2 reads/writes the ORIGINAL keys: final assessment (`finalQuizScore`, `finalQuizDate`, `userName`, `dc-quiz-m*-passed`, and the `dc-progress-m*` readiness check) and the certificate. A learner mid-course keeps their quiz unlock, score, and certificate on v2. The v2 lesson "small wins" mechanic uses its own `dccv2-wins-*` keys by design (different structure from the old per-checklist `dc-progress-m*-i` booleans); no migration is attempted. Accepted divergence: old-site checklist ticks do not pre-fill v2 small-wins bars. If Aaron wants a one-way import, that is a small follow-up sprint.
4. **Nightly verification.** `dcc-v2` entry added to `hal-stack\verification\verify-specs.json` (two-birds-portfolio repo) with custom checks asserting lesson cards resolve into `dcc-v2\modules\` and the footer has no `../` old-site escapes — the two regressions this rebuild exists to prevent.
