import React from "react";

export default function HeroCTA() {
  return (
    <div className="w-full h-full flex items-center">
      <a
        href="#collection"
        className="group h-full max-h-[52px] w-full rounded-full bg-[#FAF6F0] text-[#140306] hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-[#ff1838] flex items-center justify-between px-[7%]"
        aria-label="Explore the collection"
      >
        <span className="font-sans text-[clamp(9px,0.85vw,12px)] tracking-[0.24em] font-semibold uppercase whitespace-nowrap">
          EXPLORE THE COLLECTION
        </span>
        <svg
          className="w-[1vw] min-w-[12px] h-[1vw] min-h-[12px] text-[#140306] transform transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
