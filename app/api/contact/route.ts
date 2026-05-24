import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

// Minimal KVNamespace type — avoids requiring @cloudflare/workers-types in tsconfig
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

// ─── Config ───────────────────────────────────────────────
const RATE_LIMIT = 5;           // max submissions per window
const RATE_WINDOW_SEC = 3600;   // 1-hour rolling window
const MIN_ELAPSED_MS = 1500;    // submissions faster than this = bot

const ALLOWED_ORIGINS = [
  'https://anastasiamonzon.com',
  'https://www.anastasiamonzon.com',
  'https://3d-artist-portfolio.pages.dev',  // CF Pages preview domain
  'http://localhost:3000',                   // local dev
];

// ─── Types ────────────────────────────────────────────────
interface FormPayload {
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
  _hp: string;      // honeypot — bots fill this, humans don't
  _ts: number;      // unix ms timestamp when form was first rendered
  _token: string;   // Cloudflare Turnstile challenge token
}

// ─── Helpers ──────────────────────────────────────────────

/** Strip HTML tags, control chars, and cap length. */
function sanitize(raw: unknown, maxLen = 2000): string {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/<[^>]*>/g, '')           // strip HTML/XML tags
    .replace(/[\x00-\x08\x0B-\x1F]/g, '') // strip control chars (keep \t \n \r)
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email) && email.length <= 320;
}

/** Very light spam signal detection — drop silently to not reveal logic. */
function looksLikeSpam(fields: string[]): boolean {
  const combined = fields.join(' ');
  const urlCount = (combined.match(/https?:\/\//gi) ?? []).length;
  if (urlCount > 2) return true;
  const spamRe =
    /\b(viagra|cialis|casino|lottery|bitcoin|crypto|nft|guaranteed.{0,10}profit|click here|buy now|limited.{0,5}offer|earn money|work from home|earn \$)\b/i;
  return spamRe.test(combined);
}

/** Verify a Cloudflare Turnstile token server-side. */
async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v1/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** KV-backed sliding-window rate limiter (per IP). */
async function checkRateLimit(
  kv: KVNamespace,
  ip: string,
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `contact_rl:${ip}`;
  const raw = await kv.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= RATE_LIMIT) return { allowed: false, remaining: 0 };
  // Increment; keep TTL rolling from first submission in window
  await kv.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_SEC });
  return { allowed: true, remaining: RATE_LIMIT - count - 1 };
}

/** Send email via Resend. */
async function sendEmail(
  payload: FormPayload,
  resendKey: string,
  toEmail: string,
): Promise<boolean> {
  const projectLabel =
    {
      interior: 'Interior Visualisation',
      exterior: 'Exterior / Architecture',
      landscape: 'Landscape / Garden',
      other: 'Other',
    }[payload.project_type] ?? payload.project_type ?? '—';

  const budgetLabel =
    {
      'under-1k': 'Under $1,000',
      '1k-3k': '$1,000 – $3,000',
      '3k-8k': '$3,000 – $8,000',
      '8k-plus': '$8,000+',
    }[payload.budget] ?? payload.budget ?? '—';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f7f3ee;font-family:Georgia,'Times New Roman',serif;">
      <div style="max-width:560px;margin:32px auto;background:#ffffff;border:1px solid #d9cbbe;padding:40px;">
        <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#7a6e63;margin:0 0 16px;">
          Portfolio · New Enquiry
        </p>
        <h1 style="font-weight:300;font-style:italic;color:#2b2a27;font-size:24px;margin:0 0 24px;line-height:1.2;">
          New project enquiry
        </h1>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0ece7;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#7a6e63;width:110px;vertical-align:top;">Name</td>
            <td style="padding:8px 0;border-bottom:1px solid #f0ece7;font-size:13px;color:#2b2a27;">${payload.name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0ece7;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#7a6e63;vertical-align:top;">Email</td>
            <td style="padding:8px 0;border-bottom:1px solid #f0ece7;font-size:13px;color:#2b2a27;">
              <a href="mailto:${payload.email}" style="color:#7a4455;text-decoration:none;">${payload.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0ece7;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#7a6e63;vertical-align:top;">Project</td>
            <td style="padding:8px 0;border-bottom:1px solid #f0ece7;font-size:13px;color:#2b2a27;">${projectLabel}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#7a6e63;vertical-align:top;">Budget</td>
            <td style="padding:8px 0;font-size:13px;color:#2b2a27;">${budgetLabel}</td>
          </tr>
        </table>
        ${
          payload.message
            ? `<div style="border-top:1px solid #d9cbbe;padding-top:20px;">
                <p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#7a6e63;margin:0 0 8px;">Message</p>
                <p style="font-size:13px;color:#2b2a27;line-height:1.7;margin:0;white-space:pre-wrap;">${payload.message}</p>
               </div>`
            : ''
        }
        <div style="margin-top:32px;padding-top:16px;border-top:1px solid #d9cbbe;">
          <a href="mailto:${payload.email}?subject=Re: Your 3D visualisation enquiry"
             style="display:inline-block;background:#2b2a27;color:#f7f3ee;text-decoration:none;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;padding:12px 28px;border-radius:100px;">
            Reply to ${payload.name.split(' ')[0]}
          </a>
        </div>
      </div>
      <p style="text-align:center;font-size:11px;color:#7a6e63;margin:16px 0;">anastasiamonzon.com</p>
    </body>
    </html>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <noreply@anastasiamonzon.com>',
        to: [toEmail],
        reply_to: payload.email,
        subject: `New enquiry — ${projectLabel} · ${payload.name}`,
        html,
      }),
    });
    return res.status === 200 || res.status === 201;
  } catch {
    return false;
  }
}

