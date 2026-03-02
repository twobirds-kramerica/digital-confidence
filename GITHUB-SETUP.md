# GitHub Feedback System Setup

The Digital Confidence Centre uses GitHub Issues for beta feedback management.
Beta testers submit feedback through the site → GitHub Issue is created automatically →
you receive an email notification.

---

## Step 1: Create a Fine-Grained Personal Access Token

1. Go to: **https://github.com/settings/tokens?type=beta**
2. Click **"Generate new token"**
3. Name it: `Digital Confidence Feedback`
4. Expiration: 90 days (renew when needed) or No expiration
5. Under **Repository access** → select **"Only select repositories"** → choose `digital-confidence`
6. Under **Permissions → Repository permissions**:
   - **Issues** → set to **"Read and write"**
   - All other permissions: leave as "No access"
7. Click **"Generate token"**
8. **COPY THE TOKEN IMMEDIATELY** — you cannot see it again

> **Security note:** This fine-grained token can ONLY create issues in this one repository.
> Even if someone finds it in your site's source code, the worst they can do is create spam issues.
> It cannot push code, delete files, or access other repositories.

---

## Step 2: Add the Token to the Site

1. Open the file: `js/feedback-github.js`
2. Find line 14: `token: '',`
3. Paste your token between the quotes: `token: 'github_pat_YOUR_TOKEN_HERE',`
4. Save the file
5. Commit and push to GitHub:
   ```
   git add js/feedback-github.js
   git commit -m "config: Add feedback GitHub token"
   git push
   ```

---

## Step 3: Create Issue Labels

In your GitHub repository (https://github.com/twobirds-kramerica/digital-confidence/labels):

Create these labels (they'll be applied automatically to incoming feedback):

| Label | Colour | Description |
|-------|--------|-------------|
| `beta-feedback` | `#1976D2` blue | All beta feedback submissions |
| `bug-report-issue` | `#E53935` red | Bug reports from users |
| `suggestion-for-this-area` | `#43A047` green | Suggestions |
| `something-confusing` | `#FB8C00` orange | Confusion reports |
| `something-good` | `#8E24AA` purple | Praise / positive feedback |
| `other-feedback` | `#607D8B` grey | Other |

---

## Step 4: Test It

1. Open your site: `https://twobirds-kramerica.github.io/digital-confidence/`
2. Click the blue **💬 Feedback** button (bottom-left of screen)
3. Enter a name, select a type, type a test message
4. Click **Send Feedback**
5. You should see: "Thank You! Reference #1" (or the issue number)
6. Check your email — GitHub sends a notification within seconds
7. Go to: https://github.com/twobirds-kramerica/digital-confidence/issues — the issue should appear

---

## How It Works

```
User fills out feedback form
         ↓
JavaScript calls GitHub API (creates Issue)
         ↓
GitHub sends you email notification
         ↓
You see full feedback in GitHub Issues
         ↓
You can comment, label, and close issues
```

**Email notifications include:**
- Who submitted (name from form, or "Anonymous")
- Type of feedback (Bug, Suggestion, Confusing, etc.)
- What page they were on
- Their full feedback text
- Timestamp (Eastern Time)
- Screen size and browser info

---

## Managing Feedback

**View all feedback:**
`https://github.com/twobirds-kramerica/digital-confidence/issues?label=beta-feedback`

**Filter by type:**
- Bugs: `?label=bug-report-issue`
- Confusion: `?label=something-confusing`
- Suggestions: `?label=suggestion-for-this-area`
- Praise: `?label=something-good`

**Respond to a user:**
Since we collect names (optional), you can post a comment on the Issue if the person provided contact info,
or simply close the issue after addressing it.

**Mark resolved:** Click "Close issue" when the feedback has been addressed.

---

## Backup System

All feedback is also saved to the browser's local storage as a backup.
If GitHub submission fails (e.g., no internet), the feedback is saved locally with status "PENDING".

To retrieve locally-saved feedback:
1. Open the site in a browser
2. Open browser developer tools (press F12)
3. Click "Console" tab
4. Paste and run: `JSON.parse(localStorage.getItem('dc-feedback-backup'))`

---

## If GitHub Submission Is Not Working

Check:
1. Is the token added correctly in `js/feedback-github.js`?
2. Is the token still valid? (Check https://github.com/settings/tokens)
3. Does the token have "Issues: write" permission on the `digital-confidence` repo?
4. Is the repo public? (Required for GitHub Pages to work)

If the token field is left blank (`token: ''`), the system will still work —
it saves feedback to local storage only and shows "Saved locally" as the reference number.

---

## Renewing the Token

Tokens expire after 90 days. GitHub will email you before expiry.
When you need to renew:
1. Go to https://github.com/settings/tokens
2. Find "Digital Confidence Feedback" → Click "Regenerate"
3. Copy the new token
4. Update `js/feedback-github.js` → commit → push

---

**Status:** Ready for beta testing
**Live site:** https://twobirds-kramerica.github.io/digital-confidence/
