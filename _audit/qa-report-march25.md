# QA Audit Report — Digital Confidence Centre
## Date: March 25, 2026
## Auditor: Claude Code
## Scope: Root-level HTML files (modules 1–15, module-2-5, index, about, resources, faq, glossary, final-quiz)

---

## Audit Item 1: Internal Links — Broken Link Check

### Method
Extracted all `href="*.html"` links from root-level HTML files. Excluded anchors, query strings, and external URLs. Checked whether each target file exists at the root.

### Files Checked
All 17+ root-level `.html` files.

### Linked Files Found
| File Referenced | Exists? |
|---|---|
| about.html | Yes |
| digital-literacy-101.html | Yes |
| family-setup.html | Yes |
| faq.html | Yes |
| faq-fr.html | Yes |
| final-quiz.html | Yes |
| glossary.html | Yes |
| index.html | Yes |
| module-1.html through module-15.html | Yes (all) |
| module-2-5.html | Yes |
| module-visual-ai.html | Yes |
| privacy.html | Yes |
| resources.html | Yes |
| scam-simulator.html | Yes |
| search-guide.html | Yes |
| whats-coming.html | Yes |

### Result: ✅ PASS

No broken internal links found. All `.html` files referenced by root-level pages exist.

---

## Audit Item 2: Canadian English Violations

### Method
Scanned all target HTML files for US spellings: `color` (as visible text, not CSS), `center` (as visible text), `realize/realise`, `organize/organise`, `favorite/favourite`, `recognize/recognise`. CSS properties, class names, CSS variables, and `<meta name="theme-color">` tags were excluded.

### Violations Found

| File | Line | US Spelling | Context |
|---|---|---|---|
| module-5.html | 252 | realized | "…I **realized** most of those scary emails are like junk mail…" |
| module-6.html | 253 | realized | "Jean **realized** that everything she could see at the bank counter…" |
| module-8.html | 1090 | organizing | "…and started **organizing** your relationships." |

**Notes on non-violations:**
- `color` appearances were all in CSS contexts (`<meta name="theme-color">`, `<style>` blocks, CSS custom properties like `var(--color-primary)`). None flagged as text violations.
- `center` appearances were all inside CSS class names or CSS `text-align` rules. No text violations.
- `favorite`, `recognize`: No violations found.
- `organize` in module-7.html line 426 (`<h2>Organizing Your Photos</h2>`) and line 488/520 (`Colouring Books for Adults`) — the module-7 h2 heading "Organizing Your Photos" was flagged in initial scan, but upon review there is **no occurrence** of "organizing" in module-7.html that was confirmed by the second targeted grep (result returned empty). The "Colouring Books" lines use correct Canadian spelling "colouring" — no violation.

### Result: ⚠️ FLAG — 3 violations to fix

**Fix:** Change `realized` → `realised` in module-5.html line 252 and module-6.html line 253. Change `organizing` → `organising` in module-8.html line 1090.

---

## Audit Item 3: "Free" Self-References

### Method
Scanned all module HTML files (module-1 through module-15, module-2-5, index.html) for the word "free." Categorised each occurrence as: (A) DCC self-promotion, (B) describing external services/tools, or (C) borderline.

### Key Findings

**DCC self-promotion (highest concern — Type A):**

| File | Line | Text |
|---|---|---|
| index.html | 12 | `<meta>` description: "…is a free, self-paced digital literacy programme…" |
| index.html | 239 | "A **free**, self-paced learning programme for beginners…" |
| index.html | 448–449 | "💰 **Completely free** / Every lesson is free. No credit card. No subscription. No catches." |
| index.html | 613 | Footer: "A **free** learning programme for Canadian seniors" |
| about.html | 176 | "Digital Confidence Centre is a **free**, self-paced digital literacy programme…" |
| about.html | 186 | `<h2>Why Is This Free?</h2>` |
| module-1.html | 149 | "**Free** digital literacy training for seniors in Ontario…" (nav bar tagline) |
| module-2.html | 149 | Same nav bar tagline (repeated across all modules) |

