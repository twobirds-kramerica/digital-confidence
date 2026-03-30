# Broken Link Audit — Final
**Date:** March 30, 2026
**Method:** Python script scanning all 241 HTML files for href values pointing to non-existent .html files

## Total Broken Links Found: 42
## Real Pages Fixed: 3 files (30 link instances corrected)
## Internal-Only Files (not user-facing): 1 template file (noted, not fixed)

---

## Fixes Applied

### resources/myth-busters.html — 9 broken links
All module links were missing the `../` relative path prefix.

Fixed:
- `href="module-1.html"` → `href="../module-1.html"` (×2)
- `href="module-2.html"` → `href="../module-2.html"` (×2)
- `href="module-4.html"` → `href="../module-4.html"`
- `href="module-6.html"` → `href="../module-6.html"`
- `href="module-9.html"` → `href="../module-9.html"` (×3)
- `href="digital-literacy-101.html"` → `href="../digital-literacy-101.html"`

### components/button.html — 1 broken link
- `href="module-1.html"` → `href="../module-1.html"`

### components/card.html — 1 broken link
- `href="module-2.html"` → `href="../module-2.html"`

---

## Not Fixed (Internal Dev Files)

### _templates/module-template.html — 31 broken link instances
This is a developer template file with placeholder variables like `{{MODULE_NUM_PREV}}`.
Its links are relative to `_templates/` because it is not deployed as a user-facing page.
Not fixed — this is expected behaviour for a template.

---

## Previous Fix (March 29, 2026)
Modules 18 and 19 were already added to all module sidebar navs in the previous broken-links-march29.md audit.
