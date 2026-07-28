# Beta Welcome Wizard — DESIGN SPEC (for Opus implementation)

**Status:** design spec, INFORM ONLY. Nothing in this document has been implemented.
**Author pass:** Fable, 2026-07-28. **Implementer:** Opus (separate pass).
**Full path of this file:** `C:\twobirds\digital-confidence\_feedback\poc\renders\beta-welcome-wizard-SPEC-2026-07-28.md`

**Trigger:** Aaron viewed the DCC Adult beta site live and rejected the inline welcome video:
"it looks terrible... really plain, really bad... it makes it look like it's part of the product,
which is terrifying... it looks slapped in." The video content is approved. Its **presentation** is
what is being replaced.

> **SCOPE EXPANDED after §1–§15 were written.** Three further asks arrived from Aaron the same
> night: a research-grounded trust/authority treatment (oversized opening watermark on the video,
> and the same lens applied to the wizard), a redesign of the confusing "remember me" email box,
> a fix to the confidence-rating quiz, a DCC logo in the site header, a Canadian trust badge, and
> the read-aloud voice quality. **Sections §16–§29 carry all of that, and they AMEND parts of
> §1–§15.** Read §16 first: it lists every amendment. Where a later section disagrees with an
> earlier one, the later section wins.
>
> **Start here for the build:** §29 is the sequenced build order with cut-lines.
>
> Aaron is asleep with an 8-hour window and granted full autonomy to make judgment calls. Every
> call in this document is made and reasoned. **There are exactly two genuine two-way forks
> flagged for him, both pre-built and reversible in one line** (§18.5 Feathers Model exception,
> §22.4 rating-scale instrument change). Nothing blocks the build.
>
> **Four filed rules are knowingly deviated from, each with reasoning and a recorded exception:**
> PRODUCT.md's floating-overlay anti-reference (§1), the Feathers Model chevron rule (§18.5), the
> DCC brand kit's logo no-recolour rule (§26.4), and Aaron's "pulsing" request against the
> nothing-loops motion rule (§27.1, resolved as a one-time entrance). Nothing else in this build
> departs from a filed decision.

---

## 0. TL;DR for the implementer

| | |
|---|---|
| **Remove** | The `buildVideo()` call inside `renderBanner()` in `C:\twobirds\digital-confidence\js\beta.js` (line 213). The video leaves normal document flow. |
| **Keep** | `buildVideo()` itself. It becomes the no-`<dialog>`-support fallback path only. |
| **Add** | A native `<dialog>` two-step welcome wizard, opened once per device on the beta landing page, built entirely from existing DCC tokens. |
| **Add** | A "Watch the welcome video again" button in both banner variants, so dismissing loses nothing. |
| **Add** | Two poster-frame JPGs (ffmpeg, see §5.2). Without them step 2 is a black rectangle, which is the exact "slapped in" look being fixed. |
| **New localStorage key** | `dccv2-beta-welcome-seen` (ISO date string). |
| **Files touched** | `js/beta.js` only, plus two new image assets in `videos/`. **No change to `index.html`, `fr/index.html`, `css/*`, or any video/VTT file.** |
| **Governance flag** | This conflicts on its face with a PRODUCT.md anti-reference. Read §1 before writing code. |

---

## 1. The governance conflict, resolved up front

Two filed constraints appear to forbid what Aaron asked for. Neither actually does, but Opus must
be able to say why.

**`C:\twobirds\digital-confidence\PRODUCT.md`**
- Anti-reference: *"Floating overlays that cover content (? Help buttons, feedback bubbles — these are current anti-patterns already on the live site)"*
- Design principle 4: *"Floating elements earn their position. Nothing hovers over readable content."*
- Accessibility line: *"No autoplay, no video that starts without user action"*

**`C:\twobirds\two-birds-portfolio\.claude\skills\impeccable\reference\product.md`**
- Product ban: *"Modal as first thought. Modals are usually laziness. Exhaust inline / progressive alternatives first."*

### Why this build is compliant, not an exception being smuggled through

1. **Both rules target persistent overlays that sit on top of content the user is trying to read.**
   The named examples are help buttons and feedback bubbles: things that hover *during* the reading
   task and never go away. This wizard appears *before* the reading task begins and is gone
   permanently after one interaction. Different object.
2. **"Exhaust inline alternatives first" has been exhausted.** Inline was built, shipped, and
   reviewed by the product owner, who rejected it specifically because inline placement made the
   video read as part of the product. That is the documented result of the inline attempt, not an
   untried option.
3. **Audience scope.** The wizard is gated behind `isBeta()`. A public senior visitor, the audience
   PRODUCT.md's anxiety-first principle protects, will never see it under any circumstance. The
   people who see it self-selected by clicking a private beta link.
4. **The no-autoplay rule is honoured, not bent.** Playback only ever begins after the user presses
   a button that says it will play a video (see §5.3). Nothing starts unbidden on page load.

**Action for Opus:** append one scoping clause to the PRODUCT.md anti-reference bullet rather than
leaving a live contradiction in the repo. Suggested wording, verbatim, as an addition to line 32:

> `- Floating overlays that cover content (? Help buttons, feedback bubbles — these are current anti-patterns already on the live site). Scope: this bans overlays that hover during a reading task. It does not ban a one-time, dismissible first-run entry dialog shown to beta testers before the product begins (beta welcome wizard, 2026-07-28).`

If Aaron would rather this be an ADR than an inline note, file it instead. Do not ship the feature
with the contradiction unaddressed either way.

---

## 2. What exists right now (verified reads, 2026-07-28)

| Thing | Location | State |
|---|---|---|
| Beta flow logic | `C:\twobirds\digital-confidence\js\beta.js` (273 lines) | IIFE, no build step, `window.DCCBeta` API exported |
| Beta flag key | `dccv2-beta` | `"1"` set from `?beta=1` / `?beta=true` |
| Email key | `dccv2-beta-email` | drives the returning-vs-first-time banner branch |
| Banner mount | `renderBanner()` → `main.insertBefore(box, main.firstChild)` | opt-in per page via `#main[data-beta-banner]` |
| Video build | `buildVideo()`, lines 169–196 | native `<video controls preload="none" playsinline>` + default captions track |
| Video insert point | line 213, `box.appendChild(buildVideo())` | **first-time branch only**; returning testers already get no video |
| EN entry | `index.html?beta=1`, `<html lang="en-CA">`, `<main id="main" data-beta-banner>` line 69 | `<script src="js/beta.js">` line 315 |
| FR entry | `fr/index.html?beta=1`, `<html lang="fr-CA">`, `<main id="main" data-beta-banner>` line 69 | `<script src="../js/beta.js">` line 308 |
| Language switch | `IS_FR` read from `document.documentElement.lang` | already correct, reuse as-is |
| Video assets | `C:\twobirds\digital-confidence\videos\dcc-beta-welcome-{en,fr}.{mp4,vtt}` | EN 39.1s, FR 43.3s, 1280x720, H.264/AAC |
| Design tokens | `C:\twobirds\digital-confidence\css\tokens.css` | Trust Blue, light + dark, motion + z tokens present |
| Component CSS | `C:\twobirds\digital-confidence\css\core.css` | `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-quiet` / `.visually-hidden` / `:focus-visible` |
| Modal precedent | **none** | `grep -i "dialog\|modal\|aria-modal"` over `js/` and `*.html` returns zero hits. This is DCC's first dialog. Whatever is built here becomes the pattern. |
| Service worker | `sw.js` is a kill-switch only; v2 root does not use a SW | **No CACHE_NAME bump needed.** Do not add one. |

**Tokens the wizard uses and must not redefine globally:**
`--color-surface`, `--color-surface-alt`, `--color-primary`, `--color-text`, `--color-text-light`,
`--color-border`, `--color-border-strong`, `--color-scrim`, `--radius-lg`, `--radius-md`,
`--shadow-lg`, `--space-2/3/4/5/6/8`, `--font-body`, `--font-heading`, `--font-size-base`,
`--font-size-sm`, `--font-size-h2`, `--line-height-body`, `--tap-target`, `--tap-target-min`,
`--motion-duration-2`, `--motion-duration-3`, `--motion-ease`, `--z-modal`.

---

## 3. Visual structure

### 3.1 DOM position

The `<dialog>` is appended to `document.body` as the **last child**, not inside `<main>`. Native
`<dialog>.showModal()` promotes it to the browser's top layer, so it escapes every stacking context
on the page with no z-index contest. Keep `z-index: var(--z-modal)` on the element anyway as a
belt-and-braces value for the closed/inert state; do not invent a new z value and do not use `9999`.

`showModal()` also gives, for free and correctly: focus trap, `Esc` to close, background made inert,
`::backdrop` pseudo-element. Do not hand-roll any of these.

```
body
├── a.skip-link
├── header.site-header
├── nav.primary-nav
├── main#main[data-beta-banner]
│   └── section.dcc-beta-banner        ← stays, minus the video block
├── footer
└── dialog.dcc-welcome[aria-labelledby="dcc-welcome-title"]   ← NEW, last child
    └── div.dcc-welcome-panel
        ├── p.dcc-welcome-step         ("Step 1 of 2")
        ├── div.dcc-welcome-body       (scrollable region, holds both steps)
        │   ├── section[data-step="1"]
        │   └── section[data-step="2"] [hidden]
        └── div.dcc-welcome-actions    (always visible, never scrolls away)
```

The `<dialog>` element carries no visual styling of its own beyond layout and backdrop. All surface
treatment lives on `.dcc-welcome-panel`. This keeps the browser's default dialog box model out of the way.

### 3.2 Backdrop

```
dialog.dcc-welcome::backdrop {
  background: rgba(16, 23, 31, 0.66);   /* light theme */
}
/* dark theme */
background: rgba(0, 0, 0, 0.72);
```

Declare these as a local custom property scoped to the dialog (e.g. `--dcc-welcome-scrim`), set once
in `:root` and once under `html[data-theme="dark"]`, rather than editing the global `--color-scrim`.
The global scrim (0.55 / 0.65) is slightly too transparent for this specific job; the page behind
keeps competing for attention and the wizard reads as floating junk rather than as a deliberate pause.
Do not change `--color-scrim` itself. Surgical.

**Flat dim. No blur. No `backdrop-filter`.** Three reasons, all of them load-bearing:

1. Impeccable absolute ban: *"Glassmorphism as default. Blurs and glass cards used decoratively."*
   A blurred backdrop here would be decorative.
2. **Audience-specific and more important than the ban:** blurring the page behind a 70-year-old with
   reading glasses does not read as "depth." It reads as *"my eyes have gone wrong."* This is a
   product whose entire premise is that the user is already slightly afraid of the screen. Simulating
   a vision problem in the first three seconds of their first beta visit is the worst possible
   opening move.
3. `backdrop-filter` over a full viewport is a real GPU cost on the cheap Android tablets that make
   up a meaningful share of this audience.

`::backdrop` does not inherit from `:root`, so if the custom property is declared on `:root` it is
reachable, but verify: in some engines `::backdrop` inherits from the originating element's tree only
for dialogs in the top layer. **Safest implementation: set `--dcc-welcome-scrim` on both `:root` and
`html[data-theme="dark"]`, and additionally on the `dialog.dcc-welcome` element itself.** Test both
themes live; a broken custom property here silently produces the UA default backdrop, which is a flat
black wash and looks wrong but not obviously broken.

### 3.3 Panel

```
Width:        min(680px, calc(100vw - (2 * var(--space-4))))
Max-height:   calc(100dvh - (2 * var(--space-6)))
Position:     centred both axes (dialog { margin: auto } + inset: 0 works natively)
Background:   var(--color-surface)
Radius:       var(--radius-lg)        /* 12px */
Padding:      var(--space-6)          /* 24px, mobile */
              var(--space-8)          /* 32px at >= 560px */
Layout:       grid; grid-template-rows: auto 1fr auto;
              (step line / body / actions)
```

**680px, specifically.** The video is 1280x720. At 680px panel width minus 32px padding each side,
the video renders 616x347. That plus the heading, one paragraph, the audio control, and the action
row fits inside a 768px-tall laptop viewport without internal scrolling, which is the common case.
Wider than 680 and the video starts to dominate; narrower and it looks apologetic.

**Border and shadow, per theme, never both.** Impeccable's codex-specific ban is
`border: 1px solid X` combined with `box-shadow` of blur ≥ 16px on the same element (the "ghost card").
`--shadow-lg` is 22px blur, so pairing it with a border would trip exactly that.

| Theme | Treatment | Why |
|---|---|---|
| Light | `box-shadow: var(--shadow-lg)`, **no border** | The panel lifts off the dimmed page. A white panel on a dark scrim needs no edge. |
| Dark | `border: 1px solid var(--color-border-strong)`, **no shadow** | `--color-surface` #1A2430 against a 0.72 black scrim is a low-contrast edge, and drop shadows are invisible on dark. The border is doing real work, not decoration. |

**Radius is 12px and stays 12px.** Impeccable's codex ban caps cards at 12–16px and calls out
24/28/32/40px as the tell. `--radius-lg` is already 12. Do not reach for `--radius-xl`.

### 3.4 Responsive behaviour

| Viewport | Behaviour |
|---|---|
| ≥ 560px | Panel at its natural width, padding `--space-8`, panel `min-height` locked (see §6.3) |
| < 560px | Panel width `calc(100vw - 2 * var(--space-4))`, padding `--space-6`, `min-height` released, actions stack vertically full-width |
| < 400px | Unchanged from above; the 44px/56px tap targets and 16px floor already handle it. Verify at 360px. |
| Landscape phone, height < 560px | `max-height: calc(100dvh - 2 * var(--space-4))` and the body region scrolls. The action row must remain pinned and visible. Test this: it is the case that breaks. |

**Do not build a bottom-sheet variant on mobile.** That is a reinvented affordance for a standard
task (impeccable product ban), and a slide-up sheet with a drag handle is an interaction a 70-year-old
has no reason to already understand. Same centred panel everywhere.

**Use `dvh`, not `vh`.** Mobile Safari's collapsing toolbar makes `100vh` taller than the visible
viewport, which pushes the action row off-screen. This is the single most likely field bug in this build.

### 3.5 Explicitly not in the panel

No illustration. No progress dots. No branded header bar. No decorative rule. No icon in a circle.
The panel is: one line of step text, a heading, prose, the video, the audio control, two buttons.
That is the whole inventory.

---

## 4. The wizard steps

Two steps. Aaron's structure exactly: thanks → video → product.

### 4.1 Step 1 — Thanks

