/**
 * Fixed-position film grain overlay. Rendered once at the layout level.
 * Sits above page content via z-index but is pointer-events-none so it
 * never blocks interaction.
 */
export function Grain() {
  return <div aria-hidden className="grain-overlay" />;
}
