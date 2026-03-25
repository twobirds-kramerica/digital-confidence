# White-Label Branding Guide
## Digital Confidence Centre — Client Customisation Reference

This guide explains how to rebrand the Digital Confidence Centre for a new client.
Estimated time to complete: **2–4 hours** for a basic brand, **1–2 days** for full customisation.

---

## Step 1: Gather Client Assets

Before starting, collect from the client:

| Asset | Format | Notes |
|-------|--------|-------|
| Logo | SVG or PNG (transparent background) | Minimum 200×60px |
| Primary colour | Hex code | e.g. `#003B5C` |
| Accent colour | Hex code | e.g. `#00A651` |
| Tagline | Text | e.g. "Your Financial Partner for Life" |
| Organisation name | Text | e.g. "First Credit Union" |
| Support phone | Text | For the contact callout in footer |
| Member count or stat | Text | e.g. "50,000+ members" |
| Trust certifications | Text | e.g. DICO, FSRA, etc. |

---

## Step 2: Create the White-Label Directory

```bash
# From the project root
cp -r white-label-demo white-label-[client-slug]
cd white-label-[client-slug]
```

Example: `white-label-elgin-credit-union`

---

## Step 3: Update the CSS Variables (white-label.css)

Open `css/white-label.css` and update the `:root` block:

```css
:root {
  --accent-primary:    [CLIENT ACCENT COLOUR];   /* e.g. #00A651 */
  --accent-secondary:  [CLIENT PRIMARY COLOUR];  /* e.g. #003B5C 1*/
  --accent-hover:      [DARKER ACCENT];          /* e.g. #007A3D */
  --sidebar-bg:        [CLIENT PRIMARY COLOUR];  /* e.g. #003B5C */
  --top-bar-bg:        [CLIENT PRIMARY COLOUR];  /* e.g. #003B5C */
}
```

Also update the `.wl-hero` gradient:
```css
.wl-hero {
  background: linear-gradient(135deg, [PRIMARY] 0%, [SLIGHTLY LIGHTER] 100%);
}
```

---

## Step 4: Update the Homepage (index.html)

Find and replace the following in `index.html`:

| Find | Replace with |
|------|-------------|
| `First Credit Union` | Client organisation name |
| `Your Financial Partner for Life` | Client tagline |
| `Serving 50,000+ members across Ontario` | Client's actual member/patron count |
| `DICO Member — Deposits Protected` | Client's relevant trust certification |
| `CCUA Member` | Client's relevant certification |
| `1-800-XXX-XXXX` | Client's actual support phone number |

---

## Step 5: Add the Client Logo (Optional)

If the client provides an image logo:

1. Save as `white-label-[client]/images/logo.svg` (SVG preferred) or `logo.png`
2. Replace the emoji icon block in index.html:

```html
<!-- Before -->
<div class="wl-logo-icon" aria-hidden="true">🏦</div>

<!-- After -->
<img src="images/logo.svg" alt="[Client Name] logo" class="wl-logo-img" width="44" height="44">
```

Add to white-label.css:
```css
.wl-logo-img { width: 44px; height: 44px; object-fit: contain; border-radius: 4px; }
```

---

## Step 6: Review and Remove Two Birds References

Search the codebase for "Two Birds" and replace with appropriate attribution:

```
"Powered by Digital Confidence Centre"
```

Or if the client wants fully unbranded:
```
"Digital Skills Programme — [Client Name]"
```

---

## Step 7: Module 1 — Client-Specific Customisation

The `modules/module-1.html` file is a fully rebranded sample module. For full deployment, each module should be reviewed for:

- [ ] Local examples use client's region/city
- [ ] Banking examples reference client's institution
- [ ] Support phone numbers in Local Help section match client's resources
- [ ] Module navigation works correctly with client's URL structure

---

## Step 8: Deploy to Client Hosting

Options for deployment:

**Option A: GitHub Pages (simplest)**
1. Create new GitHub repo for client: `[client-name]-digital-skills`
2. Copy the full white-label directory as the repo root
3. Enable GitHub Pages in repo Settings → Pages → Deploy from `main` branch
4. Custom domain optional (requires client's DNS access)

**Option B: Client's Web Server**
1. Upload files via FTP/SFTP to client's web server
2. No server-side configuration needed — all static files
3. Point to `/digital-skills/` subdirectory on their existing domain

**Option C: Cloudflare Pages (recommended for reliability)**
1. Connect GitHub repo to Cloudflare Pages
2. Free tier supports unlimited static sites
3. Automatic HTTPS, global CDN, instant deploys

---

## Content Customisation Checklist

### Quick (1–2 hours)
- [ ] Colours updated in CSS
- [ ] Organisation name and tagline updated
- [ ] Trust badges updated
- [ ] Support phone number added
- [ ] Hero stats updated

### Standard (half day)
- [ ] Module 1 fully rebranded
- [ ] Local resources updated in all modules (phone numbers, links)
- [ ] Banking module customised with client's institution name
- [ ] Footer branding complete

### Full (1–2 days)
- [ ] All 15 modules reviewed for client-specific context
- [ ] Custom landing page built
- [ ] Analytics connected (GA4 property under client's Google account)
- [ ] Client's own Formspree endpoint for feedback form
- [ ] Staff training guide created

---

## Tier 2 / Tier 3: Custom Module Development

For Enterprise clients, custom modules can be developed for:
- Specific digital banking features (mobile app walkthroughs)
- Client's employee onboarding
- Industry-specific topics (e.g. healthcare portals for senior living communities)
- Branded certificate of completion

Contact Two Birds Innovation to discuss custom module requirements.

---

## Maintenance

The base Digital Confidence Centre is updated quarterly with:
- New modules on emerging topics
- Updated Canadian resource links (phone numbers, program names)
- Accessibility improvements
- Browser compatibility fixes

White-label clients receive updates under their service agreement.
Apply updates by pulling the latest version from the DCC repository and re-applying client branding.
