import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { usePage, Link } from "@inertiajs/react";
import { u as useLocale, c as Section, C as Container, d as SectionHead, g as cn, e as ButtonLink, P as Pill, h as buttonVariants, H as Heading, f as faqLd, S as SiteLayout, a as Seo } from "./SiteLayout-hZjGrTmB.js";
import { HardHat, Building2, Check, ArrowRight, Clock, MessageCircle, Briefcase, Users, FileText, Search, ChevronRight, ArrowUpRight, Quote, Star, BadgeCheck } from "lucide-react";
import { t as trackGlow, F as FinalCta } from "./Card-9Ubla1vH.js";
import { C as ContactSection } from "./ContactSection-BdyaB-BD.js";
import { J as Journey, C as CostsBlock } from "./Journey-CC8M2ibD.js";
import { LayoutGroup, m } from "motion/react";
import { useState } from "react";
import { F as FlagIcon } from "./FlagIcon-CPJ7bVnz.js";
import { F as Faq } from "./Faq-Dr90sckK.js";
import { a as IndustryVisual, I as IndustryCard } from "./IndustryCard-D8yL-ANg.js";
import { L as LiveOpenings } from "./LiveOpenings-DPoPac1B.js";
import { B as Badge } from "./JobCard-DmK72EL7.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
const doors = [
  { key: "candidate", href: "/apply", Icon: HardHat, night: true },
  { key: "employer", href: "/employers/request", Icon: Building2, night: false }
];
function AudienceFork() {
  const { t, tm } = useLocale();
  return /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionHead, { title: t("home.fork.title"), accent: t("home.fork.accent"), lead: t("home.fork.lead") }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2", children: doors.map(({ key, href, Icon, night }) => /* @__PURE__ */ jsxs(
      "article",
      {
        onPointerMove: night ? void 0 : trackGlow,
        className: cn(
          "flex flex-col p-6 md:p-8",
          night ? "night night-glow rounded-(--radius-card) border border-night-line text-night-ink" : "card"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: cn("icon-tile", night && "bg-cta/[0.14] text-cta"), children: /* @__PURE__ */ jsx(Icon, { className: "size-5", strokeWidth: 1.75 }) }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "rounded-full border px-2.5 py-1 text-[13px] leading-5",
                  night ? "border-night-line text-night-muted" : "border-line text-muted"
                ),
                children: t(`home.fork.${key}.label`)
              }
            )
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-6 text-[28px] leading-[34px] font-semibold tracking-[-0.02em]", children: t(`home.fork.${key}.title`) }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 grid gap-2.5", children: tm(`home.fork.${key}.points`).map((p) => /* @__PURE__ */ jsxs("li", { className: cn("flex gap-2.5 text-[15px] leading-[22px]", night ? "text-night-muted" : "text-muted"), children: [
            /* @__PURE__ */ jsx(Check, { className: cn("mt-[3px] size-4 shrink-0", night ? "text-cta" : "text-brand"), strokeWidth: 2.25 }),
            p
          ] }, p)) }),
          /* @__PURE__ */ jsxs(ButtonLink, { href, variant: night ? "cta" : "ghost", className: "mt-6 self-start", children: [
            t(`home.fork.${key}.cta`),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] })
        ]
      },
      key
    )) })
  ] }) });
}
const tabs = [
  { key: "gcc", regions: ["gcc"] },
  { key: "asia", regions: ["east_asia", "se_asia"] },
  { key: "europe", regions: ["europe"] }
];
function Destinations({ countries }) {
  const { t } = useLocale();
  const { site } = usePage().props;
  const [active, setActive] = useState("gcc");
  const regions = tabs.find((x) => x.key === active).regions;
  const list = countries.filter((c) => regions.includes(c.region));
  const tablist = /* @__PURE__ */ jsx(LayoutGroup, { children: /* @__PURE__ */ jsx("div", { role: "tablist", "aria-label": t("home.destinations.title"), className: "inline-flex self-start rounded-full border border-line bg-surface p-1", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
    "button",
    {
      role: "tab",
      id: `tab-${tab.key}`,
      "aria-selected": active === tab.key,
      "aria-controls": "dest-panel",
      onClick: () => setActive(tab.key),
      className: cn(
        "relative h-9 rounded-full px-4 text-sm font-medium transition-colors",
        active === tab.key ? "text-white" : "text-muted hover:text-ink"
      ),
      children: [
        active === tab.key && /* @__PURE__ */ jsx(m.span, { layoutId: "dest-tab", className: "absolute inset-0 rounded-full bg-brand", transition: { type: "spring", stiffness: 260, damping: 28 } }),
        /* @__PURE__ */ jsx("span", { className: "relative", children: t(`home.destinations.regions.${tab.key}`) })
      ]
    },
    tab.key
  )) }) });
  return /* @__PURE__ */ jsx(Section, { tone: "bg", id: "destinations", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionHead, { title: t("home.destinations.title"), lead: t("home.destinations.lead"), aside: tablist }),
    /* @__PURE__ */ jsx("ul", { id: "dest-panel", role: "tabpanel", "aria-labelledby": `tab-${active}`, className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5", children: list.map((c) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsxs("div", { onPointerMove: trackGlow, className: "card flex w-full flex-col gap-1 rounded-[20px] p-[18px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, className: "h-[18px] w-6" }),
        regions.length > 1 && /* @__PURE__ */ jsx(Pill, { className: "border-0 bg-brand/10 px-2 py-0 text-xs text-brand", children: t(`home.destinations.region_label.${c.region}`) })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-h3", children: c.name }),
      /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-[13px] leading-[18px] text-muted", children: c.top_trades.slice(0, 2).join(" · ") }),
      c.processing_days_min && c.processing_days_max && /* @__PURE__ */ jsxs("p", { className: "mt-1 inline-flex items-center gap-1.5 text-[13px] text-brand", children: [
        /* @__PURE__ */ jsx(Clock, { className: "size-3.5", strokeWidth: 2 }),
        t("home.destinations.days", { min: c.processing_days_min, max: c.processing_days_max })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto flex gap-2 pt-4", children: [
        /* @__PURE__ */ jsx(Link, { href: `/countries/${c.slug}`, className: cn(buttonVariants({ variant: "soft", size: "sm" }), "min-h-9 flex-1"), children: t("home.destinations.apply") }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Jobs in ${c.name}`)}`,
            target: "_blank",
            rel: "noopener",
            "aria-label": `WhatsApp about ${c.name}`,
            className: cn(buttonVariants({ variant: "soft", size: "icon" }), "size-9 min-h-9"),
            children: /* @__PURE__ */ jsx(MessageCircle, {})
          }
        )
      ] })
    ] }) }, c.slug)) }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-[13px] text-faint", children: t("home.destinations.note") })
  ] }) });
}
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
const pickerIcons = { jobs: Search, apply: FileText, employer: Users, track: Briefcase };
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
          c.top_trades[0] && /* @__PURE__ */ jsx("span", { className: "block text-xs text-night-muted", children: c.top_trades.slice(0, 2).join(" · ") })
        ] }),
        /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-3.5 text-night-muted transition-[color,transform] duration-300 group-hover/tag:translate-x-0.5 group-hover/tag:-translate-y-0.5 group-hover/tag:text-cta" })
      ]
    }
  );
}
function Hero({ countries, industryCount }) {
  const { t, tm } = useLocale();
  const { site } = usePage().props;
  const rl = site.licence.rl_number;
  const items = tm("home.hero.picker.items");
  const stats = [
    [String(countries.length), t("home.hero.stat_countries")],
    [String(industryCount), t("home.hero.stat_industries")],
    ["2×", t("home.hero.stat_checked")]
  ];
  return /* @__PURE__ */ jsxs("section", { className: "night night-glow relative isolate overflow-hidden pt-24 pb-10 text-night-ink md:pt-28 md:pb-12", children: [
    /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "night-dots pointer-events-none absolute inset-0 -z-10" }),
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center gap-2 rounded-full border border-night-line bg-night-2/70 px-3 py-1.5 text-[13px] text-night-muted backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-cta shadow-[0_0_0_3px_rgba(115,191,68,.18)]" }),
          t("home.hero.eyebrow"),
          rl && /* @__PURE__ */ jsxs("span", { className: "text-night-ink", children: [
            "· ",
            rl
          ] })
        ] }),
        /* @__PURE__ */ jsx(Heading, { as: "h1", a: t("home.hero.title_a"), b: t("home.hero.title_b"), className: "mt-6 max-w-[15ch]" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-[540px] text-lead text-night-muted", children: t("home.hero.lead") }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs(ButtonLink, { href: "/jobs", size: "lg", children: [
            t("home.hero.cta_candidate"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] }),
          /* @__PURE__ */ jsx(ButtonLink, { href: "/employers/request", size: "lg", variant: "quiet", children: t("home.hero.cta_employer") })
        ] }),
        /* @__PURE__ */ jsx("dl", { className: "mt-8 flex flex-wrap gap-y-4", children: stats.map(([value, label]) => /* @__PURE__ */ jsxs("div", { className: "border-l border-night-line pr-6 pl-3.5 first:border-l-0 first:pl-0", children: [
          /* @__PURE__ */ jsx("dd", { className: "text-[26px] leading-8 font-semibold tracking-[-0.02em] text-white tabular-nums", children: value }),
          /* @__PURE__ */ jsx("dt", { className: "max-w-[16ch] text-[13px] leading-[18px] text-night-muted", children: label })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "card-night p-4 shadow-(--shadow-card) lg:rounded-(--radius-panel)", children: [
        /* @__PURE__ */ jsx("p", { className: "px-2 pt-1 pb-3 text-[13px] text-night-muted", children: t("home.hero.picker.title") }),
        /* @__PURE__ */ jsx("ul", { className: "grid gap-2", children: items.map((it) => {
          const Icon = pickerIcons[it.key];
          return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: it.href,
              onPointerMove: trackGlow,
              className: "group flex items-center gap-3.5 rounded-(--radius-item) border border-transparent bg-night-2 bg-[radial-gradient(240px_circle_at_var(--gx,50%)_var(--gy,0%),rgba(115,191,68,.10),transparent_60%)] p-3.5 transition-colors duration-300 hover:border-night-line",
              children: [
                /* @__PURE__ */ jsx("span", { className: "inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-cta/[0.14] text-cta", children: /* @__PURE__ */ jsx(Icon, { className: "size-[18px]", strokeWidth: 1.75 }) }),
                /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "block text-[15px] leading-5 font-semibold", children: it.title }),
                  /* @__PURE__ */ jsx("span", { className: "block truncate text-[13px] leading-5 text-night-muted", children: it.body })
                ] }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "size-4 text-night-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-night-ink" })
              ]
            }
          ) }, it.key);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 border-t border-night-line pt-6 md:mt-14", children: [
      /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("h2", { className: "mb-4 text-[13px] text-night-muted", children: t("home.hero.destinations") }) }),
      /* @__PURE__ */ jsx(Marquee, { seconds: 120, children: countries.map((c) => /* @__PURE__ */ jsx(CountryTag, { c }, c.slug)) })
    ] })
  ] });
}
function IndustryBento({ industries }) {
  const { t } = useLocale();
  const featured = industries.slice(0, 2);
  const rest = industries.slice(2);
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
    /* @__PURE__ */ jsx("ul", { className: "grid gap-4 md:grid-cols-2", children: featured.map((ind) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: `/industries/${ind.slug}`,
        className: "group night relative isolate flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-(--radius-card) p-7 text-night-ink",
        children: [
          /* @__PURE__ */ jsx(
            IndustryVisual,
            {
              industry: ind,
              sizes: "(min-width: 768px) 48vw, 92vw",
              className: "absolute inset-0 -z-10 size-full",
              imgClassName: "transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.04]"
            }
          ),
          /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/55 to-night/5" }),
          /* @__PURE__ */ jsx("span", { className: "absolute top-5 right-5 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-night/40 backdrop-blur-md transition-colors group-hover:bg-cta group-hover:text-night", children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4", strokeWidth: 2 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-[26px] leading-8 font-semibold tracking-[-0.02em]", children: ind.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-[48ch] text-[15px] leading-[22px] text-night-muted", children: ind.summary }),
          /* @__PURE__ */ jsx("ul", { className: "mt-4 flex flex-wrap gap-1.5", children: ind.roles.slice(0, 4).map((r) => /* @__PURE__ */ jsx("li", { className: "rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[13px] leading-5 backdrop-blur-sm", children: r }, r)) })
        ]
      }
    ) }, ind.slug)) }),
    /* @__PURE__ */ jsx("ul", { className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: rest.map((ind) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(IndustryCard, { industry: ind }) }, ind.slug)) })
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
      /* @__PURE__ */ jsx("p", { className: cn("flex items-center gap-1.5 truncate text-[13px] leading-5", night ? "text-night-muted" : "text-muted"), children: r.type === "employer" && r.company ? /* @__PURE__ */ jsxs(Fragment, { children: [
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
      /* @__PURE__ */ jsx("dt", { className: "text-[13px] leading-[18px] text-muted", children: t(`home.trust.${key}`) })
    ] })
  ] }, key)) }) }) });
}
function Home({ countries, industries, industryCount, jobs, testimonials }) {
  const { t, tm } = useLocale();
  const { site } = usePage().props;
  const faqs = tm("home.faq.items");
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EmploymentAgency",
      name: site.name,
      telephone: site.contact.phone_href,
      email: site.contact.email,
      address: { "@type": "PostalAddress", streetAddress: site.contact.address, addressLocality: "Dhaka", addressCountry: "BD" },
      ...site.licence.rl_number && { identifier: site.licence.rl_number }
    },
    faqLd(faqs)
  ];
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("home.meta.title"), description: t("home.meta.description"), jsonLd }),
    /* @__PURE__ */ jsx(Hero, { countries, industryCount }),
    /* @__PURE__ */ jsx(TrustBar, {}),
    /* @__PURE__ */ jsx(AudienceFork, {}),
    /* @__PURE__ */ jsx(LiveOpenings, { jobs }),
    /* @__PURE__ */ jsx(Journey, {}),
    /* @__PURE__ */ jsx(IndustryBento, { industries }),
    /* @__PURE__ */ jsx(CostsBlock, {}),
    /* @__PURE__ */ jsx(Destinations, { countries }),
    /* @__PURE__ */ jsx(Reviews, { reviews: testimonials }),
    /* @__PURE__ */ jsx(Faq, { title: t("home.faq.title"), lead: t("home.faq.lead"), items: faqs }),
    /* @__PURE__ */ jsx(ContactSection, { tone: "alt" }),
    /* @__PURE__ */ jsx(FinalCta, { tone: "alt" })
  ] });
}
export {
  Home as default
};
