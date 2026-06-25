# Aadhitya S — Developer Portfolio ✨

A clean, fast, and accessible personal developer portfolio built with TypeScript, React (Vite), and Tailwind CSS. It showcases projects, technical skills, and contact details in a responsive layout optimized for performance and clarity.

---

## Live demo
(If you deploy this repository, paste the URL here.)

![Screenshot placeholder](./screenshot.png)
*Replace ./screenshot.png with an actual screenshot of the site for best presentation.*

---

## Highlights
- Modern frontend: React + TypeScript + Vite for a snappy dev experience and fast builds
- Utility-first styling with Tailwind CSS + PostCSS for consistent, responsive layouts
- Small dependency surface: lightweight and easy to maintain
- Single Page App routing ready (see `_redirects` for Netlify-style routing)

---

## Tech stack
- Language: TypeScript
- Framework / bundler: React 18 + Vite
- Styling: Tailwind CSS, PostCSS, autoprefixer
- Icons: lucide-react
- Tooling: Vite, TypeScript, ESLint (script present)

Key dependencies: lucide-react, react, react-dom
Key dev-dependencies: @vitejs/plugin-react, tailwindcss, postcss, autoprefixer, typescript, vite

---

## Project structure (top-level)
```
.
├─ Portfolio.tsx        # Main React component — the portfolio UI and pages
├─ main.tsx             # App entry: mounts <Portfolio /> into #root
├─ index.html           # Vite HTML template & meta
├─ index.css            # Tailwind entry (imports base/components/utilities)
├─ tailwind.config.js   # Tailwind content paths & config
├─ postcss.config.js    # PostCSS setup (tailwindcss + autoprefixer)
├─ vite.config.ts       # Vite config (dev server port 5174)
├─ package.json         # Scripts: dev, build, preview, lint
├─ _redirects           # SPA redirect rules (Netlify) — optional for deploys
├─ tsconfig*.json       # TypeScript configuration
└─ README.md            # This file
```

How it fits together:
- Vite serves the app and builds a production bundle.
- main.tsx mounts the Portfolio React component which renders the whole site.
- Tailwind is compiled via PostCSS and used through index.css.
- The app is a single-page React app; routing and navigation live inside Portfolio.tsx (or components it uses).

---

## Getting started (local)
Prerequisites: Node.js (recommended v18+), npm

Install and run locally:
```bash
# 1. Install
npm install

# 2. Start dev server
npm run dev
# then open http://localhost:5174

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview

# 5. Lint (if you add eslint config)
npm run lint
```

Notes:
- Vite dev server uses port 5174 (see vite.config.ts).
- Tailwind’s content paths are set in tailwind.config.js to pick up top-level files.

---

## Deployment
- Recommended: Vercel or Netlify for zero-config deployments from the main branch.
- If deploying to Netlify, the `_redirects` file is included for SPA fallback routing — keep it in the publish directory.
- For Vercel, default settings work; just set the framework to "Vite" (or let Vercel auto-detect). Build command: npm run build, Output directory: dist

---

## Customization & Content
- Edit Portfolio.tsx to update your projects, experience, and contact details.
- Styling: modify classes in the JSX or extend Tailwind in tailwind.config.js.
- Add images/screenshots in a /public or /assets folder and reference them from the Portfolio component.

---

## Accessibility & Performance
- The project is structured for performance with Vite and Tailwind. Consider:
  - Adding meaningful alt text to all images
  - Ensuring semantic HTML in Portfolio.tsx
  - Auditing with Lighthouse and fixing any high-priority accessibility issues

---

## Contributing
- Small tweaks and improvements welcome — open an issue first if you plan major changes.
- Fork, create a feature branch, and make a PR with a clear description of the change.
- Keep changes focused (styling, content, or small behavior fixes per PR).

---

## What’s missing / Suggestions
- Add a LICENSE file (MIT is common for personal portfolios).
- Add a screenshot (./screenshot.png) for GitHub preview.
- Add a small CI workflow or GitHub Pages/Vercel badge once deployed.
- Consider a contact form or GitHub Actions to validate links before deploy.

---

## Contact
- GitHub: https://github.com/AadhityaS-2124
- (Add email or social links here if you want them displayed)

---

## Acknowledgements
Thanks to the open-source ecosystem: Vite, React, Tailwind CSS, and lucide-react.

---

## Try asking
- How can I add a dark mode toggle and persist the user’s preference in Portfolio.tsx?
- Can you suggest Tailwind utilities or a small component structure for a projects grid inside Portfolio.tsx?
- What changes are needed in tailwind.config.js and _redirects if I deploy this on Netlify vs Vercel?
