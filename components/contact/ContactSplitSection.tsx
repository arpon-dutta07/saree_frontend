"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ────────────────────────────────────────────────────────────────────────
   Aarohi Haute Couture — Split-Screen Atelier & Private Styling Section
   Interactive 3-drape split experience with pointer parallax,
   scroll-triggered reveal, and floating concierge booking card.
   ──────────────────────────────────────────────────────────────────────── */

const LEFT_IMAGE = "/all saree/Candlelit Heritage Saree Portrait.png";
const RIGHT_IMAGE = "/all saree/Golden-Hour Lavender Courtyard Portrait.png";
const CARD_IMAGE = "/all saree/Emerald Saree in a Heritage Courtyard.png";
const FALLBACK_IMAGE = "/all saree/Serene Saree Portrait Among Bougainvillea.png";

export default function ContactSplitSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeLang, setActiveLang] = useState<"EN" | "IN">("EN");

  // Trigger animations when user scrolls into view
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const root = rootRef.current;
    if (!root) return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const bounds = root.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

      root.style.setProperty("--mouse-x", x.toFixed(3));
      root.style.setProperty("--mouse-y", y.toFixed(3));
    });
  };

  const resetPointer = () => {
    const root = rootRef.current;
    if (!root) return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      root.style.setProperty("--mouse-x", "0");
      root.style.setProperty("--mouse-y", "0");
    });
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.currentTarget;
    if (!target.src.includes(encodeURIComponent(FALLBACK_IMAGE)) && !target.src.includes("Bougainvillea")) {
      target.src = FALLBACK_IMAGE;
    }
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="atelier"
      ref={rootRef}
      className={`va-root ${isInView ? "va-active" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .va-root {
              --mouse-x: 0;
              --mouse-y: 0;
              position: relative;
              width: 100%;
              height: 100svh;
              min-height: 640px;
              overflow: hidden;
              background: #FBF7F0;
              color: #1E0409;
              font-family: var(--font-inter), 'Inter', sans-serif;
              isolation: isolate;
              user-select: none;
            }

            .va-root * {
              box-sizing: border-box;
            }

            .va-root a {
              text-decoration: none;
              color: inherit;
            }

            .va-root button {
              font-family: inherit;
              color: inherit;
            }

            /* ── Base Textured Offwhite Backdrop ────────────────────────── */
            .va-bg-parchment {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              z-index: 0;
            }

            /* ── Split-Screen Structure ─────────────────────────────────── */
            .va-panels {
              position: absolute;
              inset: 0;
              display: grid;
              grid-template-columns: 50% 50%;
              z-index: 2;
              pointer-events: none;
            }

            .va-panel {
              position: relative;
              min-width: 0;
              height: 100%;
              display: flex;
              align-items: center;
              padding: clamp(92px, 13.5vh, 120px) clamp(24px, 3.5vw, 55px) clamp(75px, 11vh, 95px);
            }

            /* ── Left Panel Reveal ──────────────────────────────────────── */
            .va-panel-left {
              justify-content: flex-end;
              padding-right: clamp(45px, 6vw, 92px);
              clip-path: inset(0 100% 0 0);
            }

            .va-active .va-panel-left {
              animation: va-reveal-left 1.3s cubic-bezier(0.77, 0, 0.18, 1) 80ms forwards;
            }

            @keyframes va-reveal-left {
              to {
                clip-path: inset(0 0 0 0);
              }
            }

            /* ── Right Panel Reveal ─────────────────────────────────────── */
            .va-panel-right {
              justify-content: flex-start;
              padding-left: clamp(45px, 6vw, 92px);
              clip-path: inset(0 0 0 100%);
            }

            .va-active .va-panel-right {
              animation: va-reveal-right 1.3s cubic-bezier(0.77, 0, 0.18, 1) 80ms forwards;
            }

            @keyframes va-reveal-right {
              to {
                clip-path: inset(0 0 0 0);
              }
            }

            /* ── Framed Portrait Saree Panels ───────────────────────────── */
            .va-portrait-frame {
              position: relative;
              width: 76%;
              max-width: 440px;
              height: 100%;
              max-height: 520px;
              border-radius: clamp(20px, 2vw, 32px);
              overflow: hidden;
              background: #F4ECE1;
              border: 1.5px solid rgba(212, 175, 55, 0.4);
              box-shadow:
                0 22px 60px rgba(30, 4, 9, 0.16),
                0 6px 18px rgba(30, 4, 9, 0.08);
              pointer-events: auto;
              will-change: transform;
            }

            .va-portrait-frame::after {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: inherit;
              pointer-events: none;
              background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.12) 0%,
                transparent 40%,
                rgba(30, 4, 9, 0.15) 100%
              );
            }

            .va-panel-image {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
              object-position: center 25%;
              will-change: transform;
            }

            .va-panel-left .va-portrait-frame {
              transform: translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px), 0);
              opacity: 0;
            }

            .va-active .va-panel-left .va-portrait-frame {
              animation: va-image-left 1.8s cubic-bezier(0.16, 1, 0.3, 1) 120ms forwards;
            }

            @keyframes va-image-left {
              from {
                filter: blur(8px);
                opacity: 0;
                transform: translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px), 0) scale(1.08);
              }
              to {
                filter: blur(0);
                opacity: 1;
                transform: translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px), 0) scale(1);
              }
            }

            .va-panel-right .va-portrait-frame {
              transform: translate3d(calc(var(--mouse-x) * 9px), calc(var(--mouse-y) * 7px), 0);
              opacity: 0;
            }

            .va-active .va-panel-right .va-portrait-frame {
              animation: va-image-right 1.8s cubic-bezier(0.16, 1, 0.3, 1) 120ms forwards;
            }

            @keyframes va-image-right {
              from {
                filter: blur(8px);
                opacity: 0;
                transform: translate3d(calc(var(--mouse-x) * 9px), calc(var(--mouse-y) * 7px), 0) scale(1.08);
              }
              to {
                filter: blur(0);
                opacity: 1;
                transform: translate3d(calc(var(--mouse-x) * 9px), calc(var(--mouse-y) * 7px), 0) scale(1);
              }
            }

            /* ── Center Divider Line ────────────────────────────────────── */
            .va-center-line {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 50%;
              z-index: 7;
              width: 1px;
              background: rgba(30, 4, 9, 0.15);
              transform: scaleY(0);
              transform-origin: top;
            }

            .va-active .va-center-line {
              animation: va-scale-line 1.2s cubic-bezier(0.16, 1, 0.3, 1) 700ms forwards;
            }

            @keyframes va-scale-line {
              to {
                transform: scaleY(1);
              }
            }

            /* ── Top Navigation Bar ─────────────────────────────────────── */
            .va-topbar {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              z-index: 20;
              height: clamp(82px, 10vh, 105px);
              display: grid;
              grid-template-columns: 1fr auto 1fr;
              align-items: start;
              pointer-events: none;
              padding: clamp(20px, 2.8vh, 32px) clamp(22px, 2.5vw, 42px) 0;
            }

            .va-nav-link {
              width: fit-content;
              position: relative;
              color: #1E0409;
              font-family: var(--font-inter), 'Inter', sans-serif;
              font-size: clamp(10px, 0.82vw, 13px);
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              pointer-events: auto;
              transition: color 280ms ease;
              opacity: 0;
              transform: translateY(-16px);
            }

            .va-active .va-nav-link {
              animation: va-nav-in 850ms cubic-bezier(0.16, 1, 0.3, 1) 400ms forwards;
            }

            .va-nav-link:hover {
              color: #8B1E3F;
            }

            .va-nav-right {
              justify-self: end;
            }

            @keyframes va-nav-in {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .va-nav-link::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: -6px;
              width: 100%;
              height: 1.5px;
              background: #8B1E3F;
              transform: scaleX(0);
              transform-origin: right;
              transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-nav-link:hover::after {
              transform: scaleX(1);
              transform-origin: left;
            }

            /* ── Brand Monogram Seal & Title ────────────────────────────── */
            .va-brand {
              position: relative;
              top: -8px;
              justify-self: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              color: #1E0409;
              pointer-events: auto;
              opacity: 0;
              transform: translateY(-16px);
            }

            .va-active .va-brand {
              animation: va-brand-in 900ms cubic-bezier(0.16, 1, 0.3, 1) 550ms forwards;
            }

            @keyframes va-brand-in {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .va-seal-wrap {
              width: clamp(34px, 2.7vw, 42px);
              height: clamp(34px, 2.7vw, 42px);
              border-radius: 50%;
              background: #FAF6F0;
              border: 1px solid rgba(212, 175, 55, 0.45);
              box-shadow: 0 4px 14px rgba(30, 4, 9, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 4px;
              transition: transform 300ms ease, box-shadow 300ms ease;
            }

            .va-brand:hover .va-seal-wrap {
              transform: scale(1.08);
              box-shadow: 0 6px 20px rgba(30, 4, 9, 0.16);
            }

            .va-seal-img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              display: block;
            }

            .va-brand-name {
              font-family: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
              font-size: clamp(20px, 1.8vw, 26px);
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.08em;
              color: #1E0409;
              margin-top: 4px;
            }

            .va-brand-subtitle {
              font-family: var(--font-inter), 'Inter', sans-serif;
              margin-top: 3px;
              font-size: clamp(6px, 0.46vw, 7.5px);
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.4em;
              text-transform: uppercase;
              color: #8B1E3F;
            }

            /* ── Large Panel Titles (Luxury Royal Cormorant Garamond Serif) ─── */
            .va-title {
              position: absolute;
              z-index: 18;
              margin: 0;
              color: #1E0409;
              font-family: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
              font-size: clamp(28px, 2.7vw, 42px);
              font-weight: 500;
              line-height: 1.1;
              letter-spacing: 0.03em;
              white-space: nowrap;
              opacity: 0;
              pointer-events: none;
              text-align: center;
              left: 50%;
              text-shadow: 0 2px 20px rgba(255, 255, 255, 0.95);
            }

            .va-title-italic {
              font-family: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
              font-style: italic;
              font-weight: 400;
              color: #8B1E3F;
            }

            .va-title-left {
              top: clamp(88px, 12.8vh, 108px);
              transform: translate(-50%, 16px);
            }

            .va-title-right {
              bottom: clamp(26px, 4.4vh, 42px);
              transform: translate(-50%, 16px);
            }

            .va-active .va-title-left {
              animation: va-title-top-in 1s cubic-bezier(0.16, 1, 0.3, 1) 750ms forwards;
            }

            .va-active .va-title-right {
              animation: va-title-bottom-in 1s cubic-bezier(0.16, 1, 0.3, 1) 900ms forwards;
            }

            @keyframes va-title-top-in {
              to {
                opacity: 1;
                transform: translate(-50%, 0);
              }
            }

            @keyframes va-title-bottom-in {
              to {
                opacity: 1;
                transform: translate(-50%, 0);
              }
            }

            /* ── Center Floating Card Area ──────────────────────────────── */
            .va-card-area {
              position: absolute;
              left: 50%;
              top: 48.5%;
              z-index: 15;
              width: clamp(155px, 13vw, 205px);
              transform: translate(-50%, -50%);
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
            }

            .va-card-wrap {
              position: relative;
              width: 100%;
              aspect-ratio: 1 / 1.08;
              overflow: hidden;
              border-radius: clamp(20px, 1.8vw, 30px);
              background: #F4ECE1;
              border: 1.5px solid rgba(212, 175, 55, 0.45);
              box-shadow:
                0 24px 60px rgba(30, 4, 9, 0.2),
                0 6px 18px rgba(30, 4, 9, 0.1);
              opacity: 0;
              transform: translateY(45px) scale(0.9);
            }

            .va-active .va-card-wrap {
              animation: va-card-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) 950ms forwards;
            }

            @keyframes va-card-in {
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            .va-card-wrap::after {
              content: "";
              position: absolute;
              inset: 0;
              z-index: 2;
              border-radius: inherit;
              pointer-events: none;
              background: linear-gradient(
                130deg,
                rgba(255, 255, 255, 0.2),
                transparent 38%,
                rgba(30, 4, 9, 0.12)
              );
            }

            .va-card-image {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
              object-position: center 25%;
              transform: scale(1.02);
              transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-card-area:hover .va-card-image {
              transform: scale(1.095);
            }

            .va-explore {
              width: fit-content;
              margin: 12px auto 0;
              display: flex;
              align-items: center;
              gap: 6px;
              color: #1E0409;
              font-size: clamp(10px, 0.9vw, 13px);
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.22em;
              text-transform: uppercase;
              opacity: 0;
              transform: translateY(14px);
            }

            .va-active .va-explore {
              animation: va-explore-in 850ms cubic-bezier(0.16, 1, 0.3, 1) 1.25s forwards;
            }

            @keyframes va-explore-in {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .va-explore-arrow {
              font-size: 0.76em;
              display: inline-block;
              color: #8B1E3F;
              transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-card-area:hover .va-explore-arrow {
              transform: translate(3px, -3px);
            }

            /* ── Right-Side Circular Control ────────────────────────────── */
            .va-side-control {
              position: absolute;
              right: clamp(18px, 2vw, 35px);
              top: 22%;
              z-index: 16;
              width: 32px;
              height: 32px;
              padding: 0;
              display: grid;
              place-items: center;
              border: 1px solid rgba(30, 4, 9, 0.35);
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.85);
              color: #1E0409;
              cursor: pointer;
              opacity: 0;
              transform: scale(0.7);
              transition: transform 300ms ease, background 300ms ease;
            }

            .va-active .va-side-control {
              animation: va-side-in 800ms cubic-bezier(0.16, 1, 0.3, 1) 1.35s forwards;
            }

            @keyframes va-side-in {
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            .va-side-control:hover {
              transform: scale(1.12);
              background: #ffffff;
            }

            .va-side-control::after {
              content: "";
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #8B1E3F;
            }

            /* ── Bottom Left Link ───────────────────────────────────────── */
            .va-bottom-left {
              position: absolute;
              left: clamp(22px, 2.5vw, 42px);
              bottom: clamp(18px, 2.6vh, 32px);
              z-index: 16;
              color: #1E0409;
              font-family: var(--font-inter), 'Inter', sans-serif;
              font-size: clamp(9px, 0.72vw, 11px);
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.22em;
              text-transform: uppercase;
              opacity: 0;
              transform: translateY(13px);
              transition: color 200ms ease;
            }

            .va-active .va-bottom-left {
              animation: va-bottom-in 800ms cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
            }

            .va-bottom-left:hover {
              color: #8B1E3F;
            }

            /* ── Bottom Right Controls ──────────────────────────────────── */
            .va-bottom-right {
              position: absolute;
              right: clamp(22px, 2.5vw, 42px);
              bottom: clamp(18px, 2.6vh, 32px);
              z-index: 16;
              display: flex;
              align-items: center;
              gap: 10px;
              color: #1E0409;
              font-family: var(--font-inter), 'Inter', sans-serif;
              font-size: clamp(9px, 0.72vw, 11px);
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              opacity: 0;
              transform: translateY(13px);
            }

            .va-active .va-bottom-right {
              animation: va-bottom-in 800ms cubic-bezier(0.16, 1, 0.3, 1) 1.22s forwards;
            }

            @keyframes va-bottom-in {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .va-bottom-divider {
              width: 1px;
              height: 13px;
              margin: 0 3px;
              background: rgba(30, 4, 9, 0.25);
            }

            .va-lang {
              cursor: pointer;
              transition: color 200ms ease;
              color: rgba(30, 4, 9, 0.5);
              background: none;
              border: none;
              padding: 0;
              font-size: inherit;
              font-weight: inherit;
              letter-spacing: inherit;
            }

            .va-lang:hover,
            .va-lang-active {
              color: #8B1E3F;
              font-weight: 700;
            }

            /* ── Tablet Responsive Rules ────────────────────────────────── */
            @media (max-width: 900px) {
              .va-title {
                font-size: clamp(24px, 4vw, 34px);
              }
              .va-card-area {
                width: clamp(140px, 18vw, 180px);
              }
              .va-brand-name {
                font-size: 22px;
              }
            }

            /* ── Mobile Responsive Rules ────────────────────────────────── */
            @media (max-width: 650px) {
              .va-root {
                min-height: 600px;
              }

              .va-panels {
                grid-template-columns: 1fr;
                grid-template-rows: 50% 50%;
              }

              .va-panel-left,
              .va-panel-right {
                clip-path: none !important;
                animation: none !important;
                padding: 24px 16px;
              }

              .va-portrait-frame {
                width: 86%;
                height: 80%;
              }

              .va-center-line {
                top: 50%;
                left: 0;
                right: 0;
                bottom: auto;
                width: 100%;
                height: 1px;
                transform: scaleX(0);
                transform-origin: left;
              }

              .va-active .va-center-line {
                animation: va-scale-line-mobile 1.2s cubic-bezier(0.16, 1, 0.3, 1) 700ms forwards;
              }

              @keyframes va-scale-line-mobile {
                to {
                  transform: scaleX(1);
                }
              }

              .va-topbar {
                height: 70px;
                padding: 18px 14px 0;
              }

              .va-brand {
                top: -6px;
              }

              .va-seal-wrap {
                width: 28px;
                height: 28px;
                padding: 3px;
              }

              .va-brand-name {
                font-size: 18px;
              }

              .va-brand-subtitle {
                margin-top: 3px;
                font-size: 5.5px;
              }

              .va-nav-link {
                font-size: 8px;
              }

              .va-title {
                font-size: clamp(20px, 5.5vw, 26px);
              }

              .va-title-left {
                top: 72px;
              }

              .va-title-right {
                bottom: 18px;
              }

              .va-card-area {
                top: 50%;
                width: clamp(110px, 30vw, 140px);
              }
            }
          `,
        }}
      />

      {/* 1. Base Textured Offwhite Backdrop */}
      <div className="va-bg-parchment" aria-hidden="true">
        <Image
          src="/corridor/bg-parchment.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 2. Left & Right Framed Portrait Saree Panels */}
      <div className="va-panels">
        {/* Left Panel: Candlelit Heritage Saree */}
        <section className="va-panel va-panel-left" aria-label="Atelier Heritage Collection">
          <div className="va-portrait-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LEFT_IMAGE}
              alt="Portrait of model in black floral zardozi silk saree"
              className="va-panel-image"
              onError={handleImageError}
              loading="eager"
            />
          </div>
        </section>

        {/* Right Panel: Golden-Hour Lavender Courtyard */}
        <section className="va-panel va-panel-right" aria-label="Atelier Lavender Collection">
          <div className="va-portrait-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={RIGHT_IMAGE}
              alt="Portrait of model in lavender floral courtyard saree"
              className="va-panel-image"
              onError={handleImageError}
              loading="eager"
            />
          </div>
        </section>
      </div>

      {/* 3. Center Animated Scale Divider */}
      <div className="va-center-line" aria-hidden="true" />

      {/* 4. Top Navigation Bar */}
      <header className="va-topbar">
        <a href="#hero" className="va-nav-link">
          Atelier
        </a>

        <a href="#" className="va-brand" aria-label="Aarohi Haute Couture">
          <div className="va-seal-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/logo-mark.png"
              alt="Aarohi Monogram Seal"
              className="va-seal-img"
            />
          </div>
          <span className="va-brand-name">Aarohi</span>
          <span className="va-brand-subtitle">HAUTE COUTURE</span>
        </a>

        <a href="#contact" className="va-nav-link va-nav-right">
          Concierge
        </a>
      </header>

      {/* 5. Large Panel Editorial Title */}
      <h2 className="va-title va-title-left">
        Private <span className="va-title-italic">Styling</span>
      </h2>

      {/* 6. Center Floating Concierge Card with Green Drape */}
      <a
        href="mailto:concierge@aarohisarees.com?subject=Atelier%20Styling%20Appointment"
        className="va-card-area"
        aria-label="Book a private styling consultation"
      >
        <div className="va-card-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CARD_IMAGE}
            alt="Aarohi emerald heritage model drape"
            className="va-card-image"
            onError={handleImageError}
            loading="eager"
          />
        </div>

        <div className="va-explore">
          Book Appointment
          <span className="va-explore-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </a>

      {/* 7. Right-Side Circular Control Button */}
      <button
        className="va-side-control"
        type="button"
        aria-label="View flagship ateliers"
        onClick={() => {
          window.location.href = "#contact";
        }}
      />

      {/* 8. Bottom Left Flagship Locations */}
      <a href="#contact" className="va-bottom-left">
        Flagship: Kolkata · New Delhi
      </a>

      {/* 9. Bottom Right Concierge Contact & Language Controls */}
      <div className="va-bottom-right">
        <a href="tel:+919876543210">Call Us</a>
        <span className="va-bottom-divider" aria-hidden="true" />
        <button
          type="button"
          className={`va-lang ${activeLang === "IN" ? "va-lang-active" : ""}`}
          onClick={() => setActiveLang("IN")}
        >
          IN
        </button>
        <button
          type="button"
          className={`va-lang ${activeLang === "EN" ? "va-lang-active" : ""}`}
          onClick={() => setActiveLang("EN")}
        >
          EN
        </button>
      </div>
    </section>
  );
}
