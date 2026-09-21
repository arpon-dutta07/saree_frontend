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

  return (
    <div
      ref={heroRef}
      className="relative w-full aspect-[16/9] max-h-screen overflow-hidden bg-[#140306] select-none mx-auto"
    >
      {/* 1. Background base image with smooth depth parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-full">
        <HeroBackground />
      </motion.div>

      {/* Stagger Container */}
      <motion.section
        className="relative w-full h-full"
        variants={heroContainerVariants}
        initial="hidden"
        animate={startAnimation ? "visible" : "hidden"}
        style={{ opacity: opacityFade }}
      >
        {/* 2. Navbar — top: 0%, left: 0%, width: 100%, height: 11%, z-index 50 */}
        <motion.div
          variants={heroNavbarVariants}
          style={{ position: "absolute", top: "0%", left: "0%", width: "100%", height: "11%", zIndex: 50 }}
        >
          <HeroNavbar />
        </motion.div>

        {/* 3. Left floral vine — top: 0%, left: 0%, width: 17%, height: 100%, z-index 20 (much larger) */}
        <motion.div
          variants={heroLeftFloralVariants}
          style={{ position: "absolute", top: "0%", left: "0%", width: "17%", height: "100%", zIndex: 20 }}
        >
          <HeroLeftFloral />
        </motion.div>

        {/* 4. Headline block — top: 21%, left: 13.5%, width: 40%, height: 30%, z-index 30 */}
        <motion.div
          variants={heroItemVariants}
          style={{ position: "absolute", top: "21%", left: "13.5%", width: "40%", height: "30%", zIndex: 30, y: yHeadline }}
        >
          <HeroHeadline />
        </motion.div>

        {/* 5. CTA pill button — top: 53%, left: 13.5%, width: 27%, height: 7%, z-index 30 */}
        <motion.div
          variants={heroItemVariants}
          style={{ position: "absolute", top: "53%", left: "13.5%", width: "27%", height: "7%", zIndex: 30, y: yHeadline }}
        >
          <HeroCTA />
        </motion.div>

        {/* 6. Trust row — top: 63%, left: 13.5%, width: 40%, height: 4%, z-index 30 */}
        <motion.div
          variants={heroItemVariants}
          style={{ position: "absolute", top: "63%", left: "13.5%", width: "40%", height: "4%", zIndex: 30, y: yHeadline }}
        >
          <HeroTrustRow />
        </motion.div>

        {/* 7. Model 1 — red saree (seated) — bottom: 0%, left: 36.5%, width: 36.5%, height: 71%, z-index 24 */}
        <motion.div
          variants={heroItemVariants}
          style={{ position: "absolute", bottom: "0%", left: "36.5%", width: "36.5%", height: "71%", zIndex: 24, y: yModels }}
        >
          <HeroModels model="red" />
        </motion.div>

        {/* 8. Model 2 — black saree (standing) — bottom: 0%, left: 58.5%, width: 17.5%, height: 91%, z-index 26 (on top of Model 1) */}
        <motion.div
          variants={heroItemVariants}
          style={{ position: "absolute", bottom: "0%", left: "58.5%", width: "17.5%", height: "91%", zIndex: 26, y: yModels }}
        >
          <HeroModels model="black" />
        </motion.div>

        {/* 9. Right lantern element — top: 0%, left: 71%, width: 29%, height: 96%, z-index 20 (much larger presence) */}
        <motion.div
          variants={heroRightLanternsVariants}
          style={{ position: "absolute", top: "0%", left: "71%", width: "29%", height: "96%", zIndex: 20 }}
        >
          <HeroRightLanterns />
        </motion.div>

        {/* 10. Bottom-left floral cluster — bottom: 0%, left: 0%, width: 35%, height: 38%, z-index 40 (much larger) */}
        <motion.div
          variants={heroItemVariants}
          style={{ position: "absolute", bottom: "0%", left: "0%", width: "35%", height: "38%", zIndex: 40 }}
        >
          <HeroBottomFloral />
        </motion.div>
      </motion.section>
    </div>
  );
}
