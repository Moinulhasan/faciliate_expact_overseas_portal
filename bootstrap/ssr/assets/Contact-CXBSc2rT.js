import { jsxs, jsx } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { u as useLocale, S as SiteLayout, a as Seo, b as breadcrumbLd } from "./SiteLayout-hZjGrTmB.js";
import { C as ContactSection } from "./ContactSection-BdyaB-BD.js";
import { P as PageHero, H as HeroPill } from "./PageHero-mEN2jfPE.js";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "react";
import "class-variance-authority";
function Contact() {
  const { t } = useLocale();
  const { appUrl, site } = usePage().props;
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("contact.eyebrow"), href: "/contact" }
  ];
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("contact.meta_title"),
    mainEntity: {
      "@type": "EmploymentAgency",
      name: site.name,
      email: site.contact.inquiry_email,
      telephone: site.contact.phone_href,
      address: { "@type": "PostalAddress", streetAddress: site.contact.address, addressLocality: "Dhaka", addressCountry: "BD" }
    }
  };
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("contact.meta_title"), description: t("contact.meta_description"), jsonLd: [breadcrumbLd(appUrl, crumbs), contactLd] }),
    /* @__PURE__ */ jsx(PageHero, { crumbs, eyebrow: /* @__PURE__ */ jsx(HeroPill, { children: t("contact.eyebrow") }), title: t("contact.title"), accent: t("contact.accent"), lead: t("contact.lead") }),
    /* @__PURE__ */ jsx(ContactSection, {})
  ] });
}
export {
  Contact as default
};
