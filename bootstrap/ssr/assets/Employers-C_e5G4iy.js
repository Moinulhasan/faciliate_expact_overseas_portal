import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { ArrowRight, Phone, Wrench, UserRoundCheck, ShieldCheck, FileText } from "lucide-react";
import { C as CountryCard } from "./CountryCard-BiAgkKXp.js";
import { I as IndustryCard } from "./IndustryCard-D8yL-ANg.js";
import { u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd, f as faqLd, e as ButtonLink, B as ButtonAnchor, c as Section, C as Container, d as SectionHead } from "./SiteLayout-hZjGrTmB.js";
import { F as Faq } from "./Faq-Dr90sckK.js";
import { C as Card, F as FinalCta } from "./Card-9Ubla1vH.js";
import { P as PageHero, H as HeroPill } from "./PageHero-mEN2jfPE.js";
import { F as FlagIcon } from "./FlagIcon-CPJ7bVnz.js";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "react";
import "class-variance-authority";
const pillarIcons = [Wrench, UserRoundCheck, ShieldCheck];
function Employers({ industries, countries }) {
  const { t, tm } = useLocale();
  const { appUrl, site } = usePage().props;
  const faqs = tm("hubs.employers.faq");
  const steps = tm("hubs.employers.process");
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("home.nav.employers"), href: "/employers" }
  ];
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Manpower supply from Bangladesh",
    serviceType: "Overseas recruitment and manpower supply",
    provider: { "@type": "EmploymentAgency", name: site.name, url: appUrl },
    areaServed: countries.map((c) => ({ "@type": "Country", name: c.name }))
  };
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("hubs.employers.meta_title"), description: t("hubs.employers.meta_description"), jsonLd: [breadcrumbLd(appUrl, crumbs), serviceLd, faqLd(faqs)] }),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        crumbs,
        eyebrow: /* @__PURE__ */ jsx(HeroPill, { children: t("hubs.employers.eyebrow") }),
        title: t("hubs.employers.title"),
        accent: t("hubs.employers.accent"),
        lead: t("hubs.employers.lead"),
        actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(ButtonLink, { href: "/employers/request", size: "lg", children: [
            t("hubs.employers.cta"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] }),
          /* @__PURE__ */ jsxs(ButtonAnchor, { href: `tel:${site.contact.phone_href}`, size: "lg", variant: "quiet", children: [
            /* @__PURE__ */ jsx(Phone, {}),
            " ",
            t("hubs.employers.cta_call")
          ] })
        ] }),
        aside: /* @__PURE__ */ jsxs("div", { className: "card-night p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-night-muted", children: t("hubs.employers.countries_title") }),
          /* @__PURE__ */ jsx("ul", { className: "mt-3 grid grid-cols-2 gap-1.5", children: countries.slice(0, 10).map((c) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 rounded-lg bg-night-2 px-2.5 py-2 text-[13px]", children: [
            /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, className: "h-3.5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: c.name })
          ] }, c.slug)) }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-[13px] text-night-muted", children: [
            "+",
            Math.max(0, countries.length - 10),
            " more"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("ul", { className: "grid gap-4 md:grid-cols-3", children: tm("hubs.employers.pillars").map((p, i) => {
      const Icon = pillarIcons[i];
      return /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsxs(Card, { className: "w-full p-6", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-tile", children: /* @__PURE__ */ jsx(Icon, { className: "size-5", strokeWidth: 1.75 }) }),
        /* @__PURE__ */ jsx("h2", { className: "mt-1 text-[19px] leading-6 font-semibold tracking-[-0.015em]", children: p.title }),
        /* @__PURE__ */ jsx("p", { className: "text-[15px] leading-[22px] text-muted", children: p.body })
      ] }) }, p.title);
    }) }) }) }),
    /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { className: "grid gap-8 lg:grid-cols-[1.2fr_0.8fr]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionHead, { title: t("hubs.employers.process_title"), lead: t("hubs.employers.process_lead") }),
        /* @__PURE__ */ jsx("ol", { className: "grid gap-x-6 sm:grid-cols-2", children: steps.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "relative border-t border-line py-5", children: [
          /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "absolute -top-px left-0 h-px w-10 bg-brand" }),
          /* @__PURE__ */ jsx("span", { className: "text-[13px] font-semibold text-brand tabular-nums", children: String(i + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1.5 text-h3", children: s.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-[15px] leading-[22px] text-muted", children: s.body })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:sticky lg:top-24 lg:self-start", children: [
        /* @__PURE__ */ jsx(SectionHead, { title: t("hubs.employers.needs_title"), lead: t("hubs.employers.needs_lead") }),
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("ul", { className: "grid gap-3", children: tm("hubs.employers.needs").map((d) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-[15px] leading-[22px]", children: [
            /* @__PURE__ */ jsx(FileText, { className: "mt-0.5 size-[18px] shrink-0 text-brand", strokeWidth: 1.75 }),
            d
          ] }, d)) }),
          /* @__PURE__ */ jsxs(ButtonLink, { href: "/employers/request", className: "mt-2 w-full", children: [
            t("hubs.employers.cta"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(
        SectionHead,
        {
          title: t("hubs.employers.industries_title"),
          lead: t("hubs.employers.industries_lead"),
          aside: /* @__PURE__ */ jsxs(ButtonLink, { href: "/industries", variant: "ghost", size: "sm", children: [
            t("home.industries.see_all"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: industries.slice(0, 8).map((i) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(IndustryCard, { industry: i }) }, i.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(
        SectionHead,
        {
          title: t("hubs.employers.countries_title"),
          aside: /* @__PURE__ */ jsxs(ButtonLink, { href: "/countries", variant: "ghost", size: "sm", children: [
            t("pages.crumbs.countries"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: countries.slice(0, 8).map((c) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(CountryCard, { country: c }) }, c.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(Faq, { title: t("pages.faq_title"), lead: t("pages.faq_lead"), items: faqs }),
    /* @__PURE__ */ jsx(FinalCta, {})
  ] });
}
export {
  Employers as default
};
