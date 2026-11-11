import { Link } from "@inertiajs/react";
import { ArrowUpRight } from "lucide-react";
import { trackGlow } from "@/Components/ui/Card";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { IndustryVisual } from "@/Components/ui/IndustryVisual";
import { useLocale } from "@/hooks/useLocale";
import { iconFor } from "@/lib/industryIcons";
import type { Industry } from "@/types";

export function IndustryCard({
  industry,
  countries,
  note,
}: {
  industry: Industry;
  countries?: { name: string; iso2: string }[];
  note?: string;
}) {
  const { t } = useLocale();
  const Icon = iconFor(industry.slug);

  return (
    <Link
      href={`/industries/${industry.slug}`}
      onPointerMove={trackGlow}
      className="card group flex h-full w-full flex-col gap-3 p-6"
      aria-label={industry.name}
    >
      <div className="relative -mx-6 -mt-6 mb-1 aspect-[16/9] overflow-hidden rounded-t-[23px]">
        <IndustryVisual
          industry={industry}
          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="size-full"
          imgClassName="transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.04]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/35 to-transparent" />
      </div>
      <div className="flex items-center justify-between">
        <span className="icon-tile">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <span className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      </div>
      <h3 className="mt-1 text-h3">{industry.name}</h3>
      <p className="text-[15px] leading-[22px] text-muted">{note ?? industry.summary}</p>
      <ul className="mt-1 flex flex-wrap gap-1.5">
        {industry.roles.slice(0, 4).map((r) => (
          <li key={r} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[13px] leading-5 text-ink/80">
            {r}
          </li>
        ))}
        {industry.roles.length > 4 && (
          <li className="px-1 py-0.5 text-[13px] leading-5 text-faint">+{industry.roles.length - 4}</li>
        )}
      </ul>
      {countries && countries.length > 0 && (
        <div className="mt-auto flex items-center gap-2 border-t border-line pt-4">
          <span className="text-[13px] text-faint">{t("pages.industries.hiring_in")}</span>
          <span className="flex -space-x-1">
            {countries.slice(0, 6).map((c) => (
              <span key={c.iso2} title={c.name} className="inline-flex rounded-[3px] ring-2 ring-surface">
                <FlagIcon iso2={c.iso2} className="h-3.5 w-5" />
              </span>
            ))}
          </span>
          {countries.length > 6 && <span className="text-[13px] text-faint">+{countries.length - 6}</span>}
        </div>
      )}
    </Link>
  );
}
