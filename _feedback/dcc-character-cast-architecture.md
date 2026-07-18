# DCC Character Cast & Levelled-Experience Architecture — DRAFT for Aaron review

**Status: DRAFT — DESIGN GATE not cleared.** Everything here is DIRECTION for Aaron's taste sign-off, not final art. Produced by the Fable creative sprint 2026-07-18, against the forced-read gate: `C:\twobirds\digital-confidence\_feedback\dcc-brand-guidelines.md` was read in full first, plus `dcc-video-system-spec-2026-07-17.md`, `dcc-video-pilot-01-scam-text-script.md`, `dcc-onboarding-and-measurement-2026-07-17.md`, and `aaron-dcc-feedback-2026-07-17.md`.

**Aaron's direction this implements (verbatim intent):** characters, not just one — each with a persona, pitch, tone, and a voice-track baseline so nothing fluctuates over time. Guide/tip trainer = a single person (Margaret). Use-cases and stories get a whole cast (kids, grandkids, colleagues, etc.) to meet the needs of any script. Future: match avatar/persona/script to the USER'S level (intake suggests low level → matched experience; competent professionals just out of the game → dynamic). For now one experience ships, but the system is ARCHITECTED for a variable, personalized experience.

**Hard rules inherited (binding):** original characters only, zero real-person/IP likeness; Calm/Capable/Dignified tone; bilingual EN + fr-CA with human FR review; captions + transcript always; no data collection beyond local-only (ADR-0004).

---

## 1. The Guide — Margaret (single trainer persona, LOCKED)

There is exactly ONE guide/tip/trainer voice across all of DCC Adults. Margaret teaches; the story cast lives the scenarios. This separation is deliberate: learners bond with one consistent teacher (parasocial trust — the "patient, respected friend" of the brand essence), while stories can rotate faces without diluting that trust.

### 1.1 Persona (canonical record)

| Field | Value |
|---|---|
| Name | **Margaret Doyle** (surname proposed — gives her a full name for scripts and credits; Aaron to approve) |
| Age | 71 |
| Home | A mid-sized Ontario town (never named on screen — keeps her every-Canadian) |
| Backstory | Retired elementary-school teacher (34 years) and one-time library volunteer coordinator. She was NOT an early adopter — she learned smartphones in her sixties, made every mistake her learners are afraid of, and remembers exactly what each one felt like. Widowed; two adult children; three grandchildren (who appear in the story cast). She is tech-*competent now*, not tech-native — and says so. |
| Role | Sole on-camera guide for: module intro/trailer videos, the welcome/onboarding video, reinforcement/completion clips, and any "here's a tip" content. |
| Why a teacher | It licenses her authority without condescension. She has spent a career making nervous learners feel capable. Her instinct is to normalize, then explain, then hand back control. |
| Signature gesture set (for animation rigging) | Sets the phone down face-down when making a point; small nod with closed-mouth smile; open palms ("you're in charge here"); reading glasses pushed up into hair when moving from "the problem" to "the fix". |
| What she never does | Panic, mock, rush, use jargon without unpacking it, or express amazement that a learner didn't know something. |

### 1.2 Pitch (one paragraph, reusable in briefs)

Margaret is the friend you wish lived next door: a retired teacher who figured this stuff out herself, later in life, and now walks you through it the way she walked six-year-olds through their first sentences — patiently, warmly, never once making you feel small. She's not a tech person. She's a *people* person who learned tech, and that's exactly why you believe her when she says "you can do this."

### 1.3 Tone rules (Margaret-specific, on top of brand tone)

- First person plural where possible: "let's look at it together," not "you should."
- Permission-giving in every appearance: skipping, pausing, re-watching are always explicitly okay.
- Light, dry warmth, never jokes at anyone's expense. One gentle smile-line per video maximum (e.g. "I nearly paid that $1.85 myself, once").
- Concrete before abstract: she names the thing on screen before naming the concept.
- Canadian English; her fr-CA counterpart voice must carry the same warm "vous" register (human FR review gate applies).

### 1.4 Voice-track baseline (anti-drift spec)

This is the documented reference every voice generation MUST match. Any render that deviates is rejected, same class as off-brand art.

