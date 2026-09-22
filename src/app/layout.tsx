import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// Body / UI face — the workhorse in the design system.
const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Display face. The system calls for TWK Lausanne, which is licensed and not
// self-hostable here; Inter Tight is the closest available neo-grotesque and
// sits behind "TWK Lausanne" in the --font-display stack.
const display = Inter_Tight({
  variable: "--font-display-alt",
  subsets: ["latin"],
});

const siteName = "Anima";
/* The tab shows the brand alone — the page itself already says what the studio
   does. The tagline is kept for shared links, where the preview card arrives
   with no page around it to supply that context. */
const shareTitle = "Anima — Post-production studio";
const description =
  "Anima is a post-production studio for brands and agencies. Editorial, colour, sound, and delivery under one roof.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description,
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName,
    title: shareTitle,
    description,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: shareTitle, description },
  robots: { index: true, follow: true },
  /* Points at the brand asset rather than an app/icon file, so the mark has a
     single source. The file carries its own dark-mode rule for tab strips. */
  icons: { icon: { url: "/brand/anima-logomark.svg", type: "image/svg+xml" } },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Tells Next the smooth scrolling in globals.css is deliberate, so it
      // suppresses it during route transitions instead of animating them.
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface font-sans text-on-surface">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 focus:rounded-full focus:bg-secondary focus:px-5 focus:py-3 focus:text-button focus:text-on-secondary"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
