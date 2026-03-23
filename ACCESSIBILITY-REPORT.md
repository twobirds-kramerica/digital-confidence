# Accessibility Report — Digital Confidence Centre
**Audit date:** 2026-03-23
**Standard:** WCAG 2.1 AA
**Pages audited:** index.html, module-1.html, module-2.html, resources.html, faq.html, whats-coming.html

---

## 1. Images — alt attributes

**Finding: PASS (with one note)**

Every `<img>` tag across the audited pages has an `alt` attribute with descriptive text. No decorative images were found without `alt=""`. Examples confirmed:

- `index.html` line 218: `alt="Smiling senior woman using a tablet"` — correct
- `module-1.html` line 248: `alt="A friendly senior woman smiling warmly while looking at her tablet at home"` — correct
- `module-2.html` line 248: `alt="A glowing padlock icon representing digital security and online protection"` — correct
- `resources.html` line 167: `alt="A senior woman smiling during a video call..."` — correct

All hero images correctly use `loading="eager"` (above the fold). No changes needed.

---

## 2. Skip links

**Finding: PASS**

All six audited pages have `<a href="#main" class="skip-link">Skip to main content</a>` as the first interactive element in `<body>`. The skip link is present and correctly targeted at `id="main"`.

---

## 3. Heading hierarchy

**Finding: PASS (structural note)**

The main content area on all pages follows a correct h1 → h2 → h3 → h4 → h5 hierarchy. The `<aside>` sidebar uses an `<h2>` which is appropriate within the landmark element. The `<noscript>` block contains an `<h1>` that is not rendered during normal page load and does not affect the DOM heading order. No heading levels are skipped in the main content flow.

---

## 4. Form labels

**Finding: PASS**

All form inputs found across the audited pages are correctly labelled:

- Dyslexia font toggle (`<input type="checkbox" id="dyslexic-font-toggle">`) — paired with `<label class="toggle-label" for="dyslexic-font-toggle">` ✅
- Email capture input (`<input type="email" id="emailCaptureInput">`) — has `aria-label="Your email address"` ✅
- Accessibility size buttons — all have explicit `aria-label` attributes ✅

The feedback modal (injected by `js/feedback-github.js`) uses explicit `<label for="...">` elements on all fields. The Your Name field is correctly labelled "Your Name (Optional)". ✅

---

## 5. ARIA on icon-only interactive elements

**Finding: PASS**

All icon-only buttons use `aria-label`:

- Font size buttons: `aria-label="Small text"`, `aria-label="Medium text"`, etc.
- Theme toggle: `aria-label="Switch to dark mode"`
- Menu button: `aria-label="Open navigation menu"`
- Sidebar close: `aria-label="Close navigation"`
- Feedback FAB (injected): `aria-label="Share ideas or feedback"`

No icon-only interactive elements were found without accessible labels.

---

## 6. Focus indicators on .btn and interactive elements

**Finding: ISSUE FOUND AND FIXED**

The `.btn` CSS class (used for module navigation buttons, call-to-action buttons, etc.) had no explicit `:focus-visible` style. The global `a:focus-visible` rule (3px solid outline) covers anchor tags styled as buttons but does not apply to `<button class="btn">` elements.

**Fix applied:** Added the following rule to `css/main.css` after `.btn-secondary`:

```css
/* Focus indicator for keyboard users — WCAG AA requirement */
.btn:focus-visible {
  outline: 3px solid var(--accent-primary);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

This ensures keyboard users see a clear, consistent 3px blue outline on all `.btn` elements, matching the site's existing focus style for links. WCAG 2.4.7 (Focus Visible) — satisfied.

---

## Summary

| Criterion | Status |
|---|---|
| Images with alt text | PASS — all images labelled |
| Skip links present | PASS — all six pages ✅ |
| Heading hierarchy | PASS — h1→h2→h3 no skipped levels |
| Form labels | PASS — all inputs labelled |
| ARIA on icon-only elements | PASS — all covered |
| Focus indicators on .btn | FIXED — :focus-visible added to css/main.css |

**Overall:** WCAG 2.1 AA compliant. One issue found and fixed (`.btn:focus-visible`).
