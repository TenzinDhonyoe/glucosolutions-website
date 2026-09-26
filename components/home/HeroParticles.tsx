"use client";

import { useEffect, useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { canvasText, dotGray, dotInk, dotRed, isDark, onThemeChange, rgba } from "@/components/stage/theme";
import { BAND_KIND, bandShade, sampleBand } from "@/components/stage/band";
import { preload } from "react-dom";
import {
  decodeHandCloud,
  HAND_CHAINS,
  HAND_CLOUD_URL,
  sampleHand,
  toHand,
  toWorld,
  type HandCloud,
} from "@/components/stage/hand";

type V3 = [number, number, number];
type El = "C" | "O" | "H";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const PERSPECTIVE = 3.4;
const REPEL_RADIUS = 110;
// The centre molecule is drawn a little larger than the band so it holds the stage.
const MOLECULE_SCALE = 1.3;

/**
 * Scroll timeline for the hero track, as fractions of its progress. The hero
 * copy reads the same numbers so text and canvas stay in step. The scan isn't
 * on the timeline: once the frame has locked on, it runs by itself.
 */
export const HERO_TIMELINE = {
  copyOut: [0.02, 0.2],
  morph: [0.06, 0.62],
  captionIn: [0.5, 0.72],
  lockOn: [0.62, 0.8],
} as const;

/** One sweep of the scan line, top to bottom or back (ms). */
const SCAN_MS = 2400;

/**
 * Glucose floating around the one the band reads: centre, scale and spin
 * (radians per frame about Y and X), in units of the stage radius. Positive
 * z is further away. On desktop they sit right of and above the scan frame,
 * clear of the copy; on narrower screens (`compact`) the frame fills the
 * width, so they gather underneath it instead.
 */
const SATELLITES: { at: V3; compact: V3; scale: number; spin: [number, number] }[] = [
  { at: [1.72, -0.74, 0.5], compact: [-0.9, 1.85, 0.9], scale: 0.5, spin: [0.006, 0.0035] },
  { at: [1.9, 0.86, 1.3], compact: [0.85, 1.7, 1.5], scale: 0.42, spin: [-0.005, 0.004] },
  { at: [-0.6, -1.7, 2.4], compact: [1.2, -1.55, 2.2], scale: 0.4, spin: [0.004, -0.006] },
  { at: [0.95, -1.6, 3.2], compact: [0.05, 2.35, 3.2], scale: 0.34, spin: [-0.0045, -0.003] },
];

/** Element colours: oxygen is the particle red; all three follow the theme. */
const elementRgb = (dark: boolean): Record<El, readonly number[]> => ({
  O: dotRed(dark),
  C: dotInk(dark),
  H: dotGray(dark),
});
const ELEMENTS: El[] = ["O", "C", "H"];
const COLOR_STEPS = 8;

/**
 * β-D-glucopyranose (C6H12O6) in its chair form, coordinates in ångströms.
 * The six-membered ring (five carbons and one oxygen) is the same hexagon as
 * the GlucoSolutions mark. Ring carbons C1–C4 carry an equatorial OH and an
 * axial H; C5 carries the CH2OH group. 6 C, 6 O, 12 H, 24 bonds.
 */
function buildGlucose() {
  const atoms: { p: V3; el: El }[] = [];
  const bonds: [number, number][] = [];
  const add = (p: V3, el: El) => atoms.push({ p, el }) - 1;
  const plus = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

  const ring: number[] = [];
  const ringEl: El[] = ["O", "C", "C", "C", "C", "C"];
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const pucker = i % 2 === 0 ? 0.25 : -0.25; // chair
    ring.push(add([Math.cos(a) * 1.45, Math.sin(a) * 1.45, pucker], ringEl[i]));
  }
  for (let i = 0; i < 6; i++) bonds.push([ring[i], ring[(i + 1) % 6]]);

  const dir = (i: number) => [Math.cos((i * Math.PI) / 3), Math.sin((i * Math.PI) / 3)];

  for (let i = 1; i <= 4; i++) {
    const c = atoms[ring[i]].p;
    const [rx, ry] = dir(i);
    const tx = -ry;
    const ty = rx;
    const zs = i % 2 === 0 ? 1 : -1;
    const o = add(plus(c, [rx * 1.35, ry * 1.35, -zs * 0.35]), "O");
    bonds.push([ring[i], o]);
    const ho = add(plus(atoms[o].p, [rx * 0.6 + tx * 0.55, ry * 0.6 + ty * 0.55, -zs * 0.3]), "H");
    bonds.push([o, ho]);
    const ha = add(plus(c, [0, 0, zs * 1.05]), "H");
    bonds.push([ring[i], ha]);
  }

  {
    const c = atoms[ring[5]].p;
    const [rx, ry] = dir(5);
    const tx = -ry;
    const ty = rx;
    const c6 = add(plus(c, [rx * 1.45, ry * 1.45, 0.35]), "C");
    bonds.push([ring[5], c6]);
    const h5 = add(plus(c, [0, 0, -1.05]), "H");
    bonds.push([ring[5], h5]);
    const p6 = atoms[c6].p;
    const o6 = add(plus(p6, [rx * 0.75 + tx * 0.95, ry * 0.75 + ty * 0.95, 0.35]), "O");
    bonds.push([c6, o6]);
    const ho6 = add(plus(atoms[o6].p, [rx * 0.8, ry * 0.8, 0.45]), "H");
    bonds.push([o6, ho6]);
    const h6a = add(plus(p6, [rx * 0.35 - tx * 0.6, ry * 0.35 - ty * 0.6, 0.85]), "H");
    bonds.push([c6, h6a]);
    const h6b = add(plus(p6, [rx * 0.35 - tx * 0.5, ry * 0.35 - ty * 0.5, -0.9]), "H");
    bonds.push([c6, h6b]);
  }

  // Centre on the origin, scale to a unit radius, and tip the ring back so
  // it reads as a 3D chair rather than a flat hexagon while it spins.
  let cx = 0;
  let cy = 0;
  let cz = 0;
  for (const a of atoms) {
    cx += a.p[0];
    cy += a.p[1];
    cz += a.p[2];
  }
  cx /= atoms.length;
  cy /= atoms.length;
  cz /= atoms.length;
  let max = 0;
  for (const a of atoms) {
    a.p = [a.p[0] - cx, a.p[1] - cy, a.p[2] - cz];
    max = Math.max(max, Math.hypot(...a.p));
  }
  const tilt = -1.05;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  for (const a of atoms) {
    const [x, y, z] = a.p.map((v) => v / max) as V3;
    a.p = [x, y * ct - z * st, y * st + z * ct];
  }
  return { atoms, bonds, unit: 1 / max };
}

