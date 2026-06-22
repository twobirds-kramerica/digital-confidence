"""
S-DCC-PERF-002 patch:
1. module-27 and module-29: replace 6 individual CSS files with bundle.css
2. All HTML files: convert print.css to media="print" (non-blocking)
"""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__)) + '/..'

OLD_BUNDLE = [
    '<link rel="stylesheet" href="css/main.css">',
    '<link rel="stylesheet" href="css/tokens.css">',
    '<link rel="stylesheet" href="css/tokens-dark.css">',
    '<link rel="stylesheet" href="css/fonts.css">',
    '<link rel="stylesheet" href="css/components.css">',
    '<link rel="stylesheet" href="css/accessibility.css">',
]
NEW_BUNDLE = '  <link rel="stylesheet" href="css/bundle.css">'

PRINT_OLD = '<link rel="stylesheet" href="css/print.css">'
PRINT_NEW = '<link rel="stylesheet" href="css/print.css" media="print">'

bundle_fixed = []
print_fixed = []

for path in glob.glob(ROOT + '/**/*.html', recursive=True):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix 1: replace 6-file pattern with bundle.css in module-27 and module-29
    if 'main.css' in content and 'tokens.css' in content and 'fonts.css' in content:
        # Remove each of the 6 individual lines
        for old_line in OLD_BUNDLE:
            content = content.replace(old_line + '\n', '')
            content = content.replace('  ' + old_line + '\n', '')
        # Insert bundle.css after the first <meta charset or before any remaining CSS
        if '<link rel="stylesheet" href="css/bundle.css">' not in content:
            content = content.replace(
                '<link rel="stylesheet" href="css/module-enhance.css">',
                NEW_BUNDLE + '\n  <link rel="stylesheet" href="css/module-enhance.css">'
            )
        bundle_fixed.append(os.path.relpath(path, ROOT))

    # Fix 2: make print.css async via media="print"
    if PRINT_OLD in content:
        content = content.replace(PRINT_OLD, PRINT_NEW)
        print_fixed.append(os.path.relpath(path, ROOT))

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

print(f"Bundle fix applied to: {bundle_fixed}")
print(f"print.css async fix applied to {len(print_fixed)} files")
for f in print_fixed:
    print(f"  {f}")
