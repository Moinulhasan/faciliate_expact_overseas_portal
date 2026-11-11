import { jsxs, jsx } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { Scale, Eye, UserRound, ShieldCheck, BadgeCheck, MapPin, Phone, Mail, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import { u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd, c as Section, C as Container, d as SectionHead, B as ButtonAnchor } from "./SiteLayout-hZjGrTmB.js";
import { C as Card, F as FinalCta } from "./Card-9Ubla1vH.js";
import { P as PageHero, H as HeroPill } from "./PageHero-mEN2jfPE.js";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "react";
import "class-variance-authority";
const principleIcons = [Scale, Eye, UserRound, ShieldCheck];
function About({ countryCount, industryCount }) {
  const { t, tm } = useLocale();
  const { appUrl, site } = usePage().props;
  const { contact, licence, stats } = site;
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("home.nav.about"), href: "/about" }
  ];
  const fmt = new Intl.NumberFormat("en");
  const figures = [
    [String(countryCount), t("hubs.about.stats.countries")],
    [String(industryCount), t("hubs.about.stats.industries")],
    [stats.years_licensed ? String(stats.years_licensed) : null, t("hubs.about.stats.years")],
    [stats.workers_deployed ? `${fmt.format(stats.workers_deployed)}+` : null, t("hubs.about.stats.workers")]
  ].filter((f) => f[0] !== null);
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: site.name,
    url: appUrl,
    telephone: contact.phone_href,
    email: contact.email,
    parentOrganization: { "@type": "Organization", name: "Facilitate Expat", url: site.main_site },
    address: { "@type": "PostalAddress", streetAddress: contact.address, addressLocality: "Dhaka", addressCountry: "BD" },
    ...licence.rl_number && { identifier: licence.rl_number }
  };
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${contact.address}, Bangladesh`)}`;
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("hubs.about.meta_title"), description: t("hubs.about.meta_description"), jsonLd: [breadcrumbLd(appUrl, crumbs), orgLd] }),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        crumbs,
        eyebrow: /* @__PURE__ */ jsx(HeroPill, { children: t("hubs.about.eyebrow") }),
        title: t("hubs.about.title"),
        accent: t("hubs.about.accent"),
        lead: t("hubs.about.lead"),
        aside: /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-card) border border-night-line bg-night-line", children: figures.map(([v, l]) => /* @__PURE__ */ jsxs("div", { className: "bg-night-2/90 p-5", children: [
          /* @__PURE__ */ jsx("dd", { className: "text-[30px] leading-9 font-semibold tracking-[-0.02em] text-white tabular-nums", children: v }),
          /* @__PURE__ */ jsx("dt", { className: "text-[13px] text-night-muted", children: l })
        ] }, l)) })
      }
    ),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { className: "grid gap-8 lg:grid-cols-[0.9fr_1.1fr]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionHead, { title: t("hubs.about.story_title") }),
        /* @__PURE__ */ jsx("div", { className: "-mt-2 grid max-w-[62ch] gap-4 text-lead text-muted", children: tm("hubs.about.story").map((p) => /* @__PURE__ */ jsx("p", { children: p }, p.slice(0, 20))) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionHead, { title: t("hubs.about.principles_title") }),
        /* @__PURE__ */ jsx("ul", { className: "grid gap-3 sm:grid-cols-2", children: tm("hubs.about.principles").map((p, i) => {
          const Icon = principleIcons[i];
          return /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsxs(Card, { className: "w-full p-5", children: [
            /* @__PURE__ */ jsx("span", { className: "icon-tile size-10", children: /* @__PURE__ */ jsx(Icon, { className: "size-5", strokeWidth: 1.75 }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-1 text-h3", children: p.title }),
            /* @__PURE__ */ jsx("p", { className: "text-[14px] leading-5 text-muted", children: p.body })
          ] }) }, p.title);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-6 md:p-7", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[22px] leading-7 font-semibold tracking-[-0.02em]", children: t("hubs.about.licence_title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[15px] text-muted", children: t("hubs.about.licence_lead") }),
        /* @__PURE__ */ jsx("dl", { className: "mt-2 grid gap-2", children: ["rl", "bmet", "baira"].map((k) => {
          const v = { rl: licence.rl_number, bmet: licence.bmet, baira: licence.baira }[k];
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 rounded-xl border border-line bg-bg px-4 py-3", children: [
            /* @__PURE__ */ jsxs("dt", { className: "flex items-center gap-2.5 text-[15px]", children: [
              /* @__PURE__ */ jsx(BadgeCheck, { className: "size-[18px] text-brand", strokeWidth: 1.75 }),
              t(`home.trust.${k}`)
            ] }),
            /* @__PURE__ */ jsx("dd", { className: v ? "text-[15px] font-semibold tabular-nums" : "text-[13px] text-faint", children: v ?? t("home.footer.pending") })
          ] }, k);
        }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-6 md:p-7", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[22px] leading-7 font-semibold tracking-[-0.02em]", children: t("hubs.about.office_title") }),
        /* @__PURE__ */ jsx("p", { className: "text-[15px] text-muted", children: t("hubs.about.office_lead") }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-2 grid gap-3 text-[15px]", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 size-[18px] shrink-0 text-brand", strokeWidth: 1.75 }),
            /* @__PURE__ */ jsx("address", { className: "not-italic", children: contact.address })
          ] }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: `tel:${contact.phone_href}`, className: "flex gap-3 hover:text-brand", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mt-0.5 size-[18px] shrink-0 text-brand", strokeWidth: 1.75 }),
            /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: contact.phone })
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: `mailto:${contact.email}`, className: "flex gap-3 hover:text-brand", children: [
            /* @__PURE__ */ jsx(Mail, { className: "mt-0.5 size-[18px] shrink-0 text-brand", strokeWidth: 1.75 }),
            contact.email
          ] }) }),
          contact.hours && /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(Clock, { className: "mt-0.5 size-[18px] shrink-0 text-brand", strokeWidth: 1.75 }),
            contact.hours
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto flex flex-wrap gap-2 pt-3", children: [
          /* @__PURE__ */ jsxs(ButtonAnchor, { href: maps, target: "_blank", rel: "noopener", variant: "ghost", size: "sm", children: [
            /* @__PURE__ */ jsx(MapPin, {}),
            " ",
            t("hubs.about.directions")
          ] }),
          /* @__PURE__ */ jsxs(ButtonAnchor, { href: `https://wa.me/${contact.whatsapp}`, target: "_blank", rel: "noopener", variant: "ghost", size: "sm", children: [
            /* @__PURE__ */ jsx(MessageCircle, {}),
            " WhatsApp"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "night night-glow flex flex-col gap-4 rounded-(--radius-card) border border-night-line p-6 text-night-ink md:flex-row md:items-center md:justify-between lg:col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-h3", children: t("hubs.about.group_title") }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-[15px] text-night-muted", children: t("hubs.about.group_body") })
        ] }),
        /* @__PURE__ */ jsxs(ButtonAnchor, { href: site.main_site, variant: "quiet", className: "shrink-0", children: [
          t("hubs.about.group_cta"),
          " ",
          /* @__PURE__ */ jsx(ArrowUpRight, {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(FinalCta, { tone: "alt" })
  ] });
}
export {
  About as default
};
