# S-DCC-INTERACTION-FIX — Interaction Audit
**Date:** 2026-06-28 | **Viewports tested:** 375px, source audit  
**Method:** Source-level audit + Playwright snapshot (375px viewport)

---

## Complaint 1 — Buttons overlapping

**Files:** `js/app.js` (B4 section, line ~405), `js/feedback-github.js` (line ~135), `js/speech-config.js` (line ~325), `js/help-button.js` (line 26), `css/bundle.css` (`.dc-unified-feedback-btn`)

**Root causes found:**

| Element | File | Position | z-index |
|---|---|---|---|
| `dcc-help-btn` (teal `?` circle) | `js/app.js` B4 | `bottom:24px; right:20px` | 9990 |
| `dc-unified-feedback-btn` (pill) | `feedback-github.js` + `bundle.css` | `bottom:80px; right:16px` | 200 |
| Speech stop button | `js/speech-config.js` | `bottom:80px; right:16px` | 9998 |
| `? Help` text button | `js/help-button.js` | `top:5rem; right:1rem` | 9000 |

- `dc-unified-feedback-btn` and speech stop button sit at **exact same position** (bottom:80px, right:16px) — perfect overlap when reading aloud is active
- `dcc-help-btn` (bottom:24px) is only 32px below `dc-unified-feedback-btn` (bottom:80px - 52px height) — visually adjacent/overlapping on small screens
- Two separate help buttons (`? Help` top-right, `?` circle bottom-right) serve different functions but look like duplicates — confusing

**Verdict:** `dcc-help-btn` in `app.js` B4 is the redundant element. `help-button.js` is the canonical help widget (it has About/Tech problem/Call for help options). The B4 teal circle should be **removed**. Speech stop button should move to `bottom:80px; right:88px` (left of feedback btn) or `top:5rem; right:1rem` range.

---

## Complaint 2 — Close buttons inconsistent

**Files:** `module-1.html` (sidebar), `js/panic-button.js`, `js/feedback-github.js`

| Element | Close button text |
|---|---|
| Sidebar (`.sidebar-close`) | `Close ✕` (data-en attribute) |
| Scam modal | `× Close` (Unicode × + space + word) |
| Feedback modal | `× Close` (same Unicode pattern) |
| app.js helpSheet | `Close` (no symbol) |

**AGENTS.md canonical format:** `✕ Close` — note: ✕ is U+2715 (✕), not × (U+00D7 multiplication sign).

Scam modal and feedback modal both use `×` (multiplication sign ×) not `✕` (✕), and put the symbol BEFORE "Close" rather than after. Sidebar uses the correct format (`Close ✕`) via data attribute.

**Fix:** Standardise all close buttons to `✕ Close` using `✕ Close`.

---

## Complaint 3 — Flyouts won't close / Escape broken

**Files:** `js/app.js` (sidebar, B4 helpSheet), `js/help-button.js`, `js/panic-button.js`, `js/feedback-github.js`, `js/keyboard-helper.js`

**Root causes:**

1. **Sidebar null-crash risk**: `initSidebar()` registers `document.addEventListener('keydown', ...)` that accesses `sidebar.classList` — if `sidebar` is `null` (non-module pages) this throws `TypeError`, potentially silencing subsequent keydown handlers. Guard needed: `if (!sidebar) return;` before the keydown registration.

2. **app.js B4 helpSheet no Escape handler**: The teal `?` circle's help sheet (app.js ~line 425) has outside-click dismiss but NO Escape key handler. Pressing Escape while the helpSheet is open does nothing — it fires the sidebar Escape handler instead (if sidebar is open) or does nothing.

3. **Multiple competing Escape handlers on `document`**: Five separate `document.addEventListener('keydown')` handlers for Escape:
   - `app.js` → sidebar
   - `help-button.js` → help popover
   - `panic-button.js` → scam modal
   - `feedback-github.js` → feedback modal
   - `keyboard-helper.js` → keyboard dialog
   All fire simultaneously on Escape. Individual guards (check if modal is `display:none`) work correctly in isolation, but stacking order matters on slow connections where all are registered before first interaction.

4. **`<details>` accordion groups in sidebar**: The sidebar nav uses native `<details class="snav-group">` elements. These don't emit custom events and `app.js` doesn't trap Escape for closing individual open `<details>`. Users pressing Escape while a sub-menu is expanded expect it to collapse — it doesn't; Escape closes the whole sidebar instead.

---

## Complaint 4 — Mobile/tablet sizing broken

**Files:** `css/bundle.css`, `css/mobile.css`, `js/feedback-github.js`

Checked `dc-unified-feedback-btn` at 375px: at `right:16px` with padding `13px 22px` and font-size `15px`, the "Ideas & Feedback" label is ~180px wide — fits within 375px viewport.

The `.dc-fab-mobile-label` span (`Feedback`) is intended to replace the full label on mobile — but this requires CSS to `display:none` the full label and `display:inline` the mobile label. Need to verify the bundle.css has this breakpoint.

**Known sizing issues (from sprint brief):**
- Touch targets: teal `?` circle is 52×52px ✓ (WCAG 44px min)
- `? Help` button padding `0.5rem 1rem` at 0.9rem font = ~38px height — FAILS WCAG 2.5.5 44px minimum
- Sidebar navigation accordion summaries: need to check min-height

**Check needed on sidebar mobile:** Sidebar at 375px viewport — does `.sidebar` have `width:100%` or does it overlap content without full-coverage?

---

## Complaint 5 — Not intuitive

**Root causes:**

1. **Two `?` help buttons**: `? Help` (top-right, links to About/Tech/Call) and teal `?` circle (bottom-right, shows "refresh or go Home") — seniors presented with two identical-looking `?` buttons that open different panels. This is the most significant UX issue.

2. **`dc-unified-feedback-btn` "Ideas & Feedback"**: A senior encountering a technical problem would not know to click "Ideas & Feedback" for help. The function is mismatched to what seniors need.

3. **Sidebar navigation `<summary>` elements**: Native `<details>` disclosure triangles are small and may not be visible enough to seniors. No explicit "expand/collapse" affordance.

4. **`sidebar-close` button position**: "Close ✕" button at top of sidebar — correct per AGENTS.md. No issues here.

---

## Fix Priority

| # | Complaint | Fix | File(s) |
|---|---|---|---|
| 1 | **REMOVE** `dcc-help-btn` teal circle (B4 section in app.js) | Remove entire B4 IIFE | `js/app.js` |
| 2 | **MOVE** speech stop button right-offset so it doesn't overlap feedback btn | Change `right:16px` → `right:88px` | `js/speech-config.js` |
| 3 | **Standardise** close buttons to `✕ Close` | Replace `× Close` with `✕ Close` | `js/panic-button.js`, `js/feedback-github.js` |
| 4 | **Add null-guard** to `initSidebar()` keydown handler | `if (!sidebar) return;` | `js/app.js` |
| 5 | **Fix `? Help` button touch target** | Add `min-height:44px` | `js/help-button.js` |
