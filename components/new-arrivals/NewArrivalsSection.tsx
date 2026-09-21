"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { EditorialTitleReveal, EditorialBlockReveal } from "@/components/motion/ScrollReveal";
import { useMouseParallax } from "@/hooks/useMouseParallax";

interface SareeItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
  colorTag: string;
  price: string;
  craft: string;
}

const sareeCollection: SareeItem[] = [
  {
    id: "01",
    name: "RANI PINK",
    subtitle: "Bold Traditions",
    category: "SILK SAREES",
    image: "/new-arrivals/card-rani-pink.png",
    colorTag: "#D91656",
    price: "₹46,500",
    craft: "Pure Mulberry Silk · 24k Gold Zari",
  },
  {
    id: "02",
    name: "CORAL ORANGE",
    subtitle: "Vibrant Stories",
    category: "COTTON SAREES",
    image: "/new-arrivals/card-coral-orange.png",
    colorTag: "#FA8072",
    price: "₹34,000",
    craft: "Fine Chanderi Cotton · Temple Border",
  },
  {
    id: "03",
    name: "LAVENDER",
    subtitle: "Graceful Appeal",
    category: "LINEN SAREES",
    image: "/new-arrivals/card-lavender.png",
    colorTag: "#BDB2FF",
    price: "₹38,500",
    craft: "Artisanal French Linen · Floral Resham",
  },
  {
    id: "04",
    name: "SUNSHINE YELLOW",
    subtitle: "Radiant You",
    category: "FESTIVE EDIT",
    image: "/new-arrivals/card-yellow.png",
    colorTag: "#FFD166",
    price: "₹52,000",
    craft: "Tissue Organza Silk · Hand Embroidered",
  },
];

const categories = [
  "SILK SAREES",
  "COTTON SAREES",
  "LINEN SAREES",
  "FESTIVE EDIT",
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
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.95,
      ease: luxuryEase,
    },
  },
};

const framerSpringEase = [0.16, 1, 0.3, 1] as const;

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

// Differential depth offsets for each card (px)
const CARD_DEPTHS = [16, 24, 18, 26];

