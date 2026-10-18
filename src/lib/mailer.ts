import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { translatorFor } from "@/i18n/dictionaries";
import { enquiryTypes, type EnquiryValues } from "@/lib/enquiry";

/**
 * Sends enquiry emails through the ZeptoMail email API (an HTTPS request, so
 * it works in the Cloudflare Workers runtime without SMTP sockets).
 *
 * Configured entirely through server-only environment variables:
 *
 *   ZEPTOMAIL_TOKEN    Send Mail token from the Mail Agent's API tab   (required)
 *   ENQUIRY_FROM       sender on a domain verified in ZeptoMail,
 *                      e.g. noreply@1heizwoodpellets.com               (required)
 *   ENQUIRY_TO         recipient; defaults to the site contact email
 *   ZEPTOMAIL_API_URL  defaults to https://cpaas.zoho.com/v1.1/email;
 *                      accounts in other data centres use their own host,
 *                      as shown in the ZeptoMail dashboard
 */

const DEFAULT_API_URL = "https://cpaas.zoho.com/v1.1/email";

export function isMailConfigured() {
  return Boolean(process.env.ZEPTOMAIL_TOKEN && process.env.ENQUIRY_FROM && recipient());
}

function recipient() {
  return process.env.ENQUIRY_TO || site.contact.email;
}

/** Header values must stay on one line, or they could inject extra headers. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

type Address = { address: string; name?: string };

async function send(message: {
  to: Address;
  replyTo: Address;
  subject: string;
  text: string;
}) {
  // The dashboard shows the token with its "Zoho-enczapikey" prefix; accept either form.
  const token = (process.env.ZEPTOMAIL_TOKEN ?? "").trim();
  const authorization = token.startsWith("Zoho-enczapikey") ? token : `Zoho-enczapikey ${token}`;

  const response = await fetch(process.env.ZEPTOMAIL_API_URL || DEFAULT_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify({
      from: { address: process.env.ENQUIRY_FROM, name: `${site.name} website` },
      to: [{ email_address: message.to }],
      reply_to: [message.replyTo],
      subject: oneLine(message.subject),
      textbody: message.text,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });

  if (!response.ok) {
    // ZeptoMail explains the problem (bad token, unverified sender, ...) in the body.
    const detail = await response.text().catch(() => "");
    throw new Error(`ZeptoMail returned ${response.status}: ${detail.slice(0, 500)}`);
  }
}

function typeLabel(values: EnquiryValues) {
  return (
    enquiryTypes.find((type) => type.value === values.enquiryType)?.label ?? values.enquiryType
  );
}

/** Emails the enquiry to the business mailbox, with the customer as Reply-To. */
export async function sendEnquiryEmail(values: EnquiryValues, locale: string) {
  const label = typeLabel(values);

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Company", values.company],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Enquiry type", label],
    ["Product", values.product],
    ["Estimated quantity", values.quantity],
    ["Delivery location", values.location],
    ["Website language", locale],
  ];

  const text = [
    `New enquiry from the ${site.name} website`,
    "",
    ...rows
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${oneLine(value)}`),
    "",
    "Message:",
    values.message,
    "",
    "Reply to this email to answer the customer directly.",
  ].join("\n");

  await send({
    to: { address: recipient() },
    replyTo: { name: oneLine(values.name), address: oneLine(values.email) },
    subject: `Website enquiry: ${label}${values.product ? ` (${values.product})` : ""} from ${values.name}`,
    text,
  });
}

/**
 * Confirms to the customer, in the page language, that their enquiry arrived.
 *
 * Deliberately does not repeat the message or other free text: anyone can type
 * any address into the form, so the confirmation must not be usable to send
 * someone else arbitrary content from the business domain.
 */
export async function sendAcknowledgementEmail(values: EnquiryValues, locale: Locale) {
  const t = translatorFor(locale);
  const company = site.name;

  const text = [
    t("Hello {name},", { name: oneLine(values.name) }),
    "",
    t(
      "Thank you for contacting {company}. We have received your enquiry and will reply to this email address as soon as possible.",
      { company },
    ),
    "",
    t("Your enquiry: {type}", { type: t(typeLabel(values)) }),
    "",
    t("If you would like to add anything, simply reply to this email."),
    "",
    t("Kind regards,"),
    company,
    site.contact.phone,
    site.url,
    "",
    "--",
    t(
      "You are receiving this email because this address was entered in the enquiry form on our website. If this was not you, you can ignore this email.",
    ),
  ].join("\n");

  await send({
    to: { name: oneLine(values.name), address: oneLine(values.email) },
    replyTo: { name: company, address: recipient() },
    subject: t("We have received your enquiry – {company}", { company }),
    text,
  });
}
