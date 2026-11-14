import { useForm, usePage } from "@inertiajs/react";
import { AlertCircle, CheckCircle2, ChevronDown, MessageCircle } from "lucide-react";
import { useRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Button } from "@/Components/ui/Button";
import { Link } from "@/Components/ui/Link";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/cn";
import type { SharedProps } from "@/types";

type Type = "job" | "employer" | "other";
type Option = { value: string; label: string };
export type FormOptions = { countries: Option[]; trades: Option[] };

const inputCls =
  "w-full rounded-(--radius-tile) border bg-surface px-4 text-base transition-[border-color,box-shadow] outline-none placeholder:text-faint hover:border-brand/50 focus:border-brand focus:shadow-[0_0_0_4px_rgba(28,121,73,.12)]";

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid min-w-0 gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label} {hint && <span className="font-normal text-faint">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle className="size-4 shrink-0" strokeWidth={2} /> {error}
        </p>
      )}
    </div>
  );
}

const aria = (id: string, error?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

function Input({ id, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string }) {
  return <input id={id} name={id} {...aria(id, error)} className={cn(inputCls, "h-12", error ? "border-danger" : "border-line")} {...props} />;
}

function Select({ id, value, onChange, options, placeholder }: { id: string; value: string; onChange: (v: string) => void; options: Option[]; placeholder: string }) {
  return (
    <div className="relative">
      <select id={id} name={id} value={value} onChange={(e) => onChange(e.target.value)} className={cn(inputCls, "h-12 cursor-pointer appearance-none border-line pr-10", !value && "text-faint")}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-faint" />
    </div>
  );
}

// Posts to /inquiries → saved in DB + emailed to config('site.contact.inquiry_email').
// WhatsApp/phone is required, email optional (most workers don't use email — UX audit 13 Nov 2026).
export function InquiryForm({ options }: { options: FormOptions }) {
  const { t, path } = useLocale();
  const { url } = usePage<SharedProps>();
  const initialType = (new URLSearchParams(url.split("?")[1] ?? "").get("type") as Type) || "job";
  const [sent, setSent] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const form = useForm({
    type: (["job", "employer", "other"].includes(initialType) ? initialType : "job") as Type,
    name: "",
    phone: "",
    email: "",
    company: "",
    country: "",
    trade: "",
    message: "",
    consent: false,
    page: "",
    website: "",
  });
  const e = form.errors as Partial<Record<string, string>>;
  type Key = "name" | "phone" | "email" | "company" | "country" | "trade" | "message" | "website";
  // Editing a field clears its own error (focus is never moved while typing).
  const set = (k: Key, v: string) => {
    form.setData(k, v);
    if (form.errors[k]) form.clearErrors(k);
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    form.transform((d) => ({ ...d, page: url.split("?")[0] }));
    form.post(path("/inquiries"), {
      preserveScroll: true,
      onError: () => requestAnimationFrame(() => summary.current?.focus()),
      onSuccess: (p) => {
        if ((p.props as unknown as SharedProps).flash?.inquiry_sent) {
          setSent(true);
          form.reset();
        }
      },
    });
  };

  if (sent) {
    return (
      <div className="card flex flex-col items-start gap-3 p-7" role="status">
        <span className="icon-tile">
          <CheckCircle2 className="size-5" strokeWidth={1.75} />
        </span>
        <h3 className="text-[22px] leading-7 font-semibold tracking-[-0.02em]">{t("contact.sent_title")}</h3>
        <p className="max-w-[52ch] text-base text-muted">{t("contact.sent_body")}</p>
        <button type="button" onClick={() => setSent(false)} className="mt-1 text-sm font-semibold text-brand hover:underline">
          {t("contact.send_another")}
        </button>
      </div>
    );
  }

  const types: Type[] = ["job", "employer", "other"];

  return (
    <form onSubmit={submit} noValidate className="card relative grid gap-4 p-5 md:p-7">
      {Object.keys(form.errors).length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="flex items-center gap-2 rounded-xl bg-danger/[0.07] px-4 py-3 text-sm text-danger outline-none">
          <AlertCircle className="size-4 shrink-0" strokeWidth={2} /> {e.form ?? t("contact.error_summary")}
        </div>
      )}

      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold">{t("contact.form.type")}</legend>
        <div className="flex flex-wrap gap-2">
          {types.map((ty) => (
            <label
              key={ty}
              className={cn(
                "inline-flex h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                form.data.type === ty ? "border-brand bg-brand text-white" : "border-line bg-surface text-muted hover:border-brand hover:text-ink",
              )}
            >
              <input type="radio" name="type" value={ty} checked={form.data.type === ty} onChange={() => form.setData("type", ty)} className="sr-only" />
              {t(`contact.form.types.${ty}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label={t("contact.form.name")} error={e.name}>
          <Input id="name" autoComplete="name" value={form.data.name} onChange={(ev) => set("name", ev.target.value)} error={e.name} />
        </Field>
        <Field id="phone" label={t("contact.form.phone")} error={e.phone}>
          <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" value={form.data.phone} onChange={(ev) => set("phone", ev.target.value)} error={e.phone} />
        </Field>
        <Field id="country" label={t("contact.form.country")} hint={t("contact.form.optional")} error={e.country}>
          <Select id="country" value={form.data.country} onChange={(v) => set("country", v)} options={options.countries} placeholder={t("contact.form.any")} />
        </Field>
        <Field id="trade" label={t("contact.form.trade")} hint={t("contact.form.optional")} error={e.trade}>
          <Select id="trade" value={form.data.trade} onChange={(v) => set("trade", v)} options={options.trades} placeholder={t("contact.form.any")} />
        </Field>
        <Field id="email" label={t("contact.form.email")} hint={t("contact.form.optional")} error={e.email}>
          <Input id="email" type="email" inputMode="email" autoComplete="email" value={form.data.email} onChange={(ev) => set("email", ev.target.value)} error={e.email} />
        </Field>
        {form.data.type === "employer" && (
          <Field id="company" label={t("contact.form.company")} hint={t("contact.form.optional")} error={e.company}>
            <Input id="company" autoComplete="organization" value={form.data.company} onChange={(ev) => set("company", ev.target.value)} error={e.company} />
          </Field>
        )}
      </div>

      <Field id="message" label={t("contact.form.message")} error={e.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder={t(`contact.form.message_placeholder.${form.data.type}`)}
          value={form.data.message}
          onChange={(ev) => set("message", ev.target.value)}
          {...aria("message", e.message)}
          className={cn(inputCls, "resize-y py-3 leading-6", e.message ? "border-danger" : "border-line")}
        />
      </Field>

      <div className="grid gap-1.5">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-muted">
          <input
            type="checkbox"
            name="consent"
            checked={form.data.consent}
            onChange={(ev) => {
              form.setData("consent", ev.target.checked);
              if (form.errors.consent) form.clearErrors("consent");
            }}
            {...aria("consent", e.consent)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--color-brand)]"
          />
          <span>
            {t("contact.form.consent")}{" "}
            <Link href="/privacy" className="font-semibold text-brand underline-offset-2 hover:underline">
              {t("contact.form.privacy_link")}
            </Link>
            .
          </span>
        </label>
        {e.consent && (
          <p id="consent-error" className="flex items-center gap-1.5 text-sm text-danger">
            <AlertCircle className="size-4 shrink-0" strokeWidth={2} /> {e.consent}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people and screen readers; bots fill it and get rejected. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.data.website} onChange={(ev) => set("website", ev.target.value)} />
      </div>

      <Button type="submit" size="lg" disabled={form.processing} className="w-full sm:w-auto sm:justify-self-end">
        <MessageCircle /> {form.processing ? t("contact.form.sending") : t("contact.form.submit")}
      </Button>
    </form>
  );
}
