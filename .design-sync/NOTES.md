# design-sync notes — gluco_website

This repo is a **Next.js 16 marketing site**, not a packaged component library. There is no
`dist/` and no Storybook, so the sync runs the **package shape in synth-entry mode** (esbuild
bundles the components straight from `components/**` via a non-existent `--entry ./dist/index.es.js`,
which makes PKG_DIR resolve to the repo root through the package.json walk-up).

## How the build is wired
- **Component source**: `cfg.srcDir = "components"` (the default would pick `lib/`, which has no components).
- **Shims** (`.design-sync/shims/`, redirected via `cfg.tsconfig = .design-sync/tsconfig.ds.json` `paths`):
  the `tsconfigPaths` esbuild plugin fires before node resolution, so these win over the real modules.
  - `next/image` → `<img>`; root-absolute `/public` paths (which 404 in a preview card) render a
    branded placeholder using the `alt` text. **`/brand/wordmark-{charcoal,white}.png` are inlined**
    into the shim so the Wordmark component shows its real lockup everywhere.
  - `next/link` → `<a>`; `next/navigation` → no-op hooks; `next/font/*` → className/style stubs.
  - `@/lib/analytics` → no-op `track` (kills posthog at eval); `@/app/waitlist/actions` →
    resolved `joinWaitlist`; `@/lib/seo/jsonLd` → just `graph()` (the real module reads
    `process.env.NEXT_PUBLIC_SITE_URL` at top level, which throws `process is not defined` and
    takes the whole IIFE down → `[BUNDLE_EXPORT] 24/24 not a component`). The real `@/lib/utils`,
    `@/lib/seo/faqs`, and intra-`@/components/*` imports resolve normally.
- **CSS**: Tailwind v4 with `@theme` tokens in `app/globals.css`. The raw file has no compiled
  utilities, so `.ds-sync/compile-tw.mjs` runs `@tailwindcss/postcss` over the repo to produce
  `.design-sync/compiled.css` (cfg.cssEntry). It also appends concrete `--font-*` overrides because
  the source `@theme` defines them self-referentially (`--font-sans: var(--font-sans), Inter, …`),
  which Next injects at runtime but is cyclic/invalid in a bare preview.
  **Re-run `node .design-sync/compile-tw.mjs` whenever component class usage changes**, or new utilities
  won't ship.
- **Fonts**: Inter / Fraunces (+italic) / JetBrains Mono variable woff2 downloaded from the
  Fontsource CDN into `.design-sync/fonts/`, wired via `cfg.extraFonts` → `brand-fonts.css`.
  These are brand substitutes (Inter for Suisse Int'l, Fraunces for Canela Deck per the brand kit).
- **dtsPropsFor**: synth-entry can't extract inline-typed props (all collapse to `[key:string]:unknown`),
  so every component's prop contract is hand-written in `cfg.dtsPropsFor` from the source `Props` types.
  **Keep these in sync if a component's props change.**

## Known render warns (triaged — not new on re-sync)
- `ScrollProgress`, `JsonLd` → floor cards by design (scroll-driven fixed bar / non-visual `<script>`).
- `cfg.overrides`: `Nav` & `Grain` = `single` (position:fixed), `Problem` = `column` (wide). These
  cleared the `[GRID_OVERFLOW]` warns.
- `CounterStat` cards snapshot mid count-up (e.g. 57% on a `to={80}` stat) — that's the component's
  count-up animation, not a wrong value.

## Re-sync risks (what can silently go stale)
- **Section background photos** (Hero/Problem/Solution/Science use `next/image` with `/photos/*.jpg`
  string paths) render as branded placeholders, not the real photos — those `/public` assets can't be
  fetched in a preview card or a built design. Type/layout/colour still read correctly. Only the
  prop-taking `PhotoCard`/`PhoneFrame` previews show real imagery (small inlined copies under
  `.design-sync/previews/assets/`).
- The downloaded fonts and the Tailwind compile are **build-time, network/CLI-derived**. A fresh clone
  must re-run `npm i` in `.ds-sync`, re-download fonts if `.design-sync/fonts/*.woff2` are missing, and
  re-run `compile-tw.mjs`.
- `dtsPropsFor` is a hand-maintained mirror of the source props — it does not auto-update.
- Shims mirror the real modules' surface; if a component starts importing a new `next/*` subpath or a
  server-only `@/lib/*`, add a matching shim + tsconfig path or the bundle eval will throw.
