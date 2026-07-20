# Kids AI Learning Sites — Validation Research (2026-07-20)

**Sprint:** S-DCC-KIDS-AI-RESEARCH — research-first, NOTHING shipped. Gated design proposal only.
**Source:** Sabrina Ramonov TikTok screenshots, `C:\Users\getkr\Downloads\Photos-1-001\` (14 images, all read).
**Extends:** Notion P3 backlog item `3a3a09cf-876a-81d2-903d-fa36f1bd4d60` (kids-AI idea).
**Trigger:** Aaron 2026-07-20 catchup — validate before ever referencing on DCC youth site, with adult disclaimer/supervision framing, government-safe (library/grant path).

---

## 1. Image batch read — what was actually in the screenshots

14 screenshots total, two distinct TikToks from Sabrina Ramonov (`@sabrina.dev` persona):

- **3 screenshots (2026-07-12 capture)** were actually about a *different* topic — "ChatGPT Resume Maxxing," a resume-rewrite prompt. Not kids-AI content. Excluded from this research (noted so the read is stamped complete, not silently dropped).
- **9 screenshots (video: "Teach your kids AI," posted 2025-02-26, 6,281 likes)** — the core source. Named 6 concrete sites + 1 direct-ChatGPT-access recommendation + her own funnel plug (`Sabrina.DEV`, not a kids-AI site, excluded).
- **2 screenshots (video: "7 free AI projects to do with your kids," posted ~2026-07-19, 100 likes)** — activity ideas, not sites. Listed 7 project prompts using ChatGPT directly plus a hashtag/caption reference to "#2 Talk to Character" (Character.AI), and Suno for music generation.

**Sites/tools named (7 total, ranked as presented):**
1. Scratch — `scratch.mit.edu`
2. CodeMonkey — `CodeMonkey.com`
3. Create & Learn — `create-learn.us/ai-for-kids`
4. Teachable Machine — `teachablemachine.withgoogle.com` (displayed as "Teachable Machine dot...")
5. Code.org — `code.org`
6. Tynker — `Tynker.com`
7. Machine Learning for Kids — `MachineLearningForKids.co.uk`

**Plus two direct-AI-access mentions that are NOT kid-specific tools** (flagged separately below):
- ChatGPT — `chat.openai.com`, recommended by Sabrina for direct child use
- Character.AI — referenced via hashtag/caption in the second video ("Talk to Character")

---

## 2. Per-site validation

### 1. Scratch (scratch.mit.edu) — **RECOMMEND**
- MIT Media Lab, free, no ads, does not sell/rent account data.
- Age band: 8–16 (companion product ScratchJr for ages 5–7).
- Not strictly AI — it's the foundational visual-coding platform other AI-for-kids tools (Tynker, Machine Learning for Kids) are built on top of. Include as prerequisite context, not an "AI site" itself.
- Safety caveat: no private messaging, but everything posted is public — Common Sense Media and parent reports flag inconsistent content moderation on public "Scratch" project comments/community. COPPA compliance is described as "better than most" but not airtight — under-13 users can post public info without a parental-consent gate.
- **Adult supervision required for the community/sharing features**, not for the core editor.

### 2. CodeMonkey (CodeMonkey.com) — **RECOMMEND-WITH-CAVEATS**
- GDPR-compliant, HIPAA BAA available on eligible plans (signals mature privacy posture).
- Paid: ~$6–12/month (individual/family), sweet spot ages 8–10; a driven 12-year-old exhausts content quickly.
- Caveat: **paid subscription** — cannot be a bare link on a free/no-data DCC page without a clear "this costs money" label, and billing/cancellation complaints appear in reviews (Trustpilot).
- Coding-puzzle game, not really "AI" in the generative sense — closer to CS fundamentals.

### 3. Create & Learn (create-learn.us/ai-for-kids) — **RECOMMEND-WITH-CAVEATS**
- Live, small-group (3–5 student) online classes with vetted/background-checked, US-based instructors (many are certified teachers). Grades 4–12 AI tracks (AI Explorers, ChatGPT Class, AI Creators).
- Caveat: **paid, live video classes with a real instructor** — this is a fundamentally different risk profile than a self-serve website (requires video/audio access, scheduling, payment, an account for the child or parent). Too heavyweight to "reference as a fun interactive add-on" on a static DCC page; more appropriate as a text mention only ("paid live classes exist, e.g. Create & Learn") with no embed/iframe.

### 4. Teachable Machine (teachablemachine.withgoogle.com) — **RECOMMEND**
- Free, Google, **no login required**, no premium tier. Default mode trains entirely client-side in-browser — nothing uploaded to Google unless the user explicitly chooses to save to Drive.
- This is the strongest privacy match for DCC's own ADR-0004 no-auth/no-data posture (see Section 3).
- Age band: 8+ (some sources say usable younger with adult help). Genuinely hands-on ML training (image/sound/pose classifiers) — matches the "structured AI interaction" framing experts want (see Section 4), not passive chat.

### 5. Code.org (code.org, now branded CodeAI) — **RECOMMEND**
- Nonprofit, free, 92M+ students. Complies with COPPA, FERPA, GDPR; does not sell data, no ads; received one of the highest Common Sense Media privacy ratings.
- New AI Tutor tool has multi-layer safety moderation on every message, age-calibrated behaviour, 90-day auto-delete, no data sold/used for training.
- Strongest institutional/government-safe credibility of any site in the list — a nonprofit ed-tech org already trusted by school boards is the lowest-risk reference for a library-funded product.

### 6. Tynker (Tynker.com) — **RECOMMEND-WITH-CAVEATS**
- Built on Scratch. kidSAFE Seal certified, no ads. 5,000+ lessons spanning Minecraft modding to AI basics. Ages ~5–14.
- Caveat: Common Sense Privacy flags a "Warning" rating around unclear third-party data-sharing/ad-targeting practices in some evaluations — mixed relative to Code.org/Teachable Machine. Freemium; full content is paid ($25/student/yr school pricing).
- Usable as a mention, not a first-tier recommendation, pending a fresh privacy-policy read at reference time.

### 7. Machine Learning for Kids (MachineLearningForKids.co.uk) — **RECOMMEND**
- Free, 9+ years running, described by reviewers as "the gold standard for classrooms." Minimal data collection — classroom accounts work without student emails. Author (Dale Lane) publishes a 100+ point privacy rubric reviewed quarterly.
- Hands-on: kids train text/image/number/sound classifiers (image/sound run locally via TensorFlow.js; text/number use IBM Watson on IBM Cloud — flag this as the one component that leaves the browser).
- Age band: 9+. UK-based (relevant only in that PIPEDA vs UK-GDPR differs slightly — no material blocker for a Canadian reference link).

### ChatGPT direct access (chat.openai.com) — **AVOID (as a kids' link)**
- OpenAI's own Terms of Use: minimum age 13, and 13–17 requires parental/guardian permission. **Not permitted for under-13 use at all**, even with parental consent, per OpenAI's ToS. OpenAI has added automated age-prediction in 2026 to catch minors misrepresenting their age.
- Sabrina's video recommends giving kids "direct access" to ChatGPT — this directly conflicts with OpenAI's own age policy for any child under 13, and DCC's youth track (13–17, per the existing `module-ai-literacy-youth.html`) sits right at the boundary requiring parental permission either way.
- **Do not link chat.openai.com directly for unsupervised child use.** If referenced at all, frame it as "an adult uses ChatGPT together with the child, on the adult's own account" — never as a tool the child opens alone.

### Character.AI (referenced in the second TikTok) — **AVOID — HARD FLAG**
- Active, serious child-safety litigation: a 14-year-old's 2024 suicide (Sewell Setzer III, Florida) and a 13-year-old's 2025 suicide (Colorado) are both directly linked to Character.AI chatbot interactions in ongoing lawsuits. Character.AI and Google agreed to settle multiple teen-harm suits in January 2026. Kentucky's AG filed a first-in-nation state suit in January 2026. Texas AG has an open investigation calling these platforms a "clear and present danger" to youth.
- Character.AI introduced an under-18 open-ended-conversation ban in November 2025 in response — i.e., **even Character.AI itself now agrees minors should not have open-ended access.**
- **This must never be referenced, linked, or suggested on DCC in any form**, including indirectly via "AI project ideas" content that mentions "Talk to Character." This is the single highest-risk item found in the whole image batch — Sabrina's second video casually includes it in a kid-activity list without the caveat that it is currently the subject of active wrongful-death litigation.

---

## 3. Cross-check against DCC constraints

- **ADR-0004 (DCC No-Auth, universal public access):** DCC's foundational architecture is zero login, zero persistent data, all state in browser sessionStorage, nothing transmitted to any server. Any kids-AI reference embedded in DCC must not require the child (or the page) to create an account, submit an email, or persist data server-side.
  - **Best fit:** Teachable Machine (default local-only mode, no login) and Code.org (COPPA/FERPA/GDPR-compliant, no ads, no data sale) are the closest philosophical matches — both can be *linked out to* without DCC itself collecting anything.
  - **Worse fit:** Create & Learn (requires payment + scheduling + likely an account) and CodeMonkey/Tynker (paid subscriptions, accounts) — these can be *mentioned* as external paid options but should not be embedded, iframed, or presented as "click here to start now" without a clear external-site/paid-service disclaimer.
  - **No fit:** ChatGPT direct access and Character.AI — both fail on age-gating and (for Character.AI) active litigation; excluded entirely regardless of ADR-0004.
- **Government-safe / library-funding sensitivity:** the NHSP/library grant path depends on DCC being unimpeachably safe, low-controversy, and defensible under funder scrutiny. Referencing Character.AI in any capacity (even a "here's what to avoid" callout that names it) is a reputational risk not worth taking near a grant-funded product — cleaner to describe the class of risk (AI companion apps with romantic/open-ended roleplay) without naming the specific litigation-active brand, unless a specific "myth vs. fact" framing is deliberately chosen and Aaron signs off on it.
- **Existing DCC youth track (13–17):** `module-ai-literacy-youth.html`, `module-ads-youth.html`, `module-gems-youth.html`, `module-pressure-youth.html` already exist (currently deferred/out of adult-v2-scope per `docs/dcc-v2-scope.md`, hand-crafted scenario-engine pages). Any kids-AI-sites feature belongs alongside this existing youth track, not as a new standalone product — it's an *addition to* the AI-literacy-youth module, not a new page category.
- **No child data collection:** none of the RECOMMEND/RECOMMEND-WITH-CAVEATS sites should ever be embedded via iframe or API call from DCC — pure outbound text links only, so DCC itself never sees or transmits child usage data.

---

## 4. Expert grounding (kids AND seniors — supervised/structured AI interaction)

**Kids:**
- American Psychological Association health advisory: AI chatbot tools for youth are "easy to access and low-cost" but currently lack scientific evidence/regulation to guarantee safety; adolescents are less likely to question AI accuracy, and dependence can interfere with real-world relationship development.
- American Academy of Pediatrics (AAP journal blog, "Chatbots & Checkups"): recommends therapy/companion bots be used as a *scaffold, not a substitute* for real care; explicitly states chatbots "do not actually care about children" despite warm tone, and cannot replace stable human relationships.
- AAP's core practical guidance: "the key is not prohibition but informed supervision" — parent has the conversation about what the tool is/isn't, watches for what the bot said that surprised/bothered the child, builds "digital literacy" (how chatbots generate responses, recognize manipulative design).
- Consensus across sources: **structured, purpose-built, hands-on tools (train a classifier, write code, complete a guided lesson) are a meaningfully different risk category than open-ended conversational/companion chatbots** — this is exactly the line between the RECOMMEND sites above (Teachable Machine, Code.org, Machine Learning for Kids — all task-based, not conversational) and the AVOID items (ChatGPT direct/Character.AI — both open-ended conversation).

**Seniors (context-check per Aaron's ask, since DCC's core audience is 50+):**
- Peer-reviewed and industry sources describe *structured, supervised* AI companion use for seniors positively: reduced loneliness/anxiety/depression in small studies, cognitive-support chatbots with orientation cues for dementia care, reminiscence-therapy-style engagement — but every credible source pairs this with **supervision** (an activity director in the room, family involvement) and a caution that AI must not replace licensed therapists, and can mask cognitive decline if family aren't also checking in directly.
- This mirrors the kids finding almost exactly: **task-based/supervised = supported by evidence; unsupervised open-ended companion use = flagged as risky** across both age brackets. Strengthens the case that DCC's "structured, adult-supervised, disclaimer-labelled" framing (Section 5) is the evidence-aligned choice, not just a legal-caution default.

---

## 5. Gated design proposal — NOT BUILT, sign-off required before any implementation

**Concept:** a small "AI for kids to try" panel/callout added to the existing youth AI-literacy module (`module-ai-literacy-youth.html`), not a new page.

**What it would contain (draft only):**
- 3–4 outbound links, RECOMMEND-tier only: Teachable Machine, Code.org, Machine Learning for Kids, and Scratch (as the "how coding works" prerequisite). No CodeMonkey/Tynker/Create & Learn in the first cut — those are paid/account-gated and add complexity DCC doesn't need to carry for a v1 callout.
- Each link opens in a new tab, plain outbound `<a>` — no iframe, no embed, no data transmitted from DCC.
- A visible disclaimer block above the links, e.g. (draft wording, not final — voice-check required before ship):
  > *These are external, free websites — not part of Digital Confidence Centre. An adult should sit with the child the first time, since these link away from this site. None of these tools use open-ended AI chat with strangers; they're hands-on ("teach the computer to recognize a cat," "write a program") — a different, safer category than AI chatbot apps.*
- Explicit exclusion note (internal build note, not shown to users): never add ChatGPT-direct or any AI-companion/roleplay app (Character.AI class of product) to this list, per Section 2/3 above.
- No account, no login, no data captured by DCC — consistent with ADR-0004.
- Framing stays inside the existing 13–17 youth track; not exposed on the 50+ adult track (different audience, different module).

**What this proposal explicitly does NOT do:**
- Does not touch any live file.
- Does not commit to exact copy, placement, or visual design — that's a DESIGN GATE + PRODUCT.md decision for a future sprint.
- Does not decide whether this ships at all — that's Aaron's call given the government-safe/grant sensitivity flagged in Section 3.

**Next step (not taken in this sprint):** if Aaron approves the concept, file a normal build sprint that goes through DESIGN GATE (PRODUCT.md anti-references, impeccable audit) and QA/QC/UAT gate before any code is written.

---

## Sources

- [Common Sense Media — Scratch parents' guide](https://www.commonsensemedia.org/website-reviews/scratch)
- [Scratch parents help page](https://scratch.mit.edu/help/parents/)
- [CodeMonkey pricing](https://app.codemonkey.com/plans)
- [Trustpilot — CodeMonkey reviews](https://www.trustpilot.com/review/codemonkey.com)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)
- [Kids AI Tools — Teachable Machine review 2026](https://www.kidsaitools.com/en/articles/teachable-machine-review-2026)
- [Code.org / CodeAI Privacy Policy](https://code.org/en-US/privacy)
- [Code.org AI Tutor privacy policy](https://support.code.org/hc/en-us/articles/37172111941389-Code-org-Artificial-Intelligence-Privacy-Policy)
- [Common Sense Media — Tynker](https://www.commonsensemedia.org/website-reviews/tynker)
- [Common Sense Privacy Evaluation — Tynker](https://privacy.commonsense.org/evaluation/Tynker-Coding-Games-for-Kids)
- [Machine Learning for Kids review 2026](https://www.kidsaitools.com/en/articles/machine-learning-for-kids-review-2026)
- [Machine Learning for Kids — official site/help](https://machinelearningforkids.co.uk/#!/help)
- [Create & Learn — AI for Kids](https://www.create-learn.us/ai-for-kids)
- [OpenAI Terms of Use](https://openai.com/policies/row-terms-of-use/)
- [OpenAI Help Center — Is ChatGPT safe for all ages?](https://help.openai.com/en/articles/8313401-is-chatgpt-safe-for-all-ages)
- [Character.ai Lawsuit 2026 update — TruLaw](https://trulaw.com/ai-suicide-lawsuit/character-ai-lawsuit/)
- [CNBC — Google, Character.AI settle suits over teen suicides](https://www.cnbc.com/2026/01/07/google-characterai-to-settle-suits-involving-suicides-ai-chatbots.html)
- [CNN — Character.AI and Google settle lawsuits](https://www.cnn.com/2026/01/07/business/character-ai-google-settle-teen-suicide-lawsuit)
- [APA — Your teen turned to AI instead of you](https://www.apa.org/topics/artificial-intelligence-machine-learning/teens-chatbots-parents)
- [AAP Journal Blogs — Chatbots & Checkups](https://publications.aap.org/journal-blogs/blog/34499/Chatbots-Checkups-Navigating-Generative-AI-in)
- [Psychology Today — The Risks in Children's Use of Chatbots](https://www.psychologytoday.com/us/blog/mental-health-care-today/202602/the-risks-of-childrens-use-of-chatbots)
- [Harvard Business School AI Institute — AI companions for older adults](https://aiinstitute.hbs.edu/navigating-the-promise-and-peril-of-ai-companions-for-older-adults/)
- [U.S. News — AI care companions for seniors](https://health.usnews.com/senior-care/articles/ai-care-companions-for-seniors)
- [PMC — AI chatbot loneliness qualitative study, empty-nest elderly](https://pmc.ncbi.nlm.nih.gov/articles/PMC12922247/)
