"""S-DCC-CONTENT-MIGRATION — extract module HTML to JSON.

Usage (from digital-confidence/ repo root):
    python build/migrate.py              # migrate all modules
    python build/migrate.py module-1     # specific slug (no .html)
    python build/migrate.py --dry-run    # list slugs only

Reads:  module-*.html (repo root)
        data/module-quizzes.json
        data/module-meta.json
Writes: build/content/modules/{slug}.json

Stdlib only — no third-party packages.
"""
from __future__ import annotations

import html as _html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MODULES_OUT = ROOT / "build" / "content" / "modules"
QUIZZES_FILE = ROOT / "data" / "module-quizzes.json"
META_FILE = ROOT / "data" / "module-meta.json"

SKIP_SLUGS = {"module-template", "module-1-wizard"}


# ---------------------------------------------------------------------------
# DOM tree (html.parser-based)
# ---------------------------------------------------------------------------

class Node:
    VOID = frozenset({
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr",
    })

    def __init__(self, tag: str, attrs: list):
        self.tag = tag.lower()
        self.attrs: dict[str, str | None] = {k.lower(): v for k, v in attrs}
        self.children: list[Node | str] = []

    def get(self, attr: str, default: str = "") -> str:
        v = self.attrs.get(attr)
        return v if v is not None else default

    def classes(self) -> set[str]:
        return set(self.get("class").split())

    def has_class(self, *names: str) -> bool:
        cs = self.classes()
        return any(n in cs for n in names)

    def inner_html(self) -> str:
        parts = []
        for ch in self.children:
            if isinstance(ch, str):
                parts.append(ch)
            else:
                parts.append(ch.outer_html())
        return "".join(parts)

    def outer_html(self) -> str:
        attr_parts = []
        for k, v in self.attrs.items():
            if v is None:
                attr_parts.append(k)
            else:
                attr_parts.append(f'{k}="{_html.escape(v, quote=True)}"')
        attr_str = (" " + " ".join(attr_parts)) if attr_parts else ""
        if self.tag in self.VOID:
            return f"<{self.tag}{attr_str}>"
        return f"<{self.tag}{attr_str}>{self.inner_html()}</{self.tag}>"

    def text_content(self) -> str:
        parts = []
        for ch in self.children:
            if isinstance(ch, str):
                parts.append(_html.unescape(ch))
            else:
                parts.append(ch.text_content())
        return "".join(parts)

    def find(self, tag: str | None = None, **kw) -> "Node | None":
        for ch in self.children:
            if isinstance(ch, str):
                continue
            match = (tag is None or ch.tag == tag)
            if match:
                for k, v in kw.items():
                    attr_name = k.replace("_", "-")
                    if ch.get(attr_name) != v:
                        match = False
                        break
            if match:
                return ch
            found = ch.find(tag, **kw)
            if found:
                return found
        return None

    def find_all(self, tag: str | None = None, cls: str | None = None) -> list["Node"]:
        results = []
        for ch in self.children:
            if isinstance(ch, str):
                continue
            match = (tag is None or ch.tag == tag)
            if match and cls is not None and not ch.has_class(cls):
                match = False
            if match:
                results.append(ch)
            results.extend(ch.find_all(tag, cls))
        return results


class DOMParser(HTMLParser):
    VOID = Node.VOID

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self._root = Node("document", [])
        self._stack: list[Node] = [self._root]

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        node = Node(tag, attrs)
        self._stack[-1].children.append(node)
        if tag not in self.VOID:
            self._stack.append(node)

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in self.VOID:
            return
        for i in range(len(self._stack) - 1, 0, -1):
            if self._stack[i].tag == tag:
                self._stack = self._stack[:i]
                return

    def handle_data(self, data):
        self._stack[-1].children.append(data)

    def handle_entityref(self, name):
        self._stack[-1].children.append(f"&{name};")

    def handle_charref(self, name):
        self._stack[-1].children.append(f"&#{name};")

    def parse(self, text: str) -> Node:
        self.feed(text)
        return self._root


def parse_file(path: Path) -> Node:
    p = DOMParser()
    return p.parse(path.read_text(encoding="utf-8"))


# ---------------------------------------------------------------------------
# Section classification
# ---------------------------------------------------------------------------

