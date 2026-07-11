# Research — Best-in-class accessible platforms (2026-06-18)

Reference research for the **DCC UI Rebuild v1**. We studied three platforms
recognised for accessible design serving older adults, health audiences, and
the public — exactly the people libraries and nonprofits support. For each we
extracted the conventions that matter to DCC (colour, typography, spacing,
navigation, layout) and recorded how the rebuild applies them.

Selected for being *measurably* accessible, openly documented, and aimed at the
same "anxious, careful, often-older, mixed-ability" reader DCC serves:

1. **GOV.UK Design System** — `design-system.service.gov.uk`
2. **NHS digital service manual** — `service-manual.nhs.uk`
3. **Senior Planet / AARP OATS** — `seniorplanet.org` (older-adult digital literacy)

(Cross-reference: **Canada.ca / Canada.ca design system** informs our bilingual
EN/FR rules — see `DESIGN-SYSTEM.md` §8.)

---

## 1. GOV.UK Design System

The reference standard for accessible public-service interfaces. Built to work
for the whole population, including low-confidence and assistive-tech users.

**Colour**
- Near-black body text (`#0b0c0c`) on white — maximum legibility, never grey body.
- One strong link colour (`#1d70b8`) used consistently; visited and hover states differ.
- A single decisive primary action colour (green `#00703c`); destructive actions are a separate red.
- A loud focus state: solid **yellow** highlight (`#ffdd00`) with a thick black underline — impossible to miss with a keyboard.

**Typography**
- ~19px body on desktop, ~16px on mobile; generous line-height (~1.25–1.5).
- One humanist sans for everything; weight, not colour, signals hierarchy.

**Spacing & layout**
- A fixed responsive spacing scale (multiples of a base unit) — never arbitrary gaps.
- Single readable column; constrained measure (~two-thirds width) so lines don't tire the eye.

**Navigation**
- **One thing per page.** One question / one task per screen; navigation recedes.
- Errors summarised at the top and repeated inline, always prefixed "Error:".

**→ DCC applies:** decisive single primary action (`--color-accent-strong`),
near-black body (`--color-text` #1A1A2E, 16:1), constrained `--content-max`
(72ch), unmistakable focus ring, and the "one thing per screen" module pattern.

---

## 2. NHS digital service manual

Designed for a health audience that skews older and anxious — the closest peer
to DCC's emotional context ("I'm worried, explain it simply").

**Colour**
- NHS blue (`#005eb8`) as the trusted brand/action colour; white text on blue passes AA.
- Warning/expander components use a bold dark text on pale background, never colour alone to carry meaning.
- A high-visibility focus state (yellow with black) consistent across all components.

**Typography**
- ~19px desktop body; the **lead paragraph is set larger** to lower the initial reading burden.
- No italics, no justified text (both harm dyslexic and screen-magnifier users).
- Plain English at a low reading age; short sentences, one idea each.

**Spacing & layout**
- Generous vertical rhythm; clear card and "care card" patterns with coloured left borders to classify information (e.g. urgent vs non-urgent).
- Consistent component positions — help/contact appears in the same place every time.

**Navigation**
- Predictable, shallow structure; "back" is always available; breadcrumb on deep pages.

**→ DCC applies:** larger `--font-size-lead`, no italics / no justify rules,
left-border "care card" classification reused directly in our new
`.dcc-callout` (brand / info / success / warning / danger), and the
"help in the same place" rule (WCAG 2.2 SC 3.2.6).

---

## 3. Senior Planet / AARP OATS

A digital-literacy programme built *specifically* for older adults, delivered
through libraries and community centres — DCC's direct analogue.

**Colour**
- High contrast, warm and friendly rather than clinical; large solid blocks of colour, minimal subtle greys.
- Photography of real older adults, not abstract tech imagery.

**Typography**
- Large type by default (well above 16px); short headings in plain language ("Get Started", "Find a Class").

**Spacing & layout**
- Very generous whitespace and big tap targets; few items per screen.
- Step-by-step lessons with one action per step and a screenshot/illustration.

**Navigation**
- Shallow, plain-language top nav; obvious "where do I start" entry point.
- Clear separation between *learners* and *organisations who run programmes* — two doorways, plainly labelled.

**→ DCC applies:** warm "kitchen-table" palette (already our Warm Hearth theme),
56px touch targets, big readable type, numbered single-action steps
(`.dcc-steps`), real-senior photography, and an explicit two-doorway home
(learners vs libraries/organisations).

---

## Extracted conventions → DCC tokens & components

| Convention (from the three platforms) | DCC implementation |
|---|---|
| Near-black body, never grey | `--color-text` `#1A1A2E` (16.3:1) |
| One decisive primary action colour, AA-safe | `--color-accent-strong` `#A85410` (5.33:1) on `.dcc-btn--primary` |
| Loud, always-visible focus | `--focus-ring` 3px `--color-accent-strong`, 2px offset |
| ~19px+ body, larger lead paragraph | `--font-size-base` 19px; `--font-size-lead` clamp(20–24px) |
| Fixed spacing scale, no arbitrary gaps | `--space-*` 4px scale only |
| Constrained readable measure | `--content-max` 72ch |
| Colour-coded info cards w/ left border | `.dcc-callout--brand/info/success/warning/danger` |
| One thing per screen / shallow nav | module page pattern; grouped sidebar (Get Started / Lessons / Resources) |
| Two clear doorways (learner vs org) | rebuilt `index.html` audience split + `for-libraries.html` |
| Big tap targets | `--tap-target` 56px |
| No italics / no justify / left-align | enforced in `DESIGN-SYSTEM.md` §8 + `dcc-core.css` |
| Real-people photography | hero imagery of older Canadians (existing assets) |

These three references, plus Canada.ca's bilingual content standard, are the
basis for the token and component decisions shipped in this rebuild.
