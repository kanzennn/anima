import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Marks";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/lib/content/home";

export function ContactCta() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 pb-20 sm:pb-28"
    >
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
              <h2 id="contact-title" className="font-display text-hero">
                {contact.title}
              </h2>
              <p className="mx-auto mt-lg max-w-130 text-body-lg text-inverse-on-surface/75">
                {contact.body}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-md sm:flex-row">
                <ButtonLink
                  href={`mailto:${contact.email}`}
                  variant="primary"
                  size="lg"
                >
                  {contact.primaryAction.label}
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${contact.email}`}
                  variant="inverse"
                  size="lg"
                >
                  {contact.secondaryAction.label}
                </ButtonLink>
              </div>

              <dl className="mt-10 flex flex-col items-center justify-center gap-sm text-body-sm text-inverse-on-surface/75 sm:flex-row sm:gap-xl">
                <div className="flex items-center gap-sm">
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${contact.email}`}
                      className="transition-colors duration-200 hover:text-inverse-on-surface"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-sm">
                  <dt className="sr-only">Location</dt>
                  <dd>{contact.location}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
