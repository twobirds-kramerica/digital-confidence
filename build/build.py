"""DCC Site Generator — build.py

Usage:
    python build/build.py --brand=warm-hearth [--output=dist/warm-hearth] [--sample]

Options:
    --brand=SLUG     Required. Must match a directory in build/brands/SLUG/brand.json
    --output=PATH    Output directory. Default: dist/{brand}
    --sample         Use build/content/sample/ instead of build/content/modules/

Generates one HTML page per module JSON file. Copies CSS, JS, and asset
references remain relative so the output is deployable as-is on any host.

Exit codes:
    0  — success
    1  — fatal error (bad brand, missing template, etc.)
"""
from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO_ROOT = HERE.parent
TEMPLATES_DIR = HERE / "templates"
BRANDS_DIR = HERE / "brands"
CONTENT_DIR = HERE / "content"
MODULES_DIR = CONTENT_DIR / "modules"
SAMPLE_DIR = CONTENT_DIR / "sample"


# ---------------------------------------------------------------------------
# Template engine — {{VAR}} substitution
# ---------------------------------------------------------------------------

def render(template: str, variables: dict[str, str]) -> str:
    """Replace {{KEY}} markers. Unknown keys are left as-is (safe substitute)."""
    def replacer(match: re.Match) -> str:
        key = match.group(1).strip()
        return variables.get(key, match.group(0))
    return re.sub(r"\{\{([^}]+)\}\}", replacer, template)


# ---------------------------------------------------------------------------
# HTML builders for complex blocks
# ---------------------------------------------------------------------------

def escape(text: str, quote: bool = False) -> str:
    return html.escape(str(text), quote=quote)


def build_nav_links_html(nav_links: list[dict]) -> str:
    lines = []
    for link in nav_links:
        href = escape(link.get("href", "#"))
        icon = link.get("icon", "")
        label = escape(link.get("label", ""))
        lines.append(
            f'      <a href="{href}">'
            f'<span class="nav-icon">{icon}</span>'
            f'<span class="nav-label">{label}</span>'
            f'</a>'
        )
    return "\n".join(lines)


def build_story_block_html(story: dict | None) -> str:
    if not story:
        return ""
    label = escape(story.get("label", ""))
    paras = "\n".join(
        f"        <p>{p}</p>" for p in story.get("paragraphs", [])
    )
    return (
        f'      <div class="story-block">\n'
        f'        <span class="story-label">{label}</span>\n'
        f'{paras}\n'
        f'      </div>'
    )


def build_section_html(section: dict) -> str:
    stype = section.get("type", "paragraph")

    if stype == "heading":
        level = section.get("level", 2)
        heading = section.get("heading", "")
        return f"      <h{level}>{heading}</h{level}>"

    if stype == "paragraph":
        content = section.get("content", "")
        return f"      <p>{content}</p>"

    if stype == "tip":
        content = section.get("content", "")
        return (
            f'      <div class="tip-box" role="note">\n'
            f'        <span class="tip-icon" aria-hidden="true">💡</span>\n'
            f'        <p>{content}</p>\n'
            f'      </div>'
        )

    if stype == "warning":
        content = section.get("content", "")
        return (
            f'      <div class="warning-box" role="note">\n'
            f'        <span class="warning-icon" aria-hidden="true">⚠️</span>\n'
            f'        <p>{content}</p>\n'
            f'      </div>'
        )

    if stype == "callout":
        content = section.get("content", "")
        return (
            f'      <div class="callout-box">\n'
            f'        <p>{content}</p>\n'
            f'      </div>'
        )

    if stype == "list":
        heading = section.get("heading", "")
        items = section.get("items", [])
        heading_html = f"      <p><strong>{heading}</strong></p>\n" if heading else ""
        li_lines = []
        for item in items:
            term = item.get("term", "")
            definition = item.get("definition", "")
            text = item.get("text", "")
            if term and definition:
                li_lines.append(f'          <li><strong>{escape(term)}:</strong> {definition}</li>')
            elif text:
                li_lines.append(f'          <li>{text}</li>')
        items_html = "\n".join(li_lines)
        return (
            f'{heading_html}'
            f'      <ul class="content-list">\n'
            f'{items_html}\n'
            f'      </ul>'
        )

    if stype == "device_variant":
        variants = section.get("variants", [])
        parts = []
        for variant in variants:
            devices = " ".join(variant.get("devices", []))
            content = variant.get("content", "")
            parts.append(
                f'      <div class="device-content" data-devices="{escape(devices)}">\n'
                f'        {content}\n'
                f'      </div>'
            )
        return "\n".join(parts)

    if stype == "raw_html":
        return section.get("content", "")

    # Unknown type — render as paragraph
    return f"      <!-- unknown section type: {escape(stype)} -->"


