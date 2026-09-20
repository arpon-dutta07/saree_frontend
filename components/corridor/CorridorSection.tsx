"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";

/* ────────────────────────────────────────────────────────────────────────
   3D Saree Corridor Hero Section — "Stories in Drapes"
   Continuous 3D Image Corridor Animation with Offwhite Parchment Backdrop
   ──────────────────────────────────────────────────────────────────────── */

const LEFT_IMAGES = [
  { src: "/all saree/Candlelit Elegance in an Indigo Saree.png", alt: "Indigo Saree in Candlelight" },
  { src: "/all saree/Candlelit Heritage Saree Portrait.png", alt: "Heritage Saree Portrait" },
  { src: "/all saree/Elegant Pink Saree Courtyard Portrait.png", alt: "Pink Saree Courtyard Portrait" },
  { src: "/all saree/Emerald Saree in a Heritage Courtyard.png", alt: "Emerald Silk Saree" },
  { src: "/all saree/Gilded Saree Glow in a Heritage Palace.png", alt: "Gilded Palace Saree" },
  { src: "/all saree/Golden Courtyard Saree Portrait.png", alt: "Golden Courtyard Drapes" },
  { src: "/all saree/Golden Marigold Courtyard Portrait.png", alt: "Marigold Yellow Saree" },
  { src: "/all saree/Golden Saree in Sunlit Courtyard.png", alt: "Sunlit Golden Saree" },
  { src: "/all saree/Golden Saree in a Sunlit Garden.png", alt: "Garden Saree Portrait" },
];

const RIGHT_IMAGES = [
  { src: "/all saree/Golden-Hour Lavender Courtyard Portrait.png", alt: "Golden Hour Lavender Saree" },
  { src: "/all saree/Lavender Sari in a Golden Courtyard.png", alt: "Lavender Silk Saree" },
  { src: "/all saree/Serene Saree Portrait Among Bougainvillea.png", alt: "Serene Bougainvillea Saree" },
  { src: "/all saree/Sunlit Blue Saree Courtyard Elegance.png", alt: "Azure Blue Saree Elegance" },
  { src: "/all saree/Sunlit Saree and Flowers.png", alt: "Sunlit Saree with Floral Details" },
  { src: "/new-arrivals/card-rani-pink.png", alt: "Rani Pink Pure Silk" },
  { src: "/new-arrivals/card-coral-orange.png", alt: "Coral Orange Traditional Weave" },
  { src: "/new-arrivals/card-lavender.png", alt: "Pastel Lavender Linen Drape" },
  { src: "/new-arrivals/card-yellow.png", alt: "Sunshine Yellow Festive Edit" },
];

// Motion geometry calculations with 28 sampled CSS keyframes
function computeCorridorKeyframes() {
  const SAMPLES = 28;
  const perspective = 30;
  const cardHeight = 25;
  const birthHeight = 2.6;
  const exitHeight = 46;
  const railBirth = 10; // Clear central aisle — cards sweep along the sides with zero collisions
  const railExit = 48; // Sweep outward gracefully
  const fan = 2.8;
  const rotBirth = 4;
  const rotExit = 26;

  let rightRules = "";
  let leftRules = "";

  for (let i = 0; i < SAMPLES; i++) {
    const u = i / (SAMPLES - 1);
    const pct = (u * 100).toFixed(2);
    const scale = (birthHeight / cardHeight) * Math.pow(exitHeight / birthHeight, u);
    const z = (perspective * (1 - 1 / scale)).toFixed(3);
    const rail = (railExit - (railExit - railBirth) * Math.pow(1 - u, fan)).toFixed(3);
    const turn = (rotBirth + (rotExit - rotBirth) * u).toFixed(2);

    // Smooth opacity fade at birth and exit to eliminate popping/glitching
    let opacity = "1";
    if (u < 0.08) {
      opacity = (u / 0.08).toFixed(2);
    } else if (u > 0.90) {
      opacity = ((1 - u) / 0.10).toFixed(2);
    }

    rightRules += `${pct}% { transform: translate3d(${rail}cqw, -50%, ${z}cqw) rotateY(-${turn}deg); opacity: ${opacity}; }\n`;
    leftRules += `${pct}% { transform: translate3d(-${rail}cqw, -50%, ${z}cqw) rotateY(${turn}deg); opacity: ${opacity}; }\n`;
  }

  return { rightRules, leftRules };
}

