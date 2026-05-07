import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

const NAV = [
  { href: "/#science", label: "How it works" },
  { href: "/#problem", label: "Why it matters" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#waitlist", label: "Waitlist" },
];

const CONNECT = [
  { href: "https://x.com/gluco_solutions", label: "X / Twitter", external: true },
  { href: "https://www.linkedin.com/company/glucosolutions", label: "LinkedIn", external: true },
  { href: "/privacy", label: "Privacy", external: false },
  { href: "/terms", label: "Terms", external: false },
];

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-paper border-t border-stone">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Wordmark size={28} variant="knockout" href={null} showMark={false} />
          <p className="mt-6 max-w-sm text-[14px] leading-[1.7] text-paper/70">
            Food-first guidance for adults with prediabetes. Real change,
            tracked gently.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-paper/60">site</h3>
          <ul className="mt-5 space-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[14px] text-paper/85 hover:text-paper transition-colors duration-220 border-b border-transparent hover:border-paper/60 pb-[1px]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-paper/60">connect</h3>
          <ul className="mt-5 space-y-3">
            {CONNECT.map((l) =>
              l.external ? (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-paper/85 hover:text-paper transition-colors duration-220 border-b border-transparent hover:border-paper/60 pb-[1px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-paper/85 hover:text-paper transition-colors duration-220 border-b border-transparent hover:border-paper/60 pb-[1px]"
                  >
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="caption max-w-3xl text-paper/55">
            Gluco Solutions is a wellness product. Not a medical device, not
            intended to diagnose, treat, cure, or prevent any disease, and not
            a substitute for medical-grade glucose monitoring or professional
            medical advice.
          </p>
          <p className="caption text-paper/55 whitespace-nowrap">
            © 2026 Gluco Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
