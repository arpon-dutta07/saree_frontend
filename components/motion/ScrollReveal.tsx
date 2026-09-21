"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Haute-couture cubic-bezier easing for silky luxury motion
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial masked title reveal.
 * Glides up from an overflow mask when scrolled into view.
 */
export function EditorialTitleReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`overflow-hidden inline-block ${className}`}>
      <motion.div
        initial={{ y: "115%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{
          duration: 0.9,
          ease: LUXURY_EASE,
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Editorial block reveal for kicker badges, descriptions, and buttons.
 */
export function EditorialBlockReveal({
  children,
  className = "",
  delay = 0.1,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "fade";
}) {
  const initial =
    direction === "up"
      ? { y: 28, opacity: 0 }
      : direction === "down"
      ? { y: -20, opacity: 0 }
      : { y: 0, opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.85,
        ease: LUXURY_EASE,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item wrapper for product cards, gallery items, etc.
 * Features subtle scale-up (0.96 -> 1) and gentle upward float.
 */
export function StaggerCard({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{
        duration: 0.85,
        delay: (index % 4) * 0.12,
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Subtle 10-15% Parallax container for background or foreground images.
 */
export function ParallaxLayer({
  children,
  speed = 0.12,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number; // e.g. 0.12 = 12% drift
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}px`, `${speed * 100}px`]
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
