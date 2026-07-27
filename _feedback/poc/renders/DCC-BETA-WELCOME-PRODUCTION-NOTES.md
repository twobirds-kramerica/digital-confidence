# DCC Beta Welcome — PRODUCTION NOTES (v2, 2026-07-27)

**v2 is the asset a beta tester receives.** It replaces v1
(`dcc-beta-welcome-EN-2026-07-27.mp4` / `-FR-CA-`), which Aaron watched and gave detailed
feedback on. v1 files are kept in this folder as the record of what the feedback was given
against — do not send them. v1 itself superseded the earlier
`loon-testing-video-capabilities-EN-2026-07-27.mp4` capability pilot, which stays retired.

## Deliverables (full paths)

Masters (dated, archival):
- **EN:** `C:\twobirds\digital-confidence\_feedback\poc\renders\dcc-beta-welcome-v2-EN-2026-07-27.mp4`
- **FR (fr-CA):** `C:\twobirds\digital-confidence\_feedback\poc\renders\dcc-beta-welcome-v2-FR-CA-2026-07-27.mp4`
- Sidecar captions: `dcc-beta-welcome-v2-EN-2026-07-27.vtt`, `dcc-beta-welcome-v2-FR-CA-2026-07-27.vtt` (same folder)

Site copies (undated, so the embed path is stable across re-renders):
- `C:\twobirds\digital-confidence\videos\dcc-beta-welcome-en.mp4` + `.vtt`
- `C:\twobirds\digital-confidence\videos\dcc-beta-welcome-fr.mp4` + `.vtt`

Source + tooling:
- Render template: `C:\twobirds\digital-confidence\_feedback\poc\dcc-beta-welcome-render-v2.html`
- Render runner: `C:\twobirds\digital-confidence\_feedback\poc\renders\loon-render-generic.py`
- Voice comparison + samples: `C:\twobirds\digital-confidence\_feedback\poc\renders\VOICE-TEST-2026-07-27.md`
- Embed logic: `C:\twobirds\digital-confidence\js\beta.js`
- QA screenshot: `C:\twobirds\digital-confidence\quality\playwright-results\dcc-beta-video-embed-en.png`

## ffprobe-confirmed output specs

| File | Duration | Resolution | Video | Audio | Size |
|------|----------|-----------|-------|-------|------|
| `dcc-beta-welcome-v2-EN-2026-07-27.mp4` | 39.1s | 1280x720 | H.264 (yuv420p, 30fps) | AAC | 873 KB |
| `dcc-beta-welcome-v2-FR-CA-2026-07-27.mp4` | 43.3s | 1280x720 | H.264 (yuv420p, 30fps) | AAC | 905 KB |

Both land inside the 30 to 45 second brief. French first ran 47.5s and was tightened twice
against measured render length, not estimated word counts — same discipline as v1.

## What changed from v1, and why

### 1. New script, close to Aaron's own words
Aaron dictated the opening, the feedback explanation and the closing. The text below is his
intent with minimal cleanup. Nothing was added that he did not ask for, with one named
exception: the topics scene (scene 1) is carried over from v1's confirmed beat list. Aaron
explicitly cut only the kids beat, so the topics beat was kept rather than silently dropped.

### 2. The kids/youth version is GONE from narration
Aaron was explicit: naming it in the main flow is confusing and makes viewers feel singled
out by age ("this is not for young people"). **Neither the EN nor the FR narration mentions a
youth version at any point, and neither does any spoken caption.** The narration speaks to the
viewer directly ("built to help adults feel confident with technology") with no age comparison.

