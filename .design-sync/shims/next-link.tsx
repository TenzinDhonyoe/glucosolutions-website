import React from "react";
// design-sync shim: render next/link as a plain <a>.
type Props = { href?: any; children?: React.ReactNode; className?: string; [k: string]: any };
export default function Link({ href, children, ...rest }: Props) {
  const { prefetch, replace, scroll, shallow, locale, passHref, legacyBehavior, ...domRest } = rest as any;
  const url = typeof href === "string" ? href : href?.pathname ?? "#";
  return <a href={url} {...domRest}>{children}</a>;
}
