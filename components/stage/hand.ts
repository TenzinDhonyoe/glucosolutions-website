// A raised hand and forearm as a cloud of dots, for the band to be worn on.
//
// The shape is a signed distance field: tapered capsules for the fingers and
// thumb, ellipsoids for the palm and thenar pad, and a tapering elliptical
// cylinder for the forearm, all blended with smooth unions so knuckles and
// wrist flow into each other. Dots are thrown onto the surface, projected onto
// it along the field's gradient, then thinned to an even blue-noise spread.
//
// Coordinates share the band's units (the band loop is 2 wide) with the
// wrist at the origin: the forearm runs along +X, the fingers point along −X,
// the back of the hand faces +Y and the thumb is on +Z. The hand itself is
// built straight, then tipped back at the wrist (`WRIST_BEND`).

type V = [number, number, number];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smin = (a: number, b: number, k: number) => {
  const h = clamp(0.5 + (0.5 * (b - a)) / k, 0, 1);
  return b + (a - b) * h - k * h * (1 - h);
};

/** A tapered capsule, and the bone that moves it (0 for the static palm). */
type Capsule = { a: V; b: V; ra: number; rb: number; k: number; bone: number };

function capsule(p: V, c: Capsule) {
  const pa0 = p[0] - c.a[0];
  const pa1 = p[1] - c.a[1];
  const pa2 = p[2] - c.a[2];
  const ba0 = c.b[0] - c.a[0];
  const ba1 = c.b[1] - c.a[1];
  const ba2 = c.b[2] - c.a[2];
  const h = clamp((pa0 * ba0 + pa1 * ba1 + pa2 * ba2) / (ba0 * ba0 + ba1 * ba1 + ba2 * ba2), 0, 1);
  return Math.hypot(pa0 - ba0 * h, pa1 - ba1 * h, pa2 - ba2 * h) - (c.ra + (c.rb - c.ra) * h);
}

/** Where along a capsule a point projects, 0 at `a` to 1 at `b`. */
function capsuleT(p: V, c: Capsule) {
  const ba0 = c.b[0] - c.a[0];
  const ba1 = c.b[1] - c.a[1];
  const ba2 = c.b[2] - c.a[2];
  const pa = (p[0] - c.a[0]) * ba0 + (p[1] - c.a[1]) * ba1 + (p[2] - c.a[2]) * ba2;
  return clamp(pa / (ba0 * ba0 + ba1 * ba1 + ba2 * ba2), 0, 1);
}

function ellipsoid(p: V, c: V, r: V) {
  const q0 = (p[0] - c[0]) / r[0];
  const q1 = (p[1] - c[1]) / r[1];
  const q2 = (p[2] - c[2]) / r[2];
  const k0 = Math.hypot(q0, q1, q2);
  const k1 = Math.hypot(q0 / r[0], q1 / r[1], q2 / r[2]);
  return k1 > 0 ? (k0 * (k0 - 1)) / k1 : -Math.min(...r);
}

/**
 * Forearm cross-section at distance x from the wrist. Anatomically the wrist
 * end is mostly tendon, flat and oval (about 5.8 × 4 cm); the muscle bulk
 * builds up the arm to its widest about two-thirds of the way to the elbow
 * (about 9.5 × 8 cm), and the section rounds out as it thickens.
 */
function forearmRadii(x: number): [number, number] {
  const t = clamp(x / 5.6, 0, 1);
  const s = t * t * (3 - 2 * t);
  return [0.62 + 0.6 * s, 0.9 + 0.55 * s];
}

/** Forearm: an elliptical cylinder that fills out toward the elbow. */
const FOREARM_END = 5.8;
function forearm(p: V) {
  const [ry, rz] = forearmRadii(p[0]);
  const q1 = p[1] / ry;
  const q2 = p[2] / rz;
  const k0 = Math.hypot(q1, q2);
  const k1 = Math.hypot(q1 / ry, q2 / rz);
  const side = k1 > 0 ? (k0 * (k0 - 1)) / k1 : -ry;
  return Math.max(side, -0.3 - p[0], p[0] - FOREARM_END - 1);
}

