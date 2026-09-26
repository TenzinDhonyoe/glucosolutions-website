// Shared helpers for the dot-drawn illustrations. Everything is seeded so the
// server and the browser render the exact same dots.

export const DOT = {
  red: "#e5332a",
  ink: "#1c1c1b",
  gray: "#a8a8a3",
} as const;

export type Dot = { x: number; y: number; r: number; o: number; c: string };

/** Small deterministic PRNG (mulberry32). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
