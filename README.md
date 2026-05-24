# Anastasiia Monzón — 3D Visualisation Portfolio

A production portfolio website for **Anastasia Monzon**, a freelance 3D architectural visualisation artist based in Mexico. The site presents selected work across interior, exterior, and landscape projects; documents her four-step client process; provides an about section; and includes a fully functional project enquiry form that delivers branded email notifications via Resend.

## Legal Notice & Usage

**This repository contains proprietary code developed for a commercial client.**

It is publicly viewable strictly for portfolio evaluation and technical demonstration purposes. No licence is granted for the reuse, modification, reproduction, or distribution of any code or contents contained within this repository.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 — App Router |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v3 |
| Typography | Playfair Display · Jost (Google Fonts) |
| Image lightboxes | `yet-another-react-lightbox` |
| Utilities | `clsx` · `tailwind-merge` |
| Email delivery | Resend API |
| Bot protection | Cloudflare Turnstile (invisible mode) |
| Rate limiting | Cloudflare KV |
| Deployment | Cloudflare Pages via `@opennextjs/cloudflare` |

## Architecture

The application follows the Next.js App Router convention with a clean `/app`, `/components`, `/data`, and `/types` separation.

### Content model

All site copy, project data, and configuration live in a single source of truth: **`data/portfolio.ts`**. Sections import only the constants they need. This means editorial updates — headlines, bios, social links, process steps, project entries — never require touching component files.

Type definitions for all data shapes are co-located in **`types/index.ts`** (`Project`, `ProjectDetail`, `ProcessStep`, `NavLink`, `SocialLink`, `ContactMetaItem`, and so on).

### Page sections

The single-page home (`app/page.tsx`) renders the following sections in order:

1. **`SiteHeader`** — Fixed header with transparent-to-frosted-glass scroll transition. Includes a fully accessible mobile overlay menu: focus trap, `aria-modal`, `Escape`-to-close, and staggered-reveal animation on the nav items.

2. **`HeroSection`** — Full-viewport introduction with a background image at 40% opacity and a warm gradient overlay. Contains the artist's name, tagline, CTA buttons, and a pull quote.

3. **`WorkSection`** — Two-column project grid. Displays the first five projects by default; a button reveals the full set. Each card links to a dynamic case study page.

4. **`ProcessSection`** — Four-step process grid on a warm-cream background, collapsing to two columns on tablet and a single column on mobile.

5. **`AboutSection`** — Portrait and editorial biography; a pull quote sidebar on desktop, inline on mobile; discipline tags.

6. **`SocialSection`** — Editorial, typographic-led section linking to Behance and LinkedIn. No fake thumbnails — the platform names and handles are styled as large serif italic type, consistent with the Vogue-adjacent aesthetic of the rest of the site.

7. **`ContactSection`** — Left column with email, timezone, and response-time metadata; right column with the project enquiry form.

8. **`SiteFooter`** — Dark footer strip with copyright and page navigation links.

### Case study pages

`app/work/[slug]/page.tsx` dynamically resolves slugs against the `detailedProjects` array in `data/portfolio.ts`. Each project has a `media` array of `{ type, src, alt, layoutHint }` items. The `layoutHint` field (`"full"` | `"half"` | `"left"` | `"right"`) drives the masonry-style render grid. Images open in a lightbox via `yet-another-react-lightbox`.

### Scroll-reveal animations

Section entrance animations are implemented with a lightweight custom `IntersectionObserver` pattern — no animation library required. Sections carry the `.reveal` CSS class (opacity: 0, translateY: 20px). When `threshold: 0.08` of the section enters the viewport, the observer adds `.is-visible` (opacity: 1, translateY: 0, transition: 0.65s). The observer then disconnects. `prefers-reduced-motion` disables all transitions globally.

---

## Contact Form & Email System

### Client-side form (`components/ui/ContactForm.tsx`)

The form collects five fields: name, email, project type (select), approximate budget (select), and a free-text message. Before submitting, it runs a lightweight client-side validation pass (name length, email regex). Two invisible anti-bot measures are embedded without the user seeing anything:

- **Honeypot field** — a text input hidden with `pointer-events: none` / `opacity: 0`. Bots auto-fill it; humans never will.
- **Load timestamp** — the component records `Date.now()` on mount. Submissions arriving faster than 1 500 ms are silently dropped server-side.

**Cloudflare Turnstile** is integrated in invisible/execute mode. The widget is loaded from the Cloudflare CDN, rendered once on mount, and executed only at submission time. If the challenge resolves, the token is appended to the POST body as `_token`. The widget ID, token, and a pending-resolve ref are managed with `useRef` to avoid unnecessary re-renders.