**Describing external services (Type B — acceptable):**
- References to YouTube being free, Spotify being free, Connected Canadians being free, Apple Genius Bar being free, library workshops being free, Ontario Telehealth nurse line being free. These describe third-party services and are factually accurate.

**Describing third-party apps (Type B — acceptable):**
- "Malwarebytes Free," "1Password free trial," "Google Photos free," "Canva (Free)" — all describing external tools, not DCC itself.

**Assessment:**
The DCC "free" self-descriptions are consistent and extensive. The footer tagline "A free learning programme for Canadian seniors" and the "Completely free / No credit card / No subscription" block on index.html (lines 448–449) are the strongest examples. The audit instruction notes the footer is "borderline" as a factual statement.

No `free` occurrences were found that falsely imply a DCC service costs nothing when it does — the service is genuinely free. The risk is whether future monetisation plans would require revisiting this copy.

### Result: ⚠️ FLAG — Review recommended

The word "free" appears as a core marketing claim on every page (via the nav tagline) and prominently on index.html and about.html. This is accurate today. Flag for review if a paid tier or sponsorship model is introduced. The footer tagline is borderline as noted in the audit spec — no action required unless monetisation changes.

---

## Audit Item 4: Privacy Absolute Language

### Method
Scanned all HTML files for: `never collect`, `no tracking`, `true privacy`, `we never`, `never share`, `never stored`, `no data is collected`.

### Findings

| Pattern | File | Line | Text |
|---|---|---|---|
| `never collect` | privacy.html | 111 | "We **never collect information from children**" |
| `we never` | about.html | 210 | "We **never** dismiss concerns as overreaction." (Not a privacy claim) |
| `we never` | index.html | 445 | "We **never** ask for passwords, banking details, or personal information." |
| `we never` | privacy.html | 64 | "We **never** sell your information and we **never** share your name or contact details." |
| `never share` | index.html | 600 | "We will **never share** your email, never send spam…" (email sign-up) |
| `never share` | module-3.html | 503, 809, 1070, 1104 | Instructional advice: "**Never share** your passwords…" / "**Never share** a verification code…" (These are safety instructions to learners, not privacy claims about DCC.) |
| `never stored` | module-10.html | 448 | "Your credit or debit card number is **never stored** in plain text…" (Describing delivery app behaviour, not DCC.) |
| `no data is collected` | None | — | Not found |
| `no tracking` | None | — | Not found |
| `true privacy` | None | — | Not found |

**Assessment by category:**

- **Instructional "never share"** (module-3.html): These are safety instructions telling learners not to share passwords/codes. They are not DCC privacy claims. No concern.
- **Third-party "never stored"** (module-10.html): Describes delivery app encryption behaviour. Not a DCC privacy claim. However, it is an absolute statement about a third party's infrastructure — technically unverifiable. Minor concern.
- **DCC own statements** (index.html, privacy.html, about.html): "We never ask for passwords," "We never sell your information," "We never share your name," "We never collect information from children." These are direct promises made by DCC. They are reasonable and proportionate — no overreach into "true privacy" or "no tracking" territory.

### Result: ⚠️ FLAG — One item for minor review

The statement in module-10.html line 448 ("Your credit or debit card number is **never stored** in plain text") makes an absolute claim about third-party delivery apps (Instacart, Uber Eats, etc.). This is likely true for reputable apps but is an absolute statement about systems DCC does not control. Consider softening to "is typically converted to a secure token" or citing the specific app's privacy documentation.

All DCC-own privacy statements (privacy.html, index.html) are proportionate and defensible.

---

## Audit Item 5: Sidebar Completeness

### Requirement
Each of the following files must have sidebar links to: `module-2-5.html`, `module-12.html`, `module-13.html`, `module-14.html`, `module-15.html`.

Files checked: module-1.html through module-12.html, final-quiz.html (+ module-2-5.html and module-12.html reviewed separately).

### Results

