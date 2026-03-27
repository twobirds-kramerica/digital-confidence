# Cloudflare Readiness — Digital Confidence Centre

## Current Deployment
- **Platform:** GitHub Pages (twobirds-kramerica.github.io/digital-confidence)
- **CDN:** None (GitHub Pages serves directly from origin)
- **DNS:** Managed by Cloudflare already via CNAME (if custom domain is configured)
- **CNAME file:** `/CNAME` in repo root

---

## What Cloudflare Provides (Paid or Free)

| Feature | Free Tier | Impact |
|---|---|---|
| Global CDN (200+ nodes) | ✅ | Faster load times worldwide |
| DDoS protection | ✅ | Site stays up under attack |
| SSL/TLS (HTTPS) | ✅ | Already via GitHub Pages but Cloudflare manages cert rotation |
| Browser caching | ✅ | CSS/JS cached at edge for returning users |
| Analytics (basic) | ✅ | Lightweight, privacy-respecting |
| Image optimisation | Pro ($25/mo) | Auto WebP conversion, lazy loading via CDN |
| Workers (edge functions) | Free (limited) | Could power A/B testing, personalisation |
| Pages (alternative host) | ✅ | Could replace GitHub Pages entirely |
| Web Application Firewall | Pro | Block malicious bots and scrapers |

---

## What Changes on Migration

### No-change items (already works)
- All static HTML, CSS, JS files serve identically through Cloudflare
- All internal links and relative URLs work unchanged
- GitHub Pages remains the origin; Cloudflare proxies in front of it
- Service worker and localStorage continue to work normally

### Items requiring update when migrating

| File | Change Required |
|---|---|
| `CNAME` | Update to point to `digital-confidence.ca` or new domain if switching |
| `sitemap.xml` | Update all `<loc>` URLs from `twobirds-kramerica.github.io/digital-confidence/` to new domain |
| All `<link rel="canonical">` tags | Update from GitHub Pages URL to new custom domain |
| All `<meta property="og:url">` tags | Update to new domain |
| All schema `"url"` properties in `<script type="application/ld+json">` | Update to new domain |
| GA4 `config` and `gtag` calls | No change needed — GA4 ID stays the same |
| Formspree endpoint | No change needed — Formspree is CORS-safe regardless of domain |
| `js/analytics-consent.js` | No change needed |

### Files that reference the GitHub Pages URL (count)
Run this to find all hardcoded GitHub Pages URLs before migration:
```
grep -r "twobirds-kramerica.github.io" --include="*.html" --include="*.js" --include="*.xml" . | wc -l
```

---

## Estimated Effort

**Total: Low — 2 to 3 hours**

| Task | Time |
|---|---|
| Set up Cloudflare account and add site | 15 min |
| Point DNS to Cloudflare nameservers | 15 min + up to 24h propagation |
| Configure SSL/TLS to Full (Strict) | 5 min |
| Run domain URL replacement script (Node.js) | 30 min |
| Update sitemap.xml URLs | 15 min |
| Test all pages and forms post-migration | 60 min |
| Update GA4 property with new domain | 10 min |

---

## Recommended Trigger

Migrate to Cloudflare (with custom domain) when either of these occurs:
1. **1,000 monthly active visitors** — performance becomes meaningful at this scale
2. **B2B pilot begins** — institutional buyers expect a professional domain, not github.io

Do NOT migrate before a B2B pilot just for aesthetics. GitHub Pages is reliable and the
current setup has zero hosting cost.

---

## Recommended Custom Domain

`digitalconfidence.ca` or `digital-confidence.ca` — check availability at a Canadian registrar
(e.g., CIRA via Namecheap or Hover). `.ca` domains cost approximately $15–25/year.

---

## Implementation Notes

When the time comes, the URL replacement can be done with a single Node.js script:

```javascript
// Replace all occurrences of GitHub Pages URL with new domain
const OLD = 'https://twobirds-kramerica.github.io/digital-confidence';
const NEW = 'https://digital-confidence.ca'; // update to actual domain
// ... walk all files and replace
```

All other Cloudflare configuration (cache rules, security headers, WAF) can be managed
entirely from the Cloudflare dashboard — no code changes required.

---

*Last updated: 2026-03-27 — Two Birds Innovation*