/** Particle targets for one molecule: dotted atom spheres plus dotted bonds. */
function sampleMolecule(count: number, glucose: ReturnType<typeof buildGlucose>) {
  const { atoms, bonds, unit } = glucose;
  const radius: Record<El, number> = { C: 0.36 * unit, O: 0.38 * unit, H: 0.2 * unit };
  const weight: Record<El, number> = { C: 1, O: 1, H: 0.4 };

  const atomShare = Math.round(count * 0.58);
  const bondShare = count - atomShare;
  const totalWeight = atoms.reduce((s, a) => s + weight[a.el], 0);
  const lengths = bonds.map(([a, b]) => Math.hypot(...atoms[a].p.map((v, k) => v - atoms[b].p[k])));
  const totalLength = lengths.reduce((s, l) => s + l, 0);

  const pos = new Float32Array(count * 3);
  const el: El[] = new Array(count);
  let n = 0;

  atoms.forEach((a, ai) => {
    const k =
      ai === atoms.length - 1
        ? atomShare - n
        : Math.round((atomShare * weight[a.el]) / totalWeight);
    for (let j = 0; j < k && n < atomShare; j++, n++) {
      const y = 1 - ((j + 0.5) / k) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = j * GOLDEN_ANGLE;
      const rr = radius[a.el] * (0.85 + Math.random() * 0.15);
      pos[n * 3] = a.p[0] + Math.cos(th) * r * rr;
      pos[n * 3 + 1] = a.p[1] + y * rr;
      pos[n * 3 + 2] = a.p[2] + Math.sin(th) * r * rr;
      el[n] = a.el;
    }
  });

  bonds.forEach(([ia, ib], bi) => {
    const A = atoms[ia];
    const B = atoms[ib];
    const k = bi === bonds.length - 1 ? count - n : Math.round((bondShare * lengths[bi]) / totalLength);
    const t0 = radius[A.el] / lengths[bi];
    const t1 = 1 - radius[B.el] / lengths[bi];
    for (let j = 0; j < k && n < count; j++, n++) {
      const t = t0 + (t1 - t0) * ((j + Math.random()) / k);
      const jit = 0.035 * unit;
      pos[n * 3] = A.p[0] + (B.p[0] - A.p[0]) * t + (Math.random() - 0.5) * jit;
      pos[n * 3 + 1] = A.p[1] + (B.p[1] - A.p[1]) * t + (Math.random() - 0.5) * jit;
      pos[n * 3 + 2] = A.p[2] + (B.p[2] - A.p[2]) * t + (Math.random() - 0.5) * jit;
      el[n] = t < 0.5 ? A.el : B.el;
    }
  });

  return { pos, el };
}

function makeSprite(rgb: readonly number[]) {
  const s = document.createElement("canvas");
  s.width = s.height = 32;
  const c = s.getContext("2d");
  if (c) {
    c.fillStyle = `rgb(${rgb.join(",")})`;
    c.beginPath();
    c.arc(16, 16, 16, 0, Math.PI * 2);
    c.fill();
  }
  return s;
}

/** Soft red halo drawn behind the sensor's LEDs. */
function makeGlow(red: readonly number[]) {
  const s = document.createElement("canvas");
  s.width = s.height = 64;
  const c = s.getContext("2d");
  if (c) {
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, rgba(red, 0.55));
    g.addColorStop(0.35, rgba(red, 0.18));
    g.addColorStop(1, rgba(red, 0));
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
  }
  return s;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * The finger wave: each finger curls in a little and back out on a slow sine
 * (about five and a half seconds a cycle), the little finger leading and the index
 * following, so the motion rolls across the hand. Values are the share of a
 * full fist; the thumb just breathes along.
 */
const WAVE_FRAMES = 330;
const WAVE_DEPTH = [0.36, 0.4, 0.42, 0.44, 0.14]; // index, middle, ring, little, thumb
const WAVE_LAG = [0, 1.0, 2.0, 3.0, 0.5]; // radians ahead of the index
const waveAt = (frame: number, chain: number) =>
  WAVE_DEPTH[chain] * (0.5 - 0.5 * Math.cos((frame / WAVE_FRAMES) * Math.PI * 2 + WAVE_LAG[chain]));

/**
 * How the worn band and hand are posed on the stage: the arm raised on a
 * diagonal from the lower left (`lean`), the back of the hand toward you and
 * turned a little to the thumb side so the finger curl shows (`view`, radians
 * around the arm), and tipped toward the camera at the top
 * so you see into the band. The diagonal fills the right side and brings the
 * band up toward the middle of the screen.
 */
const POSE = { view: 1.0, lean: -0.3, tip: 0.35 } as const;
/**
 * Where the clasp and the hexagon mark sit around the worn band (radians; 0 is
 * the thumb side, π/2 the back of the wrist): fastened, with the clasp under
 * the wrist, out of view, and the mark on the thumb side.
 */
const WORN_BAND = { gapAt: -Math.PI / 2 - 0.3, gapHalf: 0.015, markAt: 0.3 };
/** The hand is drawn lighter than the band so the band stays the subject. */
const HAND_ALPHA = 0.85;
const HAND = 9;

// Scatter's spectroscope. Roles for the dots:
const BEAM = 0;
const PRISM = 1;
const PRISM_FILL = 2;
const SAMPLE = 3; // the cuvette's glass
const MOLECULE = 4; // glucose inside it
const FAN = 5;
const STRIP = 6;
/** Where along the fan the sample sits (share of the way to the strip). */
const SAMPLE_AT = 0.55;
/** An upright triangle of unit side, centred on its centroid (y down). */
const PRISM_VERTS: [number, number][] = [
  [0, -0.577],
  [-0.5, 0.289],
  [0.5, 0.289],
];
/** Wavelengths (0 violet to 1 red) the sample absorbs: dark lines on the strip. */
const ABSORPTION = [0.24, 0.73];
/** The wavelength the sample reflects back: a gap in the strip. */
const REFLECTION = 0.5;
const BAND_HALF = 0.022;
const absorbed = (l: number) => ABSORPTION.some((c) => Math.abs(l - c) < BAND_HALF);
const reflected = (l: number) => Math.abs(l - REFLECTION) < BAND_HALF;
/** The spectrum, violet through the brand teal to the brand red. */
const SPECTRUM_STOPS: [number, number, number][] = [
  [98, 76, 214],
  [47, 124, 224],
  [26, 171, 179],
  [70, 181, 110],
  [226, 190, 64],
  [238, 138, 44],
  [229, 51, 42], // the particle red; swapped for the night red in dark mode
];
const spectrumSteps = (dark: boolean) => {
  const stops = [...SPECTRUM_STOPS.slice(0, -1), dotRed(dark)];
  return Array.from({ length: 24 }, (_, k) => {
    const f = (k / 23) * (stops.length - 1);
    const a = stops[Math.floor(f)];
    const b = stops[Math.min(stops.length - 1, Math.floor(f) + 1)];
    const t = f - Math.floor(f);
    return a.map((v, c) => Math.round(v + (b[c] - v) * t));
  });
};
/**
 * The hand spans far more depth than the molecules, so its z is compressed
 * (a longer lens) to keep the forearm from ballooning toward the camera.
 */
const SCENE_DEPTH = 0.45;

/**
 * The hero visual. A hand wearing the band, all drawn in dots: the strap red,
 * the hand in soft ink, floating over an endless white floor. Scrolling
 * through `trackRef` takes it apart, the band first, then the hand from the
 * wrist outward. The band's dots become the glucose molecule it then locks
 * onto and scans; the hand's become the glucose drifting around it. The
 * scene sways gently, leans toward the cursor, and scatters the dots nearest
 * the pointer.
 *
 * Plain canvas 2D: points are rotated and perspective-projected each frame,
 * shaded by which way they face, and fade with depth. Pauses when offscreen
 * or the tab is hidden.
 */
