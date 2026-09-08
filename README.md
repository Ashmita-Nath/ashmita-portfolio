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


## Live demo : [https://ashmita-portfolio-iota.vercel.app]

