"""LOON — generic render runner (any scene template, any language).

Generalises the proven, already-shipped `loon-render.py` flow so a NEW video does not need a
new bespoke script: point it at any LOON render template that exposes `window.scenes`
(each `{html, cap}`) and `window.show(i)`, and it produces a narrated, captioned MP4.

`loon-render.py` (the 2026-07-20 DCC intro production) is left untouched — this is additive.

Pipeline (sovereign / free, ADR-0023): HTML template -> Playwright/Chromium clean frame capture
(1280x720, transitions disabled) -> edge-tts narration per scene -> hold each frame for its real
audio duration -> ffmpeg mux to H.264 + AAC. Captions are burned into the frames by the template;
this script additionally emits a `.vtt` sidecar (LOON P1 requires burned-in AND sidecar captions).

Usage:
    python loon-render-generic.py --template ../loon-testing-video-capabilities-render.html \
                                  --slug loon-testing-video-capabilities --lang en

Requires: playwright (+ chromium), edge-tts, ffmpeg/ffprobe on PATH.
"""
import argparse
import asyncio
import json
import subprocess
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent

# VOICE SELECTION RULE (LOON standard, applies to every surface unless a template overrides).
# Free keyless Microsoft Edge neural voices. Rate is slowed for the senior-facing register.
# Never a cloned/vendor-locked voice identity — recreatability tier must stay "High".
VOICES = {
    # en: switched 2026-07-27 from en-CA-ClaraNeural to Ava, Microsoft's newer
    # conversational voice line (metadata: Conversation/Copilot, Expressive/Caring),
    # which reads noticeably less robotic. The trade-off is real and deliberate:
    # there is no Canadian voice in that line, so the accent moves en-CA -> en-US.
    # Evidence + samples + one-word revert: renders/VOICE-TEST-2026-07-27.md.
    "en": {"voice": "en-US-AvaMultilingualNeural", "rate": "-8%", "tag": "EN"},
    "fr": {"voice": "fr-CA-SylvieNeural", "rate": "-6%", "tag": "FR-CA"},
}


def capture_frames(template: Path, lang: str, frame_dir: Path) -> tuple[list[str], list[list[str]]]:
    """Screenshot every scene of the template. Returns (narration lines, frames per scene).

    A scene is normally ONE held frame. A template may optionally expose
    `window.subframes(i)` returning a count > 1 for a scene that needs motion (e.g.
    a logo animation); that scene is then captured as several frames which later
    share the scene's own audio duration. Templates without `window.subframes` are
    captured exactly as before.
    """
    frame_dir.mkdir(parents=True, exist_ok=True)
    url = template.as_uri() + f"?lang={lang}"
    per_scene: list[list[str]] = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 720}, device_scale_factor=1)
        page.goto(url)
        page.add_style_tag(content="*{transition:none !important;animation:none !important}")
        n = page.evaluate("window.scenes.length")
        caps = page.evaluate("window.scenes.map(s => s.cap)")
        has_sub = page.evaluate("typeof window.subframes === 'function'")
        for i in range(n):
            subs = page.evaluate(f"window.subframes({i})") if has_sub else 1
            names = []
            for k in range(subs):
                page.evaluate(f"window.show({i}, {k})")
                page.wait_for_timeout(120)
                name = f"frame-{i}.png" if subs == 1 else f"frame-{i}-{k}.png"
                page.locator("#stage").screenshot(path=str(frame_dir / name))
                names.append(name)
            per_scene.append(names)
        browser.close()
    total = sum(len(f) for f in per_scene)
    print(f"  [{lang}] captured {n} scenes / {total} frames -> {frame_dir}")
    return caps, per_scene


async def _synth_one(text: str, voice: str, rate: str, out_path: Path) -> None:
    import edge_tts
    await edge_tts.Communicate(text, voice, rate=rate).save(str(out_path))


def synth_all(caps: list[str], voice: str, rate: str, audio_dir: Path) -> list[Path]:
    audio_dir.mkdir(parents=True, exist_ok=True)
    paths = []
    for i, cap in enumerate(caps):
        out = audio_dir / f"scene-{i}.mp3"
        print(f"  synth scene {i} ({len(cap)} chars)")
        asyncio.run(_synth_one(cap, voice, rate, out))
        paths.append(out)
    return paths


def ffprobe_json(path: Path) -> dict:
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries",
         "format=duration:stream=codec_type,codec_name,width,height",
         "-of", "json", str(path)],
        capture_output=True, text=True, check=True)
    return json.loads(r.stdout)


def duration(path: Path) -> float:
    return float(ffprobe_json(path)["format"]["duration"])


def concat_audio(audio_paths: list[Path], audio_dir: Path) -> Path:
    lst = audio_dir / "audio-concat.txt"
    lst.write_text("\n".join(f"file '{p.name}'" for p in audio_paths), encoding="utf-8")
    out = audio_dir / "narration-full.m4a"
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst),
                    "-c:a", "aac", "-b:a", "160k", str(out)],
                   cwd=audio_dir, check=True, capture_output=True, text=True)
    return out


