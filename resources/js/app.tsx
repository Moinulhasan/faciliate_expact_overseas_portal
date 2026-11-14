import "@fontsource-variable/geist/wght.css";
// Bengali glyphs only (unicode-range) — Latin text keeps Geist, Bangla falls through to Hind Siliguri.
import "@fontsource/hind-siliguri/bengali-400.css";
import "@fontsource/hind-siliguri/bengali-500.css";
import "@fontsource/hind-siliguri/bengali-600.css";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { hydrateRoot } from "react-dom/client";
import { Providers } from "@/providers/Providers";

createInertiaApp({
  title: (title) => (title ? `${title} — Facilitate Expat Overseas` : "Facilitate Expat Overseas"),
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob("./Pages/**/*.tsx")),
  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <Providers>
        <App {...props} />
      </Providers>,
    );
  },
  progress: { color: "#a6e35c", showSpinner: false },
});
