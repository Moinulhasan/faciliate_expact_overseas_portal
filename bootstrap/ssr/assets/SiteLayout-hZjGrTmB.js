import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage, Head, Link } from "@inertiajs/react";
import { ArrowUpRight, MapPin, Phone, MessageCircle, Mail, Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, m } from "motion/react";
import { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
function Seo({
  title,
  description,
  jsonLd = [],
  type = "website"
}) {
  const { canonical, site } = usePage().props;
  const fullTitle = `${title} — Facilitate Expat Overseas`;
  return /* @__PURE__ */ jsxs(Head, { title, children: [
    /* @__PURE__ */ jsx("meta", { "head-key": "description", name: "description", content: description }),
    /* @__PURE__ */ jsx("link", { "head-key": "canonical", rel: "canonical", href: canonical }),
    /* @__PURE__ */ jsx("meta", { "head-key": "og:type", property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { "head-key": "og:site_name", property: "og:site_name", content: site.name }),
    /* @__PURE__ */ jsx("meta", { "head-key": "og:title", property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { "head-key": "og:description", property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { "head-key": "og:url", property: "og:url", content: canonical }),
    /* @__PURE__ */ jsx("meta", { "head-key": "og:locale", property: "og:locale", content: "en_US" }),
    /* @__PURE__ */ jsx("meta", { "head-key": "twitter:card", name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { "head-key": "twitter:title", name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { "head-key": "twitter:description", name: "twitter:description", content: description }),
    jsonLd.length > 0 && /* @__PURE__ */ jsx("script", { "head-key": "jsonld", type: "application/ld+json", children: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd).replace(/</g, "\\u003c") })
  ] });
}
function breadcrumbLd(appUrl, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: appUrl + it.href }))
  };
}
function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };
}
function itemListLd(appUrl, items) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: appUrl + it.href }))
  };
}
const cn = (...inputs) => twMerge(clsx(inputs));
const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 rounded-full border border-transparent font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-500 ease-(--ease-out) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg:last-child]:translate-x-[3px]",
  {
    variants: {
      variant: {
        cta: "bg-[linear-gradient(135deg,var(--color-brand-hi),var(--color-brand-lo))] text-white shadow-(--shadow-cta) hover:-translate-y-px hover:shadow-(--shadow-cta-hover)",
        ghost: "border-line bg-transparent text-ink hover:border-brand",
        soft: "bg-surface-2 text-ink hover:bg-brand hover:text-white",
        quiet: "border-night-line text-night-ink hover:bg-white/[0.08]",
        wa: "bg-[linear-gradient(135deg,var(--color-brand-hi),var(--color-brand-lo))] text-white shadow-(--shadow-cta) hover:-translate-y-px hover:shadow-(--shadow-cta-hover)"
      },
      size: {
        sm: "min-h-10 px-4 text-sm",
        md: "min-h-11 px-[18px] text-[15px]",
        lg: "min-h-[52px] px-6 text-[15px]",
        icon: "size-10 p-0"
      }
    },
    defaultVariants: { variant: "cta", size: "md" }
  }
);
function Button({ className, variant, size, ...props }) {
  return /* @__PURE__ */ jsx("button", { className: cn(buttonVariants({ variant, size }), className), ...props });
}
function ButtonLink({ className, variant, size, ...props }) {
  return /* @__PURE__ */ jsx(Link, { className: cn(buttonVariants({ variant, size }), className), ...props });
}
function ButtonAnchor({ className, variant, size, ...props }) {
  return /* @__PURE__ */ jsx("a", { className: cn(buttonVariants({ variant, size }), className), ...props });
}
const tones = {
  bg: "bg-bg text-ink",
  alt: "bg-surface-2 text-ink",
  night: "night night-glow text-night-ink"
};
function Section({
  tone = "bg",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx("section", { className: cn("relative isolate py-12 md:py-14 lg:py-16", tones[tone], className), ...props, children });
}
function Container({ className, children }) {
  return /* @__PURE__ */ jsx("div", { className: cn("mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 2xl:px-14", className), children });
}
function Heading({
  as: Tag = "h2",
  a,
  b,
  className
}) {
  return /* @__PURE__ */ jsxs(Tag, { className: cn(Tag === "h1" ? "text-display" : "text-h2", "text-balance", className), children: [
    a,
    b && /* @__PURE__ */ jsxs(Fragment, { children: [
      " ",
      /* @__PURE__ */ jsx("span", { className: "text-accent", children: b })
    ] })
  ] });
}
function SectionHead({
  title,
  accent,
  lead,
  aside,
  night
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex max-w-[680px] flex-col gap-2.5", children: [
      /* @__PURE__ */ jsx(Heading, { a: title, b: accent }),
      lead && /* @__PURE__ */ jsx("p", { className: cn("text-lead", night ? "text-night-muted" : "text-muted"), children: lead })
    ] }),
    aside
  ] });
}
function Pill({ className, children }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[13px] leading-5 whitespace-nowrap text-muted",
        className
      ),
      children
    }
  );
}
function lookup(dict, key) {
  return key.split(".").reduce((node, part) => node?.[part], dict);
}
function useLocale() {
  const { locale, translations } = usePage().props;
  function t(key, replace = {}) {
    const value = lookup(translations, key);
    if (typeof value !== "string") return key;
    return Object.entries(replace).reduce((s, [k, v]) => s.replaceAll(`:${k}`, String(v)), value);
  }
  function tm(key) {
    return lookup(translations, key) ?? [];
  }
  return { locale, t, tm };
}
const explore = ["industries", "jobs", "countries", "about", "contact"];
const hrefs = {
  jobs: "/jobs",
  industries: "/industries",
  countries: "/countries",
  about: "/about",
  contact: "/contact"
};
function Footer() {
  const { t } = useLocale();
  const { site } = usePage().props;
  const { contact, licence } = site;
  const heading = "text-[13px] font-semibold text-night-ink";
  return /* @__PURE__ */ jsx("footer", { className: "night bg-night pt-12 pb-8 text-night-muted", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 text-night-ink", children: [
          /* @__PURE__ */ jsx("img", { src: "/images/logo.svg", alt: "", width: 32, height: 32, className: "size-8" }),
          /* @__PURE__ */ jsx("span", { className: "text-[15px] font-semibold", children: site.name })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-[36ch] text-[15px] leading-[22px]", children: t("home.footer.tagline") }),
        /* @__PURE__ */ jsxs("a", { href: site.main_site, className: "mt-5 inline-flex items-center gap-1 text-sm font-medium text-cta hover:underline", children: [
          t("home.footer.main_site"),
          " ",
          /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4", strokeWidth: 2 })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { "aria-label": t("home.footer.explore"), className: "md:col-span-2", children: [
        /* @__PURE__ */ jsx("h2", { className: heading, children: t("home.footer.explore") }),
        /* @__PURE__ */ jsx("ul", { className: "mt-4 grid gap-2.5 text-sm", children: explore.map((k) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: hrefs[k], className: "hover:text-night-ink", children: t(`home.nav.${k}`) }) }, k)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsx("h2", { className: heading, children: t("home.footer.contact") }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 grid gap-3 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-2.5", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 size-4 shrink-0 text-cta", strokeWidth: 1.75 }),
            /* @__PURE__ */ jsx("address", { className: "not-italic", children: contact.address })
          ] }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: `tel:${contact.phone_href}`, className: "flex gap-2.5 hover:text-night-ink", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mt-0.5 size-4 shrink-0 text-cta", strokeWidth: 1.75 }),
            /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: contact.phone })
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: `https://wa.me/${contact.whatsapp}`, target: "_blank", rel: "noopener", className: "flex gap-2.5 hover:text-night-ink", children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "mt-0.5 size-4 shrink-0 text-cta", strokeWidth: 1.75 }),
            "WhatsApp"
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: `mailto:${contact.inquiry_email}`, className: "flex gap-2.5 hover:text-night-ink", children: [
            /* @__PURE__ */ jsx(Mail, { className: "mt-0.5 size-4 shrink-0 text-cta", strokeWidth: 1.75 }),
            contact.inquiry_email
          ] }) }),
          contact.hours && /* @__PURE__ */ jsxs("li", { children: [
            t("home.footer.hours"),
            ": ",
            contact.hours
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsx("h2", { className: heading, children: t("home.footer.licence") }),
        /* @__PURE__ */ jsx("dl", { className: "mt-4 grid gap-3 text-sm", children: ["rl", "bmet", "baira"].map((key) => {
          const value = { rl: licence.rl_number, bmet: licence.bmet, baira: licence.baira }[key];
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-[13px] text-faint", children: t(`home.trust.${key}`) }),
            /* @__PURE__ */ jsx("dd", { className: "text-night-ink", children: value ?? t("home.footer.pending") })
          ] }, key);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col gap-3 border-t border-night-line pt-6 text-[13px] sm:flex-row sm:justify-between", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        site.name,
        ". ",
        t("home.footer.rights")
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-night-ink", children: "EN" })
    ] })
  ] }) });
}
const ease = {
  out: [0.22, 1, 0.36, 1]
};
const dur = { md: 0.45 };
const links = [
  { key: "industries", href: "/industries" },
  { key: "jobs", href: "/jobs" },
  { key: "countries", href: "/countries" },
  { key: "about", href: "/about" }
  // { key: "work_abroad", href: "/work-abroad" },
  // { key: "employers", href: "/employers" },
];
function Nav() {
  const { t } = useLocale();
  const page = usePage();
  const { site } = page.props;
  const current = page.url;
  const [open, setOpen] = useState(false);
  const wa = `https://wa.me/${site.contact.whatsapp}`;
  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return /* @__PURE__ */ jsxs("header", { className: "night", children: [
    /* @__PURE__ */ jsxs(
      "nav",
      {
        "aria-label": "Primary",
        className: "fixed top-3 left-1/2 z-50 flex w-max max-w-[calc(100%-24px)] -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-cta/[0.22] bg-night/90 py-1.5 pr-1.5 pl-4 text-night-ink backdrop-blur-[16px] backdrop-saturate-150 min-[1001px]:w-[720px]",
        children: [
          /* @__PURE__ */ jsx(Link, { href: "/", "aria-label": `${site.name} — home`, className: "inline-flex size-10 shrink-0 items-center justify-center rounded-full p-0.5", children: /* @__PURE__ */ jsx("img", { src: "/images/logo.svg", alt: "", width: 36, height: 36, className: "size-9" }) }),
          /* @__PURE__ */ jsx("ul", { className: "hidden flex-1 items-center justify-center gap-1 min-[1001px]:flex", children: links.map((l) => {
            const active = current.startsWith(l.href);
            return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: l.href,
                "aria-current": active ? "page" : void 0,
                className: cn(
                  "inline-flex h-9 items-center rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  active ? "bg-white/[0.08] text-night-ink" : "text-night-muted hover:text-night-ink"
                ),
                children: t(`home.nav.${l.key}`)
              }
            ) }, l.key);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs(ButtonAnchor, { href: `tel:${site.contact.phone_href}`, size: "sm", children: [
              /* @__PURE__ */ jsx(Phone, { strokeWidth: 2 }),
              " ",
              t("home.nav.call_now")
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setOpen(true),
                "aria-expanded": open,
                "aria-controls": "mobile-nav",
                className: "inline-grid size-10 place-items-center rounded-full hover:bg-white/[0.08] min-[1001px]:hidden",
                children: [
                  /* @__PURE__ */ jsx(Menu, { className: "size-5", strokeWidth: 1.75 }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("home.nav.menu") })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(
      m.div,
      {
        id: "mobile-nav",
        role: "dialog",
        "aria-modal": "true",
        className: "night-glow fixed inset-0 z-50 flex flex-col px-5 pt-5 pb-8 text-night-ink min-[1001px]:hidden",
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: dur.md, ease: ease.out },
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setOpen(false),
              className: "inline-flex size-12 items-center justify-center rounded-full hover:bg-white/[0.08]",
              autoFocus: true,
              children: [
                /* @__PURE__ */ jsx(X, { className: "size-6", strokeWidth: 1.75 }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("home.nav.close") })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("ul", { className: "mt-4 divide-y divide-night-line", children: links.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: l.href, onClick: () => setOpen(false), className: "block py-4 text-2xl font-semibold tracking-[-0.02em]", children: t(`home.nav.${l.key}`) }) }, l.key)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto grid gap-3", children: [
            /* @__PURE__ */ jsxs(ButtonAnchor, { href: `tel:${site.contact.phone_href}`, size: "lg", children: [
              /* @__PURE__ */ jsx(Phone, { strokeWidth: 2 }),
              " ",
              t("home.nav.call_now")
            ] }),
            /* @__PURE__ */ jsxs(ButtonAnchor, { href: wa, target: "_blank", rel: "noopener", variant: "quiet", size: "lg", children: [
              /* @__PURE__ */ jsx(MessageCircle, { strokeWidth: 1.75 }),
              " WhatsApp"
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
function SiteLayout({ children }) {
  const { t } = useLocale();
  const { site } = usePage().props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#main",
        className: "sr-only z-[60] rounded-full bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4",
        children: "Skip to content"
      }
    ),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsx("main", { id: "main", children }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: `https://wa.me/${site.contact.whatsapp}`,
        target: "_blank",
        rel: "noopener",
        "aria-label": t("home.nav.whatsapp"),
        className: "fixed right-5 bottom-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-brand-hi),var(--color-brand-lo))] text-white shadow-(--shadow-cta) ring-4 ring-brand/15 transition-transform duration-500 ease-(--ease-out) hover:-translate-y-0.5",
        children: /* @__PURE__ */ jsx(MessageCircle, { className: "size-6", strokeWidth: 1.75 })
      }
    )
  ] });
}
export {
  ButtonAnchor as B,
  Container as C,
  Heading as H,
  Pill as P,
  SiteLayout as S,
  Seo as a,
  breadcrumbLd as b,
  Section as c,
  SectionHead as d,
  ButtonLink as e,
  faqLd as f,
  cn as g,
  buttonVariants as h,
  itemListLd as i,
  Button as j,
  ease as k,
  dur as l,
  useLocale as u
};
