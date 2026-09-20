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
    <div className="w-full h-full flex items-center justify-between text-[#FAF6F0]/80 select-none">
      {items.map((item, index) => (
        <React.Fragment key={item.title}>
          <div className="flex items-center gap-[0.4vw]">
            <span className="text-[#D4AF37]/90">{item.icon}</span>
            <span className="font-sans text-[clamp(8px,0.75vw,11px)] tracking-[0.18em] font-medium uppercase whitespace-nowrap">
              {item.title}
            </span>
          </div>
          {index < items.length - 1 && (
            <span className="text-[#FAF6F0]/25 text-[0.8vw]">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
