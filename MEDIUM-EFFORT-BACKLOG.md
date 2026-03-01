# MEDIUM-EFFORT BACKLOG — Digital Confidence Centre
## Educational Content Additions
**Estimated total: ~13% credits | Threshold to execute: score > 6.5 | Max per session: 1 item**

---

### Impact Formula
`Score = (UX×0.40) + (Foundation×0.30) + (Scale×0.20) + (A11y×0.10)`

---

## MEDIUM-EFFORT-6: Two-Factor Authentication (2FA) Training

**Status:** Deferred — awaiting beta feedback on demand
**Estimated credits:** ~8%
**Score:** UX 8, Foundation 7, Scale 7, A11y 6 → **7.3**

**Why it matters:**
2FA is one of the most effective security measures available, but seniors often avoid it because text message codes feel confusing and stressful. A dedicated module (or a major section in Module 2 or Module 3) would directly reduce fraud risk for users.

**What to build:**
A new section (or sub-module) covering:
- What 2FA is and why it matters ("a second lock on your door")
- Text message codes — what they look like, when to expect them, what to do with them
- Why you should NEVER read a 2FA code to someone who calls you
- Authentication apps (Duo, Google Authenticator, Microsoft Authenticator) — overview only
- Common 2FA scenarios: Gmail, banking, Facebook
- Practice exercise: turn on 2FA for one account (step-by-step for Gmail)

**Implementation options:**
- Option A: New `module-12.html` (requires updating progress.js, final-quiz, all navs)
- Option B: Large new section appended to `module-2.html` (Security Shield) — simpler
- **Recommended:** Option B — avoids infrastructure overhead, content fits naturally

**Files to change:**
- `module-2.html` — new 2FA section after existing content
- `js/final-quiz.js` — 2 new scenario questions on 2FA
- `css/main.css` — no new styles needed

**User feedback question:**
> "Have you heard of two-factor authentication? Would you like a guide for setting it up? Does it feel confusing?"

**Acceptance criteria:**
- User can understand what 2FA is and why they need it
- Step-by-step guide for Gmail 2FA setup (works on iPhone, Android, Windows)
- Warning about 2FA code sharing scam clearly stated
- 2 quiz questions added to final quiz

---

## MEDIUM-EFFORT-7: Password Manager Deep Dive

**Status:** Deferred — awaiting beta feedback on demand
**Estimated credits:** ~5%
**Score:** UX 7, Foundation 7, Scale 6, A11y 6 → **6.7**

**Why it matters:**
Module 3 covers passwords at a surface level. Many seniors are still using the same password everywhere or writing passwords on paper. A hands-on password manager guide (focused on the free, built-in options — iCloud Keychain for iPhone/iPad and Google Password Manager for Android) could meaningfully reduce their vulnerability without requiring any paid software.

**What to build:**
A new section appended to `module-3.html` (Passwords) covering:
- Why "one good password stored safely" beats "many bad passwords"
- iCloud Keychain (iPhone/iPad): how it works, how to enable it, how to use the suggestion when creating accounts
- Google Password Manager (Android): same treatment
- How to see your saved passwords (Settings walkthrough)
- What happens if you get a new phone (passwords move with your account)
- Practice exercise: let the phone suggest and save ONE new password

**Files to change:**
- `module-3.html` — new password manager section
- `js/final-quiz.js` — 1 new scenario question on password managers (optional)

**User feedback question:**
> "Do you use a password manager? Did you know your phone has a built-in one for free? Would a guide for this be helpful?"

**Acceptance criteria:**
- Covers iCloud Keychain AND Google Password Manager
- Device filtering (`data-devices`) shows correct option per platform
- No paid software recommended
- Emphasises: your phone does this automatically, no extra app needed

---

## Execution Priority

| Order | Item | Score | Credits | Trigger |
|-------|------|-------|---------|---------|
| 1 | MEDIUM-EFFORT-6: 2FA Training | **7.3** | ~8% | Execute if beta users ask about 2FA or security feels incomplete |
| 2 | MEDIUM-EFFORT-7: Password Manager Guide | **6.7** | ~5% | Execute if beta users struggle with password section |

**Execution decision:** Do NOT execute either item until beta feedback is collected. Build based on actual user demand, not assumptions.

---

## Previously Deferred Medium-Effort Items (from PHASE-2-MEDIUM-CREDIT.md)

These items were scored and deferred in earlier sessions:

| Item | Score | Credits | Status |
|------|-------|---------|--------|
| Module 9: Understanding AI | 6.8 | ~8% | ✅ Built in Phase 2 |
| Module 10: Grocery Delivery | 7.0 | ~8% | ✅ Built in Phase 2 |
| Module 11: Ride-Sharing | 7.0 | ~8% | ✅ Built in Phase 2 |
| Final quiz 11-module expansion | 7.9 | ~6% | ✅ Built in Phase 2 |
| Demographics Form | 3.9 | ~4% | ✅ Built in Phase 2 |

---

*File created: 2026-02-28 | Execute after beta feedback — build based on data, not assumptions*
