<script setup lang="ts">
// Interactive living ink portrait of Sandeep built from /assets/sun-bust.png.
// Extracts the exact bust silhouette on mount via morphological closing +
// flood-fill so Dark & Sepia modes light only the body contour (no box, no
// inverted white beard) while keeping hair, eyes, and beard crisp dark ink.

const props = defineProps<{
  height: number;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);
const ready = ref(false);

interface InkParticle {
  bx: number; // normalized 0..1 inside bust image
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

interface Pulse {
  nx: number;
  ny: number;
  start: number;
}

let bustAspect = 366 / 728;
let silhouetteCanvas: HTMLCanvasElement | null = null;
let inkParticles: InkParticle[] = [];
const pulses: Pulse[] = [];

// Morphological closing + exterior flood-fill on a 0.5x mask grid to extract
// the exact silhouette of the bust (hair, ears, shoulders, folded arms) with
// smooth anti-aliased edges and zero leaks through artistic line gaps.
function buildSilhouetteMask(img: HTMLImageElement): HTMLCanvasElement {
  const pad = 20;
  const maskScale = 0.5;
  const iw = Math.round(img.naturalWidth * maskScale);
  const ih = Math.round(img.naturalHeight * maskScale);
  const gw = iw + pad * 2;
  const gh = ih + pad * 2;

  const tmp = document.createElement("canvas");
  tmp.width = gw;
  tmp.height = gh;
  const tctx = tmp.getContext("2d")!;
  tctx.drawImage(img, pad, pad, iw, ih);
  const raw = tctx.getImageData(0, 0, gw, gh).data;

  const ink = new Uint8Array(gw * gh);
  for (let i = 0; i < gw * gh; i++) {
    ink[i] = raw[i * 4 + 3] > 35 ? 1 : 0;
  }

  // Fast separable 1D dilation / erosion (~1ms at 0.5x)
  const dilate1D = (src: Uint8Array, r: number) => {
    const horiz = new Uint8Array(gw * gh);
    for (let y = 0; y < gh; y++) {
      const row = y * gw;
      let count = 0;
      for (let x = 0; x <= r && x < gw; x++) count += src[row + x];
      for (let x = 0; x < gw; x++) {
        horiz[row + x] = count > 0 ? 1 : 0;
        if (x - r >= 0) count -= src[row + x - r];
        if (x + r + 1 < gw) count += src[row + x + r + 1];
      }
    }
    const out = new Uint8Array(gw * gh);
    for (let x = 0; x < gw; x++) {
      let count = 0;
      for (let y = 0; y <= r && y < gh; y++) count += horiz[y * gw + x];
      for (let y = 0; y < gh; y++) {
        out[y * gw + x] = count > 0 ? 1 : 0;
        if (y - r >= 0) count -= horiz[(y - r) * gw + x];
        if (y + r + 1 < gh) count += horiz[(y + r + 1) * gw + x];
      }
    }
    return out;
  };

  const erode1D = (src: Uint8Array, r: number) => {
    const horiz = new Uint8Array(gw * gh);
    const full = r * 2 + 1;
    for (let y = 0; y < gh; y++) {
      const row = y * gw;
      let count = 0;
      for (let x = 0; x < Math.min(full, gw); x++) count += src[row + x];
      for (let x = r; x < gw - r; x++) {
        horiz[row + x] = count === full ? 1 : 0;
        count -= src[row + x - r];
        if (x + r + 1 < gw) count += src[row + x + r + 1];
      }
    }
    const out = new Uint8Array(gw * gh);
    for (let x = 0; x < gw; x++) {
      let count = 0;
      for (let y = 0; y < Math.min(full, gh); y++) count += horiz[y * gw + x];
      for (let y = r; y < gh - r; y++) {
        out[y * gw + x] = count === full ? 1 : 0;
        count -= horiz[(y - r) * gw + x];
        if (y + r + 1 < gh) count += horiz[(y + r + 1) * gw + x];
      }
    }
    return out;
  };

  const closed = dilate1D(dilate1D(ink, 7), 6);

  // BFS flood-fill exterior background starting from (0, 0)
  const outside = new Uint8Array(gw * gh);
  const queue = new Int32Array(gw * gh);
  let head = 0;
  let tail = 0;
  outside[0] = 1;
  queue[tail++] = 0;

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % gw;
    const y = (idx - x) / gw;
    if (x > 0) {
      const n = idx - 1;
      if (!outside[n] && !closed[n]) {
        outside[n] = 1;
        queue[tail++] = n;
      }
    }
    if (x < gw - 1) {
      const n = idx + 1;
      if (!outside[n] && !closed[n]) {
        outside[n] = 1;
        queue[tail++] = n;
      }
    }
    if (y > 0) {
      const n = idx - gw;
      if (!outside[n] && !closed[n]) {
        outside[n] = 1;
        queue[tail++] = n;
      }
    }
    if (y < gh - 1) {
      const n = idx + gw;
      if (!outside[n] && !closed[n]) {
        outside[n] = 1;
        queue[tail++] = n;
      }
    }
  }

