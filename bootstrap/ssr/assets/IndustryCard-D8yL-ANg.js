import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { Briefcase, ShoppingBag, Car, Truck, Sparkles, Shield, GraduationCap, Scissors, HeartPulse, UtensilsCrossed, Sprout, Factory, Cpu, Wrench, Flame, Building2, ArrowUpRight } from "lucide-react";
import { t as trackGlow } from "./Card-9Ubla1vH.js";
import { F as FlagIcon } from "./FlagIcon-CPJ7bVnz.js";
import { g as cn, u as useLocale } from "./SiteLayout-hZjGrTmB.js";
const industryIcons = {
  construction: Building2,
  "oil-gas": Flame,
  mep: Wrench,
  "engineering-technical": Cpu,
  manufacturing: Factory,
  agriculture: Sprout,
  hospitality: UtensilsCrossed,
  healthcare: HeartPulse,
  "beauty-wellness": Scissors,
  education: GraduationCap,
  security: Shield,
  "facility-management": Sparkles,
  "transport-logistics": Truck,
  drivers: Car,
  retail: ShoppingBag,
  "office-admin": Briefcase
};
const iconFor = (slug) => industryIcons[slug] ?? Building2;
function Picture({
  img,
  alt,
  sizes,
  priority,
  className,
  imgClassName
}) {
  return /* @__PURE__ */ jsxs("picture", { className: cn("block overflow-hidden bg-cover bg-center", className), style: { backgroundImage: `url(${img.blur})` }, children: [
    /* @__PURE__ */ jsx("source", { type: "image/avif", srcSet: img.avif, sizes }),
    /* @__PURE__ */ jsx("source", { type: "image/webp", srcSet: img.webp, sizes }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: img.src,
        alt,
        width: img.width,
        height: img.height,
        loading: priority ? "eager" : "lazy",
        fetchPriority: priority ? "high" : "auto",
        decoding: "async",
        className: cn("size-full object-cover", imgClassName)
      }
    )
  ] });
}
function IndustryVisual({
  industry,
  img = industry.image,
  sizes,
  priority,
  className,
  imgClassName
}) {
  if (img) {
    return /* @__PURE__ */ jsx(Picture, { img, alt: industry.name, sizes, priority, className, imgClassName });
  }
  const Icon = iconFor(industry.slug);
  return /* @__PURE__ */ jsxs("div", { "aria-hidden": true, className: cn("night night-glow relative isolate flex items-center justify-center overflow-hidden", className), children: [
    /* @__PURE__ */ jsx("div", { className: "night-dots absolute inset-0 -z-10" }),
    /* @__PURE__ */ jsx("span", { className: "inline-flex size-16 items-center justify-center rounded-2xl border border-night-line bg-night-2/80 text-cta shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)] backdrop-blur-sm", children: /* @__PURE__ */ jsx(Icon, { className: "size-7", strokeWidth: 1.5 }) })
  ] });
}
function IndustryCard({
  industry,
  countries,
  note
}) {
  const { t } = useLocale();
  const Icon = iconFor(industry.slug);
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href: `/industries/${industry.slug}`,
      onPointerMove: trackGlow,
      className: "card group flex h-full w-full flex-col gap-3 p-6",
      "aria-label": industry.name,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative -mx-6 -mt-6 mb-1 aspect-[16/9] overflow-hidden rounded-t-[23px]", children: [
          /* @__PURE__ */ jsx(
            IndustryVisual,
            {
              industry,
              sizes: "(min-width: 1280px) 360px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw",
              className: "size-full",
              imgClassName: "transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.04]"
            }
          ),
          /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-night/35 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "icon-tile", children: /* @__PURE__ */ jsx(Icon, { className: "size-5", strokeWidth: 1.75 }) }),
          /* @__PURE__ */ jsx("span", { className: "inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white", children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4", strokeWidth: 2 }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-1 text-h3", children: industry.name }),
        /* @__PURE__ */ jsx("p", { className: "text-[15px] leading-[22px] text-muted", children: note ?? industry.summary }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-1 flex flex-wrap gap-1.5", children: [
          industry.roles.slice(0, 4).map((r) => /* @__PURE__ */ jsx("li", { className: "rounded-full bg-surface-2 px-2.5 py-0.5 text-[13px] leading-5 text-ink/80", children: r }, r)),
          industry.roles.length > 4 && /* @__PURE__ */ jsxs("li", { className: "px-1 py-0.5 text-[13px] leading-5 text-faint", children: [
            "+",
            industry.roles.length - 4
          ] })
        ] }),
        countries && countries.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center gap-2 border-t border-line pt-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[13px] text-faint", children: t("pages.industries.hiring_in") }),
          /* @__PURE__ */ jsx("span", { className: "flex -space-x-1", children: countries.slice(0, 6).map((c) => /* @__PURE__ */ jsx("span", { title: c.name, className: "inline-flex rounded-[3px] ring-2 ring-surface", children: /* @__PURE__ */ jsx(FlagIcon, { iso2: c.iso2, className: "h-3.5 w-5" }) }, c.iso2)) }),
          countries.length > 6 && /* @__PURE__ */ jsxs("span", { className: "text-[13px] text-faint", children: [
            "+",
            countries.length - 6
          ] })
        ] })
      ]
    }
  );
}
export {
  IndustryCard as I,
  Picture as P,
  IndustryVisual as a,
  iconFor as i
};
