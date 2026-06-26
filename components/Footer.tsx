import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/ui";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Product", href: "/product" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
      { label: "Redu", href: "/redu" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
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

export function Footer() {
  return (
    <footer className="border-t border-line bg-page">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark href="/" size={28} />
            <p className="mt-4 text-[14px] text-ink-500">
              Clinical software for solo dietitians.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="mono-label mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-ink-700 transition-colors hover:text-sky-700"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 GlucoSolutions Inc.</span>
          <div className="flex items-center gap-5">
            {/* [CONFIRM] company X handle — placeholder uses founder handle from content.md */}
            <a
              href="https://x.com/_tenZdhon_"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-sky-700"
            >
              X / @_tenZdhon_
            </a>
            <span>Toronto, Canada</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
