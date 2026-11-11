import { jsx, jsxs } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { MessageCircle, Plus } from "lucide-react";
import { c as Section, C as Container, H as Heading, B as ButtonAnchor } from "./SiteLayout-hZjGrTmB.js";
function Faq({
  title,
  lead,
  items,
  tone = "bg"
}) {
  const { site } = usePage().props;
  if (!items.length) return null;
  return /* @__PURE__ */ jsx(Section, { tone, children: /* @__PURE__ */ jsxs(Container, { className: "grid gap-10 lg:grid-cols-[0.8fr_1.2fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-3", children: [
      /* @__PURE__ */ jsx(Heading, { a: title }),
      lead && /* @__PURE__ */ jsx("p", { className: "text-lead text-muted", children: lead }),
      /* @__PURE__ */ jsxs(ButtonAnchor, { href: `https://wa.me/${site.contact.whatsapp}`, target: "_blank", rel: "noopener", variant: "ghost", className: "mt-3", children: [
        /* @__PURE__ */ jsx(MessageCircle, {}),
        " WhatsApp"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-2.5", children: items.map((it, i) => /* @__PURE__ */ jsxs(
      "details",
      {
        open: i === 0,
        className: "group rounded-(--radius-item) border border-line bg-surface transition-colors open:border-brand",
        children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden", children: [
            it.q,
            /* @__PURE__ */ jsx("span", { className: "inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-brand transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white", children: /* @__PURE__ */ jsx(Plus, { className: "size-3.5", strokeWidth: 2.5 }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[62ch] px-5 pb-5 text-[15px] leading-[22px] text-muted", children: it.a })
        ]
      },
      it.q
    )) })
  ] }) });
}
export {
  Faq as F
};
