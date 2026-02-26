# PHASE 3: HIGH CREDIT TASKS (40-60% Weekly Credits)

## ⚠️ IMPORTANT: Backend Required

These features require a backend server and database. They CANNOT be built with static HTML/CSS/JS alone. You will need to choose a backend solution before implementing Phase 3.

## Backend Options

1. **Firebase (Google)** - Easiest for beginners
   - Free tier: 50K reads/day, 20K writes/day
   - Handles authentication, database, hosting
   - Estimated cost: $0-$25/month for small site

2. **Supabase** - Open-source Firebase alternative
   - More generous free tier
   - PostgreSQL database (more powerful)
   - Estimated cost: $0 (free tier) or $25/month (pro)

3. **Custom Backend** (Node.js + MongoDB/PostgreSQL)
   - Full control, but requires more technical knowledge
   - Hosting: $5-$20/month (DigitalOcean, Railway, Render)

## Recommended Approach

Start with **Firebase** or **Supabase** — they handle complex infrastructure so you can focus on features.

---

## Credit Cost Estimate (Per Feature)

- Full SSO/Authentication System: ~15%
- User Progress Sync Across Devices: ~10%
- Automated Content Monitoring: ~12%
- Audio Narration (Text-to-Speech): ~8%
- Email Newsletter System: ~5%
- Payment Integration (for future monetization): ~10%

**Total if building all: ~60% of weekly Pro credits**

---

## FEATURE 1: FULL AUTHENTICATION SYSTEM

### What It Includes
- User registration (email + password)
- Email verification
- Password reset flow
- Social login (Google, Facebook, Apple)
- Session management
- Secure JWT tokens

### Why It's High Credit
- Complex security requirements
- Multiple API endpoints needed
- Email service integration (SendGrid, Mailgun)
- Frontend AND backend work

### Architecture
```
Frontend (HTML/JS)
    ↓ HTTPS
Authentication API (Node.js / Firebase Auth)
    ↓
User Database (PostgreSQL / Firestore)
    ↓
Email Service (SendGrid / Mailgun)
```

### Claude Code Prompt (When Ready)
```prompt
Implement full user authentication for Digital Confidence Centre using Firebase Auth:

1. Registration page (register.html):
   - Email + password form
   - "I am 18 or older" checkbox
   - Terms & Privacy Policy acceptance
   - Send verification email on signup
   - Link from homepage and footer

2. Login page (login.html):
   - Email/password form
   - "Forgot password" link (email reset)
   - "Remember me" checkbox
   - Google Sign-In button
   - Link to registration

3. Profile page (profile.html):
   - Display name, email, member since
   - Progress synced from localStorage to Firestore
   - Device preferences (synced)
   - Delete account option

4. Update all pages:
   - Show login/logout button in sidebar
   - Show username in sidebar header
   - Sync localStorage progress to Firestore on login

Use Firebase SDK v9 (modular). Store API keys in a separate config.js file.
```

---

## FEATURE 2: USER PROGRESS SYNC ACROSS DEVICES

### What It Includes
- Save module progress to cloud (not just localStorage)
- Sync across iPad, phone, and computer
- Restore progress when logging in on a new device
- Progress timeline / learning history

### Requires
- Authentication system (Feature 1)
- Firebase Firestore or Supabase database

### Data Structure
```json
{
  "userId": "abc123",
  "progress": {
    "module-1": { "completed": true, "completedDate": "2025-12-01", "checkboxes": [true, true, false] },
    "module-2": { "completed": false, "completedDate": null, "checkboxes": [true, false, false] }
  },
  "preferences": {
    "city": "windsor",
    "devices": ["ipad", "iphone"],
    "fontSize": "large",
    "theme": "light"
  }
}
```

---

## FEATURE 3: AUTOMATED CONTENT MONITORING

### What It Includes
- Weekly automated check that all YouTube video embeds still work
- Alert system (email to site owner) if videos become unavailable
- Automatic "Video temporarily unavailable" fallback message
- Dashboard showing video health status

### Why It's High Credit
- Requires server-side cron jobs
- YouTube Data API integration
- Email alerting system
- Admin dashboard page

### Architecture
```
Cron Job (runs weekly, e.g., GitHub Actions)
    ↓
YouTube Data API v3 (check video status)
    ↓
If unavailable → Email alert to site owner
    ↓
Update status.json file in repository
    ↓
Site reads status.json and shows fallback for broken videos
```

### Claude Code Prompt (When Ready)
```prompt
Create an automated YouTube video health check system for Digital Confidence Centre:

1. Create scripts/check-videos.js:
   - Read all iframe src attributes from module-1.html through module-8.html
   - Extract video IDs
   - Call YouTube Data API v3 to check each video's status
   - Output: public/video-status.json with { videoId: "ok" | "unavailable" | "private" }

2. Create .github/workflows/check-videos.yml:
   - Run check-videos.js every Monday at 8am EST
   - If any video is unavailable, send email via SendGrid to [YOUR EMAIL]
   - Commit updated video-status.json to repository

3. Update video-container HTML/JS:
   - On page load, fetch public/video-status.json
   - If a video is unavailable, replace the iframe with a friendly message:
     "This video is temporarily unavailable. Search [video title] on YouTube for similar content."

YouTube API Key: [YOU NEED TO CREATE ONE AT console.cloud.google.com]
```

