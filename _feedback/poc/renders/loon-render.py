"""LOON Phase 1 — bilingual DCC intro/welcome render (EN + fr-CA).

Self-contained: captures clean 1280x720 frames from the render template with Playwright
(single-slide, no transition -> no ghosting), synthesizes edge-tts narration per scene
(en-CA female for EN, fr-CA female for FR), holds each frame for its real audio duration,
then muxes to H.264 + AAC MP4. Captions are burned into the frames (part of the HTML stage).

Sovereign/free pipeline (ADR-0023): Playwright + Chromium (local), edge-tts (free, no key),
ffmpeg. No paid services.

Usage:  python loon-render.py            # both languages
        python loon-render.py en          # one language
Requires: playwright (+ chromium), edge-tts, ffmpeg/ffprobe on PATH.
"""
import asyncio
import json
import subprocess
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
POC_DIR = HERE.parent
TEMPLATE = POC_DIR / "dcc-intro-welcome-render.html"
DATE = "2026-07-20"

LANGS = {
    "en": {"voice": "en-CA-ClaraNeural",  "rate": "-8%", "out": f"LOON-dcc-intro-EN-{DATE}.mp4"},
    "fr": {"voice": "fr-CA-SylvieNeural", "rate": "-6%", "out": f"LOON-dcc-intro-FR-CA-{DATE}.mp4"},
}


def capture_frames(lang: str, frame_dir: Path) -> list[str]:
    """Load the render template at the given lang, screenshot each scene to frame-<i>.png.
    Returns the list of cap: narration lines (read from the page)."""
    frame_dir.mkdir(exist_ok=True)
    url = TEMPLATE.as_uri() + f"?lang={lang}"
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 720}, device_scale_factor=1)
        page.goto(url)
        page.add_style_tag(content="*{transition:none !important;animation:none !important}")
        n = page.evaluate("window.scenes.length")
        caps = page.evaluate("window.scenes.map(s => s.cap)")
        for i in range(n):
            page.evaluate(f"window.show({i})")
            page.wait_for_timeout(120)
            page.locator("#stage").screenshot(path=str(frame_dir / f"frame-{i}.png"))
        browser.close()
    print(f"  [{lang}] captured {n} frames -> {frame_dir}")
    return caps


async def synth_one(text: str, voice: str, rate: str, out_path: Path) -> None:
    import edge_tts
    await edge_tts.Communicate(text, voice, rate=rate).save(str(out_path))


def synth_all(caps: list[str], voice: str, rate: str, audio_dir: Path) -> list[Path]:
    audio_dir.mkdir(exist_ok=True)
    paths = []
    for i, cap in enumerate(caps):
        out = audio_dir / f"scene-{i}.mp3"
        print(f"  synth scene {i} ({len(cap)} chars)")
        asyncio.run(synth_one(cap, voice, rate, out))
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


def build_concat_list(frame_dir: Path, durs: list[float]) -> Path:
    lines = []
    for i, d in enumerate(durs):
        lines.append(f"file 'frame-{i}.png'")
        lines.append(f"duration {d:.3f}")
    lines.append(f"file 'frame-{len(durs)-1}.png'")  # concat-demuxer quirk: repeat last
    lst = frame_dir / "concat-list.txt"
    lst.write_text("\n".join(lines), encoding="utf-8")
    return lst


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


def run_lang(lang: str) -> dict:
    cfg = LANGS[lang]
    frame_dir = HERE / f"frames-loon-{lang}"
    audio_dir = HERE / f"audio-loon-{lang}"
    out_path = HERE / cfg["out"]

    print(f"[{lang}] capturing frames...")
    caps = capture_frames(lang, frame_dir)

    print(f"[{lang}] synthesizing narration ({cfg['voice']}, rate {cfg['rate']})...")
    audio_paths = synth_all(caps, cfg["voice"], cfg["rate"], audio_dir)
    durs = [duration(p) for p in audio_paths]
    print(f"  per-scene s: {[round(d,2) for d in durs]}  total {sum(durs):.1f}s")

    audio_track = concat_audio(audio_paths, audio_dir)
    concat_list = build_concat_list(frame_dir, durs)
    print(f"[{lang}] rendering + muxing -> {out_path.name}")
    mux(frame_dir, concat_list, audio_track, out_path)

    meta = ffprobe_json(out_path)
    streams = {s["codec_type"]: s for s in meta["streams"]}
    v = streams.get("video", {})
    res = f"{v.get('width')}x{v.get('height')}"
    total = float(meta["format"]["duration"])
    size_kb = out_path.stat().st_size / 1024
    print(f"[{lang}] OK {out_path.name}  {total:.1f}s  {res}  "
          f"v={v.get('codec_name')} a={streams.get('audio',{}).get('codec_name')}  {size_kb:.0f}KB")
    return {"lang": lang, "out": str(out_path), "dur": total, "res": res,
            "v": v.get("codec_name"), "a": streams.get("audio", {}).get("codec_name"),
            "size_kb": size_kb, "streams": list(streams.keys())}


def main() -> int:
    keys = sys.argv[1:] or list(LANGS.keys())
    results = [run_lang(k) for k in keys if k in LANGS]
    print("\n=== SUMMARY ===")
    for r in results:
        print(f"  {r['lang'].upper()}: {r['out']}")
        print(f"      {r['dur']:.1f}s  {r['res']}  streams={r['streams']}  "
              f"v={r['v']} a={r['a']}  {r['size_kb']:.0f}KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
