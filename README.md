# Anima

Portfolio site for Anima, a post-production studio — editorial, colour, sound,
and delivery. A fully static Next.js app; every route prerenders to HTML at
build time.

> **Placeholder content.** The client names, projects, testimonials, and
> figures on this site are invented, and the showreel is a CSS mock rather than
> a real cut. Replace them before launch — see
> [docs/content-guide.md](./docs/content-guide.md#placeholders-that-must-be-replaced).

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4 — tokens in `globals.css`, no `tailwind.config.js`
- ESLint via `eslint-config-next`

No runtime dependencies beyond `next`, `react`, and `react-dom`.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on [http://localhost:3001](http://localhost:3001) — port
3000 belongs to `company-profile` in this workspace.

## Scripts

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `npm run dev`   | Dev server with Fast Refresh |
| `npm run build` | Production build             |
| `npm start`     | Serve the production build   |
| `npm run lint`  | ESLint                       |

## Structure

```
src/
  app/
    (home)/_components/   The seven portfolio sections
    (home)/page.tsx       /
    globals.css           Design tokens, keyframes, base styles
    layout.tsx            Fonts, metadata, skip link, chrome
    error.tsx             Error boundary
    not-found.tsx         404
    icon.svg              Favicon — the navbar logomark
    robots.ts             Generated robots.txt
    sitemap.ts            Generated sitemap.xml
  components/
    ui/                   Button, Marks, Reveal
    layout/               SiteHeader, SiteFooter
    sections/             Sections shared by 2+ routes (empty today)
  lib/
    content/              Site copy — one file per page
    site-url.ts           Absolute base URL resolution
docs/                     Full documentation
```

Copy lives in `src/lib/content/`, not in components. Styling uses semantic
Tailwind tokens, never raw values.

## Documentation

[**docs/README.md**](./docs/README.md) is the index — architecture, design
system, animations, content guide, deployment, and security.

Design tokens are derived from [`DESIGN.md`](./DESIGN.md) at the project root.
This project follows the workspace-wide
[Next.js architecture standard](../docs/nextjs-architecture-standard.md).
