# Design system

Every token in this project is derived from [`DESIGN.md`](../DESIGN.md) at the
project root, which records computed styles captured from a reference site.
That file is the source of truth for *values*; this file records how they are
*implemented*.

Tailwind v4, no `tailwind.config.js` — all tokens live in `@theme` blocks in
[`src/app/globals.css`](../src/app/globals.css).

**The rule:** always use semantic utilities, never raw values. `bg-primary`,
not `bg-[#17082c]`. `text-headline-lg`, not `text-[48px]`. A token change
should propagate everywhere without a find-and-replace, which only holds if
nothing bypasses the token.

## Colour

Roles were assigned by raw frequency across text, background, border, and
SVG-fill samples in the source capture.

### Surfaces

| Token               | Value                | Use                                          |
| ------------------- | -------------------- | -------------------------------------------- |
| `surface`           | `rgb(242, 241, 243)` | Default page background — a light warm grey, not white |
| `surface-container` | `rgb(229, 228, 231)` | Secondary groupings; doubles as `outline`    |
| `surface-bright`    | `rgb(255, 255, 255)` | White cards and alternating sections         |
| `inverse-surface`   | `rgb(25, 23, 28)`    | Dark bands — same value as `on-surface`      |

### Ink

| Token                        | Value                | Use                                |
| ---------------------------- | -------------------- | ---------------------------------- |
| `on-surface`                 | `rgb(25, 23, 28)`    | Workhorse text ink                 |
| `on-surface-variant`         | `rgb(110, 110, 115)` | Secondary / muted body text        |
| `on-surface-subtle`          | `rgb(151, 151, 155)` | Footnotes, eyebrow labels          |
| `inverse-on-surface`         | `rgb(255, 255, 255)` | Text on dark bands                 |
| `inverse-on-surface-variant` | `rgb(215, 215, 219)` | Muted text on dark bands only      |
| `outline`                    | `rgb(229, 228, 231)` | Borders and hairlines              |

The dominant text ink and the dark-section background are the **same value**,
so inverted sections read as a literal ink/paper swap rather than a separate
dark theme. There is no dark mode; `color-scheme: light` is set explicitly.

### Brand

| Token       | Value                | Use                                          |
| ----------- | -------------------- | -------------------------------------------- |
| `primary`   | `rgb(23, 8, 44)`     | Deep violet — brand-tinted emphasis          |
| `secondary` | `rgb(245, 255, 99)`  | Chartreuse — calls to action only            |

**Do** reserve `secondary` for a small number of high-intent actions per
screen. It appeared six times in the entire source capture; it is a "pop"
accent, not a base colour. In this build it is used for the primary CTA
button, the showreel format chip, the "Now playing" badge, one project tint,
and the footer logomark.

**Do** pair `on-secondary` (dark ink) with it, never white — white-on-lime
fails contrast.

### Low-confidence accents

`accent-violet`, `accent-cyan`, and `accent-lavender` each appeared once or
twice in the source capture. They are tokenised for completeness and used here
**decoratively only** — eyebrow labels, timeline bars, gradient blobs, avatar
swatches. Don't promote one to a brand role without checking the live
reference first.

### Gradients

Two utilities wrap the captured gradients, plus one derived wash:

| Utility               | Definition                                             |
| --------------------- | ------------------------------------------------------ |
| `gradient-brand`      | `rgb(20,7,38)` → `rgb(113,29,226)` — deep violet to vivid purple |
| `gradient-lavender`   | `rgb(169,129,255)` → `rgb(208,186,254)`                |
| `text-gradient-brand` | Three-stop horizontal, clipped to text                 |
| `wash-brand`          | Radial falloff to transparent, for the hero backdrop   |

`wash-brand` is not from the capture — it exists because a flat gradient on a
circle terminates on a visible edge. Radial, fading to
`rgba(242,241,243,0)`, it dissolves into the page surface instead.

## Fonts

| Role    | Family                                | Variable              |
| ------- | ------------------------------------- | --------------------- |
| Body/UI | Inter                                 | `--font-inter`        |
| Display | TWK Lausanne → **Inter Tight**        | `--font-display-alt`  |

**Substitution:** the design specifies TWK Lausanne, a commercial license that
can't be self-hosted here. `--font-display` lists it first and falls back to
Inter Tight, the closest available neo-grotesque. If the license is ever
purchased and the font self-hosted, the stack picks it up with no code change.

