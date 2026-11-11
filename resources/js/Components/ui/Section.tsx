import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  bg: "bg-bg text-ink",
  alt: "bg-surface-2 text-ink",
  night: "night night-glow text-night-ink",
};

export function Section({
  tone = "bg",
  className,
  children,
  ...props
}: ComponentProps<"section"> & { tone?: keyof typeof tones }) {
  return (
    <section className={cn("relative isolate py-12 md:py-14 lg:py-16", tones[tone], className)} {...props}>
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 2xl:px-14", className)}>{children}</div>;
}

// Headline whose second part gets the main-site green gradient ("…abroad. One team.").
export function Heading({
  as: Tag = "h2",
  a,
  b,
  className,
}: {
  as?: "h1" | "h2";
  a: string;
  b?: string;
  className?: string;
}) {
  return (
    <Tag className={cn(Tag === "h1" ? "text-display" : "text-h2", "text-balance", className)}>
      {a}
      {b && (
        <>
          {" "}
          <span className="text-accent">{b}</span>
        </>
      )}
    </Tag>
  );
}

// Main-site .section__head: title + muted lead, max 680px.
export function SectionHead({
  title,
  accent,
  lead,
  aside,
  night,
}: {
  title: string;
  accent?: string;
  lead?: string;
  aside?: ReactNode;
  night?: boolean;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex max-w-[680px] flex-col gap-2.5">
        <Heading a={title} b={accent} />
        {lead && <p className={cn("text-lead", night ? "text-night-muted" : "text-muted")}>{lead}</p>}
      </div>
      {aside}
    </div>
  );
}

export function Pill({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[13px] leading-5 whitespace-nowrap text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
