"""
IA Finding 8: Add category label above <h1> on each module page.
Inserts <p class="module-category-label">Category Name</p> before the first
<h1> inside <main class="main-content" id="main">.
Only touches files that have a main content block and are missing the label.
"""
import os, re

REPO = r'C:\twobirds\digital-confidence'

CATEGORY_MAP = {
    # Safety First
    'module-1.html':              'Safety First',
    'module-2.html':              'Safety First',
    'module-2-5.html':            'Safety First',
    'module-3.html':              'Safety First',
    'module-4.html':              'Safety First',
    'module-5.html':              'Safety First',
    'scam-simulator.html':        'Safety First',
    # Daily Life
    'module-6.html':              'Daily Life',
    'module-7.html':              'Daily Life',
    'module-8.html':              'Daily Life',
    'module-9.html':              'Daily Life',
    'module-10.html':             'Daily Life',
    'module-11.html':             'Daily Life',
    'module-12.html':             'Daily Life',
    'module-13.html':             'Daily Life',
    'module-14.html':             'Daily Life',
    'module-15.html':             'Daily Life',
    'module-visual-ai.html':      'Daily Life',
    'module-fact-check.html':     'Daily Life',
    'module-ai-health.html':      'Daily Life',
    'module-ai-literacy.html':    'Daily Life',
    # Staying Independent
    'module-16-travel-safety.html':     'Staying Independent',
    'module-17-ai-research.html':       'Staying Independent',
    'module-18-staying-connected.html': 'Staying Independent',
    'module-19-digital-legacy.html':    'Staying Independent',
    'module-20-internet-plan.html':     'Staying Independent',
    'module-21-mobile-plan.html':       'Staying Independent',
    'module-22-tv-home-phone.html':     'Staying Independent',
    'module-23-online-marketplace.html':'Staying Independent',
    'module-24-communication.html':     'Staying Independent',
}

# Match the first <h1> inside the main content block
# We look for the pattern: inside main#main, find the first <h1...>
MAIN_H1_PAT = re.compile(
    r'(<main class="main-content" id="main">[\s\S]*?)([ \t]*)(<h1[^>]*>)',
    re.DOTALL
)

changed = []
skipped = []

for fname, category in CATEGORY_MAP.items():
    path = os.path.join(REPO, fname)
    if not os.path.exists(path):
        skipped.append(f'{fname} (not found)')
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'module-category-label' in content:
        skipped.append(f'{fname} (already has label)')
        continue
    if '<main class="main-content" id="main">' not in content:
        skipped.append(f'{fname} (no main block)')
        continue

    def replace_first_h1(m):
        pre     = m.group(1)   # everything from <main> up to the h1
        indent  = m.group(2)   # whitespace before <h1>
        h1_open = m.group(3)   # <h1> opening tag
        label   = f'{indent}<p class="module-category-label">{category}</p>\n'
        return pre + label + indent + h1_open

    new_content = MAIN_H1_PAT.sub(replace_first_h1, content, count=1)

    if new_content == content:
        skipped.append(f'{fname} (regex no-match)')
        continue

    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    changed.append(fname)

print(f'Updated {len(changed)} files:')
for f in changed:
    print(f'  {f}')
if skipped:
    print(f'\nSkipped {len(skipped)}:')
    for f in skipped:
        print(f'  {f}')
