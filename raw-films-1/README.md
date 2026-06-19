# RAW FILMS — Cinematic Wedding Photography Website

A production-ready React + Vite + Tailwind CSS website for RAW FILMS, a cinematic wedding photography and filmmaking studio based in Kozhikode, Kerala.

---

## Tech Stack

- **React 18** with lazy-loaded routes
- **Vite 5** (fast build, code splitting)
- **Framer Motion** (animations)
- **GSAP + Lenis** (smooth scroll)
- **Tailwind CSS 3** (utility classes)
- **React Router DOM 6** (client-side routing)
- **React Helmet Async** (SEO meta tags)

---

## Project Structure

```
raw-films/
├── public/
│   ├── _headers        ← Security headers (Netlify/Cloudflare)
│   ├── _redirects      ← SPA fallback (Netlify)
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/     ← Reusable UI components
│   ├── pages/          ← Route-level page components
│   ├── layouts/        ← MainLayout (Navbar + Footer)
│   ├── routes/         ← AppRoutes (lazy-loaded)
│   ├── data/           ← Static content (stories, gallery, testimonials)
│   ├── hooks/          ← Custom React hooks
│   ├── utils/          ← GSAP/Lenis animation helpers
│   ├── styles/         ← Global CSS
│   ├── index.css       ← Tailwind + CSS variables
│   └── main.jsx        ← App entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Deployment

### Vercel (Recommended — vercel.json included)
1. Push this project to GitHub (a remote is already configured: `samithk07/raw-films`)
2. Go to vercel.com → **Add New Project** → import the repo
3. Framework preset: **Vite** (auto-detected via `vercel.json`)
4. Build command: `npm run build` · Output directory: `dist` (already set in `vercel.json`)
5. `vercel.json` handles SPA routing (all routes → `index.html`) and security headers automatically — no manual config needed
6. (Optional) Under **Settings → Environment Variables**, add the three `VITE_EMAILJS_*` vars from `.env.example` if you want to manage the contact-form credentials outside of source control. The project also works out of the box without this step.
7. Deploy

### Netlify
1. Push to GitHub
2. Connect repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. The `public/_redirects` file handles SPA routing automatically
6. The `public/_headers` file sets security headers automatically

### Cloudflare Pages
1. Build command: `npm run build`
2. Output directory: `dist`
3. `_headers` file in `public/` is respected automatically

---

## Security Features

- **X-Frame-Options: DENY** — Prevents clickjacking
- **X-Content-Type-Options: nosniff** — Prevents MIME sniffing
- **Strict-Transport-Security** — Forces HTTPS
- **Content-Security-Policy** — Restricts resource origins
- **Referrer-Policy** — Controls referrer leakage
- **Permissions-Policy** — Disables unused browser APIs

---

## Mobile-First Design

- Custom cursor disabled on touch devices
- Hamburger menu with body scroll lock
- All grid layouts collapse to single column on mobile
- `clamp()` fluid typography throughout
- Tap-friendly button sizes (min 44px tap target)

---

## Before going live — content to check

A few entries in the demo data are placeholders and should be swapped for real content before launch:

- **`src/data/films.js`** — 5 of 6 entries (`Waves and Whispers`, `Mist and Moonlight`, `A Santorini Dream`, `Letters to Forever`, `Golden Hour Vows`) reference video/poster files (`/videos/waves-whispers.mp4`, `/images/films/*-poster.jpg`, etc.) that don't exist in `public/`. Add the real files at those paths, or update the entries to point at films you do have.
- **`src/data/stories.js`** — all four stories currently use placeholder couple names/copy (Ananya & Arjun, Meera & Rahul, etc.). Replace with real client stories.
- **`public/og-image.jpg`** and **`public/images/hero-poster.jpg`** were missing and have been auto-generated from an existing photo in your gallery as a placeholder — swap in a proper branded image when you have one.
- **`public/robots.txt`** / **`public/sitemap.xml`** reference `https://rawfilms.in` — update both files if your final domain is different.

## Fixes applied for deployment

- Added `vercel.json` (SPA rewrites + security headers — Vercel doesn't read Netlify's `_headers`/`_redirects` files)
- Fixed a path bug in `src/data/instagram.js`, `stories.js`, and `films.js` where image/video paths were written as `public/images/...` instead of `/images/...` — this broke loading on every route (Vite serves the `public/` folder's contents from the site root)
- Fixed the Content-Security-Policy `connect-src` directive, which was blocking the EmailJS contact form's network request (`https://api.emailjs.com`)
- Moved EmailJS credentials to environment variables (`VITE_EMAILJS_*`, see `.env.example`) with the existing values kept as fallback defaults so nothing breaks if env vars aren't set
- Did a clean `npm install` + `npm run build` to confirm the project builds with no errors

### Update contact details
Edit `src/components/Contact.jsx` — the `details` array and WhatsApp link.

### Update stories
Edit `src/data/stories.js`.

### Update gallery
Edit `src/data/gallery.js`.

### Update social links
Edit `src/components/Footer.jsx` — the `socials` array.
# raw-films
