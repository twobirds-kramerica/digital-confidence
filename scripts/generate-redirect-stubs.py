# Generate static redirect stub pages for old root-level URLs that moved
# to /classic/ during the 2026-07 DCC v2 cutover.
#
# GitHub Pages has no server-side redirects, so each old URL gets a real
# HTML file at its original root path containing a meta-refresh + JS
# redirect to the /classic/ equivalent. Stubs are noindex (the classic
# archive is deliberately excluded from search).
#
# Input:  scripts/redirect-stubs/moved-paths.txt (pre-cutover sitemap paths)
#         + full enumeration of classic/answers, classic/tips, classic/geo-content
# Output: stub HTML files at repo root, scripts/redirect-stubs/generated.txt,
#         scripts/redirect-stubs/unmapped.txt
#
# Run from repo root: python scripts/generate-redirect-stubs.py

import os
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "/digital-confidence"
CONTENT_DIRS = ["answers", "tips", "geo-content"]

TEMPLATE = """<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, follow">
  <meta http-equiv="refresh" content="0; url={target}">
  <link rel="canonical" href="https://twobirds-kramerica.github.io{target}">
  <title>This page has moved</title>
  <script>location.replace("{target}");</script>
</head>
<body>
  <p>This page has moved to the classic archive of the Digital Confidence Centre.
     If you are not redirected automatically, <a href="{target}">continue to the page</a>.</p>
</body>
</html>
"""


def collect_paths():
    paths = set()
    listfile = os.path.join(REPO, "scripts", "redirect-stubs", "moved-paths.txt")
    with open(listfile, encoding="utf-8") as f:
        for line in f:
            p = line.strip()
            if p:
                paths.add(p)
    # Full enumeration of classic content dirs (sitemap may lag actual pages)
    for d in CONTENT_DIRS:
        cdir = os.path.join(REPO, "classic", d)
        for name in sorted(os.listdir(cdir)):
            if name.endswith(".html"):
                paths.add(f"{d}/{name}")
    return sorted(paths)


def main():
    generated, skipped_exists, unmapped = [], [], []
    for p in collect_paths():
        stub_rel = p + "index.html" if p.endswith("/") else p
        if not stub_rel.endswith(".html"):
            unmapped.append(p)
            continue
        stub_abs = os.path.join(REPO, *stub_rel.split("/"))
        if os.path.exists(stub_abs):
            with open(stub_abs, encoding="utf-8") as f:
                existing = f.read(2048)
            if "This page has moved to the classic archive" not in existing:
                skipped_exists.append(p)  # still live at root in v2 -- no stub needed
                continue
            # else: a previously generated stub -- regenerate (idempotent)
        classic_rel = "classic/" + stub_rel
        if not os.path.exists(os.path.join(REPO, *classic_rel.split("/"))):
            unmapped.append(p)
            continue
        # Redirect to the pretty classic URL (keep trailing slash for dirs)
        target = f"{BASE}/classic/{p}"
        os.makedirs(os.path.dirname(stub_abs), exist_ok=True)
        with open(stub_abs, "w", encoding="utf-8", newline="\n") as f:
            f.write(TEMPLATE.format(target=target))
        generated.append(stub_rel)

    outdir = os.path.join(REPO, "scripts", "redirect-stubs")
    with open(os.path.join(outdir, "generated.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(generated) + "\n")
    with open(os.path.join(outdir, "unmapped.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(unmapped) + ("\n" if unmapped else ""))

    print(f"generated: {len(generated)}")
    print(f"skipped (still live at root): {len(skipped_exists)}")
    print(f"unmapped (no classic target): {len(unmapped)}")
    for p in unmapped:
        print(f"  UNMAPPED: {p}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
