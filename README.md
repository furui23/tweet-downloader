# XGrab — X/Twitter Media Downloader

A modern, glassmorphism-styled web app for downloading videos, images, and audio from X (Twitter) posts. Deployable on Netlify in one click.

## Features

- 🎬 Download tweets with **videos** (multiple quality options)
- 🖼️ Extract **images** from tweets
- 🎵 Save **audio** from tweets
- ✨ Modern dark UI with glassmorphism & gradient effects
- 📱 Fully responsive — works on mobile & desktop
- 🔒 No tracking, no login required
- 🚀 One-click Netlify deployment

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS + Tailwind CSS (CDN)
- **Backend:** Netlify Serverless Functions (Node.js)
- **Styling:** Custom glassmorphism + animated mesh gradient background
- **Deployment:** Netlify (free tier)

## Local Development

```bash
cd twitter-downloader
npm install
netlify dev
```

Open `http://localhost:8888` in your browser.

## Deploy to Netlify

### Option 1: One-Click Deploy

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
3. Select your repo → Deploy!

**Netlify config:**
- Build command: `echo "Skipping build for static site"`
- Publish directory: `public`

### Option 2: Netlify CLI

```bash
netlify login
netlify sites:create
netlify deploy --prod
```

## How It Works

1. User pastes a tweet URL (e.g., `https://x.com/user/status/12345`)
2. Frontend calls the Netlify serverless function `/api/fetch`
3. The function fetches media metadata from a third-party API
4. Results are displayed with download buttons
5. Clicking download opens the media URL in a new tab

## Project Structure

```
twitter-downloader/
├── public/
│   └── index.html          # Main UI (single-page app)
├── netlify/
│   └── functions/
│       └── fetch.js        # Serverless function for fetching tweet data
├── netlify.toml            # Netlify routing & headers config
├── package.json
└── README.md
```

## Notes

- This project uses a public third-party API for extracting tweet media. If the API changes or becomes unavailable, the `netlify/functions/fetch.js` may need updating.
- Twitter/X rate limits and ToS apply — use responsibly.
- For production use, consider using the official Twitter API or a more robust backend service.

## License

MIT
