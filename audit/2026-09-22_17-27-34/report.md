# Security Audit Report — Anima

| | |
|---|---|
| **Target** | `D:\Workplace\Code\Kervzent\anima` |
| **Revision** | `a551f7e` (branch `main`) |
| **Date** | 2026-09-22 17:27:34 |
| **Standard** | OWASP Top 10 (2025) |
| **Reviewer** | Claude Code — `security-audit` skill |
| **Scope** | Full source tree (`src/`, `public/`, `next.config.ts`, manifests). Static Next.js 16 portfolio site — no backend. |

## Executive summary

Anima has a very small attack surface by construction, and the review found no
exploitable vulnerabilities. It is a fully static site: no route handlers, no
server actions, no middleware, no database, no authentication, and no forms.
Every value rendered on the page is a compile-time constant from
`src/lib/content/`, so there is no untrusted input anywhere for an attacker to
reach a sink with. A full source sweep for injection, XSS, command execution,
deserialization, hardcoded secrets and weak cryptography returned nothing, and
`npm audit` reports zero known vulnerabilities across three runtime dependencies.

The six findings are all **Low** or **Info** — hardening and hygiene, not
exploitable defects. The most useful one to act on is **F-001**: five unused
`create-next-app` placeholder assets are still published under `public/`. The
most important thing to get *right operationally* is **F-003**: the entire
security-header baseline is applied by the Next.js server, so deploying the
output as plain static files to a CDN would silently ship the site with no CSP,
no HSTS and no clickjacking protection.

## Findings by severity

| Severity | Count |
|----------|-------|
| 🔴 Critical | 0 |
| 🟠 High | 0 |
| 🟡 Medium | 0 |
| 🔵 Low | 3 |
| ⚪ Info | 3 |
| **Total** | **6** |

## Remediation status

Fixes were applied in the same session, at the user's request, immediately after
the review. The findings below are preserved as written at audit time; this table
records what changed afterwards.

| ID | Finding | Status | Change |
|----|---------|--------|--------|
| F-001 | Unused scaffold assets in `public/` | ✅ Fixed | Deleted all five files. |
| F-002 | `img-src` permits unused `data:`/`blob:` | ✅ Fixed | Narrowed to `img-src 'self'`. Verified with a production build: all three SVGs load, zero `securitypolicyviolation` events. |
| F-003 | Headers vanish on a static-file deploy | 📋 Accepted | No code fix exists — the mitigation is operational. Already documented in `docs/deployment.md`, including the post-deploy `curl` check. |
| F-004 | `script-src 'unsafe-inline'` | 📋 Accepted | Deliberate trade-off for the static prerender. Documented in `docs/security.md`; revisit if the site gains input. |
| F-005 | No automated dependency scanning | ✅ Fixed | Added `.github/workflows/audit.yml` — runs on push, PR, and weekly. |
| F-006 | No logging or alerting | 📋 Accepted | Nothing application-level to log on a static site; a hosting-layer concern. |

## OWASP Top 10 (2025) coverage

Status: ✅ assessed, no issues · ⛔ issues found · ⚠️ needs manual follow-up · ➖ not applicable

| # | Category | Status | Findings |
|---|----------|--------|----------|
| A01 | Broken Access Control | ➖ | No authenticated resources, no object access by id, no server-side fetches of user-supplied URLs (no SSRF surface), no state-changing requests (no CSRF surface). `frame-ancestors 'none'` is set. |
| A02 | Security Misconfiguration | ⛔ | F-001, F-002, F-003, F-004 |
| A03 | Software Supply Chain Failures | ⛔ | F-005. `npm audit` clean; lockfile present and committed; 3 runtime deps. |
| A04 | Cryptographic Failures | ✅ | No secrets in source, no crypto implemented, no weak algorithms, HSTS set. Nothing sensitive is stored or transmitted. |
| A05 | Injection | ✅ | No SQL/NoSQL/OS-command sinks. No `dangerouslySetInnerHTML`, `innerHTML`, `eval`, or `new Function`. All rendered values are compile-time constants. |
| A06 | Insecure Design | ➖ | No business logic, transactions, workflows, or abusable features. Contact is a `mailto:` link, not a submitted form. |
| A07 | Authentication Failures | ➖ | No authentication, sessions, tokens, or accounts exist. |
| A08 | Software or Data Integrity Failures | ✅ | No deserialization. No third-party scripts, so no SRI gap. All served SVGs verified inert (no `<script>`, event handlers, or `javascript:` URIs). |
| A09 | Security Logging and Alerting Failures | ⚪ | F-006. No application-level events exist to log; this is a hosting-layer concern. |
| A10 | Mishandling of Exceptional Conditions | ✅ | `error.tsx` renders a generic message and deliberately never exposes the `error` object or a stack trace. No security checks exist that could fail open. |

## Findings

