import { usePage } from "@inertiajs/react";
import { faqLd, Seo } from "@/Components/Seo";
import { AudienceFork } from "@/Components/sections/AudienceFork";
import { ContactSection } from "@/Components/sections/ContactSection";
import { CostsBlock } from "@/Components/sections/CostsBlock";
import { Destinations } from "@/Components/sections/Destinations";
import { Faq } from "@/Components/sections/Faq";
import { FinalCta } from "@/Components/sections/FinalCta";
import { Hero } from "@/Components/sections/Hero";
import { IndustryBento } from "@/Components/sections/IndustryBento";
import { Journey } from "@/Components/sections/Journey";
import { LiveOpenings } from "@/Components/sections/LiveOpenings";
import { Reviews } from "@/Components/sections/Reviews";
import { TrustBar } from "@/Components/sections/TrustBar";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import type { Country, Faq as FaqItem, Industry, JobDetail, SharedProps, Testimonial } from "@/types";

interface Props {
  countries: Country[];
  industries: Industry[];
  industryCount: number;
  jobs: JobDetail[];
  testimonials: Testimonial[];
}

export default function Home({ countries, industries, industryCount, jobs, testimonials }: Props) {
  const { t, tm } = useLocale();
  const { site } = usePage<SharedProps>().props;
  const faqs = tm<FaqItem[]>("home.faq.items");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EmploymentAgency",
      name: site.name,
      telephone: site.contact.phone_href,
      email: site.contact.email,
      address: { "@type": "PostalAddress", streetAddress: site.contact.address, addressLocality: "Dhaka", addressCountry: "BD" },
      ...(site.licence.rl_number && { identifier: site.licence.rl_number }),
    },
    faqLd(faqs),
  ];

  return (
    <SiteLayout>
      <Seo title={t("home.meta.title")} description={t("home.meta.description")} jsonLd={jsonLd} />

      <Hero countries={countries} industryCount={industryCount} />
      <TrustBar />
      <AudienceFork />
      <LiveOpenings jobs={jobs} />
      <Journey />
      <IndustryBento industries={industries} />
      <CostsBlock />
      <Destinations countries={countries} />
      <Reviews reviews={testimonials} />
      <Faq title={t("home.faq.title")} lead={t("home.faq.lead")} items={faqs} />
      <ContactSection tone="alt" />
      <FinalCta tone="alt" />
    </SiteLayout>
  );
}
