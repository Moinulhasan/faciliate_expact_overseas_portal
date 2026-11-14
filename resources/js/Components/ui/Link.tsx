import { Link as InertiaLink } from "@inertiajs/react";
import type { ComponentProps } from "react";
import { useLocale } from "@/hooks/useLocale";

// Inertia <Link> that keeps the visitor in their language: href="/jobs" becomes "/bn/jobs" on Bangla pages.
export function Link({ href, ...props }: ComponentProps<typeof InertiaLink>) {
  const { path } = useLocale();
  return <InertiaLink href={typeof href === "string" ? path(href) : href} {...props} />;
}