def build_sections_html(sections: list[dict]) -> str:
    return "\n\n".join(build_section_html(s) for s in sections)


def build_quiz_html(quiz: list[dict]) -> str:
    if not quiz:
        return ""
    parts = [
        '      <section class="module-quiz" aria-label="Module quiz">',
        '        <h2>Check Your Understanding</h2>',
        '        <p>Test what you have learned. There are no wrong answers — only chances to learn more.</p>',
        '        <div class="quiz-questions">',
    ]
    for i, q in enumerate(quiz):
        question = escape(q.get("question", ""))
        options = q.get("options", [])
        correct = q.get("correct", 0)
        explanation = q.get("explanation", "")
        qid = f"q{i + 1}"
        parts.append(f'          <div class="quiz-item" data-question="{qid}" data-correct="{correct}">')
        parts.append(f'            <p class="quiz-question">{question}</p>')
        parts.append(f'            <div class="quiz-options" role="radiogroup" aria-label="Answer options">')
        for j, opt in enumerate(options):
            opt_escaped = escape(opt)
            opt_id = f"{qid}-opt{j}"
            parts.append(
                f'              <label class="quiz-option" for="{opt_id}">'
                f'<input type="radio" name="{qid}" id="{opt_id}" value="{j}">'
                f' {opt_escaped}</label>'
            )
        parts.append(f'            </div>')
        if explanation:
            parts.append(
                f'            <div class="quiz-feedback" role="alert" aria-live="polite" hidden>'
                f'{escape(explanation)}</div>'
            )
        parts.append(f'          </div>')
    parts += [
        '        </div>',
        '        <button class="quiz-submit-btn" type="button">Check My Answers</button>',
        '      </section>',
    ]
    return "\n".join(parts)


def build_module_nav_html(prev_mod: dict | None, next_mod: dict | None) -> str:
    prev_html = ""
    next_html = ""
    if prev_mod:
        slug = escape(prev_mod.get("slug", "#"))
        label = escape(prev_mod.get("label", "Previous"))
        prev_html = f'<a class="module-nav-prev" href="{slug}">← {label}</a>'
    if next_mod:
        slug = escape(next_mod.get("slug", "#"))
        label = escape(next_mod.get("label", "Next"))
        next_html = f'<a class="module-nav-next" href="{slug}">{label} →</a>'
    if not prev_html and not next_html:
        return ""
    return (
        f'      <nav class="module-nav" aria-label="Module navigation">\n'
        f'        {prev_html}\n'
        f'        {next_html}\n'
        f'      </nav>'
    )


def build_schema_faq_json(quiz: list[dict]) -> str:
    if not quiz:
        return '{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": []}'
    entities = []
    for q in quiz:
        question = q.get("question", "")
        answer = q.get("explanation", q.get("options", [""])[q.get("correct", 0)])
        entities.append({
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {"@type": "Answer", "text": answer},
        })
    obj = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": entities}
    return json.dumps(obj, indent=2, ensure_ascii=False)


def build_analytics_block(brand: dict) -> str:
    ga_id = brand.get("ga_id", "")
    clarity_id = brand.get("clarity_id", "")
    if not ga_id:
        return ""
    return f"""  <!-- Google Analytics — consent-gated -->
  <link rel="preconnect" href="https://www.googletagmanager.com">
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    (function(){{
      var consent = null;
      try {{ consent = localStorage.getItem('analytics_consent'); }} catch(e) {{}}
      if (consent === 'true') {{
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id={ga_id}';
        document.head.appendChild(s);
        gtag('js', new Date());
        gtag('config', '{ga_id}');
      }} else if (consent === 'false') {{
        window['ga-disable-{ga_id}'] = true;
      }}
    }})();
  </script>"""


