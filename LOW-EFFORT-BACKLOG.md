# LOW-EFFORT BACKLOG — Digital Confidence Centre
## Deferred Nice-To-Have Items
**Estimated total: ~18% credits | Threshold to execute: score > 5.0 | Max per session: 2–3 items**

*Last updated: 2026-02-28*

---

### Impact Formula
`Score = (UX×0.40) + (Foundation×0.30) + (Scale×0.20) + (A11y×0.10)`

---

## LOW-EFFORT-1: Location Prompt Before Showing Local Resources *(NEW)*

**Status:** Deferred — execute next week with fresh budget
**Estimated credits:** ~8%
**Score:** UX 8, Foundation 7, Scale 7, A11y 5 → **7.3**
**Priority:** MEDIUM-HIGH

**Why important:**
User expressed concern about showing localised content without the user explicitly providing their location. Currently, `{{CITY}}` is replaced automatically based on `dc-city` in localStorage from the setup wizard. The Resources page shows library phone numbers and senior centre contacts for the assumed city without any confirmation. This should be opt-in.

**What to build:**
- When user visits `resources.html` for the first time (check `localStorage['dc-location-confirmed']`)
- Show a modal/banner: "To show you local support resources, where are you located?"
- City dropdown or buttons (Windsor, London, Kitchener, St. Thomas, Woodstock, "Show Ontario-wide only")
- Saves `dc-city` + `dc-location-confirmed = true`
- "Skip" option → hides all city-specific contact info, shows only provincial/national resources
- "Change Location" button always visible on Resources page

**Files to change:**
- `js/localize.js` or new `js/location-prompt.js` — modal + confirmation logic
- `resources.html` — trigger prompt on load, "Change Location" button
- `css/main.css` — location prompt modal styles

**User feedback question:**
> "Did you know the site was using your city from the setup wizard? Did that feel surprising or appropriate? Would you prefer to confirm your location first?"

**Acceptance criteria:**
- First visit to resources.html shows location confirmation
- Location is NOT shown to user without their explicit input
- Setting persists across sessions
- Change Location always available
- Graceful fallback if no city set (Ontario-wide resources only)

---

## LOW-EFFORT-2: Story Personalisation Cleanup

**Status:** Deferred
**Estimated credits:** ~3%
**Score:** UX 6, Foundation 3, Scale 5, A11y 3 → **4.6**

**What it is:**
The `{{CITY}}` placeholder is replaced at runtime by `localize.js`. A few story blocks have awkward phrasing if no city is set — the raw placeholder shows until JS runs. Add a graceful fallback: default to "Ontario" if `dc-city` not set.

**Files to change:**
- `js/localize.js` — fallback: `'Ontario'` if `dc-city` not set

**User feedback question:**
> "Did you notice that the stories mentioned your city? Did it feel personalised, or did it feel like a template?"

---

## LOW-EFFORT-3: Module Title Clarity (Module 7)

**Status:** ✅ DONE — executed 2026-03-02
**Renamed to:** "Photos & Memories" (38 replacements across all HTML files)

---

## LOW-EFFORT-4: Default Dyslexic Font Option in Wizard

**Status:** Deferred
**Estimated credits:** ~2%
**Score:** UX 6, Foundation 5, Scale 5, A11y 9 → **5.9**

**What it is:**
Add a "Reading Comfort" step to the setup wizard proactively offering the dyslexia-friendly font, rather than requiring users to discover it in the sidebar.

**Files to change:**
- `js/setup-wizard.js` — add reading comfort step

**User feedback question:**
> "Did you try the dyslexia-friendly font? How did you find it? Did you know it existed?"

---

## LOW-EFFORT-5: Visual Example Rework

**Status:** Deferred — **wait for beta feedback before executing**
**Estimated credits:** ~7%
**Score:** UX 6, Foundation 4, Scale 5, A11y 5 → **5.2**

**Decision gate:** Collect beta feedback on visual example cards first. If users find them helpful → keep and refine wording only. If confusing → replace with screenshots.

