# Broken Internal Links Audit — 31 March 2026

## Summary

16 broken internal links identified and fixed across 6 files.

---

## 1. admin/feedback-review.html (4 links)

| Line | Broken href | Fixed href |
|------|-------------|------------|
| 145 | `favicon.svg` | `../favicon.svg` |
| 146 | `favicon-32x32.png` | `../favicon-32x32.png` |
| 147 | `favicon-16x16.png` | `../favicon-16x16.png` |
| 148 | `apple-touch-icon.png` | `../apple-touch-icon.png` |

**Cause:** Favicon `<link>` tags in `<head>` missing `../` prefix. File is in `admin/` subdirectory so root-level assets need the parent path.

---

## 2. components/button.html (1 link)

| Line | Broken href | Fixed href |
|------|-------------|------------|
| 67 | `module-1.html` (in code-block example) | `../module-1.html` |

**Cause:** Code example block showed incorrect relative path.

---

## 3. components/card.html (1 link)

| Line | Broken href | Fixed href |
|------|-------------|------------|
| 120 | `module-2.html` (in code-block example) | `../module-2.html` |

**Cause:** Code example block showed incorrect relative path.

---

## 4. resources/myth-busters.html (8 links)

| Myth # | Broken href | Fixed href |
|--------|-------------|------------|
| 1 | `module-1.html` | `../module-1.html` |
| 2 | `module-9.html` | `../module-9.html` |
| 3 | `module-2.html` | `../module-2.html` |
| 4 | `module-6.html` | `../module-6.html` |
| 5 | `module-9.html` | `../module-9.html` |
| 6 | `module-2.html` | `../module-2.html` |
| 7 | `module-9.html` | `../module-9.html` |
| 8 | `digital-literacy-101.html` | `../digital-literacy-101.html` |
| 9 | `module-4.html` | `../module-4.html` |
| 10 | `module-1.html` | `../module-1.html` |

**Cause:** All module links in myth cards were missing `../` prefix.

---

## 5. demo/index.html (1 link)

| Line | Broken href | Fixed href |
|------|-------------|------------|
| 363 | `../white-label-demo/first-credit-union/` | `../white-label-demo/` |

**Cause:** The `first-credit-union/` subdirectory does not exist. Link was already marked "Coming Soon" with `btn-disabled`.

---

## 6. admin/strategy.html (4 links)

| Original href | Fixed href | Notes |
|---------------|------------|-------|
| `../../brenda-digital-confidence/_strategy/dcc-strategy.md` | `#` | Cross-repo reference |
| `../../brenda-digital-confidence/_strategy/dcc-monetisation.md` | `#` | Cross-repo reference |
| `../../career-coach/_strategy/career-coach-strategy.md` | `#` | Cross-repo reference |
| `../../quality-dashboard/_strategy/platform-strategy.md` | `#` | Cross-repo reference |

**Cause:** Cross-repo references not available on deployed site. Changed to `#` with HTML comments preserving original paths.

---

*Audit performed 31 March 2026.*
