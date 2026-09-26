// The wristband as a cloud of dots, shared by the hero canvas and the still
// SVG frame. Coordinates are unitless: the strap loops around the Y axis in
// the XZ plane (half-widths 1 × 0.78). Its cross-section is a rounded
// rectangle, 0.44 tall and 0.1 thick, so the edges read as a soft moulded
// strap rather than a ribbon. The clasp gap faces the viewer (−Z) and the
// sensor pod sits on the inside of the far side (+Z), as in the product render.
//
// Every dot carries a surface normal so the renderer can shade the strap:
// dots facing the viewer are solid, dots facing away fall back.

/** Dot roles. Strap dots are red; the sensor pod, clasp and logo are ink. */
export const BAND_KIND = { strap: 0, ink: 1, led: 2, pod: 3 } as const;

const A = 1;
const B = 0.78;
const HALF_H = 0.22;
const HALF_T = 0.05;
const CORNER = 0.042;
const CLASP = 0.075; // radians of ink at each end of the strap

// Sensor pod: a raised pill on the inside of the strap.
const POD_L = 0.24; // half-length along the strap
const POD_H = 0.072; // half-height
const POD_RISE = 0.024;

// Light sources in the pod: [arc offset, height offset, large].
const LEDS: [number, number, number][] = [
  [-0.19, -0.03, 0],
  [-0.19, 0.03, 0],
  [-0.125, 0, 0],
  [-0.062, 0, 1],
  [0, 0, 0],
  [0.062, 0, 1],
  [0.125, 0, 0],
  [0.19, -0.03, 0],
  [0.19, 0.03, 0],
];

const GOLDEN = (Math.sqrt(5) - 1) / 2;

export type BandCloud = {
  pos: Float32Array;
  /** Unit surface normal per dot. */
  normal: Float32Array;
  kind: Uint8Array;
  /** 1 for the two large LEDs. */
  big: Uint8Array;
  /** Distance along the strap from the sensor, 0 (sensor) to 1 (clasp). */
  fromSensor: Float32Array;
};

/**
 * A point on the strap's rounded-rectangle cross-section, `q` in [0, 1)
 * around the perimeter. Returns [offset along the outward normal, height,
 * normal's outward part, normal's vertical part].
 */
function crossSection(q: number): [number, number, number, number] {
  const fx = HALF_T - CORNER;
  const fy = HALF_H - CORNER;
  const arc = (Math.PI / 2) * CORNER;
  const segs = [2 * fy, arc, 2 * fx, arc, 2 * fy, arc, 2 * fx, arc];
  const total = segs.reduce((s, v) => s + v, 0);
  let d = q * total;
  let i = 0;
  while (i < segs.length - 1 && d > segs[i]) d -= segs[i++];
  const f = d / segs[i];
  const corner = (cx: number, cy: number, a0: number): [number, number, number, number] => {
    const a = a0 + f * (Math.PI / 2);
    return [cx + Math.cos(a) * CORNER, cy + Math.sin(a) * CORNER, Math.cos(a), Math.sin(a)];
  };
  switch (i) {
    case 0:
      return [HALF_T, -fy + f * 2 * fy, 1, 0];
    case 1:
      return corner(fx, fy, 0);
    case 2:
      return [fx - f * 2 * fx, HALF_H, 0, 1];
    case 3:
      return corner(-fx, fy, Math.PI / 2);
    case 4:
      return [-HALF_T, fy - f * 2 * fy, -1, 0];
    case 5:
      return corner(-fx, -fy, Math.PI);
    case 6:
      return [-fx + f * 2 * fx, -HALF_H, 0, -1];
    default:
      return corner(fx, -fy, (Math.PI * 3) / 2);
  }
}

/**
 * Where the clasp gap and the hexagon mark sit around the loop (radians; 0 is
 * the +X end of the loop, π/2 the far side). The sensor pod sits opposite the
 * gap. By default the gap faces the viewer and the mark sits beside it.
 * `gapHalf` is half the gap's width; a worn band is fastened, so nearly 0.
 */
