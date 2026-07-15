# AGENTS.md — Digital Confidence Centre

This file governs **every** automated/agent run in this repository. Read it
before changing anything. It is the single source of truth for what we are
building, who it is for, how it must look and behave, and what "done" means.
If this file and a task instruction disagree, follow this file unless the human
(Aaron) explicitly overrides it.

> Companion docs: `PRODUCT.md` (audience & voice), `DESIGN-SYSTEM.md` (token &
> component decisions), `_audit/ui-ux-ia-audit-2026-06-18.md` (current-state
> audit), `styleguide/SENIOR-ACCESSIBLE-RESEARCH-2026.md` (design research).

---

## Product

The **Digital Confidence Centre (DCC)** is a free, bilingual (English / French)
digital-literacy platform. It teaches Canadian seniors to use phones, tablets,
and the internet safely and confidently, and it gives the libraries, nonprofits,
and settlement agencies who serve them ready-to-run, no-cost material. ~30
self-paced modules cover device basics, scam protection, online banking, video
calling, AI literacy, and Canadian government services (CRA, Service Canada,
provincial benefits). No account, no tracking, no cost.

## Target users

1. **Primary — older adults (65+/70+).** Low digital confidence, often anxious,
   reading with glasses, on an iPad/iPhone/Android tablet, frequently in dark
   mode, frequently interrupted, returning over weeks. Many are "not behind —
   just getting started."
2. **Caregivers (adult children 40–60)** setting up a device for a parent.
3. **Community organisations** — library facilitators running 90-minute group
   sessions, nonprofit and settlement-agency staff. They need print-ready,
   plain-language, no-login material.

Success = a 70-year-old who was afraid of their phone can recognise a scam,
video-call family, and check a government account without phoning their kids.

## Design principles (in priority order)

1. **Anxiety first.** The first message on any screen reassures before it
   instructs. Never use "wrong / failed / incorrect / error" as user-facing
   feedback — use "let's try again", "not quite — here's a hint", "good try".
2. **One thing per screen.** No competing calls to action; navigation recedes.
3. **Dark mode is not an afterthought.** Test it first. All text passes AA in
   both light and dark.
4. **Floating elements earn their place.** Nothing hovers over readable content.
5. **Always a way back.** Every page has an obvious Home link.
6. **Plain language, Canadian English.** Short sentences (≤20 words), one idea
   each. centre/colour/recognise, never -ize. Action verbs on every button.
7. **Token-driven, never ad-hoc.** No hardcoded hex/px in page markup — use the
   design tokens.

## Tech stack & hard constraints

- **Static only.** Flat HTML/CSS/JS served from GitHub Pages + Cloudflare. No
  Node server, no npm build step, no backend, no framework, no bundler.
- **Progressive enhancement.** HTML works without JS; CSS and JS are additive.
- **Forms → Formspree** (`https://formspree.io/f/xeerqryj`), with Web3Forms as a
  silent fallback. **Never** call the GitHub Issues API from the browser (no
  CORS). LocalStorage is an offline queue only, never the primary submit path.
- **Styling pipeline (load order):**
  `main.css → tokens.css → tokens-dark.css → fonts.css → components.css →
  accessibility.css → mobile.css → dcc-core.css`.
  - `css/tokens.css` — single source of truth for colour/type/spacing/etc.
  - `css/tokens-dark.css`, `css/tokens-high-contrast.css` — theme overrides
    (same variable names).
  - `css/components.css` — structural "bones", token-only.
  - `css/dcc-core.css` — production refinement layer (loaded last). Put new
    cross-page UI here, token-driven, prefixed `.dcc-`.
- **Self-hosted fonts:** Merriweather (body) + Source Sans 3 (headings), SIL OFL.
- **Do not change module learning content** (lesson copy/quizzes). UI, layout,
  and form logic only, unless explicitly told otherwise.
- **Preserve JS hooks:** `.font-size-btn`, `.theme-toggle-btn`, `.menu-btn`,
  `.sidebar`, `.module-card[data-module]`, `[data-en]/[data-fr]`, and the
  homepage data IDs (`#whats-new-cards`, `#sotm-*`, `#dcc-news-list`). Restyle
  with classes; never rename hooks.

## Accessibility bar (must hold)

- **WCAG 2.2 AA** on all new/changed UI (AODA Ontario requires 2.2 AA by 2027).
- Body text ≥ 18px (DCC base is 19px); fully usable at 200% zoom / 320px reflow.
- Touch targets ≥ 44px (DCC default 56px for primary actions).
- Focus always visible: `--focus-ring` (3px `--color-accent-strong`, 2px offset).
- **Never** use `--color-accent` (`#E8842C`) as a text or button background —
  white-on-it is 2.7:1. Use `--color-accent-strong` (`#A85410`, 5.33:1).
- No italics, no justified text, no centre-aligned prose. Left-align.
- Respect `prefers-reduced-motion` (tokens zero the durations).
- Close buttons: plain `✕ Close` text button, top-right — never a red circle.

