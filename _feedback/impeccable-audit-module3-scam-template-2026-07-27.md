# $impeccable audit — DCC Adult scam-pattern module template

**Date:** 2026-07-27
**Command:** `$impeccable audit` (reference: `C:\twobirds\two-birds-portfolio\.claude\skills\impeccable\reference\audit.md`)
**Register:** product (per `C:\twobirds\digital-confidence\PRODUCT.md`)
**Purpose:** clear the DESIGN GATE on the blocked backlog item *"Expand Module 3 — add SMS, WhatsApp, and Messenger scam patterns"* (Notion `375a09cf-876a-8108-a2d8-dc2814fbbc42`, Notes: `Design Gate: pending 2026-06-05`).

## Audit targets

| Target | Full path |
|---|---|
| Scam-scenario precedent A | `C:\twobirds\digital-confidence\modules\module-5.html` (Email and Messages) |
| Scam-scenario precedent B | `C:\twobirds\digital-confidence\modules\module-28-emotional-scams.html` (When a Message Uses Fear or Love to Rush You) |
| Design tokens | `C:\twobirds\digital-confidence\css\tokens.css` |
| Component CSS | `C:\twobirds\digital-confidence\css\core.css` |
| Lesson behaviour JS | `C:\twobirds\digital-confidence\js\module.js` |
| Comparison precedent (message depiction) | `C:\twobirds\digital-confidence\modules\module-2.html` (`.scam-example`) |

## Method (verified, not eyeballed)

Both pages served locally (`python -m http.server 9427 --directory C:\twobirds\digital-confidence`) and driven with Playwright/Chromium:

- **axe-core** run against both pages × **light and dark** themes × **375 / 768 / 1280 px** viewports = **12 runs**, `data-theme` explicitly forced in each so dark mode was genuinely rendered, not merely declared.
- Horizontal-overflow measurement (`scrollWidth` vs `clientWidth`) on all 12 runs.
- Programmatic touch-target sweep of every `a`, `button`, `input[type=checkbox]`, `[role=button]` on all 12 runs.
- Live keyboard interaction on the quiz (focus → Enter → post-answer focus + a11y attributes of the revealed feedback).
- Live check for floating overlays (`position: fixed` sweep + explicit `.ffw-fab` probe) — PRODUCT.md anti-reference.
- `prefers-reduced-motion: reduce` context: motion-duration tokens read back from the computed cascade.
- WCAG contrast ratios computed directly from `tokens.css` values for 24 foreground/background pairs across both themes.
- Screenshots: `C:\twobirds\digital-confidence\quality\playwright-results\shot-{light,dark}-module-{5,28-emotional-scams}.html.png`

---

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | **3** | 0 critical/serious axe violations in light **and** dark at all 3 viewports; but quiz feedback is not announced to screen readers (WCAG 4.1.3 AA) and keyboard focus is dropped to `<body>` after answering |
| 2 | Performance | **3** | No images, self-hosted `font-display: swap` fonts, no expensive effects; but ~84 KB of un-deferred JS on every module page, ~57 KB of it beta-cohort-only |
| 3 | Responsive Design | **3** | Zero horizontal scroll at 375/768/1280 in both themes; progress checkboxes render 28×28 px against PRODUCT.md's own 44×44 standard |
| 4 | Theming | **4** | Zero hard-coded colour in either module's HTML; complete two-theme token system; pre-paint no-flash script; dark mode verified AAA on every pair tested |
| 5 | Anti-Patterns | **4** | No AI tells. Distinctive, intentional, restrained. Floating feedback bubble confirmed suppressed at runtime |
| **Total** | | **17/20** | **Good** (address weak dimensions) |

---

## Anti-Patterns Verdict

**PASS.** This does not look AI-generated, and it is not close.

Checked against every AI-slop tell and general anti-pattern:

