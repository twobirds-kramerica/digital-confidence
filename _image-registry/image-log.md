# Image Registry — Digital Confidence Centre
**Last audited:** 2026-03-26
**Auditor:** Claude Code / Aaron Kramer
**Purpose:** Track status of all images for Sprint B visual approval

---

## Status Key
| Symbol | Meaning |
|--------|---------|
| ✅ | Good — lifestyle-appropriate, loads correctly |
| ⚠️ | Needs replacement — content concerns or quality issues |
| ❌ | Broken — file missing or fails to load |
| 🔗 | OG/meta only — not visible in page, used for social sharing only |

---

## /images/ — Site Images

| Filename | Size | Status | Alt Text (where used) | Pages Used |
|----------|------|--------|----------------------|------------|
| senior-woman-ipad.jpg | 112KB | ✅ | Senior woman smiling using iPad | index.html (hero), about.html (OG), whats-coming.html (OG), family-setup.html (OG) |
| senior-couple-computer.jpg | 72KB | ✅ | Senior couple at computer — curiosity and ease | digital-literacy-101.html |
| senior-couple-smartphone.jpg | 96KB | ✅ | Senior couple using smartphone together | module pages |
| senior-woman-tablet-smiling.jpg | 116KB | ✅ | Senior woman smiling browsing app on tablet | module-10.html (grocery delivery) |
| senior-woman-video-call.jpg | 100KB | ✅ | Senior woman on video call | module-8.html (stay connected) |
| senior-couple-laptop.jpg | 88KB | 🔗 | N/A — used only in OG meta tag | family-setup.html (OG only) |

---

## Summary

- **Total images in /images/:** 6
- **Visible on pages:** 5
- **OG/meta only:** 1
- **Broken:** 0
- **Inappropriate (clinical/medical/non-lifestyle):** 0
- **Needs replacement:** 0

All images are lifestyle photographs appropriate for a senior digital literacy context. No images show clinical settings, medical equipment, X-rays, or screens with text.

---

## Notes for Sprint B

- All images were sourced for the DCC project and are contextually appropriate.
- No placeholder replacements required at this time.
- Suggested future improvement: add more module-specific hero images (currently several modules share the same image or use CSS-only heroes).
- The `senior-couple-laptop.jpg` image is referenced only in a social sharing meta tag on the family-setup page — consider replacing with a more family-oriented image in a future sprint.

---

## Image Placeholder CSS (for future broken/replaced images)

If any image becomes broken or needs temporary replacement, use this CSS placeholder:

```html
<div class="image-placeholder-hero" aria-hidden="true">
  <span>[section name]</span>
</div>
```

```css
.image-placeholder-hero {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #0F1B2D 0%, #00C9A7 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}
```
