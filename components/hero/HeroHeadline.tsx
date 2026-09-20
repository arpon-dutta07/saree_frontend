import React from "react";

export default function HeroHeadline() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-start text-left select-none">
      {/* Eyebrow */}
      <span className="font-sans text-[clamp(9px,0.95vw,13px)] tracking-[0.38em] uppercase text-[#FAF6F0]/85 font-medium leading-none pl-0.5">
        SAREES WOVEN WITH
      </span>

      {/* Main Headline */}
      <h1 className="font-serif text-[clamp(32px,5.2vw,78px)] font-normal text-[#FAF6F0] tracking-[0.06em] leading-[0.92] my-auto flex items-baseline">
        <span>CULTU</span>
        <span className="relative inline-block">
          R
          {/* Subtle flourish ligature */}
          <span className="absolute -bottom-2 sm:-bottom-3 right-0 w-[1.5px] h-3.5 sm:h-4 bg-[#FAF6F0] rotate-[22deg] origin-top rounded-full pointer-events-none opacity-90" />
        </span>
        <span>E</span>
      </h1>

      {/* Ornamental Divider with Diamond */}
      <div className="w-[65%] max-w-[280px] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent my-1 relative flex items-center justify-center">
        <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/80 shadow-[0_0_6px_#D4AF37]" />
      </div>

      {/* Subheading */}
      <p className="font-sans text-[clamp(8px,0.85vw,12px)] tracking-[0.28em] uppercase text-[#FAF6F0]/80 font-medium leading-none pl-0.5">
        TIMELESS DRAPES FOR MODERN STORIES
      </p>
    </div>
  );
}