### F-001 — Unused framework placeholder assets published under `public/`

| | |
|---|---|
| **Severity** | 🔵 Low |
| **Confidence** | High |
| **OWASP** | `A02:2025 Security Misconfiguration` |
| **CWE** | `CWE-1188 Initialization of a Resource with an Insecure Default` |
| **Location** | `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` |

**Description.** Five SVG files scaffolded by `create-next-app` are still present
in `public/` and are therefore published at the site root. Nothing in `src/`
references any of them — verified by grepping each filename across the source
tree, which returned zero hits for all five. They are inert (no scripts), so this
is hygiene rather than an exploitable flaw: shipping unused default artifacts
advertises the scaffold used and leaves files served that nobody reviews.

**Evidence.**
```text
public/file.svg   referenced in src: 0
public/globe.svg  referenced in src: 0
public/next.svg   referenced in src: 0
public/vercel.svg referenced in src: 0
public/window.svg referenced in src: 0
```

**Impact.** Minor information disclosure (fingerprints the project as an
unmodified `create-next-app` scaffold) and unnecessary published surface. No
code execution or data exposure.

**Remediation.** Delete them. Everything the site actually uses lives in
`public/brand/`.
```bash
git rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

**References.** `OWASP A02:2025 Security Misconfiguration` · `CWE-1188`

---

### F-002 — `img-src` permits `data:` and `blob:` that nothing uses

| | |
|---|---|
| **Severity** | 🔵 Low |
| **Confidence** | High |
| **OWASP** | `A02:2025 Security Misconfiguration` |
| **CWE** | `CWE-693 Protection Mechanism Failure` |
| **Location** | `next.config.ts:24` |

**Description.** The Content-Security-Policy allows images from `data:` and
`blob:` URIs. The site loads exactly three images, all same-origin SVGs from
`/brand/`, and uses no `next/image`, no canvas export, and no runtime-generated
image sources — so neither scheme is exercised. `data:` in `img-src` is a
commonly-cited CSP weakness because it lets an attacker who achieves any HTML
injection render arbitrary inline image payloads, and it is a known vector for
data exfiltration in some contexts.

**Evidence.**
```text
next.config.ts:24
  "img-src 'self' data: blob:",
```

**Impact.** Defence-in-depth only. With no XSS sink present there is no path to
abuse it today; the concern is that the policy is looser than the application
requires, so it would not constrain a future injection bug.

**Remediation.** Narrow to what is actually used. Re-widen deliberately if
`next/image` or inline data URIs are ever introduced.
```ts
// next.config.ts
"img-src 'self'",
```

**References.** `OWASP A02:2025 Security Misconfiguration` · `CWE-693`

---

### F-003 — Security headers are server-applied and vanish on a static-file deploy

| | |
|---|---|
| **Severity** | 🔵 Low |
| **Confidence** | High |
| **OWASP** | `A02:2025 Security Misconfiguration` |
| **CWE** | `CWE-16 Configuration` |
| **Location** | `next.config.ts:38-52` (`headers()`) |

**Description.** The whole baseline — CSP, HSTS, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy` — is delivered through Next.js's
`headers()` hook, which only runs when the Next.js server serves the request.
Because every route in this project prerenders to static HTML, it is tempting to
publish the output to a plain CDN or object store; doing so drops `headers()`
entirely. The failure is silent: the site looks and works identically while
serving no CSP, no HSTS and no framing protection.

This is already documented in `docs/deployment.md`, which is why it is rated Low
rather than Medium — it is a known, written-down operational risk rather than an
unnoticed one.

**Evidence.**
```ts
// next.config.ts:54-59 — headers only exist if the Next.js server handles the request
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
```

**Impact.** On a misconfigured static deploy: the site becomes framable
(clickjacking), loses HTTPS pinning via HSTS, loses MIME-sniffing protection, and
loses the CSP that would contain any future injection. Impact is bounded because
the site has no login, no session, and no state-changing actions to hijack.

**Remediation.** Either run the Next.js server (`npm start` or a platform that
runs Next natively), or replicate the headers at the edge. Verify after every
deploy rather than assuming:
```bash
curl -s -D - -o /dev/null https://anima.kervzent.kanzen.my.id/ \
  | grep -iE 'content-security|strict-transport|x-content-type|referrer-policy|permissions-policy'
```

**References.** `OWASP A02:2025 Security Misconfiguration` · `CWE-16`

---

### F-004 — CSP carries `script-src 'unsafe-inline'`

| | |
|---|---|
| **Severity** | ⚪ Info |
| **Confidence** | High |
| **OWASP** | `A02:2025 Security Misconfiguration` |
| **CWE** | `CWE-1021 Improper Restriction of Rendered UI Layers` |
| **Location** | `next.config.ts:21` |

