---
version: alpha
name: Jitter
description: Design tokens extracted from computed styles captured on jitter.video (3,172 elements walked, rgb() color space only; 6 web components present — Shadow DOM content may be under-sampled).
colors:
  # --- Neutral surfaces (from topBackgroundColors) ---
  surface: "rgb(242, 241, 243)" # primary surface — most-used non-text color, count 252
  surface-container: "rgb(229, 228, 231)" # count 228 in backgrounds + 2 in borders — doubles as the border/outline color
  surface-bright: "rgb(255, 255, 255)" # count 127 in backgrounds; also count 69 in text (used as inverse-on-surface) and 4 in SVG fills
  inverse-surface: "{colors.on-surface}" # dark sections/footer — rgb(25, 23, 28), count 9 in backgrounds (same value as on-surface, ink/paper swap)

  # --- Text ink (from topTextColors) ---
  on-surface: "rgb(25, 23, 28)" # dominant text ink — most-used text color, count 2833
  on-surface-variant: "rgb(110, 110, 115)" # secondary/muted text, count 131
  on-surface-strong: "rgb(0, 0, 0)" # pure black, count 74 in text — highest-emphasis text, distinct from the softer on-surface ink
  on-surface-subtle: "rgb(151, 151, 155)" # count 3 in text — light utility/disabled-adjacent text
  inverse-on-surface: "{colors.surface-bright}" # white text on dark sections — count 69 in text
  inverse-on-surface-variant: "rgb(215, 215, 219)" # count 32 in text — muted text, only legible on the dark inverse-surface
  outline: "{colors.surface-container}" # borders — rgb(229, 228, 231), count 2 in topBorderColors

  # --- Brand (from cross-referencing topTextColors + topBackgroundColors) ---
  primary: "rgb(23, 8, 44)" # brand primary — highest-frequency chromatic (non-neutral) color site-wide, count 26 in text colors. Distinct from on-surface: low saturation but a clear violet hue (R23/G8/B44), used for brand-tinted headline emphasis rather than body ink.
  on-primary: "{colors.surface-bright}" # inferred for AA contrast against primary — not directly observed as a paired background/text value in the captured data
  secondary: "rgb(245, 255, 99)" # accent/CTA — count 6 in background colors, the only other chromatic color clearing the 3-occurrence confidence bar. Bright chartreuse, used sparingly, reads as a highlight/CTA fill rather than a base color.
  on-secondary: "{colors.on-surface}" # inferred for AA contrast against secondary (bright lime is too light for white text) — not directly observed

  # tertiary intentionally left undefined — no third chromatic color cleared the 3-occurrence confidence bar (see low-confidence entries below)

  # --- Icon fills (from topSvgFills; close to but distinct from the text/surface tones above) ---
  icon-default: "rgb(28, 27, 31)" # count 8 in SVG fills
  icon-muted: "rgb(195, 195, 198)" # count 19 in SVG fills

  # --- Low-confidence (fewer than 3 occurrences) — not assigned to primary/secondary/tertiary ---
  accent-violet: "rgb(122, 64, 237)" # low-confidence — verify on live site (count 1 in text colors; same family as the hero gradient stops below)
  accent-cyan: "rgb(1, 178, 253)" # low-confidence — verify on live site (count 2 in background colors)
  accent-lavender: "rgb(169, 129, 255)" # low-confidence — verify on live site (count 2 in background colors; also a gradient stop)
  icon-cyan: "rgb(0, 178, 255)" # low-confidence — verify on live site (count 1 in SVG fills)
typography:
  display-hero:
    fontFamily: "TWK Lausanne, sans-serif"
    fontSize: 80px # from fontSizesScale; 200px also appears but only once (likely a single decorative numeral) — treat 200px as low-confidence
    fontWeight: "700"
    letterSpacing: -1.5px # top letter-spacing value, count 32
  headline-lg:
    fontFamily: "TWK Lausanne, sans-serif"
    fontSize: 48px
    fontWeight: "700"
    letterSpacing: -0.36px # count 267, the single most common letter-spacing value site-wide
  headline-md:
    fontFamily: "TWK Lausanne, sans-serif"
    fontSize: 36px
    fontWeight: "600"
    letterSpacing: -0.32px # count 33
  body-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 27px # count 158
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px # count 125
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px # count 260
  label-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 16.8px # count 1918, by far the most common line-height on the page
    letterSpacing: -0.2px # count 261
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 15px
    fontWeight: "600"
    lineHeight: 0px # count 150 — fixed-height single-line controls (buttons/inputs) collapse line-height to 0
rounded:
  sm: 20px # count 13
  md: 40px # count 131
  lg: 50px # count 129
  full: 9999px # source value was 50%, count 117 — avatars, dots, circular icon badges (converted to px per spec: only px/rem/em units are valid for Dimension tokens)
