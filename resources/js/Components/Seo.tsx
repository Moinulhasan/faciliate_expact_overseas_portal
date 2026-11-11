import { Head, usePage } from "@inertiajs/react";
import type { SharedProps } from "@/types";

type JsonLd = Record<string, unknown>;

// One place for per-page SEO: <title>, description, canonical, Open Graph/Twitter and JSON-LD (CLAUDE.md §8.5).
export function Seo({
  title,
  description,
  jsonLd = [],
  type = "website",
}: {
  title: string;
  description: string;
  jsonLd?: JsonLd[];
  type?: "website" | "article";
}) {
  const { canonical, site } = usePage<SharedProps>().props;
  const fullTitle = `${title} — Facilitate Expat Overseas`;

  return (
    <Head title={title}>
      <meta head-key="description" name="description" content={description} />
      <link head-key="canonical" rel="canonical" href={canonical} />
      <meta head-key="og:type" property="og:type" content={type} />
      <meta head-key="og:site_name" property="og:site_name" content={site.name} />
      <meta head-key="og:title" property="og:title" content={fullTitle} />
      <meta head-key="og:description" property="og:description" content={description} />
      <meta head-key="og:url" property="og:url" content={canonical} />
      <meta head-key="og:locale" property="og:locale" content="en_US" />
      <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta head-key="twitter:title" name="twitter:title" content={fullTitle} />
      <meta head-key="twitter:description" name="twitter:description" content={description} />
      {jsonLd.length > 0 && (
        <script head-key="jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd).replace(/</g, "\\u003c")}
        </script>
      )}
    </Head>
  );
}

export function breadcrumbLd(appUrl: string, items: { name: string; href: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: appUrl + it.href })),
  };
}

export function faqLd(items: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function itemListLd(appUrl: string, items: { name: string; href: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: appUrl + it.href })),
  };
}
