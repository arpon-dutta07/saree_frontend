import React from "react";

export default function HeroHeadline() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-start text-left select-none">
      {/* Eyebrow */}
      <div className="flex items-center gap-2 pl-0.5">
        <span className="text-[#D4AF37] text-xs leading-none">◈</span>
        <span className="font-sans text-[clamp(9px,0.85vw,12px)] tracking-[0.38em] uppercase text-[#FAF6F0]/90 font-medium leading-none">
          SAREES WOVEN BY
        </span>
      </div>

      {/* Main Haute-Couture Headline: Aarohi */}
      <h1 className="my-auto font-display text-[clamp(44px,6.2vw,92px)] font-normal tracking-[0.06em] leading-[0.88]">
        <span
          className="inline-block"
          style={{
            background:
              "linear-gradient(135deg, #FAF6F0 0%, #F5E8BE 40%, #E8C56B 70%, #D4AF37 88%, #FAF6F0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 2px 16px rgba(212, 175, 55, 0.32))",
          }}
        >
          Aarohi
        </span>
      </h1>

      {/* Delicate Gilded Diamond Divider */}
      <div className="w-[55%] max-w-[240px] h-[1px] bg-gradient-to-r from-[#D4AF37]/60 via-[#F5E8BE] to-transparent my-1 relative flex items-center">
        <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
      </div>

      {/* Editorial Poetic Italic Subheading */}
      <p className="font-serif italic font-light text-[clamp(13px,1.2vw,18px)] tracking-[0.04em] text-[#FAF6F0]/90 leading-snug pl-0.5">
        Timeless drapes for <span className="text-[#F3E5AB] font-normal not-italic tracking-[0.06em] font-display text-[0.88em] uppercase">modern stories</span>
      </p>
    </div>
  );
}
