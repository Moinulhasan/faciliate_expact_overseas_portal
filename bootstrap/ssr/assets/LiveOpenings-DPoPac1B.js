import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
import { J as JobCard } from "./JobCard-DmK72EL7.js";
import { u as useLocale, c as Section, C as Container, d as SectionHead, e as ButtonLink } from "./SiteLayout-hZjGrTmB.js";
function LiveOpenings({ jobs }) {
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
    /* @__PURE__ */ jsx("ul", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: jobs.map((j) => /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(JobCard, { job: j }) }, j.id)) })
  ] }) });
}
export {
  LiveOpenings as L
};
