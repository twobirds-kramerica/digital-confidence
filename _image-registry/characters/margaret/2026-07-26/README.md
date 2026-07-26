# Margaret Doyle — Master Reference Sheet — 2026-07-26 registry entry

**Status: PROPOSAL STAGING — NO ART GENERATED YET. DESIGN GATE not cleared.**

## What this folder is

The dated, versioned registry slot for Margaret Doyle's master reference sheet, per
`C:\twobirds\digital-confidence\_feedback\dcc-character-art-briefs.md` section 0
(archive rule: every sheet, prompt, seed, and approved master is committed under
`_image-registry/characters/<name>/YYYY-MM-DD/`).

Margaret is generated FIRST and alone. Per the art briefs' own hard gate (section 0,
step 2): "Margaret's sheet goes to Aaron FIRST. Nothing else is generated until her
sheet is approved. She sets the family look every other character must match."

## Why there is no image file here yet

The 2026-07-26 overnight branding sprint (branding-suite-overnight-prompt.md) ran in a
Claude Code session with NO image-generation capability connected: no Nano Banana /
Gemini image tool, no text-to-image MCP, and no image-gen skill backed by a real tool.
Rather than fabricate a placeholder or claim success, this folder stages everything
needed so the actual generation run is a single paste into Google AI Pro (Nano Banana
Pro), which is the ADR-0036-approved paid exception for exactly this DCC video/cast lane.

## Contents

- `generation-prompt.md` — the exact, ready-to-run prompts (three style-intensity
  variants, per art-briefs section 13.1) assembled verbatim from the briefs' Style DNA
  plus Margaret's full character brief.
- When generation runs: save the output image(s) here as
  `margaret-sheet-v1-lighter.png`, `margaret-sheet-v1-baseline.png`,
  `margaret-sheet-v1-denser.png` (4K, warm-white `#FAFAF8` background), plus a
  `seeds.md` noting model, date, and any seed values.

## Approval flow

1. Aaron reviews the three variants and picks the etched-warmth level (or requests edits).
2. Edits: change the relevant lines in `_feedback/dcc-character-art-briefs.md`
   (section 2 for Margaret) and re-run the prompt. No sprint re-run needed.
3. On approval: the chosen sheet is pinned as the master here, and only then may the
   other eight characters be generated (each seeding from her approved sheet + the briefs).

All art in this lane is PROPOSAL art awaiting Aaron's DESIGN GATE sign-off. Nothing
here is final or approved.
