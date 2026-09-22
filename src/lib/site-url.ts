/**
 * Absolute base URL for metadata, Open Graph tags, robots.txt and sitemap.xml.
 *
 * Production falls back to the real domain rather than localhost: a deploy that
 * forgets the environment variable then still emits correct, reachable URLs
 * instead of silently publishing `http://localhost:3001` to crawlers and social
 * cards. `NEXT_PUBLIC_SITE_URL` still overrides, which preview deployments need.
 *
 * PLACEHOLDER: no domain has been registered for this project yet. Replace the
 * constant below before the first production deploy, or set the env var.
 */
const PRODUCTION_URL = "https://anima.kanzen.my.id";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? PRODUCTION_URL
    : "http://localhost:3001");
