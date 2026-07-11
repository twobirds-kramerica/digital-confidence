# DCC Warm Hearth — Maintenance &amp; Governance

How to keep the design system alive, tested, and honest.

---

## Adding a new component

1. **Copy the closest existing pattern** from `css/components.css`. Components are grouped by category; add the new block under the matching category header.
2. **Use tokens only.** If a new value is needed (e.g. a new colour), add it to `css/tokens.css` first and let every theme file (`tokens-dark.css`, `tokens-high-contrast.css`) override it. Never hard-code.
3. **Add a live example** to:
   - `components/warm-hearth/SHOWCASE.html` (quick reference)
   - `styleguide/index.html` (canonical style guide)
4. **Run the accessibility checklist** below before committing.
5. **Commit** with a descriptive message: `feat(components): <name> — <one-line intent>`.

## Swapping themes

Three theme files ship with the library. Load them after `tokens.css`:

```html
<!-- default Warm Hearth -->
<link rel="stylesheet" href="css/tokens.css">

<!-- optional additional layers -->
<link rel="stylesheet" href="css/tokens-dark.css">            <!-- auto on prefers-color-scheme: dark -->
<link rel="stylesheet" href="css/tokens-high-contrast.css">   <!-- auto on prefers-contrast: more -->
```

User-driven override:
```js
document.documentElement.setAttribute('data-theme', 'dark');           // or 'high-contrast' / 'light'
```

## Creating a white-label variant for a B2B partner

1. Copy `css/tokens-alt.css` to `css/tokens-<partner-slug>.css` (e.g. `tokens-stthomaspublib.css`).
2. Fill in partner colours. Verify every text/background pair at WCAG AA (4.5:1 for body, 3:1 for large).
3. Swap the partner's logo and favicon in the consuming HTML.
4. Add a row to the partner registry at the bottom of this file.
5. Run the accessibility checklist with the partner theme active.

## Image & photography guidelines

- **Warm, not stock.** Real Canadian settings: kitchens, library branches, community centres, church basements.
- **Diverse, not performative.** Visible Indigenous, Black, and South Asian seniors, mixed-gender, mixed-ability, across rural and urban Canadian contexts. Not tokenised — central.
- **Activity-first, not technology-first.** Show grandparents video-calling grandchildren, not "senior-smiling-at-tablet." The task matters, not the gadget.
- **No shaming frames.** Avoid images of confused or frustrated seniors staring at screens. Frame learning as capability, not deficit.
- **Real settings over studio.** Kitchen tables, backyards, library tables, cafés, community centres. Studio + stock-smile is banned.
- **Alt text is not optional.** Every image has meaningful alt text. Decorative-only images use `alt=""`.

## Freshness rules

- **Style guide review — quarterly** (Jan, Apr, Jul, Oct). Walk through `styleguide/index.html`. Confirm every token still matches brand, every component still renders, every sample loads.
- **Link check — monthly.** Run a broken-link scan across the repo. Fix any 404s in `components/`, `styleguide/`, and partner pages.
- **Axe-core scan — on every push.** The existing `?qa=true` overlay runs axe-core; extend to run on `styleguide/index.html` + `styleguide/motion.html` + every `components/warm-hearth/*.html`.

## Accessibility testing checklist (run before every release)

- [ ] **Automated scan:** axe-core via `?qa=true` on styleguide and representative module pages. Zero critical issues.
- [ ] **Keyboard-only:** Tab through every page start to finish. No trap, logical order, every interactive element reachable, focus ring visible.
- [ ] **Screen reader:** NVDA on Windows or VoiceOver on macOS. Headings announce in order. Lists announce item count. Form controls announce their labels.
- [ ] **200% zoom:** Browser zoom to 200%. No horizontal scroll on desktop. No content clipped.
- [ ] **High contrast:** OS high contrast ON. Every border visible, every text/bg pair readable.
- [ ] **Reduced motion:** OS "Reduce motion" ON. No movement. Elements still reach end state.
- [ ] **Text size toggle:** A- / A / A+ all render without overflow or clipping at every breakpoint.
- [ ] **Colour-only check:** Convert a screenshot to greyscale. Every state (success/error/warning/info) still distinguishable by icon + text, not colour alone.
- [ ] **Touch target:** Every interactive element ≥ 44x44px. Default DCC is 56x56px.
- [ ] **Language attributes:** `<html lang="...">` correct, inline-language blocks have `lang="..."` on the wrapping element.

## Audio & Voice spec (forward-looking)

DCC has no text-to-speech today. When TTS is added (future sprint), these parameters are the spec:

- **Rate:** 150–160 words per minute (slower than the typical 180 WPM default).
- **Pitch:** Moderate. Avoid high-pitched synthetic voices — they are harder for hearing-impaired seniors.
- **Frequency range:** Stay within 300–3000 Hz. This is the band most preserved in age-related hearing loss.
- **Background:** Zero music or ambient sound behind spoken content.
- **Volume:** If any TTS is provided, include independent volume + mute controls separate from the system volume.
- **Voice selection:** Offer English + French + Spanish voices. Canadian English / Canadian French preferred.
- **Transcripts:** Every audio clip must have a matching text transcript below or alongside it.

## Font licensing

- **Merriweather** (body serif) — SIL OFL v1.1. Free for commercial use, modification, redistribution. No royalty.
- **Source Sans 3** (heading sans) — SIL OFL v1.1. Same terms.
- Full licence text: `fonts/LICENSE-OFL.txt`.
- Upstream repos: [SorkinType/Merriweather](https://github.com/SorkinType/Merriweather), [adobe-fonts/source-sans](https://github.com/adobe-fonts/source-sans).
- Files in `fonts/merriweather/` and `fonts/source-sans-3/` were redistributed via `@fontsource` on jsdelivr. Unmodified binaries.
- **Key rule from OFL:** fonts cannot be sold by themselves. DCC bundles them with the site, which is permitted.

## Partner registry

| Partner | Slug | Tokens file | Theme notes |
|---------|------|-------------|-------------|
| _(empty — first partner adds their row here)_ | | | |

## File map

```
digital-confidence/
├── css/
│   ├── tokens.css                    ← default Warm Hearth skin
│   ├── tokens-dark.css               ← dark skin (auto + manual)
│   ├── tokens-high-contrast.css      ← WCAG-AAA skin (auto + manual)
│   ├── tokens-alt.css                ← white-label template
│   ├── fonts.css                     ← @font-face declarations
│   └── components.css                ← component styles (bones)
├── fonts/
│   ├── LICENSE-OFL.txt
│   ├── merriweather/*.woff2          ← 4 weights × 1 subset
│   └── source-sans-3/*.woff2         ← 4 weights × 1 subset
├── components/
│   └── warm-hearth/
│       ├── README.md
│       └── SHOWCASE.html             ← all components on one page
└── styleguide/
    ├── index.html                    ← canonical browsable style guide
    ├── motion.html                   ← interaction / animation spec
    ├── COMPETITIVE-AUDIT.md          ← 5-platform benchmark
    └── MAINTENANCE.md                ← this file
```
