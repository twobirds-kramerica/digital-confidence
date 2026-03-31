# Broken Links Audit — March 31, 2026

## Method

Extracted all `href="*.html"` links from public-facing HTML files, resolved them relative to their source file, and checked for existence on disk.

Directories scanned: `answers/`, `tips/`, `resources/`, `geo-content/`, `exercises/`, `fr/`, `accessibility/`, `scam-alerts/`, root `*.html`

Excluded: `admin/`, `demo/`, `components/`, `white-label-demo/`, `_*` directories

---

## Findings

### Root-relative link in offline.html — NOT A BUG

`offline.html` line 63 links to `/index.html` (root-relative). Python's `os.path.exists()` on Windows resolves this as `C:\index.html` (incorrect). On GitHub Pages this path resolves correctly to the site root. **No fix needed.**

### Admin-only pages (not public) — NOTED, NOT FIXED

Several internal tools in `admin/` link to `performance.html`, `feedback-review.html`, `roadmap.html`, `strategy.html` which do not exist at root level. These are admin-only internal navigation links — all exist within `admin/` and use relative paths correctly within that directory.

### beta/ internal links — NOTED, NOT FIXED

`beta/feedback-tracking.html` links to `beta-survey.html` and `welcome-email.html` — both exist in `beta/` and resolve correctly.

### fr/ navigation links — ALL VALID

`fr/aide.html`, `fr/index.html`, `fr/modules.html` all link to `modules.html` and `aide.html` within the `fr/` directory — both exist.

### lang/fr/modules/ — ALL VALID

All `lang/fr/modules/module-N.html` files exist and are referenced correctly.

---

## Result

**0 broken links found in public-facing pages.**

All internal links in the audited public directories resolve correctly on disk.
