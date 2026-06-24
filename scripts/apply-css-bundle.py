"""
S-DCC-CSS-BUNDLE — Concatenate 6 core DCC CSS files into bundle.css,
then update all HTML files to use 1 link instead of 6.

Run from repo root: python scripts/apply-css-bundle.py
"""
import os
import re

DCC_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_DIR = os.path.join(DCC_ROOT, 'css')

CORE_CSS_ORDER = [
    'fonts.css',
    'tokens.css',
    'tokens-dark.css',
    'main.css',
    'components.css',
    'accessibility.css',
]
CORE_CSS_SET = set(CORE_CSS_ORDER)

SKIP_DIRS = {
    '.git', '.github', '.cursor', '.claude',
    'backups', 'v2', 'dist', 'build', '_build', 'node_modules',
}

LINK_RE = re.compile(
    r'[ \t]*<link\s+rel="stylesheet"\s+href="([^"]+)"[^>]*>[ \t]*\n?'
)


def build_bundle():
    bundle_path = os.path.join(CSS_DIR, 'bundle.css')
    parts = []
    for name in CORE_CSS_ORDER:
        src = os.path.join(CSS_DIR, name)
        with open(src, encoding='utf-8') as f:
            parts.append(f'/* === {name} === */\n' + f.read())
    with open(bundle_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(parts))
    size_kb = round(os.path.getsize(bundle_path) / 1024, 1)
    print(f'Created css/bundle.css ({size_kb} KB)')


def process_file(fpath):
    with open(fpath, encoding='utf-8') as f:
        content = f.read()

    matches = list(LINK_RE.finditer(content))

    # Identify core CSS matches (and detect prefix from first one)
    core_matches = []
    prefix = None
    for m in matches:
        href = m.group(1)
        fname = href.rsplit('/', 1)[-1]
        if fname in CORE_CSS_SET:
            if prefix is None:
                prefix = href[: -len(fname)]
            core_matches.append(m)

    if len(core_matches) < 3:
        return False

    # Build bundle link (preserve indentation from first core match)
    indent = re.match(r'[ \t]*', core_matches[0].group(0)).group(0)
    bundle_line = f'{indent}<link rel="stylesheet" href="{prefix}bundle.css">\n'

    # Replace first core match with bundle, delete the rest (reverse order)
    new_content = content
    for i, m in reversed(list(enumerate(core_matches))):
        if i == 0:
            new_content = new_content[: m.start()] + bundle_line + new_content[m.end():]
        else:
            new_content = new_content[: m.start()] + new_content[m.end():]

    if new_content == content:
        return False

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    return True


def main():
    print('Phase 1: Building css/bundle.css ...')
    build_bundle()

    print('\nPhase 2: Updating HTML files ...')
    updated = 0
    skipped = 0

    for root, dirs, files in os.walk(DCC_ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for fname in files:
            if not fname.endswith('.html'):
                continue
            fpath = os.path.join(root, fname)
            if process_file(fpath):
                rel = os.path.relpath(fpath, DCC_ROOT)
                print(f'  UPDATED {rel}')
                updated += 1
            else:
                skipped += 1

    print(f'\nDone: {updated} updated, {skipped} skipped (no 3+ core links).')


if __name__ == '__main__':
    main()
