# Two Birds Visual Intelligence Pipeline
# Version 1.0 | 2026-03-15

---

## Purpose

This pipeline governs all image and visual asset work across Two Birds projects.
No image is applied to a live site without passing through this process.
No exceptions.

---

## The Four-Stage Process

### Stage 1 — Brief
Before generating any image, document:
- What the image needs to communicate (not just look like)
- Who will see it (audience)
- Where it will live (hero, card, icon, background)
- What emotion or trust signal it must create
- Any existing visual context (colours, fonts, tone)

### Stage 2 — Generate
Use image-prompt-engine.md to build a precise ImageFX prompt.
Generate a minimum of 3 candidate images per slot.
Save all candidates — do not discard until approved alternative exists.

### Stage 3 — Review
Place all candidates into preview.html.
Present to Aaron for review before applying anything.
Do not assume approval. Wait for explicit "approved" or "use this one."

### Stage 4 — Apply
Move approved image to /approved/ folder.
Apply to live site only after file is in /approved/.
Log the decision: what was chosen and why.

---

## Folder Structure

```
_visual-pipeline/
├── VISUAL-PIPELINE.md       ← This file. Process rules.
├── image-prompt-engine.md   ← Prompt generation guide
├── _VISUAL-STANDARDS.md     ← Brand standards per project
├── preview.html             ← Candidate review tool
└── approved/                ← Approved assets only
    └── .gitkeep
```

---

## Rules

1. Never apply an image directly from a URL to a live page
2. Never use placeholder images without Aaron's explicit approval
3. Always run through Stage 1 Brief before generating
4. Always wait for Stage 3 approval before Stage 4 apply
5. If in doubt, surface it — do not decide unilaterally

---

## Integration with CLAUDE.md

This pipeline is referenced in CLAUDE.md under "Image Change Protocol."
The rule there is a hard rule. This document is the operating procedure behind it.
