<!-- TONE ANCHOR (set at first draft, 2026-08-05; do not remove; strip only at final publish)
Purpose: public Evidence & Methodology page for DCC, read by library directors, grant assessors, institutional partners
Register: professional, plain, factual; evaluator vocabulary acceptable (journey map entry class A6); Canadian English
Positioning: disclosure as credibility; every claim sourced from the repo; limitations stated openly, vendor-precedent style
Never: marketing tone, invented statistics, em dashes, banned-word list violations, implying outcome data that does not exist yet
-->

# DCC Evidence and Methodology page — DRAFT for Aaron's review

**Sprint:** S-DCC-EVIDENCE-METHODOLOGY-PAGE-001 (2026-08-05)
**Deliverable 1 of 2.** The companion public-vs-gated split record is `C:\twobirds\digital-confidence\_docs\evidence-methodology-public-vs-gated-split-2026-08-05.md`.
**What this is:** the full written content and page structure for a public "Evidence and Methodology" page, Trust-Centre-shaped, per the sprint spec. Markdown only this pass. The HTML build is a follow-on sprint and runs through the DESIGN GATE.

**Sources synthesized (all read in full this session, none re-researched):**
- `C:\twobirds\two-birds-portfolio\hal-stack\research\dcc-confidence-survey-audit-defensibility-2026-08-02.md` (measurement section)
- `C:\twobirds\two-birds-portfolio\hal-stack\research\dcc-kids-age-bracket-psychology-2026-06-12.md` (R01 Phase 3, pedagogy section)
- `C:\twobirds\two-birds-portfolio\hal-stack\context-system\journey-maps\dcc.md` (page inventory, adult-stream design discipline)
- `C:\twobirds\two-birds-portfolio\hal-stack\architecture\decisions\0004-dcc-no-auth.md` and `ADR-0027-dcc-aggregate-data-and-low-friction-account.md` (privacy section)
- Sprint queue audit records: S-DCC-A11Y-AXE-001 (DONE 2026-06-19, digital-confidence@18aca10) and the impeccable audit of 2026-07-27 (`C:\twobirds\digital-confidence\_feedback\impeccable-audit-module3-scam-template-2026-07-27.md`) (accessibility section)
- `C:\twobirds\two-birds-portfolio\hal-stack\architecture\decapitation-checklist.md` (cost section)
- Live git data computed this session: 930 commits in `C:\twobirds\digital-confidence`, first 2026-02-25, most recent 2026-08-04

**Completeness note (COMPLETENESS FAILURE-SIGNAL RULE):** every named source above was read completely. The one number that could NOT be confirmed current is the Claude subscription cost (the filed record says CA$27/month, dated April 2026, and may be a tier out of date). The page text below flags it as a dated figure rather than asserting it as current. No other figure on this page is estimated.

---

# PAGE COPY BEGINS

# Evidence and methodology

*How the Digital Confidence Centre was built, what research sits underneath it, how we measure whether it works, and what we deliberately do not publish. Manually maintained; last revised August 2026.*

## What this page is

Education products make claims. This page is where ours are backed up or honestly qualified. It is written for the people who evaluate tools professionally: library programme coordinators, grant assessors, accessibility reviewers, and institutional partners.

It follows the disclosure model used by security "trust centres" in the software industry: a public layer that states our principles, standards, methods, and audit results, and a gated layer, available under agreement, that contains the raw material (full curriculum sources, item-level research records, complete audit reports). The reason for the split is stated plainly in the last section rather than hidden.

Nothing on this page is a certification. Where a claim can be independently checked today, we tell you how. Where it cannot, we say so.

## The Digital Confidence Centre at a glance

The Digital Confidence Centre (DCC) is a free, bilingual (English and Canadian French) digital literacy platform built in Ontario. The primary audience is older adults with low digital confidence; separate streams exist for teens (13 to 17) and for children (4 to 12, caregiver-mediated). As of the July 2026 site inventory it comprises roughly 115 public pages, including 39 adult lesson pages, 14 youth pages, and a kids' section, plus reference surfaces (glossary, FAQ, support directory, scam-response tools).

It requires no account, no login, and no payment. It runs as static pages that work on shared library terminals and low-bandwidth connections.

## Standards and frameworks we work against