  const filled = new Uint8Array(gw * gh);
  for (let i = 0; i < gw * gh; i++) {
    filled[i] = outside[i] ? 0 : 1;
  }
  const tight = erode1D(erode1D(filled, 5), 5);
  const inkHalo = dilate1D(ink, 2);
  const finalMask = new Uint8Array(gw * gh);
  for (let i = 0; i < gw * gh; i++) {
    finalMask[i] = tight[i] || inkHalo[i] ? 1 : 0;
  }

  const smallMask = document.createElement("canvas");
  smallMask.width = iw;
  smallMask.height = ih;
  const smCtx = smallMask.getContext("2d")!;
  const imgData = smCtx.createImageData(iw, ih);
  for (let y = 0; y < ih; y++) {
    for (let x = 0; x < iw; x++) {
      const v = finalMask[(y + pad) * gw + (x + pad)] ? 255 : 0;
      const o = (y * iw + x) * 4;
      imgData.data[o] = 255;
      imgData.data[o + 1] = 255;
      imgData.data[o + 2] = 255;
      imgData.data[o + 3] = v;
    }
  }
  smCtx.putImageData(imgData, 0, 0);

  const full = document.createElement("canvas");
  full.width = img.naturalWidth;
  full.height = img.naturalHeight;
  const fctx = full.getContext("2d")!;
  fctx.filter = "blur(2.2px)";
  fctx.drawImage(smallMask, 0, 0, full.width, full.height);
  fctx.filter = "none";

  const fullData = fctx.getImageData(0, 0, full.width, full.height);
  for (let i = 0; i < fullData.data.length; i += 4) {
    const a = fullData.data[i + 3];
    fullData.data[i] = 255;
    fullData.data[i + 1] = 255;
    fullData.data[i + 2] = 255;
    fullData.data[i + 3] = Math.max(0, Math.min(255, (a - 100) * 2.2));
  }
  fctx.putImageData(fullData, 0, 0);

  return full;
}

function samplePortrait(img: HTMLImageElement) {
  bustAspect = img.naturalWidth / img.naturalHeight;
  silhouetteCanvas = buildSilhouetteMask(img);

  const sampleCanvas = document.createElement("canvas");
  sampleCanvas.width = img.naturalWidth;
  sampleCanvas.height = img.naturalHeight;
  const sctx = sampleCanvas.getContext("2d")!;
  sctx.drawImage(img, 0, 0);
  const data = sctx.getImageData(
    0,
    0,
    img.naturalWidth,
    img.naturalHeight,
  ).data;

  const particles: InkParticle[] = [];
  const step = 3;
  for (let y = 0; y < img.naturalHeight; y += step) {
    for (let x = 0; x < img.naturalWidth; x += step) {
      const a = data[(y * img.naturalWidth + x) * 4 + 3];
      if (a > 70) {
        const bx = x / img.naturalWidth;
        const by = y / img.naturalHeight;
        const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        const frac = seed - Math.floor(seed);
        particles.push({
          bx,
          by,
          x: bx + (frac - 0.5) * 0.08,
          y: Math.min(1.08, by + 0.14 + frac * 0.12),
          vx: 0,
          vy: 0,
          alpha: a / 255,
          size: 1.45 + (a / 255) * 0.75,
        });
      }
    }
  }
  inkParticles = particles;
  ready.value = true;
}

function getThemeColors() {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    return {
      isDark: true,
      isSepia: false,
      fillLight: "#f0ebe0",
      fillShadow: "#d4cec1",
      auraColor: "rgba(96, 165, 250, 0.22)",
      sunAura: "rgba(251, 191, 36, 0.24)",
      ink: "#0f172a",
    };
  }
  if (html.classList.contains("sepia")) {
    return {
      isDark: false,
      isSepia: true,
      fillLight: "#faf3e3",
      fillShadow: "#e7d8ba",
      auraColor: "rgba(180, 83, 9, 0.14)",
      sunAura: "rgba(217, 119, 6, 0.18)",
      ink: "#3b2d1f",
    };
  }
  return {
    isDark: false,
    isSepia: false,
    fillLight: "#ffffff",
    fillShadow: "#f1f5f9",
    auraColor: "rgba(16, 185, 129, 0.14)",
    sunAura: "rgba(245, 158, 11, 0.16)",
    ink: "#0f172a",
  };
}

