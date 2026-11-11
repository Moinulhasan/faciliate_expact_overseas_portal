import { usePage } from "@inertiajs/react";
import { CalendarClock, Check, MessageCircle, Phone, ShieldAlert, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Badge } from "@/Components/ui/Badge";
import { ButtonAnchor } from "@/Components/ui/Button";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { useLocale } from "@/hooks/useLocale";
import type { JobDetail, SharedProps } from "@/types";

const n = new Intl.NumberFormat("en");
const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long" });
const BENEFITS = ["accommodation", "food", "transport", "ticket", "medical", "overtime"] as const;

// Native <dialog>: focus trap, Esc and inert background for free. Lenis paused while open (CLAUDE.md §5.3).
export function JobContactDialog({ job: j, open, onClose }: { job: JobDetail; open: boolean; onClose: () => void }) {
  const { t } = useLocale();
  const { site } = usePage<SharedProps>().props;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      window.__lenis?.stop();
    } else if (!open && d.open) d.close();
    return () => window.__lenis?.start();
  }, [open]);

  const wa = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
    t("hubs.jobs.wa_message", { title: j.title, country: j.country.name, ref: j.slug }),
  )}`;
  const included = BENEFITS.filter((b) => j.benefits?.[b] === true);

  return (
    <dialog
      ref={ref}
      onClose={() => {
        window.__lenis?.start();
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()} // click on backdrop
      aria-labelledby={`job-${j.id}-title`}
      className="m-auto w-[min(560px,calc(100vw-24px))] overflow-hidden rounded-(--radius-panel) border border-line bg-surface p-0 text-ink shadow-[0_40px_80px_-24px_rgba(6,18,13,.55)] backdrop:bg-night/70 backdrop:backdrop-blur-sm open:animate-[dialog-in_.35s_var(--ease-out)]"
    >
      <div className="night night-glow relative px-6 pt-6 pb-5 text-night-ink">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full text-night-muted hover:bg-white/[0.08] hover:text-night-ink"
        >
          <X className="size-5" strokeWidth={1.75} />
          <span className="sr-only">{t("hubs.jobs.close")}</span>
        </button>
        <p className="flex items-center gap-2 text-[13px] text-night-muted">
          <FlagIcon iso2={j.country.iso2} className="h-3.5 w-5" />
          {[j.city, j.country.name].filter(Boolean).join(", ")}
          {j.is_sample && <Badge status="sample">{t("hubs.jobs.sample")}</Badge>}
        </p>
        <h2 id={`job-${j.id}-title`} className="mt-2 pr-10 text-[24px] leading-8 font-semibold tracking-[-0.02em]">
          {j.title}
        </h2>
        {j.employer_type && <p className="text-[14px] text-night-muted">{j.employer_type}</p>}
        <p className="mt-4 text-[28px] leading-8 font-semibold tracking-[-0.02em] text-white tabular-nums">
          <span className="mr-1.5 text-sm font-medium tracking-normal text-night-muted">{j.currency}</span>
          {n.format(j.salary_min)}–{n.format(j.salary_max)}
          <span className="ml-1.5 text-sm font-normal tracking-normal text-night-muted">{t("hubs.jobs.per_month")}</span>
        </p>
      </div>

      <div className="grid gap-4 px-6 py-5">
        <ul className="flex flex-wrap gap-1.5 text-[13px]">
          <li className="rounded-full bg-surface-2 px-2.5 py-1">{t("hubs.jobs.contract", { n: j.contract_months })}</li>
          <li className="rounded-full bg-surface-2 px-2.5 py-1">{t(`hubs.jobs.gender.${j.gender}`)}</li>
          {j.positions && <li className="rounded-full bg-surface-2 px-2.5 py-1">{t("hubs.jobs.positions", { n: j.positions })}</li>}
          {j.working_hours && <li className="rounded-full bg-surface-2 px-2.5 py-1">{j.working_hours}</li>}
          {j.deadline && (
            <li className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-brand">
              <CalendarClock className="size-3.5" strokeWidth={2} />
              {t("hubs.jobs.apply_by", { date: longDate.format(new Date(j.deadline)) })}
            </li>
          )}
        </ul>

        {(j.requirements.length > 0 || included.length > 0) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {j.requirements.length > 0 && (
              <div>
                <p className="text-[13px] font-semibold">{t("hubs.jobs.requirements")}</p>
                <ul className="mt-1.5 grid gap-1 text-[14px] leading-5 text-muted">
                  {j.requirements.map((r) => (
                    <li key={r}>• {r}</li>
                  ))}
                </ul>
              </div>
            )}
            {included.length > 0 && (
              <div>
                <p className="text-[13px] font-semibold">{t("hubs.jobs.benefits")}</p>
                <ul className="mt-1.5 grid gap-1 text-[14px] leading-5 text-muted">
                  {included.map((b) => (
                    <li key={b} className="flex items-center gap-1.5">
                      <Check className="size-3.5 text-brand" strokeWidth={2.5} /> {t(`hubs.jobs.benefit.${b}`)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <p className="text-[14px] text-muted">{t("hubs.jobs.dialog_lead")}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <ButtonAnchor href={wa} target="_blank" rel="noopener" size="lg">
            <MessageCircle /> {t("hubs.jobs.whatsapp_cta")}
          </ButtonAnchor>
          <ButtonAnchor href={`tel:${site.contact.phone_href}`} size="lg" variant="ghost">
            <Phone /> {t("hubs.jobs.call_cta", { phone: site.contact.phone })}
          </ButtonAnchor>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl bg-warning/[0.06] px-3.5 py-3 text-[13px] leading-[18px] text-muted">
          <ShieldAlert className="mt-px size-4 shrink-0 text-warning" strokeWidth={1.75} />
          <span>
            {t("hubs.jobs.reference")}: <strong className="font-semibold text-ink">{j.slug}</strong>. {t("hubs.jobs.safety")}
          </span>
        </div>
      </div>
    </dialog>
  );
}
