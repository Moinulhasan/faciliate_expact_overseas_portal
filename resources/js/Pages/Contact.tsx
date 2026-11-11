import { usePage } from "@inertiajs/react";
import { breadcrumbLd, Seo } from "@/Components/Seo";
import { ContactSection } from "@/Components/sections/ContactSection";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import type { SharedProps } from "@/types";

export default function Contact() {
  const { t } = useLocale();
  const { appUrl, site } = usePage<SharedProps>().props;
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("contact.eyebrow"), href: "/contact" },
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
      address: { "@type": "PostalAddress", streetAddress: site.contact.address, addressLocality: "Dhaka", addressCountry: "BD" },
    },
  };

  return (
    <SiteLayout>
      <Seo title={t("contact.meta_title")} description={t("contact.meta_description")} jsonLd={[breadcrumbLd(appUrl, crumbs), contactLd]} />
      <PageHero crumbs={crumbs} eyebrow={<HeroPill>{t("contact.eyebrow")}</HeroPill>} title={t("contact.title")} accent={t("contact.accent")} lead={t("contact.lead")} />
      <ContactSection />
    </SiteLayout>
  );
}
