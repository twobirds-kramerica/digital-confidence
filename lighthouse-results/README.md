# Lighthouse Results — Digital Confidence Centre

## Purpose

This directory stores Lighthouse audit results from Chrome DevTools. Run audits before any product is shown to a client — the scores are proof of quality.

## How to Run a Lighthouse Audit

1. Open Chrome and navigate to the product URL
2. Open DevTools (F12 or right-click → Inspect)
3. Click the **Lighthouse** tab
4. Select categories: **Performance**, **Accessibility**, **Best Practices**, **SEO**
5. Device: **Mobile** (primary audience uses iPads, so mobile is the right test)
6. Click **Analyze page load**
7. Screenshot or export the results (click the download icon)
8. Save the HTML report to this directory with naming convention: `[product]-[date].html`

## Naming Convention

```
dcc-homepage-2026-04-04.html
dcc-module-1-2026-04-04.html
career-coach-2026-04-04.html
clarity-2026-04-04.html
aaron-patzalek-2026-04-04.html
two-birds-innovation-2026-04-04.html
```

## URLs to Audit

| Product | URL |
|---------|-----|
| DCC Homepage | twobirds-kramerica.github.io/digital-confidence/ |
| DCC Module 1 | twobirds-kramerica.github.io/digital-confidence/module-1.html |
| DCC Module 20 | twobirds-kramerica.github.io/digital-confidence/module-20-internet-plan.html |
| Career Coach | twobirds-kramerica.github.io/career-coach/ |
| Clarity | twobirds-kramerica.github.io/clarity/ |
| Aaron Patzalek | twobirds-kramerica.github.io/aaron-patzalek/ |
| Two Birds Innovation | twobirds-kramerica.github.io/two-birds-innovation/ |

## Target Scores

| Category | Target | Notes |
|----------|--------|-------|
| Performance | 90+ | Static HTML should score very high |
| Accessibility | 95+ | WCAG AA is a core requirement |
| Best Practices | 90+ | No mixed content, proper HTTPS |
| SEO | 90+ | Meta tags, structured data, sitemap |

## When to Run

- Before sending the DCC pitch deck to a library director
- Before any product demo or client meeting
- After any major build sprint
- Monthly as part of quality review

## Notes

- GitHub Pages adds a small latency overhead — scores may be 5-10 points lower than local testing
- Run each audit 2-3 times and use the best score (Lighthouse has variance)
- If Accessibility drops below 90, fix immediately — this is a core brand promise
