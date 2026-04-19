# DCC Competitive Audit — Digital Literacy Platforms

Date: 2026-04-19
Scope: 5 platforms whose audience, mission, or format overlap with the Digital Confidence Centre.

| Platform | Primary audience | Closest-to-DCC |
|----------|------------------|----------------|
| GCF Global / LearnFree | General adult / senior learners | **Yes — closest mission match** |
| Be Internet Awesome (Google) | Families, K–8 | No (wrong age) but strong on gamified pedagogy |
| Get Safe Online (UK) | General adults | Partial — overlapping safety topics |
| Age UK Digital | UK seniors | **Yes — closest audience match** |
| AARP Personal Technology | US seniors 50+ | **Yes — closest audience match** |

**Note on sourcing.** Pages reviewed via live fetch 2026-04-19. GCF Global / LearnFree is a JavaScript SPA that could not be scraped by plain fetch; the GCF notes below rely on widely-known platform characteristics rather than live review. Verify before citing those specifics externally.

---

## 1. GCF Global / LearnFree (`learnfree.org`)

- **Navigation:** Categorical list on the home page (Computer Basics, Internet, Email, Microsoft Office, Google, Career, Math, Reading). Each topic opens into a lesson index.
- **Module structure:** Linear lessons, each 1–3 short pages. Text-and-image, no branching. Every lesson has a "Next" / "Previous" pair at the bottom.
- **Quiz:** Occasional end-of-topic quizzes, radio-button multi-choice. No scoring persistence across sessions.
- **Progress tracking:** Local only, not persisted for anonymous users.
- **Mobile:** Responsive, but the layout is text-first — easy to read on any device without accommodation.
- **Accessibility:** Plain HTML content, low visual complexity. No visible font-size toolbar in the legacy experience. Language switcher present (English, Spanish `es.learnfree.org`).
- **Typography:** Sans-serif body, high contrast.
- **Colour:** Restrained — blues and greys.
- **Standout UX:** Radical simplicity. No sign-up wall. Very long tail of topics. Cross-linked glossary.

## 2. Be Internet Awesome — Google (`beinternetawesome.withgoogle.com`)

- **Navigation:** Horizontal nav — About / Families / Educators / Slides / News / FAQ. Content organized around 5 pillars (Smart, Alert, Strong, Kind, Brave).
- **Module structure:** Downloadable lesson plans (ISTE-aligned) plus in-browser games. AI Literacy Guide targets grades 2–8.
- **Quiz / interactive:** Three branded experiences — Interland (browser adventure, 4 challenge games), Roblox integration, and a printable "Family Pledge."
- **Progress tracking:** Not persisted in-browser; relies on printed worksheets + classroom teacher tracking.
- **Mobile:** Icon-driven, compact layout. Responsive.
- **Accessibility:** Visible skip-to-content link. 30+ language dropdown in footer (Arabic, Hindi, Korean, Vietnamese, etc.).
- **Typography:** Google brand stack (system sans), large friendly icons.
- **Colour:** Google primary palette (blue, red, yellow) — bright, kid-coded.
- **Standout UX:** "Internet Code of Awesome" mnemonic framework. Gamified games with branded worlds. The pillar-and-icon card grid is the single most memorable pattern.

## 3. Get Safe Online (`getsafeonline.org`)

- **Navigation:** Dual-track — personal users and businesses. Personal track: Protecting Your Computer, Protecting Yourself, Smartphones & Tablets, Shopping / Banking, Safeguarding Children, Communication & Social Networking.
- **Module structure:** Article-library format. Each topic is an article, not a lesson.
- **Quiz / interactive:** Tool-based: "Is it a scam?" URL verifier, "Check a website" validator, "Spot the AI" feature, Self Help Tool Centre.
- **Progress tracking:** None (article reference site, not a course).
- **Mobile:** Hamburger menu for responsive nav. Cookie consent manager with granular Functional / Preferences / Statistics / Marketing controls.
- **Accessibility:** Welsh language (Cymraeg) toggle — a rare accessibility + inclusion combo.
- **Typography:** Clean, functional sans-serif.
- **Colour:** Professional blue/white with partner logo strip (Airbnb, Barclays, Tesco). Conveys credibility.
- **Standout UX:** Instant verification tools reduce anxiety. The pattern of "paste a URL, get a verdict" is extremely friction-light.

## 4. Age UK Digital (`ageuk.org.uk` technology section)

- **Navigation:** Hierarchical mega-menu — Information & Advice → Work & Learning → Technology & Internet. Breadcrumb trail on every page.
- **Module structure:** Scaffolded clusters — "Online Essentials" (foundational) → "Keeping in Touch" (communication) → "Managing Money Online" (financial). Matches learner progression.
- **Quiz / interactive:** Minimal. Content is article-based.
- **Progress tracking:** None.
- **Mobile:** Distinct mobile logo (stacked). Responsive, but no specific mobile-first features.
- **Accessibility:** "Interpreted calls via Wordskii" for non-English speakers. Skip-to-content link. Form validation. Visible phone helpline (0800 678 1602) reduces dependence on self-service.
- **Typography:** Clean sans-serif, senior-comfortable sizing.
- **Colour:** Age UK red accent (branded), white background.
- **Language:** Helpline interpretation, not UI translation.
- **Standout UX:** Video testimonials ("If I can do it, anyone my age can do it"). Closest in voice to DCC's kitchen-table tone. Large prominent helpline number is the right pattern for a senior audience that needs a human fallback.

