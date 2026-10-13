"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";
import {
  enquiryTypes,
  initialEnquiryState,
  type EnquiryField,
} from "@/lib/enquiry";
import { catalog } from "@/data/catalog";
import { products } from "@/data/products";
import { buttonClass } from "./ButtonLink";

const inputClass =
  "mt-2 block w-full border border-sand bg-white px-4 py-3 text-base text-charcoal placeholder:text-muted/70 focus:border-forest-800 focus:outline-2 focus:outline-offset-0 focus:outline-forest-800 aria-[invalid=true]:border-red-700";

const productOptions = [
  {
    label: "Wood pellets and supply formats",
    items: products.map((product) => ({
      value: product.name,
      label: product.name,
    })),
  },
  {
    label: "Full product range",
    items: catalog.map((product) => ({
      value: product.name,
      label: product.name,
    })),
  },
];

export function EnquiryForm({
  defaultType = "general",
  defaultProduct,
  defaultMessage,
  contactEmail,
}: {
  defaultType?: string;
  defaultProduct?: string;
  defaultMessage?: string;
  contactEmail?: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialEnquiryState,
  );
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
        <h3 className="text-2xl font-semibold text-forest-900">Enquiry sent</h3>
        <p className="mt-3 text-forest-900">{state.message}</p>
      </div>
    );
  }

  const values = state.values;
  const errors = state.errors ?? {};

  const describe = (field: EnquiryField) =>
    errors[field] ? `${field}-error` : undefined;

  const fieldError = (field: EnquiryField) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm font-medium text-red-800">
        {errors[field]}
      </p>
    ) : null;

  const showBanner =
    state.status === "invalid" ||
    state.status === "failed" ||
    state.status === "unavailable";

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-6">
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
              {contactEmail ? (
                <>
                  Please email us at{" "}
                  <a className="underline" href={`mailto:${contactEmail}`}>
                    {contactEmail}
                  </a>{" "}
                  instead. Your details are still in the form below.
                </>
              ) : (
                "Please try again later. Your details are still in the form below."
              )}
            </p>
          ) : null}
        </div>
      ) : null}

      <p className="text-sm text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-display text-sm font-semibold">
            Name *
          </label>
          <input
            id="name"
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
          <label htmlFor="company" className="font-display text-sm font-semibold">
            Company <span className="font-normal text-muted">(if applicable)</span>
          </label>
          <input
            id="company"
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
          <label htmlFor="email" className="font-display text-sm font-semibold">
            Email *
          </label>
          <input
            id="email"
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
          <label htmlFor="phone" className="font-display text-sm font-semibold">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="phone"
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
          <label
            htmlFor="enquiryType"
            className="font-display text-sm font-semibold"
          >
            Enquiry type *
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            required
            defaultValue={values?.enquiryType || defaultType}
            aria-invalid={Boolean(errors.enquiryType)}
            aria-describedby={describe("enquiryType")}
            className={`${inputClass} h-[3.125rem]`}
          >
            {enquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {fieldError("enquiryType")}
        </div>
        <div>
          <label htmlFor="quantity" className="font-display text-sm font-semibold">
            Estimated quantity{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            placeholder="e.g. 2 pallets, or tonnes per year"
            defaultValue={values?.quantity}
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby={describe("quantity")}
            className={inputClass}
          />
          {fieldError("quantity")}
        </div>
      </div>

      <div>
        <label htmlFor="product" className="font-display text-sm font-semibold">
          Product <span className="font-normal text-muted">(optional)</span>
        </label>
        <select
          id="product"
          name="product"
          defaultValue={values?.product || defaultProduct || ""}
          aria-invalid={Boolean(errors.product)}
          aria-describedby={describe("product")}
          className={`${inputClass} h-[3.125rem]`}
        >
          <option value="">Select a product</option>
          {productOptions.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.items.map((product) => (
                <option key={`${group.label}-${product.value}`} value={product.value}>
                  {product.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {fieldError("product")}
      </div>

      <div>
        <label htmlFor="location" className="font-display text-sm font-semibold">
          Delivery location{" "}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Town or postcode, and country"
          autoComplete="address-level2"
          defaultValue={values?.location}
          aria-invalid={Boolean(errors.location)}
          aria-describedby={describe("location")}
          className={inputClass}
        />
        {fieldError("location")}
      </div>

      <div>
        <label htmlFor="message" className="font-display text-sm font-semibold">
          Message *
        </label>
        <textarea
          id="message"
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
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-[0.95rem]">
          <input
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describe("consent")}
            className="mt-1 size-5 shrink-0 accent-forest-800"
          />
          <span>
            I agree that 1heiz may use these details to respond to my enquiry, as
            described in the{" "}
            <a
              href="/privacy-policy"
              className="text-forest-800 underline underline-offset-4"
            >
              privacy policy
            </a>
            . *
          </span>
        </label>
        {fieldError("consent")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`${buttonClass("primary")} w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto`}
      >
        {pending ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
