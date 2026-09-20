"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────────────────
   Silk — a REAL cloth/fabric simulation hero.
   Customized with Royal Maroon & Ivory palette with "Aarohi" woven in.
   ──────────────────────────────────────────────────────────────────────── */

const KICKER = "HERITAGE ATELIER · ROYAL DRAPES";
const LINES = ["Aarohi"];
const SUBLINE = "A LIVING SURFACE THAT ANSWERS THE TOUCH";

// Royal Maroon & Gold/Ivory palette tailored to the website's luxury aesthetic
const PALETTE = {
  top: "#140306", // deepest wine maroon
  mid: "#2A0810", // rich imperial maroon
  low: "#4A101D", // royal burgundy maroon
  hot: "#7A1B30", // vibrant crimson highlight
  ink: "#FAF6F0", // signature offwhite cream type
  sheen: [1.0, 0.88, 0.78] as const, // warm champagne-gold silk sheen
  rim: [0.72, 0.18, 0.28] as const, // crimson silk fresnel rim
  clear: 0x140306, // stage behind the silk matching website backdrop
};

export default function SilkWeave() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cardMode = new URLSearchParams(window.location.search).has("card");

    const COLS = cardMode ? 64 : 100;
    const ROWS = cardMode ? 46 : 70;
    const TEX_W = cardMode ? 1280 : 2048;

    // ── renderer / scene / camera ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(PALETTE.clear, 1);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const FOV = 30;
    const CAM_Z = 6;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.set(0, 0, CAM_Z);

    // Baked texture (gradient + headline) → uploaded once per (re)bake.
    const texCanvas = document.createElement("canvas");
    const texCtx = texCanvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(texCanvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        map: { value: texture },
        uLight: { value: new THREE.Vector3(-0.42, 0.72, 0.58).normalize() },
        uSheen: { value: new THREE.Vector3(...PALETTE.sheen) },
        uRim: { value: new THREE.Vector3(...PALETTE.rim) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vN;
        varying vec3 vW;
        void main() {
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vW = wp.xyz;
          vN = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform sampler2D map;
        uniform vec3 uLight;
        uniform vec3 uSheen;
        uniform vec3 uRim;
        varying vec2 vUv;
        varying vec3 vN;
        varying vec3 vW;
        void main() {
          vec3 base = texture2D(map, vUv).rgb;
          vec3 V = normalize(cameraPosition - vW);
          vec3 N = normalize(vN);
          if (dot(N, V) < 0.0) N = -N;
          vec3 L = normalize(uLight);
          float diff = clamp(dot(N, L), 0.0, 1.0);
          float shade = 0.5 + 0.62 * diff;
          vec3 H = normalize(L + V);
          float spec = pow(clamp(dot(N, H), 0.0, 1.0), 18.0) * 0.5;
          float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0) * 0.42;
          vec3 col = base * shade + uSheen * spec + uRim * fres;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(1, 1, COLS - 1, ROWS - 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;

    // ── simulation state (world units) ─────────────────────────────────────
    const N = COLS * ROWS;
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const pz = new Float32Array(N);
    const ox = new Float32Array(N);
    const oy = new Float32Array(N);
    const oz = new Float32Array(N);
    const rx = new Float32Array(N);
    const ry = new Float32Array(N);

    const ca: number[] = [];
    const cb: number[] = [];
    let sx = 0;
    let sy = 0;
    let W = 0;
    let H = 0;
    let visW = 0;
    let visH = 0;

    const buildConstraints = () => {
      ca.length = 0;
      cb.length = 0;
      const link = (a: number, b: number) => {
        ca.push(a);
        cb.push(b);
      };
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = r * COLS + c;
          if (c < COLS - 1) link(i, i + 1);
          if (r < ROWS - 1) link(i, i + COLS);
          if (c < COLS - 1 && r < ROWS - 1) {
            link(i, i + COLS + 1);
            link(i + 1, i + COLS);
          }
        }
      }
    };
    buildConstraints();

    const restLen = (a: number, b: number) =>
      Math.hypot(rx[a] - rx[b], ry[a] - ry[b]);

    const seedRest = () => {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = r * COLS + c;
          rx[i] = c * sx - W / 2;
          ry[i] = H / 2 - r * sy;
          px[i] = ox[i] = rx[i];
          py[i] = oy[i] = ry[i];
          pz[i] = oz[i] = 0;
        }
      }
    };

    // ── baked texture (gradient + headline woven in) ───────────────────────
    const bake = () => {
      const tw = TEX_W;
      const th = Math.max(2, Math.round((tw * H) / W));
      texCanvas.width = tw;
      texCanvas.height = th;
      const ctx = texCtx;

      // Base royal maroon gradient (diagonal, top-left → bottom-right)
      const g = ctx.createLinearGradient(0, 0, tw * 0.9, th);
      g.addColorStop(0, PALETTE.top);
      g.addColorStop(0.38, PALETTE.mid);
      g.addColorStop(0.70, PALETTE.low);
      g.addColorStop(1, PALETTE.hot);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, tw, th);

      // Soft colour blooms for royal maroon depth
      const bloom = (x: number, y: number, rad: number, col: string) => {
        const rg = ctx.createRadialGradient(x, y, 0, x, y, rad);
        rg.addColorStop(0, col);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, tw, th);
      };
      ctx.globalCompositeOperation = "lighter";
      bloom(tw * 0.78, th * 0.82, tw * 0.6, "rgba(122,27,48,0.5)"); // rich crimson
      bloom(tw * 0.16, th * 0.12, tw * 0.5, "rgba(74,16,29,0.55)"); // deep burgundy
      bloom(tw * 0.5, th * 0.52, tw * 0.42, "rgba(212,175,55,0.18)"); // subtle gold dust
      ctx.globalCompositeOperation = "source-over";

      // Faint diagonal silk weave threads
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = "#FAF6F0";
      ctx.lineWidth = 1;
      for (let x = -th; x < tw; x += 9) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + th, th);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Headline woven into the silk: "AAROHI"
      const cx = tw * 0.5;
      ctx.textAlign = "center";
      ctx.fillStyle = PALETTE.ink;

      // Kicker above title
      ctx.font = `500 ${Math.round(tw * 0.014)}px "Familjen Grotesk", sans-serif`;
      ctx.globalAlpha = 0.85;
      ctx.fillText(spaced(KICKER), cx, th * 0.28);
      ctx.globalAlpha = 1;

      // Main woven title: AAROHI
      const fs = Math.round(tw * 0.13);
      ctx.font = `700 ${fs}px "Familjen Grotesk", sans-serif`;
      const lh = fs * 0.9;
      const startY = th * 0.5 - ((LINES.length - 1) * lh) / 2 + fs * 0.32;
      LINES.forEach((line, i) => ctx.fillText(line, cx, startY + i * lh));

      // Subline below title
      ctx.font = `500 ${Math.round(tw * 0.012)}px "Familjen Grotesk", sans-serif`;
      ctx.globalAlpha = 0.75;
      ctx.fillText(spaced(SUBLINE), cx, th * 0.73);
      ctx.globalAlpha = 1;

      texture.needsUpdate = true;
    };

    const spaced = (s: string) => s.split("").join(" ");

    // ── sizing ─────────────────────────────────────────────────────────────
    const resize = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      visH = 2 * CAM_Z * Math.tan((FOV * Math.PI) / 360);
      visW = visH * camera.aspect;
      W = visW * 1.55;
      H = visH * 1.5;
      sx = W / (COLS - 1);
      sy = H / (ROWS - 1);
      seedRest();
      bake();
      flush();
    };

    // ── pointer ────────────────────────────────────────────────────────────
    const ptr = {
      x: 0,
      y: 0,
      px: 0,
      py: 0,
      vx: 0,
      vy: 0,
      tiltX: 0,
      tiltY: 0,
      active: false,
      grab: false,
    };

    const setPointer = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      ptr.x = ndcX * (visW / 2);
      ptr.y = ndcY * (visH / 2);
      ptr.tiltX = -ndcY;
      ptr.tiltY = ndcX;
    };

    // ── physics step ───────────────────────────────────────────────────────
    const GRAVITY = -2.6;
    const DAMP = 0.99;
    const DT2 = (1 / 60) * (1 / 60);
    const ITER = cardMode ? 4 : 6;
    let t = 0;

    const step = (windScale: number) => {
      t += 1 / 60;
      const gust = 0.6 + 0.4 * Math.sin(t * 0.4);
      const R = W * 0.17;
      const R2 = R * R;
      const push = ptr.grab ? 72 : 54;
      const drag = ptr.grab ? 46 : 28;
      const MAXV = sx * 0.85;

      for (let i = COLS; i < N; i++) {
        const wx = px[i];
        const wy = py[i];
        const windZ =
          (Math.sin(wx * 1.7 + t * 1.3) * 0.62 +
            Math.sin(wy * 1.4 - t * 1.0 + 1.7) * 0.38) *
          3.1 *
          gust *
          windScale;
        const windX = Math.sin(wy * 1.1 + t * 0.7) * 0.5 * windScale;

        let ax = windX;
        let ay = GRAVITY;
        let az = windZ;

        if (ptr.active) {
          const dx = wx - ptr.x;
          const dy = wy - ptr.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const wgt = 1 - Math.sqrt(d2) / R;
            const f = wgt * wgt;
            az += f * push;
            ax += ptr.vx * f * drag;
            ay += ptr.vy * f * drag;
          }
        }

        const cx = px[i];
        const cy = py[i];
        const cz = pz[i];
        let vx = (cx - ox[i]) * DAMP;
        let vy = (cy - oy[i]) * DAMP;
        let vz = (cz - oz[i]) * DAMP;
        const sp = Math.sqrt(vx * vx + vy * vy + vz * vz);
        if (sp > MAXV) {
          const s = MAXV / sp;
          vx *= s;
          vy *= s;
          vz *= s;
        }
        px[i] = cx + vx + ax * DT2;
        py[i] = cy + vy + ay * DT2;
        pz[i] = cz + vz + az * DT2;
        ox[i] = cx;
        oy[i] = cy;
        oz[i] = cz;
      }

      for (let k = 0; k < ITER; k++) {
        for (let c = 0; c < ca.length; c++) {
          const a = ca[c];
          const b = cb[c];
          const dx = px[b] - px[a];
          const dy = py[b] - py[a];
          const dz = pz[b] - pz[a];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-5;
          const rest = restCache[c];
          const diff = ((d - rest) / d) * 0.5;
          const mx = dx * diff;
          const my = dy * diff;
          const mz = dz * diff;
          const aPin = a < COLS;
          const bPin = b < COLS;
          if (!aPin) {
            px[a] += mx;
            py[a] += my;
            pz[a] += mz;
          }
          if (!bPin) {
            px[b] -= mx;
            py[b] -= my;
            pz[b] -= mz;
          }
        }
        for (let c = 0; c < COLS; c++) {
          px[c] = rx[c];
          py[c] = ry[c];
          pz[c] = 0;
        }
      }

      const SMOOTH = 0.14;
      for (let r = 1; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = r * COLS + c;
          let ax2 = 0;
          let ay2 = 0;
          let az2 = 0;
          let n = 0;
          if (c > 0) { const j = i - 1; ax2 += px[j]; ay2 += py[j]; az2 += pz[j]; n++; }
          if (c < COLS - 1) { const j = i + 1; ax2 += px[j]; ay2 += py[j]; az2 += pz[j]; n++; }
          if (r > 0) { const j = i - COLS; ax2 += px[j]; ay2 += py[j]; az2 += pz[j]; n++; }
          if (r < ROWS - 1) { const j = i + COLS; ax2 += px[j]; ay2 += py[j]; az2 += pz[j]; n++; }
          const inv = 1 / n;
          px[i] += (ax2 * inv - px[i]) * SMOOTH;
          py[i] += (ay2 * inv - py[i]) * SMOOTH;
          pz[i] += (az2 * inv - pz[i]) * SMOOTH;
        }
      }
    };

    let restCache = new Float32Array(0);
    const buildRestCache = () => {
      restCache = new Float32Array(ca.length);
      for (let c = 0; c < ca.length; c++) restCache[c] = restLen(ca[c], cb[c]);
    };

    const flush = () => {
      buildRestCache();
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < N; i++) {
        arr[i * 3] = px[i];
        arr[i * 3 + 1] = py[i];
        arr[i * 3 + 2] = pz[i];
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();
    };

    const render = () => {
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < N; i++) {
        arr[i * 3] = px[i];
        arr[i * 3 + 1] = py[i];
        arr[i * 3 + 2] = pz[i];
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      const tx = ptr.tiltX * 0.1;
      const ty = ptr.tiltY * 0.12;
      mesh.rotation.x += (tx - mesh.rotation.x) * 0.06;
      mesh.rotation.y += (ty - mesh.rotation.y) * 0.06;

      renderer.render(scene, camera);
    };

    // ── interaction wiring ─────────────────────────────────────────────────
    let vt = 0;
    const onMove = (e: PointerEvent) => {
      setPointer(e.clientX, e.clientY);
      ptr.active = true;
    };
    const onEnter = () => {
      ptr.active = true;
    };
    const onLeave = () => {
      ptr.active = false;
      ptr.grab = false;
    };
    const onDown = (e: PointerEvent) => {
      setPointer(e.clientX, e.clientY);
      ptr.active = true;
      ptr.grab = true;
    };
    const onUp = () => {
      ptr.grab = false;
    };

    // ── run ────────────────────────────────────────────────────────────────
    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(host);

    if (typeof document !== "undefined" && document.fonts) {
      Promise.all([
        document.fonts.load('700 40px "Familjen Grotesk"'),
        document.fonts.load('500 16px "Familjen Grotesk"'),
      ])
        .then(() => bake())
        .catch(() => {});
    }

    let raf = 0;

    if (reduced) {
      for (let i = 0; i < 140; i++) step(1);
      flush();
      render();
    } else {
      if (!cardMode) {
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", onLeave);
        host.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);
      }
      for (let i = 0; i < 40; i++) step(1);

      const loop = () => {
        if (cardMode) {
          vt += 0.018;
          ptr.active = true;
          const ndcX = 0.62 * Math.sin(vt);
          const ndcY = 0.36 * Math.sin(vt * 1.7 + 0.5);
          const nx = ptr.x;
          const ny = ptr.y;
          ptr.x = ndcX * (visW / 2);
          ptr.y = ndcY * (visH / 2);
          ptr.vx = (ptr.x - nx) * 0.12;
          ptr.vy = (ptr.y - ny) * 0.12;
          ptr.tiltX = -ndcY;
          ptr.tiltY = ndcX;
          ptr.grab = Math.sin(vt * 0.9) > 0.4;
        } else {
          ptr.vx = ptr.vx * 0.8 + (ptr.x - ptr.px) * 0.2;
          ptr.vy = ptr.vy * 0.8 + (ptr.y - ptr.py) * 0.2;
          ptr.px = ptr.x;
          ptr.py = ptr.y;
        }
        step(cardMode ? 1.35 : 1);
        render();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host)
        host.removeChild(renderer.domElement);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="relative w-full h-[100svh] min-h-[650px] bg-[#140306] overflow-hidden" />
    );
  }

  return (
    <div className="sk-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="sk-stage" ref={hostRef} />
      <div className="sk-grain" aria-hidden />
      <div className="sk-vignette" aria-hidden />

      <header className="sk-chrome sk-top">
        <span className="sk-mark">Aarohi</span>
        <span className="sk-meta">Pure Silk · Handwoven</span>
      </header>
      <footer className="sk-chrome sk-bottom">
        <span className="sk-hint">Brush across the silk — press to grab</span>
        <span className="sk-meta">Heritage Edit / 03</span>
      </footer>
    </div>
  );
}

