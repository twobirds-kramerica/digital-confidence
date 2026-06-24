#!/usr/bin/env python3
# S-DCC-SIDEBAR-RESTRUCTURE: Replace flat sidebar nav with grouped accordion.
# Scopes replacement to <aside class="sidebar"> so noscript/other nav blocks are untouched.
import re, glob, os, sys

DCC_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SKIP_DIRS = {
    'dist', 'lang', '_grants', '_social', '_visual-pipeline',
    '_templates', 'beta-recruiting', 'white-label-demo', 'v2',
}

NAV_GROUPS = [
    ("Get Started", [
        ("index.html",             "\U0001f3e0", "Home"),
        ("digital-literacy-101.html", "\U0001f4d6", "Foundations"),
        ("family-setup.html",      "\U0001f46a", "Set Up for a Loved One"),
    ]),
    ("Safety First", [
        ("module-1.html",          "\U0001fa82", "1. The Escape Hatch"),
        ("module-2.html",          "\U0001f6e1️", "2. Security Shield"),
        ("module-2-5.html",        "\U0001f4c2", "2.5 Everyday Tasks"),
        ("module-3.html",          "\U0001f511", "3. Passwords"),
        ("module-4.html",          "\U0001f4f1", "4. App Store Safety"),
        ("module-5.html",          "✉️", "5. Email &amp; Messages"),
        ("scam-simulator.html",    "\U0001f3af", "Scam Simulator"),
    ]),
    ("Daily Life", [
        ("module-6.html",          "\U0001f3e6", "6. Banking"),
        ("module-7.html",          "\U0001f3a8", "7. Photos &amp; Memories"),
        ("module-8.html",          "\U0001f468‍\U0001f469‍\U0001f467", "8. Stay Connected"),
        ("module-9.html",          "\U0001f916", "9. Understanding AI"),
        ("module-10.html",         "\U0001f6d2", "10. Grocery &amp; Delivery"),
        ("module-11.html",         "\U0001f697", "11. Ride-Sharing"),
        ("module-12.html",         "\U0001f91d", "12. Getting Help"),
        ("module-13.html",         "\U0001f465", "13. Social Media"),
        ("module-14.html",         "\U0001f3e1", "14. Smart Home"),
        ("module-15.html",         "\U0001f3e5", "15. Telehealth"),
        ("module-visual-ai.html",  "\U0001f4f7", "Show Me! (Bonus)"),
    ]),
    ("Living Independently", [
        ("module-16-travel-safety.html",     "✈️", "16. Travel Safety"),
        ("module-17-ai-research.html",       "\U0001f50d", "17. AI Research"),
        ("module-18-staying-connected.html", "\U0001f49e", "18. Staying Connected"),
        ("module-19-digital-legacy.html",    "\U0001f5c2️", "19. Your Digital Life"),
        ("module-20-internet-plan.html",     "\U0001f4f6", "20. Internet Plans"),
        ("module-21-mobile-plan.html",       "\U0001f4f1", "21. Mobile Plans"),
        ("module-22-tv-home-phone.html",     "\U0001f4fa", "22. TV &amp; Phone"),
        ("module-23-online-marketplace.html","\U0001f6d2", "23. Marketplace"),
        ("module-24-communication.html",     "\U0001f4ac", "24. Communication"),
        ("resources/living-alone.html",      "\U0001f3e1", "Living Alone Safely"),
    ]),
    ("Resources", [
        ("answers/",                          "❓", "Quick Answers"),
        ("interactive/",                      "\U0001f3af", "Interactive Tools"),
        ("tips/index.html",                   "\U0001f4a1", "Tips &amp; Updates"),
        ("resources.html",                    "\U0001f4da", "Resources"),
        ("recommended-tools.html",            "⭐", "Recommended Tools"),
        ("print-centre.html",                 "\U0001f5a8️", "Print Centre"),
        ("family.html",                       "\U0001f49a", "DCC Family"),
        ("resources/support-directory.html",  "\U0001f198", "Get Help"),
    ]),
]


def build_nav_html(prefix):
    lines = []
    for i, (group_name, links) in enumerate(NAV_GROUPS):
        open_attr = ' open' if i == 0 else ''
        lines.append('      <details class="snav-group"%s>' % open_attr)
        lines.append('        <summary class="snav-header">%s</summary>' % group_name)
        for href, icon, label in links:
            lines.append(
                '        <a href="%s%s">'
                '<span class="nav-icon">%s</span>'
                '<span class="nav-label">%s</span>'
                '</a>' % (prefix, href, icon, label)
            )
        lines.append('      </details>')
    return '\n'.join(lines) + '\n'


def detect_prefix(aside_content):
    """Detect ../ prefix from the existing nav's index.html link."""
    m = re.search(r'href="((?:\.\./)*)index\.html"', aside_content)
    return m.group(1) if m else ''


def should_skip(rel_path):
    parts = rel_path.replace(os.sep, '/').split('/')
    return any(p in SKIP_DIRS for p in parts[:-1])


def patch_aside_content(aside_content):
    """Replace nav links inside aside content, preserving everything else."""
    prefix = detect_prefix(aside_content)
    new_nav = build_nav_html(prefix)

    # Replace from <nav> through content up to (not including) the a11y section
    # This is now scoped to aside content only, so it won't consume noscript blocks
    nav_pattern = r'(<nav>)\s*.*?(?=\s*<div class="sidebar-a11y-section">)'
    return re.sub(nav_pattern, r'\1\n' + new_nav, aside_content, flags=re.DOTALL)


def patch_file(filepath):
    rel = os.path.relpath(filepath, DCC_DIR)
    if should_skip(rel):
        return 'skip'
    try:
        with open(filepath, encoding='utf-8') as fh:
            content = fh.read()
    except Exception:
        return 'error'

    if 'sidebar-a11y-section' not in content:
        return 'no-anchor'

    # Match the entire aside block, replace nav within it
    aside_pattern = r'(<aside[^>]*class="sidebar"[^>]*>)(.*?)(</aside>)'

    def replace_aside(m):
        new_inner = patch_aside_content(m.group(2))
        return m.group(1) + new_inner + m.group(3)

    new_content = re.sub(aside_pattern, replace_aside, content, flags=re.DOTALL)

    if new_content == content:
        return 'unchanged'

    with open(filepath, 'w', encoding='utf-8') as fh:
        fh.write(new_content)
    return 'updated'


if __name__ == '__main__':
    os.chdir(DCC_DIR)
    results = {'updated': [], 'skip': [], 'no-anchor': [], 'unchanged': [], 'error': []}

    for f in sorted(glob.glob('**/*.html', recursive=True)):
        r = patch_file(os.path.join(DCC_DIR, f))
        results[r].append(f)

    # Also patch the module template (not an .html file)
    tpl = os.path.join(DCC_DIR, 'build', 'templates', 'module.html.tpl')
    if os.path.exists(tpl):
        r = patch_file(tpl)
        results[r].append('build/templates/module.html.tpl')

    print('Updated  : %d' % len(results['updated']))
    print('Skipped  : %d' % len(results['skip']))
    print('No anchor: %d' % len(results['no-anchor']))
    print('Unchanged: %d' % len(results['unchanged']))
    if results['error']:
        print('Errors   : %s' % results['error'])
    if '--verbose' in sys.argv or '-v' in sys.argv:
        for f in results['updated']:
            print('  +', f)
