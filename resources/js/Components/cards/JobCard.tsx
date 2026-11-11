import { ArrowUpRight, CalendarClock, Users } from "lucide-react";
import { useState } from "react";
import { JobContactDialog } from "@/Components/JobContactDialog";
import { Badge } from "@/Components/ui/Badge";
import { trackGlow } from "@/Components/ui/Card";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { useLocale } from "@/hooks/useLocale";
import type { JobDetail } from "@/types";

const n = new Intl.NumberFormat("en");
const d = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

// No job detail page yet: the card opens a WhatsApp / Call dialog with the job summary.
export function JobCard({ job: j }: { job: JobDetail }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onPointerMove={trackGlow}
        aria-haspopup="dialog"
        className="card group flex h-full w-full cursor-pointer flex-col gap-3 p-5 text-left"
      >
        <span className="flex w-full items-center justify-between gap-2">
          <span className="inline-flex min-w-0 items-center gap-2 text-[13px] text-muted">
            <FlagIcon iso2={j.country.iso2} className="h-3.5 w-5" />
            <span className="truncate">{j.country.name}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            {j.is_sample && <Badge status="sample">{t("hubs.jobs.sample")}</Badge>}
            {j.status === "closing" && <Badge status="closing">{t("hubs.jobs.closing")}</Badge>}
          </span>
        </span>
        <span className="block">
          <span className="block text-[17px] leading-6 font-semibold tracking-[-0.01em] group-hover:text-brand">{j.title}</span>
          {j.industry && <span className="block text-[13px] text-faint">{j.industry.name}</span>}
        </span>
        <span className="block text-[22px] leading-7 font-semibold tracking-[-0.02em] tabular-nums">
          <span className="mr-1 text-[13px] font-medium tracking-normal text-muted">{j.currency}</span>
          {n.format(j.salary_min)}–{n.format(j.salary_max)}
          <span className="ml-1 text-[13px] font-normal tracking-normal text-faint">{t("hubs.jobs.per_month")}</span>
        </span>
        <span className="flex flex-wrap gap-1.5 text-[12px] leading-5">
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5">{t("hubs.jobs.contract", { n: j.contract_months })}</span>
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5">{t(`hubs.jobs.gender.${j.gender}`)}</span>
          {j.positions && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-0.5">
              <Users className="size-3" strokeWidth={2} /> {t("hubs.jobs.positions", { n: j.positions })}
            </span>
          )}
        </span>
        <span className="mt-auto flex w-full items-center justify-between gap-3 border-t border-line pt-3 text-[13px]">
          {j.deadline ? (
            <span className={`inline-flex items-center gap-1.5 ${j.status === "closing" ? "text-warning" : "text-brand"}`}>
              <CalendarClock className="size-4" strokeWidth={1.75} />
              {t("hubs.jobs.apply_by", { date: d.format(new Date(j.deadline)) })}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </span>
        </span>
      </button>
      {open && <JobContactDialog job={j} open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
