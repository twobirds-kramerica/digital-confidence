# CLAUDE.md — Digital Confidence Centre

## Project Identity
- Owner: Aaron (Two Birds)
- Project: Digital Confidence Centre — digital literacy platform for seniors in Ontario, Canada
- Audience: Older adults (70+), iPad/iPhone only, accessibility-first
- Stack: Static HTML/CSS/JavaScript only. No frameworks, no backend, no build tools.
- Deployment: GitHub Pages + Cloudflare

## Hard Constraints (Never Violate)
- STATIC ONLY: Do not introduce Node.js servers, npm build steps, backend APIs, or any server-side logic. Everything must work as flat files on GitHub Pages.
- NO BACKEND CALLS FROM BROWSER TO GITHUB ISSUES API: The GitHub Issues API does not support CORS from browsers. Any direct `fetch()` to `api.github.com/repos/.../issues` will silently fail. Do not use it. Use Formspree (free, CORS-safe, works on static sites) for any form submission that needs to reach an external endpoint.
- LOCALSTORAGE IS FALLBACK ONLY: LocalStorage may be used to queue data when offline, but must never be the primary submission path on a live connection.
- NO CHANGES TO MODULE CONTENT: Do not edit training module copy, lesson text, or instructional content. UI and form logic only unless explicitly told otherwise.

## Form & Modal Standards
- Close buttons: Never use a large red circle with white ✕. Use the site's standard close button style. If no reference exists, use a plain `✕ Close` text button in the site's standard text colour, top-right, with a subtle hover state.
- All modals must be accessible at high zoom levels (up to 200%). Test for overflow.
- No modal should require horizontal scrolling.

## Feedback Form Specifics
- Submission endpoint: Formspree (not GitHub Issues API)
- Module dropdown: Must auto-detect current page AND remain user-editable
- Module label format: `Module [N]: [Module Name]` — derive names from page `<title>` or `<h1>` tags
- "Your Name" field: Always optional, always labelled "Your Name (Optional)", placeholder text "Type here...", no pre-populated names
- No Language selector field — infer from `navigator.language` if needed
- Form field order: Module → Feedback Type → Feedback textarea → Submit button → Your Name (Optional)

## Correct Module Names (from HTML titles — do not change these)
- module-1.html  → Module 1: Mastering the Escape Hatch
- module-2.html  → Module 2: The Security Shield
- module-3.html  → Module 3: Passwords & Biometrics
- module-4.html  → Module 4: App Store Safety
- module-5.html  → Module 5: Email & Messages
- module-6.html  → Module 6: Banking & Transactions
- module-7.html  → Module 7: Photos & Memories
- module-8.html  → Module 8: Stay Connected
- module-9.html  → Module 9: Understanding AI
- module-10.html → Module 10: Grocery & Food Delivery
- module-11.html → Module 11: Ride-Sharing Apps
- index.html     → Home Page
- resources.html → Resources Page

## Accessibility Standards
- Font sizing: Support 4-level font size system already in place — do not break it. Body text minimum: 18px.
- High zoom: All UI must remain functional and non-overflowing at 150–200% browser zoom
- Dyslexia-friendly fonts: Preserve any existing font choices made for readability
- iPad-first responsive design
- WCAG AA mandatory: contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text/UI components
- Before any commit touching HTML/CSS: run axe-core locally or confirm GitHub Actions passes on push
- Dark mode: before marking any visual sprint done, test on Android Chrome. File Aaron action P1 if this test cannot be done locally.

## Anxiety-First Language
Target audience is older adults who may fear technology. Never use: "wrong", "failed", "incorrect", "error" as user-facing feedback. Use: "let's try again", "not quite — here's a hint", "good try". Module copy is frozen — apply this rule to any new UI text, feedback messages, or error states only.

## HAL Stack Integration
This repo is part of the Two Birds HAL Stack. Global context: `C:\twobirds\two-birds-portfolio\CLAUDE.md`.
- Global SESSION-STATE.md tracks sprint history
- Persona reviews run at sprint completion (see global CLAUDE.md SPRINT COMPLETION rule)
- ADR required if this sprint introduces a significant architectural choice
- Commit convention: `feat(dcc):`, `fix(dcc):`, `chore(dcc):`

## Localisation
- Canadian English spelling throughout (Centre, Labour, Colour, etc.)
- Ontario-specific resources and phone numbers where referenced
- Default city: St. Thomas, Ontario

## Data Backup Policy
- Feedback submissions are stored in Formspree (https://formspree.io/f/xeerqryj)
- Formspree free tier: 50 submissions/month, CSV export available in dashboard
- Manual backup reminder: Export CSV from Formspree dashboard monthly
- Backup location: Save exports to /backups/feedback/ in this repo (gitignored for privacy)
- If Formspree becomes unavailable, replace endpoint URL in js/feedback-github.js line 13
  with any CORS-safe form service (e.g. Netlify Forms, Web3Forms, Basin)
- Do NOT store raw submission data in the public repo — personal feedback is private
- Secondary backup: Web3Forms (https://web3forms.com) — fire-and-forget, silent fail
- Web3Forms key stored in: js/feedback-github.js (search for WEB3FORMS_ACCESS_KEY)
- If adding a third form service in future, follow the same silent fire-and-forget pattern

## Deployment Checklist (Before Any Push)
- [ ] No new external dependencies introduced without approval
- [ ] All modals tested at 150% zoom
- [ ] Feedback form submits successfully (Formspree success state visible, not LocalStorage fallback)
- [ ] No red circle ✕ close buttons anywhere
- [ ] Module labels correctly mapped

## Efficiency Routing
# Efficiency routing handled globally via ~/.claude/CLAUDE.md

---

## New Project Check

If this appears to be a brand new project with no existing files,
ask Aaron before proceeding:

"Is this a new coding project? If yes, I should set it up from your
template at https://github.com/twobirds-kramerica/two-birds-project-template
before we do anything else. Want me to handle that now?"

Do not proceed with any coding work until Aaron confirms.
