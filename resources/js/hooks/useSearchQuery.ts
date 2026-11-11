import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

// Search term kept in ?q= so results are shareable. Initial value comes from the Inertia page URL,
// so the server render of /industries?q=welder is already filtered (no flash).
export function useSearchQuery() {
  const { url } = usePage();
  const [q, setQ] = useState(() => new URLSearchParams(url.split("?")[1] ?? "").get("q") ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URL(window.location.href);
      if (q.trim()) next.searchParams.set("q", q.trim());
      else next.searchParams.delete("q");
      // replaceState keeps Inertia's history state; no request, no new history entry per keystroke.
      if (next.href !== window.location.href) window.history.replaceState(window.history.state, "", next);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  return [q, setQ] as const;
}
