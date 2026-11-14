import { usePage } from "@inertiajs/react";
import { breadcrumbLd, Seo } from "@/Components/Seo";
import type { FormOptions } from "@/Components/InquiryForm";
import { ContactSection } from "@/Components/sections/ContactSection";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import type { SharedProps } from "@/types";

export default function Contact({ formOptions }: { formOptions: FormOptions }) {
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
      address: [
        { "@type": "PostalAddress", streetAddress: site.contact.address, addressLocality: "Dhaka", addressCountry: "BD" },
        ...(site.contact.address_my
          ? [{ "@type": "PostalAddress", streetAddress: "A-LG-1, Connaught Avenue Cheras, Jalan 9 Taman Bukit Cheras", postalCode: "56000", addressLocality: "Kuala Lumpur", addressCountry: "MY" }]
          : []),
      ],
    },
  };

  return (
    <SiteLayout>
      <Seo title={t("contact.meta_title")} description={t("contact.meta_description")} jsonLd={[breadcrumbLd(appUrl, crumbs), contactLd]} />
      <PageHero crumbs={crumbs} eyebrow={<HeroPill>{t("contact.eyebrow")}</HeroPill>} title={t("contact.title")} accent={t("contact.accent")} lead={t("contact.lead")} />
      <ContactSection options={formOptions} />
    </SiteLayout>
  );
}
