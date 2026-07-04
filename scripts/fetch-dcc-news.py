"""Fetch DCC news feed from CBC Technology RSS and write data/news-feed.json.

Requires: requests (pip install requests — same dep as notion-client.py).
Usage: python scripts/fetch-dcc-news.py
"""
import json
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: install requests: pip install requests", file=sys.stderr)
    sys.exit(2)

RSS_URL = "https://news.google.com/rss/search?q=scam+OR+fraud+OR+phishing+OR+%22online+safety%22+OR+%22identity+theft%22+OR+%22romance+scam%22+when:14d&hl=en-CA&gl=CA&ceid=CA:en"
OUT_PATH = Path(__file__).resolve().parent.parent / "data" / "news-feed.json"
MAX_ITEMS = 5
TIMEOUT   = 15

KEYWORDS = [
    "artificial intelligence", " ai ", "scam", "fraud", "phish",
    "cybersecurity", "privacy", "digital safety", "online safety",
    "social media", "misinformation", "deepfake", "hack", "data breach",
    "password", "seniors", "children", "internet safety", "cyber",
]


def parse_rss(xml_bytes: bytes) -> list[dict]:
    root = ET.fromstring(xml_bytes)
    ns = {"atom": "http://www.w3.org/2005/Atom"}
    items = []
    for item in root.findall(".//item"):
        title = (item.findtext("title") or "").strip()
        link  = (item.findtext("link")  or "").strip()
        date  = (item.findtext("pubDate") or "").strip()
        desc  = (item.findtext("description") or "").strip()
        if title and link:
            items.append({"title": title, "link": link, "pubDate": date, "description": desc})
    return items


def matches_keyword(item: dict) -> bool:
    text = (item["title"] + " " + item["description"]).lower()
    return any(kw in text for kw in KEYWORDS)


def main() -> int:
    print(f"Fetching: {RSS_URL}")
    try:
        resp = requests.get(
            RSS_URL,
            timeout=TIMEOUT,
            headers={"User-Agent": "Mozilla/5.0 (compatible; DCC-news-fetch/1.0)"},
        )
        resp.raise_for_status()
        xml_bytes = resp.content
    except Exception as e:
        print(f"WARN: fetch error: {e}", file=sys.stderr)
        if OUT_PATH.exists():
            try:
                old = json.loads(OUT_PATH.read_text(encoding="utf-8"))
                ts = datetime.strptime(old.get("fetched_at", ""), "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
                age_days = (datetime.now(timezone.utc) - ts).days
            except Exception:
                age_days = 999
            if age_days > 10:
                print(f"FAIL: fetch failed AND feed is {age_days} days stale — surfacing this instead of silently succeeding (was the root of the May 16 freeze).", file=sys.stderr)
                return 1
            print(f"Keeping existing news-feed.json ({age_days}d old, graceful degradation).")
            return 0
        print("FAIL: no existing news-feed.json to fall back to.", file=sys.stderr)
        return 1

    try:
        all_items = parse_rss(xml_bytes)
    except ET.ParseError as e:
        print(f"FAIL: XML parse error: {e}", file=sys.stderr)
        return 1

    print(f"Parsed {len(all_items)} items from RSS.")
    matched = [i for i in all_items if matches_keyword(i)]
    display = (matched if matched else all_items)[:MAX_ITEMS]
    print(f"Filtered to {len(display)} items for news-feed.json.")

    payload = {
        "fetched_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "Google News - digital safety (Canada)",
        "source_url": RSS_URL,
        "items": [
            {
                "title":   i["title"],
                "link":    i["link"],
                "pubDate": i["pubDate"],
            }
            for i in display
        ],
    }

    OUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Written: {OUT_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
