# Digital Confidence Centre — Design System
*Last updated: 2026-04-19*

This document covers the DCC design system. Two parallel systems currently coexist during the Warm Hearth transition:

1. **Legacy (`css/main.css`) — blue accent, Inter font.** Still in production on all module pages. Do not modify in design-system work; it will be retired during the DCC makeover sprint.
2. **Warm Hearth (`css/tokens.css` + `css/components.css` + `css/fonts.css`) — teal / burnt orange, Merriweather + Source Sans 3.** Adopted 2026-04-19 after a 65.5% weighted org vote for Option A "Warm Hearth". All new components build against this system.

Single source of truth going forward is the token files and the living style guide at `styleguide/index.html`. Swap themes by loading `tokens-dark.css` or `tokens-high-contrast.css` after `tokens.css`.

- **Tokens:** `css/tokens.css`, `css/tokens-dark.css`, `css/tokens-high-contrast.css`, `css/tokens-alt.css`
- **Fonts:** `css/fonts.css` (self-hosted, SIL OFL — see `fonts/LICENSE-OFL.txt`)
- **Components:** `css/components.css` + live demos in `components/warm-hearth/SHOWCASE.html`
- **Style guide:** `styleguide/index.html` (canonical), `styleguide/motion.html` (interaction spec)
- **Governance:** `styleguide/MAINTENANCE.md`
- **Competitive context:** `styleguide/COMPETITIVE-AUDIT.md`

The sections below describe the legacy system, preserved for reference until the makeover sprint completes.

---

## Core Principles

### 1. Grandma-Friendly First
- Touch targets: `--tap-target: 60px` (exceeds WCAG AAA 44px requirement)
- Body font: `--font-size-base: 18px` minimum
- Line height: `--line-height: 1.6` minimum
- Max content width: `--max-width: 900px`

### 2. Accessibility — Non-Negotiable
- WCAG 2.1 AA minimum (AODA compliant — Ontario law)
- All interactive elements keyboard accessible
- Focus indicators always visible (3px outline + offset)
- Skip link on every page (`.skip-link`)
- ARIA labels on all interactive elements without visible text labels

### 3. Senior-Specific Constraints
- High zoom: all UI tested at 150–200% without overflow
- Dark mode always available (`data-theme="dark"`)
- Dyslexic font option (`body.dyslexic-font`)
- No auto-playing media
- No hover-only interactions

### 4. Language
- Canadian English in all visible text (centre, colour, programme, organisation)
- CSS property names stay standard (color, border-radius, etc.)

---

## CSS Custom Properties

All variables defined in `:root`. Override in `[data-theme="dark"]`.

### Colours

```css
/* Backgrounds */
--bg-primary: #FAFAF8         /* Page background */
--bg-secondary: #F8F9FA       /* Sidebar, alternate sections */
--bg-card: #FFFFFF            /* Cards, elevated surfaces */
--bg-highlight: #EBF5FB       /* Light blue highlight */
--bg-success: #E8F8F5         /* Success states */
--bg-warning: #FEF9E7         /* Warning/caution */
--bg-danger: #FDEDEC          /* Error/danger */

/* Text */
--text-primary: #2C3E50       /* Body text */
--text-secondary: #5D6D7E     /* Supporting text */
--text-muted: #85929E         /* Disabled, metadata */

/* Accents */
--accent-primary: #3498DB     /* Primary blue — trust, calm */
--accent-hover: #2980B9       /* Primary hover state */
--accent-success: #27AE60     /* Positive actions */
--accent-warning: #F39C12     /* Caution */
--accent-danger: #E74C3C      /* Errors, destructive */

/* Borders */
--border-color: #D5DBDB       /* Standard borders */
--border-light: #EAEDED       /* Subtle dividers */
```

### Shadows

```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.08)
--shadow-md: 0 4px 12px rgba(0,0,0,0.1)
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12)
```

### Border Radius

```css
--radius-sm: 8px    /* Buttons, inputs, small cards */
--radius-md: 12px   /* Cards, modals */
--radius-lg: 16px   /* Large modals, feature cards */
```

### Spacing

```css
--spacing-xs: 8px
--spacing-sm: 12px
--spacing-md: 24px
--spacing-lg: 36px
--spacing-xl: 48px
```

### Typography

```css
--font-size-base: 18px    /* Body minimum */
--line-height: 1.6         /* Body minimum */
--max-width: 900px         /* Content max width */
```

### Layout

```css
--tap-target: 60px         /* Minimum interactive element size */
--sidebar-width: 280px
--nav-height: 64px
```

### Animation (add to :root — currently missing)

```css
--duration-fast: 150ms     /* Hover, focus rings */
--duration-normal: 250ms   /* Most transitions */
--duration-slow: 400ms     /* Complex / entrance */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## Component Reference

### Buttons

**Base class:** `.btn` — always required.
**Modifier classes:** add one variant.

```html
<!-- Primary: main call to action -->
<button class="btn btn-primary">Get Started</button>

<!-- Secondary: supporting action -->
<button class="btn btn-secondary">Go Back</button>

<!-- Success: completion / positive confirmation -->
<button class="btn btn-success">Mark as Complete</button>

