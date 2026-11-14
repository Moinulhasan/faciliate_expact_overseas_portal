import { ArrowRight } from "lucide-react";
import { JobCard } from "@/Components/cards/JobCard";
import { ButtonLink } from "@/Components/ui/Button";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { Link } from "@/Components/ui/Link";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { JobDetail } from "@/types";

export type JobCountry = { slug: string; name: string; iso2: string; count: number };

// `filters` = quick country chips → the full board pre-filtered (UX audit: the home list had no way to filter).
export function LiveOpenings({ jobs, filters = [] }: { jobs: JobDetail[]; filters?: JobCountry[] }) {
  const { t } = useLocale();
  if (!jobs.length) return null; // never show placeholder jobs

  return (
    <Section tone="alt">
      <Container>
        <SectionHead
          title={t("home.jobs.title")}
          lead={t("home.jobs.lead")}
          aside={
            <ButtonLink href="/jobs" variant="ghost" size="sm">
              {t("home.jobs.see_all")} <ArrowRight />
            </ButtonLink>
          }
        />
        {filters.length > 1 && (
          <nav aria-label={t("home.jobs.filter_label")} className="-mt-2 mb-5">
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {filters.map((c) => (
                <li key={c.slug} className="shrink-0">
                  <Link
                    href={`/jobs?country=${c.slug}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    <FlagIcon iso2={c.iso2} className="h-3.5 w-5" />
                    {c.name}
                    <span className="rounded-full bg-surface-2 px-1.5 text-[13px] text-muted tabular-nums">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <li key={j.id} className="flex">
              <JobCard job={j} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
