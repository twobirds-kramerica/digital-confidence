# UX Heuristic Evaluation — Module 1 (The Escape Hatch)

Run via `/ux-heuristic-review` (`C:\Users\getkr\.cache\twobirds\headless-sprints\opencode-uxia-attempt\.claude\skills\ux-heuristic-review\SKILL.md`), live test on OpenCode headless sprint retry of `S-SELF-TEACHING-AGENT-RESEARCH-001`.

```
Evaluator: OpenCode / ux-heuristic-review skill
Date: 2026-09-02
Product: Digital Confidence Centre — modules/module-1.html ("The Escape Hatch")
User Group: first-time senior user, Margaret persona (74, iPad, anxious about "breaking" the device)
Task: read the lesson, answer the 3-question knowledge check, and submit feedback via "Give feedback on this lesson"
Device: 768x1024 viewport (iPad portrait), local http.server, no zoom applied
```

**Honest scoping note (per the skill's own limitation):** this is a single AI pass, not NN/G's recommended 3-5 independent human evaluators reconciled together. Treat this as a strong first pass, not a substitute for a human accessibility/usability review.

## Pass 1 — learn the flow

Walked the page top to bottom: hero framing (Margaret's story) → "golden rule" reassurance → two-branch Home-button/swipe-up instructions → fake-warning example → 3-second rule → 3-question knowledge check (instant per-answer feedback, no submit step) → progress checklist → share-this-lesson → "Where to next" → feedback CTA. Also opened the page-level "Display settings" control (inline expanding panel: text size, dark mode, dyslexia font) to see the site's own settings-UI convention before judging the feedback modal against it.

## Pass 2 — findings

### Finding 1 — Wrong-answer state is colour-coded red with no accompanying icon (Heuristic #9: Help users recognize, diagnose, and recover from errors)

**Severity (Nielsen 0-4):** 2 — minor, but specifically relevant to this product's own anxiety-first mandate.
**Screen/step:** Knowledge check, question 3 ("Your screen is frozen and nothing responds to tapping. What is the best first step?"). Selecting the wrong answer outlines it in red/red text; a separate yellow box below explains the right answer in plain language.
**Observation:** The wrong choice gets a solid red border and red text — a conventional "error" visual, even though no error-coded word ("wrong"/"incorrect") appears. Correct-answer guidance is a neutral yellow box, not tied to green/checkmark on the right answer itself.
**Why it violates this heuristic:** CLAUDE.md for this product explicitly bans anxiety-triggering, failure-coded user-facing signals ("wrong", "failed", "incorrect", "error") in favour of "let's try again" / "good try" framing. The red-outline treatment is the same signal in colour instead of words — for the target audience (users who "freeze" at scary red warnings, per the page's own Margaret framing two paragraphs earlier), a red-bordered box after tapping an answer risks reading exactly like the "flashing red warning" the lesson just taught them to distrust.
**Recommendation:** Replace the red state with a neutral or warm colour (e.g. the site's existing amber/yellow "Confidence check" callout colour) and add a small icon-based, non-alarming cue rather than relying on red. Keep the explanatory text — that part already matches the anxiety-first standard well.

### Finding 2 — Feedback dialog has no neutral close control, only "Discard" (Heuristic #3: User control and freedom)

**Severity (Nielsen 0-4):** 2 — minor, workable but a real gap.
**Screen/step:** "Give feedback on this lesson" → "Share your feedback" dialog.
**Observation:** The only two controls are **Discard** and **Send feedback**. There is no "Close" affordance visible in the dialog chrome. The modal does dim the page behind it, but a first-time user has no visible neutral exit.
**Why it violates this heuristic:** A user who opens this by mistake, or changes their mind without having typed anything, has to click a button that reads as "throw this away" to leave. That's a heavier, slightly loss-coded exit for what should be a free, no-cost escape — the opposite of the "you cannot break anything" reassurance the rest of Module 1 is built around. This also sits close to this repo's own standing modal rule in `digital-confidence/CLAUDE.md`: "Close buttons: Never use a large red circle with white ✕. Use the site's standard close button style... plain ✕ Close text button." No close button of any kind is arguably a stricter miss than the wrong style of close button.
**Recommendation:** Add a plain "✕ Close" text control (top-right, matching the standard this repo already specifies) as a neutral third option alongside Discard/Send — closing with nothing typed shouldn't have to look like discarding something.

### Finding 3 — Two different settings-UI patterns on the same page (Heuristic #4: Consistency and standards)

**Severity (Nielsen 0-4):** 1 — cosmetic/pattern inconsistency, not a functional blocker.
**Screen/step:** "Display settings" (header) vs. "Give feedback" (bottom of page).
**Observation:** "Display settings" is a lightweight inline-expanding panel directly under the header — click to open, click the same button again to collapse, no modal, no overlay, no separate exit control needed. "Give feedback" instead opens a full modal dialog with a page-dimming overlay and the Discard/Send exit pattern from Finding 2.
**Why it violates this heuristic:** the two most common "utility" interactions on the page (adjust how you see it / tell us something) use structurally different UI patterns and different mental models for how you leave them. A first-time user who's just learned "Display settings" toggles closed by tapping it again may reasonably try the same thing on the feedback dialog and find nothing happens.
**Recommendation:** Not necessarily "make them identical" — a feedback form legitimately needs a modal (it holds typed input). But align the *exit* pattern: give the feedback modal the same low-friction, no-ambiguity dismissal the settings panel already has, per Finding 2's fix.

## Gap Summary

| # | Finding | Heuristic | Severity | Effort estimate |
|---|---|-----------|----------|------------------|
| 1 | Wrong-answer state uses red border/text | #9 Error recovery | 2 | Low |
| 2 | Feedback dialog has no neutral close, only "Discard" | #3 User control and freedom | 2 | Low |
| 3 | Settings panel and feedback modal use inconsistent exit patterns | #4 Consistency and standards | 1 | Low |

## Recommended execution order

1. Finding 2 (add a neutral close control to the feedback modal) — lowest effort, closes a real gap against this repo's own modal-close-button rule.
2. Finding 1 (de-red the wrong-answer state) — lowest effort, directly serves the anxiety-first mandate this product already commits to everywhere else.
3. Finding 3 (align exit-pattern expectations) — follows naturally once Finding 2 lands; no separate work needed beyond it.

All three findings are UI/interaction-pattern only — no module content, lesson copy, or instructional text was touched or is being proposed for change, per this repo's "no changes to module content" rule.

## Evidence captured this run

Screenshots and page dumps saved to `C:\Users\getkr\AppData\Local\Temp\opencode\ux-heuristic-test\`:
- `01_top.png` — top of module-1.html at 768x1024
- `02_bottom.png` — scrolled bottom of page
- `03_q1_wrong.png`, `03_q2_wrong.png`, `03_q3_wrong.png` — wrong-answer states for each knowledge-check question
- `04_display_settings_open.png` — inline Display settings panel expanded
- `05_feedback_dialog.png` — "Share your feedback" modal open, showing Discard/Send-only controls
- `00_full.png` — full-page reference capture