<!-- Large: prominent placement -->
<button class="btn btn-primary btn-large">Start Module</button>
```

**Rules:**
- NEVER smaller than `--tap-target` (60px) — enforced by CSS
- NEVER red for primary actions
- ALWAYS include `:focus` style — enforced by CSS
- ALWAYS use action verbs ("Save Changes" not "Submit")

---

### Content Blocks

These are the core content pattern components used inside modules.

#### Story Block — real-world scenario
```html
<div class="story-block">
  <span class="story-label">📖 Margaret's Story</span>
  <p>Margaret received an email saying her Apple ID was locked...</p>
</div>
```

#### Warning Block — danger / scam alert
```html
<div class="warning-block">
  <span class="warning-label">⚠️ Watch Out</span>
  <p>Never share your verification code with anyone who calls you.</p>
</div>
```

#### Tip Block — helpful guidance
```html
<div class="tip-block">
  <span class="tip-label">💡 Helpful Tip</span>
  <p>You can always check your Wi-Fi connection in Settings.</p>
</div>
```

#### Confidence Check — reassurance moment
```html
<div class="confidence-check">
  <span class="check-icon">✅</span>
  <p class="check-text">You're doing great! This is one of the most important things you can learn.</p>
</div>
```

#### Three-Second Rule Box — safety decision framework
```html
<div class="three-second-rule-box">
  <h4>The Three-Second Rule</h4>
  <p>Before clicking anything unexpected: Stop. Think. Check.</p>
</div>
```

#### Success State — exercise completion
```html
<div class="success-state-box">
  <span class="success-icon">🎉</span>
  <p><strong>Well done!</strong> You've completed this exercise.</p>
</div>
```

---

### Cards

#### Module Card (index.html)
```html
<div class="module-card">
  <div class="card-icon">🔒</div>
  <div class="card-content">
    <h3>The Security Shield</h3>
    <p>Learn to recognise scams and protect your personal information.</p>
  </div>
</div>
```

#### Resource Card (resources.html)
```html
<div class="resource-card">
  <h4>Ontario 211</h4>
  <p class="resource-meta">Free helpline · Available 24/7</p>
  <a href="tel:211" class="resource-phone">📞 Call 211</a>
</div>
```

---

### Glossary Link

For cross-linking module text to glossary terms:
```html
<a href="digital-literacy-101.html#term-phishing" class="glossary-link">phishing</a>
```

Renders as dotted underline, same colour as surrounding text.

---

## Print Styles

Print styles are defined in `css/main.css` at `@media print`. They:
- Hide sidebar, nav, accessibility bar, module nav
- Set body to 14pt black on white
- Show full URLs after links (except `tel:` and `mailto:` — already visible as text)
- Prevent page breaks inside content blocks

**Print button pattern:**
```html
<button class="btn-print" onclick="window.print()" aria-label="Print this module">🖨 Print this module</button>
```

---

## Dark Mode

Toggle with `document.documentElement.setAttribute('data-theme', 'dark')`.

All CSS custom properties have dark mode overrides in `[data-theme="dark"]`. Key overrides:
- Backgrounds flip to `#1E1E1E` / `#2D2D2D` / `#333333`
- Text to `#E0E0E0` / `#B0B0B0`
- Headings forced to `#FFFFFF` for AODA contrast compliance
- Links to `#64B5F6`

---

## Dyslexic Font

Toggle with `document.body.classList.toggle('dyslexic-font')`.

Uses OpenDyslexic loaded via `@font-face`. Applied via:
```css
body.dyslexic-font, body.dyslexic-font * {
  font-family: 'OpenDyslexic', Arial, sans-serif !important;
}
```

---

## Motion

**Always** respect reduced motion preference:
```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

Keep animations subtle. No parallax, no auto-play, no looping animations.

---

## Common Mistakes — Never Do These

1. **Don't introduce new CSS variable names** — use the existing `--accent-primary`, `--bg-card`, `--text-primary` etc.
2. **Don't create new button classes** — use `.btn` + `.btn-primary / secondary / success / large`
3. **Don't hardcode colours** — always reference CSS variables
4. **Don't build a modal that overflows at 200% zoom** — test before committing
5. **Don't make interactive elements smaller than `--tap-target` (60px)**
6. **Don't use red (`--accent-danger`) for primary actions**
7. **Don't add hover-only interactions** — must work on touch
8. **Don't add `font-size` smaller than 16px** for body text
9. **Don't use placeholder text as a label substitute**
10. **Don't auto-play audio or video**

---

## Component Checklist

Before deploying any new component:
- [ ] Touch target ≥ 60px (`--tap-target`)
- [ ] Colour contrast ≥ 4.5:1 (WCAG AA)
- [ ] Works at 200% zoom without overflow
- [ ] Keyboard accessible (Tab, Enter, ESC)
- [ ] Focus indicator visible
- [ ] Works in dark mode (`data-theme="dark"`)
- [ ] Dyslexic font tested (`body.dyslexic-font`)
- [ ] Error states handled with clear message
- [ ] Loading state shown if async
- [ ] Mobile responsive (≥ 375px)
- [ ] Canadian spelling in all visible text
- [ ] `aria-label` on any icon-only interactive element
- [ ] Print styles not broken
