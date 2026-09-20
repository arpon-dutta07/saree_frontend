import React from "react";
import Image from "next/image";

export default function HeroBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      style={{ top: "0%", left: "0%", width: "100%", height: "100%", zIndex: 0 }}
    >
      <Image
        src="/hero/background.png"
        alt="Luxury saree textured backdrop"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
