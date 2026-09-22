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
  layers: (
    <>
      <path d="m12 3.6 8.4 4.4-8.4 4.4L3.6 8z" />
      <path d="m4.6 12.4-1 .6 8.4 4.4 8.4-4.4-1-.6" />
      <path d="m4.6 16.4-1 .6 8.4 4.4 8.4-4.4-1-.6" />
    </>
  ),
  spark: (
    <path d="M12 3.5 13.9 9.4 19.8 11.3 13.9 13.2 12 19.1 10.1 13.2 4.2 11.3 10.1 9.4z" />
  ),
  users: (
    <>
      <circle cx="9.5" cy="8.5" r="3.2" />
      <path d="M3.5 19.2c0-3 2.7-4.8 6-4.8s6 1.8 6 4.8" />
      <path d="M16.2 6.2a3.2 3.2 0 0 1 0 6" />
      <path d="M18 14.8c2.1.5 3.5 1.9 3.5 4.4" />
    </>
  ),
  resize: (
    <>
      <rect x="3" y="3" width="10" height="14" rx="2.5" />
      <path d="M17 8h2.5A1.5 1.5 0 0 1 21 9.5v10A1.5 1.5 0 0 1 19.5 21H10" />
    </>
  ),
  bolt: <path d="M13.4 2.5 4.8 13.2h5.6l-.6 8.3 8.6-10.7h-5.6z" />,
};

export function Glyph({ id, className }: { id: GlyphId; className?: string }) {
  return <Icon className={className}>{paths[id]}</Icon>;
}

/** Product mark: three offset bars easing into place — a motion curve as a glyph. */
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

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props} strokeWidth={2.4}>
      <path d="m4.8 12.4 4.5 4.4 9.9-10" />
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
