"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Haute-couture cubic-bezier easing for silky luxury motion
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial masked title reveal.
 * Glides smoothly up from subtle 24px offset with opacity fade when scrolled into view.
 * Fully compatible with Framer Motion parent variant propagation (hidden/visible).
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
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.9,
            ease: LUXURY_EASE,
            delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`block w-full ${className}`}
    >
      {children}
    </motion.div>
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
  const yOffset = direction === "up" ? 20 : direction === "down" ? -16 : 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.85,
            ease: LUXURY_EASE,
            delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item wrapper for product cards, gallery items, etc.
 * Features subtle scale-up (0.98 -> 1) and gentle upward float.
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
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.85,
            delay: (index % 4) * 0.1,
            ease: LUXURY_EASE,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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
