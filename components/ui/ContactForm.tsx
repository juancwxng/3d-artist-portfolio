'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  formProjectTypes,
  formBudgets,
  contactNote,
  contactSubmitBtn,
} from '@/data/portfolio';

// ─── Styles ──────────────────────────────────────────────
const inputClass =
  'bg-transparent border border-[#d9cbbe] rounded-[4px] px-[0.875rem] py-3 text-[0.875rem] text-[#2b2a27] font-light outline-none transition-colors duration-200 focus:border-[#7a6e63] appearance-none w-full placeholder:text-[#7a6e63]/50';

const labelClass =
  'text-[0.5625rem] tracking-[0.3em] uppercase text-[#7a6e63] font-normal';

// ─── Types ────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
}

// Turnstile global types (loaded via CDN script)
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        opts: Record<string, unknown>,
      ) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

// ─── Component ────────────────────────────────────────────
export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    project_type: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Security refs — not visible to users
  const honeypotRef = useRef('');
  const loadTimestampRef = useRef(0);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileToken = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const pendingResolve = useRef<((token: string | null) => void) | null>(null);

  // ── Record when form was loaded ──────────────────────────
  useEffect(() => {
    loadTimestampRef.current = Date.now();
  }, []);

  // ── Load & initialise Turnstile (invisible) ──────────────
  useEffect(() => {
    const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!SITE_KEY || !turnstileContainerRef.current) return;

    const initWidget = () => {
      if (!window.turnstile || turnstileWidgetId.current) return;
      turnstileWidgetId.current = window.turnstile.render(
        turnstileContainerRef.current!,
        {
          sitekey: SITE_KEY,
          execution: 'execute',
          appearance: 'interaction-only',
          callback: (token: string) => {
            turnstileToken.current = token;
            pendingResolve.current?.(token);
            pendingResolve.current = null;
          },
          'error-callback': () => {
            pendingResolve.current?.(null);
            pendingResolve.current = null;
          },
          'expired-callback': () => {
            turnstileToken.current = null;
          },
        },
      );
    };

    if (window.turnstile) {
      initWidget();
      return;
    }

    window.onTurnstileLoad = initWidget;

    if (!document.getElementById('cf-turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src =
        'https://challenges.cloudflare.com/turnstile/v1/api.js?onload=onTurnstileLoad&render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const getTurnstileToken = useCallback((): Promise<string | null> => {
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return Promise.resolve(null);
    if (turnstileToken.current) return Promise.resolve(turnstileToken.current);

    return new Promise((resolve) => {
      pendingResolve.current = resolve;
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.execute(turnstileWidgetId.current);
      } else {
        resolve(null);
      }
      setTimeout(() => {
        if (pendingResolve.current) {
          pendingResolve.current = null;
          resolve(null);
        }
      }, 10_000);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    if (!form.name.trim() || form.name.trim().length < 2)
      return 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      return 'Please enter a valid email address.';
    return null;
  };

  const handleSubmit = async () => {
    setError(null);
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setSubmitting(true);
    const token = await getTurnstileToken();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _hp: honeypotRef.current,
          _ts: loadTimestampRef.current,
          _token: token ?? '',
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setSubmitted(true);
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.');
        turnstileToken.current = null;
        if (turnstileWidgetId.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
      turnstileToken.current = null;
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-start justify-center mt-12 min-h-[320px]">
        <p className="font-serif italic font-light text-[#2b2a27] text-[1.375rem] leading-[1.5] max-w-[340px]">
          Thank you — your message is on its way. I&rsquo;ll be in touch
          within one business day.
        </p>
        <p className="font-serif italic text-[#7a4455] text-[0.875rem] mt-4">
          — A. Monzon
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 mt-12" aria-label="Project enquiry">

      {/* Honeypot — invisible to humans, bots auto-fill it */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => { honeypotRef.current = e.target.value; }}
        />
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Jane Smith"
            className={inputClass}
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            maxLength={100}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jane@studio.com"
            className={inputClass}
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={320}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-5 max-xs:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label htmlFor="project-type" className={labelClass}>Project type</label>
          <select
            id="project-type"
            name="project_type"
            className={inputClass}
            value={form.project_type}
            onChange={handleChange}
          >
            <option value="" disabled>Select one</option>
            {formProjectTypes.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className={labelClass}>Approximate budget</label>
          <select
            id="budget"
            name="budget"
            className={inputClass}
            value={form.budget}
            onChange={handleChange}
          >
            <option value="" disabled>Select range</option>
            {formBudgets.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>Tell me about the project</label>
        <textarea
          id="message"
          name="message"
          placeholder="Space type, size, style references, timeline…"
          className={`${inputClass} min-h-[120px] resize-none leading-[1.6]`}
          value={form.message}
          onChange={handleChange}
          maxLength={3000}
        />
      </div>

      {/* Error message */}
      {error && (
        <p role="alert" className="text-[0.75rem] text-[#7a4455] leading-[1.5] font-light">
          {error}
        </p>
      )}

      {/* Submit row */}
      <div className="flex justify-between items-center gap-6 pt-1 max-xs:flex-col max-xs:items-start">
        <p className="text-[0.75rem] text-[#7a6e63] leading-[1.5] max-w-[220px] font-light max-xs:max-w-full">
          {contactNote}
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="inline-flex items-center gap-[0.625rem] bg-[#2b2a27] text-[#f7f3ee] text-[0.6875rem] tracking-[0.16em] uppercase font-medium px-8 py-[0.8rem] rounded-full border-none cursor-pointer transition-[background,color,opacity] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap hover:bg-[#3d3830] hover:text-[#f7f3ee] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Sending…' : contactSubmitBtn}
        </button>
      </div>

      {/* Turnstile mount point — invisible unless challenge needed */}
      <div ref={turnstileContainerRef} />
    </div>
  );
}
