'use client';
import { useEffect, useRef } from 'react';
import {
  heroEyebrow,
  heroName,
  heroTagline,
  heroPrimaryBtn,
  heroSecondaryBtn,
  heroQuote,
} from '@/data/portfolio';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [firstName, lastName] = heroName as [string, string];

  useEffect(() => {
    const el = sectionRef.current;
    if (el) {
      setTimeout(() => el.classList.add('is-visible'), 100);
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Introduction"
      className="reveal relative min-h-svh flex flex-col items-center justify-center text-center overflow-hidden bg-[#f7f3ee]"
      style={{ paddingTop: 'var(--header-h, 58px)' }}
    >
      {/* ── Background image with gradient overlay ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/render-placeholder.jpg"
          alt="Hero 3D Render"
          className="object-cover w-full h-full opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f3ee]/70 to-[#f7f3ee]" />
      </div>

      {/* ── Centered content ── */}
      <div className="relative z-[1] flex flex-col items-center px-6 py-16 sm:px-10 md:px-16 max-w-4xl mx-auto w-full">

        {/* Eyebrow */}
        <p
          className="text-[0.5rem] tracking-[0.32em] uppercase text-[#7a6e63] font-normal mb-7 flex items-center gap-3"
          aria-hidden="true"
        >
          <span className="w-5 h-px bg-[#7a6e63] opacity-50 shrink-0" />
          {heroEyebrow}
          <span className="w-5 h-px bg-[#7a6e63] opacity-50 shrink-0" />
        </p>

        {/* Name */}
        <h1
          className="font-serif font-light italic text-[#2b2a27] leading-[0.9] tracking-[-0.01em] mb-7 text-5xl md:text-7xl"
        >
          {firstName}
          <br />
          {lastName}
        </h1>

        {/* Thin rule */}
        <div className="w-12 h-px bg-[#d9cbbe] mb-7" aria-hidden="true" />

        {/* Tagline */}
        <p
          className="font-serif italic font-light text-[#3d3830] leading-[1.6] max-w-sm mb-10"
          style={{ fontSize: 'clamp(0.9375rem, 2.2vw, 1.1875rem)' }}
        >
          {heroTagline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-14">
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#d9cbbe] text-[#2b2a27] text-xs tracking-widest uppercase px-8 py-[0.875rem] rounded-full transition-colors duration-300 hover:bg-[#d9cbbe]/30 w-full sm:w-auto"
          >
            {heroPrimaryBtn}
          </a>
          <a
            href="#contact"
            className="text-[0.625rem] tracking-[0.22em] uppercase text-[#7a6e63] transition-colors duration-200 hover:text-[#2b2a27]"
          >
            {heroSecondaryBtn}
          </a>
        </div>

        {/* Quote */}
        <p className="font-serif italic font-light text-[#7a6e63] text-[0.875rem] leading-[1.7] max-w-md mx-auto">
          {heroQuote}
        </p>
      </div>
    </section>
  );
}
