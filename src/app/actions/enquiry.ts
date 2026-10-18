"use server";

import {
  enquiryTypes,
  type EnquiryField,
  type EnquiryState,
  type EnquiryValues,
} from "@/lib/enquiry";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { translatorFor } from "@/i18n/dictionaries";
import { isMailConfigured, sendAcknowledgementEmail, sendEnquiryEmail } from "@/lib/mailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const limits: Record<keyof EnquiryValues, number> = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  enquiryType: 20,
  product: 180,
  quantity: 120,
  location: 160,
  message: 4000,
};

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Handles the enquiry form.
 *
 * Enquiries are emailed to the business mailbox through ZeptoMail (see
 * src/lib/mailer.ts), the customer gets a confirmation email, and, if
 * ENQUIRY_WEBHOOK_URL is set, the enquiry is also forwarded as JSON. Until one of the two is configured the action reports that online
 * enquiries are unavailable; it never reports a success it cannot confirm.
 */
export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // The form posts its page language so messages come back in that language.
  const requested = formData.get("lang");
  const locale = typeof requested === "string" && hasLocale(requested) ? requested : defaultLocale;
  const t = translatorFor(locale);

  const values = Object.fromEntries(
    (Object.keys(limits) as (keyof EnquiryValues)[]).map((key) => [
      key,
      read(formData, key),
    ]),
  ) as EnquiryValues;

  // Honeypot: real visitors never see or fill this field.
  if (read(formData, "website")) {
    return { status: "failed", message: t("Your enquiry could not be sent."), values };
  }

  const errors: Partial<Record<EnquiryField, string>> = {};

  if (!values.name) errors.name = t("Enter your name.");
  if (!values.email) errors.email = t("Enter your email address.");
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = t("Enter a valid email address, such as name@example.com.");
  if (!enquiryTypes.some((type) => type.value === values.enquiryType))
    errors.enquiryType = t("Choose what your enquiry is about.");
  if (!values.message) errors.message = t("Tell us what you need.");
  else if (values.message.length < 10)
    errors.message = t("Add a little more detail so we can help.");
  if (formData.get("consent") !== "on")
    errors.consent = t("Confirm that we may use your details to reply.");

  for (const key of Object.keys(limits) as (keyof EnquiryValues)[]) {
    if (!errors[key] && values[key].length > limits[key]) {
      errors[key] = t("Keep this under {limit} characters.", { limit: limits[key] });
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "invalid",
      message: t("Check the highlighted fields and try again."),
      errors,
      values,
    };
  }

  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  const mailConfigured = isMailConfigured();

  if (!mailConfigured && !endpoint) {
    return {
      status: "unavailable",
      message:
        t("Online enquiries are not connected yet, so your message has not been sent."),
      values,
    };
  }

  try {
    // Email to the business mailbox is the primary route.
    if (mailConfigured) await sendEnquiryEmail(values, locale);

    // Optional: also forward the enquiry as JSON, for example to a CRM.
    if (endpoint) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "1heiz-website", language: locale, ...values }),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      });

      if (!response.ok) throw new Error(`Enquiry endpoint returned ${response.status}`);
    }
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return {
      status: "failed",
      message:
        t("Something went wrong and your enquiry was not sent. Please try again in a moment."),
      values,
    };
  }

  // The enquiry has arrived, so a failed confirmation must not report failure
  // (the visitor would send it again).
  if (mailConfigured) {
    try {
      await sendAcknowledgementEmail(values, locale);
    } catch (error) {
      console.error("Enquiry confirmation email failed", error);
    }
  }

  return {
    status: "sent",
    message: t("Thank you. Your enquiry has been sent and we will reply by email."),
  };
}
