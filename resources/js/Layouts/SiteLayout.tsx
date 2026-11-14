import { usePage } from "@inertiajs/react";
import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Footer } from "@/Components/sections/Footer";
import { Nav } from "@/Components/sections/Nav";
import { useLocale } from "@/hooks/useLocale";
import type { SharedProps } from "@/types";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  const { site } = usePage<SharedProps>().props;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      {/* Labelled WhatsApp button (UX audit: an unlabelled bubble reads as decoration; WhatsApp is the main channel). */}
      <a
        href={`https://wa.me/${site.contact.whatsapp}`}
        target="_blank"
        rel="noopener"
        className="fixed right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--color-brand-hi),var(--color-brand-lo))] pr-5 pl-4 text-base font-semibold text-white shadow-(--shadow-cta) ring-4 ring-brand/15 transition-transform duration-500 ease-(--ease-out) hover:-translate-y-0.5"
      >
        <MessageCircle className="size-5" strokeWidth={2} />
        {t("home.nav.whatsapp_short")}
      </a>
    </>
  );
}
