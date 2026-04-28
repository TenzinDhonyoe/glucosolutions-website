import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "#science", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: "#waitlist", label: "Waitlist" },
];

const CONNECT = [
  {
    href: "https://x.com/gluco_solutions",
    label: "X / Twitter",
    external: true,
  },
  {
    href: "https://www.linkedin.com/company/glucosolutions",
    label: "LinkedIn",
    external: true,
  },
  { href: "/privacy", label: "Privacy", external: false },
  { href: "/terms", label: "Terms", external: false },
];

export function Footer() {
  return (
    <footer className="bg-ink-0 text-white border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Image
            src="/wordmark.png"
            alt="GlucoSolutions"
            width={1920}
            height={300}
            className="h-7 w-auto"
          />
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/55">
            Non-invasive glycemic trend awareness for daily life.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
            Site
          </h3>
          <ul className="mt-5 space-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[14px] text-white/75 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
            Connect
          </h3>
          <ul className="mt-5 space-y-3">
            {CONNECT.map((l) =>
              l.external ? (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-white/75 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-white/75 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] leading-relaxed text-white/35 max-w-3xl">
            GlucoSolutions is a wellness product. It is not a medical device,
            not intended to diagnose, treat, cure, or prevent any disease, and
            is not a substitute for medical-grade glucose monitoring or
            professional medical advice.
          </p>
          <p className="text-[12px] text-white/35 whitespace-nowrap">
            © 2026 GlucoSolutions Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
