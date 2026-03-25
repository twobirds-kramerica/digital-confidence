# White-Label Demo — First Credit Union
## Digital Confidence Centre — Client Demo Package

This directory contains a fully functional white-label demonstration of the Digital Confidence Centre, branded for a fictional "First Credit Union" client.

**Purpose:** Sales demonstrations to credit unions, libraries, banks, and other organisations.

---

## Files in This Directory

| File | Description |
|------|-------------|
| `index.html` | Rebranded homepage — First Credit Union branding |
| `modules/module-1.html` | Sample module — "Digital Safety Basics" |
| `css/white-label.css` | All client branding in one CSS file |
| `BRANDING-GUIDE.md` | How to customise for a different client |
| `PRICING.md` | Three-tier pricing model |
| `screenshots/` | Placeholder for demo screenshots |

---

## How to View the Demo

**Option 1 — Open directly in browser:**
```
white-label-demo/index.html  → Double-click to open
```

**Option 2 — Local server (for full JS functionality):**
```bash
cd white-label-demo
npx serve .
# Opens at http://localhost:3000
```

**Note:** Some JavaScript features (localStorage, progress saving) require a proper server or the browser's local file permissions. For a pure demo, Option 2 is recommended.

---

## What the Demo Shows

- Full custom branding (colours, logo bar, footer)
- First Credit Union identity throughout
- Module content unchanged (high quality, tested curriculum)
- Accessibility features working (font sizing, dark mode, dyslexia font)
- Responsive layout (works on iPad, desktop, mobile)
- DICO/CCUA trust indicators appropriate for credit unions

---

## Using This in a Sales Meeting

1. Open `index.html` in Chrome or Firefox before the meeting
2. Zoom browser to 125% to simulate how older users see it
3. Walk through the hero section: point out the rebranding
4. Open a module: show the content quality and accessibility features
5. Toggle dark mode (🌓 button) to show accessibility options
6. Change font size to "XL" to show senior-friendly design

**Key talking points:**
- Content is Canadian — Ontario-specific resources, Canadian examples
- Fully accessible: WCAG AA compliant, tested with seniors 70+
- No backend needed — runs as static files on any web server
- Implementation timeline: 2 weeks from contract to live site
- Client owns the deployment — no ongoing SaaS fees

---

## Quick Client Swap (5 Minutes)

To rebrand for a different prospect before a meeting:

1. Open `css/white-label.css`
2. Change the two hex colours in `:root` (lines 14–22)
3. Open `index.html`, find/replace "First Credit Union" with prospect name
4. Change the tagline and stats
5. Save and refresh browser

Full branding guide: `BRANDING-GUIDE.md`
