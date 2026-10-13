"use server";

import {
  enquiryTypes,
  type EnquiryField,
  type EnquiryState,
  type EnquiryValues,
} from "@/lib/enquiry";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const limits: Record<keyof EnquiryValues, number> = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  enquiryType: 20,
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
 * Enquiries are forwarded as JSON to ENQUIRY_WEBHOOK_URL (a server-only
 * environment variable). Until that is configured the action reports that
 * online enquiries are unavailable; it never reports a success it cannot
 * confirm.
 */
export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const values = Object.fromEntries(
    (Object.keys(limits) as (keyof EnquiryValues)[]).map((key) => [
      key,
      read(formData, key),
    ]),
  ) as EnquiryValues;

  // Honeypot: real visitors never see or fill this field.
  if (read(formData, "website")) {
    return { status: "failed", message: "Your enquiry could not be sent.", values };
  }

  const errors: Partial<Record<EnquiryField, string>> = {};

  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Enter a valid email address, such as name@example.com.";
  if (!enquiryTypes.some((type) => type.value === values.enquiryType))
    errors.enquiryType = "Choose what your enquiry is about.";
  if (!values.message) errors.message = "Tell us what you need.";
  else if (values.message.length < 10)
    errors.message = "Add a little more detail so we can help.";
  if (formData.get("consent") !== "on")
    errors.consent = "Confirm that we may use your details to reply.";

  for (const key of Object.keys(limits) as (keyof EnquiryValues)[]) {
    if (!errors[key] && values[key].length > limits[key]) {
      errors[key] = `Keep this under ${limits[key]} characters.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "invalid",
      message: "Check the highlighted fields and try again.",
      errors,
      values,
    };
  }

  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;

  if (!endpoint) {
    return {
      status: "unavailable",
      message:
        "Online enquiries are not connected yet, so your message has not been sent.",
      values,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "1heiz-website", ...values }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`Enquiry endpoint returned ${response.status}`);
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return {
      status: "failed",
      message:
        "Something went wrong and your enquiry was not sent. Please try again in a moment.",
      values,
    };
  }

  return {
    status: "sent",
    message: "Thank you. Your enquiry has been sent and we will reply by email.",
  };
}
