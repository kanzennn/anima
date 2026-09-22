"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds, applied once the element enters the viewport. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-triggered entrance. Motion is the brand here, so sections arrive with
 * the spring-shaped easing defined in globals.css rather than snapping in.
 * Collapses to a no-op under `prefers-reduced-motion: reduce`.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
