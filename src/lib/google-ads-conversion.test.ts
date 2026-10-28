import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitEnquiry } from "@/app/actions/enquiry";
import {
  isMailConfigured,
  sendAcknowledgementEmail,
  sendEnquiryEmail,
} from "@/lib/mailer";
import { initialEnquiryState } from "@/lib/enquiry";
import { reportQuoteConversion } from "./google-ads-conversion";

vi.mock("@/lib/mailer", () => ({
  isMailConfigured: vi.fn(),
  sendAcknowledgementEmail: vi.fn(),
  sendEnquiryEmail: vi.fn(),
}));

const conversionLabel = "UnwBCMrat6wdENnb2vpC";
const conversionTarget = "AW-17974078937/UnwBCMrat6wdENnb2vpC";

function validFormData() {
  const formData = new FormData();
  formData.set("lang", "nl");
  formData.set("name", "Test-only visitor");
  formData.set("email", "test@example.invalid");
  formData.set("enquiryType", "general");
  formData.set("message", "A mocked test enquiry.");
  formData.set("consent", "on");
  formData.set("recaptchaToken", "mock-recaptcha-token");
  return formData;
}

describe("quote enquiry Google Ads conversion", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-only-secret");
    vi.stubEnv("ENQUIRY_WEBHOOK_URL", "");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    vi.mocked(isMailConfigured).mockReturnValue(true);
    vi.mocked(sendEnquiryEmail).mockResolvedValue(undefined);
    vi.mocked(sendAcknowledgementEmail).mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("reports the exact conversion once after mocked server-confirmed delivery", async () => {
    const serverResponse = await submitEnquiry(
      initialEnquiryState,
      validFormData(),
    );
    const gtag = vi.fn();
    const reported = { current: false };

    expect(serverResponse.status).toBe("sent");
    expect(sendEnquiryEmail).toHaveBeenCalledOnce();

    reportQuoteConversion(serverResponse.status, conversionLabel, gtag, reported);
    reportQuoteConversion(serverResponse.status, conversionLabel, gtag, reported);

    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: conversionTarget,
    });
  });

  it("does not report a conversion when mocked delivery fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(sendEnquiryEmail).mockRejectedValueOnce(
      new Error("Mock delivery failure"),
    );
    const serverResponse = await submitEnquiry(
      initialEnquiryState,
      validFormData(),
    );
    const gtag = vi.fn();

    expect(serverResponse.status).toBe("failed");
    reportQuoteConversion(
      serverResponse.status,
      conversionLabel,
      gtag,
      { current: false },
    );
    expect(gtag).not.toHaveBeenCalled();
  });

  it("does not report a conversion for client/server validation errors", async () => {
    const formData = validFormData();
    formData.set("email", "not-an-email");
    const serverResponse = await submitEnquiry(initialEnquiryState, formData);
    const gtag = vi.fn();

    expect(serverResponse.status).toBe("invalid");
    expect(sendEnquiryEmail).not.toHaveBeenCalled();
    reportQuoteConversion(
      serverResponse.status,
      conversionLabel,
      gtag,
      { current: false },
    );
    expect(gtag).not.toHaveBeenCalled();
  });

  it("does not report without accepted-cookie tracking or a configured label", () => {
    const gtag = vi.fn();
    const reported = { current: false };

    reportQuoteConversion("idle", conversionLabel, gtag, reported);
    reportQuoteConversion("sent", conversionLabel, undefined, reported);
    reportQuoteConversion("sent", undefined, gtag, reported);

    expect(gtag).not.toHaveBeenCalled();
    expect(reported.current).toBe(false);
  });
});
