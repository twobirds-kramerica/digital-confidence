# DCC Reinforcement Video System — Template + Filled Examples (Component B)

**Reinforcement / completion tier, ~10 seconds each, always skippable.** This file is the reusable system for the short clips shown at section boundaries per `dcc-onboarding-and-measurement-2026-07-17.md` (component B). Voice: **Margaret** only (the single locked guide, `dcc-character-cast-architecture.md` §1; reinforcement clips are tip/guide content, so no story-cast member ever delivers them). Bilingual EN + fr-CA below; every FR line is DRAFT and human-review gated. Governance: written against the forced-read gate. `dcc-brand-guidelines.md`, the character cast architecture, the onboarding spec, and pilots 01–02 were read in full this run (Fable creative sprint, 2026-07-18).

---

## 1. Placement decision (the mapping the onboarding spec asked for)

The onboarding spec left open "start of each section and/or end of each section." **Recommendation: end of section only, one clip per section.** Rationale:

- **Start-of-section expectation-setting is already owned** by the module intro/trailer videos (pilot-01 tier: hook, reassure, "what you'll learn"). A second start-of-section clip would double-tax attention before any learning happens, the opposite of the airline-briefing calm the intro promises.
- **The completion moment is the dignity moment.** "You've completed X" only lands after X. Reinforcement, recall, and momentum all live at the boundary the learner just crossed.
- **One clip per boundary keeps the system maintainable** by a solo operator: N sections = N clips (x2 languages), not 2N.
- Start-of-section needs, if any emerge from testing, are served by a static one-line text card ("This section takes about X minutes"), not video. Cheap, never stale, no production pipeline.

**Skip mechanics (binding):** the clip auto-plays at the section-complete screen with a visible plain-language skip control ("Skip this, that's fine") from frame one. Skipping is never penalized, tracked, or commented on. Watching to the end shows the same "Continue when you're ready" control, no auto-advance: the learner decides when to move on.

**Level-profile note (cast architecture §3.2):** the congratulation line is the swap line. L2 baseline "Here's what you learned." L1 "You did the hard part." L3 "You're back up to speed on X." The recall beats are tier-stable. Mark this swap in every script now, render only L2 today.

---

## 2. Reusable template

