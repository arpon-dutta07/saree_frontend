import React from "react";

export default function HeroTrustRow() {
  const items = [
    {
      title: "FREE SHIPPING",
      icon: (
        <svg className="w-[1vw] min-w-[13px] h-[1vw] min-h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M1 3h15v13H1z" />
          <path d="M16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
    {
      title: "EASY RETURNS",
      icon: (
        <svg className="w-[1vw] min-w-[13px] h-[1vw] min-h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05" />
          <path d="M12 22.08V12" />
        </svg>
      ),
    },
    {
      title: "SECURE PAYMENTS",
      icon: (
        <svg className="w-[1vw] min-w-[13px] h-[1vw] min-h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#140306]/85 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_8px_25px_rgba(0,0,0,0.7)] select-none text-[#FAF6F0]">
      {items.map((item, index) => (
        <React.Fragment key={item.title}>
          <div className="flex items-center gap-2">
            <span className="text-[#F3E5AB] drop-shadow-[0_1px_4px_rgba(212,175,55,0.7)]">
              {item.icon}
            </span>
            <span className="font-sans text-[clamp(9px,0.75vw,11.5px)] tracking-[0.22em] font-semibold uppercase whitespace-nowrap text-[#FAF6F0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {item.title}
            </span>
          </div>
          {index < items.length - 1 && (
            <span className="text-[#D4AF37]/60 text-xs">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
