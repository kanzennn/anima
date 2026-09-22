import type { SVGProps } from "react";
import type { GlyphId } from "@/lib/content/types";

type IconProps = SVGProps<SVGSVGElement>;

/** Shared stroke setup. Every mark here is decorative — callers supply the label. */
function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

/** Content-referenced glyphs. Keys must stay in sync with `GlyphId`. */
const paths: Record<GlyphId, React.ReactNode> = {
  // Editorial — a razor cut across a strip of film.
  cut: (
    <>
      <circle cx="6" cy="18" r="2.6" />
      <circle cx="18" cy="18" r="2.6" />
      <path d="M7.8 16.2 18 4.5" />
      <path d="M16.2 16.2 6 4.5" />
    </>
  ),
  // Colour — a grading wheel, half lifted.
  color: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 3.6a8.4 8.4 0 0 1 0 16.8z" fill="currentColor" stroke="none" />
    </>
  ),
  // Sound — a level meter.
  sound: (
    <>
      <path d="M3.4 10.5v3" />
      <path d="M7.6 7.5v9" />
      <path d="M11.8 4.5v15" />
      <path d="M16 8.5v7" />
      <path d="M20.2 10.5v3" />
    </>
  ),
  // Delivery — a master leaving the building.
  delivery: (
    <>
      <path d="M20.4 14.5v3.6a2 2 0 0 1-2 2H5.6a2 2 0 0 1-2-2v-3.6" />
      <path d="M12 3.6v11" />
      <path d="m7.8 8.4 4.2-4.8 4.2 4.8" />
    </>
  ),
  spark: (
    <path d="M12 3.5 13.9 9.4 19.8 11.3 13.9 13.2 12 19.1 10.1 13.2 4.2 11.3 10.1 9.4z" />
  ),
  bolt: <path d="M13.4 2.5 4.8 13.2h5.6l-.6 8.3 8.6-10.7h-5.6z" />,
};

export function Glyph({ id, className }: { id: GlyphId; className?: string }) {
  return <Icon className={className}>{paths[id]}</Icon>;
}

/** Studio mark: three offset bars easing into place — a motion curve as a glyph. */
export function Logomark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect x="2" y="9" width="7" height="10" rx="3.5" fill="currentColor" opacity="0.35" />
      <rect x="10.5" y="5" width="7" height="18" rx="3.5" fill="currentColor" opacity="0.65" />
      <rect x="19" y="11" width="7" height="6" rx="3" fill="currentColor" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5.5 18.5 12 8 18.5z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.5 12h14" />
      <path d="m13 6.5 5.5 5.5-5.5 5.5" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props} strokeWidth={2}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props} strokeWidth={2}>
      <path d="M6 6 18 18M18 6 6 18" />
    </Icon>
  );
}