| File | module-2-5 | module-12 | module-13 | module-14 | module-15 |
|---|---|---|---|---|---|
| module-1.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-2.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-3.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-4.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-5.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-6.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-7.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-8.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-9.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-10.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| module-11.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| final-quiz.html | ✅ | ✅ | ✅ | ✅ | ✅ |
| **module-2-5.html** | n/a (self) | ❌ | ❌ | ❌ | ❌ |
| **module-12.html** | ✅ | n/a (self) | ❌ | ❌ | ❌ |

### Detail on failures

**module-2-5.html sidebar** — Links go from module-11 directly to `module-visual-ai.html`, then `family-setup.html`, then `resources.html`. Missing: module-12, module-13, module-14, module-15.

**module-12.html sidebar** — Links go from module-11 to module-12 (self), then `module-visual-ai.html`, `family-setup.html`, `resources.html`. Missing: module-13, module-14, module-15.

### Result: ❌ FAIL — module-2-5.html and module-12.html have incomplete sidebars

The commit message notes (831b4d4) stated these were fixed, but the current files do not reflect that fix. The 12 files checked (modules 1–11 and final-quiz) all pass. Two files need sidebar updates.

**Fix required:**
- `module-2-5.html`: Add links to module-12, module-13, module-14, module-15 after the module-11 link.
- `module-12.html`: Add links to module-13, module-14, module-15 after the module-12 (self) link.

---

## Audit Item 6: YouTube Links

### Method
Searched all module HTML files and index.html for `href` attributes pointing to `youtube.com` or `youtu.be`.

### Findings

All YouTube links found are search-query links (using `youtube.com/results?search_query=...`) — not direct video URLs. This means they link to search results pages, not specific videos. This is intentional design (avoids links breaking when videos are removed).

| File | Line | URL Pattern |
|---|---|---|
| module-1.html | 838, 847 | YouTube search for iPad basics / iPhone gestures |
| module-2.html | 649, 658 | YouTube search for phishing / internet safety |
| module-3.html | 974, 983 | YouTube search for password manager / Face ID |
| module-4.html | 631, 640 | YouTube search for app downloads / App Store safety |
| module-5.html | 820, 829 | YouTube search for email app / spam blocking |
| module-6.html | 690, 699 | YouTube search for online banking / mobile banking safety |
| module-7.html | 580, 589 | YouTube search for iPad drawing apps / iPhone photo editing |
| module-8.html | 1058, 1067 | YouTube search for FaceTime / sharing photos |
| module-9.html | 493, 502, 511 | YouTube search for AI explained / deepfakes / safe AI tools |
| module-10.html | 465, 474, 483 | YouTube search for Instacart / Uber Eats / grocery delivery |
| module-11.html | 446, 455, 464 | YouTube search for Uber / Uber safety / Lyft vs Uber |
| index.html | 506, 537, 568 | YouTube search for three podcast titles |

**Total:** 27 YouTube links across 12 files. All use search query pattern. No direct video URLs.

### Result: ✅ PASS

All YouTube links use the search query pattern with `&sp=CAMSAhAB` (sorted by upload date), which is a reasonable approach for resilience. No broken direct video links. All open in new tab with `rel="noopener"`.

**Minor note:** Search query results can surface unrelated or inappropriate videos as top results over time. Consider periodically spot-checking that the query strings still return relevant tutorials.

---

## Audit Item 7: Mobile Overlaps (Print Button vs. Feedback Button)

### Method
Examined `css/print.css`, `css/main.css`, and `css/mobile.css` for positioning of the print button and feedback FAB button. Also reviewed `js/feedback-github.js` for injected button position.

### Key Findings

**Feedback FAB button (`.dc-unified-feedback-btn`, injected by `feedback-github.js`):**
- `position: fixed; bottom: 24px; right: 24px; z-index: 999996`

**Print button (`.btn-print`, in HTML of all module files):**
- Defined in `print.css` as `display: inline-flex` with `margin: 1.5rem auto 0` — **not** `position: fixed`.
- In module HTML, wrapped in `<div style="text-align:center; padding:1rem 0 0.5rem">` — flows in the document, not fixed.
- The `.btn-print` appears in the document flow near the bottom of the content area, not as a floating fixed element.

