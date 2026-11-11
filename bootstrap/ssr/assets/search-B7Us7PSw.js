import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
function useSearchQuery() {
  const { url } = usePage();
  const [q, setQ] = useState(() => new URLSearchParams(url.split("?")[1] ?? "").get("q") ?? "");
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URL(window.location.href);
      if (q.trim()) next.searchParams.set("q", q.trim());
      else next.searchParams.delete("q");
      if (next.href !== window.location.href) window.history.replaceState(window.history.state, "", next);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);
  return [q, setQ];
}
const normalize = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
function matches(query, haystack) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = normalize(haystack.filter(Boolean).join(" "));
  return words.every((w) => text.includes(w));
}
export {
  matches as m,
  useSearchQuery as u
};
