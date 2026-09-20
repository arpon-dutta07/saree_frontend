"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative w-full bg-[#FAF6F0] text-[#1E0409] overflow-hidden select-none border-t border-[#E5DACB]">
      {/* 1. User-Provided Textured Foliage Parchment Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/footer/footer-bg-parchment.png"
          alt="Warm Parchment Wallpaper"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ── 1. Top Newsletter Banner ────────────────────────────────────────── */}
      <div className="relative z-10 border-b border-[#E5DACB] py-12 lg:py-14 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-2 max-w-xl">
            <span className="font-sans text-[10.5px] font-semibold tracking-[0.34em] text-[#8C6D58] uppercase">
              The Atelier Circle
            </span>
            <h3 className="font-serif text-[clamp(24px,2.4vw,34px)] font-normal text-[#1E0409] leading-snug">
              Receive private salon viewings, seasonal lookbooks &amp; <span className="italic font-light text-[#4A0E17]">bridal invitations</span>.
            </h3>
          </div>

          <div className="w-full lg:w-auto min-w-[320px] sm:min-w-[420px]">
            {subscribed ? (
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-none bg-[#F4EDE2] border border-[#D4AF37]/50 text-[#4A0E17] text-sm">
                <span>✦</span>
                <span className="font-serif text-sm font-medium">Welcome to the Aarohi Atelier Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-5 py-3.5 bg-[#F6F0E6] border border-[#E2D6C5] text-sm text-[#1E0409] placeholder-[#9A8778] rounded-none focus:outline-none focus:border-[#4A0E17] focus:bg-white transition-colors pr-36"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-5 py-2.5 bg-[#4A0E17] hover:bg-[#2A080C] text-[#FAF6F0] font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase transition-colors shadow-sm"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── 2. Main 4-Column Grand Navigation ─────────────────────────────────── */}
      <div className="relative z-10 py-16 lg:py-20 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Craft Philosophy (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F0] p-1.5 flex items-center justify-center border border-[#D4AF37]/50 shadow-md">
                <div className="relative w-full h-full">
                  <Image
                    src="/hero/logo-mark.png"
                    alt="Aarohi Monogram Seal"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-serif text-2xl font-semibold tracking-[0.06em] text-[#1E0409] leading-none">
                  Aarohi
                </h4>
                <span className="font-sans text-[8.5px] font-semibold tracking-[0.38em] text-[#4A0E17] uppercase">
                  Haute Couture
                </span>
              </div>
            </div>

            <p className="font-sans text-[13px] text-[#5E4A3F] leading-relaxed max-w-sm">
              Handcrafted in historic weaving clusters across Bengal, Varanasi, and Kanchipuram. Preserving sacred textile legacies through contemporary Indian couture.
            </p>

            <div className="pt-1 space-y-1.5 text-xs text-[#7A6458] font-sans">
              <p>Atelier Concierge: <a href="mailto:concierge@aarohisarees.com" className="font-medium text-[#1E0409] hover:text-[#4A0E17] transition-colors">concierge@aarohisarees.com</a></p>
              <p>Direct Line: <a href="tel:+919876543210" className="font-medium text-[#1E0409] hover:text-[#4A0E17] transition-colors">+91 98765 43210</a></p>
            </div>
          </div>

          {/* Column 2: Collections (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <h5 className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#8C6D58] uppercase">
              Collections
            </h5>
            <ul className="space-y-3 font-serif text-[16px] text-[#1E0409]/85">
              <li><a href="#sarees" className="hover:text-[#4A0E17] transition-colors">Heritage Raw Silks</a></li>
              <li><a href="#sarees" className="hover:text-[#4A0E17] transition-colors">Royal Banarasi Zari</a></li>
              <li><a href="#sarees" className="hover:text-[#4A0E17] transition-colors">Kanjeevaram Gold Drapes</a></li>
              <li><a href="#sarees" className="hover:text-[#4A0E17] transition-colors">Hand-Painted Organza</a></li>
              <li><a href="#new-arrivals" className="hover:text-[#4A0E17] transition-colors">Festive &amp; Bridal Edit</a></li>
              <li><a href="#sarees" className="hover:text-[#4A0E17] transition-colors">Bespoke Trousseau</a></li>
            </ul>
          </div>

          {/* Column 3: The House & Craft (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            <h5 className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#8C6D58] uppercase">
              The House
            </h5>
            <ul className="space-y-3 font-serif text-[16px] text-[#1E0409]/85">
              <li><a href="#heritage" className="hover:text-[#4A0E17] transition-colors">Our Heritage</a></li>
              <li><a href="#heritage" className="hover:text-[#4A0E17] transition-colors">Master Weavers</a></li>
              <li><a href="#heritage" className="hover:text-[#4A0E17] transition-colors">Handloom Seal</a></li>
              <li><a href="#heritage" className="hover:text-[#4A0E17] transition-colors">Textile Care</a></li>
              <li><a href="#heritage" className="hover:text-[#4A0E17] transition-colors">Sustainability</a></li>
            </ul>
          </div>

          {/* Column 4: Client Concierge & Studios (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <h5 className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#8C6D58] uppercase">
              Atelier &amp; Boutiques
            </h5>
            <div className="space-y-4 font-sans text-xs text-[#5E4A3F]">
              <div>
                <span className="block font-medium text-[#1E0409] font-serif text-[15px]">Ballygunge Studio · Kolkata</span>
                <p className="text-[#7A6458]">123 Heritage Lane, Kolkata 700019</p>
                <p className="text-[#4A0E17] text-[11px] font-semibold mt-0.5">By Private Appointment</p>
              </div>

              <div>
                <span className="block font-medium text-[#1E0409] font-serif text-[15px]">Mehrauli Atelier · New Delhi</span>
                <p className="text-[#7A6458]">One Style Mile, Mehrauli 110030</p>
                <p className="text-[#4A0E17] text-[11px] font-semibold mt-0.5">Walk-ins &amp; Appointments</p>
              </div>

              <div className="pt-1">
                <a
                  href="mailto:concierge@aarohisarees.com?subject=Bespoke%20Appointment%20Request"
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#4A0E17] hover:text-[#2A080C] transition-colors"
                >
                  <span>Book Private Styling</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. Bottom Credits Bar ────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-[#E5DACB] py-7 px-6 sm:px-10 lg:px-16 text-xs text-[#7A6458] font-sans">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="tracking-wide">
            © 2026 Aarohi Haute Couture. All Rights Reserved. Woven with Indian Heritage.
          </p>

          <div className="flex items-center gap-5">
            <a href="#privacy" className="hover:text-[#1E0409] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-[#1E0409] transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#handloom" className="hover:text-[#1E0409] transition-colors">Craft Certification</a>
          </div>

          <div className="flex items-center gap-4 text-[#4A0E17]">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2A080C] transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2A080C] transition-colors" aria-label="Pinterest">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.218-.172.265-.4.159-1.499-.696-2.435-2.88-2.435-4.634 0-3.774 2.743-7.243 7.906-7.243 4.15 0 7.374 2.957 7.374 6.908 0 4.123-2.599 7.44-6.208 7.44-1.213 0-2.354-.63-2.744-1.375l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
