# DCC Video Tutorial Production Guide

Digital Confidence Centre — Ontario Seniors Digital Literacy Program
Version 1.0 | March 2026

---

## Overview

This guide covers everything needed to plan, record, edit, and publish the Digital Confidence Centre (DCC) video tutorial series on YouTube. All videos are designed for adults 70+ using iPads and iPhones in Ontario, Canada. The tone is warm, patient, and respectful — never condescending.

The full series consists of 16 modules × 3 videos = **48 tutorial videos** in total.

---

## 1. Equipment Recommendations

### Camera / Screen Capture
- **OBS Studio** (free — obsproject.com) — primary screen recording tool
  - Use for capturing iPad screen mirroring via QuickTime or AirPlay to Mac
  - Alternatively: record directly on an iPhone using the built-in screen recorder (Settings > Control Centre > Screen Recording)
  - For presenter-on-camera segments: any modern smartphone on a tripod works well

### Microphone
- **Blue Yeti USB Microphone** (~$130 CAD) — recommended for clear, warm voice recording
  - Set to Cardioid mode (front-facing)
  - Position 15–20 cm from mouth, slightly off-axis to reduce plosives (p/b sounds)
  - Alternative budget option: Samson Q2U (~$70 CAD) — USB and XLR dual-output
- **Pop filter** (included with Yeti, or $10–15 standalone) — essential for clean speech

### Audio Interface (optional upgrade)
- Focusrite Scarlett Solo (~$120 CAD) — if moving to an XLR microphone later

### Editing Software
- **DaVinci Resolve** (free version — blackmagicdesign.com/products/davinciresolve) — recommended editor
  - Handles H.264 import, colour correction, text overlays, chapter markers
  - Free version has no watermark and covers all DCC production needs
  - Alternative: iMovie (free, Mac only) — simpler but limited
  - Alternative: CapCut desktop (free) — good for quick subtitle generation

### Teleprompter
- **PromptSmart** (iOS app — free tier available, ~$25/yr for Pro)
  - Use on a second iPad or iPhone positioned just below the camera lens
  - Voice-activated scrolling (VoiceSync) so the script follows the speaker naturally
  - Alternative: Teleprompter Premium (iOS, free tier)

### Lighting
- A ring light (~$40–60 CAD) or a window with natural light (camera facing the window, not back to it)
- Avoid overhead lighting alone — it casts harsh shadows on the face

### Tripod / Mount
- Any adjustable tripod for smartphone or camera (~$25–40 CAD)
- iPad stand for screen-recording closeups (~$20)

---

## 2. Recording Setup Specifications

| Setting | Value |
|---|---|
| Resolution | 1920 × 1080 (Full HD) |
| Frame rate | 30 fps |
| Audio sample rate | 48 kHz |
| Audio bit depth | 16-bit minimum, 24-bit preferred |
| Audio format | Stereo (or mono centred to stereo) |
| Output format | MP4 (H.264 video + AAC audio) |
| Bitrate (video) | 8–12 Mbps for screen capture; 15–20 Mbps for camera footage |
| Colour space | Rec. 709 (standard for YouTube) |

### OBS Studio Settings (Quick Reference)
- Output > Recording Format: MP4
- Video > Base (Canvas) Resolution: 1920×1080
- Video > Output (Scaled) Resolution: 1920×1080
- Video > Common FPS Values: 30
- Audio > Sample Rate: 48 kHz
- Audio > Channels: Stereo

### Screen Mirroring iPad to Mac for OBS
1. Connect iPad and Mac to same Wi-Fi
2. On Mac: open QuickTime Player > File > New Movie Recording > select iPad as camera source
3. In OBS: add a Window Capture source and select the QuickTime window
4. This shows the iPad screen live in OBS at full resolution

---

## 3. Editing Checklist

Use this checklist for every video before export.

