"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  BUSINESS_TYPES,
  INDIAN_STATES,
  LINES,
  validateLead,
  type Errors,
} from "@/lib/leads";
import { PRODUCTS, getProduct, type Line } from "@/data/products";

type Status = "idle" | "sending" | "done";

function useLead() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function submit(payload: Record<string, unknown>) {
    const { errors: local } = validateLead(payload);
    setErrors(local);
    if (Object.keys(local).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
        return;
      }
      setErrors(data.errors ?? { form: "Something went wrong. Please try again." });
    } catch {
      setErrors({ form: "Network error. Please try again." });
    }
    setStatus("idle");
  }

  return { status, errors, submit };
}

/** Hidden field bots fill in and people never see. */
function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Consent({
  id,
  error,
  text,
  dark,
}: Readonly<{ id: string; error?: string; text: string; dark?: boolean }>) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className={`flex cursor-pointer items-start gap-3 font-mono text-[12px] leading-[1.6] ${dark ? "text-[#C9CFDB]" : "text-muted"}`}>
        <input
          id={id}
          name="consent"
          type="checkbox"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className="mt-[2px] h-5 w-5 flex-none accent-[#020F26]"
        />
        <span>
          {text} See our{" "}
          <Link href="/privacy-policy" className={`underline ${dark ? "text-chalk hover:text-fury" : ""}`}>Privacy Policy</Link>.
        </span>
      </label>
      {error && <p id={`${id}-err`} className="nf-field-error">{error}</p>}
    </div>
  );
}

function FormError({ msg }: Readonly<{ msg?: string }>) {
  if (!msg) return null;
  return <p role="alert" className="nf-field-error mt-3 text-[13px]">{msg}</p>;
}

function Success({ children, dark }: Readonly<{ children: React.ReactNode; dark?: boolean }>) {
  return (
    <div role="status" className={`mt-6 border-2 p-5 font-mono text-[14px] leading-[1.7] ${dark ? "border-chalk text-chalk" : "border-navy bg-white text-carbon"}`}>
      <span aria-hidden="true" className="mr-2 inline-block h-[10px] w-[10px] bg-fury" />
      {children}
    </div>
  );
}

const fd = (form: HTMLFormElement) => Object.fromEntries(new FormData(form).entries());

/* ------------------------------------------------------------- NotifyForm */

/**
 * Inline "Notify me" form: one phone-or-email field. The product slug is
 * captured automatically. Also used for the "Join the garage" signup.
 */
export function NotifyForm({
  product,
  scent,
  dark,
  button = "Notify me",
  buttonTone = "orange",
  placeholder = "PHONE OR EMAIL",
  label = "Phone or email",
  shadow,
  className = "",
}: Readonly<{
  product: string;
  scent?: string;
  dark?: boolean;
  button?: string;
  buttonTone?: "orange" | "navy";
  placeholder?: string;
  label?: string;
  shadow?: boolean;
  className?: string;
}>) {
  const id = useId();
  const { status, errors, submit } = useLead();

  if (status === "done") {
    return <Success dark={dark}>You&apos;re on the list. We&apos;ll message you the day it lands.</Success>;
  }

  return (
    <form
      noValidate
      className={`relative ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        const data = fd(e.currentTarget);
        void submit({ ...data, type: "notify", product, ...(scent ? { scent } : {}), consent: data.consent === "on" });
      }}
    >
      <Honeypot />
      <div
        className={`flex border-2 ${dark ? "border-chalk" : "border-navy bg-white"} ${shadow ? "shadow-[6px_6px_0_#FF5500]" : ""}`}
      >
        <label htmlFor={`${id}-contact`} className="sr-only">{label}</label>
        <input
          id={`${id}-contact`}
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          placeholder={placeholder}
          aria-invalid={errors.contact ? true : undefined}
          aria-describedby={errors.contact ? `${id}-contact-err` : undefined}
          className={`h-[52px] min-w-0 flex-1 border-none bg-transparent px-4 font-mono text-[14px] tracking-[0.1em] outline-none focus-visible:outline-none ${dark ? "text-chalk placeholder:text-[#AEB6C6]" : "text-carbon placeholder:text-muted"}`}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className={`h-[52px] flex-none cursor-pointer border-none px-[22px] font-display text-[18px] font-extrabold italic uppercase disabled:opacity-60 ${buttonTone === "orange" ? "bg-fury text-carbon" : "bg-navy text-chalk"}`}
        >
          {status === "sending" ? "Sending" : button}
        </button>
      </div>
      {errors.contact && <p id={`${id}-contact-err`} className="nf-field-error">{errors.contact}</p>}
      <Consent
        id={`${id}-consent`}
        error={errors.consent}
        dark={dark}
        text="OK to contact me by phone, WhatsApp or email about NightFury launches."
      />
      <FormError msg={errors.form ?? errors.product} />
    </form>
  );
}

/** Notify form on /where-to-buy: product picked from the query string. */
export function NotifyPicker() {
  const params = useSearchParams();
  const fromQuery = params.get("product") ?? "";
  const scent = params.get("scent") ?? undefined;
  const [product, setProduct] = useState(getProduct(fromQuery) ? fromQuery : "newsletter");
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-p`} className="nf-label mb-[10px] block">Product</label>
      <select
        id={`${id}-p`}
        className="nf-input mb-4"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      >
        <option value="newsletter">Any new launch</option>
        {PRODUCTS.map((p) => (
          <option key={p.slug} value={p.slug}>{p.name}</option>
        ))}
      </select>
      <NotifyForm key={product} product={product} scent={product === fromQuery ? scent : undefined} />
    </div>
  );
}

