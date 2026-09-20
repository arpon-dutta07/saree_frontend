"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 850);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 lg:py-28 overflow-hidden select-none border-t border-[#8B1E3F]/30"
    >
      {/* 1. Base Royal Crimson Textured Backdrop provided by user */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/contact/contact-bg-crimson.jpg"
          alt="Royal Crimson Atelier Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle dark vignette overlay for enhanced card pop and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* ── Editorial Section Header: "Get In Touch" ─────────────────────── */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="block font-sans text-[11px] font-semibold tracking-[0.38em] text-[#E8C56B] uppercase mb-3">
            Concierge &amp; Flagship Atelier
          </span>
          <h2 className="font-serif text-[clamp(38px,4.5vw,58px)] font-light text-[#FAF6F0] tracking-wide leading-none">
            Get In <span className="italic font-normal text-[#E8C56B]">Touch</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
            <span className="text-[#D4AF37] text-xs">❖</span>
            <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
          </div>
        </div>

        {/* ── Main 3-Column Grid with Warm Offwhite Cards ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-stretch">
          
          {/* ── COLUMN 1: Direct Concierge & Studio Info (lg:col-span-4) ──────── */}
          <div className="lg:col-span-4 bg-[#FAF6F0] rounded-sm p-8 sm:p-9 shadow-2xl border border-[#E5DACB]/90 flex flex-col justify-between space-y-8">
            <div className="space-y-7">
              {/* Item 1: Email Us */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#4A0E17] text-[#FAF6F0] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 border border-[#D4AF37]/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-1 pt-0.5">
                  <span className="block font-sans text-[11px] font-semibold tracking-[0.24em] text-[#8C6D58] uppercase">
                    Email Us
                  </span>
                  <a
                    href="mailto:concierge@aarohisarees.com"
                    className="block font-serif text-[17px] font-semibold text-[#1E0409] hover:text-[#4A0E17] transition-colors"
                  >
                    concierge@aarohisarees.com
                  </a>
                  <p className="font-sans text-[13px] text-[#7A6458] leading-relaxed">
                    We&apos;d love to hear from you.
                  </p>
                </div>
              </div>

              {/* Item 2: Call Us */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#4A0E17] text-[#FAF6F0] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 border border-[#D4AF37]/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="space-y-1 pt-0.5">
                  <span className="block font-sans text-[11px] font-semibold tracking-[0.24em] text-[#8C6D58] uppercase">
                    Call Us
                  </span>
                  <a
                    href="tel:+919876543210"
                    className="block font-serif text-[17px] font-semibold text-[#1E0409] hover:text-[#4A0E17] transition-colors"
                  >
                    +91 98765 43210
                  </a>
                  <p className="font-sans text-[13px] text-[#7A6458] leading-relaxed">
                    Mon – Sat, 10:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>

              {/* Item 3: Visit Our Studio */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#4A0E17] text-[#FAF6F0] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 border border-[#D4AF37]/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="space-y-1 pt-0.5">
                  <span className="block font-sans text-[11px] font-semibold tracking-[0.24em] text-[#8C6D58] uppercase">
                    Visit Our Studio
                  </span>
                  <p className="font-serif text-[16px] font-semibold text-[#1E0409] leading-snug">
                    123 Heritage Lane, Ballygunge,
                    <br />
                    Kolkata – 700019
                  </p>
                  <p className="font-sans text-[13px] text-[#7A6458] leading-relaxed">
                    Experience our collection in person.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-5 pt-2">
              <a
                href="https://maps.google.com/?q=Ballygunge+Kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#4A0E17] text-[#FAF6F0] font-sans text-[11px] font-semibold tracking-[0.24em] uppercase shadow-md hover:bg-[#2A080C] hover:shadow-lg transition-all duration-300 group rounded-none"
              >
                <span>Get Directions</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

              <div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-sans text-[11px] font-semibold tracking-[0.24em] text-[#8C6D58] hover:text-[#4A0E17] uppercase transition-colors"
                >
                  <span className="w-5 h-5 rounded-full border border-[#D5C7B8] flex items-center justify-center text-[10px] text-[#4A0E17]">
                    »
                  </span>
                  <span>Follow Us @aarohisarees</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── COLUMN 2: Send Us A Message Form (lg:col-span-4) ──────────────── */}
          <div className="lg:col-span-4 bg-[#FAF6F0] rounded-sm p-8 sm:p-9 shadow-2xl border border-[#E5DACB]/90 flex flex-col justify-between">
            <div>
              <h3 className="font-sans text-[12px] font-semibold tracking-[0.26em] text-[#1E0409] uppercase mb-6 pb-3 border-b border-[#E5DACB]">
                Send Us A Message
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#4A0E17] text-[#FAF6F0] flex items-center justify-center text-xl shadow-md">
                    ✓
                  </div>
                  <h4 className="font-serif text-2xl text-[#1E0409]">
                    Thank You
                  </h4>
                  <p className="font-sans text-sm text-[#7A6458] max-w-xs mx-auto leading-relaxed">
                    Your message has been conveyed to our senior atelier concierge. We will respond promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-block mt-4 text-xs font-sans font-semibold tracking-[0.2em] text-[#4A0E17] uppercase border-b border-[#4A0E17] pb-1 hover:text-[#2A080C] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-[11px] font-medium text-[#5E4A3F]">
                      Your Name <span className="text-[#4A0E17]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F6F0E6] border border-[#E2D6C5] text-sm text-[#1E0409] placeholder-[#9A8778] rounded-none focus:outline-none focus:border-[#4A0E17] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-[11px] font-medium text-[#5E4A3F]">
                      Your Email <span className="text-[#4A0E17]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F6F0E6] border border-[#E2D6C5] text-sm text-[#1E0409] placeholder-[#9A8778] rounded-none focus:outline-none focus:border-[#4A0E17] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-[11px] font-medium text-[#5E4A3F]">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help you?"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F6F0E6] border border-[#E2D6C5] text-sm text-[#1E0409] placeholder-[#9A8778] rounded-none focus:outline-none focus:border-[#4A0E17] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block font-sans text-[11px] font-medium text-[#5E4A3F]">
                      Message <span className="text-[#4A0E17]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your message here..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F6F0E6] border border-[#E2D6C5] text-sm text-[#1E0409] placeholder-[#9A8778] rounded-none focus:outline-none focus:border-[#4A0E17] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#4A0E17] text-[#FAF6F0] font-sans text-[11px] font-semibold tracking-[0.28em] uppercase shadow-md hover:bg-[#2A080C] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-75 group rounded-none border border-[#D4AF37]/30"
                    >
                      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ── COLUMN 3: Royal Maroon Quote & Lotus Panel (lg:col-span-4) ────── */}
          <div className="lg:col-span-4 relative rounded-sm overflow-hidden bg-gradient-to-b from-[#3E0A14] to-[#26050C] text-[#FAF6F0] p-8 sm:p-9 flex flex-col justify-between shadow-2xl border border-[#D4AF37]/35 min-h-[480px]">
            {/* Top Poetic Quote & Traditional Separator */}
            <div className="relative z-10 space-y-6 pt-2">
              <blockquote className="font-serif text-[clamp(22px,2vw,30px)] italic font-light text-[#FAF6F0] leading-snug tracking-wide">
                &ldquo;Every saree is a bond — woven in silk, yet human.&rdquo;
              </blockquote>

              {/* Traditional Gold Ornamental Divider */}
              <div className="flex items-center gap-3 w-36">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
                <span className="text-[#D4AF37] text-xs leading-none">❖</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
              </div>
            </div>

            {/* Botanical Lotus Engraved Illustration */}
            <div className="relative w-full h-[270px] sm:h-[310px] mt-auto pointer-events-none flex items-end justify-center">
              <Image
                src="/contact/lotus-engraving.png"
                alt="Botanical lotus line-art engraving in gold on royal maroon"
                width={310}
                height={310}
                className="object-contain object-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
