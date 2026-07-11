# Video Production Checklist — Digital Confidence Centre

Use this checklist for every video produced. Complete all items before publishing.

---

## Pre-Production

### Planning
- [ ] Module number and topic confirmed
- [ ] Script written and reviewed for plain language (no jargon)
- [ ] Script reviewed for Canadian English spelling and terminology
- [ ] Key on-screen steps identified and listed
- [ ] Target length confirmed: 3–8 minutes
- [ ] Chapter breakdown planned (minimum 3 chapters per video)

### Equipment & Setup
- [ ] Microphone tested — no background noise, no echo
- [ ] Screen recording software configured (recommended: OBS Studio, Loom, or QuickTime)
- [ ] Screen resolution set to 1920×1080
- [ ] Cursor highlighter tool active
- [ ] All notifications turned off (Do Not Disturb enabled)
- [ ] Desktop wallpaper set to clean, neutral background
- [ ] Browser bookmarks bar hidden
- [ ] Demo account / dummy data ready (never use real personal information on screen)

---

## Production (Recording)

### Audio
- [ ] Test recording reviewed — audio is clear and at consistent volume
- [ ] No background hum, fan noise, or echo present
- [ ] Narration pace is slow and clear (aim for 120–140 words per minute)
- [ ] Pauses inserted at natural breaks between steps

### Video / Screen
- [ ] Intro slate recorded: programme name, module number, topic title
- [ ] Each step narrated verbally AND demonstrated visually
- [ ] Camera or mouse zoomed in on small UI elements before interacting
- [ ] No personal data visible at any point
- [ ] Outro slate recorded: "Well done!", next module cue, support phone number (1-877-304-5813)

---

## Post-Production (Editing)

### Edit
- [ ] Dead air trimmed from start and end
- [ ] Long pauses trimmed (keep natural pacing; remove accidental gaps)
- [ ] Audio normalised to -14 LUFS
- [ ] Zoom annotations added where cursor is on small elements
- [ ] Chapter markers / jump cuts clean and smooth

### Export
- [ ] Exported as MP4, H.264, AAC audio
- [ ] Resolution: 1920×1080 minimum
- [ ] Frame rate: 30 fps
- [ ] File size under 500 MB

---

## Accessibility

### Captions
- [ ] Video uploaded to YouTube
- [ ] Auto-generated captions downloaded as SRT
- [ ] SRT file manually reviewed line by line — all errors corrected
- [ ] Technical terms spelled correctly in captions
- [ ] Speaker identification added if multiple voices
- [ ] Corrected SRT uploaded back to YouTube
- [ ] Captions display correctly in YouTube player

### Transcript
- [ ] Full word-for-word transcript created from corrected SRT
- [ ] Transcript saved as plain text (.txt) in this `videos/` directory
- [ ] Transcript exported as PDF
- [ ] PDF tested for readability (font size, contrast)

### Audio Description
- [ ] All on-screen content is narrated verbally (preferred approach)
- [ ] If any visual-only content exists: audio description track added
- [ ] Audio description reviewed for accuracy

### Player
- [ ] Video page uses `dc-video-wrap` class (enables accessible JS player)
- [ ] `data-chapters` attribute populated with correct timestamps
- [ ] `.video-transcript` element present on page with full transcript text
- [ ] Transcript panel toggle tested

---

## Publishing

### YouTube
- [ ] Title format: `Module [N]: [Topic] — Digital Confidence Centre`
- [ ] Description includes: brief summary, chapter timestamps, support phone number
- [ ] Tags include: digital literacy, seniors, Ontario, iPad, [module topic]
- [ ] Thumbnail set (clear text, high contrast, minimum 1280×720)
- [ ] Visibility set correctly (Public or Unlisted — confirm with Aaron)
- [ ] `cc_load_policy=1` added to embed URL (forces captions on)

### Site Page
- [ ] Video tutorial HTML page created in `videos/` directory
- [ ] YouTube embed URL updated with correct VIDEO_ID
- [ ] Breadcrumb navigation correct
- [ ] Chapter list matches actual video timestamps
- [ ] Transcript panel populated
- [ ] PDF transcript link active (not a `#` placeholder)
- [ ] "Back to Module" link correct
- [ ] "Next Module" link correct
- [ ] Page tested at 150% browser zoom — no overflow
- [ ] Page tested on mobile (375px viewport)
- [ ] All 44px touch targets confirmed on buttons

### French Version
- [ ] English version fully complete and published
- [ ] French captions translation commissioned (professional translator)
- [ ] French transcript translation commissioned
- [ ] French video page placeholder created in `lang/fr/`

---

## Final Sign-Off

- [ ] Aaron has reviewed the final video
- [ ] Aaron has approved the transcript
- [ ] Video page committed and pushed to GitHub
- [ ] GitHub Pages deployment confirmed
- [ ] Module page updated with link to video guide

**Completed by:** ______________________
**Date:** ______________________
**Module:** ______________________
