'use client';

import { useEffect, useRef, useState } from 'react';
import { animGhostTitle, animGhostSub, animCaptionText } from '@/data/portfolio';

const FRAME_BASE = '/frames/';

function pad(n: number): string {
  return String(n).padStart(3, '0');
}

// Determine frame config once at mount (client-side only, frozen for the session)
function getFrameConfig() {
  if (typeof window === 'undefined') return { total: 120, width: 1280, height: 720 };
  const w = window.innerWidth;
  if (w < 768)  return { total: 60,  width: 640,  height: 1138 };
  if (w < 1200) return { total: 80,  width: 1024, height: 576  };
  return             { total: 120, width: 1280, height: 720  };
}

export default function ScrollVideoEffect() {
  // Fix §1.4 — TOTAL_FRAMES computed client-side only, frozen at mount
  const [frameConfig] = useState(getFrameConfig);
  const TOTAL_FRAMES = frameConfig.total;

  const canvasRef        = useRef<HTMLCanvasElement>(null);
  // Fix §4.1 — sliding-window cache (Map) instead of flat array
  const frameCacheRef    = useRef<Map<number, ImageBitmap>>(new Map());
  const progressBarRef   = useRef<HTMLDivElement>(null);
  const counterRef       = useRef<HTMLSpanElement>(null);
  const loadedCountRef   = useRef(0);
  const currentFrameRef  = useRef(0);
  const targetFrameRef   = useRef(0);
  const rafRef           = useRef<number>(0);
  // Fix §5.1 Step 4 — scroll geometry cached in refs, not read inside scroll handler
  const scrollGeomRef    = useRef({ top: 0, height: 0 });
  // Fix §5.1 Step 7 — IntersectionObserver gating
  const animVisibleRef   = useRef(false);

  const CACHE_WINDOW = 30;

  // Fix §4.1 §5.1 Step 2 — evict bitmaps outside the sliding window
  function evictOldFrames(currentIdx: number) {
    for (const [idx, bmp] of frameCacheRef.current) {
      if (Math.abs(idx - currentIdx) > CACHE_WINDOW) {
        bmp.close();
        frameCacheRef.current.delete(idx);
      }
    }
  }

  /* ── Preload frames: prioritized sequential loading ─────────────────── */
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // Fix §1.5 — load frames sequentially in small batches of 5,
    // not all promises created at once
    async function loadFrame(i: number, priority: RequestPriority = 'low') {
      if (frameCacheRef.current.has(i)) return;
      try {
        const r = await fetch(`${FRAME_BASE}${pad(i + 1)}.jpg`, { priority });
        const blob = await r.blob();
        const bmp = await createImageBitmap(blob);
        frameCacheRef.current.set(i, bmp);
        loadedCountRef.current++;
      } catch {
        // Frame unavailable — canvas stays as background
      }
    }

    async function loadAllFrames() {
      // Phase 1: first 10 frames with high priority (above-the-fold experience)
      for (let i = 0; i < Math.min(10, TOTAL_FRAMES); i++) {
        await loadFrame(i, 'high');
      }

      // Phase 2 & 3: remaining frames with low priority during idle time
      const scheduleIdle = (start: number, end: number) => {
        const batch = () => {
          if (start >= end) return;
          const BATCH = 5;
          const until = Math.min(start + BATCH, end);
          (async () => {
            for (let i = start; i < until; i++) {
              await loadFrame(i, 'low');
            }
            if (until < end) {
              if ('requestIdleCallback' in window) {
                requestIdleCallback(batch, { timeout: 2000 });
              } else {
                setTimeout(batch, 16);
              }
            }
          })();
          start = until;
        };

        if ('requestIdleCallback' in window) {
          requestIdleCallback(batch, { timeout: 2000 });
        } else {
          setTimeout(batch, 16);
        }
      };

      scheduleIdle(10, TOTAL_FRAMES);
    }

    loadAllFrames();
  }, [TOTAL_FRAMES]);

  /* ── Scroll → frame mapping via rAF ─────────────────── */
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.closest('#scroll-anim') as HTMLElement | null;
    if (!container) return;

    // Fix §3.2 — DPR-aware canvas sizing, capped at 2x
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    updateCanvasSize();

    // Fix §5.1 Step 4 — cache scroll geometry in refs at mount
    const updateScrollGeom = () => {
      const rect = container.getBoundingClientRect();
      scrollGeomRef.current = {
        top:    rect.top + window.scrollY,
        height: container.offsetHeight - window.innerHeight,
      };
    };
    updateScrollGeom();

    // Fix §1.7 — debounced resize handler (150ms)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCanvasSize();
        updateScrollGeom();
      }, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Fix §1.8 — no getBoundingClientRect inside scroll handler; read cached refs only
    const onScroll = () => {
      const scrolled  = window.scrollY - scrollGeomRef.current.top;
      const progress  = Math.max(0, Math.min(1, scrolled / scrollGeomRef.current.height));
      targetFrameRef.current = Math.floor(progress * (TOTAL_FRAMES - 1));

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Fix §5.1 Step 7 — IntersectionObserver pauses rAF when off-screen
    const io = new IntersectionObserver(
      ([entry]) => { animVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 },
    );
    io.observe(container);

    const tick = () => {
      if (!reducedMotion && animVisibleRef.current) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        currentFrameRef.current += diff * 0.1;
        const idx = Math.round(currentFrameRef.current);
        const frame = frameCacheRef.current.get(idx);

        // Use CSS pixel dimensions for drawing (canvas is DPR-scaled via ctx.scale)
        const cssW = canvas.offsetWidth;
        const cssH = canvas.offsetHeight;

        if (frame && cssW > 0 && cssH > 0) {
          ctx.clearRect(0, 0, cssW, cssH);

          const scale = Math.max(cssW / frame.width, cssH / frame.height);
          const w = frame.width  * scale;
          const h = frame.height * scale;
          ctx.drawImage(frame, (cssW - w) / 2, (cssH - h) / 2, w, h);
        }

        evictOldFrames(idx);

        if (counterRef.current) {
          const display = String(Math.round(currentFrameRef.current) + 1).padStart(3, '0');
          counterRef.current.textContent = `${display} / ${pad(TOTAL_FRAMES)}`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, [TOTAL_FRAMES]);

  return (
    <div
      id="scroll-anim"
      role="region"
      aria-label="Scroll animation — room furnished in 3D"
      className="relative bg-[#1c1a17] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-20 after:bg-gradient-to-b after:from-transparent after:to-[#ede5dc] after:pointer-events-none after:z-[2]"
    >
      {/* 300svh scroll track */}
      <div className="h-[300svh]">
        {/* Sticky 100svh container */}
        <div className="sticky top-0 h-[100svh] flex flex-col overflow-hidden">
          {/* Canvas layer */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                // Fix §3.2 — promote to own GPU layer
                willChange: 'transform',
              }}
            />

            {/* Grid overlay when no frame loaded */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  'repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 68px), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 68px)',
              }}
            />

            {/* Ghost text overlay */}
            <div
              className="relative text-center pointer-events-none select-none z-[1]"
              aria-hidden="true"
            >
              <p
                className="font-serif font-light italic text-[rgba(247,243,238,0.1)] tracking-[-0.01em] mb-[0.875rem]"
                style={{ fontSize: 'clamp(1.375rem, 4vw, 3rem)' }}
              >
                {animGhostTitle}
              </p>
              <p className="text-[0.5rem] tracking-[0.28em] uppercase text-[rgba(247,243,238,0.1)]">
                {animGhostSub}
              </p>
            </div>

            {/* Caption — hidden on mobile */}
            <div
              className="absolute bottom-8 right-14 max-md:hidden z-[1]"
              aria-hidden="true"
            >
              <p className="font-serif text-[0.875rem] italic font-light text-[rgba(247,243,238,0.2)]">
                {animCaptionText}
              </p>
            </div>

            {/* HUD: progress bar + counter */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-[1.125rem] whitespace-nowrap max-md:gap-3 xs:gap-2 z-[1]"
              aria-hidden="true"
            >
              <div className="w-[110px] h-px bg-[rgba(247,243,238,0.08)] relative overflow-hidden max-md:w-[60px] xs:w-[50px]">
                <div
                  ref={progressBarRef}
                  className="absolute left-0 top-0 bottom-0 bg-[#e8c5c0] opacity-50 transition-none"
                  style={{ width: '0%' }}
                />
              </div>
              <span
                ref={counterRef}
                className="font-mono text-[0.4375rem] tracking-[0.18em] text-[rgba(247,243,238,0.25)] max-md:text-[0.375rem]"
              >
                001 / {pad(TOTAL_FRAMES)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
