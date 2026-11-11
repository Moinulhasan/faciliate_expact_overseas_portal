import { useEffect, type ReactNode } from "react";
import { router } from "@inertiajs/react";
import { useTier } from "@/hooks/useTier";

declare global {
  interface Window {
    __lenis?: import("lenis").default;
  }
}

// Lenis only on tier "full" (CLAUDE.md §5.3/§5.4). Libraries load lazily so SSR and lite/static tiers never pay for them.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const tier = useTier();

  useEffect(() => {
    if (tier !== "full") return;
    let cleanup = () => {};
    let cancelled = false;

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });
        const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        window.__lenis = lenis;
        const off = router.on("navigate", () => {
          lenis.scrollTo(0, { immediate: true });
          ScrollTrigger.refresh();
        });
        cleanup = () => {
          off();
          gsap.ticker.remove(tick);
          lenis.destroy();
          window.__lenis = undefined;
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [tier]);

  return <>{children}</>;
}
