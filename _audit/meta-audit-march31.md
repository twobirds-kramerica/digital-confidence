# Meta Audit — March 31, 2026

## Scope
Checked public-facing HTML files for: title tag, meta description, canonical URL, og:title, og:description, viewport meta, lang attribute.

Directories scanned:
- Root `.html` files
- `resources/`, `resources/scam-deep-dives/`
- `answers/`, `tips/`, `geo-content/`, `exercises/`, `fr/`, `accessibility/`, `scam-alerts/`
- `print-centre.html`, `certificate.html`

Excluded: `_*`, `admin/`, `demo/`, `components/`, `white-label-demo/`, `test-*`, `google-site-verification-placeholder.html`

---

## Findings and Fixes

### og:title / og:description — MISSING (18 files fixed)

All 18 files had title, description, canonical, and viewport already — but were missing Open Graph tags.

**Fixed by adding og:title, og:description, og:type, og:url, og:site_name to all:**

| File | og:title added |
|------|---------------|
| resources/ai-tools-seniors.html | AI Tools for Seniors: What They Are and How to Use Them Safely |
| resources/digital-safety-seniors-ontario.html | Digital Safety for Seniors in Ontario: A Complete Guide |
| resources/how-to-spot-scams-canada.html | How to Spot Scams in Canada: What Every Senior Should Know |
| resources/index.html | Resource Articles — Digital Confidence Centre |
| resources/ipad-basics-seniors.html | iPad Basics for Seniors: Getting Started with Confidence |
| resources/online-banking-safety-canada.html | Online Banking Safety in Canada: A Senior's Guide |
| resources/video-calling-grandchildren.html | How to Video Call Your Grandchildren: A Step-by-Step Guide |
| tips/index.html | Tips & Updates |
| geo-content/how-to-spot-phone-scam.html | How do I know if a phone call is a scam? |
| geo-content/how-to-update-apps.html | How do I update my apps? |
| geo-content/how-to-use-etransfer-safely.html | How do I use e-transfer safely? |
| geo-content/how-to-video-call-grandchildren.html | How do I video call my grandchildren? |
| geo-content/is-it-safe-to-shop-online.html | Is it safe to shop online? |
| geo-content/is-this-email-safe.html | Is this email safe to open? |
| geo-content/online-banking-safely.html | How do I set up online banking safely? |
| geo-content/what-is-a-strong-password.html | What is a strong password? |
| geo-content/what-is-phishing.html | What is phishing? |
| geo-content/what-to-do-if-scammed.html | What should I do if I think I have been scammed? |

### ia-interview-prep.html — FIXED

- Was missing: meta description, canonical URL
- Was incorrectly marked `robots: index, follow` (this is an internal tool)
- Fixed: added meta description, canonical, changed robots to `noindex, nofollow`

### geo-content/index.html — NOT FIXED (intentional)

This is an internal GEO Intent Mapping working document, not a public page. No fix needed.

---

## All Clear

| Check | Status |
|-------|--------|
| `<title>` present | All public pages pass |
| `meta name="description"` | All public pages pass (only geo-content/index.html was missing — internal doc) |
| `rel="canonical"` | All public pages pass (ia-interview-prep.html fixed) |
| `og:title` | 18 files fixed; all public pages now pass |
| `og:description` | 18 files fixed; all public pages now pass |
| `meta viewport` | All public pages pass |
| `lang` attribute on `<html>` | All public pages pass |
