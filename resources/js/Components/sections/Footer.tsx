import { Link, usePage } from "@inertiajs/react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/Components/ui/Section";
import { useLocale } from "@/hooks/useLocale";
import type { SharedProps } from "@/types";

const explore = ["industries", "jobs", "countries", "about", "contact"] as const;
const hrefs: Record<(typeof explore)[number], string> = {
  jobs: "/jobs",
  industries: "/industries",
  countries: "/countries",
  about: "/about",
  contact: "/contact",
};

export function Footer() {
  const { t } = useLocale();
  const { site } = usePage<SharedProps>().props;
  const { contact, licence } = site;
  const heading = "text-[13px] font-semibold text-night-ink";

  return (
    <footer className="night bg-night pt-12 pb-8 text-night-muted">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 text-night-ink">
              <img src="/images/logo.svg" alt="" width={32} height={32} className="size-8" />
              <span className="text-[15px] font-semibold">{site.name}</span>
            </div>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-[22px]">{t("home.footer.tagline")}</p>
            <a href={site.main_site} className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-cta hover:underline">
              {t("home.footer.main_site")} <ArrowUpRight className="size-4" strokeWidth={2} />
            </a>
          </div>

          <nav aria-label={t("home.footer.explore")} className="md:col-span-2">
            <h2 className={heading}>{t("home.footer.explore")}</h2>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {explore.map((k) => (
                <li key={k}>
                  <Link href={hrefs[k]} className="hover:text-night-ink">
                    {t(`home.nav.${k}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className={heading}>{t("home.footer.contact")}</h2>
            <ul className="mt-4 grid gap-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cta" strokeWidth={1.75} />
                <address className="not-italic">{contact.address}</address>
              </li>
              <li>
                <a href={`tel:${contact.phone_href}`} className="flex gap-2.5 hover:text-night-ink">
                  <Phone className="mt-0.5 size-4 shrink-0 text-cta" strokeWidth={1.75} />
                  <span className="tabular-nums">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener" className="flex gap-2.5 hover:text-night-ink">
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-cta" strokeWidth={1.75} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.inquiry_email}`} className="flex gap-2.5 hover:text-night-ink">
                  <Mail className="mt-0.5 size-4 shrink-0 text-cta" strokeWidth={1.75} />
                  {contact.inquiry_email}
                </a>
              </li>
              {contact.hours && (
                <li>
                  {t("home.footer.hours")}: {contact.hours}
                </li>
              )}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className={heading}>{t("home.footer.licence")}</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              {(["rl", "bmet", "baira"] as const).map((key) => {
                const value = { rl: licence.rl_number, bmet: licence.bmet, baira: licence.baira }[key];
                return (
                  <div key={key}>
                    <dt className="text-[13px] text-faint">{t(`home.trust.${key}`)}</dt>
                    <dd className="text-night-ink">{value ?? t("home.footer.pending")}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-night-line pt-6 text-[13px] sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t("home.footer.rights")}
          </p>
          <span className="text-night-ink">EN</span>
        </div>
      </Container>
    </footer>
  );
}
