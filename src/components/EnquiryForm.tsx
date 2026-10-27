"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Script from "next/script";
import { submitEnquiry } from "@/app/actions/enquiry";
import type { EnquiryFormContent } from "@/i18n/content";
import { rich } from "@/i18n/translate";
import { initialEnquiryState, type EnquiryField } from "@/lib/enquiry";
import { buttonClass } from "./ButtonLink";
import Link, { useLocale } from "./LocaleLink";

const inputClass =
  "mt-2 block w-full border border-sand bg-white px-4 py-3 text-base text-charcoal placeholder:text-muted/70 focus:border-forest-800 focus:outline-2 focus:outline-offset-0 focus:outline-forest-800 aria-[invalid=true]:border-red-700";

const labelClass = "font-display text-sm font-semibold";
const recaptchaSiteKey = "6LeYgQEuAAAAAB-IMLu-bqhGVAXkGYvnkj4r2YVZ";

declare global {
  interface Window {
    grecaptcha?: {
      ready(callback: () => void): void;
      render(
        container: HTMLElement,
        parameters: {
          sitekey: string;
          size: "invisible";
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ): number;
      execute(widgetId: number): void;
      reset(widgetId: number): void;
    };
  }
}

/** Enquiry form. All visible text arrives translated in `content`. */
export function EnquiryForm({
  content,
  defaultType = "general",
  defaultProduct,
  defaultMessage,
  contactEmail,
}: {
  content: EnquiryFormContent;
  defaultType?: string;
  defaultProduct?: string;
  defaultMessage?: string;
  contactEmail?: string;
}) {
  const { labels, types, productGroups } = content;
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialEnquiryState,
  );
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();
  const captchaRef = useRef<HTMLDivElement>(null);
  const captchaWidgetRef = useRef<number | null>(null);
  const captchaBypassRef = useRef(false);
  const [captchaError, setCaptchaError] = useState(false);

  const initializeCaptcha = () => {
    const recaptcha = window.grecaptcha;
    if (!recaptcha) return;
    recaptcha.ready(() => {
      if (!captchaRef.current || captchaWidgetRef.current !== null) return;
      captchaWidgetRef.current = recaptcha.render(captchaRef.current, {
        sitekey: recaptchaSiteKey,
        size: "invisible",
        callback: (token) => {
          const tokenInput = formRef.current?.elements.namedItem("recaptchaToken");
          if (!(tokenInput instanceof HTMLInputElement)) return;
          tokenInput.value = token;
          captchaBypassRef.current = true;
          formRef.current?.requestSubmit();
          setCaptchaError(false);
        },
        "expired-callback": () => {
          const tokenInput = formRef.current?.elements.namedItem("recaptchaToken");
          if (tokenInput instanceof HTMLInputElement) tokenInput.value = "";
        },
        "error-callback": () => setCaptchaError(true),
      });
    });
  };

  useEffect(() => {
    if (state.status === "idle") return;
    const tokenInput = formRef.current?.elements.namedItem("recaptchaToken");
    if (tokenInput instanceof HTMLInputElement) tokenInput.value = "";
    captchaBypassRef.current = false;
    if (captchaWidgetRef.current !== null) {
      window.grecaptcha?.reset(captchaWidgetRef.current);
    }
  }, [state]);

  // Move focus to the outcome so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "invalid" && state.errors) {
      const first = Object.keys(state.errors)[0];
      const field = formRef.current?.elements.namedItem(first);
      if (field instanceof HTMLElement) return field.focus();
    }
    statusRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-forest-200 bg-forest-100 p-8"
      >
        <h3 className="text-2xl font-semibold text-forest-900">{labels.sentTitle}</h3>
        <p className="mt-3 text-forest-900">{state.message}</p>
      </div>
    );
  }

  const values = state.values;
  const errors = state.errors ?? {};
  const fieldId = (field: EnquiryField) => `${formId}-${field}`;

  const describe = (field: EnquiryField) =>
    errors[field] ? `${fieldId(field)}-error` : undefined;

  const fieldError = (field: EnquiryField) =>
    errors[field] ? (
      <p id={`${fieldId(field)}-error`} className="mt-2 text-sm font-medium text-red-800">
        {errors[field]}
      </p>
    ) : null;

  const hint = (text: string) => (
    <span className="font-normal text-muted">{text}</span>
  );

  const showBanner =
    state.status === "invalid" ||
    state.status === "failed" ||
    state.status === "unavailable";

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="space-y-6"
      onSubmit={(event) => {
        if (captchaBypassRef.current) {
          captchaBypassRef.current = false;
          return;
        }
        event.preventDefault();
        if (captchaWidgetRef.current === null || !window.grecaptcha) {
          setCaptchaError(true);
          return;
        }
        setCaptchaError(false);
        window.grecaptcha.execute(captchaWidgetRef.current);
      }}
    >
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={initializeCaptcha}
        onError={() => setCaptchaError(true)}
      />
      <input type="hidden" name="lang" value={locale} />
      <input type="hidden" name="recaptchaToken" />
      <div ref={captchaRef} />

      {showBanner ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border-l-4 border-red-700 bg-red-50 px-5 py-4 text-red-900"
        >
          <p className="font-semibold">{state.message}</p>
          {state.status === "unavailable" ? (
            <p className="mt-1 text-[0.95rem]">
              {contactEmail
                ? rich(labels.emailInstead, {
                    email: () => (
                      <a className="underline" href={`mailto:${contactEmail}`}>
                        {contactEmail}
                      </a>
                    ),
                  })
                : labels.tryLater}
            </p>
          ) : null}
        </div>
      ) : null}

      <p className="text-sm text-muted">{labels.requiredNote}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className={labelClass}>
            {labels.name} *
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={values?.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className={inputClass}
          />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor={fieldId("company")} className={labelClass}>
            {labels.company} {hint(labels.ifApplicable)}
          </label>
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={values?.company}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describe("company")}
            className={inputClass}
          />
          {fieldError("company")}
        </div>
        <div>
          <label htmlFor={fieldId("email")} className={labelClass}>
            {labels.email} *
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={values?.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            className={inputClass}
          />
          {fieldError("email")}
        </div>
        <div>
          <label htmlFor={fieldId("phone")} className={labelClass}>
            {labels.phone} {hint(labels.optional)}
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values?.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describe("phone")}
            className={inputClass}
          />
          {fieldError("phone")}
        </div>
        <div>
          <label htmlFor={fieldId("enquiryType")} className={labelClass}>
            {labels.enquiryType} *
          </label>
          <select
            id={fieldId("enquiryType")}
            name="enquiryType"
            required
            defaultValue={values?.enquiryType || defaultType}
            aria-invalid={Boolean(errors.enquiryType)}
            aria-describedby={describe("enquiryType")}
            className={`${inputClass} h-[3.125rem]`}
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {fieldError("enquiryType")}
        </div>
        <div>
          <label htmlFor={fieldId("quantity")} className={labelClass}>
            {labels.quantity} {hint(labels.optional)}
          </label>
          <input
            id={fieldId("quantity")}
            name="quantity"
            type="text"
            placeholder={labels.quantityPlaceholder}
            defaultValue={values?.quantity}
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby={describe("quantity")}
            className={inputClass}
          />
          {fieldError("quantity")}
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("product")} className={labelClass}>
          {labels.product} {hint(labels.optional)}
        </label>
        <select
          id={fieldId("product")}
          name="product"
          defaultValue={values?.product || defaultProduct || ""}
          aria-invalid={Boolean(errors.product)}
          aria-describedby={describe("product")}
          className={`${inputClass} h-[3.125rem]`}
        >
          <option value="">{labels.selectProduct}</option>
          {productGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.items.map((product) => (
                <option key={product.value} value={product.value}>
                  {product.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {fieldError("product")}
      </div>

      <div>
        <label htmlFor={fieldId("location")} className={labelClass}>
          {labels.location} {hint(labels.optional)}
        </label>
        <input
          id={fieldId("location")}
          name="location"
          type="text"
          placeholder={labels.locationPlaceholder}
          autoComplete="address-level2"
          defaultValue={values?.location}
          aria-invalid={Boolean(errors.location)}
          aria-describedby={describe("location")}
          className={inputClass}
        />
        {fieldError("location")}
      </div>

      <div>
        <label htmlFor={fieldId("message")} className={labelClass}>
          {labels.message} *
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          required
          defaultValue={values?.message ?? defaultMessage}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe("message")}
          className={inputClass}
        />
        {fieldError("message")}
      </div>

      {/* Honeypot field, hidden from people and assistive technology. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${formId}-website`}>{labels.website}</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-[0.95rem]">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describe("consent")}
            className="mt-1 size-5 shrink-0 accent-forest-800"
          />
          <span>
            {rich(labels.consent, {
              link: (text) => (
                <Link
                  href="/privacy-policy"
                  className="text-forest-800 underline underline-offset-4"
                >
                  {text}
                </Link>
              ),
            })}{" "}
            *
          </span>
        </label>
        {fieldError("consent")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`${buttonClass("primary")} w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto`}
      >
        {pending ? labels.sending : labels.send}
      </button>
      {captchaError ? (
        <p role="alert" className="mt-2 text-sm font-medium text-red-800">
          {labels.captchaError}
        </p>
      ) : null}
    </form>
  );
}
