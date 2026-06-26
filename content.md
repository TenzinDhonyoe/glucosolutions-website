# GlucoSolutions — Website Content & Layout Spec

This is content + section-by-section layout only. No design system (you have that).

**Audience priority:** (1) a solo private-practice RD deciding whether to book a demo, (2) investors/YC/partners doing diligence, (3) patients arriving for Redu. The site is built for #1; #2 and #3 are served without diluting #1.

**Copy register:** professional, concrete, no generic AI phrasing ("revolutionize," "powered by AI," "leverage," "seamless"). Front-load the stake. Quantify only what's true. Lowercase founder voice stays on X — the site needs clinician-grade credibility.

**Honesty constraints baked in (do not violate):**
- 1 committed RD, ~20 Redu testers who are **patients, not dietitians**. No customer logos, no testimonial wall, no "trusted by hundreds." Don't imply RD validation you don't have.
- **No clinical advisors.** No advisory-board section, no doctor names.
- YC was **applied to (S26), not accepted.** Never imply YC backing.
- Features that aren't shipped are labeled `[In development]`. Don't sell vaporware as live.
- Items marked **[CONFIRM]** are facts I can't verify — fill or cut before launch.

---

## Sitemap

```
/                    Home (the workhorse — single scroll, anchored sections)
/product             How it works, in depth
/pricing             One plan, FAQ
/security            PHIPA/PIPEDA, data handling
/about               Founders + story
/redu                Patient app landing (App Store referral / Product Hunt)
/contact             Book a demo (or modal/Calendly from any CTA)
/privacy /terms      Legal (lawyer-drafted)
```

Persistent CTA in nav and footer: **Book a demo.**

---

# PAGE: Home (`/`)

A single scroll. Each block below is one section, top to bottom.

### 1. Nav (sticky)
- Left: logo
- Center/right: `Product` · `Pricing` · `Security` · `About`
- Far right: **Book a demo** (primary button)
- Mobile: collapse to hamburger; keep Book a demo visible.

### 2. Hero
**Layout:** left column = text, right column = dashboard screenshot (real, even if early). Single primary CTA, one secondary.

