import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// One meaning per colour (UX audit): red-orange = urgent only, teal = verified, grey dashed = sample/placeholder.
const badge = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm leading-5 font-medium whitespace-nowrap", {
  variants: {
    status: {
      open: "bg-brand/10 text-brand",
      closing: "bg-urgent text-white",
      verified: "bg-verified/10 text-verified",
      filled: "bg-faint/15 text-faint",
      neutral: "border border-line text-muted",
      sample: "border border-dashed border-faint/60 text-faint",
    },
  },
  defaultVariants: { status: "neutral" },
});

export function Badge({ status, className, children }: VariantProps<typeof badge> & { className?: string; children: ReactNode }) {
  return <span className={cn(badge({ status }), className)}>{children}</span>;
}
