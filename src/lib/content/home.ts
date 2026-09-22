import type { GlyphId } from "./types";

export const hero = {
  eyebrow: "Auto-resize now covers 14 ad formats",
  title: { lead: "Animated content,", accent: "at brand speed" },
  body: "Anima is the collaborative motion design tool for marketing teams. Start from a template, animate in the browser, and ship every size your channels need — without a render queue or a handoff.",
  primaryAction: { label: "Start for free", href: "#start" },
  secondaryAction: { label: "Watch a 90-second tour", href: "#product" },
  footnote: "No credit card. Unlimited projects on the free plan.",
};

/** Drives the editor mock in the hero: layer rail names and timeline bars. */
export const editorMock = {
  projectName: "Spring drop / hero cutdown",
  timecode: "00:00 / 00:06",
  easingLabel: "Spring · 380 stiffness",
  exportLabel: "Export",
  ratios: ["1:1", "9:16", "16:9", "4:5"],
  canvas: { badge: "New season", headline: ["Move", "faster."] },
  layers: [
    { name: "Headline", tint: "bg-accent-violet", start: 4, width: 62 },
    { name: "Product shot", tint: "bg-accent-cyan", start: 12, width: 70 },
    { name: "Price badge", tint: "bg-secondary", start: 30, width: 48 },
    { name: "Logo sting", tint: "bg-accent-lavender", start: 46, width: 38 },
    { name: "Background", tint: "bg-icon-muted", start: 0, width: 92 },
  ],
};

export const customerMarquee = {
  label: "Motion systems running on Anima at",
  /** Placeholder names — replace with real customer logos before launch. */
  customers: [
    "Northwind",
    "Cadence",
    "Tidepool",
    "Beacon Labs",
    "Orbital",
    "Fernweh",
    "Lumen Co.",
    "Halcyon",
  ],
};

export const features = {
  eyebrow: "The editor",
  title: "Everything you need to animate.",
  subtitle: "Nothing you need to render overnight.",
  items: [
    {
      glyph: "layers" as GlyphId,
      title: "A real timeline, in the browser",
      body: "Keyframes, easing curves, nested comps, and masks — the tools motion designers expect, with nothing to install.",
    },
    {
      glyph: "spark" as GlyphId,
      title: "Presets that carry your brand",
      body: "Save an entrance, a transition, or a whole sequence as a preset. Anyone on the team can apply it in one click.",
    },
    {
      glyph: "users" as GlyphId,
      title: "Comment where it happened",
      body: "Feedback pins to a frame and a layer, so notes stop arriving as timestamps in a spreadsheet.",
    },
    {
      glyph: "resize" as GlyphId,
      title: "Resize once, ship everywhere",
      body: "Smart layout rules re-flow a master composition into every ratio your channels need — then export the set.",
    },
  ],
  /** The wide callout below the feature grid. */
  callout: {
    glyph: "bolt" as GlyphId,
    title: "Renders finish while you are still reviewing",
    body: "Exports run on our infrastructure, in parallel, at up to 4K. A twelve-format set is typically ready in under a minute.",
    stats: [
      { label: "Avg. export", value: "38s" },
      { label: "Formats", value: "14" },
    ],
  },
};

export const templates = {
  eyebrow: "Templates",
  title: "Start from a blank canvas only if you want to",
  body: "Nine hundred animated templates, each one editable down to the keyframe. Drop in your brand kit and the whole gallery restyles itself.",
  action: { label: "Browse the gallery", href: "#templates" },
  items: [
    { name: "Product drop", category: "Social ad", ratio: "1:1", tint: "gradient-brand", ink: "text-inverse-on-surface" },
    { name: "Feature tour", category: "Explainer", ratio: "16:9", tint: "bg-secondary", ink: "text-on-secondary" },
    { name: "Quote card", category: "Organic", ratio: "4:5", tint: "gradient-lavender", ink: "text-primary" },
    { name: "Countdown", category: "Retail", ratio: "9:16", tint: "bg-inverse-surface", ink: "text-inverse-on-surface" },
    { name: "Logo sting", category: "Brand", ratio: "1:1", tint: "bg-accent-cyan", ink: "text-inverse-on-surface" },
    { name: "Price reveal", category: "Performance", ratio: "1:1", tint: "bg-surface-container", ink: "text-on-surface" },
    { name: "Testimonial", category: "Social proof", ratio: "4:5", tint: "bg-accent-violet", ink: "text-inverse-on-surface" },
    { name: "Event teaser", category: "Announcement", ratio: "16:9", tint: "gradient-brand", ink: "text-inverse-on-surface" },
  ],
};

