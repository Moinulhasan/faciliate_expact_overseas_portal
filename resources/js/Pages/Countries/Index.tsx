import { usePage } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { CountryCard } from "@/Components/cards/CountryCard";
import { breadcrumbLd, itemListLd, Seo } from "@/Components/Seo";
import { FinalCta } from "@/Components/sections/FinalCta";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { ButtonLink } from "@/Components/ui/Button";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { NoResults, SearchInput } from "@/Components/ui/SearchInput";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { matches } from "@/lib/search";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import type { CountryCard as CountryCardT, Region, SharedProps } from "@/types";

const regions: Region[] = ["gcc", "east_asia", "se_asia", "europe"];

export default function CountriesIndex({ countries }: { countries: (CountryCardT & { keywords: string })[] }) {
  const { t } = useLocale();
  const { appUrl } = usePage<SharedProps>().props;
  const [q, setQ] = useSearchQuery();
  const shown = countries.filter((c) =>
    matches(q, [c.name, c.visa_type, c.currency, t(`pages.countries.regions.${c.region}`), ...c.top_trades, c.keywords]),
  );
  const visibleRegions = regions.filter((r) => shown.some((c) => c.region === r));
  const search = (
    <SearchInput
      value={q}
      onChange={setQ}
      label={t("pages.search.countries_label")}
      placeholder={t("pages.search.countries_placeholder")}
      count={`${shown.length}/${countries.length}`}
      resultsText={q.trim() ? t("pages.search.results", { n: shown.length, total: countries.length }) : t("pages.search.all", { total: countries.length })}
      className="md:w-[400px] md:shrink-0"
    />
  );
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("pages.crumbs.countries"), href: "/countries" },
  ];

  return (
    <SiteLayout>
      <Seo
        title={t("pages.countries.meta_title")}
        description={t("pages.countries.meta_description")}
        jsonLd={[breadcrumbLd(appUrl, crumbs), itemListLd(appUrl, countries.map((c) => ({ name: c.name, href: `/countries/${c.slug}` })))]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={<HeroPill>{t("pages.countries.eyebrow")}</HeroPill>}
        title={t("pages.countries.title")}
        accent={t("pages.countries.accent")}
        lead={t("pages.countries.lead", { n: countries.length })}
        actions={
          <ButtonLink href="/apply" size="lg">
            {t("pages.apply")} <ArrowRight />
          </ButtonLink>
        }
        aside={
          <nav aria-label={t("pages.crumbs.countries")} className="card-night grid gap-2 p-3">
            {regions.map((r) => {
              const list = shown.filter((c) => c.region === r);
              if (!list.length) return null;
              return (
                <a
                  key={r}
                  href={`#${r}`}
                  className="group flex items-center justify-between gap-4 rounded-(--radius-item) bg-night-2 p-3.5 transition-colors hover:bg-white/[0.06]"
                >
                  <span>
                    <span className="block text-[15px] font-semibold">{t(`pages.countries.regions.${r}`)}</span>
                    <span className="text-[13px] text-night-muted">{t("pages.countries.n_countries", { n: list.length })}</span>
                  </span>
                  <span className="flex -space-x-1.5">
                    {list.slice(0, 5).map((c) => (
                      <span key={c.iso2} className="inline-flex rounded-[3px] ring-2 ring-night-2">
                        <FlagIcon iso2={c.iso2} className="h-4 w-[22px]" />
                      </span>
                    ))}
                  </span>
                </a>
              );
            })}
          </nav>
        }
      />

      {/* Keyed by position (not region) so the search box in block 0 stays mounted — and focused —
          while typing changes which region comes first. */}
      {(visibleRegions.length ? visibleRegions : [null]).map((r, i) => {
        const list = r ? shown.filter((c) => c.region === r) : [];
        return (
          <Section key={i} id={r ?? undefined} tone={i % 2 ? "alt" : "bg"} className="scroll-mt-20">
            <Container>
              <SectionHead
                title={r ? t(`pages.countries.regions.${r}`) : t("pages.search.none_title", { q: q.trim() })}
                lead={r ? t(`pages.countries.region_lead.${r}`) : undefined}
                aside={i === 0 ? search : undefined}
              />
              {r ? (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {list.map((c) => (
                    <li key={c.slug} className="flex">
                      <CountryCard country={c} />
                    </li>
                  ))}
                </ul>
              ) : (
                <NoResults
                  title={t("pages.search.clear")}
                  body={t("pages.search.countries_none")}
                  clearLabel={t("pages.search.clear")}
                  onClear={() => setQ("")}
                />
              )}
            </Container>
          </Section>
        );
      })}

      <Container>
        <p className="py-6 text-[13px] text-faint">{t("pages.typical")}</p>
      </Container>

      <FinalCta />
    </SiteLayout>
  );
}
