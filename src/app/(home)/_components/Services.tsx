import { Glyph } from "@/components/ui/Marks";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content/home";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="max-w-180">
          <Reveal>
            <span className="text-label-sm uppercase tracking-[0.12em] text-accent-violet">
              {services.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="services-title" className="mt-md font-display text-headline-lg">
              {services.title}
              <br />
              <span className="text-on-surface-variant">{services.subtitle}</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-md md:grid-cols-2">
          {services.items.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <article className="group h-full rounded-md bg-surface-bright p-8 ring-1 ring-outline transition-shadow duration-300 ease-glide hover:shadow-raised sm:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-icon-default transition-colors duration-300 ease-glide group-hover:bg-secondary">
                  <Glyph id={service.glyph} className="h-5 w-5" />
                </span>
                <h3 className="mt-lg font-display text-headline-sm">
                  {service.title}
                </h3>
                <p className="mt-sm text-body-md text-on-surface-variant">
                  {service.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-md">
          <div className="flex flex-col items-start gap-lg rounded-md bg-surface-container p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-start gap-md">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-bright text-icon-default">
                <Glyph id={services.callout.glyph} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-headline-sm">
                  {services.callout.title}
                </h3>
                <p className="mt-1 max-w-130 text-body-md text-on-surface-variant">
                  {services.callout.body}
                </p>
              </div>
            </div>

            <dl className="flex gap-xl">
              {services.callout.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-label-sm font-normal text-on-surface-variant">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-stat">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
