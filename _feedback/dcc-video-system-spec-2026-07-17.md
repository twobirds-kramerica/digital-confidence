# DCC Video System — Requirements, Model/Tool Decision & Governance

**Status:** SPEC (research-backed). Aaron flagged this as **brand risk if done poorly** — treat consistency, dignity, and IP-cleanliness as non-negotiable, above production speed or cinematic flash. Source: Aaron feedback 2026-07-17 (`aaron-dcc-feedback-2026-07-17.md`, section E) + tool research 2026-07-17.

> **Honesty up front (scope reality):** an actual rendered MP4 cannot be produced inside the Claude Code CLI — no video-render tool is wired here. What CAN be built (now + overnight): the full production spec, the character briefs, every pilot **script + storyboard**, and the branding guidelines — i.e. everything a render tool (or a person with tool access) needs to press "generate." Rendering waits on the tool decision + access (the "Samuel/tool" question, still open). This doc is that build.

---

## 1. Purpose & audience

Short (60–120s) introductory videos for **DCC Adults** modules (kids later). They open a module, not replace it. Audience: Canadian adults/seniors building digital confidence — often anxious about scams, tech, being "too old for this." Also seen by **libraries and government grant reviewers**, so the bar is credibility, not entertainment.

## 2. Non-negotiable requirements

1. **Tone: helpful, serious, warm — lightly fun. Never goofy.** No Monty-Python/South-Park gag energy (Aaron walked that back 2026-07-17).
2. **ORIGINAL characters only. Hard IP/likeness rule.** No real people (celebrities), no copyrighted/trademarked characters (Golden Girls, South Park, etc.). Right-of-publicity + copyright risk is unacceptable for a public, grant-funded product. Characters are the **same original etched DCC family** as the brand-library (`aaron-dcc-feedback` item D) — adult / teen / kid tiers, one style, age cues (ballcap/ponytail = kid, sunglasses = teen).
3. **Character consistency across every video.** A recurring, recognizable cast IS the brand. Inconsistent characters = the brand risk Aaron named. This single requirement drives the tool choice below.
4. **Bilingual: English + Canadian French (fr-CA), both, every video.** Spanish = backlog, not v1. FR must be genuine Canadian French, human-reviewed for dignity and accuracy (a mistranslation to a senior audience is a trust landmine, same class as a wrong scam fact).
5. **Captions + transcript, always** (WCAG / accessibility — this is a digital-confidence product; the videos must model the accessibility they teach). Burned-in captions + a separate text transcript per video.
6. **Low "AI slop."** Must not look like generic auto-generated video. Distinctive, calm, on-brand.
7. **Content accuracy gate** for any scam/safety content — same standard as the modules; no invented threats or fake statistics.

## 3. Script formula (introductory tier)

- **Hook:** "Did you know…" / "Have you ever had a moment where…" — name a real, relatable worry.
- **Reassure:** you're not alone / this is learnable / no judgement.
- **What you'll learn:** one plain sentence.
- **One concrete beat** from the module (not the whole lesson — this is the trailer).
- **Soft close → into the module.**
- Character reacts along the way: looks at phone, worried, scratches head, then relieved/confident. Mix of ages, men/women, bald/not — reflect the audience, not models.

## 4. Model / tool decision (the brand-risk call)

**Principle: own the character, control the render.** Because character *consistency* + *IP-ownership* + *low-slop* are the whole game, we choose control over cinematic flash.

**RECOMMENDED PIPELINE (Path A):**
- **Character design + library:** original etched DCC characters, designed once, stored as master reference assets (versioned, in-repo brief + exported art). This is the foundation — build before any video.
- **Animation/render:** **Adobe Character Animator** (rig the DCC character once, live lip-sync + puppet reuse, you **own the puppet file 100%**, zero likeness/IP risk, full brand control) — OR a **character-consistency AI tool seeded with the DCC character** (2026 tools now hit ~90%+ character consistency: Atlabs AI, OpenArt). Decide via a small bake-off on ONE character.
- **Voice:** bilingual TTS with real **fr-CA** support — ElevenLabs (fr-CA) or Azure/Google Neural TTS (fr-CA voices) — **with human FR review**.
- **Captions/transcript:** burned-in captions + separate transcript file, EN + FR.

**REJECTED for the recurring-character system:**
- **Raw generative video** (OpenAI Sora, Runway, Google Veo, Kling, Dreamina/Seedance): beautiful but *drifts* — cannot hold a consistent recurring character, highest slop/brand risk. Permitted later for incidental B-roll only, never for the cast.

