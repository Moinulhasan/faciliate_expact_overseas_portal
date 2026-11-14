import { usePage } from "@inertiajs/react";
import { ArrowRight, ArrowUpRight, BadgeCheck, FileCheck2, HeartHandshake, MapPin, Receipt, ShieldCheck } from "lucide-react";
import { Marquee } from "@/Components/motion/Marquee";
import { ButtonLink } from "@/Components/ui/Button";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { Link } from "@/Components/ui/Link";
import { Container, Heading } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { Country, SharedProps } from "@/types";

const promiseIcons = [ShieldCheck, Receipt, FileCheck2, HeartHandshake];

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
        {c.top_trades[0] && <span className="block text-sm text-night-muted">{c.top_trades[0]}</span>}
      </span>
      <ArrowUpRight className="size-3.5 text-night-muted transition-[color,transform] duration-300 group-hover/tag:translate-x-0.5 group-hover/tag:-translate-y-0.5 group-hover/tag:text-cta" />
    </Link>
  );
}

// One audience choice (UX audit): a single primary action for workers, a quiet link for employers.
// The right column is information, not more choices: what we promise + licence/office proof.
export function Hero({ countries, industryCount }: { countries: Country[]; industryCount: number }) {
  const { t, tm } = useLocale();
  const { site } = usePage<SharedProps>().props;
  const { licence, contact } = site;
  const promises = tm<{ title: string; body: string }[]>("hubs.work_abroad.promise");
  const stats = [
    [String(countries.length), t("home.hero.stat_countries")],
    [String(industryCount), t("home.hero.stat_industries")],
    ...(site.stats.workers_deployed ? [[`${new Intl.NumberFormat("en").format(site.stats.workers_deployed)}+`, t("home.trust.workers_deployed")]] : []),
    ...(site.stats.years_licensed ? [[String(site.stats.years_licensed), t("home.trust.years_licensed")]] : []),
  ];

  return (
    <section className="night night-glow relative isolate overflow-hidden pt-24 pb-8 text-night-ink md:pt-28 md:pb-10">
      <div aria-hidden className="night-dots pointer-events-none absolute inset-0 -z-10" />
      <Container>
        {/* grid-cols-1 (minmax(0,1fr)) stops long content from widening the column past the phone screen */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="min-w-0">
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-night-line bg-night-2/70 px-3 py-1.5 text-sm text-night-muted backdrop-blur-sm">
              <span className="size-1.5 shrink-0 rounded-full bg-cta shadow-[0_0_0_3px_rgba(115,191,68,.18)]" />
              <span className="truncate">
                {t("home.hero.eyebrow")}
                {licence.rl_number && <span className="text-night-ink"> · {licence.rl_number}</span>}
              </span>
            </p>
            <Heading as="h1" a={t("home.hero.title_a")} b={t("home.hero.title_b")} className="mt-5 max-w-[15ch]" />
            <p className="mt-5 max-w-[540px] text-lead text-night-muted">{t("home.hero.lead", { n: countries.length })}</p>
            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/jobs" size="lg" className="w-full sm:w-auto">
                {t("home.hero.cta_candidate")} <ArrowRight />
              </ButtonLink>
              <Link href="/employers" className="inline-flex items-center gap-1.5 text-base font-semibold text-night-ink underline-offset-4 hover:underline">
                {t("home.hero.cta_employer")} <ArrowRight className="size-4" />
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-wrap">
              {stats.map(([value, label]) => (
                <div key={label} className="sm:border-l sm:border-night-line sm:pr-6 sm:pl-4 sm:first:border-l-0 sm:first:pl-0">
                  <dd className="text-[28px] leading-8 font-semibold tracking-[-0.02em] text-white tabular-nums">{value}</dd>
                  <dt className="max-w-[16ch] text-sm leading-5 text-night-muted">{label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="card-night min-w-0 p-4 shadow-(--shadow-card) lg:rounded-(--radius-panel)">
            <p className="px-2 pt-1 pb-3 text-sm font-semibold text-night-ink">{t("home.hero.trust_title")}</p>
            <ul className="grid gap-2">
              {promises.map((p, i) => {
                const Icon = promiseIcons[i] ?? ShieldCheck;
                return (
                  <li key={p.title} className="flex gap-3.5 rounded-(--radius-item) bg-night-2 p-3.5">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-cta/[0.14] text-cta">
                      <Icon className="size-[18px]" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base leading-6 font-semibold">{p.title}</span>
                      <span className="block text-sm leading-5 text-night-muted">{p.body}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 flex flex-col gap-1.5 border-t border-night-line px-2 pt-3 text-sm text-night-muted">
              {licence.rl_number && (
                <p className="flex items-center gap-2">
                  <BadgeCheck className="size-4 shrink-0 text-cta" strokeWidth={1.75} />
                  {t("home.trust.rl")}: <span className="font-semibold text-night-ink">{licence.rl_number}</span>
                </p>
              )}
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cta" strokeWidth={1.75} />
                {contact.address}
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Country tag slider: the one place countries appear on Home (the duplicate "Where our workers go" grid is gone). */}
      <div className="mt-10 border-t border-night-line pt-5 md:mt-12">
        <Container className="flex items-center justify-between gap-4">
          <h2 className="mb-3 text-sm text-night-muted">{t("home.hero.destinations")}</h2>
          <Link href="/countries" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-night-ink hover:underline">
            {t("home.hero.all_countries")} <ArrowRight className="size-4" />
          </Link>
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
