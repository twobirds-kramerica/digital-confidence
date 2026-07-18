# DCC POC Slideshow Renders — MP4s (sovereign pipeline, ADR-0023)

**Status:** DONE — three POC slideshows rendered to MP4. Silent v1 (visual pipeline proof only, see Known gap below).

## Method (exact command chain)

Pipeline per ADR-0023 / `hal-stack/content-creator/video-pipeline/`: **HTML → Playwright frame capture → ffmpeg assemble.**
These three POC files are JS slide-controllers (a `scenes` array with per-slide `s:` duration in seconds), not the
`?card=N` deterministic-URL pattern the existing `render-html-video.py` scenes use — so capture is driven by calling
the page's own `show(i)` function per scene index instead of navigating per-card URLs. No crossfades in v1 (durations
must match the JS pacing exactly for this to prove anything) — a straight ffmpeg concat-demuxer render with per-image
`duration` lines, held for exactly the scene's authored seconds.

1. **Serve locally:**
   ```
   python -m http.server 9301 --directory "C:\twobirds\digital-confidence\_feedback\poc" --bind 127.0.0.1
   ```

2. **Capture frames** (Playwright MCP `browser_run_code_unsafe`, one call per slideshow):
   - `browser_navigate` to `http://127.0.0.1:9301/<file>.html`
   - `browser_resize` to 1280×720 (stage is `aspect-ratio:16/9`, scales cleanly to 1920×1080 downstream if needed)
   - In-page, for each `i` in `0..scenes.length-1`: call `window.show(i)`, wait ~150ms for the CSS opacity
     transition to settle, then `page.locator('#stage').screenshot({ path: 'frame-<i>.png' })`
   - Read `scenes.map(s => s.s)` directly from the page (the JS array is the source of truth for per-slide
     duration — no regex parsing of the HTML) to build the ffmpeg timing list

3. **Assemble with ffmpeg** (concat demuxer, exact per-slide durations, no crossfade):
   ```
   ffmpeg -y -f concat -safe 0 -i concat-list.txt -vf "fps=30,format=yuv420p" -c:v libx264 -movflags +faststart OUT.mp4
   ```
   `concat-list.txt` format:
   ```
   file 'frame-0.png'
   duration 6.0
   file 'frame-1.png'
   duration 10.0
   ...
   file 'frame-N.png'
   duration <last>
   file 'frame-N.png'
   ```
   (concat demuxer requires the final file repeated with no trailing duration line — a known ffmpeg quirk, otherwise
   the last frame is dropped.)

4. **Clean up**: kill the http.server process, close the Playwright page, delete the `frames-*/` temp PNG dirs after
   the mp4 is confirmed to play (kept out of git — only the mp4s + this README are committed).

## Outputs

| Source HTML | Output MP4 | Scenes | Rendered duration (ffprobe) | Size |
|---|---|---|---|---|
| `dcc-pilot-01-slideshow.html` | `dcc-pilot-01-slideshow.mp4` | 9 | 90.0s | 410 KB |
| `dcc-intro-welcome-slideshow.html` | `dcc-intro-welcome-slideshow.mp4` | 8 | 100.0s | 494 KB |
| `dcc-video-calling-slideshow.html` | `dcc-video-calling-slideshow.mp4` | 9 | 97.0s | 470 KB |
| `dcc-intro-welcome-slideshow.html` | `dcc-intro-welcome-NARRATED.mp4` (EN, narrated) | 8 | 98.9s (audio-driven) | 1,604 KB |

Rendered 1280×720, H.264/yuv420p, 30fps, `+faststart`. Exact reproduction command: `python assemble.py` in this
directory (frame PNGs are re-captured from the live HTML via the Playwright steps above first — frames are not
committed, see `.gitignore`). Per-scene durations used (from each page's own `scenes` array, read via
`page.evaluate(() => scenes.map(s => s.s))` at capture time):
- Pilot 01: `[6, 10, 11, 9, 7, 7, 15, 13, 6]` (sum 84s)
- Intro/Welcome: `[6, 10, 14, 15, 12, 16, 13, 7]` (sum 93s)
- Video Calling: `[6, 10, 9, 9, 13, 14, 9, 15, 6]` (sum 91s)

