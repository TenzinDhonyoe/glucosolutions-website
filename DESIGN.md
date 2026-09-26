# GlucoSolutions website design

The site is built from the language of its first two scrolls: a hand wearing
the wristband, drawn in particles (the band red, the hand soft ink), floating
over an endless white floor, which comes apart into glucose molecules as you
scroll, then one sentence revealed word by word. Every other section borrows from those
two moments. If something new doesn't look like it belongs next to them, it
doesn't belong on the site.

## Principles

1. **One visual idea.** Particles are the only illustration style. The
   hand and band, the molecules, the step figures and the closing band are all dots. No stock
   photos, no AI imagery, no icon sets as decoration.
2. **White stage, quiet page.** Hero-scale moments sit on the white studio
   stage (vignette plus floor grid). Everything between them sits on the plain
   page colour. In dark mode the same system runs at night (see Colour).
3. **Words on the left, visual in the room.** On stage sections, copy holds
   the left side (bottom-left, or vertically centred in the hero) and the visual
   owns the rest. Text never sits on top of the particles.
4. **Understood in one glance.** The first screen says what it is, who it's
   for and what to do, in that order: one plain headline, one short line, one
   form. Explanation comes later, as the reader scrolls.
5. **Hairlines, not boxes.** Structure comes from 1px rules and spacing. The
   only boxed elements are inputs and buttons.
6. **Everything that moves is made of dots.** The scroll-driven
   hand-and-band-to-molecules morph is the show. The other live figures (the
   three step figures, the closing band) move slowly and calmly and answer the
   pointer. Nothing else animates on its own except the step rule that fills
   in turn; hover and focus states are the only other motion.
7. **Honest copy.** The band shows trends, not exact numbers, and it's in
   development. Say so wherever it matters.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `page` | `#f6f6f4` | Page background, and the edge colour of every stage |
| `card` | `#ffffff` | Inputs, the floating nav pill |
| `line` | `#e3e3df` | Hairlines and borders |
| `line-2` | `#d4d4cf` | Link underlines |
| `ink-900` | `#161616` | Headlines, primary buttons, carbon in the molecule, the band's sensor window, clasp and logo |
| `ink-700` | `#3d3d3b` | Body text on legal pages, footer links |
| `ink-500` | `#676764` | Body copy and ledes |
| `ink-400` | `#8b8b87` | Kickers, labels, fine print |
| `signal` | `#e5332a` | The particle red. Oxygen in the molecule, "rising" in trend figures, form errors |
| hydrogen gray | `#a8a8a3` | Hydrogen atoms, secondary dots |

Red is never used for text, buttons or backgrounds. It only appears as dots
(and the form error message). Buttons are ink on white.

**Stage background** (`STAGE_BACKGROUND` in `components/stage/Stage.tsx`):

```css
radial-gradient(ellipse 80% 70% at 50% 42%, #ffffff 0%, #fafaf9 55%, var(--color-page) 100%)
```

It ends in the page colour, so a stage blends into the section around it with
no seam.

**Dark mode.** A sun/moon toggle in the nav (beside "Join the waitlist")
switches the whole site. It sets `data-theme="dark"` on `<html>`, remembered
in localStorage and applied before first paint by a script in the root
layout; the default is light. Dark mode redefines the same tokens in
`globals.css`: page `#0f0f10`, card `#19191b`, lines `#2a2a2d`, ink a warm
off-white `#f1f0ec` down to `#797874`, and `on-ink` (text on primary buttons)
near-black. The stage uses `--stage-center` / `--stage-mid`. The red never
changes. Canvas art reads `components/stage/theme.ts`: ink dots become warm
off-white, gray dots dim, and labels and floor lines follow, redrawn the moment
the theme flips. Use tokens, never hex, so new work works in both themes.

## Type

Geist for everything, Geist Mono only for the SMS sample message on the legal
pages. Headlines are semibold (600) with tight tracking. Body text is regular.

| Role | Size | Weight / tracking / leading |
| --- | --- | --- |
| Hero headline | `clamp(2rem, 1.3rem + 2.2vw, 3.25rem)` | 600, `-0.038em`, `1.05`, `max-w-[26rem]` |
| Mission statement | `clamp(1.6rem, 1.15rem + 1.7vw, 2.5rem)` | 600, `-0.035em`, `1.2`, centred |
| Section headline | `clamp(1.75rem, 1.3rem + 1.6vw, 2.6rem)` | 600, `-0.035em`, `1.08` |
| Closing headline | `clamp(1.9rem, 1.3rem + 2.2vw, 3rem)` | 600, `-0.035em`, `1.06` |
| Step / FAQ title | `19px` / `17px` | 600, `-0.02em` |
| Lede / body | `16–17px` | 400, `1.6` leading |
| Kicker / label | `13px` | 500, `ink-400`, sentence case |
| Fine print | `13–13.5px` | 400, `ink-400` |

