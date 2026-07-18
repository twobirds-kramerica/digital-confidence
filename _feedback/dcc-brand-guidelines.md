# DCC Brand Guidelines (canonical) — v0.1 DRAFT for Aaron review

**Purpose:** the single source of truth any person or model MUST read before generating DCC scripts, videos, images, styling, or character work. Created by the S-DCC-VIDEO-SYSTEM foundation sprint, 2026-07-17. Consolidates the scattered direction in `C:\twobirds\digital-confidence\_feedback\aaron-dcc-feedback-2026-07-17.md`, `C:\twobirds\digital-confidence\_feedback\dcc-video-system-spec-2026-07-17.md`, and `C:\twobirds\digital-confidence\_feedback\dcc-onboarding-and-measurement-2026-07-17.md`.

> **STATUS: DRAFT — DESIGN GATE not yet cleared.** This is spec/direction for Aaron's review, not an approved brand. Visual/character design decisions here are DIRECTION (what each element must convey), not final art — final design goes through the DESIGN GATE with Aaron's taste sign-off. Exact colour/type token VALUES must be pulled from `C:\twobirds\digital-confidence` DESIGN-SYSTEM tokens (do not fabricate hex values here).

---

## 1. Brand essence

DCC (Digital Confidence Centre) helps Canadians — starting with adults/seniors — build genuine confidence with everyday technology, calmly and without judgement. The brand feeling: **a patient, respected friend who is good with tech and never makes you feel foolish.**

**Three words:** Calm. Capable. Dignified.

## 2. Tone rules (bind ALL copy, scripts, voiceover)

- **Helpful, serious, warm — with light, human touches. Never goofy.** (Aaron explicitly rejected Monty-Python / South-Park gag energy.)
- No hype, no drums, no exclamation-heavy excitement. No corporate jargon.
- No condescension. The learner is competent and cautious, never foolish or "behind."
- Permission-giving: skipping, pausing, and taking your time are always okay and always stated.
- Plain Canadian English. Canadian French of equal quality and dignity (never a lesser afterthought).

## 3. Hard rules (non-negotiable — a violation is a brand/legal failure)

1. **IP / likeness:** ORIGINAL characters only. No real people (celebrities), no copyrighted/trademarked characters (e.g. Golden Girls, South Park). Right-of-publicity + copyright risk is unacceptable for a public, grant-funded product. When in doubt, use a plain generic original character.
2. **Accuracy:** any scam/safety/how-to content must be factually correct — no invented threats, no fabricated statistics, no fake short-codes or links. Same standard as the modules.
3. **Bilingual dignity:** every learner-facing video ships EN + Canadian French, both human-reviewed. A clumsy or machine-literal FR line to this audience is a trust landmine.
4. **Accessibility:** captions + transcript always; anything shown on screen is also spoken; calm pacing; high contrast (per WCAG + DCC tokens). The product must model the accessibility it teaches.
5. **No data collection without ADR:** DCC is no-auth / no-data-collection (ADR-0004). Any assessment/measurement runs local-only (localStorage), anonymous aggregate only, unless a new ADR supersedes 0004.

## 4. Visual system (direction — pull exact values from DESIGN-SYSTEM tokens)

- Colour: the calm DCC palette (blues/neutrals) per DESIGN-SYSTEM tokens. Video backgrounds: calm blue/black, no busy motion. **Never** black text on the darker-blue banners (contrast fail — a live bug flagged 2026-07-17).
- Type: DCC system font stack per tokens. Large, legible, generous spacing.
- Motif: the etched character family (below) + simple, non-dating iconography. Avoid screen-recordings of the live UI in evergreen video (UI changes date the video — Aaron's staleness rule).

## 5. Character family (briefs — direction, not final art)

One original "etched" illustration style across three age tiers, so the cast reads as ONE family with clear age cues. Characters are recurring and consistent across every video (consistency IS the brand). Each is emotive: can look worried at a phone, uncertain, then calm/reassured. Dignified always.

**Adult / Senior tier (primary — e.g. "Margaret"):**
- ~65–75, warm, everyday Canadian. Competent and cautious, never foolish.
- Role: anchors DCC Adults videos (see pilot 01, `C:\twobirds\digital-confidence\_feedback\dcc-video-pilot-01-scam-text-script.md`).
- Age cues: etched style, natural senior features, everyday clothing. No stereotype "frail/confused" tropes.

**Teen tier:**
- Same etched style, teen build/face. Age cue: subtle contemporary marker (e.g. sunglasses pushed up, casual layer). Bandana = optional, low priority (Aaron unsure).
- Role: DCC youth/teen content (later).

**Kid tier:**
- Same etched style, younger proportions. Age cue: e.g. ballcap or ponytail — a light, junior touch, still calm/serious-friendly, not cartoonish-silly.
- Role: DCC Kids content (later; kids get more colour/playfulness at the layout level, not by making the character goofy).

**Storage:** master reference art + this brief live as versioned brand artifacts in-repo once designed. Every generation seeds from the locked master reference so the character never drifts.

## 6. Script formula (introductory / trailer tier)

Hook ("Did you know…" / "Have you ever had a moment where…") → reassure (you're not alone, this is learnable, no judgement) → "what you'll learn" in one plain sentence → one concrete beat from the module → soft close into the module. Character reacts along the way (worry → uncertainty → calm decision → reassured). ~60–120s.

## 7. Reinforcement + onboarding (per onboarding spec)

- Intro/tutorial video: airline-safety-briefing model — states its length, gives permission to skip/pause, "pick your device or that's okay," calm. Do NOT show dating UI.
- Reinforcement videos: ~10s, skippable, "you completed X, here's what you learned."
- Separate audience cuts: Adults, Practitioner/Parent/Family, Kids (later).

## 8. GOVERNANCE — forced-read gate (Aaron's rule, binding)

Any model/agent generating DCC scripts, videos, images, styling, or content MUST:
1. **Read THIS file first, every run** — plus the target module's content JSON — before producing anything. No skipping.
2. **Archive every asset** (script, storyboard, art, voiceover, render) under a dated/versioned path so any run is reproducible and re-grabbable. Never a one-off in chat.
3. **Human gates:** Canadian-French review + scam/safety-content accuracy review before any render ships.
This clause is a candidate for a DCC PRODUCT.md anti-reference section + a CLAUDE.md-adjacent rule.

## 9. Open (Aaron review)
- Approve the three-word essence (Calm / Capable / Dignified) + tone rules.
- Approve the character-family direction (Margaret as adult anchor; teen/kid age cues).
- Confirm exact DESIGN-SYSTEM token values to inline here.
- Then: DESIGN GATE for the actual character art.
