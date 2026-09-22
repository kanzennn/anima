import Link from "next/link";
import { Logomark } from "@/components/ui/Marks";
import {
  footerDisclaimer,
  footerLegal,
  footerNav,
  footerTagline,
  siteName,
} from "@/lib/content/navigation";

export function SiteFooter() {
  return (
    <footer
      id="resources"
      className="scroll-mt-24 bg-inverse-surface pb-10 pt-20 text-inverse-on-surface"
    >
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-80">
            <Link href="/" className="flex items-center gap-sm">
              <Logomark className="h-7 w-7 text-secondary" />
              <span className="font-display text-title">{siteName}</span>
            </Link>
            <p className="mt-lg text-body-sm text-inverse-on-surface-variant">
              {footerTagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-lg sm:grid-cols-4">
            {footerNav.map((column) => (
              <div key={column.title}>
                <h2 className="text-label-sm uppercase tracking-[0.12em] text-on-surface-subtle">
                  {column.title}
                </h2>
                <ul className="mt-md flex flex-col gap-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-inverse-on-surface-variant transition-colors duration-200 hover:text-inverse-on-surface"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-md border-t border-inverse-on-surface/10 pt-lg sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label-sm font-normal text-on-surface-subtle">
            © {new Date().getFullYear()} {siteName}. {footerDisclaimer}
          </p>
          <ul className="flex gap-lg">
            {footerLegal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-label-sm font-normal text-on-surface-subtle transition-colors duration-200 hover:text-inverse-on-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
