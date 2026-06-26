import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container, Button } from "@/components/ui";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Product", href: "/product" },
      { label: "Security", href: "/security" },
      { label: "Redu", href: "/redu" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

/**
 * Footer — the closing band. Mirrors the hero's framed treatment (a full-bleed
 * photo inside a rounded card with an even cream bezel) but only on the sides
 * and top; the bottom runs flush to the page edge. The "Book a demo" CTA and the
 * footer navigation both live over the image, kept legible by a warm ink wash.
 */
export function Footer() {
  return (
    <footer className="bg-page">
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-t-[1.75rem] ring-1 ring-ink-900/10">
          <Image
            src="/cta-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* warm legibility wash — dark at the CTA and footer, sunflowers showing through the middle */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(43,38,32,0.82) 0%, rgba(43,38,32,0.48) 42%, rgba(43,38,32,0.60) 68%, rgba(43,38,32,0.91) 100%)",
            }}
          />

          <div className="relative z-10">
            {/* Book a demo CTA */}
            <Container className="px-6 pb-16 pt-24 text-center md:pb-20 md:pt-32">
              <p className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-page/60">
                <span className="mr-2 text-page/40">~</span>Ready when you are
              </p>
              <h2 className="display-serif mt-5 text-[clamp(2.2rem,5vw,3.75rem)] text-page text-balance">
                See it on your own caseload.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[18px] leading-relaxed text-page/75">
                A 20-minute walkthrough on a real, de-identified case. No slides.
              </p>
              <div className="mt-9 flex justify-center">
                <Button
                  href="/contact"
                  size="lg"
                  pill
                  variant="secondary"
                  iconRight={ArrowRight}
                >
                  Book a demo
                </Button>
              </div>
            </Container>

            {/* footer navigation */}
            <Container className="border-t border-page/15 py-12">
              <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <div className="max-w-xs">
                  <Wordmark href="/" size={28} className="brightness-0 invert" />
                  <p className="mt-4 text-[14px] text-page/65">
                    Clinical software for dietitians.
                  </p>
                </div>

                {COLUMNS.map((col) => (
                  <nav key={col.heading} aria-label={col.heading}>
                    <h3 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-page/50">
                      {col.heading}
                    </h3>
                    <ul className="space-y-2.5">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="text-[14px] text-page/80 transition-colors hover:text-white"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-3 border-t border-page/15 pt-6 text-[13px] text-page/60 sm:flex-row sm:items-center sm:justify-between">
                <span>© 2026 GlucoSolutions Inc.</span>
                <div className="flex items-center gap-5">
                  <a
                    href="https://x.com/gluco_solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    X / @gluco_solutions
                  </a>
                  <span>Toronto, Canada</span>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </footer>
  );
}
