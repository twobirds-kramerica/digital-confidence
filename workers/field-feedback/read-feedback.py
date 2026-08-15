#!/usr/bin/env python3
"""
read-feedback.py -- read DCC (and cross-product) field feedback from the
Cloudflare Worker `field-feedback`.

This Worker is shared across products (DCC, Command Deck, KevsCasa preview,
Elite Karate preview) -- every submission is tagged with its own `context.url`,
so this script shows everything by default. There is no DCC-only filter;
read the `context.url` / `page` field in each item to tell products apart.

No secrets are hardcoded. Provide them via environment variables or flags:

  FEEDBACK_ENDPOINT   base worker URL: https://field-feedback.twobirdsinnovation.workers.dev
  FEEDBACK_READ_KEY   the shared read secret (matches the Worker secret FEEDBACK_READ_KEY)

Both are recorded in the gitignored C:\\twobirds\\hal-stack\\integrations\\field-feedback\\.env
(two-birds-portfolio repo) per this repo's standard secrets-storage pattern. See README.md
in this directory for the exact path and how to load it.

Windows note: feedback transcripts/pins can contain emoji (e.g. testers pinning
text with emoji in the surrounding page). The Windows console defaults to
cp1252 and will crash on those characters unless you set:
  set PYTHONIOENCODING=utf-8   (cmd)   or   $env:PYTHONIOENCODING="utf-8"  (PowerShell)
before running this script.

Usage:
  # env vars set:
  python read-feedback.py
  python read-feedback.py --since 2026-07-02T00:00:00.000Z
  python read-feedback.py --json          # raw JSON dump
  # or pass explicitly:
  python read-feedback.py --endpoint https://... --key SECRET

Canadian English. No em-dashes.
"""

import argparse
import json
import os
import sys
import urllib.parse
import urllib.request


def fetch(endpoint, key, since, limit):
    base = endpoint.rstrip("/") + "/list"
    params = {}
    if since:
        params["since"] = since
    if limit:
        params["limit"] = str(limit)
    url = base + ("?" + urllib.parse.urlencode(params) if params else "")
    # Cloudflare's edge bot-fight mode blocks the default "Python-urllib/x.y"
    # User-Agent (error 1010, browser_signature_banned) before the request
    # ever reaches the Worker. A plain browser-shaped UA clears it.
    # Read key goes in the X-Feedback-Key header, not ?key= -- a query-string
    # secret lands in Cloudflare request logs (S-SECURITY-WORKER-URL-PII-
    # HARDENING-001, 2026-08-15). The Worker still accepts ?key= too, during
    # the transition.
    req = urllib.request.Request(url, headers={
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) read-feedback.py/1.0",
        "X-Feedback-Key": key
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        print("HTTP %s from worker: %s" % (e.code, body), file=sys.stderr)
        sys.exit(1)
    except Exception as e:  # noqa: BLE001
        print("Request failed: %s" % e, file=sys.stderr)
        sys.exit(1)


def print_item(item):
    bundle = item.get("bundle") or {}
    ctx = bundle.get("context") or {}
    ts = bundle.get("serverTimestamp") or bundle.get("timestamp") or item.get("id", "")
    print("=" * 72)
    tag = ""
    if ctx.get("betaTester"):
        tag = "  [BETA TESTER%s]" % (
            "  email_hash=" + ctx.get("betaEmailHash", "")[:12] + "..." if ctx.get("betaEmailHash") else ""
        )
    print("[%s]  device=%s  country=%s%s" % (ts, ctx.get("device", "?"), bundle.get("cfCountry", ""), tag))
    print("page : %s" % ctx.get("title", bundle.get("url", "")))
    print("url  : %s" % ctx.get("url", bundle.get("url", "")))
    vp = ctx.get("viewport") or {}
    if isinstance(vp, dict):
        vp_str = "%sx%s" % (vp.get("width", "?"), vp.get("height", "?"))
    else:
        vp_str = str(vp) if vp else "?"
    sc = ctx.get("scroll") or {}
    print("view : %s   scroll y=%s" % (vp_str, sc.get("y", "?") if isinstance(sc, dict) else "?"))
    transcript = (bundle.get("transcript") or "").strip()
    print("")
    print("  TRANSCRIPT:")
    if transcript:
        for line in transcript.splitlines() or [transcript]:
            print("    " + line)
    else:
        print("    (none)")
    pins = bundle.get("pins") or []
    if pins:
        print("")
        print("  PINNED SPOTS (%d):" % len(pins))
        for p in pins:
            rect = p.get("rect") or {}
            loc = ""
            if "x" in rect and "y" in rect:
                loc = "  @(%s,%s)" % (rect.get("x"), rect.get("y"))
            elif "x" in p and "y" in p:
                loc = "  @(%s,%s)" % (p.get("x"), p.get("y"))
            label = p.get("n", "?")
            print("    #%s  %s%s" % (label, (p.get("text") or "").strip()[:80], loc))
            sel = p.get("selector")
            if sel:
                print("        selector: %s" % sel)
    print("")


def main():
    ap = argparse.ArgumentParser(description="Read field feedback from the Cloudflare Worker.")
    ap.add_argument("--endpoint", default=os.environ.get("FEEDBACK_ENDPOINT", ""),
                    help="Worker base URL (or set FEEDBACK_ENDPOINT).")
    ap.add_argument("--key", default=os.environ.get("FEEDBACK_READ_KEY", ""),
                    help="Read secret (or set FEEDBACK_READ_KEY).")
    ap.add_argument("--since", default="", help="Only items after this ISO timestamp / cursor id.")
    ap.add_argument("--limit", type=int, default=0, help="Max items (1-200).")
    ap.add_argument("--json", action="store_true", help="Print raw JSON instead of a readable digest.")
    ap.add_argument("--beta-only", action="store_true", help="Show only feedback tagged betaTester=true.")
    args = ap.parse_args()

    if not args.endpoint:
        print("No endpoint. Set FEEDBACK_ENDPOINT or pass --endpoint.", file=sys.stderr)
        sys.exit(2)
    if not args.key:
        print("No read key. Set FEEDBACK_READ_KEY or pass --key.", file=sys.stderr)
        sys.exit(2)

    data = fetch(args.endpoint, args.key, args.since, args.limit)

    if not data.get("ok"):
        print("Worker returned an error: %s" % json.dumps(data), file=sys.stderr)
        sys.exit(1)

    if args.json:
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return

    items = data.get("items") or []
    if args.beta_only:
        items = [it for it in items if ((it.get("bundle") or {}).get("context") or {}).get("betaTester")]
    print("Field feedback: %d item(s)%s" % (
        data.get("count", len(items)),
        "" if data.get("complete") else "  (more may exist -- use --since %s to page)" % data.get("cursor", "")))
    print("")
    if not items:
        print("No feedback yet.")
        return
    for item in items:
        print_item(item)
    if not data.get("complete"):
        print("More items may exist. Re-run with:  --since %s" % data.get("cursor", ""))


if __name__ == "__main__":
    main()
