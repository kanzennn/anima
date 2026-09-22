# Anima — Documentation

Reference documentation for the Anima marketing site. The project
[README](../README.md) covers install and scripts; these pages cover how the
thing actually works and why it is built the way it is.

This project follows the workspace-wide
[Next.js frontend architecture standard](../../docs/nextjs-architecture-standard.md).
Anything structural that isn't described here is described there.

## Contents

| Document                            | Read it when                                                  |
| ----------------------------------- | ------------------------------------------------------------- |
| [Architecture](./architecture.md)   | Finding your way around the codebase, or adding a route       |
| [Design system](./design-system.md) | Styling anything — tokens, type scale, colour roles           |
| [Animations](./animations.md)       | Touching the reveal system, marquees, or the editor mock      |
| [Content guide](./content-guide.md) | Changing copy, pricing, templates, or navigation              |
| [Deployment](./deployment.md)       | Shipping, configuring the domain, or debugging a bad deploy   |
| [Security](./security.md)           | Reviewing headers or the CSP rationale                        |

## The short version

A **fully static** Next.js 16 portfolio site for Anima, a post-production
studio — editorial, colour, sound, and delivery. Every route prerenders to HTML
at build time — no database, no route handlers, no server actions, no
authentication. Copy lives in `src/lib/content/`, styling runs entirely on
Tailwind v4 theme tokens derived from [`DESIGN.md`](../DESIGN.md), and the
distinctive part of the build is a CSS-driven motion system whose cutting-room
visual language — timelines, playheads, track stacks — is also the studio's
subject matter.

The site is a single content route today. The structure is nonetheless the
full multi-route layout from the standard, so the second page costs nothing to
add.

## Conventions worth knowing up front

**Content is data, not markup.** Copy lives in `src/lib/content/`, one file per
page, not inside components. Edit it there and every consumer updates.

**Use semantic tokens, never raw values.** Write `bg-primary` and
`text-headline-lg` rather than `bg-[#170 8 2c]` or `text-[48px]`, so a token
change propagates. Display sizes clamp internally, so one utility covers every
breakpoint — there are no `text-[34px] sm:text-headline-lg` pairs.

**`_`-prefixed folders are private.** A route's `_components/` folder is
excluded from routing by Next.js, which is why it can sit beside `page.tsx`
without becoming a URL.

**Animated elements use colour-alpha, not `opacity-*`.** `animation-fill-mode:
both` lets an animation's final `opacity: 1` override a separate opacity
utility once it settles. See [Animations](./animations.md#the-opacity-trap).

## Known trade-offs

These are deliberate, documented decisions rather than oversights:

- **CSP carries `script-src 'unsafe-inline'`** — required for the static
  prerender. [Rationale](./security.md#why-unsafe-inline-is-in-script-src).
- **Substitute display font** — the design's specified typeface is a
  commercial license. [Details](./design-system.md#fonts).
- **The showreel is a CSS mock, not video** — a looping master would outweigh
  the rest of the page. [Details](./animations.md#the-showreel-player).
- **Client names, projects, quotes, and figures are placeholders** — every one
  of them is invented and must be replaced before launch. Publishing invented
  client work as real is a misrepresentation, so this is the blocking item.
  [Details](./content-guide.md#placeholders-that-must-be-replaced).
- **`src/components/sections/` is empty** — the site has one content route, so
  its sections stay route-local until a second route needs them.
