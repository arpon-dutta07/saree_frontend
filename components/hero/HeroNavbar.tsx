import React from "react";
import Image from "next/image";

export default function HeroNavbar() {
  const navLinks = [
    { label: "SAREES", href: "#sarees" },
    { label: "NEW ARRIVALS", href: "#new-arrivals" },
    { label: "COLLECTIONS", href: "#collections" },
    { label: "GIFTS", href: "#gifts" },
    { label: "ABOUT", href: "#about" },
    { label: "JOURNAL", href: "#journal" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="relative w-full h-full px-[3.5%] flex items-center select-none">
      {/* Centered Brand Monogram Seal + Nav Pill */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[1.6vw] h-full">
        {/* Brand Monogram Seal */}
        <a href="#" className="flex-shrink-0 group focus:outline-none h-[75%] aspect-square" aria-label="CG Luxury Sarees Home">
          <div className="w-full h-full rounded-full bg-[#FAF6F0] p-[8%] flex items-center justify-center shadow-lg border border-[#D4AF37]/30 transition-transform duration-300 group-hover:scale-105">
            <div className="relative w-full h-full">
              <Image
                src="/hero/logo-mark.png"
                alt="CG Monogram Seal"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </a>

        {/* Nav Pill */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-[1.8vw] px-[2.2vw] py-[0.5vw] rounded-full bg-black/30 backdrop-blur-sm border border-white/10 shadow-sm"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[clamp(10px,0.85vw,12px)] font-sans font-medium tracking-[0.2em] text-[#FAF6F0]/85 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Action Icons right-anchored */}
      <div className="ml-auto flex items-center gap-[1.2vw] text-[#FAF6F0]/90">
        {/* Search */}
        <button
          type="button"
          aria-label="Search collection"
          className="p-1 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#ff1838]"
        >
          <svg
            className="w-[1.4vw] min-w-[16px] h-[1.4vw] min-h-[16px]"
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
          className="p-1 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#ff1838]"
        >
          <svg
            className="w-[1.4vw] min-w-[16px] h-[1.4vw] min-h-[16px]"
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
          className="relative p-1 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#ff1838]"
        >
          <svg
            className="w-[1.4vw] min-w-[16px] h-[1.4vw] min-h-[16px]"
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
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#ff1838] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    </header>
  );
}
