# DCC Design System — Warm Hearth
*Last updated: 2026-06-17 · Supersedes the April 2026 legacy-blue edition*

This is the production reference for building DCC modules and pages. All decisions about colour, type, layout, component structure, and voice are governed here. Read this before touching any HTML.

---

## 0. Reference Research

Three design-system-level references informed this update, chosen for their accessible-government / senior-focused positioning:

### GOV.UK Design System (`design-system.service.gov.uk`)
The gold standard for accessible UK government digital services. Key patterns adopted for DCC:
- **Single-question-per-page focus** — one primary task per screen, navigation recedes
- **Error placement** — always above the component, always starts with "Error:" (AA requirement)
- **Progressive enhancement** — HTML works alone; CSS and JS are additive
- **Focus visibility** — 3 px solid, high-contrast ring, never obscured by sticky UI

### Canada.ca Style Guide (`design.canada.ca/style-guide/`)
The Government of Canada's bilingual content and interaction standard. Adopted for DCC:
- **Short sentences** — 15–20 words maximum; one idea per sentence
- **Left-aligned content always** — justified text creates uneven spacing that harms low-literacy and screen-magnifier users
- **Bilingual parity** — when French content is unavailable, note "(English only)" explicitly
- **Scan structure** — heading or visual break every ~200 words; list anything ≥ 2 parallel items

### NHS Digital Service Manual (`service-manual.nhs.uk`)
Health-audience digital service design. Adopted for DCC:
- **19 px desktop body text** — matches our `--font-size-base: 19px` ✓
- **No italics, no justified text** — avoid both; both harm screen magnifier and dyslexia users
- **Consistent help position** — read-aloud / help affordance must be in the same position on every module page (maps to WCAG 2.2 SC 3.2.6)
- **Lead paragraphs at 26 px** — first paragraph of any article/module at larger size reduces initial reading burden

---

## 1. Token Reference

All values live in `css/tokens.css`. Never hardcode a hex, px, or rem outside a token. The table below is the decision guide for WHICH token to use — not a duplicate of the token file.

### Colour Usage Rules

| Token | Name in CSS | Use for |
|---|---|---|
| `--color-primary` | warm teal `#2A7B6F` | Nav background, primary headings (h1/h2 on light bg), icon fills, active states |
| `--color-accent` | burnt orange `#E8842C` | All CTAs (primary buttons), focus ring, progress fills, "Start here" emphasis |
| `--color-text` | near-black `#1A1A2E` | All body copy, labels, quiz question text |
| `--color-text-light` | medium grey `#50505F` | Meta text, captions, helper text — never for primary content |
| `--color-bg` | warm white `#FAFAF8` | Page background |
| `--color-surface` | warm off-white `#F5F2ED` | Cards, modals, callout boxes |
| `--color-surface-alt` | pale warm `#FFF0E0` | Module topic tags, light-accent fills |
| `--color-surface-primary` | teal tint `#E8F5F0` | Confidence-check blocks, success fills |
| `--color-error` | dark red `#B71C1C` | Error states, warning block borders (never as background) |
| `--color-warning-light` | `#FFF8E1` | Warning block background |
| `--color-warning-deep` | `#7A5800` | Warning block text-on-light (7:1 AAA) |
| `--color-success-light` | `#E8F5E9` | Success state backgrounds |
| `--color-success-deep` | `#1B5E20` | Success text-on-light |

