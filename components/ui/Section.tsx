import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "page" | "card" | "sunken" | "ink";

const TONES: Record<Tone, string> = {
  page: "bg-page text-ink-700",
  card: "bg-card text-ink-700",
  sunken: "bg-sunken text-ink-700",
  ink: "bg-ink-900 text-page", // dark band — used sparingly for the final CTA
};

/**
 * Section shell — owns the vertical rhythm and an optional surface tone so the
 * scroll alternates calm/rich per the DS spacing discipline. Set `bleed` to opt
 * out of the inner Container (for full-bleed hero/CTA rows).
 */
export function Section({
  children,
  id,
  tone = "page",
  className,
  innerClassName,
  bleed = false,
  divider = false,
}: {
  children: React.ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  bleed?: boolean;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 md:py-28",
        TONES[tone],
        divider && "border-t border-line",
        className,
      )}
    >
      {bleed ? children : <Container className={innerClassName}>{children}</Container>}
    </section>
  );
}
