# DCC Build Scope & Requirements Checklist (2026-07-03)
*Aaron's full scope for the DCC (Adults) build, captured so nothing is missed. Priority is explicit: **front-end / UX / a usable platform comes FIRST**; everything else is secondary but tracked. This checklist is also the template for the other web-app products (Clarity, etc.).*

---

## PRIORITY 0 — Front-end / UX / usable platform (build FIRST; everything else waits)
- [x] Design system (Trust Blue, WCAG 4.5:1 light+dark) — *done, dcc-v2*
- [x] Landing + card-grid IA + layered consent + Helper-mode flagship — *done, dcc-v2*
- [ ] Re-skin the 29 existing modules into the v2 system (or theme-bridge) — *next pass*
- [ ] Fully **responsive** (phone / tablet / desktop) — verify every page
- [ ] **Information architecture** finalised (nav, breadcrumbs, categories)
- [ ] **Accessibility** pass (axe-core 0 critical/serious; the design already targets it)
- **RULE:** a broken or ugly front end fails the whole thing. This is the bar. Everything below is secondary.

## PRIORITY 1 — Site completeness (after the front end is solid)
- [ ] **Bilingual: English (Canadian) + French (Canadian).** Big content lift — plan a translation pass; keep the fr/QC copy plain-language too. (Aaron flagged; brief had parked fr-QC — now IN scope, sequenced after EN core.)
- [ ] **FAQs** content + on-site **search / indexing** that actually works across all pages
- [ ] **Footer** (complete: privacy, about, get-help, Anti-Fraud Centre #, no Aaron name/email) + **sitemap.xml** + **full site architecture** documented
- [ ] **SEO + GEO** (local: St. Thomas / Ontario / Canada; structured data / FAQ schema; meta; Open Graph)
- [ ] **QA / QC / UAT** gate (per `hal-stack/governance/qa-qc-uat-gate.md`) before anything ships

## PRIORITY 2 — Legal, privacy & security
- [ ] **CASL** compliance (marketing consent, unsubscribe) + **PIPEDA** compliance
- [ ] Privacy policy + terms — **legal bare minimum**, plain-language, layered (not a wall)
- [ ] Site **security** (static hardening, CSP, no secrets client-side; if a backend is added, secure it — see below)
- [ ] **NO PII ever** stored or shared; only aggregate/anonymous (see data decision below)
- [ ] **No Aaron name / email on the site.** Support is NOT a two-way channel — see feedback rule.

## PRIORITY 3 — Data, feedback, chatbot (this is an ARCHITECTURE CHANGE — needs your sign-off)
> **⚠ Decision required — reverses DCC's "no data, static-only" posture (ADR-0004 + Rule 1).**
> You now WANT: aggregate (never PII) member-behaviour data, a **pre/post "what did you know before vs after" measure**, a **feedback database**, and a **chatbot** — because impact measurement is likely **required to keep government funding**, and it keeps the business viable. That's a legitimate reason to add a thin backend. It needs a new **ADR** (aggregate-only, PII-safe) so it's a deliberate, documented reversal, not a drift.
- [ ] **Aggregate behaviour analytics** (which lessons, completion, before/after quiz) — **no PII, ever**; consent-gated
- [ ] **Pre/post knowledge check** ("what do you know before / after") — the impact metric for grants. Research the lightest credible version (a short before-quiz + after-quiz per module); not arduous.
- [ ] **Feedback / bug database** — free-form text welcome. **Users must be told clearly it's one-way collection, NOT a reply channel** ("We read every note but can't reply individually"). No promise of a response, no Aaron inbox.
- [ ] **Chatbot** — helpful, not frustrating; scoped to site FAQs/safety, honest about limits, never impersonates human support.

## Cloudflare / MCP assessment (technical enablers — no new blockers)
- **Backend for the above fits the existing stack.** A **Cloudflare Worker + D1 (SQLite)** covers the feedback DB, aggregate events, and pre/post results. We already have this pattern live: the **family-ops worker** and the **clarity-email-gate worker**. So **no new tooling to acquire** — reuse the pattern.
- **Chatbot:** a Cloudflare Worker proxying an LLM (sovereign key server-side) OR, cheapest/most-sovereign, a static FAQ-search "assistant" with no LLM cost. Decide per budget.
- **MCP:** the **Cloudflare MCP** (already connected) can create/manage the D1 DB + Worker. **No new MCP needed.**
- **One-time human enabler:** if we add a Worker+D1, it needs a Cloudflare deploy (I can do via wrangler; already authenticated). No blocker.

## Applies to the other products too
Clarity and any other web-app/service inherit the relevant rows (responsive, SEO/GEO, legal, feedback-not-support, aggregate-no-PII, QA/QC/UAT). DCC is the first full run; this checklist is the reusable template.

---
## Immediate next steps (in priority order)
1. **You decide the data reversal** (Priority 3) — yes to aggregate-no-PII + feedback DB + pre/post + chatbot? If yes, I file the ADR and it's built on Cloudflare Worker+D1.
2. Finish the **front end**: re-skin modules into dcc-v2, responsive + a11y pass.
3. Then work down Priority 1 → 2 → 3.
*Front end is the gate. The rest is sequenced behind it, but now it's all written down.*
