"use client";

import { useEffect, useRef } from "react";
import type { SocialLink } from "@/types";
import {
  socialEyebrow,
  socialTitle,
  socialStatement,
  socialLinks,
} from "@/data/portfolio";

export default function SocialSection() {
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

  const [titleLine1, titleLine2] = socialTitle.split("\n");

  return (
    <section
      id="social"
      ref={sectionRef}
      aria-labelledby="social-title"
      className="reveal bg-[#ede5dc] border-t border-[#d9cbbe] px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-14 lg:py-28"
    >
      {/* Eyebrow */}
      <p
        className="text-[0.625rem] tracking-[0.3em] uppercase text-[#7a6e63] font-normal flex items-center gap-3 mb-12 md:mb-16
          before:content-[''] before:w-5 before:h-px before:bg-[#7a6e63] before:inline-block"
      >
        {socialEyebrow}
      </p>

      {/* Body — two columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] md:gap-0 items-start">
        {/* ── Left — editorial statement ───────────────────── */}
        <div className="md:pr-12 lg:pr-20">
          <h2
            id="social-title"
            className="font-serif font-light italic text-[#2b2a27] leading-[1.05] mb-8"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)" }}
          >
            <span className="block">{titleLine1}</span>
            {titleLine2 && <span className="block">{titleLine2}</span>}
          </h2>

          {/* Thin rule */}
          <div className="w-10 h-px bg-[#d9cbbe] mb-8" aria-hidden="true" />

          <p className="text-[0.9375rem] text-[#7a6e63] font-light leading-[1.85] max-w-[380px]">
            {socialStatement}
          </p>
        </div>

        {/* ── Vertical rule — desktop only ─────────────────── */}
        <div
          className="hidden md:block bg-[#d9cbbe] mx-12 lg:mx-20 self-stretch"
          aria-hidden="true"
        />

        {/* ── Right — platform links ───────────────────────── */}
        <div className="mt-14 md:mt-0 flex flex-col">
          {socialLinks.map((link: SocialLink, i: number) => (
            <div key={link.platform}>
              {/* Divider between items */}
              {i > 0 && (
                <div className="h-px bg-[#d9cbbe] my-9" aria-hidden="true" />
              )}

              {/* Platform entry */}
              <p className="text-[0.5625rem] tracking-[0.35em] uppercase text-[#7a6e63] font-normal mb-4">
                {link.label}
              </p>

              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
                aria-label={`${link.platform} — opens in a new tab`}
              >
                {/* Platform name — large, typographic */}
                <span
                  className="block font-serif font-light italic text-[#2b2a27] leading-[1.1] transition-colors duration-300 group-hover:text-[#7a4455]"
                  style={{ fontSize: "clamp(1.625rem, 3.5vw, 2.25rem)" }}
                >
                  {link.platform}
                </span>

                {/* Handle — fine text, acts as the visible URL */}
                <span className="mt-2 flex items-center gap-2">
                  <span className="text-[0.6875rem] tracking-[0.12em] text-[#7a6e63] font-light transition-colors duration-300 group-hover:text-[#2b2a27]">
                    {link.handle}
                  </span>
                  {/* Arrow — shifts on hover */}
                  <span
                    className="text-[#d9cbbe] text-[0.625rem] tracking-[0.1em] inline-block transition-[transform,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-px group-hover:text-[#7a4455]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </a>

              {/* Optional descriptor */}
              {link.desc && (
                <p className="mt-4 text-[0.8125rem] text-[#7a6e63] font-light leading-[1.75] max-w-[280px]">
                  {link.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
