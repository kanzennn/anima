import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Marks";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/lib/content/home";

export function CtaBand() {
  return (
    <section id="start" aria-labelledby="cta-title" className="scroll-mt-24 pb-20 sm:pb-28">
      <div className="container-page">
        <Reveal>
          <div className="gradient-brand relative overflow-hidden rounded-md px-8 py-16 text-center text-inverse-on-surface sm:px-16 sm:py-24">
            <span
              aria-hidden
              className="animate-float absolute -left-16 -top-16 h-56 w-56 rounded-full bg-accent-lavender/25"
            />
            <span
              aria-hidden
              className="animate-float absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-secondary/15"
              style={{ animationDelay: "1.4s" }}
            />

            <div className="relative mx-auto max-w-170">
              <h2 id="cta-title" className="font-display text-hero">
                {cta.title}
              </h2>
              <p className="mx-auto mt-lg max-w-130 text-body-lg text-inverse-on-surface/75">
                {cta.body}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-md sm:flex-row">
                <ButtonLink href={cta.primaryAction.href} variant="primary" size="lg">
                  {cta.primaryAction.label}
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={cta.secondaryAction.href} variant="inverse" size="lg">
                  {cta.secondaryAction.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