| Parameter | Baseline |
|---|---|
| Register | Warm mezzo, lower-mid female range (~165–185 Hz median pitch). Not "elderly-quavery," not broadcast-polished. |
| Pace | **~130–140 words per minute** (noticeably slower than the ~150–160 wpm ad default). Never faster, even in the 10-second reinforcement clips. |
| Pauses | A full beat (~0.6–0.8 s) after every question and before every "here's the good news" turn. Pauses are a feature — they model calm. |
| Intonation | Low dynamic range; sentences end settled (falling), never with hype-lift. Questions rise gently, not theatrically. |
| Accent | Standard Canadian English (en-CA). fr-CA voice: genuine Québécois/Franco-Ontarian register, warm formal "vous" — never France-French neutral. |
| Emotional palette | Calm → engaged → gently pleased. Banned: excitement peaks, sadness performance, alarm. Worry is *acknowledged* in words, never performed in the voice. |
| Signature verbal habits (use sparingly, 0–2 per script) | "Let's take a look together." · "That feeling? Trust it." · "Take your time — the video will wait." |
| Recommended TTS realization | One named voice per language, **pinned by voice-ID and version** in the render config, with a locked settings block (stability high, style-exaggeration low). Candidate voices come out of the tool bake-off (see `dcc-video-tool-research-fable.md`); the RULE here is: one voice ID per language, version-pinned, re-auditioned only via a deliberate re-cast decision by Aaron — never silently upgraded when a vendor ships a "better" model. Keep a 60-second **reference read** (the pilot-01 EN and FR narrations) archived in-repo as the canonical A/B check for any new render. |
| Drift check | Before any batch render: generate the reference read with current settings, compare by ear (and optionally an automated pitch/tempo diff) against the archived canonical read. Mismatch = stop, fix settings, do not ship. |

---

## 2. The Story Cast (original etched characters — direction, not final art)

Rules of the cast:
- All ORIGINAL. No real-person likeness, no IP echoes. Names chosen to be common-Canadian and to avoid collision with well-known fictional characters.
- Same etched illustration style as Margaret; three age tiers per the brand guidelines (adult/senior, teen, kid) with the approved age cues.
- Every cast member is emotive (worried → uncertain → calm → reassured) and dignified. Nobody is ever the fool; scam victims are competent people targeted by professionals.
- Each has a locked one-line role, persona, tone, and voice-track baseline so scripts can be cast like a rep company: pick the character the scenario needs, and they always sound like themselves.
- Cast members mostly appear in scenario/story videos and the story-arc content line. Margaret may introduce or debrief a story, but she does not act inside the scenarios.

### Cast roster (8 characters)

#### 2.1 Walter (senior tier) — "the second learner"
- **Role:** Margaret's peer — a 74-year-old retired millwright who is one step behind the viewer, asks the questions the viewer is embarrassed to ask.
- **Persona:** Practical, hands-good-with-tools, phone-shy. Proud, so he pretends he's asking "for a friend." Warm-gruff. Recently learned video calls to see his grandson in Alberta — that win is his origin story.
- **Tone:** Plain-spoken, short sentences, understated. Relief shows as a slow exhale, not celebration.
- **Voice baseline:** Low male register (~95–110 Hz), slow (~120–130 wpm), slightly gravelled, flat-affect warmth. Never doddering; think "measured tradesman."

#### 2.2 June (senior tier) — "the confident one who got caught"
- **Role:** A 68-year-old retired office manager who is GOOD with tech — and still nearly got scammed. She carries the "this happens to sharp people" message.
- **Persona:** Brisk, organized, a little self-deprecating about the one time the CRA-call scam almost had her. Insists on telling the story so it doesn't happen to you.
- **Tone:** Energetic-but-calm, candid, zero shame. Her refrain: "and I *know better* — that's the point."
- **Voice baseline:** Bright alto (~180–200 Hz), ~140 wpm (the fastest senior voice, still under ad pace), crisp consonants, confiding tone.

#### 2.3 David (adult tier, ~45) — "the sandwich-generation son"
- **Role:** Margaret's son; a working dad helping his mum with tech while raising kids. Anchor for the Practitioner/Parent/Family audience cut.
- **Persona:** Kind, busy, occasionally over-explains and catches himself. Learning that helping is not doing-it-for-her. IT-adjacent job (never specified) so he's fluent but not preachy.
- **Tone:** Casual, affectionate, self-correcting ("sorry, Mum — you drive, I'll watch").
- **Voice baseline:** Mid male (~110–125 Hz), ~145 wpm natural conversational, soft energy, smiles audibly.

#### 2.4 Priya (adult tier, ~38) — "the colleague at work"
- **Role:** Workplace-scenario anchor (phishing emails, suspicious invoices, password hygiene at the office). A pharmacy technician and the person at work everyone quietly asks for help.
- **Persona:** Patient, precise, never showy about knowing things. First-generation Canadian; her own parents are DCC's audience, which is why she cares.
- **Tone:** Clear, stepwise, reassuring; the "let me show you the checklist" energy.
- **Voice baseline:** Mid-range female (~175–195 Hz), ~140 wpm, even and precise, gentle authority.

