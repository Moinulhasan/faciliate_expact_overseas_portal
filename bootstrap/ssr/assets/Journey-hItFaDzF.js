import { jsx, jsxs } from "react/jsx-runtime";
import { Clock } from "lucide-react";
import { u as useLocale, c as Section, C as Container, d as SectionHead } from "./SiteLayout-CAKLTTxk.js";
function Journey() {
  const { t, tm } = useLocale();
  const steps = tm("home.journey.steps");
  return /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(SectionHead, { title: t("home.journey.title"), lead: t("home.journey.lead") }),
    /* @__PURE__ */ jsx("ol", { className: "-mx-4 grid grid-cols-1 px-4 md:flex md:snap-x md:snap-mandatory md:gap-4 md:overflow-x-auto md:pb-3 xl:mx-0 xl:grid xl:grid-cols-7 xl:gap-3 xl:overflow-visible xl:px-0 xl:pb-0", children: steps.map((s, i) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: "relative grid grid-cols-[40px_1fr] gap-x-4 pb-6 last:pb-0 md:block md:w-[240px] md:shrink-0 md:snap-start md:rounded-(--radius-item) md:border md:border-line md:bg-surface md:p-5 xl:w-auto",
        children: [
          i < steps.length - 1 && /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "absolute top-10 bottom-0 left-[19px] w-px bg-line md:hidden" }),
          /* @__PURE__ */ jsx("span", { className: "relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold text-brand tabular-nums md:size-auto md:border-0 md:bg-transparent", children: String(i + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsxs("div", { className: "pt-1.5 md:pt-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-h3 md:mt-2", children: s.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-base leading-6 text-muted", children: s.body }),
            s.time && /* @__PURE__ */ jsxs("p", { className: "mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-sm font-medium text-brand", children: [
              /* @__PURE__ */ jsx(Clock, { className: "size-3.5", strokeWidth: 2 }),
              /* @__PURE__ */ jsxs("span", { className: "sr-only", children: [
                t("home.journey.time_label"),
                ": "
              ] }),
              s.time
            ] })
          ] })
        ]
      },
      s.title
    )) }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-faint", children: t("home.journey.note") })
  ] }) });
}
export {
  Journey as J
};