| Element | Content (EN) | Treatment |
|---|---|---|
| Step line | `Step 1 of 2` | `--font-heading`, `--font-size-sm` (16px), `--color-text-light`, regular weight, margin-bottom `--space-2` |
| Heading `<h2 id="dcc-welcome-title">` | `Thank you for joining as a beta tester.` | `--font-heading`, weight 600, `--font-size-h2` (clamp 24–28px), `--color-primary` |
| Paragraph | `You are one of the first people to see the Digital Confidence Centre. There is nothing to set up and nothing to sign in to. We have a short welcome video, about 40 seconds, and then you can look around at your own pace.` | `--font-body`, `--font-size-base`, `--line-height-body`, `--color-text` |
| Primary action | `Watch the welcome video (40 seconds)` | `.btn .btn-primary` |
| Secondary action | `Skip the video and start looking around` | `.btn .btn-secondary` |

**On the primary button label.** Aaron said "Next." This button *is* the Next affordance, relabelled.
"Next" tells a nervous first-time user nothing about what is behind it, and uncertainty is the exact
emotion this product exists to reduce. Verb plus object, saying what will happen, is both impeccable's
copy rule and the right call for this audience. Keep the duration in the label; knowing it is 40
seconds and not 10 minutes is the single most useful fact on the screen.

**On the skip button weight.** It is `.btn-secondary`, not a small grey link. Same 56px height, same
font size, outlined instead of filled. Aaron's complaint pattern includes "cramped small-print dismiss
buttons"; this answers it directly. Visual hierarchy still reads correctly, because fill beats outline,
without making the exit feel like a punishment.

**On the FR line count.** The FR video is 43.3s. The FR string says "about 45 seconds"
(`environ 45 secondes`), matching the existing `T.videoHeading` FR copy. Do not translate "40" literally.

### 4.2 Step 2 — The video

| Element | Content (EN) | Treatment |
|---|---|---|
| Step line | `Step 2 of 2` | as above |
| Heading (same `<h2>` node, text swapped) | `A short welcome from Two Birds Innovation` | as above |
| Paragraph | `The sound starts off. Turn it on whenever you like. The words appear on the video either way.` | as above |
| Video | `<video>` per §5 | width 100%, `aspect-ratio: 16/9`, `border-radius: var(--radius-md)` (8px), `background: #000`, **no border** |
| Audio control | see §5.4 | `.btn .btn-secondary`, full-width on mobile |
| Audio status line | `The sound is off. Captions are on.` | `--font-size-sm` (16px), `--color-text-light`, `aria-live="polite"` |
| Primary action | `Start looking around` | `.btn .btn-primary` |
| Secondary action | `Back` | `.btn .btn-quiet`, min-height `--tap-target-min` (44px) |

**Last step behaviour: requires a click. No auto-dismiss.** Two reasons. First, the EN video is 39
seconds and the FR is 43; a dialog that vanishes the instant playback ends yanks the screen out from
under someone who was still reading the caption. Second, a tester may never press play at all, in
which case there is no "end" event to hang an auto-dismiss on, and a rule that only sometimes fires is
worse than no rule. **When the video ends naturally, do exactly one thing: nothing.** Leave the panel
up with the primary button waiting. Do not pulse it, do not highlight it, do not fire a celebration.

**Back is `.btn-quiet`, not `.btn-secondary`.** Step 1 has nothing on it a returning-from-step-2 user
needs; Back exists for the person who felt they missed something, not as a co-equal path. It stays a
44px target and a real labelled control, just visually recessive.

### 4.3 Exit paths (all four set the localStorage key)

| Path | Available on | Result |
|---|---|---|
| `Skip the video and start looking around` | Step 1 | close |
| `Start looking around` | Step 2 | close |
| `Esc` key | Both | close (native `<dialog>` behaviour, do not suppress) |
| Backdrop click | Neither | **Deliberately does nothing.** See §7. |

On close: pause the video if playing, set the localStorage key, run the exit transition (§6.2), then
`dialog.close()`.

---

## 5. Video presentation and the audio control

### 5.1 Element

Reuse the existing `buildVideo()` construction almost verbatim. Changes:

| Attribute | Current | In the wizard | Why |
|---|---|---|---|
| `controls` | present | **keep** | Native controls are already keyboard-operable and screen-reader-labelled, and the desktop overflow menu carries the playback-speed option this audience wants. Building custom chrome is an impeccable product ban ("reinventing standard affordances") and would cost all of that. |
| `playsinline` | present | keep | Stops iOS hijacking to fullscreen |
| `preload` | `"none"` | **`"metadata"`** | The tester has now pressed a button that says "watch". Metadata is a few KB, and it makes the native scrubber show a real duration instead of `0:00`. |
| `muted` | absent | **add, as a property AND attribute** | Aaron's explicit final call. Set `v.muted = true` in JS as well as the attribute; the attribute alone is unreliable for programmatic play. |
| `poster` | absent | **add** | See §5.2 |
| `<track kind="captions" default>` | present | keep | Captions carry the content while muted. This is what makes muted-by-default acceptable rather than pointless. |

### 5.2 Poster frames — new assets required

Without a poster, `preload="metadata"` renders a **black rectangle** until playback starts. On a
white panel, a black rectangle with a small play triangle is precisely the "plain, bad, slapped in"
result being fixed. Generate one poster per language from the video's own first frame:

```bash
cd C:\twobirds\digital-confidence\videos
ffmpeg -i dcc-beta-welcome-en.mp4 -vf "select=eq(n\,0)" -vframes 1 -q:v 3 dcc-beta-welcome-en-poster.jpg
ffmpeg -i dcc-beta-welcome-fr.mp4 -vf "select=eq(n\,0)" -vframes 1 -q:v 3 dcc-beta-welcome-fr-poster.jpg
```

Check the result before wiring it. If frame 0 is a black fade-in rather than the title card, step
forward until a real frame lands (`-ss 00:00:01.5` and drop the `select` filter). The poster must be
a legible frame of the actual video, not a black or half-faded one. Expect roughly 60–120 KB each.
Add both to the repo; they are the only new binary assets in this build.

### 5.3 Playback start rule

**Auto-start, muted, on entering step 2 — with one exception.**

```
if (!prefersReducedMotion) { v.muted = true; v.play().catch(function(){}); }
```

Justification, since this sits close to a PRODUCT.md line:

- PRODUCT.md bans *"video that starts without user action."* The user pressed a button reading
  "Watch the welcome video (40 seconds)". That is the user action. This is not autoplay in the sense
  the rule protects against; nothing plays on page load, and a non-beta visitor can never reach it.
- Muted plus captions-default-on means zero startle risk, which is the concrete harm the rule exists
  to prevent.
- Requiring a *second* click on a play button, immediately after a button that said "watch", is a
  dead step. For this audience specifically, a screen that says "watch" and then does not watch is a
  small failure of trust.
- **Reduced-motion exception:** a playing video is motion, and `prefers-reduced-motion: reduce` is
  frequently set by people with vestibular sensitivity. With that flag set, show the poster and let
  them press the native play button. This is not optional politeness; it is the correct reading of
  the media query.
- **Failure path is already correct:** if `play()` rejects on browser policy grounds, the poster plus
  native controls remain and the user presses play manually. Swallow the rejection silently; never
  surface a playback error to this audience.

On `Back`, and on any close: `v.pause()`. Do not reset `currentTime` on Back, so a tester who stepped
back and forward resumes where they were.

### 5.4 The unmute affordance

This is the detail Aaron called out. It must be **a labelled button, not an icon**.

```
Default state:   [ 🔊  Turn the sound on ]     aria-pressed="false"
Pressed state:   [ 🔇  Turn the sound off ]    aria-pressed="true"
```

| Property | Value |
|---|---|
| Class | `.btn .btn-secondary` |
| Min height | `var(--tap-target)` = 56px (not the 44px minimum; this is a primary-ish control) |
| Width | `100%` below 560px, natural width above |
| Position | Directly beneath the video, above the status line. Not overlaid on the video. Not in the corner. |
| Emoji | `aria-hidden="true"` on a `<span>`, matching DCC's existing pattern (`🔒 Secure connection`, `🌙 Dark mode` in `index.html`) |
| Label text | Full sentence-case words. Never icon-only. Never "Unmute" (jargon). |

**Sync it to the video, do not just toggle a flag.** The native control bar has its own mute button.
If the two get out of step, the button lies, which for this audience is worse than not having it.
Bind to the video's `volumechange` event and derive the button's label and `aria-pressed` from
`v.muted` every time, from a single `syncAudioUI()` function. The click handler sets `v.muted` and
lets the event handler do the rendering. One source of truth.

On unmute also set `v.volume = 1`. Some browsers restore a previously-lowered volume and the user
hears nothing after pressing a button that promised sound.

**Status line copy, driven by the same sync function:**

| State | EN | FR |
|---|---|---|
| Muted | `The sound is off. Captions are on.` | `Le son est désactivé. Les sous-titres sont affichés.` |
| Unmuted | `The sound is on.` | `Le son est activé.` |

`aria-live="polite"` on the status line so screen-reader users get the state change announced without
the button itself having to shout it.

---

## 6. Motion

Use DCC's own motion tokens rather than importing impeccable's suggested easing vocabulary. The
tokens (`--motion-ease: cubic-bezier(0.22, 0.61, 0.36, 1)`, durations 120/200/320ms) already sit
inside impeccable's recommended bands, and inventing a parallel easing vocabulary for one component
is exactly the "feels bolted on" problem being fixed. Consistency with the host system wins.

### 6.1 Entrance

| Layer | Property | From → To | Duration | Easing |
|---|---|---|---|---|
| `::backdrop` | `opacity` | 0 → 1 | `--motion-duration-2` (200ms) | `--motion-ease` |
| `.dcc-welcome-panel` | `opacity` | 0 → 1 | `--motion-duration-3` (320ms) | `--motion-ease` |
| `.dcc-welcome-panel` | `transform: translateY()` | `12px` → `0` | `--motion-duration-3` | `--motion-ease` |
| `.dcc-welcome-panel` | `transform: scale()` | `0.98` → `1` | `--motion-duration-3` | `--motion-ease` |

**12px, not 40px.** A small confident settle, not a slide-in performance. The panel should look like
it was always there and just came into focus. Combine the translate and scale in a single `transform`.

Implementation note: `<dialog>` has no entrance transition on `showModal()` unless the animated
properties have a starting value at the moment it becomes visible. Simplest reliable approach without
relying on `@starting-style` support: call `showModal()`, then on the next animation frame add an
`.is-open` class that carries the end state, with the start state on the base class.

```js
dlg.showModal();
requestAnimationFrame(function () {
  requestAnimationFrame(function () { dlg.classList.add("is-open"); });
});
```

Two nested rAFs, not one. A single frame is unreliable across engines for a top-layer promotion.

### 6.2 Exit

Reverse, at `--motion-duration-2` (200ms), which is ~62% of the entrance. Exits are faster than
entrances.

`<dialog>.close()` is instantaneous and removes the element from the top layer immediately, so the
exit must be sequenced manually:

```js
function closeWizard() {
  video.pause();
  markSeen();
  dlg.classList.remove("is-open");
  dlg.classList.add("is-closing");
  var done = false;
  function finish() {
    if (done) { return; }
    done = true;
    dlg.close();
    dlg.classList.remove("is-closing");
    restoreScroll();
    returnFocus();
  }
  dlg.addEventListener("transitionend", finish, { once: true });
  window.setTimeout(finish, 260);   // fallback, must exist
}
```

**The `setTimeout` fallback is mandatory, not defensive padding.** Under
`prefers-reduced-motion: reduce`, `tokens.css` zeroes every duration to `0ms`. A `0ms` transition may
not fire `transitionend` at all in some engines, and if the close depends solely on that event the
dialog **hangs open forever** for exactly the users least able to work around it. Guard the double-fire
with the `done` flag.

### 6.3 Step 1 → Step 2

**Crossfade only. No horizontal slide, no wipe, no carousel.**

| Property | Treatment |
|---|---|
| Outgoing step | `opacity` 1 → 0 over `--motion-duration-1` (120ms), then `hidden` |
| Incoming step | `hidden` removed, `opacity` 0 → 1 over `--motion-duration-2` (200ms) |
| Panel height | **Does not animate.** See below. |

**Do not animate the panel's height.** Impeccable warns against casually animating layout-driving
properties, and a panel that grows while a senior is mid-sentence is genuinely disorienting. Instead,
**remove the problem**: at ≥560px, give `.dcc-welcome-panel` a `min-height` sized to step 2 (the taller
step), so step 1 sits inside the same box and nothing resizes at all. Measure it during
implementation, hardcode the resulting value as a single custom property with a comment, and verify at
the A− / A / A+ text sizes (the A+ case at 24px base is the binding one).

Below 560px, release the `min-height`; vertical space is too scarce to spend on an empty reservation,
and a 200ms crossfade covers the reflow acceptably at that size.

### 6.4 Reduced motion

`tokens.css` lines 261–267 already zero `--motion-duration-1/2/3` under
`@media (prefers-reduced-motion: reduce)`, so every transition above becomes instant with no extra
CSS. Three things still need doing by hand:

1. The `setTimeout` close fallback (§6.2).
2. No auto-start of video playback (§5.3).
3. Verify the `.is-open` class flow still produces a visible dialog when durations are 0. It will, but
   test it rather than assuming.

### 6.5 Motion that is deliberately absent

No staggered entrance on the panel's internal elements. No button hover scale. No pulse on the primary
action. No progress animation on the step indicator. One movement, one moment, then the interface
holds still. Impeccable's product register is explicit: *"No orchestrated page-load sequences."*

---

## 7. Skippability — recommendation and reasoning

**Recommendation: not skippable by accident, trivially skippable on purpose.**

Aaron used "force layer" and "wizard" but immediately softened it to "click next... or just click
next, whatever," and told the design pass to use discretion. Here is the discretion, argued rather
than asserted.

### Why a genuinely unskippable modal is the wrong call here

1. **The audience is the argument.** DCC's stated users are Canadian adults 65+, many with low digital
   confidence, some with motor or vision impairment, often interrupted. A hard gate that cannot be
   dismissed is the single most user-hostile pattern on the web, and shipping one on a **digital
   accessibility product** is a self-inflicted wound that would be quoted back at DCC in any review.
2. **The persuasion problem does not exist.** These are self-selected testers who clicked a private
   beta link on purpose. They are not a cold audience that has to be trapped into watching. Forcing
   people who already opted in buys nothing.
