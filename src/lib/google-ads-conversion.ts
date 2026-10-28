import type { EnquiryState } from "./enquiry";

type Gtag = (...args: [command: string, ...parameters: unknown[]]) => void;

export function reportQuoteConversion(
  status: EnquiryState["status"],
  conversionLabel: string | undefined,
  gtag: Gtag | undefined,
  reported: { current: boolean },
) {
  if (
    status !== "sent" ||
    reported.current ||
    !conversionLabel ||
    typeof gtag !== "function"
  ) {
    return;
  }

  reported.current = true;
  gtag("event", "conversion", {
    send_to: `AW-17974078937/${conversionLabel}`,
  });
}
