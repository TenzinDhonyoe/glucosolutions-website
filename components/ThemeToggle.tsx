"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { isDark, onThemeChange, setTheme } from "@/components/stage/theme";

const subscribe = (cb: () => void) => onThemeChange(() => cb());

/** Sun / moon switch for the whole site. */
export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-line text-ink-700 transition-colors duration-300 hover:border-line-2 hover:text-ink-900",
        className
      )}
    >
      {dark ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
    </button>
  );
}
