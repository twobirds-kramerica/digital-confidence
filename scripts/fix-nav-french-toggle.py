"""
S-DCC-IA-FINDING-4: Add 'Version française' nav link to all root-level DCC pages
that already have the B2B nav links. Inserts after for-libraries.html anchor.
Skips: fr/ pages (already link to English), kids/ pages (separate path), admin.html.
"""
import pathlib

DC = pathlib.Path(__file__).parent.parent

SKIP = {"admin.html", "export-og-png.html"}

FRENCH_LINK = '<a href="fr/index.html"><span class="nav-icon" aria-hidden="true">🇫🇷</span><span class="nav-label">Version française</span></a>'

updated = 0
skipped_no_anchor = 0
skipped_already = 0

targets = [
    p for p in DC.glob("*.html")
    if p.name not in SKIP
]

for path in sorted(targets):
    text = path.read_text(encoding="utf-8")

    if 'fr/index.html' in text:
        skipped_already += 1
        continue

    if 'href="for-libraries.html"' not in text:
        print(f"SKIP (no for-libraries anchor): {path.name}")
        skipped_no_anchor += 1
        continue

    lines = text.splitlines(keepends=True)
    out = []
    inserted = False
    for line in lines:
        out.append(line)
        if 'href="for-libraries.html"' in line and not inserted:
            indent = len(line) - len(line.lstrip())
            pad = " " * indent
            eol = "\r\n" if line.endswith("\r\n") else "\n"
            out.append(f"{pad}{FRENCH_LINK}{eol}")
            inserted = True

    if not inserted:
        print(f"WARN (insert failed): {path.name}")
        continue

    path.write_text("".join(out), encoding="utf-8")
    print(f"OK: {path.name}")
    updated += 1

print(f"\n{updated} files updated | {skipped_already} already done | {skipped_no_anchor} skipped (no anchor)")