**User feedback question:**
> "Did you find the visual example boxes helpful? Did they match what you saw on your own screen?"

---

## LOW-EFFORT-6: Password Vault Recommendation (Built-in Only)

**Status:** Deferred — awaiting beta feedback
**Estimated credits:** ~2%
**Score:** UX 7, Foundation 6, Scale 6, A11y 4 → **6.3**

**What it is:**
Many seniors write passwords on paper or reuse the same one everywhere. A short tip block in Module 3 (Passwords) recommending the free, built-in options — iCloud Keychain (Apple) and Google Password Manager (Android) — with a one-line explanation of what they do. No extra app, no cost. Links to the deeper guide in MEDIUM-EFFORT-7 when it's built.

**Files to change:**
- `module-3.html` — add a new tip block with device-filtered iCloud Keychain / Google Password Manager recommendation

**User feedback question:**
> "Did you know your phone has a free built-in password manager? Would you use it?"

---

## LOW-EFFORT-7: Antivirus & Tech Support Recommendation

**Status:** Deferred — awaiting beta feedback
**Estimated credits:** ~2%
**Score:** UX 6, Foundation 6, Scale 5, A11y 3 → **5.7**

**What it is:**
Add a short "What to use on your device" tip to Module 2 (Security Shield) or resources.html recommending:
- Apple/iPad: no antivirus needed (built-in protections), but Malwarebytes Free for peace of mind
- Android: Malwarebytes Free or built-in Google Play Protect
- Windows: Windows Defender (already built in) is sufficient; avoid fake "clean-up" software
- Recommended tech support: Apple Store (free Genius Bar), Best Buy Geek Squad (paid), Cyber-Seniors

**Files to change:**
- `module-2.html` or `resources.html` — new tip/warning block with device filtering

**User feedback question:**
> "Do you use antivirus software? Are you confident your device is protected?"

---

## LOW-EFFORT-8: Multi-Language Feedback Option

**Status:** Deferred — gather demand data first
**Estimated credits:** ~3%
**Score:** UX 6, Foundation 4, Scale 8, A11y 5 → **5.9**

**What it is:**
The feedback/ideas modal currently collects text in English only. Some seniors in Ontario are more comfortable writing in French or another language. Add a "Language of feedback" dropdown (English / French / Other) to the feedback form. Issues posted to GitHub get a language label. No translation needed — just captures what language the feedback is written in so it can be routed appropriately.

**Files to change:**
- `js/feedback-github.js` — add language dropdown to modal, add language label to GitHub issue title

**User feedback question:**
> "Would you prefer to give feedback in a language other than English? Which language?"

---

## Execution Priority (When Ready)

| Order | Item | Score | Credits | Notes |
|-------|------|-------|---------|-------|
| 1 | LOW-EFFORT-1: Location Prompt | **7.3** | ~8% | Trust + privacy — execute next week |
| 2 | LOW-EFFORT-4: Dyslexic Font in Wizard | 5.9 | ~2% | High a11y impact |
| 3 | LOW-EFFORT-6: Password Vault Tip | 6.3 | ~2% | Quick win for security |
| 4 | LOW-EFFORT-8: Multi-Language Feedback | 5.9 | ~3% | Gather demand first |
| 5 | LOW-EFFORT-7: Antivirus Recommendation | 5.7 | ~2% | Simple tip block |
| 6 | LOW-EFFORT-2: Story Personalisation | 4.6 | ~3% | Polish |
| 7 | LOW-EFFORT-5: Visual Example Rework | 5.2 | ~7% | **Wait for beta data** |

---

### Already Executed (Removed from Queue)
- ~~LOW-EFFORT-1 (old): Inline Speed Controls~~ → **DONE** — per-instance speed controls next to every Listen button
- ~~Module 8 rename~~ → **DONE** — "Helping Family" renamed to "Stay Connected"
- ~~LOW-EFFORT-3: Module 7 Title~~ → **DONE** — "Creative Joy" renamed to "Photos & Memories" (2026-03-02)

---

*File updated: 2026-03-02 | Execute after beta feedback collected*
