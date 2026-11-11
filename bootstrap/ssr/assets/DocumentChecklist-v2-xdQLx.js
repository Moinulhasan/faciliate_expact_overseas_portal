import { jsxs, jsx } from "react/jsx-runtime";
import { Check } from "lucide-react";
import { useState } from "react";
import { u as useLocale, g as cn } from "./SiteLayout-hZjGrTmB.js";
function DocumentChecklist({ items }) {
  const { t } = useLocale();
  const [done, setDone] = useState(/* @__PURE__ */ new Set());
  const toggle = (i) => setDone((prev) => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    return next;
  });
  const pct = items.length ? done.size / items.length * 100 : 0;
  return /* @__PURE__ */ jsxs("div", { className: "card p-5 md:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold tabular-nums", "aria-live": "polite", children: t("pages.countries.docs_ready", { done: done.size, total: items.length }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-faint tabular-nums", children: [
        Math.round(pct),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2", "aria-hidden": true, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full origin-left [transform:scaleX(var(--p))] rounded-full bg-brand transition-transform duration-500 ease-(--ease-out)",
        style: { "--p": pct / 100 }
      }
    ) }),
    /* @__PURE__ */ jsx("ul", { className: "mt-4 grid gap-2", children: items.map((item, i) => {
      const on = done.has(i);
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "label",
        {
          className: cn(
            "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[15px] leading-[22px] transition-colors",
            on ? "border-brand/40 bg-brand/[0.05] text-muted line-through decoration-brand/40" : "border-line hover:border-brand/50"
          ),
          children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", className: "peer sr-only", checked: on, onChange: () => toggle(i) }),
            /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": true,
                className: cn(
                  "inline-flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand",
                  on ? "border-brand bg-brand text-white" : "border-line bg-surface"
                ),
                children: on && /* @__PURE__ */ jsx(Check, { className: "size-3.5", strokeWidth: 3 })
              }
            ),
            item
          ]
        }
      ) }, item);
    }) })
  ] });
}
export {
  DocumentChecklist as D
};
