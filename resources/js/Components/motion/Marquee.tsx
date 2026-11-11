import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

// CSS transform loop (CLAUDE.md M6). Content is rendered twice; the copy is inert + aria-hidden so
// keyboard/screen-reader users meet each item once. Pauses on hover/focus; static for reduced motion.
export function Marquee({
  children,
  reverse,
  seconds = 40,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  seconds?: number;
  className?: string;
}) {
  return (
    <div className={cn("marquee group/mq", className)}>
      <div
        className={cn("marquee-track", reverse && "marquee-reverse")}
        style={{ "--mq-dur": `${seconds}s` } as CSSProperties}
      >
        <div className="flex shrink-0 gap-2.5 pr-2.5">{children}</div>
        <div className="flex shrink-0 gap-2.5 pr-2.5" aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  );
}
