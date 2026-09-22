/**
 * Header and footer navigation. The site is a single route today, so every
 * link is an in-page anchor — when a second route appears, the entries that
 * become real paths move here unchanged and the header's active-state logic
 * picks them up.
 */

export const siteName = "Anima";

/**
 * Brand lockups in `public/brand/`. The wordmark in these files is outlined,
 * so they render without depending on Inter Tight — but they also can't be
 * recoloured, which is why the dark sections get their own file rather than
 * inheriting `currentColor` the way the bare `Logomark` component does.
 */
export const logo = {
  onLight: { src: "/brand/anima-logo.svg", width: 93, height: 28 },
  onDark: { src: "/brand/anima-logo-on-dark.svg", width: 93, height: 28 },
};

export const navLinks = [
  { label: "Work", href: "#work", hasMenu: false },
  { label: "Services", href: "#services", hasMenu: true },
  { label: "Process", href: "#process", hasMenu: false },
  { label: "Clients", href: "#clients", hasMenu: false },
];

/** Panel shown under the nav entries flagged `hasMenu`. */
export const productMenu = [
  {
    title: "Editorial",
    body: "Story, structure, and the cut itself.",
    href: "#services",
  },
  {
    title: "Colour",
    body: "Grading, matching, and finishing passes.",
    href: "#services",
  },
  {
    title: "Sound",
    body: "Mix, cleanup, and music supervision.",
    href: "#services",
  },
  {
    title: "Delivery",
    body: "Versioning and spec-correct masters.",
    href: "#services",
  },
];

export const headerActions = {
  reel: { label: "Showreel", href: "#reel" },
  contact: { label: "Start a project", href: "#contact" },
};

export const footerTagline =
  "A post-production studio for brands and agencies. Editorial, colour, sound, and delivery under one roof.";

export const footerNav = [
  {
    title: "Services",
    links: [
      { label: "Editorial", href: "#services" },
      { label: "Colour", href: "#services" },
      { label: "Sound", href: "#services" },
      { label: "Delivery", href: "#services" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Brand films", href: "#work" },
      { label: "Commercials", href: "#work" },
      { label: "Documentary", href: "#work" },
      { label: "Social", href: "#work" },
      { label: "Showreel", href: "#reel" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "#process" },
      { label: "Process", href: "#process" },
      { label: "Clients", href: "#clients" },
      { label: "Careers", href: "#contact" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Start a project", href: "#contact" },
      { label: "Book a call", href: "#contact" },
      { label: "Instagram", href: "#contact" },
      { label: "Vimeo", href: "#contact" },
    ],
  },
];

export const footerLegal = [
  { label: "Privacy", href: "#contact" },
  { label: "Terms", href: "#contact" },
];

/** Shown beside the copyright line. Remove once real client work replaces the
 *  placeholder projects — see docs/content-guide.md. */
export const footerDisclaimer =
  "Portfolio pieces shown are placeholders pending client approval.";
