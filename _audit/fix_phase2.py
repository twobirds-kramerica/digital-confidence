"""
Phase 2 schema fixes:
2B: Fix tip pages — author Aaron Kramer -> Aaron Patzalek, publisher -> Two Birds Innovation
2C: Add speakable schema to scam deep-dive pages
"""
import os, re, glob, json

BASE = os.getcwd()

# ============================================================
# 2B: Fix tip pages — author and publisher in Article schema
# ============================================================
tip_fixed = []
for fpath in sorted(glob.glob(os.path.join(BASE, 'tips', '*.html'))):
    fname = os.path.basename(fpath)
    if fname == 'index.html':
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    changed = False
    new = content

    # Fix author name
    if '"name": "Aaron Kramer"' in new:
        new = new.replace('"name": "Aaron Kramer"', '"name": "Aaron Patzalek"')
        changed = True

    # Fix publisher to Two Birds Innovation
    if '"publisher": {"@type": "Organization", "name": "Digital Confidence Centre"}' in new:
        new = new.replace(
            '"publisher": {"@type": "Organization", "name": "Digital Confidence Centre"}',
            '"publisher": {"@type": "Organization", "name": "Two Birds Innovation"}'
        )
        changed = True

    if changed and new != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new)
        tip_fixed.append(fname)

print(f"2B: Fixed {len(tip_fixed)} tip pages (author, publisher)")

# ============================================================
# 2C: Add speakable schema to scam deep-dive pages
# ============================================================
sdd_dir = os.path.join(BASE, 'resources', 'scam-deep-dives')
sdd_fixed = []
for fpath in sorted(glob.glob(os.path.join(sdd_dir, '*.html'))):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'speakable' in content:
        continue
    # Find the Article schema block and add speakable property
    # The block ends with "inLanguage": "en-CA"\n  }\n  </script>
    # Add speakable before closing }
    speakable_prop = ',\n    "speakable": {"@type": "SpeakableSpecification", "cssSelector": ["h1", ".warning-block p:first-child", ".geo-answer p:first-child"]}'
    # Pattern: close of Article schema before </script>
    new = re.sub(
        r'("inLanguage"\s*:\s*"en-CA")\s*\n(\s*\})',
        r'\1' + speakable_prop + r'\n\2',
        content,
        count=1
    )
    if new != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new)
        sdd_fixed.append(os.path.basename(fpath))

print(f"2C: Fixed {len(sdd_fixed)} scam deep-dive pages (speakable schema added)")
for f in sdd_fixed:
    print(f"   {f}")
