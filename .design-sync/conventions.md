# Gluco Solutions — Web — usage conventions

Editorial-calm marketing system for Gluco Solutions (a wellness wearable that helps adults reverse
prediabetes). The look is warm paper canvas, deep emerald accents, and a serif display face — quiet,
clinical-but-human, never neon-health-tech.

## Setup — no provider needed
Components are styled entirely through CSS tokens and utility classes; there is **no theme provider,
no context, no required wrapper**. Import the stylesheet once at the app root and render components
directly:

```jsx
import "./styles.css";              // tokens + Tailwind utilities + fonts + component styles
import { Hero, MagneticButton, GlucoseChart } from "<this design system>";

<Hero />
```

`styles.css` defines the brand fonts (Inter = sans, Fraunces = display/serif, JetBrains Mono = mono)
and all the tokens below. Read `styles.css` and `_ds_bundle.css` before adding your own styling.

## Styling idiom — Tailwind utilities over brand tokens
Style with **Tailwind utility classes** that resolve to the brand tokens. Use these token-backed names
(do not invent hex values — these are the palette):

| Concern | Utility classes (real names) |
|---|---|
| Surfaces | `bg-paper` (page canvas #F6F1E6), `bg-oat` (#F3EDE2), `bg-charcoal` (#1C1C1C), `bg-sage` (#2D8059), `bg-sage-2` (hover) |
| Text | `text-charcoal`, `text-paper`, `text-fg-mute` (secondary #5B5A52), `text-sage`, `text-seafoam` (#5FA7A0), `text-sunlit`/`text-amber` (#E1B66E), `text-terracotta` (danger) |
| Borders / rules | `border-stone` (#D8D4C7), `border-stone-2`; or the `.rule` / `.rule-soft` hairline classes |
| Fonts | `font-sans` (Inter), `font-mono` (JetBrains Mono); for display use the `.display-serif` / `.display-serif-italic` classes (Fraunces, 32px+ only) |

Brand component/utility classes (defined in `styles.css`, use them verbatim):
- `.display-serif`, `.display-serif-italic` — Fraunces editorial display (headlines ≥32px). Italic is the signature accent.
- `.eyebrow` — 11px all-caps 0.12em-tracked label in `fg-mute`. `.caption` — 11px mono micro-label.
- `.shine` — hover sweep on filled buttons. `.lift` — subtle card hover-raise. `.pulse-dot` — live-status dot.
- `.hex-clip` — hexagon crop, reserved for hero brand photography (also `PhotoCard hex`).

Buttons are pills: `rounded-full bg-sage px-6 py-3 text-paper` (+ `.shine`). The hexagon is brand-only
(`HexMark`), not a UI affordance.

## Components
`Wordmark` / `HexMark` (brand lockup + mark), `SectionLabel` (numbered eyebrow), `MagneticButton`,
`CounterStat` (count-up stat), `TrendPill`, `Marquee`, `PhotoCard`, `PhoneFrame`, `GlucoseChart`,
`Grain`/`MouseParallax`/`MotionSection`/`ScrollProgress` (motion/texture wrappers), `Nav`, `JsonLd`,
and full page sections (`Hero`, `Problem`, `Science`, `Solution`, `Comparison`, `Faq`, `Waitlist`,
`Footer`). Each component folder has a `.d.ts` (the prop contract) and `.prompt.md` (usage) — read
those before composing. Sections are zero-prop and self-contained; primitives take props.

## One idiomatic build snippet
```jsx
<section className="bg-paper px-6 py-24">
  <SectionLabel index={2} label="How it works" />
  <h2 className="display-serif text-charcoal mt-6 text-5xl">
    See your day, <span className="display-serif-italic text-seafoam">before it happens.</span>
  </h2>
  <p className="text-fg-mute mt-4 max-w-md">Reads through your skin — no needles, no consumables.</p>
  <MagneticButton href="#waitlist" className="shine mt-8 inline-flex rounded-full bg-sage px-7 py-3.5 text-paper">
    Join the waitlist
  </MagneticButton>
</section>
```
