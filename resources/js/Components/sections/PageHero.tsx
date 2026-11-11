import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container, Heading } from "@/Components/ui/Section";
import { cn } from "@/lib/cn";

export interface Crumb {
  name: string;
  href: string;
}

// Inner-page hero: night + glow + dots, visible breadcrumb (mirrors BreadcrumbList JSON-LD), H1 with accent.
export function PageHero({
  crumbs,
  title,
  accent,
  lead,
  eyebrow,
  actions,
  aside,
  background,
  meta,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  accent?: string;
  lead?: string | null;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  /** Full-bleed layer behind the text (e.g. 3D scene). Text column is capped to the left on desktop. */
  background?: ReactNode;
  /** Extra row under the actions, inside the text column (e.g. role chips). */
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "night night-glow relative isolate overflow-hidden pt-24 pb-12 text-night-ink md:pt-28 md:pb-14",
        background && "lg:flex lg:min-h-[600px] lg:flex-col lg:pb-20",
      )}
    >
      <div aria-hidden className="night-dots pointer-events-none absolute inset-0 -z-10" />
      {background}
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-[13px] text-night-muted">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-60" />}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-night-ink">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-night-ink">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className={cn("mt-8 grid items-end gap-10", aside && "lg:grid-cols-[1.2fr_0.8fr]", background && "lg:mt-16 lg:max-w-[640px]")}>
          <div>
            {eyebrow}
            <Heading as="h1" a={title} b={accent} className="mt-4 max-w-[20ch]" />
            {lead && <p className="mt-5 max-w-[620px] text-lead text-night-muted">{lead}</p>}
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
            {meta && <div className="mt-8">{meta}</div>}
          </div>
          {aside}
        </div>
        {children}
      </Container>
    </section>
  );
}

export function HeroPill({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-night-line bg-night-2/70 px-3 py-1.5 text-[13px] text-night-muted backdrop-blur-sm">
      <span className="size-1.5 rounded-full bg-cta shadow-[0_0_0_3px_rgba(115,191,68,.18)]" />
      {children}
    </p>
  );
}
