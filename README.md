# Digital Confidence Centre

A friendly, accessible website designed to help seniors learn technology with confidence. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

## What This Is

An 8-module digital literacy training course for older adults (70+), with a focus on:
- Device navigation (phones, tablets, and computers)
- Scam detection and online safety
- Passwords and security
- Email, banking, and creative tools
- Family connection through technology

## Features

- **Dark/Light mode** toggle with preference saved
- **4-level font sizing** (Small, Medium, Large, Extra Large)
- **Progress tracking** with checkboxes saved to LocalStorage
- **Interactive scam quizzes** for safe practice
- **Multi-device support** with setup wizard for phones, tablets, and computers
- **Multi-city resources** for Ontario communities
- **Responsive design** for all screen sizes
- **Zero dependencies** — pure HTML/CSS/JS
- **Print-friendly** styles for offline reference

## Deploying to GitHub Pages

### Step 1: Create a GitHub Account (if you do not have one)

1. Go to github.com
2. Click "Sign Up" and follow the instructions
3. Verify your email address

### Step 2: Create a New Repository

1. Click the "+" button in the top-right corner of GitHub
2. Select "New repository"
3. Name it: `digital-confidence` (or any name you prefer)
4. Make sure "Public" is selected
5. Click "Create repository"

### Step 3: Upload the Files

**Option A: Using the GitHub website (easiest)**

1. On your new repository page, click "uploading an existing file"
2. Drag and drop ALL files and folders from this project into the upload area
3. Click "Commit changes"

**Option B: Using Git from the command line**

```bash
cd digital-confidence
git init
git add .
git commit -m "Initial commit - complete website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/digital-confidence.git
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (the gear icon tab)
3. In the left sidebar, click "Pages"
4. Under "Source," select "Deploy from a branch"
5. Under "Branch," select "main" and leave the folder as "/ (root)"
6. Click "Save"
7. Wait 2-3 minutes, then refresh the page
8. You will see a green box with your live website URL (like: `https://your-username.github.io/digital-confidence/`)

### Step 5: (Optional) Add a Custom Domain

If you want a custom domain like `digitalconfidence.ca`:

1. Buy a domain from a registrar (like Namecheap or GoDaddy)
2. In your GitHub repository Settings > Pages, enter your custom domain
3. At your domain registrar, add these DNS records:
   - Type: CNAME, Name: www, Value: `your-username.github.io`
   - Type: A, Name: @, Value: `185.199.108.153`
   - Type: A, Name: @, Value: `185.199.109.153`
   - Type: A, Name: @, Value: `185.199.110.153`
   - Type: A, Name: @, Value: `185.199.111.153`
4. Create a file called `CNAME` in your repository root containing your domain name

### Step 6: (Optional) Cloudflare Integration

For faster loading and additional security:

1. Create a free Cloudflare account at cloudflare.com
2. Add your custom domain to Cloudflare
3. Update your domain registrar's nameservers to the ones Cloudflare provides
4. In Cloudflare, enable "Always Use HTTPS" and "Auto Minify"
5. Set caching to "Standard"

## Updating Content Later

To update content after deployment:

1. Go to your repository on GitHub
2. Navigate to the file you want to edit
3. Click the pencil icon (Edit)
4. Make your changes
5. Click "Commit changes"
6. Your live site will update automatically within a few minutes

## File Structure

```
digital-confidence/
├── index.html          Home page with module overview
├── module-1.html       Mastering the Escape Hatch
├── module-2.html       The Security Shield (scams)
├── module-3.html       Passwords & Biometrics
├── module-4.html       App Store Safety
├── module-5.html       Email & Messages
├── module-6.html       Banking & Transactions
├── module-7.html       Photos & Creative Joy
├── module-8.html       Helping Family Stay Connected
├── resources.html      Local & Ontario Resources
├── scam-simulator.html Interactive Scam Training
├── css/
│   ├── main.css        Core styles & design system
│   ├── accessibility.css Font sizing & dark mode
│   └── mobile.css      Responsive breakpoints
├── js/
│   ├── app.js          Navigation & sidebar
│   ├── accessibility.js Theme & font controls
│   ├── progress.js     Checkbox persistence
│   ├── setup-wizard.js Device setup wizard
│   ├── city-resources.js City resource data
│   └── scam-quiz.js    Interactive quiz engine
└── README.md           This file
```

## Privacy

This website collects no personal data. All user preferences (font size, theme, progress checkboxes, device profile, and city selection) are stored in the browser's LocalStorage on the user's own device and are never transmitted anywhere.

## Licence

This content is free to use for personal and educational purposes.