- **Kickers** are the small grey line above a headline ("How it works",
  "The band"). Sentence case, never all caps, never letter-spaced.
- Headlines are left-aligned. The mission statement is the only centred text.
- Keep headlines to three lines or fewer on desktop (`max-w-[14ch]`–`[34rem]`).
- Break the closing line as "Prediabetes is silent. / Until it isn't."

## Layout

- **One container.** `<Container>`: 1320px max width, `px-6` (24px) on phones and
  `md:px-10` (40px) from 768px. Every section, the nav and the footer use it, so
  every left edge lines up. Never add ad-hoc side padding.
- **Section rhythm.** `py-24 md:py-32` for standard sections.
- **Section opener.** `<SectionHeader>`: kicker plus headline on the left (7 of
  12 columns), optional lede bottom-aligned on the right (5 columns).
- **Stage sections** (hero, closing): the visual sits right of centre on
  desktop and in the upper half on phones. Copy is on the left.
  - **Hero:** the raised hand is centred at 67% across and framed from its
    fingertips (16% down, clear of the nav) to the band (61% down); the
    forearm carries on off the bottom of the screen. Copy is vertically
    centred, `max-w-[26rem]`. On phones the fingertips sit at 18% and the band
    at 47%, and the forearm fades out above the copy at the bottom. The
    molecules later form at 67% × 50% (30% down on phones), sized from 30%
    of the shorter viewport side, with a soft floor shadow that appears as
    they form. The extra glucose molecules sit right of and above the scan
    frame on desktop, and under it on phones and tablets, never over the copy.
  - **Closing:** copy is bottom-left, `max-w-[30rem]`–`[34rem]`.
- **Grids.** Three columns for steps and specs (each step: a live figure on a
  soft pool of light, no box, then a hairline that fills with ink in turn); FAQ is 4 + 8 columns.

## Components

| Component | File | Notes |
| --- | --- | --- |
| Nav | `components/Nav.tsx` | At rest aligns to the container; on scroll becomes a white pill (max 1080px), hides on scroll-down, returns on scroll-up |
| Waitlist form | `components/WaitlistForm.tsx` | White pill input with an ink "Join the waitlist" button. Keeps the email on error |
| Button | `components/ui/Button.tsx` | `primary` ink pill, `secondary` white pill with border |
| Section header | `components/ui/SectionHeader.tsx` | Kicker, headline, optional lede |
| Accordion | `components/ui/Accordion.tsx` | Hairline dividers, rotating chevron |
| Stage | `components/stage/Stage.tsx` | `STAGE_BACKGROUND`, `<FloorGrid>`, `<ContactShadow>` |
| Hero particles | `components/home/HeroParticles.tsx` | Canvas particles: band, pointer repel, scroll morph to glucose, detection scan |
| Hand geometry | `components/stage/hand.ts` | The hand and forearm as a signed distance field, sampled to an even dot spread. Pre-sampled to `public/hand-cloud.bin` by `scripts/generate-hand-cloud.mjs`; re-run it after changing the hand |
| Band geometry | `components/stage/band.ts` | The dotted band (strap, rims, clasp, sensor window, LEDs, hexagon mark), shared by the canvas and the still |
| Particle figures | `components/stage/ParticleFigure.tsx` | Small live canvas scenes: `band` (turning, lights pulsing), `meal` (a bowl of food, glucose rising off it), `trend` (the curve drawing itself after a meal) and `closing` (the band in a field of drifting dots). Lean toward and scatter from the pointer; pause offscreen; hold a still under reduced motion |

## The particle language

- **Dots are round**, 1.5–2.8px on screen, and fade with depth: front dots at
  full opacity, back dots around 20%.
- **Colour carries meaning.** Red is the default and means "glucose" or
  "rising". In the molecule, oxygen is red, carbon is ink and hydrogen is gray.
  In trend figures the rise is red and the settled tail is ink.
- **The band is the product.** An open loop with the clasp gap facing you,
  a raised sensor pod on the inside of the far side with its LEDs glowing
  red, and the hexagon mark (spaced dots, never a solid line) on the outside
  by the clasp. The strap has a rounded cross-section and is shaded by its
  surface normals: dots facing you are solid, dots facing away fall back to a
  faint trace. The strap is red; the pod, clasp ends and mark are ink.
- **The hand wears the band.** A relaxed, open raised hand, the back toward
  you, the arm rising on a diagonal from the lower left so the scene fills the
  right side and the band sits near the middle of the screen. The fingers are
  curled in, each folding a little more than the last (index least, little
  finger most), and the thumb rests beside the index finger. The hand is
  turned a little to the thumb side so the curl shows in its outline. The forearm runs off
  the bottom of the screen, and the arm tips slightly toward the camera so the
  band reads as a ring. The hand's dots are ink at reduced opacity so the red
  band stays the subject.
