# Review note — S-DCC-BETA-FEEDBACK-SURFACE-001 (branch `feat/beta-feedback-surface`)

**Date:** 2026-08-05
**Status:** BUILT + QA-PASSED on the branch. NOT merged to `main`. DESIGN GATE awaits Aaron.
**Branch:** `feat/beta-feedback-surface` (pushed to origin; PR can be opened from GitHub)

## What this sprint found first (important)

The core of this sprint was **already built and shipped to `main` on 2026-07-27** by a prior session and never stamped in the sprint queue:

- Commit `2f4067b` "feat(dcc-beta): in-flow feedback on all 39 module pages" added `js/feedback-inflow.js`, which sets `window.FFW_NO_FAB` (no floating bubble, per the PRODUCT.md anti-reference) and renders the full-width "Tell us what you think" block at the end of every one of the 39 `modules/*.html` pages, plus a "Give feedback" footer link on those pages.
- So the live site already has the in-flow block on every Adult module. Nothing about that was rebuilt.

## What was still missing (the gaps this branch closes)

1. **Success copy.** The widget said "Feedback sent. Thank you." — the spec requires the warm, certain **"Thank you, we got it."** Fixed in `feedback-widget.js`.
2. **Anxiety-first language.** Two user-facing fallback strings said "Server error." / "Network error." — "error" is banned user-facing wording for this audience. Both now read: *"We could not send your note just now. It is saved safely on this device, so nothing is lost."*
3. **Optional name.** The compose panel had **no name field at all**. Added **"Your Name (Optional)"**, placeholder "Type here...", never pre-populated, never required, placed after the Send button per the site's feedback-form field-order convention. The name rides in the transcript as `[Name: X]` and as a `visitorName` field in the bundle (the Worker stores bundles as-is; backend untouched).
4. **Paired-action order.** Send was LEFT, Discard RIGHT — reversed to Discard-left / Send-right per the 2026-07-30 paired-action placement rule.
5. **Site-wide footer link.** The footer "Give feedback" link only existed on pages that already loaded the scripts. Added a **footer-only mode** to `js/feedback-inflow.js` (`data-footer-only` attribute: footer link + no-FAB flag, no block) and rolled it out to the 16 remaining live pages: `about, certificate, digital-literacy-101, disclaimer, faq, final-quiz, for-families, for-libraries, glossary, privacy, support-directory, terms` + `fr/about, fr/glossaire, fr/privacy, fr/terms`. (The other root pages without it — resources, accessibility, family, etc. — are redirect stubs to `classic/`, not real pages.)

## What Aaron needs to look at to clear the gate

1. **The compose panel** on any module page (branch build): open the "Tell us what you think" block → check the new "Your Name (Optional)" field, the Discard/Send order, and the "Thank you, we got it." success state. Screenshots: `C:\twobirds\digital-confidence\quality\feedback-surface-2026-08-05\` (4 images).
2. **The footer link** on About / FAQ / Privacy — is a plain "Give feedback" list item in the footer the right treatment for these pages?
3. **Name field placement** — it follows the site convention "textarea → submit → Your Name (Optional)" from CLAUDE.md's form standards, which puts the name BELOW the Send button. If Aaron prefers name above the buttons, it is a two-line change.
4. **Real-device check** — not done (no physical device available to this session; see limitations). One send from Aaron's iPad on the branch preview (or post-merge) is the honest close-out for the "verified on a real device" requirement.

## QA evidence (all local, branch build, served over HTTP)

- **Invariant sweep, every page:** 39/39 module pages have the block + footer link + no floating FAB; 16/16 footer-only pages have the footer link, no block, no FAB; index/scam-defence-helper/fr-index unchanged (block + footer link, no FAB). Zero failures.
- **Success state rendered, not assumed:** the real fetch path was exercised against a local `/submit` stub returning `{"ok":true}` — status renders "Thank you, we got it." in the ok style, panel closes cleanly. (The live Worker only accepts allow-listed origins, so localhost cannot POST to production by design; the live `/submit` path itself was verified end-to-end on 2026-08-01 in S-DCC-FEEDBACK-WORKER-VENDOR-001 and is untouched by this branch.)
- **Name delivery verified:** captured POST body shows `transcript: "[Name: Brenda] ..."` and `visitorName: "Brenda"`.
- **Width x zoom matrix (VISUAL QA rule):** 5 widths (1920/1366/1024/768/375) x 4 zooms (100/125/150/200%) + the WCAG SC 1.4.10 320px floor — block children never overlap, block never exceeds the viewport, compose panel always fits horizontally, name field + Send always rendered. `quality/overlap-check.py` (the repo's own gate): 0 overlaps on module-7 (header row AND `.dcc-fb-block > *`) and about.html.
- **axe-core** (vendored `hal-stack/verification/axe-core.min.js`; the `?qa=true` panel named in the sprint was deleted in the v2 cutover and no longer exists): **0 violations scoped to the feedback surfaces** (block, footer, open panel) on module-7, about, faq. Pre-existing page-level findings, NOT from this sprint: `aria-prohibited-attr` (serious) on `.ca-badge` (header Canadian badge, site-wide), `heading-order` (moderate) on 3 module-7 walkthrough h4s.
- Two matrix warns, both pre-existing and present with the feedback block hidden: page hscroll at 375px@150/200% under synthetic `body.style.zoom` (an emulation artifact — real Ctrl-+ zoom shrinks the CSS viewport and fires the responsive breakpoints; synthetic zoom does not).

## Known limitations / out of scope

- **Real device:** NOT tested on a real iPad/iPhone. Stated plainly per the completeness rule. Everything above is headless Chromium.
- **Widget language:** `feedback-widget.js` panel copy (including "Your Name (Optional)" and "Thank you, we got it.") is English-only, also on FR pages. This predates this sprint (the FR module pages already load the EN widget). The in-flow block and footer link ARE localized (feedback-inflow.js). French widget copy is a candidate follow-up.
- **Widget typography:** the widget uses 15px base font, below DCC's 18px minimum. Pre-existing, shipped, and a restyle is a design decision — flagged for Aaron rather than changed surgically here.
- **`classic/` legacy pages:** `classic/module-27-inbox-spam.html` and `classic/module-29-slow-down-before-you-buy.html` load an older `classic/js/feedback-widget.js` that does not support the no-FAB flag — the floating bubble anti-pattern is still live on those two legacy pages (reachable via root redirect stubs). Left untouched (frozen legacy set); needs an Aaron decision: retire, or flag-off.
- **D1 `feedback` table retirement + ADR** — explicitly out of scope (item 3 of the predecessor sprint), untouched.
