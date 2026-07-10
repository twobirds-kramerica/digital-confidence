"""Generate the dcc-v2 index lesson-group card HTML from the module-v2 JSONs.

Reads every build/content/modules-v2/*.json, groups by breadcrumb anchor, and
emits four <section class="lesson-group"> blocks (matching index.html's existing
markup) with cards linking to modules/<slug>.html. Prints to stdout.
"""
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
CONTENT = HERE / "content" / "modules-v2"

GROUPS = [
    ("protect-money", "Protect your money",
     "Keep more of what is yours: spot the scams, stop the silent charges, and stay in control of your own accounts."),
    ("everyday-confidence", "Everyday confidence",
     "The skills that make the whole device feel calmer: getting back to safety, knowing what is real, and staying in charge."),
    ("staying-connected", "Staying connected",
     "See the people you love and share your life: video calls, photos, social media, and the apps that keep you in touch."),
    ("getting-things-done", "Getting things done",
     "The practical side of daily life online: shopping, appointments, travel, and understanding your bills and plans."),
]


def mod_number(slug):
    m = re.match(r"module-(\d+)(?:-(\d+))?", slug)
    if not m:
        return (999, 0)
    return (int(m.group(1)), int(m.group(2)) if m.group(2) else 0)


def minutes(lesson_time):
    m = re.search(r"(\d+)", lesson_time or "")
    return f"About {m.group(1)} minutes" if m else "At your own pace"


def main():
    mods = []
    for f in sorted(CONTENT.glob("*.json")):
        d = json.loads(f.read_text(encoding="utf-8"))
        anchor = d.get("breadcrumb_group_anchor", "")
        gid = anchor.split("#")[-1] if "#" in anchor else "everyday-confidence"
        mods.append({
            "slug": d.get("slug", f.stem),
            "title": d.get("title", ""),
            "icon": d.get("category_icon", "•"),
            "lead": d.get("lead", d.get("description", "")),
            "time": minutes(d.get("lesson_time", "")),
            "group": gid,
            "num": mod_number(d.get("slug", f.stem)),
        })

    out = []
    for gid, label, lead in GROUPS:
        cards = sorted([m for m in mods if m["group"] == gid], key=lambda m: m["num"])
        if not cards:
            continue
        out.append(f'    <section class="lesson-group" aria-labelledby="{gid}">')
        out.append(f'      <h2 id="{gid}">{label}</h2>')
        out.append(f'      <p class="group-lead">{lead}</p>')
        out.append('      <ul class="card-grid">')
        for c in cards:
            out.append('        <li class="topic-card">')
            out.append(f'          <span class="card-icon" aria-hidden="true">{c["icon"]}</span>')
            out.append(f'          <h3><a href="modules/{c["slug"]}.html">{c["title"]}</a></h3>')
            out.append(f'          <p>{c["lead"]}</p>')
            out.append(f'          <span class="ttc"><span aria-hidden="true">⏱</span> {c["time"]}</span>')
            out.append('        </li>')
        out.append('      </ul>')
        out.append('    </section>')
        out.append('')
    print("\n".join(out))


if __name__ == "__main__":
    main()