**Conclusion:** There is no overlap risk between print button and feedback button. The print button is in the document flow; the feedback FAB is fixed at bottom-right. They do not occupy the same space.

**Additionally:** The `@media print` rule in `print.css` hides `.btn-print` when printing (`display: none !important`), which is correct. The feedback FAB is also hidden during print via the same rule block.

### Result: ✅ PASS

No overlap risk on any screen size. The print button is inline in the page content; the feedback FAB is a floating element. They do not conflict.

---

## Audit Item 8: Escape Hatch / Exit Safely Button

### Method
Searched for "Exit Safely," `google.ca`, `google.com`, `panic-button`, `exit-safely` across all HTML and JS files.

### Findings

**Exit Safely feature (`js/exit-safely.js`):**
- File exists at `C:\Users\getkr\brenda-digital-confidence\js\exit-safely.js`
- Injects a persistent "Exit Safely" button that redirects to `https://www.google.ca`
- Uses `history.replaceState` to replace the browser history entry before redirect (makes it harder to navigate back)
- The button is loaded in **all 16 module files** (module-1 through module-15, module-visual-ai.html) and is present on module-2-5.html as well

**Scam/Panic feature (`js/panic-button.js`):**
- Separate from exit-safely — this injects a "Help — I think I've been scammed" guide modal
- Loaded on all module pages and several non-module pages (about, faq, family-setup, etc.)
- Does **not** redirect to Google; opens a 5-step response guide

### Result: ✅ PASS

Both the Exit Safely button (google.ca redirect) and the panic/scam guide button are present and loaded on all module pages. Feature is implemented and active.

---

## Audit Item 9: Image Alt Attributes

### Method
Searched all module HTML files, index.html, about.html, resources.html, faq.html, glossary.html, and final-quiz.html for `<img>` tags with empty (`alt=""`) or missing `alt` attributes.

### Findings

**Empty alt attributes:** None found.

**Missing alt attributes:** None found.

All hero images across modules 1–15, module-2-5, and supporting pages have descriptive alt text. Examples confirmed:
- module-1.html: `alt="A friendly senior woman smiling warmly while looking at her tablet at home"` ✅
- module-8.html: `alt="A senior couple using a smartphone together, staying connected with family"` ✅ (local image)
- module-10.html: `alt="A senior woman smiling while browsing an app on her tablet, representing easy and safe online ordering from home"` ✅ (local image)
- module-13.html: `alt="Person using a smartphone to connect with family on social media"` ✅
- module-15.html: `alt="A doctor on a video call consultation, smiling and attentive, on a laptop screen"` ✅

**Local images confirmed to exist:** All local image files referenced in module and main pages (`senior-couple-smartphone.jpg`, `senior-woman-tablet-smiling.jpg`, `senior-woman-ipad.jpg`, `senior-woman-video-call.jpg`, etc.) were confirmed present in the `/images/` directory.

### Result: ✅ PASS

No empty or missing alt attributes found on any `<img>` tag across audited files.

---

## Audit Item 10: Quick Wins — Other Issues

### 10a. "program" vs "programme" (Canadian spelling)

Three instances of `program` (US spelling) found in visible text — distinct from the correct Canadian `programme`:

| File | Line | Context |
|---|---|---|
| module-1.html | 532 | "Closing a frozen **program** on Windows:" |
| module-1.html | 771 | "When you open a **program**, it also appears in the Taskbar…" (appears twice in same sentence) |
| module-12.html | 707 | "…they need you to download a **program** called AnyDesk first." |

**Assessment:** In computing contexts, "program" (software application) is distinct from "programme" (a course or curriculum). "Computer program" is the correct term even in Canadian English — this is not a violation. These are all in technical computing contexts, not curriculum references. **No fix needed.**

### 10b. Module-2-5 Sidebar: Missing modules 12–15 (Cross-reference with Item 5)

