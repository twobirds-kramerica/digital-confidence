"""
Minify bundle.css — strips block comments and collapses whitespace.
Conservative: does not modify selector/value tokens, preserves string literals.
Run from css/ directory: python minify-bundle.py
"""
import re
import os
import sys

src = 'bundle.css'
out = 'bundle.min.css'

with open(src, 'r', encoding='utf-8') as f:
    css = f.read()

original_size = len(css.encode('utf-8'))

# 1. Remove block comments (/* ... */) — preserve /*!...*/ license headers if any
css = re.sub(r'/\*(?!!)[^*]*\*+(?:[^/*][^*]*\*+)*/', '', css)

# 2. Collapse all whitespace sequences to single space
css = re.sub(r'[ \t\r\n]+', ' ', css)

# 3. Remove spaces around structural tokens: { } ; ,
css = re.sub(r'\s*\{\s*', '{', css)
css = re.sub(r'\s*\}\s*', '}', css)
css = re.sub(r'\s*;\s*', ';', css)
css = re.sub(r'\s*,\s*', ',', css)

# 4. Remove the last semicolon before closing brace
css = re.sub(r';+\}', '}', css)

# 5. Strip leading/trailing whitespace
css = css.strip()

minified_size = len(css.encode('utf-8'))
reduction = (1 - minified_size / original_size) * 100

print(f"Original:  {original_size:,} bytes ({original_size/1024:.1f} KB)")
print(f"Minified:  {minified_size:,} bytes ({minified_size/1024:.1f} KB)")
print(f"Reduction: {reduction:.1f}%")

with open(out, 'w', encoding='utf-8', newline='') as f:
    f.write(css)

print(f"Written to {out}")
