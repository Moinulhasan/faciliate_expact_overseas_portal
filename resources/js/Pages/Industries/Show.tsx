import { usePage } from "@inertiajs/react";
import { ArrowRight, ArrowUpRight, BadgeCheck, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { IndustryCard } from "@/Components/cards/IndustryCard";
import { breadcrumbLd, faqLd, Seo } from "@/Components/Seo";
import { CostsBlock } from "@/Components/sections/CostsBlock";
import { Faq } from "@/Components/sections/Faq";
import { FinalCta } from "@/Components/sections/FinalCta";
import { LiveOpenings } from "@/Components/sections/LiveOpenings";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { ButtonAnchor, ButtonLink } from "@/Components/ui/Button";
import { Card, trackGlow } from "@/Components/ui/Card";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { Link } from "@/Components/ui/Link";
import { PayLine } from "@/Components/ui/PayLine";
import { IndustryVisual } from "@/Components/ui/IndustryVisual";
import { IndustryHeroBackground } from "@/Components/IndustryHeroVisual";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import { iconFor } from "@/lib/industryIcons";
import type { CountryCard as CountryCardT, Industry, IndustryDetail, JobDetail, PayRange, SharedProps } from "@/types";

interface Props {
  industry: IndustryDetail;
  countries: (CountryCardT & { note: string | null; pay: PayRange | null })[];
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
            <ButtonLink href="/contact?type=job" size="lg">
              {t("pages.apply")} <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/contact?type=employer" size="lg" variant="quiet">
              {t("pages.request")}
            </ButtonLink>
          </>
        }
        background={<IndustryHeroBackground industry={ind} />}
      />

      {/* Overview + highlights */}
      <Section tone="bg">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col">
            <SectionHead title={t("pages.industries.overview")} />
            <p className="-mt-3 max-w-[62ch] text-lead text-muted">{ind.intro}</p>
            {/* Only a real photo — an empty placeholder frame looks unfinished (UX audit). */}
            {(ind.image_detail ?? ind.image) && (
              <IndustryVisual
                industry={ind}
                img={ind.image_detail ?? ind.image}
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="mt-7 aspect-[3/2] rounded-(--radius-card) border border-line"
              />
            )}
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
                <span className="text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
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
            {/* Compact rows, not full cards — 13 cards made this page 14–16 phone screens long. */}
            <ul className="grid gap-3 md:grid-cols-2">
              {countries.map((c) => (
                <li key={c.slug} className="flex">
                  <Link
                    href={`/countries/${c.slug}`}
                    onPointerMove={trackGlow}
                    className="card group flex w-full flex-col gap-2 p-4 md:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <FlagIcon iso2={c.iso2} className="h-5 w-7 shrink-0 rounded-[3px]" />
                      <h3 className="min-w-0 flex-1 truncate text-h3">{c.name}</h3>
                      {c.processing_days_min && c.processing_days_max && (
                        <span className="inline-flex shrink-0 items-center gap-1 text-sm text-muted tabular-nums">
                          <Clock className="size-3.5" strokeWidth={2} />
                          {t("pages.countries.days", { min: c.processing_days_min, max: c.processing_days_max })}
                        </span>
                      )}
                      <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-brand" strokeWidth={2} />
                    </div>
                    {c.note && <p className="text-[15px] leading-[22px] text-muted">{c.note}</p>}
                    {c.pay && <PayLine pay={c.pay} />}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-faint">{t("pages.typical")}</p>
          </Container>
        </Section>
      )}

      <CostsBlock tone={countries.length ? "bg" : "alt"} />

      <LiveOpenings jobs={jobs} />

      <Faq title={t("pages.faq_title")} lead={t("pages.faq_lead")} items={ind.faqs} tone={jobs.length ? "bg" : "alt"} />

      {related.length > 0 && (
        <Section tone={jobs.length ? "alt" : "bg"}>
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

      <FinalCta tone={(related.length > 0) === (jobs.length > 0) ? "alt" : "bg"} />
    </SiteLayout>
  );
}
