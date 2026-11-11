import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { X, CalendarClock, Check, MessageCircle, Phone, ShieldAlert, Users, ArrowUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { cva } from "class-variance-authority";
import { g as cn, u as useLocale, B as ButtonAnchor } from "./SiteLayout-hZjGrTmB.js";
import { F as FlagIcon } from "./FlagIcon-CPJ7bVnz.js";
import { t as trackGlow } from "./Card-9Ubla1vH.js";
const badge = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs leading-5 font-medium whitespace-nowrap", {
  variants: {
    status: {
      open: "bg-brand/10 text-brand",
      closing: "bg-warning/10 text-warning",
      filled: "bg-faint/15 text-faint",
      neutral: "border border-line text-muted",
      sample: "bg-warning/10 text-warning"
    }
  },
  defaultVariants: { status: "neutral" }
});
function Badge({ status, className, children }) {
  return /* @__PURE__ */ jsx("span", { className: cn(badge({ status }), className), children });
}
const n$1 = new Intl.NumberFormat("en");
const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long" });
const BENEFITS = ["accommodation", "food", "transport", "ticket", "medical", "overtime"];
function JobContactDialog({ job: j, open, onClose }) {
  const { t } = useLocale();
  const { site } = usePage().props;
  const ref = useRef(null);
  useEffect(() => {
    const d2 = ref.current;
    if (!d2) return;
    if (open && !d2.open) {
      d2.showModal();
      window.__lenis?.stop();
    } else if (!open && d2.open) d2.close();
    return () => window.__lenis?.start();
  }, [open]);
  const wa = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
    t("hubs.jobs.wa_message", { title: j.title, country: j.country.name, ref: j.slug })
  )}`;
  const included = BENEFITS.filter((b) => j.benefits?.[b] === true);
  return /* @__PURE__ */ jsxs(
    "dialog",
    {
      ref,
      onClose: () => {
        window.__lenis?.start();
        onClose();
      },
      onClick: (e) => e.target === ref.current && onClose(),
      "aria-labelledby": `job-${j.id}-title`,
      className: "m-auto w-[min(560px,calc(100vw-24px))] overflow-hidden rounded-(--radius-panel) border border-line bg-surface p-0 text-ink shadow-[0_40px_80px_-24px_rgba(6,18,13,.55)] backdrop:bg-night/70 backdrop:backdrop-blur-sm open:animate-[dialog-in_.35s_var(--ease-out)]",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "night night-glow relative px-6 pt-6 pb-5 text-night-ink", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full text-night-muted hover:bg-white/[0.08] hover:text-night-ink",
              children: [
                /* @__PURE__ */ jsx(X, { className: "size-5", strokeWidth: 1.75 }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("hubs.jobs.close") })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-[13px] text-night-muted", children: [
            /* @__PURE__ */ jsx(FlagIcon, { iso2: j.country.iso2, className: "h-3.5 w-5" }),
            [j.city, j.country.name].filter(Boolean).join(", "),
            j.is_sample && /* @__PURE__ */ jsx(Badge, { status: "sample", children: t("hubs.jobs.sample") })
          ] }),
          /* @__PURE__ */ jsx("h2", { id: `job-${j.id}-title`, className: "mt-2 pr-10 text-[24px] leading-8 font-semibold tracking-[-0.02em]", children: j.title }),
          j.employer_type && /* @__PURE__ */ jsx("p", { className: "text-[14px] text-night-muted", children: j.employer_type }),
          /* @__PURE__ */ jsxs("p", { className: "mt-4 text-[28px] leading-8 font-semibold tracking-[-0.02em] text-white tabular-nums", children: [
            /* @__PURE__ */ jsx("span", { className: "mr-1.5 text-sm font-medium tracking-normal text-night-muted", children: j.currency }),
            n$1.format(j.salary_min),
            "–",
            n$1.format(j.salary_max),
            /* @__PURE__ */ jsx("span", { className: "ml-1.5 text-sm font-normal tracking-normal text-night-muted", children: t("hubs.jobs.per_month") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 px-6 py-5", children: [
          /* @__PURE__ */ jsxs("ul", { className: "flex flex-wrap gap-1.5 text-[13px]", children: [
            /* @__PURE__ */ jsx("li", { className: "rounded-full bg-surface-2 px-2.5 py-1", children: t("hubs.jobs.contract", { n: j.contract_months }) }),
            /* @__PURE__ */ jsx("li", { className: "rounded-full bg-surface-2 px-2.5 py-1", children: t(`hubs.jobs.gender.${j.gender}`) }),
            j.positions && /* @__PURE__ */ jsx("li", { className: "rounded-full bg-surface-2 px-2.5 py-1", children: t("hubs.jobs.positions", { n: j.positions }) }),
            j.working_hours && /* @__PURE__ */ jsx("li", { className: "rounded-full bg-surface-2 px-2.5 py-1", children: j.working_hours }),
            j.deadline && /* @__PURE__ */ jsxs("li", { className: "inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-brand", children: [
              /* @__PURE__ */ jsx(CalendarClock, { className: "size-3.5", strokeWidth: 2 }),
              t("hubs.jobs.apply_by", { date: longDate.format(new Date(j.deadline)) })
            ] })
          ] }),
          (j.requirements.length > 0 || included.length > 0) && /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            j.requirements.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold", children: t("hubs.jobs.requirements") }),
              /* @__PURE__ */ jsx("ul", { className: "mt-1.5 grid gap-1 text-[14px] leading-5 text-muted", children: j.requirements.map((r) => /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                r
              ] }, r)) })
            ] }),
            included.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold", children: t("hubs.jobs.benefits") }),
              /* @__PURE__ */ jsx("ul", { className: "mt-1.5 grid gap-1 text-[14px] leading-5 text-muted", children: included.map((b) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Check, { className: "size-3.5 text-brand", strokeWidth: 2.5 }),
                " ",
                t(`hubs.jobs.benefit.${b}`)
              ] }, b)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[14px] text-muted", children: t("hubs.jobs.dialog_lead") }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs(ButtonAnchor, { href: wa, target: "_blank", rel: "noopener", size: "lg", children: [
              /* @__PURE__ */ jsx(MessageCircle, {}),
              " ",
              t("hubs.jobs.whatsapp_cta")
            ] }),
            /* @__PURE__ */ jsxs(ButtonAnchor, { href: `tel:${site.contact.phone_href}`, size: "lg", variant: "ghost", children: [
              /* @__PURE__ */ jsx(Phone, {}),
              " ",
              t("hubs.jobs.call_cta", { phone: site.contact.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 rounded-xl bg-warning/[0.06] px-3.5 py-3 text-[13px] leading-[18px] text-muted", children: [
            /* @__PURE__ */ jsx(ShieldAlert, { className: "mt-px size-4 shrink-0 text-warning", strokeWidth: 1.75 }),
            /* @__PURE__ */ jsxs("span", { children: [
              t("hubs.jobs.reference"),
              ": ",
              /* @__PURE__ */ jsx("strong", { className: "font-semibold text-ink", children: j.slug }),
              ". ",
              t("hubs.jobs.safety")
            ] })
          ] })
        ] })
      ]
    }
  );
}
const n = new Intl.NumberFormat("en");
const d = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });
function JobCard({ job: j }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(true),
        onPointerMove: trackGlow,
        "aria-haspopup": "dialog",
        className: "card group flex h-full w-full cursor-pointer flex-col gap-3 p-5 text-left",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "flex w-full items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex min-w-0 items-center gap-2 text-[13px] text-muted", children: [
              /* @__PURE__ */ jsx(FlagIcon, { iso2: j.country.iso2, className: "h-3.5 w-5" }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: j.country.name })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex shrink-0 items-center gap-1.5", children: [
              j.is_sample && /* @__PURE__ */ jsx(Badge, { status: "sample", children: t("hubs.jobs.sample") }),
              j.status === "closing" && /* @__PURE__ */ jsx(Badge, { status: "closing", children: t("hubs.jobs.closing") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "block text-[17px] leading-6 font-semibold tracking-[-0.01em] group-hover:text-brand", children: j.title }),
            j.industry && /* @__PURE__ */ jsx("span", { className: "block text-[13px] text-faint", children: j.industry.name })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "block text-[22px] leading-7 font-semibold tracking-[-0.02em] tabular-nums", children: [
            /* @__PURE__ */ jsx("span", { className: "mr-1 text-[13px] font-medium tracking-normal text-muted", children: j.currency }),
            n.format(j.salary_min),
            "–",
            n.format(j.salary_max),
            /* @__PURE__ */ jsx("span", { className: "ml-1 text-[13px] font-normal tracking-normal text-faint", children: t("hubs.jobs.per_month") })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex flex-wrap gap-1.5 text-[12px] leading-5", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-surface-2 px-2.5 py-0.5", children: t("hubs.jobs.contract", { n: j.contract_months }) }),
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-surface-2 px-2.5 py-0.5", children: t(`hubs.jobs.gender.${j.gender}`) }),
            j.positions && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-0.5", children: [
              /* @__PURE__ */ jsx(Users, { className: "size-3", strokeWidth: 2 }),
              " ",
              t("hubs.jobs.positions", { n: j.positions })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "mt-auto flex w-full items-center justify-between gap-3 border-t border-line pt-3 text-[13px]", children: [
            j.deadline ? /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 ${j.status === "closing" ? "text-warning" : "text-brand"}`, children: [
              /* @__PURE__ */ jsx(CalendarClock, { className: "size-4", strokeWidth: 1.75 }),
              t("hubs.jobs.apply_by", { date: d.format(new Date(j.deadline)) })
            ] }) : /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", { className: "inline-flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white", children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4", strokeWidth: 2 }) })
          ] })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx(JobContactDialog, { job: j, open, onClose: () => setOpen(false) })
  ] });
}
export {
  Badge as B,
  JobCard as J
};
