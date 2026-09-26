// Samples the hero's hand once, deterministically, and writes it to
// public/hand-cloud.bin. Re-run after changing components/stage/hand.ts:
//
//   node scripts/generate-hand-cloud.mjs

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { encodeHandCloud, sampleHand } from "../components/stage/hand.ts";
import { rng } from "../components/stage/dots.ts";

const DOTS = 6000;
const cloud = sampleHand(DOTS, rng(2026));
const out = fileURLToPath(new URL("../public/hand-cloud.bin", import.meta.url));
writeFileSync(out, Buffer.from(encodeHandCloud(cloud)));
console.log(`Wrote ${cloud.count} dots to public/hand-cloud.bin`);
