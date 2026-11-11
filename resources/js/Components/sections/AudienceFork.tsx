import { ArrowRight, Building2, Check, HardHat } from "lucide-react";
import { ButtonLink } from "@/Components/ui/Button";
import { trackGlow } from "@/Components/ui/Card";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/cn";

const doors = [
  { key: "candidate", href: "/apply", Icon: HardHat, night: true },
  { key: "employer", href: "/employers/request", Icon: Building2, night: false },
] as const;

export function AudienceFork() {
  const { t, tm } = useLocale();

  return (
    <Section tone="bg">
      <Container>
        <SectionHead title={t("home.fork.title")} accent={t("home.fork.accent")} lead={t("home.fork.lead")} />
        <div className="grid gap-4 md:grid-cols-2">
          {doors.map(({ key, href, Icon, night }) => (
            <article
              key={key}
              onPointerMove={night ? undefined : trackGlow}
              className={cn(
                "flex flex-col p-6 md:p-8",
                night ? "night night-glow rounded-(--radius-card) border border-night-line text-night-ink" : "card",
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn("icon-tile", night && "bg-cta/[0.14] text-cta")}>
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[13px] leading-5",
                    night ? "border-night-line text-night-muted" : "border-line text-muted",
                  )}
                >
                  {t(`home.fork.${key}.label`)}
                </span>
              </div>
              <h3 className="mt-6 text-[28px] leading-[34px] font-semibold tracking-[-0.02em]">{t(`home.fork.${key}.title`)}</h3>
              <ul className="mt-5 grid gap-2.5">
                {tm<string[]>(`home.fork.${key}.points`).map((p) => (
                  <li key={p} className={cn("flex gap-2.5 text-[15px] leading-[22px]", night ? "text-night-muted" : "text-muted")}>
                    <Check className={cn("mt-[3px] size-4 shrink-0", night ? "text-cta" : "text-brand")} strokeWidth={2.25} />
                    {p}
                  </li>
                ))}
              </ul>
              <ButtonLink href={href} variant={night ? "cta" : "ghost"} className="mt-6 self-start">
                {t(`home.fork.${key}.cta`)} <ArrowRight />
              </ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
