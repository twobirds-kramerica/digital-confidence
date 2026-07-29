# DCC Monoline Figure System — Illustration Guideline

**Status:** v1, 2026-07-28. INFORM ONLY — no product files were changed to produce this.
**Supersedes / expands:** Notion `S-DCC-ILLUSTRATION-SYSTEM-001` (page `3aba09cf-876a-81fe-bace-f33adc6e6e42`). That sprint should execute against this document.
**Author's scope:** the static line-drawn figures rendered as inline/sprite SVG on DCC web surfaces.
**Explicitly NOT in scope:** `C:\twobirds\digital-confidence\_feedback\dcc-character-cast-architecture.md` (Margaret + the 8-person story cast). That is a *video/scenario* system with named, identifiable people. See §9 for the hard separation rule.

---

## 0. TL;DR — the decisions this document locks

| Question | Locked answer |
|---|---|
| What is this style called? | **Monoline spot illustration** — specifically a *monoline single-figure spot illustration system* (§1) |
| Should there be a pre-built library? | **Yes.** One sprite of record: `assets/illustrations/dcc-figures.svg` (§7) |
| Master canvas | `viewBox="0 0 240 220"`, live area 200×180, centre axis x=126 (§4.1) |
| Stroke | Monoline, `currentColor`, weight varies **by size tier**, never within a figure (§4.2) |
| Colour | One colour (`--color-primary`) + at most one accent group on non-human detail. Never fill. (§4.4) |
| Minimum render size | **96px wide.** Below that, use an icon, not a figure. (§4.2) |
| Accessibility | Every figure is `aria-hidden="true"`, always. If it carries unique meaning, the copy is wrong. (§6) |
| Minimum viable pose set | **8 core poses + 2 second-tier** (§5) |
| Per-page budget | Max 1 figure per viewport, max 3 per page (§3.2) |
| Is this the thing `impeccable` bans? | **No — and here is the line** (§2) |

---

## 1. What this style is actually called

Three terms stack, and they answer different questions. Use all three when specifying work.

**1. Technique — "monoline."** Line art drawn at a *uniform, unvarying stroke width* throughout, as opposed to variable/tapered line art. This is the precise professional term for what DCC's hero figure already is: every path in it is `stroke-width="3"`, no tapering, no fills. Monoline is the most common variant of line-art styles and is prized for scaling cleanly and staying legible when resized ([Toons Mag — Monoline vs. Variable Line Art](https://www.toonsmag.com/exploring-monoline-vs-variable-line-art/); [Design Encyclopedia — Monoline Methods](https://design-encyclopedia.com/?T=Monoline+Methods)).

