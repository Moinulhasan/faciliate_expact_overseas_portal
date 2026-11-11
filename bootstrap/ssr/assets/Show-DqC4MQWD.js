import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { ArrowRight, BadgeCheck, CheckCircle2, MessageCircle } from "lucide-react";
import { C as CountryCard } from "./CountryCard-BiAgkKXp.js";
import { P as Picture, i as iconFor, a as IndustryVisual, I as IndustryCard } from "./IndustryCard-D8yL-ANg.js";
import { g as cn, u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd, f as faqLd, e as ButtonLink, c as Section, C as Container, d as SectionHead, B as ButtonAnchor } from "./SiteLayout-hZjGrTmB.js";
import { F as Faq } from "./Faq-Dr90sckK.js";
import { C as Card, F as FinalCta } from "./Card-9Ubla1vH.js";
import { L as LiveOpenings } from "./LiveOpenings-DPoPac1B.js";
import { P as PageHero, H as HeroPill } from "./PageHero-mEN2jfPE.js";
import { useState, useEffect, Suspense, lazy } from "react";
import { u as useTier } from "../ssr.js";
import "./FlagIcon-CPJ7bVnz.js";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "class-variance-authority";
import "./JobCard-DmK72EL7.js";
import "@inertiajs/react/server";
import "react-dom/server";
const IndustryScene = lazy(() => import("./IndustryScene-BYn2JAVN.js").then((n) => n.I));
function IndustryHeroBackground({ industry }) {
  const tier = useTier();
  const [mounted, setMounted] = useState(false);
  const [idle, setIdle] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (tier !== "full") return;
    const w = window;
    if (w.requestIdleCallback) {
      const id2 = w.requestIdleCallback(() => setIdle(true), { timeout: 2e3 });
      return () => w.cancelIdleCallback?.(id2);
    }
    const id = window.setTimeout(() => setIdle(true), 300);
    return () => window.clearTimeout(id);
  }, [tier]);
  const desktopPhoto = mounted && tier !== "full";
  return /* @__PURE__ */ jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden", children: [
    industry.image && /* @__PURE__ */ jsx(
      Picture,
      {
        img: industry.image,
        alt: "",
        sizes: "(min-width: 1024px) 62vw, 100vw",
        priority: true,
        className: cn(
          "absolute inset-0 opacity-35 lg:right-0 lg:left-auto lg:w-[62%] lg:opacity-70 lg:[mask-image:linear-gradient(90deg,transparent,#000_45%)]",
          !desktopPhoto && "lg:hidden"
        )
      }
    ),
    tier === "full" && idle && /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(IndustryScene, { slug: industry.slug }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-night/55 lg:bg-[linear-gradient(90deg,var(--color-night)_0%,rgba(6,18,13,.92)_28%,rgba(6,18,13,.55)_48%,rgba(6,18,13,0)_70%)]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent" })
  ] });
}
function IndustryShow({ industry: ind, countries, jobs, related }) {
  const { t, tm } = useLocale();
  const { appUrl, site } = usePage().props;
  const Icon = iconFor(ind.slug);
  const screening = tm("pages.industries.screening");
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("pages.crumbs.industries"), href: "/industries" },
    { name: ind.name, href: `/industries/${ind.slug}` }
  ];
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${ind.name} recruitment from Bangladesh`,
    serviceType: "Overseas recruitment and manpower supply",
    description: ind.summary,
    provider: { "@type": "EmploymentAgency", name: site.name, url: appUrl },
    areaServed: countries.map((c) => ({ "@type": "Country", name: c.name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${ind.name} roles`,
      itemListElement: ind.roles.map((r) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: r } }))
    }
  };
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: `${ind.name} jobs abroad`,
        description: ind.meta_description ?? ind.summary,
        jsonLd: [breadcrumbLd(appUrl, crumbs), serviceLd, faqLd(ind.faqs)]
      }
    ),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        crumbs,
        eyebrow: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-flex size-11 items-center justify-center rounded-(--radius-tile) bg-cta/[0.14] text-cta", children: /* @__PURE__ */ jsx(Icon, { className: "size-5", strokeWidth: 1.75 }) }),
          /* @__PURE__ */ jsx(HeroPill, { children: t(`pages.industries.groups.${ind.group}`) })
        ] }),
        title: ind.name,
        lead: ind.summary,
        actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(ButtonLink, { href: "/apply", size: "lg", children: [
            t("pages.apply"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] }),
          /* @__PURE__ */ jsx(ButtonLink, { href: "/employers/request", size: "lg", variant: "quiet", children: t("pages.request") })
        ] }),
        background: /* @__PURE__ */ jsx(IndustryHeroBackground, { industry: ind }),
        meta: /* @__PURE__ */ jsx("ul", { "aria-label": t("pages.industries.roles_title"), className: "flex flex-wrap gap-1.5", children: ind.roles.slice(0, 6).map((r) => /* @__PURE__ */ jsx("li", { className: "rounded-full border border-white/15 bg-night/55 px-2.5 py-0.5 text-[13px] leading-5 text-night-ink backdrop-blur-md", children: r }, r)) })
      }
    ),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { className: "grid gap-10 lg:grid-cols-[0.9fr_1.1fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx(SectionHead, { title: t("pages.industries.overview") }),
        /* @__PURE__ */ jsx("p", { className: "-mt-3 max-w-[62ch] text-lead text-muted", children: ind.intro }),
        /* @__PURE__ */ jsx(
          IndustryVisual,
          {
            industry: ind,
            img: ind.image_detail ?? ind.image,
            sizes: "(min-width: 1024px) 40vw, 92vw",
            className: "mt-7 aspect-[3/2] rounded-(--radius-card) border border-line"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2", children: ind.highlights.map((h) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsxs(Card, { className: "w-full", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-tile size-10", children: /* @__PURE__ */ jsx(BadgeCheck, { className: "size-5", strokeWidth: 1.75 }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-1 text-h3", children: h.title }),
        /* @__PURE__ */ jsx("p", { className: "text-[15px] leading-[22px] text-muted", children: h.body })
      ] }) }, h.title)) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-7", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[24px] leading-8 font-semibold tracking-[-0.02em]", children: t("pages.industries.roles_title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[15px] text-muted", children: t("pages.industries.roles_lead") }),
        /* @__PURE__ */ jsx("ul", { className: "mt-3 grid gap-2 sm:grid-cols-2", children: ind.roles.map((r) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2.5 rounded-xl border border-line bg-bg px-3.5 py-2.5 text-[15px] font-medium", children: [
          /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-brand" }),
          r
        ] }, r)) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-7", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[24px] leading-8 font-semibold tracking-[-0.02em]", children: t("pages.industries.certs_title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[15px] text-muted", children: t("pages.industries.certs_lead") }),
        /* @__PURE__ */ jsx("ul", { className: "mt-3 grid gap-3", children: ind.certifications.map((c) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-[15px] leading-[22px]", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 size-5 shrink-0 text-brand", strokeWidth: 1.75 }),
          c
        ] }, c)) }),
        /* @__PURE__ */ jsxs(
          ButtonAnchor,
          {
            href: `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Question about ${ind.name} jobs`)}`,
            target: "_blank",
            rel: "noopener",
            variant: "ghost",
            size: "sm",
            className: "mt-auto self-start",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, {}),
              " ",
              t("pages.whatsapp")
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(SectionHead, { title: t("pages.industries.screening_title") }),
      /* @__PURE__ */ jsx("ol", { className: "grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4", children: screening.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "relative border-t border-line py-6", children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "absolute -top-px left-0 h-px w-10 bg-brand" }),
        /* @__PURE__ */ jsx("span", { className: "text-[13px] font-semibold text-brand tabular-nums", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-h3", children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[15px] leading-[22px] text-muted", children: s.body })
      ] }, s.title)) })
    ] }) }),
    countries.length > 0 && /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(SectionHead, { title: t("pages.industries.countries_title"), lead: t("pages.industries.countries_lead") }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: countries.map((c) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(CountryCard, { country: c, note: c.note }) }, c.slug)) }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-[13px] text-faint", children: t("pages.typical") })
    ] }) }),
    /* @__PURE__ */ jsx(LiveOpenings, { jobs }),
    /* @__PURE__ */ jsx(Faq, { title: t("pages.faq_title"), lead: t("pages.faq_lead"), items: ind.faqs }),
    related.length > 0 && /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(SectionHead, { title: t("pages.industries.related") }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 md:grid-cols-3", children: related.map((r) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(IndustryCard, { industry: r }) }, r.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(FinalCta, { tone: related.length > 0 ? "alt" : "bg" })
  ] });
}
export {
  IndustryShow as default
};
