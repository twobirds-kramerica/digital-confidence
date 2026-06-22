"""
S-DCC-SIDEBAR-LABEL-FIX: Rename "Living Independently" -> "Living Independently"
across all DCC HTML, JS, PY, and TPL files. UTF-8 safe.
"""
import os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OLD = "Living Independently"
NEW = "Living Independently"
EXTS = {'.html', '.js', '.py', '.tpl'}

changed = []
for dirpath, _, filenames in os.walk(ROOT):
    for fname in filenames:
        if os.path.splitext(fname)[1] not in EXTS:
            continue
        fpath = os.path.join(dirpath, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        if OLD not in content:
            continue
        new_content = content.replace(OLD, NEW)
        with open(fpath, 'w', encoding='utf-8', newline='') as f:
            f.write(new_content)
        count = content.count(OLD)
        changed.append((fpath.replace(ROOT + os.sep, ''), count))
        print(f"  [{count:2d}x] {fpath.replace(ROOT + os.sep, '')}")

print(f"\nDone: {len(changed)} files updated.")
