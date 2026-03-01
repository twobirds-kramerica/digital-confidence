# LOW-EFFORT BACKLOG — Digital Confidence Centre
## Deferred Nice-To-Have Items
**Estimated total: ~15% credits | Threshold to execute: score > 5.0 | Max per session: 2–3 items**

---

### Impact Formula
`Score = (UX×0.40) + (Foundation×0.30) + (Scale×0.20) + (A11y×0.10)`

---

## LOW-EFFORT-1: Inline Speed Controls

**Status:** Deferred
**Estimated credits:** ~2%
**Score:** UX 7, Foundation 4, Scale 6, A11y 5 → **5.8**

**What it is:**
Speed controls (🐢 Very Slow / 🚶 Slow / 🏃 Normal / ⚡ Fast) are currently only shown inside the Module 1 story block. Other modules (2–11) link users to Module 1's controls instead of showing their own.

**What to build:**
Add the speed control widget to the story block of every module (modules 2–11). The widget is already in `module-1.html` (lines 184–209). Copy it into each module's `.story-block`. The `speech-config.js` speed button logic already works globally — just needs the HTML to be present.

**Files to change:**
- `module-2.html` through `module-11.html` — insert speed control HTML in each `.story-block`

**User feedback question:**
> "Did you notice the reading speed controls? Were they easy to find? Did you use them?"

**Acceptance criteria:**
- Every module shows speed controls inside the story block
- Setting speed on one module persists to all others (already works via localStorage)

---

## LOW-EFFORT-2: Story Personalisation Cleanup

**Status:** Deferred
**Estimated credits:** ~3%
**Score:** UX 6, Foundation 3, Scale 5, A11y 3 → **4.6**

**What it is:**
The `{{CITY}}` placeholder is replaced at runtime by `localize.js`. However, some story blocks have slightly awkward phrasing ("from {{CITY}}" reads oddly if the city name is not set yet). Also, a few modules have story characters without a clear "from [city]" mention, making localisation feel inconsistent.

**What to build:**
- Audit all 11 story blocks for `{{CITY}}` placement
- Ensure each story has exactly ONE natural city mention (e.g., "Margaret, 74, lives in {{CITY}}")
- Add graceful fallback text in `localize.js` if no city is set: default to "Ontario" instead of showing the placeholder raw

**Files to change:**
- `js/localize.js` — add fallback: `'Ontario'` if `dc-city` not set
- Any module where `{{CITY}}` placement feels forced

**User feedback question:**
> "Did you notice that the stories mention your city? Did it feel personalised, or did it feel like a template?"

**Acceptance criteria:**
- If no city is set, stories read "...from Ontario..." naturally
- Every module has exactly one city mention in the story

---

## LOW-EFFORT-3: Module Title Clarity

**Status:** Deferred
**Estimated credits:** ~1%
**Score:** UX 5, Foundation 4, Scale 7, A11y 4 → **5.0**

**What it is:**
Module 7 is called "Creative Joy" — the only module title that doesn't clearly describe what you'll learn. Users may skip it because they don't know it covers photo-taking, drawing apps, and creative activities on their device.

**What to build:**
Rename Module 7 from "Creative Joy" to "Photos & Creative Apps" (or similar) everywhere it appears:
- `module-7.html` (title, h1, page title)
- `index.html` (module card)
- All sidebar navs (22 HTML pages)
- `sitemap.xml`

**Files to change:**
- `module-7.html`, `index.html`, `sitemap.xml`
- All 22 HTML pages (sidebar nav) — bulk find/replace via Node.js script

**User feedback question:**
> "Did you understand what Module 7 was about before opening it? What would you call it?"

**Acceptance criteria:**
- New title makes content immediately obvious
- All nav items and module cards updated consistently

---

## LOW-EFFORT-4: Default Dyslexic Font Option

**Status:** Deferred
**Estimated credits:** ~2%
**Score:** UX 6, Foundation 5, Scale 5, A11y 9 → **5.9**

**What it is:**
The dyslexic font toggle currently defaults to OFF. Users with dyslexia may not discover it unless they explore the sidebar. Adding it to the device wizard means users who need it are offered it proactively during onboarding.

**What to build:**
- Add one new step to the device setup wizard: "Reading Comfort" — ask "Do you prefer the dyslexia-friendly font? (Many people find it easier to read)"
- If user selects yes: set `localStorage['dc-dyslexic-font'] = 'true'` and apply the font immediately
- Pre-tick the sidebar toggle based on this setting

**Files to change:**
- `js/setup-wizard.js` — add reading comfort step
- `js/accessibility.js` — already reads `dc-dyslexic-font` on load (no change needed)

**User feedback question:**
> "Did you try the dyslexia-friendly font? How did you find it? Did you know it existed?"

**Acceptance criteria:**
- Wizard offers font option during setup
- Setting persists across pages (already works via localStorage)
- No regression to existing toggle behaviour

---

## LOW-EFFORT-5: Visual Example Rework

**Status:** Deferred
**Estimated credits:** ~7%
**Score:** UX 6, Foundation 4, Scale 5, A11y 5 → **5.2**

**What it is:**
The 43 visual example cards use text descriptions with icons (e.g., "📱 Visual Example: Home Screen — Your iPad home screen shows app icons..."). While functional, beta feedback may show that seniors want actual screenshots rather than illustrated descriptions. Alternatively, some cards may be poorly worded or confusing.

**What to build (post-beta):**
After collecting beta feedback on visual examples specifically:
- If users find them helpful → keep and refine wording only
- If users find them confusing → replace with actual screenshots (requires image files)
- If users ignore them → simplify or reduce the number of cards

**Decision gate:** Wait for beta feedback before investing credits here.

**Files to change (TBD):**
- Potentially all `module-1.html` through `module-11.html` — visual example card content

**User feedback question:**
> "Did you find the visual example boxes helpful? Did they match what you saw on your own screen?"

**Acceptance criteria:**
- Post-beta decision based on user data, not assumptions

---

## Execution Priority (When Ready)

| Order | Item | Score | Credits | Why First |
|-------|------|-------|---------|-----------|
| 1 | LOW-EFFORT-4: Dyslexic Font in Wizard | 5.9 | ~2% | Highest a11y impact |
| 2 | LOW-EFFORT-1: Inline Speed Controls | 5.8 | ~2% | Most commonly needed |
| 3 | LOW-EFFORT-2: Story Personalisation | 4.6 | ~3% | Improves polish |
| 4 | LOW-EFFORT-3: Module Title Clarity | 5.0 | ~1% | Quick win if beta shows confusion |
| 5 | LOW-EFFORT-5: Visual Example Rework | 5.2 | ~7% | **Wait for beta feedback first** |

---

*File created: 2026-02-28 | To be executed in a future session after beta feedback collected*
