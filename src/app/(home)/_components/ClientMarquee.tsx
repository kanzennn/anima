import { Logomark } from "@/components/ui/Marks";
import { clientMarquee } from "@/lib/content/home";

export function ClientMarquee() {
  return (
    <section aria-labelledby="clients-label" className="border-y border-outline py-10">
      <p
        id="clients-label"
        className="container-page text-center text-label-sm font-normal text-on-surface-subtle"
      >
        {clientMarquee.label}
      </p>

      <div className="relative mt-lg overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-xl pr-xl">
          {[0, 1].map((pass) => (
            <div
              key={pass}
              className="flex items-center gap-xl pr-xl"
              aria-hidden={pass === 1}
            >
              {clientMarquee.clients.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-sm whitespace-nowrap font-display text-quote text-on-surface-variant"
                >
                  <Logomark className="h-5 w-5 text-icon-muted" />
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