- **Anatomy matters.** The forearm is flat and oval at the wrist (about
  5.8 × 4 cm) and fills out toward the elbow, widest about two-thirds of the
  way up. Worn, the band is fastened (no gap), its wide axis across the
  wrist's width, the clasp under the wrist, out of view, and the mark on the
  thumb side; the sensor pod sits against the skin and barely shows.
- **Density** is about 2,200 band dots and 6,000 hand dots on desktop (1,100
  and 2,400 on phones), 1,500 for the step band and 1,900 for the closing band.
  New dot art should feel equally fine-grained.
- **Seeded.** Figures sample their dots with the seeded PRNG in
  `components/stage/dots.ts`, so they look the same on every visit.
- **The molecule is real.** β-D-glucose in its chair form: 6 C, 6 O, 12 H,
  24 bonds. Its six-membered ring is the same hexagon as the logo mark. Don't
  simplify it into a generic shape.

## Motion

- **Hero sequence.** The hero is a 190vh scroll track with a pinned stage, kept
  short so the reader reaches the next section quickly. The
  timings live in `HERO_TIMELINE` (`components/home/HeroParticles.tsx`), which the
  canvas and the copy both read, so change them in one place:

  | Phase | Track progress | What happens |
  | --- | --- | --- |
  | Copy out | 2–20% | Headline, line and form fade and lift away |
  | Morph | 6–62% | The band comes apart first and its dots become the centre glucose molecule; then the hand comes apart from the wrist outward and becomes four more drifting around it (small swirl on the way). The centre one's spin slows as it forms |
  | Caption in | 50–72% | "What the band reads" explanation takes the left column |
  | Lock-on | 62–80% | Corner brackets close in around the centre molecule and the others soften. Label: "Locking on" |
  | Scan | once locked, on its own | A red scan line sweeps down and back up continuously (`SCAN_MS`, 2.4 s a sweep), not tied to scrolling; dots it crosses brighten. Label: "Reading glucose" |
  | Detected | after the first sweep down | "Glucose detected" with a red dot above the frame, "Trend: rising" with an arrow below; the scan keeps sweeping |

  The floor grid glides toward the viewer with scroll throughout. The
  detection graphics are drawn in the canvas and follow the molecule's
  smoothed on-screen bounds as it turns.
- **Finger wave.** The fingers ripple endlessly in a slow, calm wave: each
  one curls in a little and back out on a sine of about 5.5 seconds, the
  little finger leading and the index following, so the motion rolls across
  the hand (`waveAt` in `HeroParticles.tsx`). The curl never goes past about
  40% of a fist, and the thumb just breathes along. Each finger and the thumb
  is a three-bone chain (`HAND_CHAINS` in `hand.ts`); dots near a knuckle
  blend between bones so the joints bend smoothly. The wave settles to rest as
  soon as the page scrolls, so the dissolve starts from the rest pose.
- **Scatter.** A small "Scatter" pill (bottom right on desktop, top right on
  phones) turns the dots into a spectroscope: every dot of the hand and band
  bursts out in a staggered pop and regroups as a beam of light flowing down
  into a dotted prism and fanning out into its colours. Halfway across, the
  fan passes through a sample: a dotted glass cuvette holding three glucose
  rings that glow softly. Two colours are absorbed (their rays break up in
  the glass and never arrive), one is reflected (it bounces up and back out),
  and the rest land on a spectrum strip at the right edge, which shows the
  absorbed colours as dark lines (gaps at night) and the reflected one as a
  gap. The light keeps flowing; dots still scatter from the pointer and stay
  faint behind the copy. The spectrum runs violet through the brand teal to
  the brand red; it's the one place other colours appear. "Gather" flies the
  dots back into the hand; scrolling while scattered hands them straight to
  the molecules.
- **Idle motion** is limited to the finger wave, the hand's slow turn and float, the sensor's
  faint pulsing glow, the molecules' spin, and the pointer
  response (tilt toward the cursor, dots scatter within about 110px and
  spring back).
- **Mission reveal.** Words fade from grey to ink as the pinned statement
  scrolls.
- **Performance.** The canvas pauses offscreen and in hidden tabs, caps pixel
  ratio at 2, and uses fewer particles under 640px.
- **Reduced motion.** No finger wave, sway, float, pulse, spin or pointer response. The morph still follows
  the scroll because the reader drives it.
- Easing for UI transitions: `cubic-bezier(0.22, 1, 0.36, 1)`, 300–500ms.

## Don'ts

- No black sections in light mode; dark mode is the whole site, not a section.
- No text over the particles; use the bottom-left corner.
- No all-caps labels, letter-spaced eyebrows, or middle-dot meta strings.
- No bordered feature cards or icon tiles. Use dot figures and hairlines.
- No gradients as decoration. The stage vignette is the only gradient.
- No new colours. If something needs emphasis, use weight or size.
- No autoplaying motion beyond the particle figures and the step rule.
- No claims the band can't back up: no exact glucose readings, no "medical
  grade", no ship dates or prices.
