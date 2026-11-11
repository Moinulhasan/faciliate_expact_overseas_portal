import { usePage } from "@inertiajs/react";
import { ArrowRight, BadgeCheck, Ban, FileCheck2, HeartHandshake, Receipt, ShieldCheck } from "lucide-react";
import { CountryCard } from "@/Components/cards/CountryCard";
import { DocumentChecklist } from "@/Components/DocumentChecklist";
import { breadcrumbLd, faqLd, Seo } from "@/Components/Seo";
import { CostsBlock } from "@/Components/sections/CostsBlock";
import { Faq } from "@/Components/sections/Faq";
import { FinalCta } from "@/Components/sections/FinalCta";
import { Journey } from "@/Components/sections/Journey";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { ButtonLink } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/Card";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import type { CountryCard as CountryCardT, Faq as FaqItem, SharedProps } from "@/types";

type Item = { title: string; body: string };
const promiseIcons = [ShieldCheck, Receipt, FileCheck2, HeartHandshake];

export default function WorkAbroad({ documents, countries }: { documents: string[]; countries: CountryCardT[] }) {
  const { t, tm } = useLocale();
  const { appUrl } = usePage<SharedProps>().props;
  const faqs = tm<FaqItem[]>("hubs.work_abroad.faq");
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("home.nav.work_abroad"), href: "/work-abroad" },
  ];

  return (
    <SiteLayout>
      <Seo title={t("hubs.work_abroad.meta_title")} description={t("hubs.work_abroad.meta_description")} jsonLd={[breadcrumbLd(appUrl, crumbs), faqLd(faqs)]} />

      <PageHero
        crumbs={crumbs}
        eyebrow={<HeroPill>{t("hubs.work_abroad.eyebrow")}</HeroPill>}
        title={t("hubs.work_abroad.title")}
        accent={t("hubs.work_abroad.accent")}
        lead={t("hubs.work_abroad.lead")}
        actions={
          <>
            <ButtonLink href="/apply" size="lg">
              {t("hubs.work_abroad.cta")} <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/jobs" size="lg" variant="quiet">
              {t("hubs.work_abroad.jobs_cta")}
            </ButtonLink>
          </>
        }
        aside={
          <ul className="card-night grid gap-2 p-3">
            {tm<Item[]>("hubs.work_abroad.promise").map((p, i) => {
              const Icon = promiseIcons[i];
              return (
                <li key={p.title} className="flex gap-3.5 rounded-(--radius-item) bg-night-2 p-3.5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-cta/[0.14] text-cta">
                    <Icon className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold">{p.title}</span>
                    <span className="block text-[13px] leading-5 text-night-muted">{p.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        }
      />

      {/* Eligibility */}
      <Section tone="bg">
        <Container>
          <SectionHead title={t("hubs.work_abroad.eligible_title")} lead={t("hubs.work_abroad.eligible_lead")} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tm<Item[]>("hubs.work_abroad.eligible").map((e) => (
              <li key={e.title} className="flex">
                <Card className="w-full flex-row items-start gap-3.5 p-5">
                  <span className="icon-tile size-10">
                    <BadgeCheck className="size-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-h3">{e.title}</span>
                    <span className="block text-[14px] leading-5 text-muted">{e.body}</span>
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Journey />

      {/* Documents + red flags */}
      <Section tone="bg">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHead title={t("hubs.work_abroad.docs_title")} lead={t("hubs.work_abroad.docs_lead")} />
            <DocumentChecklist items={documents} />
          </div>
          <div>
            <SectionHead title={t("hubs.work_abroad.flags_title")} lead={t("hubs.work_abroad.flags_lead")} />
            <ul className="night night-glow grid gap-px overflow-hidden rounded-(--radius-card) border border-night-line bg-night-line text-night-ink">
              {tm<string[]>("hubs.work_abroad.flags").map((f) => (
                <li key={f} className="flex gap-3 bg-night/95 p-4 text-[15px] leading-[22px]">
                  <Ban className="mt-0.5 size-[18px] shrink-0 text-[#f08a6c]" strokeWidth={1.75} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CostsBlock />

      <Section tone="bg">
        <Container>
          <SectionHead title={t("hubs.work_abroad.countries_title")} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {countries.slice(0, 8).map((c) => (
              <li key={c.slug} className="flex">
                <CountryCard country={c} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Faq title={t("pages.faq_title")} lead={t("pages.faq_lead")} items={faqs} tone="alt" />
      <FinalCta tone="alt" />
    </SiteLayout>
  );
}
