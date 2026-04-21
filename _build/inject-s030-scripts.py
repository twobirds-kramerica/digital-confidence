#!/usr/bin/env python3
"""S-030: Inject read-aloud / keyboard-helper / module-progress / check-in
script tags into every module page. Idempotent — safe to re-run.

Rules:
  - Each of the 4 scripts must appear exactly once before </body>.
  - read-aloud.js must load AFTER speech-config.js (it relies on VOICE_CONFIG).
  - keyboard-helper, module-progress, check-in have no cross-dependencies.
  - Existing <script> tags are never duplicated.
"""

import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = [
    "js/keyboard-helper.js",
    "js/module-progress.js",
    "js/check-in.js",
    "js/read-aloud.js",
]

SCRIPT_TAG_RE = re.compile(
    r'<script\s+[^>]*src="([^"]+?)"[^>]*></script>', re.IGNORECASE
)


def already_included(html: str, src: str) -> bool:
    return f'src="{src}"' in html


def remove_existing_read_aloud(html: str) -> str:
    """Remove any existing <script src="js/read-aloud.js"> so we can relocate
    it to AFTER speech-config.js. Previous pages loaded it before."""
    return re.sub(
        r'\s*<script\s+src="js/read-aloud\.js"[^>]*></script>\s*',
        "\n  ",
        html,
    )


def inject_after(html: str, anchor_src: str, new_tag: str) -> str:
    """Insert new_tag on the line AFTER the <script> that matches anchor_src."""
    pattern = re.compile(
        r'(<script\s+src="' + re.escape(anchor_src) + r'"[^>]*></script>)',
        re.IGNORECASE,
    )
    if not pattern.search(html):
        return None
    return pattern.sub(r"\1\n  " + new_tag, html, count=1)


def inject_before_body_close(html: str, new_tag: str) -> str:
    return html.replace("</body>", "  " + new_tag + "\n</body>", 1)


def process(path: Path) -> bool:
    html = path.read_text(encoding="utf-8")
    original = html
    html = remove_existing_read_aloud(html)

    # read-aloud after speech-config (fallback: before </body>)
    if not already_included(html, "js/read-aloud.js"):
        tag = '<script src="js/read-aloud.js" defer></script>'
        out = inject_after(html, "js/speech-config.js", tag)
        if out:
            html = out
        else:
            html = inject_before_body_close(html, tag)

    # keyboard-helper, module-progress, check-in (anywhere before </body>)
    for src in ["js/keyboard-helper.js", "js/module-progress.js", "js/check-in.js"]:
        if already_included(html, src):
            continue
        tag = f'<script src="{src}" defer></script>'
        html = inject_before_body_close(html, tag)

    if html != original:
        path.write_text(html, encoding="utf-8")
        return True
    return False


def main() -> int:
    modules = sorted(ROOT.glob("module-*.html"))
    changed = 0
    skipped = 0
    for p in modules:
        if process(p):
            changed += 1
            print(f"UPDATED: {p.name}")
        else:
            skipped += 1
            print(f"  already-ok: {p.name}")
    print(f"\nSummary: {changed} updated, {skipped} already ok, {len(modules)} total")
    return 0


if __name__ == "__main__":
    sys.exit(main())
