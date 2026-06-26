import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

/**
 * PageHero — consistent subpage opening: soft tonal lift, optional eyebrow,
 * serif H1, lead paragraph, and an optional CTA/extra slot.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
        style={{ background: "linear-gradient(180deg, #FBF7F0 0%, var(--color-page) 100%)" }}
      />
      <Container className="relative">
        <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow ? <Eyebrow className={center ? "justify-center" : undefined}>{eyebrow}</Eyebrow> : null}
          <h1 className="display-serif mt-5 text-[clamp(2.25rem,5vw,3.5rem)] text-ink-900 text-balance">
            {title}
          </h1>
          {lead ? (
            <p
              className={cn(
                "mt-6 text-[19px] leading-relaxed text-ink-500",
                center && "mx-auto",
              )}
            >
              {lead}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