**Shape (fits ~10 seconds at Margaret's 130–140 wpm, roughly 22–28 words):**

| Beat | Duration | Visual (etched style, no live UI) | Content rule |
|---|---|---|---|
| 1. Completion | ~3s | Margaret, warm neutral, small nod (beat 5 of her expression sheet: quietly pleased, the teacher watching a learner get it) | "You've completed [section name]." Plain, settled, no fanfare. |
| 2. Recall | ~5s | 2–3 simple etched icons from the section rise one at a time (the SAME icons the section itself used, recognition not decoration) | "You now know [two or at most three concrete things], " named in plain words, spoken and shown. |
| 3. Close | ~2s | Margaret, gentle closed-mouth smile; soft DCC end-card | One settled closing line. Rotate from the approved closing bank below so clips do not feel photocopied. |

**Closing-line bank (approved variants, one per clip, rotate):**
- "Well done."
- "That's real progress."
- "Take a break, or keep going. Your choice."
- "The next section will be there when you're ready."

**Template narration (EN):**
> You've completed [section]. You now know [thing one], [thing two], and [thing three]. [Closing line.]

**Template narration (fr-CA), DRAFT, human FR review gated:**
> Vous avez terminé [section]. Vous savez maintenant [élément un], [élément deux] et [élément trois]. [Phrase de clôture.]

**fr-CA closing bank (DRAFT):** « Bravo. » · « C'est un vrai progrès. » · « Prenez une pause, ou continuez. C'est vous qui décidez. » · « La prochaine section vous attendra. »

**Hard rules for any filled instance:**
- Never more than three recall items. If a section taught five things, name the two or three that matter most; the recall beat is confidence, not a syllabus.
- Recall items are stated as things the learner now KNOWS or CAN DO ("how to spot a scam text"), never as topics covered ("we discussed phishing").
- No exclamation marks, no "amazing/awesome", no celebration sounds. A settled falling close, per the voice baseline.
- Everything shown is also spoken; burned-in captions EN and FR; `.vtt` transcript per language.
- Accuracy gate applies to the recall wording exactly as it does to modules: never claim the section taught something it did not.

---

## 3. Filled examples

Section names below are descriptive working titles (staleness rule: if final site labels differ, adjust the one name-word, not the clip concept). Each is one ~10s clip, L2 baseline, with the L1/L3 swap-line marked.

### 3.1 Scam awareness ("Spotting scams")

- **Icons (recall beat):** the three tells from pilot-01: unexpected / rushing you / wants money or details.
- **EN:**
  > You've completed Spotting Scams. You now know the three tells: it's unexpected, it rushes you, it wants money or details. That feeling? You can trust it now.
- **fr-CA (DRAFT):**
  > Vous avez terminé « Reconnaître les fraudes ». Vous connaissez maintenant les trois indices : c'est inattendu, on vous presse, on veut de l'argent ou vos renseignements. Ce sentiment? Vous pouvez maintenant vous y fier.
- **Swap line:** L1 "You did the hard part: you learned what to look for." / L3 "You're back up to speed on today's scam patterns."
- **Note:** the closing reuses Margaret's signature line from pilot-01, deliberately: the callback IS the reinforcement.

### 3.2 Video calling ("Video calls with family")

- **Icons:** phone with a smiling face on screen / a tapped green button / a waving hand.
- **EN:**
  > You've completed Video Calls. You now know how to answer a call, how to start one, and how to hang up when you're done. That's real progress.
- **fr-CA (DRAFT):**
  > Vous avez terminé « Les appels vidéo ». Vous savez maintenant répondre à un appel, en commencer un, et raccrocher quand vous avez terminé. C'est un vrai progrès.
- **Swap line:** L1 "You did the hard part: your first call is behind you." / L3 "You're back up to speed on video calling."

### 3.3 Staying safe with AI ("Talking to AI, safely")

- **Icons:** a speech bubble with a small spark / a question mark over the bubble / a shield.
- **EN:**
  > You've completed Talking to AI. You now know what these tools are, what they get wrong, and what never to share with them. Well done.
- **fr-CA (DRAFT):**
  > Vous avez terminé « Parler à l'IA ». Vous savez maintenant ce que sont ces outils, les erreurs qu'ils peuvent commettre, et ce qu'il ne faut jamais leur confier. Bravo.
- **Swap line:** L1 "You did the hard part: AI is a little less mysterious now." / L3 "You're back up to speed on what AI tools can and can't do."
- **Accuracy note:** "what they get wrong" must match the section's actual content (hallucination, confident errors). Do not soften to "AI is always safe" or harden to fear-mongering; the section's own claims govern.

### 3.4 Getting set up ("Getting started with your device")

- **Icons:** the device trio from pilot-02 (phone, tablet, laptop) / a power button / a home-screen grid.
- **EN:**
  > You've completed Getting Started. You now know your way around your device: turning it on, finding your apps, and getting back home. Take a break, or keep going. Your choice.
- **fr-CA (DRAFT):**
  > Vous avez terminé « Premiers pas ». Vous savez maintenant vous retrouver sur votre appareil : l'allumer, trouver vos applications, et revenir à l'accueil. Prenez une pause, ou continuez. C'est vous qui décidez.
- **Swap line:** L1 "You did the hard part: the device in your hands makes sense now." / L3 "You're back up to speed on this device."

### 3.5 Passwords and locking up ("Protecting your accounts")

- **Icons:** a key / a padlock / two checkmarks (the "two steps" motif).
- **EN:**
  > You've completed Protecting Your Accounts. You now know what makes a password strong, and how a second step keeps your accounts yours. That's real progress.
- **fr-CA (DRAFT):**
  > Vous avez terminé « Protéger vos comptes ». Vous savez maintenant ce qui rend un mot de passe solide, et comment une deuxième étape garde vos comptes bien à vous. C'est un vrai progrès.
- **Swap line:** L1 "You did the hard part: your accounts are safer tonight than they were this morning." / L3 "You're back up to speed on account security, including what's changed."

### 3.6 Staying connected ("Messages and staying in touch")

- **Icons:** a speech bubble with a heart (pilot-02 motif) / a photo frame / a send arrow.
- **EN:**
  > You've completed Staying in Touch. You now know how to send a message, share a photo, and reply when someone writes back. The next section will be there when you're ready.
- **fr-CA (DRAFT):**
  > Vous avez terminé « Rester en contact ». Vous savez maintenant envoyer un message, partager une photo, et répondre quand on vous écrit. La prochaine section vous attendra.
- **Swap line:** L1 "You did the hard part: someone is going to love hearing from you." / L3 "You're back up to speed on messaging."

> **FR REVIEW FLAG (applies to every FR line above):** human Canadian-French review required before any render. Check the warm formal « vous » register, Canadian word choices (« texto », « renseignements », « appareil », « applications », not France-French equivalents), and clip timing: FR runs longer, so the FR cut may need ~11–12s; never let the pace speed up to fit. Section names in FR must match the site's final FR labels.

---

## 4. Voice, accessibility, governance

- **Voice:** Margaret's locked baseline (cast architecture §1.4) at 130–140 wpm, never faster, even at 10 seconds. If a script cannot be spoken calmly in ~10s, cut a recall item; never compress the read. One pinned voice ID per language, version-pinned; drift check against the archived reference read before any batch render.
- **Visuals:** etched style per `dcc-character-art-briefs.md`; Margaret crop A (guide frame) or reaction-insert bust; recall icons in the three-weight linework on warm paper tokens. No live UI, ever (staleness rule).
- **Accessibility:** burned-in captions both languages; separate `.vtt` and `.txt` transcript per language per clip; everything on screen is spoken; high-contrast end-card; never black text on the darker-blue banners (known bug class, brand guidelines §4).
- **Archive:** each clip's script lives in this file (versioned); each render archives under a dated path with its voice settings block, per the brand governance clause.
- **No data collection:** clips fire on a purely client-side section-complete state (localStorage at most); nothing about completion or skipping leaves the device (ADR-0004).

## 5. What a reviewer (Aaron) is signing off on here

1. **Placement:** end-of-section only, with static text (not video) if start-of-section framing is ever needed. Approve or redirect.
2. **The template shape** (completion, three-item recall, rotating settled close) as the reusable pattern for every future section.
3. **The closing-line bank** wording, EN and FR.
4. **The six example scripts**, especially 3.3 (AI section: is the "what never to share" framing the right level of caution?).
5. FR drafts proceed to human Canadian-French review once EN wording is approved.
