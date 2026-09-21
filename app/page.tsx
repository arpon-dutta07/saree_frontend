"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import VideoLoader from "@/components/loader/VideoLoader";
import NewArrivalsSection from "@/components/new-arrivals/NewArrivalsSection";
import HeritageSection from "@/components/heritage/HeritageSection";
import CorridorSection from "@/components/corridor/CorridorSection";
import ContactSplitSection from "@/components/contact/ContactSplitSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import ZariRibbonSeparator from "@/components/ribbon/ZariRibbonSeparator";

const SilkWeave = dynamic(() => import("@/components/silk/SilkWeave"), {
  ssr: false,
});

export default function Home() {
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false);

  return (
    <main className="min-h-screen bg-[#140306] overflow-x-hidden">
      <VideoLoader onComplete={() => setHasCompletedIntro(true)} />
      <Hero startAnimation={hasCompletedIntro} />
      <ZariRibbonSeparator />
      <NewArrivalsSection />
      <ZariRibbonSeparator />
      <HeritageSection />
      <ZariRibbonSeparator />
      <CorridorSection />
      <ZariRibbonSeparator />
      <SilkWeave />
      <ZariRibbonSeparator />
      <ContactSplitSection />
      <ZariRibbonSeparator />
      <ContactSection />
      <ZariRibbonSeparator />
      <Footer />
    </main>
  );
}


