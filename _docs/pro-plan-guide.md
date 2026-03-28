# Pro Plan Upgrade Guide — Digital Confidence Centre

**Last updated:** March 2026
**Applies to:** GitHub Pages → paid hosting transition

---

## Current Setup (Free Tier)

| Service | Plan | Limit |
|---------|------|-------|
| GitHub Pages | Free | 1 GB storage, 100 GB bandwidth/month |
| Cloudflare | Free | Unlimited bandwidth, basic WAF |
| Formspree | Free | 50 feedback submissions/month |
| Google Analytics | Free | Up to 10M events/month |

---

## When to Upgrade

### Upgrade Formspree → Paid ($8 USD/month)
**Trigger:** Receiving 40+ feedback submissions/month
**What you get:** Unlimited submissions, spam filtering, file attachments, email notifications with full body text
**How:** formspree.io → upgrade plan → no code changes needed (same endpoint URL)

### Upgrade GitHub → GitHub Pro ($4 USD/month)
**Trigger:** Needing private repos, advanced PR controls, or GitHub Actions minutes exceed free tier (2,000 min/month)
**What you get:** More Actions minutes, required reviewers, protected branches, GitHub Insights
**Impact:** No change to the live site — admin/workflow only

### Move to Cloudflare Pages (Free → still free, but more capable)
**Trigger:** Needing server-side rendering, Edge Functions, or deploy previews
**What you get:** Preview deployments per branch, Web Analytics, faster global CDN
**How:** Connect repo to Cloudflare Pages instead of GitHub Pages. Change DNS to point to Cloudflare Pages URL.

### Upgrade Cloudflare → Pro ($20 USD/month)
**Trigger:** DDoS attacks, needing WAF rules, image optimisation, or >100k monthly visitors
**What you get:** Advanced WAF, Polish image optimisation, Mirage for mobile, priority support
**Impact:** No code changes — all at DNS/proxy level

---

## Recommended Upgrade Path

```
Now:      GitHub Pages (free) + Cloudflare Free + Formspree Free
~500/mo:  + Formspree paid ($8 USD/mo)
~2,000/mo:+ Cloudflare Pro ($20 USD/mo) + GitHub Pro ($4 USD/mo)
~5,000/mo: Consider migrating to Cloudflare Pages (still free) for deploy previews
```

---

## Custom Domain Notes

- Domain: `digitalconfidencecentre.ca` — registered separately (Namecheap, Google Domains, etc.)
- DNS managed through Cloudflare (nameservers pointed to Cloudflare)
- HTTPS: Handled automatically by Cloudflare SSL — no certificates to manage
- To change the live URL: update `CNAME` file in repo root + update canonical tags in all HTML

---

## Formspree Backup Endpoint

If Formspree becomes unavailable:
1. Sign up at web3forms.com (free, CORS-safe)
2. Replace `https://formspree.io/f/xeerqryj` in `js/feedback-github.js` line 13
3. Update the Web3Forms key in the same file
4. No other changes needed

---

## Cost Summary (Recommended Steady State)

| Service | Monthly Cost |
|---------|-------------|
| GitHub Pro | $4 USD |
| Cloudflare Pro | $20 USD |
| Formspree Starter | $8 USD |
| Domain renewal | ~$2 USD (amortised) |
| **Total** | **~$34 USD/month** |

This is the full professional stack. Start at $0 and add services only when you hit limits.
