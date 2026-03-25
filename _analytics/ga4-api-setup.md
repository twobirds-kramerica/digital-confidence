# GA4 Data API Setup — Digital Confidence Centre

Connects the admin dashboards (`admin/user-journey-dashboard.html` and
`admin/beta-analytics.html`) to live Google Analytics 4 data.

The dashboards read from `_analytics/metrics.json`, which is generated
nightly by the script in this folder. No server required — just a
scheduled GitHub Action.

---

## Prerequisites

- Google Analytics 4 property already set up (GA4 tag is live on the site)
- Google Cloud Console account (free)
- Node.js 18+ installed locally (for running the script manually)

---

## Step 1 — Enable the GA4 Data API

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use an existing one): `dcc-analytics`
3. Navigate to **APIs & Services → Library**
4. Search for **"Google Analytics Data API"**
5. Click **Enable**

---

## Step 2 — Create a Service Account

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → Service Account**
   - Name: `dcc-analytics-reader`
   - Role: **Viewer**
3. Click the new service account → **Keys tab → Add Key → JSON**
4. Download the JSON key file → save as `_analytics/service-account.json`

> ⚠️ **Never commit `service-account.json` to the repository.**
> It is already in `.gitignore`. Store it in GitHub Secrets for CI.

---

## Step 3 — Grant Access to GA4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Property Access Management
3. Add the service account email (e.g. `dcc-analytics-reader@dcc-analytics.iam.gserviceaccount.com`)
4. Role: **Viewer**

---

## Step 4 — Find Your GA4 Property ID

1. GA4 → Admin → Property Settings
2. Copy the **Property ID** (numeric, e.g. `345678901`)
3. Add it to the script below

---

## Step 5 — Install Dependencies

```bash
cd _analytics
npm init -y
npm install @google-analytics/data
```

---

## Step 6 — Create the Metrics Script

Create `_analytics/generate-metrics.js`:

```javascript
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');
const path = require('path');

const GA4_PROPERTY_ID = 'YOUR_GA4_PROPERTY_ID'; // e.g. '345678901'

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(__dirname, 'service-account.json'),
});

async function runReport(config) {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    ...config,
  });
  return response;
}

async function generateMetrics() {
  const thirtyDaysAgo = { startDate: '30daysAgo', endDate: 'today' };

  // ── Total Users ──
  const usersReport = await runReport({
    dateRanges: [thirtyDaysAgo],
    metrics: [{ name: 'activeUsers' }],
  });
  const totalUsers = parseInt(usersReport.rows?.[0]?.metricValues?.[0]?.value || 0);

  // ── Module Starts (page_view events for module pages) ──
  const moduleStartReport = await runReport({
    dateRanges: [thirtyDaysAgo],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'sessions' }],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: { matchType: 'PARTIAL_REGEXP', value: 'module-\\d+' },
      },
    },
  });

  // ── Module Completions (module_complete events) ──
  const completionReport = await runReport({
    dateRanges: [thirtyDaysAgo],
    dimensions: [{ name: 'eventName' }, { name: 'customEvent:module_number' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        stringFilter: { matchType: 'EXACT', value: 'module_complete' },
      },
    },
  });

  // ── Feedback Submissions ──
  const feedbackReport = await runReport({
    dateRanges: [thirtyDaysAgo],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        stringFilter: { matchType: 'EXACT', value: 'feedback_submit' },
      },
    },
  });

  // ── Quiz Events ──
  const quizReport = await runReport({
    dateRanges: [thirtyDaysAgo],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        stringFilter: { matchType: 'BEGINS_WITH', value: 'quiz_' },
      },
    },
  });

  // ── Beta Tester Filter (is_beta=true) ──
  const betaReport = await runReport({
    dateRanges: [thirtyDaysAgo],
    metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
    dimensionFilter: {
      filter: {
        fieldName: 'customEvent:is_beta',
        stringFilter: { matchType: 'EXACT', value: 'true' },
      },
    },
  });
  const betaUsers    = parseInt(betaReport.rows?.[0]?.metricValues?.[0]?.value || 0);
  const betaSessions = parseInt(betaReport.rows?.[0]?.metricValues?.[1]?.value || 0);

  // ── Per-Module Breakdown ──
  const moduleNames = [
    'Mastering the Escape Hatch',
    'The Security Shield',
    'Passwords & Biometrics',
    'App Store Safety',
    'Email & Messages',
    'Banking & Transactions',
    'Photos & Memories',
    'Stay Connected',
    'Understanding AI',
    'Grocery & Food Delivery',
    'Ride-Sharing Apps',
    'Getting the Help You Deserve',
  ];

  const moduleBreakdown = moduleNames.map((name, i) => ({
    name: `Module ${i + 1}: ${name}`,
    pageViews: 0, // populate from moduleStartReport
    started: 0,
    completed: 0,
    avgMinutes: null,
    scroll75: null,
  }));

  // Assemble output
  const metrics = {
    generated: new Date().toISOString(),
    totalUsers,
    moduleStarts: moduleStartReport.rows?.length || 0,
    moduleCompletions: completionReport.rows?.reduce((sum, r) => sum + parseInt(r.metricValues[0].value), 0) || 0,
    feedbackSubmissions: parseInt(feedbackReport.rows?.[0]?.metricValues?.[0]?.value || 0),
    avgSessionMinutes: null, // requires session duration metric
    quizPassRate: null, // requires quiz_complete + pass filter
    discovery: { organic: 0, direct: 0, referral: 0, social: 0 },
    funnel: {
      visitors: totalUsers,
      started: 0,
      completed: 0,
      quizAttempts: 0,
      quizPassed: 0,
    },
    modules: moduleBreakdown,
    beta: {
      users: betaUsers,
      sessions: betaSessions,
      feedbackCount: 0,
      modulesCompleted: 0,
      avgModulesPerUser: 0,
      satisfactionScore: null,
      dropoff: {},
    },
  };

  // Write output
  const outPath = path.join(__dirname, 'metrics.json');
  fs.writeFileSync(outPath, JSON.stringify(metrics, null, 2));
  console.log(`✅ metrics.json written to ${outPath}`);
  console.log(`   Total users (30d): ${totalUsers}`);
  console.log(`   Beta testers: ${betaUsers}`);
}

generateMetrics().catch(console.error);
```