export function HeroParticles({
  trackRef,
  scattered = false,
  className,
}: {
  trackRef: RefObject<HTMLElement | null>;
  /** Blow the dots out into a field that fills the screen. */
  scattered?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scatterRef = useRef(scattered);
  const redrawRef = useRef<(() => void) | null>(null);
  preload(HAND_CLOUD_URL, { as: "fetch", crossOrigin: "anonymous" });

  useEffect(() => {
    scatterRef.current = scattered;
    redrawRef.current?.();
  }, [scattered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 640;

    const build = (hand: HandCloud) => {
      // Start state: the band on a hand.
      const band = sampleBand(small ? 1100 : 2200, Math.random, WORN_BAND);
      const nb = band.kind.length;
      const count = nb + hand.count;

      // Scene coordinates. The band's loop axis becomes the arm's axis; then the hand's axes are laid onto the
      // screen (x right, y down, z away): the arm runs down the screen, the
      // thumb reaches out toward the viewer's left.
      const base = new Float32Array(count * 3);
      const baseN = new Float32Array(count * 3);
      const kind = new Uint8Array(count);
      const fade = new Float32Array(count).fill(1);
      const ax: V3 = [
        Math.sin(POSE.lean),
        Math.cos(POSE.lean) * Math.cos(POSE.tip),
        Math.sin(POSE.tip),
      ];
      const axLen = Math.hypot(...ax);
      ax[0] /= axLen;
      ax[1] /= axLen;
      ax[2] /= axLen;
      const thumbDir: V3 = [-Math.sin(POSE.view), 0, -Math.cos(POSE.view)];
      const dot = thumbDir[0] * ax[0] + thumbDir[1] * ax[1] + thumbDir[2] * ax[2];
      const az: V3 = [thumbDir[0] - dot * ax[0], thumbDir[1] - dot * ax[1], thumbDir[2] - dot * ax[2]];
      const azLen = Math.hypot(...az);
      az[0] /= azLen;
      az[1] /= azLen;
      az[2] /= azLen;
      const ay: V3 = [az[1] * ax[2] - az[2] * ax[1], az[2] * ax[0] - az[0] * ax[2], az[0] * ax[1] - az[1] * ax[0]];
      const posed = (x: number, y: number, z: number): V3 => [
        x * ax[0] + y * ay[0] + z * az[0],
        x * ax[1] + y * ay[1] + z * az[1],
        x * ax[2] + y * ay[2] + z * az[2],
      ];
      // The band's loop lies across the wrist: its wide axis along the wrist's
      // width (thumb to little finger), its narrow one front to back.
      const onWrist = (v: Float32Array, i3: number) => posed(v[i3 + 1], v[i3 + 2], v[i3]);
      for (let i = 0; i < nb; i++) {
        const i3 = i * 3;
        base.set(onWrist(band.pos, i3), i3);
        baseN.set(onWrist(band.normal, i3), i3);
        kind[i] = band.kind[i];
      }
      for (let j = 0; j < hand.count; j++) {
        const i3 = (nb + j) * 3;
        const j3 = j * 3;
        base.set(posed(hand.pos[j3], hand.pos[j3 + 1], hand.pos[j3 + 2]), i3);
        baseN.set(posed(hand.normal[j3], hand.normal[j3 + 1], hand.normal[j3 + 2]), i3);
        kind[nb + j] = HAND;
        fade[nb + j] = hand.fade[j];
      }
      // Anchors for framing: the band sits at the origin; `handTop` is the
      // highest fingertip. The hand (everything above the band) is centred
      // horizontally on the origin.
      let hx0 = Infinity;
      let hx1 = -Infinity;
      let handTop = 0;
      for (let i = 0; i < count; i++) {
        const y = base[i * 3 + 1];
        if (y >= 0) continue;
        hx0 = Math.min(hx0, base[i * 3]);
        hx1 = Math.max(hx1, base[i * 3]);
        handTop = Math.min(handTop, y);
      }
      const offX = (hx0 + hx1) / 2;
      for (let i = 0; i < count; i++) base[i * 3] -= offX;

      // Finger wave. Finger and thumb dots are kept in the straight hand's
      // frame and re-posed every frame: each bone turns about its joint, and
      // dots near a joint blend with the bone before it so the knuckles bend
      // smoothly instead of splitting.
      const rig: number[] = [];
      for (let j = 0; j < hand.count; j++) if (hand.bone[j] > 0) rig.push(j);
      const restP = new Float32Array(rig.length * 3);
      const restN = new Float32Array(rig.length * 3);
      const o0 = toHand([0, 0, 0]);
      rig.forEach((j, k) => {
        const j3 = j * 3;
        restP.set(toHand([hand.pos[j3], hand.pos[j3 + 1], hand.pos[j3 + 2]]), k * 3);
        const n = toHand([hand.normal[j3], hand.normal[j3 + 1], hand.normal[j3 + 2]]);
        restN.set([n[0] - o0[0], n[1] - o0[1], n[2] - o0[2]], k * 3);
      });
      // Hand frame to scene is affine: scene = S0 + S·p (then minus offX).
      const S0 = posed(...toWorld([0, 0, 0]));
      const S = [toWorld([1, 0, 0]), toWorld([0, 1, 0]), toWorld([0, 0, 1])].map((v) => {
        const q = posed(...v);
        return [q[0] - S0[0], q[1] - S0[1], q[2] - S0[2]];
      });
      const bones = 1 + HAND_CHAINS.length * 3;
      const boneR = new Float32Array(bones * 9); // rotation
      const boneJ = new Float32Array(bones * 3); // joint at rest
      const boneJ2 = new Float32Array(bones * 3); // joint once bent
      boneR.set([1, 0, 0, 0, 1, 0, 0, 0, 1]); // bone 0: the palm, static
      const shown = new Float32Array(HAND_CHAINS.length);
      const applyCurl = (curl: Float32Array) => {
        let changed = false;
        for (let c = 0; c < curl.length; c++) if (Math.abs(curl[c] - shown[c]) > 0.0005) changed = true;
        if (!changed) return;
        shown.set(curl);
        HAND_CHAINS.forEach((chain, ci) => {
          const [ax, ay, az] = chain.axis;
          let theta = 0;
          let jx = chain.joints[0][0];
          let jy = chain.joints[0][1];
          let jz = chain.joints[0][2];
          for (let sgm = 0; sgm < 3; sgm++) {
            const b = 1 + ci * 3 + sgm;
            theta += chain.flex[sgm] * curl[ci];
            const co = Math.cos(theta);
            const si = Math.sin(theta);
            const t1 = 1 - co;
            const o = b * 9;
            boneR[o] = co + ax * ax * t1;
            boneR[o + 1] = ax * ay * t1 - az * si;
            boneR[o + 2] = ax * az * t1 + ay * si;
            boneR[o + 3] = ay * ax * t1 + az * si;
            boneR[o + 4] = co + ay * ay * t1;
            boneR[o + 5] = ay * az * t1 - ax * si;
            boneR[o + 6] = az * ax * t1 - ay * si;
            boneR[o + 7] = az * ay * t1 + ax * si;
            boneR[o + 8] = co + az * az * t1;
            boneJ.set(chain.joints[sgm], b * 3);
            boneJ2[b * 3] = jx;
            boneJ2[b * 3 + 1] = jy;
            boneJ2[b * 3 + 2] = jz;
            if (sgm < 2) {
              // Carry the next joint along with this bone.
              const nx = chain.joints[sgm + 1][0] - chain.joints[sgm][0];
              const ny = chain.joints[sgm + 1][1] - chain.joints[sgm][1];
              const nz = chain.joints[sgm + 1][2] - chain.joints[sgm][2];
              jx += boneR[o] * nx + boneR[o + 1] * ny + boneR[o + 2] * nz;
              jy += boneR[o + 3] * nx + boneR[o + 4] * ny + boneR[o + 5] * nz;
              jz += boneR[o + 6] * nx + boneR[o + 7] * ny + boneR[o + 8] * nz;
            }
          }
        });
        for (let k = 0; k < rig.length; k++) {
          const j = rig[k];
          const b = hand.bone[j];
          const t = hand.boneT[j];
          const k3 = k * 3;
          const x = restP[k3];
          const y = restP[k3 + 1];
          const z = restP[k3 + 2];
          // This bone's move, blended near its joint with the bone before it.
          const parent = (b - 1) % 3 === 0 ? 0 : b - 1;
          const wgt = t < 0.25 ? smooth(0, 0.25, t) : 1;
          let px2 = 0;
          let py2 = 0;
          let pz2 = 0;
          for (const [bb, ww] of [
            [b, wgt],
            [parent, 1 - wgt],
          ]) {
            if (ww <= 0) continue;
            const o = bb * 9;
            const dx = bb ? x - boneJ[bb * 3] : x;
            const dy = bb ? y - boneJ[bb * 3 + 1] : y;
            const dz = bb ? z - boneJ[bb * 3 + 2] : z;
            px2 += ww * (boneR[o] * dx + boneR[o + 1] * dy + boneR[o + 2] * dz + (bb ? boneJ2[bb * 3] : 0));
            py2 += ww * (boneR[o + 3] * dx + boneR[o + 4] * dy + boneR[o + 5] * dz + (bb ? boneJ2[bb * 3 + 1] : 0));
            pz2 += ww * (boneR[o + 6] * dx + boneR[o + 7] * dy + boneR[o + 8] * dz + (bb ? boneJ2[bb * 3 + 2] : 0));
          }
          const o = b * 9;
          const nx = restN[k3];
          const ny = restN[k3 + 1];
          const nz = restN[k3 + 2];
          const qx = boneR[o] * nx + boneR[o + 1] * ny + boneR[o + 2] * nz;
          const qy = boneR[o + 3] * nx + boneR[o + 4] * ny + boneR[o + 5] * nz;
          const qz = boneR[o + 6] * nx + boneR[o + 7] * ny + boneR[o + 8] * nz;
          const i3 = (nb + j) * 3;
          for (let a = 0; a < 3; a++) {
            base[i3 + a] = S0[a] + S[0][a] * px2 + S[1][a] * py2 + S[2][a] * pz2 - (a === 0 ? offX : 0);
            baseN[i3 + a] = S[0][a] * qx + S[1][a] * qy + S[2][a] * qz;
          }
        }
      };
      const curl = new Float32Array(HAND_CHAINS.length);

      // End state: molecules. The band's dots make the centre molecule; the
      // hand's make the ones around it. Slots are shuffled within each so
      // particles cross over as they travel.
      const glucose = buildGlucose();
      const groupSizes = [nb];
      const satWeight = SATELLITES.reduce((s, m) => s + m.scale * m.scale, 0);
      SATELLITES.forEach((m, k) => {
        const rest = count - groupSizes.reduce((s, v) => s + v, 0);
        groupSizes.push(
          k === SATELLITES.length - 1 ? rest : Math.round((hand.count * m.scale * m.scale) / satWeight)
        );
      });
      const slotPos = new Float32Array(count * 3);
      const slotEl: El[] = new Array(count);
      const slotGroup = new Uint8Array(count);
      {
        let n = 0;
        groupSizes.forEach((size, g) => {
          const mol = sampleMolecule(size, glucose);
          slotPos.set(mol.pos, n * 3);
          for (let j = 0; j < size; j++) {
            slotEl[n + j] = mol.el[j];
            slotGroup[n + j] = g;
          }
          n += size;
        });
      }
      const shuffled = (from: number, to: number) => {
        const a = Array.from({ length: to - from }, (_, i) => from + i);
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };
      const order = [...shuffled(0, nb), ...shuffled(nb, count)];

      // One sprite ramp per (start colour, element) pair, rebuilt when the
      // theme flips so ink dots stay visible on either background.
      let dark = isDark();
      let txt = canvasText(dark);
      const makeSets = () => {
        const el = elementRgb(dark);
        return [dotRed(dark), dotInk(dark)].flatMap((from) =>
          ELEMENTS.map((to) =>
            Array.from({ length: COLOR_STEPS }, (_, s) => {
              const k = s / (COLOR_STEPS - 1);
              return makeSprite(from.map((v, c) => Math.round(v + (el[to][c] - v) * k)));
            })
          )
        );
      };
      let spriteSet = makeSets();
      let red = dotRed(dark);
      let glow = makeGlow(red);
      // Scatter's spectrum: violet through the brand teal to the brand red.
      let spectrum = spectrumSteps(dark).map((c) => makeSprite(c));
      let inkDot = spriteSet[3 + ELEMENTS.indexOf("C")][0];

      const target = new Float32Array(count * 3);
      const group = new Uint8Array(count);
      const spriteFor = new Uint8Array(count);
      const size = new Float32Array(count);
      const delay = new Float32Array(count);
      const swirl = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const t = order[i];
        target[i * 3] = slotPos[t * 3];
        target[i * 3 + 1] = slotPos[t * 3 + 1];
        target[i * 3 + 2] = slotPos[t * 3 + 2];
        group[i] = slotGroup[t];
        const fromRed = kind[i] === BAND_KIND.strap || kind[i] === BAND_KIND.led;
        spriteFor[i] = (fromRed ? 0 : 3) + ELEMENTS.indexOf(slotEl[t]);
        const isHand = kind[i] === HAND;
        size[i] = (isHand ? 1.15 : 1.9) + Math.random() * (isHand ? 0.75 : 1.0);
        // The band comes apart first, from the sensor out; then the hand, from
        // the wrist toward the fingertips and elbow.
        delay[i] = isHand
          ? 0.07 + hand.fromWrist[i - nb] * 0.23 + Math.random() * 0.05
          : band.fromSensor[i] * 0.06 + Math.random() * 0.05;
        const a = Math.random() * Math.PI * 2;
        const b = Math.acos(2 * Math.random() - 1);
        swirl[i * 3] = Math.sin(b) * Math.cos(a);
        swirl[i * 3 + 1] = Math.sin(b) * Math.sin(a);
        swirl[i * 3 + 2] = Math.cos(b);
      }
      // Scatter: the dots become a spectroscope. A beam of light (ink dots)
      // flows into a prism, fans out into its colours, and lands on a
      // spectrum strip with dark absorption lines where colours are missing.
      // Each dot gets a role, a wavelength (0 violet to 1 red), a phase along
      // its path and a little jitter.
      const scRole = new Uint8Array(count);
      const scLam = new Float32Array(count);
      const scU = new Float32Array(count);
      const scV = new Float32Array(count);
      const scJit = new Float32Array(count);
      const scPhase = new Float32Array(count);
      const scS = new Float32Array(count);
      const scDelay = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const r = Math.random();
        const role =
          r < 0.09 ? BEAM : r < 0.2 ? PRISM : r < 0.25 ? SAMPLE : r < 0.3 ? MOLECULE : r < 0.74 ? FAN : STRIP;
        scRole[i] = role;
        scLam[i] = Math.random();
        // A share of the fan rides exactly on the wavelengths the sample
        // absorbs or reflects, so those rays read clearly: two that stop
        // dead in the glass, one that bounces back.
        if (role === FAN && Math.random() < 0.22) {
          const bands = [...ABSORPTION, REFLECTION];
          scLam[i] = bands[Math.floor(Math.random() * bands.length)] + (Math.random() - 0.5) * BAND_HALF;
        }
        if (role === SAMPLE) scU[i] = Math.random(); // around the glass
        if (role === MOLECULE) {
          scU[i] = Math.floor(Math.random() * 3); // which molecule
          scV[i] = Math.random() * 6; // around its ring
        }
        if (role === PRISM) {
          // Mostly the three edges of the glass, a faint scatter inside.
          if (Math.random() < 0.72) {
            const edge = Math.floor(Math.random() * 3);
            const t = Math.random();
            const a = PRISM_VERTS[edge];
            const b = PRISM_VERTS[(edge + 1) % 3];
            scU[i] = a[0] + (b[0] - a[0]) * t;
            scV[i] = a[1] + (b[1] - a[1]) * t;
          } else {
            let u = Math.random();
            let v = Math.random();
            if (u + v > 1) {
              u = 1 - u;
              v = 1 - v;
            }
            const [a, b, c] = PRISM_VERTS;
            scU[i] = a[0] + (b[0] - a[0]) * u + (c[0] - a[0]) * v;
            scV[i] = a[1] + (b[1] - a[1]) * u + (c[1] - a[1]) * v;
            scRole[i] = PRISM_FILL;
          }
        }
        scJit[i] = Math.random() - 0.5;
        scPhase[i] = Math.random();
        scS[i] =
          role === STRIP ? 1.8 + Math.random() * 1.2 : role === MOLECULE ? 1.7 + Math.random() : 1.3 + Math.random() * 1.2;
        scDelay[i] = Math.random() * 0.25;
      }

      const leds: number[] = [];
      for (let i = 0; i < nb; i++) if (kind[i] === BAND_KIND.led) leds.push(i);

      const off = new Float32Array(count * 2);
      const vel = new Float32Array(count * 2);
      const px = new Float32Array(count);
      const py = new Float32Array(count);
      const ps = new Float32Array(count);

      let w = 0;
      let h = 0;
      let clock = 0;
      let molSpin = 0.6;
      let tiltX = 0;
      let tiltY = 0;
      let targetX = 0;
      let targetY = 0;
      let mx = -1e5;
      let my = -1e5;
      let intro = reduce || document.hidden ? 1 : 0;
      let raf = 0;
      let running = false;
      // Scatter tween: from `exFrom` toward `exTo`, started at `exStart`.
      let exFrom = 0;
      let exTo = 0;
      let exStart = 0;
      let exNow = 0;
      // When the detection frame finished locking on (ms), or null.
      let lockedAt: number | null = null;
      let redraw: (() => void) | null = null;

      // Smoothed on-screen bounds of the centre molecule, for the detection frame.
      const box = { x0: 0, y0: 0, x1: 0, y1: 0, ready: false };
      const fontFamily = getComputedStyle(document.body).fontFamily;

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = rect.width;
        h = rect.height;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const progress = () => {
        const el = trackRef.current;
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const span = rect.height - window.innerHeight;
        return span > 0 ? clamp01(-rect.top / span) : 0;
      };

      // Endless white floor: a perspective grid whose lines fade out toward
      // the horizon (no fill, so it never seams against the backdrop) and glide
      // toward the viewer as the page scrolls.
      const drawFloor = (p: number, cx: number, horizon: number) => {
        const depth = h - horizon;
        ctx.lineWidth = 1;
        const glideBy = (p * 2.4) % 1;
        for (let j = 0; j < 22; j++) {
          const z = 1 + (j + 1 - glideBy) * 0.55;
          const y = horizon + depth / z;
          if (y > h + 1) continue;
          const nearHorizon = smooth(0, depth * 0.35, y - horizon);
          ctx.strokeStyle = `rgba(${txt.line},${(0.08 / z) * nearHorizon})`;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        const fadeGrad = ctx.createLinearGradient(0, horizon, 0, h);
        fadeGrad.addColorStop(0, `rgba(${txt.line},0)`);
        fadeGrad.addColorStop(0.45, `rgba(${txt.line},0.035)`);
        fadeGrad.addColorStop(1, `rgba(${txt.line},0.07)`);
        ctx.strokeStyle = fadeGrad;
        const spacing = Math.max(90, w / 11);
        for (let k = -18; k <= 18; k++) {
          ctx.globalAlpha = Math.max(0, 1 - Math.abs(k) * 0.04);
          ctx.beginPath();
          ctx.moveTo(cx, horizon);
          ctx.lineTo(cx + k * spacing * 1.8, h);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      };

      const draw = () => {
        const p = progress();
        const m = smooth(HERO_TIMELINE.morph[0], HERO_TIMELINE.morph[1], p);
        const lock = smooth(HERO_TIMELINE.lockOn[0], HERO_TIMELINE.lockOn[1], p);
        // Once locked on, the scan sweeps down and back up on its own,
        // continuously; the first full sweep down finds the glucose.
        const nowMs = performance.now();
        if (lock > 0.97) lockedAt ??= nowMs;
        else lockedAt = null;
        const since = lockedAt === null ? -1 : nowMs - lockedAt;
        const sweeps = since / SCAN_MS;
        const leg = sweeps % 2;
        const scan = since < 0 ? 0 : easeInOut(leg < 1 ? leg : 2 - leg);
        const scanDir = leg < 1 ? 1 : -1;
        const detected = reduce ? lock > 0.97 : sweeps >= 1;
        const introT = 1 - Math.pow(1 - intro, 3);
        const grow = 0.9 + 0.1 * introT;

        // Scatter progress. Bursting out eases off; gathering eases in and out.
        const want = scatterRef.current ? 1 : 0;
        const now = performance.now();
        if (want !== exTo) {
          exFrom = exNow;
          exTo = want;
          exStart = now;
        }
        const exDur = reduce ? 1 : exTo ? 1400 : 1600;
        const exT = clamp01((now - exStart) / exDur);
        exNow = exFrom + (exTo - exFrom) * (exTo ? 1 - Math.pow(1 - exT, 3) : easeInOut(exT));
        // Scrolling hands the dots over to the molecules.
        const scatter = exNow * (1 - smooth(0, 0.12, m));
        if (exT < 1 && redraw) redraw();
        // The fingers ripple in a slow, endless wave, settling to rest as soon
        // as the page scrolls.
        const still = reduce ? 0 : (1 - smooth(0, 0.15, m)) * introT;
        for (let c = 0; c < curl.length; c++) curl[c] = waveAt(clock, c) * still;
        applyCurl(curl);

        ctx.clearRect(0, 0, w, h);
        const mobile = w < 640;
        // Desktop: the scene sits right of centre, resting just above the
        // floor, so the copy owns the left. Phones: it takes the upper half.
        const wide = w >= 1024;
        const cx = wide ? w * 0.67 : w / 2;
        const cy = h * (wide ? 0.5 : 0.3);
        const r = (mobile ? Math.min(w * 0.36, h * 0.19) : Math.min(w, h) * (wide ? 0.3 : 0.26)) * grow;
        // The hand is framed from its fingertips (just under the nav) to the
        // band; the forearm carries on off the bottom of the screen. On
        // phones it stops short of the copy instead. The molecules use `r`.
        const handTopY = h * (wide ? 0.16 : 0.18);
        const bandY = h * (wide ? 0.61 : 0.47);
        const scenePx = ((bandY - handTopY) / -handTop) * grow;
        const k = scenePx / r;
        const sceneDrop = (bandY - cy) / r;
        // Phones: fade the forearm out above the copy.
        const armFade0 = wide ? Infinity : h * 0.54;
        const armFade1 = wide ? Infinity : h * 0.62;

        // The floor meets the backdrop just under the scene on narrower
        // screens, where it sits high to leave room for the copy below it.
        const horizon = wide ? h * 0.68 : Math.min(h * 0.68, cy + r * 1.1);
        // The floor fades away in the dark.
        if (scatter < 1) {
          ctx.globalAlpha = 1 - scatter;
          drawFloor(p, w / 2, horizon);
          ctx.globalAlpha = 1;
        }

        // Soft contact shadow under the molecules. The arm runs off the
        // screen, so it only appears as they form.
        const sy = wide ? Math.max(horizon + (h - horizon) * 0.42, cy + r * 0.98) : cy + r * 1.12;
        const shadowR = r * 0.85;
        const shadow = ctx.createRadialGradient(cx, sy, 0, cx, sy, shadowR);
        shadow.addColorStop(0, `rgba(0,0,0,${0.09 * introT * m})`);
        shadow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.translate(cx, sy);
        ctx.scale(1, 0.14);
        ctx.translate(-cx, -sy);
        ctx.fillStyle = shadow;
        ctx.fillRect(cx - shadowR, sy - shadowR, shadowR * 2, shadowR * 2);
        ctx.restore();

        tiltX += (targetX - tiltX) * 0.045;
        tiltY += (targetY - tiltY) * 0.045;
        const cpy = Math.cos(tiltY);
        const spy = Math.sin(tiltY);
        const cpx = Math.cos(tiltX);
        const spx = Math.sin(tiltX);

        // A slow sway and float, as if the hand were held up to look at.
        const sway = reduce ? 0 : Math.sin(clock * 0.0045) * 0.22;
        const csw = Math.cos(sway);
        const ssw = Math.sin(sway);
        const bob = reduce ? 0 : Math.sin(clock * 0.012) * 0.025;

        // Molecule poses. Phones pull the centre one in so its arms stay on screen.
        const ms = mobile ? 0.9 : 1;
        const poses = [
          { cy: Math.cos(molSpin), sy: Math.sin(molSpin), cx: 1, sx: 0, s: MOLECULE_SCALE * ms, at: [0, 0, 0] },
          ...SATELLITES.map((sat, k) => {
            const ay = clock * sat.spin[0] + k * 1.3;
            const ax = clock * sat.spin[1] + k * 0.7;
            const float = reduce ? 0 : Math.sin(clock * 0.011 + k * 1.7) * 0.05;
            const at = wide ? sat.at : sat.compact;
            return {
              cy: Math.cos(ay),
              sy: Math.sin(ay),
              cx: Math.cos(ax),
              sx: Math.sin(ax),
              s: sat.scale * ms,
              at: [at[0], at[1] + float, at[2]],
            };
          }),
        ];

        const R2 = REPEL_RADIUS * REPEL_RADIUS;
        // The spectroscope's layout: the prism right of the copy, the beam
        // coming down into it from just under the nav, the strip at the
        // right edge.
        const spec = wide
          ? { px: w * 0.55, py: h * 0.47, size: Math.min(w, h) * 0.2, bx: w * 0.44, by: h * 0.13, sx: w * 0.92, y0: h * 0.2, y1: h * 0.8 }
          : { px: w * 0.34, py: h * 0.33, size: Math.min(w, h) * 0.3, bx: w * 0.04, by: h * 0.16, sx: w * 0.9, y0: h * 0.17, y1: h * 0.52 };
        const vIn = [
          spec.px + ((PRISM_VERTS[0][0] + PRISM_VERTS[1][0]) / 2) * spec.size,
          spec.py + ((PRISM_VERTS[0][1] + PRISM_VERTS[1][1]) / 2) * spec.size,
        ];
        const vOut = [
          spec.px + ((PRISM_VERTS[0][0] + PRISM_VERTS[2][0]) / 2) * spec.size,
          spec.py + ((PRISM_VERTS[0][1] + PRISM_VERTS[2][1]) / 2) * spec.size,
        ];
        // The sample: a glass cuvette standing in the fan, just tall enough
        // to catch every ray, with three glucose rings inside.
        const sampleX = vOut[0] + (spec.sx - vOut[0]) * SAMPLE_AT;
        const sampleTop = vOut[1] + (spec.y0 - vOut[1]) * SAMPLE_AT - 16;
        const sampleBot = vOut[1] + (spec.y1 - vOut[1]) * SAMPLE_AT + 16;
        const sampleW = Math.max(26, w * 0.026);
        const ringR = sampleW * 0.34;
        const ringY = (k: number) => sampleTop + (sampleBot - sampleTop) * (0.22 + k * 0.28);
        // The scan line sweeps the centre molecule's frame from top to bottom;
        // dots it crosses light up, as if the band's light were reading them.
        const scanning = !reduce && box.ready && since >= 0;
        const scanY = box.y0 + (box.y1 - box.y0) * scan;
        const satDim = 1 - 0.45 * lock;
        let nx0 = Infinity;
        let ny0 = Infinity;
        let nx1 = -Infinity;
        let ny1 = -Infinity;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const local = clamp01(m * 1.35 - delay[i]);
          const e = easeInOut(local);
          const isHand = kind[i] === HAND;

          // Scene position, swayed.
          const sx0 = base[i3] * k;
          const sz0 = base[i3 + 2] * k * SCENE_DEPTH;
          let t: number;
          const bx = sx0 * csw - sz0 * ssw;
          const bz = sx0 * ssw + sz0 * csw;
          const by = base[i3 + 1] * k + bob + sceneDrop;

          // How much the dot faces the viewer, for shading the solid form.
          let shade = 1;
          if (e < 1) {
            let nz = baseN[i3] * ssw + baseN[i3 + 2] * csw;
            const nx = baseN[i3] * csw - baseN[i3 + 2] * ssw;
            nz = nx * spy + nz * cpy;
            nz = baseN[i3 + 1] * spx + nz * cpx;
            shade = 1 - (1 - bandShade(nz)) * (1 - e);
          }

          // Molecule position in the world.
          const g = group[i];
          const pose = poses[g];
          let qx = target[i3];
          let qy = target[i3 + 1];
          let qz = target[i3 + 2];
          t = qx * pose.cy - qz * pose.sy;
          qz = qx * pose.sy + qz * pose.cy;
          qx = t;
          t = qy * pose.cx - qz * pose.sx;
          qz = qy * pose.sx + qz * pose.cx;
          qy = t;
          qx = qx * pose.s + pose.at[0];
          qy = qy * pose.s + pose.at[1];
          qz = qz * pose.s + pose.at[2];

          const sw = Math.sin(Math.PI * e) * 0.32;
          let x = bx + (qx - bx) * e + swirl[i3] * sw;
          let y = by + (qy - by) * e + swirl[i3 + 1] * sw;
          let z = bz + (qz - bz) * e + swirl[i3 + 2] * sw;

          // Lean toward the pointer.
          t = x * cpy - z * spy;
          z = x * spy + z * cpy;
          x = t;
          t = y * cpx - z * spx;
          z = y * spx + z * cpx;
          y = t;

          const persp = PERSPECTIVE / (PERSPECTIVE + z);
          const sx = cx + x * r * persp;
          const sy2 = cy + y * r * persp;

          // Scattered: fly out (with a little outward kick, staggered per dot)
          // into the spectroscope, where the light keeps flowing.
          let fx = sx;
          let fy = sy2;
          let sk = 0;
          let spAlpha = 0;
          if (scatter > 0) {
            sk = clamp01(scatter * 1.3 - scDelay[i]);
            sk = sk * sk * (3 - 2 * sk);
            const role = scRole[i];
            let tx: number;
            let ty: number;
            if (role === BEAM) {
              const u = (scPhase[i] + clock * 0.005) % 1;
              tx = spec.bx + (vIn[0] - spec.bx) * u + scJit[i] * 5;
              ty = spec.by + (vIn[1] - spec.by) * u + scJit[i] * 3;
              spAlpha = 0.85 * smooth(0, 0.08, u) * (1 - smooth(0.96, 1, u));
            } else if (role === PRISM || role === PRISM_FILL) {
              tx = spec.px + scU[i] * spec.size;
              ty = spec.py + scV[i] * spec.size;
              spAlpha = role === PRISM ? 0.6 : 0.16;
            } else if (role === SAMPLE) {
              // Around the cuvette's outline.
              const hgt = sampleBot - sampleTop;
              const per = 2 * (sampleW + hgt);
              let d = scU[i] * per;
              if (d < sampleW) {
                tx = sampleX - sampleW / 2 + d;
                ty = sampleTop;
              } else if ((d -= sampleW) < hgt) {
                tx = sampleX + sampleW / 2;
                ty = sampleTop + d;
              } else if ((d -= hgt) < sampleW) {
                tx = sampleX + sampleW / 2 - d;
                ty = sampleBot;
              } else {
                d -= sampleW;
                tx = sampleX - sampleW / 2;
                ty = sampleBot - d;
              }
              spAlpha = 0.5;
            } else if (role === MOLECULE) {
              // A little hexagonal glucose ring, turning slowly.
              const k = scU[i];
              const p6 = scV[i];
              const side = Math.floor(p6);
              const f = p6 - side;
              const spin = clock * 0.01 * (k === 1 ? -1 : 1) + k;
              const a0 = spin + (side * Math.PI) / 3;
              const a1 = a0 + Math.PI / 3;
              tx = sampleX + ringR * (Math.cos(a0) + (Math.cos(a1) - Math.cos(a0)) * f);
              ty = ringY(k) + ringR * (Math.sin(a0) + (Math.sin(a1) - Math.sin(a0)) * f);
              spAlpha = 0.95;
            } else {
              // Red deviates least (top of the strip), violet most (bottom).
              const ly = spec.y0 + (1 - scLam[i]) * (spec.y1 - spec.y0);
              if (role === FAN) {
                const u = (scPhase[i] + clock * 0.0035) % 1;
                const lam = scLam[i];
                const yAt = vOut[1] + (ly - vOut[1]) * u + scJit[i] * 4 * u;
                if (u > SAMPLE_AT && absorbed(lam)) {
                  // Absorbed: the ray breaks up inside the sample and is gone.
                  const k = (u - SAMPLE_AT) / 0.06;
                  tx = sampleX + scJit[i] * 10 * k;
                  ty = yAt + scJit[i] * 14 * k;
                  spAlpha = 0.95 * Math.max(0, 1 - k);
                } else if (u > SAMPLE_AT && reflected(lam)) {
                  // Reflected: it bounces off the glass and heads back out, up
                  // and away, clear of the rays coming in.
                  const back = u - SAMPLE_AT;
                  const hitY = vOut[1] + (ly - vOut[1]) * SAMPLE_AT;
                  tx = sampleX - back * (spec.sx - vOut[0]) * 0.8;
                  ty = hitY - back * (spec.y1 - spec.y0) * 0.95 + scJit[i] * 3;
                  spAlpha = 0.85 * (1 - smooth(SAMPLE_AT, 1, u));
                } else {
                  tx = vOut[0] + (spec.sx - vOut[0]) * u;
                  ty = yAt;
                  spAlpha = 0.75 * smooth(0, 0.06, u) * (1 - smooth(0.93, 1, u));
                }
              } else {
                tx = spec.sx + scJit[i] * 16 + Math.sin(clock * 0.02 + scPhase[i] * 9) * 1.2;
                ty = ly;
                // Missing colours: a gap for the reflected one; for absorbed ones,
                // dark lines by day and gaps by night.
                spAlpha = reflected(scLam[i]) || (dark && absorbed(scLam[i])) ? 0.05 : 0.9;
              }
            }
            const kx = sx - cx;
            const ky = sy2 - cy;
            const kl = Math.hypot(kx, ky) || 1;
            const kick = Math.sin(Math.PI * sk) * 70;
            fx = sx + (tx - sx) * sk + (kx / kl) * kick;
            fy = sy2 + (ty - sy2) * sk + (ky / kl) * kick;
          }

          const o = i * 2;
          if (!reduce) {
            const dx = fx + off[o] - mx;
            const dy = fy + off[o + 1] - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / REPEL_RADIUS) * 1.5;
              vel[o] += (dx / d) * f;
              vel[o + 1] += (dy / d) * f;
            }
            vel[o] = (vel[o] - off[o] * 0.05) * 0.86;
            vel[o + 1] = (vel[o + 1] - off[o + 1] * 0.05) * 0.86;
            off[o] += vel[o];
            off[o + 1] += vel[o + 1];
          }

          if (g === 0 && e > 0.95) {
            if (sx < nx0) nx0 = sx;
            if (sx > nx1) nx1 = sx;
            if (sy2 < ny0) ny0 = sy2;
            if (sy2 > ny1) ny1 = sy2;
          }

          // Satellites fade by depth within themselves, not across the scene,
          // so the far ones stay legible, just a little softer.
          const depthZ = g > 0 ? z - poses[g].at[2] * e : z;
          const front = clamp01((1 - depthZ) / 2);
          const depthFloor = 0.45 - 0.25 * e;
          let alpha = (depthFloor + (1 - depthFloor) * front) * introT * shade;
          if (isHand) {
            let armFade = 1;
            if (sy2 > armFade0) armFade = 1 - smooth(armFade0, armFade1, sy2);
            alpha *= 1 - (1 - HAND_ALPHA * fade[i] * armFade) * (1 - e);
          }
          // The sensor pod sits against the skin; worn, it barely shows.
          else if (kind[i] === BAND_KIND.pod) alpha *= 1 - 0.75 * (1 - e);
          let s = size[i] * persp * (0.8 + 0.4 * front) * (1 + 0.25 * e);
          if (g > 0) {
            alpha *= 1 - e * (1 - satDim * (1 - 0.1 * poses[g].at[2]));
            s *= 1 + 0.3 * e;
          }
          if (scanning && g === 0) {
            const d = Math.abs(sy2 - scanY);
            if (d < 16) {
              const kk = 1 - d / 16;
              alpha = Math.min(1, alpha + kk);
              s *= 1 + kk * 1.1;
            }
          }
          if (sk > 0) {
            // The spectroscope stays faint behind the copy.
            let fieldA = spAlpha * introT;
            if (wide) fieldA *= 0.3 + 0.7 * smooth(w * 0.34, w * 0.46, fx);
            else fieldA *= 1 - 0.7 * smooth(h * 0.56, h * 0.64, fy);
            alpha += (fieldA - alpha) * sk;
            s += (scS[i] - s) * sk;
          }
          px[i] = fx + off[o];
          py[i] = fy + off[o + 1];
          ps[i] = s;
          if (alpha < 0.01) continue;
          ctx.globalAlpha = alpha;
          let sprite = spriteSet[spriteFor[i]][Math.round(e * (COLOR_STEPS - 1))];
          if (sk > 0.4 && e < 0.5) {
            const role = scRole[i];
            if (role === MOLECULE) {
              // The ring's oxygen in red, its carbons in ink.
              sprite = scV[i] < 0.35 || scV[i] > 5.65 ? spriteSet[0][0] : inkDot;
            } else {
              const unlit = role <= SAMPLE || (role === STRIP && absorbed(scLam[i]));
              sprite = unlit ? inkDot : spectrum[Math.round(scLam[i] * (spectrum.length - 1))];
            }
          }
          ctx.drawImage(sprite, px[i] - s / 2, py[i] - s / 2, s, s);
        }

        // The sensor's light, glowing through the strap into the wrist, fading
        // as the band comes apart.
        if (m < 1) {
          for (let j = 0; j < leds.length; j++) {
            const i = leds[j];
            const f = 1 - easeInOut(clamp01(m * 1.35 - delay[i]));
            if (f <= 0) continue;
            const pulse = reduce ? 0.8 : 0.7 + 0.3 * Math.sin(clock * 0.045 + j * 0.8);
            const gs = ps[i] * 7;
            ctx.globalAlpha = 0.35 * f * pulse * introT * (1 - scatter);
            ctx.drawImage(glow, px[i] - gs / 2, py[i] - gs / 2, gs, gs);
          }
        }
        // Scattered: the glucose in the sample glows softly as it absorbs.
        if (scatter > 0.3) {
          for (let k = 0; k < 3; k++) {
            const gs = ringR * 7;
            ctx.globalAlpha = 0.45 * scatter * (1 - m) * (0.55 + 0.45 * Math.sin(clock * 0.06 + k * 2.1));
            ctx.drawImage(glow, sampleX - gs / 2, ringY(k) - gs / 2, gs, gs);
          }
        }
        ctx.globalAlpha = 1;

        // Track the centre molecule's bounds (smoothed, since it keeps turning).
        if (nx1 > nx0) {
          if (!box.ready) {
            Object.assign(box, { x0: nx0, y0: ny0, x1: nx1, y1: ny1, ready: true });
          } else {
            const kb = 0.12;
            box.x0 += (nx0 - box.x0) * kb;
            box.y0 += (ny0 - box.y0) * kb;
            box.x1 += (nx1 - box.x1) * kb;
            box.y1 += (ny1 - box.y1) * kb;
          }
        } else {
          box.ready = false;
        }

        if (box.ready && lock > 0) drawDetection(lock, scanning ? scan : -1, scanDir, detected);
      };

      // Lock-on frame, scan line and readouts around the centre molecule.
      const drawDetection = (lock: number, scan: number, dir: number, detected: boolean) => {
        const pad = 26 + (1 - lock) * 60;
        const x0 = box.x0 - pad;
        const y0 = box.y0 - pad;
        const x1 = box.x1 + pad;
        const y1 = box.y1 + pad;
        const arm = 22;

        ctx.save();
        ctx.globalAlpha = lock;
        ctx.strokeStyle = txt.strong;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x0, y0 + arm);
        ctx.lineTo(x0, y0);
        ctx.lineTo(x0 + arm, y0);
        ctx.moveTo(x1 - arm, y0);
        ctx.lineTo(x1, y0);
        ctx.lineTo(x1, y0 + arm);
        ctx.moveTo(x1, y1 - arm);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x1 - arm, y1);
        ctx.moveTo(x0 + arm, y1);
        ctx.lineTo(x0, y1);
        ctx.lineTo(x0, y1 - arm);
        ctx.stroke();

        // Scan line with a soft glow trailing behind it.
        if (scan >= 0) {
          const sy = box.y0 + (box.y1 - box.y0) * scan;
          const tail = sy - dir * 48;
          const glow = ctx.createLinearGradient(0, tail, 0, sy);
          glow.addColorStop(0, rgba(red, 0));
          glow.addColorStop(1, rgba(red, dark ? 0.16 : 0.12));
          ctx.fillStyle = glow;
          ctx.fillRect(x0, Math.min(tail, sy), x1 - x0, 48);
          ctx.strokeStyle = rgba(red, 0.9);
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.moveTo(x0, sy);
          ctx.lineTo(x1, sy);
          ctx.stroke();
        }

        // Status above the frame; trend readout below once detected.
        ctx.font = `500 12.5px ${fontFamily}`;
        ctx.textBaseline = "alphabetic";
        if (detected) {
          ctx.fillStyle = rgba(red);
          ctx.beginPath();
          ctx.arc(x0 + 4, y0 - 14, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = txt.strong;
          ctx.fillText("Glucose detected", x0 + 14, y0 - 10);

          ctx.textAlign = "right";
          ctx.fillStyle = txt.body;
          ctx.fillText("Trend: rising", x1 - 16, y1 + 22);
          ctx.strokeStyle = rgba(red);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1 - 8, y1 + 23);
          ctx.lineTo(x1 - 8, y1 + 12);
          ctx.moveTo(x1 - 12, y1 + 16);
          ctx.lineTo(x1 - 8, y1 + 12);
          ctx.lineTo(x1 - 4, y1 + 16);
          ctx.stroke();
          ctx.textAlign = "left";
        } else {
          ctx.fillStyle = txt.muted;
          ctx.fillText(scan >= 0 ? "Reading glucose" : "Locking on", x0, y0 - 10);
        }
        ctx.restore();
      };

      const loop = () => {
        // Slow the centre molecule's spin as it forms so the scan reads cleanly.
        const settle = smooth(HERO_TIMELINE.morph[0], HERO_TIMELINE.morph[1], progress());
        clock++;
        molSpin += 0.0022 * (1 - 0.65 * settle);
        if (intro < 1) intro = Math.min(1, intro + 1 / 84);
        draw();
        raf = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(loop);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      const onPointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
          mx = my = -1e5;
          targetX = targetY = 0;
          return;
        }
        mx = x;
        my = y;
        targetY = (x / rect.width - 0.5) * 0.7;
        targetX = (y / rect.height - 0.5) * 0.45;
      };
      const onPointerLeave = () => {
        mx = my = -1e5;
        targetX = targetY = 0;
      };
      // When the loop isn't running (reduced motion, background tab), still
      // follow the scroll so the morph matches the page.
      const onScroll = () => {
        if (!running) draw();
      };

      resize();
      draw();
      // Toggling the scatter while the loop is paused (reduced motion) still
      // needs a frame; while the tween runs, keep drawing.
      const redrawFrame = () => {
        if (!running) requestAnimationFrame(() => draw());
      };
      redraw = redrawFrame;
      redrawRef.current = redrawFrame;

      const offTheme = onThemeChange((d) => {
        dark = d;
        txt = canvasText(d);
        spriteSet = makeSets();
        inkDot = spriteSet[3 + ELEMENTS.indexOf("C")][0];
        red = dotRed(d);
        glow = makeGlow(red);
        spectrum = spectrumSteps(d).map((c) => makeSprite(c));
        if (!running) draw();
      });

      const ro = new ResizeObserver(() => {
        resize();
        draw();
      });
      ro.observe(canvas);

      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !document.hidden && !reduce) start();
        else stop();
      });
      io.observe(canvas);

      const onVisibility = () => (document.hidden || reduce ? stop() : start());
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);

      return () => {
        stop();
        redrawRef.current = null;
        offTheme();
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("scroll", onScroll);
        document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      };
    };

    // The hand is sampled ahead of time; fall back to sampling a lighter one
    // here if the file can't be fetched.
    let cancelled = false;
    let teardown: (() => void) | undefined;
    fetch(HAND_CLOUD_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`hand cloud: ${res.status}`);
        return res.arrayBuffer();
      })
      .then((buf) => decodeHandCloud(buf, small ? 2400 : 6000))
      .catch(() => sampleHand(small ? 1200 : 2400))
      .then((hand) => {
        if (!cancelled) teardown = build(hand);
      });
    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [trackRef]);

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />;
}