// ─── Route handler ────────────────────────────────────────
export async function POST(req: NextRequest) {
  // ── 1. Origin / CORS check ──────────────────────────────
  const origin = req.headers.get('origin') ?? '';
  const originOk =
    !origin || // no origin header = same-origin or server-to-server
    ALLOWED_ORIGINS.includes(origin) ||
    origin.endsWith('.anastasiamonzon.com') ||
    origin.endsWith('.pages.dev');
  if (!originOk) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // ── 2. Content-type guard ───────────────────────────────
  const ct = req.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  // ── 3. Parse body ───────────────────────────────────────
  let payload: FormPayload;
  try {
    payload = (await req.json()) as FormPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // ── 4. Honeypot check ───────────────────────────────────
  // Real users never touch this field; bots auto-fill it.
  // Respond with fake success so bots think they succeeded.
  if (payload._hp) {
    return NextResponse.json({ ok: true });
  }

  // ── 5. Timing check ─────────────────────────────────────
  // A human can't fill out the form in under 1.5 s.
  const elapsed = Date.now() - (Number(payload._ts) || 0);
  if (elapsed < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true }); // silent drop
  }

  // ── 6. Sanitize & validate ──────────────────────────────
  const name = sanitize(payload.name, 100);
  const email = sanitize(payload.email, 320).toLowerCase();
  const project_type = sanitize(payload.project_type, 50);
  const budget = sanitize(payload.budget, 50);
  const message = sanitize(payload.message, 3000);

  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'Please enter your name (at least 2 characters).' }, { status: 422 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }

  // ── 7. Spam detection ───────────────────────────────────
  if (looksLikeSpam([name, message])) {
    return NextResponse.json({ ok: true }); // silent drop
  }

  // ── 8. Cloudflare context (env + IP) ────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cf = await getCloudflareContext<any>();
  const env = cf.env as CloudflareEnv;
  const ip =
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown';

  // ── 9. Turnstile verification ───────────────────────────
  const turnstileSecret = env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret && payload._token) {
    const tokenOk = await verifyTurnstile(payload._token, ip, turnstileSecret);
    if (!tokenOk) {
      return NextResponse.json(
        { error: 'Security check failed. Please refresh and try again.' },
        { status: 403 },
      );
    }
  }

  // ── 10. Rate limiting ────────────────────────────────────
  const kv = env.CONTACT_RL_KV;
  if (kv) {
    const { allowed } = await checkRateLimit(kv, ip);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many submissions — please try again in an hour.' },
        { status: 429, headers: { 'Retry-After': String(RATE_WINDOW_SEC) } },
      );
    }
  }

  // ── 11. Send email ───────────────────────────────────────
  const resendKey = env.RESEND_API_KEY;
  if (!resendKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'Email service is temporarily unavailable. Please try emailing directly.' },
      { status: 503 },
    );
  }

  const toEmail = env.CONTACT_EMAIL ?? 'hello@anastasiamonzon.com';
  const sanitizedPayload: FormPayload = {
    name, email, project_type, budget, message,
    _hp: '', _ts: 0, _token: '',
  };

  const sent = await sendEmail(sanitizedPayload, resendKey, toEmail);
  if (!sent) {
    return NextResponse.json(
      { error: 'Failed to send your message. Please email hello@anastasiamonzon.com directly.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

// GET is not allowed on this endpoint
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