**Do not use `--color-accent` (#E8842C) as text colour on white** — it is 3.1:1 against #FAFAF8 (AA large only). Use `--color-accent-deep` (`#8A450C`) for orange text.

### Typography Tokens in Practice

```
Body:     --font-body (Merriweather, serif) at --font-size-base (19px), --line-height-body (1.8)
Headings: --font-heading (Source Sans 3, sans-serif), weights --font-weight-semibold or --font-weight-bold
Code:     --font-mono
```

**Text size toggle** — managed by JS adding `.text-size-s` / `.text-size-m` / `.text-size-l` to `<html>`:
- S → 16px (minimum allowed; never go below)
- M → 20px (default for many users — design for this)
- L → 24px (common for low-vision seniors)

All layouts must remain usable at size L with no horizontal scroll or content overlap.

---

## 2. Heading Hierarchy — The Rules

Every module page must follow this structure exactly:

```
h1 — Module title (font-heading, semibold, --color-primary, --font-size-h1)
h2 — Section title within module (font-heading, semibold, --color-primary, --font-size-h2)
h3 — Subsection / named callout titles (font-heading, semibold, --color-text, --font-size-h3)
h4 — Minor labels inside callouts only (font-heading, medium, --color-text, --font-size-h4)
```

**Never skip a level.** Never use h1 twice on a page. Never use heading for emphasis — use `<strong>` instead.

---

## 3. Spacing Scale

Use `--space-N` tokens. Do not introduce arbitrary px values.

| Token | Value | Use for |
|---|---|---|
| `--space-2` | 8px | Gap between icon and label; list item padding |
| `--space-3` | 12px | Inner padding on small tags/chips |
| `--space-4` | 16px | Gap between form fields |
| `--space-6` | 24px | Section padding, card inner padding |
| `--space-8` | 32px | Gap between sections on mobile |
| `--space-12` | 48px | Between major content blocks |
| `--space-16` | 64px | Top/bottom page padding |

---

## 4. Module Page Structure

This is the canonical template for every adult module page. "Generic" output happens when this structure is not followed. Build every module against this skeleton.

```
┌──────────────────────────────────────────────┐
│  <nav class="site-nav">                       │
│    Logo · Home link · Text-size toggle        │
│    Read-aloud button (SAME POSITION, SC 3.2.6)│
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  <main>                                       │
│  ┌──────────────────────────────────────────┐│
│  │  .module-header (--color-surface-primary) ││
│  │  Topic tag pill (--color-surface-alt)     ││
│  │  h1 (--color-primary)                    ││
│  │  Lead paragraph (.lead, 22px)             ││
│  │  Time estimate + difficulty badge         ││
│  └──────────────────────────────────────────┘│
│                                               │
│  "Nothing on this page can harm your device." │
│  (reassurance line — MANDATORY on every page) │
│                                               │
│  CONTENT SECTIONS (repeat as needed):         │
│  ┌──────────────────────────────────────────┐│
│  │  h2 + prose (max 72ch wide)              ││
│  │  Optional: story-block / tip-block /      ││
│  │  warning-block / confidence-check         ││
│  └──────────────────────────────────────────┘│
│                                               │
│  QUIZ (if present):                           │
│  ┌──────────────────────────────────────────┐│
│  │  .quiz-block                              ││
│  │  Radio or checkbox options (≥56px target) ││
│  │  Submit → immediate inline feedback       ││
│  └──────────────────────────────────────────┘│
│                                               │
│  ┌──────────────────────────────────────────┐│
│  │  Module nav: ← Prev  ·  Mark Complete  · Next → ││
│  │  (button bar, full-width on mobile)       ││
│  └──────────────────────────────────────────┘│
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  <footer>                                     │
│  Privacy · Copyright · EN/FR toggle           │
└──────────────────────────────────────────────┘
```

**The reassurance line** — `<p class="reassurance">Nothing on this page can harm your device.</p>` — is mandatory, verbatim, immediately after the module header on every adult module page. It is not optional copy.

---

## 5. Core Components

### 5.1 Buttons

```html
<!-- Primary CTA: next step, start, submit -->
<button class="btn btn-primary">Start Module</button>

<!-- Secondary: go back, cancel -->
<button class="btn btn-secondary">Back</button>

<!-- Completion: mark done -->
<button class="btn btn-success">Mark as Complete ✓</button>
```

Rules:
- Minimum height: `--tap-target` (56px). Never smaller.
- Always use an action verb ("Save Changes", "Try Again", "Get Started")
- Primary = orange (`--color-accent`). Never red for primary.
- Focus ring = 3px solid `--color-accent` with 2px offset (WCAG 2.2 SC 2.4.13 ✓)

### 5.2 Content Blocks

These are the six DCC content patterns. All use `--color-surface` as background unless noted.

```html
<!-- 1. Story block — real scenario, opens empathy -->
<div class="story-block">
  <span class="story-label">📖 Margaret's Story</span>
  <p>Margaret received an email saying her Apple ID was locked…</p>
</div>

<!-- 2. Warning block — scam alert, danger -->
<div class="warning-block">
  <!-- bg: --color-warning-light; border-left: 4px --color-warning -->
  <span class="warning-label">⚠️ Watch Out</span>
  <p>Never share your verification code with anyone who calls you.</p>
</div>

<!-- 3. Tip block — helpful hint -->
<div class="tip-block">
  <!-- bg: --color-surface-primary; border-left: 4px --color-primary -->
  <span class="tip-label">💡 Helpful Tip</span>
  <p>You can always check your Wi-Fi connection in Settings.</p>
</div>

<!-- 4. Confidence check — reassurance moment -->
<div class="confidence-check">
  <!-- bg: --color-success-light -->
  <span class="check-icon">✅</span>
  <p class="check-text">You're doing great. This is one of the most important things you can learn.</p>
</div>

<!-- 5. Three-Second Rule box — decision framework -->
<div class="three-second-rule-box">
  <!-- bg: --color-surface-alt; border: 2px solid --color-accent -->
  <h4>The Three-Second Rule</h4>
  <p>Before clicking anything unexpected: Stop. Think. Check.</p>
</div>

<!-- 6. Success state — exercise completion -->
<div class="success-state-box">
  <!-- bg: --color-success-light -->
  <span class="success-icon">🎉</span>
  <p><strong>Well done!</strong> You've completed this exercise.</p>
</div>
```

**Usage cadence per module section:** one story block + one tip block + one confidence check is the standard triplet. Warning blocks on security/scam sections only. Do not stack two warning blocks back-to-back — it induces anxiety.

### 5.3 Lead Paragraph

```html
<p class="lead">In this module, you will learn how to recognise a phishing email, 
check if a website is safe, and what to do if something goes wrong.</p>
```

CSS: `font-size: clamp(20px, 1.4vw + 16px, 24px); line-height: 1.6; color: --color-text; font-weight: --font-weight-regular;`

Used once, immediately below h1. Tells the learner exactly what they will get before they start.

### 5.4 Module Topic Tag

```html
<span class="topic-tag">Online Safety</span>
```

CSS: `background: --color-surface-alt; color: --color-accent-deep; border-radius: --radius-pill; padding: --space-2 --space-4; font-size: --font-size-sm; font-weight: --font-weight-semibold;`

Always above h1, always one tag per module (matches the module's top-level category).

### 5.5 Quiz Block

```html
<div class="quiz-block" role="group" aria-labelledby="q1-label">
  <p id="q1-label" class="quiz-question">Which of these is a sign of a phishing email?</p>
  <label class="quiz-option">
    <input type="radio" name="q1" value="a">
    <span>It uses your first name</span>
  </label>
  <label class="quiz-option">
    <input type="radio" name="q1" value="b">
    <span>It asks you to click a link urgently</span>
  </label>
  <button class="btn btn-primary" type="button" onclick="checkAnswer()">Check Answer</button>
  <div class="quiz-feedback" aria-live="polite" hidden></div>
</div>
```

Rules:
- `aria-live="polite"` on feedback div (screen reader announcement on answer reveal)
- Radio/checkbox labels are full-width click targets (≥56px)
- Correct feedback: `--color-success-light` bg, `--color-success-deep` text, ✓ icon
- Incorrect feedback: `--color-warning-light` bg, `--color-warning-deep` text, plain-language explanation ("That's not quite right — phishing emails often create a sense of urgency to make you act quickly.")

### 5.6 Module Navigation Bar

```html
<nav class="module-nav" aria-label="Module navigation">
  <a href="module-X.html" class="btn btn-secondary">← Previous</a>
  <button class="btn btn-success" onclick="markComplete()">Mark as Complete</button>
  <a href="module-X.html" class="btn btn-primary">Next →</a>
</nav>
```

Full-width on mobile, row on desktop. Always at the bottom of `<main>`, before `<footer>`. "Mark as Complete" is the primary action on completion — styled `btn-success`.

---

## 6. Layout Principles

- **Content max-width:** `--content-max` (72ch) for prose. Prevents line lengths that tire senior readers.
- **Container max:** `--container-max` (1200px) for the outer shell.
- **Never centre-align prose.** Left-align only (aids screen magnifier users — NHS pattern).
- **Never justify text.** Uneven word spacing harms dyslexia and low-literacy readers.
- **No hover-only interactions.** Every hover state must have an equivalent tap state.
- **Sticky nav + focus:** The nav bar height is `--nav-height` (64px). Set `scroll-padding-top: 80px` on `:root` or `html` so that keyboard-focused elements below the nav are never obscured (WCAG 2.2 SC 2.4.11).

```css
/* Required on every module page — add to <style> or main.css */
html { scroll-padding-top: 80px; }
```

---

## 7. WCAG 2.2 AA Compliance Notes

AODA Ontario now requires WCAG 2.2 AA by 2027. DCC should reach 2.2 AA on all new modules now. Legacy modules should be updated as they are revised.

### New in 2.2 vs 2.1 — what matters for DCC

| SC | Criterion | DCC implication | Status |
|---|---|---|---|
| 2.4.11 | Focus Not Obscured (Min.) | Sticky nav must not fully hide focused element. `scroll-padding-top: 80px` on `html`. | **Must add to all module pages** |
| 2.4.13 | Focus Appearance | Focus ring ≥ 2px solid, contrast ≥ 3:1 vs unfocused state. Our 3px orange ring on white bg is 3.1:1 — borderline. Confirm against --color-surface pages. | **Verify on dark-bg modules** |
| 2.5.7 | Dragging Movements | Any drag UI must have a pointer alternative. DCC has no drag UI. | N/A |
| 2.5.8 | Target Size (Min.) | Targets ≥ 24×24 CSS px. Our --tap-target (56px) exceeds this. | ✓ Already compliant |
| 3.2.6 | Consistent Help | Help mechanism (read-aloud button) must be in the same position on every page. | **Audit: ensure read-aloud position is consistent across all 29 modules** |
| 3.3.7 | Redundant Entry | Previously entered info must be re-presented or auto-filled. DCC has no multi-step forms with repeated entry. | N/A |
| 3.3.8 | Accessible Authentication | No cognitive-function tests for login. DCC has no login. | N/A ✓ |

### Surviving criteria from WCAG 2.1 that seniors most need

| Criterion | DCC rule |
|---|---|
| 1.4.3 Contrast (Min.) | 4.5:1 for body text, 3:1 for large text (≥18pt / 14pt bold). Always check both light and dark mode. |
| 1.4.4 Resize Text | All content functional at 200% zoom, no horizontal scroll. Tested at text-size-l. |
| 1.4.10 Reflow | Content reflows at 320px viewport width without horizontal scroll. |
| 1.4.11 Non-text Contrast | UI components and states at 3:1 vs adjacent colour. |
| 1.4.12 Text Spacing | No loss of content when letter-spacing +0.12em, word-spacing +0.16em, line-height 1.5×, paragraph spacing 2×. |
| 2.4.7 Focus Visible | Focus indicator always visible — never `outline: none` without a replacement. |

---

## 8. Voice & Microcopy Rules

These come from PRODUCT.md + Canada.ca style guide + DCC brand voice.

- **Sentences: 15–20 words maximum.** One idea per sentence.
- **No italics.** Bold only for key terms or critical warnings. Limit to 3 per page section.
- **Action verbs on every button.** Never: "Submit", "OK", "Continue". Always: "Check My Answer", "Go Back", "Start the Module".
- **Reassurance before instruction.** Lead with "You're safe" before "Now do this."
- **First person.** "You will learn…" not "Students will learn…"
- **Canadian English.** centre, colour, programme, recognise, behaviour, favour. Never -ize where -ise is Canadian standard (recognise, not recognize). Exception: proper names.
- **Error messages** follow GOV.UK pattern: "Error: [Plain description of what went wrong and what to do]." Always above the input.
- **Bilingual:** When French translation is unavailable, add `(English only)` inline. Never hide the link; always expose it with the notation.

---

## 9. Build Checklist — Per Module

Before pushing any new or revised module page:

**Structure**
- [ ] Uses the Module Page Structure from §4 (header → reassurance → content → quiz → module-nav)
- [ ] h1 → h2 → h3 hierarchy, no skips, no double h1
- [ ] Topic tag above h1
- [ ] Lead paragraph immediately below h1
- [ ] Reassurance line present and verbatim ("Nothing on this page can harm your device.")
- [ ] Module nav at bottom with ← Prev / Complete / Next →

**Colour & Tokens**
- [ ] No hardcoded hex or px values — all reference CSS custom properties
- [ ] Orange (`--color-accent`) used only for CTAs, focus ring, progress — not as text on white
- [ ] Warning blocks use `--color-warning-light` bg + `--color-warning-deep` text
- [ ] Success blocks use `--color-success-light` bg + `--color-success-deep` text

**Typography**
- [ ] Body: Merriweather 19px, line-height 1.8
- [ ] No italics, no justified text, no centre-aligned prose
- [ ] Text size toggle (A−/A/A+) wired and functional
- [ ] All text legible at text-size-l (24px base)

**Accessibility**
- [ ] `scroll-padding-top: 80px` on html (WCAG 2.2 SC 2.4.11)
- [ ] Read-aloud button in same position as all other modules (WCAG 2.2 SC 3.2.6)
- [ ] All touch targets ≥ 56px (WCAG 2.2 SC 2.5.8 minimum is 24px — we target higher)
- [ ] Focus ring visible: 3px solid `--color-accent`, 2px offset
- [ ] Quiz feedback uses `aria-live="polite"`
- [ ] Skip link present (`<a class="skip-link" href="#main">Skip to main content</a>`)
- [ ] ARIA labels on icon-only interactive elements
- [ ] Dark mode (`data-theme="dark"`) tested — all text passes 4.5:1
- [ ] 200% zoom tested — no overflow, no hidden content
- [ ] `prefers-reduced-motion` respected (tokens.css zeroes durations — no extra code needed)
- [ ] Dyslexic font tested (`body.dyslexic-font`)

**Content**
- [ ] Sentences ≤ 20 words
- [ ] Canadian English throughout (no -ize endings, British spelling where applicable)
- [ ] No italics in body copy
- [ ] Error messages: "Error: [description]" above the input
- [ ] Buttons use action verbs

---

## 10. Anti-patterns — Never Do These

1. **Don't hardcode `#2A7B6F`** — use `--color-primary`. Token changes propagate; hardcodes break everything.
2. **Don't create new button classes** — `.btn` + one modifier. Full stop.
3. **Don't stack two warning blocks back-to-back** — anxiety response; use a single warning that covers both concerns.
4. **Don't omit the reassurance line** — it is the single highest-impact anxiety-reducer in the whole module.
5. **Don't use orange (`--color-accent`) for body text** — 3.1:1 contrast ratio; use `--color-accent-deep` (#8A450C).
6. **Don't centre-align prose** — breaks screen magnifier experience.
7. **Don't justify text** — creates uneven spacing that harms dyslexia users.
8. **Don't use italics** — harms dyslexia and screen-magnifier users.
9. **Don't make interactive elements smaller than `--tap-target` (56px)**.
10. **Don't add hover-only interactions** — must work on touch.
11. **Don't use `outline: none` on focus** — always replace with visible ring.
12. **Don't introduce new CSS variable names** — use existing tokens.
13. **Don't auto-play audio or video**.
14. **Don't float overlays over readable content** (help buttons, feedback bubbles) — keep in designated zones.
15. **Don't use red for primary actions** — red is `--color-error` only.

---

## 11. File Map

| File | Purpose |
|---|---|
| `css/tokens.css` | Single source of truth for all design tokens (colour, type, spacing, shadow, radius, motion) |
| `css/tokens-dark.css` | Dark mode token overrides |
| `css/tokens-high-contrast.css` | High-contrast token overrides |
| `css/components.css` | Component structure (bones) — no colour hardcodes |
| `css/fonts.css` | Self-hosted Merriweather + Source Sans 3 (SIL OFL licensed — `fonts/LICENSE-OFL.txt`) |
| `styleguide/index.html` | Live component showcase (canonical visual reference) |
| `styleguide/COMPETITIVE-AUDIT.md` | Five content-competitor platforms reviewed April 2026 |
| `DESIGN-SYSTEM.md` | This file — decision guide for building against tokens |
| `PRODUCT.md` | Audience, purpose, brand voice, design principles |
