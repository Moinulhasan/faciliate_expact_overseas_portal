import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { ShieldCheck, Receipt, FileCheck2, HeartHandshake, ArrowRight, BadgeCheck, Ban } from "lucide-react";
import { C as CountryCard } from "./CountryCard-BiAgkKXp.js";
import { D as DocumentChecklist } from "./DocumentChecklist-v2-xdQLx.js";
import { u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd, f as faqLd, e as ButtonLink, c as Section, C as Container, d as SectionHead } from "./SiteLayout-hZjGrTmB.js";
import { J as Journey, C as CostsBlock } from "./Journey-CC8M2ibD.js";
import { F as Faq } from "./Faq-Dr90sckK.js";
import { C as Card, F as FinalCta } from "./Card-9Ubla1vH.js";
import { P as PageHero, H as HeroPill } from "./PageHero-mEN2jfPE.js";
import "./FlagIcon-CPJ7bVnz.js";
import "react";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "class-variance-authority";
const promiseIcons = [ShieldCheck, Receipt, FileCheck2, HeartHandshake];
function WorkAbroad({ documents, countries }) {
  const { t, tm } = useLocale();
  const { appUrl } = usePage().props;
  const faqs = tm("hubs.work_abroad.faq");
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("home.nav.work_abroad"), href: "/work-abroad" }
  ];
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("hubs.work_abroad.meta_title"), description: t("hubs.work_abroad.meta_description"), jsonLd: [breadcrumbLd(appUrl, crumbs), faqLd(faqs)] }),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        crumbs,
        eyebrow: /* @__PURE__ */ jsx(HeroPill, { children: t("hubs.work_abroad.eyebrow") }),
        title: t("hubs.work_abroad.title"),
        accent: t("hubs.work_abroad.accent"),
        lead: t("hubs.work_abroad.lead"),
        actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(ButtonLink, { href: "/apply", size: "lg", children: [
            t("hubs.work_abroad.cta"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] }),
          /* @__PURE__ */ jsx(ButtonLink, { href: "/jobs", size: "lg", variant: "quiet", children: t("hubs.work_abroad.jobs_cta") })
        ] }),
        aside: /* @__PURE__ */ jsx("ul", { className: "card-night grid gap-2 p-3", children: tm("hubs.work_abroad.promise").map((p, i) => {
          const Icon = promiseIcons[i];
          return /* @__PURE__ */ jsxs("li", { className: "flex gap-3.5 rounded-(--radius-item) bg-night-2 p-3.5", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-cta/[0.14] text-cta", children: /* @__PURE__ */ jsx(Icon, { className: "size-[18px]", strokeWidth: 1.75 }) }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-[15px] font-semibold", children: p.title }),
              /* @__PURE__ */ jsx("span", { className: "block text-[13px] leading-5 text-night-muted", children: p.body })
            ] })
          ] }, p.title);
        }) })
      }
    ),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(SectionHead, { title: t("hubs.work_abroad.eligible_title"), lead: t("hubs.work_abroad.eligible_lead") }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: tm("hubs.work_abroad.eligible").map((e) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsxs(Card, { className: "w-full flex-row items-start gap-3.5 p-5", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-tile size-10", children: /* @__PURE__ */ jsx(BadgeCheck, { className: "size-5", strokeWidth: 1.75 }) }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("span", { className: "block text-h3", children: e.title }),
          /* @__PURE__ */ jsx("span", { className: "block text-[14px] leading-5 text-muted", children: e.body })
        ] })
      ] }) }, e.title)) })
    ] }) }),
    /* @__PURE__ */ jsx(Journey, {}),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { className: "grid gap-8 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionHead, { title: t("hubs.work_abroad.docs_title"), lead: t("hubs.work_abroad.docs_lead") }),
        /* @__PURE__ */ jsx(DocumentChecklist, { items: documents })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionHead, { title: t("hubs.work_abroad.flags_title"), lead: t("hubs.work_abroad.flags_lead") }),
        /* @__PURE__ */ jsx("ul", { className: "night night-glow grid gap-px overflow-hidden rounded-(--radius-card) border border-night-line bg-night-line text-night-ink", children: tm("hubs.work_abroad.flags").map((f) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 bg-night/95 p-4 text-[15px] leading-[22px]", children: [
          /* @__PURE__ */ jsx(Ban, { className: "mt-0.5 size-[18px] shrink-0 text-[#f08a6c]", strokeWidth: 1.75 }),
          f
        ] }, f)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CostsBlock, {}),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(SectionHead, { title: t("hubs.work_abroad.countries_title") }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: countries.slice(0, 8).map((c) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(CountryCard, { country: c }) }, c.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(Faq, { title: t("pages.faq_title"), lead: t("pages.faq_lead"), items: faqs, tone: "alt" }),
    /* @__PURE__ */ jsx(FinalCta, { tone: "alt" })
  ] });
}
export {
  WorkAbroad as default
};