Both are loaded through `next/font/google`, which self-hosts them at build
time — that's why `font-src 'self'` in the CSP is sufficient.

## Type scale

Display sizes **clamp internally**, so one semantic utility covers every
breakpoint. There are deliberately no `text-[34px] sm:text-headline-lg` pairs
at call sites. The upper bound of each clamp is the size recorded in
`DESIGN.md`.

| Utility          | Size                       | Weight | Tracking | Use                     |
| ---------------- | -------------------------- | ------ | -------- | ----------------------- |
| `text-hero`      | `clamp(44px, 6.6vw, 80px)` | 700    | −1.5px   | `<h1>`, closing CTA     |
| `text-headline-lg` | `clamp(34px, 4vw, 48px)` | 700    | −0.36px  | Section `<h2>`          |
| `text-headline-md` | `clamp(28px, 3vw, 36px)` | 600    | −0.32px  | Mock canvas headline    |
| `text-headline-sm` | `24px`                   | 600    | −0.32px  | Card `<h3>`             |
| `text-quote`     | `22px`                     | 500    | −0.32px  | Pull-quotes, portrait monitor headline |
| `text-stat`      | `clamp(32px, 3.4vw, 44px)` | 700    | −1.5px   | Figures, step numbers   |
| `text-body-lg`   | `18px / 27px`              | 400    | —        | Section intros          |
| `text-body-md`   | `16px / 24px`              | 400    | —        | Body copy               |
| `text-body-sm`   | `14px / 20px`              | 400    | —        | Dense body, nav links   |
| `text-label-sm`  | `12px / 16.8px`            | 600    | −0.2px   | Chips, eyebrows, meta   |
| `text-button`    | `15px`                     | 600    | —        | All buttons             |

Letter-spacing is baked into each token, so applying `text-headline-lg` brings
its tracking along — don't add a `tracking-*` utility beside it.

Tracking trends tight and negative throughout, typical of a geometric sans at
display sizes. The one exception is the uppercase eyebrow label, which uses
positive `tracking-[0.12em]` — the standard case for widening.

## Radii

| Token          | Value    | Use                                    |
| -------------- | -------- | -------------------------------------- |
| `rounded-sm`   | `20px`   | Small controls, inner panels, chips    |
| `rounded-md`   | `40px`   | The dominant card/container radius     |
| `rounded-lg`   | `50px`   | Large pill-like containers             |
| `rounded-full` | `9999px` | Buttons, avatars, dots, badges         |

These **override** Tailwind's defaults for `sm`/`md`/`lg`, deliberately — the
design system's scale is much rounder than Tailwind's, and leaving the defaults
in place would make an accidental `rounded-lg` look wrong. All buttons use
`rounded-full`.

## Spacing

Gaps cluster around a handful of values rather than a strict base-8 grid:

| Token | Value  | Use                                |
| ----- | ------ | ---------------------------------- |
| `xs`  | `5px`  | Tight inline spacing               |
| `sm`  | `10px` | Small groupings                    |
| `md`  | `12px` | **The default gap** — most common  |
| `lg`  | `20px` | Medium groupings, card padding     |
| `xl`  | `50px` | Section-level separation           |

These sit alongside Tailwind's numeric scale, which is still available
(`gap-4`, `max-w-160`). Use the named tokens for component-internal rhythm and
the numeric scale for one-off layout widths.

## Elevation

Depth comes from soft, multi-layer, low-opacity shadows — never hard drops.

| Utility          | Use                                       |
| ---------------- | ----------------------------------------- |
| `shadow-lifted`  | 5-layer stack — the hero mock, featured plan |
| `shadow-raised`  | 4-layer stack — hover states, panels      |

**Don't** introduce `backdrop-filter` / glassmorphism. None was detected
anywhere in the source capture, so it isn't part of this visual language. The
build currently uses zero `backdrop-filter` declarations; keep it that way.

## Custom utilities

Declared with `@utility` in `globals.css`:

| Utility               | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| `container-page`      | Max-width 1320px, centred, 20px inline padding       |
| `gradient-brand`      | The captured hero gradient                           |
| `gradient-lavender`   | The captured secondary gradient                      |
| `text-gradient-brand` | Gradient clipped to text                             |
| `wash-brand`          | Radial brand wash                                    |
| `reveal` / `reveal-in`| Scroll-entrance pair — see [Animations](./animations.md) |
