import { Check, ShieldAlert, X } from "lucide-react";
import { m } from "motion/react";
import { Barcode } from "@/Components/sections/Journey";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/cn";

// "What you pay / what you never pay" as two tickets (owner pick, 14 Nov 2026): an "Admit" ticket and a stamped
// "Void" ticket, same travel-document language as the Journey boarding pass.
export function CostsBlock({ tone = "alt" }: { tone?: "bg" | "alt" }) {
  const { t, tm } = useLocale();
  // Notches are "holes" in the ticket, so they take the section's background colour.
  const hole = tone === "alt" ? "bg-surface-2" : "bg-bg";

  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={t("home.costs.title")} accent={t("home.costs.accent")} lead={t("home.costs.lead")} />
        <div className="grid gap-5 md:grid-cols-2">
          <Ticket
            hole={hole}
            title={t("home.costs.pay_title")}
            items={tm<string[]>("home.costs.pay")}
            ok
            tag={<span className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">{t("home.costs.admit")}</span>}
          />
          <Ticket
            hole={hole}
            title={t("home.costs.never_title")}
            items={tm<string[]>("home.costs.never")}
            tag={
              // Stamps in once on scroll-in; MotionConfig reducedMotion="user" drops the movement for reduced motion.
              <m.span
                aria-hidden
                className="inline-block rounded-lg border-[2.5px] border-urgent px-3 py-0.5 text-base font-bold tracking-[0.16em] text-urgent uppercase"
                initial={{ opacity: 0, scale: 1.6, rotate: -4 }}
                whileInView={{ opacity: 0.9, scale: 1, rotate: -12 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
              >
                {t("home.costs.void")}
              </m.span>
            }
          />

          <div className="night relative flex flex-col gap-4 overflow-hidden rounded-(--radius-card) bg-night p-6 text-night-ink sm:p-7 md:col-span-2 md:flex-row md:items-center md:gap-6">
            <span className="icon-tile bg-cta/[0.14] text-cta">
              <ShieldAlert className="size-5" strokeWidth={1.75} />
            </span>
            <div className="flex-1">
              <h3 className="text-h3">{t("home.costs.verify_title")}</h3>
              <p className="mt-1 max-w-[80ch] text-[15px] leading-[22px] text-night-muted">{t("home.costs.verify")}</p>
            </div>
            <Barcode className="hidden shrink-0 md:block" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Ticket({ title, items, tag, ok, hole }: { title: string; items: string[]; tag: React.ReactNode; ok?: boolean; hole: string }) {
  const Icon = ok ? Check : X;
  return (
    <div className="relative overflow-hidden rounded-(--radius-card) bg-surface p-6 shadow-[0_24px_48px_-30px_rgba(7,26,16,0.4)] sm:p-7">
      <div className="flex min-h-10 items-center justify-between gap-4">
        <h3 className={cn("text-[22px] leading-7 font-semibold tracking-[-0.02em]", ok ? "text-brand" : "text-urgent")}>{title}</h3>
        {tag}
      </div>
      {/* perforation with notches */}
      <div aria-hidden className="relative -mx-6 my-5 border-t-2 border-dashed border-line sm:-mx-7">
        <span className={cn("absolute -top-3 -left-3 size-6 rounded-full", hole)} />
        <span className={cn("absolute -top-3 -right-3 size-6 rounded-full", hole)} />
      </div>
      <ul className="grid gap-3">
        {items.map((x) => (
          <li key={x} className="flex gap-3 text-[15px] leading-[22px] text-muted">
            <span className={cn("mt-px grid size-5 shrink-0 place-items-center rounded-md", ok ? "bg-brand/12 text-brand" : "bg-urgent/12 text-urgent")}>
              <Icon className="size-3.5" strokeWidth={2.5} aria-hidden />
            </span>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}
