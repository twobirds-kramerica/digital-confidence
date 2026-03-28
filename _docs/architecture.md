# Digital Confidence Centre — Architecture Reference
**Last updated:** 2026-03-28
**Stack:** Static HTML / CSS / JavaScript — GitHub Pages + Cloudflare

---

## Overview

The Digital Confidence Centre is a fully static web application. There is no server, no build step, no npm, and no backend. Every file is a plain HTML, CSS, or JavaScript file that GitHub Pages serves directly.

This is an intentional constraint — it eliminates hosting costs, maximises reliability, and ensures the platform can be maintained by a single developer without infrastructure expertise.

---

## Repository Structure

```
brenda-digital-confidence/
│
├── index.html                    ← Homepage
├── module-1.html … module-19.html  ← Learning modules (21 files inc. 2.5 + visual-ai)
├── final-quiz.html               ← Final assessment
├── certificate.html              ← Certificate of completion
├── resources.html                ← Ontario resources directory
├── about.html                    ← About page
├── glossary.html                 ← Tech glossary
├── accessibility.html            ← Accessibility statement
├── faq.html / faq-fr.html        ← FAQ (bilingual)
├── 404.html                      ← Custom error page
│
├── css/                          ← Stylesheets
│   ├── styles.css                ← Main stylesheet (design tokens, layout, components)
│   ├── module.css                ← Module-specific styles
│   └── ...                       ← Additional component styles
│
├── js/                           ← JavaScript files (all client-side)
│   ├── utils.js                  ← Shared utility functions (DCC namespace)
│   ├── storage-keys.js           ← localStorage key registry (DCC_KEYS)
│   ├── lang-toggle.js            ← Bilingual toggle (data-en / data-fr attributes)
│   ├── analytics-consent.js      ← Consent gate for GA4 + Clarity
│   ├── analytics-events.js       ← GA4 custom events
│   ├── feedback-github.js        ← Feedback form (Formspree + Web3Forms)
│   ├── module-complete.js        ← Module completion tracking
│   ├── module-enhancements.js    ← Confidence checks, progress indicators
│   ├── progress.js               ← Overall progress tracking
│   ├── onboarding.js             ← First-visit onboarding flow
│   ├── homepage-v2.js            ← Homepage interactive features
│   ├── settings.js               ← Accessibility settings panel
│   ├── final-quiz.js             ← Final assessment logic
│   ├── search.js                 ← Site search
│   ├── lang-toggle.js            ← English/French toggle
│   └── ...                       ← ~40 additional scripts (see /js/ directory)
│
├── _b2b/                         ← B2B sales and outreach (not served publicly)
│   └── outreach-sequences/       ← 6 email sequences (28 emails, markdown)
│
├── _grants/                      ← Grant applications (not served publicly)
│   └── applications/             ← NHSP, OTF, SBEC applications
│
├── _docs/                        ← Developer documentation (not served publicly)
│   ├── architecture.md           ← This file
│   ├── clarity-setup.md          ← Clarity Analytics setup guide
│   └── handoff-to-pro-plan.md    ← Pro plan handoff notes
│
├── _audit/                       ← Audit outputs (not served publicly)
│   ├── meta-descriptions-audit.md
│   └── schema-validation-march27.md
│
├── _social/                      ← Social content files (not served publicly)
│   └── linkedin-posts-v2.json    ← LinkedIn content calendar
│
├── _analytics/                   ← Analytics exports (not served publicly)
├── _marketing/                   ← Marketing materials (not served publicly)
├── _strategy/                    ← Strategy documents (not served publicly)
│
├── images/                       ← Images and icons
├── data/                         ← JSON data files
├── lang/                         ← Language files
├── components/                   ← Reusable HTML components
│
├── sitemap.xml                   ← XML sitemap (109 URLs)
├── robots.txt                    ← Search engine directives
├── manifest.json                 ← PWA manifest
└── CLAUDE.md                     ← AI assistant project instructions
```

---

## Module Structure

Every module follows the same HTML structure:

```html
<!-- 1. Breadcrumb -->
<nav class="breadcrumb">...</nav>

<!-- 2. Module header -->
<header class="module-header">
  <h1 data-en="..." data-fr="...">...</h1>
  <p class="module-intro" data-en="..." data-fr="...">...</p>
</header>

<!-- 3. Lesson sections (repeat per topic) -->
<section class="lesson-section">
  <h2 data-en="..." data-fr="...">...</h2>
  <p data-en="..." data-fr="...">...</p>
  <!-- Confidence check at end of each section -->
  <div class="confidence-check">...</div>
</section>

<!-- 4. What you learned summary -->
<section class="what-you-learned">...</section>

<!-- 5. Module navigation -->
<nav class="module-navigation">
  <a href="module-N.html" class="nav-prev">← Previous</a>
  <a href="module-N+1.html" class="nav-next">Next →</a>
</nav>

<!-- 6. Mark complete button -->
<button class="mark-complete-btn">...</button>
```

---

## Bilingual System

All visible text uses `data-en` and `data-fr` attributes:

```html
<p data-en="Hello" data-fr="Bonjour">Hello</p>
```

`lang-toggle.js` swaps the displayed text when the user toggles language. The current language is stored in `localStorage` under the key `dc-lang`.

The language toggle button in the navigation sets `dc-lang` and re-renders all `data-en`/`data-fr` elements.

---

## Analytics Consent Gate

Analytics (GA4 + Microsoft Clarity) are **not loaded** until the user explicitly consents.

```javascript
// In analytics-consent.js
if (localStorage.getItem('analytics_consent') === 'true') {
  // Load GA4
  // Load Clarity
}
```

The consent prompt is shown on first visit via `onboarding.js`. Users can change their preference in the settings panel.

**GA4 Measurement ID:** G-XXXXXXXXXX (update in `analytics-events.js`)
**Clarity Project ID:** Replace `CLARITY_PROJECT_ID` placeholder in all HTML files (see `_docs/clarity-setup.md`)

---

## Feedback Form

The feedback form submits to two endpoints:

1. **Primary:** Formspree (`https://formspree.io/f/xeerqryj`) — CORS-safe, 50/month free tier
2. **Secondary:** Web3Forms (fire-and-forget, silent fail on error)

Both are configured in `js/feedback-github.js`. Do not use the GitHub Issues API — it does not support CORS from browsers.

---

## Deployment

**Hosting:** GitHub Pages (`twobirds-kramerica/digital-confidence`)
**CDN:** Cloudflare (proxied via CNAME)
**Domain:** [CNAME file] — configured via Cloudflare

**Push to deploy:**
```bash
git push origin main
```
GitHub Actions (if configured) runs post-push checks. No build step required.

---

## localStorage Key Registry

All localStorage keys are documented in `js/storage-keys.js` under the `DCC_KEYS` global object. When adding new keys, register them there first.

Key naming convention:
- User preferences: `dc-[name]` (e.g. `dc-theme`, `dc-lang`)
- Module progress: `dc-module-[N]` (e.g. `dc-module-1`)
- Onboarding: `dcc_[name]` (e.g. `dcc_onboarded`)
- Analytics: `analytics_consent`
- Legacy keys (pre-2026): `brenda-[name]` — being phased out, migrated on first load

---

## Known Technical Debt (as of March 2026)

1. **Mixed localStorage key namespaces** — legacy `brenda-*` keys coexist with `dc-*` keys. Migration logic is in `settings.js`. Not urgent but creates confusion.
2. **Script load order not enforced** — `utils.js` and `storage-keys.js` should load before all other scripts but this is not currently guaranteed on all pages.
3. **No bundling** — ~40 separate script tags per page. No performance impact at current traffic levels but will need attention at scale.
4. **Console warnings** — some modules reference scripts that are loaded conditionally; this produces benign "not a function" warnings in browser console on pages where those scripts are absent.
5. **Inconsistent module nav** — modules 1–15 use one nav pattern; 16–19 use a slightly different pattern. Should be normalised when time permits.