def build_concat_list(frame_dir: Path, durs: list[float], per_scene: list[list[str]]) -> Path:
    """Each SCENE holds for its own real audio duration. A scene captured as several
    sub-frames splits that same duration evenly across them, so adding motion never
    changes the length of the video or desynchronises the narration."""
    lines = []
    for names, d in zip(per_scene, durs):
        share = d / len(names)
        for name in names:
            lines.append(f"file '{name}'")
            lines.append(f"duration {share:.3f}")
    lines.append(f"file '{per_scene[-1][-1]}'")  # concat-demuxer quirk: repeat last
    lst = frame_dir / "concat-list.txt"
    lst.write_text("\n".join(lines), encoding="utf-8")
    return lst


def _ts(seconds: float) -> str:
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}"


def write_vtt(caps: list[str], durs: list[float], out_path: Path) -> Path:
    """Sidecar WebVTT built from the SCRIPT (exact), not from ASR guesswork."""
    lines, t = ["WEBVTT", ""], 0.0
    for cap, d in zip(caps, durs):
        lines += [f"{_ts(t)} --> {_ts(t + d)}", cap, ""]
        t += d
    out_path.write_text("\n".join(lines), encoding="utf-8")
    return out_path


def mux(frame_dir: Path, concat_list: Path, audio_track: Path, out_path: Path) -> None:
    video_only = frame_dir / "video-only.mp4"
    r = subprocess.run(
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_list),
         "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-movflags", "+faststart",
         str(video_only)], capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[-2000:])
    r = subprocess.run(
        ["ffmpeg", "-y", "-i", str(video_only), "-i", str(audio_track),
         "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
         "-map", "0:v:0", "-map", "1:a:0", "-shortest",
         "-movflags", "+faststart", str(out_path)], capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[-2000:])


def run_lang(template: Path, slug: str, lang: str, date: str) -> dict:
    cfg = VOICES[lang]
    frame_dir = HERE / f"frames-{slug}-{lang}"
    audio_dir = HERE / f"audio-{slug}-{lang}"
    out_path = HERE / f"{slug}-{cfg['tag']}-{date}.mp4"
    vtt_path = HERE / f"{slug}-{cfg['tag']}-{date}.vtt"

    print(f"[{lang}] capturing frames from {template.name} ...")
    caps, per_scene = capture_frames(template, lang, frame_dir)

    print(f"[{lang}] synthesizing narration ({cfg['voice']}, rate {cfg['rate']}) ...")
    audio_paths = synth_all(caps, cfg["voice"], cfg["rate"], audio_dir)
    durs = [duration(p) for p in audio_paths]
    print(f"  per-scene s: {[round(d, 2) for d in durs]}  total {sum(durs):.1f}s")

    audio_track = concat_audio(audio_paths, audio_dir)
    concat_list = build_concat_list(frame_dir, durs, per_scene)
    write_vtt(caps, durs, vtt_path)
    print(f"[{lang}] rendering + muxing -> {out_path.name}")
    mux(frame_dir, concat_list, audio_track, out_path)

    meta = ffprobe_json(out_path)
    streams = {s["codec_type"]: s for s in meta["streams"]}
    v = streams.get("video", {})
    res = f"{v.get('width')}x{v.get('height')}"
    total = float(meta["format"]["duration"])
    size_kb = out_path.stat().st_size / 1024
    print(f"[{lang}] OK {out_path.name}  {total:.1f}s  {res}  "
          f"v={v.get('codec_name')} a={streams.get('audio', {}).get('codec_name')}  {size_kb:.0f}KB")
    return {"lang": lang, "out": str(out_path), "vtt": str(vtt_path), "dur": total, "res": res,
            "v": v.get("codec_name"), "a": streams.get("audio", {}).get("codec_name"),
            "size_kb": size_kb, "streams": list(streams.keys())}


def main() -> int:
    ap = argparse.ArgumentParser(description="LOON generic render runner")
    ap.add_argument("--template", required=True, help="path to a LOON render HTML template")
    ap.add_argument("--slug", required=True, help="output filename slug")
    ap.add_argument("--lang", action="append", choices=sorted(VOICES), help="repeatable; default en")
    ap.add_argument("--date", default="2026-07-27", help="date stamp in the output filename")
    args = ap.parse_args()

    template = Path(args.template)
    if not template.is_absolute():
        template = (HERE / template).resolve()
    langs = args.lang or ["en"]

    results = [run_lang(template, args.slug, lang, args.date) for lang in langs]
    print("\n=== SUMMARY ===")
    for r in results:
        print(f"  {r['lang'].upper()}: {r['out']}")
        print(f"      {r['dur']:.1f}s  {r['res']}  streams={r['streams']}  "
              f"v={r['v']} a={r['a']}  {r['size_kb']:.0f}KB")
        print(f"      sidecar captions: {r['vtt']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
