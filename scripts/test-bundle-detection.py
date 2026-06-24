"""Dry-run test for bundle detection — checks a few sample files."""
import re
import os

DCC_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CORE_CSS_SET = {'fonts.css', 'tokens.css', 'tokens-dark.css', 'main.css', 'components.css', 'accessibility.css'}
LINK_RE = re.compile(r'[ \t]*<link\s+rel="stylesheet"\s+href="([^"]+)"[^>]*>[ \t]*\n?')

TEST_FILES = [
    'index.html',
    'module-ai-health.html',
    os.path.join('kids', '10-12', 'creating-a-strong-password.html'),
    os.path.join('kids', '7-9', 'building-a-safe-online-identity.html'),
]

for rel in TEST_FILES:
    fpath = os.path.join(DCC_ROOT, rel)
    if not os.path.exists(fpath):
        print(f'SKIP (not found): {rel}')
        continue
    with open(fpath, encoding='utf-8') as f:
        content = f.read()
    matches = list(LINK_RE.finditer(content))
    core = [m for m in matches if m.group(1).rsplit('/', 1)[-1] in CORE_CSS_SET]
    non_core = [m for m in matches if m.group(1).rsplit('/', 1)[-1] not in CORE_CSS_SET]
    prefix = core[0].group(1)[:-len(core[0].group(1).rsplit('/', 1)[-1])] if core else None
    action = 'WOULD UPDATE' if len(core) >= 3 else 'SKIP'
    print(f'{action}: {rel}')
    print(f'  Core ({len(core)}): {[m.group(1).rsplit("/",1)[-1] for m in core]}')
    print(f'  Non-core ({len(non_core)}): {[m.group(1).rsplit("/",1)[-1] for m in non_core]}')
    print(f'  Prefix: {prefix!r}')
    print()
