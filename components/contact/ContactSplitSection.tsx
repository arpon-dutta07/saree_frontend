"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ────────────────────────────────────────────────────────────────────────
   Aarohi Haute Couture — Regal Split-Screen Atelier & Concierge Section
   Duo-split editorial layout featuring Private Styling & Flagship Concierge,
   textured offwhite parchment background, scroll-triggered reveal,
   and central booking medallion seal.
   ──────────────────────────────────────────────────────────────────────── */

const LEFT_IMAGE = "/all saree/Candlelit Heritage Saree Portrait.png";
const RIGHT_IMAGE = "/all saree/Golden-Hour Lavender Courtyard Portrait.png";
const FALLBACK_IMAGE = "/all saree/Serene Saree Portrait Among Bougainvillea.png";

export default function ContactSplitSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeLang, setActiveLang] = useState<"EN" | "IN">("EN");

  // Trigger entrance animations when user scrolls into view
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Smooth pointer-based parallax for portrait cards
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
    <main
      id="contact"
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

            /* ── Top Navigation Bar ─────────────────────────────────────── */
            .va-topbar {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              z-index: 30;
              height: clamp(80px, 10vh, 106px);
              display: grid;
              grid-template-columns: 1fr auto 1fr;
              align-items: center;
              pointer-events: none;
              padding: 0 clamp(24px, 3.5vw, 52px);
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
              transform: translateY(-10px);
            }

            .va-active .va-nav-link {
              animation: va-fade-down 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms forwards;
            }

            .va-nav-link:hover {
              color: #8B1E3F;
            }

            .va-nav-right {
              justify-self: end;
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
              transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-nav-link:hover::after {
              transform: scaleX(1);
              transform-origin: left;
            }

            /* ── Brand Monogram Seal & Name ─────────────────────────────── */
            .va-brand {
              justify-self: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              color: #1E0409;
              pointer-events: auto;
              opacity: 0;
              transform: translateY(-14px);
              transition: transform 300ms ease;
            }

            .va-active .va-brand {
              animation: va-brand-in 900ms cubic-bezier(0.16, 1, 0.3, 1) 450ms forwards;
            }

            @keyframes va-brand-in {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes va-fade-down {
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
              box-shadow: 0 4px 16px rgba(30, 4, 9, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 5px;
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
              font-size: clamp(20px, 1.7vw, 26px);
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.08em;
              color: #1E0409;
              margin-top: 5px;
            }

            .va-brand-subtitle {
              font-family: var(--font-inter), 'Inter', sans-serif;
              margin-top: 3px;
              font-size: clamp(6px, 0.46vw, 7.5px);
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.42em;
              text-transform: uppercase;
              color: #8B1E3F;
            }

            /* ── Split-Screen Panels ────────────────────────────────────── */
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
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: clamp(84px, 11vh, 108px) clamp(24px, 3.5vw, 60px) clamp(55px, 8vh, 72px);
              pointer-events: auto;
            }

            /* ── Left Panel (Atelier / Private Styling) ─────────────────── */
            .va-panel-left {
              clip-path: inset(0 100% 0 0);
            }

            .va-active .va-panel-left {
              animation: va-reveal-left 1.3s cubic-bezier(0.77, 0, 0.18, 1) 120ms forwards;
            }

            @keyframes va-reveal-left {
              to {
                clip-path: inset(0 0 0 0);
              }
            }

            /* ── Right Panel (Concierge / Inquiries) ─────────────────────── */
            .va-panel-right {
              clip-path: inset(0 0 0 100%);
            }

            .va-active .va-panel-right {
              animation: va-reveal-right 1.3s cubic-bezier(0.77, 0, 0.18, 1) 120ms forwards;
            }

            @keyframes va-reveal-right {
              to {
                clip-path: inset(0 0 0 0);
              }
            }

            /* ── Panel Editorial Header ─────────────────────────────────── */
            .va-panel-header {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              margin-bottom: clamp(10px, 1.4vh, 16px);
              opacity: 0;
              transform: translateY(18px);
            }

            .va-active .va-panel-header {
              animation: va-fade-up 900ms cubic-bezier(0.16, 1, 0.3, 1) 600ms forwards;
            }

            @keyframes va-fade-up {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .va-panel-tag {
              font-family: var(--font-inter), 'Inter', sans-serif;
              font-size: clamp(8px, 0.65vw, 9.5px);
              font-weight: 600;
              letter-spacing: 0.32em;
              text-transform: uppercase;
              color: #8B1E3F;
              margin-bottom: 3px;
            }

            .va-panel-title {
              margin: 0;
              font-family: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
              font-size: clamp(28px, 2.7vw, 42px);
              font-weight: 500;
              line-height: 1.05;
              letter-spacing: 0.02em;
              color: #1E0409;
            }

            .va-title-italic {
              font-family: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
              font-style: italic;
              font-weight: 400;
              color: #8B1E3F;
            }

            /* ── Framed Portrait Saree Panels ───────────────────────────── */
            .va-portrait-frame {
              position: relative;
              width: clamp(280px, 23vw, 390px);
              aspect-ratio: 1 / 1.25;
              border-radius: clamp(18px, 1.8vw, 28px);
              overflow: hidden;
              background: #F4ECE1;
              border: 1.5px solid rgba(212, 175, 55, 0.4);
              box-shadow:
                0 20px 50px rgba(30, 4, 9, 0.14),
                0 4px 14px rgba(30, 4, 9, 0.06);
              pointer-events: auto;
              will-change: transform;
              cursor: pointer;
              transition: border-color 400ms ease, box-shadow 400ms ease;
            }

            .va-portrait-frame:hover {
              border-color: rgba(212, 175, 55, 0.7);
              box-shadow:
                0 26px 60px rgba(30, 4, 9, 0.18),
                0 6px 18px rgba(30, 4, 9, 0.09);
            }

            .va-portrait-frame::after {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: inherit;
              pointer-events: none;
              background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.15) 0%,
                transparent 45%,
                rgba(30, 4, 9, 0.18) 100%
              );
              transition: opacity 400ms ease;
            }

            .va-portrait-frame:hover::after {
              opacity: 0.7;
            }

            .va-panel-image {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
              object-position: center 25%;
              transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-portrait-frame:hover .va-panel-image {
              transform: scale(1.05);
            }

            .va-panel-left .va-portrait-frame {
              transform: translate3d(calc(var(--mouse-x) * -7px), calc(var(--mouse-y) * -5px), 0);
              opacity: 0;
            }

            .va-active .va-panel-left .va-portrait-frame {
              animation: va-image-left 1.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards;
            }

            @keyframes va-image-left {
              from {
                filter: blur(6px);
                opacity: 0;
                transform: translate3d(calc(var(--mouse-x) * -7px), calc(var(--mouse-y) * -5px), 0) scale(1.06);
              }
              to {
                filter: blur(0);
                opacity: 1;
                transform: translate3d(calc(var(--mouse-x) * -7px), calc(var(--mouse-y) * -5px), 0) scale(1);
              }
            }

            .va-panel-right .va-portrait-frame {
              transform: translate3d(calc(var(--mouse-x) * 7px), calc(var(--mouse-y) * 5px), 0);
              opacity: 0;
            }

            .va-active .va-panel-right .va-portrait-frame {
              animation: va-image-right 1.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards;
            }

            @keyframes va-image-right {
              from {
                filter: blur(6px);
                opacity: 0;
                transform: translate3d(calc(var(--mouse-x) * 7px), calc(var(--mouse-y) * 5px), 0) scale(1.06);
              }
              to {
                filter: blur(0);
                opacity: 1;
                transform: translate3d(calc(var(--mouse-x) * 7px), calc(var(--mouse-y) * 5px), 0) scale(1);
              }
            }

            /* ── Panel Action Link ──────────────────────────────────────── */
            .va-panel-action {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              margin-top: clamp(10px, 1.4vh, 16px);
              font-family: var(--font-inter), 'Inter', sans-serif;
              font-size: clamp(9px, 0.72vw, 11px);
              font-weight: 600;
              letter-spacing: 0.22em;
              text-transform: uppercase;
              color: #1E0409;
              cursor: pointer;
              transition: color 250ms ease;
              opacity: 0;
              transform: translateY(12px);
            }

            .va-active .va-panel-action {
              animation: va-fade-up 850ms cubic-bezier(0.16, 1, 0.3, 1) 850ms forwards;
            }

            .va-panel-action:hover {
              color: #8B1E3F;
            }

            .va-action-arrow {
              font-size: 0.85em;
              color: #8B1E3F;
              transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-panel-action:hover .va-action-arrow {
              transform: translate(3px, -3px);
            }

            /* ── Center Divider Line ────────────────────────────────────── */
            .va-center-line {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 50%;
              z-index: 6;
              width: 1px;
              background: linear-gradient(
                180deg,
                transparent 0%,
                rgba(212, 175, 55, 0.3) 15%,
                rgba(30, 4, 9, 0.12) 50%,
                rgba(212, 175, 55, 0.3) 85%,
                transparent 100%
              );
              transform: scaleY(0);
              transform-origin: top;
            }

            .va-active .va-center-line {
              animation: va-scale-line 1.2s cubic-bezier(0.16, 1, 0.3, 1) 500ms forwards;
            }

            @keyframes va-scale-line {
              to {
                transform: scaleY(1);
              }
            }

            /* ── Center Regal Booking Crest Button ──────────────────────── */
            .va-center-crest {
              position: absolute;
              left: 50%;
              top: 50%;
              z-index: 20;
              transform: translate(-50%, -50%) scale(0.9);
              opacity: 0;
              cursor: pointer;
              pointer-events: auto;
              transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease;
            }

            .va-active .va-center-crest {
              animation: va-crest-in 950ms cubic-bezier(0.16, 1, 0.3, 1) 800ms forwards;
            }

            @keyframes va-crest-in {
              to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
            }

            .va-center-crest:hover {
              transform: translate(-50%, -50%) scale(1.06);
            }

            .va-crest-inner {
              display: inline-flex;
              align-items: center;
              gap: 9px;
              padding: 7px 18px 7px 9px;
              border-radius: 9999px;
              background: #FAF6F0;
              border: 1.5px solid rgba(212, 175, 55, 0.55);
              box-shadow:
                0 14px 36px rgba(30, 4, 9, 0.14),
                0 3px 10px rgba(30, 4, 9, 0.08);
              transition: border-color 300ms ease, box-shadow 300ms ease, background 300ms ease;
            }

            .va-center-crest:hover .va-crest-inner {
              background: #FFFFFF;
              border-color: rgba(212, 175, 55, 0.9);
              box-shadow:
                0 18px 45px rgba(30, 4, 9, 0.2),
                0 4px 14px rgba(30, 4, 9, 0.1);
            }

            .va-crest-seal {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: #FAF6F0;
              border: 1px solid rgba(212, 175, 55, 0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 3px;
            }

            .va-crest-icon {
              width: 100%;
              height: 100%;
              object-fit: contain;
              display: block;
            }

            .va-crest-label {
              font-family: var(--font-inter), 'Inter', sans-serif;
              font-size: clamp(9px, 0.72vw, 11px);
              font-weight: 600;
              letter-spacing: 0.24em;
              text-transform: uppercase;
              color: #1E0409;
              white-space: nowrap;
            }

            .va-crest-arrow {
              font-size: 0.85em;
              color: #8B1E3F;
              transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-center-crest:hover .va-crest-arrow {
              transform: translate(3px, -3px);
            }

            /* ── Bottom Left Link ───────────────────────────────────────── */
            .va-bottom-left {
              position: absolute;
              left: clamp(24px, 3.5vw, 52px);
              bottom: clamp(18px, 2.8vh, 32px);
              z-index: 20;
              color: #1E0409;
              font-family: var(--font-inter), 'Inter', sans-serif;
              font-size: clamp(9px, 0.72vw, 11px);
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.22em;
              text-transform: uppercase;
              opacity: 0;
              transform: translateY(12px);
              transition: color 250ms ease;
            }

            .va-active .va-bottom-left {
              animation: va-bottom-in 800ms cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
            }

            .va-bottom-left:hover {
              color: #8B1E3F;
            }

            /* ── Bottom Right Concierge Controls ────────────────────────── */
            .va-bottom-right {
              position: absolute;
              right: clamp(24px, 3.5vw, 52px);
              bottom: clamp(18px, 2.8vh, 32px);
              z-index: 20;
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
              transform: translateY(12px);
            }

            .va-active .va-bottom-right {
              animation: va-bottom-in 800ms cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
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
              margin: 0 2px;
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
              .va-portrait-frame {
                width: clamp(240px, 34vw, 320px);
              }
              .va-panel-title {
                font-size: clamp(24px, 3.8vw, 32px);
              }
              .va-brand-name {
                font-size: 22px;
              }
            }

            /* ── Mobile Responsive Rules ────────────────────────────────── */
            @media (max-width: 650px) {
              .va-root {
                height: auto;
                min-height: 100svh;
                overflow-y: auto;
                padding-bottom: 70px;
              }

              .va-panels {
                position: relative;
                grid-template-columns: 1fr;
                grid-template-rows: auto auto;
                padding-top: 90px;
              }

              .va-panel {
                padding: 24px 20px;
                clip-path: none !important;
                animation: none !important;
              }

              .va-portrait-frame {
                width: 82%;
                max-width: 320px;
              }

              .va-center-line {
                display: none;
              }

              .va-center-crest {
                position: relative;
                left: 0;
                top: 0;
                transform: none;
                margin: 20px auto;
                display: flex;
                justify-content: center;
              }

              .va-active .va-center-crest {
                animation: none;
                opacity: 1;
                transform: none;
              }

              .va-topbar {
                height: 70px;
                padding: 0 18px;
              }

              .va-bottom-left,
              .va-bottom-right {
                position: relative;
                left: auto;
                right: auto;
                bottom: auto;
                justify-content: center;
                text-align: center;
                padding: 10px 0;
              }
            }
          `,
        }}
      />

      {/* 1. Base Textured Parchment Backdrop */}
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

      {/* 2. Top Navigation Bar */}
      <header className="va-topbar">
        <a href="#atelier" className="va-nav-link">
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

        <a href="#concierge" className="va-nav-link va-nav-right">
          Concierge
        </a>
      </header>

      {/* 3. Center Animated Scale Divider */}
      <div className="va-center-line" aria-hidden="true" />

      {/* 4. Split-Screen Majestic Panels */}
      <div className="va-panels">
        {/* Left Panel: Atelier / Private Styling */}
        <section className="va-panel va-panel-left" id="atelier">
          <div className="va-panel-header">
            <span className="va-panel-tag">ATELIER · PRIVATE SALON</span>
            <h2 className="va-panel-title">
              Private <span className="va-title-italic">Styling</span>
            </h2>
          </div>

          <div className="va-portrait-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LEFT_IMAGE}
              alt="Candlelit heritage black floral silk saree drape"
              className="va-panel-image"
              onError={handleImageError}
              loading="eager"
            />
          </div>

          <a
            href="mailto:concierge@aarohisarees.com?subject=Private%20Styling%20Appointment"
            className="va-panel-action"
          >
            <span>Request Consultation</span>
            <span className="va-action-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </section>

        {/* Right Panel: Concierge / Bespoke Inquiries */}
        <section className="va-panel va-panel-right" id="concierge">
          <div className="va-panel-header">
            <span className="va-panel-tag">FLAGSHIP · GLOBAL SERVICES</span>
            <h2 className="va-panel-title">
              Flagship <span className="va-title-italic">Concierge</span>
            </h2>
          </div>

          <div className="va-portrait-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={RIGHT_IMAGE}
              alt="Golden-hour lavender courtyard floral saree portrait"
              className="va-panel-image"
              onError={handleImageError}
              loading="eager"
            />
          </div>

          <a
            href="mailto:concierge@aarohisarees.com?subject=Atelier%20Concierge%20Inquiry"
            className="va-panel-action"
          >
            <span>Connect With Concierge</span>
            <span className="va-action-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </section>
      </div>

      {/* 5. Center Regal Booking Crest Button */}
      <a
        href="mailto:concierge@aarohisarees.com?subject=Atelier%20Styling%20Appointment"
        className="va-center-crest"
        aria-label="Book a private styling consultation"
      >
        <div className="va-crest-inner">
          <div className="va-crest-seal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/logo-mark.png"
              alt=""
              className="va-crest-icon"
            />
          </div>
          <span className="va-crest-label">BOOK APPOINTMENT</span>
          <span className="va-crest-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </a>

      {/* 6. Bottom Left Flagship Locations */}
      <a href="#flagship" className="va-bottom-left">
        Flagship: Kolkata · New Delhi
      </a>

      {/* 7. Bottom Right Concierge Contact & Language Controls */}
      <div className="va-bottom-right">
        <a href="tel:+919830000000">Call Us</a>
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
    </main>
  );
}
