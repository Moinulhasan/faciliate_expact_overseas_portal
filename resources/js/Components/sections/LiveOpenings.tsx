import { ArrowRight } from "lucide-react";
import { JobCard } from "@/Components/cards/JobCard";
import { ButtonLink } from "@/Components/ui/Button";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { JobDetail } from "@/types";

export function LiveOpenings({ jobs }: { jobs: JobDetail[] }) {
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