It survives only as a small, low-emphasis, unspoken on-screen line on the final frame:
"Coming soon: Digital Confidence for youth." (FR: "Bientot : Confiance numerique pour les
jeunes."). 19px, muted grey, bottom of frame above the caption bar, informational. The
narrator never reads it and it does not appear in the `.vtt` sidecar, because it is not
speech.

### 3. The feedback tool is now SHOWN, not just described
Aaron asked to "show it on the screen if you can." Scene 4 is a graphic reproduction of the
real feedback surface shipped in `js/feedback-inflow.js`: the accent-light "Tell us what you
think" block with its actual body copy and its actual "Give feedback on this lesson" button,
plus the footer link row with "Give feedback" highlighted.

**Deliberately a reproduction, not a screenshot.** A real screenshot scaled into a 1280x720
frame would put the button at roughly 11px for an audience whose whole reason for existing on
this site is that small text is hard. The words, order, and colours are the product's; the
size is legible.

### 4. Two Birds Innovation branding — the chevron motion is real
Aaron asked for "two chevrons coming together." **The Two Birds mark genuinely is two
chevrons**, so nothing was invented. The V05 mark
(`C:\twobirds\two-birds-portfolio\assets\logos\two-birds\two-birds-logo.svg`) is two white
chevrons plus four identity circles on `#0066CC`. The closing scene copies that geometry
verbatim — same polyline points, same 52px stroke, same 34px circles, same blue — splits it
into its two chevron groups, and drives them from apart to their true logo positions across 12
frames that share the closing scene's own audio duration. The final frame is the exact real
logo.

The brand's own motion spec (brand bible section 8: "chevrons draw on, circles fade in,
wordmark up") is the same idea, so this is consistent with it rather than a one-off.

Two honest notes: the cosmos dot texture from the master SVG is omitted because it is
invisible at 186px, and 12 frames over ~5s is a simple convergence, not a broadcast animation.
No new animation engine was built — the runner just holds sub-frames.

Feathers Model compliance: the master chevron appears only in the closing endorsement card,
never in the header or hero of this DCC asset.

### 5. Closing gratitude visual
Warm treatment only: the logo inside a soft `#FDF3E3` radial halo, the wordmark, and "Thank
you." **No Margaret, and nothing that implies her.** Character art is still blocked on Aaron's
own manual step and no locked art exists, so none was attempted and no placeholder face was
drawn. Same posture as v1. If character art is ever approved, the template is one file and can
be re-rendered.

### 6. Voice: `en-CA-ClaraNeural` → `en-US-AvaMultilingualNeural`
Full comparison, three real samples, and the one-word revert are in
`C:\twobirds\digital-confidence\_feedback\poc\renders\VOICE-TEST-2026-07-27.md`.

Short version: Ava is the only one of the three tested from Microsoft's newer conversational
voice line (metadata `Conversation`/`Copilot`, `Expressive, Caring, Pleasant, Friendly`, vs
`General` for Clara and Jenny), and it reads noticeably less robotic.

**The trade-off is real and Aaron should decide it deliberately: there is no Canadian voice in
that line, so the narrator's accent moves from Canadian to American, on a product whose footer
says "Canadian" and whose audience is Canadian seniors.** More natural voice, less Canadian
voice. There is no option that gives both. Aaron can veto; the revert is one line in
`loon-render-generic.py`.

French is unchanged: `fr-CA-SylvieNeural` at -6%.

### 7. Still auto-playing straight through
No manual scene-advance controls, exactly as Aaron concluded. Same continuous render as v1.

## Where it is embedded on the live site

This is the first time the video is wired into the product at all.

| Entry point | URL | Video |
|---|---|---|
| EN beta | `index.html?beta=1` | `videos/dcc-beta-welcome-en.mp4` |
| FR beta | `fr/index.html?beta=1` | `../videos/dcc-beta-welcome-fr.mp4` |

It sits **inside the existing beta welcome banner**, in normal document flow, under the
heading "A short welcome video (about 40 seconds)" with the line "Optional. Nothing plays
until you press play." This matches Aaron's "pop-up or something, optional" framing without
being a forced interstitial: PRODUCT.md names floating overlays over content as an
anti-pattern, and design principle 1 (anxiety first) rules out anything that starts making
noise at a nervous first-time visitor. `preload="none"`, so a tester on a slow or metered
connection downloads nothing unless they choose to watch.

**Anonymous non-beta visitors are completely unaffected** — no banner, no video, no widget.
Verified.

### Playback speed
Native HTML5 `<video controls>`, no custom player. On desktop Chromium the overflow ("⋮")
menu is present and `playbackRate` is writable — both verified in this session's QA. That
overflow menu is where the playback-speed option lives on Chrome, Edge and Firefox desktop,
and inside the fullscreen menu on iOS Safari.

**Not verified on real hardware: Android Chrome.** Android Chrome's inline native controls
have historically not exposed a playback-speed item the way desktop does. If Aaron tests on an
Android phone and there is no speed option, that is the known gap, and the fix would be a
small explicit speed control rather than a full custom player. Stated as unverified rather
than claimed.

### Bilingual wiring
Matches DCC's existing pattern exactly: whole separate pages, no browser auto-detect, no
in-player language toggle. `js/beta.js` now reads the page's own `lang` attribute the same way
`js/feedback-inflow.js` already did.

One thing changed beyond a pure embed, deliberately: `fr/index.html` was not previously a beta
entry point and did not load the feedback scripts. It now loads `beta.js`,
`feedback-inflow.js` and `feedback-widget.js`, so the FR video's claim that a feedback tool is
on screen is actually true in French. Without that, the FR video would have narrated something
the FR page did not do.

## What is honestly NOT in this asset

- **No character art, no Margaret, nothing that implies her.** Unchanged from v1.
- **No cosmos texture on the closing logo mark** (invisible at that size).
- **No custom playback-speed control** — relying on native controls, with the Android caveat
  above stated rather than papered over.
- **The returning-tester banner does not include the video.** A tester who has already been
  here once sees the short "Welcome back" banner without a rewatch option. Low cost to add if
  Aaron wants it; not added on the assumption that a repeat visitor does not want the video
  again every time.
- **The French track has not had a native-speaker read-through.** Same open item as v1, and
  still worth Aaron's five minutes before it goes to a French-speaking tester. Accents are
  omitted in the source strings for encoding safety; `fr-CA-SylvieNeural` pronounces them
  correctly regardless.

## Pipeline

Unchanged and sovereign (ADR-0023, zero spend): HTML template → Playwright/Chromium clean
frame capture at 1280x720 → edge-tts narration per scene → each frame held for its own real
audio duration → ffmpeg mux to H.264 + AAC. Captions are burned into the frames by the
template AND emitted as a `.vtt` sidecar.

One additive change to `loon-render-generic.py`: a template may optionally expose
`window.subframes(i)` to render one scene as several frames, which then split that scene's own
audio duration evenly. That is how the chevron convergence works. **Adding motion cannot change
the length of the video or desynchronise the narration**, because the scene's audio duration is
still what governs. Templates without `window.subframes` are captured exactly as before, so v1
and the earlier pilot templates are unaffected.

## Narration — EN, spoken text = burned-in caption, one line per scene

1. Welcome to the Digital Confidence Centre, built to help adults feel confident with technology.
2. Short lessons on scams, banking, passwords, video calls and more.
3. This is the beta site. You are one of the first to see it, and we thank you for your time.
4. As you go, tell us what you think. Do as much or as little as you like.
5. A feedback tool is on the screen at any point. Use it any time.
6. Every comment shapes the version that goes to the public. Come back any time.
7. From Two Birds Innovation, thank you for your feedback and your time.

## Narration — FR (fr-CA)

1. Bienvenue au Centre de confiance numerique, pour vous aider a vous sentir a l'aise avec la technologie.
2. De courtes lecons sur les fraudes, la banque, les mots de passe, les appels video et plus encore.
3. Ceci est la version beta. Vous etes parmi les premiers a le voir, merci de votre temps.
4. Dites-nous ce que vous en pensez. Autant ou aussi peu que vous le voulez.
5. Un outil de commentaires est a l'ecran en tout temps. Utilisez-le quand vous voulez.
6. Chaque commentaire faconne la version offerte au public. Revenez quand vous voulez.
7. De la part de Two Birds Innovation, merci pour vos commentaires et votre temps.

Neither list mentions a youth or kids version. That is the point of v2.

## Regenerate

```
cd C:\twobirds\digital-confidence\_feedback\poc\renders
python loon-render-generic.py --template ../dcc-beta-welcome-render-v2.html \
       --slug dcc-beta-welcome-v2 --lang en --lang fr --date 2026-07-27
```

Then copy the two MP4s and two VTTs over the undated files in
`C:\twobirds\digital-confidence\videos\` so the site embed picks up the new cut.
