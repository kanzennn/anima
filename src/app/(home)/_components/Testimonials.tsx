import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content/home";

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-surface-bright py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="max-w-160">
          <Reveal>
            <span className="text-label-sm uppercase tracking-[0.12em] text-accent-violet">
              {testimonials.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="testimonials-title" className="mt-md font-display text-headline-lg">
              {testimonials.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-md lg:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <figure className="flex h-full flex-col justify-between rounded-md bg-surface p-8 ring-1 ring-outline sm:p-10">
                <blockquote className="font-display text-quote text-on-surface">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-md">
                  <span
                    aria-hidden
                    className={`h-11 w-11 shrink-0 rounded-full ${item.tint}`}
                  />
                  <span>
                    <span className="block text-body-sm font-semibold text-on-surface">
                      {item.name}
                    </span>
                    <span className="block text-label-sm font-normal text-on-surface-variant">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
