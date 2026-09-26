import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

const PAGES = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/sms", label: "Text messaging program" },
  { href: "/delete-account", label: "Deleting your account" },
];

/**
 * Shared frame for long-form legal pages: title, date and sibling pages in a
 * sticky left column; the text in a comfortable reading measure on the right.
 * Page bodies are plain semantic HTML styled by the `.legal` class.
 */
export function LegalPage({
  path,
  title,
  updated,
  updatedLabel,
  children,
}: {
  path: string;
  title: string;
  updated: string;
  updatedLabel: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-page">
        <Container className="grid gap-12 pb-24 pt-36 md:pb-32 md:pt-44 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h1 className="display-serif text-[clamp(2.2rem,1.6rem+2.2vw,3.25rem)]">{title}</h1>
              <p className="mt-4 text-[15px] text-ink-400">
                Last updated <time dateTime={updated}>{updatedLabel}</time>
              </p>
              <nav aria-label="Legal pages" className="mt-10 hidden border-t border-line pt-6 lg:block">
                <ul className="space-y-2.5 text-[15px]">
                  {PAGES.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        aria-current={p.href === path ? "page" : undefined}
                        className={cn(
                          "transition-colors hover:text-ink-900",
                          p.href === path ? "font-medium text-ink-900" : "text-ink-500"
                        )}
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <article className="legal max-w-prose lg:col-span-8 lg:pl-6 [&>section:first-child>h2]:mt-0">
            {children}
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
