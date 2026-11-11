import { lazy, Suspense, useEffect, useState } from "react";
import { Picture } from "@/Components/ui/Picture";
import { useTier } from "@/hooks/useTier";
import { cn } from "@/lib/cn";
import type { Industry } from "@/types";

// three.js + R3F live only in this lazy chunk (CLAUDE.md §9: 3D loaded on tier "full" after idle).
const IndustryScene = lazy(() => import("@/three/IndustryScene"));

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * Full-bleed background for the industry hero (sits behind the text, aria-hidden).
 * - Desktop, tier "full": dark panel, then the 3D scene fades in once idle (no photo → no swap flash).
 * - Desktop, lite/static/reduced motion: the industry photo on the right, faded into the night.
 * - < lg (phones/tablets): the photo, dimmed behind the text.
 * Server render: photo below lg only; dark panel on desktop until the tier is known.
 */
export function IndustryHeroBackground({ industry }: { industry: Pick<Industry, "slug" | "name" | "image"> }) {
  const tier = useTier();
  const [mounted, setMounted] = useState(false);
  const [idle, setIdle] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (tier !== "full") return;
    const w = window as IdleWindow;
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setIdle(true), 300);
    return () => window.clearTimeout(id);
  }, [tier]);

  const desktopPhoto = mounted && tier !== "full";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {industry.image && (
        <Picture
          img={industry.image}
          alt=""
          sizes="(min-width: 1024px) 62vw, 100vw"
          priority
          className={cn(
            "absolute inset-0 opacity-35 lg:right-0 lg:left-auto lg:w-[62%] lg:opacity-70 lg:[mask-image:linear-gradient(90deg,transparent,#000_45%)]",
            !desktopPhoto && "lg:hidden",
          )}
        />
      )}
      {tier === "full" && idle && (
        <Suspense fallback={null}>
          <IndustryScene slug={industry.slug} />
        </Suspense>
      )}
      {/* Readability scrim: solid behind the headline, clear by ~70% so the scene shows on the right. */}
      <div className="absolute inset-0 bg-night/55 lg:bg-[linear-gradient(90deg,var(--color-night)_0%,rgba(6,18,13,.92)_28%,rgba(6,18,13,.55)_48%,rgba(6,18,13,0)_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent" />
    </div>
  );
}