// A relaxed raised hand: fingers curled in, each one folding a little more
// than the last (index least, little finger most), the thumb resting beside
// the index, the way a hand rests when it isn't doing anything. Per finger:
// knuckle, spread (radians toward the thumb), length, base and tip radius,
// joint bends at rest (knuckle, middle, end), and the bends of a closed fist.
const FINGERS: { knuckle: V; spread: number; len: number; r0: number; r1: number; bend: V; fist: V }[] = [
  { knuckle: [-3.0, 0.1, 0.9], spread: 0.17, len: 2.09, r0: 0.26, r1: 0.19, bend: [0.32, 0.55, 0.35], fist: [1.35, 1.55, 0.9] },
  { knuckle: [-3.14, 0.12, 0.3], spread: 0.03, len: 2.33, r0: 0.27, r1: 0.2, bend: [0.42, 0.7, 0.42], fist: [1.45, 1.65, 0.95] },
  { knuckle: [-3.04, 0.1, -0.3], spread: -0.11, len: 2.19, r0: 0.25, r1: 0.18, bend: [0.52, 0.82, 0.5], fist: [1.45, 1.65, 0.95] },
  { knuckle: [-2.8, 0.05, -0.86], spread: -0.24, len: 1.76, r0: 0.21, r1: 0.15, bend: [0.62, 0.92, 0.55], fist: [1.45, 1.6, 0.9] },
];
const SEGMENTS = [0.45, 0.3, 0.25];

/**
 * One finger (or the thumb) as a chain of three bones for the fist flex.
 * Every joint bends about the same `axis`, by `flex` radians more when the
 * hand is fully closed. Bone ids are `1 + chain * 3 + segment`.
 */
export type HandChain = { joints: [V, V, V]; axis: V; flex: V };

