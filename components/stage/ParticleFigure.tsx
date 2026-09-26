"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { rng } from "@/components/stage/dots";
import { BAND_KIND, BAND_POSE, bandShade, sampleBand } from "@/components/stage/band";
import { dotGray, dotInk, isDark, onThemeChange } from "@/components/stage/theme";

/*
 * Small live particle figures in the language of the hero: dots in 3D,
 * perspective-projected, fading with depth, leaning toward the cursor and
 * scattering from it. Each scene writes its particles for a moment in time;
 * the engine handles the camera, the pointer, drawing and pausing.
 */

const PERSPECTIVE = 3.4;
/** Red, ink, gray: ink and gray follow the theme. */
const palette = (dark: boolean) => [
  "#e5332a",
  `rgb(${dotInk(dark).join(",")})`,
  `rgb(${dotGray(dark).join(",")})`,
];
const RED = 0;
const INK = 1;
const GRAY = 2;

type Buffers = {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  /** Palette index. */
  c: Uint8Array;
  /** Base alpha, 0–1 (0 hides the dot). */
  a: Float32Array;
  /** Base size in px at unit depth. */
  s: Float32Array;
  /** Surface normals for shading, when the scene has them. */
  nz?: Float32Array;
  nx?: Float32Array;
  ny?: Float32Array;
  /** 1 for dots that glow (the sensor's lights). */
  glow?: Uint8Array;
};

type Scene = {
  count: number;
  /** Turns per second about the vertical axis; 0 holds still. */
  spin: number;
  /** Resting pitch toward the viewer, radians. */
  pitch: number;
  /** How much of the canvas the scene fills (radius as a share of the short side). */
  zoom: number;
  /** Where the scene sits in the canvas, as fractions, for a given width. */
  center?: (w: number, h: number) => [number, number];
  /** Scene radius in px for a given canvas size (overrides zoom). */
  radius?: (w: number, h: number) => number;
  /** How far the pointer can turn the scene (radians). */
  lean: number;
  /** Write every particle for time `t` (seconds). `first` is true once. */
  frame: (t: number, b: Buffers, first: boolean) => void;
  /** A good still for reduced motion. */
  still: number;
};

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * The band, turning slowly about its own axis with its sensor lights
 * pulsing. `turn` is turns per second.
 */
function bandScene(count: number, turn = 0.05, opts: Partial<Scene> = {}): Scene {
  const band = sampleBand(count, rng(5));
  const n = band.kind.length;
  const ct = Math.cos(BAND_POSE.tilt);
  const st = Math.sin(BAND_POSE.tilt);
  return {
    count: n,
    spin: 0,
    pitch: 0,
    zoom: 0.78,
    lean: 0.45,
    still: 1.2,
    ...opts,
    frame(t, b, first) {
      b.nx ??= new Float32Array(n);
      b.ny ??= new Float32Array(n);
      b.nz ??= new Float32Array(n);
      b.glow ??= new Uint8Array(n);
      if (first) {
        for (let i = 0; i < n; i++) {
          const k = band.kind[i];
          b.c[i] = k === BAND_KIND.strap || k === BAND_KIND.led ? RED : INK;
          b.s[i] = 1.4 + ((i * 7919) % 97) / 97;
          b.a[i] = 1;
          b.glow[i] = k === BAND_KIND.led ? 1 : 0;
        }
      }
      // Turn about the band's own axis, then tip it toward the viewer.
      const ang = t * turn * Math.PI * 2 + 0.6;
      const ca = Math.cos(ang);
      const sa = Math.sin(ang);
      for (let i = 0; i < n; i++) {
        const i3 = i * 3;
        let x = band.pos[i3];
        let z = band.pos[i3 + 2];
        const y = band.pos[i3 + 1];
        let u = x * ca - z * sa;
        z = x * sa + z * ca;
        b.x[i] = u;
        b.y[i] = y * ct - z * st;
        b.z[i] = y * st + z * ct;
        x = band.normal[i3];
        z = band.normal[i3 + 2];
        const ny = band.normal[i3 + 1];
        u = x * ca - z * sa;
        z = x * sa + z * ca;
        b.nx[i] = u;
        b.ny[i] = ny * ct - z * st;
        b.nz[i] = ny * st + z * ct;
        // The lights breathe.
        if (b.glow[i]) b.a[i] = 0.75 + 0.25 * Math.sin(t * 2.4 + i);
      }
    },
  };
}

