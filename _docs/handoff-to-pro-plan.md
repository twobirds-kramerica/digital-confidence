# Handoff to Pro Plan — Digital Confidence Centre
**Date:** March 27, 2026
**Sprint:** Max Plan 72-Hour Build — COMPLETE

---

## What Was Built This Sprint

### Core User Experience
- **4-step onboarding overlay** — goal → tailored message → device → name. Runs once per visitor. Bilingual.
- **Homepage V2 personalisation** — recommended module badge, device-specific tip, "Continue where you left off" section
- **Module quiz ecosystem** — 85 questions (17 modules × 5 each). Pass 4/5 to unlock completion. Adaptive final quiz skips mastered modules.
- **Leaderboard + enhanced certificate** — personal best, attempt count, last 5 scores. Certificate with cert number, name, date, share button.

### Accessibility & UX
- **Accessibility AAA** — ARIA live announcements, keyboard shortcuts page (/accessibility/shortcuts.html), reading guide, reduce animations, xxl/xxxl font sizes, high contrast
- **Senior UX patterns** — friendly confirm dialogs, milestone celebration banners (4/8/12/16 modules), floating ? Help button
- **What's New section** on homepage — JSON-driven, 3 current cards

### Content & Resources
- **Interactive Tools Hub** — /interactive/index.html (9 tools)
- **Senior Tech Myth Busters** — /resources/myth-busters.html (10 myths)
- **Glossary by Topic** — /resources/glossary-by-topic.html (82 terms, 5 groups)
- **Quick Reference Cards** — /resources/quick-reference-cards.html (5 printable cards)

### B2B
- **Demo hub** — /demo/index.html (PIN: 2026, 3 demo options, 30-min countdown timer)
- **Sales talking points** — /demo/talking-points.html (5-section presentation guide, objection handlers, pricing)
- **ROI calculator** — enhanced with senior count, digital services usage rate

### SEO & Technical
- **Meta descriptions** — 47 pages fixed, all now 150–160 chars unique
- **JSON-LD validation** — 210 blocks across 81 files, all valid
- **Google Search Console** — placeholder tag in index.html, setup guide at /_docs/gsc-setup.md
- **Microsoft Clarity** — placeholder ID in all pages, setup guide at /_docs/clarity-setup.md
- **humans.txt, security.txt** — infrastructure files
- **Sitemap** — 107 URLs

---

## What's Ready to Use Immediately

| Feature | Where | How to Test |
|---------|-------|-------------|
| Onboarding | Clear `dcc_onboarded` from localStorage, reload index.html | 4-step overlay appears |
| Module quizzes | Any module page | Scroll to bottom, click "Test my understanding" |
| Adaptive final quiz | /final-quiz.html | Pass several module quizzes first to see skipped modules |
| B2B demo | /demo/index.html (PIN: 2026) | Full sales presentation mode |
| Myth Busters | /resources/myth-busters.html | 10 cards with ratings |
| Glossary by Topic | /resources/glossary-by-topic.html | 5 collapsible sections |
| Quick Reference Cards | /resources/quick-reference-cards.html | Print individual cards |
| Interactive hub | /interactive/ | 9 tools linked |

---

## Aaron's Outstanding Actions (see Gmail draft: "AARON HUMAN SPRINT")

| Code | Action | Priority |
|------|--------|----------|
| A5 | Update Formspree beta endpoint when ready | P2 |
| A7 | Enable Cloudflare Access on /admin/* | P2 |
| A9 | Confirm B2B pricing (Starter $4,800 / Pro $12,000 / Enterprise $24,000) | P2 |
| A10 | Verify Unsplash licence on senior-woman-ipad.jpg | P2 |
| A12 | Create two-birds-innovation GitHub repo and push | P2 |
| A13 | Google Search Console: verify site + submit sitemap.xml | P2 |

GSC setup guide: `/_docs/clarity-setup.md` (for Clarity) and `google-site-verification-placeholder.html` (for GSC).

---

## Recommended First 5 Prompts for Pro Plan

Keep each prompt to 1–3 phases, one repo at a time. These are ready to paste:

### Prompt 1 — B2B pricing publish
```
In twobirds-kramerica/digital-confidence:
Run git log --oneline -10.
Update /demo/talking-points.html and /b2b/pricing.html with confirmed pricing:
Starter: $4,800/yr, Professional: $12,000/yr, Enterprise: $24,000/yr.
No other changes.
Commit: "chore: B2B pricing confirmed and published"
Push.
```

### Prompt 2 — Clarity activation (after Aaron gets the Project ID)
```
In twobirds-kramerica/digital-confidence:
Run git log --oneline -10.
Replace all instances of CLARITY_PROJECT_ID with [REAL_ID] across all HTML files.
Verify no placeholder remains.
Commit: "chore: Microsoft Clarity configured"
Push.
```

### Prompt 3 — Two Birds Innovation GitHub push (after Aaron creates the repo)
```
In C:\Users\getkr\two-birds-innovation:
git remote add origin https://github.com/twobirds-kramerica/two-birds-innovation.git
git push -u origin master
Confirm pushed.
```

### Prompt 4 — Onboarding polish (after beta feedback)
```
In twobirds-kramerica/digital-confidence:
Run git log --oneline -10.
Review js/onboarding.js. Make these specific changes: [paste feedback].
Test that dcc_onboarded key is set correctly.
Commit and push.
```

### Prompt 5 — Resources index update
```
In twobirds-kramerica/digital-confidence:
Run git log --oneline -10.
Add links to myth-busters.html, glossary-by-topic.html, and quick-reference-cards.html
in resources/index.html — add 3 new article cards matching existing card style.
Commit: "feat: resources hub updated with March 2026 additions"
Push.
```

---

## How to Check Capacity Before Starting a Pro Plan Session

1. Go to **claude.ai** → click your profile → **Usage**
2. Check tokens/messages remaining for the billing period
3. For a 3-phase prompt: estimate ~30–40% of your daily Pro limit
4. If you're at 70%+ of daily limit, defer to next day

**Rule of thumb for Pro plan:** 5-phase max per prompt, one repo at a time. No parallel agent spawning on Pro — run phases sequentially.

---

## Architecture at a Glance

```
/                       — Homepage (personalised by js/homepage-v2.js)
/module-N.html          — 19 training modules (with module-quiz.js)
/final-quiz.html        — Final assessment (adaptive, quiz-enhancements.js)
/certificate.html       — Completion certificate
/answers/               — 20 AEO answer pages
/tips/                  — 8 tip articles
/resources/             — Helplines, guides, myth-busters, glossary-by-topic, quick-reference-cards
/interactive/           — 9-tool hub
/b2b/                   — B2B landing, pricing, case study template
/demo/                  — PIN-gated sales demo hub + talking points
/accessibility/         — Accessibility statement + shortcuts page
/scam-simulator.html    — 50-scenario scam practice tool
/glossary.html          — A–Z glossary (120+ terms)
/admin/                 — Internal analytics + performance (noindex)
```

**Live URL:** https://twobirds-kramerica.github.io/digital-confidence/
**Sitemap:** https://twobirds-kramerica.github.io/digital-confidence/sitemap.xml
