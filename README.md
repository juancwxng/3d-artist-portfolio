# Anastasia Monzon — 3D Visualisation Portfolio

Portfolio website for **Anastasia Monzon**, a freelance 3D architectural visualisation artist based in Mexico. Covers interior, exterior, and landscape work, a four-step process section, and a contact form that sends branded email notifications via Resend.

## Legal Notice

**Proprietary code developed for a commercial client.** Publicly viewable for portfolio and technical evaluation only. No licence is granted for reuse, modification, or distribution.

## Stack

| | |
|---|---|
| Framework | Next.js 16 — App Router |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v3 |
| Fonts | Playfair Display · Jost |
| Lightbox | `yet-another-react-lightbox` |
| Email | Resend API |
| Bot protection | Cloudflare Turnstile (invisible) |
| Rate limiting | Cloudflare KV |
| Deployment | Cloudflare Pages via `@opennextjs/cloudflare` |

## Architecture

All copy, project data, and config live in **`data/portfolio.ts`** — the single source of truth. Components import only what they need, so editorial changes never require touching component files. Type definitions are in `types/index.ts`.

### Home sections

`SiteHeader` → `HeroSection` → `WorkSection` → `ProcessSection` → `AboutSection` → `SocialSection` → `ContactSection` → `SiteFooter`

### Case study pages

`app/work/[slug]/page.tsx` is a server component. It resolves slugs against `detailedProjects`, generates per-project metadata and JSON-LD, and delegates rendering to `ProjectPageClient.tsx`. Each project has a `media` array with a `layoutHint` field (`full` | `half` | `left` | `right`) that drives the render grid.

## Contact Form

Collects name, email, project type, budget, and message. Anti-spam measures: honeypot field, load-time check, keyword filter, Cloudflare Turnstile (server-verified), CORS guard, and KV rate limiting (5 submissions/hour per IP). Passing submissions are sent via Resend with a branded HTML template; reply-to is set to the enquirer's address.

## Commands

```bash
npm run dev       # Next.js dev server
npm run preview   # Cloudflare runtime locally
npm run deploy    # Production deploy
```

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | CF Pages secret | Resend authentication |
| `TURNSTILE_SECRET_KEY` | CF Pages secret | Server-side challenge verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | CF Pages env | Client-side widget key |
| `CONTACT_EMAIL` | `wrangler.jsonc` | Inbox for enquiry emails |
| `CONTACT_RL_KV` | `wrangler.jsonc` | KV binding for rate limiting |

## Privacy Policy

A dedicated Privacy Policy page lives at `/privacy` (`app/privacy/page.tsx`). It matches the site's editorial typographic style — Playfair Display italic headings, Jost body text, warm-white background, dusty-pink and sage accents — and follows the same two-column eyebrow/body layout used throughout the site.

The policy covers:

| Section | Summary |
|---|---|
| Data collected | Contact form fields only (name, email, project type, budget, message) |
| Purpose | Responding to project enquiries; no marketing or resale |
| Third-party processors | Resend (email delivery), Cloudflare Pages (hosting), Cloudflare Turnstile (spam protection) |
| Retention | Enquiry threads ≤ 12 months if no project; project correspondence ≤ 5 years |
| User rights | Access, correction, deletion, objection, withdrawal of consent |
| Cookies | No analytics or tracking cookies; Turnstile session cookie only |
| Children | Not directed at under-16s |

The footer `Privacy` link in `data/portfolio.ts` now points to `/privacy`.

---

## SEO & GEO

Added/updated to maximise visibility on search engines and AI assistants (ChatGPT, Gemini, Perplexity, Claude):

| File | What it does |
|---|---|
| `app/layout.tsx` | Full metadata object (OG, Twitter Card, canonical, keywords) + three JSON-LD blocks in `<head>`: **Person**, **ProfessionalService**, **FAQPage** |
| `app/sitemap.ts` | Auto-generates `/sitemap.xml` from `detailedProjects` — new projects are included automatically |
| `app/robots.ts` | Explicitly allows `GPTBot`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, and all standard crawlers; blocks only `/api/` |
| `app/work/[slug]/page.tsx` | `generateMetadata` per project (title, description, OG image from first render, `CreativeWork` JSON-LD) |
| `data/portfolio.ts` | `siteTitle` and `siteDescription` rewritten with target keywords |
| `public/og-image.jpg` | 1200×630 social preview image used as fallback across all pages |

---

**Developer:** Juan Wong — juancwxng@gmail.com