/** A bowl of food, glucose rising off it like steam. */
function mealScene(): Scene {
  const rand = rng(41);
  const rim = 220;
  const shell = 700;
  const food = 640;
  const rise = 150;
  const bowl = rim + shell;
  const n = bowl + food + rise;
  const px = new Float32Array(n);
  const py = new Float32Array(n);
  const pz = new Float32Array(n);
  const col = new Uint8Array(n);
  const alpha = new Float32Array(n);
  const size = new Float32Array(n);
  const phase = new Float32Array(n);
  const golden = Math.PI * (3 - Math.sqrt(5));
  // A crisp ink rim, then a lighter shell below it: the lower half of a
  // squashed sphere (y down is positive).
  for (let i = 0; i < rim; i++) {
    const a = (i / rim) * Math.PI * 2;
    px[i] = Math.cos(a);
    py[i] = 0;
    pz[i] = Math.sin(a);
    col[i] = INK;
    alpha[i] = 1;
    size[i] = 1.6;
  }
  for (let k = 0; k < shell; k++) {
    const i = rim + k;
    const yy = (k + 0.5) / shell;
    const r = Math.sqrt(1 - yy * yy);
    const a = k * golden;
    px[i] = Math.cos(a) * r;
    py[i] = yy * 0.7;
    pz[i] = Math.sin(a) * r;
    col[i] = yy > 0.55 ? INK : GRAY;
    alpha[i] = 0.75;
    size[i] = 1.2 + rand() * 0.6;
  }
  // Food heaped above the rim, mostly red (carbs) with gray.
  for (let j = 0; j < food; j++) {
    const i = bowl + j;
    const a = j * golden;
    const d = Math.sqrt((j + 0.5) / food) * 0.94;
    px[i] = Math.cos(a) * d;
    pz[i] = Math.sin(a) * d;
    py[i] = 0.04 - 0.52 * Math.pow(1 - d * d, 0.7) + (rand() - 0.5) * 0.05;
    col[i] = rand() < 0.62 ? RED : GRAY;
    alpha[i] = 1;
    size[i] = 1.6 + rand() * 1.2;
  }
  // Glucose rising off the meal.
  for (let j = 0; j < rise; j++) {
    const i = bowl + food + j;
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * 0.5;
    px[i] = Math.cos(a) * d;
    pz[i] = Math.sin(a) * d;
    phase[i] = rand();
    col[i] = RED;
    size[i] = 1.6 + rand() * 1.2;
  }
  return {
    count: n,
    spin: 0.035,
    pitch: 0.42,
    zoom: 0.62,
    lean: 0.4,
    still: 2,
    center: (w, h) => [w / 2, h * 0.6],
    frame(t, b, first) {
      if (first) {
        for (let i = 0; i < n; i++) {
          b.x[i] = px[i];
          b.y[i] = py[i];
          b.z[i] = pz[i];
          b.c[i] = col[i];
          b.s[i] = size[i];
          b.a[i] = alpha[i];
        }
      }
      for (let j = 0; j < rise; j++) {
        const i = bowl + food + j;
        const k = (t * 0.22 + phase[i]) % 1; // 0 leaving the food, 1 gone
        b.y[i] = -0.45 - k * 1.3;
        b.x[i] = px[i] * (1 - k * 0.4) + Math.sin(t * 1.3 + phase[i] * 9) * 0.06 * k;
        b.z[i] = pz[i] * (1 - k * 0.4);
        b.a[i] = smooth(0, 0.15, k) * (1 - smooth(0.55, 1, k));
      }
    },
  };
}

/**
 * A glucose trend after a meal, drawing itself: red while it rises, ink once
 * it settles back into the steady band, then again.
 */
