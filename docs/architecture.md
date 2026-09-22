# Architecture

## Rendering model

Fully static. Every route prerenders to HTML at build time. There are no route
handlers, no server actions, no middleware, no database, and no authentication.

`npm run build` must list every route as `○ (Static)`:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /robots.txt
└ ○ /sitemap.xml
```

If a route stops being static, treat it as a regression and find out why —
reading `cookies()`, `headers()`, or `searchParams` in a Server Component will
do it, and so will adding middleware. Middleware in particular is incompatible
with the nonce-free CSP described in [Security](./security.md); read that
before reaching for it.

Only two components are client components, and both for a concrete reason:

| Component        | Why it's `"use client"`                                     |
| ---------------- | ----------------------------------------------------------- |
| `SiteHeader`     | Scroll state, hover mega-menu, mobile menu toggle, body lock |
| `Reveal`         | `IntersectionObserver` for scroll-triggered entrances       |
| `ShowreelPlayer` | Play/pause and aspect-ratio state in the hero reel          |

Everything else renders on the server.

## File layout

```
src/
  components/
    ui/                     Button.tsx, Marks.tsx, Reveal.tsx
    layout/                 SiteHeader.tsx, SiteFooter.tsx
    sections/               (empty — see below)
  lib/
    content/                home.ts, navigation.ts, types.ts
    site-url.ts             Absolute base URL resolution
  app/
    (home)/
      _components/          The seven portfolio sections
      page.tsx
    globals.css             Design tokens, keyframes, base styles
    layout.tsx              Fonts, metadata, skip link, header/footer
    error.tsx               Route error boundary
    not-found.tsx           404
    icon.svg                Favicon — the navbar logomark
    robots.ts               Generated robots.txt
    sitemap.ts              Generated sitemap.xml
docs/                       This folder
```

`(home)` is a route group — parenthesised segments are dropped from the URL, so
`(home)/page.tsx` serves `/`. It exists so the landing page can own a
`_components/` folder without that folder sitting loose in `app/`.

`layout.tsx`, `error.tsx`, `not-found.tsx`, `robots.ts`, and `sitemap.ts` stay
at the `app/` root rather than inside `(home)`, because each applies to
whatever segment it sits in and the root ones need to apply everywhere.

### Why `sections/` is empty

The component placement rule: a component lives beside the route that owns it,
in that route's `_components/`, until a **second** route needs it. Only then
does it move to `src/components/`. This site has one content route, so all nine
sections are route-local. The folder exists so the destination is obvious when
that changes.

`src/components/` must never import from `src/app/` — that dependency only ever
runs the other way.

### Imports

Cross-folder imports go through the `@/*` alias
(`@/components/ui/Button`, `@/lib/content/home`); imports within a route's own
folder stay relative (`./_components/Hero`). That distinction lets an import
line tell you at a glance whether it reaches outside the route.

## Component map

The portfolio page composes seven sections in order:

| Section          | Anchor      | Notes                                              |
| ---------------- | ----------- | -------------------------------------------------- |
| `Hero`           | `#reel`     | Owns the page's single `<h1>`; renders `ShowreelPlayer` |
| `ClientMarquee`  | —           | Infinite client-logo marquee                       |
| `Work`           | `#work`     | Project grid — 3 columns at `lg`                   |
| `Services`       | `#services` | 2×2 practice areas plus a wide stats callout       |
| `Process`        | `#process`  | Dark band — the ink/paper swap; ordered `<ol>`     |
| `Testimonials`   | `#clients`  | Three quote cards                                  |
| `ContactCta`     | `#contact`  | Gradient closing band with `mailto:` actions       |

`#reel` sits on the showreel wrapper inside `Hero` rather than on the section
itself, so the "Showreel" link lands on the player rather than the top of the
page.

Every nav target is an in-page anchor today; when a target becomes a real
route, only `src/lib/content/navigation.ts` changes.

## Data flow

There is no runtime data flow. Every value on the page is a module-scope
constant in `src/lib/content/`, imported directly by the component that renders
it. Nothing fetches, nothing revalidates, nothing is passed through context.

`ShowreelPlayer` holds small pieces of local UI state (play/pause, selected
aspect ratio). That state never leaves the component.

Contact actions are `mailto:` links, not a form. That is what keeps the site
free of route handlers and keeps `form-action 'self'` and `connect-src 'self'`
honest in the CSP. Adding a real contact form means revisiting both — see
[Security](./security.md).

## Accessibility

Verified on every route:

- One `<h1>` per page — the hero's. Section headings are `<h2>`, card titles `<h3>`.
- Exactly one `header`, `main`, `footer`; `nav` landmarks are labelled
  (`Main`, `Mobile`, `Footer`).
- Skip-to-content link is the first focusable element, targeting `#main`.
- Sections are labelled with `aria-labelledby` pointing at their own heading.
- Decorative SVG, gradient blobs, avatar swatches, project tints, and the
  timeline tracks are `aria-hidden`; icon-only buttons carry an `sr-only` label.
- The process steps are an ordered `<ol>`, since the sequence carries meaning.
- The duplicated marquee pass is `aria-hidden` so screen readers hear the list once.
- Toggle buttons expose `aria-pressed`; the mobile menu button uses
  `aria-expanded` + `aria-controls`.
- `:focus-visible` is styled globally in `globals.css`.
- All motion collapses under `prefers-reduced-motion: reduce`.

`aria-current="page"` is not set on any nav link yet — every link is an in-page
anchor, so no link is a "current page". Add it with the second route.

## Adding a route

See the checklist in [Content guide](./content-guide.md#adding-a-page).
