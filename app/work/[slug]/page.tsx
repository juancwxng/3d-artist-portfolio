"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/portfolio";

/*  TYPES  */
interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  layoutHint?: "full" | "left" | "right" | "half";
}

interface ProjectDetail {
  title: string;
  category: string;
  description: string;
  location: string;
  year: string;
  media: MediaItem[];
}

/* ─── MOCK DATA LAYER ─── */
function getProject(slug: string): ProjectDetail | null {
  const base = projects.find((p) => p.id === slug);
  if (!base) return null;

  const demoMedia: Record<string, MediaItem[]> = {
    "office-moscow": [
      {
        type: "image",
        src: "/projects/office-moscow/hero.jpg",
        alt: "Main reception hall — evening render",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/office-moscow/lobby-left.jpg",
        alt: "Lobby atrium looking east",
        layoutHint: "left",
        caption:
          "The atrium rises eleven metres to a coffered ceiling clad in hand-brushed oak. A single pendant cluster — forty-two handblown spheres — anchors the vertical axis.",
      },
      {
        type: "image",
        src: "/projects/office-moscow/texture-a.jpg",
        alt: "Brushed-brass panel detail",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/office-moscow/texture-b.jpg",
        alt: "Travertine floor close-up",
        layoutHint: "half",
      },
      {
        type: "video",
        src: "/projects/office-moscow/walkthrough.mp4",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/office-moscow/boardroom.jpg",
        alt: "Executive boardroom — north elevation",
        layoutHint: "right",
        caption:
          "Boardroom glazing faces north to eliminate direct glare. The bespoke table — 6.4 m of bookmatched Calacatta Gold — was rendered in four lighting conditions before the marble slab was sourced.",
      },
      {
        type: "image",
        src: "/projects/office-moscow/corridor.jpg",
        alt: "Double-height corridor — ambient light study",
        layoutHint: "full",
      },
    ],
    "garden-spa": [
      {
        type: "image",
        src: "/projects/garden-spa/hero.jpg",
        alt: "Pool terrace at golden hour",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/garden-spa/planting.jpg",
        alt: "Planting scheme — north garden bed",
        layoutHint: "right",
        caption:
          "Planting was resolved entirely in 3D before a single species was specified. Three seasonal palettes were tested — late-summer abundance, early-spring restraint, and the bare geometry of winter.",
      },
      {
        type: "image",
        src: "/projects/garden-spa/stone-a.jpg",
        alt: "Natural stone coping detail",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/garden-spa/stone-b.jpg",
        alt: "Pebble path close-up",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/garden-spa/pavilion.jpg",
        alt: "Garden pavilion — dusk render",
        layoutHint: "left",
        caption:
          "The pavilion roof floats on four slender columns, leaving the garden vista unobstructed. Teak slats are spaced at 38 mm — the precise interval that creates shade without shadow.",
      },
      {
        type: "video",
        src: "/projects/garden-spa/ambient.mp4",
        layoutHint: "full",
      },
    ],
    "luxury-flat": [
      {
        type: "image",
        src: "/projects/luxury-flat/hero.jpg",
        alt: "Living room — midday natural light",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/luxury-flat/kitchen.jpg",
        alt: "Open-plan kitchen looking toward balcony",
        layoutHint: "left",
        caption:
          "Island dimensions were iterated six times before the client signed off. The final slab — 2.8 × 1.1 m of bookmatched Arabescato — required sourcing two adjacent quarry blocks to achieve the mirror-match.",
      },
      {
        type: "image",
        src: "/projects/luxury-flat/fabric.jpg",
        alt: "Bouclé upholstery swatch render",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/luxury-flat/marble.jpg",
        alt: "Arabescato marble island surface",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/luxury-flat/bedroom.jpg",
        alt: "Master bedroom — pre-dawn render",
        layoutHint: "right",
        caption:
          "The pre-dawn render was the client's specific request — they wanted to see how the room felt at 5 a.m., when the city light is a thin grey ribbon on the horizon and the room belongs entirely to itself.",
      },
      {
        type: "video",
        src: "/projects/luxury-flat/tour.mp4",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/luxury-flat/bathroom.jpg",
        alt: "En-suite — Zellige tile study",
        layoutHint: "full",
      },
    ],
    "law-firm-buffet": [
      {
        type: "image",
        src: "/projects/law-firm-buffet/hero.jpg",
        alt: "Dining hall — concept render draft",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/law-firm-buffet/bar.jpg",
        alt: "Bar counter — material study",
        layoutHint: "right",
        caption:
          "The bar counter is still in material review. Option A pairs smoked oak with honed Nero Marquina; Option B uses fluted plaster with unlacquered brass. Both are being presented to the client in January.",
      },
      {
        type: "image",
        src: "/projects/law-firm-buffet/tile-a.jpg",
        alt: "Handmade ceramic tile option A",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/law-firm-buffet/tile-b.jpg",
        alt: "Handmade ceramic tile option B",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/law-firm-buffet/seating.jpg",
        alt: "Banquette seating — elevation study",
        layoutHint: "left",
        caption:
          "Banquette depth was a considered decision: 620 mm back-to-table allows a comfortable working lunch without the informality of a deeper lounge seat — appropriate for a firm where the dining room doubles as a client space.",
      },
    ],
  };

  const categoryMap: Record<string, string> = {
    "office-moscow": "Commercial Interior",
    "garden-spa": "Landscape & Exterior",
    "luxury-flat": "Residential Interior",
    "law-firm-buffet": "F&B Interior",
  };

  const locationMap: Record<string, string> = {
    "office-moscow": "Moscow, Russia",
    "garden-spa": "Moscow Oblast, Russia",
    "luxury-flat": "Tverskaya, Moscow",
    "law-firm-buffet": "Central Moscow",
  };

  const descMap: Record<string, string> = {
    "office-moscow":
      "A 4,200 m² commercial headquarters designed to project authority through restraint — travertine floors, brushed-brass joinery, and cathedral-height atria rendered across twelve camera studies to guide the client's design approval process.",
    "garden-spa":
      "A private spa garden conceived as a series of outdoor rooms: the pool terrace, the shade pavilion, and the kitchen garden. Every planting scheme, stone selection, and water feature was resolved in 3D before a single plant was ordered.",
    "luxury-flat":
      "A 180 m² apartment in Moscow's most sought-after address. The brief called for restrained luxury — Arabescato marble, bouclé upholstery, and floor-to-ceiling glazing — resolved across nine final renders and one cinematic walkthrough.",
    "law-firm-buffet":
      "An in-house dining and hospitality suite for a prominent law firm, currently in production. Material directions under review — two tile options and three lighting scenarios are being evaluated ahead of the final client presentation.",
  };

  return {
    title: base.name.replace("\n", " "),
    category: categoryMap[slug] ?? base.sub,
    description: descMap[slug] ?? base.sub,
    location: locationMap[slug] ?? "Russia",
    year: base.year,
    media: demoMedia[slug] ?? [],
  };
}

/* ZOOM OVERLAY */
function ZoomOverlay({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Zoomed: ${alt}`}
      className="fixed inset-0 z-[500] flex items-center justify-center cursor-zoom-out"
      style={{
        background: "rgba(247, 243, 238, 0.97)",
        backdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      {/* Close hint */}
      <span
        className="absolute top-6 right-8 font-sans text-[10px] tracking-[0.3em] uppercase text-[#7a6e63]"
        style={{ fontFamily: "var(--font-jost, sans-serif)" }}
      >
        Press Esc or click to close
      </span>

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-[3px]"
        style={{
          boxShadow: "0 40px 120px rgba(43,42,39,0.18)",
          animation: "zoomIn 0.38s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="block w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
          style={{ display: "block" }}
        />
      </div>

      <style>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

/*  ZOOMABLE IMAGE  */
function ZoomableImage({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`block w-full h-auto cursor-zoom-in transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.012] ${className}`}
        style={{ display: "block" }}
        onClick={() => setZoomed(true)}
      />
      {zoomed && (
        <ZoomOverlay src={src} alt={alt} onClose={() => setZoomed(false)} />
      )}
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
