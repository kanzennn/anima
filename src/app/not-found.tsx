import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center gap-lg px-lg py-xl text-center"
    >
      <span className="text-label-sm uppercase tracking-[0.12em] text-accent-violet">
        404
      </span>
      <h1 className="font-display text-headline-lg">
        This page doesn&rsquo;t exist
      </h1>
      <p className="max-w-150 text-body-lg text-on-surface-variant">
        The link may be out of date, or the page may have moved.
      </p>
      <ButtonLink href="/" variant="primary" size="lg">
        Back to home
      </ButtonLink>
    </main>
  );
}
