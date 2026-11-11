import { usePage } from "@inertiajs/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/Components/ui/Button";
import { Container, Heading } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { SharedProps } from "@/types";

// Aurora shader (M2) goes behind this in phase 6.
// `tone` = background of the section above, so the CTA card continues it instead of starting a new band.
export function FinalCta({ tone = "bg" }: { tone?: "bg" | "alt" }) {
  const { t } = useLocale();
  const { site } = usePage<SharedProps>().props;

  return (
    <section className={tone === "alt" ? "bg-surface-2 pb-12 md:pb-14" : "bg-bg pb-12 md:pb-14"}>
      <Container>
        <div className="night night-glow relative isolate overflow-hidden rounded-(--radius-panel) border border-night-line px-6 py-10 text-night-ink md:px-12 md:py-14">
          <div aria-hidden className="night-dots pointer-events-none absolute inset-0 -z-10" />
          <Heading a={t("home.final.title_a")} b={t("home.final.title_b")} className="text-display max-w-[14ch]" />
          <p className="mt-5 max-w-[46ch] text-lead text-night-muted">{t("home.final.lead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/apply" size="lg">
              {t("home.final.apply")} <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/employers/request" size="lg" variant="quiet">
              {t("home.final.employer")}
            </ButtonLink>
            <ButtonAnchor href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener" size="lg" variant="quiet">
              <MessageCircle /> {t("home.final.whatsapp")}
            </ButtonAnchor>
          </div>
        </div>
      </Container>
    </section>
  );
}