### Opening
- [ ] Intro animation: 5 seconds max — DCC logo reveal with title card
- [ ] Title card shows: Module number, video title, duration
- [ ] Background music fades in softly (gentle, royalty-free — Pixabay or YouTube Audio Library)
- [ ] No loud sound effects or sudden audio jumps

### Structure
- [ ] Chapter markers inserted every 2 minutes (or at each main segment)
- [ ] Chapter titles are descriptive (e.g., "Step 1: Finding the App Store" not just "Part 1")
- [ ] Transitions are simple cuts or gentle fades — no flashy wipes or zooms

### On-Screen Text
- [ ] Key terms and steps displayed as text overlays (minimum 36pt — see Accessibility below)
- [ ] Text appears in sync with voiceover — not before or after
- [ ] Text box uses high-contrast colours (white text on dark background, or dark text on white)
- [ ] Never more than 2 lines of text on screen at once

### Audio
- [ ] Background music level: -20 to -25 dB (voice should clearly dominate)
- [ ] Voice audio peaks at -6 dB, no clipping
- [ ] Noise reduction applied (DaVinci Resolve: Fairlight > Noise Reduction, or use Krisp/Adobe Enhance)
- [ ] Consistent volume throughout — no sudden loud or quiet sections

### Closed Captions
- [ ] Auto-captions generated via YouTube Studio (then manually reviewed)
- [ ] Alternatively: generate via CapCut or Descript before upload
- [ ] Caption accuracy target: 100% — every word correct
- [ ] Captions timed correctly — no more than 2 lines, 42 characters per line
- [ ] Speaker name not required (single-presenter format)

### End Screen
- [ ] End screen: last 20 seconds of video
- [ ] Include: next video in playlist, subscribe button, link to DCC website
- [ ] End screen background: simple, uncluttered
- [ ] Verbal CTA matches on-screen elements ("Click the card on the right to watch...")

### Final Export Settings
- [ ] Format: MP4, H.264, 1920×1080, 30fps
- [ ] Audio: AAC, 48kHz, 192 kbps
- [ ] File naming: `dcc-module-[XX]-video-[N]-[short-title].mp4`
  - Example: `dcc-module-06-video-02-safe-etransfers.mp4`

---

## 4. Accessibility Requirements

These are non-negotiable for the DCC audience.

### Captions
- **100% accuracy required** — auto-captions must be reviewed and corrected before publishing
- Caption font: YouTube default is acceptable; do not use decorative fonts
- Timing: each caption segment should represent natural speech pauses, not arbitrary 2-second blocks
- All on-screen instructions must also be in captions (e.g., "Tap the blue button at the bottom of the screen")

### Audio Description
- Describe all visual actions that are not already described in the voiceover
- Example: if you tap a button without saying what it looks like, add "I'm tapping the green Sign In button"
- Rule of thumb: a person listening with eyes closed must be able to follow every step

### On-Screen Text
- **Minimum size: 36pt** on a 1080p canvas (scales to approximately 24pt on a 720p display)
- Never use italics for instructional text — harder to read for seniors with vision changes
- Use bold weight for emphasis, not colour alone
- Font recommendation: Open Sans Bold or similar sans-serif — never serif or decorative fonts

