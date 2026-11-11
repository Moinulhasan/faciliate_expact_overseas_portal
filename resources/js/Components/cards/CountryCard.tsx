import { Link } from "@inertiajs/react";
import { ArrowUpRight, CalendarRange, Clock, Coins } from "lucide-react";
import { trackGlow } from "@/Components/ui/Card";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { useLocale } from "@/hooks/useLocale";
import type { CountryCard as CountryCardT } from "@/types";

// Destination card: large flag, visa type, three fact rows, top industries.
export function CountryCard({ country: c, note }: { country: CountryCardT; note?: string | null }) {
  const { t } = useLocale();

  return (
    <Link href={`/countries/${c.slug}`} onPointerMove={trackGlow} className="card group flex h-full w-full flex-col gap-4 p-5" aria-label={c.name}>
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,.08),0_6px_16px_-8px_rgba(10,15,36,.35)]">
          <FlagIcon iso2={c.iso2} className="h-8 w-11 rounded-none shadow-none" />
        </span>
        <span className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      </div>
      <div>
        <h3 className="text-[19px] leading-6 font-semibold tracking-[-0.015em]">{c.name}</h3>
        {c.visa_type && <p className="mt-0.5 text-[13px] leading-[18px] text-muted">{c.visa_type}</p>}
      </div>
      {note && <p className="text-[14px] leading-5 text-muted">{note}</p>}
      <dl className="grid grid-cols-3 gap-2 rounded-xl bg-surface-2/70 p-3 text-[12px] leading-4">
        {c.processing_days_min && c.processing_days_max && (
          <div>
            <dt className="flex items-center gap-1 text-faint">
              <Clock className="size-3" strokeWidth={2} /> {t("pages.countries.facts_short.processing")}
            </dt>
            <dd className="mt-1 font-semibold text-ink tabular-nums">
              {t("pages.countries.days_short", { min: c.processing_days_min, max: c.processing_days_max })}
            </dd>
          </div>
        )}
        {c.contract_months && (
          <div>
            <dt className="flex items-center gap-1 text-faint">
              <CalendarRange className="size-3" strokeWidth={2} /> {t("pages.countries.facts_short.contract")}
            </dt>
            <dd className="mt-1 font-semibold text-ink tabular-nums">{t("pages.countries.months_short", { n: c.contract_months })}</dd>
          </div>
        )}
        {c.currency && (
          <div>
            <dt className="flex items-center gap-1 text-faint">
              <Coins className="size-3" strokeWidth={2} /> {t("pages.countries.facts_short.currency")}
            </dt>
            <dd className="mt-1 font-semibold text-ink">{c.currency}</dd>
          </div>
        )}
      </dl>
      {!note && c.top_trades.length > 0 && (
        <p className="mt-auto text-[13px] leading-[18px] text-muted">{c.top_trades.slice(0, 3).join(" · ")}</p>
      )}
    </Link>
  );
}
