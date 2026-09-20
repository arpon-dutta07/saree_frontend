"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoLoaderProps {
  onComplete: () => void;
}

export default function VideoLoader({ onComplete }: VideoLoaderProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleFinish = () => {
    setIsVisible(false);
    // Notify parent to start hero animations
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback for strict browser autoplay policies
      });
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="video-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#140306] flex items-center justify-center overflow-hidden select-none"
        >
          {/* Main Video Player */}
          <video
            ref={videoRef}
            src="/0920.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleFinish}
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover"
          />

          {/* Luxury Ambient Overlay Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/40" />

          {/* Top Bar Controls */}
          <div className="absolute top-6 right-6 flex items-center z-10">
            {/* Skip Intro Button */}
            <button
              type="button"
              onClick={handleFinish}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF6F0] text-[#140306] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] focus:outline-none cursor-pointer"
              aria-label="Skip video intro"
            >
              <span>SKIP INTRO</span>
              <svg className="w-3 h-3 transform transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Hairline Gold Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