---

## Step 7 — Run Manually

```bash
cd _analytics
node generate-metrics.js
```

This creates `_analytics/metrics.json` which the dashboards read automatically.

---

## Step 8 — Automate with GitHub Actions

Create `.github/workflows/generate-analytics.yml`:

```yaml
name: Generate Analytics Metrics

on:
  schedule:
    - cron: '0 6 * * *'  # 6am UTC daily
  workflow_dispatch:      # allow manual trigger

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: cd _analytics && npm install

      - name: Write service account credentials
        run: echo '${{ secrets.GA4_SERVICE_ACCOUNT_JSON }}' > _analytics/service-account.json

      - name: Generate metrics
        run: cd _analytics && node generate-metrics.js
        env:
          GA4_PROPERTY_ID: ${{ secrets.GA4_PROPERTY_ID }}

      - name: Commit and push metrics.json
        run: |
          git config user.name "Analytics Bot"
          git config user.email "noreply@github.com"
          git add _analytics/metrics.json
          git diff --staged --quiet || git commit -m "chore: update analytics metrics [skip ci]"
          git push
```

### GitHub Secrets to Configure

| Secret Name | Value |
|-------------|-------|
| `GA4_SERVICE_ACCOUNT_JSON` | Full contents of service-account.json |
| `GA4_PROPERTY_ID` | Your numeric GA4 property ID |

---

## Custom Dimensions Required in GA4

These event parameters need to be registered as Custom Dimensions in GA4
(Admin → Custom Definitions → Create Custom Dimension):

| Parameter name | Scope | Display Name |
|----------------|-------|-------------|
| `module_number` | Event | Module Number |
| `is_beta` | Event | Is Beta Tester |
| `experiment_id` | Event | A/B Experiment ID |
| `experiment_variant` | Event | A/B Experiment Variant |
| `page_module` | Event | Page Module |

---

## Events Tracked by analytics-events.js

| Event Name | Category | When Fired |
|------------|----------|------------|
| `page_view_dcc` | Navigation | Every page load |
| `module_progress_step` | Learning | Checkbox checked |
| `module_complete` | Learning | All checkboxes done |
| `quiz_answer` | Assessment | Each quiz option clicked |
| `quiz_complete` | Assessment | Quiz score shown |
| `final_quiz_submit` | Assessment | Final quiz submitted |
| `feedback_modal_open` | Engagement | Feedback button clicked |
| `feedback_submit` | Engagement | Form submitted |
| `accessibility_font_size` | Accessibility | Font size changed |
| `accessibility_theme` | Accessibility | Dark/light toggled |
| `accessibility_dyslexic_font` | Accessibility | Dyslexic font toggled |
| `language_switch` | Localisation | FR/EN toggle clicked |
| `video_link_click` | Content | Watch Tutorials clicked |
| `video_play` | Content | Native video played |
| `video_complete` | Content | Native video ended |
| `module_print` | Content | Print button clicked |
| `outbound_click` | Navigation | External link clicked |
| `phone_call_click` | Support | tel: link clicked |
| `scam_scenario_view` | Safety | Scam scenario opened |
| `module_nav` | Navigation | Prev/next module clicked |
| `scroll_depth` | Engagement | 25/50/75/100% scrolled |
| `time_on_page` | Engagement | Page unloaded |
| `experiment_impression` | A/B Test | A/B variant applied |

---

## Notes

- `metrics.json` is committed to the repo so the static dashboard can read it
  without a backend server. GitHub Pages serves it as a static file.
- The service account credentials are **never** committed — stored only in
  GitHub Secrets and written to a temp file during CI.
- `_analytics/` is not excluded from deployment — `metrics.json` is intentionally public
  (aggregate, anonymised data only).