**FALLBACK (only if Path A proves too slow):**
- **Colossyan** — strongest of the avatar-presenter tools for *education* (native in-video quizzes, branching, brand kit, auto-translate; ~$27–88/mo). **Caveat:** its avatars are realistic-human presenters, which conflicts with the original-cartoon-character direction *and* re-raises the "is this a real person?" concern. Use only as a stopgap; it will not deliver the distinctive DCC character. (Synthesia = enterprise polish/160+ langs; HeyGen = most lifelike lip-sync/175+ langs — same realistic-human caveat.)

**Sovereignty note (SOVEREIGNTY CHECK):** all viable tools are foreign paid SaaS; quality video cannot be self-hosted on current hardware. Treat as an **OSS-appendage-style exception with data-custody review** — risk is LOW (only a script + brand art go in; an owned video file comes out; no user PII). Prefer tools where **you own/export the character asset** (Adobe Character Animator wins — the puppet is a file you keep). **This decision needs an ADR** before spend (`hal-stack/architecture/decisions/`). Grant funding may cover tool cost — worth confirming eligibility.

## 5. Governance — branding guidelines as forced source of truth (Aaron's rule)

Aaron's directive: any LLM/model generating **scripts, videos, images, styling, or content** must be **forced to re-read the branding guidelines every run** (fresh, no drift) and **archive everything** produced.

Implement as:
1. **Canonical `dcc-brand-guidelines.md`** (to build): the character family + master reference art, colour/type tokens, tone rules, the HARD IP/likeness rules, the script formula, the bilingual + accessibility requirements.
2. **Forced-read gate:** every generative step (script draft, image gen, video render, styling) begins by reading `dcc-brand-guidelines.md` AND the target module's content JSON. Bake this into the build step / agent prompt so it cannot be skipped. Candidate for a DCC `PRODUCT.md` clause + a CLAUDE.md-adjacent rule.
3. **Archive everything, versioned:** every script, storyboard, character asset, voiceover, and rendered video stored under a dated/versioned path so any run is reproducible and re-grabbable. Never a one-off in chat.

**Model management (who does what):**
- **Script:** Claude (Sonnet to draft, Opus/human review for any scam/safety-sensitive content) — forced-read of guidelines + module content each run.
- **Character art:** original human/AI design, then consistency-seeded generation; master reference frames locked.
- **Voice:** en-CA + fr-CA TTS, **human FR review mandatory**.
- **Render:** Path A tool (Character Animator or seeded character-consistency tool).
- No single model owns the pipeline; **human gates on FR translation and scam-content accuracy** are required.

## 6. Build sequence (dependency order)

1. **Character family + brand-guidelines doc** (foundation — everything else depends on it). DESIGN GATE applies.
2. **Pilot script + storyboard** ×1 (see `dcc-video-pilot-01-*.md`) → Aaron reviews **before** any others are built.
3. **Tool bake-off** on the one character (Character Animator vs a seeded consistency tool) + **ADR**.
4. **Render pilot** (needs tool access — the "Samuel" question) → Aaron reviews the actual video.
5. Only then: expand to more modules.

## 7. Open items for Aaron
- **Tool access ("Samuel"):** which tool, and how do we get access? (Not found in Gmail 2026-07-17 — need the real name / rough date / account.)
- **ADR + spend approval** once the bake-off names a winner.
- **Grant-funding eligibility** for the tool cost (worth checking — it strengthens the "credible/funded" posture).

---

### Sources (tool research, 2026-07-17)
- [Synthesia — 18 Best AI Video Generators 2026](https://www.synthesia.io/post/best-ai-video-generators)
- [Colossyan — HeyGen vs Synthesia 2026](https://www.colossyan.com/posts/heygen-vs-synthesia/)
- [AI Magicx — HeyGen vs Synthesia vs Colossyan 2026](https://www.aimagicx.com/blog/heygen-vs-synthesia-vs-colossyan-avatar-comparison-2026)
- [Atlabs AI — Best AI Tools for Educational Videos 2026](https://www.atlabs.ai/blog/best-5-ai-tools-for-educational-videos-for-students-in-2026)
- [Digen — Top AI Video Tools for Educational Content 2026](https://resource.digen.ai/ai-video-tools-educational-content-2026/)
- [VideoAI.me — D-ID vs HeyGen vs Synthesia vs Colossyan 2026](https://videoai.me/blog/d-id-vs-heygen-vs-synthesia-vs-colossyan-comparison-2026)