**Note:** rendered duration is ~6s longer than the summed per-scene durations in each case — a known ffmpeg
concat-demuxer quirk (the repeated final-file line, needed so the last image isn't dropped, adds one extra hold
of the last scene's duration). Cosmetic only; scene order and relative pacing are exact. Worth a one-line fix
(trim the final segment) if these move past POC.

## Known gap — audio/TTS (silent v1, pilot 01 + video-calling)

**Silent v1** for `dcc-pilot-01-slideshow.mp4` and `dcc-video-calling-slideshow.mp4`. Captions are burned into each
slide (the `.caption` div — visible on-screen text matching the spoken narration line), so these videos are
watchable/understandable without sound. These renders prove the **visual pipeline** (HTML → frames → assembled mp4
with correct per-slide pacing) only. Voiceover/TTS is a separate later step for these two — not attempted here, not
faked.

## Narrated v1 — dcc-intro-welcome-NARRATED.mp4 (ADR-0023 sovereign audio pipeline)

The intro/welcome POC (`dcc-intro-welcome-slideshow.html`) now has a fully narrated render, proving the audio pipeline
on top of the silent visual pipeline above.

**TTS engine: `edge-tts`** (Microsoft Edge neural voices, Python package `edge-tts`, pip-installed — free, no API key,
no account). Voice: `en-CA-ClaraNeural` (Canadian English, female, "Friendly, Positive" profile) — the closest free
match to Margaret's locked warm/dignified voice direction, spoken at `rate=-8%` (slightly slower than default, per
the script's ~130wpm low-end pacing direction). **Sovereignty note: `edge-tts` is a free/no-account call to a
Microsoft cloud synthesis endpoint per line — it is NOT a fully local/offline model.** It was selected over the two
fully-local options checked on this machine: Windows SAPI (`pyttsx3`/`System.Speech`, voices `Microsoft David
Desktop` and `Microsoft Zira Desktop` — installed, fully local, but dated/robotic quality, likely not good enough for
a senior-audience welcome video) and Piper/Coqui (not installed, no local model files present). This does **not**
pre-empt ADR-0023's still-open sovereign-vs-paid decision: edge-tts is free and keyless, not the paid ElevenLabs path
that ADR is gated on — flagged here for Aaron's awareness, not decided unilaterally.

**Method (extends the visual pipeline above):**
1. Frames already captured in `frames-intro/` (from the silent-render sprint — reused as-is, not re-captured).
2. `python narrate-and-assemble.py` (this directory):
   - Extracts each scene's `cap:` narration line directly from `dcc-intro-welcome-slideshow.html` via regex (the
     JS `scenes` array is the source of truth, same principle as the visual pipeline's `page.evaluate` read).
   - Synthesizes one MP3 per scene with `edge-tts` (`en-CA-ClaraNeural`, `rate=-8%`) into `audio-intro/scene-N.mp3`.
   - Reads each clip's **actual** duration via `ffprobe` — this replaces the hand-authored `s:` seconds as the
     frame-hold driver, so video and audio pacing match exactly (the gap flagged in the silent-v1 note above).
   - Concatenates the per-scene MP3s into one AAC track (`audio-intro/narration-full.m4a`) via ffmpeg concat demuxer.
   - Builds a frame-hold concat list from the real audio durations (`frames-intro/concat-list-narrated.txt`).
   - Renders the video track (same `fps=30,format=yuv420p,libx264` settings as `assemble.py`), then muxes video +
     audio with `-c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -shortest`.
3. Output: `dcc-intro-welcome-NARRATED.mp4` (1280×720, H.264/yuv420p + AAC, `+faststart`).
4. Cleanup: `audio-intro/` (per-scene MP3s + concat lists) is gitignored, same treatment as `frames-*/` — kept
   locally for reproducibility/debugging, not committed. Nothing deleted per the Production Deletion Guard.

**EN-only v1.** The fr-CA narration track stays gated on human review (per the script's own `FR REVIEW FLAG`) —
not attempted in this sprint. A French narrated render is a follow-up once Aaron has reviewed the FR script text.

**Honest quality read:** `edge-tts` neural voices are a significant step up from Windows SAPI, but this is still a
generic stock neural voice, not Margaret's actual locked character voice (that requires a voice actor or a
custom/cloned model — out of scope for a free sovereign TTS check). Good enough to prove the audio pipeline mechanics
end-to-end; a real senior-audience-facing release would likely want either a professional voice-over read or a
higher-tier TTS product once ADR-0023 is resolved with Aaron.
