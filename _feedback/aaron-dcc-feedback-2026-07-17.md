# DCC — Aaron live-browse feedback, 2026-07-17

Captured verbatim-intent from Aaron's dictated walk-through of the live DCC site (adults + kids). NOT built yet — all items are design-gated and/or need a focused sprint. This doc is the reviewable container so nothing is lost. Priorities are proposed, not locked. Cross-ref existing audits: `_audit/ui-ux-ia-audit-2026-06-18.md`, `_audit/interaction-audit-2026-06-28.md`.

Naming decision confirmed by Aaron: **"DCC Adults" + "DCC Kids"** is the delineation (not seniors/children). Use adults + kids.

---

## A. Navigation & delineation between Adults and Kids (P1 — IA/UX)

1. **Adults↔Kids feels "together" — too easy to get lost.** Clicking around from DCC Adults, Aaron ended up inside DCC Kids without a clear sense he'd crossed a boundary. Needs an explicit "you're leaving the adults site for the kids site" signal — an interstitial/dialogue, or strong visual re-skin at the boundary. Right now the two read as one continuous site.
   - IA GATE applies (restructures consumer-facing nav) → invoke `/information-architecture` before redesign.

2. **"Back to Digital Confidence Centre" link is broken + sloppy.** On `/kids/7-9`:
   - The link is **smashed into the first line of the header**, no back-arrow, reads as sloppy taxonomy.
   - "Digital Confidence Centre" is the *same* name for both adults and kids, so the label doesn't tell you where you're going or what the current section even is.
   - **BUG: the link took Aaron back to the OLD/original version of DCC Adults** (wrong target). Verify + fix the href.

3. **What IS the `/kids/7-9` page?** It reads like a **caregiver** space — "activities for caregivers and children to do together, no screen needed for most" (Aaron *likes* that framing). But it isn't labelled as such. Decide + label clearly: is this the **Caregiver** section? Name it so the visitor knows who it's for.

---

## B. Accessibility / WCAG defects (P1 — QA bugs, likely fixable without redesign)

4. **Contrast fail — blue banner, black text** on `/kids/7-9`. Black text on the darker-blue banner almost certainly fails WCAG AA contrast. (Possibly a deliberate darker light-mode — confirm, then fix token.)

5. **Footer defects** on `/kids/7-9`: (a) **left-justified** (not ideal — should match site footer convention), and (b) same **dark-blue-with-black-text** contrast fail in portions of it.

6. **Add a real, free accessibility tool to the footer.** Aaron's standing request: a *true* accessibility tool (screen reader etc.), ideally **Canadian + free**, government-provided if such a thing exists. Research + place in footer. (Sovereignty check applies — prefer Canadian/free/gov.)

7. **Device-neutrality pass (P2).** Content is mostly balanced (pairs "iPhone/iPad … Android") but consistently **leads Apple-first**, and persona copy leans iPad. No hard "buy an iPhone" default found in learning steps. Do a neutrality pass so no section defaults to Apple; use generic "tablet / phone" where a specific brand isn't needed. (Verified 2026-07-17 via repo grep — real but nuanced.)

---

## C. DCC Adults — "Play audio / read aloud" placement (P2)

8. The **read-aloud / screen-reading** feature is currently tucked inside **Display Settings**. Tucking display settings away = good (keep). BUT read-aloud **is not a display setting** — it's a text-to-speech / screen-reading *function*. Pull it out into its own, easier-to-find spot (labelled something like "Read this page aloud" / "Listen"), still not in-your-face, but not buried under Display Settings. Exact label TBD.

---

## D. Branding — logos + the character library (P1 — brand system)

9. **Logos needed for both DCC Adults and DCC Kids** — both a **favicon** and an actual on-site brand indicator/wordmark, distinct enough to reinforce which site you're on (ties to item 1's delineation problem).

10. **Character brand library (Aaron is enthusiastic about this — high priority).** The etched characters-in-circles from the adult/senior site are a hit. Build a proper **library**, stored + saved as reusable artifacts, written into the branding guidelines:
    - **A whole set** of them so they can be referenced/reused.
    - **Context-relevant usage**: character matched to the on-screen content (scam topic → a fitting character, etc.). Make it feel like a game.
    - **Kids version**: same etching style, slightly more junior look (e.g. ponytail, baseball cap).
    - **Teen version**: differentiated again (sunglasses; bandana maybe — TBD).
    - Same etching styling across all three tiers (adult / teen / kid) so it's one family with age cues.
    - Store as artifacts + document in branding guidelines so they're re-grabbable.
    - DESIGN GATE applies. Check backlog for prior character-library request before starting (Aaron thinks he asked before).

---

## E. DCC Adults — video style (BIG ASK, P2, research-first)

11. **Pick ONE video style for DCC Adults**, appropriate sections only (not everywhere), then produce **one** pilot video and iterate.
    - NOT the "six people" illustration for video.
    - **Tone: helpful, serious, professional — with warmth and light fun. Walk the line.** Aaron walked back the earlier Monty-Python / South-Park-cutout idea as **too goofy/silly** — these go in front of libraries and potential **government grant** reviewers, so they must read as credible, not a gimmick.
    - **HARD IP/LIKENESS GUARDRAIL (Aaron, do not cross):** NO recognizable real people (celebrities) and NO copyrighted/trademarked characters (e.g. Golden Girls, South Park) — right-of-publicity + copyright/trademark risk, unacceptable for a grant-funded public product. **Use ORIGINAL, generic AI-generated characters only.** When in doubt, default to a plain generic character. This ties directly to the etched **character library (D)** — the video characters should be that SAME original family, not a one-off cutout gimmick.
    - Characters: original, emotive (happy / sad / worried), can look at their phone, scratch head, react along with the narration. Mix of men/women, ages, bald/not — reflect the audience.
    - **Voiceover + transcription**, **English + Canadian French** (both — do not forget French). **Spanish = nice-to-have, backlog** (Canadian-focused first).
    - Intro/simple sections framing: "What you'll learn is ___", open with **"Did you know…"** or **"Have you ever had a moment where…"**.
    - **Research-first**: use research to determine the appropriate style before producing. These are introductory/simpler pieces.
    - **Tooling**: Aaron mentioned a contact **"Samuel"** and a tool (heard as **"Banno"** — unconfirmed) for access. **Gmail search 2026-07-17 found nothing** — need Aaron to confirm the tool name / rough date / which account. (Candidates to check: HeyGen, Synthesia, Colossyan, D-ID.)

---

## F. Governance — branding guidelines as forced source of truth (P1 — process)

12. Any LLM generating DCC **scripts, videos, images, styling, or content** must be **forced to re-read the branding guidelines each time** and pull from them — fresh every run, no drift — and **archive everything** it produces so it's re-grabbable and consistent. Set up: (a) a canonical branding-guidelines doc for DCC (adults/kids/teen tiers + character library + video style once chosen), and (b) a build-step/agent-instruction that mandates reading it before any generative work. Candidate for a DCC PRODUCT.md clause + a CLAUDE.md-adjacent rule.

---

## Suggested sequencing
- **Quick-win bug cluster (B: 4, 5 + A: 2 broken link):** one focused QA/fix sprint, live-outcome verified — smallest, highest-certainty.
- **Branding (D)** and **governance (F)** are the foundation the video (E) and kids-playfulness work depend on — do the character library + branding-guidelines doc before generative video.
- **IA delineation (A1)** needs an `/information-architecture` pass first.
