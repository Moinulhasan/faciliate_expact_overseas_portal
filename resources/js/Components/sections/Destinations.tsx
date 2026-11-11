import { Link, usePage } from "@inertiajs/react";
import { Clock, MessageCircle } from "lucide-react";
import { LayoutGroup, m } from "motion/react";
import { useState } from "react";
import { buttonVariants } from "@/Components/ui/Button";
import { trackGlow } from "@/Components/ui/Card";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { Container, Pill, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/cn";
import type { Country, Region, SharedProps } from "@/types";

const tabs: { key: "gcc" | "asia" | "europe"; regions: Region[] }[] = [
  { key: "gcc", regions: ["gcc"] },
  { key: "asia", regions: ["east_asia", "se_asia"] },
  { key: "europe", regions: ["europe"] },
];

// Main-site "Popular destinations": segmented tabs + compact country cards with status pill, Apply + WhatsApp.
export function Destinations({ countries }: { countries: Country[] }) {
  const { t } = useLocale();
  const { site } = usePage<SharedProps>().props;
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("gcc");
  const regions = tabs.find((x) => x.key === active)!.regions;
  const list = countries.filter((c) => regions.includes(c.region));

  const tablist = (
    <LayoutGroup>
      <div role="tablist" aria-label={t("home.destinations.title")} className="inline-flex self-start rounded-full border border-line bg-surface p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={active === tab.key}
            aria-controls="dest-panel"
            onClick={() => setActive(tab.key)}
            className={cn(
              "relative h-9 rounded-full px-4 text-sm font-medium transition-colors",
              active === tab.key ? "text-white" : "text-muted hover:text-ink",
            )}
          >
            {active === tab.key && (
              <m.span layoutId="dest-tab" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 260, damping: 28 }} />
            )}
            <span className="relative">{t(`home.destinations.regions.${tab.key}`)}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );

  return (
    <Section tone="bg" id="destinations">
      <Container>
        <SectionHead title={t("home.destinations.title")} lead={t("home.destinations.lead")} aside={tablist} />

        <ul id="dest-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {list.map((c) => (
            <li key={c.slug} className="flex">
              <div onPointerMove={trackGlow} className="card flex w-full flex-col gap-1 rounded-[20px] p-[18px]">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <FlagIcon iso2={c.iso2} className="h-[18px] w-6" />
                  {regions.length > 1 && (
                    <Pill className="border-0 bg-brand/10 px-2 py-0 text-xs text-brand">{t(`home.destinations.region_label.${c.region}`)}</Pill>
                  )}
                </div>
                <h3 className="text-h3">{c.name}</h3>
                <p className="line-clamp-2 text-[13px] leading-[18px] text-muted">{c.top_trades.slice(0, 2).join(" · ")}</p>
                {c.processing_days_min && c.processing_days_max && (
                  <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-brand">
                    <Clock className="size-3.5" strokeWidth={2} />
                    {t("home.destinations.days", { min: c.processing_days_min, max: c.processing_days_max })}
                  </p>
                )}
                <div className="mt-auto flex gap-2 pt-4">
                  <Link href={`/countries/${c.slug}`} className={cn(buttonVariants({ variant: "soft", size: "sm" }), "min-h-9 flex-1")}>
                    {t("home.destinations.apply")}
                  </Link>
                  <a
                    href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Jobs in ${c.name}`)}`}
                    target="_blank"
                    rel="noopener"
                    aria-label={`WhatsApp about ${c.name}`}
                    className={cn(buttonVariants({ variant: "soft", size: "icon" }), "size-9 min-h-9")}
                  >
                    <MessageCircle />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[13px] text-faint">{t("home.destinations.note")}</p>
      </Container>
    </Section>
  );
}
