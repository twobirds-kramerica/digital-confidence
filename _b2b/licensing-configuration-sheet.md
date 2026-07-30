# DCC B2B Licence — Configuration Sheet
*Internal reference — Two Birds Innovation. Defines the customisation boundary for institutional licensees before any sales conversation, so scope questions have a pre-agreed answer instead of being negotiated live per deal.*

Source: `_strategy/monetisation-strategy.md` §"B2B White-Label Licensing" (pricing tiers, what's included). This sheet answers the narrower question that pricing doc doesn't: **what can a licensee actually change?**

---

## Customisable (licensee controls)

| Item | Detail |
|---|---|
| **Branding** | Co-branded landing page: licensee logo, name, and colour accent alongside the DCC identity. DCC branding stays visible — this is co-branding, not white-label replacement. |
| **Module order / presentation sequence** | Licensee can reorder which of the 12 modules are presented first/featured on their co-branded landing page, to match their own program's emphasis (e.g. a credit union might lead with banking-safety modules). |
| **Module selection (subset)** | Licensee can choose to surface a subset of modules rather than all 12, if their program only needs a slice (e.g. a healthcare partner might only need the telehealth + privacy modules visible on their page). Full platform access is still included in the licence; this is a *presentation* choice, not a content-removal one — the rest of DCC remains reachable to any user who navigates there directly. |
| **Printed quick-reference cards — which sets** | Licensee selects which module quick-reference cards are included in their printed set (100/300/1,000 per tier per monetisation doc), matching whichever modules they've chosen to feature. |

## Locked (DCC controls)

| Item | Why locked |
|---|---|
| **Module content — no edits** | Curriculum accuracy, tone, and the senior-safety review process are DCC's core asset and liability surface. A licensee-edited module breaks DCC's ability to stand behind its own content and creates version-drift across licensees. |
| **Licensee-authored content — not accepted for MVP** | No mechanism (yet) for a licensee to add their own modules/pages into the platform. Avoids scope creep into becoming a CMS, and avoids DCC being asked to fact-check licensee-authored senior-facing content under its own brand. |
| **LMS integration — no for MVP** | No SSO/roster-sync/grade-passback into a licensee's existing LMS or intranet at this pricing tier. The licence is stand-alone platform access with a co-branded entry page, not an embedded integration. Revisit only as a paid Enterprise/custom add-on if a specific institutional deal requires it — do not offer it by default. |
| **Pricing / tier structure** | Set per `_strategy/monetisation-strategy.md` (Starter $12k/Standard $20k/Enterprise $30k/Custom for gov & national orgs). Not licensee-negotiable within a tier; tier upgrades are the mechanism for more users/materials, not per-clause bargaining. |
| **Data / analytics** | Quarterly impact reporting is provided *to* the licensee (completion rates, feedback summaries) per the included-in-licence list. Licensee does not get raw user-level data access — consistent with DCC's Data Ethics Commitment (`_strategy/monetisation-strategy.md` §Data Insights Product: no individual-level data sold or shared, ever). |

---

## One-line answers for a sales call

- *"Can we put our logo on it?"* — Yes, co-branded landing page.
- *"Can we change the wording / add our own material?"* — No, content is DCC-authored and reviewed; this protects accuracy and your liability exposure as much as ours.
- *"Can we just show the modules relevant to our members?"* — Yes, you choose which modules are featured; full platform stays available underneath.
- *"Can this plug into our staff LMS?"* — Not in the standard licence. Flag it as a custom-scope question for Enterprise/government pricing — don't commit to it live.
- *"Can we get the raw participant data?"* — No — aggregate quarterly reporting only, never individual-level data, by policy.

---

## Status

Design Gate note: this document is a business/sales-scope spec, not a UI/UX deliverable — no product page, layout, or user-facing surface is created or changed by it, so the DESIGN GATE (`hal-stack/governance/design-ui-gates.md`, mandatory before UI sprints) does not apply here. Ready for Aaron to use in the first live B2B sales conversation; no further build work implied.

*Prepared by Two Birds Innovation. For internal use ahead of B2B licence conversations.*
