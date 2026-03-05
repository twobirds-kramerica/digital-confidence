# OVERNIGHT BUILD REPORT — Digital Confidence Centre
**Date:** 2026-03-05
**Session:** Autonomous Execution — Beta Improvements
**Commits pushed:** 3 main commits (+ 1 pre-existing fix pushed together)

---

## COMPLETED ✅

### Priority 1: Module 8 — Texting & Messaging Education (10%)
**Status:** DONE — commit `34a552b`

New content added to `module-8.html` (~2,000 words):

**Harold's Story** — introduces the pre-texting concept through a relatable plumber character who discovers his call-back rate doubles when he texts before calling.

**Why Texting Replaced Calling** — 4 practical reasons (busyness, volume, voicemail anxiety, written record). Framed compassionately: "This is not about you."

**The New Courtesy: Text Before You Call** — when to pre-text, when you can skip it (emergencies, scheduled calls, very close family, landlines).

**Messaging App Comparison:**
- Regular SMS — works everywhere, no internet, built-in, universal fallback
- WhatsApp — 2B+ users, free international, end-to-end encrypted, recommended as second app
- Signal — maximum privacy, non-profit, gold standard for secure messaging
- Facebook Messenger — for Facebook users, lower privacy, no phone number needed

Quick comparison table: Cost / Internet needed / Privacy / Best for

**Step-by-step WhatsApp setup** — separate walkthroughs for iPhone/iPad and Android (8 steps each). Windows note included.

**WhatsApp safety reminder** — scammer awareness without being alarmist.

**Updated exercise block** — added pre-texting practice and WhatsApp download as steps 1 and 3.

---

### Priority 2: Public vs. Private Post Education (5%)
**Status:** DONE — included in commit `34a552b` (Module 8)

**Jean's Story** — bird watching story: Jean posts "Susan! Both cardinals are here this morning!" on her public Facebook timeline thinking she was sending Susan a private message. All 47 friends see it. She is mortified.

**The Two Types of Digital Communication:**
- Private Message (sealed envelope) — only the recipient sees it
- Public Post (bulletin board in a shopping centre) — everyone can see it

**How to tell the difference on Facebook:**
- Private clues: person's name and photo at top, text box at bottom, "Send" button
- Public clues: "What's on your mind?" box, globe icon 🌐, "Post" button, appears on Timeline

**The Globe Rule** — single actionable habit: look for 🌐 before tapping Post. No globe = safe to send.

**What not to post publicly** — home address, travel plans, grandchildren's school details, financial info.

---

### Priority 3: Navigation Icon Fix (1%)
**Status:** DONE — commit `34a552b`

- Module 1 (The Escape Hatch) icon changed from 🏠 → 🚪 in all 13 HTML files that had the conflict
- Home link (→ index.html) retains 🏠
- No more duplicate house icons side-by-side in the nav

---

### Priority 4: Dyslexic Font Mobile Fix (2%)
**Status:** DONE — commit `208b213`

**Root cause found:**
1. `#dyslexic-font-toggle { display: none; }` — iOS Safari does not fire `change` events on checkboxes hidden with `display: none`. The label tap was registering visually but the event never fired.
2. The dyslexic font class was not applied in `loadPreferences()`, causing a brief flash of the wrong font on page load for users with the setting enabled.

**Fixes applied:**
- CSS: Changed to visually-hidden (position:absolute, opacity:0, 1×1px, clip) — checkbox stays in DOM flow so `:checked` CSS selector and label events work correctly on iOS Safari
- JS: Applied `body.dyslexic-font` class inside `loadPreferences()` (early, same frame as theme/font)
- JS: Added `touchend` event listener on the label as iOS Safari fallback for 300ms ghost click
- JS: Stored setting as explicit `'true'/'false'` string for reliable strict equality check
- JS: Consolidated `initDyslexicFont()` into the main DOMContentLoaded handler

---

### Priority 5A: Story City Name Removal (3%)
**Status:** DONE — commit `34a552b`

- Removed `from {{CITY}}`, `from {{NEIGHBORHOOD}}`, `from {{NEIGHBORHOOD}} in {{CITY}}` from character story intros across all 11 modules (12 occurrences)
- One remaining `{{CITY}}` in Gloria's story ("Two of her children live in {{CITY}}") changed to "Two of her children live nearby"
- `lives in {{NEIGHBORHOOD}}` changed to `lives in Ontario`
- Characters now read: "Margaret, 74," not "Margaret, 74, from Windsor"
- City-specific resources remain on Resources page and module help sections (unchanged — those are intentional)

---

### Priority 5C: Password Vault Recommendations (3%)
**Status:** DONE — commit `d0ff4a4`

Added to `module-3.html` after the built-in password manager section:

**Third-Party Password Manager Comparison table:**
- Bitwarden — free (paid: $10/yr), open source, widely trusted
- 1Password — ~$36/yr, easiest to use, works on all devices, excellent for families
- LastPass — free/paid, honest note about 2022 security incident

