# DCC Beta Welcome — PRODUCTION NOTES (2026-07-27)

**This is the real beta-welcome asset.** It supersedes the earlier
`loon-testing-video-capabilities-EN-2026-07-27.mp4`, which was a capability pilot whose
entire subject was "can we make a video at all." That pilot is now **retired as a
deliverable** — keep it as the pipeline-proof record, do not send it to a beta tester.
The asset a beta tester receives is the one below.

## Deliverables (full paths)

- **EN (en-CA):** `C:\twobirds\digital-confidence\_feedback\poc\renders\dcc-beta-welcome-EN-2026-07-27.mp4`
- **FR (fr-CA):** `C:\twobirds\digital-confidence\_feedback\poc\renders\dcc-beta-welcome-FR-CA-2026-07-27.mp4`
- Sidecar captions: `dcc-beta-welcome-EN-2026-07-27.vtt`, `dcc-beta-welcome-FR-CA-2026-07-27.vtt` (same folder)
- Render template (both languages, one file): `C:\twobirds\digital-confidence\_feedback\poc\dcc-beta-welcome-render.html`
- Render runner (unchanged, reused): `C:\twobirds\digital-confidence\_feedback\poc\renders\loon-render-generic.py`

## ffprobe-confirmed output specs

| File | Duration | Resolution | Video | Audio | Size |
|------|----------|-----------|-------|-------|------|
| `dcc-beta-welcome-EN-2026-07-27.mp4` | 41.9s | 1280x720 | H.264 (yuv420p, 30fps) | AAC | 795 KB |
| `dcc-beta-welcome-FR-CA-2026-07-27.mp4` | 43.1s | 1280x720 | H.264 (yuv420p, 30fps) | AAC | 921 KB |

Both land inside the 30 to 45 second brief. The first cut ran 61.9s and the narration was
tightened twice against measured render length, not estimated word counts.

## Pipeline

Unchanged and sovereign (ADR-0023, zero spend): HTML template → Playwright/Chromium clean
frame capture at 1280x720 → edge-tts narration per scene → each frame held for its own real
audio duration → ffmpeg mux to H.264 + AAC. Captions are burned into the frames by the
template AND emitted as a `.vtt` sidecar.

**Voice: `en-CA-ClaraNeural` at rate -8%, `fr-CA-SylvieNeural` at -6%.** Deliberately the
current LOON standard voice, unchanged. A voice change is a separate open question with
Aaron and was explicitly out of scope for this build.

## Visual treatment — and what is honestly NOT in it

- Uses the actual DCC Adult Warm Hearth palette from `css/tokens.css` (primary `#1D4E89`,
  accent `#E0A63A`, bg `#F8F9FB`), not the dark navy stage the earlier LOON pilots used.
  This is a product asset shown to real people, so it wears the product's brand.
- Caption bar is solid brand navy with white text, well past WCAG AA, because this audience
  frequently reads along or watches with the sound off.
- **No Margaret, and nothing that implies her.** No locked character art exists yet. The
  figures are original line art (a door, a pair of hands, a speech bubble) in the brand
  palette. Drawing a stand-in character for a welcome video would set an expectation the
  product cannot yet keep. Same honest-about-what-exists posture as the previous pilot.
- Do not block this asset on the Hugging Face connector / free image-gen question. If and
  when character art is approved, the template is one file and can be re-rendered.

## Content — the six beats Aaron confirmed, and where each one lives

| # | Beat | Scene |
|---|---|---|
| 1 | Welcome, built with people like you in mind | 0 |
| 2 | Topic range, from the real module list | 1 |
| 3 | This is for adults; a separate kids version is nearly done, not this one | 2 |
| 4 | Thank you for joining the pilot group | 3 |
| 5 | Explore freely; say so when something is not clear | 4 |
| 6 | The optional email ask, framed honestly | 5 |

Scene 1's six topics are pulled from live `index.html` module titles, not invented:
spotting scams, online banking safely, passwords, video calls with family, telehealth
appointments, and understanding AI.

**One deliberate wording change from the brief.** The brief said "there's a feedback button
on screen any time something isn't clear." That is no longer true and the video does not say
it. The same sprint removed the floating feedback button (PRODUCT.md names floating feedback
bubbles as an anti-pattern) and replaced it with an in-flow block at the end of every lesson
plus a "Give feedback" link in every page footer. The narration describes what the product
actually does: "There is a Give feedback link on every page."

## Narration — EN (en-CA), spoken text = burned-in caption, one line per scene

1. Welcome to the Digital Confidence Centre, built for people like you.
2. Short lessons on scams, banking, passwords, video calls, telehealth and artificial intelligence.
3. This is the adult version, not the one for younger people. That one is nearly ready.
4. Thank you for joining the pilot group. Explore freely.
5. If something is not clear, tell us. There is a Give feedback link on every page.
6. We only ask for your email if you want us to remember your place. Optional, and never required.
7. Take your time.

## Narration — FR (fr-CA)

1. Bienvenue au Centre de confiance numerique, concu pour des personnes comme vous.
2. De courtes lecons sur les fraudes, la banque, les mots de passe, les appels video, la telesante et l'intelligence artificielle.
3. Ceci est la version pour adultes, pas celle pour les jeunes. Celle-la est presque prete.
4. Merci de participer au groupe d'essai. Explorez librement.
5. Si quelque chose n'est pas clair, dites-le nous. Chaque page a un lien Donner mon avis.
6. Nous demandons votre courriel seulement si vous voulez qu'on retienne ou vous en etes. Facultatif, et jamais obligatoire.
7. Prenez votre temps.

**FR status: shipped, not fast-followed.** The claims are identical to EN, the product already
ships French content, and no new claim was introduced in translation. Accents are omitted in the
source strings for the same encoding-safety reason the other LOON templates omit them; the
`fr-CA-SylvieNeural` voice pronounces them correctly regardless. A native-speaker read-through
before this goes to a French-speaking tester is still worth Aaron's five minutes, and is the
one open item on this asset.

## Regenerate

```
cd C:\twobirds\digital-confidence\_feedback\poc\renders
python loon-render-generic.py --template ../dcc-beta-welcome-render.html \
       --slug dcc-beta-welcome --lang en --lang fr --date 2026-07-27
```