#### 2.5 Marcus (teen tier, 16) — "the grandson who translates"
- **Role:** The teen who explains tech to grandparents *respectfully* — models how young people can help without taking over. Bridge character for teen content later.
- **Persona:** Walter's grandson. Easygoing, plays soccer, teaches his grandfather one thing per visit. Sunglasses pushed up (approved teen cue). Motto: "you're not bad at this, Grandpa — it's badly designed."
- **Tone:** Relaxed, encouraging, a touch of gentle humour; never sarcastic at a senior's expense.
- **Voice baseline:** Light young-male (~120–140 Hz), ~150 wpm but drops to ~135 when explaining, upbeat-calm.

#### 2.6 Sophie (kid tier, 9) — "the grandkid"
- **Role:** Kids-content anchor (later) and occasional story-warmth in adult videos (video-calling Grandma, showing a drawing). Ponytail (approved kid cue).
- **Persona:** Curious, careful — she asks a grown-up before tapping things (modelling the exact behaviour DCC Kids teaches). David's daughter, Margaret's granddaughter.
- **Tone:** Bright, sincere, calm-for-a-kid; junior but never silly-goofy (brand rule).
- **Voice baseline:** Child female (~230–260 Hz), ~130 wpm (kids' content slows down, not up), clear diction, warm.

#### 2.7 "The Caller" (adult tier, ageless ~40s) — the scam archetype, done tastefully
- **Role:** The recurring face(-less) of the threat: scam calls, texts, pop-ups. Appears as a silhouette / heavily-shaded etched figure at a desk with a headset — deliberately generic, never monstrous, never ethnically or nationally coded.
- **Persona:** A professional doing a job — which is the honest, dignity-preserving truth ("these are organized businesses, not clever tricksters targeting the gullible"). No backstory sympathy, no cartoon villainy.
- **Tone:** Smooth, plausible, mild urgency — the *scripts* scammers actually use (accuracy gate applies: patterns must be real, documented ones; no invented threats).
- **Voice baseline:** Deliberately ordinary mid male or female (can vary by scenario — the ONE cast member allowed voice variation, because interchangeability IS the lesson), ~150 wpm with pressure-tempo rising slightly; always ends defeated by a calm hang-up/ignore.
- **Design guardrail:** on-screen depiction stays abstract (silhouette, phone-screen text) so no real demographic ever gets painted as "the scammer."

#### 2.8 Eleanor (senior tier, 79) — "the one further along"
- **Role:** Aspirational elder — a 79-year-old who now runs her book club's group chat and banks online confidently. She's proof the destination exists.
- **Persona:** Serene, wry, unhurried. Took DCC-style small steps for a year. Gives the "if I can, you can — and I mean that literally" testimony beats and end-of-arc reassurance.
- **Tone:** Slow, twinkly, certain. The emotional payoff voice.
- **Voice baseline:** Soft lower female (~160–175 Hz), the slowest cast voice (~115–125 wpm), long settled phrase-ends, quiet smile throughout.

### Cast usage rules
1. **Margaret teaches; the cast lives.** No cast member delivers tips-to-camera; Margaret never acts inside a scenario.
2. **Context-relevant casting** (Aaron's "make it feel like a game"): workplace topic → Priya; family-help topic → David/Sophie; "sharp people get caught" → June; motivation/why-bother → Eleanor/Walter; any threat → The Caller.
3. **Consistency is the brand:** each character's persona/tone/voice block above is the canonical record; renders that drift are rejected. Master reference art (once designed, post-DESIGN-GATE) is version-pinned in-repo and every generation seeds from it.
4. **Bilingual parity:** each character gets ONE pinned fr-CA voice with the same personality spec; FR is never a flattened generic read.
5. **Family map (for continuity):** Margaret — son David — granddaughter Sophie. Walter — grandson Marcus. June, Priya, Eleanor unrelated (keeps casting flexible). Cross-character scenes allowed (e.g. Margaret and Walter at the community centre).

---

## 3. Levelled-Experience Architecture (DESIGN ONLY — not built now)

Aaron's future idea, architected so today's single experience becomes tomorrow's personalized one without rework: the user's level (from a light intake) selects the guide persona variant, script variant, pacing, and examples. "Competent professionals just out of the game" get a different experience than true beginners.

### 3.1 Level tiers (proposed — 3, not 5; fewer tiers = maintainable by a solo operator)

| Tier | Working name | Who it is | Self-described as |
|---|---|---|---|
| L1 | **Starting Out** | Little/no smartphone-internet confidence; may fear breaking things | "I avoid it when I can" |
| L2 | **Getting Comfortable** (DEFAULT — today's single experience ships here) | Uses the basics, unsure about safety and anything new | "I manage, but I'm never sure" |
| L3 | **Back in the Game** | Competent professionals recently retired / out of the workforce; skills real but stale (new scams, new UI patterns, passkeys) | "I used to be good at this" |

### 3.2 What changes per tier (and what NEVER changes)

**Never changes:** tone dignity, bilingual parity, accessibility, accuracy, the cast identities, Margaret as guide, brand visual system.

| Dimension | L1 Starting Out | L2 Getting Comfortable | L3 Back in the Game |
|---|---|---|---|
| Guide framing | Margaret at her warmest-slowest; more first-plural "we" | Margaret baseline (as specced in §1) | Margaret peer-to-peer: brisker, drops re-explanations, "you know this part — here's what changed" |
| Pace | ~120–130 wpm, longest pauses | ~130–140 wpm (baseline) | ~140–150 wpm, shorter pauses |
| Vocabulary | Every term unpacked; no unexplained jargon ever | Terms named then unpacked once | Technical terms used, only NEW concepts unpacked (e.g. passkeys yes, "browser" no) |
| Reassurance density | High — permission statement in every segment | Medium — open and close | Low — one respectful acknowledgement ("stepping back in is normal"), then substance |
| Examples/casting | Home + family scenarios (Walter, Sophie, David) | Mixed (baseline) | Workplace-adjacent + current-threat scenarios (Priya, June); emphasis on what's NEW since they were current |
| Video length bias | Shorter chunks, more of them | 60–120 s baseline | Denser 60–90 s |
| Reinforcement clips | "You did the hard part" framing | "Here's what you learned" (baseline) | "You're back up to speed on X" |

Mechanically this is **one script template with three rendering profiles**, not three script sets — the hook/reassure/learn/beat/close formula stays; a level profile adjusts narration variant, TTS pace setting, and example selection. Cost of a new module ≈ 1 script + 2 variant passes, not 3 scripts.

### 3.3 Level selection within ADR-0004 (no data collection — local-only signal)

- **Intake:** the existing onboarding flow adds ONE optional self-placement question ("Which sounds most like you?" — the three "self-described as" lines above). Skippable; skipping = L2 default. This piggybacks on the planned baseline comfort self-check (component C of the onboarding spec) — one instrument, two uses.
- **Storage:** `localStorage` key only (e.g. `dcc.level = "L1"|"L2"|"L3"`). No account, no server, no cookie, no PII. Clearing browser data resets to default — acceptable and honestly documented.
- **Delivery:** static-site compliant (Five Non-Negotiable Rules): all tier variants are pre-rendered static assets; a few lines of client-side JS pick which video/transcript/text variant to show based on the local key. No backend, no per-user rendering.
- **Adjustability:** a visible, plain-language control ("Change how DCC talks to you") lets the user switch tiers any time — self-determination, not profiling.
- **Aggregate stats:** none by default. If grant reporting later needs tier-mix counts, that is opt-in anonymous aggregate only and requires the ADR-0004 review already flagged in the onboarding spec — this architecture does not need it to function.
- **Honest-copy caution (Aaron's "free" wording flag):** the placement question must never read as a price of entry; copy states "this just changes pacing and examples — you can skip it."

### 3.4 Build sequencing (recommendation)

1. Ship L2 only (current plan — nothing changes).
2. When writing pilot scripts, mark the 3–5 lines per script that a tier profile would swap (near-zero cost now, huge cost saved later).
3. L3 "Back in the Game" is the first expansion (Aaron's stated interest; smallest delta — same videos re-paced/re-framed, strong differentiator for library/grant positioning: "meets professionals where they are").
4. L1 last — it benefits most from real learner feedback before writing.

---

## 4. Governance + open decisions for Aaron

**Governance (inherits the forced-read gate):** this file becomes a companion canonical artifact to `dcc-brand-guidelines.md`. Any model generating scripts/casting/voice MUST read both before producing. Every voice render archives its settings block + reference-read comparison. Character/voice changes require an explicit Aaron decision recorded here — no silent recasts.

**Open for Aaron's review:**
1. Approve/adjust Margaret's full name (Doyle), backstory, and voice-track baseline (§1).
2. Approve the 8-character roster, names, and the family map (§2) — or cut/add (6–10 range is healthy; 8 proposed).
3. Approve The Caller's abstract-silhouette treatment (§2.7) — the one creatively risky call; alternative is no embodied scammer at all (threats shown only as screen content).
4. Approve the 3-tier levelled architecture as DIRECTION (§3) and the "mark swap-lines in scripts now" practice.
5. DESIGN GATE: commission the master reference art for Margaret first, then the cast, in the etched style — only after 1–3 are approved.
