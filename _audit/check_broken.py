import os, re, glob

BASE = os.getcwd()
html_files = set()
for root, dirs, files in os.walk(BASE):
    if '.git' in root:
        continue
    for fn in files:
        if fn.endswith('.html'):
            rel = os.path.relpath(os.path.join(root, fn), BASE)
            rel = rel.replace(os.sep, '/')
            html_files.add(rel)

broken = []
for root, dirs, files in os.walk(BASE):
    if '.git' in root:
        continue
    for fn in files:
        if not fn.endswith('.html'):
            continue
        fpath = os.path.join(root, fn)
        relfile = os.path.relpath(fpath, BASE).replace(os.sep, '/')
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        hrefs = re.findall(r'href="([^"#?]*\.html[^"]*)"', content)
        for href in hrefs:
            href = href.split('?')[0].split('#')[0]
            if href.startswith('http') or href.startswith('//'):
                continue
            if not href.endswith('.html'):
                continue
            file_dir = os.path.dirname(relfile)
            if href.startswith('/'):
                target = href.lstrip('/')
            else:
                target = os.path.normpath(os.path.join(file_dir, href))
                target = target.replace(os.sep, '/')
            if target not in html_files:
                broken.append((relfile, href, target))

print(f"Broken internal links: {len(broken)}")
for src, href, target in broken:
    print(f"  {src}: {href} -> MISSING:{target}")