### Checking contrast (run before committing colour changes)
```bash
python3 - <<'PY'
def lin(c):
    c/=255; return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def L(h):
    h=h.lstrip('#'); r,g,b=int(h[0:2],16),int(h[2:4],16),int(h[4:6],16)
    return .2126*lin(r)+.7152*lin(g)+.0722*lin(b)
def ratio(a,b):
    la,lb=L(a),L(b); hi,lo=max(la,lb),min(la,lb); return round((hi+.05)/(lo+.05),2)
print(ratio('#FFFFFF','#A85410'))  # must be >= 4.5 for body, >= 3 for large/UI
PY
```

## Localisation

- Canadian English everywhere (Centre, Colour, Labour, recognise, behaviour).
- When French is unavailable, expose the link and add `(English only)` (FR
  side: `(en anglais seulement)`) — never hide it. Infer language from
  `navigator.language`; no language-selector field on forms.
- **v2 bilingual pattern (2026-07-11):** separate generated French pages, not
  the classic dual-DOM `[data-en]/[data-fr]` (that pattern remains only in
  `/classic/`). A module JSON in `build/content/modules-v2/` may carry a
  top-level `"fr"` object mirroring the translatable fields; the build then
  renders `modules/<slug>-fr.html` with a French shell (string table in
  `build/build.py` `FR_SHELL_REPLACEMENTS`, asserted against the template) and
  `hreflang` alternates. Hand-authored French pages live in `fr/`
  (`index`, `about`, `privacy`, `terms`). Every v2 page shows a header
  language link (`.lang-link`): EN pages link to the FR sibling when it
  exists, otherwise to `fr/index.html`. French brand name: «Centre de
  confiance numérique».
- Default city: St. Thomas, Ontario; Ontario-specific resources where relevant.

### French coverage status (v2)

| Surface | French status |
| --- | --- |
| Homepage (`fr/index.html`) | ✅ Full French (2026-07-11) |
| About / Privacy / Terms (`fr/*.html`) | ✅ Full French (2026-07-11) |
| FAQ, Glossary, Disclaimer, For families, Support directory, Scam helper | ❌ English only — header link goes to `fr/index.html`, listed as «(en anglais seulement)» |
| `module-1` (La sortie de secours) | ✅ `modules/module-1-fr.html` |
| `module-6` (Services bancaires et transactions) | ✅ `modules/module-6-fr.html` |
| `module-27-inbox-spam` (Maîtrisez votre boîte de réception) | ✅ `modules/module-27-inbox-spam-fr.html` |
| Remaining 31 modules | ❌ Not yet translated — add an `"fr"` block to each JSON and rebuild |

## Workflow

- Branch from `main` as `cursor/<descriptive-name>`; commit per logical change
  with `feat(dcc): / fix(dcc): / chore(dcc):` messages; open a PR (draft by
  default). Do not force-push, amend, or merge unless told to.
- Keep changes non-destructive: preserve SEO `<head>`, schema JSON-LD, canonical
  /hreflang links, and existing navigation links.

## What "done" looks like

A change is done when **all** of these hold:

- [ ] Renders correctly in light **and** dark mode, and at 200% zoom / 320px.
- [ ] All text, buttons, focus states meet WCAG 2.2 AA contrast (verified).
- [ ] No hardcoded hex/px in the page — only tokens / token-driven classes.
- [ ] Touch targets ≥ 44px; primary actions ≥ 56px; focus ring visible.
- [ ] Plain Canadian English; reassuring, non-blaming microcopy; action-verb buttons.
- [ ] Keyboard-operable; semantic headings (no skipped levels); ARIA on icon-only controls.
- [ ] No new external dependency, no build step, no backend call from the browser.
- [ ] JS hooks and IDs preserved; existing links and SEO intact.
- [ ] EN/FR parity (or `(English only)` noted); Formspree submit path works.
- [ ] Committed with a clear message; PR opened/updated.

### Module design-system migration status

Tracks which module pages have been moved onto the shared token/`dcc-core.css`
layer (inline styles removed, hardcoded hex/px replaced with token-driven
classes, AA contrast verified). Tick a module only when it loads
`css/dcc-core.css` and carries no presentational inline styles.

**Batch 1 — first 10 modules:**

- [x] `module-1.html` — Mastering the Escape Hatch
- [x] `module-2.html` — The Security Shield
- [x] `module-3.html` — Passwords & Biometrics
- [x] `module-4.html` — App Store Safety
- [x] `module-5.html` — Email & Messages
- [x] `module-6.html` — Banking & Transactions
- [x] `module-7.html` — Photos & Memories
- [x] `module-8.html` — Stay Connected
- [x] `module-9.html` — Understanding AI
- [x] `module-10.html` — Grocery & Food Delivery

**Batch 2 (this PR) — modules 11–20:**

