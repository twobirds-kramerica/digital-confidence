# Microsoft Clarity Setup Guide — Digital Confidence Centre

Microsoft Clarity is a free heatmap and session recording tool that shows you exactly how seniors interact with the site — where they tap, where they get stuck, and what they read. It is already integrated in the site code; you just need to replace the placeholder Project ID.

---

## Step 1 — Create your Clarity account and project

1. Go to **clarity.microsoft.com** and sign in with any Microsoft account (Outlook, Hotmail, or a new free account).
2. Click **+ New project**.
3. Enter the project name: **Digital Confidence Centre**
4. Enter the site URL: `https://twobirds-kramerica.github.io/digital-confidence/`
5. Click **Create project**.
6. Copy your **Project ID** — it looks like: `abcde12345` (10 characters, letters and numbers only).

---

## Step 2 — Find all files containing the placeholder

In Claude Code, run this command to confirm which files contain `CLARITY_PROJECT_ID`:

```bash
find . -name "*.html" | xargs grep -l "CLARITY_PROJECT_ID"
```

This should return several files including `index.html`, module pages, and others.

---

## Step 3 — Replace the placeholder in all files

Run this single command to swap `CLARITY_PROJECT_ID` with your real Project ID across every HTML file:

```bash
find . -name "*.html" -exec sed -i 's/CLARITY_PROJECT_ID/YOUR_REAL_ID/g' {} +
```

**Replace `YOUR_REAL_ID` with your actual Clarity Project ID before running this.**

For example, if your Project ID is `abc123xyz9`:
```bash
find . -name "*.html" -exec sed -i 's/CLARITY_PROJECT_ID/abc123xyz9/g' {} +
```

---

## Step 4 — Verify the change

Run a quick check to confirm no placeholder remains:

```bash
grep -r "CLARITY_PROJECT_ID" --include="*.html" .
```

If this returns no results, the replacement was successful.

---

## Step 5 — Commit and push

```bash
git add -A
git commit -m "chore: Microsoft Clarity configured"
git push origin main
```

---

## Step 6 — Confirm tracking is live

1. Visit the live site: `https://twobirds-kramerica.github.io/digital-confidence/`
2. Accept analytics consent if prompted (the site consent gate controls whether Clarity loads).
3. Go back to **clarity.microsoft.com** — your project dashboard should show the site as **Receiving data** within 24 hours.

---

## Important notes

- **Consent-gated**: Clarity only loads if a visitor has accepted analytics consent. This is already handled by the site's `analytics-consent.js`. Visitors who decline will not be tracked.
- **No personal data**: Clarity automatically masks form inputs (names, emails, etc.) — no personal information is recorded.
- **Free tier**: Unlimited sessions, 13 months of data retention — no credit card required.
- **Heatmaps**: Available after ~100 sessions per page. Check the Heatmaps tab in the Clarity dashboard.
- **Session recordings**: Available immediately. Useful for watching how seniors navigate a specific module.

---

## Where the code lives

The Clarity snippet is embedded in the `<head>` of every HTML page and looks like:

```html
<!-- Microsoft Clarity — replace CLARITY_PROJECT_ID at clarity.microsoft.com (free) -->
<script type="text/javascript">
if (localStorage.getItem('analytics_consent') === 'true') {
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, 'clarity', 'script', 'CLARITY_PROJECT_ID');
}
</script>
```

Once you run the sed command in Step 3, `CLARITY_PROJECT_ID` becomes your real ID throughout the entire site.
