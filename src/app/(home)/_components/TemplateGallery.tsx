import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Marks";
import { Reveal } from "@/components/ui/Reveal";
import { templates } from "@/lib/content/home";

type Template = (typeof templates.items)[number];

function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="group w-60 shrink-0">
      <div
        className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-sm p-lg ring-1 ring-outline transition-transform duration-500 ease-spring group-hover:-translate-y-1.5 ${template.tint} ${template.ink}`}
      >
        <span className="w-fit rounded-full bg-inverse-on-surface/20 px-md py-1 text-label-sm">
          {template.ratio}
        </span>
        <div>
          <span className="block font-display text-headline-sm">
            {template.name}
          </span>
          <span
            aria-hidden
            className="mt-sm block h-1 w-12 rounded-full bg-current/40 transition-[width] duration-500 ease-spring group-hover:w-20"
          />
        </div>
      </div>
      <p className="mt-md px-1 text-label-sm font-normal text-on-surface-variant">
        {template.category}
      </p>
    </article>
  );
}

export function TemplateGallery() {
  return (
    <section
      id="templates"
      aria-labelledby="templates-title"
      className="scroll-mt-24 overflow-hidden bg-surface-bright py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="flex flex-col gap-lg md:flex-row md:items-end md:justify-between">
          <div className="max-w-160">
            <Reveal>
              <span className="text-label-sm uppercase tracking-[0.12em] text-accent-violet">
                {templates.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="templates-title" className="mt-md font-display text-headline-lg">
                {templates.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-lg text-body-lg text-on-surface-variant">
                {templates.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <ButtonLink href={templates.action.href} variant="outline">
              {templates.action.label}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="animate-marquee-slow flex w-max gap-md">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex gap-md" aria-hidden={pass === 1}>
              {templates.items.map((template) => (
                <TemplateCard key={template.name} template={template} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
