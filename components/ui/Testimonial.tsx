import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { Avatar } from "./Avatar";

/**
 * Testimonial — editorial quote (Newsreader) + attribution.
 *
 * NOTE: per content.md's honesty constraints, this must only ever render a
 * REAL, attributable quote. No fabricated testimonials, no testimonial wall.
 * Until a launch RD agrees to be quoted, do not place this on the site.
 */
export function Testimonial({
  quote,
  name,
  role,
  initials,
  className,
}: {
  quote: string;
  name: string;
  role: string;
  initials: string;
  className?: string;
}) {
  return (
    <Card className={cn("p-7", className)}>
      <Quote className="text-sky-500" size={22} aria-hidden />
      <p className="my-3.5 font-serif text-[21px] leading-[1.4] text-ink-900 text-pretty">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <Avatar initials={initials} tone="green" size={42} />
        <div>
          <div className="text-sm font-semibold text-ink-900">{name}</div>
          <div className="text-[13px] text-ink-500">{role}</div>
        </div>
      </div>
    </Card>
  );
}
