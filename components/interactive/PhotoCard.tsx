import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  /** When true, applies the brand hexagon clip — reserved for hero photo crops. */
  hex?: boolean;
  /** Set to false to skip the corner-darkening radial vignette overlay. */
  vignette?: boolean;
};

/**
 * Photo + caption styled like a film-still or polaroid index. Per DESIGN.md,
 * a hexagonal crop is the brand's signature for select hero photos.
 */
export function PhotoCard({
  src,
  alt,
  caption,
  ratio = "4 / 5",
  className,
  priority,
  hex = false,
  vignette = true,
}: Props) {
  return (
    <figure className={cn("relative", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-oat",
          hex ? "hex-clip" : "rounded-md"
        )}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover cine-grade"
        />
        {!hex && vignette && <div className="vignette opacity-60" />}
      </div>
      {caption && (
        <figcaption className="caption mt-3 italic">{caption}</figcaption>
      )}
    </figure>
  );
}
