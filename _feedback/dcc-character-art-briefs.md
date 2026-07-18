# DCC Character Art Briefs — Master Reference for Original Art Generation

**Status: DRAFT — DESIGN GATE not cleared.** These briefs are the seeding text for master reference art. No art here is final; every visual decision below is DIRECTION for Aaron's taste sign-off. Produced by the Fable creative sprint 2026-07-18, against the forced-read gate: `dcc-brand-guidelines.md` read in full first, plus `dcc-character-cast-architecture.md` (personas + voice baselines) and `dcc-video-tool-research-fable.md` (render pipeline: Nano Banana 2 reference art → Adobe Character Animator puppets; Flow/Veo Ingredients for story-arc motion).

**What this file is for:** the single canonical text every image-generation run seeds from, so nine original characters render as ONE visual family, at ~90%+ consistency, forever. Once master art is approved (post-DESIGN GATE), the approved images become the pinned reference and this file becomes the written spec those images must always match. A render that contradicts this file is rejected — same severity as off-brand copy.

**Hard rules inherited (binding, non-negotiable):**
1. **ORIGINAL characters only.** Zero real-person likeness, zero celebrity echo, zero copyrighted/trademarked character resemblance. If a generation resembles a recognizable person or IP character, it is discarded — no "close enough."
2. **Dignified always.** No frail/confused senior tropes, no fool characters, no ethnic or national coding of the scam threat.
3. Calm / Capable / Dignified — the three brand words govern posture, expression, and styling for every character.
4. Colour and type values used here come from `DESIGN-SYSTEM.md` tokens (verified 2026-07-18) — never fabricated.

---

## 0. How to use these briefs with the render pipeline

1. **Reference-sheet generation (Nano Banana 2):** for each character, prompt with §1 Style DNA + that character's full brief. Produce a multi-angle master sheet: front, 3/4 left, 3/4 right, profile, plus the character's five expression beats (§per-character "Expression range"). One sheet per character, 4K, plain `--color-bg` warm-white background.
2. **Taste gate:** Margaret's sheet goes to Aaron FIRST (per cast-architecture §4.5). Nothing else is generated until her sheet is approved — she sets the family look every other character must match.
3. **Puppet build (Adobe Character Animator):** approved sheet art is separated into rig layers (see §11.3 layer list). The puppet file is the owned, drift-proof production asset.
4. **Story-arc lane (Flow/Veo Ingredients):** the SAME approved reference images are the Ingredients seeds. Never re-generate a character from text alone once a master exists.
5. **Archive:** every sheet, prompt, seed, and approved master is committed under a dated path (`_image-registry/characters/<name>/YYYY-MM-DD/` proposed) per the brand governance clause. Reproducible or it didn't happen.

---

## 1. Shared Style DNA (applies to every character — this is what makes them a family)

The DCC house style is a **warm etched illustration**: the feel of a contemporary hand-engraved book plate or a quality newspaper's editorial portrait — crafted, human, timeless — not a cartoon, not a corporate flat-vector person, not photoreal.

### 1.1 Rendering approach
- **Etched linework as the primary form-maker.** Faces and hands are modelled with fine parallel hatching and cross-hatching that follows form (curved strokes around cheeks, straight fills in flat cloth). Shadow density comes from stroke spacing, not from airbrushed gradients.
- **No photorealism, no 3D render sheen, no anime/cartoon styling, no flat corporate-memphis vector people.** If it could be mistaken for a stock illustration bundle, it is wrong.
- **Warm, not austere.** Classic engraving can read cold/banknote-formal. DCC's version is softened: rounded stroke ends, generous open (unhatched) areas on lit skin, and the warm paper background doing part of the work.

### 1.2 Line weight (the family fingerprint — must never drift)
- **Primary contour:** a confident medium outline (~2.5–3 pt at 1080 px character height) around silhouette and major forms.
- **Interior hatching:** fine strokes at roughly one-third the contour weight, in consistent directional sets (2–3 hatch directions per shadow area, max).
- **Detail line:** finest weight reserved for hair strands, fabric weave suggestion, and smile lines.
- The three-weight hierarchy (contour > feature > hatch) is identical across all nine characters and all three age tiers. A character drawn with uniform line weight, or with sketchy/broken contours, is off-model.

