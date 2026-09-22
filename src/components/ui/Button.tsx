import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "outline" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-sm rounded-full font-sans text-button whitespace-nowrap " +
  "transition-[transform,background-color,color,box-shadow] duration-200 ease-spring " +
  "hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

/** The three button treatments in the design system, plus two dark-section variants. */
const variants: Record<Variant, string> = {
  primary: "bg-secondary text-on-secondary hover:shadow-raised",
  dark: "bg-inverse-surface text-inverse-on-surface hover:bg-primary",
  ghost: "bg-transparent text-on-surface hover:bg-surface-container",
  outline:
    "bg-surface-bright text-on-surface ring-1 ring-outline ring-inset hover:bg-surface",
  inverse:
    "bg-transparent text-inverse-on-surface ring-1 ring-inverse-on-surface/20 ring-inset hover:bg-inverse-on-surface/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-lg",
  md: "h-11 px-5",
  lg: "h-13 px-7",
};

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

function classes({ variant = "primary", size = "md", className = "" }: Omit<ButtonBaseProps, "children">) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonBaseProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={classes({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  href,
  ...props
}: ButtonBaseProps & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={classes({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