3. **Failure modes are asymmetric.** A tester who skips the video and gets on with testing costs
   almost nothing; the video's content also exists in the banner prose. A tester who cannot dismiss
   the dialog, on a phone, in a waiting room, with a screen reader, is a support incident and a bad
   first impression of the whole product.
4. **`Esc` is native and should not be suppressed.** Overriding `<dialog>`'s cancel event to block
   `Esc` is an active choice to break a platform convention that assistive-technology users rely on.

### Why it is also not casually dismissible

1. **Backdrop click does nothing.** A mis-tap outside the panel, which is common with shaky hands and
   large fingers on small screens, would otherwise destroy the welcome with no way to know what was
   lost. Every exit is a labelled button or `Esc`.
2. **No X in the corner.** A small iconographic close control in a corner is the exact "cramped
   small-print dismiss" pattern Aaron flagged, and "X means close" is not universal knowledge in this
   demographic. The labelled full-size buttons are the close control.

### The piece that makes dismissal safe

**Add a permanent rewatch path.** Per the existing production notes, the returning-tester banner has
no rewatch option at all today. Add a `.btn-quiet` button to **both** banner variants:

- EN: `Watch the welcome video again`
- FR: `Revoir la vidéo de bienvenue`

Clicking it opens the dialog **directly at step 2**, video paused on the poster, muted, with focus
moved into the panel. On close, focus returns to that button. This costs about ten lines and converts
"dismissible" from a risk into a non-issue: nothing is ever permanently lost by skipping.

---

## 8. localStorage gating

Consistent with ADR-0004 (no auth, localStorage only) and ADR-0027. **No cookies, no server call,
nothing about the wizard is transmitted anywhere.** The existing `saveProgressEmail()` path is
untouched and the wizard does not extend it.

### The key

| | |
|---|---|
| Name | `dccv2-beta-welcome-seen` |
| Value | An ISO 8601 timestamp string, e.g. `2026-07-28T14:03:11.204Z` |
| Written | On every exit path, at the moment of close, before the exit transition completes |
| Read | Once, at boot |

