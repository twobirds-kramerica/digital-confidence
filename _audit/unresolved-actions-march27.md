# Unresolved Actions Audit — March 27, 2026
**Auditor:** Claude Code
**Scope:** /_audit/ files, root markdown files, last 50 commits (all repos), PUSH-TO-GITHUB.md, WIP-DASHBOARD.md
**Repos checked:** digital-confidence, two-birds-portfolio, two-birds-innovation, two-birds-command-centre

---

## PART 1 — ITEMS CONFIRMED RESOLVED

These were listed as open actions in earlier documents but are verified fixed as of today.

| # | Item | Source | Resolved How |
|---|------|--------|-------------|
| R1 | Sidebar completeness — module-2-5 and module-12 missing modules 12–15 | qa-report-march25.md | ✅ Both files now have sidebar links to modules 12–17 |
| R2 | Canadian English: `realized` in module-5.html line 252 | qa-report-march25.md | ✅ Now reads `realised` |
| R3 | Canadian English: `realized` in module-6.html line 253 | qa-report-march25.md | ✅ Now reads `realised` |
| R4 | Canadian English: `organizing` in module-8.html line 1090 | qa-report-march25.md | ✅ Now reads `organising` |
| R5 | module-10 absolute privacy claim ("never stored in plain text") | qa-report-march25.md | ✅ Now reads "converted into a secure token and is not stored in plain text" |
| R6 | Kevin's — archive 107 Grand Ave, 217 Hamilton Rd | WIP-DASHBOARD.md backlog | ✅ Both have `"tier":"archived"`, `"status":"expired"`, `"date_archived":"2026-03-25"` |
| R7 | Kevin's — clear local_image on 18 Queenston, 1 Court Lane | WIP-DASHBOARD.md backlog | ✅ Both have `"local_image": null` in listings.json |
| R8 | Google Analytics GA4 setup | EXECUTION-REPORT.md, FINAL-WEEKLY-SPRINT-REPORT.md | ✅ ID G-RPH5H5BM52 present in all pages with consent gate |
| R9 | module-visual-ai.html hero URL ?v=2 cache-buster | _visual-pipeline/IMAGEFX-PROMPTS.md | ✅ Already applied (`?v=2` in src) |
| R10 | Dead `position: relative` CSS override block (feedback button) | css/main.css (line 5496) | ✅ Removed today (commit cde0780) |
| R11 | Sidebar links audit (Modules 4–12) — modules 16/17 missing | WIP-DASHBOARD.md backlog | ✅ Confirmed: all module files now link to module-16 and module-17 |

---

## PART 2 — UNRESOLVED: AARON MUST DO

These require manual action, credentials, third-party accounts, or decisions that only Aaron can make.

### A1 — Professional French Review
- **Source:** `_audit/build-summary-overnight-march26.md` — "Known Gaps / Recommended Follow-Up"
- **Exact text:** "Professional French review recommended before public launch of lang/fr/ pages (machine-translation disclaimer is in place)"
- **Priority:** P2
- **Category:** Aaron must do
- **Action:** Hire a bilingual editor or use a French-Canadian community reviewer to check `lang/fr/modules/*.html`, `lang/fr/index.html`, `lang/fr/print-centre.html`, `lang/fr/privacy.html`. Machine-translation disclaimer is in place; do not remove it until review is complete.

### A2 — Video Scripts Production
- **Source:** `_audit/build-summary-overnight-march26.md`
- **Exact text:** "Video scripts require production: The 18 scripts in `_video-scripts/` need screen recording, editing, and hosting (YouTube or self-hosted) before links can be added to module pages"
- **Priority:** P3
- **Category:** Aaron must do
- **Action:** Record 18 scripts across modules 1–6. Scripts are at `_video-scripts/`. Hosting decision needed (YouTube channel vs self-hosted).