spacing:
  xs: 5px # count 64
  sm: 10px # count 33
  md: 12px # count 242, the most common gap value
  lg: 20px # count 19
  xl: 50px # count 9
components:
  button-primary:
    backgroundColor: "{colors.secondary}" # lime CTA fill — count 6 in background colors
    textColor: "{colors.on-secondary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
  button-dark:
    backgroundColor: "{colors.inverse-surface}" # dark ink fill — count 9 in background colors
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.surface-bright}" # count 127 in backgrounds
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  card-container:
    backgroundColor: "{colors.surface-container}" # count 228 in backgrounds
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  icon-badge:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.full}"
---

## Brand & Style

Jitter's UI reads as a clean, editorial neutral-gray system (`surface` `rgb(242,241,243)`, ink `on-surface` `rgb(25,23,28)`) punctuated by two deliberate accents: a deep, low-saturation violet (`primary`, `rgb(23,8,44)`) used for brand-tinted emphasis, and a bright chartreuse (`secondary`, `rgb(245,255,99)`) reserved for calls to action. The dominant text ink and the rare dark-section background share the exact same value (`rgb(25,23,28)`), so inverted sections read as a literal ink/paper swap rather than a separate dark theme.

Two structural signals point at Jitter's identity as a motion-design tool rather than a generic SaaS marketing site: the page carries 109 defined `@keyframes`, including Radix-UI-style dialog primitives (`overlayShow`/`contentShow`/`slideDown`/`slideUp`), and its dominant transition timing functions aren't simple eases — they're `linear()` polyline approximations of spring physics (`cubic-bezier(0.25, 0.46, 0.45, 0.94)` chained with spring curves, count 129/114), plus a `view-transition-name: root` on the page root for animated navigation. Motion is not decorative here; it's the brand.