function trendScene(): Scene {
  const rand = rng(37);
  const line = 520;
  const steady = 140;
  const meal = 26;
  const n = line + steady + meal + 1;
  const peak = 0.34;
  const curve = (u: number) => 0.62 - 1.2 * Math.exp(-Math.pow((u - peak) / 0.15, 2));
  const X = (u: number) => -1.25 + u * 2.5;
  const jitter = new Float32Array(n);
  for (let i = 0; i < n; i++) jitter[i] = rand() - 0.5;
  const cycle = 6.5; // seconds: draw 4, hold 1.5, fade 1
  return {
    count: n,
    spin: 0,
    pitch: 0,
    zoom: 0.8,
    lean: 0.35,
    still: 4.6,
    frame(t, b, first) {
      const k = t % cycle;
      const head = Math.min(1, k / 4);
      const fade = 1 - smooth(5.5, 6.5, k);
      if (first) {
        for (let i = 0; i < n; i++) {
          b.s[i] = 1.4 + Math.abs(jitter[i]) * 1.6;
          b.z[i] = jitter[i] * 0.06;
        }
      }
      for (let i = 0; i < line; i++) {
        const u = i / (line - 1);
        b.x[i] = X(u);
        b.y[i] = curve(u) + jitter[i] * 0.05;
        b.c[i] = u < peak + 0.12 ? RED : INK;
        b.a[i] = smooth(head, head - 0.015, u) * fade * (0.65 + Math.abs(jitter[i]) * 0.7);
      }
      // The steady band the curve settles back into, always there.
      for (let j = 0; j < steady; j++) {
        const i = line + j;
        b.x[i] = X(j / (steady - 1));
        b.y[i] = 0.74 + jitter[i] * 0.02;
        b.c[i] = GRAY;
        b.a[i] = 0.5;
      }
      // A dotted marker where the meal was.
      for (let j = 0; j < meal; j++) {
        const i = line + steady + j;
        b.x[i] = X(0.1);
        b.y[i] = -0.78 + (j / (meal - 1)) * 1.52;
        b.c[i] = GRAY;
        b.a[i] = 0.45;
        b.s[i] = 1.4;
      }
      // The head: where the reading is now.
      const i = n - 1;
      b.x[i] = X(head);
      b.y[i] = curve(head);
      b.c[i] = head < peak + 0.12 ? RED : INK;
      b.a[i] = fade;
      b.s[i] = 5 + Math.sin(t * 5) * 0.8;
    },
  };
}

/**
 * The closing stage: the band, large and slowly turning, with a faint field
 * of drifting dots around it.
 */
function closingScene(): Scene {
  const base = bandScene(1900, 0.04);
  const nb = base.count;
  const dust = 380;
  const n = nb + dust;
  const rand = rng(77);
  const dx = new Float32Array(dust);
  const dy = new Float32Array(dust);
  const dz = new Float32Array(dust);
  const ph = new Float32Array(dust);
  const dc = new Uint8Array(dust);
  for (let j = 0; j < dust; j++) {
    dx[j] = (rand() - 0.5) * 5.2;
    dy[j] = (rand() - 0.5) * 3;
    dz[j] = (rand() - 0.5) * 2.4;
    ph[j] = rand() * Math.PI * 2;
    dc[j] = rand() < 0.3 ? RED : rand() < 0.5 ? INK : GRAY;
  }
  let band: Buffers | null = null;
  return {
    ...base,
    count: n,
    lean: 0.35,
    center: (w, h) => (w >= 1024 ? [w * 0.64, h * 0.4] : [w / 2, h * 0.26]),
    radius: (w, h) => (w >= 1024 ? Math.min(w * 0.2, h * 0.32) : Math.min(w * 0.36, h * 0.2)),
    frame(t, b, first) {
      if (first) {
        // The band fills the front of the buffers; the dust follows, facing
        // the viewer so it's never shaded away.
        b.nx = new Float32Array(n);
        b.ny = new Float32Array(n);
        b.nz = new Float32Array(n).fill(-1);
        b.glow = new Uint8Array(n);
        band = {
          x: b.x.subarray(0, nb),
          y: b.y.subarray(0, nb),
          z: b.z.subarray(0, nb),
          c: b.c.subarray(0, nb),
          a: b.a.subarray(0, nb),
          s: b.s.subarray(0, nb),
          nx: b.nx.subarray(0, nb),
          ny: b.ny.subarray(0, nb),
          nz: b.nz.subarray(0, nb),
          glow: b.glow.subarray(0, nb),
        };
        for (let j = 0; j < dust; j++) {
          b.c[nb + j] = dc[j];
          b.s[nb + j] = 1 + rand() * 1.6;
        }
      }
      base.frame(t, band!, first);
      for (let j = 0; j < dust; j++) {
        const i = nb + j;
        b.x[i] = dx[j] + Math.sin(t * 0.21 + ph[j]) * 0.12;
        b.y[i] = dy[j] + Math.cos(t * 0.17 + ph[j] * 1.3) * 0.1;
        b.z[i] = dz[j];
        b.a[i] = 0.18 + 0.2 * (0.5 + 0.5 * Math.sin(t * 0.6 + ph[j]));
      }
    },
  };
}

const SCENES = {
  band: () => bandScene(1500),
  meal: mealScene,
  trend: trendScene,
  closing: closingScene,
} as const;

export type FigureName = keyof typeof SCENES;

