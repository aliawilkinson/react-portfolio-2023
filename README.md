# Alia Wilkinson — Portfolio

Personal portfolio site built with React, Vite, Framer Motion, and SCSS Modules.

**Live site:** [aliawilkinson.com](https://aliawilkinson.com)

## Quick start

```powershell
.\dev.ps1
```

Opens the app at **http://localhost:5173** automatically. Checks your Node version, installs deps if needed, then starts the dev server.

> If you get PowerShell profile errors, run with: `powershell -NoProfile -File dev.ps1`

---

## Tech Stack

| Layer | Package | Version |
|---|---|---|
| UI | React | 18.3.1 |
| Routing | react-router-dom | 6.30.3 |
| Animation | framer-motion | 8.5.5 |
| Styling | SCSS Modules + sass | 1.99.0 |
| Build | Vite | 8.0.12 |
| Icons | react-icons | 4.12.0 |
| Slider | react-slick | 0.31.0 |
| HTML parsing | html-react-parser | 6.1.0 |
| HTTP | axios | 1.16.0 |
| Node (local) | Node.js | 24.15.0 (LTS) |
| Node (Vercel) | Node.js | 24.x |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) v24 (LTS) — install via [nvm](https://github.com/coreybutler/nvm-windows) (Windows) or [nvm-sh](https://github.com/nvm-sh/nvm) (Mac/Linux)
- [Git](https://git-scm.com/downloads)

If you use nvm, the `.nvmrc` file pins the version — just run:

```bash
nvm install   # installs 24.15.0 if not already present
nvm use       # switches to it
```

### Install and run locally

```bash
git clone https://github.com/aliawilkinson/react-portfolio-2023.git
cd react-portfolio-2023
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other commands

```bash
npm run build      # production build → output in ./dist
npm run preview    # preview the production build locally
```

---

## Project Structure

```
src/
  components/       # one folder per component, co-located with its SCSS module
  hooks/            # useHeaderShadow, useOutsideAlerter
  utils/
    data.js         # work experience, testimonials, expertise — edit content here
    posts.js        # case study and about page content (HTML strings)
    motion.js       # Framer Motion animation variants
  styles/           # global styles, SCSS constants, utility classes
  App.jsx           # route definitions
  main.jsx          # entry point
public/             # static assets (images, portrait, cert logo)
```

---

## Deployment (Vercel)

The site deploys automatically to Vercel on every push to `main` via GitHub Actions (`.github/workflows/deploy.yml`). Pull requests get a preview deploy automatically.

Vercel is configured via `vercel.json` to use Vite as the framework and `dist` as the output directory. **Node version is set in the Vercel dashboard** under Project Settings → General → Node.js Version → select **24.x**.

### First-time GitHub Actions setup

You need three secrets in your GitHub repo under **Settings → Secrets and variables → Actions**:

| Secret | Where to find it |
|---|---|
| `VERCEL_TOKEN` | vercel.com → Settings → Tokens → Create |
| `VERCEL_ORG_ID` | Run `npx vercel link` in the project root → check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Same `.vercel/project.json` after linking |

```bash
# one-time local setup to get org/project IDs
npx vercel link
cat .vercel/project.json
```

Add `.vercel/` to `.gitignore` — don't commit those IDs.

---

## External CDN links (referenced in index.html)

- **Font:** [Eudoxus Sans](https://stijndv.com/fonts/Eudoxus-Sans.css)
- **Slick carousel CSS:**
  - `https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css`
  - `https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css`

---

## What changed in the 2026 refactor

See [CHANGELOG.md](./CHANGELOG.md) for the full list. Summary:

- Header/Footer lifted to `App.jsx` — no longer duplicated per route
- Mobile menu toggle changed from `div` to accessible `button` with `aria-label`
- All images have descriptive `alt` attributes
- Progress bar dots in Experience now driven by data instead of hardcoded
- Dead imports, dead exports, and unused packages removed
- Inline styles moved to SCSS modules
- `@import` → `@use` across all SCSS files (Dart Sass 3.0 compatibility)
- Dependencies updated to latest stable versions within current major versions
- Node pinned to 24 LTS across local (`.nvmrc`), CI (GitHub Actions), and Vercel (`vercel.json`)
