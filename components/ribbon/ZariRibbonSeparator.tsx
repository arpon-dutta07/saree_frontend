"use client";

import React from "react";

interface ZariRibbonSeparatorProps {
  /** Direction of the ribbon flow. Defaults to "left-to-right" as requested by user. */
  direction?: "left-to-right" | "right-to-left";
  /** Duration of one full loop in seconds. Defaults to 42s for a stately, regal glide. */
  duration?: number;
  /** Height of the ribbon separator. Defaults to a prominent, broad luxury scale. */
  heightClass?: string;
  /** Optional custom class names. */
  className?: string;
}

export default function ZariRibbonSeparator({
  direction = "left-to-right",
  duration = 40,
  heightClass = "h-[72px] sm:h-[84px] md:h-[96px] lg:h-[104px]",
  className = "",
}: ZariRibbonSeparatorProps) {
  // Tile aspect ratio: 1376px / 448px = 3.0714
  // At height 104px, one tile is ~320px wide.
  // 16 tiles per segment = ~5120px width per segment, easily covering 4K screens (3840px) with zero gaps.
  const tileCount = 16;
  const tiles = Array.from({ length: tileCount });

  const animClass = direction === "left-to-right" ? "animate-zari-flow-ltr" : "animate-zari-flow-rtl";

  return (
    <div
      role="separator"
      aria-label="Royal Banarasi Saree Zari Ribbon Border"
      className={`relative w-full overflow-hidden bg-[#2D060C] select-none border-y-2 border-[#D4AF37]/70 shadow-[0_6px_25px_rgba(20,3,6,0.6)] z-20 ${heightClass} ${className}`}
    >
      {/* 1. Ornate metallic gold hairline trims */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 via-[#F5E8BE] to-[#D4AF37]/50 pointer-events-none z-10 shadow-[0_1px_6px_rgba(212,175,55,0.5)]" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 via-[#F5E8BE] to-[#D4AF37]/50 pointer-events-none z-10 shadow-[0_1px_6px_rgba(212,175,55,0.5)]" />

      {/* 2. Velvet woven silk ambient sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30 pointer-events-none z-10" />

      {/* 3. GPU-accelerated Infinite Moving Ribbon Track */}
      <div
        className={`flex items-center h-full will-change-transform ${animClass}`}
        style={{
          width: "max-content",
          animationDuration: `${duration}s`,
        }}
      >
        {/* Strip Segment 1 */}
        <div className="flex items-center h-full flex-shrink-0">
          {tiles.map((_, i) => (
            <img
              key={`zari-tile-a-${i}`}
              src="/ribbon/zari-ribbon-strip.png"
              alt=""
              className="h-full w-auto max-w-none flex-shrink-0 select-none pointer-events-none block"
              style={{
                height: "100%",
                width: "auto",
                aspectRatio: "1376 / 448",
              }}
              loading="eager"
            />
          ))}
        </div>

        {/* Strip Segment 2 (Duplicate for seamless continuous looping) */}
        <div className="flex items-center h-full flex-shrink-0" aria-hidden="true">
          {tiles.map((_, i) => (
            <img
              key={`zari-tile-b-${i}`}
              src="/ribbon/zari-ribbon-strip.png"
              alt=""
              className="h-full w-auto max-w-none flex-shrink-0 select-none pointer-events-none block"
              style={{
                height: "100%",
                width: "auto",
                aspectRatio: "1376 / 448",
              }}
              loading="eager"
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes zariFlowLtr {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }

        @keyframes zariFlowRtl {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .animate-zari-flow-ltr {
          animation: zariFlowLtr linear infinite;
        }

        .animate-zari-flow-rtl {
          animation: zariFlowRtl linear infinite;
        }
      `}</style>
    </div>
  );
}
