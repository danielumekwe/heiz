"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { EnquiryFormContent } from "@/i18n/content";
import { EnquiryForm } from "./EnquiryForm";

const CONSENT_COOKIE = "heiz_cookie_consent_v1";

export function QuoteEnquiryPopup({
  content,
  contactEmail,
  title,
  description,
  closeLabel,
}: {
  content: EnquiryFormContent;
  contactEmail?: string;
  title: string;
  description: string;
  closeLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = "quote-enquiry-popup-title";
  const pathname = usePathname();

  useEffect(() => {
    let waitingForConsent = false;

    const hasConsentChoice = () =>
      document.cookie
        .split("; ")
        .some((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`));

    const openAfterConsent = () => {
      if (!waitingForConsent || !hasConsentChoice()) return;
      waitingForConsent = false;
      setIsOpen(true);
    };

    if (dialogRef.current?.open) dialogRef.current.close();

    const timer = window.setTimeout(() => {
      if (hasConsentChoice()) {
        setIsOpen(true);
      } else {
        waitingForConsent = true;
      }
    }, 60_000);

    window.addEventListener("cookie-consent-change", openAfterConsent);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("cookie-consent-change", openAfterConsent);
    };
  }, [pathname]);

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
  }, [isOpen]);

  return isOpen ? (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => setIsOpen(false)}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-lg border border-sand bg-paper p-6 text-charcoal shadow-2xl backdrop:bg-charcoal/60 sm:p-8"
    >
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <h2 id={titleId} className="font-display text-2xl font-semibold text-forest-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label={closeLabel}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-2xl text-charcoal hover:bg-forest-100 focus-visible:outline-2 focus-visible:outline-forest-800"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <EnquiryForm content={content} contactEmail={contactEmail} />
    </dialog>
  ) : null;
}
