# DCC UI / UX / IA Audit — 2026-06-18

Audit performed at the start of the **DCC UI Rebuild v1** sprint. This documents
what exists today (pages, components, layout, CSS/JS architecture, information
architecture) and the findings that drive the rebuild. Findings-and-inventory
only — fixes are tracked in the rebuild PR.

---

## 1. Inventory (counts)

| Thing | Count | Notes |
|---|---|---|
| HTML files (total) | 333 | includes generated geo/answers/tips pages |
| HTML files (repo root) | 74 | the hand-built pages |
| Module pages (`module-*.html`) | 37 | 24 numbered + named bonus modules |
| CSS files (`css/`) | 19 | `main.css` is 168 KB and dominant |
| JS files (`js/`) | 74 | progressive-enhancement helpers |
| Inline `style=` on `index.html` | 74 | many off-token |
| Hardcoded hex on `for-libraries.html` | 65 | page has its own private palette |

### Page groups
- **Marketing / entry:** `index.html`, `about.html`, `whats-coming.html`, `demographics.html`
- **Learning:** `digital-literacy-101.html`, `module-1..24`, named bonus modules, `final-quiz.html`, `scam-simulator.html`
- **Audience landing:** `for-libraries.html`, `family.html`, `family-setup.html`, `institutional.html`, `b2b/`, `kids/`
- **Resources:** `resources.html`, `resources/*`, `recommended-tools.html`, `print-centre.html`, `glossary.html`, `faq.html`, `answers/*`, `tips/*`
- **Account-less utility:** `accessibility.html`, `accessibility/*`, `privacy.html`, `terms.html`, `certificate.html`
- **Internal / ops:** `admin/*`, `_*` working directories, `backlog-dashboard.html`

---

## 2. CSS architecture

Load order on most shared pages:

```
main.css → tokens.css → tokens-dark.css → fonts.css → components.css
→ accessibility.css → mobile.css
```

- **`tokens.css`** (v1 before this sprint): a genuinely strong "Warm Hearth"
  token set — surfaces, brand, text, state, spacing (4px scale), radius,
  shadow, motion, focus, touch targets, plus a *legacy namespace bridge* that
  maps old `main.css` variable names (`--bg-primary`, `--brand-teal`, …) onto
  the canonical tokens. This bridge is load-bearing: ~200 pages depend on it.
- **`main.css`** (168 KB): the legacy workhorse. Defines `.welcome-hero`,
  `.module-card`, `.sidebar`, `.site-footer`, etc. Mixes token references with
  some hardcoded values. Too large and intertwined to safely rewrite in one
  pass.
- **`components.css`** (36 KB): cleaner "bones" layer, token-only, documents
  reset → a11y utils → typography → layout → nav → buttons → forms → cards →
  content blocks → quiz → progress → feedback → footer.
- **`tokens-dark.css` / `tokens-high-contrast.css`**: theme overrides with the
  same variable names. Verified AA pairs in comments.
- **`tokens-alt.css`**: empty white-label template (partner theming).

### Finding C-1 — accent orange fails as a text/button colour
`--color-accent` (`#E8842C`) is used for primary CTAs with white text, but
white-on-`#E8842C` is **2.70:1** — below the WCAG 1.4.3 / 1.4.11 / 2.4.13
threshold (3:1) even for large/bold text. This is the single most impactful
contrast defect. **Rebuild fix:** added `--color-accent-strong` (`#A85410`,
5.33:1) for all button/CTA backgrounds and the focus ring; demoted
`--color-accent` to decorative use only.

### Finding C-2 — heavy inline styling drifts off-token
`index.html` alone carries 74 inline `style=` attributes, many with raw hex
(`#fff3f3`, `#c0392b`, `#f0f6ff`, `#E8F5E9`, `#1B5E20`, border-top swatches on
benefit cards). These ad-hoc colours are what make sections look "generic" and
inconsistent, and they cannot be re-skinned by theme or dark-mode tokens (inline
wins the cascade). **Rebuild fix:** new `dcc-core.css` `.dcc-callout` component +
`.dcc-top--*` accents replace the worst offenders with token-driven classes.

### Finding C-3 — `for-libraries.html` is a parallel design system
This page defines its **own** `:root` palette (`--navy`, `--blue`, `--slate-*`,
`--green`), system-font stack, 16px base, and 1.6 line-height — none of it
shares the Warm Hearth tokens, fonts, accessibility bar, nav, or dark mode. It
looks like a different product. **Rebuild fix:** fully rebuilt onto the shared
token stack + `dcc-core.css` marketing primitives.