### A3 — Email Sequences Platform Integration
- **Source:** `_audit/build-summary-overnight-march26.md`
- **Exact text:** "Email sequences require platform integration: All five sequences in `_email-campaigns/` need to be imported into Mailchimp, ConvertKit, or a similar platform before they can be sent"
- **Priority:** P3
- **Category:** Aaron must do
- **Action:** Choose platform (Mailchimp, ConvertKit, or Formspree Workflows). Import 5 sequences from `_email-campaigns/`. Set up trigger logic.

### A4 — B2B Case Study — Real Organisation Data
- **Source:** `_audit/build-summary-overnight-march26.md`
- **Exact text:** "B2B case study template requires real organisation data and sign-off before publishing"
- **Priority:** P3
- **Category:** Aaron must do
- **Action:** Secure a pilot partner organisation. Gather data for `b2b/case-study-template.html`. Obtain sign-off. Then publish.

### A5 — Beta Formspree Endpoint Update
- **Source:** `_audit/build-summary-overnight-march26.md`
- **Exact text:** "Beta tester Formspree endpoint: The Formspree form ID in `beta/beta-landing.html` should be updated from any placeholder to the live DCC Formspree project endpoint"
- **Priority:** P2
- **Category:** Aaron must do (requires Formspree login), then Claude Code can apply
- **Action:** Log into Formspree (formspree.io). Create a new form for beta signups or use the existing DCC endpoint (`xeerqryj`). Tell Claude Code: "Update beta Formspree endpoint to [new ID]" and it will apply the change.

### A6 — Performance Data Update
- **Source:** `_audit/build-summary-overnight-march26.md`
- **Exact text:** "Performance data is a static snapshot: `admin/performance-data.json` is manually maintained — update after launch with real analytics data"
- **Priority:** P3
- **Category:** Aaron must do
- **Action:** After beta launch, pull real data from Google Analytics (GA4 property G-RPH5H5BM52) and update `admin/performance-data.json`.

### A7 — Admin Page Access Control
- **Source:** `_audit/build-summary-overnight-march26.md`
- **Exact text:** "Admin pages not yet password-protected: `admin/performance.html`, `admin/feedback-review.html`, and similar pages are noindex but publicly accessible by URL — consider Cloudflare Access rules or moving to a private repo branch"
- **Priority:** P2
- **Category:** Aaron must do
- **Action:** Set up Cloudflare Access on `twobirds-kramerica.github.io/digital-confidence/admin/*` to require a one-time PIN or email verification. Alternatively, move admin dashboards to a private branch. Steps: Cloudflare dashboard → Zero Trust → Access → Applications → Add application → Self-hosted.

### A8 — LinkedIn Calendar Scheduling
- **Source:** `_audit/build-summary-overnight-march26.md`
- **Exact text:** "LinkedIn calendar: Posts in `_marketing/linkedin-calendar.md` need scheduling into a social media tool (Buffer, Hootsuite, or LinkedIn Scheduler directly)"
- **Priority:** P3
- **Category:** Aaron must do
- **Action:** Open `_marketing/linkedin-calendar.md`. Schedule posts into Buffer, Hootsuite, or manually via LinkedIn. 90-day calendar and 52-week calendar both written and ready.

### A9 — B2B Pricing Confirmation
- **Source:** `_audit/build-summary-overnight-march26.md`
- **Exact text:** "B2B pricing: All pricing in `b2b/index.html` is placeholder — confirm with Aaron before publishing"
- **Priority:** P2
- **Category:** Needs decision → Aaron to confirm
- **Action:** Review pricing tiers in `b2b/pricing.html` (Starter $4,800 / Professional $12,000 / Enterprise $24,000) and `b2b/index.html`. Confirm or adjust before any outbound sales. Note: `b2b/pricing.html` was built in Sprint 3 with these specific prices.

