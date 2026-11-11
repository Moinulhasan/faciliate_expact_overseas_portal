import { usePage } from "@inertiajs/react";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { SharedProps } from "@/types";

// Only figures the owner has supplied in config/site.php — renders nothing until then (CLAUDE.md §6.3).
export function TrustBar() {
  const { t } = useLocale();
  const { site } = usePage<SharedProps>().props;
  const fmt = new Intl.NumberFormat("en");

  const items: [string, string | null][] = [
    ["rl", site.licence.rl_number],
    ["bmet", site.licence.bmet],
    ["baira", site.licence.baira],
    ["years_licensed", site.stats.years_licensed?.toString() ?? null],
    ["workers_deployed", site.stats.workers_deployed ? `${fmt.format(site.stats.workers_deployed)}+` : null],
    ["employer_partners", site.stats.employer_partners?.toString() ?? null],
    ["avg_days_to_deploy", site.stats.avg_days_to_deploy?.toString() ?? null],
  ];
  const shown = items.filter((i): i is [string, string] => i[1] !== null);
  if (!shown.length) return null;

  return (
    <section aria-label="Licence and figures" className="border-b border-line bg-surface">
      <Container>
        <dl className="grid grid-cols-2 gap-px md:flex">
          {shown.map(([key, value]) => (
            <div key={key} className="flex items-center gap-3 py-5 md:flex-1">
              <BadgeCheck className="size-5 text-brand" strokeWidth={1.75} />
              <div>
                <dd className="text-[17px] leading-6 font-semibold tabular-nums">{value}</dd>
                <dt className="text-[13px] leading-[18px] text-muted">{t(`home.trust.${key}`)}</dt>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