---

## 3. Component inventory (existing, reusable)

Defined in `main.css` / `components.css` and used across pages:

- **Navigation:** `.accessibility-bar` (text size A/A/A/A + theme toggle),
  `.top-bar` (mobile), `.sidebar` + `.sidebar-overlay` + `.snav-group`
  (collapsible grouped nav), `.skip-link`, `.site-footer` + `.footer-links`.
- **Cards:** `.module-grid`, `.module-card` (icon + content + badge + progress).
- **Content blocks:** `.story-block`, `.tip-block` / `.tip-box`,
  `.warning-block`, `.confidence-check`, `.alert-card`, `.trust-signals` /
  `.trust-item`, `.eeat-trust-bar`.
- **Hero:** `.welcome-hero` (text + image, class-based — good).
- **Social proof:** `.testimonials-section` / `.testimonial-card`.
- **Quiz:** `.quiz-block`, `.quiz-option`, `.quiz-feedback` (aria-live).
- **Misc:** `.podcast-card`, `.email-invite-box`, `.progress-overview`,
  `.module-nav`.

These are sound and are **kept**. The rebuild adds a thin token-driven layer
rather than replacing them.

---

## 4. JavaScript / behaviour (hooks to preserve)

Accessibility and personalisation depend on specific class names / IDs that the
rebuild must not break:

- `accessibility.js`, `settings.js` → `.font-size-btn[data-size]`,
  `.theme-toggle-btn`, `html.text-size-*`, `data-theme`.
- `app.js` → `.menu-btn`, `.sidebar`, `.sidebar-overlay`, `.sidebar-close`.
- `module-grid.js`, `progress.js` → `.module-card[data-module]`,
  `.progress-bar-fill`, `#dcc-progress-widget`.
- `lang-toggle.js`, `localize.js` → `[data-en]/[data-fr]`, `data-lang`.
- Homepage data widgets fetch JSON and write into `#whats-new-cards`,
  `#scam-of-the-month` (`#sotm-*`), `#dcc-news-list`. IDs must be preserved.

**Rebuild rule:** keep all hook names and IDs; restyle via classes only.

---

## 5. Information architecture

Primary nav (sidebar) is grouped into **Get Started / All Lessons / Resources &
Help**, plus an accessibility section. This grouping is good and matches the
2026-06-17 IA audit (`ia-audit-2026-06-17.md`).

Observations carried into the rebuild:
- **Two audiences, one front door.** Seniors (learners) and community
  organisations (libraries, nonprofits, settlement agencies) both land on
  `index.html`. The org path (`for-libraries.html`) is reachable but visually
  disconnected. The rebuild keeps a clear, plain-language split.
- **Escape hatch.** A persistent, obvious Home link exists (design principle 5)
  — preserved.
- **Module ordering** is curated (1 → 24 + "Expanding Your Horizons" divider).
  Left intact; this is content, not chrome.

---

## 6. Accessibility baseline (today)

Strengths: skip link, semantic headings on most pages, text-size toggle, dark +
high-contrast themes, `prefers-reduced-motion` zeroed in tokens, 56px touch
target token, read-aloud on modules, `aria-live` quiz feedback.

Gaps found:
- **A-1** Accent/CTA contrast (see C-1).
- **A-2** Focus ring used `--color-accent` (2.7:1) → could be invisible against
  light surfaces. Rebuild re-points the ring to `--color-accent-strong`.
- **A-3** Inline-coloured sections bypass dark mode (C-2): e.g. the
  scam-of-the-month box stays light-red in dark mode, breaking contrast.
- **A-4** `for-libraries.html` excluded from the a11y bar, dark mode, and
  read-aloud entirely (C-3).

---

## 7. Scope decision for v1

The site is large, SEO-rich, and JS-coupled. A destructive full rewrite would
risk schema, links, and behaviour. v1 therefore:

1. Hardens `tokens.css` to verified WCAG 2.2 AA and adds a CTA-safe accent.
2. Adds `dcc-core.css` — a token-only refinement layer loaded last.
3. Rebuilds the three core front-door pages (`index.html`, `resources.html`,
   `for-libraries.html`) onto tokens, de-inlining the off-token sections.
4. Adds `AGENTS.md` to govern every future agent run.

Follow-up (tracked for later runs): migrate remaining inline styles on
`about.html` and module pages; retire page-private palettes; add `dcc-core.css`
to the global include set.
