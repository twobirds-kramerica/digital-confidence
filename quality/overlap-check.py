#!/usr/bin/env python3
"""Overlap check -- catches visually-adjacent elements that clip/bury each
other, at real widths AND real browser zoom levels.

Origin (2026-07-28): Aaron reported the header's Canadian trust badge
"buried under" the Secure Connection pill. Direct getBoundingClientRect()
testing at 1920/1600/960px and 100%/150% zoom found NO overlap -- the CSS
gap held cleanly at every size tested. Gap analysis: every previous
build-time check (impeccable audit, build-validator, verify-gate.py) tests
at 100% browser zoom only. DCC's own actual audience (seniors, low-vision
users) commonly runs 125-200% zoom via ctrl-+ or OS-level scaling, per the
product's own accessibility positioning -- so "never tested at the zoom
level our own users actually use" is a real, systemic gap, whether or not
it explains this specific report.

This script is the fix: it checks EVERY pair of visually-adjacent inline
elements in a header/toolbar-style row for bounding-box overlap, at a
matrix of widths x zoom levels, and fails loud if any pair overlaps.

Usage:
    python overlap-check.py <url> [--selector ".site-header .container > *"]

Requires: playwright (pip install playwright && playwright install chromium)
"""
from __future__ import annotations

import argparse
import sys

WIDTHS = [1920, 1366, 1024, 768, 375]
ZOOMS = [1.0, 1.25, 1.5, 2.0]  # 125%/150%/200% -- realistic senior/low-vision zoom


def check(url: str, selector: str) -> list[dict]:
    from playwright.sync_api import sync_playwright

    failures = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width in WIDTHS:
            page = browser.new_page(viewport={"width": width, "height": 1000})
            page.goto(url, wait_until="networkidle")
            for zoom in ZOOMS:
                page.evaluate(f"document.body.style.zoom = '{zoom}'")
                boxes = page.eval_on_selector_all(
                    selector,
                    "els => els.map(e => { const r = e.getBoundingClientRect(); "
                    "return {tag: e.tagName, cls: e.className, top: r.top, left: r.left, "
                    "right: r.right, bottom: r.bottom, w: r.width, h: r.height}; })"
                    ".filter(b => b.w > 0 && b.h > 0)"
                )
                for i in range(len(boxes)):
                    for j in range(i + 1, len(boxes)):
                        a, b = boxes[i], boxes[j]
                        overlap_x = a["left"] < b["right"] and b["left"] < a["right"]
                        overlap_y = a["top"] < b["bottom"] and b["top"] < a["bottom"]
                        if overlap_x and overlap_y:
                            failures.append({
                                "width": width, "zoom": zoom,
                                "a": f"{a['tag']}.{a['cls']}".strip("."),
                                "b": f"{b['tag']}.{b['cls']}".strip("."),
                            })
            page.close()
        browser.close()
    return failures


def main() -> int:
    ap = argparse.ArgumentParser(description="Check for visually-overlapping adjacent elements")
    ap.add_argument("url")
    ap.add_argument("--selector", default=".site-header .container > *",
                     help="CSS selector for the sibling elements to check pairwise (default: header row)")
    args = ap.parse_args()

    failures = check(args.url, args.selector)
    if not failures:
        print(f"overlap-check: 0 overlaps found across {len(WIDTHS)} widths x {len(ZOOMS)} zoom levels")
        return 0

    print(f"overlap-check: {len(failures)} overlap(s) found")
    for f in failures:
        print(f"  {f['width']}px @ {int(f['zoom']*100)}% zoom: {f['a']} overlaps {f['b']}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
