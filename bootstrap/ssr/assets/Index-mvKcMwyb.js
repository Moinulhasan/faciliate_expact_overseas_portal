import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { LayoutGroup, m, AnimatePresence } from "motion/react";
import { useState } from "react";
import { I as IndustryCard } from "./IndustryCard-D8yL-ANg.js";
import { u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd, i as itemListLd, e as ButtonLink, c as Section, C as Container, g as cn, k as ease, l as dur } from "./SiteLayout-hZjGrTmB.js";
import { F as FinalCta } from "./Card-9Ubla1vH.js";
import { P as PageHero, H as HeroPill } from "./PageHero-mEN2jfPE.js";
import { S as SearchInput, N as NoResults } from "./SearchInput-Cd8O2Zx5.js";
import { u as useSearchQuery, m as matches } from "./search-B7Us7PSw.js";
import "./FlagIcon-CPJ7bVnz.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
const groups = ["construction", "industrial", "services", "operations"];
function IndustriesIndex({ industries }) {
  const { t } = useLocale();
  const { appUrl } = usePage().props;
  const [group, setGroup] = useState("all");
  const [q, setQ] = useSearchQuery();
  const searched = industries.filter(
    (i) => matches(q, [i.name, i.summary, ...i.roles, ...i.countries.map((c) => c.name), i.group ? t(`pages.industries.groups.${i.group}`) : null])
  );
  const shown = group === "all" ? searched : searched.filter((i) => i.group === group);
  const countIn = (g) => g === "all" ? searched.length : searched.filter((i) => i.group === g).length;
  const countryCount = new Set(industries.flatMap((i) => i.countries.map((c) => c.iso2))).size;
  const roleCount = industries.reduce((n, i) => n + i.roles.length, 0);
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("pages.crumbs.industries"), href: "/industries" }
  ];
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("pages.industries.meta_title"),
        description: t("pages.industries.meta_description"),
        jsonLd: [breadcrumbLd(appUrl, crumbs), itemListLd(appUrl, industries.map((i) => ({ name: i.name, href: `/industries/${i.slug}` })))]
      }
    ),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        crumbs,
        eyebrow: /* @__PURE__ */ jsx(HeroPill, { children: t("pages.industries.eyebrow") }),
        title: t("pages.industries.title"),
        accent: t("pages.industries.accent"),
        lead: t("pages.industries.lead", { n: industries.length }),
        actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(ButtonLink, { href: "/apply", size: "lg", children: [
            t("pages.apply"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] }),
          /* @__PURE__ */ jsx(ButtonLink, { href: "/employers/request", size: "lg", variant: "quiet", children: t("pages.request") })
        ] }),
        aside: /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-3 gap-px overflow-hidden rounded-(--radius-card) border border-night-line bg-night-line", children: [
          [industries.length, t("pages.crumbs.industries")],
          [roleCount, t("pages.industries.roles_label")],
          [countryCount, t("pages.crumbs.countries")]
        ].map(([v, l]) => /* @__PURE__ */ jsxs("div", { className: "bg-night-2/90 p-5", children: [
          /* @__PURE__ */ jsx("dd", { className: "text-[30px] leading-9 font-semibold tracking-[-0.02em] text-white tabular-nums", children: v }),
          /* @__PURE__ */ jsx("dt", { className: "text-[13px] text-night-muted", children: l })
        ] }, String(l))) })
      }
    ),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(LayoutGroup, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col-reverse gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsx("div", { role: "tablist", "aria-label": t("pages.crumbs.industries"), className: "flex flex-wrap gap-2", children: ["all", ...groups].map((g) => /* @__PURE__ */ jsxs(
          "button",
          {
            role: "tab",
            "aria-selected": group === g,
            onClick: () => setGroup(g),
            className: cn(
              "relative h-10 rounded-full border px-4 text-sm font-medium transition-colors",
              group === g ? "border-brand text-white" : "border-line bg-surface text-muted hover:border-brand hover:text-ink"
            ),
            children: [
              group === g && /* @__PURE__ */ jsx(m.span, { layoutId: "ind-tab", className: "absolute inset-0 rounded-full bg-brand", transition: { type: "spring", stiffness: 260, damping: 28 } }),
              /* @__PURE__ */ jsxs("span", { className: "relative", children: [
                g === "all" ? t("pages.industries.all") : t(`pages.industries.groups.${g}`),
                /* @__PURE__ */ jsx("span", { className: cn("ml-1.5 tabular-nums", group === g ? "text-white/70" : "text-faint"), children: countIn(g) })
              ] })
            ]
          },
          g
        )) }),
        /* @__PURE__ */ jsx(
          SearchInput,
          {
            value: q,
            onChange: setQ,
            label: t("pages.search.industries_label"),
            placeholder: t("pages.search.industries_placeholder"),
            count: `${shown.length}/${industries.length}`,
            resultsText: q.trim() ? t("pages.search.results", { n: shown.length, total: industries.length }) : t("pages.search.all", { total: industries.length }),
            className: "lg:w-[400px] lg:shrink-0"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(m.ul, { layout: true, className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", initial: false, children: shown.map((ind) => /* @__PURE__ */ jsx(
        m.li,
        {
          layout: true,
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, scale: 0.98 },
          transition: { duration: dur.md, ease: ease.out },
          className: "flex",
          children: /* @__PURE__ */ jsx(IndustryCard, { industry: ind, countries: ind.countries })
        },
        ind.slug
      )) }) }),
      shown.length === 0 && /* @__PURE__ */ jsx(
        NoResults,
        {
          title: q.trim() ? t("pages.search.none_title", { q: q.trim() }) : t("pages.search.clear"),
          body: t("pages.search.industries_none"),
          clearLabel: t("pages.search.clear"),
          onClear: () => {
            setQ("");
            setGroup("all");
          }
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(FinalCta, {})
  ] });
}
export {
  IndustriesIndex as default
};
