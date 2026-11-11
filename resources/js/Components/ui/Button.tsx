import { Link } from "@inertiajs/react";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// Mirrors facilitatexpat.com .btn / .btn--cta / --ghost / --soft / --quiet.
export const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 rounded-full border border-transparent font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-500 ease-(--ease-out) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg:last-child]:translate-x-[3px]",
  {
    variants: {
      variant: {
        cta: "bg-[linear-gradient(135deg,var(--color-brand-hi),var(--color-brand-lo))] text-white shadow-(--shadow-cta) hover:-translate-y-px hover:shadow-(--shadow-cta-hover)",
        ghost: "border-line bg-transparent text-ink hover:border-brand",
        soft: "bg-surface-2 text-ink hover:bg-brand hover:text-white",
        quiet: "border-night-line text-night-ink hover:bg-white/[0.08]",
        wa: "bg-[linear-gradient(135deg,var(--color-brand-hi),var(--color-brand-lo))] text-white shadow-(--shadow-cta) hover:-translate-y-px hover:shadow-(--shadow-cta-hover)",
      },
      size: {
        sm: "min-h-10 px-4 text-sm",
        md: "min-h-11 px-[18px] text-[15px]",
        lg: "min-h-[52px] px-6 text-[15px]",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "cta", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ComponentProps<"button"> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ className, variant, size, ...props }: Omit<ComponentProps<typeof Link>, "size"> & Variants) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonAnchor({ className, variant, size, ...props }: ComponentProps<"a"> & Variants) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
