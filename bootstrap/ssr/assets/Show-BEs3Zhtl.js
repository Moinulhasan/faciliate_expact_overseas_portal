import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { Stamp, Clock, CalendarRange, Coins, Languages, ArrowRight, MessageCircle, Info } from "lucide-react";
import { C as CountryCard } from "./CountryCard-BUbyYD7V.js";
import { I as IndustryCard } from "./IndustryCard-BMLD7L2H.js";
import { D as DocumentChecklist } from "./DocumentChecklist-DpyElRqF.js";
import { u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd, g as faqLd, e as ButtonLink, B as ButtonAnchor, C as Container, c as Section, d as SectionHead } from "./SiteLayout-CAKLTTxk.js";
import { C as CostsBlock } from "./CostsBlock-DOmj-iOo.js";
import { F as Faq } from "./Faq-X2DWsC6W.js";
import { F as FinalCta } from "./Card-C3OvSPRv.js";
import { L as LiveOpenings } from "./LiveOpenings-BK0LHdeM.js";
import { P as PageHero } from "./PageHero-ZW5DPLSc.js";
import { F as FlagIcon } from "./FlagIcon-DLwSLeS3.js";
import "react";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "class-variance-authority";
import "./JobCard-DcxxoXq4.js";
function CountryShow({ country: c, jobs, related }) {
  const { t } = useLocale();
  const { appUrl, site } = usePage().props;
  const region = t(`pages.countries.regions.${c.region}`);
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("pages.crumbs.countries"), href: "/countries" },
    { name: c.name, href: `/countries/${c.slug}` }
  ];
  const facts = [
    { Icon: Stamp, label: t("pages.countries.facts.visa"), value: c.visa_type },
    {
      Icon: Clock,
      label: t("pages.countries.facts.processing"),
      value: c.processing_days_min && c.processing_days_max ? t("pages.countries.days", { min: c.processing_days_min, max: c.processing_days_max }) : null
    },
    { Icon: CalendarRange, label: t("pages.countries.facts.contract"), value: c.contract_months ? t("pages.countries.months", { n: c.contract_months }) : null },
    { Icon: Coins, label: t("pages.countries.facts.currency"), value: c.currency },
    { Icon: Languages, label: t("pages.countries.facts.language"), value: c.languages }
  ].filter((f) => f.value);
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to get a work visa for ${c.name} from Bangladesh`,
    totalTime: c.processing_days_max ? `P${c.processing_days_max}D` : void 0,
    step: c.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body }))
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Work visa and job placement in ${c.name}`,
    serviceType: "Overseas recruitment",
    provider: { "@type": "EmploymentAgency", name: site.name, url: appUrl },
    areaServed: { "@type": "Country", name: c.name },
    description: c.intro
  };
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: `Work in ${c.name} from Bangladesh`,
        description: c.meta_description ?? c.intro ?? "",
        jsonLd: [breadcrumbLd(appUrl, crumbs), serviceLd, howToLd, faqLd(c.faqs)]
      }
    ),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        crumbs,
        eyebrow: /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center gap-2 rounded-full border border-night-line bg-night-2/70 py-1 pr-3 pl-1 text-sm text-night-muted backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, className: "h-4 w-[22px] rounded-full" }),
          region
        ] }),
        title: t("pages.countries.title_show", { country: c.name }),
        accent: t("pages.countries.accent_show"),
        lead: c.intro,
        actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(ButtonLink, { href: "/contact?type=job", size: "lg", children: [
            t("pages.apply"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] }),
          /* @__PURE__ */ jsxs(
            ButtonAnchor,
            {
              href: `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Jobs in ${c.name}`)}`,
              target: "_blank",
              rel: "noopener",
              size: "lg",
              variant: "quiet",
              children: [
                /* @__PURE__ */ jsx(MessageCircle, {}),
                " ",
                t("pages.whatsapp")
              ]
            }
          )
        ] }),
        aside: /* @__PURE__ */ jsxs("div", { className: "card-night relative hidden items-center justify-center overflow-hidden px-8 py-14 lg:flex", children: [
          /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "night-dots absolute inset-0" }),
          /* @__PURE__ */ jsx("span", { className: "relative inline-flex overflow-hidden rounded-lg shadow-[0_24px_48px_-16px_rgba(0,0,0,.7),0_0_0_1px_rgba(255,255,255,.08)]", children: /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, eager: true, className: "h-[150px] w-[200px] rounded-none shadow-none" }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "border-b border-line bg-surface", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-2 md:grid-cols-5", children: facts.map(({ Icon, label, value }) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 border-line py-5 md:border-l md:pl-5 md:first:border-l-0 md:first:pl-0", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-tile size-10", children: /* @__PURE__ */ jsx(Icon, { className: "size-[18px]", strokeWidth: 1.75 }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-sm text-muted", children: label }),
          /* @__PURE__ */ jsx("dd", { className: "text-base leading-6 font-semibold", children: value })
        ] })
      ] }, label)) }),
      /* @__PURE__ */ jsx("p", { className: "border-t border-line py-3 text-sm text-muted", children: t("pages.typical") })
    ] }) }),
    c.notice && /* @__PURE__ */ jsx(Container, { className: "pt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 rounded-(--radius-item) border border-warning/25 bg-warning/[0.06] p-4 text-[15px] leading-[22px]", children: [
      /* @__PURE__ */ jsx(Info, { className: "mt-0.5 size-5 shrink-0 text-warning", strokeWidth: 1.75 }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsxs("strong", { className: "font-semibold", children: [
          t("pages.countries.notice"),
          ": "
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-muted", children: c.notice })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(SectionHead, { title: t("pages.countries.sectors_title"), lead: t("pages.countries.sectors_lead", { country: c.name }) }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: c.sectors.map((s) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(IndustryCard, { industry: s, note: s.note, pay: s.pay }) }, s.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { className: "grid gap-10 lg:grid-cols-[1.15fr_0.85fr]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionHead, { title: t("pages.countries.process_title", { country: c.name }), lead: t("pages.countries.process_lead") }),
        /* @__PURE__ */ jsx("ol", { className: "relative grid gap-0", children: c.steps.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "relative grid grid-cols-[40px_1fr] gap-4 pb-6 last:pb-0", children: [
          i < c.steps.length - 1 && /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "absolute top-10 bottom-0 left-[19px] w-px bg-line" }),
          /* @__PURE__ */ jsx("span", { className: "relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold text-brand tabular-nums", children: String(i + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsxs("div", { className: "pt-1.5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-h3", children: s.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-base leading-6 text-muted", children: s.body }),
            s.time && /* @__PURE__ */ jsxs("p", { className: "mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-sm font-medium text-brand", children: [
              /* @__PURE__ */ jsx(Clock, { className: "size-3.5", strokeWidth: 2 }),
              /* @__PURE__ */ jsxs("span", { className: "sr-only", children: [
                t("pages.countries.time_label"),
                ": "
              ] }),
              s.time
            ] })
          ] })
        ] }, s.title)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:sticky lg:top-24 lg:self-start", children: [
        /* @__PURE__ */ jsx(SectionHead, { title: t("pages.countries.docs_title"), lead: t("pages.countries.docs_lead") }),
        /* @__PURE__ */ jsx(DocumentChecklist, { items: c.requirements }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-faint", children: t("pages.countries.docs_note") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CostsBlock, { tone: "bg" }),
    /* @__PURE__ */ jsx(LiveOpenings, { jobs }),
    /* @__PURE__ */ jsx(Faq, { title: t("pages.faq_title"), lead: t("pages.faq_lead"), items: c.faqs, tone: jobs.length ? "bg" : "alt" }),
    related.length > 0 && /* @__PURE__ */ jsx(Section, { tone: jobs.length ? "alt" : "bg", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(SectionHead, { title: t("pages.countries.related", { region }) }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: related.map((r) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(CountryCard, { country: r }) }, r.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(FinalCta, { tone: related.length > 0 === jobs.length > 0 ? "alt" : "bg" })
  ] });
}
export {
  CountryShow as default
};
