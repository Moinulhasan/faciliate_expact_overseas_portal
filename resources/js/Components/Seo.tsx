import { Head, usePage } from "@inertiajs/react";
import { localizePath } from "@/hooks/useLocale";
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
  const { canonical, site, alternates, locale, appUrl } = usePage<SharedProps>().props;
  // Breadcrumb URLs are built from English paths; point them at the /bn mirror on Bangla pages.
  const ld = jsonLd.map((block) =>
    block["@type"] === "BreadcrumbList"
      ? {
          ...block,
          itemListElement: (block.itemListElement as { item: string }[]).map((li) => ({
            ...li,
            item: appUrl + localizePath(li.item.slice(appUrl.length) || "/", locale),
          })),
        }
      : block,
  );
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
      <meta head-key="og:locale" property="og:locale" content={locale === "bn" ? "bn_BD" : "en_US"} />
      <link head-key="alt-en" rel="alternate" hrefLang="en" href={alternates.en} />
      <link head-key="alt-bn" rel="alternate" hrefLang="bn" href={alternates.bn} />
      <link head-key="alt-default" rel="alternate" hrefLang="x-default" href={alternates.en} />
      <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta head-key="twitter:title" name="twitter:title" content={fullTitle} />
      <meta head-key="twitter:description" name="twitter:description" content={description} />
      {ld.length > 0 && (
        <script head-key="jsonld" type="application/ld+json">
          {JSON.stringify(ld.length === 1 ? ld[0] : ld).replace(/</g, "\\u003c")}
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
