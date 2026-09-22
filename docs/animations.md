# Animations

The product this site describes is a motion design tool, so motion is the
pitch, not decoration. That justifies more animation than a typical marketing
site — but it also means the motion has to look deliberate rather than
generic, which is mostly a question of easing.

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

| Utility                 | What it does                                          |
| ----------------------- | ----------------------------------------------------- |
| `animate-slide-down`    | Mega-menu panel entrance                              |
| `animate-overlay-show`  | Mobile menu overlay fade                              |
| `animate-content-show`  | Fade + subtle scale, the Radix-style dialog pattern   |
| `animate-marquee`       | 42s infinite scroll — customer logos                  |
| `animate-marquee-slow`  | 70s infinite scroll — template gallery                |
| `animate-float`         | 6s vertical drift for decorative blobs                |
| `animate-playhead`      | 5.2s left-to-right sweep of the timeline playhead     |
| `animate-pop-in`        | 5.2s in/hold/out loop for canvas elements             |
| `animate-fade-up`       | One-shot entrance, available for non-scroll use       |

`overlayShow` / `contentShow` / `slideDown` mirror the Radix UI dialog
primitives the source design used. Treat overlay animations as fade + subtle
scale or slide pairs rather than instant toggles.

## Marquees

Both marquees use the same structure: a `w-max` flex row containing the item
list **twice**, translated from `0` to `-50%`. Because the second pass is an
exact copy, the midpoint of the animation is visually identical to the start,
so the loop is seamless.

Two things that are easy to get wrong:

- The duplicate pass is `aria-hidden` — otherwise screen readers read the whole
  list twice.
- The track must sit inside an `overflow-hidden` parent. Both do, which is why
  a 1400px-wide track causes no horizontal page scroll at 375px. A
  `[mask-image:linear-gradient(...)]` fades both edges so items don't pop in
  at the viewport boundary.

## The editor mock

`(home)/_components/EditorMock.tsx` is the animated product mock in the hero.
It's a composition of the named animations above rather than a video:

- The canvas badge, headline, and underline run `animate-pop-in` at staggered
  `animationDelay`s, so elements arrive in sequence.
- The timeline playhead runs `animate-playhead` across the full track width.
- A `setInterval` cycles the highlighted layer in the rail every 1300ms.

The play/pause button toggles a `[animation-play-state:paused]` class onto
every animated element rather than unmounting anything, so pausing freezes the
composition mid-motion instead of resetting it.

**Why no video:** a looping MP4 would be heavier than the entire rest of the
page, and CSS keeps it sharp at any viewport size.

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