SKIP_CLASSES = frozenset({
    "wizard-cta-banner", "story-block", "confidence-check-box",
    "module-quiz", "module-nav", "accessibility-bar", "top-bar",
    "sidebar-overlay", "sidebar", "skip-link",
})
SKIP_TAGS = frozenset({"script", "noscript", "style", "nav", "aside"})


def should_skip(node: Node) -> bool:
    if node.tag in SKIP_TAGS:
        return True
    if node.tag == "h1":
        return True
    if node.tag == "img" and node.has_class("module-hero-image"):
        return True
    if node.classes() & SKIP_CLASSES:
        return True
    return False


def is_whitespace(ch) -> bool:
    return isinstance(ch, str) and not ch.strip()


def _extract_first_p_content(node: Node) -> str:
    for ch in node.children:
        if isinstance(ch, Node) and ch.tag == "p":
            return ch.inner_html().strip()
    return node.inner_html().strip()


def extract_sections(main: Node) -> tuple[str, list[dict]]:
    """Return (intro_html, sections_list).

    Intro is the first <p> in main if it contains 'What you will learn'
    or is the first paragraph before any h2. All other direct children
    become section dicts.
    """
    intro = ""
    sections: list[dict] = []
    pending_devices: list[dict] = []
    intro_captured = False

    def flush_devices():
        if pending_devices:
            sections.append({"type": "device_variant", "variants": list(pending_devices)})
            pending_devices.clear()

    for child in main.children:
        if is_whitespace(child):
            continue
        if isinstance(child, str):
            text = child.strip()
            if text:
                flush_devices()
                sections.append({"type": "paragraph", "content": _html.escape(text)})
            continue

        if should_skip(child):
            flush_devices()
            continue

        # h2/h3 → heading section
        if child.tag in ("h2", "h3"):
            flush_devices()
            text = child.text_content().strip()
            if text:
                # Strip freshness id attributes from heading — just use text
                sections.append({
                    "type": "heading",
                    "level": int(child.tag[1]),
                    "heading": text,
                })
            continue

        # First <p> before any section heading → intro
        if child.tag == "p" and not intro_captured and not sections:
            text = child.text_content().strip()
            if "what you will learn" in text.lower() or not sections:
                raw_intro = child.inner_html().strip()
                # Strip leading <strong>What you will learn:</strong> label
                # (template already adds this prefix)
                raw_intro = re.sub(
                    r'^\s*<strong[^>]*>.*?</strong>\s*:?\s*',
                    '', raw_intro, flags=re.IGNORECASE | re.DOTALL,
                )
                intro = raw_intro.strip()
                intro_captured = True
                continue

        # Regular <p>
        if child.tag == "p":
            flush_devices()
            content = child.inner_html().strip()
            if content:
                sections.append({"type": "paragraph", "content": content})
            continue

        # device-content → group into device_variant
        if child.tag == "div" and child.has_class("device-content"):
            raw_devices = child.get("data-devices")
            devices = [d.strip() for d in raw_devices.split(",") if d.strip()]
            content = child.inner_html().strip()
            pending_devices.append({"devices": devices, "content": content})
            continue

        # tip-box / tip-block
        if child.tag == "div" and child.has_class("tip-box", "tip-block"):
            flush_devices()
            content = _extract_first_p_content(child)
            sections.append({"type": "tip", "content": content})
            continue

        # warning-box / warning-block
        if child.tag == "div" and child.has_class("warning-box", "warning-block"):
            flush_devices()
            content = _extract_first_p_content(child)
            sections.append({"type": "warning", "content": content})
            continue

        # callout-box
        if child.tag == "div" and child.has_class("callout-box"):
            flush_devices()
            sections.append({"type": "callout", "content": child.inner_html().strip()})
            continue

        # content-list ul
        if child.tag == "ul" and child.has_class("content-list"):
            flush_devices()
            items = []
            for li in child.find_all("li"):
                items.append({"text": li.inner_html().strip()})
            sections.append({"type": "list", "items": items})
            continue

        # Everything else → raw_html
        flush_devices()
        raw = child.outer_html()
        if raw.strip():
            sections.append({"type": "raw_html", "content": raw})

    flush_devices()
    return intro, sections


# ---------------------------------------------------------------------------
# Story and confidence-check extraction
# ---------------------------------------------------------------------------

