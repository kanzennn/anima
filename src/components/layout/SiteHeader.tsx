"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import {
  ChevronDownIcon,
  CloseIcon,
  Logomark,
  MenuIcon,
} from "@/components/ui/Marks";
import {
  headerActions,
  navLinks,
  productMenu,
  siteName,
} from "@/lib/content/navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-colors duration-300 ease-glide ${
          scrolled
            ? "bg-surface/85 border-b border-outline"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-page flex h-18 items-center justify-between gap-lg">
          <Link
            href="/"
            className="flex items-center gap-sm text-on-surface"
            aria-label={`${siteName} home`}
          >
            <Logomark className="h-7 w-7 text-primary" />
            <span className="font-display text-title">{siteName}</span>
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-xs lg:flex"
            onMouseLeave={() => setMenuOpen(null)}
          >
            {navLinks.map((item) => (
              <div key={item.label} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() =>
                    setMenuOpen(item.hasMenu ? item.label : null)
                  }
                  onFocus={() => setMenuOpen(item.hasMenu ? item.label : null)}
                  aria-expanded={item.hasMenu ? menuOpen === item.label : undefined}
                  className="flex h-10 items-center gap-1 rounded-full px-md text-body-sm font-medium text-on-surface transition-colors duration-200 hover:bg-surface-container"
                >
                  {item.label}
                  {item.hasMenu ? (
                    <ChevronDownIcon
                      className={`h-3.5 w-3.5 text-on-surface-variant transition-transform duration-200 ease-spring ${
                        menuOpen === item.label ? "rotate-180" : ""
                      }`}
                    />
                  ) : null}
                </Link>

                {item.hasMenu && menuOpen === item.label ? (
                  <div className="absolute left-1/2 top-[calc(100%+8px)] w-105 -translate-x-1/2 animate-slide-down">
                    <div className="grid grid-cols-2 gap-xs rounded-sm bg-surface-bright p-md shadow-raised ring-1 ring-outline">
                      {productMenu.map((entry) => (
                        <Link
                          key={entry.title}
                          href={entry.href}
                          className="rounded-sm p-md transition-colors duration-200 hover:bg-surface"
                        >
                          <span className="block text-body-sm font-semibold">
                            {entry.title}
                          </span>
                          <span className="mt-1 block text-label-sm font-normal text-on-surface-variant">
                            {entry.body}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-sm lg:flex">
            <Link
              href={headerActions.login.href}
              className="flex h-10 items-center rounded-full px-md text-body-sm font-medium transition-colors duration-200 hover:bg-surface-container"
            >
              {headerActions.login.label}
            </Link>
            <ButtonLink href={headerActions.signup.href} variant="dark">
              {headerActions.signup.label}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-on-surface lg:hidden"
          >
            {mobileOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
            <span className="sr-only">
              {mobileOpen ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="animate-overlay-show fixed inset-x-0 top-18 bottom-0 z-40 bg-surface px-lg pt-lg lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-xs">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-sm px-md py-4 font-display text-headline-sm transition-colors hover:bg-surface-container"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-xl flex flex-col gap-md">
            <ButtonLink
              href={headerActions.signup.href}
              variant="primary"
              size="lg"
              onClick={() => setMobileOpen(false)}
            >
              {headerActions.signup.label}
            </ButtonLink>
            <ButtonLink
              href={headerActions.login.href}
              variant="outline"
              size="lg"
              onClick={() => setMobileOpen(false)}
            >
              {headerActions.login.label}
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
