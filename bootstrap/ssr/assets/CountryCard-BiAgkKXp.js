import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { ArrowUpRight, Clock, CalendarRange, Coins } from "lucide-react";
import { t as trackGlow } from "./Card-9Ubla1vH.js";
import { F as FlagIcon } from "./FlagIcon-CPJ7bVnz.js";
import { u as useLocale } from "./SiteLayout-hZjGrTmB.js";
function CountryCard({ country: c, note }) {
  const { t } = useLocale();
  return /* @__PURE__ */ jsxs(Link, { href: `/countries/${c.slug}`, onPointerMove: trackGlow, className: "card group flex h-full w-full flex-col gap-4 p-5", "aria-label": c.name, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,.08),0_6px_16px_-8px_rgba(10,15,36,.35)]", children: /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, className: "h-8 w-11 rounded-none shadow-none" }) }),
      /* @__PURE__ */ jsx("span", { className: "inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white", children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4", strokeWidth: 2 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[19px] leading-6 font-semibold tracking-[-0.015em]", children: c.name }),
      c.visa_type && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[13px] leading-[18px] text-muted", children: c.visa_type })
    ] }),
    note && /* @__PURE__ */ jsx("p", { className: "text-[14px] leading-5 text-muted", children: note }),
    /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-3 gap-2 rounded-xl bg-surface-2/70 p-3 text-[12px] leading-4", children: [
      c.processing_days_min && c.processing_days_max && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("dt", { className: "flex items-center gap-1 text-faint", children: [
          /* @__PURE__ */ jsx(Clock, { className: "size-3", strokeWidth: 2 }),
          " ",
          t("pages.countries.facts_short.processing")
        ] }),
        /* @__PURE__ */ jsx("dd", { className: "mt-1 font-semibold text-ink tabular-nums", children: t("pages.countries.days_short", { min: c.processing_days_min, max: c.processing_days_max }) })
      ] }),
      c.contract_months && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("dt", { className: "flex items-center gap-1 text-faint", children: [
          /* @__PURE__ */ jsx(CalendarRange, { className: "size-3", strokeWidth: 2 }),
          " ",
          t("pages.countries.facts_short.contract")
        ] }),
        /* @__PURE__ */ jsx("dd", { className: "mt-1 font-semibold text-ink tabular-nums", children: t("pages.countries.months_short", { n: c.contract_months }) })
      ] }),
      c.currency && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("dt", { className: "flex items-center gap-1 text-faint", children: [
          /* @__PURE__ */ jsx(Coins, { className: "size-3", strokeWidth: 2 }),
          " ",
          t("pages.countries.facts_short.currency")
        ] }),
        /* @__PURE__ */ jsx("dd", { className: "mt-1 font-semibold text-ink", children: c.currency })
      ] })
    ] }),
    !note && c.top_trades.length > 0 && /* @__PURE__ */ jsx("p", { className: "mt-auto text-[13px] leading-[18px] text-muted", children: c.top_trades.slice(0, 3).join(" · ") })
  ] });
}
export {
  CountryCard as C
};