def extract_story(main: Node) -> dict | None:
    story_node = main.find("div", **{"class": "story-block"})
    if story_node is None:
        # Try find_all approach
        results = main.find_all("div", cls="story-block")
        if not results:
            return None
        story_node = results[0]

    label_node = story_node.find("span", **{"class": "story-label"})
    label = label_node.text_content().strip() if label_node else ""

    paras = []
    for ch in story_node.children:
        if isinstance(ch, Node) and ch.tag == "p":
            paras.append(ch.text_content().strip())

    if not paras and not label:
        return None
    return {"label": label, "paragraphs": paras}


def extract_confidence_check(main: Node) -> str:
    results = main.find_all("div", cls="confidence-check-box")
    if not results:
        return ""
    node = results[0]
    # Get all paragraph text
    paras = [ch.text_content().strip() for ch in node.children
             if isinstance(ch, Node) and ch.tag == "p"]
    if paras:
        return " ".join(paras)
    return node.text_content().strip()


def extract_hero_image(main: Node) -> dict:
    img = main.find("img", **{"class": "module-hero-image"})
    if img is None:
        img_nodes = main.find_all("img")
        for n in img_nodes:
            if n.has_class("module-hero-image"):
                img = n
                break
    if img is None:
        return {}
    return {
        "url": img.get("src"),
        "alt": img.get("alt"),
        "width": int(img.get("width", 1200)),
        "height": int(img.get("height", 400)),
    }


# ---------------------------------------------------------------------------
# Slug / number / metadata helpers
# ---------------------------------------------------------------------------

def slug_from_filename(path: Path) -> str:
    return path.stem  # e.g. "module-5" from "module-5.html"


def short_title(meta_title: str) -> str:
    """Strip 'Module N: ' prefix from full title."""
    return re.sub(r"^Module\s+[\d.]+\s*:\s*", "", meta_title).strip()


def module_number_from_slug(slug: str, meta_title: str) -> int | float | str:
    """Extract module number. Prefer meta title; fall back to slug."""
    if meta_title:
        m = re.match(r"Module\s+([0-9]+(?:\.[0-9]+)?)\s*:", meta_title)
        if m:
            raw = m.group(1)
            return float(raw) if "." in raw else int(raw)
    # Fall back to slug
    m = re.match(r"module-(\d+)-(\d+)$", slug)
    if m:
        return float(f"{m.group(1)}.{m.group(2)}")
    m = re.match(r"module-(\d+)", slug)
    if m:
        return int(m.group(1))
    return slug  # non-numeric module (ai-literacy, visual-ai, etc.)


def quiz_key_from_slug(slug: str) -> str | None:
    """Map slug → module-quizzes.json key."""
    m = re.match(r"module-(\d+)-(\d+)$", slug)
    if m:
        return f"{m.group(1)}-{m.group(2)}"  # e.g. "2-5"
    m = re.match(r"module-(\d+)", slug)
    if m:
        return m.group(1)  # e.g. "16"
    return None


def load_quiz(quizzes: dict, slug: str) -> list[dict]:
    key = quiz_key_from_slug(slug)
    if key is None:
        return []
    raw_list = quizzes.get(key) or quizzes.get(key.replace("-", "."))
    if not raw_list:
        return []
    result = []
    for q in raw_list:
        result.append({
            "question": q.get("q", ""),
            "options": q.get("opts", []),
            "correct": q.get("ans", 0),
            "explanation": q.get("explain", ""),
        })
    return result


def build_nav(slug: str, all_meta: dict) -> tuple[dict | None, dict | None]:
    """Build prev_module / next_module nav dicts."""
    meta_key = slug  # e.g. "module-5"
    meta = all_meta.get(meta_key, {})

    next_href = meta.get("nextModule", "")
    next_title = meta.get("nextTitle", "")
    next_mod = None
    if next_href and next_title:
        next_slug = next_href.replace(".html", "")
        next_mod = {"slug": next_href, "label": next_title}

    # Build reverse map for prev
    prev_mod = None
    for k, v in all_meta.items():
        if v.get("nextModule", "").replace(".html", "") == slug:
            prev_slug_href = k + ".html"
            prev_title = v.get("title", "")
            prev_mod = {"slug": prev_slug_href, "label": prev_title}
            break

    return prev_mod, next_mod


# ---------------------------------------------------------------------------
# Core migration
# ---------------------------------------------------------------------------

