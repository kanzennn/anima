# Security

The threat surface here is small by construction: a fully static site with no
route handlers, no server actions, no forms, no database, no authentication,
and no third-party scripts. There is no user input anywhere in the build, so
the usual injection categories have nothing to attach to.

That is the assumption the rest of this document rests on. **Re-audit the
moment it stops being true** — an API route, a form handler, a CMS
integration, an analytics snippet, or user-generated content each reopen
categories of risk this build starts out without.

## Headers shipped

Configured in [`next.config.ts`](../next.config.ts), applied to every route via
`headers()`. Verified against a production server:

| Header                      | Value                                                        |
| --------------------------- | ------------------------------------------------------------ |
| `Content-Security-Policy`   | See below — environment-aware                                |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains`                        |
| `X-Content-Type-Options`    | `nosniff`                                                    |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                            |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `X-Powered-By`              | Removed via `poweredByHeader: false`                         |

These are applied by the Next.js server. If the static output is ever served
straight off a CDN, none of them ship — see
[Deployment](./deployment.md#hosting-requirements).

## Content Security Policy

Production value:

```
default-src 'self'
script-src 'self' 'unsafe-inline'
style-src 'self' 'unsafe-inline'
img-src 'self' data: blob:
media-src 'self'
font-src 'self'
connect-src 'self'
frame-ancestors 'none'
base-uri 'self'
form-action 'self'
object-src 'none'
upgrade-insecure-requests
```

Development additionally gets `'unsafe-eval'` in `script-src` (HMR needs it)
and `ws: wss:` in `connect-src` (Fast Refresh), and drops
`upgrade-insecure-requests`, which would otherwise try to upgrade
`http://localhost`.

### Why `unsafe-inline` is in script-src

The App Router inlines RSC payload and bootstrap scripts into the HTML. A
strict policy would need per-request nonces, which requires middleware — and
middleware forces every route to render dynamically, throwing away the static
prerender that is the entire rendering model of this project.

The trade-off is accepted **specifically because** this site has no user input
and no XSS sinks: nothing on the page is derived from a query string, a form,
a cookie, or a database. There is no injection point for an attacker to reach.

It weakens the XSS arm of the policy. It does not affect `frame-ancestors`,
which is what closes the clickjacking gap, and that remains `'none'`.

Revisit this the moment the project gains a form, user-generated content, or a
third-party script.

### Why `font-src 'self'` is enough

Fonts come from `next/font/google`, which downloads and self-hosts them at
build time. The browser never contacts Google, so no external font origin
needs allowing — and no requests leak visitor IPs to a third party.

### Never widen these

If the project ever talks to an external endpoint — a form service, an
analytics collector, an API — extend `connect-src` and `form-action` with that
**specific origin**. Never widen either to `*`. The pattern to copy is in the
sibling `company-profile` project, which derives the allowed origin from the
same environment variable the client reads, so the header and the request
cannot drift apart.

## HSTS

`preload` is deliberately omitted. Submitting to the browser preload list is a
long-lived, hard-to-reverse commitment covering the apex domain and every
subdomain. Opt in once the domain is settled and you're confident every
subdomain can serve HTTPS — don't default to it.

The header is inert over plain HTTP, so it costs nothing until TLS is live.

## Error handling

`src/app/error.tsx` renders a generic message and **never** exposes the `error`
object, its message, or a stack trace to the client. That's an information leak
in a browser. If error reporting is added later, send the object to the logging
service from inside that component — don't render it.

## Secrets

`.gitignore` covers `.env*` with a `!.env.example` exception. `.env.example`
holds no real values — only the `NEXT_PUBLIC_SITE_URL` placeholder.

Anything prefixed `NEXT_PUBLIC_` is inlined into the client bundle and is
public by definition. Never put a real secret behind that prefix.

## Dependencies

Runtime dependencies are `next`, `react`, and `react-dom` — nothing else. No
animation library, no UI kit, no icon package (the icons are hand-written SVG
in `src/components/ui/Marks.tsx`). That keeps the supply-chain surface about as
small as a Next.js project gets, and it's worth preserving: each new runtime
dependency is code shipped to visitors.

## Audit status

**No formal security audit has been run against this project.** The workspace
standard reserves `audit/` for dated audit reports; that folder does not exist
here yet. The contents of this document are design rationale, not audit
findings.
