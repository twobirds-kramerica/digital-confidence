# For Families — section-footer redesign (PROPOSAL, awaiting Aaron sign-off)

**Date:** 2026-07-21
**File changed:** `C:\twobirds\digital-confidence\for-families.html` (only — scoped `<style>` block, no shared CSS touched)
**Status:** PROPOSAL — committed to `main` so Aaron can preview, but DCC design gate = his sign-off required before this is "done."
**Design language:** warm-approachable-senior (DCC house language) — large text, AAA contrast, generous spacing, dignified, dotted-line calm.

---

## The page
Target was `for-families.html` (repo root, live v2). `family.html` and `family-setup.html`
are just redirect stubs to `classic/`. The "oval cream-coloured button" Aaron flagged
is the `.ttc` class in `css/core.css`: `background: --color-accent-light` (cream),
`border-radius: --radius-pill` (oval), `align-self: flex-start` (left-justified) — a pill
that *looks* like a CTA but holds *information* (time / certificate). Exactly the crammed
info-in-a-CTA-shape problem.

`.ttc` is shared by `index.html` and `fr/index.html`, so I did **not** edit it in the shared
stylesheet (that would restyle other pages + collide with the concurrent index/nav work).
Instead all new footer styling lives in a page-local `<style>` block in `for-families.html`.
Surgical: only the six lesson-card footers changed.

## Research pattern applied
Course/lesson cards (Coursera, Duolingo, Khan Academy, and general card-UI guidance) keep a
consistent three-part footer, visually ranked:
1. **Metadata** (time estimate, difficulty) as *quiet* captions — muted colour, small, never
   a button. It is reference info, not a decision.
2. **Reward / outcome** (badge, certificate, streak) as its own quiet line — motivating but
   still secondary to the action.
3. **One primary CTA** as the only button-shaped, high-contrast element, so there is exactly
   one obvious thing to click per card.
The key rule: button shape is reserved for the action; information is downgraded to captions.
That is precisely the info-vs-action separation Aaron asked for.
Sources: Justinmind card-UI fundamentals, designmodo CTA-button UX, BadgeOS/Certifier course-badge guidance.

## What changed (before -> after)

**Before** (every card, both grids):
```html
<span class="ttc"><span aria-hidden="true">⏱</span> 10 minutes to feel in control</span>
```
and the one certificate case:
```html
<span class="ttc"><span aria-hidden="true">⏱</span> 30–40 minutes each, certificate at 85%</span>
```
Cream oval pill, left-justified, information crammed into a CTA shape; messaging
inconsistent (some cards time, one card time+certificate, one card "Sit-together lessons").

**After** (consistent structure on all six cards):
```html
<div class="card-foot">
  <ul class="card-meta">
    <li><span class="meta-ico" aria-hidden="true">⏱</span> About 10 minutes</li>
    <!-- reward line ONLY where a badge exists: -->
    <li><span class="meta-ico" aria-hidden="true">🏅</span> Earn a completion badge at 85%</li>
  </ul>
  <a class="btn btn-primary card-cta" href="modules/module-1.html">Open lesson</a>
</div>
```

Separation achieved:
- **Time = its own quiet INFO caption**, not a button. Muted grey (`--color-text-light`,
  #435463 = 7.4:1 AAA — still senior-legible, just recessive), clock icon, consistent
  **"About X minutes"** wording on every card. A dotted top rule (`1px dotted`) gently
  fences the footer from the card body (the "dotted-line treatment" Aaron mentioned).
- **Completion reward = its own INFO line**, medal icon, **renamed "certificate" -> "completion
  badge"** per Aaron's lean: "Earn a completion badge at 85%." Appears only on the parent-courses
  card (the only card that awards one) — no longer mashed onto the time line.
- **CTA = the only button-shaped element**, reusing the site's existing `.btn .btn-primary`
  (trust-blue, 56px tap target). Aligned **bottom-right on desktop, full-width on mobile**
  (≤560px) — never bottom-left. One clear action per card: Open lesson / Start practice /
  Open lesson / See the modules / View the courses / See kids lessons.
- `z-index:1` on the CTA so it sits above the existing whole-card click overlay and stays
  independently clickable/hoverable.

Per-card time wording, now consistent:
- Escape Hatch -> "About 10 minutes" (was "10 minutes to feel in control")
- Spot the Scam -> "About 5 minutes" (was "5 minutes to a first win")
- Online banking -> "About 15 minutes" (was "15 minutes to banking confidence")
- DCC Youth -> "About 15 minutes each"
- Parent courses -> "About 30–40 minutes each" + "Earn a completion badge at 85%"
- DCC Kids -> "At your own pace, together" (caregiver-led, no fixed minutes; kept clock icon for placement consistency)

## FLAG for Aaron's decision
1. **"completion badge" vs "certificate."** I applied your lean (badge) in the footer. But the
   underlying product genuinely issues a *printable certificate at 85%* (youth course pages),
   and the card body previously said *"Two certificate courses"* — I softened that to
   *"Two courses"* to avoid a badge/certificate term clash on the same card. If you'd rather
   keep "certificate" everywhere, this reverts in one line. Your call.

## Screenshots (`C:\twobirds\digital-confidence\quality\playwright-results\`)
- `forfam-desktop-grid1.png` — first-lesson cards, desktop 1280px
- `forfam-desktop-grid2.png` — youth/parent/kids cards, desktop 1280px
- `forfam-mobile-grid1.png` — first-lesson cards, mobile 375px (full-width CTA)
- `forfam-mobile-grid2.png` — youth/parent/kids cards, mobile 375px (badge line + full-width CTA)
- `forfam-desktop-full.png` — whole page, desktop

## QA/QC/UAT
- QA: rendered at 1280px + 375px via playwright-cli, all six CTAs render + separate from info; no console-blocking issues.
- QC: warm-approachable-senior tokens only; Canadian English; AAA-contrast captions; existing `.btn` component reused; surgical (one file).
- UAT: info now clearly reference, action now clearly the button — Brenda's-lens: one obvious thing to tap per card, big target on phone.
- Awaiting Aaron sign-off before "done" (DCC design gate).
