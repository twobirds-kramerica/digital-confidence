"""Check sitemap.xml for stale/missing URLs"""
import os, re

BASE = os.getcwd()
SITE_BASE = 'https://twobirds-kramerica.github.io/digital-confidence/'

with open(os.path.join(BASE, 'sitemap.xml'), 'r', encoding='utf-8') as f:
    sitemap = f.read()

urls = re.findall(r'<loc>(.*?)</loc>', sitemap)
print(f"Total URLs: {len(urls)}")

missing = []
for url in urls:
    if not url.startswith(SITE_BASE):
        continue
    path = url[len(SITE_BASE):]
    if not path or path == '':
        path = 'index.html'
    if path.endswith('/'):
        path += 'index.html'
    full = os.path.join(BASE, path.replace('/', os.sep))
    if not os.path.exists(full):
        missing.append((url, path))

print(f"Missing files: {len(missing)}")
for url, path in missing:
    print(f"  MISSING: {path}")
    print(f"    URL: {url}")
