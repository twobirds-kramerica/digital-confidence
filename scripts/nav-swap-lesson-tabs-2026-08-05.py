# -*- coding: utf-8 -*-
"""S-DCC-UX-BATCH-001 item 1: swap the order of the two lesson-section tabs in
the sticky primary nav across every page that carries it.

Aaron, 2026-08-05: "All lessons" first is right; the second tab should be the
easier on-ramp for a brand-new user, and that is Everyday confidence, not
Protect your money -- people read left to right, so the cascade should run
top-of-funnel-easy to more-specific. Protect your money stays prominent
(third of five, and the flagship Spot-the-Scam practice card still sits above
both sections), it just is not the first thing a nervous first-time visitor
is handed.

Pure reorder inside the existing taxonomy. The bigger question Aaron raised --
whether these are the right buckets at all -- is a separate escalation; the
content audit found 22 of 35 modules unreachable from this nav and a
declared-but-empty fifth group, which needs his sign-off, not a script.
"""
import io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root, script lives in scripts/

# Both relative forms in use: root pages use "index.html#...", pages one level
# down (modules/, fr/) use "../index.html#...".
PAT = re.compile(
    r'(?P<money><a href="(?P<p1>(?:\.\./)?index\.html)#protect-money"[^>]*>[^<]*</a>)'
    r'(?P<gap>\s*)'
    r'(?P<every><a href="(?P<p2>(?:\.\./)?index\.html)#everyday-confidence"[^>]*>[^<]*</a>)'
)

changed = []
skipped = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames
                   if d not in ("dist", "classic", ".git", "backups", "node_modules", "v2-lab", "landing-v2-lab")]
    for fn in filenames:
        if not fn.endswith(".html"):
            continue
        path = os.path.join(dirpath, fn)
        src = io.open(path, encoding="utf-8").read()
        if "#everyday-confidence" not in src:
            continue
        new, n = PAT.subn(lambda m: m.group("every") + m.group("gap") + m.group("money"), src)
        if n:
            io.open(path, "w", encoding="utf-8", newline="").write(new)
            changed.append((os.path.relpath(path, ROOT), n))
        else:
            skipped.append(os.path.relpath(path, ROOT))

print("swapped in %d files (%d total replacements)" % (changed.__len__(), sum(n for _, n in changed)))
if skipped:
    print("NOT MATCHED (%d) -- inspect these by hand:" % len(skipped))
    for s in skipped:
        print("   ", s)
