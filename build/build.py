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

def escape(text: str) -> str:
    return html.escape(str(text), quote=False)


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

    template_file = TEMPLATES_DIR / "module.html.tpl"
    if not template_file.exists():
        print(f"ERROR: Module template not found at {template_file}", file=sys.stderr)
        return 1
    template = template_file.read_text(encoding="utf-8")

    modules_source = SAMPLE_DIR if args.sample else MODULES_DIR
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
