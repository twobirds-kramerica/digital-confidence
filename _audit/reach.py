import re, glob

links = {}
def get(f):
    return re.findall(r'href="([^"]+)"', open(f, encoding='utf-8', errors='replace').read())

pages = glob.glob('*.html') + glob.glob('modules/*.html')
for p in pages:
    key = p.replace('\\', '/')
    out = set()
    for h in get(p):
        h = h.split('#')[0].split('?')[0]
        if not h:
            continue
        if h.startswith(('http', 'mailto')):
            if 'twobirds-kramerica.github.io/digital-confidence/' in h:
                h = h.split('digital-confidence/')[1]
            else:
                continue
        if h.startswith('/digital-confidence/'):
            h = h[len('/digital-confidence/'):]
        if key.startswith('modules/') and not h.startswith(('modules/', 'classic/', '..')):
            h = 'modules/' + h
        if h.startswith('../'):
            h = h[3:]
        if h.endswith('.html'):
            out.add(h)
    links[key] = out

seen = {'index.html'}
stack = ['index.html']
while stack:
    cur = stack.pop()
    for n in links.get(cur, ()):
        if n not in seen and n in links:
            seen.add(n)
            stack.append(n)

mods = [p for p in links if p.startswith('modules/')]
unreach = sorted(m for m in mods if m not in seen)
print("modules total:", len(mods))
print("unreachable from index:", len(unreach))
for m in unreach:
    print("  ", m)
root_unreach = sorted(p for p in links if not p.startswith('modules/') and p not in seen)
print("root pages unreachable from index:", len(root_unreach))
for m in root_unreach:
    print("  ", m)