**Description.** `script-src` includes `'unsafe-inline'`, which disables CSP's
protection against injected inline scripts. This is a deliberate, documented
trade-off: the App Router inlines RSC payload and bootstrap scripts, and the
nonce-based alternative requires middleware, which would force every route to
render per-request and discard the static prerender that is this project's entire
rendering model. Recorded here so the decision stays visible rather than becoming
invisible inherited config.

**Evidence.**
```ts
next.config.ts:21
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
```

**Impact.** None today: the audit found no XSS sink and no untrusted input
anywhere in the application, so there is nothing to inject through. The exposure
is latent — it would matter the moment the site gains a form, user-generated
content, query-string-driven rendering, or a third-party script.

**Remediation.** Keep as-is while the site stays static and input-free. Revisit
immediately if any of the above is added; at that point the choice is nonce-based
CSP via middleware (accepting dynamic rendering) or moving the dynamic part
behind a separate origin. `frame-ancestors 'none'` is unaffected and continues to
close the clickjacking gap.

**References.** `OWASP A02:2025 Security Misconfiguration` · `docs/security.md`

---

### F-005 — No automated dependency scanning

| | |
|---|---|
| **Severity** | ⚪ Info |
| **Confidence** | High |
| **OWASP** | `A03:2025 Software Supply Chain Failures` |
| **CWE** | `CWE-1104 Use of Unmaintained Third Party Components` |
| **Location** | repository root (no CI configuration present) |

**Description.** The dependency position is currently healthy: three runtime
dependencies (`next`, `react`, `react-dom`), a committed `package-lock.json`, and
`npm audit` reporting zero vulnerabilities for both production and dev trees. But
nothing runs that check automatically, so a future advisory against Next.js or
React would go unnoticed until someone happens to run it by hand.

**Evidence.**
```text
$ npm audit --omit=dev
found 0 vulnerabilities

$ npm audit
found 0 vulnerabilities
```

**Impact.** No current exposure. Risk is that the clean state silently decays.

**Remediation.** Add `npm audit --audit-level=high` to CI when CI is introduced,
or enable Dependabot / Renovate on the GitHub repository. A minimal start:
```yaml
# .github/workflows/audit.yml
on: [push, pull_request, schedule]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm audit --audit-level=high
```

**References.** `OWASP A03:2025 Software Supply Chain Failures` · `CWE-1104`

---

### F-006 — No logging or alerting

| | |
|---|---|
| **Severity** | ⚪ Info |
| **Confidence** | High |
| **OWASP** | `A09:2025 Security Logging and Alerting Failures` |
| **CWE** | `CWE-778 Insufficient Logging` |
| **Location** | application-wide |

**Description.** The application emits no logs. For this codebase that is close
to correct rather than a defect: there are no logins, no access-control
decisions, no transactions and no high-value actions to record, so
application-level logging would have nothing meaningful to capture. Noted because
the picture changes the moment a contact form, analytics, or any server logic is
added.

**Impact.** Attacks against the hosting layer (scanning, brute-forcing paths,
abnormal traffic) would be invisible unless the host records them independently.
No application-level attack surface exists to miss.

**Remediation.** Rely on the hosting platform's access logs and enable whatever
anomaly alerting it offers. Introduce application logging together with the first
server-side feature, and when doing so keep secrets, tokens and PII out of the
log stream — over-logging is itself a vulnerability under this category.

**References.** `OWASP A09:2025 Security Logging and Alerting Failures` · `CWE-778`

---

## Scope & limitations

- **Reviewed:** the complete source tree — all 21 `.tsx`/`.ts` files under `src/`,
  `next.config.ts`, `package.json`, `package-lock.json`, `.gitignore`,
  `.env.example`, and every file served from `public/`. Verified the absence of
  route handlers, server actions and middleware by pattern search. Confirmed the
  shipped headers empirically by running `next start` and inspecting responses for
  both an HTML document and a static asset. Confirmed the production build emits
  no client-side source maps. Confirmed all served SVGs are inert.
- **Sampled or not covered:** transitive dependency source was not read — the
  supply-chain assessment relies on `npm audit` and version inspection. Hosting,
  DNS, TLS configuration and the CI/CD pipeline are outside the repository and
  were not assessed; note that `anima.kervzent.kanzen.my.id` was not resolved or
  probed, so the live deployment's headers are unverified. Third-party font
  delivery was checked only to the extent that `next/font` self-hosts at build
  time.
- **Method:** static source-code review against the OWASP Top 10 (2025), tracing
  untrusted input from entry points to sinks; severity = exploitability × impact.
  The controlling observation throughout is that this application has no untrusted
  input: no route handlers, no forms, no query-string reads, and no runtime data
  source — every rendered value originates as a constant in `src/lib/content/`.
- **Not a substitute for:** a dependency vulnerability scan on a schedule, dynamic
  testing (DAST) against the deployed origin, and a manual penetration test. This
  review complements those.
