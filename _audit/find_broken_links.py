#!/usr/bin/env python3
import os
import re

BASE = "C:/Users/getkr/brenda-digital-confidence"

src_dirs = [
    "answers", "tips", "resources", "geo-content",
    "exercises", "fr", "accessibility", "scam-alerts", ""
]

broken = []

for src_dir in src_dirs:
    if src_dir:
        search_path = os.path.join(BASE, src_dir)
    else:
        search_path = BASE

    if not os.path.isdir(search_path):
        continue

    for fname in os.listdir(search_path):
        if not fname.endswith('.html'):
            continue
        skip_prefixes = ('_', 'test-', 'google-site-verification')
        if any(fname.startswith(p) for p in skip_prefixes):
            continue

        fpath = os.path.join(search_path, fname)
        try:
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception:
            continue

        hrefs = re.findall(r'href="([^"#?]*\.html)', content)

        for href in hrefs:
            if href.startswith('http') or href.startswith('//'):
                continue

            file_dir = os.path.dirname(fpath)
            resolved = os.path.normpath(os.path.join(file_dir, href))

            if not os.path.exists(resolved):
                rel_src = (src_dir + '/' + fname) if src_dir else fname
                broken.append((rel_src, href, resolved))

seen = set()
unique_broken = []
for item in broken:
    key = (item[0], item[1])
    if key not in seen:
        seen.add(key)
        unique_broken.append(item)

print("Total broken links: " + str(len(unique_broken)))
for src, href, resolved in sorted(unique_broken):
    print("  [" + src + "] -> " + href)
