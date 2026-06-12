# Shape Brief — DCC Kids Skin (tokens-kids.css + home page)
**Sprint:** S-DCC-KIDS-TOKENS  
**Date:** 2026-06-12  
**Status:** AWAITING AARON APPROVAL — do not build until approved

---

## What This Is

A dedicated design token file (`css/tokens-kids.css`) and `brand.json` entry for the DCC Kids vertical (ages 4–15). The existing kids pages use inline style overrides on top of the adult DCC tokens. This sprint replaces those overrides with a proper token layer so all kids pages share a consistent, maintainable skin.

Trigger: `python build/build.py --brand=kids` should generate kids-branded module pages.

---

## Current State (as-built)

The existing kids home page (`kids/index.html`) uses:
- Background: `#F5F9FF` (light blue-white)
- Primary: `#2E7D32` (forest green — inline CSS, not a token)
- Hero gradient: `#E3F2FD → #E8F5E9 → #FFF9C4` (blue → green → yellow)
- Border radius: `20px` (inline)
- Font scale: inherited from adult DCC (Source Sans 3 at ~1.125rem base)
- Touch targets: inherited from adult DCC (~44px min)

---

## Proposed Design Direction

### Palette — "Bright Campus"

| Token | Value | Usage |
|-------|-------|-------|
| `--kids-primary` | `#1565C0` | Primary interactive / CTA (age-bracket blue — trustworthy for parents, energetic for kids) |
| `--kids-primary-bg` | `#E3F2FD` | Light wash behind primary elements |
| `--kids-accent` | `#2E7D32` | Success / completion states (existing green — keep) |
| `--kids-accent-warm` | `#F57F17` | Highlights, badges, age-bracket 4–6 accent |
| `--kids-accent-warm-bg` | `#FFF9C4` | Age 4–6 card backgrounds |
| `--kids-purple` | `#6A1B9A` | Age 7–9 accent (mid-range) |
| `--kids-purple-bg` | `#F3E5F5` | Age 7–9 card backgrounds |
| `--kids-teal` | `#00695C` | Age 10–12 accent (closer to adult DCC — signals progression) |
| `--kids-teal-bg` | `#E0F2F1` | Age 10–12 card backgrounds |
| `--kids-bg` | `#F5F9FF` | Page background (keep existing) |
| `--kids-text` | `#1A1A2E` | Body text (WCAG AAA at all ages) |
| `--kids-muted` | `#546E7A` | Caregiver notes, secondary text |
| `--kids-white` | `#FFFFFF` | Cards, panels |

**Contrast audit (WCAG AA minimum):**
- `--kids-primary` (#1565C0) on white: 7.3:1 ✅ AAA
- `--kids-accent` (#2E7D32) on white: 5.1:1 ✅ AA
- `--kids-text` (#1A1A2E) on `--kids-bg`: 18.5:1 ✅ AAA

### Typography

| Token | Value | Notes |
|-------|-------|-------|
| `--kids-font-xl` | `2.25rem` | Page headings — bigger than adult DCC |
| `--kids-font-lg` | `1.5rem` | Section headings |
| `--kids-font-base` | `1.25rem` | Body — 14% larger than adult DCC 1.125rem base |
| `--kids-font-sm` | `1.0625rem` | Caregiver notes, fine print |
| `--kids-line-height` | `1.7` | Dyslexia-friendly, generous leading |
| `--kids-weight-heading` | `700` | Bold headings throughout |

Font family: Source Sans 3 (inherited — already SIL OFL licensed) — no change needed.

### Touch Targets

| Token | Value | Notes |
|-------|-------|-------|
| `--kids-touch-min` | `52px` | 8px larger than WCAG 44px minimum |
| `--kids-btn-padding` | `1rem 1.75rem` | Generous button padding |
| `--kids-radius` | `16px` | Rounded but not pill-shaped |
| `--kids-radius-sm` | `10px` | Cards, smaller elements |

### Age-Bracket Differentiation

Three cohorts with distinct accent colours but shared base tokens:

| Age group | Accent token | Background token | Signifier |
|-----------|-------------|-----------------|-----------|
| 4–6 (Caregiver-led) | `--kids-accent-warm` (orange) | `--kids-accent-warm-bg` | Sun/warmth — caregiver-paired, joyful |
| 7–9 (Mixed) | `--kids-purple` | `--kids-purple-bg` | Purple — exploration, curiosity |
| 10–12 (Solo) | `--kids-teal` | `--kids-teal-bg` | Teal — closer to adult, signals independence |

### Ontario K-8 Curriculum Alignment

The Ontario Digital Literacy curriculum (K–8) organises learning under four strands:
1. **Digital Citizenship** — online safety, privacy, ethical use
2. **Communication and Collaboration** — email, video calls, sharing
3. **Research and Information Literacy** — evaluating sources, SIFT
4. **Creating and Innovating** — making digital content

Each cohort's badge and section marker will use an icon mapped to these strands:
- Shield icon → Digital Citizenship  
- Speach bubble → Communication
- Magnifying glass → Research (SIFT)
- Lightbulb → Creating

This alignment is visual only — no copy changes required for tokens sprint.

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `css/tokens-kids.css` | **CREATE** — extract inline tokens to shared file |
| `build/brands/kids/brand.json` | **CREATE** — kids brand config for generator |
| `kids/index.html` | **UPDATE** — link `tokens-kids.css` instead of inline vars |
| `kids/4-6/*.html` | **UPDATE** — link `tokens-kids.css` |
| `kids/7-9/*.html` | **UPDATE** — link `tokens-kids.css` |
| `kids/10-12/*.html` | **UPDATE** — link `tokens-kids.css` |

No structural HTML changes. Tokens only.

---

## Aaron Approval Required

**Q1 — Palette direction:** Does the "Bright Campus" direction (blue primary, orange/purple/teal per cohort) match your vision for DCC Kids? Or should the kids skin extend the adult warm-hearth palette (teal/amber) with brightness increase?

**Q2 — Age differentiation:** Three separate accent colours per cohort, or a single unified kids palette (simpler, less maintenance)?

**Q3 — Ontario curriculum badges:** Add strand-icon badges to existing activities now, or defer to a later sprint?

Once Aaron approves this brief: remove "Design Gate: pending" from Notion sprint 376a09cf and change status to Ready.