| Area | Standard or framework | How it is applied |
|---|---|---|
| Accessibility | WCAG 2.1 AA (working toward AAA on contrast) | Automated axe-core audits, manual zoom testing, token-level contrast checks; detail below |
| Measurement disclosure | AAPOR disclosure conventions for non-probability samples; Statistics Canada's policy on informing users of data quality and methodology | The measurement section below is written to those conventions, including named limitations |
| Evidence maturity | ESSA tiers of evidence (the U.S. rigour scale widely used in EdTech evaluation) | Self-assessed at Tier 4, "demonstrates a rationale": design grounded in established research, with an outcome-measurement instrument now in place. We do not claim Tier 1 to 3 evidence; no RCT or quasi-experimental study has been run |
| Privacy | PIPEDA privacy-by-design | No personal information is required to use DCC; detail below |
| Child-safety pedagogy | Developmental psychology canon (Piaget, Erikson, Kohlberg, Bowlby) plus Canadian sources (MediaSmarts, PREVNet, Public Safety Canada) | Age-band architecture and threat prioritization; detail below |

## How the learning content is designed

### Adult stream

Three design decisions define the adult stream, and each is a response to evidence about the audience rather than a style preference.

**Every lesson is treated as a front door.** A 2026 journey-mapping exercise across the full site inventory established that most first visits arrive on an individual lesson page, from a search result, a family member's link, or a library handout, not on the homepage. Lessons are therefore reviewed as landing pages: each must explain what it covers, that it is free and safe to read, and every term of art it uses, without assuming the visitor has seen any other page.

**Anxiety is designed for, not around.** Scam-related lessons include explicit shame-reduction content ("it is not your fault"), cite real Canadian Anti-Fraud Centre statistics rather than vague warnings, and end with genuine reporting paths (for example Cybertip.ca and carrier spam-reporting). Tool pages meant for someone in an active scam moment are held to the strictest plain-language bar on the site, on the principle that an anxious visitor closes the tab at the first unexplained label.

**Vocabulary is controlled.** The site glossary is the registry of taught terms. A lesson that uses a term that is neither plain language nor glossary-linked at first use fails review.

### Youth and kids streams

The kids and youth content is built on a documented developmental-psychology framework (internally, the R01 research series), the full version of which is part of the gated layer. The public summary:

**Age bands are developmentally validated.** Content is banded 4 to 6, 7 to 9, 10 to 12, and 13 to 15. These bands align with the major transition points in Piaget's cognitive stages, Erikson's psychosocial stages, and Kohlberg's moral-development stages (for example, the shift into concrete operational thinking around 6 to 7, and the peak of group-conformity morality around 10 to 12). Each module carries delivery-mode metadata, from fully caregiver-mediated at 4 to 6 through solo engagement at 13 to 15.

**Threats are prioritized by evidence, not headlines.** Each band's content order comes from a threat analysis grounded in named sources: FBI reporting on financially motivated sextortion (55,000+ reports in 2024, peak target age 13 to 17), PREVNet and Public Safety Canada data placing the cyberbullying peak at ages 10 to 13, Stanford History Education Group results on lateral reading, and advertising-literacy research (Rozendaal and Buijzen) on when children can actually understand selling and persuasion intent.

**Grooming protection is built as a ladder.** The safety skills escalate across bands in the same order real grooming escalates: naming safe adults (4 to 6), telling a grown-up when something feels weird (7 to 9), recognizing "please don't tell your parents" as a red flag (10 to 12), and a concrete non-blame response script for image-pressure and sextortion (13 to 15). Each rung depends on the one before it, and content review enforces the prerequisite chain.

**The content is trauma-informed by rule.** Four principles bind every module: exploitation is never framed as the child's fault; social-pressure content always offers a face-saving exit; disclosure to an adult is drilled as a reflex, not presented as a one-time decision; and parent-voice moralizing is treated as a design error in content for ages 10 and up.

## How we measure whether it works

DCC measures learner confidence with a single self-rated question on a five-point labelled scale, asked immediately before and immediately after a lesson. The method, in the register a funder or methodologist would expect:

**Method.** Responses are anonymous: no name, no email address, and no IP address is stored. Before-and-after responses are paired using either a SHA-256 hash of an email address the participant optionally supplied, or an opaque random identifier stored on their own device.

**Sample.** Participants are self-selected website users, not a probability sample of any population. Figures describe the people who chose to answer both questions and should not be read as estimates of Canadian seniors generally. No margin of error is reported, because none is meaningful for an opt-in sample.

**Data quality.** Repeat submissions for the same lesson and phase within seven days from the same identifier are flagged and excluded from analysis, and the number excluded is reported alongside every figure. Flagged rows are kept, never deleted, so exclusions remain countable by an auditor. Daily submission volumes are recorded every day and tested against a trailing fourteen-day baseline using a Poisson threshold; anomalous days are reported and excluded.

**Pre-registration.** These cleaning rules were fixed on 2 August 2026, before any participant data was collected. Declaring the rules before the data exists is the survey-methodology standard that separates honest cleaning from after-the-fact adjustment, and it cannot be claimed retroactively.

**Reporting guards.** No percentage is published until at least 30 matched before-and-after pairs exist; below that, raw counts are used. The sample is never described as "seniors" in general.

