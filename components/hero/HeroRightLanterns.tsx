import React from "react";
import Image from "next/image";

export default function HeroRightLanterns() {
  return (
    <div className="relative w-full h-full pointer-events-none select-none overflow-hidden">
      <Image
        src="/hero/right-lanterns.png"
        alt="Traditional hanging brass lamps and floral garland"
        fill
        priority
        sizes="100vw"
        className="object-contain object-right-top"
      />
    </div>
  );
}