- **AI colour palette** — no. Trust Blue `#1D4E89` with a deliberately restricted amber accent that is explicitly documented as *decorative only, never text on light*. No purple-to-blue, no indigo-violet.
- **Gradient text** — none. The one `linear-gradient` in the codebase is `.hero` on the landing page; it does not appear on module pages.
- **Glassmorphism / backdrop blur** — none anywhere.
- **Hero metric grid** — none. The one statistic on module-28 ("$12.4 million in 2023") sits inside a prose sentence with attribution, not in a big-number card.
- **Generic fonts** — no. Merriweather + Source Sans 3, self-hosted, SIL OFL, `font-display: swap`. Not Inter, not a system stack.
- **Card grid as default layout** — no. Cards are used exactly twice per page and both times earn it (quiz questions, related lessons).
- **Gray on colour** — no. Explicitly designed against: `tokens.css` states *"NO light-grey/light-blue text on cream or white. The lightest text token on a light surface is #435463 (7.4:1)."* Verified true in practice.
- **Nested cards** — no. Every block is single-level inside the container.
- **Bounce / spring easing** — no. One easing curve, `cubic-bezier(0.22, 0.61, 0.36, 1)`, and it is used on exactly three properties.
- **Decorative motion** — none. The only transitions are skip-link reveal, button background, and progress-bar width. All convey state.
- **Redundant copy** — no. Prose is tight and the register is consistent.

The two-family type pairing (serif body / sans headings) technically diverges from the product register's *"one family is often right"*, but that guidance targets dashboards and tool UI. This is a long-form reading surface for an audience explicitly described as *"reading carefully, often with reading glasses"* — a high-x-height serif at 19px/1.7 is the correct call, not a slip. **Not counted as a finding.**

The strongest signal that this design language is real rather than generated: the CSS carries *reasons*. `core.css` comments name the person the decision serves (`Brenda`, `Gord`, `Denise`), the pattern it borrows from (Be Connected, Canada.ca, Age UK, ROLESafe), and the WCAG clause it satisfies. That is a designed system, not an assembled one.

---

## Executive Summary

- **Audit Health Score: 17/20 (Good)**
- **Issues found: 0 P0 · 4 P1 · 5 P2 · 2 P3**
- **Gate verdict: NO P0 BLOCKERS. The template is sound to build on.** All four P1s are addressable inside the Module 3 content sprint itself; none of them requires a redesign, a token change, or a structural rework before content work can begin.

**Top 5 findings:**

1. **[P1] The message-depiction components the new content most needs are unused and unproven.** `.sim-frame`, `.phone`, `.desktop`, `.inbox`, `.mailrow` all exist in `core.css` — and are used by **zero** of the 40 v2 module pages. The SMS / WhatsApp / Messenger content is precisely the content that would reach for `.phone`. Stamping new content onto a component that has never rendered in production is the single biggest risk in this sprint.
2. **[P1] Quiz feedback is invisible to screen readers.** `js/module.js` reveals `.quiz-fb` by adding a class. It carries no `role="status"`, no `aria-live`, no focus move. A screen-reader user taps an answer and hears nothing. This is a genuine WCAG 2.1 **4.1.3 Status Messages (Level AA)** failure, and it will be replicated into every new quiz question the sprint writes.
3. **[P1] Keyboard focus is destroyed on every quiz answer.** `opts.forEach(b => b.disabled = true)` disables the button the user is standing on; focus falls to `<body>`. Verified live in all four page/theme combinations. A keyboard or switch user must re-traverse the entire document after every question.
4. **[P1] "Module 3" in the backlog no longer maps to `module-3.html`.** The backlog item was written against the legacy module numbering where Module 3 was *"Spotting Online Scams."* In the current v2 build, `modules/module-3.html` is **"Passwords and Biometrics."** Building against the literal filename would put SMS scam content in the passwords lesson.
5. **[P2, systemic] Heading order skips a level in every walkthrough.** `<h2>` section → `<h4>` inside `.walkthrough`, with no `<h3>` between. Present in both audited pages and, by construction, in every generated module.

**Recommended next steps:** fix P1-2 and P1-3 in `js/module.js` first (two small edits, they fix all 40 existing modules at once and prevent the defect being copied into new content); resolve P1-4 by naming the target file before any writing starts; resolve P1-1 by choosing the proven `.scam-example` component rather than the unproven `.phone` frame. Then write content.

---

## Detailed Findings by Severity

### P0 — Blocking

**None.** No issue found prevents a learner from completing a module, and none prevents new scam-pattern content from being authored on this template.

---

### P1 — Major

#### [P1] Message-depiction component vocabulary is dead code, and it is exactly what the new content wants