On success the form is replaced with a serif italic confirmation message signed `— A. Monzon`. On failure the API error message is surfaced inline.

### API route (`app/api/contact/route.ts`)

The `POST` handler runs in the Cloudflare Workers runtime via `@opennextjs/cloudflare`. Security checks execute in order, stopping at the first failure:

1. **Origin / CORS guard** — requests from origins outside the allow-list (`anastasiamonzon.com`, `*.anastasiamonzon.com`, `*.pages.dev`, `localhost:3000`) receive a 403.

2. **Content-type guard** — rejects non-`application/json` bodies with a 400.

3. **Honeypot check** — if `_hp` is non-empty, returns a fake `{ ok: true }` so bots believe they succeeded.

4. **Timing check** — if fewer than 1 500 ms elapsed since the form was rendered, returns a fake `{ ok: true }`.

5. **Sanitisation** — all string fields are stripped of HTML tags and ASCII control characters, then capped at field-specific length limits (name: 100, email: 320, message: 3 000).

6. **Validation** — name must be ≥ 2 characters; email must match the RFC-compliant regex.

7. **Spam detection** — a keyword regex tests the combined name + message text for common spam signals (multiple URLs, gambling/crypto/pharma terms). Matches are silently dropped.

8. **Turnstile server-side verification** — if `TURNSTILE_SECRET_KEY` is set, the token is posted to `https://challenges.cloudflare.com/turnstile/v1/siteverify`. A non-`success` response returns a 403 with a user-visible error.

9. **KV rate limiting** — IP address is keyed in the `CONTACT_RL_KV` namespace as `contact_rl:<ip>`. Up to 5 submissions per rolling hour are allowed; the counter TTL resets with each increment. Excess requests receive a 429 with a `Retry-After: 3600` header.

10. **Resend email dispatch** — on passing all checks, the sanitised payload is handed to `sendEmail()`.

### Resend email (`sendEmail` in route.ts)

An HTML email is composed inline and sent via `https://api.resend.com/emails`. Key details:

- **From:** `Portfolio Contact <noreply@anastasiamonzon.com>`
- **To:** `CONTACT_EMAIL` env var (defaults to `hello@anastasiamonzon.com`)
- **Reply-To:** the enquirer's email address, so a direct reply in any mail client goes straight to them
- **Subject:** `New enquiry — {project type label} · {name}`
- **Body:** a branded HTML template matching the site's warm-white / charcoal palette and Playfair-style editorial typography. It contains a structured table (name, email, project type, budget), the message body with `white-space: pre-wrap`, and a pill CTA button pre-addressed to the enquirer: `Reply to {First Name}`.

Project type and budget values are mapped from their stored keys (`"interior"`, `"1k-3k"`) to human-readable labels before rendering in the email.

---

## Deployment

The site is deployed to **Cloudflare Pages** using the `@opennextjs/cloudflare` adapter, which compiles the Next.js App Router output into a Cloudflare Workers bundle. The `wrangler.jsonc` configuration declares:

- `kv_namespaces` — the `CONTACT_RL_KV` binding used by the rate limiter (namespace ID: `94228f51becf419a8427a26ceb682a6d`)
- `vars` — `CONTACT_EMAIL` (the inbox that receives enquiry emails)
- `assets` — the static `.open-next/assets` directory
- `compatibility_flags: ["nodejs_compat"]` — required for the Node.js APIs used by the route handler

Secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) are stored in the Cloudflare Pages dashboard and are never committed to the repository.

### Build & deploy commands

```bash
# Local dev (Next.js dev server)
npm run dev

# Preview with Cloudflare runtime locally
npm run preview

# Production deploy
npm run deploy
```

---

## Security Headers

`middleware.ts` injects the following HTTP security headers on every route except Next.js internals and static assets:

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disables camera, microphone, geolocation, payment |
| `Content-Security-Policy` | Restricts scripts to self + Cloudflare CDNs; frames only to `challenges.cloudflare.com` |

---

## Environment Variables

| Variable | Where set | Purpose |
|---|---|---|
| `RESEND_API_KEY` | CF Pages secret | Authenticates API calls to Resend |
| `TURNSTILE_SECRET_KEY` | CF Pages secret | Server-side Turnstile token verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | CF Pages env var | Client-side Turnstile widget site key |
| `CONTACT_EMAIL` | `wrangler.jsonc` `vars` | Inbox that receives enquiry emails |
| `CONTACT_RL_KV` | `wrangler.jsonc` `kv_namespaces` | KV namespace binding for rate limiting |

---

## Developer

**Juan Wong**  
Email: juancwxng@gmail.com
