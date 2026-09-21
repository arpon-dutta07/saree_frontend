"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EditorialTitleReveal } from "@/components/motion/ScrollReveal";

interface SareeItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
}

const heritageCollection: SareeItem[] = [
  {
    id: "01",
    name: "EMERALD GREEN",
    subtitle: "Regal Heritage",
    category: "BANARASI SILK",
    image: "/heritage/card-emerald.png",
  },
  {
    id: "02",
    name: "ROYAL INDIGO",
    subtitle: "Midnight Opulence",
    category: "KANCHIPURAM",
    image: "/heritage/card-indigo.png",
  },
  {
    id: "03",
    name: "GILDED GOLD",
    subtitle: "Imperial Zari",
    category: "CHANDERI WEAVES",
    image: "/heritage/card-gilded.png",
  },
  {
    id: "04",
    name: "AZURE BLUE",
    subtitle: "Palace Serenade",
    category: "ROYAL ZARI EDIT",
    image: "/heritage/card-azure.png",
  },
];

const categories = [
  "BANARASI SILK",
  "KANCHIPURAM",
  "CHANDERI WEAVES",
  "ROYAL ZARI EDIT",
];

// Luxury Framer Motion Animation Variants matching Hero Section easing
const luxuryEase = [0.22, 1, 0.36, 1];

const sectionContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: luxuryEase,
    },
  },
};

const editorialVariants = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.95,
      ease: luxuryEase,
    },
  },
};

const cardCascadeVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      delay: 0.15 + i * 0.12,
      ease: luxuryEase,
    },
  }),
};

const cornerOverlayVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: luxuryEase,
    },
  },
};

