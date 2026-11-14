import { jsxs, jsx } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd, c as Section, C as Container } from "./SiteLayout-CAKLTTxk.js";
import { P as PageHero, H as HeroPill } from "./PageHero-ZW5DPLSc.js";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "react";
import "class-variance-authority";
function Privacy() {
  const { t, tm } = useLocale();
  const { appUrl, site } = usePage().props;
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("privacy.eyebrow"), href: "/privacy" }
  ];
  const fill = (s) => s.replaceAll(":months", String(site.privacy.retention_months)).replaceAll(":address", site.contact.address).replaceAll(":email", site.contact.inquiry_email);
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("privacy.meta_title"), description: t("privacy.meta_description"), jsonLd: [breadcrumbLd(appUrl, crumbs)] }),
    /* @__PURE__ */ jsx(PageHero, { crumbs, eyebrow: /* @__PURE__ */ jsx(HeroPill, { children: t("privacy.eyebrow") }), title: t("privacy.title"), accent: t("privacy.accent"), lead: t("privacy.lead") }),
    /* @__PURE__ */ jsx(Section, { tone: "bg", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-6 inline-flex rounded-full border border-dashed border-warning/50 px-3 py-1 text-sm text-warning", children: t("privacy.draft") }),
      /* @__PURE__ */ jsx("div", { className: "grid max-w-[68ch] gap-7", children: tm("privacy.sections").map((b) => /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[22px] leading-7 font-semibold tracking-[-0.015em]", children: b.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg leading-7 text-muted", children: fill(b.body) })
      ] }, b.title)) }),
      /* @__PURE__ */ jsx("p", { className: "mt-10 text-sm text-faint", children: t("privacy.updated", { date: site.privacy.updated }) })
    ] }) })
  ] });
}
export {
  Privacy as default
};
