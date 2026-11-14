import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
import { J as JobCard } from "./JobCard-DcxxoXq4.js";
import { u as useLocale, c as Section, C as Container, d as SectionHead, e as ButtonLink, L as Link } from "./SiteLayout-CAKLTTxk.js";
import { F as FlagIcon } from "./FlagIcon-DLwSLeS3.js";
function LiveOpenings({ jobs, filters = [] }) {
  const { t } = useLocale();
  if (!jobs.length) return null;
  return /* @__PURE__ */ jsx(Section, { tone: "alt", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHead,
      {
        title: t("home.jobs.title"),
        lead: t("home.jobs.lead"),
        aside: /* @__PURE__ */ jsxs(ButtonLink, { href: "/jobs", variant: "ghost", size: "sm", children: [
          t("home.jobs.see_all"),
          " ",
          /* @__PURE__ */ jsx(ArrowRight, {})
        ] })
      }
    ),
    filters.length > 1 && /* @__PURE__ */ jsx("nav", { "aria-label": t("home.jobs.filter_label"), className: "-mt-2 mb-5", children: /* @__PURE__ */ jsx("ul", { className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0", children: filters.map((c) => /* @__PURE__ */ jsx("li", { className: "shrink-0", children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: `/jobs?country=${c.slug}`,
        className: "inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium transition-colors hover:border-brand hover:text-brand",
        children: [
          /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, className: "h-3.5 w-5" }),
          c.name,
          /* @__PURE__ */ jsx("span", { className: "rounded-full bg-surface-2 px-1.5 text-[13px] text-muted tabular-nums", children: c.count })
        ]
      }
    ) }, c.slug)) }) }),
    /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: jobs.map((j) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(JobCard, { job: j }) }, j.id)) })
  ] }) });
}
export {
  LiveOpenings as L
};
