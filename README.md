# Ashmita Nath — Portfolio

A personal portfolio built with React, TypeScript, Tailwind CSS v4, and Framer Motion.
It presents software engineering, data analytics, AI/ML, and UI/UX & frontend work as
four clearly separated categories, backed by real project data (no fabricated metrics,
clients, or testimonials).

## Tech stack

- **React 19 + TypeScript** — component structure
- **Vite** — dev server & build
- **Tailwind CSS v4** — styling, using the `@theme` token system for colors/fonts
- **Framer Motion** — scroll reveals, hover motion, modal transitions
- **lucide-react** — iconography (GitHub/LinkedIn marks are custom inline SVGs, since
  recent lucide-react versions dropped brand icons)

## Project structure

```
src/
  components/       UI components (Navbar, Hero, project sections, etc.)
  data/
    projects.ts     Single source of truth for all project content
  hooks/
    useReducedMotion.ts
  index.css         Design tokens (@theme), fonts, global styles
  App.tsx           Page composition
public/
  favicon.svg
```

To edit or add a project, update `src/data/projects.ts` — every card, filter, and
category section reads from that file.

## Content accuracy

All metrics, links, and achievements in this site come directly from information you
provided or your public GitHub profile — verified before this project was generated:

- Repos with a confirmed public URL (Indian-Stocks-Recommendation, career-guidance-system,
  AstroVenture-, Client-Web-Portfolio, Recipe-Cards, School-Management-System) link
  directly to GitHub.
- Projects without a public repo yet (SmartRoute, the CPU Cache Simulator, SmartCart)
  are labeled **"In development"** instead of guessing a URL.
- The 98.48% accuracy figure for the stock recommendation model is shown with a note
  that it's a reported result on the evaluation dataset, not a live-market guarantee.
- No fake GitHub stars, LeetCode rating, testimonials, or company logos are included.

**Before publishing**, double-check every fact still matches your current GitHub state —
especially once SmartRoute, the cache simulator, or SmartCart go public — and update
`src/data/projects.ts` accordingly.

## Still needed from you

- **Resume PDF**: the navbar's "Resume" button links to `/Ashmita-Nath-Resume.pdf`.
  Add that file to the `public/` folder (same name), or change the `href` in
  `src/components/Navbar.tsx`.
- **OG image**: `index.html` references `/og-image.png` for social link previews.
  Add a 1200×630 image to `public/` with that name, or remove the tag.
- **Canonical URL**: `index.html` uses a placeholder `https://ashmita-nath.dev/` —
  replace with your real deployed domain once you have one.

## Run locally

```bash
npm install
npm run dev       # starts a local dev server (default: http://localhost:5173)
```

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally to sanity-check it
```

## Deploy

The `dist/` folder is static and can be deployed anywhere that serves static files —
Vercel, Netlify, GitHub Pages, or Cloudflare Pages all work well with zero config
beyond pointing the build command to `npm run build` and the output directory to `dist`.

## Push this project to GitHub

If you're creating a **new** repository for the portfolio:

```bash
git init
git add .
git commit -m "Initial commit: Ashmita Nath portfolio"
git branch -M main
git remote add origin https://github.com/Ashmita-Nath/<your-new-repo-name>.git
git push -u origin main
```

Replace `<your-new-repo-name>` with the repository you create on GitHub — this project
does not assume or invent a repository name for you.

If you already have a repository you want to connect to, and it already contains
history you don't want to lose, don't run `git push -u origin main` blindly — first
run `git remote add origin <url>` then `git pull origin main --allow-unrelated-histories`
to merge safely, resolve any conflicts, and only then push.

Git will prompt for your GitHub credentials (or use the GitHub CLI: `gh auth login`)
when you push — no tokens or credentials are stored in this project.

## Updating projects later

Everything project-related lives in `src/data/projects.ts` as a typed array. To add a
new project, add a new object to the `projects` array with the same shape; to feature
it on the homepage, add its `id` to `featuredIds`.
