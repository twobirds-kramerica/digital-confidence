# DCC Fable Build — Design Brief
**Date:** 2026-07-03 · **Status:** LOCKED direction for the DCC rebuild (the Fable pass builds against this)
**Sources:** NotebookLM synthesis (new 50-URL set + prior 30-source corpus), market recommendations, Aaron's directives. This supersedes ad-hoc DCC design decisions.

---

## 0. North star
DCC is a **confidence-building environment, not a documentation site.** Success = a user finishes a module feeling *more capable* than when they started. Persona: **Brenda** — anxious senior, motivated by connection, deterred by fear of doing something wrong/expensive/embarrassing. Every decision passes the Brenda test.

**Tone (locked, ~80% call, grounded in Be Connected + AARP — the gov/library-channel leaders):** *warm voice on a credible frame.* Clean, trustworthy structure (grant/library-fit) carrying a plain, encouraging, non-patronising voice. Not cold-institutional; not cutesy.

---

## 1. Visual system (this fixes the live contrast bug)
- **Palette — "Trust Blue" + high contrast.** Deep blue as the authority/safety anchor (per FINRA, Canada.ca). **Every text/background pair meets WCAG 4.5:1 minimum** (Be Connected standard). **Ban low-contrast trends — no light-grey-on-white, no light-blue/grey on cream** (this is the exact live bug on the "What we never do" block). Verify in BOTH light and dark mode.
- **Typography.** Prominent **"A− A A+" text-size toggle in the header** (Be Connected pattern) — not hidden. Large base font, **line-height ≥ 1.5**. Optional dyslexia-friendly + highlight-links toggles (GetSetUp).
- **Layout — card-first, focus-first.** Topic-based **card grid** with clear icon + short description (Senior Planet, Be Connected). **"Focus Mode"** strips sidebars/nav inside a module, leaving content + Next/Back (Thinkific). **Breadcrumbs** for constant orientation (Canada.ca, Age UK).
- **Imagery — "Tech Concierge."** Named, photographed human guide framing (Senior Planet, Cyber-Seniors) over generic icons — restores dignity, builds trust. (Ties to Aaron-guide-persona decision.)
- **Iconography.** Icons **always paired with text labels** (ABC Life Literacy); an **icon glossary** (Be Connected); a padlock/secure badge in the header (CDC/FTC).

## 2. The three differentiators (rare patterns — this is the moat)
1. **Role-based "Helper" mode (ROLESafe).** The senior *helps a simulated victim* avoid a scam, not just experiences it. Altruism drives higher engagement + learning than victim-only tutorials. **No shipped senior product does this** — it's our flagship, and it fuses with our "help someone else" seam. (Build on the scam-defence prototype.)
2. **"Time to Confidence" labels.** Module cards say "**8 mins to learn Video Calls**" — an emotional/outcome contract, not a cold syllabus time.
3. **No-login "Small Wins" progress.** Browser-based micro-progression bar that rewards reading/answering **before any account** — builds self-efficacy, removes the registration wall.

## 3. Onboarding, consent & "free" (this fixes the 3-block wall + the "forever" liability)
- **Value-first onboarding — no registration/interstitial wall.** Lead with a task, not a form: *"Try a 5-minute lesson (no account needed)."* Device is **auto-detected quietly and optional** — asked only inside device-specific sections, always with **"I don't know / I just have a phone."** No device pre-qualifier gating the whole site.
- **Consent — layered, not a wall (replaces the current 3-block `setup-wizard.js` screen).** A simple **Accept / Reject** line + a **"Preferences"** reveal. Plain-language categories on the reveal only:
  - *Functional:* "Keep the site working and remember your text size."
  - *Performance:* "Help us see which lessons help most. Doesn't identify you."
  - *Marketing (optional):* "Help us reach more seniors. We never sell your personal info."
  - CASL/PIPEDA-safe; legal **bare minimum up front**, detail behind "read more." Never scare at the funnel top.
- **"Free" framing — explain who pays (NOT "forever").** Anxious seniors equate "free" with "scam"; the fix is *who funds it + why*, e.g. *"Free to use — a community initiative by Two Birds Innovation to help Ontario seniors stay safe online."* **Do not use "forever"** (Aaron directive: unbounded legal commitment; the trust comes from the who-pays frame, not the word).
- **Scope disclaimer (short):** "Plain-language safety tips, not legal advice. If you suspect a scam, contact your bank directly."

## 4. Engagement (adult, never childish)
Effort-based **Confidence Badges** (reward the attempt), **skill-mastery visibility** (Khan), **Small Wins** micro-progression, **Time-to-Confidence** labels, **intergenerational social bridges** ("send this hello to your grandchild"), **Tech Concierge** hero framing. **No points-as-game, no cartoon rewards.** The reward is competence + safe repetition.

## 5. Business model / white-label (light, LATER — capture, don't build)
Validated model: **licensing / "train-the-trainer"** (Senior Planet/OATS, Good Things Foundation network) — orgs (libraries, schools, practitioners) with their own grant/municipal funding pay a licence; the individual senior stays **free**. This is Aaron's white-label idea, confirmed by the market. **Keep the architecture from blocking it** (brandable sections, exportable micro-pieces) but **do not build white-label in phase one.** Core stays free (community-funded framing).

## 6. Product tone split (context for the wider portfolio)
DCC + Norm = crisp/trustworthy · Aaron site + Clarity = confident/modern · KevsCasa + Career Coach = functional-clean.

## 7. What the Fable pass builds vs. out-of-scope
**Builds:** the visual system (§1, fixes contrast), Focus Mode, card-grid IA, the layered consent (§3, replaces the wall), value-first + un-gated onboarding, Time-to-Confidence + Small Wins, the Helper-mode scam flagship (§2).
**Out of scope this pass:** white-label build-out (§5), a kids sibling (parked per brief), live classes/accounts (parked), more content modules (the commoditised axis).

---
*Grounding files: `hal-stack/research/dcc-deep-research-FOR-NOTEBOOKLM.md` (prior corpus), `hal-stack/product-intelligence/dcc-adults-brief.md` (strategy + Aaron directives), the NotebookLM 2026-07-03 synthesis (5-tab answers).*
