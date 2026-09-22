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

| Export          | Renders in       |
| --------------- | ---------------- |
| `hero`          | `Hero`           |
| `showreel`      | `ShowreelPlayer` |
| `clientMarquee` | `ClientMarquee`  |
| `work`          | `Work`           |
| `services`      | `Services`       |
| `process`       | `Process`        |
| `testimonials`  | `Testimonials`   |
| `contact`       | `ContactCta`     |

### Fields that are not plain copy

A few fields hold Tailwind class names rather than text, because the design
varies per item:

- `tint` / `ink` on `work.items`, `testimonials.items`, and `showreel.tracks` —
  use existing token utilities (`gradient-brand`, `bg-accent-cyan`,
  `text-inverse-on-surface`). Don't put a raw hex value here; it bypasses the
  token system.
- `start` / `width` on `showreel.tracks` are percentages of the timeline width,
  positioning each clip bar on its track.
- `glyph` on services — a `GlyphId`, which must match a key in
  `src/components/ui/Marks.tsx`. Adding an icon means adding it to both the
  `GlyphId` union in `src/lib/content/types.ts` and the `paths` record in
  `Marks.tsx`; TypeScript will fail the build if they drift.

### Project stills

`work.items[].tint` currently paints a flat gradient or colour where a poster
frame belongs. When real stills are cleared for use, replace the tinted `div`
in `Work.tsx` with `next/image` — and note that remote image hosts need adding
to `img-src` in the CSP, which is `'self' data: blob:` today.

### Contact details

`contact.email` drives every call-to-action in `ContactCta` — both buttons and
the address line are `mailto:` links built from that one value. There is no
form, which is what keeps the site free of route handlers.

## Placeholders that must be replaced

Everything below is fictional and exists only so the page has something to
render. None of it should survive to production:

Everything below is invented and exists only so the page has something to
render. **This is the blocking pre-launch item** — a studio portfolio that
presents invented client work as real is a misrepresentation, not a cosmetic
placeholder.

| What                                   | Where                                 |
| -------------------------------------- | ------------------------------------- |
| Client names in the marquee             | `home.ts` → `clientMarquee.clients`   |
| Every project, client, runtime and year | `home.ts` → `work.items`              |
| Testimonial quotes, names, roles        | `home.ts` → `testimonials.items`      |
| Studio figures (140+, 12 years, 1 yr)   | `home.ts` → `process.stats`           |
| Turnaround figures (5 days, 140+)       | `home.ts` → `services.callout.stats`  |
| Turnaround claim in the hero footnote   | `home.ts` → `hero.footnote`           |
| Booking availability in the hero eyebrow| `home.ts` → `hero.eyebrow`            |
| Contact email and location              | `home.ts` → `contact`                 |
| Showreel title and runtime              | `home.ts` → `showreel`                |

The footer carries a standing disclaimer
(`navigation.ts` → `footerDisclaimer`) stating the portfolio pieces are
placeholders. Remove it only once the table above is fully resolved — and
remove it *because* the work is real, not to make the page look finished.

## Adding a page

1. Create `src/app/<route>/` with its own `_components/` folder beside
   `page.tsx`. Route-owned sections start there, not in `src/components/`.
2. Create `src/lib/content/<route>.ts` and write the copy there **first**, then
   build the components against it. Retrofitting this later is much more work.
3. Add the route to the nav in `src/lib/content/navigation.ts`. Entries are
   currently in-page anchors (`#work`); a real route uses a path (`/work`).
4. Add the route to `src/app/sitemap.ts`.
5. Once a link points at a real path rather than an anchor, set
   `aria-current="page"` on the active link in `SiteHeader` — the site has no
   active state today because every link is an anchor.
6. If a section is now needed by two routes, move it from `_components/` into
   `src/components/sections/` and update both imports.
7. Run `npm run build` and confirm the new route lists as `○ (Static)`.
