import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/ui";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "FAQ", href: "/#faq" },
      { label: "Join the waitlist", href: "/#waitlist" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "mailto:tenzin@glucosolutions.ca" },
      { label: "X", href: "https://x.com/gluco_solutions" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "SMS Program", href: "/sms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-page">
      <Container className="pb-10 pt-16 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark href="/" size={24} />
            <p className="mt-4 text-[14px] leading-relaxed text-ink-500">
              A needle-free glucose band for people with prediabetes.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="mb-4 text-[13px] font-medium text-ink-400">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => {
                  const cls = "text-[14px] text-ink-700 transition-colors hover:text-ink-900";
                  if (l.href.startsWith("/")) {
                    return (
                      <li key={l.href}>
                        <Link href={l.href} className={cls}>
                          {l.label}
                        </Link>
                      </li>
                    );
                  }
                  const external = l.href.startsWith("http");
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className={cls}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-6 text-[13px] text-ink-400">
          <p className="max-w-3xl leading-relaxed">
            GlucoSolutions is a wellness product. It is not a medical device, is not intended
            to diagnose, treat, cure, or prevent any disease, and is not a substitute for
            medical-grade glucose monitoring or professional medical advice.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-between">
            <span>&copy; 2026 GlucoSolutions Inc.</span>
            <span>Toronto, Canada</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
