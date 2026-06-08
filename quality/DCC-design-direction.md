# DCC Design Direction
**Source:** NotebookLM synthesis, 2026-06-08 | Archive: `hal-stack/research/notebooklm-dcc-design-2026-06-08.md`
**Status:** Active — informs all DCC UI sprints from this date forward
**Refresh:** 2026-12-08

---

## What DCC Is Building Toward

DCC is not a documentation site. It is a confidence-building environment. The design goal is not "readable content" — it is a user who finishes a module feeling more capable than when they started. Every design decision is filtered through that lens.

Primary persona: **Brenda** — senior, anxious about technology, motivated by social connection (grandchildren, community), deterred by fear of doing something wrong, doing something expensive, or being embarrassed.

Secondary persona: **Youth facilitator context (6-12)** — youth who may use DCC alongside seniors in library/school settings, or as "tech tutor" mentors. Design must work for both without alienating either.

---

## The 7 Concrete Steals (Prioritised by Sprint Readiness)

### 1. "Time to Confidence" labels on every module card
**From:** Coursera
**What:** Add estimated time label to each module card. Not "8 minutes" — "8 mins to learn Video Calls."
**Why:** Brenda's top anxiety is not knowing how long something takes or where it ends. A visible time estimate removes the fear of getting lost.
**DCC status:** Module time estimates exist in module-grid.js MODULE_META but display as generic "About 15 min." Need to personalise per module with specific skill language.
**Sprint:** S-DCC-TIME-LABELS — update MODULE_META with module-specific "X mins to learn [skill]" strings. 1 hour.

### 2. "Coach Tips" callouts that validate feelings
**From:** Khan Academy
**What:** Callout blocks in module content that acknowledge anxiety rather than just giving tips. Example: "It's normal to feel nervous when your phone makes a new sound. Here is what it usually means."
**Why:** Normalising anxiety reduces shame and increases persistence. Brenda stays in the module instead of closing the tab.
**DCC status:** Not implemented. Module content is instructional, not emotionally validating.
**Sprint:** S-DCC-COACH-TIPS — design a reusable "Coach Tip" callout component (CSS + HTML pattern) and retrofit it into at least modules 1, 2, 3.

### 3. "Small Wins" intra-module progress bar
**From:** Duolingo
**What:** A thin progress bar inside each module that moves as Brenda reads sections or answers quiz questions — no login required.
**Why:** Immediate visual validation of persistence. Brenda doesn't have to wait for a quiz result to feel she's making progress.
**DCC status:** Quiz completion is tracked (localStorage). Intra-module reading progress is not.
**Sprint:** S-DCC-SMALL-WINS — add session-scoped reading progress indicator per module page.

### 4. "Confidence Badge" system — effort, not just correct answers
**From:** LiveSchool
**What:** Badges awarded for viewing all tips in a module, attempting a first video call, completing the module regardless of quiz score. Not just "quiz passed."
**Why:** For Brenda, the attempt is the achievement. Rewarding effort over correctness reduces test anxiety and keeps learners engaged through difficulty.
**DCC status:** No badge system exists. Quiz completion is tracked but not surfaced as achievement.
**Sprint:** S-DCC-BADGES — design badge definitions + localStorage tracking + home page display. 3 hours.

### 5. "Focus Mode" toggle — hide sidebars during reading
**From:** Thinkific
**What:** A toggle that hides the sidebar and top nav while inside a module, leaving only content + Next/Back buttons.
**Why:** Seniors experience choice paralysis from too many onscreen options. Eliminating nav reduces cognitive load at the moment of highest concentration.
**DCC status:** Sidebar is always visible in modules.
**Sprint:** S-DCC-FOCUS-MODE — CSS class + toggle button wired to localStorage. 1 hour.

### 6. "Connect with Youth" activities at module end
**From:** My Story Project
**What:** A short optional activity at the end of social/communication modules. "Try sending this 'Hello' message to your grandchild today."
**Why:** Seniors' strongest motivation is social connection. Bridging digital skill to a real relationship goal creates immediate application and emotional payoff.
**DCC status:** No intergenerational activities exist in module content.
**Sprint:** S-DCC-CONNECT-ACTIVITIES — content additions to Social Media, Video Calls, Photos modules.

### 7. "Hero" instructor framing per module (longer term)
**From:** MasterClass / Candoo Tech
**What:** Each module or category attributed to a named guide/expert. "Guided by Aaron" or "Your tech guide: [persona name]." High-contrast hero treatment per section.
**Why:** Restores dignity to senior learners who feel talked down to. A named human guide builds trust faster than anonymous content.
**DCC status:** DCC has a warm editorial voice but no named guide persona.
**Sprint:** S-DCC-GUIDE-PERSONA — design decision (Aaron as guide, or a fictional "Neighbour" persona). Requires Aaron input before sprint can run.

---

## 5 Senior Design Principles — DCC Compliance Check

| Principle | DCC Current State | Gap |
|-----------|------------------|-----|
| Normalize Technology Anxiety | Partial — "About This Site" copy does this for the home page. Not inside modules. | Coach Tips callouts needed in every module |
| Prioritize "Why" Over "What" | Partial — some modules lead with use cases. Not consistent. | Module intros need lifestyle-goal framing review |
| Minimize Cognitive Load | Improved — accordion grouping shipped today. Modules are still long-scroll. | Focus Mode + paged module option |
| Human-Centered Coaching Voice | Strong — editorial voice is warm and non-technical throughout | Maintain; do not let AI-generated content erode this |
| Design for Digital Resilience | Strong — Safety First category, fraud modules 3-5 | Already a core DCC strength |

---

## 5 Youth Design Principles — DCC Compliance Check

| Principle | DCC Current State | Gap |
|-----------|------------------|-----|
| Design for Facilitation | Partial — content exists but no facilitator guides inside modules | Module discussion prompts for library/school use |
| Intergenerational Relatability | Weak — no "you as mentor" framing | Connect with Youth activities needed |
| Immediate Visual Cues | Partial — module cards have icons. Module interiors are text-heavy. | More icon use inside module content |
| Safe Sandbox Quizzes | Strong — quizzes already allow retries, no grades | Maintain |
| Visual Progress Mapping | Weak — accordion shows sections but no "journey map" view | Visual progress map for kids skin (S-DCC-KIDS-TOKENS sprint) |

---

## Sprint Priority Order (from this research)

| Priority | Sprint | Effort | Revenue Link |
|----------|--------|--------|-------------|
| P1 | S-DCC-TIME-LABELS | 1 hr | Lowers barrier for new users — adoption |
| P1 | S-DCC-COACH-TIPS | 2 hrs | Retention — reduces module abandonment |
| P2 | S-DCC-SMALL-WINS | 2 hrs | Engagement — institutional demo quality |
| P2 | S-DCC-FOCUS-MODE | 1 hr | Accessibility — AODA alignment |
| P2 | S-DCC-BADGES | 3 hrs | Engagement + freemium cert upsell setup |
| P3 | S-DCC-CONNECT-ACTIVITIES | 3 hrs | Intergenerational differentiation |
| P3 | S-DCC-GUIDE-PERSONA | Aaron input needed | Brand trust — institutional pitch |