let litSilhouetteCanvas: HTMLCanvasElement | null = null;
let lastLitKey = "";

function renderLitSilhouette(
  colors: ReturnType<typeof getThemeColors>,
  lightNx: number,
  lightNy: number,
) {
  if (!silhouetteCanvas) return null;
  if (!litSilhouetteCanvas) {
    litSilhouetteCanvas = document.createElement("canvas");
    litSilhouetteCanvas.width = silhouetteCanvas.width;
    litSilhouetteCanvas.height = silhouetteCanvas.height;
  }

  const qx = Math.round(lightNx * 20);
  const qy = Math.round(lightNy * 20);
  const key = `${colors.fillLight}|${colors.fillShadow}|${qx}|${qy}`;
  if (key === lastLitKey) return litSilhouetteCanvas;
  lastLitKey = key;

  const w = litSilhouetteCanvas.width;
  const h = litSilhouetteCanvas.height;
  const ctx = litSilhouetteCanvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);

  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(silhouetteCanvas, 0, 0);

  ctx.globalCompositeOperation = "source-in";
  const lx = w * (0.5 + lightNx * 0.45);
  const ly = h * (0.35 + lightNy * 0.35);
  const grad = ctx.createRadialGradient(
    lx,
    ly,
    w * 0.08,
    w * 0.5,
    h * 0.5,
    h * 0.72,
  );
  grad.addColorStop(0, colors.fillLight);
  grad.addColorStop(1, colors.fillShadow);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";

  return litSilhouetteCanvas;
}

let rafId = 0;
let isVisible = true;
let reducedMotion = false;

const pointer = { active: false, sx: 0, sy: 0, nx: 0.25, ny: -0.25 };
const smoothPointer = { nx: 0.25, ny: -0.25 };

