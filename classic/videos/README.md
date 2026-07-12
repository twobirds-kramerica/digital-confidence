# Digital Confidence Centre — Video Production Guidelines

## Overview

This directory contains video tutorial pages and supporting assets for the Digital Confidence Centre. Videos are intended to supplement (not replace) the written module content, offering a visual walkthrough for learners who prefer to watch and follow along.

---

## Hosting Strategy

- **Primary host:** YouTube (unlisted or public, embedded via iframe)
- **Fallback:** Self-hosted MP4 in this `videos/` directory for offline/PWA use
- **Do NOT** upload raw video files to the GitHub repo if they exceed 50 MB — use Git LFS or host externally

### YouTube Embed Pattern

```html
<iframe
  width="800"
  height="450"
  src="https://www.youtube.com/embed/VIDEO_ID_HERE?cc_load_policy=1&rel=0&modestbranding=1"
  title="[Descriptive video title]"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
```

Always include:
- `cc_load_policy=1` — force captions on by default
- `rel=0` — suppress unrelated recommended videos at end
- `modestbranding=1` — reduce YouTube branding
- A descriptive `title` attribute for screen readers

---

## Video Standards

### Technical Specifications

| Setting | Value |
|---|---|
| Resolution | 1920×1080 (1080p) minimum |
| Frame rate | 30 fps |
| Format | MP4 (H.264 / AAC) |
| Max file size | 500 MB per video |
| Target length | 3–8 minutes per module video |
| Captions | Required — .SRT or .VTT format |
| Transcript | Required — plain text or PDF |

### Audio Standards

- Narration recorded in a quiet room — no echo, no background hum
- Microphone: USB condenser or lapel mic recommended
- Sample rate: 44.1 kHz, stereo
- Normalise audio to -14 LUFS (YouTube standard)
- No music under narration — it impedes comprehension for hearing aid users

### Visual Standards

- Font on screen: minimum 24pt, high contrast (WCAG AA)
- Mouse cursor: enlarged, high-visibility (use a cursor highlighter tool)
- Zoom in on UI elements being demonstrated — do not expect viewers to see small text
- Use a consistent intro slate: programme name, module number, topic title
- Use a consistent outro slate: "Well done!", next module prompt, support phone number

---

## Accessibility Requirements

Every video MUST have:

1. **Closed captions (CC)** — accurate, synchronised, manually reviewed (not auto-generated only)
2. **Written transcript** — full word-for-word text, available as HTML on the page and downloadable as PDF
3. **Audio descriptions** — if any on-screen content is not narrated verbally, add audio description track
4. **Chapter markers** — timestamps in YouTube description and in the `data-chapters` attribute of the player wrapper
5. **Keyboard-accessible player** — the `dc-video-wrap` component (see `../js/video-player.js`) handles this automatically

---

## File Naming Convention

```
module-[N]-[topic-slug].html       — video tutorial page
module-[N]-[topic-slug].mp4        — self-hosted video (if applicable)
module-[N]-[topic-slug].srt        — caption file
module-[N]-[topic-slug]-transcript.txt  — plain text transcript
module-[N]-[topic-slug]-transcript.pdf  — print-ready transcript
```

Examples:
- `module-1-escape-hatch.html`
- `module-1-escape-hatch.srt`
- `module-1-escape-hatch-transcript.pdf`

---

## Module Video Priority Queue

| Priority | Module | Topic | Status |
|---|---|---|---|
| 1 | Module 1 | The Escape Hatch | Placeholder page created |
| 2 | Module 2 | Security Shield | Pending |
| 3 | Module 3 | Passwords & Biometrics | Pending |
| 4 | Module 6 | Banking & Transactions | Pending |
| 5 | Module 5 | Email & Messages | Pending |
| — | All others | — | Pending |

---

## Translator / Captioning Workflow

1. Record video in English
2. Upload to YouTube — download auto-generated captions as SRT
3. **Manually review and correct** every caption line — do not publish auto-captions uncorrected
4. Save corrected SRT to this directory
5. Upload corrected SRT back to YouTube
6. Generate PDF transcript from corrected SRT using a transcript tool or manually
7. For French captions: send corrected English SRT to professional translator (same translator as module text)

---

## Contact

Aaron Kramer — [Two Birds contact — see private vault]
Two Birds Innovation, St. Thomas, Ontario