/* -------------------------------------------------------- FindDealerForm */

function Field({
  id, label, error, optional, children,
}: Readonly<{ id: string; label: string; error?: string; optional?: boolean; children: React.ReactNode }>) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="nf-label mb-2 block">
        {label}
        {optional ? <span className="font-medium normal-case tracking-normal"> (optional)</span> : <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="nf-field-error">{error}</p>}
    </div>
  );
}

const inputProps = (id: string, error?: string) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-err` : undefined,
  className: "nf-input",
});

/** "Find a dealer": city plus name and phone, tagged as a customer lead. */
export function FindDealerForm() {
  const city = useSearchParams().get("city")?.slice(0, 60) ?? "";
  const id = useId();
  const { status, errors, submit } = useLead();

  if (status === "done") {
    return <Success>Thanks. We&apos;ll call you with your nearest NightFury dealer within 2 working days.</Success>;
  }

  return (
    <form
      noValidate
      className="relative mt-6 grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = fd(e.currentTarget);
        void submit({ ...data, type: "find-dealer", consent: data.consent === "on" });
      }}
    >
      <Honeypot />
      <Field id={`${id}-city`} label="Your city" error={errors.city}>
        <input {...inputProps(`${id}-city`, errors.city)} name="city" defaultValue={city} autoComplete="address-level2" required />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Name" error={errors.name}>
          <input {...inputProps(`${id}-name`, errors.name)} name="name" autoComplete="name" required />
        </Field>
        <Field id={`${id}-phone`} label="Phone / WhatsApp" error={errors.phone}>
          <div className="flex">
            <span className="flex items-center border-2 border-r-0 border-navy bg-chalk px-3 font-mono text-[14px]">+91</span>
            <input {...inputProps(`${id}-phone`, errors.phone)} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" required />
          </div>
        </Field>
      </div>
      <Consent id={`${id}-consent`} error={errors.consent} text="OK to contact me by phone and WhatsApp about finding a dealer." />
      <div className="mt-2">
        <button type="submit" disabled={status === "sending"} className="nf-btn nf-btn--orange">
          <span>{status === "sending" ? "Sending" : "Find my dealer →"}</span>
        </button>
      </div>
      <FormError msg={errors.form} />
    </form>
  );
}

/* ------------------------------------------------------------- DealerForm */

const LINE_LABEL: Record<Line, string> = { vision: "Vision (lighting)", aroma: "Aroma (car perfumes)", care: "Care (cloths and wipes)" };

/** Dealer enquiry (/dealers). Line and product pre-fill from ?line=&product=. */
export function DealerForm() {
  const params = useSearchParams();
  const productSlug = params.get("product") ?? "";
  const product = getProduct(productSlug);
  const lineParam = params.get("line");
  let preLine: Line | null = null;
  if (product) preLine = product.line;
  else if ((LINES as readonly string[]).includes(lineParam ?? "")) preLine = lineParam as Line;

  const id = useId();
  const { status, errors, submit } = useLead();

  if (status === "done") {
    return <Success>Thanks, we&apos;ve got your enquiry. Our team will call you within 2 working days.</Success>;
  }

  return (
    <form
      noValidate
      className="relative grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data = Object.fromEntries(form.entries());
        void submit({
          ...data,
          type: "dealer",
          lines: form.getAll("lines"),
          ...(product ? { product: product.slug } : {}),
          consent: data.consent === "on",
        });
      }}
    >
      <Honeypot />
      {product && (
        <p className="m-0 border-l-4 border-fury bg-chalk px-4 py-3 font-mono text-[13px]">
          Enquiring about: <strong>{product.name}</strong>
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Full name" error={errors.fullName}>
          <input {...inputProps(`${id}-name`, errors.fullName)} name="fullName" autoComplete="name" required />
        </Field>
        <Field id={`${id}-biz`} label="Shop or business name" error={errors.business}>
          <input {...inputProps(`${id}-biz`, errors.business)} name="business" autoComplete="organization" required />
        </Field>
        <Field id={`${id}-city`} label="City" error={errors.city}>
          <input {...inputProps(`${id}-city`, errors.city)} name="city" autoComplete="address-level2" required />
        </Field>
        <Field id={`${id}-state`} label="State" error={errors.state}>
          <select {...inputProps(`${id}-state`, errors.state)} name="state" defaultValue="" required>
            <option value="" disabled>Choose a state</option>
            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field id={`${id}-phone`} label="Phone / WhatsApp" error={errors.phone}>
          <div className="flex">
            <span className="flex items-center border-2 border-r-0 border-navy bg-chalk px-3 font-mono text-[14px]">+91</span>
            <input {...inputProps(`${id}-phone`, errors.phone)} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" required />
          </div>
        </Field>
        <Field id={`${id}-email`} label="Email" error={errors.email} optional>
          <input {...inputProps(`${id}-email`, errors.email)} name="email" type="email" autoComplete="email" />
        </Field>
        <Field id={`${id}-gst`} label="GSTIN" error={errors.gstin} optional>
          <input {...inputProps(`${id}-gst`, errors.gstin)} name="gstin" maxLength={15} autoCapitalize="characters" spellCheck={false} />
        </Field>
        <Field id={`${id}-type`} label="Business type" error={errors.businessType}>
          <select {...inputProps(`${id}-type`, errors.businessType)} name="businessType" defaultValue="" required>
            <option value="" disabled>Choose one</option>
            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <fieldset className="m-0 min-w-0 border-0 p-0" aria-describedby={errors.lines ? `${id}-lines-err` : undefined}>
        <legend className="nf-label mb-2">Lines interested in <span aria-hidden="true">*</span></legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {LINES.map((l) => (
            <label key={l} className="flex min-h-[52px] cursor-pointer items-center gap-3 border-2 border-navy bg-white px-4 font-mono text-[13px] font-semibold">
              <input type="checkbox" name="lines" value={l} defaultChecked={preLine === l} className="h-5 w-5 accent-[#020F26]" />
              {LINE_LABEL[l]}
            </label>
          ))}
        </div>
        {errors.lines && <p id={`${id}-lines-err`} className="nf-field-error">{errors.lines}</p>}
      </fieldset>

      <Field id={`${id}-msg`} label="Message" optional>
        <textarea id={`${id}-msg`} name="message" maxLength={1000} className="nf-input" />
      </Field>

      <Consent id={`${id}-consent`} error={errors.consent} text="OK to contact me by phone and WhatsApp about this enquiry." />

      <div>
        <button type="submit" disabled={status === "sending"} className="nf-btn nf-btn--dark nf-btn--lg">
          <span>{status === "sending" ? "Sending" : "Send Enquiry"}</span>
        </button>
      </div>
      <FormError msg={errors.form} />
    </form>
  );
}
