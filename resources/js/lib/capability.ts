export type Tier = "full" | "lite" | "static";

// Differs from CLAUDE.md §5.4 sketch: deviceMemory is Chromium-only, so "unknown" must not count as low-end,
// otherwise every Safari/Firefox desktop would be stuck on "lite".
export function getTier(): Tier {
  if (typeof window === "undefined") return "static";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  const saveData = nav.connection?.saveData ?? false;
  const mem = nav.deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 8;
  const webgl = !!document.createElement("canvas").getContext("webgl2");
  if (reduced || saveData || !webgl) return "static";
  if ((mem !== undefined && mem < 4) || cores <= 4 || innerWidth < 768) return "lite";
  return "full";
}
