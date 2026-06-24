"""
Add Merriweather 400+700 preload hints to all root-level HTML pages.
Root cause: Merriweather is --font-body but not preloaded → font-swap CLS under throttling.
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRELOADS = (
    '  <link rel="preload" href="fonts/merriweather/merriweather-400.woff2" as="font" type="font/woff2" crossorigin>\n'
    '  <link rel="preload" href="fonts/merriweather/merriweather-700.woff2" as="font" type="font/woff2" crossorigin>\n'
)

updated = 0
skipped = 0

for fname in sorted(os.listdir(ROOT)):
    if not fname.endswith('.html'):
        continue
    path = os.path.join(ROOT, fname)
    with open(path, 'rb') as f:
        raw = f.read()
    text = raw.decode('utf-8')

    # Skip if already has Merriweather preload
    if 'merriweather-400.woff2' in text and 'as="font"' in text:
        skipped += 1
        continue

    # Skip pages that don't use bundle.css (unlikely but safe)
    if 'bundle.css' not in text and 'fonts.css' not in text:
        skipped += 1
        continue

    # Insert after last existing font preload, or before first stylesheet link
    # Look for the last <link rel="preload" ... as="font" line
    font_preload_pat = re.compile(r'(<link rel="preload"[^>]+as="font"[^>]*>\n?)')
    matches = list(font_preload_pat.finditer(text))
    if matches:
        # Insert after the last font preload
        last = matches[-1]
        insert_pos = last.end()
        text = text[:insert_pos] + PRELOADS + text[insert_pos:]
    else:
        # No existing font preloads — insert before first <link rel="stylesheet"
        stylesheet_pat = re.compile(r'(<link rel="stylesheet")')
        m = stylesheet_pat.search(text)
        if not m:
            skipped += 1
            continue
        insert_pos = m.start()
        text = text[:insert_pos] + PRELOADS + text[insert_pos:]

    with open(path, 'wb') as f:
        f.write(text.encode('utf-8'))
    print(f'  updated: {fname}')
    updated += 1

print(f'\nDone: {updated} updated, {skipped} skipped')
