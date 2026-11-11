import { usePage } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { useState } from "react";
import { IndustryCard } from "@/Components/cards/IndustryCard";
import { breadcrumbLd, itemListLd, Seo } from "@/Components/Seo";
import { FinalCta } from "@/Components/sections/FinalCta";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { ButtonLink } from "@/Components/ui/Button";
import { NoResults, SearchInput } from "@/Components/ui/SearchInput";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { matches } from "@/lib/search";
import { Container, Section } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import { cn } from "@/lib/cn";
import { dur, ease } from "@/lib/motion";
import type { Industry, SharedProps } from "@/types";

type Row = Industry & { countries: { name: string; iso2: string }[] };
const groups = ["construction", "industrial", "services", "operations"] as const;

export default function IndustriesIndex({ industries }: { industries: Row[] }) {
  const { t } = useLocale();
  const { appUrl } = usePage<SharedProps>().props;
  const [group, setGroup] = useState<(typeof groups)[number] | "all">("all");
  const [q, setQ] = useSearchQuery();
  const searched = industries.filter((i) =>
    matches(q, [i.name, i.summary, ...i.roles, ...i.countries.map((c) => c.name), i.group ? t(`pages.industries.groups.${i.group}`) : null]),
  );
  const shown = group === "all" ? searched : searched.filter((i) => i.group === group);
  const countIn = (g: (typeof groups)[number] | "all") => (g === "all" ? searched.length : searched.filter((i) => i.group === g).length);
  const countryCount = new Set(industries.flatMap((i) => i.countries.map((c) => c.iso2))).size;
  const roleCount = industries.reduce((n, i) => n + i.roles.length, 0);

  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("pages.crumbs.industries"), href: "/industries" },
  ];

  return (
    <SiteLayout>
      <Seo
        title={t("pages.industries.meta_title")}
        description={t("pages.industries.meta_description")}
        jsonLd={[breadcrumbLd(appUrl, crumbs), itemListLd(appUrl, industries.map((i) => ({ name: i.name, href: `/industries/${i.slug}` })))]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={<HeroPill>{t("pages.industries.eyebrow")}</HeroPill>}
        title={t("pages.industries.title")}
        accent={t("pages.industries.accent")}
        lead={t("pages.industries.lead", { n: industries.length })}
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
        aside={
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-(--radius-card) border border-night-line bg-night-line">
            {[
              [industries.length, t("pages.crumbs.industries")],
              [roleCount, t("pages.industries.roles_label")],
              [countryCount, t("pages.crumbs.countries")],
            ].map(([v, l]) => (
              <div key={String(l)} className="bg-night-2/90 p-5">
                <dd className="text-[30px] leading-9 font-semibold tracking-[-0.02em] text-white tabular-nums">{v}</dd>
                <dt className="text-[13px] text-night-muted">{l}</dt>
              </div>
            ))}
          </dl>
        }
      />

      <Section tone="bg">
        <Container>
          <LayoutGroup>
            <div className="mb-6 flex flex-col-reverse gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div role="tablist" aria-label={t("pages.crumbs.industries")} className="flex flex-wrap gap-2">
              {(["all", ...groups] as const).map((g) => (
                <button
                  key={g}
                  role="tab"
                  aria-selected={group === g}
                  onClick={() => setGroup(g)}
                  className={cn(
                    "relative h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                    group === g ? "border-brand text-white" : "border-line bg-surface text-muted hover:border-brand hover:text-ink",
                  )}
                >
                  {group === g && (
                    <m.span layoutId="ind-tab" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 260, damping: 28 }} />
                  )}
                  <span className="relative">
                    {g === "all" ? t("pages.industries.all") : t(`pages.industries.groups.${g}`)}
                    <span className={cn("ml-1.5 tabular-nums", group === g ? "text-white/70" : "text-faint")}>
                      {countIn(g)}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <SearchInput
              value={q}
              onChange={setQ}
              label={t("pages.search.industries_label")}
              placeholder={t("pages.search.industries_placeholder")}
              count={`${shown.length}/${industries.length}`}
              resultsText={
                q.trim()
                  ? t("pages.search.results", { n: shown.length, total: industries.length })
                  : t("pages.search.all", { total: industries.length })
              }
              className="lg:w-[400px] lg:shrink-0"
            />
            </div>

            <m.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((ind) => (
                  <m.li
                    key={ind.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: dur.md, ease: ease.out }}
                    className="flex"
                  >
                    <IndustryCard industry={ind} countries={ind.countries} />
                  </m.li>
                ))}
              </AnimatePresence>
            </m.ul>
            {shown.length === 0 && (
              <NoResults
                title={q.trim() ? t("pages.search.none_title", { q: q.trim() }) : t("pages.search.clear")}
                body={t("pages.search.industries_none")}
                clearLabel={t("pages.search.clear")}
                onClear={() => {
                  setQ("");
                  setGroup("all");
                }}
              />
            )}
          </LayoutGroup>
        </Container>
      </Section>

      <FinalCta />
    </SiteLayout>
  );
}
