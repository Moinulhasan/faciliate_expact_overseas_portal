import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";

// Main-site "How it works" / "Why choose us" pattern: numbered steps on hairline top borders.
// Pinned horizontal scene (M3) is layered on in phase 5 for tier "full".
export function Journey() {
  const { t, tm } = useLocale();
  const steps = tm<{ title: string; body: string }[]>("home.journey.steps");

  return (
    <Section tone="alt">
      <Container>
        <SectionHead title={t("home.journey.title")} lead={t("home.journey.lead")} />
        <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative border-t border-line py-6">
              <span aria-hidden className="absolute -top-px left-0 h-px w-10 bg-brand" />
              <span className="text-[13px] font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-h3">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-[22px] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
