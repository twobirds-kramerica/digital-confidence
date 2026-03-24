# White-Label Deployment Checklist — Digital Confidence Centre

Use this checklist for every new white-label deployment. Complete all items before handover.

---

## Phase 1: Pre-Deployment Setup

### Contracts & Accounts
- [ ] Signed licensing agreement received and filed
- [ ] Invoice sent and payment received (or payment terms confirmed)
- [ ] Formspree account created or existing account linked for this client
- [ ] Google Analytics property created (separate from main DCC property)
- [ ] GitHub repository created (private) for this deployment
- [ ] Deployment tier confirmed: Basic / Professional / Enterprise

### Branding Package Received
- [ ] `branding-template.json` completed and returned by client
- [ ] Organisation logo received (SVG preferred, PNG acceptable at 2x resolution)
- [ ] Primary and secondary colour hex codes confirmed
- [ ] Custom domain name confirmed (or subdomain agreed upon)
- [ ] SSL certificate plan confirmed (Cloudflare recommended)
- [ ] Custom welcome message or tagline provided (if applicable)
- [ ] Local helpline phone number provided (if replacing Connected Canadians)
- [ ] List of modules to hide received (if any)
- [ ] Default city for local resources confirmed

---

## Phase 2: Build

### Codebase Configuration
- [ ] Forked from latest main DCC codebase
- [ ] `branding-template.json` values applied throughout
- [ ] Primary colour replaced in `css/main.css` (search for `#1565C0`)
- [ ] Logo file added to `images/` directory
- [ ] Logo alt text updated in all HTML files
- [ ] Site title and `<title>` tags updated in all pages
- [ ] Footer brand name updated
- [ ] Footer tagline updated
- [ ] Welcome message on `index.html` updated
- [ ] Google Analytics measurement ID updated to client's property
- [ ] Formspree endpoint updated to client's form ID
- [ ] Connected Canadians phone replaced with local helpline (if applicable)
- [ ] Hidden modules removed from sidebar nav and index page
- [ ] Default city set in `js/city-resources.js`
- [ ] No DCC branding visible (Enterprise tier only)
- [ ] `manifest.json` updated with client app name and colours

### Content Checks
- [ ] All Ontario-specific references reviewed for client's service area
- [ ] Local resources section populated with client city data
- [ ] No test data or placeholder text remains in any module

---

## Phase 3: Quality Assurance

### Accessibility
- [ ] All pages tested at 150% browser zoom — no horizontal overflow
- [ ] All pages tested at 200% browser zoom — content still usable
- [ ] Font size controls (A / A / A / A) working on all pages
- [ ] Dark mode toggle working on all pages
- [ ] Dyslexia-friendly font toggle working
- [ ] Skip-to-content link present and functional
- [ ] All images have descriptive alt text
- [ ] Feedback button visible and functional on every page

### Functionality
- [ ] Feedback form submits successfully to Formspree (check for success state, not localStorage fallback)
- [ ] Progress checkboxes save to localStorage correctly
- [ ] Print button works on all module pages
- [ ] All internal links functional (no 404s)
- [ ] Sidebar navigation opens and closes correctly on mobile
- [ ] Welcome splash / setup wizard tested

### Cross-Device Testing
- [ ] iPad (Safari) — primary target device
- [ ] iPhone (Safari)
- [ ] Android tablet (Chrome)
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari (Mac)

### Forms & Close Buttons
- [ ] No red circle ✕ close buttons anywhere
- [ ] All modals close cleanly
- [ ] Feedback form field order correct: Module → Type → Text → Submit → Name

---

## Phase 4: Deployment

### Domain & Hosting
- [ ] GitHub Pages enabled on the repository
- [ ] Custom domain CNAME configured (if applicable)
- [ ] Cloudflare DNS records set
- [ ] SSL/HTTPS confirmed active and certificate valid
- [ ] `www` redirect configured (if applicable)
- [ ] Site loads correctly at final URL

### Analytics Verification
- [ ] Google Analytics receiving data (check Real-Time report)
- [ ] Analytics property ID confirmed in page source
- [ ] Goal or event tracking set up for feedback form submissions (optional but recommended)

---

## Phase 5: Handover

### Client Deliverables
- [ ] Handover document prepared (login credentials, dashboard links, support contact)
- [ ] 1-hour training session scheduled with client team
- [ ] Training session completed
- [ ] Formspree dashboard access granted to client contact
- [ ] Google Analytics access granted to client contact
- [ ] First analytics PDF report date confirmed (Basic tier)
- [ ] Quarterly content update schedule confirmed

### Internal Records
- [ ] Client added to white-label client register
- [ ] Renewal date added to calendar (30 days before expiry)
- [ ] Branding assets archived in `/white-label/clients/[client-name]/`
- [ ] Deployment notes added to internal log

---

## Post-Launch (First 30 Days)

- [ ] Check-in email sent to client at Day 7
- [ ] Check-in email sent to client at Day 30
- [ ] First monthly analytics report sent (Basic tier)
- [ ] Any reported issues resolved within SLA timeframe
- [ ] Client satisfaction confirmed

---

*Last updated: 2026-03-24*
*Maintained by: Aaron Kramer, Two Birds Innovation*
