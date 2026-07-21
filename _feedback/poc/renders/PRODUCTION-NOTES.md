# LOON Phase 1 — DCC Intro/Welcome — PRODUCTION NOTES

**First real LOON production.** Bilingual (Canadian English + Canadian French) intro/welcome video
for the Digital Confidence Centre, produced end-to-end on the sovereign free pipeline (zero spend).
Rendered 2026-07-20.

## Deliverables (full paths)

- `C:\twobirds\digital-confidence\_feedback\poc\renders\LOON-dcc-intro-EN-2026-07-20.mp4`
- `C:\twobirds\digital-confidence\_feedback\poc\renders\LOON-dcc-intro-FR-CA-2026-07-20.mp4`
- Final scripts: `LOON-dcc-intro-EN-script.md`, `LOON-dcc-intro-FR-CA-script.md` (same folder)
- Render template (both languages, one file): `C:\twobirds\digital-confidence\_feedback\poc\dcc-intro-welcome-render.html`
- Render script: `C:\twobirds\digital-confidence\_feedback\poc\renders\loon-render.py`

## ffprobe-confirmed output specs

| File | Duration | Resolution | Video | Audio |
|------|----------|-----------|-------|-------|
| `LOON-dcc-intro-EN-2026-07-20.mp4` | 98.56s (1:38) | 1280x720 | H.264 (yuv420p, 30fps) | AAC mono |
| `LOON-dcc-intro-FR-CA-2026-07-20.mp4` | 105.39s (1:45) | 1280x720 | H.264 (yuv420p, 30fps) | AAC mono |

Both play, both have a real video stream + audio stream, both non-zero duration. Both run **under two
minutes**, which honours the spoken/on-screen "less than two minutes" claim (accessibility rule: never
state a length the video does not keep).

## Pipeline (sovereign, free, zero spend — ADR-0023)

HTML render template -> Playwright/Chromium clean frame capture (1280x720) -> edge-tts narration ->
ffmpeg frame-hold + mux. No paid services, no API keys, no accounts.

**Exact reproduction command** (from `_feedback/poc/renders/`):

```
python loon-render.py            # both languages
python loon-render.py en          # EN only
python loon-render.py fr          # fr-CA only
```

Requires: `playwright` (+ chromium), `edge-tts`, `ffmpeg`/`ffprobe` on PATH.

What `loon-render.py` does per language:
1. Loads `dcc-intro-welcome-render.html?lang=en|fr` in headless Chromium at 1280x720, disables CSS
   transitions/animations (single-slide capture — no ghosting), screenshots `#stage` per scene to
   `frames-loon-<lang>/frame-N.png`. Captions are part of the HTML stage, so they are **burned into
   the frames** (no separate subtitle-burn step).
2. Synthesizes one MP3 per scene with edge-tts. EN voice `en-CA-ClaraNeural` (rate -8%);
   fr-CA voice `fr-CA-SylvieNeural` (rate -6%). Both are free Microsoft Edge neural voices.
3. Reads each clip's real duration via ffprobe; holds each frame for its actual audio length so
   audio and video pacing line up 1:1.
4. Concatenates narration -> AAC track; renders the video track (libx264, fps=30, yuv420p); muxes
   `-c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -shortest -movflags +faststart`.

The raw ffmpeg mux (if re-muxing by hand from the intermediate artifacts):
```
ffmpeg -y -i frames-loon-<lang>/video-only.mp4 -i audio-loon-<lang>/narration-full.m4a \
  -c:v copy -c:a aac -b:a 160k -map 0:v:0 -map 1:a:0 -shortest -movflags +faststart OUT.mp4
```

## Spec / tone compliance

- **Style:** warm, dignified animated-slideshow. Dark calm blue DCC palette, etched line-art guide
  figure, large serene typography. Airline-safety-briefing shape: length stated up front, permission
  to skip/pause, everything on screen is also spoken. No goofiness, low "AI slop."
- **Bilingual:** both EN (en-CA) and fr-CA produced. FR is natural Canadian French (register "vous",
  inclusive "les Canadiennes et les Canadiens", "habiletés / appareil / briser / en contact"), not
  France French.
- **Burned-in captions in BOTH:** the spoken line is shown as a large (27px), bold, high-contrast
  white caption on a dark scrim in every scene, in the matching language. Legible for seniors.
- **Original characters/imagery only:** the guide figure and all device/section motifs are original
  inline SVG line-art. No real-person likeness, no IP, no copyrighted characters.
- **Canadian content:** no American flag, no US symbols, no US imagery anywhere. Copy is Canadian
  (Canadians / Canadiennes et Canadiens; Canadian English spelling: "organized" per source, "Centre").
  Neutral illustration only.
- **Staleness rule:** no live website UI shown; navigation described in plain words over generic
  motifs, so the video stays true when the site design changes.

## Honest quality read / for Aaron's eye

- **Voice is stock neural TTS, not Margaret's real voice.** edge-tts `en-CA-ClaraNeural` /
  `fr-CA-SylvieNeural` are a solid free step up from Windows SAPI, but they are generic voices, not
  a cast/voice-actor Margaret. Good enough to prove LOON end-to-end and to watch; a public senior-
  facing release would likely want a professional read or higher-tier voice once ADR-0023 (sovereign-
  vs-paid TTS) is settled with Aaron.
- **fr-CA script is agent-translated.** It reads as natural Canadian French, but a human fr-CA
  review before any external publication is still recommended (flagged in the FR script file).
- The etched guide figure is a **neutral placeholder** for Margaret, not final locked character art
  (final art is gated on the DESIGN GATE / master reference art step).
- edge-tts calls a Microsoft cloud synthesis endpoint per line — free and keyless, but not a fully
  local/offline model. This does not pre-empt ADR-0023's still-open sovereign-vs-paid decision.
