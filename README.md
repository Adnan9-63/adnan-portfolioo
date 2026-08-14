# Md Adnan — Portfolio

Static portfolio site. Pure HTML/CSS/JS, no build step, styled with the Tailwind CDN.

## Structure
```
.
├── index.html      # markup
├── css/style.css   # all custom styles (extracted from the old inline <style>)
├── js/script.js    # cloud-cursor animation, hero transition, scroll-spy, reveal-on-scroll
└── README.md
```

## Run locally
Any static server works, e.g.:
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Push to GitHub
```bash
git init
git add .
git commit -m "Restructure portfolio into separate html/css/js"
git branch -M main
git remote add origin https://github.com/Adnan9-63/<your-repo-name>.git
git push -u origin main
```
(If the repo already exists and has history, skip `git init`/`git remote add` and just commit + push as usual.)

## Deploy on Vercel
1. Go to https://vercel.com/new
2. Import the GitHub repo you just pushed
3. Framework preset: **Other** (it's static — no build command, no output directory needed)
4. Click **Deploy**

Vercel will auto-redeploy on every push to `main`.

## Still TODO before shipping
Search the codebase for `TODO` comments — a few links are placeholders:
- Resume PDF link (header, right sidebar)
- ClassroomAI Monitor — demo video + GitHub repo links
- CampusGigs — live demo + GitHub repo links
- RookieCTF — writeups link
- Contact email in the footer
- Confirm the "AI Agent Security" Kaggle competition URL