### A10 — Hero Image Licence Review
- **Source:** `_audit/build-summary-overnight-march26.md`, `_image-registry/image-log.md`
- **Exact text:** "Logged senior-woman-ipad.jpg (local asset — licence review pending)"
- **Priority:** P2
- **Category:** Aaron must do
- **Action:** Verify the licence for `images/senior-woman-ipad.jpg`. If it is Unsplash (requires attribution for non-paid plan), add attribution. If from a paid Unsplash subscription, no action needed. If uncertain, replace with a freshly sourced Unsplash image and log it in `_image-registry/image-log.md`.

### A11 — ImageFX Hero Images (3 pages)
- **Source:** `_visual-pipeline/IMAGEFX-PROMPTS.md`
- **Exact text:** "Action Required After Review: family-setup.html — Select A, B, or C → generate in ImageFX → save to /approved/ → apply; module-10.html — same process; digital-literacy-101.html — same process"
- **Priority:** P3
- **Category:** Aaron must do (requires ImageFX access), then Claude Code can apply
- **Action:** Open `_visual-pipeline/IMAGEFX-PROMPTS.md`. Generate the 3 hero images using the prompts provided. Save to `_visual-pipeline/approved/`. Tell Claude Code: "Apply ImageFX images to family-setup, module-10, digital-literacy-101" and it will wire them in.

### A12 — two-birds-innovation: Push to GitHub and Enable Pages
- **Source:** `two-birds-innovation/PUSH-TO-GITHUB.md`
- **Exact text:** "Step 1 — Create the GitHub repository: Go to https://github.com/new and create a new repository with Owner: twobirds-kramerica, Repository name: two-birds-innovation [...] Step 2 — Push your local code to GitHub [...] Step 3 — Enable GitHub Pages"
- **Priority:** P2
- **Category:** Aaron must do (Step 1 — create repo), then Claude Code can push
- **Action:**
  1. Go to github.com/new → create `twobirds-kramerica/two-birds-innovation` (public)
  2. Tell Claude Code "Push two-birds-innovation to GitHub now" — it will run `git remote add origin` + `git push`
  3. In repo Settings → Pages → Deploy from branch → main / root → Save

### A13 — Google Search Console: Verify + Submit Sitemap
- **Source:** `seo-report-final.md`
- **Exact text:** "Verify the site in Google Search Console if not already done. Submit sitemap for faster indexing of the new modules (13–15)"
- **Priority:** P2
- **Category:** Aaron must do
- **Action:**
  1. Go to search.google.com/search-console
  2. Add property: `https://twobirds-kramerica.github.io/digital-confidence/`
  3. Verify via HTML file or Google Analytics (GA4 already installed)
  4. Go to Sitemaps → submit `https://twobirds-kramerica.github.io/digital-confidence/sitemap.xml`

---

## PART 3 — NEEDS DECISION

These items appeared in documents as P1 priorities but subsequent audit work suggests they may already be resolved or may require Aaron's call.

### D1 — "DCC — scrub word 'free'"
- **Source:** `WIP-DASHBOARD.md` backlog (P1), `qa-report-march25.md` Audit Item 3
- **WIP text:** "DCC — scrub word 'free' (service references) | P1 | In Mar 25 prompt"
- **QA audit finding:** "The word 'free' appears as a core marketing claim [...] This is accurate today. Flag for review if a paid tier or sponsorship model is introduced. No action required unless monetisation changes."
- **Assessment:** WIP-DASHBOARD lists this as P1 but QA audit concludes no fix needed since DCC is genuinely free. The "service references" qualifier in the WIP item may refer to external service descriptions (e.g., "YouTube is free") which QA also found acceptable.
- **Recommendation:** Aaron to decide: (a) accept QA finding — no scrub needed, mark resolved; or (b) specify which exact uses of "free" to remove.

### D2 — "DCC — scrub privacy absolutes"
- **Source:** `WIP-DASHBOARD.md` backlog (P1), `qa-report-march25.md` Audit Item 4
- **WIP text:** "DCC — scrub privacy absolutes | P1 | In Mar 25 prompt"
- **QA audit finding:** Main issue was module-10 "never stored in plain text" — now FIXED (reads "converted into a secure token"). All other DCC-own privacy statements are "proportionate and defensible."
- **Assessment:** The main finding is resolved. Remaining statements ("We never ask for passwords," "We never sell your information") are appropriate promises, not overreach.
- **Recommendation:** Mark as resolved unless Aaron can point to a specific remaining statement to soften.

