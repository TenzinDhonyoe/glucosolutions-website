import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { readFileSync, writeFileSync } from 'node:fs';

let input = readFileSync('app/globals.css', 'utf8');
// Force-emit the full brand palette + brand classes (designs consume static CSS).
const safelist = readFileSync('.design-sync/safelist.txt', 'utf8').trim().split(/\s+/).join(' ');
input = input.replace('@import "tailwindcss";', `@import "tailwindcss";\n@source inline("${safelist}");`);
const result = await postcss([tailwind({ base: process.cwd(), optimize: true })])
  .process(input, { from: 'app/globals.css', to: '.design-sync/compiled.css' });
let css = result.css;
css += `
/* design-sync: resolve Next-injected --font-* vars to concrete brand stacks. */
:root {
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-display: "Fraunces", Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
body { font-family: var(--font-sans); color: var(--color-charcoal); background: var(--color-paper); }
`;
writeFileSync('.design-sync/compiled.css', css);
console.error('compiled.css bytes:', css.length);
