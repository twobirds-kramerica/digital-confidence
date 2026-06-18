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
- Bilingual EN/FR via `[data-en]/[data-fr]`. When French is unavailable, expose
  the link and add `(English only)` — never hide it. Infer language from
  `navigator.language`; no language-selector field on forms.
- Default city: St. Thomas, Ontario; Ontario-specific resources where relevant.

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
