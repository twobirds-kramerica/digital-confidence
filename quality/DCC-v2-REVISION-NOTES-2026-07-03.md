# DCC v2 — Revision Notes (Aaron's review, 2026-07-03)
*Feedback on the dcc-v2 preview (home + Helper-mode flagship). Verdict: direction is good; these are refinements, not a redo. The #1 issue is audience/framing clarity. Drives the next Fable revision pass.*

## 1. BIGGEST: audience & "real vs pretend" framing is confusing
- It's unclear who the user is (a senior learner? a helper/practitioner?) and what is real vs pretend. "Help Margaret spot the scam," "sit beside her to help her decide," "helping a real person" — abstract and ambiguous, **especially unsafe for a user with cognitive fog / early dementia.**
- **Fix (keep the ROLESafe helper concept, make the LANGUAGE crystal-clear + concrete + prescriptive, not wordy):**
  - Header: **"Practice: Spot the Scam."** Make it obviously *practice*.
  - Open plainly: *"This is pretend. Nothing here is real. Let's practise together."*
  - Margaret = **a made-up friend**, stated clearly. e.g. *"Pretend your friend Margaret shows you a text she just got. What would you tell her to do?"*
  - **Remove** "sit beside her," "help a real person," and the "who are we talking to" **toggle** — they cause the confusion.
  - Prescriptive without being heavy. One clear instruction at a time.

## 2. Device question — over-used; remove from non-device content
- Do NOT ask/show device for scams (device uniqueness is irrelevant there). Present device **only** when a module is genuinely device-specific (taking a photo, operating the device).
- **Passively collect** device/location for analytics + T&C (legal, useful) — but that's backend, **never a user-facing ask.**
- If ever asked, **once per session** max.

## 3. Save / account — missing; add industry-standard soft prompt
- No sign-in / save right now; a user investing >10 min risks losing progress.
- Add the standard pattern: **after meaningful time/activity**, a soft, value-first prompt — *"You've been here a while. Add your email for a free account so you can pick up where you left off."* Not an upfront wall.

## 4. Dark-mode scam text brightness — OK, leave it
- The bright "refund $472.10 pending" reads as an email/inbox on purpose. Intended. No change.

## 5. "Helping a real person" — weird wording
- "a person" + "real" together is odd (a person is always real). Reword / drop "real."

## 6. Legal disclaimer placement
- "Plain-language safety tips, not legal advice" is fine content but sits **too close to the course content** and reads as part of the lesson. **Move to a footer** statement, separated from the material.

## 7. Anti-Fraud Centre positioning (careful)
- Add the **website**, not just the phone number, so we don't push people to call a government queue.
- Make it a **separate statement with airspace** — *"If you ever have a serious concern, the Canadian Anti-Fraud Centre can help: [website]."* — so it does NOT read as *site* support. People don't read; a bare number looks like our support line and will generate misdirected complaints. Do not conflate it with the lesson.

## 8. Read-aloud enhancements
- **Read-along indicator:** subtle **light bolding of the current word** (not a highlight), no auto-scrolling, no headache-inducing motion.
- **Speed control:** speed up / slow down (worth doing well this time).
- **Voice:** choose a voice tuned for **hard-of-hearing** users (pitch/tone/clarity). Pick the best-science option.

## 9. Print lesson — make it look good
- Current print output is a raw web page. Add a proper **print stylesheet** so a printed lesson is clean and readable.

## 10. Share
- Add a **Share** option (keep "Copy link" too). Don't over-engineer.

## 11. Note: the "alpha" prototype felt more comfortable than the new home
- The earlier `v2-lab/scam-defence.html` felt more comfortable to Aaron than the new dcc-v2 home (though much of the feedback overlaps). Likely simpler / less busy. Worth diagnosing what made the alpha feel calmer and carrying it into the home.

## 12. Images / illustration (currently none — feels like a bare task)
- Add warm, non-intimidating visuals so it doesn't feel like text-only work.
- Constraint: DCC is static + sovereign + **no CDN** → self-hosted only. **Recommend warm hand-drawn-style inline SVG illustrations** (a person thinking, a calm reassuring scene, simple friendly line-art): sovereign, theme-aware (light/dark), scalable, and they don't date or need licensing. **Not** stock photos (licensing + stock-y feel). Real "Tech Concierge" photos can come later once the guide persona is chosen.
- Tone: friendly, calm, human warmth — not clip-arty, not childish.

## 13. Real-world context / "so what" narrative (light, durable, calm)
- Anchor **why the lesson matters** ("what's in it for me / why are you telling me this") with a short "did you know" line — make the user feel worldly and rounded, not scared or distracted.
- **Use VERIFIED, durable figures from the Canadian Anti-Fraud Centre, framed so they DON'T date fast** (lead with the durable *trend*, not the exact annual dollar):
  - Seniors (60+) are ~23% of the population but absorb ~**40% of fraud losses** — hit hardest.
  - **Fewer than 1 in 10 scams are ever reported.**
  - (Optional, softened) "In a recent year, Canadians lost over $700 million to fraud."
  - Cite the **Canadian Anti-Fraud Centre**; optional "learn more" link (to their *website*, not phone).
- Tone: **calm + empowering, never fear-mongering** — "this is common, here's how to stay ahead," not "be afraid." Be considerate of recently-widowed users new to handling this alone.
- Placement: top or bottom, 1–2 lines max. Do not overdo. "Later" is fine, but capture now.

---
## Plan
Run a **Fable revision pass** against these 13 points (holistic, not piecemeal — #1 touches several places). Front end stays the priority. Then wire the backend Aaron approved-in-principle (aggregate-no-PII analytics + feedback DB + the account/save from #3).
