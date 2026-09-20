"use client";

import React, { useState } from "react";
import Hero from "@/components/hero/Hero";
import VideoLoader from "@/components/loader/VideoLoader";
import NewArrivalsSection from "@/components/new-arrivals/NewArrivalsSection";
import HeritageSection from "@/components/heritage/HeritageSection";

export default function Home() {
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false);

  return (
    <main className="min-h-screen bg-[#140306] overflow-x-hidden">
      <VideoLoader onComplete={() => setHasCompletedIntro(true)} />
      <Hero startAnimation={hasCompletedIntro} />
      <NewArrivalsSection />
      <HeritageSection />
    </main>
  );
}