# ---------------------------------------------------------------------------
# v2 rendering - emits the Sprint V2-2 shell vocabulary (dcc-v2 CSS).
# Selected when brand.json carries "schema": "v2". The old renderers above are
# left untouched (ADR-0008: extend the generator, do not replace it).
# ---------------------------------------------------------------------------

V2_INDENT = "    "


def _p(text: str) -> str:
    return f"{V2_INDENT}<p>{text}</p>"


def v2_story(story: dict | None) -> str:
    if not story:
        return ""
    label = story.get("label", "")
    lines = [f"{V2_INDENT}<h2>{label}</h2>"]
    lines += [_p(p) for p in story.get("paragraphs", [])]
    return "\n".join(lines)


def v2_coach(coach: str | None) -> str:
    if not coach:
        return ""
    return (
        f'{V2_INDENT}<div class="coach-block">\n'
        f'{V2_INDENT}  <span class="coach-mark" aria-hidden="true">💬</span>\n'
        f'{V2_INDENT}  <div class="coach-body">\n'
        f'{V2_INDENT}    <span class="coach-label">From your coach</span>\n'
        f'{V2_INDENT}    <p>{coach}</p>\n'
        f'{V2_INDENT}  </div>\n'
        f'{V2_INDENT}</div>'
    )


def v2_labelled_block(css_class: str, label: str, text: str) -> str:
    label_html = f'{V2_INDENT}  <span class="block-label">{label}</span>\n' if label else ""
    return (
        f'{V2_INDENT}<div class="{css_class}">\n'
        f'{label_html}'
        f'{V2_INDENT}  <p>{text}</p>\n'
        f'{V2_INDENT}</div>'
    )


def v2_walkthrough(section: dict) -> str:
    title = section.get("title", "")
    title_html = f"{V2_INDENT}  <h4>{title}</h4>\n" if title else ""
    steps = []
    for i, step in enumerate(section.get("steps", []), start=1):
        steps.append(
            f'{V2_INDENT}  <div class="wt-step">\n'
            f'{V2_INDENT}    <span class="step-num" aria-hidden="true">{i}</span>\n'
            f'{V2_INDENT}    <span class="step-text"><p>{step}</p></span>\n'
            f'{V2_INDENT}  </div>'
        )
    return (
        f'{V2_INDENT}<div class="walkthrough">\n'
        f'{title_html}'
        + "\n".join(steps)
        + f'\n{V2_INDENT}</div>'
    )


def v2_scam_example(section: dict) -> str:
    label = section.get("label", "Example (this is NOT real)")
    return (
        f'{V2_INDENT}<div class="scam-example">\n'
        f'{V2_INDENT}  <span class="example-label">{label}</span>\n'
        f'{V2_INDENT}  <p>{section.get("text", "")}</p>\n'
        f'{V2_INDENT}</div>'
    )


def v2_three_second_rule(section: dict) -> str:
    heading = section.get("heading", "The 3-second rule")
    steps = section.get("steps") or [
        {"icon": "✋", "name": "Stop", "text": "Take your fingers off the screen."},
        {"icon": "🫁", "name": "Breathe", "text": "One slow, deep breath."},
        {"icon": "🔍", "name": "Verify", "text": "Is this real, or is someone trying to scare me?"},
    ]
    li = []
    for s in steps:
        li.append(
            f'{V2_INDENT}    <li class="tsr-step">'
            f'<span class="tsr-icon" aria-hidden="true">{s.get("icon", "")}</span>'
            f'<span class="tsr-name">{s.get("name", "")}</span> {s.get("text", "")}</li>'
        )
    return (
        f'{V2_INDENT}<div class="three-second-rule">\n'
        f'{V2_INDENT}  <h3>{heading}</h3>\n'
        f'{V2_INDENT}  <ol class="tsr-steps">\n'
        + "\n".join(li)
        + f'\n{V2_INDENT}  </ol>\n'
        f'{V2_INDENT}</div>'
    )


def v2_the_move(section: dict) -> str:
    label = section.get("label", "The move is")
    return (
        f'{V2_INDENT}<div class="the-move">\n'
        f'{V2_INDENT}  <span class="move-label">{label}</span>\n'
        f'{V2_INDENT}  <p>{section.get("text", "")}</p>\n'
        f'{V2_INDENT}</div>'
    )