const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const norm = (a: V): V => {
  const l = Math.hypot(...a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

function buildHand() {
  const caps: Capsule[] = [];
  const chains: HandChain[] = [];
  // Metacarpals give the back of the hand its ridges toward the knuckles.
  const bases: V[] = [
    [-0.55, 0.12, 0.42],
    [-0.55, 0.14, 0.14],
    [-0.55, 0.12, -0.14],
    [-0.55, 0.1, -0.4],
  ];
  const palmward: V = [0, -1, 0];
  FINGERS.forEach((f, i) => {
    caps.push({ a: bases[i], b: f.knuckle, ra: 0.24, rb: f.r0 + 0.02, k: 0.3, bone: 0 });
    let p = f.knuckle;
    let pitch = 0;
    let r = f.r0;
    const joints: V[] = [];
    SEGMENTS.forEach((share, s) => {
      joints.push(p);
      pitch += f.bend[s];
      const l = f.len * share;
      const dir: V = [-Math.cos(f.spread) * Math.cos(pitch), -Math.sin(pitch), Math.sin(f.spread) * Math.cos(pitch)];
      const q: V = [p[0] + dir[0] * l, p[1] + dir[1] * l, p[2] + dir[2] * l];
      const rNext = f.r0 + (f.r1 - f.r0) * ((s + 1) / SEGMENTS.length);
      caps.push({ a: p, b: q, ra: r, rb: rNext, k: s === 0 ? 0.16 : 0.06, bone: 1 + i * 3 + s });
      p = q;
      r = rNext;
    });
    // Rotating about dir × palmward turns the finger toward the palm.
    const dir0: V = [-Math.cos(f.spread), 0, Math.sin(f.spread)];
    chains.push({
      joints: joints as [V, V, V],
      axis: norm(cross(dir0, palmward)),
      flex: [f.fist[0] - f.bend[0], f.fist[1] - f.bend[1], f.fist[2] - f.bend[2]],
    });
  });
  // Thumb: metacarpal, then two phalanges, resting alongside the index
  // finger rather than splayed out. In a fist it folds down and across the
  // palm toward the other fingers.
  const thumb: [V, number][] = [
    [[-0.6, -0.1, 0.6], 0.36],
    [[-1.4, -0.35, 1.2], 0.31],
    [[-2.0, -0.5, 1.45], 0.27],
    [[-2.5, -0.62, 1.55], 0.2],
  ];
  for (let i = 0; i < thumb.length - 1; i++) {
    caps.push({
      a: thumb[i][0],
      b: thumb[i + 1][0],
      ra: thumb[i][1],
      rb: thumb[i + 1][1],
      k: i === 0 ? 0.3 : 0.06,
      bone: 13 + i,
    });
  }
  chains.push({
    joints: [thumb[0][0], thumb[1][0], thumb[2][0]],
    axis: norm(cross(norm(sub(thumb[1][0], thumb[0][0])), norm([-0.3, -0.6, -0.75]))),
    flex: [0.35, 0.5, 0.65],
  });
  return { caps, chains };
}

const { caps: CAPSULES, chains: CHAINS } = buildHand();
/** The finger and thumb chains, in the straight hand's frame. */
export const HAND_CHAINS: readonly HandChain[] = CHAINS;
const PALM: { c: V; r: V } = { c: [-1.72, 0.02, 0.04], r: [1.45, 0.42, 1.2] };
const THENAR: { c: V; r: V } = { c: [-1.3, -0.2, 0.72], r: [0.85, 0.36, 0.5] };

/** The hand tips back at the wrist by this much (radians), as when raised. */
const WRIST_BEND = 0.36;
const PIVOT = -0.25;
const cb = Math.cos(WRIST_BEND);
const sb = Math.sin(WRIST_BEND);
/** World point to the straight hand's frame. */
export const toHand = (p: V): V => {
  const x = p[0] - PIVOT;
  return [x * cb - p[1] * sb + PIVOT, x * sb + p[1] * cb, p[2]];
};
/** The straight hand's frame to world. */
export const toWorld = (p: V): V => {
  const x = p[0] - PIVOT;
  return [x * cb + p[1] * sb + PIVOT, -x * sb + p[1] * cb, p[2]];
};

function sdf(p: V) {
  let d = forearm(p);
  const q = toHand(p);
  d = smin(d, ellipsoid(q, PALM.c, PALM.r), 0.5);
  d = smin(d, ellipsoid(q, THENAR.c, THENAR.r), 0.3);
  for (const c of CAPSULES) d = smin(d, capsule(q, c), c.k);
  return d;
}

function gradient(p: V): V {
  const e = 0.002;
  const k = sdf;
  // Tetrahedral finite differences: four evaluations instead of six.
  const a = k([p[0] + e, p[1] - e, p[2] - e]);
  const b = k([p[0] - e, p[1] - e, p[2] + e]);
  const c = k([p[0] - e, p[1] + e, p[2] - e]);
  const d = k([p[0] + e, p[1] + e, p[2] + e]);
  const g: V = [a - b - c + d, -a - b + c + d, -a + b - c + d];
  const l = Math.hypot(...g) || 1;
  return [g[0] / l, g[1] / l, g[2] / l];
}

export type HandCloud = {
  pos: Float32Array;
  normal: Float32Array;
  /** 0–1 visibility, fading the forearm out toward the elbow. */
  fade: Float32Array;
  /** Distance from the wrist, 0–1, for the order the hand comes apart in. */
  fromWrist: Float32Array;
  /** The bone each dot rides on (0: palm and forearm, static). */
  bone: Uint8Array;
  /** How far along its bone the dot sits, 0 (at its joint) to 1. */
  boneT: Float32Array;
  count: number;
};

/** The bone a surface point belongs to: whichever part of the hand it's nearest. */
function boneOf(p: V): [number, number] {
  const q = toHand(p);
  let best = Math.min(forearm(p), ellipsoid(q, PALM.c, PALM.r), ellipsoid(q, THENAR.c, THENAR.r));
  let bone = 0;
  let t = 0;
  for (const c of CAPSULES) {
    const d = capsule(q, c);
    if (d < best) {
      best = d;
      bone = c.bone;
      t = capsuleT(q, c);
    }
  }
  return [bone, t];
}

/** Where the forearm starts fading, and where it's gone. */
const FADE_FROM = 2.4;
const FADE_TO = 5.4;
/** Keep the wrist under the band clear of dots so the strap reads cleanly. */
const BAND_CLEAR = 0.27;

export function sampleHand(target: number, rand: () => number = Math.random): HandCloud {
  // Candidate points on each primitive, weighted by rough surface area.
  const sources: { w: number; pick: () => V }[] = [
    {
      w: 42,
      pick: () => {
        const x = -0.2 + rand() * (FADE_TO + 0.2);
        const a = rand() * Math.PI * 2;
        const [ry, rz] = forearmRadii(x);
        return [x, Math.sin(a) * ry, Math.cos(a) * rz];
      },
    },
    {
      w: 16,
      pick: () => {
        const a = rand() * Math.PI * 2;
        const b = Math.acos(2 * rand() - 1);
        return toWorld([
          PALM.c[0] + Math.sin(b) * Math.cos(a) * PALM.r[0],
          PALM.c[1] + Math.cos(b) * PALM.r[1],
          PALM.c[2] + Math.sin(b) * Math.sin(a) * PALM.r[2],
        ]);
      },
    },
    ...CAPSULES.map((c) => ({
      w: Math.hypot(c.b[0] - c.a[0], c.b[1] - c.a[1], c.b[2] - c.a[2]) * (c.ra + c.rb) * Math.PI,
      pick: (): V => {
        const t = rand();
        const a = rand() * Math.PI * 2;
        const r = c.ra + (c.rb - c.ra) * t;
        return toWorld([
          c.a[0] + (c.b[0] - c.a[0]) * t + Math.cos(a) * r,
          c.a[1] + (c.b[1] - c.a[1]) * t + Math.sin(a) * r,
          c.a[2] + (c.b[2] - c.a[2]) * t + Math.cos(a + 1.3) * r * 0.5,
        ]);
      },
    })),
  ];
  const totalW = sources.reduce((s, v) => s + v.w, 0);
  const pickSource = () => {
    let x = rand() * totalW;
    for (const s of sources) if ((x -= s.w) <= 0) return s;
    return sources[sources.length - 1];
  };

  // Throw candidates and pull each onto the surface.
  const candidates: { p: V; n: V }[] = [];
  const want = target * 3;
  for (let tries = 0; candidates.length < want && tries < want * 3; tries++) {
    let p = pickSource().pick();
    let ok = false;
    for (let it = 0; it < 8; it++) {
      const d = sdf(p);
      if (Math.abs(d) < 0.004) {
        ok = true;
        break;
      }
      const g = gradient(p);
      p = [p[0] - g[0] * d, p[1] - g[1] * d, p[2] - g[2] * d];
    }
    if (!ok) continue;
    if (p[0] > FADE_TO || Math.abs(p[0]) < BAND_CLEAR) continue;
    // Thin the forearm as it fades so it trails off rather than stopping.
    const fade = 1 - clamp((p[0] - FADE_FROM) / (FADE_TO - FADE_FROM), 0, 1);
    if (rand() > 0.25 + 0.75 * fade) continue;
    candidates.push({ p, n: gradient(p) });
  }

  // Blue-noise thinning: accept a candidate only if no accepted dot is
  // closer than `minD`; relax the spacing until we have enough.
  const cell = 0.2;
  const grid = new Map<string, V[]>();
  const key = (x: number, y: number, z: number) => `${x},${y},${z}`;
  const accepted: { p: V; n: V }[] = [];
  const used = new Uint8Array(candidates.length);
  let minD = 0.17;
  while (accepted.length < target && minD > 0.02) {
    for (let i = 0; i < candidates.length && accepted.length < target; i++) {
      if (used[i]) continue;
      const { p } = candidates[i];
      // Fingers and thumb are thin, so they get a finer spacing to keep
      // enough dots around them to read as round.
      const h = toHand(p);
      const fine = h[0] < -2.75 || (h[2] > 1.1 && h[0] < -1.3) ? 0.6 : 1;
      const gx = Math.floor(p[0] / cell);
      const gy = Math.floor(p[1] / cell);
      const gz = Math.floor(p[2] / cell);
      let clear = true;
      for (let dx = -1; dx <= 1 && clear; dx++)
        for (let dy = -1; dy <= 1 && clear; dy++)
          for (let dz = -1; dz <= 1 && clear; dz++) {
            const bucket = grid.get(key(gx + dx, gy + dy, gz + dz));
            if (!bucket) continue;
            for (const q of bucket) {
              if (Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < minD * fine) {
                clear = false;
                break;
              }
            }
          }
      if (!clear) continue;
      used[i] = 1;
      accepted.push(candidates[i]);
      const k = key(gx, gy, gz);
      const bucket = grid.get(k);
      if (bucket) bucket.push(p);
      else grid.set(k, [p]);
    }
    minD *= 0.88;
  }

  const count = accepted.length;
  const pos = new Float32Array(count * 3);
  const normal = new Float32Array(count * 3);
  const fade = new Float32Array(count);
  const fromWrist = new Float32Array(count);
  const bone = new Uint8Array(count);
  const boneT = new Float32Array(count);
  const reach = FADE_TO + 0.5;
  accepted.forEach(({ p, n }, i) => {
    pos.set(p, i * 3);
    normal.set(n, i * 3);
    fade[i] = 1 - clamp((p[0] - FADE_FROM) / (FADE_TO - FADE_FROM), 0, 1);
    fromWrist[i] = Math.min(1, Math.hypot(p[0], p[1] * 0.5, p[2] * 0.5) / reach);
    [bone[i], boneT[i]] = boneOf(p);
  });
  return { pos, normal, fade, fromWrist, bone, boneT, count };
}

// The cloud is sampled ahead of time (scripts/generate-hand-cloud.mjs) and
// shipped as a small binary file, because sampling takes long enough to stall
// a phone. Layout: a Uint32 dot count, then nine Int16 per dot: position
// (×POS_Q), normal, fade and distance from the wrist (×UNIT_Q), and the bone
// (high byte) with the position along it (low byte, ×255). Dots are in
// acceptance order, so any prefix is still an even spread.
export const HAND_CLOUD_URL = "/hand-cloud.bin";
const POS_Q = 4000;
const UNIT_Q = 32000;

export function encodeHandCloud(c: HandCloud): ArrayBuffer {
  const buf = new ArrayBuffer(4 + c.count * 18);
  new DataView(buf).setUint32(0, c.count, true);
  const v = new Int16Array(buf, 4);
  for (let i = 0; i < c.count; i++) {
    const o = i * 9;
    for (let k = 0; k < 3; k++) {
      v[o + k] = Math.round(c.pos[i * 3 + k] * POS_Q);
      v[o + 3 + k] = Math.round(c.normal[i * 3 + k] * UNIT_Q);
    }
    v[o + 6] = Math.round(c.fade[i] * UNIT_Q);
    v[o + 7] = Math.round(c.fromWrist[i] * UNIT_Q);
    v[o + 8] = c.bone[i] * 256 + Math.round(c.boneT[i] * 255);
  }
  return buf;
}

export function decodeHandCloud(buf: ArrayBuffer, limit = Infinity): HandCloud {
  const count = Math.min(limit, new DataView(buf).getUint32(0, true));
  const v = new Int16Array(buf, 4, count * 9);
  const pos = new Float32Array(count * 3);
  const normal = new Float32Array(count * 3);
  const fade = new Float32Array(count);
  const fromWrist = new Float32Array(count);
  const bone = new Uint8Array(count);
  const boneT = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const o = i * 9;
    for (let k = 0; k < 3; k++) {
      pos[i * 3 + k] = v[o + k] / POS_Q;
      normal[i * 3 + k] = v[o + 3 + k] / UNIT_Q;
    }
    fade[i] = v[o + 6] / UNIT_Q;
    fromWrist[i] = v[o + 7] / UNIT_Q;
    bone[i] = v[o + 8] >> 8;
    boneT[i] = (v[o + 8] & 255) / 255;
  }
  return { pos, normal, fade, fromWrist, bone, boneT, count };
}
