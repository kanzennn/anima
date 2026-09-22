# Content guide

All copy lives in `src/lib/content/`, one file per page. Components import from
the specific file — there is deliberately **no barrel `index.ts`**, so the
import line itself says where the copy comes from.

Editing copy should never mean opening a component.

## Which file to edit

| I want to change…                              | Edit                          |
| ---------------------------------------------- | ----------------------------- |
| Anything on the landing page                   | `src/lib/content/home.ts`     |
| Header nav, mega-menu, footer columns, legal links | `src/lib/content/navigation.ts` |
| The site name / wordmark                       | `src/lib/content/navigation.ts` (`siteName`) |
| Page title, description, Open Graph, Twitter card | `src/app/layout.tsx`       |
| 404 or error-page wording                      | `src/app/not-found.tsx`, `src/app/error.tsx` |
| The production domain                          | `src/lib/site-url.ts`         |

## Inside `home.ts`

One export per section, named after it:

| Export            | Renders in          |
| ----------------- | ------------------- |
| `hero`            | `Hero`              |
| `editorMock`      | `EditorMock`        |
| `customerMarquee` | `LogoMarquee`       |
| `features`        | `Features`          |
| `templates`       | `TemplateGallery`   |
| `resize`          | `ResizeShowcase`    |
| `teams`           | `TeamsSection`      |
| `testimonials`    | `Testimonials`      |
| `pricing`         | `Pricing`           |
| `cta`             | `CtaBand`           |

### Fields that are not plain copy

A few fields hold Tailwind class names rather than text, because the design
varies per item:

- `tint` / `ink` on templates, testimonials, and mock layers — use existing
  token utilities (`gradient-brand`, `bg-accent-cyan`, `text-inverse-on-surface`).
  Don't put a raw hex value here; it bypasses the token system.
- `box` on `resize.panel.formats` — an aspect-ratio and width utility pair
  that gives each format thumbnail its shape.
- `glyph` on features — a `GlyphId`, which must match a key in
  `src/components/ui/Marks.tsx`. Adding an icon means adding it to both the
  `GlyphId` union in `src/lib/content/types.ts` and the `paths` record in
  `Marks.tsx`; TypeScript will fail the build if they drift.

### Prices

`pricing.plans[].monthly` and `.yearly` are numbers, or `null` for the
"Custom / Talk to sales" plan. The `null` case also switches that plan's button
to the `ghost` variant — if you give Enterprise a real price, revisit that
branch in `Pricing.tsx`.

## Placeholders that must be replaced

Everything below is fictional and exists only so the page has something to
render. None of it should survive to production:

| What                             | Where                                    |
| -------------------------------- | ---------------------------------------- |
| Customer names in the logo marquee | `home.ts` → `customerMarquee.customers` |
| Testimonial quotes, names, roles  | `home.ts` → `testimonials.items`         |
| Adoption figures (4.2×, 61%, 900+) | `home.ts` → `teams.stats`              |
| Export figures (38s, 14 formats)   | `home.ts` → `features.callout.stats`   |
| Template counts in prose           | `home.ts` → `templates.body`             |
| Pricing tiers and amounts          | `home.ts` → `pricing.plans`              |
| The production domain              | `src/lib/site-url.ts`                    |

The footer carries a standing disclaimer
(`navigation.ts` → `footerDisclaimer`) stating this is a demo build. Remove it
only once the placeholders above are gone.

## Adding a page

1. Create `src/app/<route>/` with its own `_components/` folder beside
   `page.tsx`. Route-owned sections start there, not in `src/components/`.
2. Create `src/lib/content/<route>.ts` and write the copy there **first**, then
   build the components against it. Retrofitting this later is much more work.
3. Add the route to the nav in `src/lib/content/navigation.ts`. Entries are
   currently in-page anchors (`#product`); a real route uses a path (`/pricing`).
4. Add the route to `src/app/sitemap.ts`.
5. Once a link points at a real path rather than an anchor, set
   `aria-current="page"` on the active link in `SiteHeader` — the site has no
   active state today because every link is an anchor.
6. If a section is now needed by two routes, move it from `_components/` into
   `src/components/sections/` and update both imports.
7. Run `npm run build` and confirm the new route lists as `○ (Static)`.
