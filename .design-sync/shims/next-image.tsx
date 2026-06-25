import React from "react";
import wordmarkCharcoal from "../../public/brand/wordmark-charcoal.png";
import wordmarkWhite from "../../public/brand/wordmark-white.png";
// Small brand assets inlined so the Wordmark component renders its real lockup
// (the component references these by internal /public path, which a preview
// card / a built design can't fetch). Large photos stay as placeholders.
const PUBLIC_ASSETS: Record<string, string> = {
  "/brand/wordmark-charcoal.png": wordmarkCharcoal as unknown as string,
  "/brand/wordmark-white.png": wordmarkWhite as unknown as string,
};
// design-sync shim: render next/image as a plain <img> for static previews.
// Root-absolute paths (/photos/...) reference the Next /public server, which
// doesn't exist in a preview card — render a clean branded placeholder using
// the alt text instead of a broken-image icon. Inlined (data:) and remote
// (http:) sources render as real images.
type Props = {
  src: any; alt?: string; width?: number | string; height?: number | string;
  fill?: boolean; className?: string; style?: React.CSSProperties; priority?: boolean;
  sizes?: string; quality?: number; placeholder?: string; loading?: string;
  [k: string]: any;
};
export default function Image({ src, alt = "", fill, width, height, style, className, ...rest }: Props) {
  const raw = typeof src === "string" ? src : src?.src ?? "";
  const url = PUBLIC_ASSETS[raw] ?? raw;
  const resolvable = /^(data:|https?:|blob:)/.test(url);
  const { priority, quality, placeholder, sizes, loader, blurDataURL, unoptimized, ...domRest } = rest as any;
  const fillStyle: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
    : {};
  if (resolvable) {
    return <img src={url} alt={alt} width={width as any} height={height as any} className={className} style={{ ...fillStyle, ...style }} {...domRest} />;
  }
  // Unresolvable /public path → branded placeholder using the alt text.
  return (
    <span
      role="img"
      aria-label={alt}
      className={className}
      style={{
        ...fillStyle,
        ...(fill ? {} : { display: "flex", width: width as any, height: height as any }),
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#F3EDE2,#D8D4C7)",
        color: "#5B5A52",
        fontFamily: "var(--font-sans)",
        fontSize: 11,
        letterSpacing: "0.04em",
        textAlign: "center",
        padding: 12,
        boxSizing: "border-box",
        overflow: "hidden",
        ...style,
      }}
    >
      {alt || ""}
    </span>
  );
}