### Contrast
- Text overlays: minimum 4.5:1 contrast ratio (WCAG AA standard)
- Recommended safe combinations:
  - White (#FFFFFF) on dark blue (#1A3A5C) — passes at 11:1
  - Black (#000000) on yellow (#FFD700) — passes at 12:1
  - White (#FFFFFF) on dark green (#1E5C2F) — passes at 9:1
- Avoid: grey text on white, red text on green, light blue on white

### Pacing
- Speak at 120–140 words per minute maximum (conversational pace, not presentation pace)
- Pause 1–2 full seconds after each step before proceeding
- Repeat critical information twice (once in the explanation, once in the recap)

### Visual Layout
- Keep UI elements in the centre of frame — seniors with lower peripheral vision may miss edges
- Zoom in on the specific area of the screen being discussed — do not rely on full-screen shots alone
- Cursor/finger indicator: use OBS cursor highlight or a large yellow pointer overlay so taps are visible

---

## 5. YouTube Upload Checklist

Complete this for every video upload.

### Title
- [ ] Maximum 60 characters (YouTube truncates at ~70 in search results)
- [ ] Include the module topic and "seniors" or "for beginners" for search discoverability
- [ ] Format: `[Action/Topic] for Seniors — Module [N]: [Module Title]`
- [ ] Example: `Safe Online Banking for Seniors — Module 6: Banking & Transactions`

### Description
- [ ] First 150 characters: compelling summary (this is what shows in search snippets — make it count)
- [ ] Full description includes:
  - What the video covers (3–5 bullet points)
  - Link to DCC website
  - Link to the full module playlist
  - Timestamps for each chapter (must match chapter markers in video)
  - "This video is part of the Digital Confidence Centre course for Ontario seniors."
- [ ] No personal phone numbers or email addresses — direct to DCC website contact page

### Tags
- [ ] 10–15 tags per video
- [ ] Always include: `digital literacy seniors`, `iPad for seniors`, `online safety seniors`, `Ontario seniors`
- [ ] Add module-specific tags (e.g., `online banking Canada`, `Interac e-transfer tutorial`)
- [ ] Avoid keyword stuffing — use natural phrases

### Thumbnail
- [ ] Size: 1280 × 720 pixels (see thumbnail-templates/thumbnail-guide.md)
- [ ] Large text readable at thumbnail size (approx. 200px wide in search results)
- [ ] Uses module colour coding (see thumbnail guide)
- [ ] DCC logo in corner
- [ ] Module number badge visible
- [ ] Faces/expressions optional but engaging if used

### Playlist
- [ ] Video added to correct module playlist on upload
- [ ] Playlist order: Video 1 → Video 2 → Video 3 within each module
- [ ] Master playlist: "Digital Confidence Centre — Full Course" includes all videos in module order

### Cards and End Screens
- [ ] End screen added to final 20 seconds (must be set in YouTube Studio after upload)
- [ ] Cards added at relevant timestamps linking to related videos
- [ ] Subscribe CTA active on end screen

### Accessibility Settings
- [ ] Captions uploaded or confirmed auto-generated and reviewed
- [ ] Video language set to: English (Canada)
- [ ] Category: Education
- [ ] Made for kids: No
- [ ] Age restriction: None

---

## 6. Senior-Friendly Recording Tips

These tips make the biggest difference in whether seniors find the videos useful.

### Speech and Pacing
- Speak as if you are talking to a trusted friend who is learning something new — not as if delivering a lecture
- Pause after each step. Count silently to two before moving on.
- When you complete an action on screen, say out loud what you just did: "I just tapped the blue Sign In button — you can see it turned grey for a moment, which means it worked."
- Avoid filler words like "um," "uh," "so basically" — they add confusion for viewers with hearing challenges
- Repeat the key action from each segment in the recap section

### Language
- No jargon unless defined: say "browser" and then add "(that's the app you use to look things up online)"
- Use everyday comparisons: "Think of your password manager like a locked filing cabinet that only you have the key to"
- Canadian English throughout: Centre, programme, colour, favourite, cheque (not check), honour
- Use Ontario-relevant examples: Tim Hortons app, Interac e-transfer, Service Ontario, OHIP, Shoppers Drug Mart

### Tone
- Seniors are capable adults — they are learning a new skill, not recovering from a deficit
- Acknowledge that technology can be frustrating: "If this feels a bit confusing at first, that's completely normal — even people who use computers every day had to learn this once"
- Never say "it's easy" or "just click" — what feels obvious to one person can be genuinely difficult for another
- Celebrate small wins: "Great — if you made it to this screen, you're doing exactly the right thing"

### On-Screen Actions
- Move the cursor or finger slowly and deliberately — never dart across the screen
- Always say what you are about to do before doing it, and confirm after: "I'm going to tap Settings now — there it is"
- If you make a mistake during recording, keep it in and say "oops, let me try that again" — it normalises making mistakes
- Show both the action AND the result: "I tapped Send, and now I can see a green checkmark — that means it went through"

### Recording Environment
- Quiet room — no background TV, street noise, or HVAC hum if possible
- Consistent lighting — avoid shadows moving across your face mid-recording
- Consistent background — simple, uncluttered; plain wall or a tidy bookshelf works well
- Wear plain, solid-coloured clothing — busy patterns distract from the content
- If recording yourself on camera, look at the camera lens, not at your own image on screen

---

## 7. Chapter Template Structure

Use this template as the backbone for every video. Adapt segment titles to match the specific module content.

```
CHAPTER STRUCTURE TEMPLATE

0:00   Introduction
       — Hook: relatable scenario or question
       — What they will learn today
       — Why it matters in daily life

[time] [Segment 1 Title]
       — Core concept explained simply
       — On-screen demonstration

[time] [Segment 2 Title]
       — Next step or related concept
       — On-screen demonstration

[time] [Segment 3 Title]
       — Practical application
       — On-screen demonstration

[time] Common Mistakes to Avoid
       — 2–3 pitfalls described sympathetically
       — What to do instead

[time] Recap
       — 3 key takeaways stated clearly
       — Confidence-building close

[time] What's Next
       — Preview of next video
       — Mention of DCC website
```

### Typical Timing by Video Length

| Total Length | Introduction | Segments | Mistakes | Recap | CTA |
|---|---|---|---|---|---|
| 5 minutes | 45 sec | 3 × 75 sec | 60 sec | 30 sec | 15 sec |
| 7 minutes | 60 sec | 4 × 75 sec | 90 sec | 45 sec | 20 sec |
| 10 minutes | 90 sec | 5 × 90 sec | 90 sec | 60 sec | 20 sec |

---

## 8. File Naming and Organisation

### Video Files
- Raw recordings: `raw-[module]-[video]-[date].mp4`
- Edited exports: `dcc-module-[XX]-video-[N]-[short-title].mp4`
- Example: `dcc-module-09-video-01-what-is-ai.mp4`

### Script Files
- Location: `video-tutorials/scripts/`
- Naming: `module-[XX]-scripts.md`

### Thumbnail Files
- Location: `video-tutorials/thumbnail-templates/`
- Naming: `thumbnail-module-[XX].png` (exported from Canva or design tool)

### Folder Structure
```
video-tutorials/
├── PRODUCTION-GUIDE.md          (this file)
├── scripts/
│   ├── module-01-scripts.md
│   ├── module-02-scripts.md
│   └── ... (16 files total)
├── thumbnail-templates/
│   ├── thumbnail-guide.md
│   └── thumbnail-module-[XX].png (when created)
└── captions/
    └── dcc-module-[XX]-video-[N].srt (caption files)
```

---

## 9. Quality Control Before Publishing

Run through this checklist for every video before it goes live.

- [ ] Watch the full video at 1× speed — do not skim
- [ ] Captions reviewed and corrected (100% accuracy)
- [ ] All steps match the current version of iOS / iPadOS (note version in description if relevant)
- [ ] No personal phone numbers, email addresses, or home addresses visible on screen
- [ ] No sensitive financial information visible (demo accounts only)
- [ ] Thumbnail uploaded and legible at small size
- [ ] Title and description reviewed for typos
- [ ] Video added to correct playlist
- [ ] End screen configured in YouTube Studio
- [ ] Visibility: Unlisted until full module is ready, then Public

---

*Digital Confidence Centre — Two Birds Creative | St. Thomas, Ontario*
*Production guide maintained by Aaron | Last updated: March 2026*
