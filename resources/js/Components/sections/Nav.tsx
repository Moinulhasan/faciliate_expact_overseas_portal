import { Link, usePage } from "@inertiajs/react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { ButtonAnchor } from "@/Components/ui/Button";
// import { ButtonLink } from "@/Components/ui/Button"; // restore with the commented-out "Apply now" buttons below
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

// Floating dark pill, measured from facilitatexpat.com: rgba(6,18,13,.9), 1px rgba(115,191,68,.22), 6px inset.
export function Nav() {
  const { t } = useLocale();
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
      {/* Measured 1:1 from facilitatexpat.com nav.nav: fixed top 12px, centred, content-width (max 100%-24px),
          54px tall, padding 6/6/6/16, gap 16, blur(16px) saturate(1.5), no shadow; links collapse ≤1000px. */}
      <nav
        aria-label="Primary"
        // Desktop width = main site's bar (~720px); we have fewer items, so links spread across the middle.
        className="fixed top-3 left-1/2 z-50 flex w-max max-w-[calc(100%-24px)] -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-cta/[0.22] bg-night/90 py-1.5 pr-1.5 pl-4 text-night-ink backdrop-blur-[16px] backdrop-saturate-150 min-[1001px]:w-[720px]"
      >
        <Link href="/" aria-label={`${site.name} — home`} className="inline-flex size-10 shrink-0 items-center justify-center rounded-full p-0.5">
          <img src="/images/logo.svg" alt="" width={36} height={36} className="size-9" />
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-1 min-[1001px]:flex">
          {links.map((l) => {
            const active = current.startsWith(l.href);
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

        <div className="flex items-center gap-1">
        {/* Primary CTA: Call now (replaces Apply now — kept below, commented out). Main-site .btn--sm: 40px, 6×16, 14/600. */}
        <ButtonAnchor href={`tel:${site.contact.phone_href}`} size="sm">
          <Phone strokeWidth={2} /> {t("home.nav.call_now")}
        </ButtonAnchor>
        {/*
        <a
          href={`tel:${site.contact.phone_href}`}
          className="hidden h-9 items-center rounded-full px-3 text-sm font-semibold text-night-ink hover:bg-white/[0.08] xl:inline-flex"
        >
          {t("home.nav.call")}
        </a>
        <ButtonLink href="/apply" size="sm" className="hidden sm:inline-flex">
          {t("home.nav.apply")}
        </ButtonLink>
        */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-grid size-10 place-items-center rounded-full hover:bg-white/[0.08] min-[1001px]:hidden"
        >
          <Menu className="size-5" strokeWidth={1.75} />
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
            className="night-glow fixed inset-0 z-50 flex flex-col px-5 pt-5 pb-8 text-night-ink min-[1001px]:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: dur.md, ease: ease.out }}
          >
            <div className="flex justify-end">
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
            <ul className="mt-4 divide-y divide-night-line">
              {links.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-4 text-2xl font-semibold tracking-[-0.02em]">
                    {t(`home.nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto grid gap-3">
              {/*
              <ButtonLink href="/apply" size="lg" onClick={() => setOpen(false)}>
                {t("home.nav.apply")}
              </ButtonLink>
              */}
              <ButtonAnchor href={`tel:${site.contact.phone_href}`} size="lg">
                <Phone strokeWidth={2} /> {t("home.nav.call_now")}
              </ButtonAnchor>
              <ButtonAnchor href={wa} target="_blank" rel="noopener" variant="quiet" size="lg">
                <MessageCircle strokeWidth={1.75} /> WhatsApp
              </ButtonAnchor>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
