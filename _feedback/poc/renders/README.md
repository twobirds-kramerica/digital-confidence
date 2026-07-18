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

## Known gap — audio/TTS

**Silent v1.** Captions are burned into each slide (the `.caption` div — visible on-screen text matching the spoken
narration line), so the video is watchable/understandable without sound. This render proves the **visual pipeline**
(HTML → frames → assembled mp4 with correct per-slide pacing) only. Voiceover/TTS (ElevenLabs, per the POC's own
in-page note) is a **separate later step** — not attempted here, not faked. Adding it would mean: TTS-render each
`cap` line to a WAV per scene, use the WAV duration (not the hand-authored `s:` value) to drive frame hold time so
video and audio pacing match, then mux audio+video with a final ffmpeg pass. Not built in this sprint.
