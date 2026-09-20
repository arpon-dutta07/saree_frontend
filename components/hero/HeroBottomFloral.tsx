import React from "react";
import Image from "next/image";

export default function HeroBottomFloral() {
  return (
    <div className="relative w-full h-full pointer-events-none select-none overflow-hidden">
      <Image
        src="/hero/bottom-floral-left.png"
        alt="Foreground scattered white flowers and rose petals"
        fill
        priority
        sizes="30vw"
        className="object-contain object-left-bottom"
      />
    </div>
  );
}
