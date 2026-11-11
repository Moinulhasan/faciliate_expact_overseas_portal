import { jsx, jsxs } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { C as CountryCard } from "./CountryCard-BiAgkKXp.js";
import { u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd, i as itemListLd, e as ButtonLink, c as Section, C as Container, d as SectionHead } from "./SiteLayout-hZjGrTmB.js";
import { F as FinalCta } from "./Card-9Ubla1vH.js";
import { P as PageHero, H as HeroPill } from "./PageHero-mEN2jfPE.js";
import { F as FlagIcon } from "./FlagIcon-CPJ7bVnz.js";
import { S as SearchInput, N as NoResults } from "./SearchInput-Cd8O2Zx5.js";
import { u as useSearchQuery, m as matches } from "./search-B7Us7PSw.js";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "react";
import "class-variance-authority";
const regions = ["gcc", "east_asia", "se_asia", "europe"];
function CountriesIndex({ countries }) {
  const { t } = useLocale();
  const { appUrl } = usePage().props;
  const [q, setQ] = useSearchQuery();
  const shown = countries.filter(
    (c) => matches(q, [c.name, c.visa_type, c.currency, t(`pages.countries.regions.${c.region}`), ...c.top_trades, c.keywords])
  );
  const visibleRegions = regions.filter((r) => shown.some((c) => c.region === r));
  const search = /* @__PURE__ */ jsx(
    SearchInput,
    {
      value: q,
      onChange: setQ,
      label: t("pages.search.countries_label"),
      placeholder: t("pages.search.countries_placeholder"),
      count: `${shown.length}/${countries.length}`,
      resultsText: q.trim() ? t("pages.search.results", { n: shown.length, total: countries.length }) : t("pages.search.all", { total: countries.length }),
      className: "md:w-[400px] md:shrink-0"
    }
  );
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("pages.crumbs.countries"), href: "/countries" }
  ];
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("pages.countries.meta_title"),
        description: t("pages.countries.meta_description"),
        jsonLd: [breadcrumbLd(appUrl, crumbs), itemListLd(appUrl, countries.map((c) => ({ name: c.name, href: `/countries/${c.slug}` })))]
      }
    ),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        crumbs,
        eyebrow: /* @__PURE__ */ jsx(HeroPill, { children: t("pages.countries.eyebrow") }),
        title: t("pages.countries.title"),
        accent: t("pages.countries.accent"),
        lead: t("pages.countries.lead", { n: countries.length }),
        actions: /* @__PURE__ */ jsxs(ButtonLink, { href: "/apply", size: "lg", children: [
          t("pages.apply"),
          " ",
          /* @__PURE__ */ jsx(ArrowRight, {})
        ] }),
        aside: /* @__PURE__ */ jsx("nav", { "aria-label": t("pages.crumbs.countries"), className: "card-night grid gap-2 p-3", children: regions.map((r) => {
          const list = shown.filter((c) => c.region === r);
          if (!list.length) return null;
          return /* @__PURE__ */ jsxs(
            "a",
            {
              href: `#${r}`,
              className: "group flex items-center justify-between gap-4 rounded-(--radius-item) bg-night-2 p-3.5 transition-colors hover:bg-white/[0.06]",
              children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("span", { className: "block text-[15px] font-semibold", children: t(`pages.countries.regions.${r}`) }),
                  /* @__PURE__ */ jsx("span", { className: "text-[13px] text-night-muted", children: t("pages.countries.n_countries", { n: list.length }) })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "flex -space-x-1.5", children: list.slice(0, 5).map((c) => /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-[3px] ring-2 ring-night-2", children: /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, className: "h-4 w-[22px]" }) }, c.iso2)) })
              ]
            },
            r
          );
        }) })
      }
    ),
    (visibleRegions.length ? visibleRegions : [null]).map((r, i) => {
      const list = r ? shown.filter((c) => c.region === r) : [];
      return /* @__PURE__ */ jsx(Section, { id: r ?? void 0, tone: i % 2 ? "alt" : "bg", className: "scroll-mt-20", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx(
          SectionHead,
          {
            title: r ? t(`pages.countries.regions.${r}`) : t("pages.search.none_title", { q: q.trim() }),
            lead: r ? t(`pages.countries.region_lead.${r}`) : void 0,
            aside: i === 0 ? search : void 0
          }
        ),
        r ? /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: list.map((c) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(CountryCard, { country: c }) }, c.slug)) }) : /* @__PURE__ */ jsx(
          NoResults,
          {
            title: t("pages.search.clear"),
            body: t("pages.search.countries_none"),
            clearLabel: t("pages.search.clear"),
            onClear: () => setQ("")
          }
        )
      ] }) }, i);
    }),
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("p", { className: "py-6 text-[13px] text-faint", children: t("pages.typical") }) }),
    /* @__PURE__ */ jsx(FinalCta, {})
  ] });
}
export {
  CountriesIndex as default
};
