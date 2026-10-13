import nodemailer from "nodemailer";
import { site } from "@/data/site";
import { enquiryTypes, type EnquiryValues } from "@/lib/enquiry";

/**
 * Emails enquiries to the business mailbox over SMTP.
 *
 * Configured entirely through server-only environment variables:
 *
 *   SMTP_HOST      mail server, e.g. smtp.your-provider.com   (required)
 *   SMTP_PORT      465 (default, TLS) or 587 (STARTTLS)
 *   SMTP_USER      mailbox login                              (usually required)
 *   SMTP_PASS      mailbox password or app password
 *   ENQUIRY_TO     recipient; defaults to the site contact email
 *   ENQUIRY_FROM   sender address; defaults to SMTP_USER
 */

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && recipient());
}

function recipient() {
  return process.env.ENQUIRY_TO || site.contact.email;
}

/** Header values must stay on one line, or they could inject extra headers. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function sendEnquiryEmail(values: EnquiryValues, locale: string) {
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: user ? { user, pass: process.env.SMTP_PASS ?? "" } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const typeLabel =
    enquiryTypes.find((type) => type.value === values.enquiryType)?.label ??
    values.enquiryType;

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Company", values.company],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Enquiry type", typeLabel],
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

  await transport.sendMail({
    // Sent from the business mailbox, so replies go to the customer via Reply-To.
    from: { name: `${site.name} website`, address: process.env.ENQUIRY_FROM || user || recipient() },
    to: recipient(),
    replyTo: { name: oneLine(values.name), address: oneLine(values.email) },
    subject: oneLine(
      `Website enquiry: ${typeLabel}${values.product ? ` (${values.product})` : ""} from ${values.name}`,
    ),
    text,
  });
}