def migrate_module(path: Path, all_meta: dict, quizzes: dict) -> dict:
    slug = slug_from_filename(path)
    meta_key = slug
    meta = all_meta.get(meta_key, {})

    root = parse_file(path)
    main = root.find("main", id="main")
    if main is None:
        # Fallback: try any main element
        main = root.find("main")
    if main is None:
        raise ValueError(f"No <main id='main'> found in {path.name}")

    # Extract structured fields
    hero = extract_hero_image(main)
    story = extract_story(main)
    confidence_check = extract_confidence_check(main)
    intro_html, sections = extract_sections(main)

    # Module number and title
    full_title = meta.get("title", "")
    title = short_title(full_title) if full_title else slug.replace("-", " ").title()
    number = module_number_from_slug(slug, full_title)

    # Quiz
    quiz = load_quiz(quizzes, slug)

    # Navigation
    prev_mod, next_mod = build_nav(slug, all_meta)

    # Description / keywords from HTML <meta> tags
    html_node = root.find("html")
    head = root.find("head") or (html_node.find("head") if html_node else None)
    description = ""
    keywords = ""
    date_published = ""
    if head:
        for node in head.find_all("meta"):
            name = node.get("name").lower()
            prop = node.get("property").lower()
            content = node.get("content", "")
            if name == "description":
                description = content
            elif name == "keywords":
                keywords = content

        # Date from ld+json Article block
        for script in head.find_all("script"):
            if script.get("type") == "application/ld+json":
                raw = script.text_content()
                try:
                    obj = json.loads(raw)
                    if isinstance(obj, dict) and obj.get("@type") == "Article":
                        date_published = obj.get("datePublished", "")
                except Exception:
                    pass

    module = {
        "id": slug,
        "number": number,
        "slug": slug,
        "title": title,
        "description": description or meta.get("summary", ""),
        "keywords": keywords,
        "date_published": date_published or meta.get("updated", ""),
        "hero_image": hero,
        "intro": intro_html,
        "story": story,
        "confidence_check": confidence_check,
        "sections": sections,
        "quiz": quiz,
        "prev_module": prev_mod,
        "next_module": next_mod,
        "accessibility": {
            "lang": "en-CA",
            "wcag_level": "AA",
        },
    }

    # Enrich with meta fields if present
    if meta:
        module["category"] = meta.get("category", "")
        module["category_icon"] = meta.get("categoryIcon", "")
        module["difficulty"] = meta.get("difficulty", "")
        module["time"] = meta.get("time", "")
        module["what_you_learn"] = meta.get("whatYouLearn", [])
        module["summary"] = meta.get("summary", "")

    return module


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    requested = [a for a in args if not a.startswith("--")]

    # Load data
    quizzes = {}
    if QUIZZES_FILE.exists():
        quizzes = json.loads(QUIZZES_FILE.read_text(encoding="utf-8")).get("modules", {})

    all_meta = {}
    if META_FILE.exists():
        all_meta = json.loads(META_FILE.read_text(encoding="utf-8")).get("modules", {})

    # Discover HTML files
    all_html = sorted(ROOT.glob("module-*.html"))
    if requested:
        all_html = [ROOT / f"{slug}.html" for slug in requested]

    # Filter skips
    to_process = [p for p in all_html if p.stem not in SKIP_SLUGS]

    if dry_run:
        print(f"Would migrate {len(to_process)} module(s):")
        for p in to_process:
            print(f"  {p.name}")
        return 0

    MODULES_OUT.mkdir(parents=True, exist_ok=True)

    ok = 0
    errors = 0
    for path in to_process:
        slug = path.stem
        out_path = MODULES_OUT / f"{slug}.json"
        try:
            module = migrate_module(path, all_meta, quizzes)
            out_path.write_text(
                json.dumps(module, indent=2, ensure_ascii=False),
                encoding="utf-8",
            )
            n_sections = len(module.get("sections", []))
            n_quiz = len(module.get("quiz", []))
            print(f"  [OK] {slug}.json  ({n_sections} sections, {n_quiz} quiz)")
            ok += 1
        except Exception as exc:
            print(f"  [ERR] {slug}: {exc}", file=sys.stderr)
            import traceback
            traceback.print_exc(file=sys.stderr)
            errors += 1

    print(f"\n{ok} migrated -> {MODULES_OUT}")
    if errors:
        print(f"{errors} error(s) — check output above", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
