import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/cn";

// Feeds the pointer position into --gx/--gy so the .card radial glow follows the cursor (main-site behaviour).
export function trackGlow(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--gx", `${e.clientX - r.left}px`);
  el.style.setProperty("--gy", `${e.clientY - r.top}px`);
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div onPointerMove={trackGlow} className={cn("card flex flex-col gap-3 p-6", className)} {...props} />;
}
