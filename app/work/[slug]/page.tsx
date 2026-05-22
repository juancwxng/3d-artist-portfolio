"use client";

import { useState, useEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/data/portfolio";
import type { MediaItem } from "@/data/portfolio";
import YALightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

/*  ZOOMABLE IMAGE — opens yet-another-react-lightbox  */
function ZoomableImage({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`block w-full h-auto cursor-zoom-in transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.012] ${className}`}
        style={{ display: "block" }}
        onClick={() => setOpen(true)}
      />
      <YALightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
        plugins={[Zoom, Captions]}
        styles={{
          root: { "--yarl__color_backdrop": "rgba(247, 243, 238, 0.97)" },
        }}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
      />
    </>
  );
}

/*  VIDEO BLOCK */
function VideoBlock({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={`block w-full h-auto rounded-[4px] ${className}`}
      style={{ display: "block" }}
    />
  );
}

/* MEDIA RENDERER  */
function MediaRenderer({ item }: { item: MediaItem }) {
  const hint = item.layoutHint ?? "full";

  /* FULL — edge-to-edge */
  if (hint === "full") {
    return (
      <div
        className="w-full overflow-hidden rounded-[4px]"
        style={{ boxShadow: "0 20px 60px rgba(43,42,39,0.1)" }}
      >
        {item.type === "video" ? (
          <VideoBlock src={item.src} />
        ) : (
          <ZoomableImage src={item.src} alt={item.alt ?? ""} />
        )}
      </div>
    );
  }

  /* HALF — pair rendered outside via grouping; single half renders full */
  if (hint === "half") {
    return (
      <div className="w-full overflow-hidden rounded-[4px]">
        {item.type === "video" ? (
          <VideoBlock src={item.src} />
        ) : (
          <ZoomableImage src={item.src} alt={item.alt ?? ""} />
        )}
      </div>
    );
  }

  /* LEFT — image left, caption/alt floats in right whitespace */
  if (hint === "left") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-0 items-start">
        <div
          className="overflow-hidden rounded-[4px]"
          style={{ boxShadow: "0 20px 60px rgba(43,42,39,0.1)" }}
        >
          {item.type === "video" ? (
            <VideoBlock src={item.src} />
          ) : (
            <ZoomableImage src={item.src} alt={item.alt ?? ""} />
          )}
        </div>
        {/* Intentional breathing whitespace — caption or vertical alt label */}
        <div
          className="hidden md:flex flex-col justify-end pl-14 pb-2"
          style={{ minHeight: "100%" }}
        >
          {item.caption ? (
            <div className="flex flex-col gap-4">
              {item.alt && (
                <p
                  style={{
                    fontFamily: "var(--font-jost, sans-serif)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "#c9bfb5",
                  }}
                >
                  {item.alt}
                </p>
              )}
              <div className="w-5 h-px bg-[#d9cbbe]" />
              <p
                style={{
                  fontFamily: "var(--font-jost, sans-serif)",
                  fontSize: "0.8125rem",
                  fontWeight: 300,
                  color: "#7a6e63",
                  lineHeight: 1.8,
                  maxWidth: "22rem",
                  letterSpacing: "0.01em",
                }}
              >
                {item.caption}
              </p>
            </div>
          ) : item.alt ? (
            <p
              style={{
                fontFamily: "var(--font-jost, sans-serif)",
                fontSize: "0.6rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#b5a99e",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {item.alt}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  /* RIGHT — caption/alt floats in left whitespace, image right */
  if (hint === "right") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-0 items-start">
        {/* Intentional whitespace — caption or vertical alt label */}
        <div
          className="hidden md:flex flex-col justify-end pr-14 pb-2 items-end"
          style={{ minHeight: "100%" }}
        >
          {item.caption ? (
            <div className="flex flex-col gap-4 items-end text-right">
              {item.alt && (
                <p
                  style={{
                    fontFamily: "var(--font-jost, sans-serif)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "#c9bfb5",
                  }}
                >
                  {item.alt}
                </p>
              )}
              <div className="w-5 h-px bg-[#d9cbbe]" />
              <p
                style={{
                  fontFamily: "var(--font-jost, sans-serif)",
                  fontSize: "0.8125rem",
                  fontWeight: 300,
                  color: "#7a6e63",
                  lineHeight: 1.8,
                  maxWidth: "22rem",
                  letterSpacing: "0.01em",
                }}
              >
                {item.caption}
              </p>
            </div>
          ) : item.alt ? (
            <p
              style={{
                fontFamily: "var(--font-jost, sans-serif)",
                fontSize: "0.6rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#b5a99e",
                writingMode: "vertical-rl",
              }}
            >
              {item.alt}
            </p>
          ) : null}
        </div>
        <div
          className="overflow-hidden rounded-[4px]"
          style={{ boxShadow: "0 20px 60px rgba(43,42,39,0.1)" }}
        >
          {item.type === "video" ? (
            <VideoBlock src={item.src} />
          ) : (
            <ZoomableImage src={item.src} alt={item.alt ?? ""} />
          )}
        </div>
      </div>
    );
  }

  return null;
}

/* HALF-PAIR GROUPER */
type RenderGroup =
  | { type: "single"; item: MediaItem }
  | { type: "pair"; items: [MediaItem, MediaItem] };

function groupMedia(media: MediaItem[]): RenderGroup[] {
  const groups: RenderGroup[] = [];
  let i = 0;
  while (i < media.length) {
    const cur = media[i];
    const next = media[i + 1];
    if (cur.layoutHint === "half" && next?.layoutHint === "half") {
      groups.push({ type: "pair", items: [cur, next] });
      i += 2;
    } else {
      groups.push({ type: "single", item: cur });
      i += 1;
    }
  }
  return groups;
}

/*  REVEAL WRAPPER  */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/*  THIN RULE  */
function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-none h-px bg-[#e2d9cf] ${className}`} />;
}

/*  PAGE  */
export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const project = getProject(params.slug);

  if (!project) notFound();

  const groups = groupMedia(project.media);

  return (
    <>
      {/*  Inline global styles for this page  */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-title  { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .hero-meta   { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .hero-desc   { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
        .hero-rule   { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
      `}</style>

      <div
        className="min-h-screen"
        style={{ background: "#f7f3ee", color: "#2b2a27" }}
      >
        {/* BACK NAV  */}
        <nav
          className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-14"
          style={{
            height: "var(--header-h, 58px)",
            background: "rgba(247,243,238,0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(217,203,190,0.35)",
          }}
        >
          <Link
            href="/#work"
            className="flex items-center gap-3 text-[#7a6e63] transition-colors duration-300 hover:text-[#2b2a27]"
            style={{
              fontFamily: "var(--font-jost, sans-serif)",
              fontSize: "0.6875rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            <span
              aria-hidden="true"
              className="inline-block w-8 h-px bg-current"
            />
            Back
          </Link>

          <span
            className="italic text-[#2b2a27]"
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: "0.9375rem",
            }}
          >
            A. Monzon
          </span>

          <span
            className="text-[#b5a99e]"
            style={{
              fontFamily: "var(--font-jost, sans-serif)",
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            {project.year}
          </span>
        </nav>

        {/*  HERO HEADER  */}
        <header
          className="flex flex-col items-center justify-center text-center px-6"
          style={{
            paddingTop: "calc(var(--header-h, 58px) + 5rem)",
            paddingBottom: "4.5rem",
          }}
        >
          {/* Eyebrow */}
          <p
            className="hero-meta mb-6"
            style={{
              fontFamily: "var(--font-jost, sans-serif)",
              fontSize: "0.625rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "#b5a99e",
            }}
          >
            {project.category}
          </p>

          {/* Title */}
          <h1
            className="hero-title"
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#2b2a27",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              maxWidth: "14ch",
            }}
          >
            {project.title}
          </h1>

          {/* Metadata strip */}
          <div className="hero-meta flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8">
            {[
              { label: "Location", value: project.location },
              { label: "Year", value: project.year },
              { label: "Type", value: project.category },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span
                  style={{
                    fontFamily: "var(--font-jost, sans-serif)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "#b5a99e",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jost, sans-serif)",
                    fontSize: "0.8125rem",
                    color: "#7a6e63",
                    letterSpacing: "0.04em",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Intro rule + description */}
          <div className="hero-rule mt-12 flex flex-col items-center gap-6 w-full max-w-xl">
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 h-px bg-[#e2d9cf]" />
              <span
                style={{
                  fontFamily: "var(--font-jost, sans-serif)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: "#c9bfb5",
                }}
              >
                Case Study
              </span>
              <div className="flex-1 h-px bg-[#e2d9cf]" />
            </div>

            <p
              className="hero-desc"
              style={{
                fontFamily: "var(--font-jost, sans-serif)",
                fontSize: "0.9375rem",
                fontWeight: 300,
                color: "#3d3830",
                lineHeight: 1.85,
                textAlign: "center",
                maxWidth: "52ch",
                letterSpacing: "0.01em",
              }}
            >
              {project.description}
            </p>
          </div>
        </header>

        {/*  MEDIA STREAM  */}
        <main
          className="py-16 px-6 md:px-16 max-w-6xl mx-auto"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(4rem, 8vw, 8rem)",
          }}
        >
          {groups.map((group, gi) => {
            if (group.type === "pair") {
              return (
                <Reveal key={gi} delay={0}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 items-start">
                    {group.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="overflow-hidden rounded-[4px]"
                        style={{ boxShadow: "0 12px 40px rgba(43,42,39,0.08)" }}
                      >
                        {item.type === "video" ? (
                          <VideoBlock src={item.src} />
                        ) : (
                          <ZoomableImage src={item.src} alt={item.alt ?? ""} />
                        )}
                        {item.alt && (
                          <p
                            className="mt-3"
                            style={{
                              fontFamily: "var(--font-jost, sans-serif)",
                              fontSize: "0.6rem",
                              letterSpacing: "0.3em",
                              textTransform: "uppercase",
                              color: "#b5a99e",
                            }}
                          >
                            {item.alt}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Reveal>
              );
            }

            return (
              <Reveal key={gi} delay={0}>
                <MediaRenderer item={group.item} />
                {group.item.alt && group.item.layoutHint === "full" && (
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-jost, sans-serif)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#b5a99e",
                    }}
                  >
                    {group.item.alt}
                  </p>
                )}
              </Reveal>
            );
          })}
        </main>

        {/*  FOOTER CTA  */}
        <footer className="mt-32 pb-24 flex flex-col items-center gap-10 px-6 text-center">
          <Rule className="w-full max-w-xs" />

          <p
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#2b2a27",
              maxWidth: "28ch",
              lineHeight: 1.3,
            }}
          >
            Interested in a similar project?
          </p>

          <p
            style={{
              fontFamily: "var(--font-jost, sans-serif)",
              fontSize: "0.875rem",
              fontWeight: 300,
              color: "#7a6e63",
              maxWidth: "40ch",
              lineHeight: 1.8,
            }}
          >
            I'm available for new commissions from Q3 2026. Every project begins
            with a no-obligation discovery call.
          </p>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 transition-all duration-300"
            style={{
              fontFamily: "var(--font-jost, sans-serif)",
              fontSize: "0.6875rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#f7f3ee",
              background: "#2b2a27",
              padding: "0.8rem 2rem",
              borderRadius: "999px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "#d4a0a4";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "#2b2a27";
            }}
          >
            Start a project
            <span aria-hidden="true">→</span>
          </Link>

          {/* Navigate */}
          <div className="mt-8 flex items-center gap-5">
            <Link
              href="/#work"
              style={{
                fontFamily: "var(--font-jost, sans-serif)",
                fontSize: "0.625rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#b5a99e",
              }}
              className="transition-colors duration-300 hover:text-[#2b2a27]"
            >
              ← All work
            </Link>
            <span style={{ color: "#d9cbbe" }}>·</span>
            <span
              style={{
                fontFamily: "var(--font-jost, sans-serif)",
                fontSize: "0.625rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#c9bfb5",
              }}
            >
              © 2026 Anastasia Monzon
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
