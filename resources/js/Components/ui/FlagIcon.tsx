import { cn } from "@/lib/cn";

// 4:3 SVG flags from public/flags (copied from flag-icons, MIT). Plain <img> so size classes always apply
// and the browser only fetches flags actually shown. Decorative: the country name is always next to it.
export function FlagIcon({ iso2, className, eager }: { iso2: string; className?: string; eager?: boolean }) {
  return (
    <img
      src={`/flags/${iso2.toLowerCase()}.svg`}
      alt=""
      width={20}
      height={15}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("inline-block h-[15px] w-5 shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,.08)]", className)}
    />
  );
}
