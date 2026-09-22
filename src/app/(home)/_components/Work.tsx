import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, PlayIcon } from "@/components/ui/Marks";
import { Reveal } from "@/components/ui/Reveal";
import { work } from "@/lib/content/home";

type Project = (typeof work.items)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full">
      {/* Stands in for the project still. Swap the tint for a poster frame
          once real stills are cleared for use. */}
      <div
        className={`relative flex aspect-video flex-col justify-between overflow-hidden rounded-sm p-lg ring-1 ring-outline transition-transform duration-500 ease-spring group-hover:-translate-y-1.5 ${project.tint} ${project.ink}`}
      >
        <div className="flex items-center justify-between gap-md">
          <span className="rounded-full bg-inverse-on-surface/20 px-md py-1 text-label-sm">
            {project.discipline}
          </span>
          <span className="text-label-sm">{project.runtime}</span>
        </div>

        <div className="flex items-end justify-between gap-md">
          <div>
            <span className="block font-display text-headline-sm">
              {project.name}
            </span>
            <span
              aria-hidden
              className="mt-sm block h-1 w-12 rounded-full bg-current/40 transition-[width] duration-500 ease-spring group-hover:w-20"
            />
          </div>
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-inverse-on-surface/20 transition-transform duration-500 ease-spring group-hover:scale-110"
          >
            <PlayIcon className="h-4 w-4 translate-x-px" />
          </span>
        </div>
      </div>

      <div className="mt-md flex items-baseline justify-between gap-md px-1">
        <p className="text-body-sm font-semibold text-on-surface">
          {project.client}
        </p>
        <p className="text-label-sm font-normal text-on-surface-subtle">
          {project.year}
        </p>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-24 bg-surface-bright py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="flex flex-col gap-lg md:flex-row md:items-end md:justify-between">
          <div className="max-w-160">
            <Reveal>
              <span className="text-label-sm uppercase tracking-[0.12em] text-accent-violet">
                {work.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="work-title" className="mt-md font-display text-headline-lg">
                {work.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-lg text-body-lg text-on-surface-variant">
                {work.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <ButtonLink href={work.action.href} variant="outline">
              {work.action.label}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-md sm:grid-cols-2 lg:grid-cols-3">
          {work.items.map((project, i) => (
            <Reveal key={project.name} delay={(i % 3) * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