function makeSprite(color: string, soft = false) {
  const s = document.createElement("canvas");
  s.width = s.height = soft ? 64 : 32;
  const c = s.getContext("2d");
  if (!c) return s;
  if (soft) {
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(229,51,42,0.5)");
    g.addColorStop(0.4, "rgba(229,51,42,0.14)");
    g.addColorStop(1, "rgba(229,51,42,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
  } else {
    c.fillStyle = color;
    c.beginPath();
    c.arc(16, 16, 16, 0, Math.PI * 2);
    c.fill();
  }
  return s;
}

/**
 * A live particle figure. `pointerArea` widens where the pointer is tracked
 * (the whole section, say) beyond the canvas itself.
 */
export function ParticleFigure({
  scene: name,
  className,
  pointerArea,
}: {
  scene: FigureName;
  className?: string;
  pointerArea?: React.RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = SCENES[name]();
    const n = scene.count;
    const b: Buffers = {
      x: new Float32Array(n),
      y: new Float32Array(n),
      z: new Float32Array(n),
      c: new Uint8Array(n),
      a: new Float32Array(n),
      s: new Float32Array(n),
    };
    let sprites = palette(isDark()).map((c) => makeSprite(c));
    const glowSprite = makeSprite("#e5332a", true);
    const off = new Float32Array(n * 2);
    const vel = new Float32Array(n * 2);

    let w = 0;
    let h = 0;
    let first = true;
    let raf = 0;
    let running = false;
    let mx = -1e5;
    let my = -1e5;
    let leanX = 0;
    let leanY = 0;
    let wantX = 0;
    let wantY = 0;
    const t0 = performance.now();
    const R = 70;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const t = reduce ? scene.still : (performance.now() - t0) / 1000;
      scene.frame(t, b, first);
      first = false;
      ctx.clearRect(0, 0, w, h);
      const [cx, cy] = scene.center ? scene.center(w, h) : [w / 2, h / 2];
      const rad = scene.radius ? scene.radius(w, h) : (Math.min(w, h) / 2) * scene.zoom;

      leanX += (wantX - leanX) * 0.06;
      leanY += (wantY - leanY) * 0.06;
      const yaw = scene.spin * Math.PI * 2 * t + leanY;
      const pitch = scene.pitch + leanX;
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);

      for (let i = 0; i < n; i++) {
        const a0 = b.a[i];
        if (a0 <= 0.005) continue;
        const x0 = b.x[i];
        const y0 = b.y[i];
        const z0 = b.z[i];
        const x1 = x0 * cyw - z0 * syw;
        const z1 = x0 * syw + z0 * cyw;
        const y1 = y0 * cp - z1 * sp;
        const z2 = y0 * sp + z1 * cp;
        const persp = PERSPECTIVE / (PERSPECTIVE + z2);
        const sx = cx + x1 * rad * persp;
        const sy = cy + y1 * rad * persp;

        const o = i * 2;
        if (!reduce) {
          const dx = sx + off[o] - mx;
          const dy = sy + off[o + 1] - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / R) * 1.3;
            vel[o] += (dx / d) * f;
            vel[o + 1] += (dy / d) * f;
          }
          vel[o] = (vel[o] - off[o] * 0.05) * 0.86;
          vel[o + 1] = (vel[o + 1] - off[o + 1] * 0.05) * 0.86;
          off[o] += vel[o];
          off[o + 1] += vel[o + 1];
        }

        const front = Math.min(1, Math.max(0, (1 - z2) / 2));
        let alpha = a0 * (0.35 + 0.65 * front);
        if (b.nz) {
          // Shade by which way the surface faces, turned like the dots.
          const nzr = b.nx![i] * syw + b.nz[i] * cyw;
          alpha *= bandShade(b.ny![i] * sp + nzr * cp);
        }
        const s = b.s[i] * persp * (0.8 + 0.4 * front);
        const px = sx + off[o];
        const py = sy + off[o + 1];
        if (b.glow?.[i]) {
          const gs = s * 9;
          ctx.globalAlpha = 0.5 * a0;
          ctx.drawImage(glowSprite, px - gs / 2, py - gs / 2, gs, gs);
        }
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.drawImage(sprites[b.c[i]], px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const area = pointerArea?.current ?? canvas;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      const ar = area.getBoundingClientRect();
      wantY = ((e.clientX - ar.left) / ar.width - 0.5) * scene.lean * 2;
      wantX = ((e.clientY - ar.top) / ar.height - 0.5) * scene.lean;
    };
    const onLeave = () => {
      mx = my = -1e5;
      wantX = wantY = 0;
    };

    resize();
    draw();
    const offTheme = onThemeChange((dark) => {
      sprites = palette(dark).map((c) => makeSprite(c));
      if (!running) draw();
    });
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()));
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      offTheme();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, [name, pointerArea]);

  return <canvas ref={ref} aria-hidden className={cn("block h-full w-full", className)} />;
}
