// cloudflare-env.d.ts
// Run `npm run cf-typegen` after adding/changing Wrangler bindings
// to auto-regenerate this file with accurate types.

interface CloudflareEnv {
  // Static assets (auto-bound by opennextjs-cloudflare)
  ASSETS: Fetcher;

  // Self-reference for internal service calls
  WORKER_SELF_REFERENCE: Service;

  // Cloudflare Images binding
  IMAGES: ImagesBinding;

  // KV namespace for contact form rate limiting
  // Create with: npx wrangler kv namespace create CONTACT_RL_KV
  CONTACT_RL_KV: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  };

  // ── Secrets (set via `npx wrangler secret put <NAME>`) ──
  // Your Resend API key — https://resend.com
  RESEND_API_KEY: string;

  // Cloudflare Turnstile secret key — https://dash.cloudflare.com → Turnstile
  TURNSTILE_SECRET_KEY: string;

  // ── Plain vars (set in wrangler.jsonc or Cloudflare dashboard) ──
  // Override the default recipient email
  CONTACT_EMAIL: string;
}
