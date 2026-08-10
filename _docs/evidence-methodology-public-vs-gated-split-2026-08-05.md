# Evidence & Methodology — public-vs-gated split decisions (one page, for Aaron's review)

**Sprint:** S-DCC-EVIDENCE-METHODOLOGY-PAGE-001 (2026-08-05)
**Companion to:** `C:\twobirds\digital-confidence\_docs\evidence-and-methodology-page-draft-2026-08-05.md`
**The model applied:** Trust-Centre tiered disclosure. Three tiers, not two: PUBLIC (on the page), GATED (shared with a legitimate evaluator under a simple agreement), INTERNAL (not offered at all). The test used for each asset: does publishing the METHOD build credibility without handing over the MATERIAL a competitor would need to rebuild DCC wholesale?

## Split table

| Asset | Public (on the page) | Gated (under agreement) | Internal (not offered) | Rationale |
|---|---|---|---|---|
| Confidence measurement method | Full method paragraph, scale design, pairing mechanism, pre-registration date, reporting guards, named limitation | Aggregate data extracts beyond /stats | Row-level response data (never shared in any tier; it is the privacy promise) | Method disclosure IS the credibility play (AAPOR pattern); raw rows are a privacy commitment, not a negotiable asset |
| Data-cleaning rules | Published in full (7-day duplicate window, flag-not-delete, Poisson daily anomaly check) | Full defensibility research memo | — | Pre-registered rules only work as credibility if they are public before data exists |
| /stats integrity endpoint | Linked and explained | — | — | Already aggregate-only by design; it exists precisely to be public |
| R01 age-bracket psychology | Framework summary: the four bands, the developmental anchors (Piaget/Erikson/Kohlberg), the grooming ladder concept, the four trauma-informed principles, named external sources (FBI, PREVNet, SHEG, MediaSmarts, Rozendaal & Buijzen) | The full Phase 3 memo and per-module psychology mapping | The 35-row threat/skill research database and module build-order stack | The framework proves rigour; the row-level DB plus build order is the distilled curriculum blueprint, i.e. exactly the scrape-and-rebuild asset the sprint exists to protect. Child-safety threat detail also reads badly excerpted, so context-controlled sharing only |
| Adult-stream design discipline | The three principles (every lesson a landing page; anxiety designed for; controlled vocabulary) with the journey-mapping exercise named and dated | Full journey maps with entry-class contracts | — | Principles are defensible publicly; the full contracts are working documents |
| Accessibility audits | Dates, scope, results (June 19 fix-same-day case; July 27 twelve-run axe matrix; 21/24 AAA contrast), open-defect honesty, the public ?qa=true panel | Complete audit reports with screenshots | — | Findings-with-dates are checkable claims; full reports are volunteered on request rather than dumped |
| Privacy architecture | ADR-0004 and ADR-0027 substance, no-IP reasoning, hash-only identity, clear-data control, the 2026-08-04 ADR correction told openly | The ADR corpus as a set | — | The self-correction story (ADR-0004 amendment) is a trust asset, deliberately surfaced rather than buried |
| Engineering governance | Static-first rationale, ADR practice ("more than forty"), live-verification gates, commit-count evidence (930 commits, dated range) | — | Verification specs and gate tooling internals | Counts and practices are safe; the gate tooling is HAL-stack IP |
| Curriculum source + generator | Named as existing, offered under agreement | Full pipeline walkthrough for a licensing partner | Generator templates + content JSON as files, until a licensing agreement exists | This is the product. The page says so in plain words instead of pretending the gate is something else |
| Prompts / agent orchestration / HAL stack | Not mentioned beyond "AI-assisted development" | — | Everything | Out of scope for product evidence; pure competitive tooling |
| Costs | Components only: labour-first statement, free hosting tiers, fixed consumer AI subscription (filed CA$27/mo, flagged as an April 2026 figure), the one US$8–20/mo paid exception, explicit "no total is tracked, none is invented" | Formal cost accounting prepared on request for a funder | — | Aaron asked for "who the dollars are going into it"; the honest answer is components + labour, not a fabricated total. Complies with the ADR-0036 rule against "fully free stack" claims by naming the paid exception |
| Outcome results | NONE published (none exist yet; N≥30 guard stated on the page) | — | — | The strongest anti-fabrication line on the page; also pre-positions the credibility of the first real result |

## Decisions taken in drafting (so Aaron can veto rather than reconstruct)

1. **ESSA positioning: Tier 4, self-assessed, said plainly.** The page claims "demonstrates a rationale" and explicitly disclaims Tiers 1–3. A grant assessor will respect a correct self-placement and will catch an inflated one.
2. **Limitations section is offered, not extracted.** Five limitations stated up front (no experimental evidence yet, self-selected sample, no third-party certification, anonymous-measurement floor, one-founder organisation), each with its mitigation. This mirrors the Matomo/GA4/Plausible disclosure pattern the survey-audit memo identified as the trust mechanism.
3. **The gate itself is disclosed honestly.** The page says some material is withheld partly because it is a competitive asset. A Trust Centre that pretends its gate is purely about "context" reads as evasive to exactly the audience this page targets.
4. **The ADR-0004 self-correction is published, not hidden.** The August 2026 amendment (storage-mechanism drift, corrected in the open, user-facing privacy page was never wrong) is framed as governance working as intended.
5. **No user counts, no partner names, no testimonials.** None are verified in-repo at publishable quality; the page's credibility rests on method, not traction.

## Flags for Aaron before publish (real decisions, not rubber stamps)

1. **The gated layer is soft while the repos are public.** `digital-confidence` and `two-birds-portfolio` are public GitHub repos; the curriculum JSON, generator, R01 memo, and audit reports listed as "gated" are technically findable by anyone who locates the repos. The page does not link them, but a motivated competitor can. Options: (a) accept soft gating (public repos are themselves a transparency asset the page cites), (b) move the curriculum pipeline and research corpus to a private repo before the page ships, (c) keep as is and treat the gate as a courtesy/licensing funnel. **This needs your call; the draft assumes (a)/(c) and stays honest either way, but the page's "request gated access" section is stronger under (b).**
2. **Confirm the AI-subscription figure.** The only in-repo number is CA$27/month (decapitation checklist, April 2026). If you are on a higher tier now, either update the checklist first or keep the page's "filed at CA$27, current tier may be higher" hedge.
3. **Comfort check on publishing costs at all.** The cost section can be cut to its first bullet (labour-first, near-zero tooling) without harming the rest of the page if you would rather not name subscription figures publicly.
4. **Contact path.** The page's gated-access section says "ask through the site's contact page." Confirm which surface that should be (feedback form is one-way by design per ADR-0027; the b2b/for-libraries page may be the right route).
5. **`?qa=true` exposure.** The page advertises the QA panel publicly. It is already live and public; this just makes it discoverable. Veto if you would rather keep it quiet.

## What was NOT claimed anywhere (honesty ledger)

No outcome statistics, no user or learner counts, no institutional partnerships, no certifications, no "fully free" or "fully sovereign" stack claims, no third-party endorsements, no invented cost totals, no timeline inflation. Every date and number on the page traces to a file read this session (sources listed at the top of the draft).
