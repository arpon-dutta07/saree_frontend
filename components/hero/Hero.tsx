"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  heroContainerVariants,
  heroItemVariants,
  heroNavbarVariants,
  heroLeftFloralVariants,
  heroRightLanternsVariants,
} from "@/lib/heroAnimation";
import { useMouseParallax } from "@/hooks/useMouseParallax";

import HeroBackground from "./HeroBackground";
import HeroNavbar from "./HeroNavbar";
import HeroLeftFloral from "./HeroLeftFloral";
import HeroHeadline from "./HeroHeadline";
import HeroCTA from "./HeroCTA";
import HeroTrustRow from "./HeroTrustRow";
import HeroModels from "./HeroModels";
import HeroRightLanterns from "./HeroRightLanterns";
import HeroBottomFloral from "./HeroBottomFloral";

interface HeroProps {
  startAnimation?: boolean;
}

export default function Hero({ startAnimation = true }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Haute-couture subtle parallax depth layers (10-15% drift)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yModels = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const yHeadline = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  // 2.5D Mouse hover parallax — desktop pointer only
  const { containerRef: parallaxRef, mouseHandlers, useLayerX, useLayerY } = useMouseParallax();

  // Depth layers: background counter-drift, text grounded, models/accents foreground
  const bgParallaxX = useLayerX(-10);
  const bgParallaxY = useLayerY(-10);
  const floralParallaxX = useLayerX(12);
  const floralParallaxY = useLayerY(12);
  const headlineParallaxX = useLayerX(8);
  const headlineParallaxY = useLayerY(8);
  const modelRedParallaxX = useLayerX(22);
  const modelRedParallaxY = useLayerY(18);
  const modelBlackParallaxX = useLayerX(26);
  const modelBlackParallaxY = useLayerY(20);
  const lanternParallaxX = useLayerX(28);
  const lanternParallaxY = useLayerY(24);
  const bottomFloralParallaxX = useLayerX(16);
  const bottomFloralParallaxY = useLayerY(14);

  return (
    <div
      ref={(node) => {
        // Merge both refs
        (heroRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (parallaxRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className="relative w-full h-[100svh] min-h-[660px] md:h-auto md:aspect-[16/9] md:max-h-screen overflow-hidden bg-[#140306] select-none mx-auto"
      {...mouseHandlers}
    >
      {/* 1. Background base image with smooth depth parallax */}
      <motion.div style={{ y: yBg, x: bgParallaxX, translateY: bgParallaxY }} className="absolute inset-0 w-full h-full">
        <HeroBackground />
      </motion.div>

      {/* Mobile Subtle Dark Gradient for Text Legibility */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#140306]/90 via-[#140306]/40 to-[#140306]/85 pointer-events-none z-10" />

      {/* Stagger Container */}
      <motion.section
        className="relative w-full h-full"
        variants={heroContainerVariants}
        initial="hidden"
        animate={startAnimation ? "visible" : "hidden"}
        style={{ opacity: opacityFade }}
      >
        {/* 2. Navbar */}
        <motion.div
          variants={heroNavbarVariants}
          className="absolute top-0 left-0 w-full h-16 md:h-[11%] z-50"
        >
          <HeroNavbar />
        </motion.div>

        {/* 3. Left floral vine — desktop/tablet */}
        <motion.div
          variants={heroLeftFloralVariants}
          style={{ x: floralParallaxX, y: floralParallaxY }}
          className="hidden md:block absolute top-0 left-0 w-[17%] h-full z-20 pointer-events-none"
        >
          <HeroLeftFloral />
        </motion.div>

        {/* 4. Headline block */}
        <motion.div
          variants={heroItemVariants}
          style={{ y: yHeadline, x: headlineParallaxX, translateY: headlineParallaxY }}
          className="absolute top-[16%] sm:top-[18%] md:top-[21%] left-5 sm:left-8 md:left-[13.5%] w-[calc(100%-40px)] sm:w-[85%] md:w-[40%] md:h-[30%] z-30"
        >
          <HeroHeadline />
        </motion.div>

        {/* 5. CTA pill button */}
        <motion.div
          variants={heroItemVariants}
          style={{ y: yHeadline, x: headlineParallaxX, translateY: headlineParallaxY }}
          className="absolute top-[43%] sm:top-[46%] md:top-[53%] left-5 sm:left-8 md:left-[13.5%] w-auto min-w-[240px] max-w-[280px] md:w-[27%] md:h-[7%] z-30"
        >
          <HeroCTA />
        </motion.div>

        {/* 6. Trust row */}
        <motion.div
          variants={heroItemVariants}
          style={{ y: yHeadline, x: headlineParallaxX, translateY: headlineParallaxY }}
          className="absolute bottom-5 sm:bottom-7 md:bottom-auto md:top-[63%] left-4 right-4 md:right-auto md:left-[13.5%] flex justify-center md:justify-start z-30"
        >
          <HeroTrustRow />
        </motion.div>

        {/* 7. Model 1 — red saree (seated) */}
        <motion.div
          variants={heroItemVariants}
          style={{ y: yModels, x: modelRedParallaxX, translateY: modelRedParallaxY }}
          className="absolute bottom-14 sm:bottom-16 md:bottom-0 right-[-12%] sm:right-[-4%] md:left-[36.5%] md:right-auto w-[82%] sm:w-[65%] md:w-[36.5%] h-[54%] sm:h-[62%] md:h-[71%] z-20 pointer-events-none opacity-90 md:opacity-100"
        >
          <HeroModels model="red" />
        </motion.div>

        {/* 8. Model 2 — black saree (standing) — layered ON TOP of red model */}
        <motion.div
          variants={heroItemVariants}
          style={{ y: yModels, x: modelBlackParallaxX, translateY: modelBlackParallaxY }}
          className="hidden sm:block absolute bottom-0 right-[28%] md:left-[58.5%] md:right-auto w-[35%] md:w-[17.5%] h-[72%] md:h-[91%] z-[25] pointer-events-none opacity-60 sm:opacity-80 md:opacity-100"
        >
          <HeroModels model="black" />
        </motion.div>

        {/* 9. Right lantern element */}
        <motion.div
          variants={heroRightLanternsVariants}
          style={{ x: lanternParallaxX, y: lanternParallaxY }}
          className="hidden md:block absolute top-0 left-[71%] w-[29%] h-[96%] z-20 pointer-events-none"
        >
          <HeroRightLanterns />
        </motion.div>

        {/* 10. Bottom-left floral cluster */}
        <motion.div
          variants={heroItemVariants}
          style={{ x: bottomFloralParallaxX, y: bottomFloralParallaxY }}
          className="hidden md:block absolute bottom-0 left-0 w-[35%] h-[38%] z-40 pointer-events-none"
        >
          <HeroBottomFloral />
        </motion.div>
      </motion.section>
    </div>
  );
}
