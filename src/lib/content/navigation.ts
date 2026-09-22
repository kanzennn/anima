/**
 * Header and footer navigation. The site is a single route today, so every
 * link is an in-page anchor — when a second route appears, the entries that
 * become real paths move here unchanged and the header's active-state logic
 * picks them up.
 */

export const siteName = "Anima";

export const navLinks = [
  { label: "Product", href: "#product", hasMenu: true },
  { label: "Templates", href: "#templates", hasMenu: false },
  { label: "Teams", href: "#teams", hasMenu: false },
  { label: "Pricing", href: "#pricing", hasMenu: false },
  { label: "Resources", href: "#resources", hasMenu: true },
];

/** Panel shown under the nav entries flagged `hasMenu`. */
export const productMenu = [
  {
    title: "Editor",
    body: "Keyframes, curves, and layers in the browser.",
    href: "#product",
  },
  {
    title: "Brand kits",
    body: "Fonts, colors, and logos locked to your system.",
    href: "#teams",
  },
  {
    title: "Auto-resize",
    body: "One master, every channel ratio, in one pass.",
    href: "#resize",
  },
  {
    title: "Export",
    body: "MP4, GIF, WebM, Lottie, and transparent renders.",
    href: "#resize",
  },
];

export const headerActions = {
  login: { label: "Log in", href: "#start" },
  signup: { label: "Start for free", href: "#start" },
};

export const footerTagline =
  "Collaborative motion design for teams that ship on a calendar, not a render queue.";

export const footerNav = [
  {
    title: "Product",
    links: [
      { label: "Editor", href: "#product" },
      { label: "Auto-resize", href: "#resize" },
      { label: "Brand kits", href: "#teams" },
      { label: "Exports", href: "#resize" },
      { label: "Changelog", href: "#resources" },
    ],
  },
  {
    title: "Templates",
    links: [
      { label: "Social ads", href: "#templates" },
      { label: "Explainers", href: "#templates" },
      { label: "Product drops", href: "#templates" },
      { label: "Logo stings", href: "#templates" },
      { label: "All templates", href: "#templates" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#resources" },
      { label: "Careers", href: "#resources" },
      { label: "Press kit", href: "#resources" },
      { label: "Contact", href: "#resources" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "#resources" },
      { label: "Motion guide", href: "#resources" },
      { label: "API docs", href: "#resources" },
      { label: "Status", href: "#resources" },
      { label: "Community", href: "#resources" },
    ],
  },
];

export const footerLegal = [
  { label: "Privacy", href: "#resources" },
  { label: "Terms", href: "#resources" },
  { label: "Cookies", href: "#resources" },
];

/** Shown beside the copyright line. */
export const footerDisclaimer =
  "A demo build — not affiliated with any existing product.";