- **Location:** `C:\twobirds\digital-confidence\css\core.css` lines 422–468 (`.sim-frame`, `.sim-tag`, `.phone`, `.phone .screen/.bar/.msg/.bubble/.sender`, `.desktop`, `.inbox`, `.mailrow`)
- **Category:** Anti-Pattern / Accessibility (unverified surface)
- **Impact:** Programmatic sweep of all 40 files in `C:\twobirds\digital-confidence\modules\` found **0 modules** using any of these classes. Meanwhile `.scam-example` is used by **7 modules**. The Module 3 brief calls for showing real message text (a wrong-number opener, a "Hi Mom" text, a fake delivery notice, a Messenger message from a cloned contact) — the natural reach is `.phone`, which has never been rendered in a shipped page, has never been through axe, and hard-codes light-mode colours (`#F2F4F7`, `#22262B`, `#55565C`) that will sit as a bright rectangle inside an otherwise dark page.
- **Note on the hard-coded colours:** these are *intentional and correct* — `core.css` line 434 documents that the simulated screen depicts a phone, not DCC's own UI, so it stays theme-independent. That is the right call. But it has never been visually verified in dark mode, and the surrounding `.sim-frame` border does use tokens, so the seam between the two is untested.
- **WCAG/Standard:** N/A directly; the risk is shipping an unaudited component into a WCAG 2.1 AA product.
- **Recommendation:** **Use `.scam-example` for the new SMS/WhatsApp/Messenger message text.** It is proven across 7 modules, fully tokenised, verified in this audit at 13.24:1 (light) and 14.09:1 (dark) for body text, and it carries the "this is NOT real" labelling convention already established in `module-2.html` — which matters more for a fake-message depiction than visual fidelity does. If the sprint decides a phone frame is pedagogically necessary, treat `.phone` as **new work**: render it, screenshot it in dark mode, and run axe on it before writing content into it.
- **Suggested command:** `$impeccable harden`

#### [P1] Quiz feedback is not announced — WCAG 2.1 SC 4.1.3 Status Messages (AA)

- **Location:** `C:\twobirds\digital-confidence\js\module.js` lines 13–30; markup at `module-5.html:276`, `module-28-emotional-scams.html:285`
- **Category:** Accessibility
- **Impact:** Verified live in all four page/theme runs: after answering, `.quiz-fb.show` is present and populated but returns `role: null, aria-live: null, tabindex: null`. Nothing is announced. For a low-digital-confidence senior using VoiceOver or TalkBack — a real and named segment of this audience — the quiz simply produces silence. The learner cannot tell whether they were right, and the explanatory feedback (which is where the actual teaching happens) is never delivered.
- **WCAG/Standard:** WCAG 2.1 SC 4.1.3 Status Messages — Level **AA**. PRODUCT.md commits to WCAG 2.1 AA minimum.
- **Recommendation:** Add `role="status"` to the `.quiz-fb` element in the module template (`module-v2.html.tpl`) and to existing pages. One attribute. Because the JS sets `textContent` *after* the element is already in the DOM, a live region will fire correctly.
- **Suggested command:** `$impeccable harden`

#### [P1] Keyboard focus lost to `<body>` after every quiz answer

- **Location:** `C:\twobirds\digital-confidence\js\module.js` line 20 — `opts.forEach(function (b) { b.disabled = true; });`
- **Category:** Accessibility
- **Impact:** Verified live in all four runs: focus before Enter is `BUTTON.quiz-opt` with a visible 3px ring; focus after Enter is `BODY (focus lost)`. Disabling the currently-focused element removes it from the accessibility tree and drops focus to the document root. On module-28 there are **five** quiz questions, so a keyboard user is thrown back to the top of a 450-line document five times. Compounding the problem, the disabled buttons are also removed from screen-reader traversal, so the learner cannot go back and re-read which answer they chose.
- **WCAG/Standard:** WCAG 2.1 SC 2.4.3 Focus Order (A); interacts with SC 4.1.3 above.
- **Recommendation:** Prefer `aria-disabled="true"` plus a click guard over the `disabled` property, so the chosen answer stays focusable and readable; or, at minimum, move focus to the revealed feedback (`tabindex="-1"` + `.focus()`), which also resolves the announcement gap. The second option fixes P1-1 and P1-3 in one edit.
- **Suggested command:** `$impeccable harden`

