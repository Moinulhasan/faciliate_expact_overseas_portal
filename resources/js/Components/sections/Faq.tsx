import { usePage } from "@inertiajs/react";
import { MessageCircle, Plus } from "lucide-react";
import { ButtonAnchor } from "@/Components/ui/Button";
import { Container, Heading, Section } from "@/Components/ui/Section";
import type { Faq as FaqItem, SharedProps } from "@/types";

// Main-site FAQ: white items, 18px radius, line border → brand border when open. Native <details> = works without JS.
// FAQPage JSON-LD is emitted by the page via faqLd() with the same items.
export function Faq({
  title,
  lead,
  items,
  tone = "bg",
}: {
  title: string;
  lead?: string;
  items: FaqItem[];
  tone?: "bg" | "alt";
}) {
  const { site } = usePage<SharedProps>().props;
  if (!items.length) return null;

  return (
    <Section tone={tone}>
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col items-start gap-3">
          <Heading a={title} />
          {lead && <p className="text-lead text-muted">{lead}</p>}
          <ButtonAnchor href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener" variant="ghost" className="mt-3">
            <MessageCircle /> WhatsApp
          </ButtonAnchor>
        </div>
        <div className="grid gap-2.5">
          {items.map((it, i) => (
            <details
              key={it.q}
              open={i === 0}
              className="group rounded-(--radius-item) border border-line bg-surface transition-colors open:border-brand"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
                {it.q}
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-brand transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white">
                  <Plus className="size-3.5" strokeWidth={2.5} />
                </span>
              </summary>
              <p className="max-w-[62ch] px-5 pb-5 text-[15px] leading-[22px] text-muted">{it.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
