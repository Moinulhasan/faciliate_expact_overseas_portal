import { useEffect, useState } from "react";
import { getTier, type Tier } from "@/lib/capability";

// Always "static" on server and first client render (no hydration mismatch), then upgrades.
export function useTier(): Tier {
  const [tier, setTier] = useState<Tier>("static");
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setTier(getTier());
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return tier;
}