**Why a timestamp rather than `"1"`.** Same storage cost, and it answers a question that will
absolutely be asked later ("did the testers who watched the welcome give more feedback, and when did
they come in?") without a schema change. It also lets a future re-show rule exist without a migration.

**Why a separate key from `dccv2-beta`.** Clearing one must not clear the other. A tester who resets
their beta flag while debugging should not silently lose the record of having seen the welcome, and
vice versa. The `dccv2-` prefix matches every other DCC key (`dccv2-theme`, `dccv2-text-size`,
`dccv2-beta-email`).

**Version bump path for a future v3 video:** rename to `dccv2-beta-welcome-seen-v3`. Every device then
sees the new welcome exactly once. Note this in a code comment so it is discoverable at the time it is
needed.

### Show rule (all must be true)

1. `isBeta()` returns true (flag set from `?beta=1` this load, or already on the device).
2. `localStorage.getItem("dccv2-beta-welcome-seen")` is null or empty.
3. `document.querySelector("#main[data-beta-banner]")` exists — landing pages only, never the 39
   module pages.
4. `typeof dialogEl.showModal === "function"` — otherwise take the fallback path (§9).

Wrap every `localStorage` access in `try/catch`, matching the existing helpers in `beta.js`. In
private-browsing modes where storage throws, the correct degradation is **treat as unseen and show it**;
a tester in private browsing seeing the welcome twice is a far smaller harm than a tester never
seeing it.

### Frequency: once per device, permanently. Not once per session.

Beta testers return over days. Re-showing a 40-second welcome at the top of every session is the exact
nagging Aaron ruled out, and the second showing carries zero new information. Once-ever is only safe
because §7's rewatch button exists; ship the two together or neither.

### Ordering inside `boot()`

`setBeta(true)` already runs before the `isBeta()` check, so a first arrival at `?beta=1` sets the flag
and shows the wizard on that same page load. Preserve that order. Insert the wizard check **after**
`renderBanner()`, so the banner is already in the DOM behind the dialog and the page looks correct
the instant the dialog closes.

### Cross-language behaviour, stated deliberately

`localStorage` is per-origin, so the key is shared between `index.html` and `fr/index.html`. A tester
who sees the EN welcome and then switches to French will **not** see the FR welcome. This is correct:
it is the same person and the same welcome, and being shown it twice in two languages would read as a
bug. The rewatch button on the FR page gives them the French cut on demand if they want it.

---

## 9. Fallback, degradation, and edge cases

| Case | Behaviour |
|---|---|
| **`<dialog>` / `showModal` unsupported** (old iPads, pre-iOS 15.4 Safari — a real slice of this audience) | Do not build the dialog. Fall back to **today's behaviour**: call the existing `buildVideo()` inline in the banner. Keep `buildVideo()` in the file for exactly this reason. No polyfill, no library, no new dependency. Static-only rule and sovereignty both hold. |
| `localStorage` throws | Treat as unseen, show the wizard, swallow the write error |
| Video file 404s | Native `<video>` shows its own broken state; the wizard still works and the buttons still close it. Do not add custom error copy. |
| `play()` rejects | Silent catch, poster and controls remain |
| Reduced motion | §6.4 |
| Body scroll | `showModal()` does **not** lock body scroll. Set `document.documentElement.style.overflow = "hidden"` on open and **restore the exact prior value** on close (capture it into a variable first; do not assume it was empty). |
| A+ text size (24px base) | Everything inside the panel inherits from `html`, so the wizard scales with the A− / A / A+ toggle automatically. **Never hardcode a px font-size in the wizard.** Verify the A+ case does not overflow the panel; this is the most likely layout break. |
| Dark mode | Tested first, not last, per PRODUCT.md principle 3. All colours come from tokens, so this should be free; verify anyway, including the `::backdrop` custom property (§3.2). |
| Non-beta anonymous visitor | Sees absolutely nothing. No dialog element in the DOM, no styles injected. Verify explicitly. |

### Focus management

| Moment | Behaviour |
|---|---|
| Open | Focus the panel container (`tabindex="-1"`), not the primary button. With `aria-labelledby` on the `<h2>`, screen readers announce the dialog's title first instead of dropping the user onto a button with no context. |
| Step change | Move focus to the newly visible step's heading region (`tabindex="-1"`). Do not fire an extra `aria-live` announcement; the focus move plus heading text is the announcement. |
| Close (opened on load) | Focus `#main` with `tabindex="-1"` so keyboard users resume at the top of the content, matching where the skip-link lands. |
| Close (opened from rewatch button) | Return focus to the rewatch button. |
| Background inertness | Native, via `showModal()`. Do not add `inert` or `aria-hidden` manually; doing both causes double-announcement bugs. |

### ARIA

`<dialog>` with `showModal()` carries an implicit `role="dialog"` and modal semantics. Add
`aria-labelledby="dcc-welcome-title"`. Do **not** add `role="dialog"` or `aria-modal="true"` by hand;
duplicating implicit semantics on a native dialog causes inconsistent announcements across
screen readers.

---

## 10. Copy — full strings, both languages

Add these to the existing `T` object in `beta.js`, alongside the current entries. Canadian English.
**No em dashes anywhere** (DCC file rule, and impeccable's copy rule).

### EN

| Key | String |
|---|---|
| `wizStep1of2` | `Step 1 of 2` |
| `wizStep2of2` | `Step 2 of 2` |
| `wizTitle1` | `Thank you for joining as a beta tester.` |
| `wizBody1` | `You are one of the first people to see the Digital Confidence Centre. There is nothing to set up and nothing to sign in to. We have a short welcome video, about 40 seconds, and then you can look around at your own pace.` |
| `wizNext` | `Watch the welcome video (40 seconds)` |
| `wizSkip` | `Skip the video and start looking around` |
| `wizTitle2` | `A short welcome from Two Birds Innovation` |
| `wizBody2` | `The sound starts off. Turn it on whenever you like. The words appear on the video either way.` |
| `wizSoundOn` | `Turn the sound on` |
| `wizSoundOff` | `Turn the sound off` |
| `wizStatusMuted` | `The sound is off. Captions are on.` |
| `wizStatusUnmuted` | `The sound is on.` |
| `wizFinish` | `Start looking around` |
| `wizBack` | `Back` |
| `wizRewatch` | `Watch the welcome video again` |
| `wizLabel` | `Beta tester welcome` (dialog accessible name fallback) |

### FR (fr-CA)

| Key | String |
|---|---|
| `wizStep1of2` | `Étape 1 de 2` |
| `wizStep2of2` | `Étape 2 de 2` |
| `wizTitle1` | `Merci de participer comme testeur beta.` |
| `wizBody1` | `Vous êtes parmi les premières personnes à voir le Centre de confiance numérique. Il n'y a rien à configurer et aucun compte à créer. Nous avons une courte vidéo de bienvenue, environ 45 secondes, puis vous pourrez regarder à votre rythme.` |
| `wizNext` | `Regarder la vidéo de bienvenue (45 secondes)` |
| `wizSkip` | `Passer la vidéo et commencer à regarder` |
| `wizTitle2` | `Un mot de bienvenue de Two Birds Innovation` |
| `wizBody2` | `Le son est désactivé au départ. Activez-le quand vous voulez. Les mots apparaissent sur la vidéo dans les deux cas.` |
| `wizSoundOn` | `Activer le son` |
| `wizSoundOff` | `Désactiver le son` |
| `wizStatusMuted` | `Le son est désactivé. Les sous-titres sont affichés.` |
| `wizStatusUnmuted` | `Le son est activé.` |
| `wizFinish` | `Commencer à regarder` |
| `wizBack` | `Retour` |
| `wizRewatch` | `Revoir la vidéo de bienvenue` |
| `wizLabel` | `Accueil des testeurs beta` |

### Two notes on the French, flagged rather than silently actioned

1. **These new FR strings are properly accented. The existing ones in `beta.js` are not.** The current
   file writes `Vous etes parmi les premieres personnes`, `facultatif` without accents, and so on.
   That accent-stripping was an encoding-safety measure for the **video render pipeline's TTS source
   strings**, and it leaked into the on-page HTML strings where it does not belong. The file is UTF-8
   and the page is `lang="fr-CA"`; unaccented French reads as broken to a native speaker, on a product
   whose credibility with French-Canadian testers matters. **Repair the existing strings in a separate,
   clearly-scoped pass, not inside this sprint** (SURGICAL CHANGES). File it if it will not be done
   immediately.
2. **Windows editing hazard.** Per the CLAUDE.md WINDOWS TEXT-EDITING SAFETY rule: edit these accented
   strings with the **Edit tool only**. PowerShell `Get-Content` / `Set-Content` on this file will
   silently corrupt every accented character. Do not batch-rewrite `beta.js` from PowerShell.

---

## 11. Impeccable bans being deliberately steered away from

Named explicitly so the implementation pass does not reach for any of them by reflex.

### From the shared absolute-bans list

| Ban | What was done instead |
|---|---|
| **Glassmorphism as default** | Flat scrim, no `backdrop-filter`. Reasoned in §3.2 (it is also an audience-safety issue, not only a taste ban). |
| **Gradient text** | Dialog title is solid `--color-primary`. No `background-clip: text` anywhere. |
| **Side-stripe borders** | No `border-left` accent on the panel, the step line, or the status line. |
| **Tiny uppercase tracked eyebrow** | No `BETA` / `WELCOME` kicker above the title. The step line is sentence-case body text at 16px. |
| **Numbered section markers as scaffolding** | "Step 1 of 2" is functional sequence information, which is the exempt case. It is **not** rendered as a large decorative `01`. No numbered circles, no stepper graphic. |
| **The hero-metric template** | The 40-second duration lives inside the button label as words. It is not a giant number with a small label under it. |
| **Identical card grids** | There are no cards in this component at all. No nested cards. |
| **Text overflowing its container** | Verify at 360px width and at A+ (24px base) text size. The FR strings are longer than EN; test FR at 360px specifically. |
| **Bounce / elastic easing** | DCC's `--motion-ease` only. |
| **Em dashes** | None in any string in §10. Check before committing. |
| **Marketing buzzwords** | No "seamless", "empower", "transform", "experience". The copy says what happens. |

### From the codex-specific defect list

| Ban | What was done instead |
|---|---|
| **`border: 1px` + `box-shadow` ≥16px blur on the same element** | Shadow in light theme, border in dark theme, never both. §3.3. |
| **`border-radius: 32px+` on cards / panels** | `--radius-lg`, 12px. Video at `--radius-md`, 8px. |
| **Hand-drawn / sketchy SVG illustration** | **No illustration in the dialog.** Note: DCC's existing hero SVG on `index.html` is already in this family. Do not add a second one, and do not "improve" the existing one in this sprint (SURGICAL CHANGES). |
| **`repeating-linear-gradient` stripe backgrounds** | None. |
| **Meta-criticism copy** | None. |

### From the product-register bans

| Ban | What was done instead |
|---|---|
| **Reinventing standard affordances (non-standard modals, custom controls)** | Native `<dialog>` and native `<video controls>`. No custom player chrome, no custom focus trap, no custom Esc handler, no drag-to-dismiss sheet. |
| **Decorative motion that does not convey state** | Every transition in §6 marks a state change: opened, step changed, closed. Nothing else moves. |
| **Modal as first thought** | Addressed in §1: inline was built, shipped, and rejected by the product owner. This is the second thought. |
| **Display fonts in UI labels / buttons** | Buttons use `--font-heading` (Source Sans 3) via the existing `.btn` class. |

### Deliberate departure from impeccable's product-register typography advice

The product register says fixed rem scales, one family, no clamp headings. **This spec keeps DCC's
serif-body / sans-heading pairing and its `clamp()` h2.** Impeccable's own setup step 3 puts
identity-preservation above generic register convention when a committed design system already
exists, and DCC's system is committed, contrast-verified to AAA, and deliberately tuned for reading
glasses. A wizard using a different type system would be precisely the "bolted on" quality Aaron
rejected. Native-to-DCC wins here; note it rather than silently diverging.

### From DCC's own anti-references

No dark tech-dashboard aesthetic. No Apple-style sleekness. No dense AARP-style layout. No
"sign up to unlock" framing — **the wizard collects no email and asks for nothing.** The optional
email form stays where it is, in the banner, as a separate low-pressure surface (see §12).

---

## 12. What happens to the existing banner

| Banner element | Fate |
|---|---|
| Heading (`Thank you for joining...` / `Welcome back.`) | Unchanged |
| Intro paragraph | Unchanged |
| **Video block** | **Removed.** Delete the `box.appendChild(buildVideo())` call at line 213. |
| Email intro + optional email form | Unchanged, stays in the banner |
| `Got it` dismiss (returning variant) | Unchanged |
| **Rewatch button** | **New.** `.btn-quiet`, added to **both** variants. Opens the dialog at step 2. §7. |

**Why the email stays out of the dialog.** One job per surface. A first-run modal that asks for an
email address is a "sign up to unlock" smell, which PRODUCT.md bans outright, and it would make the
welcome feel transactional. The dialog is a moment (welcome, video, done). The banner is an optional
persistent task (leave your email if you want). Closing the dialog leaves the tester looking at the
banner with the email option sitting there in normal page flow, at their own pace. Clean division.

---

## 13. Verification the implementation pass owes

Per CLAUDE.md LIVE-OUTCOME VERIFICATION, this touches a live product, so it is not Done until verified
against the live URL with evidence. Per the tooling gotchas: serve over HTTP, **never `file://`**, for
any Playwright run.

| # | Check |
|---|---|
| 1 | `python hal-stack/verification/verify-gate.py --product dcc` passes |
| 2 | EN `index.html?beta=1` on a clean profile: dialog opens, both steps work, closes, product usable |
| 3 | FR `fr/index.html?beta=1`: same, with accented strings rendering correctly (not mojibake) |
| 4 | Reload after dismissing: **dialog does not reappear**; rewatch button present in the banner and reopens at step 2 |
| 5 | Anonymous visitor with no `?beta=1` and no flag: **no dialog element in the DOM at all**, page identical to today |
| 6 | Dark mode: panel border visible, backdrop correct, all text meets contrast. Test before light mode (PRODUCT.md principle 3). |
| 7 | A+ text size (24px base): no overflow, action row still visible without scrolling on a 768px-tall viewport |
| 8 | 360px width, both languages: buttons full-width, nothing clipped, FR strings do not overflow |
| 9 | Landscape phone (height < 560px): action row still reachable, body region scrolls, `dvh` behaving |
| 10 | `prefers-reduced-motion: reduce`: dialog opens instantly, video does **not** auto-start, **and the close button still closes it** (the `setTimeout` fallback, §6.2) |
| 11 | Keyboard only: Tab cycles inside the panel, Esc closes, focus lands sensibly on close |
| 12 | Audio button and the native control bar's mute never disagree after toggling from either one |
| 13 | Poster frames render a legible video frame, not black |
| 14 | Screenshots of steps 1 and 2, both languages, both themes, saved to `C:\twobirds\digital-confidence\quality\playwright-results\` |

Verify on a **fresh browser profile** (close and reopen playwright-cli). Note that DCC v2 root has no
active service worker (`sw.js` is a kill-switch only), so there is no `CACHE_NAME` to bump. Do not add one.

---

## 14. Open questions for Aaron — do not block on these

None of these should stop implementation. File them if he is not present.

1. **Rewatch button wording.** Spec'd as `Watch the welcome video again`. Fine to ship as-is.
2. **The existing unaccented FR strings** in `beta.js` (§10, note 1). Separate sprint. Recommend filing it.
3. **Poster frame choice.** If frame 0 of either video is a fade-in, the implementer picks a later
   frame. Aaron may want to eyeball which frame; not worth blocking on.
4. **v3 with Margaret.** Per the production notes, the obvious next video revision puts the character
   art in. When that lands, bump the localStorage key to `dccv2-beta-welcome-seen-v3` (§8) so every
   tester sees the new cut once.

---

## 15. Deliverable format note

This file is a machine-facing implementation spec written for the Opus pass, not a document Aaron is
meant to read end to end, so no Google Doc render was produced. If Aaron wants to review the design
decisions himself (particularly §7 skippability and §1 the PRODUCT.md conflict, which are the two
judgement calls he may want to overrule), render **those two sections only** to a Doc rather than the
whole spec.

---
---

# PART TWO — trust and authority, identification, and the confidence quiz

*Added 2026-07-28 after the expanded brief. Research-grounded. Sources cited inline and listed in §23.*

---

## 16. Amendments to Part One — read this before implementing §1–§15

| § amended | What changes | Why | Where |
|---|---|---|---|
| §3.3 Panel | Panel gains a **warm header band** (`--color-accent-light` in light theme, `--color-surface-alt` in dark) carrying the step line, title, and attribution. Body region stays `--color-surface`. | Institutional-credibility research plus the Canadian-government exemplar (§17.3). Adds warmth without a stripe. Impeccable's product register explicitly permits "a second neutral layer for panels". | §18.2 |
| §4.1 / §4.2 Titles | Dialog title weight moves **600 → 700** (`--font-weight-bold`). | §17.4. Formal typographic weight is a real authority signal; at 24–28px Source Sans 3 on a full-bleed scrim, 600 reads soft. | §18.2 |
| §4.1 `wizBody1` | Rewritten to carry an explicit legitimacy statement (who made this, that it is free, that it is Canadian). | Stanford Web Credibility guideline 2, "show legitimacy", is the single highest-leverage change available here. | §18.3 |
| §4.3 Exit paths | Unchanged in substance. | | |
| §4 Action row | **Button order reverses: primary on the RIGHT**, secondary to its immediate left, row right-aligned. On narrow screens they stack with **primary on top**. | NN/g: in a **dialog**, the action button sits farthest right. Aaron's instinct was correct for dialogs, and Part One had it wrong. Note this is the opposite of the correct answer for the inline confidence-quiz form (§22.3) — the two components genuinely follow different conventions, and that is not an inconsistency. | §18.2 |
| §4 Wizard steps | **Two steps become three.** A new step 3 carries the optional self-identification that currently lives as the confusing "remember me" box in the banner. | Aaron's direct ask. It is the same intro moment; it should be one coherent flow, not a modal plus a leftover form. | §19 |
| §10 Copy | `wizStep1of2` / `wizStep2of2` become `Step 1 of 3` / `Step 2 of 3`, plus a new step-3 string set. Attribution strings added. | Consequence of the above. | §19.5 |
| §12 Banner | The **email form leaves the banner entirely** (not just the video). The banner keeps the intro prose, the rewatch button, and gains a quiet "tell us who you are" link for anyone who skipped step 3. | One coherent flow. | §19.6 |
| §13 Verification | Twelve checks added (watermark render, identification round-trip, quiz layout, footer mark, Margaret flag default, FR at 360px, and more). | | §24 |

Everything else in §1–§15 stands as written.

**Em-dash note:** this spec's own prose uses em dashes for readability. **None of the copy strings it
specifies contain one**, in either language. The DCC no-em-dash rule binds shipped product copy, which
is what §10, §19.4, §19.7, §20.4 and §22.5 define. Check before committing anyway.

---

## 17. The research: what actually makes an educational product read as credible

Aaron's brief: read as trustworthy and authoritative like a government or institutional educational
site, but explicitly **not** boring or bureaucratic. "I don't wanna live right inside the government
rules because that's boring."

### 17.1 The headline finding, which cuts against the instinct

The most-cited body of work here is the **Stanford Web Credibility Project** (Fogg et al., ~4,500
participants). Its finding that matters most for this build: *"people quickly evaluate a site by
visual design alone"*, and nearly half of consumers assess credibility on overall visual design —
layout, typography, colour — **before** reading content. Visual design outranked content and
testimonials as a credibility factor.

So visual treatment genuinely is the lever. But the Stanford guidelines say what *kind* of visual
treatment:

| Stanford guideline | What it means here |
|---|---|
| 2. **Show legitimacy** — "showing that your web site is for a legitimate organization will boost the site's credibility" | Say, in words, who made this and what it is. This is the highest-leverage single change available. |
| 6. **Professional design** — "pay attention to layout, typography, images, consistency issues" | Consistency with DCC's own committed system beats importing an "institutional" look. |
| 9. **Limit promotional content** | The wizard must not feel like a pitch. No conversion framing on the email step. |
| 10. **Eliminate errors** | The existing unaccented French (§10 note 1) is literally a credibility defect under this guideline, not just a polish item. |

Guideline 5, "enable contact," is the one DCC **cannot** follow the usual way: the DCC brand kit's
PII rule states *"Aaron's name, email, phone NEVER appear on DCC surfaces... Product contact routes
only."* So contact credibility is carried by the existing Give feedback route, not by an address.
**Do not add an email address to any of this.**

### 17.2 The finding that directly constrains the oversized watermark

Research on logo design and trust (source-credibility theory applied to logos and website design,
*International Journal of Human-Computer Interaction* 30(1); plus consolidated brand-trust survey
work) converges on one conclusion:

> Logo effectiveness depends on **simplicity, appropriate sizing, colour, authenticity, and alignment
> with brand identity — not on logo prominence or size itself.**

Supporting data points from the same body of work: simple marks are remembered ~34% more often than
complex ones; ~68% of respondents trusted brands whose logos felt *authentic and aligned with the
brand's mission*; blue is the colour most associated with trust, professionalism and security
(which DCC's Trust Blue `#1D4E89` and Two Birds' `#0066CC` both already are).

**Plainly: making the logo huge does not buy trust. The words next to it do.** This does not mean
refusing Aaron's request. It means the watermark is built as an **attribution card** — an oversized
mark *plus* an explicit legitimacy line — rather than a bare giant logo, so the treatment actually
delivers the credibility he is asking it to deliver. §18 specs exactly that.

### 17.3 "Institutional but not boring" — the grounded exemplar

The most useful real-world comparator is **Get Cyber Safe** (`getcybersafe.gc.ca`), the Government
of Canada's own public digital-literacy and fraud-awareness campaign, run by the Canadian Centre for
Cyber Security. It is the closest possible analogue to DCC: Canadian, federal, public-education,
fraud and password and device-safety content, aimed substantially at non-expert adults.

Fetched live 2026-07-28 (HTTP 200 via `curl` with a browser UA; `.gc.ca` 403s the WebFetch tool per
the CLAUDE.md rule). Its committed accent colour is **`#de4b20`, a bright warm orange-red**, against
a near-black `#2d2929` ink.

That is the finding worth acting on: **Canada's own government cyber-safety campaign does not use
institutional navy-and-grey.** It uses a warm, saturated accent, illustration, and campaign framing,
and it is still unambiguously credible because the credibility comes from the attribution
(`Canadian Centre for Cyber Security`, `.gc.ca`) and the clarity, not from visual severity.

The other side of the same coin is the **GOV.UK Design System**, whose guidance format is
*"based on task-based research into what users need in order to follow and trust an approach"*.
Its authority reads as calm, plain, and unfussy, not ornate.

**Synthesis for DCC:** authority comes from *attribution + clarity + consistency*. Warmth is free.
DCC already owns a warm amber (`--color-accent-light` `#FDF3E3`, `--color-accent-deep` `#7A4A00`)
that has been sitting almost unused in the beta surfaces. Use it. That is the specific,
research-backed answer to "credible but not boring": **keep the type formal and the hierarchy strict,
and let a single warm surface carry the non-bureaucratic feeling.**

### 17.4 Senior-audience specifics that shape the treatment

From the older-adult UX literature (NN/g's senior-citizens research; the design-for-older-adults
review in *Ergon Des* / PMC4777049; consolidated practitioner guidance):

- **Progressive disclosure.** Older adults feel overwhelmed when too many choices appear at once;
  showing information gradually, one clear step at a time, builds confidence. **This is a direct
  research endorsement of the wizard structure over the current all-at-once banner** (which today
  stacks intro prose, a video, an email explanation, an input, and two buttons in one block). It is
  also why the identification ask becomes its own step rather than sitting under the video.
- **Feedback and confirmation.** Visual confirmation that an action completed is disproportionately
  important. Every action in this build must visibly acknowledge itself.
- **Predictability and perceived safety** matter more than novelty. This is why §7's "no backdrop
  dismiss, no X in the corner, labelled full-size buttons" stands, and why §3.4 refuses a
  bottom-sheet.
- **Higher contrast, larger text, no thin weights.** DCC's tokens already hold AAA. Weight 700 on
  titles (§16) is consistent with this, not a departure from it.

### 17.5 Video branding convention: title card vs watermark

Industry convention distinguishes two different things:

| | Watermark | Title card |
|---|---|---|
| What | Persistent logo anchored in a corner for the whole runtime | Brief branded graphic at the opening, typically within the first 30 seconds |
| Purpose | Brand exposure, copyright | Establishes what this is and who made it |
| Best for | Instructional / demo / screen-capture video | Informative content and series |
| Risk | Distraction; redundant when other branding exists | Interrupts narrative if overused |

Guidance is explicit that a watermark *"too large... could be obtrusive"* and must avoid covering
important content.

**The DCC welcome video should get a title-card treatment at the open, not a persistent watermark.**
It already ends with the full-colour chevron-convergence endorsement card. Opening attribution +
closing endorsement is a clean bookend. A persistent corner watermark on top of that would be triple
branding on a 40-second asset, and would sit over the burned-in caption bar the audience is reading.

---

## 18. The oversized opening watermark — exact spec

Target file: `C:\twobirds\digital-confidence\_feedback\poc\dcc-beta-welcome-render-v2.html`
(283 lines; scene 1 is the `titlecard` / `note` slide, `SCENES.en[0]` / `SCENES.fr[0]`).

**Nothing about the audio changes.** The watermark and attribution line are unspoken on-screen
elements, exactly like the existing `.comingsoon` line precedent. Narration, scene durations, and
both `.vtt` files are untouched, so the approved 39.1s / 43.3s cuts stay approved.

### 18.1 The mark

Reuse the existing `TB_MARK` constant (lines ~119–140), which carries the real V05 logo geometry
verbatim, in a **watermark variant**:

| Property | Value | Reasoning |
|---|---|---|
| Plate | **Removed.** Drop the `<rect width="1024" height="1024" rx="180" fill="#0066CC"/>`. | A 620px filled blue rounded square behind the title is a colour block, not a watermark. Only the two chevron groups and their four identity circles remain. |
| Colour | Chevron strokes and circles change from `#FFFFFF` to **`#0066CC`** (the true Two Birds Blue) | Keeps the master palette intact. Do **not** recolour to DCC's `#1D4E89`; the Feathers Model forbids blending palettes, and at 6% opacity the two blues are visually indistinguishable anyway. |
| Size | **620 x 620px** on the 1280x720 stage | 86% of frame height. Genuinely oversized, as asked. |
| Position | `position:absolute; top:50%; left:50%; transform:translate(-50%,-54%);` | The `-54%` lifts it 4% so it centres on the *optical* area above the 140px caption bar, not behind it. Convention: a watermark must not cover important content. |
| Opacity | **0.06** | See §18.4. Hard ceiling 0.08. |
| Scenes | **Scene 1 only.** Present on the opening beat, absent from scenes 2–7. | §17.5. It is a title-card treatment, not a persistent watermark. |
| Layer | Behind `.slide` content, above `.stage` background | `z-index: 0` on the watermark, `.slide` at `z-index: 1`. |

Implementation shape: add a `#watermark` div inside `.stage`, sibling to `.wordmark`, holding the
plate-less SVG. Show it only while scene index is 0. The runner captures whatever is painted, so no
change to `loon-render-generic.py` is needed.

### 18.2 The attribution line — the part that actually does the credibility work

Add one new unspoken line to scene 1, beneath the existing `.note`:

| | EN | FR |
|---|---|---|
| Text | `Digital Confidence Centre is a programme of Two Birds Innovation.` | `Le Centre de confiance numérique est un programme de Two Birds Innovation.` |
| Style | `.attrib` — 23px, weight 600, `var(--primary)` `#1D4E89`, letter-spacing `.3px`, `margin-top: 26px` | same |

**This exact wording is not invented.** It is the canonical attribution line already specified in
`C:\twobirds\two-birds-portfolio\hal-stack\brand\guidelines\dcc-adult.md`:
*"Attribution line where needed: 'Digital Confidence Centre is a programme of Two Birds Innovation.'
Quiet endorsement only."* Using the filed line rather than a new one is the point.

Contrast: `#1D4E89` on the scene-1 background (`#FFFFFF`→`#F8F9FB` gradient) tinted by a 6%
`#0066CC` watermark ≈ 7.6:1. Comfortably AAA, verified below.

**Do not add "free forever" or any permanence claim.** The DCC brand kit flags this explicitly:
*"Do NOT say 'free forever' or imply the whole site is permanently free"* — it has already tripped a
review once. Present tense only.

### 18.3 Contrast maths, so nobody has to guess

`#1D4E89` at 6% alpha composited over `#F8F9FB` gives approximately `#EBEEF3`.

| Foreground | Over watermarked background `#EBEEF3` | Result |
|---|---|---|
| `.titlecard` `#1D4E89` (62px, weight 700) | ~7.6:1 | AAA |
| `.note` `#1C2733` (25px) | ~13.5:1 | AAA |
| `.attrib` `#1D4E89` (23px, weight 600) | ~7.6:1 | AAA |

All three clear AAA with the watermark present. This is the arithmetic that makes 0.06 safe.

### 18.4 Why 0.06 and not higher

At 0.10+ the mark becomes a legible shape competing with the 62px title, and — the binding
constraint — **text sitting over a perceptible pattern is materially harder to read for low-vision
viewers**, which is this product's entire audience. The senior-UX literature's emphasis on high
contrast and low cognitive load makes this the specific place where "make it bigger and stronger"
degrades the thing it is trying to signal.

0.06 is the value where the mark is present as *texture* — you feel the frame has been branded — and
still invisible as *content*. Do not exceed 0.08 under any circumstance. If Aaron wants it more
visible, the correct change is to raise the **size** toward the frame edges, not the opacity.

### 18.5 FORK ONE, flagged: this is a knowing Feathers Model exception

`C:\twobirds\two-birds-portfolio\hal-stack\brand\guidelines\two-birds-master.md`, "Feathers Model
rules", states:

> - Products carry their own identity end to end; the master appears only as the quiet footer line "A Two Birds product" (16 to 20px wordmark).
> - **Never the master chevron in a sub-brand's header or hero.** Never blend palettes.

The opening frame of a DCC video is functionally that asset's hero. The production notes for v2 record
that the current cut was built to comply with this: *"Feathers Model compliance: the master chevron
appears only in the closing endorsement card, never in the header or hero of this DCC asset."*

**Aaron asked for this directly, and he owns the brand.** Build it as specified. But it is a real,
named exception, and it gets recorded rather than quietly absorbed:

- **Build:** the Two Birds chevron watermark, as §18.1.
- **Record:** add one line to the DCC-adult brand kit's Logo section noting the dated, scoped
  exception (beta welcome video opening frame, at ≤8% opacity, Aaron's direct request 2026-07-28).
- **Revert path, one line:** if Aaron would rather stay strictly inside the Feathers Model, deleting
  the `#watermark` div leaves the attribution line doing the credibility work on its own — which,
  per §17.2, is the part that was carrying it regardless. Say this to him in one sentence; do not
  make him read this section.

Mitigations already in the spec that narrow the exception: the mark is plate-less and 6% opacity, it
appears on one scene of seven, and the master palette is preserved rather than blended.

### 18.6 Re-render sequencing — get this order right

1. Edit `dcc-beta-welcome-render-v2.html` (watermark + `.attrib`, EN and FR).
2. Re-render **both** languages:
   ```
   cd C:\twobirds\digital-confidence\_feedback\poc\renders
   python loon-render-generic.py --template ../dcc-beta-welcome-render-v2.html \
          --slug dcc-beta-welcome-v2 --lang en --lang fr --date 2026-07-28
   ```
3. `ffprobe` both outputs. **Durations must still be 39.1s and 43.3s.** If either moved, the audio
   changed, which it must not have; stop and find out why before shipping.
4. Copy the two new MP4s over `videos/dcc-beta-welcome-{en,fr}.mp4`. **The `.vtt` files do not
   change and must not be overwritten.**
5. **Only now** generate the poster frames (§5.2) — they must come from the new cut, or the poster
   will show a watermark-less frame that does not match the first frame of playback.
6. Keep the dated v2 masters from 2026-07-27 in place as the record of what Aaron reviewed; the new
   ones are dated 2026-07-28.

### 18.7 What does not change in the video

The closing chevron-convergence animation, the halo, the wordmark, all narration, all captions, the
`.comingsoon` line, the feedback-surface reproduction in scene 4, the pinned voices
(`en-US-AvaMultilingualNeural`, `fr-CA-SylvieNeural`), and the persistent top `.wordmark`.

On that last one: `.wordmark` is 21px uppercase with 1.6px tracking, which pattern-matches
impeccable's "tiny uppercase tracked eyebrow" ban. **It is exempt and must not be "fixed."** The ban
targets an eyebrow above every section as scaffolding; this is a single named masthead wordmark, the
explicitly permitted case ("one named kicker as a deliberate brand system is voice").

---

## 19. Step 3 — optional self-identification, replacing the "remember me" box

### 19.1 The finding Aaron needs to know first

**Aaron cannot currently learn who is testing, and would not have been able to under the existing
design no matter how the box was worded.** Both persistence paths hash the email irreversibly:

| Path | Code | Behaviour |
|---|---|---|
| `dcc-data` Worker `/progress` | `workers/dcc-data/worker.js:61-71` | Comment: *"Save progress by email HASH"*. Hashes server-side, writes `email_hash` to D1. Raw email is never stored. |
| `dcc-beta-measurement` Worker `/confidence` | `workers/dcc-beta-measurement/worker.js` | `safeHash()` accepts **only** a 64-char hex string and discards anything else: *"a raw email accidentally posted here can never land in the database."* |
| `feedback-widget.js` | line ~575 | *"betaTester + a HASHED email... The raw email is never sent here."* |
| `dcc-data` `/feedback` | `worker.js:81-85` | Stores `text` only. No identity column at all. |

So today the raw email exists in exactly one place: **`localStorage` on the tester's own device**,
where Aaron can never see it. Every server-side row is a hash. His stated need — *"a way to know who
is testing, when people optionally choose to identify themselves"* — is not met by any of it.

This is not a bug in ADR-0027; the PII discipline is deliberate and good. It is a **requirements gap**:
nobody had asked for a roster before.

### 19.2 The fix: change what travels with feedback, not the analytics schema

**Do not touch the measurement pipeline.** ADR-0027's hashing stays exactly as it is. The
`confidence_beta` table, the `cohort='beta'` CHECK constraint, the `email_hash`/`client_id` pairing —
all unchanged.

Instead, capture a **name** (not an email) as the primary identifier, keep it in `localStorage`, and
**prepend it to the free-text body of every feedback submission the tester makes.** Aaron then learns
who gave which feedback in the only place he actually reads it: the feedback rows.

Why this is the right shape:

- **Zero new architecture.** `/feedback` already accepts up to 2000 characters of free text. No new
  endpoint, no new table, no schema migration, no ADR change, no auth. ADR-0004 (no-auth,
  localStorage-only) is satisfied trivially because nothing about this is an account.
- **A name is enough and an email is more than is needed.** Aaron's need is *"who gave which
  feedback"*, not *"how do I email them"*. A first name is lower-friction to give, feels far less
  like a signup, and carries less PII risk. Beta microcopy research is explicit that friction at
  this moment is the thing that kills participation.
- **The email stays optional and keeps its existing job.** If the tester also gives an email, it
  continues to do exactly what it does today: hashed for cross-device pairing. It is now correctly
  described as what it is, instead of as a mysterious "remember me".
- **Reversible and inspectable.** Everything is a string in `localStorage` plus a prefix on text the
  tester chose to send.

### 19.3 What the research says about the copy

Beta-invite and early-access microcopy research lands on three rules, all of which the current box
breaks:

| Rule | Current box | Fixed |
|---|---|---|
| **Clarity over hype; explain what the user actually gets** | "Optional: remember me next time" explains nothing. Remember what? For whom? To do what? | Says who is asking, why, and what happens |
| **Conversational, not corporate.** *"Read your microcopy out loud, and if it sounds like a press release, rework it."* | "Remember me next time" is a login pattern borrowed wholesale from products that have accounts. DCC has no accounts. It is borrowed furniture. | Written as a person asking a question |
| **Minimum friction; one sentence is enough** | An email field is the highest-friction identifier available | A first name, with email genuinely secondary |

Combined with the senior-UX progressive-disclosure finding (§17.4), this becomes its own wizard step
rather than a third block stacked under the video.

### 19.4 Step 3 layout

| Element | Content (EN) | Treatment |
|---|---|---|
| Step line | `Step 3 of 3` | as §4.1 |
| Heading | `Who are we talking to?` | `--font-heading`, **700**, `--font-size-h2`, `--color-primary` |
| Paragraph | `When you send us feedback, it arrives with no name on it. If you tell us your first name, we will know it came from you, and we can come back to you if we have a question about something you told us. This is entirely up to you and you can leave it blank.` | `--font-body`, `--font-size-base`, `--line-height-body` |
| Field 1 label | `Your first name` | visible `<label>`, 600 weight, **not** a placeholder |
| Field 1 input | `type="text"`, `autocomplete="given-name"` | min-height `--tap-target` 56px, full width, 1px `--color-border` |
| Field 2 label | `Your email, only if you want lessons to carry over between your devices` | visible `<label>` |
| Field 2 input | `type="email"`, `autocomplete="email"` | as above |
| Field 2 helper | `We never store your email address. Your own browser scrambles it first, so it works as a key without us ever seeing it.` | `--font-size-sm` (16px), `--color-text-light` |
| Primary action | `Save this and start looking around` | `.btn .btn-primary`, right |
| Secondary action | `Skip this and start looking around` | `.btn .btn-secondary`, left of primary |
| Confirmation | `Thank you, {name}. Your feedback will come to us with your name on it.` | on save, `--color-success-deep`, 1.8s then close |

**Every visible label is a real `<label>`, never a placeholder.** Placeholder-as-label disappears the
moment the field is focused, which is a documented failure for older users and a WCAG problem.
The current code uses `class="visually-hidden"` on the label with the text repeated as a placeholder
(`beta.js` lines 218–223). That is the pattern being removed.

**The email helper line is the honesty fix.** It states plainly what the hashing actually does. Under
Stanford guideline 4 (demonstrate trustworthiness) this kind of specific, checkable claim is worth
more than any amount of reassuring tone. It also happens to be true, which the old copy never
established.

**No "why should I?" persuasion, no benefit-stacking, no progress-bar-completion nudge.** Stanford
guideline 9 (limit promotional content) and DCC's "no urgency, ever" voice rule both apply. Ask once,
plainly, and accept no.

### 19.5 Storage and wiring

| Key | Value | Notes |
|---|---|---|
| `dccv2-beta-name` | Raw first name, trimmed, max 60 chars | **New.** localStorage only. Never sent to any analytics endpoint. |
| `dccv2-beta-email` | Raw email | **Existing, unchanged.** localStorage only; hashed before any transmission. |
| `dccv2-beta-welcome-seen` | ISO timestamp | §8, unchanged |

Extend the exported `window.DCCBeta` API with one method:

```
window.DCCBeta.getName()   // returns the stored first name, or ""
```

Then in `feedback-widget.js`, where the submission bundle is assembled (~line 575–627), prefix the
text body when a name exists:

```
"[Beta tester: " + name + "] " + text
```

One line, at the point the bundle is built. Aaron reads the feedback table and sees who said what.

**Guard rails, all mandatory:**
- Cap the name at 60 characters and strip newlines before prefixing, so the prefix cannot be used to
  fake extra content or blow the 2000-char limit.
- If no name is stored, send the text exactly as today. No empty prefix, no `[Beta tester: ]`.
- The name is **never** added to the `/confidence` payload or the `/progress` payload. Those stay
  hash-only. Re-read `confidence-quiz.js` `send()` (lines 131–156) and confirm you have not touched it.
- Keep `saveProgressEmail()` exactly as it is.

### 19.6 What leaves the banner

The banner's first-time variant currently renders: intro prose, video, email intro, email form, skip
link, status. After this build it renders: **intro prose, rewatch button.** That is all.

Everything else has moved into the wizard, which is the point — one coherent first-run flow instead
of a modal plus a leftover form. Both banner variants also gain one quiet link for anyone who skipped
step 3 and later changes their mind:

- EN: `Tell us who you are` → reopens the wizard at step 3
- FR: `Dites-nous qui vous êtes`

`buildVideo()` stays in the file for the no-`<dialog>` fallback (§9). The email form builder is
**moved**, not deleted — the wizard's step 3 is its new home, rebuilt per §19.4.

### 19.7 Step-3 copy, FR

| Key | String |
|---|---|
| `wizStep3of3` | `Étape 3 de 3` |
| `wizIdTitle` | `À qui parlons-nous?` |
| `wizIdBody` | `Quand vous nous envoyez un commentaire, il arrive sans nom. Si vous nous donnez votre prénom, nous saurons qu'il vient de vous, et nous pourrons revenir vers vous si nous avons une question. C'est entièrement à vous de décider et vous pouvez laisser le champ vide.` |
| `wizIdName` | `Votre prénom` |
| `wizIdEmail` | `Votre courriel, seulement si vous voulez que vos leçons vous suivent d'un appareil à l'autre` |
| `wizIdEmailHelp` | `Nous ne conservons jamais votre adresse courriel. Votre navigateur la brouille d'abord, ce qui permet de vous reconnaître sans que nous la voyions.` |
| `wizIdSave` | `Enregistrer et commencer à regarder` |
| `wizIdSkip` | `Passer et commencer à regarder` |
| `wizIdThanks` | `Merci, {name}. Vos commentaires nous arriveront avec votre nom.` |
| `wizTellUs` | `Dites-nous qui vous êtes` |

Accents present and correct. Same Edit-tool-only warning as §10 note 2.

---

## 20. Trust treatment applied to the wizard panel

Concrete changes, all flowing from §17.

### 20.1 The warm header band

```
.dcc-welcome-head {
  background: var(--color-accent-light);        /* #FDF3E3 light */
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-6) var(--space-8) var(--space-5);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
/* dark theme */
html[data-theme="dark"] .dcc-welcome-head { background: var(--color-surface-alt); }  /* #223349 */
```

Contains: the step line, the `<h2>` title, and the attribution line (§20.3). The body region below
stays `--color-surface`.

**Why amber and not more blue.** §17.3: Canada's own cyber-safety campaign carries warmth as its
accent, and DCC already owns `#FDF3E3`. It is the product's own token doing the "not bureaucratic"
work, at zero cost to authority. It also echoes the closing halo in the video, which quietly ties the
two surfaces together.

**Why the dark theme swaps to `--color-surface-alt` rather than the dark amber.** `--color-accent-light`
in dark theme is `#3A2F10`, and `--color-primary` on dark is `#7FB3E8`. That pairing computes to
roughly 5.5:1 — passing, but not comfortably, and it is a muddy brown band. `--color-surface-alt`
`#223349` is a cooler panel layer that reads as a header without the mud. **Verify both live; do not
take these numbers on trust.**

This is a horizontal band with a 1px bottom divider, not a coloured stripe down one side. Impeccable's
side-stripe ban is not engaged, and impeccable's product register explicitly permits *"a second
neutral layer for sidebars, toolbars, and panels."*

### 20.2 Typography

| Element | Before (Part One) | After | Why |
|---|---|---|---|
| Dialog `<h2>` | `--font-weight-semibold` 600 | **`--font-weight-bold` 700** | §17.4. At 24–28px against a full-bleed scrim, 600 reads soft. 700 reads as a title card. |
| Step line | 16px, regular, `--color-text-light` | 16px, **600**, `--color-accent-deep` on the light band | `#7A4A00` on `#FDF3E3` is 6.6:1 per the tokens header. Warmth plus definition, on the one element where it costs nothing. |
| Body prose | unchanged | unchanged | Merriweather 19px at 1.7 is already the right answer |
| Attribution | n/a | 16px, 600, `--color-primary` | §20.3 |

Everything continues to inherit from `html`, so the A− / A / A+ toggle still scales the whole dialog.
No hardcoded px font sizes anywhere.

### 20.3 The attribution line in the panel

At the bottom of the header band, one line:

- EN: `Digital Confidence Centre is a programme of Two Birds Innovation.`
- FR: `Le Centre de confiance numérique est un programme de Two Birds Innovation.`

Same canonical wording as the video (§18.2). **Text only — no logo image in the wizard.** Three
reasons, and they agree:

1. The Feathers Model forbids the master chevron in a sub-brand's header. A logo in a modal header is
   exactly that, and unlike the video watermark it is not something Aaron asked for.
2. §17.2: the words carry the credibility, not the glyph.
3. It costs nothing. Inlining SVG in `beta.js` would add weight to a file that loads on all 39
   module pages, for zero measured benefit. SIMPLICITY FIRST.

### 20.4 Legitimacy rewrite of `wizBody1`

Replaces the §4.1 string:

> **EN:** `You are one of the first people to see the Digital Confidence Centre, a free Canadian programme of plain-language lessons on staying safe online. There is nothing to set up and nothing to sign in to. We have a short welcome video, about 40 seconds, and then you can look around at your own pace.`

> **FR:** `Vous êtes parmi les premières personnes à voir le Centre de confiance numérique, un programme canadien gratuit de leçons en langage simple sur la sécurité en ligne. Il n'y a rien à configurer et aucun compte à créer. Nous avons une courte vidéo de bienvenue, environ 45 secondes, puis vous pourrez regarder à votre rythme.`

Stanford guideline 2 in one sentence: what it is, who it is for, that it is free and Canadian. No
permanence claim ("free" describes today, per the brand kit). No buzzwords.

### 20.5 Action row order — the correction

Part One §4 had primary-left. **That is wrong for a dialog.** NN/g's `OK-Cancel or Cancel-OK?` and
both major platform conventions agree that in a dialog the affirmative action sits farthest right
with the dismissive action to its left.

```
Desktop / >= 560px:   [ Skip ... ]  [ Watch the welcome video (40 seconds) ]   ← row right-aligned
Stacked / < 560px:    [ Watch the welcome video (40 seconds) ]                 ← primary on top
                      [ Skip ... ]
```

NN/g's actual bottom line is *"following platform conventions is more important than optimizing an
individual dialog box"* — so this is convention-following, not preference. Note the deliberate
divergence from §22.3, where the confidence quiz keeps primary-left because it is an inline form,
not a dialog. Different components, different correct answers, both defensible.

---

## 21. Two Birds chevron on the live site

Aaron asked for the master mark on the site itself, not only in the video. The Feathers Model already
specifies where it is allowed to go:

> Products carry their own identity end to end; the master appears only as the quiet footer line
> "A Two Birds product" (16 to 20px wordmark).

DCC's footer already carries the attribution **in words** (`index.html:255`): *"Digital Confidence
Centre is free to use, a community initiative by Two Birds Innovation, an Ontario company..."*

**So the compliant, no-exception-required change is: add the mark beside that existing footer line.**

| Property | Value |
|---|---|
| Asset | `C:\twobirds\two-birds-portfolio\assets\logos\two-birds\two-birds-logo.svg`, copied into `C:\twobirds\digital-confidence\assets\logos\two-birds-logo.svg` |
| Size | **20px** square (top of the Feathers Model's 16–20px band) |
| Placement | Inline, immediately before the existing footer attribution paragraph, vertically centred with the first line |
| Spacing | `margin-inline-end: var(--space-2)` |
| Colour | Full-colour V05, unmodified. No recolour, no shadow, no gradient — the DCC kit's logo rules forbid all three. |
| Alt | `aria-hidden="true"`, `role="presentation"` — the adjacent text already says "Two Birds Innovation", so an alt would double-announce |
| Header / hero | **Nothing. Ever.** The Feathers Model line is unambiguous. |

That is the whole change. It is deliberately small: the footer is the sanctioned position, and going
larger would require the same exception §18.5 already spends once.

---

## 22. Confidence quiz — `C:\twobirds\digital-confidence\js\confidence-quiz.js`

### 22.1 Read this before touching anything: the identity mechanism is already correct

The file's own header (lines 1–48) and `send()` (lines 131–156) already implement exactly what Aaron
was worried was missing:

- Readings go to the `dcc-beta-measurement` Worker, bound to its own D1 database, with a
  `cohort='beta'` CHECK constraint that makes a non-beta row physically impossible.
- **No name, no raw email, ever.** If the tester gave an email, the SHA-256 hash their own browser
  computed is attached so before/after readings pair across devices. If they skipped it, an opaque
  random per-device id (`dccv2-cid`, line 119–128) is used instead.
- A general anonymous visitor triggers no render, no storage, and no request (line 278).

**Do not rebuild, replace, or "improve" this.** Aaron's frustration is real but it is a UX and copy
problem: the interface never tells anyone that this is what is happening. The entire fix below is
layout, affordance, and words. `send()`, `clientId()`, `moduleId()`, the endpoint, and the payload
shape are untouched.

### 22.2 Skip button — currently invisible as a control

Line ~188: `.dcc-conf-skip{background:none;border:0;color:var(--color-text-link);text-decoration:underline;...}`

That renders as a plain underlined hyperlink sitting immediately beside a filled primary button. Two
failures at once: it does not read as a control, and an underlined blue string next to a button is a
classic mis-tap target for the exact audience this product serves.

**Fix: promote it to `.btn .btn-secondary`.** DCC's existing secondary button is
`background: var(--color-surface); color: var(--color-text-link); border: 2px solid var(--color-text-link)`
at 56px min-height. Same physical size as the primary, clearly lower visual weight through fill vs
outline. Delete the `.dcc-conf-skip` rule entirely rather than patching it; the component vocabulary
should be the site's, not a one-off (impeccable product ban: *"inconsistent component vocabulary"*).

This is the same call already made for the wizard's skip in §4.1, for the same reason. Consistency
between the two beta surfaces is itself part of the trust story.

### 22.3 Button placement — the researched answer, which is NOT what Aaron guessed

Aaron floated primary-on-the-right, then said *"correct me if wrong."* Correcting:

| Surface type | Correct primary position | Source |
|---|---|---|
| **Dialog / modal** | **Right**, dismissive to its left | NN/g `OK-Cancel or Cancel-OK?`; macOS and Android both put the affirmative action rightmost |
| **Inline form in a page** | **Left**, sorted primary-to-secondary left-to-right | Left-to-right reading order; the dominant web-form convention, including GOV.UK |

The confidence card is an **inline form inside the page**, not a dialog. So **primary stays on the
left, which is what the code already does** (lines 244–245: `saveBtn` then `skipBtn`). No change.

Aaron's instinct was right about dialogs — and it has been applied there, in §20.5, where Part One
had it backwards. Two components, two conventions, both now correct. Worth telling him in one line
so the apparent inconsistency reads as deliberate.

### 22.4 The scale — endpoint labels

Current: `.dcc-conf-ends` is a flex row with `justify-content: space-between` holding
`"1 Not at all confident"` and `"5 Very confident"` (lines 234–237). At narrow widths the two strings
collide and wrap raggedly, and neither sits under the button it describes.

Aaron suggested arrows or a number-line feel but explicitly deferred to research.

**The research says something better than either:** survey-methodology work is consistent that
**fully labelled scales produce more reliable data than endpoint-only labels** — *"label every point,
not just endpoints... fully labelled scales produce more reliable data"* — while also noting that
numeric scales answer faster and fit mobile better because there are no words to read. On a 5-point
scale, five short labels fit.

**Recommendation, which improves the instrument and not just the layout:**

```
[  1  ] [  2  ] [  3  ] [  4  ] [  5  ]
 Not     A       Fairly  Quite   Very
 at all  little           confident
```

Each number button gets its own short caption directly beneath it, inside the same grid column, so
every label is under the thing it labels and nothing can drift or collide.

| Property | Value |
|---|---|
| Structure | Replace `.dcc-conf-ends` entirely. Move each caption inside its `.dcc-conf-opt` as a `<span class="dcc-conf-optlabel">` below the numeral label. |
| Layout | `.dcc-conf-scale { display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-2); }` — a real 5-column grid, so the columns are equal and the captions align by construction rather than by flex chance. |
| Caption type | `--font-size-sm` (16px, the floor), `--color-text`, `text-align: center`, `line-height: 1.3`, `text-wrap: balance` |
| Below 400px | Captions `hidden` via a media query; the `aria-label` on each radio keeps the full text for screen readers. Five captions genuinely do not fit at 360px, and truncating them would be worse than showing numbers alone. |
| Accessible names | Each radio's `aria-label` becomes the full phrase, e.g. `3 out of 5, fairly confident`. Currently only options 1 and 5 get a word (line 227), so options 2–4 announce as bare numbers. This is a real accessibility improvement, not cosmetics. |
| Arrows | **No.** An arrow graphic under a rating scale adds a decorative element that conveys no state (impeccable product ban) and the balanced word labels communicate direction better. |

**Balanced anchors, deliberately.** Survey-design guidance warns that asymmetric label sets skew
responses toward the positive end. The proposed EN set (`Not at all / A little / Fairly / Quite /
Very`) is monotonic and balanced. Do not substitute anything with four positive words out of five.

| | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| EN | `Not at all` | `A little` | `Fairly` | `Quite` | `Very` |
| FR | `Pas du tout` | `Un peu` | `Assez` | `Plutôt` | `Très` |

Keep the existing `lo` / `hi` strings in `T` for the `aria-label` construction; add a `scaleWords`
array of five.

**FORK TWO, flagged:** moving from endpoint-only to fully-labelled changes the *instrument*, and
before/after readings taken under the old labelling are not strictly comparable with new ones. Given
this is beta, the cohort is small, and reliability improves, **make the change.** But note the
changeover date in `workers/dcc-beta-measurement/schema.sql` as a comment so a future analysis knows
where the seam is. If Aaron would rather freeze the instrument mid-beta, reverting to endpoint labels
is deleting the five captions and restoring `.dcc-conf-ends` — but centre it under the grid properly
rather than restoring the broken flex row.

### 22.5 Copy — "Save my answer" says nothing

Aaron's complaint decoded: a user has no idea whether this is saved, where, for whom, or tied to what
identity. He is right, and per §22.1 the honest answer is a good one that simply was never said.

| Key | Current | New (EN) |
|---|---|---|
| `save` | `Save my answer` | `Send my answer` |
| `why` | `One question. There is no right answer. It helps us measure whether the lessons actually help.` | `One question, and there is no right answer. Your answer is sent to us without your name on it, tied only to a random code for this device, so we can see whether the lessons actually help. You can skip it.` |
| `savedBefore` | `Thank you. Your answer is saved. We will ask again at the end.` | `Thank you. Your answer has been sent, without your name. We will ask you again at the end of the lesson.` |
| `savedAfter` | `Thank you. Your answer is saved.` | `Thank you. Your answer has been sent, without your name.` |
| `skip` | `Skip this question` | `Skip this question` (unchanged, already clear) |

| Key | New (FR) |
|---|---|
| `save` | `Envoyer ma réponse` |
| `why` | `Une seule question, et il n'y a pas de bonne réponse. Votre réponse nous est envoyée sans votre nom, liée seulement à un code aléatoire pour cet appareil, afin de voir si les leçons aident vraiment. Vous pouvez passer.` |
| `savedBefore` | `Merci. Votre réponse a été envoyée, sans votre nom. Nous vous reposerons la question à la fin de la leçon.` |
| `savedAfter` | `Merci. Votre réponse a été envoyée, sans votre nom.` |

**"Send" not "Save".** "Save" implies a local, private, revisable act. What actually happens is a POST
to a Worker. Under Stanford guideline 4 and DCC's own honesty posture, the verb should describe the
real event. This is the same class of correction as the fake-timestamp rule: a label that reads
reassuring but describes the wrong action is worse than a blunt one.

**"a random code for this device"** is the plain-language rendering of `dccv2-cid`. It is accurate
(random, per-device, opaque, not derived from the person), it is short, and it pre-empts exactly the
question Aaron was asking on the user's behalf. It is deliberately consistent in register with the
wizard's step-3 email helper line (§19.4) — the two components now tell one coherent story about what
is and is not collected.

### 22.6 Also fix while in there, because it is one line

`.dcc-conf-opt input:focus-visible + label{outline:3px solid var(--color-accent);...}` (line 184) uses
`--color-accent` `#E0A63A`, which the tokens file marks **decorative only**. The focus-ring token is
`--focus-ring-color` (`#8A5A00` light, `#E0A63A` dark), chosen for 3:1 against both surfaces and the
Trust Blue. Use `var(--focus-ring-color)` and `var(--focus-ring-width)`. In dark mode the value is
identical, so nothing visibly changes there; in light mode it becomes compliant.

This is inside the component being edited and is a WCAG 2.2 SC 2.4.13 correctness fix, so it is in
scope rather than an unrelated improvement.

---

## 23. Margaret — build it, ship it disabled

Aaron asked for Margaret placed somewhere appropriate for beta. Here is the honest state of that art
and the call.

### 23.1 What actually exists

`C:\twobirds\digital-confidence\_image-registry\characters\margaret\2026-07-27\margaret-reference-sheet-gemini-flash.png`

It is a **contact sheet**, not a production asset: multiple poses, a hands study, five expression
busts, and a colour swatch strip in one PNG. Its own README records two baked-in defects:

1. Label text reads **"Pontrait"** instead of "Portrait".
2. A stray, meaningless scale bar (`0 5 10 m`) in the bottom-left.

The README's own status line: *"Working reference art. Approved for internal/product use... **pending
Aaron's final say on any customer-facing placement.** Not yet wired into any live asset."*

And the DCC brand kit: *"Final art needs Aaron's DESIGN GATE sign-off."*

### 23.2 The call

**Build the placement. Ship it switched off.**

Putting unapproved character art with a visible typo onto the first screen a beta tester sees, while
the person who owns that decision is asleep, is the specific class of judgment CLAUDE.md reserves for
Aaron (*"requires taste or strategy judgment (design approval)"*), and the DESIGN GATE is a filed
requirement, not a preference. But leaving it entirely undone wastes the window.

So:

| Step | Action |
|---|---|
| 1 | Crop **one** expression bust — the "warm neutral" one — out of the reference sheet. The stray scale bar and the "Pontrait" label are in different regions of the sheet, so a clean crop of a single bust excludes both. **Verify by eye that the crop contains neither defect.** |
| 2 | Save as `C:\twobirds\digital-confidence\assets\characters\margaret-welcome.png`, max 320px wide, then a `.webp` alongside if tooling allows. |
| 3 | Place in the wizard's **step 1 only**, inside the warm header band, 96px, left of the title, `border-radius: var(--radius-pill)`, `aria-hidden="true"` (she is decorative; the heading already carries the meaning). Nowhere else. Not in the video. Not on the public site. |
| 4 | Gate it on a single constant at the top of `beta.js`: `var SHOW_MARGARET = false;` with a comment giving the exact file path and the one-word change. |
| 5 | Verify the wizard looks correct and balanced **both** with the flag on and off. The `false` state must not leave a gap. |

Aaron flips one word after looking at it for ten seconds, instead of waiting for a sprint. If the
crop cannot be produced cleanly with the image tooling available on this machine (per the CLAUDE.md
tooling gotchas, there is no cairosvg or ImageMagick here — check what Python/PIL can do before
committing to it), **skip steps 1–3 entirely and say so.** Do not ship a bad crop, and do not spend
the night building a rasterization pipeline for a decorative portrait.

**Why step 1 of the wizard and nowhere else.** It is beta-gated, seen once, dismissible, and entirely
reversible. If Aaron dislikes her there, nothing on the public product ever showed her. Any other
placement — the video, the module pages, the landing hero — is either irreversible without a
re-render or visible to non-beta visitors.

---

## 24. Consolidated verification additions

These are **added to** the 14 checks in §13.

| # | Check |
|---|---|
| 15 | Both re-rendered MP4s still measure 39.1s (EN) and 43.3s (FR) by `ffprobe`. Any drift means the audio changed and must be investigated before shipping. |
| 16 | Scene-1 frame shows the watermark; scenes 2–7 do not. Confirm by extracting a frame from each scene. |
| 17 | The attribution line is legible at phone size against the watermark, both languages. Screenshot it. |
| 18 | Poster frames were generated from the **new** cut and show the watermark. |
| 19 | Wizard step 3: enter a name, save, submit a feedback item, and confirm the `/feedback` row arrives prefixed `[Beta tester: <name>]`. **This is the check that proves Aaron's actual ask is met** — do not mark this build done without it. |
| 20 | Confirm the `/confidence` payload is byte-identical to before (no name, hash-or-cid only). Diff it. |
| 21 | Confidence quiz: five captions align under their numbers at 768px and 1280px; captions hide cleanly below 400px; every radio's accessible name reads correctly in a screen reader. |
| 22 | Skip button on the quiz renders as an outlined button, not a link, in both themes. |
| 23 | Footer mark renders at 20px, does not disturb the footer line's baseline, and is absent from the header. |
| 24 | `SHOW_MARGARET = false` produces a wizard with no gap or misalignment. |
| 25 | FR wizard at 360px: no overflow on any of the three steps. FR strings are the longest in the build. |
| 26 | Every accented FR character renders correctly (not `Ã©`). If any are mangled, a PowerShell write happened somewhere. |

---

## 25. Sources

Research consulted for §17–§22, live 2026-07-28.

- [Stanford Guidelines for Web Credibility](https://credibility.stanford.edu/guidelines/index.html) — the 10 guidelines; "people quickly evaluate a site by visual design alone"
- [Stanford Web Credibility Project](https://en.wikipedia.org/wiki/Stanford_Web_Credibility_Project) — study scale and the visual-design-outranks-content finding
- [A Picture is Worth a Thousand Words: Source Credibility Theory Applied to Logo and Website Design](https://www.tandfonline.com/doi/abs/10.1080/10447318.2013.839899) — *International Journal of Human-Computer Interaction* 30(1); logos communicating expertise and trustworthiness trigger positive site-credibility judgments
- [Research Study: How Logo Designs Impact Brand Trust](https://www.surveymonkey.com/curiosity/brand-trust-logo-design-research-study/) — simplicity, authenticity and alignment over prominence; the 34% and 68% figures
- [Get Cyber Safe](https://www.getcybersafe.gc.ca/) — Government of Canada digital-literacy campaign; accent `#de4b20` confirmed live via `curl`
- [GOV.UK Design System](https://design-system.service.gov.uk/) and [Introducing the GOV.UK Design System](https://gds.blog.gov.uk/2018/06/22/introducing-the-gov-uk-design-system/) — task-based research into what users need in order to trust an approach
- [UX Design for Seniors (Ages 65 and older) — NN/g](https://www.nngroup.com/reports/senior-citizens-on-the-web/)
- [Design Principles to Accommodate Older Adults (PMC4777049)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4777049/) — progressive disclosure, feedback and confirmation, cognitive load
- [UX Design for Older Adults: Building Digital Confidence](https://www.aufaitux.com/blog/ux-design-older-adults-digital-confidence/) — visual cues, predictability, perceived safety
- [OK-Cancel or Cancel-OK? The Trouble With Buttons — NN/g](https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/) — platform convention outranks local optimization; dialog action order
- [Buttons on the web: placement and order](https://uxdesign.cc/buttons-placement-and-order-bb1c4abadfcb) — inline-form primary-to-secondary left-to-right
- [Title Cards vs. Watermarks in Videos: Does it Matter?](https://www.spincreativegroup.com/title-cards-vs-watermarks-in-videos-does-it-matter) — the distinction, and the "too large it could be obtrusive" sizing guidance
- [Microcopy for Beta Invites and Early Access Pages](https://uicontent.co/microcopy-for-beta-invites-and-early-access-pages/) — clarity over hype; "if it sounds like a press release, rework it"
- [How to Get and Manage Beta Feedback](https://featureupvote.com/blog/managing-feedback-from-beta-testers/) — minimum friction, one-sentence minimum
- [Designing Likert scales — TASO](https://taso.org.uk/libraryitem/designing-likert-scales/) and [Likert Scales: Designing Rating Questions That Produce Reliable Data](https://www.papersurvey.io/blog/likert-scales-designing-rating-questions) — fully-labelled scales beat endpoint-only; balanced anchors; mobile fit

Internal sources: `PRODUCT.md`, `css/tokens.css`, `css/core.css`, `js/beta.js`, `js/confidence-quiz.js`,
`feedback-widget.js`, `workers/dcc-data/worker.js`, `workers/dcc-beta-measurement/worker.js` + `schema.sql`,
`_feedback/poc/dcc-beta-welcome-render-v2.html`, `_feedback/poc/renders/DCC-BETA-WELCOME-PRODUCTION-NOTES.md`,
`_image-registry/characters/margaret/2026-07-27/README.md`,
`C:\twobirds\two-birds-portfolio\hal-stack\brand\guidelines\two-birds-master.md`,
`C:\twobirds\two-birds-portfolio\hal-stack\brand\guidelines\dcc-adult.md`,
`C:\twobirds\two-birds-portfolio\.claude\skills\impeccable\SKILL.md` + `reference/product.md` + `reference/animate.md`.

---
---

# PART THREE — site header identity, Canadian trust badge, read-aloud voice

*Added 2026-07-28, third batch of live feedback. Same research basis as Part Two.*

---

## 26. DCC logo in the site header

### 26.1 What exists

`C:\twobirds\digital-confidence\index.html` line ~33 currently:

```html
<a class="brand" href="index.html">Digital Confidence Centre</a>
```

Text only. `.brand` (`css/core.css:97-104`) is already built for a mark: it is
`display: inline-flex; align-items: center; gap: var(--space-2)` at 23px bold with a 44px min-height.
**A logo can be dropped in with no CSS restructuring at all** — the gap and alignment are already there.

Assets in the old build at `C:\twobirds\digital-confidence\classic\assets\logos\dcc\`:

| File | Content |
|---|---|
| `dcc-logo.svg` (957 B) | V07 heart-in-lightbulb, white strokes on a **`#00897B` teal** rounded-square plate |
| `dcc-dark-on-transparent.svg` (751 B) | Same paths, no plate, hardcoded **`#004D40`** deep teal |
| `dcc-white-on-transparent.svg` (751 B) | Same paths, no plate, white |
| `dcc-favicon.ico`, `dcc-1024.png`, `dcc-og.png` | raster derivatives |

The V07 heart-bulb is the correct mark: the DCC brand kit names it explicitly
(*"V07 heart-bulb brand mark; V01 shield-and-checkmark as favicon"*). So this is an adaptation job,
not a new-mark job. Aaron is right that something real should go in tonight.

### 26.2 The problem with using any of them as-is

The v2 site runs **Trust Blue** (`--color-primary: #1D4E89`). All three SVGs are hardcoded teal or
white:

- `dcc-logo.svg` puts a `#00897B` teal square inside a Trust Blue header. Palette clash, and it is
  the loudest object in the header.
- `dcc-dark-on-transparent.svg` at `#004D40` reads near-black-green at 32px, and against dark mode's
  `--color-surface` `#1A2430` it is effectively invisible. **Dark mode is where this breaks**, and
  PRODUCT.md principle 3 says test dark first.
- `dcc-white-on-transparent.svg` is invisible in light mode.

Three fixed-colour files, one of which is wrong in every theme.

### 26.3 The fix: one inline `currentColor` mark

Create `C:\twobirds\digital-confidence\assets\logos\dcc-mark.svg` from the transparent variant's
paths, with **every `#004D40` replaced by `currentColor`** and the `width`/`height` attributes
dropped (keep the `viewBox`).

Then inline it in the `.brand` anchor on every page, before the text:

```html
<a class="brand" href="index.html">
  <svg class="brand-mark" viewBox="0 0 1024 1024" aria-hidden="true" focusable="false"> ... </svg>
  Digital Confidence Centre
</a>
```

```css
.brand-mark { width: 32px; height: 32px; flex: 0 0 auto; }
```

| Decision | Value | Why |
|---|---|---|
| Colour | `currentColor`, inheriting `.brand`'s `--color-primary` | One file, correct in light (`#1D4E89`) and dark (`#7FB3E8`) with zero extra CSS, and it tracks any future token change automatically |
| Size | **32px** | The DCC brand kit's own stated floor: *"minimum 32px digital"*. The header's 72px `--nav-height` has room; 32px next to 23px text is a correct optical ratio. |
| Plate | **None** | A filled rounded square in a sticky header competes with the wordmark and reintroduces the palette clash. The stroked glyph is quieter and it is the same mark. |
| Inline vs `<img>` | **Inline** | `currentColor` and theme-following only work inline. It also avoids a render-blocking request on a sticky header. It is ~600 bytes. |
| Accessibility | `aria-hidden="true" focusable="false"` | The anchor's own text already reads "Digital Confidence Centre". An alt would double-announce. |
| Clear space | `gap: var(--space-2)` (8px) already on `.brand` | The kit asks for 25% of logo width = 8px at 32px. Already exactly right. |

**Files to edit:** every page with a `.site-header`. Do this with a scripted, byte-safe replacement of
the exact `<a class="brand" ...>` string, **not** PowerShell `Get-Content`/`Set-Content` (CLAUDE.md
Windows text-editing rule: it will corrupt the em dashes and accents across 40+ HTML files). Use
Python with explicit UTF-8, or the Edit tool. Verify one file's bytes before running the batch.

### 26.4 Brand-kit deviation, named

The kit says of the DCC logo: *"On teal or white backgrounds only... No shadows, gradients, or
recolours."*

Rendering the mark in `currentColor` is technically a recolour. It is the right call anyway, and here
is the reasoning rather than a silent override:

1. That rule is written for the **lockup as a placed asset** (a logo dropped on a partner page, a
   print header). This is a monochrome UI glyph in the product's own chrome, which is standard
   practice and the only form that survives a light/dark theme toggle.
2. The kit is already out of sync with what shipped: it lists DCC's palette as **Warm Hearth teal
   `#2A7B6F`**, but `css/tokens.css` has been **Trust Blue `#1D4E89`** since the 2026-07-03 Fable
   pass. Following the kit's colour rule literally would mean placing a teal mark into a blue system
   the kit does not yet describe.
3. The alternative genuinely fails: the fixed-colour variants are invisible in one theme or the other.

**Action:** add one line to the DCC-adult brand kit's Logo section recording the header-glyph
exception and noting that the kit's colour section needs reconciling with the shipped Trust Blue
tokens. Do not silently diverge; do not block on it either.

---

## 27. Canadian trust badge in the header

### 27.1 The filed constraint Aaron's phrasing runs into

He asked for a **pulsing** maple leaf. The DCC brand kit's motion rule:

> Minimal motion (vestibular safety). No autoplay of anything. Micro-transitions 150 to 250ms max;
> **`prefers-reduced-motion` honoured at token level.**

And the Two Birds master kit: *"Interface motion: **nothing loops**, reduced-motion respected."*

A perpetually pulsing element in a **sticky** header loops forever, in peripheral vision, on every
page, for an audience selected for low vision and low digital confidence. That is a filed-rule
violation and an actual accessibility problem, not a technicality.

**It is also not what makes it feel alive.** The thing Aaron is reaching for is a moment of life, and
a one-time entrance delivers that. A loop stops being noticed within about four seconds and then just
sits there costing attention forever.

### 27.2 The call: one-time entrance, then still

| Property | Value |
|---|---|
| Motion | Leaf `opacity 0 → 1` and `scale(0.86) → 1` **once on page load**, `--motion-duration-3` (320ms), `--motion-ease`, `120ms` delay so it lands just after the header paints |
| Loop | **None.** No `animation-iteration-count: infinite` anywhere in this component. |
| Hover / focus | `scale(1.06)` over `--motion-duration-1` (120ms) on the whole badge. Optional, cheap, conveys interactivity if it is a link. |
| Reduced motion | `tokens.css` already zeroes the durations, so it appears instantly and fully. **Verify the leaf is visible at full opacity in that state** — it must not depend on the animation to become visible (impeccable: *"Reveal animations must enhance an already-visible default"*). Set the end state as the base and animate *from* a starting class, or use `@keyframes` with `animation-fill-mode: both` on an element whose CSS default is already visible. |

If Aaron looks at it in the morning and specifically wants a loop, that is his call to make knowingly
against two filed rules. One sentence to him, not a section.

### 27.3 Icon plus word, never icon alone

This codebase already has the answer, filed in a comment in `css/core.css` directly above
`.secure-badge`:

> `/* Padlock secure badge (CDC/FTC pattern) — icon ALWAYS paired with text */`

The header already carries `<span class="secure-badge">🔒 Secure connection</span>` on that pattern.
The maple leaf follows it exactly. It also matches §17.2: the word does the credibility work, the
glyph carries the feeling.

```html
<span class="ca-badge">
  <svg class="ca-leaf" viewBox="0 0 512 512" aria-hidden="true" focusable="false">…</svg>
  Canadian
</span>
```

| | EN | FR |
|---|---|---|
| Label | `Canadian` | `Canadien` |

**The claim is true and already made elsewhere**, so this adds no new assertion: the footer says
*"a community initiative by Two Birds Innovation, an Ontario company"*, and the brand kit lists
`"Made in Ontario"` among DCC's intended trust signals. Do not upgrade the wording to anything
stronger ("Government of Canada", "official", "certified") — none of that is true and Stanford
guideline 1 (verify accuracy) is the whole point of the exercise.

### 27.4 Visual spec

| Property | Value |
|---|---|
| Leaf size | 20px square |
| Leaf colour (light) | `#C8102E` — approx 6.0:1 on `--color-surface` `#FFFFFF` |
| Leaf colour (dark) | `#FF6B5E` — approx 4.8:1 on `--color-surface` `#1A2430` |
| Token | Declare as `--dcc-leaf-red`, scoped in the same place as the wizard's scrim token. **Do not use `--color-error`** — it is a semantic state token and a red flag glyph borrowing it would be genuinely confusing in a product that teaches people to read warning signals. |
| Label type | `--font-heading`, `--font-size-sm` (16px), `--color-text-light`, weight 600 |
| Layout | `display: inline-flex; align-items: center; gap: var(--space-2)` |
| Placement | In `.site-header .container`, immediately **after** `.secure-badge`. Two small trust cues sitting together read as a deliberate trust row; split apart they read as clutter. |
| Interactivity | **Static span, not a link.** It makes a claim; it does not go anywhere. A link here would need a destination, and the honest destination (the footer paragraph) is already on the page. |
| Contrast basis | WCAG 2.2 SC 1.4.11 (non-text contrast, 3:1) for the glyph; the label is real text and clears 4.5:1 via `--color-text-light` |

**Mobile:** the header already `flex-wrap`s. At narrow widths, verify the badge wraps as a unit and
does not orphan the word onto its own line. If the header gets crowded below 400px, hide the
**label** and keep the leaf with an `aria-label="Canadian"` on the span — the reverse of the desktop
rule, and the only acceptable place to drop the word.

### 27.5 The icon itself, and the acceptance test

Source the 11-point maple leaf path from the **Flag of Canada** SVG (public domain; the national flag
is not under copyright). Save it locally as
`C:\twobirds\digital-confidence\assets\icons\maple-leaf.svg` with `fill="currentColor"`. Do not
hand-author the coordinates and do not fetch it at runtime.

**Acceptance test, and it is not optional:** render it at 20px and look at it. A simplified or badly
traced maple leaf at small size reads as a generic star, a snowflake, or — the real failure mode — a
cannabis leaf. **If it does not read unmistakably as a maple leaf at 20px, ship the word `Canadian`
on its own and file the icon as a follow-up.** The word alone still delivers the trust signal per
§17.2. A bad glyph on a product for seniors about online safety is worse than no glyph.

### 27.6 What this is not

No flag emoji (🇨🇦): it renders differently on every platform, cannot be coloured or sized reliably,
and is absent entirely on some Windows configurations. No full flag rectangle: a two-bar flag at
20px is mush. No gradient, no shadow, no glow. No badge shape or pill around it — that would make it
look like a certification mark, which would be a false claim.

---

## 28. Read-aloud voice quality

### 28.1 What is actually there

`C:\twobirds\digital-confidence\js\dcc.js` lines 202–262. It is real, live, and better built than
the ask implies:

- Web Speech API, reading block by block through `<main>`, wrapping words in spans for a
  light-bolding read-along indicator, restoring original HTML after each block.
- Rate control (`0.6 / 0.85 / 1.25`), remembered in `dccv2-read-rate`.
- Deliberately tuned for hard-of-hearing listeners: lower pitch for consonant clarity, slower base
  rate, no highlight colour, no auto-scroll, no motion.
- A voice-scoring heuristic (lines 238–257): `en-CA` exact +40, any `en` +20, name matching
  `/natural|neural|online/` +10, `localService` +3.

The voice it gets is whatever the **visitor's own device** exposes. That is the entire gap between it
and the welcome video's `en-US-AvaMultilingualNeural`.

### 28.2 Why option (a) is not an 8-hour job, with the arithmetic

Pre-rendering read-aloud audio means, per language:

- 29 to 39 module pages, plus the landing page, `about`, `for-families`, `support-directory`, FAQ.
- The reader walks **every block inside `<main>`** — headings, paragraphs, list items, quiz options,
  callouts. A single module is realistically 40 to 90 blocks.
- Call it 35 pages × 60 blocks × 2 languages ≈ **4,200 audio files**, plus a per-page manifest, plus
  a build step, plus hosting them in a repo that is served from GitHub Pages.

Then the parts that are harder than the file count:

1. **Sync.** The existing read-along bolds the current *word*. `speechSynthesis` fires a `boundary`
   event per word for free; a pre-rendered MP3 does not. Word-level highlighting from static audio
   needs per-word timing data, which means either forced alignment or a word-timestamp-capable TTS
   path. **Losing the read-along indicator would be a net downgrade** for the hard-of-hearing
   listeners it was built for.
2. **Content drift, and this is the one that matters.** Every future copy edit silently orphans its
   audio file. The page then reads text that does not match what the visitor hears, with no error and
   no warning. That is the same failure class as the CLAUDE.md fake-timestamp rule: a surface that
   looks authoritative while being quietly wrong. A product whose content is actively being edited
   during beta is the worst possible candidate for frozen narration.
3. Repo weight, cache behaviour, and a new build gate on every content change.

This is a multi-sprint architectural commitment, not an overnight task. Starting it tonight
guarantees it is half-finished by morning.

### 28.3 Recommendation: (b) tonight, properly. (a) filed, honestly scoped.

**Tonight — improve the heuristic. Ship it clean.**

The current scorer has three fixable weaknesses:

| Weakness | Fix |
|---|---|
| `/natural\|neural\|online/` is worth only **+10**, less than the +20 for any generic English voice. A device with `Microsoft David` (`en-US`, robotic, ancient) and `Microsoft Sonia Online (Natural)` (`en-GB`, genuinely good) can pick David. | Raise the naturalness bonus to **+25**, above the generic-language bonus. Quality should outrank a near-miss locale. Keep exact `en-CA` at +40 so a real Canadian neural voice still wins outright. |
| `localService` +3 favours the offline legacy voices, which are exactly the robotic ones. Microsoft's good neural voices are `localService: false`. | Drop the bonus to **+1**, or remove it. It is currently acting against voice quality. Keep a note: it exists for network-stutter resilience, which is a real but lesser concern than the voice being unpleasant. |
| Named-voice knowledge is unused. Current Windows/Edge commonly expose `Microsoft Clara Online (Natural) - English (Canada)` — **the same Clara family** as the `en-CA-ClaraNeural` this project already evaluated. On macOS/iOS the good ones are `Samantha`, `Ava`, `Siri`; the French-Canadian one is `Amélie`. | Add an explicit **preferred-name list**, checked first, worth **+50**. `Clara` (en-CA neural) is the single best available match to what Aaron asked for, and it is already the project's own vetted Canadian voice. FR list: `Sylvie` (fr-CA neural), then `Amélie`. |

Ordering after the change: a named preferred voice wins; then a natural/neural `en-CA`; then any
`en-CA`; then a natural/neural English; then anything English. Graceful all the way down, and on a
device with nothing good it behaves exactly as it does today.

**Why Clara and not Ava.** `VOICE-TEST-2026-07-27.md` settled the Clara-vs-Ava question **for the
welcome video specifically**, choosing Ava for naturalness and accepting an American accent on a
39-second one-off. Read-aloud is the opposite case: it is the everyday voice of a Canadian-branded
product for Canadian seniors, running for many minutes across many pages, and the same document
records that *"the audience is 65+ Canadians, who tend to notice an American voice on a Canadian-branded
service."* Over hours of listening, the accent mismatch compounds and the naturalness gap does not.
**`Clara` for read-aloud, `Ava` for the video, on purpose.** That is a deliberate split, not an
inconsistency, and it should be written into the code comment so nobody "harmonises" it later.

**Honest limits, to be stated to Aaron in one line and not buried:** this improves the *odds* of a
good voice. It cannot guarantee an Ava-quality voice on a device that does not have one. An old
Android tablet or a stripped-down Linux browser will still sound robotic, and nothing short of
option (a) changes that.

**Also worth doing tonight, 20 minutes:** the picker currently never tells the listener what it
chose. Add the selected voice name, quietly, next to the Read aloud control
(`--font-size-sm`, `--color-text-light`), e.g. `Reading with: Clara (Canadian)`. It costs nothing,
it is honest about a system whose quality genuinely varies by device, and it is the same
tell-the-user-what-is-happening correction being applied to the confidence quiz in §22.5 and the
identification step in §19.4. One coherent posture across all three.

**File as a follow-on backlog item, scoped honestly:**

> **S-DCC-READALOUD-PRERENDER** — pre-rendered `en-CA-ClaraNeural` / `fr-CA-SylvieNeural` narration
> for read-aloud. Est. multi-sprint. **Blockers to solve before any build:** (1) word-level timing
> data to preserve the existing read-along indicator; (2) a content-drift guard so an edited
> paragraph cannot keep playing stale audio; (3) repo/hosting weight for roughly 4,000 files.
> **Recommended first slice if it proceeds:** the beta-cohort modules only, EN only, with the
> drift guard built first, not last.

Per the CLAUDE.md orphan-backlog rule, file this to Notion rather than leaving it in this document.

### 28.4 Files touched tonight

`C:\twobirds\digital-confidence\js\dcc.js`, function `pickVoice()` (lines ~238–257) and the read-aloud
control markup for the voice-name line. Nothing else. Do not touch the rate control, the block
walker, the span wrapping, or the pitch setting — they were tuned deliberately for hard-of-hearing
listeners and are not part of this complaint.

---

## 29. Final build order for the overnight pass

Sequenced so nothing blocks on anything later, and so a stall at any point still leaves a coherent site.

| # | Task | § | Risk if skipped |
|---|---|---|---|
| 1 | Header DCC mark (`currentColor` inline SVG, 32px) | §26 | Low. Visible win, ~30 min. |
| 2 | Canadian trust badge | §27 | Low. Gated on the 20px legibility test. |
| 3 | Read-aloud voice heuristic + voice-name line | §28.3 | Low, self-contained, one file. |
| 4 | Confidence quiz: skip button, 5-column scale, copy, focus ring | §22 | Medium. Touches a live beta instrument; note the changeover date. |
| 5 | Footer Two Birds mark | §21 | Low. |
| 6 | Video template: watermark + attribution, re-render, ffprobe, poster frames | §18 | **Do this before the wizard** — the wizard's step 2 needs the posters. |
| 7 | Wizard: dialog, 3 steps, motion, focus, localStorage | §3–§9, §18–§20 | The main build. |
| 8 | Identification wiring: `getName()`, feedback prefix, banner cleanup | §19 | **Check 19 in §24 is the proof Aaron's actual ask is met.** |
| 9 | Margaret crop behind `SHOW_MARGARET = false` | §23 | Skip entirely if the crop is not clean. |
| 10 | PRODUCT.md scope note, brand-kit exception lines, Notion backlog item | §1, §18.5, §26.4, §28.3 | Do not skip. These are the honesty ledger for three named deviations. |
| 11 | Verification sweep, all 26 checks, screenshots | §13, §24 | A sprint is not Done without it. |

**If the window runs short, cut from the bottom: 9, then 6+7's polish, never 8, 10, or 11.**
