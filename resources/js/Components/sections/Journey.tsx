import { Check, Clock, Plane, Wallet } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import { useTier } from "@/hooks/useTier";
import { cn } from "@/lib/cn";
import { dur, ease } from "@/lib/motion";

// `cost` = who pays / how much for the step. Appears on the pass as soon as it's added to lang/*/home.php.
type Step = { title: string; body: string; time?: string; cost?: string };

const pad = (i: number) => String(i + 1).padStart(2, "0");

// "How it works" as a boarding pass (owner pick, 14 Nov 2026; CLAUDE.md §5.5 M3).
// Desktop: pass pins while scroll flies the plane DAC → RUH and the dark stub shows the current step.
// Phones: steps run down the pass and tick off as they scroll past; no pin.
// Static tier / reduced motion / server render: the completed pass, every step visible.
export function Journey() {
  const { t, tm } = useLocale();
  const steps = tm<Step[]>("home.journey.steps");
  const n = steps.length;
  const tier = useTier();

  const [cur, setCur] = useState(n - 1);
  const [complete, setComplete] = useState(true);
  const pin = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLOListElement>(null);

  // Plane + flown line: direct DOM writes every frame; React only re-renders when the step changes.
  const move = (p: number) => {
    if (plane.current) plane.current.style.left = `${p * 100}%`;
    if (fill.current) fill.current.style.transform = `scaleX(${p})`;
  };

  useEffect(() => {
    if (tier === "static") return;
    let cancelled = false;
    let revert = () => {};
    const done = () => {
      move(1);
      setCur(n - 1);
      setComplete(true);
    };
    // Lazy, like SmoothScroll: GSAP never blocks first paint.
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const fly = (p: number) => {
          move(p);
          setCur(Math.min(n - 1, Math.floor(p * n)));
          setComplete(p > 0.995);
        };
        // Pin heading + pass TOGETHER just under the fixed nav (pinning only the pass let the heading scroll away and
        // left a blank band). Only when the whole block fits; otherwise scrub as it scrolls past.
        const NAV = 96;
        const pinIt = tier === "full" && (pin.current?.offsetHeight ?? Infinity) + NAV + 24 <= innerHeight;
        const st = ScrollTrigger.create({
          trigger: pin.current,
          pin: pinIt,
          start: pinIt ? `top ${NAV}px` : "top 70%",
          end: pinIt ? "+=1000" : "bottom 35%",
          scrub: 0.6,
          onUpdate: (s) => fly(s.progress),
        });
        fly(st.progress);
        return done;
      });

      mm.add("(max-width: 1023px)", () => {
        const go = (i: number) => {
          setCur(i);
          setComplete(false);
          move((i + 1) / n);
        };
        const items = [...(list.current?.children ?? [])] as HTMLElement[];
        items.forEach((li, i) =>
          ScrollTrigger.create({ trigger: li, start: "top 65%", onEnter: () => go(i), onLeaveBack: () => go(Math.max(0, i - 1)) }),
        );
        go(Math.max(0, items.filter((li) => li.getBoundingClientRect().top < innerHeight * 0.65).length - 1));
        return done;
      });

      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, [tier, n]);

  const step = steps[cur];
  const status = complete ? t("home.journey.arrived") : t("home.journey.step_of", { n: cur + 1, total: n });

  return (
    <Section tone="alt">
      <Container>
        <div ref={pin} className="mx-auto max-w-[1180px]">
        <SectionHead title={t("home.journey.title")} lead={t("home.journey.lead")} />

        <div>
          <article className="relative overflow-hidden rounded-(--radius-panel) bg-surface shadow-[0_28px_56px_-32px_rgba(7,26,16,0.45)] lg:grid lg:grid-cols-[1fr_300px]">
            {/* ===== Main part of the pass ===== */}
            <div className="p-5 sm:p-7 lg:p-9">
              <div aria-hidden className="flex items-center justify-between gap-3 text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                <span>{t("home.journey.pass_label")}</span>
                <span className="tabular-nums">{status}</span>
              </div>

              {/* DAC ──✈── RUH (decorative; the list below carries the content) */}
              <div aria-hidden className="mt-5 flex items-center gap-4 sm:gap-6">
                <City code={t("home.journey.from_code")} name={t("home.journey.from")} />
                <div className="relative h-0.5 flex-1 rounded-full bg-[repeating-linear-gradient(90deg,var(--color-line)_0_6px,transparent_6px_12px)]">
                  <span ref={fill} className="absolute inset-0 origin-left rounded-full bg-brand" />
                  <span ref={plane} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: "100%" }}>
                    <span className="grid size-10 place-items-center rounded-full bg-surface shadow-(--shadow-card)">
                      <Plane className="size-5 rotate-45 fill-brand/15 text-brand" strokeWidth={1.75} />
                    </span>
                  </span>
                </div>
                <City code={t("home.journey.to_code")} name={t("home.journey.to")} end />
              </div>

              {/* The 7 steps: dashed tear line above, ✓ once passed. */}
              <ol ref={list} className="mt-7 border-t-2 border-dashed border-line pt-1 lg:mt-8 lg:grid lg:grid-cols-7 lg:gap-3 lg:pt-6">
                {steps.map((s, i) => {
                  const done = complete || i < cur;
                  const now = !complete && i === cur;
                  return (
                    <li
                      key={s.title}
                      className="grid grid-cols-[32px_1fr] gap-x-3 border-b border-dashed border-line py-4 last:border-b-0 lg:block lg:border-0 lg:py-0"
                    >
                      <span
                        className={cn(
                          "inline-flex size-8 items-center justify-center rounded-full text-sm font-semibold tabular-nums transition-colors duration-300",
                          done ? "bg-brand text-white" : now ? "bg-brand/10 text-brand ring-1 ring-brand" : "bg-surface-2 text-muted",
                        )}
                      >
                        {done ? (
                          <Check className="size-4" strokeWidth={2.5} aria-hidden />
                        ) : now ? (
                          <>
                            <Plane className="size-4 rotate-[135deg] lg:hidden" strokeWidth={2} aria-hidden />
                            <span className="hidden lg:inline">{pad(i)}</span>
                          </>
                        ) : (
                          pad(i)
                        )}
                      </span>
                      <div className="lg:mt-3">
                        <h3 className={cn("text-[15px] leading-5 font-semibold transition-colors", !done && !now && "lg:text-muted")}>{s.title}</h3>
                        {/* Body lives in the stub on desktop; kept here for screen readers and phones. */}
                        <p className="mt-1 text-sm leading-5 text-muted lg:sr-only">{s.body}</p>
                        {s.time && (
                          <p className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-brand">
                            <Clock className="size-3.5" strokeWidth={2} aria-hidden />
                            <span className="sr-only">{t("home.journey.time_label")}: </span>
                            {s.time}
                          </p>
                        )}
                        {s.cost && (
                          <p className="mt-1 flex items-center gap-1 text-sm text-ink">
                            <Wallet className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                            {s.cost}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* ===== Tear-off stub: current step (duplicate of the list, so hidden from assistive tech) ===== */}
            <div aria-hidden className="relative border-t-2 border-dashed border-night-line bg-night p-6 text-night-ink sm:p-7 lg:border-t-0 lg:border-l-2 lg:p-8">
              {/* ticket notches where the stub tears off */}
              <span className="absolute -top-3 -left-3 size-6 rounded-full bg-surface-2 lg:-top-3 lg:-left-3" />
              <span className="absolute -top-3 -right-3 size-6 rounded-full bg-surface-2 lg:top-auto lg:-bottom-3 lg:-left-3 lg:right-auto" />
              <div className="flex h-full flex-col gap-5">
                <span className="text-[11px] font-medium tracking-[0.14em] text-night-muted uppercase">{complete ? status : t("home.journey.now")}</span>
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={cur}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: dur.sm, ease: ease.out }}
                  >
                    <div className="text-[56px] leading-none font-light tracking-[-0.04em] text-cta-hi tabular-nums">{pad(cur)}</div>
                    <p className="mt-3 text-xl leading-7 font-semibold">{step?.title}</p>
                    <p className="mt-1.5 hidden text-[15px] leading-[22px] text-night-muted lg:block">{step?.body}</p>
                    {step?.time && (
                      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cta/15 px-2.5 py-1 text-sm font-medium text-cta-hi">
                        <Clock className="size-3.5" strokeWidth={2} />
                        {step.time}
                      </p>
                    )}
                  </m.div>
                </AnimatePresence>
                <Barcode className="mt-auto hidden lg:block" />
              </div>
            </div>
          </article>
          <p className="mt-4 text-sm text-faint">{t("home.journey.note")}</p>
        </div>
        </div>
      </Container>
    </Section>
  );
}

function City({ code, name, end }: { code: string; name: string; end?: boolean }) {
  return (
    <div className={cn("shrink-0", end && "text-right")}>
      <div className="text-[32px] leading-none font-semibold tracking-[-0.02em] text-ink sm:text-[44px]">{code}</div>
      <div className="mt-1 text-sm text-muted">{name}</div>
    </div>
  );
}

// Decorative barcode, pure CSS.
export function Barcode({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "block h-9 w-28 bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_8px,currentColor_8px_11px,transparent_11px_13px)] text-night-ink/70",
        className,
      )}
    />
  );
}