const css = `
  @import url("https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&display=swap");

  .sk-root{position:relative;width:100%;height:100svh;min-height:650px;overflow:hidden;
    background:#140306;cursor:crosshair;
    font-family:"Familjen Grotesk","Helvetica Neue",Arial,sans-serif;}
  .sk-stage{position:absolute;inset:0;}
  .sk-stage canvas{display:block;width:100%;height:100%;}

  /* faint film grain + vignette over the silk */
  .sk-grain{position:absolute;inset:0;pointer-events:none;z-index:4;opacity:.05;
    mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
  .sk-vignette{position:absolute;inset:0;pointer-events:none;z-index:3;
    background:radial-gradient(120% 100% at 50% 42%, transparent 52%, rgba(20,3,6,.65) 100%);}

  .sk-chrome{position:absolute;left:0;right:0;z-index:6;display:flex;
    align-items:center;justify-content:space-between;
    padding:0 clamp(1.4rem,4vw,3rem);pointer-events:none;
    color:#FAF6F0;}
  .sk-top{top:clamp(1.4rem,4vh,2.4rem);}
  .sk-bottom{bottom:clamp(1.4rem,4vh,2.4rem);}
  .sk-mark{font-weight:700;font-size:17px;letter-spacing:.03em;}
  .sk-meta,.sk-hint{font-size:11px;font-weight:500;letter-spacing:.2em;
    text-transform:uppercase;opacity:.85;}
  .sk-hint::before{content:"";display:inline-block;width:22px;height:1px;
    background:currentColor;margin-right:10px;vertical-align:middle;opacity:.6;}

  @media (max-width:680px){
    .sk-hint{display:none;}
  }
`;
