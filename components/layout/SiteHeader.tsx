"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { logoText, navLinks } from "@/data/portfolio";
import Link from "next/link";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* ── Scroll → header style ───────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Escape key closure ──────────────────────────────── */
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  /* ── Focus trap ──────────────────────────────────────── */
  useEffect(() => {
    if (!menuOpen) return;

    // Move focus into menu
    firstFocusableRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = menuRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* ── Prevent body scroll when menu open ─────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[200] flex justify-between items-center px-5 py-4 sm:px-8 sm:py-5 lg:px-14 lg:py-6"
        style={{
          height: "var(--header-h, 58px)",
          background: scrolled
            ? "rgba(247, 243, 238, 0.92)" // Frosted Warm White
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(217, 203, 190, 0.4)"
            : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-[1rem] sm:text-[1.125rem] italic font-normal text-[#2b2a27] tracking-[0.05em] relative z-[10] flex items-center gap-3
            sm:after:content-[''] sm:after:w-8 sm:after:h-px sm:after:bg-[#d9cbbe] sm:after:inline-block"
        >
          {logoText}
        </Link>

        {/* Desktop nav */}
        <nav className="relative z-[10] hidden md:block">
          <ul className="flex gap-11 list-none items-center">
            {navLinks.map((link) =>
              link.cta ? (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#f7f3ee] bg-[#2b2a27] px-[1.25rem] py-[0.5rem] rounded-full tracking-[0.18em] text-[0.625rem] font-medium uppercase transition-[background,color] duration-300 hover:bg-[#d4a0a4]"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.6875rem] tracking-[0.3em] uppercase text-[#7a6e63] transition-colors duration-300 hover:text-[#2b2a27] font-normal"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Hamburger — mobile only */}
        <button
          ref={hamburgerRef}
          className="flex md:hidden flex-col gap-[5px] cursor-pointer p-2 relative z-[201]"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className="block w-[22px] h-px bg-[#2b2a27] transition-all duration-[400ms] origin-center"
            style={
              menuOpen ? { transform: "translateY(6px) rotate(45deg)" } : {}
            }
          />
          <span
            className="block w-[22px] h-px bg-[#2b2a27] transition-all duration-[400ms]"
            style={
              menuOpen ? { opacity: 0, transform: "translateX(10px)" } : {}
            }
          />
          <span
            className="block w-[22px] h-px bg-[#2b2a27] transition-all duration-[400ms] origin-center"
            style={
              menuOpen ? { transform: "translateY(-6px) rotate(-45deg)" } : {}
            }
          />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-[190] bg-[#f7f3ee] flex flex-col items-center justify-center gap-10"
        style={{
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transition:
            "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            ref={
              i === 0
                ? firstFocusableRef
                : i === navLinks.length - 1
                  ? lastFocusableRef
                  : undefined
            }
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
            className="relative font-serif text-[2.75rem] italic font-light text-[#2b2a27] transition-all duration-500 hover:text-[#d4a0a4]"
            style={{
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
              transitionDelay: `${i * 0.05}s`, // Staggered reveal effect
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
