"use client";

import { Button } from "@/components/ui/Button";

/* The `error` object is deliberately not rendered — a stack trace or an
   internal message on the client is an information leak. Send it to a logging
   service here if error reporting is ever added. */
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center gap-lg px-lg py-xl text-center"
    >
      <span className="text-label-sm uppercase tracking-[0.12em] text-accent-violet">
        Error
      </span>
      <h1 className="font-display text-headline-lg">Something went wrong</h1>
      <p className="max-w-150 text-body-lg text-on-surface-variant">
        An unexpected error interrupted this page. Try again, and if it keeps
        happening, let us know.
      </p>
      <Button onClick={reset} variant="primary" size="lg">
        Try again
      </Button>
    </main>
  );
}
