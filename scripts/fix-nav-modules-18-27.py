"""
S-DCC-IA-FINDING-5B: Add 'DCC Kids' + 'For Libraries' nav links to
modules 18-27 (flat-nav, no snav-group). Inserts after family-setup.html anchor.
"""
import pathlib, re, sys

DC = pathlib.Path(__file__).parent.parent

TARGETS = [
    "module-18-staying-connected.html",
    "module-19-digital-legacy.html",
    "module-20-internet-plan.html",
    "module-21-mobile-plan.html",
    "module-22-tv-home-phone.html",
    "module-23-online-marketplace.html",
    "module-24-communication.html",
    "module-25-outage-detection.html",
    "module-26-notifications.html",
    "module-27-inbox-spam.html",
]

KIDS_LINK    = '<a href="kids/"><span class="nav-icon" aria-hidden="true">🧒</span><span class="nav-label">DCC Kids (Ages 4–15)</span></a>'
LIBRARY_LINK = '<a href="for-libraries.html"><span class="nav-icon" aria-hidden="true">🏫</span><span class="nav-label">For Libraries &amp; Facilitators</span></a>'

updated = 0
for fname in TARGETS:
    path = DC / fname
    if not path.exists():
        print(f"SKIP (not found): {fname}")
        continue

    text = path.read_text(encoding="utf-8")

    if 'for-libraries.html' in text:
        print(f"SKIP (already fixed): {fname}")
        continue

    lines = text.splitlines(keepends=True)
    out = []
    inserted = False
    for line in lines:
        out.append(line)
        if 'href="family-setup.html"' in line and not inserted:
            # detect indentation
            indent = len(line) - len(line.lstrip())
            pad = " " * indent
            eol = "\n" if line.endswith("\r\n") else "\n"
            out.append(f"{pad}{KIDS_LINK}{eol}")
            out.append(f"{pad}{LIBRARY_LINK}{eol}")
            inserted = True

    if not inserted:
        print(f"WARN (family-setup not found): {fname}")
        continue

    path.write_text("".join(out), encoding="utf-8")
    print(f"OK: {fname}")
    updated += 1

print(f"\n{updated}/{len(TARGETS)} files updated.")
