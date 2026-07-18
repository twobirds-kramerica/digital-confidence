"""Narrate + assemble any DCC POC slideshow into a NARRATED MP4.

Extends assemble.py (ADR-0023 sovereign visual pipeline) with a TTS pass:
per-scene `cap:` lines from the target slideshow HTML are synthesized to MP3,
each scene's frame is held for its ACTUAL audio duration (not the hand-authored `s:`
seconds), then video + concatenated audio are muxed into one MP4.

TTS engine: edge-tts (Microsoft Edge neural voices, free, no API key/account) --
voice en-CA-ClaraNeural (Canadian English female, warm/friendly profile -- closest free
match to Margaret's locked voice direction). NOTE: edge-tts calls a Microsoft cloud
synthesis endpoint per line (not a fully local/offline model) -- flagged per the sprint
constraint. Fully local alternatives checked and rejected for v1: pyttsx3/Windows SAPI
(Microsoft David/Zira Desktop, only two voices installed, dated robotic quality --
available as a fallback) -- Piper/Coqui not installed on this machine. ADR-0023's
sovereign-vs-paid tool decision is NOT pre-empted: edge-tts is free, requires no
account/API key, and is not the paid ElevenLabs path the ADR is gated on.

Generalized (2026-07-18) to accept any target slideshow via TARGETS below --
originally built single-purpose for dcc-intro-welcome-slideshow.html.

Usage:
    python narrate-and-assemble.py              # runs every target in TARGETS
    python narrate-and-assemble.py welcome       # runs only the matching target key
    python narrate-and-assemble.py pilot01 video-calling
Requires: edge-tts (pip install edge-tts), ffmpeg/ffprobe on PATH. Frame PNGs for the
target must already exist in its frame_dir (captured via the Playwright frame-capture
step documented in README.md) -- this script does not itself capture frames.
"""
import asyncio
import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
POC_DIR = HERE.parent

VOICE = "en-CA-ClaraNeural"
RATE = "-8%"  # slightly slower than default, per script's ~130wpm low-end direction

# key -> (slideshow HTML filename, frame_dir name, audio_dir name, output mp4 name)
TARGETS = {
    "welcome": (
        "dcc-intro-welcome-slideshow.html",
        "frames-intro",
        "audio-intro",
        "dcc-intro-welcome-NARRATED.mp4",
    ),
    "pilot01": (
        "dcc-pilot-01-slideshow.html",
        "frames-pilot01",
        "audio-pilot01",
        "dcc-pilot-01-NARRATED.mp4",
    ),
    "video-calling": (
        "dcc-video-calling-slideshow.html",
        "frames-videocalling",
        "audio-videocalling",
        "dcc-video-calling-NARRATED.mp4",
    ),
    "practitioner-family": (
        "dcc-practitioner-family-slideshow.html",
        "frames-family",
        "audio-family",
        "dcc-practitioner-family-NARRATED.mp4",
    ),
}


def extract_scene_caps(html_path: Path) -> list[str]:
    """Pull the `cap:` narration lines out of the scenes array in the slideshow HTML.
    Simple regex extraction (source of truth is the JS array; no headless eval needed
    for text content, unlike the frame-capture step which needed live rendering)."""
    text = html_path.read_text(encoding="utf-8")
    # cap:`...` -- backtick-delimited template literal, one per scene, no nested backticks used
    caps = re.findall(r"cap:`([^`]*)`", text)
    if not caps:
        raise RuntimeError(f"No cap: lines found in {html_path}")
    return caps


async def synth_one(text: str, out_path: Path) -> None:
    import edge_tts
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicate.save(str(out_path))


async def synth_all(caps: list[str], audio_dir: Path) -> list[Path]:
    audio_dir.mkdir(exist_ok=True)
    paths = []
    for i, cap in enumerate(caps):
        out_path = audio_dir / f"scene-{i}.mp3"
        print(f"  Synthesizing scene {i} ({len(cap)} chars)...")
        await synth_one(cap, out_path)
        paths.append(out_path)
    return paths


def ffprobe_duration(path: Path) -> float:
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "json", str(path)],
        capture_output=True, text=True, check=True,
    )
    data = json.loads(r.stdout)
    return float(data["format"]["duration"])


