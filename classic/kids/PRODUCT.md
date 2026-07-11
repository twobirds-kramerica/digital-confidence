# DCC Kids — Product Definition

**Product:** Digital Confidence Centre — Kids (ages 4–15, caregiver-led digital literacy)
**Repo:** `C:\twobirds\digital-confidence` · path `kids/`
**Status:** Three cohorts content-complete (4-6, 7-9, 10-12). 13-15 planned.
**Last updated:** 2026-06-13 (rewards system added — 7-9 pilot)

## Who it's for
Children ages 4–15, **facilitated by a caregiver, parent, or library children's-program staff** — never a solo-child product. Most activities need no screens. Delivered free at digital-confidence.ca and white-labelled to libraries.

## Non-negotiables (inherited + cohort-specific)
- **Static HTML/CSS/JS only**, GitHub Pages project site. No backend, no accounts, no npm. (FIVE NON-NEGOTIABLE RULES #1.)
- **No authentication / universal public access** (ADR-0004). Any account model would need a new ADR superseding it + a Vera privacy review.
- **No data collection / nothing leaves the device.** Progress and rewards are `localStorage`-only.
- Canadian English. Self-hosted SIL OFL fonts (Merriweather + Source Sans 3).
- Per-cohort design — what works for 4-6 is not what works for 10-12 (SME: Dr. Lena).

## Rewards & Incentive System (2026-06-13)
Sovereign, offline-first reward layer. Engine + UI: `kids/rewards.js`; styles: `kids/rewards.css`.
- **Tier 1 — micro-rewards:** one badge per module, earned at the reflection/activity step (not on page arrival), stored in `localStorage`. Cumulative, never lost; no streaks, no countdowns, no leaderboards.
- **Tier 2 — milestone certificate:** unlocked when all of a cohort's badges are earned; printable + downloadable PNG, generated on-device. Optional local-only child-name field (never transmitted).
- **Family synopsis + adult-as-participant** mode, both local-only.
- **Build order:** 7-9 (pilot, shipped) → 4-6 → 10-12. The engine, hub, and certificate are cohort-agnostic; retrofitting a cohort = populating its badge set in `rewards.js`.
- **Deferred (NOT built):** parent-linked accounts / notifications. Requires a backend, a new ADR superseding ADR-0004, and a Vera parental-consent review. See `quality/dcc-kids-rewards-shape-brief.md` (two-birds-portfolio) and SME review 005.

## Design-gate references
- Shape brief: `two-birds-portfolio/quality/dcc-kids-rewards-shape-brief.md`
- SME advisory: `two-birds-portfolio/hal-stack/personas/review-log/2026-06-13-sme-review-005-kids-rewards.md`
- /impeccable: DCC full-site audit ran 2026-06-08 (`two-birds-portfolio/quality/impeccable-audit-2026-06-08.md`).