export const resize = {
  eyebrow: "Auto-resize",
  title: "One master. Every placement.",
  body: "Animate the version you care about. Anima re-flows it into the rest of the media plan and keeps the motion intact, so the fourteenth format looks as deliberate as the first.",
  points: [
    "Layout rules keep type, logo, and safe areas intact at every ratio.",
    "Duration and easing carry across — a six-second master stays six seconds.",
    "Export the whole set as MP4, GIF, WebM, or transparent WebM in one job.",
  ],
  panel: {
    projectName: "Spring drop / hero cutdown",
    counter: "5 of 14",
    progressLabel: "Rendering 10/14",
    /** `box` values are Tailwind aspect/width utilities, not raw sizes. */
    formats: [
      { label: "1:1", box: "aspect-square w-20" },
      { label: "9:16", box: "aspect-[9/16] w-12" },
      { label: "16:9", box: "aspect-video w-28" },
      { label: "4:5", box: "aspect-[4/5] w-16" },
      { label: "2:3", box: "aspect-[2/3] w-14" },
    ],
  },
};

export const teams = {
  eyebrow: "For teams",
  title: "The brand system does the enforcing, so you don’t have to",
  body: "Designers set the rules once. Marketers, partners, and regional teams work inside them. Nobody has to police a font choice in a review call again.",
  steps: [
    {
      step: "01",
      title: "Set the brand kit",
      body: "Fonts, colors, logo lockups, and motion presets live in one place. Everything downstream inherits them.",
    },
    {
      step: "02",
      title: "Hand over the keys",
      body: "Lock the layers that matter and let the wider team swap copy, imagery, and offers without breaking the system.",
    },
    {
      step: "03",
      title: "Review in one thread",
      body: "Comments pin to a frame and a layer. Versions are named, not numbered, and nothing lives in a download folder.",
    },
  ],
  /** Placeholder figures — replace with measured numbers before launch. */
  stats: [
    { value: "4.2×", label: "More variants shipped per campaign" },
    { value: "61%", label: "Less time in review cycles" },
    { value: "900+", label: "Animated templates, brand-aware" },
  ],
};

export const testimonials = {
  eyebrow: "Customers",
  title: "Teams that stopped waiting on renders",
  /** Placeholder quotes and names — replace with approved customer stories. */
  items: [
    {
      quote:
        "We used to budget a week for a campaign's motion set. The last one took an afternoon, and the regional cutdowns came out of the same file.",
      name: "Devi Raman",
      role: "Creative Director, Northwind",
      tint: "gradient-brand",
    },
    {
      quote:
        "Our brand kit lives in the tool now, so the guardrails travel with the work. I stopped being the person who checks kerning on ads.",
      name: "Jonas Vetter",
      role: "Design Lead, Cadence",
      tint: "gradient-lavender",
    },
    {
      quote:
        "The timeline is close enough to what my team already knows that onboarding was a conversation, not a training plan.",
      name: "Amara Okonkwo",
      role: "Head of Brand, Orbital",
      tint: "bg-accent-cyan",
    },
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  title: "Priced per seat, not per render",
  body: "Every plan includes the full editor. The difference is export quality, automation, and how much of it your team shares.",
  yearlyDiscountLabel: "−20%",
  featuredBadge: "Most picked",
  unit: "/editor/mo",
  plans: [
    {
      name: "Free",
      blurb: "For trying the editor on a real project.",
      monthly: 0,
      yearly: 0,
      cta: { label: "Start for free", href: "#start" },
      featured: false,
      features: [
        "Unlimited projects",
        "720p exports with a watermark",
        "3 brand-kit slots",
        "Community templates",
      ],
    },
    {
      name: "Pro",
      blurb: "For designers shipping campaign work every week.",
      monthly: 24,
      yearly: 19,
      cta: { label: "Start 14-day trial", href: "#start" },
      featured: true,
      features: [
        "4K exports, no watermark",
        "Auto-resize across 14 formats",
        "Full template library",
        "Transparent WebM and Lottie",
        "Version history",
      ],
    },
    {
      name: "Team",
      blurb: "For brand systems with more than one owner.",
      monthly: 42,
      yearly: 34,
      cta: { label: "Start 14-day trial", href: "#start" },
      featured: false,
      features: [
        "Everything in Pro",
        "Shared brand kits and locked layers",
        "Comment threads and approvals",
        "Roles and permissions",
        "Priority render queue",
      ],
    },
    {
      name: "Enterprise",
      blurb: "For org-wide rollouts with procurement in the room.",
      monthly: null,
      yearly: null,
      cta: { label: "Talk to sales", href: "#start" },
      featured: false,
      features: [
        "SSO and SCIM provisioning",
        "Audit logs and retention rules",
        "Dedicated onboarding",
        "Custom render capacity",
      ],
    },
  ],
};

export const cta = {
  title: "Your next campaign can move",
  body: "Open the editor, pick a template, and have an animated set exported before the kickoff call is over.",
  primaryAction: { label: "Start for free", href: "#start" },
  secondaryAction: { label: "Book a walkthrough", href: "#start" },
};
