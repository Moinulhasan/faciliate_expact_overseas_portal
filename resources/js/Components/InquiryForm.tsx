import { useForm, usePage } from "@inertiajs/react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useEffect, useRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Button } from "@/Components/ui/Button";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/cn";
import type { SharedProps } from "@/types";

type Type = "job" | "employer" | "other";

const inputCls =
  "w-full rounded-(--radius-tile) border bg-surface px-4 text-[15px] transition-[border-color,box-shadow] outline-none placeholder:text-faint hover:border-brand/50 focus:border-brand focus:shadow-[0_0_0_4px_rgba(28,121,73,.12)]";

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold">
        {label} {hint && <span className="font-normal text-faint">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-[13px] text-danger">
          <AlertCircle className="size-3.5 shrink-0" strokeWidth={2} /> {error}
        </p>
      )}
    </div>
  );
}

function Input({ id, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string }) {
  return (
    <input
      id={id}
      name={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(inputCls, "h-12", error ? "border-danger" : "border-line")}
      {...props}
    />
  );
}

// Posts to /inquiries → saved in DB + emailed to config('site.contact.inquiry_email').
export function InquiryForm({ defaultType = "job" }: { defaultType?: Type }) {
  const { t } = useLocale();
  const { url } = usePage<SharedProps>();
  const [sent, setSent] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const form = useForm({ type: defaultType as Type, name: "", email: "", phone: "", company: "", message: "", page: "", website: "" });
  const e = form.errors as Partial<Record<string, string>>;
  type Key = "name" | "email" | "phone" | "company" | "message" | "website";
  // Editing a field clears its error (and the summary once nothing is left).
  const set = (k: Key, v: string) => {
    form.setData(k, v);
    if (form.errors[k]) form.clearErrors(k, "form" as Key);
  };

  useEffect(() => {
    if (Object.keys(form.errors).length) summary.current?.focus();
  }, [form.errors]);

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    form.transform((d) => ({ ...d, page: url.split("?")[0] }));
    form.post("/inquiries", {
      preserveScroll: true,
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
        <p className="max-w-[52ch] text-[15px] text-muted">{t("contact.sent_body")}</p>
        <button type="button" onClick={() => setSent(false)} className="mt-1 text-sm font-semibold text-brand hover:underline">
          {t("contact.send_another")}
        </button>
      </div>
    );
  }

  const types: Type[] = ["job", "employer", "other"];

  return (
    <form onSubmit={submit} noValidate className="card grid gap-4 p-5 md:p-7">
      {Object.keys(form.errors).length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="flex items-center gap-2 rounded-xl bg-danger/[0.07] px-4 py-3 text-[14px] text-danger outline-none">
          <AlertCircle className="size-4 shrink-0" strokeWidth={2} /> {e.form ?? t("contact.error_summary")}
        </div>
      )}

      <fieldset>
        <legend className="mb-1.5 text-[13px] font-semibold">{t("contact.form.type")}</legend>
        <div className="flex flex-wrap gap-2">
          {types.map((ty) => (
            <label
              key={ty}
              className={cn(
                "inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
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
        <Field id="email" label={t("contact.form.email")} error={e.email}>
          <Input id="email" type="email" inputMode="email" autoComplete="email" value={form.data.email} onChange={(ev) => set("email", ev.target.value)} error={e.email} />
        </Field>
        <Field id="phone" label={t("contact.form.phone")} hint={t("contact.form.optional")} error={e.phone}>
          <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+880" value={form.data.phone} onChange={(ev) => set("phone", ev.target.value)} error={e.phone} />
        </Field>
        {form.data.type === "employer" ? (
          <Field id="company" label={t("contact.form.company")} hint={t("contact.form.optional")} error={e.company}>
            <Input id="company" autoComplete="organization" value={form.data.company} onChange={(ev) => set("company", ev.target.value)} error={e.company} />
          </Field>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      <Field id="message" label={t("contact.form.message")} error={e.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          placeholder={t(`contact.form.message_placeholder.${form.data.type}`)}
          value={form.data.message}
          onChange={(ev) => set("message", ev.target.value)}
          aria-invalid={e.message ? true : undefined}
          aria-describedby={e.message ? "message-error" : undefined}
          className={cn(inputCls, "resize-y py-3 leading-6", e.message ? "border-danger" : "border-line")}
        />
      </Field>

      {/* Honeypot — hidden from people and screen readers; bots fill it and get rejected. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.data.website} onChange={(ev) => set("website", ev.target.value)} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-faint">{t("contact.form.privacy")}</p>
        <Button type="submit" size="lg" disabled={form.processing} className="shrink-0">
          <Send /> {form.processing ? t("contact.form.sending") : t("contact.form.submit")}
        </Button>
      </div>
    </form>
  );
}
