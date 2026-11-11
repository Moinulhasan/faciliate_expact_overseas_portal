import { router, usePage } from "@inertiajs/react";
import { ArrowRight, ChevronDown, MessageCircle, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountryCard } from "@/Components/cards/CountryCard";
import { JobCard } from "@/Components/cards/JobCard";
import { breadcrumbLd, Seo } from "@/Components/Seo";
import { FinalCta } from "@/Components/sections/FinalCta";
import { HeroPill, PageHero } from "@/Components/sections/PageHero";
import { ButtonAnchor, ButtonLink } from "@/Components/ui/Button";
import { NoResults, SearchInput } from "@/Components/ui/SearchInput";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { SiteLayout } from "@/Layouts/SiteLayout";
import { cn } from "@/lib/cn";
import type { CountryCard as CountryCardT, JobDetail, SharedProps } from "@/types";

type Filters = { q?: string; country?: string; industry?: string; gender?: string; sort: string };
interface Props {
  jobs: JobDetail[];
  total: number;
  filters: Filters;
  countries: { slug: string; name: string; iso2: string; count: number }[];
  industries: { slug: string; name: string; count: number }[];
  destinations: CountryCardT[];
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="relative block min-w-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-10 w-full cursor-pointer appearance-none rounded-full border bg-surface pr-9 pl-4 text-sm transition-colors outline-none hover:border-brand/50 focus:border-brand focus:shadow-[0_0_0_4px_rgba(28,121,73,.12)]",
          value ? "border-brand/50 font-medium text-ink" : "border-line text-muted",
        )}
      >
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-faint" />
    </label>
  );
}

export default function JobsIndex({ jobs, total, filters, countries, industries, destinations }: Props) {
  const { t } = useLocale();
  const { appUrl, site } = usePage<SharedProps>().props;
  const [q, setQ] = useState(filters.q ?? "");
  const first = useRef(true);

  // Server-side filtering via Inertia partial reloads; URL stays shareable (?country=qatar&q=welder).
  const visit = (next: Partial<Filters>) => {
    const params = Object.fromEntries(Object.entries({ ...filters, q, ...next }).filter(([k, v]) => v && !(k === "sort" && v === "newest")));
    router.get("/jobs", params, { only: ["jobs", "filters"], preserveState: true, preserveScroll: true, replace: true });
  };

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = setTimeout(() => visit({ q }), 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const active = Boolean(filters.q || filters.country || filters.industry || filters.gender);
  const crumbs = [
    { name: t("pages.crumbs.home"), href: "/" },
    { name: t("hubs.jobs.eyebrow"), href: "/jobs" },
  ];

  return (
    <SiteLayout>
      <Seo
        title={t("hubs.jobs.meta_title")}
        description={t("hubs.jobs.meta_description")}
        jsonLd={[breadcrumbLd(appUrl, crumbs)]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={<HeroPill>{t("hubs.jobs.eyebrow")}</HeroPill>}
        title={t("hubs.jobs.title")}
        accent={t("hubs.jobs.accent")}
        lead={t("hubs.jobs.lead")}
      />

      <Section tone="bg" className="pt-8 md:pt-10 lg:pt-10">
        <Container>
          {total === 0 ? (
            <>
              <div className="card flex flex-col items-start gap-3 p-7 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-[22px] leading-7 font-semibold tracking-[-0.02em]">{t("hubs.jobs.empty_title")}</h2>
                  <p className="mt-1 max-w-[60ch] text-[15px] text-muted">{t("hubs.jobs.empty_body")}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <ButtonLink href="/apply">
                    {t("pages.apply")} <ArrowRight />
                  </ButtonLink>
                  <ButtonAnchor href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener" variant="ghost">
                    <MessageCircle /> WhatsApp
                  </ButtonAnchor>
                </div>
              </div>
              <SectionHead title={t("hubs.jobs.empty_where")} />
              <ul className="-mt-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {destinations.map((c) => (
                  <li key={c.slug} className="flex">
                    <CountryCard country={c} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              {/* Filter bar */}
              <div className="sticky top-[72px] z-20 -mx-2 mb-5 rounded-[22px] border border-line bg-surface/90 p-2 shadow-[0_8px_24px_-16px_rgba(10,15,36,.25)] backdrop-blur-md">
                <div className="grid gap-2 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
                  <SearchInput
                    value={q}
                    onChange={setQ}
                    label={t("hubs.jobs.search_label")}
                    placeholder={t("hubs.jobs.search_placeholder")}
                    resultsText={t("hubs.jobs.results", { n: jobs.length, total })}
                  />
                  <Select label={t("hubs.jobs.all_countries")} value={filters.country ?? ""} onChange={(v) => visit({ country: v })}>
                    <option value="">{t("hubs.jobs.all_countries")}</option>
                    {countries.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name} ({c.count})
                      </option>
                    ))}
                  </Select>
                  <Select label={t("hubs.jobs.all_industries")} value={filters.industry ?? ""} onChange={(v) => visit({ industry: v })}>
                    <option value="">{t("hubs.jobs.all_industries")}</option>
                    {industries.map((i) => (
                      <option key={i.slug} value={i.slug}>
                        {i.name} ({i.count})
                      </option>
                    ))}
                  </Select>
                  <Select label={t("hubs.jobs.any_gender")} value={filters.gender ?? ""} onChange={(v) => visit({ gender: v })}>
                    <option value="">{t("hubs.jobs.any_gender")}</option>
                    <option value="male">{t("hubs.jobs.gender.male")}</option>
                    <option value="female">{t("hubs.jobs.gender.female")}</option>
                  </Select>
                  <Select label="Sort" value={filters.sort === "newest" ? "" : filters.sort} onChange={(v) => visit({ sort: v || "newest" })}>
                    <option value="">{t("hubs.jobs.sort.newest")}</option>
                    <option value="deadline">{t("hubs.jobs.sort.deadline")}</option>
                    <option value="salary">{t("hubs.jobs.sort.salary")}</option>
                  </Select>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between gap-3 text-[13px] text-muted">
                <span aria-live="polite">{t("hubs.jobs.results", { n: jobs.length, total })}</span>
                {active && (
                  <button
                    type="button"
                    onClick={() => {
                      setQ("");
                      router.get("/jobs", {}, { only: ["jobs", "filters"], preserveScroll: true, replace: true });
                    }}
                    className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                  >
                    <RotateCcw className="size-3.5" /> {t("hubs.jobs.reset")}
                  </button>
                )}
              </div>

              {jobs.length ? (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {jobs.map((j) => (
                    <li key={j.id} className="flex">
                      <JobCard job={j} />
                    </li>
                  ))}
                </ul>
              ) : (
                <NoResults
                  title={t("hubs.jobs.none_title")}
                  body={t("hubs.jobs.none_body")}
                  clearLabel={t("hubs.jobs.reset")}
                  onClear={() => {
                    setQ("");
                    router.get("/jobs", {}, { only: ["jobs", "filters"], preserveScroll: true, replace: true });
                  }}
                />
              )}
            </>
          )}
        </Container>
      </Section>

      <FinalCta />
    </SiteLayout>
  );
}
