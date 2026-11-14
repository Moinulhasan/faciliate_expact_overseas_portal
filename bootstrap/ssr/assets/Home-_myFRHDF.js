import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { f as cn, u as useLocale, C as Container, H as Heading, e as ButtonLink, L as Link, c as Section, d as SectionHead, g as faqLd, S as SiteLayout, a as Seo } from "./SiteLayout-CAKLTTxk.js";
import { C as ContactSection } from "./ContactSection-BaeNzoO6.js";
import { C as CostsBlock } from "./CostsBlock-DOmj-iOo.js";
import { F as Faq } from "./Faq-X2DWsC6W.js";
import { t as trackGlow, F as FinalCta } from "./Card-C3OvSPRv.js";
import { ArrowRight, ShieldCheck, Receipt, FileCheck2, HeartHandshake, BadgeCheck, MapPin, ArrowUpRight, Quote, Star, Building2 } from "lucide-react";
import { F as FlagIcon } from "./FlagIcon-DLwSLeS3.js";
import { a as allHavePhotos, I as IndustryCard } from "./IndustryCard-BMLD7L2H.js";
import { J as Journey } from "./Journey-hItFaDzF.js";
import { L as LiveOpenings } from "./LiveOpenings-BK0LHdeM.js";
import { B as Badge } from "./JobCard-DcxxoXq4.js";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "react";
import "class-variance-authority";
function Marquee({
  children,
  reverse,
  seconds = 40,
  className
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("marquee group/mq", className), children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("marquee-track", reverse && "marquee-reverse"),
      style: { "--mq-dur": `${seconds}s` },
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex shrink-0 gap-2.5 pr-2.5", children }),
        /* @__PURE__ */ jsx("div", { className: "flex shrink-0 gap-2.5 pr-2.5", "aria-hidden": true, inert: true, children })
      ]
    }
  ) });
}
const promiseIcons = [ShieldCheck, Receipt, FileCheck2, HeartHandshake];
function CountryTag({ c }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href: `/countries/${c.slug}`,
      className: "group/tag inline-flex h-12 shrink-0 items-center gap-3 rounded-full border border-night-line bg-night-2/70 py-1.5 pr-4 pl-1.5 backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 ease-(--ease-out) hover:-translate-y-0.5 hover:border-cta/50 hover:bg-night-2",
      children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex size-9 items-center justify-center overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/10", children: /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, className: "h-[18px] w-6 rounded-[2px]" }) }),
        /* @__PURE__ */ jsxs("span", { className: "text-left leading-tight", children: [
          /* @__PURE__ */ jsx("span", { className: "block text-sm font-semibold text-night-ink", children: c.name }),
          c.top_trades[0] && /* @__PURE__ */ jsx("span", { className: "block text-sm text-night-muted", children: c.top_trades[0] })
        ] }),
        /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-3.5 text-night-muted transition-[color,transform] duration-300 group-hover/tag:translate-x-0.5 group-hover/tag:-translate-y-0.5 group-hover/tag:text-cta" })
      ]
    }
  );
}
function Hero({ countries, industryCount }) {
  const { t, tm } = useLocale();
  const { site } = usePage().props;
  const { licence, contact } = site;
  const promises = tm("hubs.work_abroad.promise");
  const stats = [
    [String(countries.length), t("home.hero.stat_countries")],
    [String(industryCount), t("home.hero.stat_industries")],
    ...site.stats.workers_deployed ? [[`${new Intl.NumberFormat("en").format(site.stats.workers_deployed)}+`, t("home.trust.workers_deployed")]] : [],
    ...site.stats.years_licensed ? [[String(site.stats.years_licensed), t("home.trust.years_licensed")]] : []
  ];
  return /* @__PURE__ */ jsxs("section", { className: "night night-glow relative isolate overflow-hidden pt-24 pb-8 text-night-ink md:pt-28 md:pb-10", children: [
    /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "night-dots pointer-events-none absolute inset-0 -z-10" }),
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("p", { className: "inline-flex max-w-full items-center gap-2 rounded-full border border-night-line bg-night-2/70 px-3 py-1.5 text-sm text-night-muted backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "size-1.5 shrink-0 rounded-full bg-cta shadow-[0_0_0_3px_rgba(115,191,68,.18)]" }),
          /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
            t("home.hero.eyebrow"),
            licence.rl_number && /* @__PURE__ */ jsxs("span", { className: "text-night-ink", children: [
              " · ",
              licence.rl_number
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Heading, { as: "h1", a: t("home.hero.title_a"), b: t("home.hero.title_b"), className: "mt-5 max-w-[15ch]" }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-[540px] text-lead text-night-muted", children: t("home.hero.lead", { n: countries.length }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxs(ButtonLink, { href: "/jobs", size: "lg", className: "w-full sm:w-auto", children: [
            t("home.hero.cta_candidate"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] }),
          /* @__PURE__ */ jsxs(Link, { href: "/employers", className: "inline-flex items-center gap-1.5 text-base font-semibold text-night-ink underline-offset-4 hover:underline", children: [
            t("home.hero.cta_employer"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("dl", { className: "mt-8 grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-wrap", children: stats.map(([value, label]) => /* @__PURE__ */ jsxs("div", { className: "sm:border-l sm:border-night-line sm:pr-6 sm:pl-4 sm:first:border-l-0 sm:first:pl-0", children: [
          /* @__PURE__ */ jsx("dd", { className: "text-[28px] leading-8 font-semibold tracking-[-0.02em] text-white tabular-nums", children: value }),
          /* @__PURE__ */ jsx("dt", { className: "max-w-[16ch] text-sm leading-5 text-night-muted", children: label })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "card-night min-w-0 p-4 shadow-(--shadow-card) lg:rounded-(--radius-panel)", children: [
        /* @__PURE__ */ jsx("p", { className: "px-2 pt-1 pb-3 text-sm font-semibold text-night-ink", children: t("home.hero.trust_title") }),
        /* @__PURE__ */ jsx("ul", { className: "grid gap-2", children: promises.map((p, i) => {
          const Icon = promiseIcons[i] ?? ShieldCheck;
          return /* @__PURE__ */ jsxs("li", { className: "flex gap-3.5 rounded-(--radius-item) bg-night-2 p-3.5", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-cta/[0.14] text-cta", children: /* @__PURE__ */ jsx(Icon, { className: "size-[18px]", strokeWidth: 1.75 }) }),
            /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("span", { className: "block text-base leading-6 font-semibold", children: p.title }),
              /* @__PURE__ */ jsx("span", { className: "block text-sm leading-5 text-night-muted", children: p.body })
            ] })
          ] }, p.title);
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-col gap-1.5 border-t border-night-line px-2 pt-3 text-sm text-night-muted", children: [
          licence.rl_number && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BadgeCheck, { className: "size-4 shrink-0 text-cta", strokeWidth: 1.75 }),
            t("home.trust.rl"),
            ": ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-night-ink", children: licence.rl_number })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 size-4 shrink-0 text-cta", strokeWidth: 1.75 }),
            contact.address
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t border-night-line pt-5 md:mt-12", children: [
      /* @__PURE__ */ jsxs(Container, { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-sm text-night-muted", children: t("home.hero.destinations") }),
        /* @__PURE__ */ jsxs(Link, { href: "/countries", className: "mb-3 inline-flex items-center gap-1 text-sm font-semibold text-night-ink hover:underline", children: [
          t("home.hero.all_countries"),
          " ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Marquee, { seconds: 120, children: countries.map((c) => /* @__PURE__ */ jsx(CountryTag, { c }, c.slug)) })
    ] })
  ] });
}
function IndustryBento({ industries }) {
  const { t } = useLocale();
  const media = allHavePhotos(industries);
  return /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHead,
      {
        title: t("home.industries.title"),
        lead: t("home.industries.lead"),
        aside: /* @__PURE__ */ jsxs(ButtonLink, { href: "/industries", variant: "ghost", size: "sm", children: [
          t("home.industries.see_all"),
          " ",
          /* @__PURE__ */ jsx(ArrowRight, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4", children: industries.map((ind) => /* @__PURE__ */ jsx("li", { className: "flex min-w-0", children: /* @__PURE__ */ jsx(IndustryCard, { industry: ind, media }) }, ind.slug)) })
  ] }) });
}
function Stars({ n, night }) {
  const { t } = useLocale();
  return /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", role: "img", "aria-label": t("home.reviews.rating", { n }), children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsx(
    Star,
    {
      className: cn("size-4", i < n ? night ? "fill-cta text-cta" : "fill-brand text-brand" : night ? "text-night-line" : "text-line"),
      strokeWidth: 1.5
    },
    i
  )) });
}
function Person({ r, night }) {
  const initials = r.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return /* @__PURE__ */ jsxs("figcaption", { className: cn("flex items-center gap-3 border-t pt-4", night ? "border-night-line" : "border-line"), children: [
    r.photo ? /* @__PURE__ */ jsx("img", { src: r.photo, alt: "", width: 40, height: 40, loading: "lazy", className: "size-10 rounded-full object-cover" }) : /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": true,
        className: cn(
          "inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold",
          night ? "bg-cta/[0.14] text-cta" : "bg-brand/10 text-brand"
        ),
        children: initials
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "truncate text-[15px] leading-5 font-semibold", children: r.name }),
      /* @__PURE__ */ jsx("p", { className: cn("flex items-center gap-1.5 truncate text-sm leading-5", night ? "text-night-muted" : "text-muted"), children: r.type === "employer" && r.company ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Building2, { className: "size-3.5 shrink-0", strokeWidth: 1.75 }),
        r.role,
        ", ",
        r.company
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        r.role,
        r.country && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "·" }),
          /* @__PURE__ */ jsx(FlagIcon, { iso2: r.country.iso2, className: "h-2.5 w-3.5 shrink-0" }),
          r.country.name
        ] })
      ] }) })
    ] })
  ] });
}
function Reviews({ reviews }) {
  const { t } = useLocale();
  if (!reviews.length) return null;
  const [lead, ...rest] = reviews;
  return /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionHead, { title: t("home.reviews.title"), lead: t("home.reviews.lead") }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("figure", { className: "night night-glow relative flex flex-col gap-6 overflow-hidden rounded-(--radius-card) border border-night-line p-8 text-night-ink md:col-span-2 lg:col-span-1 lg:row-span-2", children: [
        /* @__PURE__ */ jsx(Quote, { "aria-hidden": true, className: "absolute -top-2 right-6 size-28 text-cta/[0.08]", strokeWidth: 1 }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          lead.rating && /* @__PURE__ */ jsx(Stars, { n: lead.rating, night: true }),
          lead.is_sample && /* @__PURE__ */ jsx(Badge, { status: "sample", children: t("home.reviews.sample") })
        ] }),
        /* @__PURE__ */ jsxs("blockquote", { className: "text-[22px] leading-[32px] font-medium tracking-[-0.015em] text-pretty", children: [
          "“",
          lead.quote,
          "”"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx(Person, { r: lead, night: true }) })
      ] }),
      rest.map((r) => /* @__PURE__ */ jsxs("figure", { onPointerMove: trackGlow, className: "card flex flex-col gap-4 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          r.rating ? /* @__PURE__ */ jsx(Stars, { n: r.rating }) : /* @__PURE__ */ jsx("span", {}),
          r.is_sample && /* @__PURE__ */ jsx(Badge, { status: "sample", children: t("home.reviews.sample") })
        ] }),
        /* @__PURE__ */ jsxs("blockquote", { className: "text-[15px] leading-6 text-ink text-pretty", children: [
          "“",
          r.quote,
          "”"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx(Person, { r }) })
      ] }, r.id))
    ] })
  ] }) });
}
function TrustBar() {
  const { t } = useLocale();
  const { site } = usePage().props;
  const fmt = new Intl.NumberFormat("en");
  const items = [
    ["rl", site.licence.rl_number],
    ["bmet", site.licence.bmet],
    ["baira", site.licence.baira],
    ["years_licensed", site.stats.years_licensed?.toString() ?? null],
    ["workers_deployed", site.stats.workers_deployed ? `${fmt.format(site.stats.workers_deployed)}+` : null],
    ["employer_partners", site.stats.employer_partners?.toString() ?? null],
    ["avg_days_to_deploy", site.stats.avg_days_to_deploy?.toString() ?? null]
  ];
  const shown = items.filter((i) => i[1] !== null);
  if (!shown.length) return null;
  return /* @__PURE__ */ jsx("section", { "aria-label": "Licence and figures", className: "border-b border-line bg-surface", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-2 gap-px md:flex", children: shown.map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-5 md:flex-1", children: [
    /* @__PURE__ */ jsx(BadgeCheck, { className: "size-5 text-brand", strokeWidth: 1.75 }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("dd", { className: "text-[17px] leading-6 font-semibold tabular-nums", children: value }),
      /* @__PURE__ */ jsx("dt", { className: "text-sm leading-[18px] text-muted", children: t(`home.trust.${key}`) })
    ] })
  ] }, key)) }) }) });
}
function Home({ countries, industries, industryCount, jobs, jobCountries, testimonials, formOptions }) {
  const { t, tm } = useLocale();
  const { site } = usePage().props;
  const faqs = tm("home.faq.items");
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EmploymentAgency",
      name: site.name,
      telephone: site.contact.phone_href,
      email: site.contact.inquiry_email,
      address: [
        { "@type": "PostalAddress", streetAddress: site.contact.address, addressLocality: "Dhaka", addressCountry: "BD" },
        ...site.contact.address_my ? [{ "@type": "PostalAddress", streetAddress: "A-LG-1, Connaught Avenue Cheras, Jalan 9 Taman Bukit Cheras", postalCode: "56000", addressLocality: "Kuala Lumpur", addressCountry: "MY" }] : []
      ],
      ...site.licence.rl_number && { identifier: site.licence.rl_number }
    },
    faqLd(faqs)
  ];
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("home.meta.title"), description: t("home.meta.description", { n: countries.length }), jsonLd }),
    /* @__PURE__ */ jsx(Hero, { countries, industryCount }),
    /* @__PURE__ */ jsx(TrustBar, {}),
    /* @__PURE__ */ jsx(LiveOpenings, { jobs, filters: jobCountries }),
    /* @__PURE__ */ jsx(CostsBlock, {}),
    /* @__PURE__ */ jsx(Journey, {}),
    /* @__PURE__ */ jsx(IndustryBento, { industries }),
    /* @__PURE__ */ jsx(Reviews, { reviews: testimonials }),
    /* @__PURE__ */ jsx(Faq, { title: t("home.faq.title"), lead: t("home.faq.lead"), items: faqs }),
    /* @__PURE__ */ jsx(ContactSection, { tone: "alt", options: formOptions }),
    /* @__PURE__ */ jsx(FinalCta, { tone: "alt" })
  ] });
}
export {
  Home as default
};
