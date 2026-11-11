import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage, useForm } from "@inertiajs/react";
import { CheckCircle2, AlertCircle, Send, Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { u as useLocale, g as cn, j as Button, c as Section, C as Container, d as SectionHead } from "./SiteLayout-hZjGrTmB.js";
const inputCls = "w-full rounded-(--radius-tile) border bg-surface px-4 text-[15px] transition-[border-color,box-shadow] outline-none placeholder:text-faint hover:border-brand/50 focus:border-brand focus:shadow-[0_0_0_4px_rgba(28,121,73,.12)]";
function Field({ id, label, hint, error, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxs("label", { htmlFor: id, className: "text-[13px] font-semibold", children: [
      label,
      " ",
      hint && /* @__PURE__ */ jsxs("span", { className: "font-normal text-faint", children: [
        "(",
        hint,
        ")"
      ] })
    ] }),
    children,
    error && /* @__PURE__ */ jsxs("p", { id: `${id}-error`, className: "flex items-center gap-1.5 text-[13px] text-danger", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "size-3.5 shrink-0", strokeWidth: 2 }),
      " ",
      error
    ] })
  ] });
}
function Input({ id, error, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      id,
      name: id,
      "aria-invalid": error ? true : void 0,
      "aria-describedby": error ? `${id}-error` : void 0,
      className: cn(inputCls, "h-12", error ? "border-danger" : "border-line"),
      ...props
    }
  );
}
function InquiryForm({ defaultType = "job" }) {
  const { t } = useLocale();
  const { url } = usePage();
  const [sent, setSent] = useState(false);
  const summary = useRef(null);
  const form = useForm({ type: defaultType, name: "", email: "", phone: "", company: "", message: "", page: "", website: "" });
  const e = form.errors;
  const set = (k, v) => {
    form.setData(k, v);
    if (form.errors[k]) form.clearErrors(k, "form");
  };
  useEffect(() => {
    if (Object.keys(form.errors).length) summary.current?.focus();
  }, [form.errors]);
  const submit = (ev) => {
    ev.preventDefault();
    form.transform((d) => ({ ...d, page: url.split("?")[0] }));
    form.post("/inquiries", {
      preserveScroll: true,
      onSuccess: (p) => {
        if (p.props.flash?.inquiry_sent) {
          setSent(true);
          form.reset();
        }
      }
    });
  };
  if (sent) {
    return /* @__PURE__ */ jsxs("div", { className: "card flex flex-col items-start gap-3 p-7", role: "status", children: [
      /* @__PURE__ */ jsx("span", { className: "icon-tile", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "size-5", strokeWidth: 1.75 }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-[22px] leading-7 font-semibold tracking-[-0.02em]", children: t("contact.sent_title") }),
      /* @__PURE__ */ jsx("p", { className: "max-w-[52ch] text-[15px] text-muted", children: t("contact.sent_body") }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSent(false), className: "mt-1 text-sm font-semibold text-brand hover:underline", children: t("contact.send_another") })
    ] });
  }
  const types = ["job", "employer", "other"];
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, noValidate: true, className: "card grid gap-4 p-5 md:p-7", children: [
    Object.keys(form.errors).length > 0 && /* @__PURE__ */ jsxs("div", { ref: summary, tabIndex: -1, role: "alert", className: "flex items-center gap-2 rounded-xl bg-danger/[0.07] px-4 py-3 text-[14px] text-danger outline-none", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "size-4 shrink-0", strokeWidth: 2 }),
      " ",
      e.form ?? t("contact.error_summary")
    ] }),
    /* @__PURE__ */ jsxs("fieldset", { children: [
      /* @__PURE__ */ jsx("legend", { className: "mb-1.5 text-[13px] font-semibold", children: t("contact.form.type") }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: types.map((ty) => /* @__PURE__ */ jsxs(
        "label",
        {
          className: cn(
            "inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
            form.data.type === ty ? "border-brand bg-brand text-white" : "border-line bg-surface text-muted hover:border-brand hover:text-ink"
          ),
          children: [
            /* @__PURE__ */ jsx("input", { type: "radio", name: "type", value: ty, checked: form.data.type === ty, onChange: () => form.setData("type", ty), className: "sr-only" }),
            t(`contact.form.types.${ty}`)
          ]
        },
        ty
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Field, { id: "name", label: t("contact.form.name"), error: e.name, children: /* @__PURE__ */ jsx(Input, { id: "name", autoComplete: "name", value: form.data.name, onChange: (ev) => set("name", ev.target.value), error: e.name }) }),
      /* @__PURE__ */ jsx(Field, { id: "email", label: t("contact.form.email"), error: e.email, children: /* @__PURE__ */ jsx(Input, { id: "email", type: "email", inputMode: "email", autoComplete: "email", value: form.data.email, onChange: (ev) => set("email", ev.target.value), error: e.email }) }),
      /* @__PURE__ */ jsx(Field, { id: "phone", label: t("contact.form.phone"), hint: t("contact.form.optional"), error: e.phone, children: /* @__PURE__ */ jsx(Input, { id: "phone", type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "+880", value: form.data.phone, onChange: (ev) => set("phone", ev.target.value), error: e.phone }) }),
      form.data.type === "employer" ? /* @__PURE__ */ jsx(Field, { id: "company", label: t("contact.form.company"), hint: t("contact.form.optional"), error: e.company, children: /* @__PURE__ */ jsx(Input, { id: "company", autoComplete: "organization", value: form.data.company, onChange: (ev) => set("company", ev.target.value), error: e.company }) }) : /* @__PURE__ */ jsx("div", { className: "hidden sm:block" })
    ] }),
    /* @__PURE__ */ jsx(Field, { id: "message", label: t("contact.form.message"), error: e.message, children: /* @__PURE__ */ jsx(
      "textarea",
      {
        id: "message",
        name: "message",
        rows: 5,
        maxLength: 2e3,
        placeholder: t(`contact.form.message_placeholder.${form.data.type}`),
        value: form.data.message,
        onChange: (ev) => set("message", ev.target.value),
        "aria-invalid": e.message ? true : void 0,
        "aria-describedby": e.message ? "message-error" : void 0,
        className: cn(inputCls, "resize-y py-3 leading-6", e.message ? "border-danger" : "border-line")
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { "aria-hidden": true, className: "absolute -left-[9999px] h-0 w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "website", children: "Website" }),
      /* @__PURE__ */ jsx("input", { id: "website", name: "website", tabIndex: -1, autoComplete: "off", value: form.data.website, onChange: (ev) => set("website", ev.target.value) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[13px] text-faint", children: t("contact.form.privacy") }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", size: "lg", disabled: form.processing, className: "shrink-0", children: [
        /* @__PURE__ */ jsx(Send, {}),
        " ",
        form.processing ? t("contact.form.sending") : t("contact.form.submit")
      ] })
    ] })
  ] });
}
function ContactSection({ tone = "bg", id = "inquiry" }) {
  const { t } = useLocale();
  const { site } = usePage().props;
  const c = site.contact;
  const rows = [
    { Icon: Phone, label: t("contact.phone_label"), value: c.phone, href: `tel:${c.phone_href}` },
    { Icon: MessageCircle, label: t("contact.whatsapp_label"), value: c.phone, href: `https://wa.me/${c.whatsapp}`, external: true },
    { Icon: MapPin, label: t("contact.office_label"), value: c.address }
  ];
  return /* @__PURE__ */ jsx(Section, { tone, id, className: "scroll-mt-20", children: /* @__PURE__ */ jsxs(Container, { className: "grid gap-8 lg:grid-cols-[0.8fr_1.2fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(SectionHead, { title: t("contact.section_title"), lead: t("contact.section_lead") }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `mailto:${c.inquiry_email}`,
          className: "night night-glow group flex items-center gap-4 rounded-(--radius-card) border border-night-line p-5 text-night-ink",
          children: [
            /* @__PURE__ */ jsx("span", { className: "inline-flex size-12 shrink-0 items-center justify-center rounded-(--radius-tile) bg-cta/[0.14] text-cta", children: /* @__PURE__ */ jsx(Mail, { className: "size-5", strokeWidth: 1.75 }) }),
            /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("span", { className: "block text-[13px] text-night-muted", children: t("contact.email_label") }),
              /* @__PURE__ */ jsx("span", { className: "block truncate text-[19px] leading-7 font-semibold tracking-[-0.01em] group-hover:text-cta", children: c.inquiry_email }),
              /* @__PURE__ */ jsx("span", { className: "block text-[12px] text-night-muted", children: t("contact.email_note") })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("ul", { className: "mt-3 grid gap-2", children: rows.map(({ Icon, label, value, href, external }) => {
        const body = /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "icon-tile size-10", children: /* @__PURE__ */ jsx(Icon, { className: "size-[18px]", strokeWidth: 1.75 }) }),
          /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("span", { className: "block text-[12px] text-faint", children: label }),
            /* @__PURE__ */ jsx("span", { className: "block text-[15px] font-medium", children: value })
          ] })
        ] });
        return /* @__PURE__ */ jsx("li", { children: href ? /* @__PURE__ */ jsx("a", { href, ...external && { target: "_blank", rel: "noopener" }, className: "flex items-center gap-3 rounded-(--radius-item) border border-line bg-surface p-3 transition-colors hover:border-brand", children: body }) : /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 rounded-(--radius-item) border border-line bg-surface p-3", children: body }) }, label);
      }) })
    ] }),
    /* @__PURE__ */ jsx(InquiryForm, {})
  ] }) });
}
export {
  ContactSection as C
};
