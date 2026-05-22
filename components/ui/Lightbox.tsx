"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export interface LightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

export default function Lightbox({
  images,
  initialIndex = 0,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [loaded, setLoaded] = useState(false);
  const [entering, setEntering] = useState(true);
  const [sliding, setSliding] = useState<"left" | "right" | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const current = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  /* ── Enter animation ── */
  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 20);
    return () => clearTimeout(t);
  }, []);

  /* ── Lock scroll ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ── Reset loaded on slide ── */
  useEffect(() => {
    setLoaded(false);
  }, [index]);

  /* ── Keyboard ── */
  const goNext = useCallback(() => {
    if (!hasNext) return;
    setSliding("left");
    setTimeout(() => { setIndex((i) => i + 1); setSliding(null); }, 260);
  }, [hasNext]);

  const goPrev = useCallback(() => {
    if (!hasPrev) return;
    setSliding("right");
    setTimeout(() => { setIndex((i) => i - 1); setSliding(null); }, 260);
  }, [hasPrev]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev]);

  /* ── Touch / swipe ── */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const overlayOpacity = entering ? 0 : 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(247, 243, 238, 0.96)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        opacity: overlayOpacity,
        transition: "opacity 0.38s cubic-bezier(0.16,1,0.3,1)",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Grain texture overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      {/* ── Top bar ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "58px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          borderBottom: "1px solid rgba(217,203,190,0.3)",
          zIndex: 2,
        }}
      >
        {/* Counter */}
        <span style={{
          fontFamily: "var(--font-jost, sans-serif)",
          fontSize: "0.6rem",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "#b5a99e",
        }}>
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>

        {/* Center — caption or decorative rule */}
        <span style={{
          fontFamily: "var(--font-playfair, serif)",
          fontSize: "0.8125rem",
          fontStyle: "italic",
          color: "#c9bfb5",
          maxWidth: "40ch",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {current.caption || current.alt || ""}
        </span>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          style={{
            background: "none",
            border: "1px solid rgba(217,203,190,0.6)",
            borderRadius: "999px",
            padding: "0.35rem 0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-jost, sans-serif)",
            fontSize: "0.55rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#7a6e63",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(217,203,190,0.25)";
            (e.currentTarget as HTMLButtonElement).style.color = "#2b2a27";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "none";
            (e.currentTarget as HTMLButtonElement).style.color = "#7a6e63";
          }}
        >
          Close
          <span aria-hidden="true" style={{ fontSize: "0.7rem" }}>✕</span>
        </button>
      </div>

      {/* ── Main image area ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "calc(58px + 1.5rem) 5rem 4.5rem",
          boxSizing: "border-box",
        }}
      >
        {/* Image wrapper */}
        <div
          style={{
            position: "relative",
            maxWidth: "100%",
            maxHeight: "100%",
            opacity: loaded ? 1 : 0,
            transform: sliding === "left"
              ? "translateX(-40px)"
              : sliding === "right"
              ? "translateX(40px)"
              : "translateX(0)",
            transition: sliding
              ? "opacity 0.22s ease, transform 0.26s cubic-bezier(0.16,1,0.3,1)"
              : "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 40px 100px rgba(43,42,39,0.14), 0 8px 24px rgba(43,42,39,0.08)",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.src}
            src={current.src}
            alt={current.alt ?? ""}
            onLoad={() => setLoaded(true)}
            style={{
              display: "block",
              maxWidth: "min(90vw, calc(100vw - 10rem))",
              maxHeight: "calc(100vh - 58px - 4.5rem - 3rem)",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* Loading shimmer */}
          {!loaded && (
            <div style={{
              position: "absolute",
              inset: 0,
              minWidth: "320px",
              minHeight: "220px",
              background: "linear-gradient(90deg, #f0ece6 25%, #e8e0d8 50%, #f0ece6 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s ease-in-out infinite",
            }} />
          )}
        </div>
      </div>

      {/* ── Prev / Next buttons ── */}
      {hasPrev && (
        <button
          onClick={goPrev}
          aria-label="Previous image"
          style={{
            position: "absolute",
            left: "1.25rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(247,243,238,0.85)",
            border: "1px solid rgba(217,203,190,0.5)",
            borderRadius: "999px",
            width: "2.75rem",
            height: "2.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#7a6e63",
            fontSize: "1rem",
            transition: "all 0.2s ease",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(43,42,39,0.06)";
            (e.currentTarget as HTMLButtonElement).style.color = "#2b2a27";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(247,243,238,0.85)";
            (e.currentTarget as HTMLButtonElement).style.color = "#7a6e63";
          }}
        >
          ←
        </button>
      )}

      {hasNext && (
        <button
          onClick={goNext}
          aria-label="Next image"
          style={{
            position: "absolute",
            right: "1.25rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(247,243,238,0.85)",
            border: "1px solid rgba(217,203,190,0.5)",
            borderRadius: "999px",
            width: "2.75rem",
            height: "2.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#7a6e63",
            fontSize: "1rem",
            transition: "all 0.2s ease",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(43,42,39,0.06)";
            (e.currentTarget as HTMLButtonElement).style.color = "#2b2a27";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(247,243,238,0.85)";
            (e.currentTarget as HTMLButtonElement).style.color = "#7a6e63";
          }}
        >
          →
        </button>
      )}

      {/* ── Dot navigation ── */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "1.75rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const dir = i > index ? "left" : "right";
                setSliding(dir);
                setTimeout(() => { setIndex(i); setSliding(null); }, 260);
              }}
              aria-label={`Go to image ${i + 1}`}
              style={{
                background: i === index ? "#7a6e63" : "rgba(181,169,158,0.4)",
                border: "none",
                borderRadius: "999px",
                width: i === index ? "1.5rem" : "0.4rem",
                height: "0.4rem",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Swipe hint (mobile only) ── */}
      {images.length > 1 && (
        <p
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "3.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-jost, sans-serif)",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#c9bfb5",
            whiteSpace: "nowrap",
            display: "none", // shown via media query in style tag below
          }}
          className="lightbox-swipe-hint"
        >
          Swipe to navigate
        </p>
      )}

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 640px) {
          .lightbox-swipe-hint { display: block !important; }
        }
        @media (max-width: 640px) {
          /* Tighter padding on mobile */
          .lightbox-image-area {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