Note: `--tw-ring-offset-color: #fff` is the only brand-prefixed CSS custom property captured (Tailwind's focus-ring offset), and it resolves to the same white used for `surface-bright`. Two other color-related CSS variables exist on the page but their names/values weren't captured, so they aren't represented as tokens above.

## Colors

Roles are assigned by raw frequency across text, background, border, and SVG-fill samples (colors reused across categories were summed).

- **Surface (`rgb(242,241,243)`, count 252):** the default page background — a very light warm gray, not pure white.
- **Surface Container (`rgb(229,228,231)`, count 228 bg + 2 border):** cards, dividers, and hairline borders all draw from this one value — `outline` is a direct reference to it rather than a separate color.
- **Surface Bright (`rgb(255,255,255)`, count 127 bg / 69 text):** used both as a white card/section background and, on dark sections, as inverse text.
- **On-Surface (`rgb(25,23,28)`, count 2833):** the workhorse ink color for nearly all body and heading text; the same value reappears as `inverse-surface` on dark sections (count 9), confirming it's a deliberate near-black rather than pure black.
- **Primary — brand violet (`rgb(23,8,44)`, count 26 in text):** the highest-frequency chromatic color on the page. It sits close in hue to the hero gradient's dark stop (`rgb(20,7,38)`, see below), reinforcing that deep violet is the intentional brand hue, applied here as brand-tinted headline/emphasis text rather than a flat fill.
- **Secondary — accent lime (`rgb(245,255,99)`, count 6 in backgrounds):** a bright chartreuse used sparingly, almost certainly for CTA buttons or highlight chips. It clears the 3-occurrence confidence bar but is used far less often than the neutrals — treat it as a "pop" accent, not a base color.
- **Hero gradient (low-confidence — verify on live site):** two linear gradients were captured, each only once — `linear-gradient(rgb(20,7,38) 0%, rgb(113,29,226) 100%)` (deep violet → vivid purple) and `linear-gradient(rgb(169,129,255) 0%, rgb(208,186,254) 100%)` (light purple → lavender). Both reinforce the violet brand family but are too infrequent to promote to named tertiary/quaternary tokens.
- Colors appearing fewer than 3 times total (`accent-violet`, `accent-cyan`, `accent-lavender`, `icon-cyan`) are captured as tokens above for completeness but flagged low-confidence and excluded from primary/secondary/tertiary role assignment — they may be third-party widget bleed or one-off decorative elements rather than intentional system colors.

## Typography

**Inter** (count 2524) is the workhorse UI/body font. **"TWK Lausanne"** (count 639) is a distinct, deliberately-loaded display font reserved for headlines — its presence alongside an unusual `750` font-weight (alongside standard 400/600/700/800) strongly suggests it's used as a variable font, so intermediate weights should be treated as available, not just the four/five sampled.

Because font-family, size, weight, line-height, and letter-spacing were captured as independent frequency lists rather than as joint per-element tuples, the token combinations above are representative pairings inferred from the most common value in each list — verify exact pairings against live components before treating them as exact. The one exception is `label-sm`'s line-height (`16.8px`, count 1918): it is so dominant (by far the single most frequent line-height on the page) that it's almost certainly the default body/label line-height across the system. Letter-spacing throughout trends tight and negative (`-0.2px` to `-1.5px`), typical of a modern geometric sans at display sizes.

A 200px font size appears once in the captured scale and was treated as a low-confidence one-off (likely a single oversized decorative numeral) rather than promoted to a token — verify on the live site before relying on it.

## Layout & Spacing

Gaps cluster tightly around a handful of values rather than a strict base-8 grid: `12px` (count 242) dominates as the default flex/grid gap, with `5px` (count 64) as a tight inline spacing, `10px` (count 33) and `20px` (count 19) for medium groupings, and `50px` (count 9) for section-level separation. Treat `md` (12px) as the default spacing unit for component-internal gaps and `xl` (50px) for spacing between major page sections.

## Elevation & Depth

Jitter builds depth with soft, multi-layer drop shadows rather than blur/glassmorphism — no `backdrop-filter` or blend-mode usage was detected anywhere on the page. Two shadow stacks dominate, each appearing exactly 114 times (almost certainly a light/dark-mode or hover/rest pair for the same elevated-card treatment):

- `rgba(25,23,28,0) 0px 237px 66px 0px, rgba(25,23,28,0.01) 0px 152px 61px 0px, rgba(25,23,28,0.05) 0px 85px 51px 0px, rgba(25,23,28,0.09) 0px 38px 38px 0px, rgba(25,23,28,0.1) 0px 9px 21px 0px`
- `rgba(0,0,0,0.01) 0px 63px 25px 0px, rgba(0,0,0,0.05) 0px 35px 21px 0px, rgba(0,0,0,0.09) 0px 16px 16px 0px, rgba(0,0,0,0.1) 0px 4px 9px 0px`

Both are large, soft, and low-opacity — long shadow spreads with very low alpha at each layer — producing a gentle "lifted card" effect rather than a hard drop shadow. A separate thin white 1px-on-both-sides box-shadow (count 6) is used as a hairline edge/focus treatment rather than for depth.

## Shapes

Corner radii cluster at four values: `20px` (count 13, small controls), `40px` (count 131, the dominant card/container radius), `50px` (count 129, larger pill-like containers), and `50%` (count 117, fully circular avatars/badges/dots). A handful of asymmetric, very large radii (`375px`; `0px 0px 80px 80px`; `0px 50px 50px 0px`, each count 1) also appear — these read as one-off decorative blob/wave shapes rather than a reusable token and should be verified on the live site (2 `clip-path` usages were also detected, consistent with a small number of decorative cut-out shapes).

## Components

**Buttons** come in at least three treatments inferred from the background-color evidence: a lime `button-primary` for calls to action (the rare `rgb(245,255,99)` background), a dark `button-dark` using the inverse ink fill, and a transparent `button-ghost` for lower-emphasis actions. All should use the fully-rounded `{rounded.full}` radius given how frequently `50%`/`50px` radii appear relative to sharper corners.

**Cards and containers** split into two tiers: a white `card` (`surface-bright`) for primary content blocks, and a slightly-gray `card-container` (`surface-container`) for secondary groupings — the same gray value that doubles as the system's border color, so container edges tend to blend rather than stand out sharply.

**Overlays** (modals, dropdowns, popovers) use Radix-UI-style enter/exit keyframes (`overlayShow`, `contentShow`, `contentHide`, `slideDown`, `slideUp`) — treat overlay/content animations as fade + subtle scale/slide pairs rather than instant toggles, consistent with the spring-based transition timing functions used sitewide.

## Do's and Don'ts

- **Do** reserve `secondary` (lime) for a small number of high-intent actions per screen — its low observed frequency (6 occurrences sitewide) suggests it's meant to stay rare and attention-grabbing, not used as a general accent.
- **Do** pair `on-secondary` (dark ink) rather than white text on the lime accent — white-on-lime will fail contrast given how light/saturated the accent is.
- **Do** use the dominant soft, wide-spread shadow pair for elevation instead of introducing hard, tight drop shadows — it's the system's one consistent depth treatment.
- **Don't** introduce blur/glassmorphism effects (`backdrop-filter`) — none were detected anywhere on the page, so it isn't part of this system's visual language.
- **Don't** treat the low-confidence colors (`accent-violet`, `accent-cyan`, `accent-lavender`, `icon-cyan`) as intentional brand colors without checking the live site first — each appeared only once or twice and may be incidental (third-party widgets, Shadow DOM content, or one-off decoration).
