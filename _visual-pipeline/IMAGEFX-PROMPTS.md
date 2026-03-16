# ImageFX Prompts — Digital Confidence Centre
**Generated:** 2026-03-16
**Pipeline Stage:** Stage 2 — Generate
**Status:** Awaiting Aaron approval before any image is applied

All prompts follow the formula from image-prompt-engine.md:
`[SUBJECT] + [CONTEXT/SETTING] + [EMOTION/TONE] + [STYLE] + [TECHNICAL SPECS]`

Brand colours: Primary #2B5EA7 (trust blue) · Accent #E8845C (warm coral) · Background #FAF8F5

---

## family-setup.html — Hero Banner

**Current image:** `photo-1529156069898-49953e39b3ac` (Unsplash CDN)
**Issue:** Duplicate — same photo used on both module-8.html AND family-setup.html. Visual repetition. Also missing `?v=2` cache-buster.
**Severity:** ⚠️ Medium
**Dimensions needed:** 1200 × 400px landscape crop
**Suggested alt text:** `An adult child sitting beside an elderly parent at a kitchen table, patiently helping them set up a tablet device`

### Stage 1 Brief
- **Communicates:** This is a gift from family — helping someone you love get started
- **Audience:** Adult children and caregivers setting up for a parent/grandparent
- **Emotion:** Warmth, patience, intergenerational love, empowerment

### Candidate A
```
Warm close-up of an adult woman in her 40s sitting beside her elderly mother at a bright kitchen table, both looking at an iPad together, the daughter pointing at the screen with a gentle smile, the mother looking curious and engaged, natural window light, warm neutrals, soft focus background, genuine candid moment, photorealistic, shot on Canon 5D, 85mm lens, shallow depth of field
```

### Candidate B
```
An adult son in his 50s handing a tablet computer to his elderly father seated in a comfortable armchair, both smiling warmly at each other, the son leaning in to show something on the screen, cozy living room with warm afternoon light, indoor Ontario home setting, genuine and loving interaction, photorealistic, wide shot, warm colour palette with soft blues and cream tones
```

### Candidate C
```
A caregiver in her 30s patiently showing an elderly woman how to use a smartphone, both seated at a dining table, the senior looking at the screen with a hopeful and curious expression, caregiver pointing at the phone screen, natural daylight from a nearby window, warm and encouraging atmosphere, cozy Canadian home interior, photorealistic, 3/4 angle shot, shallow depth of field, warm neutral tones
```

---

## module-10.html — Hero Banner

**Current image:** `photo-1498050108023-c5249f4df085` (Unsplash CDN)
**Issue:** Wrong context — image shows generic "hands typing on a laptop" which does not match the page topic (grocery and food delivery apps on iPad). Also wrong demographic — no senior visible.
**Severity:** ⚠️ Medium (wrong demographic + wrong context)
**Dimensions needed:** 1200 × 400px landscape crop
**Suggested alt text:** `A senior woman smiling while browsing a grocery delivery app on her iPad at her kitchen table, with fresh produce visible nearby`

### Stage 1 Brief
- **Communicates:** Ordering groceries from home is easy, safe, and actually enjoyable
- **Audience:** Seniors 70+ who are curious but nervous about ordering online
- **Emotion:** Delight, capability, ease, warmth
- **Visual context:** Kitchen setting, iPad prominent, food/produce visible, warm light

### Candidate A
```
A cheerful senior woman in her 70s sitting at a bright kitchen table, looking at an iPad with a pleased and confident expression, a colourful bowl of fresh vegetables visible beside the iPad, warm morning light through a kitchen window, Canadian home kitchen décor, photorealistic, shot on Canon 5D, 85mm lens, warm colour palette, shallow depth of field
```

### Candidate B
```
An elderly couple in their late 60s sitting together at a kitchen table, one pointing at a tablet screen showing colourful grocery items, both smiling and looking pleased, grocery bags on the counter in the background, warm and cozy home setting, soft natural light, photorealistic, wide shot, genuine happy interaction, warm neutrals and soft greens
```

### Candidate C
```
A smiling senior man in his 70s holding an iPad showing a colourful food delivery app, sitting comfortably in his kitchen, a steaming cup of tea nearby, warm afternoon light, cozy Canadian home atmosphere, feeling of ease and independence, photorealistic, portrait orientation cropped to landscape, shallow depth of field, soft warm tones
```

---

## digital-literacy-101.html — Hero Banner

**Current image:** None — stub page, no hero image yet
**Issue:** New page needs a hero image before content launch
**Severity:** 💡 Opportunity (new page)
**Dimensions needed:** 1200 × 400px landscape crop
**Suggested alt text:** `A senior person reading a friendly book about technology at a bright, cosy kitchen table, looking relaxed and curious`

### Stage 1 Brief
- **Communicates:** This is a safe, gentle, approachable place to learn tech vocabulary
- **Audience:** Seniors who don't yet know basic computer words — the most beginner of beginners
- **Emotion:** Safety, warmth, curiosity, "I can do this"
- **Visual context:** Books/reading/learning, but warm and human — not intimidating

### Candidate A
```
A warm close-up of a senior woman in her 70s sitting at a bright kitchen table with a friendly open book, reading with a relaxed and curious expression, soft morning light through a window, warm cream and blue tones, cozy home atmosphere, photorealistic, shot on Canon 5D, 85mm lens, shallow depth of field, inviting and approachable mood
```

### Candidate B
```
An elderly man in his late 60s at a wooden desk, writing notes in a small notebook with a gentle smile, a tablet computer open beside him, warm lamp light, cozy library or home study setting, feeling of peaceful learning and discovery, photorealistic, 3/4 angle, warm amber and cream tones, no stress or confusion in expression
```

### Candidate C
```
A senior couple sitting together at a bright kitchen table, both looking at a simple colourful book or magazine, one pointing at a page and explaining something, genuine smiles, warm natural window light, Ontario home décor, feeling of shared discovery and mutual support, photorealistic, wide shot, warm soft tones
```

---

## Action Required After Review

| Page | Action |
|------|--------|
| family-setup.html | Select A, B, or C → generate in ImageFX → save to `/approved/family-setup-hero.jpg` → apply |
| module-10.html | Select A, B, or C → generate in ImageFX → save to `/approved/module-10-hero.jpg` → apply |
| digital-literacy-101.html | Select A, B, or C → generate in ImageFX → save to `/approved/digital-literacy-101-hero.jpg` → apply |

Also fix at the same time (no new images needed):
- Add `?v=2` cache-buster to `module-visual-ai.html` hero URL (Low severity, 1-line fix)
- Add `?v=2` cache-buster to `family-setup.html` hero URL after image is replaced

---

*No live images changed. All changes await Stage 3 approval per VISUAL-PIPELINE.md.*
