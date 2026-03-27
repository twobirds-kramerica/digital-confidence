# SEO Technical Audit — Digital Confidence Centre
**Date:** 2026-03-27
**Auditor:** Claude Code (automated)
**Scope:** index.html, about.html, resources.html, privacy.html, accessibility.html, print-centre.html, recommended-tools.html, module-1.html through module-5.html

---

## A) Title Tags

| File | Issue | Severity | Status |
|------|-------|----------|--------|
| index.html | Title too long: 78 chars ("Digital Confidence Centre — Free Digital Literacy Training for Ontario Seniors") | Medium | Fixed |
| resources.html | Pipe separator (\|) used instead of em-dash (—) | Low | Fixed |
| privacy.html | Pipe separator (\|) used instead of em-dash (—) | Low | Fixed |
| module-1.html | Too long at 64 chars AND pipe separator (\|) | Medium | Fixed |
| module-2.html | Pipe separator (\|) used instead of em-dash (—) | Low | Fixed |
| module-3.html | Pipe separator (\|) used instead of em-dash (—) | Low | Fixed |
| module-4.html | Pipe separator (\|) used instead of em-dash (—) | Low | Fixed |
| module-5.html | Pipe separator (\|) used instead of em-dash (—) | Low | Fixed |
| about.html | OK (33 chars, em-dash format) | — | Pass |
| accessibility.html | OK (51 chars, em-dash format) | — | Pass |
| print-centre.html | OK (40 chars, em-dash format) | — | Pass |
| recommended-tools.html | OK (45 chars, em-dash format) | — | Pass |

**Notes on fixes:** The em-dash (—) is the site's established separator style. Pipe (|) on some pages was inconsistent. module-1 title shortened from 64 to 57 chars while retaining full meaning.

---

## B) Meta Descriptions

| File | Issue | Severity | Status |
|------|-------|----------|--------|
| about.html | 156 chars — over 155-char limit by 1 char | Low | Fixed |
| resources.html | 165 chars — over 155-char limit | Medium | Fixed |
| accessibility.html | 167 chars — over 155-char limit | Medium | Fixed |
| print-centre.html | 158 chars — over 155-char limit | Low | Fixed |
| recommended-tools.html | 163 chars — over 155-char limit | Medium | Fixed |
| module-1.html | 157 chars — over 155-char limit | Low | Fixed |
| module-5.html | 156 chars — over 155-char limit | Low | Fixed |
| index.html | OK (150 chars) | — | Pass |
| privacy.html | OK (99 chars) | — | Pass |
| module-2.html | OK (151 chars) | — | Pass |
| module-3.html | OK (145 chars) | — | Pass |
| module-4.html | OK (149 chars) | — | Pass |

---

## C) Heading Hierarchy

| File | Issue | Severity | Status |
|------|-------|----------|--------|
| module-1.html | Two H1 tags: one in sidebar (l.237 "Digital Confidence Centre") and one in main content (l.370 "Module 1: Mastering the Escape Hatch") | Medium | Aaron to review |
| module-2.html | Two H1 tags: sidebar H1 (l.237) and module H1 (l.370) — same pattern | Medium | Aaron to review |
| module-3.html | Two H1 tags: sidebar H1 (l.237) and module H1 (l.370) — same pattern | Medium | Aaron to review |
| module-1.html | H3 at l.250 ("Listen to This Page") appears before any H2, inside top toolbar — structurally orphaned | Low | Aaron to review |
| module-2.html | H3 at l.250 appears before any H2, same toolbar pattern | Low | Aaron to review |
| module-3.html | H3 at l.250 appears before any H2, same toolbar pattern | Low | Aaron to review |

**Note:** The sidebar H1 ("Digital Confidence Centre") is a shared component across all modules. Changing it to an H2 or a styled `<p>` or `<div>` would fix the dual-H1 issue site-wide but requires testing the shared layout. Flagged for Aaron's review as a structural/template change rather than auto-fixable.

---

## D) Image Alt Text

| File | Issue | Severity | Status |
|------|-------|----------|--------|
| module-1.html | Hero image has descriptive alt text | — | Pass |
| module-2.html | Hero image has descriptive alt text | — | Pass |
| module-3.html | Hero image has descriptive alt text | — | Pass |

No missing alt attributes, empty alt text on content images, or filename-as-alt found in modules 1–3.

---

## E) Internal Linking (index.html)

| Finding | Severity | Status |
|---------|----------|--------|
| All module links in nav and module cards use descriptive anchor text (e.g., "Module 1: The Escape Hatch", not "click here" or bare filenames) | — | Pass |
| Skip-link nav at lines 239–249 uses module names as anchor text | — | Pass |

No bare-filename or generic anchor text found.

---

## F) Canonical Tags

| File | Issue | Severity | Status |
|------|-------|----------|--------|
| accessibility.html | Missing canonical tag entirely | High | Fixed |
| index.html | Canonical present and correct | — | Pass |
| about.html | Canonical present and correct | — | Pass |
| resources.html | Canonical present and correct | — | Pass |
| privacy.html | Canonical present and correct | — | Pass |
| print-centre.html | Canonical present and correct | — | Pass |
| recommended-tools.html | Canonical present and correct | — | Pass |
| module-1.html through module-5.html | All canonicals present and correct | — | Pass |

---

## G) OG Tags

| File | Issue | Severity | Status |
|------|-------|----------|--------|
| accessibility.html | Missing og:image, missing og:description, missing og:url | High | Fixed |
| about.html | Missing og:image, missing og:url | Medium | Fixed |
| index.html | og:image, og:description, og:type all present | — | Pass |
| module-1.html | og:image, og:description, og:type, og:url all present | — | Pass |

---

## H) JSON-LD Validity (module-1.html)

| Block | Issue | Severity | Status |
|-------|-------|----------|--------|
| LearningResource block | Valid JSON, @context and @type present | — | Pass |
| FAQPage block | Valid JSON, @context and @type present | — | Pass |

No JSON-LD issues found on module-1.html.

---

## Summary Counts

| Category | Total Issues | Auto-Fixed | Aaron to Review |
|----------|-------------|-----------|-----------------|
| Title tags | 8 | 8 | 0 |
| Meta descriptions | 7 | 7 | 0 |
| Heading hierarchy | 6 | 0 | 6 |
| Image alt text | 0 | 0 | 0 |
| Internal linking | 0 | 0 | 0 |
| Canonical tags | 1 | 1 | 0 |
| OG tags | 3 | 3 (across 2 files) | 0 |
| JSON-LD | 0 | 0 | 0 |
| **TOTAL** | **19** | **19** | **6** |

---

## Aaron-to-Review Items

1. **Dual H1 tags in all module pages (template issue):** The shared sidebar uses `<h1>Digital Confidence Centre</h1>` while each module also has its own `<h1>`. Google tolerates multiple H1s in HTML5 but it is not best practice. Fix: change the sidebar heading to `<h2>` or a `<p class="site-name">`. Requires layout testing.

2. **Orphaned H3 in top toolbar (Listen to This Page):** Line 250 in modules 1–3 uses H3 inside the toolbar before any H2. Could be changed to a `<p>` or `<span>` — or wrapped in a semantic `<section>` with an H2. Low SEO impact but worth correcting.
