// design-sync shim for @/lib/seo/jsonLd — the JsonLd component only calls graph();
// the real module reads process.env at top level (undefined in the preview runtime).
export type JsonLdNode = Record<string, unknown>;
export function graph(nodes: readonly JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
