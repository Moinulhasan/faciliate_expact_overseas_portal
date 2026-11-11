import { jsx } from "react/jsx-runtime";
import { g as cn } from "./SiteLayout-hZjGrTmB.js";
function FlagIcon({ iso2, className, eager }) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: `/flags/${iso2.toLowerCase()}.svg`,
      alt: "",
      width: 20,
      height: 15,
      loading: eager ? "eager" : "lazy",
      decoding: "async",
      className: cn("inline-block h-[15px] w-5 shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,.08)]", className)
    }
  );
}
export {
  FlagIcon as F
};
