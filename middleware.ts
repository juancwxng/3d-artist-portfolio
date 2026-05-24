import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  // ── Clickjacking protection ──────────────────────────────
  response.headers.set('X-Frame-Options', 'DENY');

  // ── MIME sniffing protection ─────────────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // ── Referrer policy ─────────────────────────────────────
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // ── Permissions policy ──────────────────────────────────
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()',
  );

  // ── Content Security Policy ──────────────────────────────
  // Turnstile loads scripts and creates an iframe from challenges.cloudflare.com
  const csp = [
    "default-src 'self'",
    // Next.js requires unsafe-inline/eval in dev; in prod these can be tightened
    // with nonces — but that requires additional setup with opennextjs
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self' https://challenges.cloudflare.com",
    // Turnstile renders in an iframe
    "frame-src https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  // Apply to all routes except Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
