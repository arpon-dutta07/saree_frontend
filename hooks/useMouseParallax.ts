"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

/**
 * Spring configuration for ultra-silky Framer-style parallax motion.
 */
const SPRING_CONFIG = {
  stiffness: 140,
  damping: 25,
  mass: 0.2,
};

/**
 * Checks if the device supports fine pointer hover (desktop/laptop).
 * Returns false on touch-only devices to keep mobile interactions native.
 */
function useIsPointerDevice(): boolean {
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsPointer(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsPointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isPointer;
}

/**
 * useMouseParallax — Framer-style 2.5D mouse hover parallax.
 *
 * Tracks cursor position relative to a section's bounding rect,
 * normalizes to [-0.5, 0.5], and provides spring-damped MotionValues
 * that smoothly reset to (0, 0) when the cursor leaves the section.
 *
 * @returns {
 *   containerRef — Attach to the section's outermost element.
 *   mouseHandlers — Spread onto the same element: onMouseMove, onMouseLeave.
 *   useLayerX(depth) — Returns a MotionValue<number> for horizontal offset.
 *   useLayerY(depth) — Returns a MotionValue<number> for vertical offset.
 *   isActive — Whether parallax is active (desktop only).
 * }
 */
export function useMouseParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPointer = useIsPointerDevice();

  // Raw normalized cursor position: [-0.5, 0.5]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed cursor position
  const springX = useSpring(rawX, SPRING_CONFIG);
  const springY = useSpring(rawY, SPRING_CONFIG);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isPointer || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Normalize to [-0.5, 0.5] where center is 0
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      rawX.set(nx);
      rawY.set(ny);
    },
    [isPointer, rawX, rawY]
  );

  const onMouseLeave = useCallback(() => {
    // Smoothly glide back to center
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  /**
   * Create a MotionValue for a parallax layer at a given depth (in px).
   * Positive depth = moves WITH cursor. Negative depth = counter-drift.
   */
  function useLayerX(depth: number): MotionValue<number> {
    return useTransform(springX, (v) => v * depth);
  }

  function useLayerY(depth: number): MotionValue<number> {
    return useTransform(springY, (v) => v * depth);
  }

  return {
    containerRef,
    mouseHandlers: { onMouseMove, onMouseLeave },
    useLayerX,
    useLayerY,
    isActive: isPointer,
  };
}
