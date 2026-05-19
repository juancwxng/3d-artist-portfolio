"use client";

import { useEffect, useRef, useState } from "react";

const CURSOR_CSS = `
  body { cursor: none; }
  a, button, [tabindex], [data-cursor] { cursor: none; }
  .cursor-ring.cursor-view {
    width: 80px !important;
    height: 80px !important;
    background: rgba(168,184,154,0.15) !important;
    border-color: rgba(168,184,154,0.6) !important;
  }
  .cursor-ring.cursor-view::after {
    content: 'View';
    font-family: var(--font-dm-sans, sans-serif);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(247,243,238,0.8);
  }
`;

export default function PremiumEffects() {
  const [showLoader, setShowLoader] = useState<boolean | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);

  // Fix cursor-guide §3.1 — null = unresolved (server + first paint),
  // true = fine pointer, false = touch device
  const [cursorActive, setCursorActive] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("loader_seen");
      setShowLoader(seen === null);
    } catch {
      setShowLoader(false);
    }
  }, []);

  // Fix cursor-guide §3.1 — resolve pointer type after hydration (SSR-safe)
  useEffect(() => {
    setCursorActive(window.matchMedia("(pointer: fine)").matches);
  }, []);

  /* ── 1. CINEMATIC LOADER ─────────────────────────────── */
  useEffect(() => {
    if (showLoader !== true) return;

    const loader = loaderRef.current;
    if (!loader) return;

    document.body.style.overflow = "hidden";

    const name = loader.querySelector<HTMLElement>(".loader-name");
    const line = loader.querySelector<HTMLElement>(".loader-line");

    const timeline = [
      {
        t: 200,
        fn: () => {
          if (name) name.style.opacity = "1";
        },
      },
      {
        t: 900,
        fn: () => {
          if (line) line.style.transform = "scaleX(1)";
        },
      },
      {
        t: 1800,
        fn: () => {
          loader.style.opacity = "0";
        },
      },
      {
        t: 2500,
        fn: () => {
          document.body.style.overflow = "";
          try {
            sessionStorage.setItem("loader_seen", "1");
          } catch {
            /* noop */
          }
          setShowLoader(false);
        },
      },
    ];

    const timers = timeline.map(({ t, fn }) => setTimeout(fn, t));

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  /* ── 2. MAGNETIC CURSOR ──────────────────────────────── */
  // Fix cursor-guide §3.2 — guard with (pointer: fine), inject CSS conditionally,
  // pause on visibilitychange
  useEffect(() => {
    if (!cursorActive) return;

    const dot  = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Inject CSS only when cursor is confirmed active on a fine-pointer device
    const style = document.createElement("style");
    style.textContent = CURSOR_CSS;
    document.head.appendChild(style);

    let mouseX = -100, mouseY = -100;
    let dotX   = -100, dotY   = -100;
    let ringX  = -100, ringY  = -100;
    let raf: number;
    let viewMode = false;
    let running  = true;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const isView = !!(e.target as HTMLElement).closest('[data-cursor="view"]');
      if (isView !== viewMode) {
        viewMode = isView;
        ring.classList.toggle("cursor-view", isView);
      }
    };

    const tick = () => {
      if (!running) return;

      dotX  += (mouseX - dotX)  * 0.55;
      dotY  += (mouseY - dotY)  * 0.55;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      dot.style.transform  = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      ring.style.transform = viewMode
        ? `translate(${ringX - 40}px, ${ringY - 40}px)`
        : `translate(${ringX - 20}px, ${ringY - 20}px)`;

      raf = requestAnimationFrame(tick);
    };

    // Fix cursor-guide §3.2 — pause rAF loop when tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
      // Remove injected style on unmount to avoid leakage on route changes
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [cursorActive]);

  /* ── 3. ATMOSPHERIC GRAIN ────────────────────────────── */
  // Fix scroll-guide §4.4 — pre-allocate ImageData once, reduce update
  // frequency to every 8 frames (≈7.5 Hz), gate on matchMedia not innerWidth
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let frame = 0;
    // Pre-allocated ImageData — mutated in place each tick
    let imageData: ImageData | null = null;

    const resize = () => {
      canvas.width  = Math.floor(window.innerWidth  * 0.25);
      canvas.height = Math.floor(window.innerHeight * 0.25);
      // Re-allocate after resize since dimensions changed
      imageData = ctx.createImageData(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const renderGrain = () => {
      frame++;
      // Fix §4.4 — update every 8 frames (~7.5 Hz) instead of every 4
      if (frame % 8 !== 0 || !imageData) {
        raf = requestAnimationFrame(renderGrain);
        return;
      }

      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i]     = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = Math.random() < 0.5 ? 0 : 14; // sparse, very faint
      }

      ctx.putImageData(imageData, 0, 0);
      raf = requestAnimationFrame(renderGrain);
    };

    raf = requestAnimationFrame(renderGrain);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* ── Cinematic Loader — mounted only when needed ── */}
      {showLoader === true && (
        <div
          ref={loaderRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#201f1c",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            transition: "opacity 0.6s ease",
          }}
        >
          <span
            className="loader-name"
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "9px",
              fontStyle: "italic",
              letterSpacing: "0.35em",
              color: "rgba(247,243,238,0.7)",
              opacity: 0,
              transition: "opacity 0.5s ease",
              textTransform: "uppercase" as const,
            }}
          >
            A. Monzon
          </span>
          <div
            className="loader-line"
            style={{
              width: "80px",
              height: "1px",
              background: "rgba(247,243,238,0.25)",
              transformOrigin: "left center",
              transform: "scaleX(0)",
              transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
      )}

      {/* Fix cursor-guide §3.3 — cursor elements only mounted on fine-pointer
          devices; absent from DOM entirely on touch devices */}
      {cursorActive === true && (
        <>
          {/* ── Magnetic Cursor Dot ── */}
          <div
            ref={cursorDotRef}
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(247,243,238,0.85)",
              pointerEvents: "none",
              zIndex: 9998,
              willChange: "transform",
              mixBlendMode: "difference" as const,
            }}
          />

          {/* ── Magnetic Cursor Ring ── */}
          <div
            ref={cursorRingRef}
            aria-hidden="true"
            className="cursor-ring"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid rgba(247,243,238,0.3)",
              pointerEvents: "none",
              zIndex: 9997,
              willChange: "transform",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: [
                "width 0.35s cubic-bezier(0.16,1,0.3,1)",
                "height 0.35s cubic-bezier(0.16,1,0.3,1)",
                "background 0.35s ease",
                "border-color 0.35s ease",
              ].join(", "),
            }}
          />
        </>
      )}

      {/* ── Grain Canvas ── */}
      <canvas
        ref={grainRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9990,
          pointerEvents: "none",
          opacity: 0.45,
          mixBlendMode: "overlay" as const,
        }}
      />

      {/* Fix cursor-guide §3.4 — CSS is injected conditionally inside the
          cursor useEffect after the (pointer: fine) guard; removed from JSX */}
    </>
  );
}
