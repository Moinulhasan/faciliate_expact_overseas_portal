import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/providers/SmoothScroll";

// Animation features load after first paint; `m` components render static until then (CLAUDE.md §9 budget).
const loadFeatures = () => import("motion/react").then((mod) => mod.domAnimation);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>{children}</SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  );
}