---

## FEATURE 4: AUDIO NARRATION (TEXT-TO-SPEECH)

### What It Includes
- "Listen to this page" button on each module
- Natural-sounding voice reads the module content aloud
- Pause/resume/stop controls
- Highlights text as it reads (optional)
- Option to adjust reading speed

### Technology Options
1. **Web Speech API** (Free, built into browsers)
   - No cost, works offline
   - Voice quality varies by device
   - Limited voice selection

2. **Amazon Polly** (Low cost, high quality)
   - $4 per 1 million characters
   - Lifelike neural voices
   - Requires AWS account and backend

3. **ElevenLabs** (Best quality, higher cost)
   - Very natural voice cloning
   - $5-$22/month depending on usage

### Recommended: Start with Web Speech API (FREE)

### Claude Code Prompt (When Ready)
```prompt
Add audio narration to all 8 module pages using the Web Speech API:

1. Create js/narration.js:
   - Add "Listen to this page" button to each module's main content area
   - On click: collect all visible text from .main-content (excluding nav, headers)
   - Use window.speechSynthesis to speak the text
   - Show pause/resume/stop controls
   - Add visual highlighting to the paragraph currently being read
   - Remember playback position (resume where you left off)
   - Button should show: "🔊 Listen" → "⏸️ Pause" → "▶️ Resume"

2. Add narration controls CSS to main.css:
   - Sticky narration bar at bottom of screen while playing
   - Clear, large buttons (min 60px tap target)
   - Progress bar showing % of page read

3. Add <script src="js/narration.js"></script> to all module HTML files.

Use British English voice if available (preferred by many Canadian seniors).
```

---

## FEATURE 5: EMAIL NEWSLETTER SYSTEM

### What It Includes
- "Subscribe for updates" form in footer of all pages
- Monthly email digest: "What's new at Digital Confidence Centre"
- New module announcements
- Safety tip of the month
- Unsubscribe link in every email

### Technology Options
1. **Mailchimp** (Free up to 500 subscribers)
   - Easy to use, no backend needed
   - Embed their signup form directly in HTML

2. **ConvertKit** (Free up to 1,000 subscribers)
   - Better automation
   - Simple landing pages

3. **Buttondown** (Very simple, Canadian-friendly)
   - Free up to 1,000 subscribers
   - Privacy-focused

### Recommended: Start with Mailchimp (FREE, no backend needed)

### Claude Code Prompt (When Ready)
```prompt
Add email newsletter signup to Digital Confidence Centre using Mailchimp:

1. Create a Mailchimp audience and embed form code
   (Mailchimp → Audience → Signup forms → Embedded forms)

2. Add newsletter signup section to all page footers (before </footer>):
   - Headline: "Stay Updated"
   - Subtext: "Get a monthly email with new modules and safety tips. Unsubscribe anytime."
   - Email input field + "Subscribe" button
   - Privacy note: "We respect your privacy. Max 1 email per month."

3. Style with existing CSS variables (use .newsletter-signup class)

4. Add MAILCHIMP_FORM_URL to a new file: js/config.js
   (Never commit API keys to git - add config.js to .gitignore)

Mailchimp form URL: [YOU WILL GET THIS FROM MAILCHIMP]
```

---

## FEATURE 6: PAYMENT INTEGRATION (Future Monetization)

### What It Includes
- Premium subscription tier ($4.99/month or $39.99/year)
- Premium features: progress sync, audio narration, no ads, certificate of completion
- Early adopters (first 1,000 free users) are grandfathered in FREE forever
- Payment processing via Stripe (most developer-friendly)

### Why This Is Last
- Needs authentication (Feature 1) first
- Needs backend (can't process payments client-side)
- Regulatory: Need privacy policy, terms of service, refund policy
- Tax complexity: Canadian GST/HST collection may apply

### Technology
- **Stripe** for payment processing (3% + 30¢ per transaction)
- **Stripe Billing** for subscription management
- **Stripe Customer Portal** for self-service cancellation (required)

### Early Adopter Protection Implementation
```javascript
// In registration flow:
const userCount = await getUserCount(); // from database
if (userCount <= 1000) {
  user.tier = 'early_adopter'; // free forever
  user.earlyAdopterBadge = true;
  user.premiumExpiry = null; // never expires
} else {
  user.tier = 'free';
}
```

---

## RECOMMENDED PHASE 3 ORDER

1. **Start here:** Email Newsletter (Mailchimp - no backend needed, free, quick win)
2. **Then:** Audio Narration (Web Speech API - no backend needed, free)
3. **Then:** Choose a backend (Firebase recommended)
4. **Then:** Authentication System
5. **Then:** Progress Sync
6. **Then:** Content Monitoring
7. **Last:** Payment Integration (only if monetization is a goal)

---

## BEFORE STARTING PHASE 3: CHECKLIST

- [ ] Phase 1 Polish complete (this document's context)
- [ ] Phase 2 modules complete (modules 9, 10, 11)
- [ ] Legal pages live (Terms, Privacy Policy, Copyright)
- [ ] Google Analytics set up (get Measurement ID from analytics.google.com)
- [ ] Custom domain configured (if desired)
- [ ] Decided on backend platform (Firebase or Supabase)
- [ ] Have a business email address for signups/alerts