#### [P1] "Module 3" in the backlog does not map to `modules/module-3.html`

- **Location:** Notion `375a09cf-876a-8108-a2d8-dc2814fbbc42`; `C:\twobirds\digital-confidence\modules\module-3.html`
- **Category:** Anti-Pattern (spec drift)
- **Impact:** The backlog item was filed against the legacy numbering, where Module 3 was *"Spotting Online Scams"* — the item's own Decision section says so: *"Expand existing Module 3 ('Spotting Online Scams')... Consider renaming to: 'Spotting Scams Anywhere — Phone, Text, and Online.'"* In the current v2 build, `module-3.html` is **"Passwords and Biometrics."** Taken literally, the sprint would file SMS scam content into the passwords lesson.
- **Recommendation:** State the interpretation explicitly at sprint start (AMBIGUOUS SPEC RULE). Two defensible homes:
  - **`module-28-emotional-scams.html`** — already titled *"When a Message Uses Fear or Love to Rush You."* The Hi-Mom/Hi-Dad text, the wrong-number befriending opener, and WhatsApp pig-butchering are all *emotional-pressure* scams delivered by message. This is the closest conceptual fit and the strongest structural template (see Positive Findings).
  - **`module-5.html`** — *"Email and Messages."* Already owns the "Spotting scam emails" section and a 3-second rule; already has a quiz question about texts from unknown numbers. This is the closest *channel* fit.
  - Fake-delivery and fake-bank-alert texts genuinely belong to module-5; Hi-Mom and pig-butchering genuinely belong to module-28. A split is legitimate — but it must be a stated decision, not an accident.
- **Suggested command:** `$impeccable shape`

---

### P2 — Minor

#### [P2] Heading order skips a level in every `.walkthrough`

- **Location:** `module-5.html` lines 123, 160, 216, 242; `module-28-emotional-scams.html` lines 155, 208. Confirmed by axe as the *only* violation on either page (impact: moderate) in **all 12 runs**.
- **Category:** Accessibility
- **Impact:** `<h2>` section heading → `<h4>` walkthrough title, no `<h3>` between. Screen-reader users navigating by heading level get an inconsistent outline and may believe they have missed content. Every new walkthrough written for the SMS/WhatsApp/Messenger content will reproduce this.
- **WCAG/Standard:** axe best-practice rule (`heading-order`); supports SC 1.3.1 Info and Relationships.
- **Recommendation:** Change `.walkthrough h4` to `h3` in the generator template and add `.walkthrough h3 { font-size: var(--font-size-h4); }` to keep the visual size identical. Purely a semantic fix, zero visual change. Fixes all 40 modules at once.
- **Suggested command:** `$impeccable harden`

#### [P2] Progress checkboxes are 28×28 px against PRODUCT.md's own 44×44 standard

- **Location:** `C:\twobirds\digital-confidence\css\core.css` line 798 (`.check-item input[type="checkbox"]`), line 560 (`.consent-option input`)
- **Category:** Responsive
- **Impact:** Measured live at 28×28 px on all viewports. This **passes** WCAG 2.2 SC 2.5.8 Target Size (Minimum, 24×24), so it is not a standards violation — but PRODUCT.md sets the bar higher on purpose: *"Touch targets: 44×44px minimum (56px preferred for primary actions)."* For an audience of seniors on tablets, a 28px tick box is a real miss. Partially mitigated: the associated `<label>` measures 383×32 px (module-5) / 610×32 px (module-28) and is clickable, so the *effective* target is much wider — but still only 32 px tall.
- **Recommendation:** Raise the checkbox to 32 px and give `.check-item` a `min-height: 44px` so the whole row (box + label) is a comfortable target. Low-risk CSS change.
- **Suggested command:** `$impeccable polish`

#### [P2] Consent bar overlays readable prose while it is on screen

