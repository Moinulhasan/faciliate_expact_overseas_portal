import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

// Compact pill search. Result count sits inside the field (no extra line). "/" focuses it; Esc clears.
export function SearchInput({
  value,
  onChange,
  label,
  placeholder,
  resultsText,
  count,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder: string;
  resultsText: string; // announced to screen readers
  count?: string; // short visible badge, e.g. "3/16"
  className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={cn("group relative w-full", className)}>
      <label className="sr-only" htmlFor="page-search">
        {label}
      </label>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-faint group-focus-within:text-brand" strokeWidth={2} />
      <input
        ref={ref}
        id="page-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onChange("")}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        className="h-10 w-full rounded-full border border-line bg-surface pr-20 pl-10 text-sm transition-[border-color,box-shadow] outline-none placeholder:text-faint hover:border-brand/50 focus:border-brand focus:shadow-[0_0_0_4px_rgba(28,121,73,.12)] [&::-webkit-search-cancel-button]:hidden"
      />
      <div className="absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-1">
        {value ? (
          <>
            {count && <span className="text-xs text-faint tabular-nums">{count}</span>}
            <button
              type="button"
              onClick={() => {
                onChange("");
                ref.current?.focus();
              }}
              className="inline-flex size-7 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"
            >
              <X className="size-3.5" strokeWidth={2.25} />
              <span className="sr-only">Clear search</span>
            </button>
          </>
        ) : (
          <kbd aria-hidden className="mr-1.5 hidden rounded-md border border-line px-1.5 text-xs leading-5 text-faint sm:inline">
            /
          </kbd>
        )}
      </div>
      <span aria-live="polite" className="sr-only">
        {resultsText}
      </span>
    </div>
  );
}

export function NoResults({ title, body, onClear, clearLabel }: { title: string; body: string; onClear: () => void; clearLabel: string }) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-12 text-center">
      <span className="icon-tile mb-1">
        <Search className="size-5" strokeWidth={1.75} />
      </span>
      <h3 className="text-h3">{title}</h3>
      <p className="max-w-[44ch] text-[15px] text-muted">{body}</p>
      <button type="button" onClick={onClear} className="mt-2 text-sm font-semibold text-brand hover:underline">
        {clearLabel}
      </button>
    </div>
  );
}
