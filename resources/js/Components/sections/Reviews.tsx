import { Building2, Quote, Star } from "lucide-react";
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
        <p className={cn("flex items-center gap-1.5 truncate text-[13px] leading-5", night ? "text-night-muted" : "text-muted")}>
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

// DB-driven. Production only shows published rows with recorded consent (Testimonial::scopeVisible).
export function Reviews({ reviews }: { reviews: Testimonial[] }) {
  const { t } = useLocale();
  if (!reviews.length) return null;
  const [lead, ...rest] = reviews;

  return (
    <Section tone="alt">
      <Container>
        <SectionHead title={t("home.reviews.title")} lead={t("home.reviews.lead")} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
