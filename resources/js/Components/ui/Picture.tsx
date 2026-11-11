import { cn } from "@/lib/cn";
import type { ResponsiveImg } from "@/types";

// AVIF → WebP <picture> with intrinsic size (no CLS). The blurred LQIP sits behind the image and is
// painted over as it decodes — no JS needed, so it also works server-rendered with JS disabled.
// `sizes` must describe the rendered width so the browser picks the right candidate.
export function Picture({
  img,
  alt,
  sizes,
  priority,
  className,
  imgClassName,
}: {
  img: ResponsiveImg;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <picture className={cn("block overflow-hidden bg-cover bg-center", className)} style={{ backgroundImage: `url(${img.blur})` }}>
      <source type="image/avif" srcSet={img.avif} sizes={sizes} />
      <source type="image/webp" srcSet={img.webp} sizes={sizes} />
      <img
        src={img.src}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("size-full object-cover", imgClassName)}
      />
    </picture>
  );
}