**2. Format/role — "spot illustration."** A spot is a small, standalone piece of art that accents a larger body of content, usually with no background, isolating a single figure or object. Spots are a *usage* category, not a style: they mark, punctuate, or open content rather than carrying it ([Aeolidia — Illustration Types](https://aeolidia.com/illustration-types/); [Humanities LibreTexts — Intro to Spot Illustrations](https://human.libretexts.org/Bookshelves/Art/Illustration:_An_Introductory_Course_(Boehman)/02:_Narrative_Illustrations/2.03:_An_Introduction_to_Spot_Illustrations)). Everything DCC has built so far is a spot.

**3. Governance — "illustration system."** A style becomes a system when it has measurable rules and reusable components so multiple creators produce consistent work at scale: defined scope (icons / spots / scenes / characters), documented proportions, a stroke base weight tied to the grid with multipliers for small and large artwork, a system sheet with do/don't examples, a component library, and a review process ([RMCAD — Building an Illustration System](https://www.rmcad.edu/blog/building-an-illustration-system-shapes-strokes-and-scale-rules/)).

**Use this name in commits, ADRs and briefs: the DCC Monoline Figure System.**

Right now DCC has a monoline spot *style* and no *system* — which is exactly why the beta wizard's figure was redrawn freehand on 2026-07-27 instead of pulled from a library, and why its head-to-body ratio and mouth clearance don't match the hero's (§4.1 documents the drift).

---

## 2. The `impeccable` tension, resolved explicitly

`C:\twobirds\two-birds-portfolio\.claude\skills\impeccable\SKILL.md` line 106 bans:

> **Hand-drawn / sketchy SVG illustrations.** Class names like `loose-sketch`, `*-sketch`, `doodle`, `wavy`; `feTurbulence` / `feDisplacementMap` "paper grain" filters; 5-to-30 path crude scenes meant to depict a tangible subject (an otter, a table-and-fork, an album cover). All of these read as amateurish, not whimsical. If you can't render the scene with real assets, ship no illustration. Don't attempt sketchy SVG as a fallback.

**This ban does not forbid DCC's figures. Read what it is actually targeting: ad-hoc, unsystematised, freehand scene-drawing used as a fallback because no real asset existed.** Three named tells — fake-texture filters, "sketch/doodle/wavy" naming, and one-off crude *scenes* of tangible subjects. The failure mode is *improvisation*, not *line art*.

**The line, stated for the record:**

| Banned (what impeccable is describing) | Permitted (what this system is) |
|---|---|
| `feTurbulence` / `feDisplacementMap` "paper grain", wobble, jitter | No filters of any kind. Geometrically clean Bézier paths. |
| Class names `loose-sketch`, `doodle`, `wavy` | `illus`, `illus-hero`, `illus-panel`, `fig-*` |
| Redrawn freehand each time it's needed | Pulled from a sprite of record with a fixed rig |
| Arbitrary proportions per instance | Locked canvas, centre axis, head-to-body ratio, clearance minimums |
| A *scene* of assorted objects standing in for a photo | A *single figure* with a budgeted prop count |
| No review step | A pre-ship checklist (§10) and a system sheet page |
| Used as a fallback for an asset that couldn't be made | Used deliberately because a photo would be *worse* here (§3.1) |

**Two corrective actions this analysis produces:**

- **A2-1.** The inline comment at `C:\twobirds\digital-confidence\index.html` line ~83 reads `Warm hand-drawn-style illustration`. Change to `Monoline figure, DCC illustration system`. The current wording literally describes the banned thing and will get a future agent to "fix" it by deleting it.
- **A2-2. The hero is currently drifting toward the ban.** It is a figure **plus a mug, plus steam, plus a plant, plus a tablet** — four props across two spatial planes. That is a *scene*, and scene-assembly out of monoline parts is precisely where this style stops reading as deliberate and starts reading as improvised. Reduce the hero to **figure + tablet**, or **figure + mug**. Not both, and drop the plant. See the prop budget in §4.5.

---

## 3. When a figure earns its place

### 3.1 The gate
Atlassian's illustration foundation is the cleanest statement of the rule and it applies verbatim here: *decide first if it is necessary; visuals in product should support the goal and context for the user, rather than being purely decorative*; and *don't replace copy with illustrations* ([Atlassian Design — Illustrations](https://atlassian.design/foundations/illustrations)). GitLab's Pajamas adds the reusability principle: rather than commissioning a unique illustration per scenario, one illustration should serve multiple contexts, because *the visual impression is supported more fully by the content and context* ([GitLab Pajamas — Illustration](https://design.gitlab.com/product-foundations/illustration/)).

**A DCC figure earns its place when at least one is true:**
- It occupies structurally empty space beside a short copy block (hero, wizard step, panel).
- It marks a **state**: empty, success, completion, error, or reassurance.
- It opens a section that would otherwise be an unbroken text list.
- It carries emotional temperature the copy deliberately understates — this is DCC's real use case. The audience is anxious; a calm, non-clinical human silhouette does work that a paragraph cannot.

**It does not earn its place when:**
- It sits *between prose paragraphs* inside a lesson body. Violates the brand kit's "one idea per screen" and interrupts reading for an audience reading slowly on purpose.
- Another figure is already visible in the same viewport.
- It is above the fold on mobile competing with the primary CTA (see §6.2 — hide it).
- It is standing in for copy that should have been written.
- It is decorating a page that is already visually busy.

### 3.2 Budget
- **Max 1 figure per viewport.**
- **Max 3 figures per page.**
- Module pages: **at most 1**, and only at the top or the completion state — never mid-lesson.

---

## 4. Style parameters (the rig)

These are the numbers a future execution pass should implement without re-deciding.

### 4.1 Canvas and rig

Master canvas: **`viewBox="0 0 240 220"`**, live area 200×180 (20 units padding all sides).

| Landmark | Value (user units) |
|---|---|
| Vertical centre axis | x = **126** |
| Head top | y = **40** |
| Chin (lowest point of head outline) | y = **92** |
| Head height | **52** |
| Head width (max) | **46** |
| Eye line | y = **60** |
| Eye centres | x = **114** and **138** (24 apart) |
| Eye radius | **6.5** |
| Nose/bridge mark | y = 60, 5 units wide, centred |
| Mouth arc — lowest point | y ≤ **80** |
| Mouth arc — max width | **28** |
| Shoulder crown (top of torso arc) | y = **118** |
| Torso baseline (bottom of frame) | y = **172** |
| Torso width at baseline | **96** (x 78 → 174) |

**Head-to-body ratio: 52 : 132 ≈ 1 : 2.5.** Deliberately adult, not chibi. Anything approaching 1:2 reads as a children's character and breaks the "nobody is ever the fool" rule in the brand kit.

**Documented drift to fix:** the two existing figures do not share a rig.
- `index.html` hero: head ≈ 48 tall (y20→68), figure to y168 → ratio ≈ **1 : 3.1**
- `js/beta.js` wizard: head ≈ 70 tall (y18→88), figure to y168 → ratio ≈ **1 : 2.1**

The wizard's head is ~45% larger relative to body than the hero's. Side by side they are not the same character system. Both should be re-cut against the rig above.

**THE CLEARANCE RULE (this is the smile-collision bug, generalised):**
> **Every interior feature must maintain ≥ 8 user units of clear space from the head outline path and from every other interior feature.**

The wizard's mouth (`M106 76 q20 14 40 0` — sagging to ≈ y90) sits within ~2 units of the head outline's lowest point. That is the collision Aaron caught on 2026-07-27. With chin at y=92 and the mouth floor capped at y≤80, the rule holds automatically. Check it by eye at 96px, not at 400px — collisions that are visible at hero scale become mush at spot scale.

### 4.2 Stroke — monoline, tiered by render size

Monoline means **one weight per figure, never mixed within a figure.** Mixing 2px and 1.5px strokes destroys cohesion instantly ([RMCAD](https://www.rmcad.edu/blog/building-an-illustration-system-shapes-strokes-and-scale-rules/)).

But the *same* user-unit weight thins optically as the figure shrinks. The system convention is a base weight tied to the grid plus multipliers for small and large artwork. Target effective stroke: **2.2–3.4 CSS px at every tier.**

| Tier | Render width | `stroke-width` (units) | Effective CSS px | Where |
|---|---|---|---|---|
| **Hero** | 200–280px | **3** | 2.5–3.5 | index hero, landing pages |
| **Panel** | 140–199px | **4** | 2.3–3.4 | wizard steps, modals, empty/success states |
| **Spot** | 96–139px | **5.5** | 2.2–3.2 | section openers, banners, card headers |
| **Micro** | < 96px | — | — | **Do not use a figure. Use an icon.** |

**The 96px floor is hard.** At 96px, an eye at r=6.5 renders 2.6px across; below that the glasses collapse into dots and the figure reads as a smudge. GitLab's equivalent floor is a 36×36 "extra small" that is explicitly *a component fragment*, not a whole figure — the same logic.

Fixed for all tiers: `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`. Round caps are load-bearing — they are what makes the line read as warm rather than technical, and they cost nothing.

### 4.3 Corner and curve language
- No sharp corners on anything touching the person. Minimum radius on prop rectangles: **6 units** (the existing tablet `rx="6"` is correct — keep it).
- No straight vertical lines longer than 40 units. The torso arc must remain an arc.
- No path with more than **6** control points. If a form needs more, it is too detailed for this system.

### 4.4 Colour
- **One colour.** Every stroke is `stroke="currentColor"`; the wrapper sets `color: var(--color-primary)` (already implemented at `css/core.css:495`). This is what makes the figures theme-aware for free — light, dark, and high-contrast token variants all inherit ([Maya Shavin — currentColor for SVG icons](https://mayashavin.com/articles/svg-icons-currentcolor)).
- **At most one accent group** per figure, using `.illus-accent` → `var(--color-accent)` (already at `core.css:497`). Brand kit rule: *one accent per surface.*
- **The accent may never be applied to the person.** Only to secondary non-anatomical detail — steam, a sparkle, a signal arc. A burnt-orange face is a defect.
- **Never `fill`.** Not even white. A fill breaks dark mode and breaks the monoline read.
- Never a gradient, shadow, or opacity below 1.

### 4.5 Props — budget and semantics

| Tier | Prop budget |
|---|---|
| Hero | **2 max** |
| Panel | **1 max** |
| Spot | **0** — figure only |

**Props must be earned by the adjacent copy, per pose.** A tablet belongs on a "using the product" beat. It does **not** belong on a "welcome, hello" beat — which is why the wizard variant correctly dropped it. Conversely a mug and a plant belong on *no* beat DCC currently has; they are set dressing, and set dressing is what turns a spot into the banned scene (§2, A2-2).

Approved prop vocabulary (draw once, reuse): tablet/phone rectangle, envelope, shield, padlock, card, video-call frame, question mark, checkmark, mug, power button. Anything outside this list needs a new entry and a checklist pass.

### 4.6 Identity neutrality — a flag worth acting on

Both existing figures carry **glasses + a cardigan shoulder line**, which reads as a specific older adult. The brand kit says the audience is *"anyone with low confidence in technology, **not defined by age**"* and *"don't lead with 65+ as the definition of who this is for."* The illustration is currently contradicting the positioning.

**Recommendation:** neutralise the base rig — plain shoulder line, no cardigan V, glasses **optional per pose** rather than default. Vary across the pose set so the library as a whole doesn't code one demographic. Open Peeps and Humaaans both solve this the same way: swappable modular components rather than one fixed person, precisely so a set reads as *people* not *a person* ([Open Peeps](https://www.openpeeps.com/)).

**Hard rule regardless:** the figure has **no** ethnic, national, or gender coding. No hair styling that codes gender, no skin-tone anything (there are no fills), no cultural dress. This is a silhouette-level human, deliberately.

---

## 5. The pose library

**Minimum viable set: 8 core poses.** Sized against DCC's actual content categories (`Protect your money`, `Everyday confidence`, the 29 modules, and the beta wizard), these 8 cover every current surface without a bespoke drawing.

| # | ID | Pose | Props | Covers |
|---|---|---|---|---|
| 1 | `fig-greeting` | One arm raised, open palm, wave | none | Beta wizard step 1, welcome states, first-visit banners |
| 2 | `fig-using-device` | Both hands holding a rectangle at chest height | tablet | index hero, "Everyday confidence", any product-use beat |
| 3 | `fig-guarding` | One palm raised outward, calm not alarmed | shield **or** envelope with an X | "Protect your money", module-2 scams, module-27 inbox, scam-defence-helper |
| 4 | `fig-securing` | One hand toward a padlock/card glyph | padlock or card | module-6 banking, module-3 passwords |
| 5 | `fig-connecting` | Facing a framed rectangle containing a small second head | video-call frame | module-8 video calls, module-15 telehealth |
| 6 | `fig-considering` | Hand near chin, head tilted ~5° | question mark | module-9 / module-ai-literacy / module-fact-check / module-30 — the "is this true?" cluster |
| 7 | `fig-celebrating` | Both hands raised, relaxed | 2 accent sparkles | Module complete, quiz pass, success states |
| 8 | `fig-resting` | Seated/settled, shoulders low | mug | module-1 Escape Hatch, reassurance blocks, "you can stop any time" |

**Second tier (build when a surface actually needs them, not before):**

| # | ID | Pose | Covers |
|---|---|---|---|
| 9 | `fig-helper-pair` | Two figures, one gesturing toward a device the other holds | Family/caregiver pages, library-partner surfaces |
| 10 | `fig-paused` | One finger toward a power-button circle | Escape Hatch specifically, "turn it off, nothing breaks" |

**Why 8 and not 20.** GitLab's system is built from small reusable components recombined, not from a long catalogue of finished pictures — that is what keeps a small team's set consistent. Eight poses × the approved prop vocabulary already generates every combination DCC needs. **Rule: before drawing pose 11, prove that no combination of 1–10 plus an approved prop covers the beat.**

**Head, torso and prop geometry are shared across all poses.** Only arms and the prop change. That is the rig's whole point: a new pose is an arm edit, not a redraw. This is directly the fix for what happened on 2026-07-27.

---

## 6. Responsive and accessibility treatment

### 6.1 Accessibility — one rule, no exceptions

> **Every DCC figure is decorative. It ships `aria-hidden="true"` and `focusable="false"`, always.**

Rationale: DCC's audience includes screen-reader users and the brand kit targets WCAG 2.2 AA with AAA body contrast. A figure that carries information not present in adjacent copy is a *copy defect*, not an illustration opportunity — Atlassian's "don't replace copy with illustrations" applies with extra force to an anxious, low-confidence audience. So the figure never needs alt text, because it never says anything the sentence beside it doesn't.

Implementation (matching what `index.html` already does correctly):
```html
<div class="illus illus-panel" aria-hidden="true">
  <svg viewBox="0 0 240 220" role="presentation" focusable="false" aria-hidden="true"> … </svg>
</div>
```
Belt and braces on both wrapper and `<svg>`: with sprite `<use>` references, screen readers often skip `<title>` inside a `<symbol>` entirely, so never rely on one ([CSS-Tricks — Accessible SVG Icons With Inline Sprites](https://css-tricks.com/accessible-svg-icons-with-inline-sprites/)).

Also required:
- **Contrast:** stroke inherits `--color-primary`. Verify against `--color-background` **and** `--color-surface` in all three token variants (light, dark, high-contrast). A 2.4px line needs ≥ 3:1 as a graphical object under WCAG 2.2 SC 1.4.11.
- **Dark mode first**, per the brand kit — test dark before light on every new pose.
- **Motion: none.** These figures never animate, in any state, on any surface. Brand kit mandates minimal motion for vestibular safety and this is where an "adds delight" instinct would break it. No `prefers-reduced-motion` variant is needed because there is no motion to reduce.
- **Print:** `display: none` in `css/print.css`. Line art at 14pt-minimum print settings costs ink and adds nothing.

### 6.2 Breakpoints

| Viewport | Hero figure | Panel figure | Spot figure |
|---|---|---|---|
| ≥ 1024px | 260px (Hero tier) | 180px | 120px |
| 768–1023px | 200px (Hero tier) | 160px | 120px |
| 560–767px | 160px → **drop to Panel tier** (stroke 4) | 140px | 110px |
| < 560px | **`display: none`** | 140px, stacked above copy | 96px |

**Two rules that matter more than the table:**

1. **Never shrink below a tier's floor — change tier instead.** Rendering a `stroke-width="3"` figure at 100px gives a 1.25px line that disappears on a low-contrast phone screen in daylight, which is a large fraction of this audience. Swap to the heavier symbol.
2. **The hero figure is hidden below 560px** because it pushes the primary CTA below the fold, and on this product the CTA is the entire point. This is legitimate *only* because the figure is decorative (§6.1). A meaningful graphic could never be hidden this way — which is another reason the "always decorative" rule is load-bearing rather than lazy.

Existing CSS already sets `.illus svg { max-width: 100%; height: auto; }` — keep it as the safety net, but sizes should be explicit per tier, not fluid, so stroke stays in its target range.

---

## 7. How to build it as a library (static-only)

Non-negotiable rule 1 applies: static HTML/CSS/JS, no npm, no build step. That rules out an SVG-sprite build pipeline and rules in a hand-maintained sprite.

### 7.1 Recommended: one sprite of record

Create **`C:\twobirds\digital-confidence\assets\illustrations\dcc-figures.svg`**:

```svg
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <style>
    g.fig { fill: none; stroke: currentColor;
            stroke-width: var(--illus-stroke, 3);
            stroke-linecap: round; stroke-linejoin: round; }
    g.fig-accent { stroke: var(--color-accent); }
  </style>
  <symbol id="fig-greeting" viewBox="0 0 240 220">
    <g class="fig"> <!-- head, torso, waving arm --> </g>
  </symbol>
  <symbol id="fig-using-device" viewBox="0 0 240 220"> … </symbol>
  <!-- …one symbol per pose… -->
</svg>
```

Consumed as:

```html
<svg class="illus illus-panel" aria-hidden="true" focusable="false" viewBox="0 0 240 220">
  <use href="../assets/illustrations/dcc-figures.svg#fig-greeting"></use>
</svg>
```

```css
.illus-hero  { width: 260px; --illus-stroke: 3;   }
.illus-panel { width: 180px; --illus-stroke: 4;   }
.illus-spot  { width: 120px; --illus-stroke: 5.5; }
```

**Why this shape specifically:**
- `currentColor` is computed at render time relative to the `<use>` element, not the symbol definition — so it crosses the shadow boundary and the figures stay theme-aware through the sprite. Supported in every modern browser.
- Ordinary CSS selectors **do not** penetrate a `<use>` reference. `currentColor` and **CSS custom properties** are the two things that do. That is why `--illus-stroke` is a custom property set on the host element and read inside the sprite's own `<style>` — it is the only way to get per-tier stroke weight from one set of symbols without duplicating every pose three times.
- Same-origin only. Fine here (relative path, same GitHub Pages project site), but note it: an external `<use>` sprite silently fails to render cross-origin without CORS headers.

**Verify `--illus-stroke` inheritance through `<use>` in Chrome, Firefox and Safari before committing to it.** If any target browser fails, the fallback is three symbol sets (`fig-greeting-hero` / `-panel` / `-spot`) with baked-in `stroke-width`. Uglier, zero risk. Decide this with a real browser test, not from memory.

### 7.2 Three deployment gotchas specific to this repo

1. **GitHub Pages project site.** `href="/assets/illustrations/dcc-figures.svg#fig-greeting"` will 404 in production. Use relative paths (`../assets/...` from `modules/`, `assets/...` from root).
2. **Service worker.** DCC's SW caches assets. Adding `dcc-figures.svg` requires adding it to the precache list **and bumping `CACHE_NAME`**, or existing visitors get an empty box where the figure should be. Verify on a fresh browser profile.
3. **JS-injected surfaces (`js/beta.js`).** The wizard builds its DOM in JS and may render before an external sprite resolves. **Inline SVG is permitted there** — but the markup must be copied **verbatim from the sprite source**, with a comment naming the symbol it mirrors (`/* mirrors dcc-figures.svg#fig-greeting — keep in sync */`). The sprite remains canonical. This is the one sanctioned exception.

### 7.3 The system sheet (do not skip this)

Build **`C:\twobirds\digital-confidence\styleguide\illustrations.html`**: every pose, at all three tiers, in light/dark/high-contrast, with a do/don't column. Every mature illustration system ships one — a system sheet plus do/don't examples plus a review process is what makes a *style* into a *system*. Without it, the next agent redraws instead of reusing, which is the exact failure this document exists to prevent.

---

## 8. Prior art worth copying (and what each does well)

| System | What it does that DCC should copy |
|---|---|
| [**GitLab Pajamas**](https://design.gitlab.com/product-foundations/illustration/) | The closest match to DCC's needs. Four fixed sizes (288 / 144 / 72 / 36px) tied to purpose — feature promo, empty+error state, banner, component fragment. One illustration serves many contexts rather than one-per-scenario. Built from reusable small components that combine into larger compositions. Rendered from a **sprite sheet** with automatic sizing and colour-mode adaptation. This is essentially §4.2 + §5 + §7 already proven in production. |
| [**Atlassian Design System**](https://atlassian.design/foundations/illustrations) | The *governance* half: decide whether it's necessary before choosing one; categories by role (spot / low-fidelity UI / ambient pattern); explicit "don't use purely decorative illustration in product", "don't overcrowd", "don't replace copy". Adopt these as gate questions (§3.1). |
| [**Open Peeps**](https://www.openpeeps.com/) (Pablo Stanley, CC0) | Modular mix-and-match: heads, arms, torsos, expressions as swappable parts, 500k+ combinations from a small set of components. Proves the "new pose = arm edit, not redraw" model at scale, and the identity-neutrality-through-variety approach (§4.6). Also a legitimate CC0 fallback if hand-drawing the 8 poses stalls — though house-drawn on DCC's own rig is better for brand ownership. |
| **Humaaans** (same author) | The cleaner geometric counterpart to Open Peeps; same modular philosophy, flat rather than monoline. Useful as a proportions reference. |
| [**Red Hat brand standards — Illustration**](https://www.redhat.com/en/about/brand/standards/illustration) | Enterprise-scale example of a documented illustration standard sitting inside a brand system rather than beside it. |

**One honest caveat on sources:** RMCAD, Atlassian and GitLab all decline to publish a universal numeric stroke weight, because it is correctly a function of grid and output size. The specific numbers in §4.1 and §4.2 are **derived from DCC's existing 240-unit coordinate space and its 3-unit stroke**, chosen to hold effective stroke in the 2.2–3.4 CSS px band across DCC's actual render sizes. They are engineered for this product, not quoted from a source. Treat them as a locked house standard, not an industry constant.

---

## 9. Hard separation from the character cast

`_feedback\dcc-character-cast-architecture.md` defines **Margaret** (71, retired teacher, Moncton NB) plus a story cast of 8 for **video and scenario content**. It is DRAFT and has no DESIGN GATE clearance.

**These are two different systems and must never merge:**

| | Monoline Figure System (this doc) | Character Cast (that doc) |
|---|---|---|
| Medium | Static SVG on web pages | Video / scenario content |
| Identity | **Anonymous. Unnamed. Never captioned as a person.** | Named, biographied, consistent individuals |
| Purpose | Punctuate and warm the interface | Teach and dramatise |
| Status | Ready to build against this spec | DRAFT, needs Aaron's DESIGN GATE sign-off |

**Rules:**
- A monoline figure is **never** given a name, a nameplate, or a caption identifying it as a person. It is never "Margaret."
- If a surface genuinely needs a named, identifiable person, that surface needs the cast system and its DESIGN GATE approval — not a relabelled monoline figure.
- The brand kit's "etched illustration style, dignified, emotive" line (under **Characters**) currently reads as if it governs both. It governs the *cast*. The brand kit should gain a separate **Illustration** section pointing at this document — filed below as A9-1.

---

## 10. The character checklist

**Run every item before shipping any new or edited pose. All 14 must pass.**

**Geometry**
- [ ] 1. Canvas is `viewBox="0 0 240 220"`; nothing crosses the 20-unit padding into the outer frame.
- [ ] 2. Head top y=40, chin y=92, shoulder crown y=118, baseline y=172, centre axis x=126 — all within ±2 units of the rig.
- [ ] 3. Head-to-body ratio between **1:2.4 and 1:2.6**.
- [ ] 4. **Clearance:** every interior feature ≥ 8 units from the head outline and from every other feature. Mouth floor y ≤ 80.
- [ ] 5. No path exceeds 6 control points; no straight vertical run over 40 units; prop corner radii ≥ 6.

**Style**
- [ ] 6. Exactly one stroke weight in the whole figure, matching its tier (3 / 4 / 5.5).
- [ ] 7. `fill="none"` everywhere. `stroke-linecap`/`stroke-linejoin` = `round`. No filters, gradients, shadows, or opacity < 1.
- [ ] 8. Stroke is `currentColor`. At most one `.illus-accent` group, and it touches no part of the person.
- [ ] 9. Prop count within the tier budget (Hero 2 / Panel 1 / Spot 0), and every prop is semantically earned by the adjacent copy.
- [ ] 10. Reads as an unspecified adult — no ethnic, national, or gender coding; glasses/cardigan not defaulted on (§4.6).

**Context**
- [ ] 11. **Size-in-context:** rendered at its actual deployed size in a real page — not zoomed — and still legible. Checked at 96px if it will ever appear at Spot tier.
- [ ] 12. **Theme + contrast:** verified in dark mode **first**, then light, then high-contrast; stroke ≥ 3:1 against both `--color-background` and `--color-surface`.
- [ ] 13. **Accessibility:** `aria-hidden="true"` + `focusable="false"` present; nothing in the figure communicates information absent from the adjacent copy; no animation.
- [ ] 14. **Consistency:** placed side by side with `fig-greeting` and `fig-using-device` at the same size — does it read as the same character system? If a stranger would say "these are by different hands," it fails.

---

## 11. Filed follow-ups for the execution sprint

| ID | Action | Status |
|---|---|---|
| A2-1 | Change the `index.html` illustration comment from "hand-drawn-style" to "Monoline figure, DCC illustration system." | Open — hero comment still reads "Warm hand-drawn-style illustration" as of 2026-07-29. |
| A2-2 | Reduce the hero from 4 props to 1 (drop plant + mug + steam, keep tablet). It is currently a scene. | Open — hero still has all 4 props as of 2026-07-29. |
| A4-1 | Re-cut both existing figures against the §4.1 rig — the wizard head is ~45% oversized relative to the hero. | **Wizard done** (2026-07-28, `js/beta.js` rebuilt against the rig). **Hero still open** — index.html's hero SVG has not been re-cut. |
| A4-2 | Fix the wizard mouth against the clearance rule (mouth floor y ≤ 80). | **Done** 2026-07-28 (`js/beta.js`, mouth floor y=74-80). |
| A4-3 | Decide on identity neutralisation (§4.6): neutral shoulder line, glasses optional per pose. **This one is Aaron's taste call, not an autonomous one.** | Open — no autonomous action taken, per this doc's own instruction. |
| A7-1 | Build `assets/illustrations/dcc-figures.svg` with the 8 core poses; verify `--illus-stroke` inherits through `<use>` in all three browsers before locking §7.1. | **Partial** — 2 of 8 core poses built (fig-greeting, fig-guarding, 2026-07-29). `--illus-stroke` inheritance through `<use>` confirmed working in Chromium (S-DCC-ILLUSTRATION-CASCADE-001); found and fixed a real bug in the process — every XML comment in the sprite had an illegal mid-comment "--" that silently broke cross-document `<use>` entirely, so no pose was actually consumable this way until the fix. Firefox/Safari still unverified. 6 core + 2 second-tier poses remain. |
| A7-2 | Add the sprite to the service-worker precache list and bump `CACHE_NAME`. | Not applicable — the v2 root `sw.js` is a kill-switch with no precache list (confirmed 2026-07-29); this only matters if that changes. |
| A7-3 | Build `styleguide/illustrations.html` as the system sheet. | Open. |
| A9-1 | Add an **Illustration** section to `C:\twobirds\two-birds-portfolio\hal-stack\brand\guidelines\dcc-adult.md` pointing here, and clarify that the existing **Characters** section governs the video cast only. | **Done** 2026-07-29. |

---

## Sources

- [Toons Mag — Exploring Monoline vs. Variable Line Art](https://www.toonsmag.com/exploring-monoline-vs-variable-line-art/)
- [Design Encyclopedia — Monoline Methods](https://design-encyclopedia.com/?T=Monoline+Methods)
- [Aeolidia — Illustration Types: What is a Spot Illustration?](https://aeolidia.com/illustration-types/)
- [Humanities LibreTexts — An Introduction to Spot Illustrations](https://human.libretexts.org/Bookshelves/Art/Illustration:_An_Introductory_Course_(Boehman)/02:_Narrative_Illustrations/2.03:_An_Introduction_to_Spot_Illustrations)
- [RMCAD — Building an Illustration System: Shapes, Strokes, and Scale Rules](https://www.rmcad.edu/blog/building-an-illustration-system-shapes-strokes-and-scale-rules/)
- [Atlassian Design System — Illustrations](https://atlassian.design/foundations/illustrations)
- [GitLab Pajamas Design System — Illustration](https://design.gitlab.com/product-foundations/illustration/)
- [Red Hat brand standards — Illustration](https://www.redhat.com/en/about/brand/standards/illustration)
- [Open Peeps (Pablo Stanley, CC0)](https://www.openpeeps.com/)
- [Dribbble Design Blog — Illustration Systems 101](https://dribbble.com/stories/2020/05/06/illustration-systems-adam-ho)
- [CSS-Tricks — Accessible SVG Icons With Inline Sprites](https://css-tricks.com/accessible-svg-icons-with-inline-sprites/)
- [Maya Shavin — Color for SVG icons and elements with currentColor](https://mayashavin.com/articles/svg-icons-currentcolor)
- [Vadim Makeev — SVG sprites: old-school, modern, unknown, and forgotten](https://pepelsbey.dev/articles/svg-sprites/)
- [CSS-Tricks — SVG `use` with External Reference, Take 2](https://css-tricks.com/svg-use-with-external-reference-take-2/)
