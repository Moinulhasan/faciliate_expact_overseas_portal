import { usePage } from "@inertiajs/react";
import { ArrowRight, CalendarRange, Clock, Coins, Info, Languages, MessageCircle, Stamp } from "lucide-react";
import { CountryCard } from "@/Components/cards/CountryCard";
import { IndustryCard } from "@/Components/cards/IndustryCard";
import { DocumentChecklist } from "@/Components/DocumentChecklist";
import { breadcrumbLd, faqLd, Seo } from "@/Components/Seo";
import { CostsBlock } from "@/Components/sections/CostsBlock";
import { Faq } from "@/Components/sections/Faq";
import { FinalCta } from "@/Components/sections/FinalCta";
import { LiveOpenings } from "@/Components/sections/LiveOpenings";
import { PageHero } from "@/Components/sections/PageHero";
import { ButtonAnchor, ButtonLink } from "@/Components/ui/Button";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import type { CountryCard as CountryCardT, CountryDetail, JobDetail, SharedProps } from "@/types";

interface Props {
  country: CountryDetail;
  jobs: JobDetail[];
  related: CountryCardT[];
}

export default function CountryShow({ country: c, jobs, related }: Props) {
  const { t } = useLocale();
  const { appUrl, site } = usePage<SharedProps>().props;
  const region = t(`pages.countries.regions.${c.region}`);
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("pages.crumbs.countries"), href: "/countries" },
    { name: c.name, href: `/countries/${c.slug}` },
  ];

  const facts = [
    { Icon: Stamp, label: t("pages.countries.facts.visa"), value: c.visa_type },
    {
      Icon: Clock,
      label: t("pages.countries.facts.processing"),
      value: c.processing_days_min && c.processing_days_max ? t("pages.countries.days", { min: c.processing_days_min, max: c.processing_days_max }) : null,
    },
    { Icon: CalendarRange, label: t("pages.countries.facts.contract"), value: c.contract_months ? t("pages.countries.months", { n: c.contract_months }) : null },
    { Icon: Coins, label: t("pages.countries.facts.currency"), value: c.currency },
    { Icon: Languages, label: t("pages.countries.facts.language"), value: c.languages },
  ].filter((f) => f.value);

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to get a work visa for ${c.name} from Bangladesh`,
    totalTime: c.processing_days_max ? `P${c.processing_days_max}D` : undefined,
    step: c.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Work visa and job placement in ${c.name}`,
    serviceType: "Overseas recruitment",
    provider: { "@type": "EmploymentAgency", name: site.name, url: appUrl },
    areaServed: { "@type": "Country", name: c.name },
    description: c.intro,
  };

  return (
    <SiteLayout>
      <Seo
        title={`Work in ${c.name} from Bangladesh`}
        description={c.meta_description ?? c.intro ?? ""}
        jsonLd={[breadcrumbLd(appUrl, crumbs), serviceLd, howToLd, faqLd(c.faqs)]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={
          <p className="inline-flex items-center gap-2 rounded-full border border-night-line bg-night-2/70 py-1 pr-3 pl-1 text-sm text-night-muted backdrop-blur-sm">
            <FlagIcon iso2={c.iso2} className="h-4 w-[22px] rounded-full" />
            {region}
          </p>
        }
        title={t("pages.countries.title_show", { country: c.name })}
        accent={t("pages.countries.accent_show")}
        lead={c.intro}
        actions={
          <>
            <ButtonLink href="/contact?type=job" size="lg">
              {t("pages.apply")} <ArrowRight />
            </ButtonLink>
            <ButtonAnchor
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Jobs in ${c.name}`)}`}
              target="_blank"
              rel="noopener"
              size="lg"
              variant="quiet"
            >
              <MessageCircle /> {t("pages.whatsapp")}
            </ButtonAnchor>
          </>
        }
        // Flag only — the facts are shown once, in the strip below (UX audit: no repeated facts).
        aside={
          <div className="card-night relative hidden items-center justify-center overflow-hidden px-8 py-14 lg:flex">
            <div aria-hidden className="night-dots absolute inset-0" />
            <span className="relative inline-flex overflow-hidden rounded-lg shadow-[0_24px_48px_-16px_rgba(0,0,0,.7),0_0_0_1px_rgba(255,255,255,.08)]">
              <FlagIcon iso2={c.iso2} eager className="h-[150px] w-[200px] rounded-none shadow-none" />
            </span>
          </div>
        }
      />

      {/* Key facts strip (full set incl. language) + honesty notes */}
      <section className="border-b border-line bg-surface">
        <Container>
          <dl className="grid grid-cols-2 md:grid-cols-5">
            {facts.map(({ Icon, label, value }) => (
              <div key={label} className="flex gap-3 border-line py-5 md:border-l md:pl-5 md:first:border-l-0 md:first:pl-0">
                <span className="icon-tile size-10">
                  <Icon className="size-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="text-base leading-6 font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="border-t border-line py-3 text-sm text-muted">{t("pages.typical")}</p>
        </Container>
      </section>

      {c.notice && (
        <Container className="pt-8">
          <div className="flex gap-3 rounded-(--radius-item) border border-warning/25 bg-warning/[0.06] p-4 text-[15px] leading-[22px]">
            <Info className="mt-0.5 size-5 shrink-0 text-warning" strokeWidth={1.75} />
            <p>
              <strong className="font-semibold">{t("pages.countries.notice")}: </strong>
              <span className="text-muted">{c.notice}</span>
            </p>
          </div>
        </Container>
      )}

      {/* Sectors */}
      <Section tone="bg">
        <Container>
          <SectionHead title={t("pages.countries.sectors_title")} lead={t("pages.countries.sectors_lead", { country: c.name })} />
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {c.sectors.map((s) => (
              <li key={s.slug} className="flex">
                <IndustryCard industry={s} note={s.note} pay={s.pay} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Process + documents */}
      <Section tone="alt">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHead title={t("pages.countries.process_title", { country: c.name })} lead={t("pages.countries.process_lead")} />
            <ol className="relative grid gap-0">
              {c.steps.map((s, i) => (
                <li key={s.title} className="relative grid grid-cols-[40px_1fr] gap-4 pb-6 last:pb-0">
                  {i < c.steps.length - 1 && <span aria-hidden className="absolute top-10 bottom-0 left-[19px] w-px bg-line" />}
                  <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold text-brand tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-h3">{s.title}</h3>
                    <p className="mt-1 text-base leading-6 text-muted">{s.body}</p>
                    {s.time && (
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-sm font-medium text-brand">
                        <Clock className="size-3.5" strokeWidth={2} />
                        <span className="sr-only">{t("pages.countries.time_label")}: </span>
                        {s.time}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHead title={t("pages.countries.docs_title")} lead={t("pages.countries.docs_lead")} />
            <DocumentChecklist items={c.requirements} />
            <p className="mt-3 text-sm text-faint">{t("pages.countries.docs_note")}</p>
          </div>
        </Container>
      </Section>

      {/* Fees & fraud protection — the audit's best trust content, where workers actually decide. */}
      <CostsBlock tone="bg" />

      <LiveOpenings jobs={jobs} />

      {/* Tones keep alternating whether or not there are open jobs. */}
      <Faq title={t("pages.faq_title")} lead={t("pages.faq_lead")} items={c.faqs} tone={jobs.length ? "bg" : "alt"} />

      {related.length > 0 && (
        <Section tone={jobs.length ? "alt" : "bg"}>
          <Container>
            <SectionHead title={t("pages.countries.related", { region })} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug} className="flex">
                  <CountryCard country={r} />
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