- **Location:** `C:\twobirds\digital-confidence\css\core.css` lines 536–554; visible in `quality\playwright-results\shot-dark-module-28-emotional-scams.html.png`
- **Category:** Anti-Pattern (PRODUCT.md design principle 4)
- **Impact:** The code comment at line 538 claims the bar *"never covers readable content"* because `body.consent-open` reserves 240 px of bottom padding. The reservation is real and does prevent content being *permanently* unreachable — but at any given scroll position the fixed bar sits over roughly 110 px of prose. The screenshot shows it covering the line *"Tap the answer you think is correct..."* PRODUCT.md principle 4 says *"Nothing hovers over readable content."* The comment overstates the guarantee.
- **Recommendation:** Not a Module 3 blocker and not new to this sprint — but the comment should be corrected to describe what it actually guarantees ("space is reserved so no content is unreachable"), and a non-overlaying inline consent block is worth considering separately.
- **Suggested command:** `$impeccable critique`

#### [P2] ~84 KB of un-deferred JavaScript on every module page, ~57 KB beta-only

- **Location:** `module-5.html` lines 404–413 (identical in module-28)
- **Category:** Performance
- **Impact:** `dcc.js` (17.9 KB) + `module.js` (3.3 KB) + `beta.js` (13.2 KB) + `confidence-quiz.js` (16.5 KB) + `feedback-inflow.js` (5.2 KB) + `feedback-widget.js` (28.0 KB). None carry `defer`. The last four exist for the beta cohort but load for every visitor, including a senior on a tablet on rural DSL. Scripts sit at end-of-body so they do not block first paint, which is why this is P2 and not P1.
- **Recommendation:** Add `defer` to all six, and gate the four beta scripts behind the same cohort check `beta.js` already implements, loaded dynamically. Not required for Module 3.
- **Suggested command:** `$impeccable optimize`

#### [P2] Quiz right/wrong is conveyed by colour plus a semantically unlinked text block

- **Location:** `core.css` lines 779–780 (`.quiz-opt.chosen-right` / `.chosen-wrong`)
- **Category:** Accessibility
- **Impact:** The chosen option is marked correct/incorrect purely by border colour and background fill. The feedback text does say which, so this is not a bare SC 1.4.1 failure — but the feedback is a sibling `<div>` with no programmatic relationship to the button, which is why P1-2 above bites so hard. Contrast of both states is excellent (verified 8.44:1 wrong / 8.73:1 right in dark).
- **Recommendation:** Fixing P1-2 (move focus to feedback, or `aria-describedby` from the chosen button) resolves this as a side effect.
- **Suggested command:** `$impeccable harden`

---

### P3 — Polish

#### [P3] Focus-ring token comment overstates its contrast against the primary button

- **Location:** `C:\twobirds\digital-confidence\css\tokens.css` line 179
- **Category:** Theming (documentation accuracy)
- **Impact:** The comment claims `--focus-ring-color: #8A5A00` is *"3:1+ vs both light surfaces and Trust Blue."* Computed: `#8A5A00` on `#1D4E89` is **1.42:1**, not 3:1+. In practice the ring is *safe*, because `--focus-ring-offset: 2px` places it outside the button against the page background, where it measures **5.63:1** on `#F8F9FB` — verified live, the ring is clearly visible on focused primary buttons. But the claim is wrong, and if anyone ever sets the offset to `0` the ring vanishes on every primary button with no warning.
- **Recommendation:** Correct the comment to state the ring depends on the 2px offset, and note that the offset must not be removed.
- **Suggested command:** `$impeccable document`

#### [P3] PRODUCT.md references `read-aloud.js`, which does not exist

