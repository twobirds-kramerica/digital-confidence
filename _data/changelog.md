# Digital Confidence Centre — Changelog

## DCC v2.0 — March 2026 Sprint

This document summarises all changes made during the March 2026 development sprint, compiled from git log.

---

### Content & Modules

- **Module 17** added: Using AI for Research (`module-17-ai-research.html`)
- **Module 16** added: Staying Safe When You Travel (`module-16-travel-safety.html`)
- **Module 15**: Telehealth & Medical Portals
- **Module 14**: Smart Home Basics
- **Module 13**: Understanding Social Media
- **Module 12**: Getting the Help You Deserve
- **Module 2.5**: Everyday Digital Tasks (new mid-series module)
- **Scam Simulator** expanded to 50 scenarios, including QR code fraud and AI voice cloning
- **Quick Answers hub** launched with 20 definitive senior Q&A pages (`answers/`)
- **AEO answer pages** — 20 full Schema.org answer pages added
- **Senior Stars** section added (replaces Comic Corner)
- **iA interview prep tool** added (`ia-interview-prep.html`)
- **P3 prototype** (Personal Priority Partner) created (`p3-prototype.html`)

### Infrastructure & Technical

- **Phase 15 final infrastructure pass** — general cleanup and hardening
- **White-label system** created — London Public Library demo + config template (`white-label/`, `white-label-config/`)
- **GitHub Actions** — deploy check and monthly report workflows added (`.github/workflows/`)
- **Scam ecosystem** — 50 scenarios, scam alerts page, scam of the month feed (`scam-alerts/`, `data/scam-of-month.json`)
- **Resource ecosystem** — helplines, device guides, updated hub (`resources/`)
- **SEO technical audit** — titles, metas, canonicals, OG tags corrected across all pages
- **Analytics guide** — GA4 event reference admin page with PIN gate (`admin/`)
- **French audit** — hreflang added, lang switcher updates `html[lang]`
- **Module ecosystem polish** — headers, summaries, star ratings, section progress tracking

### Living Content System (Phase 5 — March 27, 2026)

- `_data/whats-new.json` created — feeds the What's New section on the home page
- `_data/tips-index.json` created — index of all 8 tip articles with dates and metadata
- **What's New section** added to `index.html` (between module grid and Scam Alert)
- **Footer version** updated: "DCC v2.0 — March 2026" added to footer copy paragraph
- `_data/changelog.md` (this file) created

### Senior UX Patterns (Phase 6 — March 27, 2026)

- `js/confirm-dialogs.js` created — friendly confirmation dialogs for `data-confirm` elements
- `js/app.js` updated — milestone celebration banners at 4, 8, 12, 16 completed modules
- `js/help-button.js` created — floating "? Help" button with About / Feedback / Call for Help popover
- `css/main.css` updated — styles for confirm dialogs, milestone banners, and help button
- `_audit/readability-audit-march27.md` created — Grade 7-8 readability assessment

---

### Localisation

- Canadian English throughout (Centre, Colour, Labour, Practise, Programme)
- Ontario-specific resources, phone numbers, and examples
- Bilingual (EN/FR) support on all major pages

---

*Maintained by Aaron Kramer, Two Birds Innovation. St. Thomas, Ontario.*
