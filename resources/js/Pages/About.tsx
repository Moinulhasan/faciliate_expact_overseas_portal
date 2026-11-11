import { usePage } from "@inertiajs/react";
import { ArrowUpRight, BadgeCheck, Clock, Eye, Mail, MapPin, MessageCircle, Phone, Scale, ShieldCheck, UserRound } from "lucide-react";
import { breadcrumbLd, Seo } from "@/Components/Seo";
import { FinalCta } from "@/Components/sections/FinalCta";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { ButtonAnchor } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/Card";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import type { SharedProps } from "@/types";

type Item = { title: string; body: string };
const principleIcons = [Scale, Eye, UserRound, ShieldCheck];

export default function About({ countryCount, industryCount }: { countryCount: number; industryCount: number }) {
  const { t, tm } = useLocale();
  const { appUrl, site } = usePage<SharedProps>().props;
  const { contact, licence, stats } = site;
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("home.nav.about"), href: "/about" },
  ];
  const fmt = new Intl.NumberFormat("en");

  // Figures shown only when real (config/site.php); counts from the DB are always true.
  const figures = [
    [String(countryCount), t("hubs.about.stats.countries")],
    [String(industryCount), t("hubs.about.stats.industries")],
    [stats.years_licensed ? String(stats.years_licensed) : null, t("hubs.about.stats.years")],
    [stats.workers_deployed ? `${fmt.format(stats.workers_deployed)}+` : null, t("hubs.about.stats.workers")],
  ].filter((f): f is [string, string] => f[0] !== null);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: site.name,
    url: appUrl,
    telephone: contact.phone_href,
    email: contact.email,
    parentOrganization: { "@type": "Organization", name: "Facilitate Expat", url: site.main_site },
    address: { "@type": "PostalAddress", streetAddress: contact.address, addressLocality: "Dhaka", addressCountry: "BD" },
    ...(licence.rl_number && { identifier: licence.rl_number }),
  };
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${contact.address}, Bangladesh`)}`;

  return (
    <SiteLayout>
      <Seo title={t("hubs.about.meta_title")} description={t("hubs.about.meta_description")} jsonLd={[breadcrumbLd(appUrl, crumbs), orgLd]} />

      <PageHero
        crumbs={crumbs}
        eyebrow={<HeroPill>{t("hubs.about.eyebrow")}</HeroPill>}
        title={t("hubs.about.title")}
        accent={t("hubs.about.accent")}
        lead={t("hubs.about.lead")}
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-card) border border-night-line bg-night-line">
            {figures.map(([v, l]) => (
              <div key={l} className="bg-night-2/90 p-5">
                <dd className="text-[30px] leading-9 font-semibold tracking-[-0.02em] text-white tabular-nums">{v}</dd>
                <dt className="text-[13px] text-night-muted">{l}</dt>
              </div>
            ))}
          </dl>
        }
      />

      {/* Story + principles */}
      <Section tone="bg">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead title={t("hubs.about.story_title")} />
            <div className="-mt-2 grid max-w-[62ch] gap-4 text-lead text-muted">
              {tm<string[]>("hubs.about.story").map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <SectionHead title={t("hubs.about.principles_title")} />
            <ul className="grid gap-3 sm:grid-cols-2">
              {tm<Item[]>("hubs.about.principles").map((p, i) => {
                const Icon = principleIcons[i];
                return (
                  <li key={p.title} className="flex">
                    <Card className="w-full p-5">
                      <span className="icon-tile size-10">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="mt-1 text-h3">{p.title}</h3>
                      <p className="text-[14px] leading-5 text-muted">{p.body}</p>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Licence + office */}
      <Section tone="alt">
        <Container className="grid gap-4 lg:grid-cols-2">
          <Card className="p-6 md:p-7">
            <h2 className="text-[22px] leading-7 font-semibold tracking-[-0.02em]">{t("hubs.about.licence_title")}</h2>
            <p className="text-[15px] text-muted">{t("hubs.about.licence_lead")}</p>
            <dl className="mt-2 grid gap-2">
              {(["rl", "bmet", "baira"] as const).map((k) => {
                const v = { rl: licence.rl_number, bmet: licence.bmet, baira: licence.baira }[k];
                return (
                  <div key={k} className="flex items-center justify-between gap-4 rounded-xl border border-line bg-bg px-4 py-3">
                    <dt className="flex items-center gap-2.5 text-[15px]">
                      <BadgeCheck className="size-[18px] text-brand" strokeWidth={1.75} />
                      {t(`home.trust.${k}`)}
                    </dt>
                    <dd className={v ? "text-[15px] font-semibold tabular-nums" : "text-[13px] text-faint"}>{v ?? t("home.footer.pending")}</dd>
                  </div>
                );
              })}
            </dl>
          </Card>

          <Card className="p-6 md:p-7">
            <h2 className="text-[22px] leading-7 font-semibold tracking-[-0.02em]">{t("hubs.about.office_title")}</h2>
            <p className="text-[15px] text-muted">{t("hubs.about.office_lead")}</p>
            <ul className="mt-2 grid gap-3 text-[15px]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-[18px] shrink-0 text-brand" strokeWidth={1.75} />
                <address className="not-italic">{contact.address}</address>
              </li>
              <li>
                <a href={`tel:${contact.phone_href}`} className="flex gap-3 hover:text-brand">
                  <Phone className="mt-0.5 size-[18px] shrink-0 text-brand" strokeWidth={1.75} />
                  <span className="tabular-nums">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex gap-3 hover:text-brand">
                  <Mail className="mt-0.5 size-[18px] shrink-0 text-brand" strokeWidth={1.75} />
                  {contact.email}
                </a>
              </li>
              {contact.hours && (
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-[18px] shrink-0 text-brand" strokeWidth={1.75} />
                  {contact.hours}
                </li>
              )}
            </ul>
            <div className="mt-auto flex flex-wrap gap-2 pt-3">
              <ButtonAnchor href={maps} target="_blank" rel="noopener" variant="ghost" size="sm">
                <MapPin /> {t("hubs.about.directions")}
              </ButtonAnchor>
              <ButtonAnchor href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener" variant="ghost" size="sm">
                <MessageCircle /> WhatsApp
              </ButtonAnchor>
            </div>
          </Card>

          <div className="night night-glow flex flex-col gap-4 rounded-(--radius-card) border border-night-line p-6 text-night-ink md:flex-row md:items-center md:justify-between lg:col-span-2">
            <div>
              <h2 className="text-h3">{t("hubs.about.group_title")}</h2>
              <p className="mt-1 text-[15px] text-night-muted">{t("hubs.about.group_body")}</p>
            </div>
            <ButtonAnchor href={site.main_site} variant="quiet" className="shrink-0">
              {t("hubs.about.group_cta")} <ArrowUpRight />
            </ButtonAnchor>
          </div>
        </Container>
      </Section>

      <FinalCta tone="alt" />
    </SiteLayout>
  );
}