### 1.3 Colour treatment (token values from `DESIGN-SYSTEM.md` — verified, not invented)
- **Ink:** all linework in near-black `#1A1A2E` (`--color-text`) — never pure black, never coloured line.
- **Paper:** default background warm white `#FAFAF8` (`--color-bg`); card/scene fills warm off-white `#F5F2ED` (`--color-surface`).
- **Colour is applied as restrained flat washes UNDER the etched line** — like a hand-tinted engraving. Two to three wash colours per character maximum, drawn from the palette below. Skin is left largely paper-toned with warm tint only in shadow areas.
- **Family palette for wardrobe washes:** warm teal `#2A7B6F` (`--color-primary`), teal tint `#E8F5F0` (`--color-surface-primary`), pale warm `#FFF0E0` (`--color-surface-alt`), deep orange-brown `#8A450C` (`--color-accent-deep`), medium grey `#50505F` (`--color-text-light`). Burnt orange `#E8842C` (`--color-accent`) is the CTA/emphasis colour of the product — in character art it is used only as a SMALL signature accent (one item per character, listed per brief), never as a dominant garment, so characters never compete with buttons on the page.
- **No gradients, no glow, no rim light.** Depth = hatching. Mood = wash temperature.

### 1.4 Anatomy, age tiers, and the family read
- Proportions are naturalistic with gentle idealization: roughly 7-head adult proportion, believable bodies of varied builds. No caricature exaggeration of noses, ears, or jowls (a classic etching trap that reads as mockery — banned).
- **Three age tiers, one construction:** the same eye shape language, the same nose construction, the same mouth simplification across tiers, so a viewer instantly reads Marcus and Eleanor as drawn by the same hand.
  - **Senior tier (Margaret, Walter, June, Eleanor):** age carried in hair colour/texture, smile lines, neck softness, hands with visible knuckles and tendons. NEVER carried in stooped posture, trembling lines, vacant eyes, or oversized glasses played for comedy. Seniors stand upright, weight settled, gaze level.
  - **Adult tier (David, Priya, The Caller):** fuller energy in posture; hatching lighter on the face.
  - **Teen/kid tier (Marcus, Sophie):** larger eye-to-face ratio (slight — 10–15%, not anime), smoother face with minimal interior face hatching, rounder cheek contour. Age cues via wardrobe/prop (per brand guidelines), not via goofy proportions.
