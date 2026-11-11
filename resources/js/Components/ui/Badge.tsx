import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const badge = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs leading-5 font-medium whitespace-nowrap", {
  variants: {
    status: {
      open: "bg-brand/10 text-brand",
      closing: "bg-warning/10 text-warning",
      filled: "bg-faint/15 text-faint",
      neutral: "border border-line text-muted",
      sample: "bg-warning/10 text-warning",
    },
  },
  defaultVariants: { status: "neutral" },
});

export function Badge({ status, className, children }: VariantProps<typeof badge> & { className?: string; children: ReactNode }) {
  return <span className={cn(badge({ status }), className)}>{children}</span>;
}
