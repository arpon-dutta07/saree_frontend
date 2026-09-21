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
  price: string;
  craft: string;
}

const heritageCollection: SareeItem[] = [
  {
    id: "01",
    name: "EMERALD GREEN",
    subtitle: "Regal Heritage",
    category: "BANARASI SILK",
    image: "/heritage/card-emerald.png",
    price: "₹68,000",
    craft: "Kadhwa Weave · Pure Silver & Gold Zari",
  },
  {
    id: "02",
    name: "ROYAL INDIGO",
    subtitle: "Midnight Opulence",
    category: "KANCHIPURAM",
    image: "/heritage/card-indigo.png",
    price: "₹74,500",
    craft: "Korvai Technique · Heavy Silk Brocade",
  },
  {
    id: "03",
    name: "GILDED GOLD",
    subtitle: "Imperial Zari",
    category: "CHANDERI WEAVES",
    image: "/heritage/card-gilded.png",
    price: "₹62,000",
    craft: "Real Zari Thread · Heritage Motifs",
  },
  {
    id: "04",
    name: "AZURE BLUE",
    subtitle: "Palace Serenade",
    category: "ROYAL ZARI EDIT",
    image: "/heritage/card-azure.png",
    price: "₹59,000",
    craft: "Tissue Brocade · Royal Mughal Buttas",
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
      className="relative w-full h-auto min-h-0 lg:aspect-[16/9] lg:max-h-screen lg:min-h-[700px] overflow-hidden bg-[#1E0409] text-[#FAF6F0] select-none mx-auto border-t border-[#FAF6F0]/15 py-10 lg:py-0"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
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

      {/* 2. Top Navigation Bar (Desktop only) */}
      <motion.header
        variants={headerVariants}
        className="hidden lg:flex absolute top-0 left-0 right-0 h-[11%] px-[3.5%] items-center justify-between z-40 select-none"
      >
        {/* Brand Monogram Seal */}
        <a href="#" className="flex-shrink-0 group focus:outline-none h-[75%] aspect-square" aria-label="Aarohi Luxury Sarees Home">
          <div className="w-full h-full rounded-full bg-[#FAF6F0] p-[8%] flex items-center justify-center shadow-md border border-[#FAF6F0]/20 transition-transform duration-300 group-hover:scale-105">
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
        </a>

        {/* Nav Links - Signature Offwhite (#FAF6F0) */}
        <nav
          aria-label="Heritage Navigation"
          className="flex flex-nowrap items-center gap-[1.6vw] lg:gap-[2.2vw]"
        >
          {["SAREES", "NEW ARRIVALS", "COLLECTIONS", "ABOUT", "JOURNAL", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={`whitespace-nowrap text-[clamp(10px,0.82vw,12px)] font-serif tracking-[0.2em] transition-colors duration-200 leading-none ${
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
        className="hidden md:block absolute bottom-0 right-0 w-[14vw] max-w-[200px] aspect-square pointer-events-none z-10"
      >
        <Image
          src="/heritage/corner-overlay.png"
          alt="Golden floral corner crest"
          fill
          sizes="15vw"
          className="object-contain object-right-bottom"
        />
      </motion.div>

      {/* 3. Main Content Container */}
      <div className="relative w-full h-full z-20 flex flex-col justify-between px-5 sm:px-8 lg:px-[3.5%] pt-2 lg:pt-[8.5%] pb-6 lg:pb-[3.5%]">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[2.5vw] items-start">
          
          {/* EDITORIAL COLUMN (On mobile: order-first so heading is on top; On desktop: order-last on right) */}
          <motion.div
            variants={editorialVariants}
            className="col-span-1 lg:col-span-4 xl:col-span-3 flex flex-col justify-between z-30 order-first lg:order-last pl-0 lg:pl-2 pt-0"
          >
            {/* Top Text Block */}
            <div className="relative space-y-3 lg:space-y-[1.1vw] pt-0">
              {/* Luminous Golden Ribbon */}
              <div className="absolute -top-2 right-0 lg:-left-[4.2vw] lg:right-auto w-14 lg:w-[5.5vw] max-w-[90px] aspect-[2/3] pointer-events-none z-10 opacity-95 mix-blend-screen">
                <Image
                  src="/heritage/golden-ribbon.png"
                  alt="Golden silk ribbon motif"
                  fill
                  sizes="10vw"
                  className="object-contain object-top"
                />
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[#FAF6F0] text-xs leading-none">◈</span>
                <span className="font-sans text-[clamp(10px,0.82vw,12px)] tracking-[0.38em] uppercase text-[#FAF6F0]/90 font-medium leading-none">
                  HERITAGE COLLECTION
                </span>
              </div>

              {/* Main Headline */}
              <EditorialTitleReveal>
                <h2 className="text-[clamp(28px,3.1vw,46px)] leading-[1.08] tracking-[0.02em]">
                  <span className="font-display font-medium text-[#FAF6F0] block">Royal Drapes,</span>
                  <span className="font-serif italic font-light text-[#F3E5AB] block">Eternal Majesty</span>
                </h2>
              </EditorialTitleReveal>

              {/* Decorative Divider */}
              <div className="w-[45%] h-[1px] bg-gradient-to-r from-[#FAF6F0]/60 via-[#FAF6F0]/30 to-transparent flex items-center">
                <div className="w-1.5 h-1.5 rotate-45 bg-[#FAF6F0]" />
              </div>

              {/* Body Text */}
              <p className="font-sans text-[clamp(12px,0.85vw,13.5px)] text-[#FAF6F0]/80 leading-relaxed max-w-[320px]">
                Timeless heirloom weaves handcrafted by master artisans across historic Indian corridors.
              </p>

              {/* Pill CTA Button */}
              <div className="pt-1">
                <a
                  href="#heritage-collection"
                  className="group inline-flex items-center justify-between gap-4 px-6 py-2.5 lg:px-[1.8vw] lg:py-[0.8vw] rounded-full bg-[#FAF6F0] text-[#1E0409] hover:bg-white transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.4)] focus:outline-none cursor-pointer"
                >
                  <span className="font-sans text-[clamp(9.5px,0.72vw,11px)] font-semibold tracking-[0.24em] uppercase">
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

              {/* Category Sub-Navigation List */}
              <nav
                aria-label="Heritage Categories"
                className="pt-2 lg:pt-[1.5vw] flex lg:flex-col flex-wrap gap-2 lg:gap-0 lg:space-y-[0.55vw] z-30"
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
                      className="group block text-left focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 lg:px-0 lg:py-0 rounded-full lg:rounded-none bg-[#140306]/80 lg:bg-transparent border border-[#FAF6F0]/20 lg:border-none shadow-xs lg:shadow-none">
                        <span
                          className={`hidden lg:block h-[1.5px] transition-all duration-300 ${
                            isActive
                              ? "w-6 bg-[#FAF6F0]"
                              : "w-0 group-hover:w-3.5 bg-[#FAF6F0]/50"
                          }`}
                        />
                        <span
                          className={`font-sans text-[11px] lg:text-[clamp(11px,0.85vw,13px)] tracking-[0.22em] lg:tracking-[0.28em] uppercase transition-colors duration-200 ${
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

          {/* 4-COLUMN CARDS SHOWCASE (On mobile: order-last below heading; On desktop: order-first on left) */}
          <div className="col-span-1 lg:col-span-8 xl:col-span-9 flex flex-col justify-between h-full w-full order-last lg:order-first pt-0">
            
            {/* 4 Cards Row: Mobile horizontal snap carousel, desktop 4-col grid with staggered scroll reveal */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.16,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex lg:grid overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none gap-4 lg:gap-[1.2vw] items-stretch h-[390px] sm:h-[430px] lg:h-[85%] pb-4 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0 grid-cols-2 md:grid-cols-4 pt-0"
            >
              {heritageCollection.map((saree, idx) => {
                const isSelected = currentIndex === idx;
                return (
                  <motion.div
                    key={saree.id}
                    variants={{
                      hidden: { opacity: 0, y: 48, scale: 0.94 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.85,
                          ease: luxuryEase,
                        },
                      },
                    }}
                    className="shrink-0 w-[220px] sm:w-[260px] lg:w-auto snap-center relative flex flex-col h-full group cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setActiveCategory(saree.category);
                    }}
                  >
                    {/* Portrait Image Container with Luxury Blur on Hover */}
                    <div className="relative w-full flex-1 rounded-sm overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-[#FAF6F0]/20 transition-all duration-500 group-hover:border-[#FAF6F0]/50 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] bg-[#140306]">
                      <Image
                        src={saree.image}
                        alt={`${saree.name} - ${saree.subtitle}`}
                        fill
                        sizes="(max-width: 768px) 70vw, 20vw"
                        className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-108 group-hover:blur-[5px]"
                      />
                      
                      {/* Dark Luxury Vignette Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140306]/95 via-[#1E0409]/75 to-[#140306]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none" />

                      {/* Revealed Price & Craft Information Overlay on Hover */}
                      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400 ease-out pointer-events-none select-none">
                        <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-1">
                          ◈ {saree.category}
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl font-medium text-[#FAF6F0] tracking-[0.04em] leading-tight mb-1">
                          {saree.name}
                        </h4>
                        <p className="font-sans text-[10px] sm:text-[11px] text-[#FAF6F0]/80 tracking-wide mb-2 line-clamp-2">
                          {saree.craft}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-serif text-base sm:text-lg font-semibold text-[#F5E8BE]">
                            {saree.price}
                          </span>
                          <span className="font-sans text-[9px] text-[#FAF6F0]/60 tracking-wider uppercase">
                            Incl. taxes
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF6F0]/15 hover:bg-[#FAF6F0]/25 backdrop-blur-md border border-[#D4AF37]/50 text-[#FAF6F0] text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.18em] uppercase transition-colors shadow-sm">
                          Explore Drape →
                        </span>
                      </div>
                    </div>

                    {/* Card Label & Subtitle Below */}
                    <div className="pt-2 lg:pt-[0.9vw] text-center flex flex-col items-center select-none">
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
            </motion.div>

            {/* Bottom Carousel Navigation Controls (< 01 — 04 >) */}
            <div className="flex items-center justify-between lg:justify-start gap-3 pt-3 select-none">
              <span className="lg:hidden font-sans text-[10px] tracking-[0.2em] text-[#FAF6F0]/70 uppercase">
                Swipe to view ➔
              </span>

              <div className="flex items-center gap-3">
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

          </div>

        </div>
      </div>
    </motion.section>
  );
}