**Recommendation:** Built-in first. If you need cross-platform, Bitwarden (free) or 1Password (easiest).

---

### Priority 5D: Antivirus Recommendations (3%)
**Status:** DONE — commit `d0ff4a4`

Added to `module-2.html` before "Where to Report Scams in Canada":

**iPhone/iPad:** No antivirus needed — system architecture prevents traditional viruses. What to do instead: keep updated, App Store only, Face ID. Real support: Apple Store Genius Bar (free).

**Android:** Google Play Protect is sufficient. Malwarebytes Free if desired. Real support: Best Buy Geek Squad, manufacturer websites.

**Windows:** Windows Defender is excellent — no paid antivirus needed. Verification steps included. Real in-person support: Best Buy Geek Squad, Staples Tech Services, library tech help sessions.

**Warning box:** Common scam tech support traps (pop-ups, cold calls, door-to-door, "PC Cleaner" ads).

---

## SKIPPED / DEFERRED

### Priority 5B: Enhanced Resource Contact Information
**Status:** SKIPPED — already done in a previous session (city-resources.js already has website, availability, and organization details for all resources).

### Priority 5E: Location Prompt for Resources
**Status:** DEFERRED — this is LOW-EFFORT-1 in the backlog (score 7.3). It is a standalone feature that deserves its own session. Estimated 8% credits. Deferred to next session.

---

## CREDIT USAGE ESTIMATE

| Item | Estimated Credits |
|------|-------------------|
| Module 8 texting education | ~9% |
| Public vs private education | ~4% |
| Navigation icon fix | ~0.5% |
| Dyslexic font mobile fix | ~1.5% |
| Story city removal | ~1% |
| Password vault recommendations | ~2% |
| Antivirus recommendations | ~2.5% |
| **Total** | **~20.5%** |

Well under the 35% budget cap. Location prompt deferred rather than rushed.

---

## TESTING INSTRUCTIONS FOR AARON

### Test Module 8 — New Texting Content
1. Open `module-8.html` on the live site
2. Scroll past the Group Messages section — you should see "Understanding Text Messages and Messaging Apps" with Harold's Story
3. Scroll further — you should see "Public vs. Private — Who Can See What You Share?" with Jean's Story
4. Click the "Listen" button on Harold's Story — should read it aloud without reading button labels
5. On mobile: confirm all content is readable, tables scroll horizontally if needed

### Test Navigation Icon
1. Open any module page
2. Tap the ☰ hamburger menu to open the sidebar
3. You should see: 🏠 Home, 🚪 1. The Escape Hatch (NOT two house icons)

### Test Dyslexic Font Toggle on Mobile
1. Open any module on your iPhone or iPad
2. Tap ☰ to open the sidebar
3. Scroll down to "Reading Comfort" section
4. Tap the toggle next to "Dyslexia-Friendly Font"
5. The font should change immediately on the page
6. Navigate to a different module — the font should still be changed
7. Tap the toggle again — font should revert to normal

### Test Password Vault Section (Module 3)
1. Open `module-3.html`
2. Scroll to "Password Managers: Your Digital Vault"
3. Read through the built-in options (iCloud Keychain, Google Password Manager, Edge)
4. Just below the confidence check box, you should see "What About Third-Party Password Managers?"
5. Verify the comparison table looks correct

### Test Antivirus Section (Module 2)
1. Open `module-2.html`
2. Scroll near the bottom, before "Where to Report Scams in Canada"
3. You should see "Protecting Your Device: Antivirus and Real Tech Support"
4. On iPhone: you should see the Apple/iPad content
5. Test with different device settings in the Setup Wizard to verify Android/Windows content shows

### Test Story City Names
1. Open any module (e.g. module-1.html, module-3.html)
2. Find the story block (first coloured story box)
3. Character should say e.g. "Margaret, 74," — NOT "Margaret, 74, from Windsor"
4. Resources page and module help sections should STILL show city names (they are intentional)

---

## KNOWN ISSUES / FUTURE IMPROVEMENTS

1. **Location prompt** (deferred): Before showing local phone numbers, ask user to confirm city. See LOW-EFFORT-1 in backlog.

2. **Module 8 final quiz questions**: The new texting and public/private content is not yet covered by any quiz questions. If beta testers engage heavily with it, add 2 new scenario questions to `js/final-quiz.js`.

3. **WhatsApp guide images**: The WhatsApp setup walkthrough uses text descriptions. Visual screenshots would improve clarity (requires finding appropriate Creative Commons images).

4. **Table mobile styling**: The comparison tables in module-8 and module-3 use inline styles. If they look cramped on very small screens (320px), add responsive CSS to main.css.

---

*Report generated: 2026-03-05 | Autonomous session | All changes live at https://twobirds-kramerica.github.io/digital-confidence/*
