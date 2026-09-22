import { ButtonLink } from "@/components/ui/Button";
import { Glyph, PlayIcon } from "@/components/ui/Marks";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/lib/content/home";
import { ShowreelPlayer } from "./ShowreelPlayer";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-xl pt-10 sm:pt-16">
      {/* Soft brand wash behind the fold. Radial, so it fades into the page
          surface instead of terminating on a visible edge. */}
      <div
        aria-hidden
        className="wash-brand pointer-events-none absolute -top-56 left-1/2 h-160 w-275 -translate-x-1/2"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-210 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-sm rounded-full bg-surface-bright px-md py-2 text-label-sm text-on-surface ring-1 ring-outline">
              <Glyph id="spark" className="h-3.5 w-3.5 text-accent-violet" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-lg font-display text-hero text-on-surface">
              {hero.title.lead}
              <br />
              <span className="text-gradient-brand">{hero.title.accent}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-lg max-w-150 text-body-lg text-on-surface-variant">
              {hero.body}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col items-center justify-center gap-md sm:flex-row">
              <ButtonLink href={hero.primaryAction.href} variant="primary" size="lg">
                {hero.primaryAction.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryAction.href} variant="outline" size="lg">
                <PlayIcon className="h-4 w-4" />
                {hero.secondaryAction.label}
              </ButtonLink>
            </div>
            <p className="mt-md text-label-sm font-normal text-on-surface-subtle">
              {hero.footnote}
            </p>
          </Reveal>
        </div>

        <Reveal delay={320} className="mt-14 sm:mt-16">
          <div id="reel" className="scroll-mt-24">
            <ShowreelPlayer />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