- Eyebrow: `For solo private-practice dietitians`
- **H1: Know what your patients do between sessions.**
- Subhead: You see a patient once a month. Their behavior happens the other 29 days. GlucoSolutions turns that daily behavior into sourced clinical insight — and cuts the admin around every appointment. Patients log in Redu; you see what matters in one dashboard.
- Primary CTA: **Book a demo**
- Secondary CTA: `See how it works ↓` (scrolls to §4)
- Below CTAs, one quiet credibility line (only if true): `Built with our launch dietitians on real prediabetic cases.` — **[CONFIRM you're comfortable saying "dietitians" plural; you have one committed. If not, say "Built with a practicing RD on real client cases."]**

### 3. Problem
**Layout:** short headline + 3 pain columns (icon + one line each). No paragraphs.

- **H2: The gap isn't your skill. It's the 29 days you can't see.**
- Pain 1 — **Blind between visits:** Behavior, glucose, and adherence drift the moment the session ends. You find out a month later.
- Pain 2 — **Admin eats billable time:** Chart review, log-scraping, and session prep happen on unpaid hours.
- Pain 3 — **Outcomes you can't show:** Referring physicians send patients on faith. Without clean outcome data, you can't earn the next referral.

### 4. How it works (anchor: `#how`)
**Layout:** 3 numbered steps, left-to-right, each with a small visual.

- **H2: Three steps. One source of truth.**
1. **Patients log in Redu.** Meals, glucose (finger-prick or CGM), steps, sleep — in seconds, on their phone.
2. **GlucoSolutions interprets the behavior.** Every insight is tied to the exact data point behind it — no black box.
3. **You act with confidence.** Walk into each session prepped, message patients between visits, and export outcomes for referrers.

> Note: step 3's "export outcomes" is roadmap — see §7. Keep the verb but don't screenshot a feature that isn't built.

### 5. Capabilities
**Layout:** 3 stacked feature blocks, alternating image side. Each gets a status tag.

- **H2: Built around how solo practice actually works.**

**Block A — Workflow automation `[Available]`**
Pre-session summaries, auto-organized logs, and less time charting. Walk in already knowing what changed.

**Block B — Between-session continuity `[Available]`**
A live view of patient behavior, day to day. Message in-app, catch drift in week two instead of week four.

**Block C — Outcomes reporting `[In development]`**
One-click reports for referring physicians — A1C trends, adherence, behavior change — formatted to win the next referral. *Building this now with our launch RD.*

### 6. Differentiator — provenance
**Layout:** headline + body left, a single "Fact card" visual right (show an insight with its source data and reasoning steps exposed). This is the section that closes skeptical clinicians.

- **H2: AI insight that shows its work.**
- Body: Most AI tools hand you a conclusion and hide the math. GlucoSolutions does the opposite. Every interpretation traces to the exact data it came from, shows the reasoning steps, and shows how each data point was used — so you can trust it, correct it, and defend it to a physician. You stay the clinician. The software just stops hiding its evidence.
- Microcopy under the visual: `Every claim is a sourced fact, not a guess.`

### 7. Redu teaser
**Layout:** phone mockup + short copy. Link to `/redu`.

- **H2: Redu — the patient's half of the system.**
- Body: Redu is the app your patients actually use. Low-friction logging, a second-chance framing that keeps people coming back, and the engagement that makes everything above possible. Included with your subscription at no cost to your patients.
- Link: `More about Redu →`

### 8. Security teaser
**Layout:** headline + 3 short trust points + link.

- **H2: Built for PHI from day one.**
- Point 1: PHIPA- and PIPEDA-aligned data handling.
- Point 2: Patient data is de-identified before any AI processing.
- Point 3: You remain the health information custodian; we operate as your agent under a written agreement.
- Link: `How we handle data →` (`/security`)

### 9. Pricing teaser
**Layout:** single price, one line, link. Don't build a 3-tier table you don't have.

- **H2: One plan. Everything included.**
- Line: **$199/month per practice.** Redu included for your patients. Cancel anytime.  **[CONFIRM: is Redu unlimited patients or per-seat? Is there a pilot price?]**
- Link: `See pricing →`

### 10. Founder / why-us teaser
**Layout:** one short paragraph, link to `/about`. No advisor logos.

- **H2: Why we built this.**
- Body: We started building hardware to track glucose and learned the real bottleneck wasn't the sensor — it was the dietitian's workflow. So we built for the clinician. **[Tenz: confirm you want the hardware origin on the public site; it's a strong, honest story but optional.]**
- Link: `Meet the team →`

### 11. Final CTA
**Layout:** full-width band, one headline, one button.

- **H2: See it on your own caseload.**
- Subhead: A 20-minute walkthrough on a real (de-identified) case. No slides.
- Button: **Book a demo**

### 12. Footer
- Col 1: logo + one-line descriptor (`Clinical software for solo dietitians.`)
- Col 2 Product: Product · Pricing · Security · Redu
- Col 3 Company: About · Contact · Careers *(only if real)*
- Col 4 Legal: Privacy Policy · Terms
- Bottom bar: `© 2026 GlucoSolutions Inc.` · X (@_tenZdhon_ or a company handle) · `Toronto, Canada`

---

# PAGE: Product (`/product`)

For the RD who clicked through and wants depth. Order:

1. **Hero:** `H1: One dashboard for the patient you only see monthly.` Sub: restate the loop (Redu in → sourced interpretation → action out).
2. **The interpretation engine (the moat, in plain language):**
   - `H2: How we turn raw logs into something you can trust.`
   - Two-part explanation, no jargon: (a) a deterministic layer computes facts from the data and tags each with its source; (b) a separate layer writes the plain-English summary, constrained to only say what the facts support. Result: no invented numbers, no hallucinated trends.
   - Visual: the same Fact card, expanded — source → computation → narration.
3. **What patients log (Redu side):** meals, glucose (finger-prick *or* CGM — call out that you support manual entry, since most users aren't on CGM), steps, sleep, logging consistency.
4. **What you see (dashboard side):** behavior timeline, glucose overlay, drift flags, session-prep summary, in-app messaging.
5. **The three value props, expanded:** workflow `[Available]`, continuity `[Available]`, outcomes reporting `[In development]` — one paragraph each, same status tags as Home.
6. **Roadmap (optional, honest):** a short, dated-but-soft list ("next: physician-ready outcome exports") signals momentum without overpromising. Don't commit to dates publicly.
7. **CTA:** Book a demo.

---

# PAGE: Pricing (`/pricing`)

**Layout:** one card, centered. Resist tiers until you have them.

- **H1: Simple pricing for solo practice.**
- Card:
  - **$199 / month** — per practice
  - Includes: the clinical dashboard, Redu for your patients, between-session messaging, session-prep summaries, all interpretation features.
  - `Cancel anytime.`
  - Button: **Book a demo** (not "Buy now" — at your stage every sale is a conversation)
- **[CONFIRM and add a line for each]:** patient cap or per-seat math · annual discount · pilot/founding-RD pricing · what happens to patient data if they cancel.
- **FAQ** (accordion):
  - Do my patients pay anything? → **[CONFIRM]** (likely: no, it's included.)
  - Do I need CGMs? → No. Patients can log glucose manually; CGM is supported, not required.
  - Is this PHIPA/PIPEDA compliant? → Short yes + link to `/security`.
  - Who owns the patient data? → The patient's information stays under your custodianship; we act as your agent. Link to Security.
  - Can I export my data if I leave? → **[CONFIRM]**
  - Is this medical advice / does it diagnose? → No. It organizes and interprets data to support *your* clinical judgment; it doesn't replace it.

---

# PAGE: Security & Compliance (`/security`)

The page that closes a cautious clinician. Be specific; mark anything unverified.

1. **Hero:** `H1: Patient trust is the product.` Sub: one line on PHIPA/PIPEDA alignment.
2. **Data residency:** where PHI is stored. **[CONFIRM — you flagged a Supabase region migration as a full rebuild; do NOT claim "stored in Canada" unless it's true today. If it isn't yet, say what's accurate and what's in progress.]**
3. **De-identification before AI processing:** your strongest, most defensible claim — state it plainly. Patient-identifying data is stripped before anything is sent to an external model.
4. **Custodian / agent relationship:** the RD remains the health information custodian; GlucoSolutions operates as an agent under a written data agreement. Name the agreement as a real artifact you'll sign.
5. **Encryption & access controls:** in transit and at rest, role-based access, audit logging. **[CONFIRM each before publishing — only list what's actually implemented.]**
6. **Model training:** state whether patient data is ever used to train models. "We do not train on your patients' data" is high-value **[CONFIRM it's true]**.
7. **Subprocessors:** a short, honest list (hosting, model provider, etc.). Diligence-minded RDs and investors look for this.
8. **What we don't do yet:** a short honesty block (e.g., formal certifications in progress) earns more trust than silence. Optional but recommended.
9. **CTA:** `Questions about compliance? Talk to a founder.`

---

# PAGE: About (`/about`)

1. **Mission:** `H1: We build for the dietitian, so the dietitian can build the patient.` One paragraph on the between-session gap and why solo RDs are underserved by enterprise tools.
2. **Origin story (optional, honest):** started on glucose hardware → discovered the clinician workflow was the real constraint → pivoted to software. Ties the "Gluco" name together. Keep it to 4–5 sentences.
3. **Founders (2 only — no advisors):**
   - **Tenzin Dhonyoe — Co-founder & CTO.** Biomedical engineer (Toronto Metropolitan University). Built the product end to end — interpretation engine, dashboard, Redu. Owns product and engineering. **[Tenz: pick 1 credibility line you're happy showing publicly — e.g., declined a return offer at Alphawave Semi to go full-time. Keep the CV off the site.]**
   - **Justin Allen — Co-founder & CEO.** Owns sales, partnerships, and fundraising. **[Add one line — background/why he's credible to RDs and investors.]**
4. **Recognition (only the true, ownable ones):** DMZ Basecamp · Norman Esch Award · Hult Prize Canada Nationals (Top 8). **Do NOT list YC as backing — at most "Applied, YC S26."** Probably cleaner to omit YC entirely until there's an outcome. **[CONFIRM which of these you want public.]**
5. **CTA:** Book a demo / `We're hiring` (only if true).

---

# PAGE: Redu (`/redu`)

Warmer, patient-facing. This is your App Store / Product Hunt / SEO surface.

1. **Hero:** `H1: A second chance with your health, one day at a time.` Sub: log meals and glucose in seconds; see what's actually working; stay connected to your dietitian between visits.
2. **CTAs:** `Download on the App Store` · `Get it on Google Play`.
3. **What you can do:** 3–4 simple benefit blocks (log fast · see patterns · stay on track · work with your dietitian). Patient language, not clinical.
4. **"Redu" meaning:** one line on the renewal / second-chance idea — it's a nice brand beat.
5. **For dietitians strip:** `Are you an RD? Redu comes with the GlucoSolutions dashboard →` (sends qualified clinicians back to the money page).
6. **Privacy reassurance:** one patient-friendly line + link to `/security`.

---

# PAGE: Contact (`/contact`)

- **H1: Book a 20-minute demo.**
- Sub: We'll walk through GlucoSolutions on a real, de-identified case — yours if you have one.
- Embed Calendly (or a 4-field form: name, email, practice name, "what's your biggest between-session headache?"). The last field is qualifying *and* discovery data.
- Alt contact: `Prefer email? hello@glucosolutions.ca` **[CONFIRM address — you've set up SPF/DKIM on glucosolutions.ca]**

---

# Cross-site notes

**CTA discipline:** every page ends in the same primary action — **Book a demo**. One job.

**No fake proof.** Until you have RD testimonials, replace the usual logo wall with: the provenance/"shows its work" section, the security page, and the founder story. Those are your trust substitutes.

**Status tags are load-bearing.** `[Available]` vs `[In development]` on every feature. This is what separates you from the vaporware AI-health crowd in an investor's eyes.

**SEO/meta (low priority, but set it):**
- Title: `GlucoSolutions — Clinical software for solo dietitians`
- Description: `See what your patients do between sessions. Sourced AI interpretation, a patient app, and outcomes reporting — built for solo private-practice RDs.`
- `/redu` gets its own patient-oriented title/description for App Store referral.

---

# Open questions — resolve before launch
1. **Redu bundling:** unlimited patients or per-seat? Any per-patient cost to the RD?
2. **Pilot pricing:** is there a founding-RD/pilot rate, or flat $199 from day one?
3. **Data residency:** is PHI stored in Canada *today*? If not, what's the accurate statement?
4. **Security specifics:** which of encryption-at-rest, audit logs, RBAC, no-training-on-data are actually live and publishable?
5. **"Dietitians" plural vs singular** in hero credibility line — you have one committed RD.
6. **Hardware origin story:** on the public site or not?
7. **Recognition list:** which awards/affiliations go public; YC omitted or "applied" only?
8. **Contact email + company X handle** for the footer.