def v2_list(section: dict) -> str:
    items = "\n".join(f'{V2_INDENT}  <li>{it}</li>' for it in section.get("items", []))
    return f'{V2_INDENT}<ul>\n{items}\n{V2_INDENT}</ul>'


def v2_quiz(section: dict) -> str:
    heading = section.get("heading", "Quick check: test your knowledge")
    intro = section.get("intro", "Tap the answer you think is correct. There is no score kept and nothing to sign in to.")
    parts = [
        f"{V2_INDENT}<h2>{heading}</h2>",
        _p(intro),
        f'{V2_INDENT}<div class="lesson-quiz">',
    ]
    for q in section.get("questions", []):
        correct_idx = q.get("correct", 0)
        correct_letter = chr(97 + correct_idx)
        parts.append(f'{V2_INDENT}  <div class="quiz-q" data-correct="{correct_letter}">')
        parts.append(f'{V2_INDENT}    <h3>{q.get("q", "")}</h3>')
        parts.append(f'{V2_INDENT}    <div class="quiz-opts">')
        for j, opt in enumerate(q.get("options", [])):
            letter = chr(97 + j)
            parts.append(
                f'{V2_INDENT}      <button class="quiz-opt" type="button" data-answer="{letter}">{escape(opt)}</button>'
            )
        parts.append(f'{V2_INDENT}    </div>')
        right = q.get("right", "That is right.")
        wrong = q.get("wrong", "Not quite. Have another read above.")
        parts.append(
            f'{V2_INDENT}    <div class="quiz-fb"\n'
            f'{V2_INDENT}      data-right="{escape(right, True)}"\n'
            f'{V2_INDENT}      data-wrong="{escape(wrong, True)}"></div>'
        )
        parts.append(f'{V2_INDENT}  </div>')
    parts.append(f'{V2_INDENT}</div>')
    return "\n".join(parts)


def v2_checklist(section: dict) -> str:
    heading = section.get("heading", "Your progress")
    intro = section.get("intro", "Tick each item as you feel confident with it. This is saved on this device only, with no account needed.")
    list_id = section.get("id", "module")
    items = []
    for i, it in enumerate(section.get("items", []), start=1):
        cid = f"{list_id}-{i}"
        items.append(
            f'{V2_INDENT}  <li class="check-item">'
            f'<input type="checkbox" id="{cid}">'
            f'<label for="{cid}">{it}</label></li>'
        )
    return (
        f"{V2_INDENT}<h2>{heading}</h2>\n"
        f"{_p(intro)}\n"
        f'{V2_INDENT}<ul class="checklist" data-checklist="{list_id}">\n'
        + "\n".join(items)
        + f'\n{V2_INDENT}</ul>'
    )


def v2_section(section: dict) -> str:
    t = section.get("type", "paragraph")
    if t == "heading":
        level = section.get("level", 2)
        return f'{V2_INDENT}<h{level}>{section.get("text", "")}</h{level}>'
    if t == "paragraph":
        return _p(section.get("text", ""))
    if t == "tip":
        return v2_labelled_block("tip-block", section.get("label", ""), section.get("text", ""))
    if t == "warning":
        return v2_labelled_block("warning-block", section.get("label", ""), section.get("text", ""))
    if t == "helper":
        return v2_labelled_block("helper-note", section.get("label", ""), section.get("text", ""))
    if t == "walkthrough":
        return v2_walkthrough(section)
    if t == "scam_example":
        return v2_scam_example(section)
    if t == "three_second_rule":
        return v2_three_second_rule(section)
    if t == "the_move":
        return v2_the_move(section)
    if t == "list":
        return v2_list(section)
    if t == "quiz":
        return v2_quiz(section)
    if t == "checklist":
        return v2_checklist(section)
    return f'{V2_INDENT}<!-- unknown v2 section type: {escape(t)} -->'


def v2_success_state(text: str | None) -> str:
    if not text:
        return ""
    return (
        f'{V2_INDENT}<div class="success-state">\n'
        f'{V2_INDENT}  <p>{text}</p>\n'
        f'{V2_INDENT}</div>'
    )


