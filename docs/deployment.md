# Deployment

## Commands

| Command         | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Dev server with Fast Refresh     |
| `npm run build` | Production build                 |
| `npm start`     | Serve the production build       |
| `npm run lint`  | ESLint                           |

The dev server runs on **port 3001** in this workspace — `company-profile`
holds 3000. Both are registered in the workspace-level
`.claude/launch.json`.

## Hosting requirements

The build output is fully static. Every route prerenders to HTML, so this can
be served by any static host — but the security headers in `next.config.ts`
are applied by the Next.js server, **not** baked into the HTML.

That gives two options:

1. **Run the Node server** (`npm start`, or a platform that runs Next.js
   natively). Headers ship as configured. This is the default assumption.
2. **Serve the static output from a CDN or plain file host.** The
   `headers()` config is then ignored, and every header in
   [Security](./security.md) has to be reconfigured at the edge — CDN rules,
   `_headers`, nginx, whatever the host uses.

If you take option 2 and skip that step, the site still works and looks
identical, while silently shipping no CSP, no HSTS, and no clickjacking
protection. Verify with the curl check below rather than assuming.

## Environment variables

| Variable               | Required | Purpose                                      |
| ---------------------- | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Overrides the absolute base URL for metadata, Open Graph, `robots.txt`, `sitemap.xml` |

Resolution order in `src/lib/site-url.ts`:

1. `NEXT_PUBLIC_SITE_URL`, if set
2. The production domain constant, when `NODE_ENV === "production"`
3. `http://localhost:3001` in development

**Set the override explicitly on preview/staging deployments.** Without it, a
staging build emits the production domain in its sitemap and canonical URLs,
and crawlers resolve staging content against the live domain.

Anything prefixed `NEXT_PUBLIC_` is inlined into the client bundle and is
public by definition. Never put a real secret behind that prefix.
`.env.example` documents the variable and holds no real values.

## The domain

`src/lib/site-url.ts` hardcodes the production origin:

```ts
const PRODUCTION_URL = "https://anima.kervzent.kanzen.my.id";
```

This is a subdomain of the Kervzent domain used by the sibling
`company-profile` project. Confirm DNS actually resolves and serves TLS before
the first production deploy — the sitemap, canonical URLs, and every Open Graph
tag are built from this value.

Note the deliberate design: production falls back to the real domain rather
than `localhost`, so a deploy that forgets the env var still emits reachable
URLs instead of publishing `http://localhost:3001` to crawlers.

## Post-deploy header verification

After any deploy, confirm the headers actually arrived:

```bash
curl -s -D - -o /dev/null https://your-domain/ | grep -iE 'content-security|strict-transport|x-content-type|referrer-policy|permissions-policy|x-powered-by'
```

Expected: five headers present, and **no** `X-Powered-By` line
(`poweredByHeader: false` removes it). If `X-Powered-By: Next.js` comes back,
something is serving the app outside the configured server.

Also confirm the sitemap resolves to the real domain, not localhost:

```bash
curl -s https://your-domain/sitemap.xml
```

## Pre-launch checklist

- [ ] Confirm `anima.kervzent.kanzen.my.id` resolves and serves TLS
- [ ] **Replace every placeholder listed in
      [Content guide](./content-guide.md#placeholders-that-must-be-replaced)** —
      the invented client work is the blocking item, not a cosmetic one
- [ ] Remove the footer disclaimer once the real work is in
- [ ] Swap the showreel mock for the real reel
      ([notes](./animations.md#the-showreel-player))
- [ ] Point `contact.email` at a real, monitored mailbox
- [ ] Add an Open Graph image (`opengraph-image.tsx` or a static asset) — the
      Twitter card is declared `summary_large_image` but no image exists yet
- [ ] Decide on TWK Lausanne: buy and self-host it, or accept the Inter Tight
      substitution ([details](./design-system.md#fonts))
- [ ] `npm run build` lists every route as `○ (Static)`
- [ ] `npm run lint` passes
- [ ] Headers verified with the curl check above
- [ ] Set `NEXT_PUBLIC_SITE_URL` on any preview/staging environment
- [ ] Consider HSTS `preload` once the domain is settled — it is deliberately
      omitted for now ([rationale](./security.md#hsts))
