"""
IA Finding 5: Add DCC Kids + For Libraries to Get Started nav group.

Pattern: after the "Set Up for a Loved One" link in the sidebar Get Started
section, insert the two missing nav items. Only touches files missing
the for-libraries.html link in their sidebar.
"""
import os, re

REPO = r'C:\twobirds\digital-confidence'

KIDS_LINK     = '        <a href="kids/"><span class="nav-icon" aria-hidden="true">🧒</span><span class="nav-label">DCC Kids (Ages 4–15)</span></a>'
LIBRARY_LINK  = '        <a href="for-libraries.html"><span class="nav-icon" aria-hidden="true">🏫</span><span class="nav-label">For Libraries &amp; Facilitators</span></a>'

# Anchor: the Set Up for a Loved One line (exact match expected)
ANCHOR_PAT = re.compile(
    r'(<a href="family-setup\.html"><span class="nav-icon" aria-hidden="true">👪</span><span class="nav-label">Set Up for a Loved One</span></a>)'
)

changed = []
skipped = []

for fname in sorted(os.listdir(REPO)):
    if not fname.endswith('.html'):
        continue
    path = os.path.join(REPO, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Only update if has sidebar (snav-group) AND missing for-libraries
    if 'snav-group' not in content:
        continue
    if 'for-libraries' in content:
        continue
    if fname == 'for-libraries.html':
        continue
    # Check anchor is present
    if not ANCHOR_PAT.search(content):
        skipped.append(fname + ' (no anchor)')
        continue
    # Insert the two links after the anchor
    new_content = ANCHOR_PAT.sub(
        r'\1\n' + KIDS_LINK + '\n' + LIBRARY_LINK,
        content,
        count=1
    )
    if new_content == content:
        skipped.append(fname + ' (no change)')
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
