import { jsx, jsxs } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { u as useLocale, C as Container, H as Heading, e as ButtonLink, B as ButtonAnchor, g as cn } from "./SiteLayout-hZjGrTmB.js";
function FinalCta({ tone = "bg" }) {
  const { t } = useLocale();
  const { site } = usePage().props;
  return /* @__PURE__ */ jsx("section", { className: tone === "alt" ? "bg-surface-2 pb-12 md:pb-14" : "bg-bg pb-12 md:pb-14", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "night night-glow relative isolate overflow-hidden rounded-(--radius-panel) border border-night-line px-6 py-10 text-night-ink md:px-12 md:py-14", children: [
    /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "night-dots pointer-events-none absolute inset-0 -z-10" }),
    /* @__PURE__ */ jsx(Heading, { a: t("home.final.title_a"), b: t("home.final.title_b"), className: "text-display max-w-[14ch]" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-[46ch] text-lead text-night-muted", children: t("home.final.lead") }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs(ButtonLink, { href: "/apply", size: "lg", children: [
        t("home.final.apply"),
        " ",
        /* @__PURE__ */ jsx(ArrowRight, {})
      ] }),
      /* @__PURE__ */ jsx(ButtonLink, { href: "/employers/request", size: "lg", variant: "quiet", children: t("home.final.employer") }),
      /* @__PURE__ */ jsxs(ButtonAnchor, { href: `https://wa.me/${site.contact.whatsapp}`, target: "_blank", rel: "noopener", size: "lg", variant: "quiet", children: [
        /* @__PURE__ */ jsx(MessageCircle, {}),
        " ",
        t("home.final.whatsapp")
      ] })
    ] })
  ] }) }) });
}
function trackGlow(e) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--gx", `${e.clientX - r.left}px`);
  el.style.setProperty("--gy", `${e.clientY - r.top}px`);
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { onPointerMove: trackGlow, className: cn("card flex flex-col gap-3 p-6", className), ...props });
}
export {
  Card as C,
  FinalCta as F,
  trackGlow as t
};
