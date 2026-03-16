# ImageFX Prompts — Digital Confidence Centre
**Generated:** 2026-03-16
**Pipeline Stage:** Stage 2 — Generate
**Status:** Awaiting Aaron approval before any image is applied

All prompts follow the formula from image-prompt-engine.md:
`[SUBJECT] + [CONTEXT/SETTING] + [EMOTION/TONE] + [STYLE] + [TECHNICAL SPECS]`

Brand colours for reference: Primary #2B5EA7 (trust blue) · Accent #E8845C (warm coral) · Background #FAF8F5

---

## family-setup.html — Hero Banner

**Current image:** `photo-1529156069898-49953e39b3ac` (Unsplash CDN)
**Issue:** Duplicate — same photo used on both module-8.html (Stay Connected) and family-setup.html (Set Up for a Loved One). Visual repetition for any user who visits both pages. Also missing `?v=2` cache-buster.
**Severity:** ⚠️ Medium
**Dimensions needed:** 1200 × 400px (crop to fit, landscape)
**Alt text to use once replaced:** `An adult child sitting beside an elderly parent at a kitchen table, patiently helping them set up a tablet device for the first time`

### Stage 1 Brief

- **Communicates:** Someone you love is helping you get set up — this is a gift from family, not a chore
- **Audience:** Adult children and caregivers visiting to set up the site for an elderly parent or grandparent
- **Placement:** Hero banner, full width, 1200×400px crop
- **Emotion/trust signal:** Warmth, patience, intergenerational love, empowerment
- **Visual context:** Warm kitchen or living room, natural light, warm neutrals

---

### Candidate A

**ImageFX Prompt:**
```
Warm close-up of an adult woman in her 40s sitting beside her elderly mother at a bright kitchen table, both looking at an iPad together, the daughter pointing at the screen with a gentle smile, the mother looking curious and engaged, natural window light, warm neutrals, soft focus background, genuine candid moment, photorealistic, shot on Canon 5D, 85mm lens, shallow depth of field
```

---

### Candidate B

**ImageFX Prompt:**
```
An adult son in his 50s handing a tablet computer to his elderly father seated in a comfortable armchair, both smiling warmly at each other, the son leaning in to show something on the screen, cozy living room with warm afternoon light, indoor home setting, Ontario-style décor, genuine and loving interaction, photorealistic, wide shot, warm colour palette with soft blues and cream tones
```

---

### Candidate C

**ImageFX Prompt:**
```
A caregiver in her 30s patiently showing an elderly woman how to use a smartphone, both seated at a dining table, the senior looking at the screen with a hopeful and interested expression, caregiver pointing at the phone screen, natural daylight from a nearby window, warm and encouraging atmosphere, cozy Canadian home interior, photorealistic, 3/4 angle shot, shallow depth of field, warm neutral tones
```

---

## Next Steps After Aaron Reviews

1. Aaron selects preferred candidate (A, B, or C)
2. Generate image in ImageFX using the approved prompt
3. Save to `_visual-pipeline/approved/family-setup-hero.jpg`
4. Update `family-setup.html` img src to `images/family-setup-hero.jpg?v=1`
5. Add `?v=2` cache-buster to `module-visual-ai.html` hero image at the same time (Low severity fix, zero risk)

---

## Out of Scope This Sprint (Low Severity — Awaiting Decision)

The following were flagged as Low severity in the audit. Not generating prompts yet — included here for reference when Aaron is ready to address them.

| Issue | Page | Action Needed |
|-------|------|---------------|
| Missing `?v=2` cache-buster | module-visual-ai.html, family-setup.html | 2-line HTML edit — no new image needed |
| Generic hero (laptop/hands) | module-10.html | Could benefit from new ImageFX image showing grocery ordering on iPad |

If you want prompts for module-10.html's hero, say "generate Module 10 grocery image prompt" and I will run Stage 1 + Stage 2 immediately.

---

*No live images were changed. All changes await Stage 3 approval per VISUAL-PIPELINE.md rules.*
