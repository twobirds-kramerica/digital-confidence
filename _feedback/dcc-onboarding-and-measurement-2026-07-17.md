# DCC — Guided Onboarding + Progress Measurement

Captured from Aaron 2026-07-17 (extends the DCC Video System, `dcc-video-system-spec-2026-07-17.md`). Three new components: intro/tutorial videos, reinforcement videos, and a before/after baseline assessment. Sequencing per Aaron: **build the intro video first, then map the rest.**

> **⚠️ FILED-DECISION CONFLICT — must resolve before building component C.** The baseline before/after assessment (C) collects user comfort-level answers. **ADR-0004 makes DCC no-auth / no-data-collection (offline-first).** Per FILED DECISIONS OUTRANK, do NOT silently build a data-collecting assessment. Compliant interpretation (build this unless Aaron/a new ADR says otherwise): **the assessment runs 100% locally (localStorage), no server, no PII leaves the device.** The user sees their own before/after; any "80% improved" grant/marketing stat comes from **anonymous, aggregate, opt-in** counters only — never personal records. A server-side or identifiable assessment would need a new ADR explicitly superseding ADR-0004.

---

## A. Intro / tutorial video — "Welcome to the Digital Confidence Centre" (P2)

**Model: the airline safety-briefing.** Calm, crisp, clearly articulated, reassuring — says everything, shows almost nothing that can date. Research (2026) backs this for seniors: reduce the fear of "messing up," orientation-first, non-overwhelming, practical.

**Content beats:**
- What the DCC is and who it's for.
- How to navigate the site; what the sections are for.
- **State the length up front** ("this is about 90 seconds").
- Permission to go at your own pace: **you can skip sections, take breaks, take as much time as you need — no pressure.** Explicitly reassure anyone "feeling a little behind or uncomfortable."
- "Pick the device you have — or if you're not sure, that's okay too."
- Calm visual: blue/black calm background, no hype, no drums/excitement. Dignified.

**The staleness rule (Aaron's "walk that line"):** do NOT show the live website UI in detail — UI changes and the video goes out of date. Describe the experience and purpose; use the DCC character(s) + simple generic motifs, not screen recordings of the current nav.

**Audience variants (separate videos, spoken to appropriately):**
1. **Adults** (primary).
2. **Practitioner / Parent / Family** — different framing: "this is for the person you care about; here's how to use it with them."
3. (Kids: later — likely its own version, not shared with adults.)

**Format:** video + transcription + audio, **EN + Canadian French** (Spanish nice-to-have). Same character/brand system + governance as the video spec. May use a character or a video-avatar — decide in the tool bake-off.

## B. Reinforcement / completion videos (P2)

- Short (~10s), **skippable**, shown at section boundaries: "You've completed [section]. Congratulations — here's what you learned."
- Reinforcement + dignity + momentum. Same character family, same bilingual + a11y rules.
- **Placement to map:** start of each section (set expectations) and/or end of each section (reinforce). Decide the pattern once the intro is approved — Aaron wants these "throughout" but skippable.

## C. Baseline before/after assessment (P2–P3) — see conflict flag above

- **Light** comfort-level self-check **before** a section, and again **after** — a few questions, not heavy, not intrusive.
- Purpose: (1) meet the **before/after measurement Canadian grant programs commonly require**, (2) marketing/credibility ("X% reported a Y% improvement"), (3) let the learner see their own growth.
- **"Free" wording caution (Aaron):** be careful how "free" is used near the questions — don't imply the questions are a price of entry, and keep any data claims honest. (Worth a specific copy pass.)
- **Build compliantly per the ADR-0004 flag: local-only, anonymous aggregate stats, no PII.**
- Research task: confirm what Canadian government / grant programs actually require for before/after outcome measurement (informs the question set).

## Build sequence
1. **Intro video (A) — Adults version first** (script + storyboard, pilot-01 format). Aaron reviews before others.
2. Map reinforcement-video (B) placement + write the completion-video template.
3. Practitioner/Family intro variant (A2).
4. Baseline assessment (C) — **resolve the ADR-0004 conflict first** (confirm local-only or file a superseding ADR), then design the light question set + local before/after mechanic.

## Loose ends to confirm
- **Footer "built with" credit:** Aaron says the tech/brand credit line at the bottom ("built with …") isn't needed — review + remove. (Separate from the *accessibility-tool-in-footer* request in the main feedback doc — that one stays.)
- Research grounding sources below.

---
### Sources (senior onboarding-video research, 2026-07-17)
- [Animoto — Onboarding Video 101 (2026)](https://animoto.com/blog/video-tips/onboarding-video-guide)
- [Community Tech Network / digitalinclusion.org — Digital Literacy Training](https://startup.digitalinclusion.org/ch4.html)
- [Hopebridge — Digital Literacy for Seniors](https://hopebridge.care/digital-literacy-for-seniors-why-its-never-too-late-to-learn/)
