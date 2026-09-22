# Animations

This site belongs to a post-production studio, so motion is the portfolio, not
decoration — a studio that cuts film for a living cannot ship a stiff website.
That justifies more animation than a typical marketing site, but it also raises
the bar: the motion has to look deliberate rather than generic, which is mostly
a question of easing.

Everything here is CSS. There is no animation library, no JS-driven tween, and
no scroll-linked layout work. The only JavaScript involved is a single
`IntersectionObserver` that toggles one class.

## Easing

Two easings are defined in `globals.css` and nothing should use a bare
`ease-out` or `linear` instead:

| Token         | Definition                                | Use                       |
| ------------- | ----------------------------------------- | ------------------------- |
| `ease-glide`  | `cubic-bezier(0.25, 0.46, 0.45, 0.94)`    | Colour and opacity fades  |
| `ease-spring` | A `linear()` polyline approximating a spring | Anything that moves or scales |

`ease-spring` is the important one. The source design's dominant timing
functions weren't simple eases — they were `linear()` polyline approximations
of spring physics, which overshoot slightly past their endpoint and settle
back. That overshoot is what makes the motion read as a motion-design product
rather than a CSS transition. Use it for transforms; use `ease-glide` for
colour, where an overshoot has nothing to overshoot into.

Marquees are the exception — they use `linear`, because a constant-velocity
scroll is the point.

## The reveal system

`src/components/ui/Reveal.tsx` wraps content that should animate in on scroll.

```tsx
<Reveal delay={80}>
  <h2 className="font-display text-headline-lg">…</h2>
</Reveal>
```

How it works:

1. The element renders with the `reveal` class — `opacity: 0`,
   `translateY(24px)`, and a transition using `ease-spring`.
2. An `IntersectionObserver` fires when the element is 8% visible, with a
   `-12%` bottom root margin so it triggers slightly before the true edge.
3. The observer adds `reveal-in`, which resets opacity and transform. The
   transition does the rest.
4. The observer disconnects. Reveals are **one-shot** — scrolling back up does
   not replay them.

`delay` sets a `--reveal-delay` custom property consumed by
`transition-delay`, which is what staggers a grid. The convention in this
codebase is 60–90ms between siblings, usually `i * 80`.

`as` changes the wrapper element — `as="li"` keeps a reveal inside a list from
breaking the list semantics.

### The opacity trap

**Animated elements use colour-alpha, not `opacity-*` utilities.**

`animation-fill-mode: both` — which every named animation here uses — means the
animation's final keyframe keeps applying after it finishes. If that keyframe
sets `opacity: 1` and the element also carries an `opacity-40` utility, the
animation wins permanently once it settles, and the utility silently does
nothing.

Encode the transparency in the colour instead:

```
bg-current/40        ✅  survives the animation
bg-current opacity-40 ❌  overridden once the animation settles
```

This is why the codebase uses `bg-inverse-on-surface/20`,
`ring-inverse-on-surface/10`, `text-inverse-on-surface/75` and so on rather
than the equivalent opacity utilities.

## Named animations

Declared as `--animate-*` tokens in `@theme`, used as `animate-*` utilities:

| Utility                | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `animate-slide-down`   | Mega-menu panel entrance                           |
| `animate-overlay-show` | Mobile menu overlay fade                           |
| `animate-content-show` | Fade + subtle scale, the Radix-style dialog pattern |
| `animate-marquee`      | 42s infinite scroll — the client logo strip        |
| `animate-float`        | 6s vertical drift for decorative blobs             |
| `animate-playhead`     | 5.2s left-to-right sweep of the timeline playhead  |
| `animate-pop-in`       | 5.2s in/hold/out loop for monitor elements         |

`overlayShow` / `contentShow` / `slideDown` mirror the Radix UI dialog
primitives the source design used. Treat overlay animations as fade + subtle
scale or slide pairs rather than instant toggles.

`animate-content-show` currently has no consumer. It is kept because the source
capture in `DESIGN.md` records `contentShow` as part of the system's dialog set,
so it belongs to the design language rather than to any one component. Tokens
that were speculative additions with no consumer — a second marquee speed, a
one-shot fade-up, a bar-grow, a slow spin — were removed rather than left to
rot; if you need one back, add it when something actually uses it.

## The marquee

There is one marquee: the client logo strip in `ClientMarquee`. It is a `w-max`
flex row containing the list **twice**, translated from `0` to `-50%`. Because
the second pass is an exact copy, the midpoint of the animation is visually
identical to the start, so the loop is seamless.

Two things that are easy to get wrong:

- The duplicate pass is `aria-hidden` — otherwise screen readers read the whole
  list twice.
- The track must sit inside an `overflow-hidden` parent. It does, which is why
  a track far wider than the viewport causes no horizontal page scroll at 375px.
  A `[mask-image:linear-gradient(...)]` fades both edges so items don't pop in
  at the viewport boundary.

## The showreel player

`(home)/_components/ShowreelPlayer.tsx` is the animated cutting-room timeline
standing in for the reel in the hero. It's a composition of the named
animations above rather than a video:

- The program-monitor badge, headline, and underline run `animate-pop-in` at
  staggered `animationDelay`s, so elements arrive in sequence.
- The playhead runs `animate-playhead` across the full timeline width.
- A `setInterval` cycles the highlighted track in the rail every 1300ms.
- The aspect-ratio chips re-shape the monitor through the `frameAspect` map. The
  frame is **height-anchored** (`h-40 sm:h-56`) so the width changes and the
  page below stays put; a vertical frame is only ~126px wide, so its contents
  step down a size rather than overrun it. Keep `frameAspect` in sync with
  `showreel.ratios` in the content file — an unmapped ratio falls back to a
  full-width box rather than throwing.

The play/pause button toggles a `[animation-play-state:paused]` class onto
every animated element rather than unmounting anything, so pausing freezes the
composition mid-motion instead of resetting it.

**Why no video:** a looping master would be heavier than the entire rest of the
page, and CSS keeps it sharp at any viewport size.

**When the real reel exists**, replace the program monitor with a `<video>`
carrying a poster frame and `preload="none"`, and keep the timeline chrome
around it — the chrome is what makes the hero read as a cutting room rather
than a generic player. Note that a self-hosted file is covered by
`media-src 'self'`; an embedded Vimeo or YouTube player is not, and would need
both a `frame-src` directive and a review of the `frame-ancestors 'none'`
assumption in [Security](./security.md).

## Reduced motion

Every animation collapses under `prefers-reduced-motion: reduce`, via a global
block at the end of `globals.css`:

- `animation-duration` and `transition-duration` drop to `0.001ms`
- `animation-iteration-count` drops to `1`, stopping the infinite marquees
- `.reveal` is forced to its visible state, so nothing is stuck invisible
- `scroll-behavior` reverts to `auto`

That last point matters most: the reveal system hides content by default. If
the reduced-motion block didn't force `.reveal` visible, a reduced-motion user
would get a blank page. Any new scroll-triggered pattern must handle the same
case.
