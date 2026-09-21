"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "SAREES", href: "#corridor" },
    { label: "NEW ARRIVALS", href: "#new-arrivals" },
    { label: "HERITAGE", href: "#heritage" },
    { label: "LIVING SILK", href: "#silk-canvas" },
    { label: "STYLING", href: "#private-styling" },
    { label: "CONCIERGE", href: "#contact" },
  ];

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="relative w-full h-full px-4 sm:px-[3.5%] flex items-center justify-between select-none">
        {/* Mobile Hamburger Button (left aligned on mobile) */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="p-2 -ml-2 text-[#FAF6F0] hover:text-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 rounded-sm transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Center / Brand Monogram Seal + Desktop Nav Pill */}
        <div className="flex items-center gap-3 md:absolute md:left-1/2 md:-translate-x-1/2 md:gap-[1.6vw] h-full">
          {/* Brand Monogram Seal */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none h-[75%] max-h-[48px] aspect-square"
            aria-label="Aarohi Haute Couture Home"
          >
            <div className="w-full h-full rounded-full bg-[#FAF6F0] p-[8%] flex items-center justify-center shadow-lg border border-[#D4AF37]/40 transition-transform duration-300 group-hover:scale-105">
              <div className="relative w-full h-full">
                <Image
                  src="/hero/logo-mark.png"
                  alt="Aarohi Monogram Seal"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            {/* Mobile Brand Name for clarity */}
            <span className="md:hidden font-serif text-[17px] font-medium tracking-[0.06em] text-[#FAF6F0]">
              Aarohi
            </span>
          </a>

          {/* Desktop Nav Pill */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex flex-nowrap items-center gap-[1.2vw] lg:gap-[1.6vw] xl:gap-[1.8vw] px-[1.6vw] lg:px-[2.2vw] py-[0.45vw] lg:py-[0.5vw] rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/20 shadow-md"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-[clamp(9.5px,0.78vw,11.5px)] font-sans font-medium tracking-[0.16em] lg:tracking-[0.2em] text-[#FAF6F0]/85 hover:text-[#D4AF37] transition-colors duration-200 leading-none"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Action Icons right-anchored */}
        <div className="ml-auto flex items-center justify-end gap-3 sm:gap-[1.2vw] text-[#FAF6F0]/90 z-20 pointer-events-auto">
          {/* Search */}
          <button
            type="button"
            aria-label="Search collection"
            className="p-1 hover:text-[#D4AF37] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-[1.4vw] sm:min-w-[16px] sm:h-[1.4vw] sm:min-h-[16px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </button>

          {/* Account */}
          <button
            type="button"
            aria-label="Account"
            className="p-1 hover:text-[#D4AF37] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D4AF37] hidden xs:inline-block cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-[1.4vw] sm:min-w-[16px] sm:h-[1.4vw] sm:min-h-[16px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
            >
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart */}
          <button
            type="button"
            aria-label="Cart (0 items)"
            className="relative p-1 hover:text-[#D4AF37] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-[1.4vw] sm:min-w-[16px] sm:h-[1.4vw] sm:min-h-[16px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
            >
              <path
                d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#8B1E3F] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[#D4AF37]/50">
              0
            </span>
          </button>
        </div>
      </header>

      {/* Luxury Slide-Out Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Sliding Drawer Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative w-[85%] max-w-[340px] h-full bg-[#140306] border-r border-[#D4AF37]/35 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto text-[#FAF6F0]"
            >
              {/* Drawer Top / Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#FAF6F0]/15">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FAF6F0] p-1 flex items-center justify-center border border-[#D4AF37]/50">
                      <div className="relative w-full h-full">
                        <Image
                          src="/hero/logo-mark.png"
                          alt="Aarohi Monogram"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold tracking-[0.1em] text-[#FAF6F0]">
                        Aarohi
                      </h2>
                      <p className="font-sans text-[8px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37]">
                        HAUTE COUTURE
                      </p>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="p-2 -mr-2 text-[#FAF6F0]/80 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="mt-8 space-y-4">
                  {navLinks.map((link, idx) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between py-2 border-b border-[#FAF6F0]/5 text-[#FAF6F0] hover:text-[#D4AF37] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#D4AF37] text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                          ◈
                        </span>
                        <span className="font-display text-base tracking-[0.14em]">
                          {link.label}
                        </span>
                      </div>
                      <span className="font-serif italic text-xs text-[#FAF6F0]/40 group-hover:text-[#D4AF37] transition-colors">
                        0{idx + 1}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Drawer Bottom / Concierge Shortcut */}
              <div className="pt-6 border-t border-[#FAF6F0]/15 space-y-3">
                <span className="block font-sans text-[9px] font-semibold tracking-[0.35em] text-[#D4AF37] uppercase">
                  ATELIER CONCIERGE
                </span>
                <a
                  href="mailto:concierge@aarohisarees.com"
                  className="block font-serif text-sm text-[#FAF6F0]/90 hover:text-[#D4AF37] transition-colors"
                >
                  concierge@aarohisarees.com
                </a>
                <p className="font-sans text-[11px] text-[#FAF6F0]/60">
                  Park Street Heritage Court · Kolkata
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