- [x] `module-11.html` — Ride-Sharing Apps
- [x] `module-12.html` — Getting the Help You Deserve
- [x] `module-13.html` — Understanding Social Media
- [x] `module-14.html` — Smart Home Basics
- [x] `module-15.html` — Telehealth & Medical Portals
- [x] `module-16-travel-safety.html` — Staying Safe When You Travel
- [x] `module-17-ai-research.html` — Using AI for Research
- [x] `module-18-staying-connected.html` — Staying Connected When It Matters Most
- [x] `module-19-digital-legacy.html` — Your Digital Life: Keeping It Safe and Organised
- [x] `module-20-internet-plan.html` — Understanding Your Internet Plan

> Note: as in batch 1, only presentational inline `style=` attributes were
> removed. Page-embedded `<style>` blocks (still present on several of these
> pages, e.g. module-12/14/15) were left intact and remain future work — they
> already reference `var(--color-primary, …)` so the off-token hex values are
> dead fallbacks, not live colours.

**Pending (future batches):** `module-21`–`module-27` and the named modules
(`module-ai-literacy`, `module-fact-check`, `module-visual-ai`, etc.) have not
yet been migrated.

**Batch 3 (DCC v4) — final modules 21–27 + named adult modules:**

- [x] `module-21-mobile-plan.html` — Understanding Your Mobile Plan
- [x] `module-22-tv-home-phone.html` — TV, Home Phone & Bundles
- [x] `module-23-online-marketplace.html` — Online Marketplaces
- [x] `module-24-communication.html` — Communication Apps
- [x] `module-25-outage-detection.html` — Spotting an Outage
- [x] `module-26-notifications.html` — Notifications & Alerts
- [x] `module-27-inbox-spam.html` — Inbox & Spam
- [x] `module-ai-literacy.html` — What Is AI, Really?
- [x] `module-ai-health.html` — AI & Your Health
- [x] `module-fact-check.html` — Fact-Checking with AI
- [x] `module-visual-ai.html` — Using Your Camera to Learn Anything
- [x] `scam-simulator.html` — Scam Simulator (interactive)

**New senior module (2026-07-15):** `module-30-why-the-feed-keeps-you-scrolling.html`
— "Why the Feed Keeps You Scrolling" (Digital wellbeing / Everyday confidence
group). Born token-native on the v2 shell via `build/content/modules-v2/
module-30-why-the-feed-keeps-you-scrolling.json` → `build/build.py
--brand=trust-blue --output=modules`. Covers infinite scroll, variable-reward
(slot-machine) design, and the outrage/doom-feed loop; core skill is noticing
how you feel *after* a feed, not how long you were on. Wired into the
`everyday-confidence` cards in `index.html` + `sitemap.xml`. QA: axe-core 0
critical/serious in light + dark, quiz + checklist verified, no 375px reflow.

**Still pending (not in batch 3 scope):** `module-11`–`module-20` were not
present on `main` when batch 3 ran (still off-token despite earlier batch
notes — flagged for a follow-up batch). The youth-track modules (FOUR:
`module-ai-literacy-youth`, `module-ads-youth`, `module-gems-youth`,
`module-pressure-youth`, all in `/classic/`) run a deliberate page-local
`--youth-*` theme via an embedded `<style>` block. As of 2026-07-12 the youth
track has its own shell: `youth/youth.css` (`.yt-` prefix, ages 13–17,
dark-theme + reduced-motion aware), a hub at `youth/index.html`, and its first
native module `youth/module-ai-companions.html`. **All four classic youth
modules are now ported onto that shell (2026-07-12):**
`youth/module-ai-literacy.html`, `youth/module-ads.html`,
`youth/module-gems.html`, `youth/module-pressure.html` — content-preserving
ports (scenarios/debriefs verbatim, factual fixes kept, before/after DCC_QUIZ
measurement harness deliberately dropped in favour of the shell's scenario
answers; unique quiz-only facts folded into each module's takeaway list). The
hub and `module-ai-companions.html` now link to these; the `/classic/`
originals remain as the archive. (Research:
`hal-stack/product-intelligence/dcc-youth-research-2026-07-12.md` in
two-birds-portfolio.)

**New native youth module (2026-07-15):** `youth/module-how-do-you-feel-after.html`
— "How Do You Feel After?" (doomscrolling), the teen parallel of senior
`module-30`. Hand-authored on the `.yt-` shell (4-scenario engine, same as
`module-ai-companions`). Canadian anchors, fact-checked live: Canadian Paediatric
Society "4 Ms" (Manage/Meaningful/Model/**Monitor** = watch for negative emotions
after being online), no hard hour cap for ages 5–17, the 2-hour figure is the
24-Hour Movement Guideline (recreational), quality-over-quantity. Core skill =
judge by how you feel after, not minutes. Kids Help Phone in-flow. Youth hub now
lists **6** modules (this is the "New" card); sitemap +1. QA: axe-core 0
critical/serious light + dark, full scenario flow + wrong-answer reveal verified,
no 375px reflow.
`module-template.html` (scaffold) and the wizard pages remain on the legacy
layer.
