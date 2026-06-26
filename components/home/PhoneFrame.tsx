import { cn } from "@/lib/utils";

/**
 * PhoneFrame — a clean device shell for showing the Redu patient app. Neutral
 * dark bezel, rounded screen; pass the app screen as children.
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[300px] rounded-[2.4rem] border border-ink-900/10 bg-ink-900 p-2.5 shadow-lg",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.9rem] bg-page">
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink-900/15" />
        {children}
      </div>
    </div>
  );
}
