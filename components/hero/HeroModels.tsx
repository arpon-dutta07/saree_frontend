import React from "react";
import Image from "next/image";

interface HeroModelsProps {
  model: "red" | "black";
}

export default function HeroModels({ model }: HeroModelsProps) {
  if (model === "black") {
    return (
      <div className="relative w-full h-full pointer-events-none select-none">
        <Image
          src="/hero/model-black.png"
          alt="Model standing in luxury black saree with gold zari border"
          fill
          priority
          sizes="20vw"
          className="object-contain object-bottom"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      <Image
        src="/hero/model-red.png"
        alt="Model seated gracefully in opulent red bridal banarasi saree"
        fill
        priority
        sizes="40vw"
        className="object-contain object-bottom"
      />
    </div>
  );
}