- **Location:** `C:\twobirds\digital-confidence\PRODUCT.md` line 52
- **Category:** Anti-Pattern (documentation drift)
- **Impact:** PRODUCT.md states read-aloud is *"speech-config.js + read-aloud.js wired to all 32 modules."* Neither file exists in `C:\twobirds\digital-confidence\js\`. The **capability is genuinely present and correct** — it lives in `js/dcc.js` lines 206–261, with `speechSynthesis`, voice selection, and Slower/Normal/Faster rate control, and it renders on both audited pages. Only the filenames are stale. Also note the module count has moved from 32 to 40 files.
- **Recommendation:** Update PRODUCT.md line 52 to name `js/dcc.js`.
- **Suggested command:** `$impeccable document`

---

## Patterns & Systemic Issues

1. **The quiz interaction layer is the single weakest surface, and it is shared.** Three of the nine non-P3 findings (P1-2, P1-3, P2-6) all originate in the 18 lines of `js/module.js` that handle quiz answering. Because that file is loaded by every module, fixing it once repairs all 40 existing modules **and** immunises every question the Module 3 sprint writes. This is the highest-leverage fix in the entire audit and should be done *before* content authoring, not after.

2. **A whole component vocabulary was built and never adopted.** `.sim-frame`, `.phone`, `.desktop`, `.inbox`, `.mailrow`, `.choices`, `.feedback`, `.did-you-know`, `.cafc-block`, `.small-wins`, `.confidence-badge`, `.save-prompt`, `.illus` — thirteen component families in `core.css`, **zero** usage across all 40 module files. That is roughly a third of `core.css` (41 KB) shipping to every visitor as dead weight. More importantly, it is a trap: each of these looks like a supported, ready-to-use component to anyone reading the CSS, when in fact none has ever been rendered, audited, or dark-mode-checked in a shipped page. The Module 3 sprint would have walked straight into it via `.phone`.

3. **Semantic level and visual level are conflated in the generator.** The `h2 → h4` skip exists because `h4` happens to be the right *size* for a walkthrough title. The fix is to decouple them (correct level, then style it), and the same discipline should apply to any new block type the sprint introduces.

4. **Documentation drifts faster than the code.** Three separate findings (P2-3 consent comment, P3-1 focus-ring comment, P3-2 read-aloud filenames) are cases where a comment or spec confidently asserts something that measurement contradicts. The code is in better shape than its own documentation claims in one case, and worse in two others. Worth a doc-accuracy pass at some point.

---

## Positive Findings

These are the things worth protecting, and the reason this template is safe to build on.

- **Dark mode is genuinely first-class, exactly as PRODUCT.md demands.** Not a filter, not an afterthought: a full parallel token set, a pre-paint inline script that reads `localStorage` and `prefers-color-scheme` before first paint so there is no flash, and `color-scheme` declared on both themes. Every one of the 24 contrast pairs computed came back **AA or better**, and 21 of 24 came back **AAA**. The most demanding pairs — the ones most products get wrong — are the strongest: warning text on the warning fill is 9.20:1, error text on the error fill is 8.44:1, success on success is 8.73:1. axe found the same number of violations in dark as in light: zero critical, zero serious.
- **Zero hard-coded colour values in either module's HTML.** Grep returned 0 inline styles and 0 hex literals in both files. The token discipline is total.
- **Zero horizontal scroll at every viewport in every theme.** Measured, not assumed: `scrollWidth === clientWidth` in all 12 runs, including 375 px in dark mode.
- **`prefers-reduced-motion` genuinely zeroes the motion tokens.** Read back from the live cascade under a reduced-motion browser context: `0ms / 0ms / 0ms`. Many products declare this rule and then animate with hard-coded durations anyway. This one does not.
- **The floating feedback bubble is confirmed suppressed at runtime.** PRODUCT.md names floating overlays as an anti-reference; `feedback-inflow.js` sets the no-FAB flag before `feedback-widget.js` boots. Probed live on all four page/theme combinations: `.ffw-fab` **absent**. The only `position: fixed` element on the page is the consent bar. This is a rule that was written down *and* held.
- **Zero console errors** on both pages in both themes.
- **Typography meets its own senior-first bar with room to spare:** base 19px (PRODUCT.md floor is 18), line-height 1.7 (floor is 1.6), h1 renders at 38px, and A−/A/A+ scales the base to 16/21/24px. Fonts are self-hosted, SIL OFL, `font-display: swap`.
- **The anxiety-first opening sequence is consistent and correct on both pages:** back-link → category → title → time estimate → *"You are in a safe place. Nothing on this page can harm your device."* → lead. The reassurance arrives before the instruction, which is PRODUCT.md principle 1 executed literally.

### Which pattern should the new content be built on?

**`module-28-emotional-scams.html` is the stronger template. Build on it.**

It is the better structure for scam-pattern teaching, and the gap between the two is not close:

| | module-5 | module-28 |
|---|---|---|
| Named human story opener | ✔ Rose | ✔ Margaret, returned to twice |
| Coach block | ✔ | ✔ |
| **Checkpoint after each concept** | ✘ (one only) | **✔ seven, one per section** |
| Step-by-step scam anatomy | ✘ | ✔ 5-step walkthrough |
| Sourced Canadian statistic | ✘ | ✔ CAFC, $12.4M / 2023 |
| Reporting path with real number | ✘ | ✔ CAFC 1-888-495-8501 |
| **Shame-reduction section** | ✘ | **✔ "It is not your fault"** |
| FAQ / Quick answers | ✘ | ✔ 3 |
| Quiz depth | 3 questions, 3 options | 5 questions, 4 options |
| Checklist items | 5 | 6 |
| "The move is" close | ✔ | ✔ |

module-28's **Checkpoint** rhythm — a short recall prompt in a `.helper-note` after every single concept — is the pedagogical spine that module-5 lacks, and it matches the audience description in PRODUCT.md ("frequently interrupted, may return to the same module multiple times over weeks") better than anything else in the codebase. Its **"It is not your fault"** section is the anxiety-first principle applied to the hardest possible moment, and it is the reason a learner who *has already been scammed by text* will keep reading rather than close the tab. Both are directly transferable to SMS/WhatsApp/Messenger content.

**One thing to borrow from elsewhere:** module-28 describes scams entirely in prose and never shows one. For text-message scams, showing the literal message is the whole lesson — Aaron's own trigger for this backlog item was receiving *"Hope everything is going well."* from an unknown +1 323 number, and that opener only teaches if the learner sees how blank and harmless it looks. Take the `.scam-example` component from `module-2.html:137` for this, complete with its established `<span class="example-label">... (this is NOT real)</span>` convention. It is proven in 7 modules, fully tokenised, and verified in this audit at 13.24:1 light / 14.09:1 dark.

**Net recommendation: module-28's structure + module-2's `.scam-example` for message text. Do not use `.phone` without hardening it first (P1-1).**

---

## Recommended Actions

In priority order:

1. **[P1] `$impeccable harden`** — `js/module.js`: move focus to the revealed feedback and add `role="status"` to `.quiz-fb`; replace `disabled` with `aria-disabled` + click guard. One file, fixes P1-2, P1-3 and P2-6 across all 40 existing modules and prevents the defect being copied into new Module 3 quiz questions. **Do this before authoring content.**
2. **[P1] `$impeccable shape`** — name the target file(s) for the SMS/WhatsApp/Messenger content and state the interpretation in one sentence at sprint start (P1-4). Recommended: module-28 for Hi-Mom / wrong-number befriending / WhatsApp pig-butchering; module-5 for fake-delivery and fake-bank-alert texts. Consider the title change the backlog item already proposes.
3. **[P1] `$impeccable harden`** — decide the message-depiction component (P1-1). Use `.scam-example`; or, if a phone frame is judged necessary, render `.phone` and run axe + a dark-mode screenshot on it *before* writing content into it.
4. **[P2] `$impeccable harden`** — change `.walkthrough h4` to `h3` in the generator template with a matching font-size rule, clearing the only axe violation on the page (P2-1).
5. **[P2] `$impeccable polish`** — raise the progress checkbox to 32 px and give `.check-item` `min-height: 44px` (P2-2).
6. **[P2] `$impeccable optimize`** — add `defer` to the six module scripts and cohort-gate the four beta scripts (P2-4). Safely deferrable past this sprint.
7. **[P3] `$impeccable document`** — correct the focus-ring token comment and the PRODUCT.md read-aloud filenames (P3-1, P3-2).
8. **[P2] `$impeccable polish`** — final pass after the above.

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `$impeccable audit` after fixes to see your score improve.

---

## DESIGN GATE verdict

**GATE CLEARED.** No P0 blockers. The template is accessible (0 critical/serious axe violations in light and dark at three viewports), fully tokenised, responsive with no overflow at any tested width, and free of AI-slop anti-patterns. The four P1 findings are each addressable inside the Module 3 content-expansion sprint — two of them are a single-file JavaScript edit, one is a component choice, and one is a naming decision that must be stated before writing begins.

**Condition on the gate:** items 1–3 in Recommended Actions are **in-sprint requirements**, not follow-ups. P1-2 and P1-3 in particular must be fixed *before* new quiz questions are authored, otherwise the sprint multiplies an existing WCAG AA failure across new content instead of inheriting it once.
