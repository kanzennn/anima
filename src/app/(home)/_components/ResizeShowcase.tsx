import { CheckIcon } from "@/components/ui/Marks";
import { Reveal } from "@/components/ui/Reveal";
import { resize } from "@/lib/content/home";

export function ResizeShowcase() {
  return (
    <section
      id="resize"
      aria-labelledby="resize-title"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <span className="text-label-sm uppercase tracking-[0.12em] text-accent-violet">
                {resize.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="resize-title" className="mt-md font-display text-headline-lg">
                {resize.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-lg text-body-lg text-on-surface-variant">
                {resize.body}
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col gap-md">
              {resize.points.map((point, i) => (
                <Reveal key={point} delay={180 + i * 70} as="li">
                  <span className="flex gap-md">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-on-secondary">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-body-md text-on-surface-variant">
                      {point}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={140}>
            <div className="rounded-md bg-surface-bright p-8 shadow-raised ring-1 ring-outline sm:p-10">
              <div className="flex items-center justify-between">
                <span className="text-label-sm text-on-surface-variant">
                  {resize.panel.projectName}
                </span>
                <span className="rounded-full bg-surface-container px-md py-1 text-label-sm text-on-surface-variant">
                  {resize.panel.counter}
                </span>
              </div>

              <div className="mt-lg flex min-h-55 flex-wrap items-end justify-center gap-md rounded-sm bg-surface p-lg">
                {resize.panel.formats.map((format, i) => (
                  <div key={format.label} className="flex flex-col items-center gap-sm">
                    <div
                      aria-hidden
                      className={`gradient-brand animate-pop-in relative overflow-hidden rounded-sm ${format.box}`}
                      style={{ animationDelay: `${i * 0.18}s` }}
                    >
                      <span className="absolute inset-x-2 bottom-2 h-1.5 rounded-full bg-inverse-on-surface/40" />
                      <span className="absolute left-2 top-2 h-1.5 w-4 rounded-full bg-secondary" />
                    </div>
                    <span className="text-label-sm font-normal text-on-surface-subtle">
                      {format.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-lg flex items-center gap-md">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-container">
                  <span className="gradient-brand block h-full w-[72%] rounded-full" />
                </div>
                <span className="text-label-sm font-normal text-on-surface-variant">
                  {resize.panel.progressLabel}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
