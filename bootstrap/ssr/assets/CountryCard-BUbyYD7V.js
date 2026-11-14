import { jsxs, jsx } from "react/jsx-runtime";
import { u as useLocale, L as Link } from "./SiteLayout-CAKLTTxk.js";
import { ArrowUpRight, Clock, CalendarRange, Coins } from "lucide-react";
import { t as trackGlow } from "./Card-C3OvSPRv.js";
import { F as FlagIcon } from "./FlagIcon-DLwSLeS3.js";
function CountryCard({ country: c, note }) {
  const { t } = useLocale();
  return /* @__PURE__ */ jsxs(Link, { href: `/countries/${c.slug}`, onPointerMove: trackGlow, className: "card group flex h-full w-full flex-col gap-4 p-5", "aria-label": c.name, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,.08),0_6px_16px_-8px_rgba(10,15,36,.35)]", children: /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, className: "h-8 w-11 rounded-none shadow-none" }) }),
      /* @__PURE__ */ jsx("span", { className: "inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white", children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4", strokeWidth: 2 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[19px] leading-6 font-semibold tracking-[-0.015em]", children: c.name }),
      c.visa_type && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm leading-[18px] text-muted", children: c.visa_type })
    ] }),
    note && /* @__PURE__ */ jsx("p", { className: "text-sm leading-5 text-muted", children: note }),
    c.processing_days_min && c.processing_days_max && /* @__PURE__ */ jsxs("p", { className: "flex items-baseline gap-2", children: [
      /* @__PURE__ */ jsx(Clock, { className: "size-4 shrink-0 translate-y-0.5 text-brand", strokeWidth: 2 }),
      /* @__PURE__ */ jsx("span", { className: "text-[22px] leading-7 font-semibold tracking-[-0.02em] tabular-nums", children: t("pages.countries.days", { min: c.processing_days_min, max: c.processing_days_max }) }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-muted", children: t("pages.countries.facts_short.processing").toLowerCase() })
    ] }),
    /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-2 gap-2 rounded-xl bg-surface-2/70 p-3 text-sm leading-5", children: [
      c.contract_months && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("dt", { className: "flex items-center gap-1 text-faint", children: [
          /* @__PURE__ */ jsx(CalendarRange, { className: "size-3.5", strokeWidth: 2 }),
          " ",
          t("pages.countries.facts_short.contract")
        ] }),
        /* @__PURE__ */ jsx("dd", { className: "mt-1 font-semibold text-ink tabular-nums", children: t("pages.countries.months", { n: c.contract_months }) })
      ] }),
      c.currency && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("dt", { className: "flex items-center gap-1 text-faint", children: [
          /* @__PURE__ */ jsx(Coins, { className: "size-3.5", strokeWidth: 2 }),
          " ",
          t("pages.countries.facts_short.currency")
        ] }),
        /* @__PURE__ */ jsx("dd", { className: "mt-1 font-semibold text-ink", children: c.currency })
      ] })
    ] }),
    !note && c.top_trades.length > 0 && /* @__PURE__ */ jsx("p", { className: "mt-auto text-sm leading-[18px] text-muted", children: c.top_trades.slice(0, 3).join(" · ") })
  ] });
}
export {
  CountryCard as C
};
