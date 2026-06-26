"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Dialog — the DS modal: dimmed, blurred overlay with a rounded white panel and
 * a soft-large shadow. Closes on overlay click and Escape. Controlled.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(43,38,32,0.38)] p-6 backdrop-blur-[3px]"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-[440px] rounded-xl bg-card p-8 shadow-lg",
          className,
        )}
      >
        <div className="mb-1.5 flex items-start justify-between">
          <div className="min-w-0">
            {title ? (
              <h3 className="font-serif text-[25px] font-medium text-ink-900">{title}</h3>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-ink-400 hover:bg-sunken hover:text-ink-700"
          >
            <X size={20} />
          </button>
        </div>
        {description ? <p className="mb-5 text-[15px] text-ink-500">{description}</p> : null}
        {children}
      </div>
    </div>
  );
}
