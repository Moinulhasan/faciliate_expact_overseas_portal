import { Building2, Pause, Play, Quote, Star } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/Components/ui/Badge";
import { trackGlow } from "@/Components/ui/Card";
import { FlagIcon } from "@/Components/ui/FlagIcon";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/types";

function Stars({ n, night }: { n: number; night?: boolean }) {
  const { t } = useLocale();
  return (
    <div className="flex gap-0.5" role="img" aria-label={t("home.reviews.rating", { n })}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn("size-4", i < n ? (night ? "fill-cta text-cta" : "fill-brand text-brand") : night ? "text-night-line" : "text-line")}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function Person({ r, night }: { r: Testimonial; night?: boolean }) {
  const initials = r.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <figcaption className={cn("flex items-center gap-3 border-t pt-4", night ? "border-night-line" : "border-line")}>
      {r.photo ? (
        <img src={r.photo} alt="" width={40} height={40} loading="lazy" className="size-10 rounded-full object-cover" />
      ) : (
        <span
          aria-hidden
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold",
            night ? "bg-cta/[0.14] text-cta" : "bg-brand/10 text-brand",
          )}
        >
          {initials}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-[15px] leading-5 font-semibold">{r.name}</p>
        <p className={cn("flex items-center gap-1.5 truncate text-sm leading-5", night ? "text-night-muted" : "text-muted")}>
          {r.type === "employer" && r.company ? (
            <>
              <Building2 className="size-3.5 shrink-0" strokeWidth={1.75} />
              {r.role}, {r.company}
            </>
          ) : (
            <>
              {r.role}
              {r.country && (
                <>
                  <span aria-hidden>·</span>
                  <FlagIcon iso2={r.country.iso2} className="h-2.5 w-3.5 shrink-0" />
                  {r.country.name}
                </>
              )}
            </>
          )}
        </p>
      </div>
    </figcaption>
  );
}

const INTERVAL = 5000;

// Accessible auto-slider (WAI-ARIA carousel pattern + WCAG 2.2.2): pause button; pauses on touch/hover/focus and
// while off-screen; no autoplay for reduced motion. Native scroll-snap, so swiping works with or without JS.
function ReviewSlider({ reviews }: { reviews: Testimonial[] }) {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const n = reviews.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false); // user pressed pause
  const [hold, setHold] = useState(false); // finger, mouse or keyboard focus on it
  const [visible, setVisible] = useState(false);

  const step = () => {
    const el = track.current;
    const [a, b] = (el?.children ?? []) as unknown as HTMLElement[];
    return a && b ? b.offsetLeft - a.offsetLeft : (el?.clientWidth ?? 1);
  };
  // Slide k sits at k * step once the track's side padding (= scroll-padding) is accounted for.
  const go = (k: number) => track.current?.scrollTo({ left: ((k + n) % n) * step(), behavior: reduced ? "auto" : "smooth" });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const auto = !reduced && !paused && !hold && visible && n > 1;
  // Restarts on every slide change, so a manual swipe also gets a full 5 s before the next move.
  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => go(i + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [auto, i]);

  if (n < 2) return <div className="md:hidden">{reviews[0] && <ReviewCard r={reviews[0]} night />}</div>;

  return (
    <div
      className="md:hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("home.reviews.title")}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHold(false)}
      onTouchStart={() => setHold(true)}
      onTouchEnd={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
    >
      <div
        ref={track}
        onScroll={() => track.current && setI(Math.round(track.current.scrollLeft / step()))}
        aria-live={auto ? "off" : "polite"}
        className="relative -mx-4 grid snap-x snap-mandatory scroll-px-4 auto-cols-[100%] grid-flow-col gap-3 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, k) => (
          <div key={r.id} role="group" aria-roledescription="slide" aria-label={t("home.reviews.slide", { n: k + 1, total: n })} className="flex snap-start">
            <ReviewCard r={r} night={k === 0} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-1">
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? t("home.reviews.play") : t("home.reviews.pause")}
          className="inline-grid size-11 place-items-center rounded-full text-brand hover:bg-brand/10"
        >
          {paused ? <Play className="size-4 fill-current" strokeWidth={2} /> : <Pause className="size-4 fill-current" strokeWidth={2} />}
        </button>
        {reviews.map((r, k) => (
          <button
            key={r.id}
            type="button"
            onClick={() => go(k)}
            aria-label={t("home.reviews.slide", { n: k + 1, total: n })}
            aria-current={k === i ? "true" : undefined}
            className="group inline-grid h-11 w-7 place-items-center"
          >
            <span className={cn("block h-2 rounded-full transition-all duration-300", k === i ? "w-6 bg-brand" : "w-2 bg-line group-hover:bg-muted")} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ r, night }: { r: Testimonial; night?: boolean }) {
  const { t } = useLocale();
  return (
    <figure
      className={cn(
        "relative flex w-full flex-col gap-4 overflow-hidden rounded-(--radius-card) border p-6",
        night ? "night night-glow border-night-line text-night-ink" : "border-line bg-surface",
      )}
    >
      {night && <Quote aria-hidden className="absolute -top-2 right-4 size-20 text-cta/[0.08]" strokeWidth={1} />}
      <div className="flex items-center justify-between gap-3">
        {r.rating ? <Stars n={r.rating} night={night} /> : <span />}
        {r.is_sample && <Badge status="sample">{t("home.reviews.sample")}</Badge>}
      </div>
      <blockquote className={cn("text-[17px] leading-[26px] text-pretty", !night && "text-ink")}>“{r.quote}”</blockquote>
      <div className="mt-auto">
        <Person r={r} night={night} />
      </div>
    </figure>
  );
}

// DB-driven. Production only shows published rows with recorded consent (Testimonial::scopeVisible).
export function Reviews({ reviews }: { reviews: Testimonial[] }) {
  const { t } = useLocale();
  if (!reviews.length) return null;
  const [lead, ...rest] = reviews;

  return (
    <Section tone="alt">
      <Container>
        <SectionHead title={t("home.reviews.title")} lead={t("home.reviews.lead")} />

        {/* Phones: one review at a time, auto-advancing. Tablet/desktop: the grid below. */}
        <ReviewSlider reviews={reviews} />

        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          <figure className="night night-glow relative flex flex-col gap-6 overflow-hidden rounded-(--radius-card) border border-night-line p-8 text-night-ink md:col-span-2 lg:col-span-1 lg:row-span-2">
            <Quote aria-hidden className="absolute -top-2 right-6 size-28 text-cta/[0.08]" strokeWidth={1} />
            <div className="flex items-center justify-between gap-3">
              {lead.rating && <Stars n={lead.rating} night />}
              {lead.is_sample && <Badge status="sample">{t("home.reviews.sample")}</Badge>}
            </div>
            <blockquote className="text-[22px] leading-[32px] font-medium tracking-[-0.015em] text-pretty">“{lead.quote}”</blockquote>
            <div className="mt-auto">
              <Person r={lead} night />
            </div>
          </figure>

          {rest.map((r) => (
            <figure key={r.id} onPointerMove={trackGlow} className="card flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between gap-3">
                {r.rating ? <Stars n={r.rating} /> : <span />}
                {r.is_sample && <Badge status="sample">{t("home.reviews.sample")}</Badge>}
              </div>
              <blockquote className="text-[15px] leading-6 text-ink text-pretty">“{r.quote}”</blockquote>
              <div className="mt-auto">
                <Person r={r} />
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