Already reported under Item 5. The sidebar on module-2-5.html jumps from module-11 to `module-visual-ai.html`, missing four modules.

### 10c. Module-12 Sidebar: Missing modules 13–15 (Cross-reference with Item 5)

Already reported under Item 5. The sidebar on module-12.html ends at module-12 (self) then goes to `module-visual-ai.html`, missing three modules.

### 10d. "organizing" in module-8 is in a "success state" summary

The `organizing` violation in module-8.html line 1090 is inside a `<div class="success-state">` completion summary. It reads: "…and started **organizing** your relationships." Since the CLAUDE.md hard constraint says "Do not edit training module copy, lesson text, or instructional content — UI and form logic only unless explicitly told otherwise," this fix should be explicitly approved before making the change, as it touches module content.

### 10e. module-9.html uses "free" to describe DCC-adjacent AI tool

At line 477: "To access: visit **chat.openai.com** (a **free** account is needed)." This is describing ChatGPT's free tier, not DCC itself — acceptable.

### 10f. No red circle close buttons found

The feedback modal close button (in `feedback-github.js` line 130) renders as `× Close` (text button), consistent with CLAUDE.md standards. No red circle `✕` buttons found.

### 10g. Module numbering consistency in sidebars

Module-1 through module-11 sidebars and final-quiz.html all show consistent module numbering and labels. No inconsistencies beyond the missing entries already flagged in Item 5.

### Result: ⚠️ FLAG — Minor items noted, no critical failures

---

## Summary Table

| # | Audit Item | Result | Issues Found |
|---|---|---|---|
| 1 | Internal links (broken link check) | ✅ PASS | 0 broken links |
| 2 | Canadian English violations | ⚠️ FLAG | 3 violations: `realized` ×2 (mod-5, mod-6), `organizing` ×1 (mod-8) |
| 3 | "Free" self-references | ⚠️ FLAG | Pervasive but accurate; footer tagline is borderline as noted |
| 4 | Privacy absolute language | ⚠️ FLAG | 1 minor: mod-10 makes absolute claim about third-party app |
| 5 | Sidebar completeness | ❌ FAIL | module-2-5.html missing mod-12–15; module-12.html missing mod-13–15 |
| 6 | YouTube links | ✅ PASS | 27 links, all search queries, all use noopener |
| 7 | Mobile overlaps (print vs. feedback) | ✅ PASS | No overlap — print button is inline, not fixed |
| 8 | Exit Safely button | ✅ PASS | Feature present, active on all module pages |
| 9 | Image alt attributes | ✅ PASS | All images have descriptive alt text |
| 10 | Quick wins | ⚠️ FLAG | "program" in computing context (acceptable); sidebar gaps cross-referenced |

### Counts
| Status | Count |
|---|---|
| ✅ PASS | 5 |
| ⚠️ FLAG | 4 |
| ❌ FAIL | 1 |

---

## Recommended Actions (Priority Order)

1. **[MUST FIX]** Add missing sidebar links to `module-2-5.html` (add module-12, 13, 14, 15) and `module-12.html` (add module-13, 14, 15). This is a navigation failure — users on those pages cannot reach the newer modules.

2. **[SHOULD FIX]** Change `realized` → `realised` in module-5.html (line 252) and module-6.html (line 253). These are story/testimonial quotes, but still visible text. Confirm with Aaron whether module content edits are approved.

3. **[SHOULD FIX — with approval]** Change `organizing` → `organising` in module-8.html (line 1090). Requires Aaron's approval per the no-module-content-edits constraint.

4. **[NICE TO HAVE]** Soften the absolute third-party claim in module-10.html (line 448): "Your credit or debit card number is never stored in plain text" → "is converted into a secure token and is not stored in plain text." Small change that avoids an unverifiable absolute claim.

5. **[MONITOR]** Review "free" positioning if any monetisation or sponsorship model is introduced. No action required now.

---

*Report generated by Claude Code — March 25, 2026. No code changes were made during this audit.*
