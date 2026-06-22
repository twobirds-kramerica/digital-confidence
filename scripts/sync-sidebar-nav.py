"""
Sync canonical sidebar <nav> from index.html to all module HTML pages.
Extracts the 4-space-indented <nav>...</nav> block from index.html
and replaces the equivalent block in each target module file.
"""
import os
import re

DCC_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_HTML = os.path.join(DCC_DIR, "index.html")

EXCLUDE = {
    "module-template.html",
    "module-ai-literacy-youth.html",
}

def extract_nav_block(html):
    """Extract the 4-space-indented <nav>...</nav> block."""
    # Match from '    <nav>' to '    </nav>' (4-space indent)
    match = re.search(r'(    <nav>.*?    </nav>)', html, re.DOTALL)
    if not match:
        raise ValueError("Could not find nav block")
    return match.group(1)

def replace_nav_block(html, new_nav):
    """Replace the existing nav block with new_nav."""
    return re.sub(r'    <nav>.*?    </nav>', new_nav, html, count=1, flags=re.DOTALL)

def get_target_files():
    targets = []
    for fname in os.listdir(DCC_DIR):
        if not fname.endswith(".html"):
            continue
        if fname in EXCLUDE:
            continue
        if fname == "index.html":
            continue
        # Only module files and the wizard exclusion
        if "wizard" in fname:
            continue
        # Must contain a <nav> block (i.e. has a sidebar)
        fpath = os.path.join(DCC_DIR, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        if "    <nav>" in content:
            targets.append((fname, fpath, content))
    return targets

with open(INDEX_HTML, "r", encoding="utf-8") as f:
    index_html = f.read()

canonical_nav = extract_nav_block(index_html)
print(f"Extracted canonical nav block ({len(canonical_nav)} chars)")

targets = get_target_files()
print(f"Found {len(targets)} target files")

updated = 0
skipped = 0
for fname, fpath, content in targets:
    new_content = replace_nav_block(content, canonical_nav)
    if new_content == content:
        skipped += 1
        continue
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"  updated: {fname}")
    updated += 1

print(f"\nDone: {updated} updated, {skipped} already current")
