import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage, router } from "@inertiajs/react";
import { ArrowRight, MessageCircle, RotateCcw, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { C as CountryCard } from "./CountryCard-BiAgkKXp.js";
import { J as JobCard } from "./JobCard-DmK72EL7.js";
import { u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd, c as Section, C as Container, e as ButtonLink, B as ButtonAnchor, d as SectionHead, g as cn } from "./SiteLayout-hZjGrTmB.js";
import { F as FinalCta } from "./Card-9Ubla1vH.js";
import { P as PageHero, H as HeroPill } from "./PageHero-mEN2jfPE.js";
import { S as SearchInput, N as NoResults } from "./SearchInput-Cd8O2Zx5.js";
import "./FlagIcon-CPJ7bVnz.js";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "motion/react";
function Select({ label, value, onChange, children }) {
  return /* @__PURE__ */ jsxs("label", { className: "relative block min-w-0", children: [
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: label }),
    /* @__PURE__ */ jsx(
      "select",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        className: cn(
          "h-10 w-full cursor-pointer appearance-none rounded-full border bg-surface pr-9 pl-4 text-sm transition-colors outline-none hover:border-brand/50 focus:border-brand focus:shadow-[0_0_0_4px_rgba(28,121,73,.12)]",
          value ? "border-brand/50 font-medium text-ink" : "border-line text-muted"
        ),
        children
      }
    ),
    /* @__PURE__ */ jsx(ChevronDown, { "aria-hidden": true, className: "pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-faint" })
  ] });
}
function JobsIndex({ jobs, total, filters, countries, industries, destinations }) {
  const { t } = useLocale();
  const { appUrl, site } = usePage().props;
  const [q, setQ] = useState(filters.q ?? "");
  const first = useRef(true);
  const visit = (next) => {
    const params = Object.fromEntries(Object.entries({ ...filters, q, ...next }).filter(([k, v]) => v && !(k === "sort" && v === "newest")));
    router.get("/jobs", params, { only: ["jobs", "filters"], preserveState: true, preserveScroll: true, replace: true });
  };
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = setTimeout(() => visit({ q }), 300);
    return () => clearTimeout(id);
  }, [q]);
  const active = Boolean(filters.q || filters.country || filters.industry || filters.gender);
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("hubs.jobs.eyebrow"), href: "/jobs" }
  ];
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("hubs.jobs.meta_title"),
        description: t("hubs.jobs.meta_description"),
        jsonLd: [breadcrumbLd(appUrl, crumbs)]
      }
    ),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        crumbs,
        eyebrow: /* @__PURE__ */ jsx(HeroPill, { children: t("hubs.jobs.eyebrow") }),
        title: t("hubs.jobs.title"),
        accent: t("hubs.jobs.accent"),
        lead: t("hubs.jobs.lead")
      }
    ),
    /* @__PURE__ */ jsx(Section, { tone: "bg", className: "pt-8 md:pt-10 lg:pt-10", children: /* @__PURE__ */ jsx(Container, { children: total === 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "card flex flex-col items-start gap-3 p-7 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-[22px] leading-7 font-semibold tracking-[-0.02em]", children: t("hubs.jobs.empty_title") }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 max-w-[60ch] text-[15px] text-muted", children: t("hubs.jobs.empty_body") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 gap-2", children: [
          /* @__PURE__ */ jsxs(ButtonLink, { href: "/apply", children: [
            t("pages.apply"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] }),
          /* @__PURE__ */ jsxs(ButtonAnchor, { href: `https://wa.me/${site.contact.whatsapp}`, target: "_blank", rel: "noopener", variant: "ghost", children: [
            /* @__PURE__ */ jsx(MessageCircle, {}),
            " WhatsApp"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(SectionHead, { title: t("hubs.jobs.empty_where") }),
      /* @__PURE__ */ jsx("ul", { className: "-mt-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: destinations.map((c) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(CountryCard, { country: c }) }, c.slug)) })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "sticky top-[72px] z-20 -mx-2 mb-5 rounded-[22px] border border-line bg-surface/90 p-2 shadow-[0_8px_24px_-16px_rgba(10,15,36,.25)] backdrop-blur-md", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-2 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]", children: [
        /* @__PURE__ */ jsx(
          SearchInput,
          {
            value: q,
            onChange: setQ,
            label: t("hubs.jobs.search_label"),
            placeholder: t("hubs.jobs.search_placeholder"),
            resultsText: t("hubs.jobs.results", { n: jobs.length, total })
          }
        ),
        /* @__PURE__ */ jsxs(Select, { label: t("hubs.jobs.all_countries"), value: filters.country ?? "", onChange: (v) => visit({ country: v }), children: [
          /* @__PURE__ */ jsx("option", { value: "", children: t("hubs.jobs.all_countries") }),
          countries.map((c) => /* @__PURE__ */ jsxs("option", { value: c.slug, children: [
            c.name,
            " (",
            c.count,
            ")"
          ] }, c.slug))
        ] }),
        /* @__PURE__ */ jsxs(Select, { label: t("hubs.jobs.all_industries"), value: filters.industry ?? "", onChange: (v) => visit({ industry: v }), children: [
          /* @__PURE__ */ jsx("option", { value: "", children: t("hubs.jobs.all_industries") }),
          industries.map((i) => /* @__PURE__ */ jsxs("option", { value: i.slug, children: [
            i.name,
            " (",
            i.count,
            ")"
          ] }, i.slug))
        ] }),
        /* @__PURE__ */ jsxs(Select, { label: t("hubs.jobs.any_gender"), value: filters.gender ?? "", onChange: (v) => visit({ gender: v }), children: [
          /* @__PURE__ */ jsx("option", { value: "", children: t("hubs.jobs.any_gender") }),
          /* @__PURE__ */ jsx("option", { value: "male", children: t("hubs.jobs.gender.male") }),
          /* @__PURE__ */ jsx("option", { value: "female", children: t("hubs.jobs.gender.female") })
        ] }),
        /* @__PURE__ */ jsxs(Select, { label: "Sort", value: filters.sort === "newest" ? "" : filters.sort, onChange: (v) => visit({ sort: v || "newest" }), children: [
          /* @__PURE__ */ jsx("option", { value: "", children: t("hubs.jobs.sort.newest") }),
          /* @__PURE__ */ jsx("option", { value: "deadline", children: t("hubs.jobs.sort.deadline") }),
          /* @__PURE__ */ jsx("option", { value: "salary", children: t("hubs.jobs.sort.salary") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-3 text-[13px] text-muted", children: [
        /* @__PURE__ */ jsx("span", { "aria-live": "polite", children: t("hubs.jobs.results", { n: jobs.length, total }) }),
        active && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setQ("");
              router.get("/jobs", {}, { only: ["jobs", "filters"], preserveScroll: true, replace: true });
            },
            className: "inline-flex items-center gap-1.5 font-semibold text-brand hover:underline",
            children: [
              /* @__PURE__ */ jsx(RotateCcw, { className: "size-3.5" }),
              " ",
              t("hubs.jobs.reset")
            ]
          }
        )
      ] }),
      jobs.length ? /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: jobs.map((j) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(JobCard, { job: j }) }, j.id)) }) : /* @__PURE__ */ jsx(
        NoResults,
        {
          title: t("hubs.jobs.none_title"),
          body: t("hubs.jobs.none_body"),
          clearLabel: t("hubs.jobs.reset"),
          onClear: () => {
            setQ("");
            router.get("/jobs", {}, { only: ["jobs", "filters"], preserveScroll: true, replace: true });
          }
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(FinalCta, {})
  ] });
}
export {
  JobsIndex as default
};
