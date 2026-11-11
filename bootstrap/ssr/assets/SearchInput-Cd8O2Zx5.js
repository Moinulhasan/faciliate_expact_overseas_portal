import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Search, X } from "lucide-react";
import { useRef, useEffect } from "react";
import { g as cn } from "./SiteLayout-hZjGrTmB.js";
function SearchInput({
  value,
  onChange,
  label,
  placeholder,
  resultsText,
  count,
  className
}) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: cn("group relative w-full", className), children: [
    /* @__PURE__ */ jsx("label", { className: "sr-only", htmlFor: "page-search", children: label }),
    /* @__PURE__ */ jsx(Search, { "aria-hidden": true, className: "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-faint group-focus-within:text-brand", strokeWidth: 2 }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        id: "page-search",
        type: "search",
        value,
        onChange: (e) => onChange(e.target.value),
        onKeyDown: (e) => e.key === "Escape" && onChange(""),
        placeholder,
        autoComplete: "off",
        enterKeyHint: "search",
        className: "h-10 w-full rounded-full border border-line bg-surface pr-20 pl-10 text-sm transition-[border-color,box-shadow] outline-none placeholder:text-faint hover:border-brand/50 focus:border-brand focus:shadow-[0_0_0_4px_rgba(28,121,73,.12)] [&::-webkit-search-cancel-button]:hidden"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-1", children: value ? /* @__PURE__ */ jsxs(Fragment, { children: [
      count && /* @__PURE__ */ jsx("span", { className: "text-xs text-faint tabular-nums", children: count }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            onChange("");
            ref.current?.focus();
          },
          className: "inline-flex size-7 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-ink",
          children: [
            /* @__PURE__ */ jsx(X, { className: "size-3.5", strokeWidth: 2.25 }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Clear search" })
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsx("kbd", { "aria-hidden": true, className: "mr-1.5 hidden rounded-md border border-line px-1.5 text-xs leading-5 text-faint sm:inline", children: "/" }) }),
    /* @__PURE__ */ jsx("span", { "aria-live": "polite", className: "sr-only", children: resultsText })
  ] });
}
function NoResults({ title, body, onClear, clearLabel }) {
  return /* @__PURE__ */ jsxs("div", { className: "card flex flex-col items-center gap-2 px-6 py-12 text-center", children: [
    /* @__PURE__ */ jsx("span", { className: "icon-tile mb-1", children: /* @__PURE__ */ jsx(Search, { className: "size-5", strokeWidth: 1.75 }) }),
    /* @__PURE__ */ jsx("h3", { className: "text-h3", children: title }),
    /* @__PURE__ */ jsx("p", { className: "max-w-[44ch] text-[15px] text-muted", children: body }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: onClear, className: "mt-2 text-sm font-semibold text-brand hover:underline", children: clearLabel })
  ] });
}
export {
  NoResults as N,
  SearchInput as S
};
