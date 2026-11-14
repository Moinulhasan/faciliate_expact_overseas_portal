import { usePage } from "@inertiajs/react";
import { Globe, Menu, MessageCircle, Phone, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { ButtonAnchor } from "@/Components/ui/Button";
// import { ButtonLink } from "@/Components/ui/Button"; // restore with the commented-out "Apply now" buttons below
import { Link } from "@/Components/ui/Link";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/cn";
import { dur, ease } from "@/lib/motion";
import type { SharedProps } from "@/types";

// Order set by owner (11 Nov 2026). Hidden items kept commented out — pages still exist, re-enable when needed.
const links = [
  { key: "industries", href: "/industries" },
  { key: "jobs", href: "/jobs" },
  { key: "countries", href: "/countries" },
  { key: "about", href: "/about" },
  // { key: "work_abroad", href: "/work-abroad" },
  // { key: "employers", href: "/employers" },
];

// Logo + wordmark (UX audit: first-time visitors need the company name, not just the mark).
function Brand({ name }: { name: string }) {
  const { t } = useLocale();
  return (
    <Link href="/" aria-label={`${name} — home`} className="flex min-w-0 items-center gap-2.5 rounded-full pr-1">
      <img src="/images/logo.svg" alt="" width={36} height={36} className="size-9 shrink-0" />
      <span className="min-w-0 leading-[1.1]">
        <span className="block truncate text-[15px] font-semibold tracking-[-0.01em]">{t("home.nav.brand")}</span>
        <span className="block text-sm text-night-muted">{t("home.nav.brand_sub")}</span>
      </span>
    </Link>
  );
}

// Full page load (not an Inertia visit) so <html lang> switches too — screen readers rely on it.
// Placement (owner, 14 Nov 2026): footer on desktop, nav bar on mobile/tablet (≤1000px).
// `compact`: icon-only on small phones (≤420px), like the Call button, so the menu toggle still fits.
export function LangSwitch({ className, compact }: { className?: string; compact?: boolean }) {
  const { locale, t } = useLocale();
  const { alternates } = usePage<SharedProps>().props;
  const to = locale === "bn" ? "en" : "bn";
  return (
    <a
      href={alternates[to]}
      hrefLang={to}
      lang={to}
      className={cn("inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-night-ink hover:bg-white/[0.08]", className)}
    >
      <Globe className="size-4 shrink-0 text-cta" strokeWidth={1.75} />
      <span className={compact ? "max-[420px]:sr-only" : undefined}>{t("home.nav.switch_lang")}</span>
    </a>
  );
}

// Floating dark pill, measured from facilitatexpat.com nav.nav (fixed top 12px, 54px, padding 6/6/6/16, gap 16,
// blur(16px) saturate(1.5)); links collapse ≤1000px. On phones the bar spans the width so it is easy to read and tap.
export function Nav() {
  const { t, path } = useLocale();
  const page = usePage<SharedProps>();
  const { site } = page.props;
  const current = page.url;
  const [open, setOpen] = useState(false);
  const wa = `https://wa.me/${site.contact.whatsapp}`;

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="night">
      <nav
        aria-label="Primary"
        className="fixed top-3 left-1/2 z-50 flex w-[calc(100%-24px)] -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-cta/[0.22] bg-night/90 py-1.5 pr-1.5 pl-3 text-night-ink backdrop-blur-[16px] backdrop-saturate-150 min-[1001px]:w-max min-[1001px]:max-w-[calc(100%-24px)] min-[1001px]:min-w-[720px] min-[1001px]:gap-4 min-[1001px]:pl-4"
      >
        <Brand name={site.name} />

        <ul className="hidden flex-1 items-center justify-center gap-1 min-[1001px]:flex">
          {links.map((l) => {
            const href = path(l.href);
            const active = current === href || current.startsWith(`${href}/`) || current.startsWith(`${href}?`);
            return (
              <li key={l.key}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    active ? "bg-white/[0.08] text-night-ink" : "text-night-muted hover:text-night-ink",
                  )}
                >
                  {t(`home.nav.${l.key}`)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-1">
          <LangSwitch compact className="px-2.5 max-[420px]:size-11 max-[420px]:justify-center max-[420px]:p-0 min-[1001px]:hidden" />
          {/* Primary CTA: Call now (replaces Apply now — kept below, commented out). Icon-only on small phones. */}
          <ButtonAnchor href={`tel:${site.contact.phone_href}`} size="sm" aria-label={t("home.nav.call_now")} className="max-[420px]:size-11 max-[420px]:p-0">
            <Phone strokeWidth={2} /> <span className="max-[420px]:sr-only">{t("home.nav.call_now")}</span>
          </ButtonAnchor>
          {/*
          <ButtonLink href="/apply" size="sm" className="hidden sm:inline-flex">
            {t("home.nav.apply")}
          </ButtonLink>
          */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-grid size-11 place-items-center rounded-full hover:bg-white/[0.08] min-[1001px]:hidden"
          >
            <Menu className="size-6" strokeWidth={1.75} />
            <span className="sr-only">{t("home.nav.menu")}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t("home.nav.menu")}
            className="night-glow fixed inset-0 z-50 flex flex-col overflow-y-auto px-5 pt-4 pb-8 text-night-ink min-[1001px]:hidden"
            data-lenis-prevent
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: dur.md, ease: ease.out }}
          >
            <div className="flex items-center justify-between gap-3">
              <Brand name={site.name} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-12 items-center justify-center rounded-full hover:bg-white/[0.08]"
                autoFocus
              >
                <X className="size-6" strokeWidth={1.75} />
                <span className="sr-only">{t("home.nav.close")}</span>
              </button>
            </div>
            <ul className="mt-6 divide-y divide-night-line border-y border-night-line">
              {links.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center text-2xl font-semibold tracking-[-0.02em]">
                    {t(`home.nav.${l.key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" onClick={() => setOpen(false)} className="flex min-h-16 items-center text-2xl font-semibold tracking-[-0.02em]">
                  {t("home.nav.contact")}
                </Link>
              </li>
            </ul>
            <LangSwitch className="mt-4 self-start px-0 text-base" />
            <div className="mt-auto grid gap-3 pt-8">
              {/*
              <ButtonLink href="/apply" size="lg" onClick={() => setOpen(false)}>
                {t("home.nav.apply")}
              </ButtonLink>
              */}
              <ButtonAnchor href={`tel:${site.contact.phone_href}`} size="lg">
                <Phone strokeWidth={2} /> {t("home.nav.call_now")}
              </ButtonAnchor>
              <ButtonAnchor href={wa} target="_blank" rel="noopener" variant="green" size="lg">
                <MessageCircle strokeWidth={1.75} /> WhatsApp
              </ButtonAnchor>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
