# Newsletter Subscriber Guide
**Digital Confidence Centre — Two Birds Innovation**
Internal use only · Updated March 2026

---

## Overview

The DCC newsletter is a simple, low-tech email list managed manually through hello@twobirds.ca. There is no third-party newsletter platform. Subscribers sign up by sending an email, and you manage the list in a spreadsheet.

This guide explains how the signup flow works, how to manage the list, and how to send tip emails.

---

## How Signup Works

The signup widget appears on three pages:
- **Homepage** (`index.html`) — below the progress overview
- **Tips Hub** (`tips/index.html`) — in the page sidebar/intro area
- **After module completion** — injected by `module-interact.js` when a module is marked complete (shown once per session)

When a visitor enters their email and clicks "Sign Up", the widget:
1. Opens their default email app (via `mailto:`)
2. Pre-fills a message to `hello@twobirds.ca` with subject: "Sign me up for Digital Confidence Centre tips"
3. Marks them as "signed up" in their browser's localStorage so the widget doesn't appear again

**Important:** The visitor must actually send the email for the signup to complete. If they close the email app without sending, they have not subscribed. The localStorage flag still prevents the widget from showing again, which is intentional (to avoid being annoying).

---

## Managing the Subscriber List

### When a signup email arrives

1. Open the email
2. Add the sender's email address to the subscriber spreadsheet (see below)
3. Reply with a brief welcome:

**Welcome reply template:**
> Subject: Welcome to Digital Confidence Centre tips!
>
> Hi there,
>
> You're on the list — welcome!
>
> Each week I'll send you a short, practical tip about staying safe and confident online. No jargon, no pressure, just one useful thing at a time.
>
> Your first tip will arrive within the next week or two. In the meantime, you can explore the Digital Confidence Centre at your own pace:
> [your-site-url]
>
> If you ever want to unsubscribe, just reply with "unsubscribe" and I'll remove you right away.
>
> — Aaron
> Two Birds Innovation

### Subscriber spreadsheet

Maintain a spreadsheet at `_marketing/subscribers.csv` (gitignored — never commit subscriber data to the repo).

Columns:
```
email, first_name, date_added, source, active
```

- `source` — where they signed up: `homepage`, `tips-hub`, `module-complete`, `email-reply`, `other`
- `active` — `yes` or `no` (set to `no` on unsubscribe)

**Privacy:** Never share, sell, or use subscriber email addresses for any purpose other than the DCC newsletter. Delete the record entirely if a subscriber requests deletion (beyond just unsubscribing).

---

## Sending Tips

Tips go out weekly (target: every Monday morning). Each tip should:
- Be 150–250 words maximum
- Cover one specific skill or safety concept
- Use plain language — no jargon
- Include a link back to the relevant DCC module or tip article
- End with a one-sentence "What to try this week" action item

### Sending process

1. Draft the tip in a text file (`_marketing/tips-drafts/tip-YYYY-MM-DD.md`)
2. Send from `hello@twobirds.ca` as BCC to all active subscribers (never in the TO field — protects privacy)
3. Subject line format: `Digital Confidence Tip — [Topic]`
4. Log the send date in the subscriber spreadsheet

### Tip frequency

- **Weekly** (ideal): 52 tips/year
- **Bi-weekly** (acceptable if volume is low): 26 tips/year
- Never go more than 3 weeks without a send — subscribers forget they signed up

---

## Unsubscribe Requests

When a subscriber replies "unsubscribe" (or similar):
1. Reply: "Done — you've been removed from the list. No further emails from us."
2. Set `active` to `no` in the spreadsheet
3. Do not contact them again

---

## Content Ideas for Tips

These can be recycled from existing site content or written fresh:

| Tip Category | Examples |
|-------------|----------|
| Scam alerts | New CRA scam variant, AI voice scam warning, gift card scam reminder |
| Safety habits | Enable autodeposit, update iOS, use Face ID |
| Practical skills | How to FaceTime, set up Find My iPhone, use PC Express |
| Seasonal | Tax season phishing warnings, holiday scams, travel safety |
| Platform updates | Changes to Facebook privacy settings, new bank app features |
| DCC content | New module launch, updated scam guide, new tip article |

---

## File Structure

```
_marketing/
  subscriber-guide.md     ← this file
  subscribers.csv         ← gitignored — never commit
  tips-drafts/
    tip-YYYY-MM-DD.md     ← tip drafts before sending
```

Add `_marketing/subscribers.csv` to `.gitignore` if not already present.

---

*Guide maintained by Aaron · Two Birds Innovation · Internal only*
