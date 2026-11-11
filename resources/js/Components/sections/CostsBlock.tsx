import { Check, ShieldAlert, X } from "lucide-react";
import { Card } from "@/Components/ui/Card";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";

export function CostsBlock() {
  const { t, tm } = useLocale();

  return (
    <Section tone="alt">
      <Container>
        <SectionHead title={t("home.costs.title")} accent={t("home.costs.accent")} lead={t("home.costs.lead")} />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-7">
            <span className="icon-tile">
              <Check className="size-5" strokeWidth={2} />
            </span>
            <h3 className="mt-2 text-[20px] leading-7 font-semibold tracking-[-0.01em]">{t("home.costs.pay_title")}</h3>
            <ul className="grid gap-2.5">
              {tm<string[]>("home.costs.pay").map((x) => (
                <li key={x} className="flex gap-2.5 text-[15px] leading-[22px] text-muted">
                  <Check className="mt-[3px] size-4 shrink-0 text-brand" strokeWidth={2.25} />
                  {x}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-7">
            <span className="icon-tile bg-danger/10 text-danger">
              <X className="size-5" strokeWidth={2} />
            </span>
            <h3 className="mt-2 text-[20px] leading-7 font-semibold tracking-[-0.01em]">{t("home.costs.never_title")}</h3>
            <ul className="grid gap-2.5">
              {tm<string[]>("home.costs.never").map((x) => (
                <li key={x} className="flex gap-2.5 text-[15px] leading-[22px] text-muted">
                  <X className="mt-[3px] size-4 shrink-0 text-danger" strokeWidth={2.25} />
                  {x}
                </li>
              ))}
            </ul>
          </Card>
          <div className="night night-glow flex flex-col gap-4 rounded-(--radius-card) border border-night-line p-7 text-night-ink md:col-span-2 md:flex-row md:items-center">
            <span className="icon-tile bg-cta/[0.14] text-cta">
              <ShieldAlert className="size-5" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="text-h3">{t("home.costs.verify_title")}</h3>
              <p className="mt-1 max-w-[80ch] text-[15px] leading-[22px] text-night-muted">{t("home.costs.verify")}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
