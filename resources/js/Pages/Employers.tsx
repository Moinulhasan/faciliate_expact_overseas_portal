import { usePage } from "@inertiajs/react";
import { ArrowRight, FileText, Phone, ShieldCheck, UserRoundCheck, Wrench } from "lucide-react";
import { CountryCard } from "@/Components/cards/CountryCard";
import { IndustryCard } from "@/Components/cards/IndustryCard";
import { breadcrumbLd, faqLd, Seo } from "@/Components/Seo";
import { Faq } from "@/Components/sections/Faq";
import { FinalCta } from "@/Components/sections/FinalCta";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { ButtonAnchor, ButtonLink } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/Card";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import type { CountryCard as CountryCardT, Faq as FaqItem, Industry, SharedProps } from "@/types";

type Item = { title: string; body: string };
const pillarIcons = [Wrench, UserRoundCheck, ShieldCheck];

export default function Employers({ industries, countries }: { industries: Industry[]; countries: CountryCardT[] }) {
  const { t, tm } = useLocale();
  const { appUrl, site } = usePage<SharedProps>().props;
  const faqs = tm<FaqItem[]>("hubs.employers.faq");
  const steps = tm<Item[]>("hubs.employers.process");
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("home.nav.employers"), href: "/employers" },
  ];
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Manpower supply from Bangladesh",
    serviceType: "Overseas recruitment and manpower supply",
    provider: { "@type": "EmploymentAgency", name: site.name, url: appUrl },
    areaServed: countries.map((c) => ({ "@type": "Country", name: c.name })),
  };

  return (
    <SiteLayout>
      <Seo title={t("hubs.employers.meta_title")} description={t("hubs.employers.meta_description")} jsonLd={[breadcrumbLd(appUrl, crumbs), serviceLd, faqLd(faqs)]} />

      <PageHero
        crumbs={crumbs}
        eyebrow={<HeroPill>{t("hubs.employers.eyebrow")}</HeroPill>}
        title={t("hubs.employers.title")}
        accent={t("hubs.employers.accent")}
        lead={t("hubs.employers.lead")}
        actions={
          <>
            <ButtonLink href="/employers/request" size="lg">
              {t("hubs.employers.cta")} <ArrowRight />
            </ButtonLink>
            <ButtonAnchor href={`tel:${site.contact.phone_href}`} size="lg" variant="quiet">
              <Phone /> {t("hubs.employers.cta_call")}
            </ButtonAnchor>
          </>
        }
        aside={
          <div className="card-night p-5">
            <p className="text-[13px] text-night-muted">{t("hubs.employers.countries_title")}</p>
            <ul className="mt-3 grid grid-cols-2 gap-1.5">
              {countries.slice(0, 10).map((c) => (
                <li key={c.slug} className="flex items-center gap-2 rounded-lg bg-night-2 px-2.5 py-2 text-[13px]">
                  <FlagIcon iso2={c.iso2} className="h-3.5 w-5" />
                  <span className="truncate">{c.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] text-night-muted">+{Math.max(0, countries.length - 10)} more</p>
          </div>
        }
      />

      {/* Pillars */}
      <Section tone="bg">
        <Container>
          <ul className="grid gap-4 md:grid-cols-3">
            {tm<Item[]>("hubs.employers.pillars").map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <li key={p.title} className="flex">
                  <Card className="w-full p-6">
                    <span className="icon-tile">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <h2 className="mt-1 text-[19px] leading-6 font-semibold tracking-[-0.015em]">{p.title}</h2>
                    <p className="text-[15px] leading-[22px] text-muted">{p.body}</p>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Process + what we need */}
      <Section tone="alt">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHead title={t("hubs.employers.process_title")} lead={t("hubs.employers.process_lead")} />
            <ol className="grid gap-x-6 sm:grid-cols-2">
              {steps.map((s, i) => (
                <li key={s.title} className="relative border-t border-line py-5">
                  <span aria-hidden className="absolute -top-px left-0 h-px w-10 bg-brand" />
                  <span className="text-[13px] font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1.5 text-h3">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-[22px] text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHead title={t("hubs.employers.needs_title")} lead={t("hubs.employers.needs_lead")} />
            <Card className="p-5">
              <ul className="grid gap-3">
                {tm<string[]>("hubs.employers.needs").map((d) => (
                  <li key={d} className="flex gap-3 text-[15px] leading-[22px]">
                    <FileText className="mt-0.5 size-[18px] shrink-0 text-brand" strokeWidth={1.75} />
                    {d}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/employers/request" className="mt-2 w-full">
                {t("hubs.employers.cta")} <ArrowRight />
              </ButtonLink>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Industries */}
      <Section tone="bg">
        <Container>
          <SectionHead
            title={t("hubs.employers.industries_title")}
            lead={t("hubs.employers.industries_lead")}
            aside={
              <ButtonLink href="/industries" variant="ghost" size="sm">
                {t("home.industries.see_all")} <ArrowRight />
              </ButtonLink>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.slice(0, 8).map((i) => (
              <li key={i.slug} className="flex">
                <IndustryCard industry={i} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <SectionHead
            title={t("hubs.employers.countries_title")}
            aside={
              <ButtonLink href="/countries" variant="ghost" size="sm">
                {t("pages.crumbs.countries")} <ArrowRight />
              </ButtonLink>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {countries.slice(0, 8).map((c) => (
              <li key={c.slug} className="flex">
                <CountryCard country={c} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Faq title={t("pages.faq_title")} lead={t("pages.faq_lead")} items={faqs} />
      <FinalCta />
    </SiteLayout>
  );
}
