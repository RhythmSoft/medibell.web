# MediBell Website & Privacy Policy

This directory contains the official **Landing Page** and **Privacy Policy** for **MediBell: Pill Reminder Alarm**.

## Structure

```text
website/
├── index.html            # Modern Landing Page (Features, Screenshots, FAQ, Trust badges)
├── privacy.html          # Dual-language Privacy Policy (English & हिंदी with tab switch)
├── privacy-policy.html   # Direct alias for Google Play Console compatibility
├── terms.html            # Terms of Service & Medical Disclaimer
├── style.css             # Responsive theme matching MediBell app colors (Dark & Light mode)
├── app.js                # Theme switcher, screenshot gallery, FAQ accordion, language switch
└── assets/               # App icons, feature graphic, and real phone screenshots
```

## How to Deploy (Free & Instant)

### Option 1: GitHub Pages (Recommended)
1. In your public repository (e.g. `RhythmSoft/medibell-privacy`):
   - Copy all files from this `website/` directory into that repository.
   - Commit and push to `main`.
2. Go to repository **Settings → Pages**:
   - Build and deployment: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
   - Click **Save**.
3. Your live URLs:
   - **Website / Landing Page:** `https://<username>.github.io/medibell-privacy/`
   - **Privacy Policy:** `https://<username>.github.io/medibell-privacy/privacy.html`
   - **Terms:** `https://<username>.github.io/medibell-privacy/terms.html`

### Option 2: Vercel or Netlify
- Drag and drop this `website/` folder directly to [app.netlify.com/drop](https://app.netlify.com/drop) or deploy via Vercel for free custom SSL hosting in 10 seconds.

## Google Play Console Form Links
- **Store Listing → Website:** `https://<your-domain>/`
- **Policy → Privacy Policy:** `https://<your-domain>/privacy.html`