**Known limitation, disclosed the way analytics vendors disclose theirs.** A participant who clears their browser data and did not supply an email address cannot be linked to their earlier response and may be counted more than once. Matomo, Google Analytics 4, and Plausible all publish equivalent limitations about their own visitor counts. It inflates participant counts rather than the measured confidence change, and the effect is expected to be small at this scale.

**What you can check yourself:** the aggregate integrity endpoint at `https://dcc-beta-measurement.twobirdsinnovation.workers.dev/stats` publishes counts received, counts analysed, and counts excluded, with no row-level data and no identifiers. It exists so the dataset's integrity can be checked by someone who is not us.

## Accessibility evidence

DCC's audience makes accessibility a functional requirement, not a compliance checkbox. What has actually been done, with dates:

- **Automated audits, with findings fixed in the open.** An internal QA run on 19 June 2026 found three serious WCAG 2.1 AA violations (a progress bar without an accessible name, a prohibited ARIA attribute, and a contrast failure); all three were fixed the same day, and the fix is in the public commit history. A fuller audit on 27 July 2026 ran axe-core across representative lesson pages in both light and dark themes at three viewport widths (twelve runs) and found zero critical and zero serious violations.
- **Contrast beyond the minimum.** In the 27 July 2026 audit, 21 of 24 computed text-and-background pairs met WCAG AAA contrast, and none fell below AA. The core colour token set was built to AAA targets.
- **Real-zoom testing.** Because low-vision users commonly run 125 to 200 percent browser zoom, DCC's visual QA policy tests layouts across a width-by-zoom matrix, not just at 100 percent zoom on multiple widths.
- **Motion and reading supports.** Reduced-motion preferences genuinely zero the motion tokens (verified in audit, not assumed). The site ships a four-level font-size system and a read-aloud feature, and read-aloud correctly skips decorative icons for spoken output.
- **A public QA panel.** Anyone can append `?qa=true` to any DCC page URL and run the same in-page accessibility and layout checks we use.

**Honest scope statement:** these are automated and internal audits of sampled pages. DCC holds no third-party accessibility certification, and automated tools cannot detect every barrier. Defects still surface (the 27 July 2026 audit logged two serious quiz-interaction defects, tracked in the open for repair), and the audit trail exists so progress is checkable rather than asserted.

## Privacy and data handling

The privacy design is filed as dated architecture decision records, not just described in a policy page.

- **No account is required, by decision.** The founding decision (September 2025, filed as ADR-0004) rejected logins entirely: account friction excludes exactly the seniors, newcomers, and library patrons DCC exists for, and holding no account data keeps DCC's PIPEDA surface minimal.
- **Progress lives on the learner's device.** Lesson progress and preferences are stored client-side in the browser, not on our servers. The site provides an in-product "clear my data" control and a save-and-restore file export, so the learner can remove or keep their own data without asking anyone.
- **Optional identity is a hash, not an address.** A learner may optionally supply an email so their progress and measurement responses can be matched across devices. It is stored only as a SHA-256 hash. There is no password, and no message is ever sent to it from the measurement system.
- **No IP addresses are stored.** IP was evaluated as an identity signal and rejected in writing: shared library and care-home networks make it wrong in both directions for this audience, and storing it would convert DCC from "holds no personal data" to "holds personal data and must justify it." The only use of IP is a transient, hashed rate-limit key that is never written to the database.
- **Analytics are aggregate and anonymous.** The measurement backend (one Cloudflare Worker and one database, filed as ADR-0027) stores anonymous event counts and the confidence readings described above. No name, no email in the clear, no IP, no advertising or third-party trackers.
- **When a record was wrong, it was corrected in the open.** In August 2026 an internal review found that ADR-0004's description of the storage mechanism had drifted from what the product actually shipped (persistent localStorage rather than session-only storage; the user-facing privacy page was already accurate). The record was amended rather than quietly rewritten, and the amendment is dated and public.

## Engineering and decision governance

- **Static-first architecture.** DCC is flat HTML, CSS, and JavaScript on GitHub Pages behind Cloudflare. No app install, no build-step dependency at runtime, no server holding user state. This is an accessibility and sovereignty decision: it works on a locked-down library terminal and survives the failure of any single vendor.
- **Decisions are filed when they are made.** Significant architectural choices are recorded as numbered, dated Architecture Decision Records (more than forty filed to date), including the rejected alternatives. Later documents may amend an ADR but do not silently overwrite it.
- **"Done" requires live verification.** Changes to the live product are gated on automated browser checks against the live URL, with screenshot evidence, rather than on a developer's assertion that it works.
- **The build history is continuous and public.** The DCC repository shows 930 commits between 25 February 2026 and 4 August 2026, a checkable record of sustained work rather than a marketing timeline.