def v2_related(related: dict | None) -> str:
    if not related:
        return ""
    heading = related.get("heading", "Where to next")
    cards = []
    for c in related.get("cards", []):
        href = escape(c.get("href", "#"))
        external = c.get("external", False)
        attrs = ' target="_blank" rel="noopener noreferrer"' if external else ""
        ext_note = ' <span class="ext-note">(opens the original site in a new tab)</span>' if external else ""
        cards.append(
            f'{V2_INDENT}    <a class="related-card" href="{href}"{attrs}>\n'
            f'{V2_INDENT}      <span class="related-num">{c.get("num", "")}{ext_note}</span>\n'
            f'{V2_INDENT}      <span class="related-name">{c.get("name", "")}</span>\n'
            f'{V2_INDENT}      <span class="related-desc">{c.get("desc", "")}</span>\n'
            f'{V2_INDENT}    </a>'
        )
    note = related.get("note", "")
    note_html = (
        f'\n{V2_INDENT}  <p class="scope-note" style="margin-top:var(--space-4)">{note}</p>'
        if note else ""
    )
    return (
        f'{V2_INDENT}<nav class="related-modules" aria-label="Continue learning">\n'
        f'{V2_INDENT}  <h2>{heading}</h2>\n'
        f'{V2_INDENT}  <div class="related-grid">\n'
        + "\n".join(cards)
        + f'\n{V2_INDENT}  </div>'
        + note_html
        + f'\n{V2_INDENT}</nav>'
    )


def v2_primary_nav(brand: dict, current_href: str) -> str:
    lines = []
    for link in brand.get("primary_nav", []):
        href = escape(link.get("href", "#"))
        current = ' aria-current="page"' if link.get("href") == current_href else ""
        lines.append(f'{V2_INDENT}<a href="{href}"{current}>{link.get("label", "")}</a>')
    return "\n".join(lines)


def v2_breadcrumb(module: dict) -> str:
    group_label = module.get("breadcrumb_group_label", "All lessons")
    group_anchor = module.get("breadcrumb_group_anchor", "../index.html")
    title = module.get("title", "")
    return (
        f'{V2_INDENT}<ol>\n'
        f'{V2_INDENT}  <li><a href="../index.html">All lessons</a></li>\n'
        f'{V2_INDENT}  <li><a href="{escape(group_anchor)}">{group_label}</a></li>\n'
        f'{V2_INDENT}  <li><span aria-current="page">{title}</span></li>\n'
        f'{V2_INDENT}</ol>'
    )


def render_module_v2(module: dict, brand: dict, template: str) -> str:
    body_parts = []
    story_html = v2_story(module.get("story"))
    if story_html:
        body_parts.append(story_html)
    coach_html = v2_coach(module.get("coach"))
    if coach_html:
        body_parts.append(coach_html)
    for section in module.get("sections", []):
        body_parts.append(v2_section(section))
    body_html = "\n\n".join(body_parts)

    base_url = brand.get("base_url", "").rstrip("/")
    variables = {
        "PAGE_TITLE":          escape(module.get("page_title", module.get("title", "")), True),
        "CANONICAL_URL":       f"{base_url}/modules/{module.get('slug', '')}.html",
        "META_DESCRIPTION":    escape(module.get("description", ""), True),
        "PRIMARY_NAV_HTML":    v2_primary_nav(brand, module.get("nav_current", "")),
        "BREADCRUMB_HTML":     v2_breadcrumb(module),
        "CATEGORY_ICON":       module.get("category_icon", ""),
        "CATEGORY":            module.get("category", ""),
        "MODULE_TITLE":        module.get("title", ""),
        "LESSON_TIME":         module.get("lesson_time", ""),
        "LEAD":                module.get("lead", ""),
        "BODY_HTML":           body_html,
        "SUCCESS_STATE_HTML":  v2_success_state(module.get("success_state")),
        "RELATED_HTML":        v2_related(module.get("related")),
    }
    return render(template, variables)


# ---------------------------------------------------------------------------
# Core rendering
# ---------------------------------------------------------------------------