export default function NewArrivalsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("SILK SAREES");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isCardsInView = useInView(cardsRef, { once: true, amount: 0.15 });

  // 2.5D Mouse hover parallax — desktop pointer only
  const { containerRef: parallaxRef, mouseHandlers, useLayerX, useLayerY } = useMouseParallax();

  // Background counter-drift
  const bgPx = useLayerX(-8);
  const bgPy = useLayerY(-8);
  // Corner botanical accent
  const cornerPx = useLayerX(16);
  const cornerPy = useLayerY(16);
  // Editorial text grounded float
  const editPx = useLayerX(8);
  const editPy = useLayerY(8);
  // Individual card depths
  const card0x = useLayerX(CARD_DEPTHS[0]);
  const card0y = useLayerY(CARD_DEPTHS[0]);
  const card1x = useLayerX(CARD_DEPTHS[1]);
  const card1y = useLayerY(CARD_DEPTHS[1]);
  const card2x = useLayerX(CARD_DEPTHS[2]);
  const card2y = useLayerY(CARD_DEPTHS[2]);
  const card3x = useLayerX(CARD_DEPTHS[3]);
  const card3y = useLayerY(CARD_DEPTHS[3]);
  const cardParallax = [
    { x: card0x, y: card0y },
    { x: card1x, y: card1y },
    { x: card2x, y: card2y },
    { x: card3x, y: card3y },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? sareeCollection.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === sareeCollection.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.section
      id="new-arrivals"
      ref={(node) => {
        (parallaxRef as React.MutableRefObject<HTMLDivElement | null>).current = node as HTMLDivElement | null;
      }}
      className="relative w-full h-auto min-h-0 lg:aspect-[16/9] lg:max-h-screen lg:min-h-[700px] overflow-hidden bg-[#FBF7F0] text-[#341118] select-none mx-auto py-10 lg:py-0"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...mouseHandlers}
    >
      {/* 1. Base Textured Paper Background Plate — counter-drift parallax */}
      <motion.div style={{ x: bgPx, y: bgPy }} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/new-arrivals/bg-cream.png"
          alt="Warm cream textured parchment backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#FBF7F0]/30 mix-blend-multiply pointer-events-none" />
      </motion.div>

      {/* 2. Top Navigation Bar (Desktop only) */}
      <motion.header
        variants={headerVariants}
        className="hidden lg:flex absolute top-0 left-0 right-0 h-[11%] px-[3.5%] items-center justify-between z-40 select-none"
      >
        {/* Brand Monogram Seal */}
        <a href="#" className="flex-shrink-0 group focus:outline-none h-[75%] aspect-square" aria-label="Aarohi Luxury Sarees Home">
          <div className="w-full h-full rounded-full bg-[#FAF6F0] p-[8%] flex items-center justify-center shadow-md border border-[#D4AF37]/30 transition-transform duration-300 group-hover:scale-105">
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

        {/* Nav Links */}
        <nav
          aria-label="New Arrivals Navigation"
          className="flex flex-nowrap items-center gap-[1.6vw] lg:gap-[2.2vw]"
        >
          {["SAREES", "NEW ARRIVALS", "COLLECTIONS", "ABOUT", "JOURNAL", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={`whitespace-nowrap text-[clamp(10px,0.82vw,12px)] font-serif tracking-[0.2em] transition-colors duration-200 leading-none ${
                item === "NEW ARRIVALS" ? "text-[#3A121A] font-semibold" : "text-[#5A3A40] hover:text-[#3A121A]"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-[1.4vw] text-[#3A121A]">
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
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#8B1E3F] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </motion.header>

      {/* 3. Bottom-Left Curved Burgundy Botanical Corner Overlay — accent parallax */}
      <motion.div
        variants={cornerOverlayVariants}
        style={{ x: cornerPx, y: cornerPy }}
        className="hidden md:block absolute bottom-0 left-0 w-[13vw] max-w-[190px] aspect-square pointer-events-none z-10"
      >
        <Image
          src="/new-arrivals/corner-overlay.png"
          alt="Burgundy botanical corner crest"
          fill
          sizes="15vw"
          className="object-contain object-left-bottom"
        />
      </motion.div>

      {/* 4. Main Content Container */}
      <div className="relative w-full h-full z-20 flex flex-col justify-between px-5 sm:px-8 lg:px-[3.5%] pt-2 lg:pt-[8.5%] pb-6 lg:pb-[3.5%]">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[2.5vw] items-start">
          
          {/* LEFT EDITORIAL COLUMN */}
          <motion.div
            variants={editorialVariants}
            style={{ x: editPx, y: editPy }}
            className="col-span-1 lg:col-span-4 xl:col-span-3 flex flex-col justify-between z-30 pr-0 lg:pr-2 pt-0"
          >
            {/* Top Text Block */}
            <div className="relative space-y-3 lg:space-y-[1.1vw] pt-0">
              {/* Watercolor Ribbon */}
              <div className="absolute -top-1.5 right-0 lg:-right-[1.5vw] w-14 lg:w-[5.5vw] max-w-[90px] aspect-[2/3] pointer-events-none z-10 opacity-95 mix-blend-multiply">
                <Image
                  src="/new-arrivals/watercolor-ribbon.png"
                  alt="Watercolor floral ribbon motif"
                  fill
                  sizes="10vw"
                  className="object-contain object-top"
                />
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[#A47148] text-xs leading-none">◈</span>
                <span className="font-sans text-[clamp(10px,0.82vw,12px)] tracking-[0.38em] uppercase text-[#8D6E63] font-medium leading-none">
                  NEW ARRIVALS
                </span>
              </div>

              {/* Main Headline */}
              <EditorialTitleReveal>
                <h2 className="text-[clamp(28px,3.1vw,46px)] leading-[1.08] tracking-[0.02em]">
                  <span className="font-display font-medium text-[#2A0C14] block">Fresh Weaves,</span>
                  <span className="font-serif italic font-light text-[#8B1E3F] block">Timeless Grace</span>
                </h2>
              </EditorialTitleReveal>

              {/* Decorative Divider */}
              <div className="w-[45%] h-[1px] bg-gradient-to-r from-[#A47148]/60 via-[#A47148]/30 to-transparent flex items-center">
                <div className="w-1.5 h-1.5 rotate-45 bg-[#A47148]/80" />
              </div>

              {/* Body Text */}
              <p className="font-sans text-[clamp(12px,0.85vw,13.5px)] text-[#5A3A40]/90 leading-relaxed max-w-[320px]">
                Contemporary designs with a touch of sacred Indian tradition &amp; regal drape craftsmanship.
              </p>

              {/* Pill CTA Button */}
              <div className="pt-1">
                <a
                  href="#collection"
                  className="group inline-flex items-center justify-between gap-4 px-6 py-2.5 lg:px-[1.8vw] lg:py-[0.8vw] rounded-full bg-[#4A101D] text-[#FAF6F0] hover:bg-[#340912] transition-all duration-300 shadow-[0_6px_20px_rgba(74,16,29,0.25)] hover:shadow-[0_8px_25px_rgba(74,16,29,0.35)] focus:outline-none cursor-pointer"
                >
                  <span className="font-sans text-[clamp(9.5px,0.72vw,11px)] font-semibold tracking-[0.24em] uppercase">
                    DISCOVER OUR ARRIVALS
                  </span>
                  <svg
                    className="w-3 h-3 transform transition-transform duration-200 group-hover:translate-x-1 text-[#FAF6F0]"
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
                aria-label="New Arrivals Categories"
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
                        const targetIndex = sareeCollection.findIndex((s) => s.category === cat);
                        if (targetIndex !== -1) setCurrentIndex(targetIndex);
                      }}
                      className="group block text-left focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 lg:px-0 lg:py-0 rounded-full lg:rounded-none bg-[#FAF6F0] lg:bg-transparent border border-[#A47148]/20 lg:border-none shadow-xs lg:shadow-none">
                        <span
                          className={`hidden lg:block h-[1.5px] transition-all duration-300 ${
                            isActive
                              ? "w-6 bg-[#A47148]"
                              : "w-0 group-hover:w-3.5 bg-[#A47148]/60"
                          }`}
                        />
                        <span
                          className={`font-sans text-[11px] lg:text-[clamp(11px,0.85vw,13px)] tracking-[0.22em] lg:tracking-[0.28em] uppercase transition-colors duration-200 ${
                            isActive
                              ? "text-[#2A0C14] font-bold"
                              : "text-[#7A5860] font-medium hover:text-[#2A0C14]"
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

          {/* RIGHT 4-COLUMN CARDS SHOWCASE */}
          <div className="col-span-1 lg:col-span-8 xl:col-span-9 flex flex-col justify-between h-full w-full">
            
            {/* 4 Cards Row: Mobile horizontal snap carousel, desktop 4-col grid */}
            <div
              ref={cardsRef}
              className="flex lg:grid overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none gap-4 lg:gap-[1.2vw] items-stretch h-[390px] sm:h-[430px] lg:h-[85%] pb-4 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0 grid-cols-2 md:grid-cols-4"
            >
              {sareeCollection.map((saree, idx) => {
                const isSelected = currentIndex === idx;
                return (
                  <motion.div
                    key={saree.id}
                    style={{ x: cardParallax[idx]?.x, y: cardParallax[idx]?.y }}
                    className="shrink-0 w-[220px] sm:w-[260px] lg:w-auto snap-center relative flex flex-col h-full group cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setActiveCategory(saree.category);
                    }}
                  >
                    {/* Portrait Image Container: Shrunk to a bottom line at Start, growing upward to full height at End */}
                    <motion.div
                      initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0.25 }}
                      animate={
                        isCardsInView
                          ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                          : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.25 }
                      }
                      transition={{
                        duration: 1.05,
                        delay: idx * 0.18,
                        ease: framerSpringEase,
                      }}
                      className="relative w-full flex-1 rounded-sm overflow-hidden shadow-[0_6px_25px_rgba(42,12,20,0.08)] group-hover:shadow-[0_16px_40px_rgba(42,12,20,0.22)] transition-[box-shadow] duration-500 bg-[#2A0C14]"
                    >
                      <Image
                        src={saree.image}
                        alt={`${saree.name} - ${saree.subtitle}`}
                        fill
                        sizes="(max-width: 768px) 70vw, 20vw"
                        className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-108 group-hover:blur-[5px]"
                      />
                      
                      {/* Dark Vignette Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A0C14]/95 via-[#2A0C14]/70 to-[#2A0C14]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none" />

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
                          View Drape →
                        </span>
                      </div>
                    </motion.div>

                    {/* Card Label & Subtitle Below: Smooth single delayed fade-in */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={
                        isCardsInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 12 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + idx * 0.18,
                        ease: luxuryEase,
                      }}
                      className="pt-2 lg:pt-[0.9vw] text-center flex flex-col items-center select-none"
                    >
                      <h3 className="font-sans text-[clamp(11px,0.85vw,13px)] font-medium tracking-[0.24em] text-[#2A0C14] uppercase">
                        {saree.name}
                      </h3>
                      <p className="font-serif italic text-[clamp(10px,0.78vw,12px)] text-[#7A5860] mt-0.5 tracking-wide">
                        {saree.subtitle}
                      </p>
                      
                      {/* Subtle underline indicator */}
                      <div
                        className={`h-[1.5px] mt-1.5 transition-all duration-300 ${
                          isSelected
                            ? "w-8 bg-[#A47148]"
                            : "w-4 bg-[#A47148]/30 group-hover:w-6 group-hover:bg-[#A47148]"
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Carousel Navigation Controls (< 01 — 04 >) */}
            <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 select-none">
              <span className="lg:hidden font-sans text-[10px] tracking-[0.2em] text-[#8D6E63] uppercase">
                Swipe to view ➔
              </span>

              <div className="flex items-center gap-3">
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous saree"
                  className="w-8 h-8 rounded-full border border-[#4A101D]/25 text-[#4A101D] flex items-center justify-center hover:bg-[#4A101D] hover:text-[#FAF6F0] transition-all duration-200 focus:outline-none cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Counter Display */}
                <div className="font-serif text-[clamp(11px,0.85vw,13px)] tracking-[0.25em] text-[#4A101D] font-medium px-1">
                  <span>0{currentIndex + 1}</span>
                  <span className="mx-2 opacity-50">—</span>
                  <span className="opacity-60">04</span>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next saree"
                  className="w-8 h-8 rounded-full border border-[#4A101D]/25 text-[#4A101D] flex items-center justify-center hover:bg-[#4A101D] hover:text-[#FAF6F0] transition-all duration-200 focus:outline-none cursor-pointer"
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
