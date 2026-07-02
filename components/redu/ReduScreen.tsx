import Image from "next/image";

/**
 * ReduScreen — a real screenshot of the Redu patient app, sized to sit inside
 * <PhoneFrame> (which already clips to the 9:19.5 screen and rounds the corners).
 * These are the actual product screens, not a recreation.
 */
export function ReduScreen({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="320px"
      className="object-cover object-top"
      priority={false}
    />
  );
}
