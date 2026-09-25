import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "The band", href: "/#band" },
      { label: "Questions", href: "/#faq" },
      { label: "Join the waitlist", href: "/#join" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "tenzin@glucosolutions.ca", href: "mailto:tenzin@glucosolutions.ca" },
      { label: "X", href: "https://x.com/gluco_solutions" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "SMS program", href: "/sms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-pine text-white/70">
      <div className="mx-auto max-w-page px-5 pb-10 pt-16 sm:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-5 max-w-[22rem] text-[15.5px] leading-relaxed">
              A needle-free glucose band for people with prediabetes. Made in Toronto.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            {COLUMNS.map((c) => (
              <div key={c.heading}>
                <h2 className="text-[14px] font-semibold text-white">{c.heading}</h2>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {c.links.map((l) => {
                    const external = l.href.startsWith("http");
                    return (
                      <li key={l.href}>
                        {l.href.startsWith("/") ? (
                          <Link href={l.href} className="transition-colors hover:text-white">
                            {l.label}
                          </Link>
                        ) : (
                          <a
                            href={l.href}
                            className="break-all transition-colors hover:text-white sm:break-normal"
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {l.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-white/12 pt-8 text-[13px] leading-relaxed text-white/50">
          <p className="max-w-[52rem]">
            GlucoSolutions is a wellness product. It is not a medical device, is not
            intended to diagnose, treat, cure, or prevent any disease, and is not a
            substitute for medical-grade glucose monitoring or professional medical advice.
          </p>
          <p className="mt-4">&copy; 2026 GlucoSolutions Inc.</p>
        </div>
      </div>
    </footer>
  );
}
