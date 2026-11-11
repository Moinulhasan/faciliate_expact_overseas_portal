import { jsx, jsxs } from "react/jsx-runtime";
import { Check, X, ShieldAlert } from "lucide-react";
import { C as Card } from "./Card-9Ubla1vH.js";
import { u as useLocale, c as Section, C as Container, d as SectionHead } from "./SiteLayout-hZjGrTmB.js";
function CostsBlock() {
  const { t, tm } = useLocale();
  return /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionHead, { title: t("home.costs.title"), accent: t("home.costs.accent"), lead: t("home.costs.lead") }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-7", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-tile", children: /* @__PURE__ */ jsx(Check, { className: "size-5", strokeWidth: 2 }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-[20px] leading-7 font-semibold tracking-[-0.01em]", children: t("home.costs.pay_title") }),
        /* @__PURE__ */ jsx("ul", { className: "grid gap-2.5", children: tm("home.costs.pay").map((x) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2.5 text-[15px] leading-[22px] text-muted", children: [
          /* @__PURE__ */ jsx(Check, { className: "mt-[3px] size-4 shrink-0 text-brand", strokeWidth: 2.25 }),
          x
        ] }, x)) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-7", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-tile bg-danger/10 text-danger", children: /* @__PURE__ */ jsx(X, { className: "size-5", strokeWidth: 2 }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-[20px] leading-7 font-semibold tracking-[-0.01em]", children: t("home.costs.never_title") }),
        /* @__PURE__ */ jsx("ul", { className: "grid gap-2.5", children: tm("home.costs.never").map((x) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2.5 text-[15px] leading-[22px] text-muted", children: [
          /* @__PURE__ */ jsx(X, { className: "mt-[3px] size-4 shrink-0 text-danger", strokeWidth: 2.25 }),
          x
        ] }, x)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "night night-glow flex flex-col gap-4 rounded-(--radius-card) border border-night-line p-7 text-night-ink md:col-span-2 md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-tile bg-cta/[0.14] text-cta", children: /* @__PURE__ */ jsx(ShieldAlert, { className: "size-5", strokeWidth: 1.75 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-h3", children: t("home.costs.verify_title") }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 max-w-[80ch] text-[15px] leading-[22px] text-night-muted", children: t("home.costs.verify") })
        ] })
      ] })
    ] })
  ] }) });
}
function Journey() {
  const { t, tm } = useLocale();
  const steps = tm("home.journey.steps");
  return /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionHead, { title: t("home.journey.title"), lead: t("home.journey.lead") }),
    /* @__PURE__ */ jsx("ol", { className: "grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4", children: steps.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "relative border-t border-line py-6", children: [
      /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "absolute -top-px left-0 h-px w-10 bg-brand" }),
      /* @__PURE__ */ jsx("span", { className: "text-[13px] font-semibold text-brand tabular-nums", children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsx("h3", { className: "mt-2 text-h3", children: s.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[15px] leading-[22px] text-muted", children: s.body })
    ] }, s.title)) })
  ] }) });
}
export {
  CostsBlock as C,
  Journey as J
};
