#!/usr/bin/env python3
"""Measure the real rendered gap between the welcome wizard's CTA row
(.dcc-welcome-actions) and the bottom of the viewport, across a matrix of
realistic viewport heights x browser zoom levels x languages x wizard steps.

Zoom is emulated the way real Ctrl-+ zoom affects layout: a 125% zoom on an
800px-tall window gives the page a ~640px CSS viewport. So each (physical
height, zoom) pair is tested as viewport height = physical / zoom.

Usage: python measure-cta-gap.py [--shots] [--base http://localhost:9200]
Writes screenshots next to itself when --shots is passed.
"""
import argparse
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))

# (physical window height, label) -- short laptop, standard laptop, tablet, phone
PHYS = [(1080, "desktop1080"), (800, "laptop800"), (740, "short740"), (667, "phone667")]
ZOOMS = [1.0, 1.25, 1.5, 2.0]
LANGS = [("index.html", "en"), ("fr/index.html", "fr")]
STEPS = [1, 2, 3]


def run(base, shots):
    from playwright.sync_api import sync_playwright
    rows = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for page_path, lang in LANGS:
            for phys, plabel in PHYS:
                for zoom in ZOOMS:
                    css_h = round(phys / zoom)
                    css_w = round((1280 if phys > 700 else 390) / zoom)
                    ctx = browser.new_context(viewport={"width": css_w, "height": css_h})
                    page = ctx.new_page()
                    page.goto(f"{base}/{page_path}?beta=1", wait_until="load")
                    try:
                        page.wait_for_selector("dialog.dcc-welcome[open]", timeout=5000)
                    except Exception:
                        rows.append({"lang": lang, "phys": plabel, "zoom": zoom,
                                     "step": 0, "error": "wizard did not open"})
                        ctx.close()
                        continue
                    page.wait_for_timeout(450)  # let the open transition settle
                    for step in STEPS:
                        if step > 1:
                            page.evaluate(f"window.DCCBeta.openWizardStep({step})")
                            page.wait_for_timeout(150)
                        m = page.evaluate("""() => {
                            const dlg = document.querySelector('dialog.dcc-welcome');
                            const act = dlg.querySelector('.dcc-welcome-actions');
                            const panel = dlg.querySelector('.dcc-welcome-panel');
                            const r = act.getBoundingClientRect();
                            const pr = panel.getBoundingClientRect();
                            const cs = getComputedStyle(dlg);
                            return {
                                vh: window.innerHeight,
                                actionsBottom: r.bottom,
                                gapBelowActions: window.innerHeight - r.bottom,
                                panelBottom: pr.bottom,
                                panelTop: pr.top,
                                dlgPadBottom: cs.paddingBottom,
                                actionsOffscreen: r.bottom > window.innerHeight + 0.5
                            };
                        }""")
                        m.update({"lang": lang, "phys": plabel, "zoom": zoom,
                                  "step": step, "cssH": css_h, "cssW": css_w})
                        rows.append(m)
                        if shots:
                            name = f"{'before' if shots == 'before' else 'after'}-{lang}-{plabel}-z{int(zoom*100)}-s{step}.png"
                            page.screenshot(path=os.path.join(HERE, name))
                    ctx.close()
        browser.close()
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--shots", default="", help="'before' or 'after' to save screenshots")
    ap.add_argument("--base", default="http://localhost:9200")
    args = ap.parse_args()
    rows = run(args.base, args.shots)
    bad = [r for r in rows if r.get("error") or r.get("gapBelowActions", 99) < 12 or r.get("actionsOffscreen")]
    for r in rows:
        if r.get("error"):
            print(f"ERROR {r}")
        else:
            flag = " <-- TIGHT/OFFSCREEN" if r in bad else ""
            print(f"{r['lang']} {r['phys']} z{int(r['zoom']*100)} s{r['step']} "
                  f"vh={r['vh']} gap={r['gapBelowActions']:.1f}px "
                  f"padB={r['dlgPadBottom']} off={r['actionsOffscreen']}{flag}")
    print(f"\n{len(bad)} of {len(rows)} combos tight (<12px) or offscreen")
    with open(os.path.join(HERE, f"gap-results-{args.shots or 'run'}.json"), "w") as f:
        json.dump(rows, f, indent=1)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
