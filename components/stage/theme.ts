// Light / dark theme: a data-theme attribute on <html>, remembered in
// localStorage (applied before first paint by a script in the root layout).
// The CSS tokens do most of the work; canvas art reads these helpers to pick
// its dot colours and redraws when the theme changes.

export type Theme = "light" | "dark";

export const isDark = () =>
  typeof document !== "undefined" && document.documentElement.dataset.theme === "dark";

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private mode: the choice just won't persist.
  }
}

/** Calls back whenever the theme flips. Returns an unsubscribe. */
export function onThemeChange(cb: (dark: boolean) => void) {
  const mo = new MutationObserver(() => cb(isDark()));
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

type RGB = [number, number, number];

/**
 * The particle red. The brand red (#e5332a) by day; at night a brighter coral
 * (#ff6155), because the brand red sinks into near-black (about 3.6:1 against
 * the page, versus 6.4:1).
 */
export const dotRed = (dark: boolean): RGB => (dark ? [255, 97, 85] : [229, 51, 42]);
export const rgba = (c: readonly number[], a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/** The particle ink: near-black by day, warm off-white by night. */
export const dotInk = (dark: boolean): RGB => (dark ? [236, 234, 228] : [28, 28, 27]);
/** The particle gray (hydrogen, secondary dots). */
export const dotGray = (dark: boolean): RGB => (dark ? [118, 117, 113] : [168, 168, 163]);
/** Theme text colours for labels drawn in canvas. */
export const canvasText = (dark: boolean) =>
  dark
    ? { strong: "#f1f0ec", body: "#a09f9a", muted: "#797874", line: "241,240,236" }
    : { strong: "#161616", body: "#676764", muted: "#8b8b87", line: "22,22,22" };
