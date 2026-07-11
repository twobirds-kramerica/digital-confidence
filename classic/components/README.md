# DCC Component Library — Quick Reference
*See DESIGN-SYSTEM.md for full rules and rationale.*

---

## Files

| File | Contents |
|---|---|
| `button.html` | All button variants with live examples and copy-paste HTML |
| `card.html` | Story, warning, tip, confidence, success, module card, resource card |
| `input.html` | Text inputs, textarea, select, error state, complete form example |

Open any file in a browser to see live rendered examples.

---

## Quick Copy-Paste

### Buttons

```html
<button class="btn btn-primary">Action Label</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-success">Completed ✓</button>
<button class="btn btn-primary btn-large">Prominent Action</button>
<button class="btn-print" onclick="window.print()">🖨 Print this module</button>
```

### Content Blocks

```html
<!-- Story -->
<div class="story-block">
  <span class="story-label">📖 Story Title</span>
  <p>Scenario content...</p>
</div>

<!-- Warning -->
<div class="warning-block">
  <span class="warning-label">⚠️ Watch Out</span>
  <p>Warning content...</p>
</div>

<!-- Tip -->
<div class="tip-block">
  <span class="tip-label">💡 Helpful Tip</span>
  <p>Tip content...</p>
</div>

<!-- Confidence Check -->
<div class="confidence-check">
  <span class="check-icon">✅</span>
  <p class="check-text">Reassurance message...</p>
</div>

<!-- Three-Second Rule -->
<div class="three-second-rule-box">
  <h4>The Three-Second Rule</h4>
  <p>Stop. Think. Check.</p>
</div>

<!-- Success State -->
<div class="success-state-box">
  <span class="success-icon">🎉</span>
  <p><strong>Well done!</strong> Completion message.</p>
</div>
```

### Glossary Cross-Link

```html
<a href="digital-literacy-101.html#term-phishing" class="glossary-link">phishing</a>
```

---

## CSS Variables — Most Used

```css
/* Accents */
var(--accent-primary)   /* #3498DB — blue */
var(--accent-success)   /* #27AE60 — green */
var(--accent-warning)   /* #F39C12 — orange */
var(--accent-danger)    /* #E74C3C — red */

/* Backgrounds */
var(--bg-primary)       /* Page background */
var(--bg-card)          /* Card surfaces */
var(--bg-secondary)     /* Sidebar, alternate */

/* Text */
var(--text-primary)     /* Body */
var(--text-secondary)   /* Supporting */
var(--text-muted)       /* Metadata, placeholders */

/* Spacing */
var(--spacing-xs)       /* 8px */
var(--spacing-sm)       /* 12px */
var(--spacing-md)       /* 24px */
var(--spacing-lg)       /* 36px */
var(--spacing-xl)       /* 48px */

/* Sizing */
var(--tap-target)       /* 60px — minimum interactive element */
var(--max-width)        /* 900px — content max width */
var(--radius-sm)        /* 8px */
var(--radius-md)        /* 12px */
var(--radius-lg)        /* 16px */
```

---

## Component Checklist

Before committing any new component:
- [ ] Touch target ≥ 60px (`--tap-target`)
- [ ] Colour contrast ≥ 4.5:1
- [ ] Works at 200% zoom without overflow
- [ ] Keyboard accessible (Tab / Enter / ESC)
- [ ] Focus indicator visible
- [ ] Works in dark mode
- [ ] Error states handled
- [ ] Canadian spelling in all visible text
- [ ] `aria-label` on icon-only interactive elements