export default function HeritageSection() {
  const [activeCategory, setActiveCategory] = useState<string>("BANARASI SILK");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? heritageCollection.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === heritageCollection.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.section
      id="heritage"
      className="relative w-full aspect-[16/9] max-h-screen min-h-[700px] overflow-hidden bg-[#1E0409] text-[#FAF6F0] select-none mx-auto border-t border-[#FAF6F0]/15"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* 1. Base Textured Maroon Paper Background Plate */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/heritage/bg-maroon.png"
          alt="Rich maroon textured parchment backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1E0409]/35 mix-blend-multiply pointer-events-none" />
      </div>

      {/* 2. Top Navigation Bar (Offwhite theme, matching website design) */}
      <motion.header
        variants={headerVariants}
        className="absolute top-0 left-0 right-0 h-[11%] px-[3.5%] flex items-center justify-between z-40 select-none"
      >
        {/* Brand Monogram Seal */}
        <a href="#" className="flex-shrink-0 group focus:outline-none h-[75%] aspect-square" aria-label="CG Luxury Sarees Home">
          <div className="w-full h-full rounded-full bg-[#FAF6F0] p-[8%] flex items-center justify-center shadow-md border border-[#FAF6F0]/20 transition-transform duration-300 group-hover:scale-105">
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

        {/* Nav Links - Signature Offwhite (#FAF6F0) */}
        <nav
          aria-label="Heritage Navigation"
          className="hidden md:flex items-center gap-[2.2vw]"
        >
          {["SAREES", "NEW ARRIVALS", "COLLECTIONS", "ABOUT", "JOURNAL", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-[clamp(10px,0.82vw,12px)] font-serif tracking-[0.2em] transition-colors duration-200 ${
                item === "COLLECTIONS" ? "text-[#FAF6F0] font-semibold border-b border-[#FAF6F0]/60 pb-0.5" : "text-[#FAF6F0]/70 hover:text-[#FAF6F0]"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Action Icons - Signature Offwhite (#FAF6F0) */}
        <div className="flex items-center gap-[1.4vw] text-[#FAF6F0]">
          <button type="button" aria-label="Search" className="p-1 hover:opacity-75 focus:outline-none cursor-pointer">
            <svg className="w-[1.3vw] min-w-[16px] h-[1.3vw] min-h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" aria-label="Account" className="p-1 hover:opacity-75 focus:outline-none cursor-pointer">
            <svg className="w-[1.3vw] min-w-[16px] h-[1.3vw] min-h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button type="button" aria-label="Cart" className="relative p-1 hover:opacity-75 focus:outline-none cursor-pointer">
            <svg className="w-[1.3vw] min-w-[16px] h-[1.3vw] min-h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#8B1E3F] text-[#FAF6F0] text-[9px] font-bold rounded-full flex items-center justify-center border border-[#FAF6F0]/40">
              0
            </span>
          </button>
        </div>
      </motion.header>

      {/* 2. Bottom-Right Curved Golden Floral Corner Overlay */}
      <motion.div
        variants={cornerOverlayVariants}
        className="absolute bottom-0 right-0 w-[14vw] max-w-[200px] aspect-square pointer-events-none z-10"
      >
        <Image
          src="/heritage/corner-overlay.png"
          alt="Golden floral corner crest"
          fill
          sizes="15vw"
          className="object-contain object-right-bottom"
        />
      </motion.div>

      {/* 3. Main Content Container (Mirrored: Cards on Left, Editorial on Right) */}
      <div className="relative w-full h-full z-20 flex flex-col justify-between px-[3.5%] pt-[8.5%] pb-[3.5%]">
        <div className="w-full h-full grid grid-cols-12 gap-[2.5vw] items-start">
          
          {/* LEFT 4-COLUMN CARDS SHOWCASE (8.5 / 12 cols) */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col justify-between h-full pt-0">
            
            {/* 4 Cards Row (Cascading upwards on scroll with ease [0.22, 1, 0.36, 1]) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.2vw] items-stretch h-[85%] pt-0">
              {heritageCollection.map((saree, idx) => {
                const isSelected = currentIndex === idx;
                return (
                  <motion.div
                    key={saree.id}
                    custom={idx}
                    variants={cardCascadeVariants}
                    className="relative flex flex-col h-full group cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setActiveCategory(saree.category);
                    }}
                  >
                    {/* Portrait Image Container */}
                    <div className="relative w-full flex-1 rounded-sm overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-[#FAF6F0]/20 transition-all duration-500 group-hover:border-[#FAF6F0]/50 group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.5)]">
                      <Image
                        src={saree.image}
                        alt={`${saree.name} - ${saree.subtitle}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      
                      {/* Hover ambient sheen */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Card Label & Subtitle Below */}
                    <div className="pt-[0.9vw] text-center flex flex-col items-center select-none">
                      <h3 className="font-sans text-[clamp(11px,0.85vw,13px)] font-medium tracking-[0.24em] text-[#FAF6F0] uppercase">
                        {saree.name}
                      </h3>
                      <p className="font-serif italic text-[clamp(10px,0.78vw,12px)] text-[#FAF6F0]/80 mt-0.5 tracking-wide">
                        {saree.subtitle}
                      </p>
                      
                      {/* Subtle underline indicator */}
                      <div
                        className={`h-[1.5px] mt-1.5 transition-all duration-300 ${
                          isSelected
                            ? "w-8 bg-[#FAF6F0]"
                            : "w-4 bg-[#FAF6F0]/30 group-hover:w-6 group-hover:bg-[#FAF6F0]"
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Carousel Navigation Controls (< 01 — 04 >) */}
            <div className="flex items-center justify-start gap-3 pt-3 select-none">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous saree"
                className="w-8 h-8 rounded-full border border-[#FAF6F0]/40 text-[#FAF6F0] flex items-center justify-center hover:bg-[#FAF6F0] hover:text-[#1E0409] transition-all duration-200 focus:outline-none cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Counter Display */}
              <div className="font-serif text-[clamp(11px,0.85vw,13px)] tracking-[0.25em] text-[#FAF6F0] font-medium px-1">
                <span>0{currentIndex + 1}</span>
                <span className="mx-2 opacity-50">—</span>
                <span className="opacity-60 text-[#FAF6F0]/70">04</span>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next saree"
                className="w-8 h-8 rounded-full border border-[#FAF6F0]/40 text-[#FAF6F0] flex items-center justify-center hover:bg-[#FAF6F0] hover:text-[#1E0409] transition-all duration-200 focus:outline-none cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>

          {/* RIGHT EDITORIAL COLUMN (3.5 / 12 cols, Animated slide in from right) */}
          <motion.div
            variants={editorialVariants}
            className="col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col justify-between z-30 pl-2 pt-0"
          >
            {/* Top Text Block with Floating Golden Silk Ribbon */}
            <div className="relative space-y-[1.1vw] pt-0">
              {/* Luminous Golden Ribbon: placed on the LEFT side facing inwards as requested */}
              <div className="absolute -top-2 -left-[4.2vw] w-[5.5vw] max-w-[90px] aspect-[2/3] pointer-events-none z-10 opacity-95 mix-blend-screen">
                <Image
                  src="/heritage/golden-ribbon.png"
                  alt="Golden silk ribbon motif"
                  fill
                  sizes="10vw"
                  className="object-contain object-top"
                />
              </div>

              {/* Eyebrow: aligned with top edge of cards */}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[#FAF6F0] text-xs leading-none">◈</span>
                <span className="font-sans text-[clamp(10px,0.82vw,12px)] tracking-[0.38em] uppercase text-[#FAF6F0]/90 font-medium leading-none">
                  HERITAGE COLLECTION
                </span>
              </div>

              {/* Main Headline */}
              <EditorialTitleReveal>
                <h2 className="font-serif text-[clamp(28px,3.1vw,46px)] font-normal text-[#FAF6F0] leading-[1.08] tracking-[0.02em]">
                  Royal Drapes,
                  <br />
                  <span className="italic font-light text-[#FAF6F0]/90">Eternal Majesty</span>
                </h2>
              </EditorialTitleReveal>

              {/* Decorative Divider */}
              <div className="w-[45%] h-[1px] bg-gradient-to-r from-[#FAF6F0]/60 via-[#FAF6F0]/30 to-transparent flex items-center">
                <div className="w-1.5 h-1.5 rotate-45 bg-[#FAF6F0]" />
              </div>

              {/* Body Text */}
              <p className="font-sans text-[clamp(11px,0.85vw,13px)] text-[#FAF6F0]/80 leading-relaxed max-w-[280px]">
                Timeless heirloom weaves handcrafted
                <br />
                by master artisans across royal corridors
              </p>

              {/* Pill CTA Button */}
              <div className="pt-1">
                <a
                  href="#heritage-collection"
                  className="group inline-flex items-center justify-between gap-4 px-[1.8vw] py-[0.8vw] rounded-full bg-[#FAF6F0] text-[#1E0409] hover:bg-white transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.4)] focus:outline-none"
                >
                  <span className="font-sans text-[clamp(9px,0.72vw,11px)] font-semibold tracking-[0.24em] uppercase">
                    EXPLORE HERITAGE
                  </span>
                  <svg
                    className="w-3 h-3 transform transition-transform duration-200 group-hover:translate-x-1 text-[#1E0409]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              {/* Category Sub-Navigation List (Shifted cleanly below CTA) */}
              <nav
                aria-label="Heritage Categories"
                className="pt-[1.5vw] space-y-[0.55vw] z-30"
              >
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        const targetIndex = heritageCollection.findIndex((s) => s.category === cat);
                        if (targetIndex !== -1) setCurrentIndex(targetIndex);
                      }}
                      className="group block text-left w-full focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`h-[1.5px] transition-all duration-300 ${
                            isActive
                              ? "w-6 bg-[#FAF6F0]"
                              : "w-0 group-hover:w-3.5 bg-[#FAF6F0]/50"
                          }`}
                        />
                        <span
                          className={`font-sans text-[clamp(11px,0.85vw,13px)] tracking-[0.28em] uppercase transition-colors duration-200 ${
                            isActive
                              ? "text-[#FAF6F0] font-bold"
                              : "text-[#FAF6F0]/70 font-medium hover:text-[#FAF6F0]"
                          }`}
                        >
                          {cat}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
