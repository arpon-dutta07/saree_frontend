"use client";

import React, { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────────────
   Luxury Saree Atelier — Split-Screen Contact Section
   Recreating the cinematic split-panel reveal & pointer parallax effect
   ──────────────────────────────────────────────────────────────────────── */

const LEFT_IMAGE = "/all saree/Candlelit Heritage Saree Portrait.png";
const RIGHT_IMAGE = "/all saree/Golden-Hour Lavender Courtyard Portrait.png";
const CARD_IMAGE = "/all saree/Emerald Saree in a Heritage Courtyard.png";
const FALLBACK_IMAGE = "/all saree/Serene Saree Portrait Among Bougainvillea.png";

export default function ContactSplitSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [activeLang, setActiveLang] = useState<"EN" | "IN">("EN");

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
      className="va-root"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap");

            .va-root {
              --mouse-x: 0;
              --mouse-y: 0;
              position: relative;
              width: 100%;
              height: 100svh;
              min-height: 620px;
              overflow: hidden;
              background: #140306;
              color: #fffaf3;
              font-family: 'Manrope', Arial, sans-serif;
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

            /* ── Split-Screen Structure ─────────────────────────────────── */
            .va-panels {
              position: absolute;
              inset: 0;
              display: grid;
              grid-template-columns: 50% 50%;
            }

            .va-panel {
              position: relative;
              min-width: 0;
              height: 100%;
              overflow: hidden;
              background: #1e050b;
            }

            /* ── Left Panel Reveal ──────────────────────────────────────── */
            .va-panel-left {
              clip-path: inset(0 100% 0 0);
              animation: va-reveal-left 1.3s cubic-bezier(0.77, 0, 0.18, 1) 80ms forwards;
            }

            @keyframes va-reveal-left {
              to {
                clip-path: inset(0 0 0 0);
              }
            }

            /* ── Right Panel Reveal ─────────────────────────────────────── */
            .va-panel-right {
              clip-path: inset(0 0 0 100%);
              animation: va-reveal-right 1.3s cubic-bezier(0.77, 0, 0.18, 1) 80ms forwards;
            }

            @keyframes va-reveal-right {
              to {
                clip-path: inset(0 0 0 0);
              }
            }

            /* ── Panel Images with Pointer Parallax ────────────────────── */
            .va-panel-image {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
              will-change: transform;
            }

            .va-panel-left .va-panel-image {
              object-position: 54% 50%;
              transform: translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px), 0) scale(1.065);
              animation: va-image-left 1.8s cubic-bezier(0.16, 1, 0.3, 1) 120ms both;
            }

            @keyframes va-image-left {
              from {
                filter: blur(8px);
                transform: translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px), 0) scale(1.16);
              }
              to {
                filter: blur(0);
                transform: translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px), 0) scale(1.065);
              }
            }

            .va-panel-right .va-panel-image {
              object-position: 44% 50%;
              transform: translate3d(calc(var(--mouse-x) * 9px), calc(var(--mouse-y) * 7px), 0) scale(1.06);
              animation: va-image-right 1.8s cubic-bezier(0.16, 1, 0.3, 1) 120ms both;
            }

            @keyframes va-image-right {
              from {
                filter: blur(8px);
                transform: translate3d(calc(var(--mouse-x) * 9px), calc(var(--mouse-y) * 7px), 0) scale(1.15);
              }
              to {
                filter: blur(0);
                transform: translate3d(calc(var(--mouse-x) * 9px), calc(var(--mouse-y) * 7px), 0) scale(1.06);
              }
            }

            /* ── Left Image Overlays ────────────────────────────────────── */
            .va-panel-left::after {
              content: "";
              position: absolute;
              inset: 0;
              z-index: 2;
              pointer-events: none;
              background:
                linear-gradient(
                  90deg,
                  rgba(20, 3, 6, 0.44) 0%,
                  rgba(20, 3, 6, 0.08) 46%,
                  rgba(20, 3, 6, 0.35) 100%
                ),
                linear-gradient(
                  180deg,
                  rgba(15, 2, 5, 0.38) 0%,
                  transparent 26%,
                  transparent 65%,
                  rgba(15, 2, 5, 0.42) 100%
                );
            }

            /* ── Right Image Overlays ───────────────────────────────────── */
            .va-panel-right::after {
              content: "";
              position: absolute;
              inset: 0;
              z-index: 2;
              pointer-events: none;
              background:
                linear-gradient(
                  90deg,
                  rgba(26, 4, 8, 0.28) 0%,
                  transparent 36%,
                  rgba(29, 4, 9, 0.22) 100%
                ),
                linear-gradient(
                  180deg,
                  rgba(20, 3, 6, 0.28) 0%,
                  transparent 52%,
                  rgba(18, 3, 6, 0.45) 100%
                );
            }

            /* ── Center Divider Line ────────────────────────────────────── */
            .va-center-line {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 50%;
              z-index: 7;
              width: 1px;
              background: rgba(255, 248, 236, 0.18);
              transform: scaleY(0);
              transform-origin: top;
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
              height: clamp(82px, 10vh, 112px);
              display: grid;
              grid-template-columns: 1fr auto 1fr;
              align-items: start;
              pointer-events: none;
              padding: clamp(24px, 3.3vh, 38px) clamp(22px, 2.5vw, 42px) 0;
            }

            .va-nav-link {
              width: fit-content;
              position: relative;
              color: rgba(255, 250, 242, 0.95);
              font-size: clamp(10px, 0.86vw, 14px);
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              pointer-events: auto;
              opacity: 0;
              transform: translateY(-12px);
              animation: va-nav-in 800ms cubic-bezier(0.16, 1, 0.3, 1) 770ms forwards;
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
              bottom: -7px;
              width: 100%;
              height: 1px;
              background: currentColor;
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
              top: -6px;
              justify-self: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              color: #f5e8d2;
              pointer-events: auto;
              opacity: 0;
              transform: translateY(-16px);
              animation: va-brand-in 900ms cubic-bezier(0.16, 1, 0.3, 1) 550ms forwards;
            }

            @keyframes va-brand-in {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .va-mark {
              position: relative;
              width: 43px;
              height: 50px;
              margin-bottom: 1px;
            }

            .va-mark::before,
            .va-mark::after {
              content: "";
              position: absolute;
              border: 2px solid currentColor;
            }

            .va-mark::before {
              left: 11px;
              top: 1px;
              width: 20px;
              height: 36px;
              border-radius: 100% 0 100% 100%;
              transform: rotate(38deg);
            }

            .va-mark::after {
              left: 8px;
              top: 19px;
              width: 27px;
              height: 21px;
              border-top: 0;
              border-radius: 0 0 18px 18px;
              transform: rotate(13deg);
            }

            .va-brand-name {
              font-family: 'DM Sans', Arial, sans-serif;
              font-size: clamp(22px, 2.1vw, 34px);
              font-weight: 500;
              line-height: 0.9;
              letter-spacing: -0.045em;
            }

            .va-brand-subtitle {
              margin-top: 9px;
              font-size: clamp(6px, 0.52vw, 9px);
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.55em;
              text-transform: uppercase;
            }

            /* ── Large Panel Titles ─────────────────────────────────────── */
            .va-title {
              position: absolute;
              z-index: 8;
              margin: 0;
              color: rgba(255, 252, 246, 0.96);
              font-family: 'DM Sans', Arial, sans-serif;
              font-size: clamp(42px, 4.2vw, 70px);
              font-weight: 300;
              line-height: 1;
              letter-spacing: -0.055em;
              white-space: nowrap;
              opacity: 0;
              transform: translateY(30px);
              animation: va-title-in 1s cubic-bezier(0.16, 1, 0.3, 1) 900ms forwards;
              pointer-events: none;
            }

            @keyframes va-title-in {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .va-title-left {
              top: 17%;
              left: 30.5%;
            }

            .va-title-right {
              left: 30%;
              bottom: 15.7%;
            }

            /* ── Center Floating Card Area ──────────────────────────────── */
            .va-card-area {
              position: absolute;
              left: 50%;
              top: 50.7%;
              z-index: 15;
              width: clamp(190px, 16.2vw, 270px);
              transform: translate(-50%, -50%);
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
            }

            .va-card-wrap {
              position: relative;
              width: 100%;
              aspect-ratio: 1 / 1.05;
              overflow: hidden;
              border-radius: clamp(24px, 2.2vw, 38px);
              background: #4a101d;
              box-shadow:
                0 26px 70px rgba(19, 3, 6, 0.45),
                0 5px 18px rgba(19, 3, 6, 0.3);
              opacity: 0;
              transform: translateY(55px) scale(0.88);
              animation: va-card-in 1.15s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;
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
                rgba(255, 255, 255, 0.16),
                transparent 38%,
                rgba(46, 5, 12, 0.15)
              );
            }

            .va-card-image {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
              object-position: center 35%;
              transform: scale(1.02);
              transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-card-area:hover .va-card-image {
              transform: scale(1.095);
            }

            .va-explore {
              width: fit-content;
              margin: 14px auto 0;
              display: flex;
              align-items: center;
              gap: 5px;
              color: rgba(255, 252, 247, 0.96);
              font-size: clamp(12px, 1.22vw, 20px);
              font-weight: 400;
              line-height: 1;
              letter-spacing: 0.22em;
              text-transform: uppercase;
              opacity: 0;
              transform: translateY(16px);
              animation: va-explore-in 850ms cubic-bezier(0.16, 1, 0.3, 1) 1.45s forwards;
            }

            @keyframes va-explore-in {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .va-explore-arrow {
              font-size: 0.72em;
              display: inline-block;
              transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-card-area:hover .va-explore-arrow {
              transform: translate(4px, -4px);
            }

            /* ── Right-Side Circular Control ────────────────────────────── */
            .va-side-control {
              position: absolute;
              right: clamp(18px, 2vw, 35px);
              top: 22%;
              z-index: 16;
              width: 34px;
              height: 34px;
              padding: 0;
              display: grid;
              place-items: center;
              border: 1px solid rgba(255, 251, 244, 0.9);
              border-radius: 50%;
              background: rgba(30, 4, 9, 0.15);
              color: #fffaf3;
              cursor: pointer;
              backdrop-filter: blur(8px);
              opacity: 0;
              transform: scale(0.65);
              animation: va-control-in 700ms cubic-bezier(0.16, 1, 0.3, 1) 1.25s forwards;
            }

            @keyframes va-control-in {
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            .va-side-control::before {
              content: "";
              width: 3px;
              height: 3px;
              border-radius: 50%;
              background: currentColor;
              box-shadow: 0 0 9px rgba(255, 255, 255, 0.8);
            }

            .va-side-control::after {
              content: "";
              position: absolute;
              inset: -5px;
              border: 1px solid rgba(255, 251, 244, 0.19);
              border-radius: inherit;
              opacity: 0;
              transform: scale(0.65);
              transition: opacity 350ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            .va-side-control:hover::after {
              opacity: 1;
              transform: scale(1);
            }

            /* ── Bottom Left Link ───────────────────────────────────────── */
            .va-bottom-left {
              position: absolute;
              bottom: clamp(20px, 2.6vh, 32px);
              left: clamp(22px, 2.5vw, 42px);
              z-index: 16;
              color: rgba(255, 251, 245, 0.96);
              font-size: clamp(9px, 0.78vw, 13px);
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              opacity: 0;
              transform: translateY(13px);
              animation: va-bottom-in 800ms cubic-bezier(0.16, 1, 0.3, 1) 1.22s forwards;
            }

            @keyframes va-bottom-in {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* ── Bottom Right Controls ──────────────────────────────────── */
            .va-bottom-right {
              position: absolute;
              right: clamp(22px, 2.5vw, 42px);
              bottom: clamp(20px, 2.6vh, 32px);
              z-index: 16;
              display: flex;
              align-items: center;
              gap: 10px;
              color: rgba(255, 251, 245, 0.96);
              font-size: clamp(9px, 0.78vw, 13px);
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              opacity: 0;
              transform: translateY(13px);
              animation: va-bottom-in 800ms cubic-bezier(0.16, 1, 0.3, 1) 1.22s forwards;
            }

            .va-bottom-divider {
              width: 1px;
              height: 14px;
              margin: 0 3px;
              background: rgba(255, 250, 243, 0.36);
            }

            .va-lang {
              cursor: pointer;
              transition: color 200ms ease;
              color: rgba(255, 250, 243, 0.52);
            }

            .va-lang:hover,
            .va-lang-active {
              color: #ffffff;
            }

            /* ── Tablet Responsive Rules ────────────────────────────────── */
            @media (max-width: 900px) {
              .va-title {
                font-size: clamp(35px, 5.3vw, 50px);
              }
              .va-title-left {
                left: 13%;
              }
              .va-title-right {
                left: 16%;
              }
              .va-card-area {
                width: clamp(170px, 23vw, 225px);
              }
              .va-brand-name {
                font-size: 26px;
              }
            }

            /* ── Mobile Responsive Rules ────────────────────────────────── */
            @media (max-width: 650px) {
              .va-root {
                min-height: 620px;
              }

              .va-panels {
                grid-template-columns: 1fr;
                grid-template-rows: 50% 50%;
              }

              .va-panel-left,
              .va-panel-right {
                clip-path: none;
                animation: none;
              }

              .va-panel-left .va-panel-image {
                object-position: center 61%;
              }

              .va-panel-right .va-panel-image {
                object-position: 48% 43%;
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
                animation: va-scale-line-mobile 1.2s cubic-bezier(0.16, 1, 0.3, 1) 700ms forwards;
              }

              @keyframes va-scale-line-mobile {
                to {
                  transform: scaleX(1);
                }
              }

              .va-topbar {
                height: 76px;
                align-items: start;
                padding: 22px 16px 0;
              }

              .va-brand {
                top: -8px;
              }

              .va-mark {
                width: 30px;
                height: 35px;
                transform: scale(0.72);
                margin-bottom: -5px;
              }

              .va-brand-name {
                font-size: 19px;
              }

              .va-brand-subtitle {
                margin-top: 6px;
                font-size: 5px;
              }

              .va-nav-link {
                font-size: 8px;
              }

              .va-title {
                font-size: clamp(28px, 9vw, 40px);
              }

              .va-title-left {
                top: 15%;
                left: 11%;
              }

              .va-title-right {
                left: auto;
                right: 8%;
                bottom: 9%;
              }

              .va-card-area {
                top: 50%;
                width: clamp(125px, 34vw, 170px);
              }

              .va-card-wrap {
                border-radius: 22px;
              }

              .va-explore {
                margin-top: 9px;
                font-size: 9px;
              }

              .va-side-control {
                top: 72%;
                right: 15px;
                width: 28px;
                height: 28px;
              }

              .va-bottom-left,
              .va-bottom-right {
                bottom: 16px;
                font-size: 7px;
              }

              .va-bottom-left {
                left: 15px;
              }

              .va-bottom-right {
                right: 15px;
                gap: 7px;
              }
            }

            /* ── Prefers-Reduced-Motion ─────────────────────────────────── */
            @media (prefers-reduced-motion: reduce) {
              .va-panel-left,
              .va-panel-right,
              .va-panel-image,
              .va-center-line,
              .va-nav-link,
              .va-brand,
              .va-title,
              .va-card-wrap,
              .va-explore,
              .va-side-control,
              .va-bottom-left,
              .va-bottom-right {
                animation-duration: 1ms !important;
                animation-delay: 0ms !important;
              }

              .va-card-image,
              .va-explore-arrow,
              .va-nav-link::after {
                transition: none !important;
              }
            }
          `,
        }}
      />

      {/* 1. Split Panels */}
      <div className="va-panels">
        {/* Left Panel: Atelier Craft & Heritage */}
        <section className="va-panel va-panel-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LEFT_IMAGE}
            alt="Chandrani luxury handwoven sarees arranged with traditional elegance"
            className="va-panel-image"
            onError={handleImageError}
            loading="eager"
          />
        </section>

        {/* Right Panel: Portrait of Royal Drapes */}
        <section className="va-panel va-panel-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={RIGHT_IMAGE}
            alt="Close-up portrait of model in lavender silk saree"
            className="va-panel-image"
            onError={handleImageError}
            loading="eager"
          />
        </section>
      </div>

      {/* 2. Center Animated Scale Divider */}
      <div className="va-center-line" aria-hidden="true" />

      {/* 3. Top Navigation Bar */}
      <header className="va-topbar">
        <a href="#hero" className="va-nav-link">
          Atelier
        </a>

        <a href="#" className="va-brand" aria-label="Aarohi Haute Couture">
          <span className="va-mark" aria-hidden="true" />
          <span className="va-brand-name">aarohi</span>
          <span className="va-brand-subtitle">haute couture</span>
        </a>

        <a href="#inquiries" className="va-nav-link va-nav-right">
          Concierge
        </a>
      </header>

      {/* 4. Large Panel Editorial Titles */}
      <h1 className="va-title va-title-left">Private Styling</h1>
      <h2 className="va-title va-title-right">Get In Touch</h2>

      {/* 5. Center Floating Concierge Card */}
      <a
        href="mailto:concierge@aarohisarees.com?subject=Atelier%20Styling%20Appointment"
        className="va-card-area"
        aria-label="Book a private styling consultation"
      >
        <div className="va-card-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CARD_IMAGE}
            alt="Aarohi heritage model drape"
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

      {/* 6. Right-Side Circular Control Button */}
      <button
        className="va-side-control"
        type="button"
        aria-label="View flagship ateliers"
        onClick={() => {
          window.location.href = "#locations";
        }}
      />

      {/* 7. Bottom Left Link */}
      <a href="#flagship" className="va-bottom-left">
        Flagship: Kolkata · New Delhi
      </a>

      {/* 8. Bottom Right Concierge Controls */}
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
