import { usePage } from "@inertiajs/react";
import { MessageCircle, Phone } from "lucide-react";
import { ButtonAnchor } from "@/Components/ui/Button";
import { Link } from "@/Components/ui/Link";
import { Container, Heading } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { SharedProps } from "@/types";

// One main action (UX audit): WhatsApp — how workers actually contact agencies. Call / inquiry are quiet links.
// Aurora shader (M2) goes behind this in phase 6.
// `tone` = background of the section above, so the CTA card continues it instead of starting a new band.
export function FinalCta({ tone = "bg" }: { tone?: "bg" | "alt" }) {
  const { t } = useLocale();
  const { site } = usePage<SharedProps>().props;

  return (
    <section className={tone === "alt" ? "bg-surface-2 pb-12 md:pb-14" : "bg-bg pb-12 md:pb-14"}>
      <Container>
        <div className="night night-glow relative isolate overflow-hidden rounded-(--radius-panel) border border-night-line px-5 py-10 text-night-ink md:px-12 md:py-14">
          <div aria-hidden className="night-dots pointer-events-none absolute inset-0 -z-10" />
          <Heading a={t("home.final.title_a")} b={t("home.final.title_b")} className="text-display max-w-[14ch]" />
          <p className="mt-4 max-w-[46ch] text-lead text-night-muted">{t("home.final.lead")}</p>
          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ButtonAnchor href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener" size="lg" className="w-full sm:w-auto">
              <MessageCircle /> {t("home.final.whatsapp")}
            </ButtonAnchor>
            <a href={`tel:${site.contact.phone_href}`} className="inline-flex items-center gap-2 text-base font-semibold hover:underline">
              <Phone className="size-4 text-cta" strokeWidth={2} /> {site.contact.phone}
            </a>
            <Link href="/contact" className="text-base font-semibold text-night-muted underline-offset-4 hover:text-night-ink hover:underline">
              {t("home.final.inquiry")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
