import { Link } from "@inertiajs/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IndustryCard } from "@/Components/cards/IndustryCard";
import { ButtonLink } from "@/Components/ui/Button";
import { IndustryVisual } from "@/Components/ui/IndustryVisual";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { Industry } from "@/types";

// Two large photo tiles, then the shared industry cards (each with its own image header).
export function IndustryBento({ industries }: { industries: Industry[] }) {
  const { t } = useLocale();
  const featured = industries.slice(0, 2);
  const rest = industries.slice(2);

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

        <ul className="grid gap-4 md:grid-cols-2">
          {featured.map((ind) => (
            <li key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group night relative isolate flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-(--radius-card) p-7 text-night-ink"
              >
                <IndustryVisual
                  industry={ind}
                  sizes="(min-width: 768px) 48vw, 92vw"
                  className="absolute inset-0 -z-10 size-full"
                  imgClassName="transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/55 to-night/5" />
                <span className="absolute top-5 right-5 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-night/40 backdrop-blur-md transition-colors group-hover:bg-cta group-hover:text-night">
                  <ArrowUpRight className="size-4" strokeWidth={2} />
                </span>
                <h3 className="text-[26px] leading-8 font-semibold tracking-[-0.02em]">{ind.name}</h3>
                <p className="mt-2 max-w-[48ch] text-[15px] leading-[22px] text-night-muted">{ind.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {ind.roles.slice(0, 4).map((r) => (
                    <li key={r} className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[13px] leading-5 backdrop-blur-sm">
                      {r}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((ind) => (
            <li key={ind.slug} className="flex">
              <IndustryCard industry={ind} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
