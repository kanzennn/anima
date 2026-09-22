import { Reveal } from "@/components/ui/Reveal";
import { teams } from "@/lib/content/home";

export function TeamsSection() {
  return (
    <section
      id="teams"
      aria-labelledby="teams-title"
      className="scroll-mt-24 bg-inverse-surface py-20 text-inverse-on-surface sm:py-28"
    >
      <div className="container-page">
        <div className="max-w-180">
          <Reveal>
            <span className="text-label-sm uppercase tracking-[0.12em] text-accent-lavender">
              {teams.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="teams-title" className="mt-md font-display text-headline-lg">
              {teams.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-lg text-body-lg text-inverse-on-surface-variant">
              {teams.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-md md:grid-cols-3">
          {teams.steps.map((item, i) => (
            <Reveal key={item.step} delay={i * 90}>
              <article className="h-full rounded-md bg-inverse-on-surface/5 p-8 ring-1 ring-inverse-on-surface/10 transition-colors duration-300 ease-glide hover:bg-inverse-on-surface/10">
                <span className="font-display text-stat text-accent-lavender">
                  {item.step}
                </span>
                <h3 className="mt-lg font-display text-headline-sm">
                  {item.title}
                </h3>
                <p className="mt-sm text-body-md text-inverse-on-surface-variant">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-md">
          <dl className="grid gap-md rounded-md bg-inverse-on-surface/5 p-8 ring-1 ring-inverse-on-surface/10 sm:grid-cols-3 sm:p-10">
            {teams.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-stat">{stat.value}</dt>
                <dd className="mt-1 text-body-sm text-inverse-on-surface-variant">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