export default function CorridorSection() {
  const [isPaused, setIsPaused] = useState(false);

  const { rightRules, leftRules } = useMemo(() => computeCorridorKeyframes(), []);

  return (
    <section
      id="corridor"
      aria-label="3D Saree Corridor"
      className="relative w-full h-[100svh] min-h-[720px] overflow-hidden bg-[#FBF7F0] select-none [container-type:inline-size]"
    >
      {/* 28-Sample Precision Keyframe Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes corridor-sweep-right {
              ${rightRules}
            }
            @keyframes corridor-sweep-left {
              ${leftRules}
            }
            .corridor-card-right {
              animation: corridor-sweep-right 18s linear infinite;
              will-change: transform, opacity;
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }
            .corridor-card-left {
              animation: corridor-sweep-left 18s linear infinite;
              will-change: transform, opacity;
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }
            @media (prefers-reduced-motion: reduce) {
              .corridor-card-right, .corridor-card-left {
                animation-play-state: paused !important;
              }
            }
          `,
        }}
      />

      {/* 1. Base Textured Offwhite Parchment Background Plate with Leaf Shadows */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/corridor/bg-parchment.png"
          alt="Warm offwhite textured parchment with soft leaf shadows"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#FBF7F0]/15 mix-blend-multiply pointer-events-none" />
      </div>

      {/* 2. Top-Bar: Compact Brand Mark & Translucent Play/Pause Pill */}
      <header className="absolute top-0 left-0 right-0 h-[10%] px-[3.5%] flex items-center justify-between z-30 pointer-events-auto">
        {/* Brand Mark */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Chandrani Gems Heritage"
        >
          <div className="w-8 h-8 rounded-full bg-[#FAF6F0] p-1 flex items-center justify-center shadow-sm border border-[#1E0409]/15 group-hover:scale-105 transition-transform duration-300">
            <div className="relative w-full h-full">
              <Image
                src="/hero/logo-mark.png"
                alt="Brand Monogram"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <span className="font-serif tracking-[0.25em] text-[clamp(11px,0.85vw,13px)] text-[#1E0409] font-medium uppercase">
            CHANDRANI
          </span>
        </a>

        {/* Play/Pause Control Pill */}
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? "Resume 3D corridor animation" : "Pause 3D corridor animation"}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 hover:bg-white backdrop-blur-md border border-[#1E0409]/15 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-[#1E0409] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/40 cursor-pointer"
        >
          {isPaused ? (
            /* Play Icon */
            <svg
              className="w-3 h-3 fill-current text-[#8B1E3F]"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            /* Pause Icon */
            <svg
              className="w-3 h-3 fill-current text-[#8B1E3F]"
              viewBox="0 0 24 24"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
          <span className="font-sans text-[10.5px] font-bold tracking-[0.22em] uppercase hidden sm:inline text-[#1E0409]">
            {isPaused ? "RESUME" : "PAUSE"}
          </span>
        </button>
      </header>

      {/* 3. 3D Image Corridor Stage (Vanishing Point: 50% H, 55% V, Perspective 30cqw) */}
      <div
        className="absolute inset-0 flex items-center justify-center [perspective:30cqw] [perspective-origin:50%_55%] [transform-style:preserve-3d] pointer-events-none z-10"
        aria-hidden="true"
      >
        {/* Left Rail (9 Cards, Negative Staggered Delays for Full Corridor on Frame 1) */}
        {LEFT_IMAGES.map((img, idx) => (
          <div
            key={`left-${idx}`}
            className="corridor-card-left absolute top-[55%] left-[calc(50%-9cqw)] w-[18cqw] h-[25cqw] rounded-[0.8cqw] overflow-hidden border border-white/90 shadow-[0_14px_40px_rgba(25,4,8,0.24)] bg-[#FAF6F0]"
            style={{
              animationDelay: `-${(18 * idx) / 9}s`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={idx < 4}
              sizes="20cqw"
              className="object-cover object-center"
            />
            {/* Subtle luxury edge sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
          </div>
        ))}

        {/* Right Rail (9 Cards, Unique Images, Zero Collision) */}
        {RIGHT_IMAGES.map((img, idx) => (
          <div
            key={`right-${idx}`}
            className="corridor-card-right absolute top-[55%] left-[calc(50%-9cqw)] w-[18cqw] h-[25cqw] rounded-[0.8cqw] overflow-hidden border border-white/90 shadow-[0_14px_40px_rgba(25,4,8,0.24)] bg-[#FAF6F0]"
            style={{
              animationDelay: `-${(18 * idx) / 9}s`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={idx < 4}
              sizes="20cqw"
              className="object-cover object-center"
            />
            {/* Subtle luxury edge sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* 4. Central Main Editorial Content (In Front of Cards, Centered Horizontally & Vertically) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-6 text-center">
        {/* Luminous Warm Aura behind Headline for 100% Contrast & Legibility */}
        <div
          className="absolute w-[85vw] max-w-[1020px] h-[70vh] max-h-[520px] rounded-full pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.98) 0%, rgba(251, 247, 240, 0.94) 42%, rgba(251, 247, 240, 0.5) 72%, transparent 100%)",
            filter: "blur(25px)",
          }}
        />

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#8B1E3F]" />
          <span className="font-sans text-[clamp(10px,0.85vw,12px)] font-bold tracking-[0.35em] text-[#8B1E3F] uppercase">
            STORIES IN DRAPES
          </span>
          <span className="w-1.5 h-1.5 rotate-45 bg-[#8B1E3F]" />
        </div>

        {/* Main Heading */}
        <h2 className="font-serif text-[clamp(44px,6.8vw,104px)] font-normal text-[#1E0409] tracking-[-0.04em] leading-[0.92] max-w-[960px] drop-shadow-sm select-text">
          Every drape tells
          <br />
          <span className="italic font-light text-[#4A101D]">an eternal story.</span>
        </h2>

        {/* CTA Button */}
        <div className="mt-8 pointer-events-auto">
          <a
            href="#all-sarees"
            className="group inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-[#1E0409] text-[#FAF6F0] hover:bg-[#340912] transition-all duration-300 shadow-[0_10px_30px_rgba(30,4,9,0.28)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/50 ring-1 ring-[#1E0409]/20 cursor-pointer"
          >
            <span className="font-sans text-[clamp(10px,0.82vw,12px)] font-semibold tracking-[0.24em] uppercase">
              EXPLORE ALL SAREES
            </span>
            <svg
              className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-1 text-[#FAF6F0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
