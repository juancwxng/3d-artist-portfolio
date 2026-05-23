"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

import {
  aboutEyebrow,
  aboutHeadline,
  aboutOpener,
  aboutBody,
  aboutQuote,
  aboutDisciplines,
  aboutPortraitLabel,
  aboutPortraitSrc,
} from "@/data/portfolio";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const headlineLines = aboutHeadline.split(/\\n|\n/);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-title"
      className="reveal px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-32 bg-[#f7f3ee]"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.15fr] md:gap-24 items-start">
        {/* ── Image column ── */}
        <div className="relative">
          {/* Portrait */}
          <div
            className="relative w-full rounded-[3px] overflow-hidden aspect-[3/4]"
            aria-label={aboutPortraitLabel}
          >
            {aboutPortraitSrc ? (
              <Image
                src={aboutPortraitSrc}
                alt={aboutPortraitLabel}
                fill
                className="object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-end justify-start p-6"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(232,197,192,0.15) 0%, rgba(43,42,39,0.1) 100%), #d9cbbe",
                }}
              >
                <span className="text-[0.5625rem] tracking-[0.2em] uppercase text-[#7a6e63]">
                  portrait photo
                </span>
              </div>
            )}
          </div>

          {/* Caption beneath photo — editorial byline style */}
          <p className="mt-4 text-[0.5625rem] tracking-[0.22em] uppercase text-[#7a6e63] font-normal">
            Anastasiia Monzón &nbsp;·&nbsp; Architectural visualisation
          </p>

          {/* Pull quote — overlapping the image bottom, desktop only */}
          <blockquote
            className="hidden md:block mt-10 pl-5 border-l border-[#d9cbbe]"
            aria-label="Anastasiia's philosophy"
          >
            <p className="font-serif text-[1.125rem] italic font-light text-[#2b2a27] leading-[1.6]">
              {aboutQuote}
            </p>
          </blockquote>
        </div>

        {/* ── Content column ── */}
        <div className="flex flex-col justify-center">
          {/* Eyebrow */}
          <p
            className="text-[0.625rem] tracking-[0.22em] uppercase text-[#7a6e63] flex items-center gap-3 mb-[0.875rem]
              before:content-[''] before:w-5 before:h-px before:bg-[#7a6e63] before:inline-block"
          >
            {aboutEyebrow}
          </p>

          {/* Headline */}
          <h2
            id="about-title"
            className="font-serif text-[2rem] font-light italic text-[#2b2a27] leading-[1.25] mb-8"
          >
            {headlineLines.map((line, i) => (
              <span key={`headline-line-${i}`} className="block">
                {line}
              </span>
            ))}
          </h2>

          {/* Opener — slightly larger, heavier weight */}
          <p className="text-[1.0625rem] text-[#2b2a27] leading-[1.75] mb-5 font-normal">
            {aboutOpener}
          </p>

          {/* Body */}
          <p className="text-[0.9375rem] text-[#3d3830] leading-[1.85] font-light">
            {aboutBody}
          </p>

          {/* Pull quote — mobile only (shows between body and disciplines) */}
          <blockquote
            className="md:hidden mt-8 pl-5 border-l border-[#d9cbbe]"
            aria-label="Anastasiia's philosophy"
          >
            <p className="font-serif text-[1.0625rem] italic font-light text-[#2b2a27] leading-[1.6]">
              {aboutQuote}
            </p>
          </blockquote>

          {/* Discipline line */}
          <div className="mt-10 pt-7 border-t border-[#ede5dc]">
            <p className="text-[0.5625rem] tracking-[0.22em] uppercase text-[#7a6e63] font-normal mb-3">
              Practice
            </p>
            <p className="text-[0.75rem] tracking-[0.12em] uppercase text-[#3d3830] font-normal">
              {aboutDisciplines.join("\u2002·\u2002")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
