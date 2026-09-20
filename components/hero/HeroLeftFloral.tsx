import React from "react";
import Image from "next/image";

export default function HeroLeftFloral() {
  return (
    <div className="relative w-full h-full pointer-events-none select-none overflow-hidden">
      <Image
        src="/hero/left-floral.png"
        alt="Traditional floral border motif"
        fill
        priority
        sizes="15vw"
        className="object-contain object-left-top"
      />
    </div>
  );
}