## What it cost to build

Transparency about where the dollars went, because evaluators reasonably ask.

- **The main investment is labour.** DCC is built by a solo founder working with AI-assisted development tooling, full-time since early 2026. The commit history above is the honest proxy for that effort; we do not publish an invented dollar valuation of it.
- **The tooling cost is deliberately near zero.** Hosting (GitHub Pages, Cloudflare) runs on free tiers. Development runs under a fixed-price consumer AI subscription; the filed architecture record (April 2026) lists it at CA$27 per month, and the current plan tier may be higher. One bounded paid exception exists: roughly US$8 to 20 per month, used occasionally, for character-video production tooling.
- **No aggregate spend figure is published because none is tracked.** Rather than estimate one, we state the components. If a funder requires a formal cost accounting, we will prepare one against records rather than publish an approximation here.

## Known limitations

Stated here because a limitations section an evaluator has to extract by interrogation is worth less than one offered up front.

1. **No experimental evidence yet.** On the ESSA scale, DCC demonstrates a rationale (Tier 4). Pre-and-post confidence measurement is instrumented and pre-registered, but as of this page's revision date no outcome results have been published, and no percentage will be published below 30 matched pairs.
2. **Self-selected sample.** Everything measured describes people who chose to use DCC and chose to answer. It does not estimate any general population.
3. **No third-party certifications.** Accessibility and methodology evidence on this page is self-reported, with independently checkable artefacts where noted. DCC has not sought product certification (for example Digital Promise's) to date.
4. **Anonymous measurement has a floor.** The duplicate-participant gap described in the measurement section is real, disclosed, and shared with every anonymous analytics product.
5. **Small organisation.** DCC is a one-founder product. That buys coherence and speed and costs redundancy; the public repository and filed decision records are the mitigation, because nothing about how it is built lives only in one person's head.

## What you can verify yourself, today

| Claim | How to check |
|---|---|
| Measurement integrity counts | `https://dcc-beta-measurement.twobirdsinnovation.workers.dev/stats` |
| Accessibility state of any page | Append `?qa=true` to any DCC page URL |
| The product itself | Every page is public; nothing on the learning side is behind a wall |
| Build history and decision records | Public repository commit history and ADR files |

## Requesting gated detail

Some material is not published on this page: the full curriculum source and generation pipeline, the item-level child-safety research database, complete internal audit reports, and raw aggregate data extracts. Two reasons, stated honestly: some of it is a competitive asset (the distilled content pipeline is the product), and some of it deserves context a public page cannot carry (item-level child-safety threat analysis reads badly excerpted).

Institutional partners, grant assessors, and researchers can request access under a simple agreement. Ask through the site's contact page and say what you are evaluating; the default answer to a legitimate evaluator is yes.

# PAGE COPY ENDS

---

## Page structure notes for the HTML follow-on (not page copy)

- **Placement:** a new top-level `evidence.html` (plus `evidence-fr.html`), linked from the footer and from `about.html`, `for-libraries.html`, and the b2b surfaces. Per the journey map this is entry class A6 (evaluators), the ONE class where professional vocabulary is acceptable without inline teaching; do not run the coldest-visitor plain-language pass on it, but keep the site's one-line self-introduction at top.
- **DESIGN GATE applies to the build sprint:** named design language per `hal-stack/governance/design-ui-gates.md`, PRODUCT.md anti-references, impeccable audit, axe pass, 125 to 200 percent zoom check (the page contains tables; tables must scroll in their own container).
- **Component reuse:** standard v2 page chrome; tables as the tabular sections above; no new component families (13 unused component families already exist in core.css; do not add a 14th).
- **The two "check it yourself" URLs must be verified live at build time** per OUTBOUND URL VERIFICATION before shipping.
- **Freshness honesty:** the page states "manually maintained; last revised August 2026" per the NO FAKE TIMESTAMPS rule. Do not add an auto-looking "last updated" stamp unless it is genuinely generated at build time.
- **French pass** is part of the build sprint, not an afterthought; the FR twin must carry identical limitation statements.

## Voice check

Scanned: full page copy, headings, table cells, against `hal-stack/protocols/voice-check.md` banned list, em-dash ban, participial openers, "serves as/stands as/represents a", rule-of-three filler, "not just X, but Y".
Caught in drafting: em dashes present in all quoted source paragraphs (survey-audit funder paragraph was em-dash heavy); "commitment to" and "highlights" avoided in accessibility section; "valuable" avoided in limitations intro.
✓ voice check: page copy + headings + tables | 6 caught | 6 fixed | tone anchor: held
Canadian English confirmed: centre, programme, colour, behaviour, labelled, prioritized/organisation per site convention (DCC site uses -ize Oxford variants in places; final EN pass at build time should match site convention file-wide).
