"""Assemble captured POC slideshow frames into MP4s using ffmpeg's concat demuxer,
holding each frame for its exact authored scene duration (no crossfade, v1 sovereign
render per ADR-0023). Frame durations come from each slideshow's own JS `scenes` array
(captured via Playwright at capture time), not re-derived here.

Usage: python assemble.py
"""
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent

JOBS = [
    ("frames-pilot01", [6, 10, 11, 9, 7, 7, 15, 13, 6], "dcc-pilot-01-slideshow.mp4"),
    ("frames-intro", [6, 10, 14, 15, 12, 16, 13, 7], "dcc-intro-welcome-slideshow.mp4"),
    ("frames-videocalling", [6, 10, 9, 9, 13, 14, 9, 15, 6], "dcc-video-calling-slideshow.mp4"),
]


def build_concat_list(frame_dir: Path, durations: list[int]) -> Path:
    lines = []
    for i, d in enumerate(durations):
        lines.append(f"file 'frame-{i}.png'")
        lines.append(f"duration {d}.0")
    # ffmpeg concat-demuxer quirk: repeat the last file with no duration line, or the
    # final image gets dropped (its duration is only honoured as a "next file" lookahead).
    lines.append(f"file 'frame-{len(durations)-1}.png'")
    list_path = frame_dir / "concat-list.txt"
    list_path.write_text("\n".join(lines), encoding="utf-8")
    return list_path


def main() -> int:
    for frame_subdir, durations, out_name in JOBS:
        frame_dir = HERE / frame_subdir
        list_path = build_concat_list(frame_dir, durations)
        out_path = HERE / out_name
        cmd = [
            "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(list_path),
            "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-movflags", "+faststart",
            str(out_path),
        ]
        print("Rendering", out_name, "...")
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            print(r.stderr[-2000:])
            return r.returncode
        size = out_path.stat().st_size
        total = sum(durations)
        print(f"  OK: {out_name} ({size/1024:.0f} KB, {len(durations)} scenes, {total}s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
