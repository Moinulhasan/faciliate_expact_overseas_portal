import { usePage } from "@inertiajs/react";
import type { FormOptions } from "@/Components/InquiryForm";
import { faqLd, Seo } from "@/Components/Seo";
import { ContactSection } from "@/Components/sections/ContactSection";
import { CostsBlock } from "@/Components/sections/CostsBlock";
import { Faq } from "@/Components/sections/Faq";
import { FinalCta } from "@/Components/sections/FinalCta";
import { Hero } from "@/Components/sections/Hero";
import { IndustryBento } from "@/Components/sections/IndustryBento";
import { Journey } from "@/Components/sections/Journey";
import { LiveOpenings, type JobCountry } from "@/Components/sections/LiveOpenings";
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
  formOptions: FormOptions;
  jobCountries: JobCountry[];
}

// Order follows the UX audit (13 Nov 2026): trust first, then jobs, then money/fraud, then how it works.
// The audience is asked once (hero); countries appear once (hero strip); employer detail lives on /employers.
export default function Home({ countries, industries, industryCount, jobs, jobCountries, testimonials, formOptions }: Props) {
  const { t, tm } = useLocale();
  const { site } = usePage<SharedProps>().props;
  const faqs = tm<FaqItem[]>("home.faq.items");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EmploymentAgency",
      name: site.name,
      telephone: site.contact.phone_href,
      email: site.contact.inquiry_email,
      address: [
        { "@type": "PostalAddress", streetAddress: site.contact.address, addressLocality: "Dhaka", addressCountry: "BD" },
        ...(site.contact.address_my
          ? [{ "@type": "PostalAddress", streetAddress: "A-LG-1, Connaught Avenue Cheras, Jalan 9 Taman Bukit Cheras", postalCode: "56000", addressLocality: "Kuala Lumpur", addressCountry: "MY" }]
          : []),
      ],
      ...(site.licence.rl_number && { identifier: site.licence.rl_number }),
    },
    faqLd(faqs),
  ];

  return (
    <SiteLayout>
      <Seo title={t("home.meta.title")} description={t("home.meta.description", { n: countries.length })} jsonLd={jsonLd} />

      <Hero countries={countries} industryCount={industryCount} />
      <TrustBar />
      <LiveOpenings jobs={jobs} filters={jobCountries} />
      <CostsBlock />
      <Journey />
      <IndustryBento industries={industries} />
      <Reviews reviews={testimonials} />
      <Faq title={t("home.faq.title")} lead={t("home.faq.lead")} items={faqs} />
      <ContactSection tone="alt" options={formOptions} />
      <FinalCta tone="alt" />
    </SiteLayout>
  );
}
