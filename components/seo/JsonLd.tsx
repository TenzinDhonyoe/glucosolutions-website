import { graph, type JsonLdNode } from "@/lib/seo/jsonLd";

export function JsonLd({ nodes }: { nodes: readonly JsonLdNode[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(nodes)) }}
    />
  );
}
