import { cn } from "@/lib/utils";

const CONTROL =
  "w-full rounded-md border bg-card-2 px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:border-sky-600 focus:bg-card";

/** Field label — 13px semibold ink-700. */
export function Label({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-1.5 block text-[13px] font-semibold text-ink-700", className)}
    >
      {children}
    </label>
  );
}

/** Text input. `mono` switches to tabular figures for clinical values. */
export function Input({
  className,
  mono = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { mono?: boolean }) {
  return (
    <input
      className={cn(CONTROL, "border-line-2", mono && "tnum", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(CONTROL, "border-line-2 resize-none", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(CONTROL, "border-line-2 cursor-pointer appearance-none pr-10", className)}
      {...props}
    >
      {children}
    </select>
  );
}

/**
 * Field — label + control + optional hint, the standard stacked form row.
 */
export function Field({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="mt-1.5 text-[13px] text-ink-500">{hint}</p> : null}
    </div>
  );
}
