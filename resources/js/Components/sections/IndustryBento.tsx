import { ArrowRight } from "lucide-react";
import { allHavePhotos, IndustryCard } from "@/Components/cards/IndustryCard";
import { ButtonLink } from "@/Components/ui/Button";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { Industry } from "@/types";

// Eight trades, one consistent card layout (UX audit: 2 photo tiles + 6 empty boxes looked unfinished).
// Photo headers switch on automatically once every industry has a real image.
export function IndustryBento({ industries }: { industries: Industry[] }) {
  const { t } = useLocale();
  const media = allHavePhotos(industries);

  return (
    <Section tone="bg">
      <Container>
        <SectionHead
          title={t("home.industries.title")}
          lead={t("home.industries.lead")}
          aside={
            <ButtonLink href="/industries" variant="ghost" size="sm">
              {t("home.industries.see_all")} <ArrowRight />
            </ButtonLink>
          }
        />
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {industries.map((ind) => (
            <li key={ind.slug} className="flex min-w-0">
              <IndustryCard industry={ind} media={media} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
