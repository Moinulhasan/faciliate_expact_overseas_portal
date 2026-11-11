import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { C as Container, H as Heading, g as cn } from "./SiteLayout-hZjGrTmB.js";
function PageHero({
  crumbs,
  title,
  accent,
  lead,
  eyebrow,
  actions,
  aside,
  background,
  meta,
  children
}) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: cn(
        "night night-glow relative isolate overflow-hidden pt-24 pb-12 text-night-ink md:pt-28 md:pb-14",
        background && "lg:flex lg:min-h-[600px] lg:flex-col lg:pb-20"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "night-dots pointer-events-none absolute inset-0 -z-10" }),
        background,
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsx("ol", { className: "flex flex-wrap items-center gap-1 text-[13px] text-night-muted", children: crumbs.map((c, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-1", children: [
            i > 0 && /* @__PURE__ */ jsx(ChevronRight, { "aria-hidden": true, className: "size-3.5 opacity-60" }),
            i < crumbs.length - 1 ? /* @__PURE__ */ jsx(Link, { href: c.href, className: "hover:text-night-ink", children: c.name }) : /* @__PURE__ */ jsx("span", { "aria-current": "page", className: "text-night-ink", children: c.name })
          ] }, c.href)) }) }),
          /* @__PURE__ */ jsxs("div", { className: cn("mt-8 grid items-end gap-10", aside && "lg:grid-cols-[1.2fr_0.8fr]", background && "lg:mt-16 lg:max-w-[640px]"), children: [
            /* @__PURE__ */ jsxs("div", { children: [
              eyebrow,
              /* @__PURE__ */ jsx(Heading, { as: "h1", a: title, b: accent, className: "mt-4 max-w-[20ch]" }),
              lead && /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-[620px] text-lead text-night-muted", children: lead }),
              actions && /* @__PURE__ */ jsx("div", { className: "mt-7 flex flex-wrap gap-3", children: actions }),
              meta && /* @__PURE__ */ jsx("div", { className: "mt-8", children: meta })
            ] }),
            aside
          ] }),
          children
        ] })
      ]
    }
  );
}
function HeroPill({ children }) {
  return /* @__PURE__ */ jsxs("p", { className: "inline-flex items-center gap-2 rounded-full border border-night-line bg-night-2/70 px-3 py-1.5 text-[13px] text-night-muted backdrop-blur-sm", children: [
    /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-cta shadow-[0_0_0_3px_rgba(115,191,68,.18)]" }),
    children
  ] });
}
export {
  HeroPill as H,
  PageHero as P
};
