# DCC Onboarding Redesign — Shape Brief (for Aaron's approval)

*Created 2026-07-02 (S-DCC-ONBOARDING-SIMPLIFY). This is the DESIGN GATE shape artifact — a structural first-run redesign needs shape sign-off before the build. Source problem: S-PRODQA-DCC-001 (2026-06-29), Brenda-lens L5 simulation → 60-70% estimated library cold-start abandonment.*

**STATUS: SHAPE for approval. No code changed yet.** The 3-4h build runs only after Aaron OKs the shape (or edits it).

## The problem (confirmed in code)
The hero + value prop + module grid ALREADY exist in `index.html` (`<main id="main">`, line 439; `<h1>Feel safe and confident on your phone or iPad. Free.</h1>`, line 444). But two JS overlays **auto-open on `DOMContentLoaded` and cover it** before the senior sees anything:
1. `onboarding.js` — full-screen "Getting started" goal/purpose overlay (`buildOverlay` on load; gated only by `dcc_onboarded`).
2. `setup-wizard.js` — city/device setup wizard + a privacy-consent step (`privacyConsentGiven`).
So a first-time library visitor hits a full-screen "Where do you live?" before the product value prop — the single largest drop-off risk.

## Proposed shape (content-first, opt-in personalisation)
1. **Content renders immediately.** Do NOT auto-open either overlay on first load. The hero ("Feel safe and confident... Free.") + at least one module card are visible with zero interaction — the sprint's success test.
2. **One lightweight welcome card, not full-screen.** A single dismissible card (bottom or inline, NOT a blocking modal) says, in Brenda-plain language: *"Want us to set this up for your city and device? (optional)"* with two buttons: **"Yes, help me set up"** (→ opens the existing wizard, now opt-in) and **"No thanks, just show me"** (→ dismiss, content already visible). Personalisation becomes opt-in, not a gate.
3. **Consent consolidated / deferred.** Fold the privacy line into the welcome card (a short "we store your choices on this device only" note linking privacy.html), OR defer the consent prompt to the first action that actually needs it. No separate full-screen consent step on cold load.
4. **Skip affordance above the fold at 375px.** The welcome card's dismiss ("No thanks") must be visible without scrolling on a 375px viewport.
5. **Returning visitors unchanged.** `dcc_onboarded` / `dc-city` still suppress the welcome card for people who've already chosen.

## How each success criterion is met
| Criterion | Met by |
|---|---|
| Content visible on first load, no overlay touched | Stop auto-opening the overlays; hero+modules already in HTML |
| Single lightweight welcome card (opt-in) | Replaces the 2 forced overlays with 1 dismissible card |
| Analytics/consent consolidated or deferred | Folded into the welcome card or deferred to first interaction |
| Skip above fold at 375px | Welcome card sized so "No thanks" is above the fold |
| Brenda sees hero + a module card untouched | Direct result of content-first render |

## Build plan (post-approval, ~3-4h)
- `onboarding.js` / `setup-wizard.js`: remove the auto-`buildOverlay` on load; expose the wizard as a function the welcome card's "Yes" button calls.
- Add the welcome-card component (reuse DCC tokens/components; non-blocking, dismissible, keyboard-accessible, `role` + focus handling).
- Consent: inline note + link, or first-interaction defer.
- **Verify (LIVE-OUTCOME + service worker):** bump `sw.js CACHE_NAME` (deploys silently skip returning visitors otherwise — per CLAUDE.md); Playwright on a FRESH profile at 375/768/1280px confirming hero + a module card render with no overlay, and the welcome card's skip is above fold at 375px. axe-core 0 critical.

## The ask
Approve this shape (or tell me the deltas — e.g. keep consent as its own step? welcome card top vs bottom?). On approval I run the build + verification as one sprint. This unblocks promoting DCC to library partners without the cold-start embarrassment.
