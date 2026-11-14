import { usePage } from "@inertiajs/react";
import { breadcrumbLd, Seo } from "@/Components/Seo";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { Container, Section } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import type { SharedProps } from "@/types";

type Block = { title: string; body: string };

export default function Privacy() {
  const { t, tm } = useLocale();
  const { appUrl, site } = usePage<SharedProps>().props;
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("privacy.eyebrow"), href: "/privacy" },
  ];
  const fill = (s: string) =>
    s.replaceAll(":months", String(site.privacy.retention_months)).replaceAll(":address", site.contact.address).replaceAll(":email", site.contact.inquiry_email);

  return (
    <SiteLayout>
      <Seo title={t("privacy.meta_title")} description={t("privacy.meta_description")} jsonLd={[breadcrumbLd(appUrl, crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow={<HeroPill>{t("privacy.eyebrow")}</HeroPill>} title={t("privacy.title")} accent={t("privacy.accent")} lead={t("privacy.lead")} />
      <Section tone="bg">
        <Container>
          <p className="mb-6 inline-flex rounded-full border border-dashed border-warning/50 px-3 py-1 text-sm text-warning">{t("privacy.draft")}</p>
          <div className="grid max-w-[68ch] gap-7">
            {tm<Block[]>("privacy.sections").map((b) => (
              <section key={b.title}>
                <h2 className="text-[22px] leading-7 font-semibold tracking-[-0.015em]">{b.title}</h2>
                <p className="mt-2 text-lg leading-7 text-muted">{fill(b.body)}</p>
              </section>
            ))}
          </div>
          <p className="mt-10 text-sm text-faint">{t("privacy.updated", { date: site.privacy.updated })}</p>
        </Container>
      </Section>
    </SiteLayout>
  );
}