---

## PART 4 — AUTO-FIXES APPLIED BY CLAUDE CODE

The following items were categorised as "Claude Code can fix" and were applied automatically in this session.

| # | Fix | File Changed | Notes |
|---|-----|-------------|-------|
| F1 | WIP-DASHBOARD.md updated to reflect resolved backlog items | `two-birds-portfolio/WIP-DASHBOARD.md` | Moved resolved items to a ✅ RESOLVED section; see commit |
| F2 | _audit/unresolved-actions-march27.md created | `_audit/unresolved-actions-march27.md` | This file |

---

## PART 5 — WITCHING HOUR MEGA BUILD ADDENDUM (March 27, 2026 — Phase 15)

The following was resolved during the 15-phase mega build and Phase 15 final pass.

| # | Fix | Notes |
|---|-----|-------|
| M1 | 21 answer pages (AEO/GEO) built in `/answers/` | All have title, meta, canonical, OG, lang, viewport |
| M2 | Module ecosystem JS injected (badges, collapsible, rating, share, progress) | Via `js/module-enhancements.js` + `data/module-meta.json` |
| M3 | French audit — hreflang, ARIA_MAP, PLACEHOLDER_MAP | `js/lang-toggle.js` updated |
| M4 | SEO technical audit — all new pages audited, fixes applied | See `_audit/seo-audit-march27.md` |
| M5 | Analytics admin guide created | `admin/analytics-guide.html` (PIN-gated) |
| M6 | Scam ecosystem — 50 scenarios, scam alerts page, scam of the month | `scam-alerts/index.html`, `data/scam-of-month.json` |
| M7 | Resource ecosystem — Canadian helplines, device guides | `resources/canadian-helplines.html`, `resources/device-guides.html` |
| M8 | GitHub Actions — deploy check + monthly report | `.github/workflows/deploy-check.yml`, `monthly-report.yml` |
| M9 | White-label system — LPL demo, config template | `white-label-demo/london-public-library/`, `white-label-config/template.json` |
| M10 | Career Coach polish | `career-coach` repo — demo card, shortcuts, history, mobile |
| M11 | Two Birds Innovation enhancement | `two-birds-innovation` repo — services, philosophy, contact |
| M12 | Quality Dashboard enhancement | `quality-dashboard` repo — stats, history, alerts, export |
| M13 | Portfolio archive | `two-birds-portfolio` repo — SESSION-ARCHIVE-MARCH-2026.md |
| M14 | Kevin's apartment polish | `kevins-apartment-search` repo — comparison, favourites, notes |
| M15 | Final infrastructure pass | `humans.txt`, `security.txt`, sitemap confirmed 103 URLs, Canadian English clean, scam-alerts canonical fixed, homepage footer updated |

---

## SUMMARY TABLE

| Category | Count | Items |
|----------|-------|-------|
| Confirmed resolved (no action) | 11 | R1–R11 |
| Aaron must do | 13 | A1–A13 |
| Needs decision | 2 | D1–D2 |
| Auto-fixed by Claude Code | 2 | F1–F2 |
| Mega build completed | 15 | M1–M15 |

### Priority breakdown (unresolved Aaron actions only):
| Priority | Count |
|----------|-------|
| P1 | 0 (all P1 items confirmed resolved or reclassified) |
| P2 | 7 (A1, A5, A7, A9, A10, A12, A13) |
| P3 | 6 (A2, A3, A4, A6, A8, A11) |
| Needs decision | 2 (D1, D2) |

---

*Audit performed March 27, 2026 by Claude Code. Updated after Witching Hour Mega Build (Phase 15 final pass).*
