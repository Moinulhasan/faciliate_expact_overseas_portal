import { usePage } from "@inertiajs/react";
import type { SharedProps } from "@/types";

type Dict = Record<string, unknown>;

function lookup(dict: Dict, key: string): unknown {
  return key.split(".").reduce<unknown>((node, part) => (node as Dict | undefined)?.[part], dict);
}

/** "/jobs" → "/bn/jobs" in Bangla. External links, anchors and already-prefixed paths pass through. */
export function localizePath(path: string, locale: string): string {
  if (locale !== "bn" || !path.startsWith("/") || path.startsWith("//") || /^\/bn(\/|$|\?)/.test(path)) return path;
  return path === "/" ? "/bn" : `/bn${path}`;
}

export function useLocale() {
  const { locale, translations } = usePage<SharedProps>().props;

  function t(key: string, replace: Record<string, string | number> = {}): string {
    const value = lookup(translations, key);
    if (typeof value !== "string") return key;
    return Object.entries(replace).reduce((s, [k, v]) => s.replaceAll(`:${k}`, String(v)), value);
  }

  // For arrays/objects in lang files (lists, FAQ items, steps).
  function tm<T>(key: string): T {
    return (lookup(translations, key) ?? []) as T;
  }

  const path = (p: string) => localizePath(p, locale);

  return { locale, t, tm, path };
}