export type BandLayout = { gapAt?: number; gapHalf?: number; markAt?: number };

export function sampleBand(
  count: number,
  rand: () => number = Math.random,
  { gapAt = -Math.PI / 2, gapHalf = 0.21, markAt }: BandLayout = {}
): BandCloud {
  const GAP_AT = gapAt;
  const GAP_HALF = gapHalf;
  const SENSOR_AT = gapAt + Math.PI;
  // Arc-length table for the ellipse so dots spread evenly along the strap.
  const N = 720;
  const theta0 = GAP_AT + GAP_HALF;
  const span = Math.PI * 2 - GAP_HALF * 2;
  const lens = new Float32Array(N + 1);
  for (let i = 1; i <= N; i++) {
    const t0 = theta0 + (span * (i - 1)) / N;
    const t1 = theta0 + (span * i) / N;
    lens[i] = lens[i - 1] + Math.hypot(A * (Math.cos(t1) - Math.cos(t0)), B * (Math.sin(t1) - Math.sin(t0)));
  }
  const total = lens[N];
  const thetaAt = (s: number) => {
    const target = Math.min(total, Math.max(0, s));
    let lo = 0;
    let hi = N;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (lens[mid] < target) lo = mid;
      else hi = mid;
    }
    const f = (target - lens[lo]) / (lens[hi] - lens[lo] || 1);
    return theta0 + (span * (lo + f)) / N;
  };
  const lengthAt = (theta: number) => {
    const TAU = Math.PI * 2;
    const rel = (((theta - theta0) % TAU) + TAU) % TAU;
    const i = Math.round((rel / span) * N);
    return lens[Math.min(N, Math.max(0, i))];
  };
  const sensorS = lengthAt(SENSOR_AT);

  const pos = new Float32Array(count * 3);
  const normal = new Float32Array(count * 3);
  const kind = new Uint8Array(count);
  const big = new Uint8Array(count);
  const fromSensor = new Float32Array(count);
  let n = 0;

  /**
   * Place a dot at strap angle θ, `off` along the outward normal and height
   * v, with a normal made of `no` parts outward, `nv` up and `nt` along the
   * strap.
   */
  const put = (theta: number, off: number, v: number, k: number, no: number, nv: number, nt = 0) => {
    if (n >= count) return;
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    let ox = B * c;
    let oz = A * s;
    const ol = Math.hypot(ox, oz);
    ox /= ol;
    oz /= ol;
    // Tangent along the strap (direction of increasing θ).
    const tx = -oz;
    const tz = ox;
    pos[n * 3] = A * c + ox * off;
    pos[n * 3 + 1] = v;
    pos[n * 3 + 2] = B * s + oz * off;
    const nx = ox * no + tx * nt;
    const nz = oz * no + tz * nt;
    const nl = Math.hypot(nx, nv, nz) || 1;
    normal[n * 3] = nx / nl;
    normal[n * 3 + 1] = nv / nl;
    normal[n * 3 + 2] = nz / nl;
    // Angular distance from the sensor, 0 to π, whichever way round.
    const d = Math.abs(((((theta - SENSOR_AT) % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    fromSensor[n] = d / Math.PI;
    const nearEnd = theta - theta0 < CLASP || theta0 + span - theta < CLASP;
    kind[n] = k === BAND_KIND.strap && nearEnd ? BAND_KIND.ink : k;
    n++;
  };

  const share = (f: number) => Math.round(count * f);

  // Sensor pod first so it claims its dots before the strap fills the rest:
  // a raised ink pill with a crisp rim, LEDs on top.
  const inPill = (s: number, v: number, l: number, h: number) => {
    const ex = Math.max(0, Math.abs(s) - (l - h));
    return ex * ex + v * v <= h * h;
  };
  const pod = share(0.055);
  for (let placed = 0; placed < pod; ) {
    const s = (rand() * 2 - 1) * POD_L;
    const v = (rand() * 2 - 1) * POD_H;
    if (!inPill(s, v, POD_L, POD_H)) continue;
    put(thetaAt(sensorS + s), -HALF_T - POD_RISE, v, BAND_KIND.pod, -1, 0);
    placed++;
  }
  const podRim = share(0.02);
  for (let i = 0; i < podRim; i++) {
    // Walk the stadium outline: two straight sides and two half circles.
    const straight = 2 * (POD_L - POD_H);
    const perim = 2 * straight + 2 * Math.PI * POD_H;
    let d = ((i + 0.5) / podRim) * perim;
    let s: number;
    let v: number;
    if (d < straight) {
      s = -(POD_L - POD_H) + d;
      v = POD_H;
    } else if ((d -= straight) < Math.PI * POD_H) {
      const a = Math.PI / 2 - d / POD_H;
      s = POD_L - POD_H + Math.cos(a) * POD_H;
      v = Math.sin(a) * POD_H;
    } else if ((d -= Math.PI * POD_H) < straight) {
      s = POD_L - POD_H - d;
      v = -POD_H;
    } else {
      d -= straight;
      const a = -Math.PI / 2 - d / POD_H;
      s = -(POD_L - POD_H) + Math.cos(a) * POD_H;
      v = Math.sin(a) * POD_H;
    }
    put(thetaAt(sensorS + s), -HALF_T - POD_RISE * (0.3 + 0.7 * rand()), v, BAND_KIND.pod, -1, 0);
  }
  for (const [s, v, b] of LEDS) {
    if (n >= count) break;
    big[n] = b;
    put(thetaAt(sensorS + s), -HALF_T - POD_RISE - 0.006, v, BAND_KIND.led, -1, 0);
  }

  // The hexagon mark on the outside, beside the clasp: evenly spaced dots
  // rather than a solid line.
  const hexS = lengthAt(markAt ?? GAP_AT + GAP_HALF + 0.55);
  const hexR = 0.098;
  const perSide = 4;
  for (let side = 0; side < 6; side++) {
    const a0 = (side * Math.PI) / 3 + Math.PI / 6;
    const a1 = a0 + Math.PI / 3;
    for (let j = 0; j < perSide; j++) {
      const f = j / perSide;
      const hs = hexR * (Math.cos(a0) + (Math.cos(a1) - Math.cos(a0)) * f);
      const hv = hexR * (Math.sin(a0) + (Math.sin(a1) - Math.sin(a0)) * f);
      put(thetaAt(hexS + hs), HALF_T + 0.004, hv, BAND_KIND.ink, 1, 0);
    }
  }

  // Clasp end faces.
  const cap = share(0.007);
  for (const [theta, dir] of [
    [theta0, -1],
    [theta0 + span, 1],
  ]) {
    for (let i = 0; i < cap; i++) {
      put(theta, (rand() * 2 - 1) * HALF_T * 0.9, (rand() * 2 - 1) * HALF_H * 0.9, BAND_KIND.ink, 0, 0, dir);
    }
  }

  // The strap: a golden-ratio lattice over (length along the strap, position
  // around the cross-section) spreads dots evenly without clumps; a little
  // jitter breaks up the lattice's moiré.
  const strap = count - n;
  for (let i = 0; i < strap; i++) {
    const u = Math.min(1, Math.max(0, (i + 0.5 + (rand() - 0.5) * 0.9) / strap));
    const q = (i * GOLDEN + (rand() - 0.5) * 0.004 + 1) % 1;
    const [off, v, no, nv] = crossSection(q);
    put(thetaAt(u * total), off, v, BAND_KIND.strap, no, nv);
  }

  return { pos, normal, kind, big, fromSensor };
}

/** The resting pose: tipped toward the viewer so you look into the loop. */
export const BAND_POSE = { tilt: 0.58, roll: -0.12 } as const;

/**
 * How much a dot on the band shows, from its normal's z after rotation (the
 * viewer looks along +z). Faces toward you are solid; faces turned away fall
 * back to a faint trace, which is what makes the dots read as a solid strap.
 */
export function bandShade(nz: number) {
  const facing = -nz;
  return facing > 0 ? 0.4 + 0.6 * Math.pow(facing, 0.6) : 0.4 + 0.28 * facing;
}
