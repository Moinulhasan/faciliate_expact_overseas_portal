import { Check } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/cn";

// Interactive tick list (main-site "Find your document list in 10 seconds"). Works as a plain list without JS.
export function DocumentChecklist({ items }: { items: string[] }) {
  const { t } = useLocale();
  const [done, setDone] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const pct = items.length ? (done.size / items.length) * 100 : 0;

  return (
    <div className="card p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[13px] font-semibold tabular-nums" aria-live="polite">
          {t("pages.countries.docs_ready", { done: done.size, total: items.length })}
        </p>
        <p className="text-[13px] text-faint tabular-nums">{Math.round(pct)}%</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden>
        <div
          className="h-full origin-left [transform:scaleX(var(--p))] rounded-full bg-brand transition-transform duration-500 ease-(--ease-out)"
          style={{ "--p": pct / 100 } as CSSProperties}
        />
      </div>
      <ul className="mt-4 grid gap-2">
        {items.map((item, i) => {
          const on = done.has(i);
          return (
            <li key={item}>
              <label
                className={cn(
                  "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[15px] leading-[22px] transition-colors",
                  on ? "border-brand/40 bg-brand/[0.05] text-muted line-through decoration-brand/40" : "border-line hover:border-brand/50",
                )}
              >
                <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggle(i)} />
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand",
                    on ? "border-brand bg-brand text-white" : "border-line bg-surface",
                  )}
                >
                  {on && <Check className="size-3.5" strokeWidth={3} />}
                </span>
                {item}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
