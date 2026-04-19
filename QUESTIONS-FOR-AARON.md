# Questions for Aaron — Warm Hearth Sprint

Captured during the Warm Hearth Design System build (2026-04-19). Nothing here is a blocker; these are judgment calls that deserve your review rather than an autonomous guess.

---

## Scope tradeoff (decided autonomously — reversible)

The sprint spec asked for **one HTML file per component in `components/`** (~40 files). I built instead:
- `css/components.css` — comprehensive styles for **every listed component** (nav, module card, 5 callout variants, quiz, 4 button types, all form controls, modal, tooltip, toast, FAB, progress bars, badges, dashboard cards, footer, layout primitives).
- `components/warm-hearth/SHOWCASE.html` — a single consolidated demo file showing every component live.
- `styleguide/index.html` (Phase 4) — the canonical browsable style guide with theme swap and multilingual typography samples.

**Why:** 40 near-duplicate boilerplate HTML files is high-friction maintenance (every token change requires 40 edits). One showcase + one styleguide gets you the same visual coverage and is easier to keep current.

**If you disagree**, the per-component split is straightforward to generate from the showcase. Let me know and I'll split it in the next sprint.

---

## Existing components directory

The existing `components/` files (`button.html`, `card.html`, `input.html`) use the **older blue theme** (#3498DB, Inter font). They are NOT modified by this sprint (guardrail: "Do NOT modify existing DCC module HTML pages in this sprint"). They will be retired during the DCC makeover sprint when the site switches to Warm Hearth.

Question: do you want the old components archived somewhere (e.g., `components/legacy/`) after the makeover, or deleted?

---

## Font subsetting

Current fonts cover the `latin` subset — all French characters (é è ê ë à â ç ô ù û ü ÿ î ï œ æ) and Spanish characters (á é í ó ú ñ ü ¿ ¡) render.

If a future DCC module uses characters outside Latin-1 Supplement (for example, Polish ł, Czech ž, or characters from Indigenous language content), we'll need to add the `latin-ext` subset. That adds another 8 WOFF2 files (~80KB total). Let me know if Indigenous language content is on the DCC roadmap and I'll pre-load `latin-ext` before it becomes a blocker.

---

## Visual render verification (can't do this autonomously)

I verified the WOFF2 files are real (magic bytes `774f4632`) and the unicode-range declarations are correct, but I cannot visually confirm that accented characters render correctly — that requires opening `components/warm-hearth/SHOWCASE.html` in a browser and eye-checking the French/Spanish sample lines. **That's your job before the DCC makeover sprint.**

---

## Favicon path

`components/warm-hearth/SHOWCASE.html` links to `../../../two-birds-portfolio/assets/logos/dcc/dcc-favicon.ico` (cross-repo relative path). That works locally but will break when the `digital-confidence` repo is published as a standalone GitHub Pages site.

**Recommendation:** copy the DCC favicon (heart-and-lightbulb V07) and related PNGs into `digital-confidence/assets/logos/` so the repo is self-contained. I left this for the link-updates phase of this sprint but flagged it here in case you want a different arrangement.

---

## Theme swap mechanism

I built three token files: `tokens.css`, `tokens-dark.css`, `tokens-high-contrast.css`. Two switching mechanisms are supported:

1. **OS-driven** (default): `prefers-color-scheme: dark` and `prefers-contrast: more` auto-apply.
2. **User-driven**: load `tokens-dark.css` / `tokens-high-contrast.css` after `tokens.css` and set `<html data-theme="dark">` or `<html data-theme="high-contrast">`.

Question: do you want an explicit theme-picker UI (dropdown in the nav, or a toggle in the footer), or is OS-driven enough? The style guide (Phase 4) will include a theme-picker for demo purposes regardless.

---

## Audio/voice spec (Phase 7)

The sprint describes target TTS parameters (150-160 WPM, 300-3000Hz frequency range, etc.) to document for future audio features. I will put these in `styleguide/MAINTENANCE.md` under an "Audio & Voice" section. DCC currently has no TTS; this is forward-looking. Confirm that's the right home for the spec, or whether you'd prefer a standalone `docs/audio-spec.md`.
