# Margaret Doyle: master reference sheet: ready-to-run generation prompts

**Target tool:** Google AI Pro image generation (Nano Banana Pro), per ADR-0036 paid
exception (LOON video/cast lane). Max resolution (4K). Aspect: landscape sheet.
**Source of truth:** `C:\twobirds\digital-confidence\_feedback\dcc-character-art-briefs.md`
(section 1 Style DNA + section 2 Margaret). If prompt and briefs ever disagree, the briefs win.

Run all three variants below (per briefs section 13.1: lighter-etched / baseline /
denser-etched) so Aaron can pick the family's etched-warmth level. The only difference
between variants is the bracketed HATCH DENSITY line.

---

## Baseline prompt (variant 2 of 3)

Character reference sheet, single character, warm etched illustration style, like a
contemporary hand-engraved book plate or a quality newspaper's editorial portrait.
Crafted, human, timeless. NOT a cartoon, NOT corporate flat-vector, NOT photoreal,
NOT anime, no 3D render sheen.

STYLE RULES:
- Etched linework is the primary form-maker: fine parallel hatching and cross-hatching
  that follows form (curved strokes around cheeks, straight fills in flat cloth).
  Shadow density comes from stroke spacing, never airbrushed gradients.
- Warm, not austere: rounded stroke ends, generous open unhatched areas on lit skin,
  warm paper background doing part of the work.
- Three-weight line hierarchy: confident medium contour outline around silhouette and
  major forms; interior hatching at one-third the contour weight in 2-3 consistent
  directions per shadow area; finest weight only for hair strands, fabric weave, smile lines.
- [HATCH DENSITY: baseline: balanced etched modelling, roughly equal open paper and
  hatched shadow on the face.]
- All linework in near-black #1A1A2E ink, never pure black, never coloured line.
- Background plain warm white #FAFAF8.
- Colour applied as restrained flat washes UNDER the etched line, like a hand-tinted
  engraving. Skin largely paper-toned with warm tint only in shadow areas. No gradients,
  no glow, no rim light.

CHARACTER: MARGARET DOYLE, 71, retired teacher, warm and trustworthy:
- Age read through steel-grey softly waved silver hair (chin-to-shoulder, tucked behind
  one ear, practical and cared-for), defined smile lines, softened jaw. Posture upright
  and settled, never stooped. Medium comfortable build, average height.
- Approachable oval face; medium-large kind eyes (her most important feature); modest
  rounded nose; naturally warm resting mouth that never reads stern.
- ORIGINAL face: composite of ordinary features. Must not resemble any real actress,
  celebrity, or known TV teacher/grandmother character.
- Slim oval reading glasses in deep warm brown, worn pushed up into her hair by default.
- Locked wardrobe: open cardigan in warm teal #2A7B6F wash over a plain light top
  (pale #FFF0E0 tint); simple dark trousers (#50505F wash); small plain stud earrings;
  thin wedding band. Small geometric enamel pin on the cardigan in burnt orange #E8842C
  (her single orange accent).

SHEET LAYOUT (one 4K sheet, scale bar included):
- Full-body front, full-body 3/4 left, full-body 3/4 right, full-body profile.
- Head-and-shoulders portrait at 2x scale.
- Five expression busts: (1) warm neutral teaching face; (2) listening with gentle
  concern, worrying WITH someone not AT them; (3) "here's the thing" teaching emphasis,
  glasses pushed up, brows level, index finger resting on table; (4) gentle encouraging
  closed-mouth smile engaging the eyes; (5) quietly pleased and proud, slight nod,
  deeper smile.
- Dedicated hands study: correct phone grip (generic slab phone, blank screen) and open
  palm, four fingers plus thumb, visible knuckle detail appropriate to age.
- Colour swatch strip: #2A7B6F, #FFF0E0, #50505F, #E8842C, #1A1A2E, #FAFAF8.

BANNED: pearls or twin-set granny costuming; hunched shoulders; oversized comedy
glasses; vacant eyes; trembling lines; open-mouthed alarm; sweat drops or any comic
emotion symbols; pointing at the viewer; brand logos; any text other than the swatch strip.

---

## Variant 1 (lighter-etched)

Same prompt with the bracketed line replaced by:
[HATCH DENSITY: lighter: minimal interior hatching, mostly open paper on the face,
etching reserved for form-defining shadows only; the lightest, warmest read.]

## Variant 3 (denser-etched)

Same prompt with the bracketed line replaced by:
[HATCH DENSITY: denser: fuller classical engraving coverage, richer cross-hatch
modelling in all shadow areas while keeping lit skin open; the most traditional
book-plate read.]

---

## QA before saving any output (art-briefs section 11.4)

1. Three-weight line hierarchy present?  2. Ink #1A1A2E on warm paper?
3. All Margaret anchors present (glasses-in-hair, silver wave hairline, teal cardigan,
warm resting mouth, wedding band, settled upright posture)?  4. Hands correct?
5. Expressions match the five listed beats?  6. No real-person or IP resemblance?
7. No banned imagery?  8. Age reads correctly at thumbnail size?
Any fail = regenerate. Two anchor fails = off-model, re-seed, do not patch.
