import { Banknote } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import type { PayRange } from "@/types";

const n = new Intl.NumberFormat("en");
const range = (a: number, b: number) => (a === b ? n.format(a) : `${n.format(a)}–${n.format(b)}`);

/** "Current jobs pay SAR 1,200–1,800 / month ≈ ৳…" — from real open jobs only. */
export function PayLine({ pay }: { pay: PayRange }) {
  const { t } = useLocale();
  return (
    <p className="flex gap-2 rounded-xl bg-brand/[0.07] px-3 py-2 text-sm leading-5">
      <Banknote className="mt-px size-4 shrink-0 text-brand" strokeWidth={1.75} />
      <span>
        <span className="text-muted">{t("pages.countries.pay")}: </span>
        <strong className="font-semibold tabular-nums">
          {pay.currency} {range(pay.min, pay.max)}
        </strong>{" "}
        <span className="text-muted">{t("pages.countries.per_month")}</span>
        {pay.bdt_min && pay.bdt_max && <span className="text-muted tabular-nums"> ≈ ৳{range(pay.bdt_min, pay.bdt_max)}</span>}
      </span>
    </p>
  );
}