let resizeObserver: ResizeObserver | undefined;
let intersectionObserver: IntersectionObserver | undefined;

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const img = new Image();
  img.src = "/assets/sun-bust.png";
  img.onload = () => samplePortrait(img);

  const canvas = canvasRef.value;
  const wrapper = wrapperRef.value;
  if (!canvas || !wrapper) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;

  const resize = () => {
    const rect = wrapper.getBoundingClientRect();
    width = Math.max(220, rect.width);
    height = Math.max(260, props.height || rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  };

  resize();
  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(wrapper);

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      isVisible = entries.some((e) => e.isIntersecting);
    },
    { threshold: 0.05 },
  );
  intersectionObserver.observe(wrapper);

  const renderFrame = (now: number) => {
    rafId = requestAnimationFrame(renderFrame);
    if (!isVisible || !ready.value) return;

    const t = reducedMotion ? 0 : now * 0.001;
    const colors = getThemeColors();

    const targetNx = pointer.active ? pointer.nx : Math.sin(t * 0.45) * 0.25;
    const targetNy = pointer.active
      ? pointer.ny
      : Math.cos(t * 0.35) * 0.15 - 0.15;
    smoothPointer.nx += (targetNx - smoothPointer.nx) * 0.08;
    smoothPointer.ny += (targetNy - smoothPointer.ny) * 0.08;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const padY = 14;
    const maxH = height - padY * 2;
    const maxW = width - 24;
    let bh = maxH;
    let bw = bh * bustAspect;
    if (bw > maxW) {
      bw = maxW;
      bh = bw / bustAspect;
    }

    const parallaxX = reducedMotion ? 0 : smoothPointer.nx * 7;
    const parallaxY = reducedMotion ? 0 : smoothPointer.ny * 5;
    const bx = (width - bw) * 0.5 + parallaxX;
    const by = (height - bh) * 0.5 + parallaxY;

    // 1. Soft radial halo contained within canvas bounds so fade hits 0% cleanly
    const rawHaloCx = bx + bw * (0.48 + smoothPointer.nx * 0.1);
    const rawHaloCy = by + bh * (0.38 + smoothPointer.ny * 0.08);
    const maxSafeR = Math.min(width * 0.46, height * 0.46);
    const haloCx = Math.max(maxSafeR, Math.min(width - maxSafeR, rawHaloCx));
    const haloCy = Math.max(maxSafeR, Math.min(height - maxSafeR, rawHaloCy));
    const haloR = Math.min(
      maxSafeR,
      haloCx,
      width - haloCx,
      haloCy,
      height - haloCy,
    );
    const haloGrad = ctx.createRadialGradient(
      haloCx,
      haloCy,
      bw * 0.04,
      haloCx,
      haloCy,
      haloR,
    );
    haloGrad.addColorStop(0, colors.sunAura);
    haloGrad.addColorStop(0.45, colors.auraColor);
    haloGrad.addColorStop(0.82, "rgba(0,0,0,0)");
    haloGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(haloCx, haloCy, haloR, 0, Math.PI * 2);
    ctx.fill();

    // 2. Cel-lit die-cut silhouette in Dark & Sepia modes (zero box, keeps dark ink crisp)
    const litSil = renderLitSilhouette(
      colors,
      smoothPointer.nx,
      smoothPointer.ny,
    );
    if (litSil && (colors.isDark || colors.isSepia)) {
      ctx.save();
      if (colors.isDark) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 10;
      }
      ctx.drawImage(
        litSil,
        bx - parallaxX * 0.35,
        by - parallaxY * 0.35,
        bw,
        bh,
      );
      ctx.restore();
    }

    for (let i = pulses.length - 1; i >= 0; i--) {
      if (now - pulses[i].start > 1400) pulses.splice(i, 1);
    }

    const pBustX = (pointer.sx - bx) / bw;
    const pBustY = (pointer.sy - by) / bh;

    // 3. Kinetic spring-physics ink particles
    ctx.fillStyle = colors.ink;
    const scaleDot = bw / 310;
    for (const p of inkParticles) {
      if (reducedMotion) {
        p.x = p.bx;
        p.y = p.by;
      } else {
        p.vx += (p.bx - p.x) * 0.14;
        p.vy += (p.by - p.y) * 0.14;

        if (pointer.active) {
          const dx = p.x - pBustX;
          const dy = (p.y - pBustY) / bustAspect;
          const dist = Math.hypot(dx, dy);
          const radius = 0.22;
          if (dist < radius && dist > 0.001) {
            const force = ((radius - dist) / radius) ** 2 * 0.032;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force * bustAspect;
          }
        }

        for (const pulse of pulses) {
          const age = (now - pulse.start) / 1000;
          const dx = p.x - pulse.nx;
          const dy = (p.y - pulse.ny) / bustAspect;
          const dist = Math.hypot(dx, dy);
          const wave = age * 1.45;
          const delta = Math.abs(dist - wave);
          if (delta < 0.09 && dist > 0.001) {
            const strength = (1 - delta / 0.09) * (1 - age / 1.4) * 0.018;
            p.vx += (dx / dist) * strength;
            p.vy += (dy / dist) * strength * bustAspect;
          }
        }

        p.vx *= 0.78;
        p.vy *= 0.78;
        p.x += p.vx;
        p.y += p.vy;
      }

      const sx = bx + p.x * bw;
      const sy = by + p.y * bh;
      const dotSize = p.size * scaleDot;
      ctx.globalAlpha = Math.min(1, p.alpha);
      ctx.fillRect(sx - dotSize * 0.5, sy - dotSize * 0.5, dotSize, dotSize);
    }
    ctx.globalAlpha = 1;
  };

  rafId = requestAnimationFrame(renderFrame);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
});

function onPointerMove(e: PointerEvent) {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  pointer.sx = e.clientX - rect.left;
  pointer.sy = e.clientY - rect.top;
  pointer.nx = (pointer.sx / rect.width) * 2 - 1;
  pointer.ny = (pointer.sy / rect.height) * 2 - 1;
  pointer.active = true;
}

function onPointerLeave() {
  pointer.active = false;
}

function triggerPulse(e: MouseEvent) {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
  pulses.push({ nx, ny, start: performance.now() });
}
</script>

<template>
  <div
    ref="wrapperRef"
    class="hero-persona flex items-center justify-center w-full"
  >
    <canvas
      ref="canvasRef"
      class="persona-canvas block w-full cursor-pointer select-none"
      role="img"
      aria-label="Interactive illustrated portrait of Sandeep Ramgolam — hover to interact, click for a ripple effect"
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
      @click="triggerPulse"
    />
  </div>
</template>

<style scoped>
.persona-canvas {
  outline: none;
}
</style>
