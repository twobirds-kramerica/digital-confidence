# IMAGE AUDIT — Digital Confidence Centre
**Audit Date:** 2026-03-16
**Auditor:** Claude (autonomous sprint)
**Scope:** All HTML pages (excluding `_visual-pipeline/preview.html`)

---

## Summary

| Type | Count |
|------|-------|
| Unsplash CDN images (module hero banners) | 15 |
| Local images (in `/images/` folder) | 1 used / 6 present |
| **Total unique images in use** | **16** |
| Local images present but NOT referenced in any HTML | 5 |

---

## Images In Use (By Page)

### index.html — Home Page
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `senior-woman-ipad.jpg?v=2` | Local `/images/` | 260×200px | Only local image in active use. Cache-busted with `?v=2`. |

---

### module-1.html — Module 1: Mastering the Escape Hatch
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1573497019940-1c28c88b4f3e` | Unsplash CDN | 1200×400px | Friendly senior woman smiling at tablet. Cache-busted `v=2`. |

---

### module-2.html — Module 2: The Security Shield
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1550751827-4bd374c3f58b` | Unsplash CDN | 1200×400px | Glowing padlock icon (digital security). Cache-busted `v=2`. |

---

### module-3.html — Module 3: Passwords & Biometrics
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1614064641938-3bbee52942c7` | Unsplash CDN | 1200×400px | Person using fingerprint sensor on smartphone. Cache-busted `v=2`. |

---

### module-4.html — Module 4: App Store Safety
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1512941937669-90a1b58e7e9c` | Unsplash CDN | 1200×400px | Colourful smartphone app icon grid. Cache-busted `v=2`. |

---

### module-5.html — Module 5: Email & Messages
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1596526131083-e8c633c948d2` | Unsplash CDN | 1200×400px | Senior woman reading message on tablet, smiling. Cache-busted `v=2`. |

---

### module-6.html — Module 6: Banking & Transactions
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1563013544-824ae1b704d3` | Unsplash CDN | 1200×400px | Person using smartphone for online banking. Cache-busted `v=2`. |

---

### module-7.html — Module 7: Photos & Memories
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1452802447250-470a88ac82bc` | Unsplash CDN | 1200×400px | Senior person enjoying outdoor photography. Cache-busted `v=2`. |

---

### module-8.html — Module 8: Stay Connected
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1529156069898-49953e39b3ac` | Unsplash CDN | 1200×400px | Multi-generational family sharing a tablet. Cache-busted `v=2`. ⚠️ **Same photo ID as family-setup.html** |

---

### module-9.html — Module 9: Understanding AI
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1516321318423-f06f85e504b3` | Unsplash CDN | 1200×400px | Senior at computer, confident and engaged. Cache-busted `v=2`. |

---

### module-10.html — Module 10: Grocery & Food Delivery
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1498050108023-c5249f4df085` | Unsplash CDN | 1200×400px | Hands typing on a laptop (online ordering). Cache-busted `v=2`. ⚠️ **Generic — doesn't show seniors or groceries specifically.** |

---

### module-11.html — Module 11: Ride-Sharing Apps
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1506794778202-cad84cf45f1d` | Unsplash CDN | 1200×400px | Senior smiling at phone, ready to go. Cache-busted `v=2`. |

---

### module-visual-ai.html — Show Me! (Bonus)
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1502920917128-1aa500764bed` | Unsplash CDN | 1200×400px | Person pointing phone camera at potted plant. ⚠️ **No cache-busting `v=2` parameter.** |

---

### resources.html — Resources Page
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1559027615-cd4628902d4a` | Unsplash CDN | 1200×400px | Two people holding hands (community support). Cache-busted `v=2`. |

---

### scam-simulator.html — Scam Simulator
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1563986768609-322da13575f3` | Unsplash CDN | 1200×400px | Warning alert symbol on screen. Cache-busted `v=2`. |

---

### family-setup.html — Setting This Up for Someone You Love
| Filename | Source | Dimensions | Notes |
|----------|--------|------------|-------|
| `photo-1529156069898-49953e39b3ac` | Unsplash CDN | 1200×400px | Adult child and older parent on tablet together. ⚠️ **No `v=2` cache-buster. Same photo ID as module-8.html.** |

---

## Local Images in `/images/` Folder (NOT currently used in any page)

These files exist locally but are **not referenced** in any HTML page:

| Filename | Status |
|----------|--------|
| `senior-couple-computer.jpg` | ❌ Unused |
| `senior-couple-laptop.jpg` | ❌ Unused |
| `senior-couple-smartphone.jpg` | ❌ Unused |
| `senior-woman-tablet-smiling.jpg` | ❌ Unused |
| `senior-woman-video-call.jpg` | ❌ Unused |

**Recommendation:** Review whether these should replace any of the Unsplash CDN images. Local images load faster (no CDN dependency), are self-hosted, and won't break if Unsplash changes.

---

## Issues Flagged for Aaron's Review

| # | Severity | Issue | Pages Affected |
|---|----------|-------|----------------|
| 1 | ⚠️ Medium | `photo-1529156069898-49953e39b3ac` is used on **two different pages** (module-8 and family-setup) with different alt text. Same image = visual repetition for users who visit both pages. | module-8.html, family-setup.html |
| 2 | ⚠️ Low | `module-visual-ai.html` and `family-setup.html` hero images are **missing the `?v=2` cache-buster** that all other modules have. | module-visual-ai.html, family-setup.html |
| 3 | ⚠️ Low | Module 10 hero (laptop/hands) is generic — doesn't show seniors or groceries. Could be improved. | module-10.html |
| 4 | 💡 Opportunity | 5 local images in `/images/` are unused. These could replace CDN images for better reliability and load speed. | N/A |
| 5 | ℹ️ Info | All images use `loading="lazy"` except the hero on `index.html` which correctly uses `loading="eager"`. No changes needed. | All pages |

---

## Pages With NO Images
The following pages have no `<img>` tags (text/form only):
- `faq.html`, `faq-fr.html`, `privacy.html`, `terms.html`, `copyright.html`
- `certificate.html`, `demographics.html`, `final-quiz.html`
- `beta-welcome.html`, `search-guide.html`, `scam-simulator.html` (hero only via Unsplash — listed above)
- `backlog-dashboard.html`, `admin/feedback-review.html`, `tools/backup-viewer.html`

---

*Generated by autonomous sprint on 2026-03-16. No images were changed during this audit.*