## 5. AARP Personal Technology (`aarp.org/home-family/personal-technology/`)

- **Navigation:** Hierarchical mega-menu. Personal Tech → Smartphones / Computers / Artificial Intelligence. Prominent header search with topic filtering (Entertainment, Health, Money, etc.).
- **Module structure:** Thematic "Tech Packages" (curated topic bundles) — "Discover Smartphone Tools," "Smart Home Technology." "Ask the Tech Guru" advice column.
- **Quiz:** "AI Quiz: What's Real or Not" — real interactive quiz with results. AARP Rewards gamifies learning with points.
- **Progress tracking:** Member-gated (AARP Rewards points accrual); anonymous users see content without state.
- **Mobile:** Responsive grid.
- **Accessibility:** "AARP en Español" + Chinese language options. "Cobrowse" feature for screen-reader / assistive compatibility.
- **Typography:** Serif headlines + sans body (magazine-like).
- **Colour:** AARP signature red on white. High contrast.
- **Standout UX:** Multimedia mix — videos, webinars, articles, quizzes all side-by-side. Membership-gated "Members Only" badges. "Join Now" CTA strategically placed but not aggressive.

---

## What DCC should STEAL

| Pattern | Source | Why it fits DCC |
|---------|--------|-----------------|
| **Pillar-and-icon framework** | Be Internet Awesome | Seniors benefit from memorable visual anchors. Our 29 modules could group under 5–6 named pillars for cognitive ease. |
| **Instant verification tool** | Get Safe Online | A single "paste a suspicious email / URL, get a plain-English verdict" feature would dramatically reduce anxiety and is a standout B2B pitch for library/SME channels. |
| **Scaffolded clusters with clear progression** | Age UK | Foundational → Communication → Money Online. DCC currently shows 29 modules flat — clustering reduces decision fatigue. |
| **Large visible helpline number** | Age UK | Seniors want a human fallback. A visible "Call 1-844-DCC-HELP" in the footer (even if volunteer-staffed) builds trust. |
| **Member-free progress tracking** | GCF (implicit) vs AARP (gated) | Anonymous localStorage-only progress, no sign-up wall. DCC is already doing this; confirm we keep it. |
| **Language switch in footer** | Be Internet Awesome, AARP | Footer-level language toggle is the least intrusive placement. DCC's EN/FR (future ES) toggle should live there. |
| **Video testimonials from real users** | Age UK | "If I can do it, you can too" from actual seniors is higher-trust than any copy we write ourselves. |
| **Plain-text "Next / Previous" at the bottom of every lesson** | GCF Global | Zero navigation thinking required. Keeps the focus on the content, not the UI. |

## What DCC should AVOID

| Anti-pattern | Source | Why it's wrong for us |
|---|---|---|
| **Kid-bright colour palette** | Be Internet Awesome | Good for K–8, infantilising for seniors. Warm Hearth is deliberately the opposite. |
| **Sign-up wall / member-gating** | AARP Rewards | Erases trust and creates abandonment. DCC promise is "free, no account needed." |
| **Dense article-library UX without lesson progression** | Get Safe Online | Works for a scared adult hunting for a one-off answer, fails for guided learning. |
| **Dual-track nav (personal vs business) on the home page** | Get Safe Online | DCC B2B lives at `/b2b/` — keep the main site single-audience-focused. Avoid making seniors choose a track. |
| **Mega-menu with 20+ items** | AARP, Age UK | Senior cognitive load. Our nav should be ≤ 5 top-level items visible. |
| **Sponsor logo strip on every page** | Get Safe Online | Credibility via partners is helpful once (about page) but clutter elsewhere. |

## Which platforms are closest to DCC

1. **Age UK** — closest in tone (kitchen-table warmth), closest in audience (UK seniors). Weakest on interactive learning — mostly articles. Our opportunity: same warmth, better pedagogy.
2. **GCF Global / LearnFree** — closest in mission (free digital literacy, no login), weakest on tone (feels like a textbook). Our opportunity: same openness, much warmer voice.
3. **AARP** — closest in senior-focused content breadth, but member-gating and ad-driven. Our opportunity: the breadth without the commercial overlay.
4. **Get Safe Online** — strongest instant-verification tools. Our opportunity: steal the "paste-a-link, get a verdict" pattern as a single-page DCC feature.
5. **Be Internet Awesome** — wrong audience, but strongest pedagogical framework. Our opportunity: the pillar/icon mnemonic structure applied to adult content.

## TL;DR recommendation

DCC's positioning is the **intersection of Age UK's tone and GCF Global's openness** — plus pedagogical structure that neither has. The Warm Hearth theme already nails the tone. The next content-side move is to cluster the 29 modules into 5–6 named pillars (à la Be Internet Awesome) and add a single instant-verification tool (à la Get Safe Online) as the signature DCC feature.
