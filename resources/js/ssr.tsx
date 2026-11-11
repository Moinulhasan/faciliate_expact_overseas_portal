import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { renderToString } from "react-dom/server";
import { Providers } from "@/providers/Providers";

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    title: (title) => (title ? `${title} — Facilitate Expat Overseas` : "Facilitate Expat Overseas"),
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob("./Pages/**/*.tsx")),
    setup: ({ App, props }) => (
      <Providers>
        <App {...props} />
      </Providers>
    ),
  }),
);