def render_module(module: dict, brand: dict, template: str) -> str:
    hero = module.get("hero_image", {})
    prev_mod = module.get("prev_module")
    next_mod = module.get("next_module")

    variables = {
        "MODULE_NUMBER":      str(module.get("number", "")),
        "MODULE_TITLE":       module.get("title", ""),
        "MODULE_SLUG":        module.get("slug", ""),
        "MODULE_DESCRIPTION": module.get("description", ""),
        "MODULE_KEYWORDS":    module.get("keywords", ""),
        "MODULE_INTRO":       module.get("intro", ""),
        "DATE_PUBLISHED":     module.get("date_published", ""),
        "HERO_IMAGE_URL":     hero.get("url", ""),
        "HERO_IMAGE_ALT":     hero.get("alt", ""),
        "HERO_IMAGE_WIDTH":   str(hero.get("width", 1200)),
        "HERO_IMAGE_HEIGHT":  str(hero.get("height", 400)),
        "PRODUCT_NAME":       brand.get("product_name", ""),
        "BASE_URL":           brand.get("base_url", "").rstrip("/"),
        "TOKENS_CSS":         brand.get("tokens_css", "css/tokens.css"),
        "PRIMARY_COLOUR":     brand.get("primary_colour", "#2A7B6F"),
        "OG_IMAGE_DEFAULT":  brand.get("og_image_default", hero.get("url", "")),
        # Complex blocks
        "NAV_LINKS_HTML":     build_nav_links_html(brand.get("nav_links", [])),
        "STORY_BLOCK_HTML":   build_story_block_html(module.get("story")),
        "CONFIDENCE_CHECK":   module.get("confidence_check", ""),
        "SECTIONS_HTML":      build_sections_html(module.get("sections", [])),
        "QUIZ_HTML":          build_quiz_html(module.get("quiz", [])),
        "MODULE_NAV_HTML":    build_module_nav_html(prev_mod, next_mod),
        "SCHEMA_FAQ_JSON":    build_schema_faq_json(module.get("quiz", [])),
        "ANALYTICS_BLOCK":    build_analytics_block(brand),
    }
    return render(template, variables)


# ---------------------------------------------------------------------------
# File output
# ---------------------------------------------------------------------------

def write_output(output_path: Path, filename: str, content: str) -> None:
    output_path.mkdir(parents=True, exist_ok=True)
    out_file = output_path / filename
    out_file.write_text(content, encoding="utf-8")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description="DCC Site Generator")
    parser.add_argument("--brand", required=True, help="Brand slug (e.g. warm-hearth)")
    parser.add_argument("--output", default=None, help="Output directory (default: dist/{brand})")
    parser.add_argument("--sample", action="store_true", help="Use sample modules instead of full content")
    args = parser.parse_args()

    brand_dir = BRANDS_DIR / args.brand
    brand_file = brand_dir / "brand.json"
    if not brand_file.exists():
        print(f"ERROR: No brand.json found at {brand_file}", file=sys.stderr)
        return 1

    brand = json.loads(brand_file.read_text(encoding="utf-8"))
    print(f"Brand: {brand.get('product_name')} ({args.brand})")

    schema = brand.get("schema", "v1")
    template_name = brand.get("template", "module.html.tpl")
    template_file = TEMPLATES_DIR / template_name
    if not template_file.exists():
        print(f"ERROR: Module template not found at {template_file}", file=sys.stderr)
        return 1
    template = template_file.read_text(encoding="utf-8")

    content_dir_name = brand.get("content_dir")
    if args.sample:
        modules_source = SAMPLE_DIR
    elif content_dir_name:
        modules_source = CONTENT_DIR / content_dir_name
    else:
        modules_source = MODULES_DIR
    module_files = sorted(modules_source.glob("*.json"))
    if not module_files:
        print(f"WARNING: No module JSON files found in {modules_source}")
        print("  Use --sample to test with sample data, or run S-DCC-CONTENT-MIGRATION to populate modules/")
        return 1

    output_path = Path(args.output) if args.output else REPO_ROOT / "dist" / args.brand
    print(f"Output: {output_path}")
    print(f"Modules found: {len(module_files)}")

    rendered = 0
    errors = 0
    for mf in module_files:
        try:
            module = json.loads(mf.read_text(encoding="utf-8"))
            slug = module.get("slug", mf.stem)
            if schema == "v2":
                content = render_module_v2(module, brand, template)
            else:
                content = render_module(module, brand, template)
            write_output(output_path, f"{slug}.html", content)
            print(f"  [OK] {slug}.html")
            rendered += 1
        except Exception as e:
            print(f"  [ERR] {mf.name}: {e}", file=sys.stderr)
            errors += 1

    print(f"\n{rendered} module(s) rendered -> {output_path}")
    if errors:
        print(f"{errors} error(s) -- check output above", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