- **Hands matter.** This cast constantly holds phones. Hands are drawn carefully, four fingers + thumb, correct phone grip; hatched knuckle detail on senior hands. (Malformed hands are the #1 generative "goblin" — every sheet includes a dedicated hands study; a sheet with bad hands fails QA.)

### 1.5 Expression system (shared across the cast)
Every character must hit the DCC emotional arc from the script formula: **worried → uncertain → calm decision → reassured.** The house expression style is UNDERSTATED — emotion at conversation scale, not theatre scale:
- **Worried:** brows drawn slightly together and up at inner ends; lips closed and pressed; head tilted a few degrees toward the phone/screen. No open-mouthed alarm, no sweat drops, no wide "horror" eyes — ever.
- **Uncertain:** one brow marginally higher; mouth pulled small to one side; hand pauses mid-gesture.
- **Calm decision:** brows level; eyes steady on the object; chin very slightly lifted; shoulders dropped.
- **Reassured:** closed-mouth smile engaging the eyes (visible lower-lid rise + deepened smile lines); posture open.
- **Fifth beat, per character:** a signature "teaching/telling" expression defined in each brief.
Comic-book emotion symbols (sweat drops, motion lines, giant question marks, steam) are banned. Light etched hatch-shading shifts around the eyes may carry mood.

### 1.6 Wardrobe philosophy
Everyday contemporary-Canadian clothing that will not date: knits, collared shirts, cardigans, plain tees, simple outerwear. No logos, no slogan text, no fast-fashion trend items, no fictional brand marks. Each character has a LOCKED signature outfit (their default in all art) plus one listed alternate. Seasonal variants are allowed later only as a deliberate versioned addition to this file.

---

## 2. MARGARET DOYLE — the Guide (design her first; she calibrates the family)

**Art-direction hook:** *the retired teacher you trust on sight — warm eyes, sensible cardigan, reading glasses in her hair, always about to say "let's look at it together."*

### 2.1 Identity spec
- **Age read:** 71 — read through steel-grey hair, defined smile lines, softened jaw; posture upright and settled, energy calm.
- **Build:** medium, comfortable; neither frail nor athletic. Height read: average.
- **Face:** approachable oval face; medium-large kind eyes (the single most important feature — most of her acting happens here); modest rounded nose; naturally warm resting mouth (her neutral must NOT read stern — test the neutral in thumbnail size). Original face: composite of ordinary features, deliberately checked against "resembles a known actress?" — if yes, regenerate.
- **Hair:** silver-grey, softly waved, chin-to-shoulder length, tucked behind one ear. Practical, cared-for, never "set" helmet-hair.
- **Glasses (signature prop):** slim oval reading glasses — worn pushed up into her hair by default; brought down to the nose when she reads a screen. This is her rigged signature gesture (cast doc §1.1) and a key consistency anchor. Frame colour: deep warm brown (`#8A450C` wash).
- **Wardrobe (locked):** open cardigan in warm teal wash (`#2A7B6F`) over a plain light top (paper-tone/`#FFF0E0` tint); simple dark trousers (`#50505F` wash). Small plain stud earrings. Thin wedding band (she is widowed and still wears it — quiet continuity detail, never mentioned in scripts).
- **Signature accent (the one orange item):** a small enamel pin on the cardigan — a simple maple-leaf-neutral geometric shape (NOT a literal flag) in `#E8842C`. [Taste call for Aaron: pin vs. no pin — see §13.]
- **Props she may hold:** her own smartphone (generic slab, blank or DCC-mock screen, no brand), a mug, the glasses.

### 2.2 Expression range (the five beats her sheet must include)
1. Warm neutral (default teaching face — slight natural warmth at rest)
2. Listening/concerned for a learner (worried beat, softened — she worries *with* you, never *at* you)
3. "Here's the thing" — glasses pushed up, brows level, index-finger-resting-on-table emphasis (her teaching/telling beat)
4. Gentle encouraging smile (reassured beat, closed-mouth, eyes engaged)
5. Quietly pleased/proud (end-of-module beat — the teacher watching a learner get it; slightly deeper smile, small nod pose)

### 2.3 Consistency anchors (never drift)
Glasses-in-hair default · silver wave hairline shape · teal cardigan · the warm resting mouth · three-weight linework · wedding band · overall "settled upright" posture. Any render missing two or more anchors is off-model.

### 2.4 Do / Don't
- DO: hands visible and expressive (open palms = "you're in charge"); eye-level camera height; phone set down face-down in teaching poses.
- DON'T: pearls/twin-set "granny" costuming; hunched shoulders; oversized comedy glasses; pointing AT the viewer; any resemblance to a known TV teacher/grandmother character.

---

## 3. WALTER — "the second learner" (senior tier, 74)

**Art-direction hook:** *a retired millwright with tradesman's hands and a flannel shirt — gruff-warm, phone held like an unfamiliar tool he's deciding to master.*

- **Age/build:** 74; broad-shouldered, heavyset-solid, big careful hands (draw the knuckle detail — his hands are his character). Upright but deliberate mover.
- **Face:** square face, heavy brows, short functional white-grey hair (worker's cut), neat short white moustache [taste call §13: moustache yes/no]; weathered cross-hatch texture on cheeks — worked-outdoors skin, not aged-frail skin. Eyes small-ish and shrewd, with dry warmth.
- **Wardrobe (locked):** plaid flannel work shirt in muted teal-grey wash (`#2A7B6F` + `#50505F` plaid, low contrast) over a plain tee; work-style trousers. Sleeves rolled to forearm. Signature accent: reading glasses in a shirt-pocket with an `#E8842C` cleaning-cloth corner just visible.
- **Props:** his phone (often held slightly too far away — the one gently humorous visual note allowed, played straight); coffee thermos.
- **Expression range:** (1) skeptical squint at the phone (his worried beat — suspicion, not fear); (2) embarrassed-proud "asking for a friend" look — eyes sideways, mouth wry; (3) concentration — tongue-of-effort BANNED, instead brows-down focus; (4) the slow-exhale relief (his reassured beat — shoulders drop, eyes close briefly); (5) the video-call smile (the grandson-in-Alberta face: his widest expression, still closed-mouth).
- **Consistency anchors:** flannel plaid · moustache (if approved) · big hands · brow weight · phone-at-distance habit.
- **Do/Don't:** DO seat him at a kitchen table or workbench; DON'T draw him confused-scratching-head, DON'T make the "holds phone far away" beat into a running joke in art — it appears at most once per video.

---

## 4. JUNE — "the confident one who got caught" (senior tier, 68)

**Art-direction hook:** *the sharpest dresser in the cast — crisp blazer, silver bob, direct gaze; the poster of "this happens to smart people."*

- **Age/build:** 68; trim, brisk posture, chin level, energy forward. The youngest-reading senior.
- **Face:** angular-friendly; defined cheekbones; bright alert eyes with fine smile lines; precise silver bob with a strong straight fringe — the most graphic hair shape in the cast (her instant-recognition silhouette).
- **Wardrobe (locked):** structured blazer in medium grey (`#50505F` wash) over a light blouse (`#E8F5F0` tint); signature accent: a geometric scarf or brooch with a small `#E8842C` element. Neat, office-manager-polished, never flashy.
- **Props:** her phone in a case with a card-pocket (organized-person detail); sometimes a small notebook — she writes things down.
- **Expression range:** (1) confident neutral — direct at camera, near-smile; (2) the "it almost got me" candid face — brows raised, mouth rueful, zero shame (this is her signature beat and must NOT read as embarrassment or distress); (3) leaning-in confiding look; (4) firm "and I know better — that's the point" emphasis face; (5) warm laugh-at-herself (the most open expression in the senior cast, still dignified).
- **Consistency anchors:** silver bob + fringe silhouette · blazer structure · direct gaze · the rueful-candid beat.
- **Do/Don't:** DO give her the straightest posture in the cast; DON'T draw her as a victim (no hand-to-mouth shock, no head-in-hands), DON'T soften her into a second Margaret — June is brisk where Margaret is warm.

---

## 5. DAVID — "the sandwich-generation son" (adult tier, ~45)

**Art-direction hook:** *a kind, slightly rumpled working dad — sleeves pushed up, half-zip and headphones-around-neck energy, learning to help without taking over.*

- **Age/build:** ~45; medium build, a comfortable softness; the posture of a busy person deliberately slowing down. Family resemblance to Margaret: same eye shape and warm resting mouth (he's her son — the shared construction of §1.4 does the work; do not clone her face).
- **Face:** friendly oval-square; short brown hair with first grey at the temples; light stubble [taste call §13: stubble vs clean-shaven]; expressive brows (he over-explains, then catches himself — brows do the catching).
- **Wardrobe (locked):** casual half-zip or open overshirt in teal-tint wash (`#E8F5F0`/`#2A7B6F`) over a plain tee; jeans. Signature accent: `#E8842C` lanyard or watch strap. Wedding ring.
- **Props:** two phones sometimes (his + "Mum's, that I'm setting up"), laptop bag, a kid's drawing folded in a pocket (Sophie continuity, background detail only).
- **Expression range:** (1) attentive-helpful lean-in; (2) the catch-himself beat — mid-gesture stop, small self-aware smile ("sorry, Mum — you drive"); (3) patient watching-not-touching (hands deliberately in lap/pockets while a senior taps — a key taught behaviour, make it readable in art); (4) reassured/proud of *her*, not of himself; (5) tired-but-warm end-of-day face (story-arc use).
- **Consistency anchors:** temple grey · half-zip layer · hands-off helping posture · Margaret family eyes.
- **Do/Don't:** DO stage him beside, never between, a senior and their device; DON'T draw him taking the phone out of anyone's hands — that image is the anti-lesson and is banned outright.

---

## 6. PRIYA — "the colleague at work" (adult tier, ~38)

**Art-direction hook:** *the calm expert in the pharmacy back-office — tidy cardigan over scrubs-adjacent workwear, checklist energy, the person everyone quietly asks.*

- **Age/build:** ~38; medium height, composed, economical movements; the stillest poser in the cast — her authority is stillness.
- **Face:** warm medium-brown skin (rendered per §1.3: paper-tone lifted with a warm wash + hatch modelling — the etched style must model her face with the same open-lit areas as every other character; do NOT over-hatch darker skin, a known engraving-style failure); dark hair in a neat low bun with a strand loose (the one informal note); composed brows; small confident smile. First-generation Canadian — carried in her persona and scripts, NOT in costume signifiers; she dresses like any Canadian pharmacy technician because she is one.
- **Wardrobe (locked):** professional cardigan in warm teal (`#2A7B6F`) over a neat collared work top (`#FAFAF8`); ID badge on a plain clip (blank/generic — no readable employer, no logos). Signature accent: `#E8842C` pen clipped to the cardigan.
- **Props:** clipboard/checklist, workplace monitor (screen shows DCC-mock UI only), her phone held squarely and confidently.
- **Expression range:** (1) precise explaining face — level brows, slight head tilt toward the screen she's pointing at; (2) patient "let's go step by step" (her teaching beat — the checklist face); (3) spotting-the-phish — eyes narrowed a fraction, calm, NOT alarmed; (4) quiet approving nod; (5) softer off-duty warmth (family scenes — she has DCC-audience parents; story-arc use).
- **Consistency anchors:** low bun + loose strand · teal cardigan + badge clip · stillness/economy of pose · the step-by-step gesture (counting on fingers, palm up).
- **Do/Don't:** DO let her point WITH an open hand or pen, never a jabbing finger; DON'T exoticize wardrobe or add ethnic costume coding; DON'T make her the office scold — she is never exasperated.

---

## 7. MARCUS — "the grandson who translates" (teen tier, 16)

**Art-direction hook:** *an easygoing sixteen-year-old with sunglasses pushed up in his hair, sitting beside Grandpa Walter, pointing at the screen with genuine patience.*

- **Age/build:** 16; lanky, still-growing frame, relaxed slouch that straightens when he's teaching; soccer-fit. Family resemblance to Walter: square jaw base, softened by youth.
- **Face:** open friendly face per teen-tier construction (§1.4: slightly larger eyes, minimal face hatching); short dark curls; expressive grin range — the widest smiles in the cast belong to the young tiers, but still no open-mouth shouting expressions.
- **Wardrobe (locked):** relaxed hoodie or track jacket in muted teal (`#2A7B6F` wash, tone down to feel worn-in) over a plain tee; approved teen cue: **sunglasses pushed up on his head** (brand guidelines cue, cast doc confirms). Bandana omitted (brand doc lists it optional/low-priority — leaving it out; revisit only if Aaron asks). Signature accent: `#E8842C` detail on his sneakers or jacket zip.
- **Props:** his phone (held one-handed, native ease — the visual contrast with Walter's two-handed grip is a storytelling tool), soccer ball in background scenes.
- **Expression range:** (1) relaxed default grin; (2) the respectful-teaching face — leaning toward Walter's phone, pointing with a knuckle, brows up encouragingly (his signature beat: "you're not bad at this, Grandpa — it's badly designed"); (3) mock-serious listening; (4) genuine delight when Walter gets it (his reassured beat — bigger than the seniors', still warm not smug); (5) focused gamer/scroller neutrality (story-arc use).
- **Consistency anchors:** sunglasses-on-head · dark curls · one-handed phone ease · sits BESIDE Walter, never over his shoulder.
- **Do/Don't:** DO keep his patience visibly genuine; DON'T draw eye-rolls, smirks at seniors, or grabbing the device — banned images; DON'T age him ambiguous-20s: he must clearly read as a teen next to David.

---

## 8. SOPHIE — "the grandkid" (kid tier, 9)

**Art-direction hook:** *a careful, bright nine-year-old with a ponytail, holding up a drawing to the video-call camera — curiosity with its hand up.*

- **Age/build:** 9; kid-tier proportions per §1.4 (rounder cheeks, larger eyes, smaller frame — natural child proportions, never chibi/cartoon).
- **Face:** round-cheeked, bright attentive eyes, a considering little half-smile as her default (she thinks before she taps — the face IS the DCC Kids lesson); light freckle suggestion via sparse dots [taste call §13: freckles yes/no]. Family resemblance to David/Margaret: the warm mouth.
- **Hair:** approved kid cue: **ponytail** (high, slightly off-centre, small `#E8842C` hair tie = her signature accent).
- **Wardrobe (locked):** striped long-sleeve tee in teal-tint stripes (`#E8F5F0`/`#2A7B6F`) and plain leggings/jeans. No character-merch clothing ever (IP rule).
- **Props:** a tablet held with BOTH hands (careful-kid grip), crayon drawings, a stuffed animal of deliberately generic design (round, plain, no IP echo) in background only.
- **Expression range:** (1) bright curious default; (2) the ask-first face — finger hovering NOT touching the screen, eyes turned up to a grown-up (the single most important Sophie pose: it is DCC Kids' entire behaviour model in one image); (3) delighted video-call wave; (4) proud showing-her-drawing; (5) calm listening (kids' content slows down — she models attentive stillness).
- **Consistency anchors:** ponytail + orange tie · both-hands tablet grip · the hover-and-ask pose · considering half-smile.
- **Do/Don't:** DO keep her calm-for-a-kid (brand rule: junior, never silly-goofy); DON'T draw sugar-rush energy, tongue-out faces, or device-snatching; DON'T put her alone with a device in any composition — a grown-up is always in frame or implied at frame edge (the pedagogy IS the composition).

---

## 9. THE CALLER — the scam archetype (adult tier, ageless ~40s)

**Art-direction hook:** *a silhouette at a desk with a headset — an ordinary office worker rendered as dense etched shadow; the threat is a business, not a monster.*

- **Treatment (the whole brief):** The Caller is the ONE character rendered against the style: where the cast is open, lit, and warm-washed, The Caller is a **flat, heavily-hatched silhouette** — near-solid `#1A1A2E` cross-hatch with only an outline read of: headset, desk, monitor glow edge, ordinary shirt collar. NO facial features, ever. No eyes in shadow, no grin — features simply not drawn.
- **Why:** dignity-preserving accuracy (organized businesses, not clever tricksters), zero demographic coding (a silhouette has no ethnicity, gender presentation kept ambiguous — soft generic hair shape, unisex collar), and instant visual grammar: learners recognize "threat scene" in half a second without fear-mongering imagery.
- **Palette exception:** The Caller's scenes may use cool grey washes (`#50505F`) instead of warm tints — the ONLY cool-shifted scenes in the system. The contrast is the storytelling: warm = your kitchen table; cool = their call floor. Screens in Caller scenes show the scam text/pop-up content (accuracy gate: real documented patterns only).
- **Body language range (replaces facial expression range):** (1) neutral at-desk posture, headset on — banal, office-ordinary; (2) leaning into the mic (pressure applied); (3) multiple identical silhouettes in rows (the "it's an industry" wide shot — the strongest image in the system, use sparingly); (4) the defeat beat: slumped back / headset half-off as the call is calmly declined (every Caller appearance ENDS with this or with the learner's calm hang-up); (5) hands-on-keyboard typing (text-scam scenes).
- **Consistency anchors:** featureless hatch silhouette · headset · desk/monitor context · cool grey scene wash · always defeated by calm, never by cleverness.
- **Do/Don't:** DO keep everything about them ordinary (office chair, coffee cup); DON'T add villain grammar — no hoodie-in-the-dark hacker cliché, no green code rain, no rats/snakes/shadow-claw metaphors, no national flags, no accents implied visually. DON'T ever show The Caller winning as a scene's end-state.
- **Flagged for Aaron (§13):** the cast doc lists the alternative — no embodied scammer at all (threats appear only as on-screen content). This brief implements the silhouette per the cast doc's proposal, but the choice remains Aaron's creatively-risky call to approve.

---

## 10. ELEANOR — "the one further along" (senior tier, 79)

**Art-direction hook:** *seventy-nine and serene — silver crown braid, cup of tea beside the tablet she runs her book club from; the proof the destination exists.*

- **Age/build:** 79 — the oldest cast member, and deliberately the most at-ease with her devices: the visual thesis is "more age, more calm." Small-framed, unhurried, settled-comfortable posture (soft armchair, garden chair).
- **Face:** finely lined (the most detailed smile-line work in the cast — earned lines, drawn beautifully, not minimized); bright amused eyes; serene resting expression with a wry corner. White hair in a soft crown braid or loose bun — elegant, self-done, distinct from Margaret's waves and June's bob (the three senior women must be unmistakable in silhouette: waves / bob / braid).
- **Wardrobe (locked):** soft shawl-collar cardigan in pale warm wash (`#FFF0E0`) over a simple top; signature accent: `#E8842C` reading-glasses chain (glasses ON the chain, worn low — deliberately contrasting Margaret's glasses-in-hair). A ring or two — a life's worth of jewellery, worn plainly.
- **Props:** tablet propped on a stand (she's set up her own ergonomics — competence detail), teacup, a paperback (book-club continuity).
- **Expression range:** (1) serene default with wry corner; (2) the twinkle — telling the "if I can, you can — and I mean that literally" beat, one brow a fraction up; (3) unhurried focus on the tablet; (4) soft laughter (closed-eyes chuckle — the warmest single expression in the system, reserved for arc-payoff moments); (5) the benediction face — calm direct gaze at camera for end-of-arc reassurance.
- **Consistency anchors:** crown braid/bun · glasses-on-chain worn low · tablet-on-stand · teacup · at-ease posture.
- **Do/Don't:** DO give her the most relaxed hands in the cast (loose, resting); DON'T render her as "cute old lady" (no twinkly-frail tropes, no shawl-over-knees invalid imagery) — she is serene, not diminished; DON'T let her braid drift into Margaret's wave shape between renders.

---

## 11. Production standards — size, crop, and reference-sheet spec

### 11.1 Master reference sheet (per character, the pinned asset)
- One 4K sheet (Nano Banana 2 at max resolution) on `#FAFAF8`, containing: full-body front · full-body 3/4 left · 3/4 right · profile · head-and-shoulders at 2x scale · the five expression beats as bust crops · a dedicated hands study (phone grip + open palm) · colour swatch strip with the character's exact wash tokens.
- Character height normalized: adults/seniors drawn to a common scale bar; Marcus ~95% of adult height, Sophie ~60% — the scale bar appears on every sheet so relative heights never drift in multi-character scenes.

### 11.2 Working crops (what videos actually use)
- **A — Guide frame (Margaret):** waist-up, centred or right-third, facing camera or 3/4; eye-line at upper-third line. The standard teaching composition.
- **B — Scenario two-shot:** two characters seated side by side (Walter+Marcus, Margaret+Walter, David+Margaret), knees-up crop.
- **C — Reaction insert:** head-and-shoulders bust, used for the worry→reassured beats; this is the crop where expression fidelity matters most — render beats from the sheet, do not improvise new expressions.
- **D — Phone-POV:** character's hands + device only (hands study is the reference).
- **E — Story-arc wide:** full-body in simple etched environment; environments stay sparse (a table, a window, a counter — 3–5 scene props max, same three-weight linework).
- Safe margins: keep faces inside the central 80% for every crop (caption band lives in the lower 15% — faces never overlap the caption zone).

### 11.3 Character Animator rig-prep layer list (per approved character)
Separated layers from the master art: head group (brows L/R, eyes L/R with pupils, lids, mouth viseme set, glasses as detachable layer where applicable) · torso · arm L/R with hand swaps (open palm / phone grip / point-with-pen) · signature-gesture layers (Margaret: glasses up/down; Walter: phone-at-distance arm; Sophie: hover-finger). Mouth viseme set drawn ONCE in house style (10 shapes) and reused as the template across the whole cast — identical viseme grammar is itself a family-consistency anchor and serves EN and fr-CA audio alike.

### 11.4 QA checklist per generated batch (pass/fail)
1. Three-weight line hierarchy present? 2. Ink is `#1A1A2E` on warm paper? 3. Character's locked anchors all present? 4. Hands correct? 5. Expression matches a sheet beat (not an invented one)? 6. No real-person/IP resemblance? 7. No banned imagery (per character Don'ts)? 8. Age tier reads correctly at thumbnail size? Any fail = regenerate; two anchor fails = off-model, do not patch, re-seed from master.

---

## 12. Consistency governance (anti-drift, mirrors the voice-track rules)

- **Version-pin the masters:** approved sheets live in-repo under a dated path; every subsequent generation seeds from the pinned image + this file's text. Never text-only generation of an existing character.
- **Drift check before any batch:** regenerate one canonical test image (Margaret, crop A, beat 1) and compare against the pinned master by eye before rendering a batch — the visual twin of the voice reference-read check.
- **Change control:** any change to a locked anchor (hair shape, signature garment, glasses behaviour) is a RECAST-level decision — Aaron approves, this file is updated with a dated changelog line, old masters are archived not deleted.
- **One style, two lanes:** Character Animator puppets (Lane 1) and Flow/Veo Ingredients renders (Lane 2) both seed from the SAME masters. If a Lane-2 generative render drifts (the known "goblin" risk), it fails QA §11.4 like any other asset.

---

## 13. Open taste decisions for Aaron (DESIGN GATE — flagged, not decided)

1. **Margaret's sheet is the calibration approval** — the whole family look (etched warmth level, hatch density, wash saturation) is judged on her first sheet before any other character is generated. Recommend generating 3 style-intensity variants of her (lighter-etched / baseline / denser-etched) for the taste call.
2. **The Caller: embodied silhouette vs. no embodiment at all** (screens-only threats). This brief builds the silhouette treatment; the alternative remains open per the cast doc. The riskiest creative call in the system — Aaron's call.
3. **Signature orange accents** (one small `#E8842C` item per character, §1.3): keeps the palette tied to the product but could read gimmicky if too uniform. Approve, thin out, or drop.
4. **Small feature calls:** Margaret's enamel pin (yes/no) · Walter's moustache (yes/no) · David's stubble vs clean-shaven · Sophie's freckles (yes/no). Cheap to decide at Margaret-sheet time.
5. **Cool-grey scene wash for Caller scenes** (§9) — a deliberate palette exception; confirm it doesn't fight the DESIGN-SYSTEM feel.
6. **Environment style depth** (§11.2 E): how sparse story-arc backgrounds should be — recommend deciding after seeing pilot-01 stills.
7. Per the cast doc's own open item: the roster, names, and family map themselves are still awaiting Aaron's approval — these briefs assume the proposed 8+1 cast and inherit that pending decision.

---

*Changelog: 2026-07-18 — initial full draft (Fable creative sprint). DESIGN GATE pending.*
