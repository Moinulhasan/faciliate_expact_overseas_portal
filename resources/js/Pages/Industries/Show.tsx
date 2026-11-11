import { usePage } from "@inertiajs/react";
import { ArrowRight, BadgeCheck, CheckCircle2, MessageCircle } from "lucide-react";
import { CountryCard } from "@/Components/cards/CountryCard";
import { IndustryCard } from "@/Components/cards/IndustryCard";
import { breadcrumbLd, faqLd, Seo } from "@/Components/Seo";
import { Faq } from "@/Components/sections/Faq";
import { FinalCta } from "@/Components/sections/FinalCta";
import { LiveOpenings } from "@/Components/sections/LiveOpenings";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { ButtonAnchor, ButtonLink } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/Card";
import { IndustryVisual } from "@/Components/ui/IndustryVisual";
import { IndustryHeroBackground } from "@/Components/IndustryHeroVisual";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import { iconFor } from "@/lib/industryIcons";
import type { CountryCard as CountryCardT, Industry, IndustryDetail, JobDetail, SharedProps } from "@/types";

interface Props {
  industry: IndustryDetail;
  countries: (CountryCardT & { note: string | null })[];
  jobs: JobDetail[];
  related: Industry[];
}

export default function IndustryShow({ industry: ind, countries, jobs, related }: Props) {
  const { t, tm } = useLocale();
  const { appUrl, site } = usePage<SharedProps>().props;
  const Icon = iconFor(ind.slug);
  const screening = tm<{ title: string; body: string }[]>("pages.industries.screening");

  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("pages.crumbs.industries"), href: "/industries" },
    { name: ind.name, href: `/industries/${ind.slug}` },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${ind.name} recruitment from Bangladesh`,
    serviceType: "Overseas recruitment and manpower supply",
    description: ind.summary,
    provider: { "@type": "EmploymentAgency", name: site.name, url: appUrl },
    areaServed: countries.map((c) => ({ "@type": "Country", name: c.name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${ind.name} roles`,
      itemListElement: ind.roles.map((r) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: r } })),
    },
  };

  return (
    <SiteLayout>
      <Seo
        title={`${ind.name} jobs abroad`}
        description={ind.meta_description ?? ind.summary}
        jsonLd={[breadcrumbLd(appUrl, crumbs), serviceLd, faqLd(ind.faqs)]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-(--radius-tile) bg-cta/[0.14] text-cta">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <HeroPill>{t(`pages.industries.groups.${ind.group}`)}</HeroPill>
          </div>
        }
        title={ind.name}
        lead={ind.summary}
        actions={
          <>
            <ButtonLink href="/apply" size="lg">
              {t("pages.apply")} <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/employers/request" size="lg" variant="quiet">
              {t("pages.request")}
            </ButtonLink>
          </>
        }
        background={<IndustryHeroBackground industry={ind} />}
        meta={
          <ul aria-label={t("pages.industries.roles_title")} className="flex flex-wrap gap-1.5">
            {ind.roles.slice(0, 6).map((r) => (
              <li key={r} className="rounded-full border border-white/15 bg-night/55 px-2.5 py-0.5 text-[13px] leading-5 text-night-ink backdrop-blur-md">
                {r}
              </li>
            ))}
          </ul>
        }
      />

      {/* Overview + highlights */}
      <Section tone="bg">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col">
            <SectionHead title={t("pages.industries.overview")} />
            <p className="-mt-3 max-w-[62ch] text-lead text-muted">{ind.intro}</p>
            <IndustryVisual
              industry={ind}
              img={ind.image_detail ?? ind.image}
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="mt-7 aspect-[3/2] rounded-(--radius-card) border border-line"
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {ind.highlights.map((h) => (
              <li key={h.title} className="flex">
                <Card className="w-full">
                  <span className="icon-tile size-10">
                    <BadgeCheck className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-1 text-h3">{h.title}</h3>
                  <p className="text-[15px] leading-[22px] text-muted">{h.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Roles + requirements */}
      <Section tone="alt">
        <Container className="grid gap-4 lg:grid-cols-2">
          <Card className="p-7">
            <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.02em]">{t("pages.industries.roles_title")}</h2>
            <p className="text-[15px] text-muted">{t("pages.industries.roles_lead")}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {ind.roles.map((r) => (
                <li key={r} className="flex items-center gap-2.5 rounded-xl border border-line bg-bg px-3.5 py-2.5 text-[15px] font-medium">
                  <span className="size-1.5 rounded-full bg-brand" />
                  {r}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-7">
            <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.02em]">{t("pages.industries.certs_title")}</h2>
            <p className="text-[15px] text-muted">{t("pages.industries.certs_lead")}</p>
            <ul className="mt-3 grid gap-3">
              {ind.certifications.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] leading-[22px]">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.75} />
                  {c}
                </li>
              ))}
            </ul>
            <ButtonAnchor
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Question about ${ind.name} jobs`)}`}
              target="_blank"
              rel="noopener"
              variant="ghost"
              size="sm"
              className="mt-auto self-start"
            >
              <MessageCircle /> {t("pages.whatsapp")}
            </ButtonAnchor>
          </Card>
        </Container>
      </Section>

      {/* Screening */}
      <Section tone="bg">
        <Container>
          <SectionHead title={t("pages.industries.screening_title")} />
          <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {screening.map((s, i) => (
              <li key={s.title} className="relative border-t border-line py-6">
                <span aria-hidden className="absolute -top-px left-0 h-px w-10 bg-brand" />
                <span className="text-[13px] font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-h3">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[22px] text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Destinations */}
      {countries.length > 0 && (
        <Section tone="alt">
          <Container>
            <SectionHead title={t("pages.industries.countries_title")} lead={t("pages.industries.countries_lead")} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {countries.map((c) => (
                <li key={c.slug} className="flex">
                  <CountryCard country={c} note={c.note} />
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] text-faint">{t("pages.typical")}</p>
          </Container>
        </Section>
      )}

      <LiveOpenings jobs={jobs} />

      <Faq title={t("pages.faq_title")} lead={t("pages.faq_lead")} items={ind.faqs} />

      {related.length > 0 && (
        <Section tone="alt">
          <Container>
            <SectionHead title={t("pages.industries.related")} />
            <ul className="grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="flex">
                  <IndustryCard industry={r} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <FinalCta tone={related.length > 0 ? "alt" : "bg"} />
    </SiteLayout>
  );
}
