import { Link, usePage } from "@inertiajs/react";
import { ArrowRight, ArrowUpRight, Briefcase, ChevronRight, FileText, Search, Users } from "lucide-react";
import { Marquee } from "@/Components/motion/Marquee";
import { ButtonLink } from "@/Components/ui/Button";
import { trackGlow } from "@/Components/ui/Card";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { Container, Heading } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { Country, SharedProps } from "@/types";

const pickerIcons = { jobs: Search, apply: FileText, employer: Users, track: Briefcase } as const;

function CountryTag({ c }: { c: Country }) {
  return (
    <Link
      href={`/countries/${c.slug}`}
      className="group/tag inline-flex h-12 shrink-0 items-center gap-3 rounded-full border border-night-line bg-night-2/70 py-1.5 pr-4 pl-1.5 backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 ease-(--ease-out) hover:-translate-y-0.5 hover:border-cta/50 hover:bg-night-2"
    >
      <span className="inline-flex size-9 items-center justify-center overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/10">
        <FlagIcon iso2={c.iso2} className="h-[18px] w-6 rounded-[2px]" />
      </span>
      <span className="text-left leading-tight">
        <span className="block text-sm font-semibold text-night-ink">{c.name}</span>
        {c.top_trades[0] && <span className="block text-xs text-night-muted">{c.top_trades.slice(0, 2).join(" · ")}</span>}
      </span>
      <ArrowUpRight className="size-3.5 text-night-muted transition-[color,transform] duration-300 group-hover/tag:translate-x-0.5 group-hover/tag:-translate-y-0.5 group-hover/tag:text-cta" />
    </Link>
  );
}

// Main-site hero: night bg + glow, pill eyebrow, gradient accent, divided stats, glass "What do you need?" picker.
// Globe (M1) replaces the dot texture in phase 6; text stays the LCP.
export function Hero({ countries, industryCount }: { countries: Country[]; industryCount: number }) {
  const { t, tm } = useLocale();
  const { site } = usePage<SharedProps>().props;
  const rl = site.licence.rl_number;
  const items = tm<{ key: keyof typeof pickerIcons; href: string; title: string; body: string }[]>("home.hero.picker.items");
  const stats = [
    [String(countries.length), t("home.hero.stat_countries")],
    [String(industryCount), t("home.hero.stat_industries")],
    ["2×", t("home.hero.stat_checked")],
  ];

  return (
    <section className="night night-glow relative isolate overflow-hidden pt-24 pb-10 text-night-ink md:pt-28 md:pb-12">
      <div aria-hidden className="night-dots pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-night-line bg-night-2/70 px-3 py-1.5 text-[13px] text-night-muted backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-cta shadow-[0_0_0_3px_rgba(115,191,68,.18)]" />
              {t("home.hero.eyebrow")}
              {rl && <span className="text-night-ink">· {rl}</span>}
            </p>
            <Heading as="h1" a={t("home.hero.title_a")} b={t("home.hero.title_b")} className="mt-6 max-w-[15ch]" />
            <p className="mt-6 max-w-[540px] text-lead text-night-muted">{t("home.hero.lead")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/jobs" size="lg">
                {t("home.hero.cta_candidate")} <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/employers/request" size="lg" variant="quiet">
                {t("home.hero.cta_employer")}
              </ButtonLink>
            </div>
            <dl className="mt-8 flex flex-wrap gap-y-4">
              {stats.map(([value, label]) => (
                <div key={label} className="border-l border-night-line pr-6 pl-3.5 first:border-l-0 first:pl-0">
                  <dd className="text-[26px] leading-8 font-semibold tracking-[-0.02em] text-white tabular-nums">{value}</dd>
                  <dt className="max-w-[16ch] text-[13px] leading-[18px] text-night-muted">{label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="card-night p-4 shadow-(--shadow-card) lg:rounded-(--radius-panel)">
            <p className="px-2 pt-1 pb-3 text-[13px] text-night-muted">{t("home.hero.picker.title")}</p>
            <ul className="grid gap-2">
              {items.map((it) => {
                const Icon = pickerIcons[it.key];
                return (
                  <li key={it.key}>
                    <Link
                      href={it.href}
                      onPointerMove={trackGlow}
                      className="group flex items-center gap-3.5 rounded-(--radius-item) border border-transparent bg-night-2 bg-[radial-gradient(240px_circle_at_var(--gx,50%)_var(--gy,0%),rgba(115,191,68,.10),transparent_60%)] p-3.5 transition-colors duration-300 hover:border-night-line"
                    >
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-cta/[0.14] text-cta">
                        <Icon className="size-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] leading-5 font-semibold">{it.title}</span>
                        <span className="block truncate text-[13px] leading-5 text-night-muted">{it.body}</span>
                      </span>
                      <ChevronRight className="size-4 text-night-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-night-ink" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </Container>

      {/* Country tag slider: full-bleed single row, slow, pauses on hover/focus. */}
      <div className="mt-12 border-t border-night-line pt-6 md:mt-14">
        <Container>
          <h2 className="mb-4 text-[13px] text-night-muted">{t("home.hero.destinations")}</h2>
        </Container>
        <Marquee seconds={120}>
          {countries.map((c) => (
            <CountryTag key={c.slug} c={c} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
