import { usePage } from "@inertiajs/react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { InquiryForm } from "@/Components/InquiryForm";
import { Container, Section, SectionHead } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { SharedProps } from "@/types";

// Contact details (inquiry email shown prominently) + inquiry form. Used on Home and /contact.
export function ContactSection({ tone = "bg", id = "inquiry" }: { tone?: "bg" | "alt"; id?: string }) {
  const { t } = useLocale();
  const { site } = usePage<SharedProps>().props;
  const c = site.contact;

  const rows = [
    { Icon: Phone, label: t("contact.phone_label"), value: c.phone, href: `tel:${c.phone_href}` },
    { Icon: MessageCircle, label: t("contact.whatsapp_label"), value: c.phone, href: `https://wa.me/${c.whatsapp}`, external: true },
    { Icon: MapPin, label: t("contact.office_label"), value: c.address },
  ];

  return (
    <Section tone={tone} id={id} className="scroll-mt-20">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHead title={t("contact.section_title")} lead={t("contact.section_lead")} />

          {/* The inquiry inbox, front and centre */}
          <a
            href={`mailto:${c.inquiry_email}`}
            className="night night-glow group flex items-center gap-4 rounded-(--radius-card) border border-night-line p-5 text-night-ink"
          >
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-(--radius-tile) bg-cta/[0.14] text-cta">
              <Mail className="size-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] text-night-muted">{t("contact.email_label")}</span>
              <span className="block truncate text-[19px] leading-7 font-semibold tracking-[-0.01em] group-hover:text-cta">{c.inquiry_email}</span>
              <span className="block text-[12px] text-night-muted">{t("contact.email_note")}</span>
            </span>
          </a>

          <ul className="mt-3 grid gap-2">
            {rows.map(({ Icon, label, value, href, external }) => {
              const body = (
                <>
                  <span className="icon-tile size-10">
                    <Icon className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] text-faint">{label}</span>
                    <span className="block text-[15px] font-medium">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} {...(external && { target: "_blank", rel: "noopener" })} className="flex items-center gap-3 rounded-(--radius-item) border border-line bg-surface p-3 transition-colors hover:border-brand">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-(--radius-item) border border-line bg-surface p-3">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <InquiryForm />
      </Container>
    </Section>
  );
}