def build_concat_list(frame_dir: Path, durations: list[float]) -> Path:
    lines = []
    for i, d in enumerate(durations):
        lines.append(f"file 'frame-{i}.png'")
        lines.append(f"duration {d:.3f}")
    # concat-demuxer quirk (see assemble.py): repeat final file with no duration line
    lines.append(f"file 'frame-{len(durations)-1}.png'")
    list_path = frame_dir / "concat-list-narrated.txt"
    list_path.write_text("\n".join(lines), encoding="utf-8")
    return list_path


def concat_audio(audio_paths: list[Path], audio_dir: Path) -> Path:
    """Concatenate per-scene MP3s into one track, in order, no gaps (frame holds
    already match each clip's own duration so pacing lines up 1:1)."""
    list_path = audio_dir / "audio-concat-list.txt"
    lines = [f"file '{p.name}'" for p in audio_paths]
    list_path.write_text("\n".join(lines), encoding="utf-8")
    out_path = audio_dir / "narration-full.m4a"
    cmd = [
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(list_path),
        "-c:a", "aac", "-b:a", "160k", str(out_path),
    ]
    subprocess.run(cmd, cwd=audio_dir, check=True, capture_output=True, text=True)
    return out_path


def mux(frame_dir: Path, concat_list: Path, audio_track: Path, out_path: Path) -> None:
    video_only = frame_dir / "video-only.mp4"
    cmd_v = [
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_list),
        "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-movflags", "+faststart",
        str(video_only),
    ]
    r = subprocess.run(cmd_v, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[-2000:])

    cmd_mux = [
        "ffmpeg", "-y", "-i", str(video_only), "-i", str(audio_track),
        "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
        "-map", "0:v:0", "-map", "1:a:0", "-shortest",
        "-movflags", "+faststart", str(out_path),
    ]
    r = subprocess.run(cmd_mux, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[-2000:])


def run_target(key: str, html_name: str, frame_dir_name: str, audio_dir_name: str, out_name: str) -> dict:
    slideshow_html = POC_DIR / html_name
    frame_dir = HERE / frame_dir_name
    audio_dir = HERE / audio_dir_name
    out_path = HERE / out_name

    if not frame_dir.exists() or not any(frame_dir.glob("frame-*.png")):
        raise RuntimeError(
            f"No captured frames in {frame_dir} -- run the Playwright frame-capture "
            f"step from README.md for {html_name} first."
        )

    print(f"[{key}] Extracting scene narration lines from", slideshow_html.name)
    caps = extract_scene_caps(slideshow_html)
    print(f"  {len(caps)} scenes found")

    n_frames = len(list(frame_dir.glob("frame-*.png")))
    if n_frames != len(caps):
        raise RuntimeError(
            f"[{key}] scene/frame count mismatch: {len(caps)} cap: lines vs "
            f"{n_frames} captured frames in {frame_dir}"
        )

    print(f"[{key}] Synthesizing narration with edge-tts ({VOICE})...")
    audio_paths = asyncio.run(synth_all(caps, audio_dir))

    durations = [ffprobe_duration(p) for p in audio_paths]
    print(f"[{key}] Per-scene audio durations (s):", [round(d, 2) for d in durations])
    print(f"  Total narration length: {sum(durations):.2f}s")

    print(f"[{key}] Concatenating narration track...")
    audio_track = concat_audio(audio_paths, audio_dir)

    print(f"[{key}] Building frame-hold concat list from actual audio durations...")
    concat_list = build_concat_list(frame_dir, durations)

    print(f"[{key}] Rendering video track + muxing audio...")
    mux(frame_dir, concat_list, audio_track, out_path)

    size = out_path.stat().st_size
    total_dur = ffprobe_duration(out_path)
    print(f"[{key}] OK: {out_path.name} ({size/1024:.0f} KB, {total_dur:.1f}s)")
    return {"key": key, "out": str(out_path), "size_kb": size / 1024, "duration_s": total_dur}


def main() -> int:
    keys = sys.argv[1:] if len(sys.argv) > 1 else list(TARGETS.keys())
    unknown = [k for k in keys if k not in TARGETS]
    if unknown:
        print(f"Unknown target(s): {unknown}. Known: {list(TARGETS.keys())}")
        return 2

    results = []
    for key in keys:
        results.append(run_target(key, *TARGETS[key]))

    print("\n=== Summary ===")
    for r in results:
        print(f"  {r['key']}: {r['out']} ({r['size_kb']:.0f} KB, {r['duration_s']:.1f}s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
