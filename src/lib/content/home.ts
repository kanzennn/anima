import type { GlyphId } from "./types";

export const hero = {
  eyebrow: "Post-production studio · Accepting Q2 bookings",
  title: { lead: "We cut the film", accent: "people finish watching" },
  body: "Anima is a post-production studio for brands and agencies. Editorial, colour, sound, and delivery under one roof — so the story survives the schedule.",
  primaryAction: { label: "Start a project", href: "#contact" },
  secondaryAction: { label: "Watch the showreel", href: "#reel" },
  footnote: "Typical first cut within five working days.",
};

/** Drives the showreel player in the hero: clip strip and timeline bars. */
export const showreel = {
  title: "Anima — Reel 2026",
  timecode: "00:00 / 02:14",
  formatLabel: "4K · ProRes 422 HQ",
  chapterLabel: "Selected work",
  ratios: ["16:9", "2.39:1", "9:16", "1:1"],
  frame: { badge: "Now playing", headline: ["Reel", "2026."] },
  /** Timeline tracks. `start`/`width` are percentages of the track. */
  tracks: [
    { name: "V2 · Titles", tint: "bg-accent-violet", start: 4, width: 62 },
    { name: "V1 · Picture", tint: "bg-accent-cyan", start: 0, width: 92 },
    { name: "A1 · Dialogue", tint: "bg-secondary", start: 12, width: 70 },
    { name: "A2 · Music", tint: "bg-accent-lavender", start: 30, width: 58 },
    { name: "A3 · Atmos", tint: "bg-icon-muted", start: 46, width: 38 },
  ],
};

export const clientMarquee = {
  label: "Trusted in the edit by",
  /** Placeholder names — replace with real client logos before launch. */
  clients: [
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

export const services = {
  eyebrow: "Services",
  title: "Everything after the shoot.",
  subtitle: "One studio, one timeline, one point of contact.",
  items: [
    {
      glyph: "cut" as GlyphId,
      title: "Editorial",
      body: "Story first. We build structure from the rushes, then cut for rhythm — assembly through picture lock, with versions that stay legible.",
    },
    {
      glyph: "color" as GlyphId,
      title: "Colour",
      body: "Grading, shot matching, and clean-up. Camera-native workflows from log to final master, graded on calibrated reference.",
    },
    {
      glyph: "sound" as GlyphId,
      title: "Sound",
      body: "Dialogue cleanup, sound design, and mix. Music supervision and licensing when the track has to carry the piece.",
    },
    {
      glyph: "delivery" as GlyphId,
      title: "Delivery",
      body: "Spec-correct masters for every placement — broadcast, cinema, and social — including subtitles, versioning, and archive.",
    },
  ],
  /** The wide callout below the services grid. */
  callout: {
    glyph: "bolt" as GlyphId,
    title: "Cutting rooms that stay open between revisions",
    body: "Review links go out the same day, notes come back timecoded, and the project stays online for a year after delivery.",
    /** Placeholder figures — replace with real numbers before launch. */
    stats: [
      { label: "First cut", value: "5 days" },
      { label: "Projects", value: "140+" },
    ],
  },
};

export const work = {
  eyebrow: "Selected work",
  title: "Recent cuts",
  body: "A sample of brand films, commercials, and documentary work. Full case studies and the extended reel are available on request.",
  action: { label: "Request the full reel", href: "#contact" },
  /** Placeholder projects — replace with real client work before launch. */
  items: [
    {
      name: "Low Tide",
      client: "Tidepool",
      discipline: "Brand film",
      runtime: "3:40",
      year: "2026",
      tint: "gradient-brand",
      ink: "text-inverse-on-surface",
    },
    {
      name: "The Long Way",
      client: "Fernweh",
      discipline: "Documentary",
      runtime: "18:02",
      year: "2025",
      tint: "bg-inverse-surface",
      ink: "text-inverse-on-surface",
    },
    {
      name: "Second Shift",
      client: "Cadence",
      discipline: "Commercial",
      runtime: "0:60",
      year: "2025",
      tint: "bg-secondary",
      ink: "text-on-secondary",
    },
    {
      name: "Nightline",
      client: "Orbital",
      discipline: "Title sequence",
      runtime: "1:12",
      year: "2025",
      tint: "bg-accent-cyan",
      ink: "text-inverse-on-surface",
    },
    {
      name: "Field Notes",
      client: "Beacon Labs",
      discipline: "Social campaign",
      runtime: "0:30",
      year: "2024",
      tint: "gradient-lavender",
      ink: "text-primary",
    },
    {
      name: "Carry It Home",
      client: "Halcyon",
      discipline: "Brand film",
      runtime: "2:25",
      year: "2024",
      tint: "bg-accent-violet",
      ink: "text-inverse-on-surface",
    },
  ],
};

export const process = {
  eyebrow: "Process",
  title: "How a project runs from rushes to master",
  body: "Four stages, each with something to watch at the end of it. No silent weeks, and no surprise at picture lock.",
  steps: [
    {
      step: "01",
      title: "Brief and rushes",
      body: "We read the brief, ingest the footage, and come back with a structure before anything gets cut — so the plan is agreed, not assumed.",
    },
    {
      step: "02",
      title: "Assembly",
      body: "A first cut within five working days. Rough, honest, and long enough to see what the piece actually wants to be.",
    },
    {
      step: "03",
      title: "Refine",
      body: "Timecoded notes, versioned rounds, picture lock. Colour and sound start in parallel once the structure stops moving.",
    },
    {
      step: "04",
      title: "Deliver",
      body: "Masters to spec for every placement, plus the versions nobody remembered to ask for. Project stays online for a year.",
    },
  ],
  /** Placeholder figures — replace with real numbers before launch. */
  stats: [
    { value: "140+", label: "Projects delivered" },
    { value: "12", label: "Years in the cutting room" },
    { value: "1 yr", label: "Projects kept online post-delivery" },
  ],
};

export const testimonials = {
  eyebrow: "Clients",
  title: "What it's like on the other side of the edit",
  /** Placeholder quotes and names — replace with approved client stories. */
  items: [
    {
      quote:
        "They came back with a structure before touching the timeline, and it was better than the one in our brief. That set the tone for the whole job.",
      name: "Devi Raman",
      role: "Creative Director, Northwind",
      tint: "gradient-brand",
    },
    {
      quote:
        "Notes went back timecoded and came back done. Three rounds, no version confusion, no rebuilding anything from scratch.",
      name: "Jonas Vetter",
      role: "Head of Content, Cadence",
      tint: "gradient-lavender",
    },
    {
      quote:
        "We needed broadcast, cinema, and eleven social cutdowns off one master. All of it landed to spec, first time.",
      name: "Amara Okonkwo",
      role: "Brand Lead, Orbital",
      tint: "bg-accent-cyan",
    },
  ],
};

export const contact = {
  title: "Tell us what you're cutting",
  body: "Send the brief, the rushes, or just the deadline. We'll come back with a plan, a schedule, and a number.",
  primaryAction: { label: "Start a project", href: "#contact" },
  secondaryAction: { label: "Book a call", href: "#contact" },
  /** Placeholder details — replace with the studio's real contact routes. */
  email: "hello@anima.studio",
  location: "Jakarta · Working worldwide",
};
