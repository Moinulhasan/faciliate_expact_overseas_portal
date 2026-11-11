import { cn } from "@/lib/cn";
import { iconFor } from "@/lib/industryIcons";
import type { Industry, ResponsiveImg } from "@/types";
import { Picture } from "./Picture";

// Photo when the pipeline has one (resources/images/industries/<slug>[-detail].jpg), otherwise a branded
// night panel with the industry icon — so every slot looks intentional before the real images land.
export function IndustryVisual({
  industry,
  img = industry.image,
  sizes,
  priority,
  className,
  imgClassName,
}: {
  industry: Pick<Industry, "slug" | "name" | "image">;
  img?: ResponsiveImg | null;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  if (img) {
    return <Picture img={img} alt={industry.name} sizes={sizes} priority={priority} className={className} imgClassName={imgClassName} />;
  }
  const Icon = iconFor(industry.slug);
  return (
    <div aria-hidden className={cn("night night-glow relative isolate flex items-center justify-center overflow-hidden", className)}>
      <div className="night-dots absolute inset-0 -z-10" />
      <span className="inline-flex size-16 items-center justify-center rounded-2xl border border-night-line bg-night-2/80 text-cta shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)] backdrop-blur-sm">
        <Icon className="size-7" strokeWidth={1.5} />
      </span>
    </div>
  );
}
