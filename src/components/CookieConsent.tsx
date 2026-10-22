"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type ConsentChoice = "accepted" | "rejected";

type CookieConsentProps = {
  privacyPolicyHref: string;
  text: {
    title: string;
    description: string;
    essentialTitle: string;
    essentialDescription: string;
    optionalTitle: string;
    optionalDescription: string;
    accept: string;
    reject: string;
    settings: string;
    privacyPolicy: string;
  };
};

const CONSENT_COOKIE = "heiz_cookie_consent_v1";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

function subscribeToConsent(onChange: () => void) {
  window.addEventListener("cookie-consent-change", onChange);
  return () => window.removeEventListener("cookie-consent-change", onChange);
}

function readConsent(): ConsentChoice | null {
  const value = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];

  return value === "accepted" || value === "rejected" ? value : null;
}

function saveConsent(choice: ConsentChoice) {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; path=/; max-age=${CONSENT_MAX_AGE}; samesite=lax${secure}`;
  window.dispatchEvent(new Event("cookie-consent-change"));
}

function loadOptionalTracking() {
  if (!document.getElementById("google-tag-init")) {
    const initScript = document.createElement("script");
    initScript.id = "google-tag-init";
    initScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){window.dataLayer.push(arguments);};
      window.gtag('js', new Date());
      window.gtag('config', 'AW-17974078937');
    `;
    document.head.appendChild(initScript);
  }

  if (!document.getElementById("google-ads-tag")) {
    const googleScript = document.createElement("script");
    googleScript.id = "google-ads-tag";
    googleScript.async = true;
    googleScript.src =
      "https://www.googletagmanager.com/gtag/js?id=AW-17974078937";
    document.head.appendChild(googleScript);
  }

  if (!document.getElementById("shown-metrics-tag")) {
    const shownScript = document.createElement("script");
    shownScript.id = "shown-metrics-tag";
    shownScript.async = true;
    shownScript.src = "https://shown.io/metrics/5M0ZDWmB8P";
    document.head.appendChild(shownScript);
  }
}

function clearTrackingCookies() {
  const trackingCookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => /^(_ga|_gid|_gat|_gcl_)/.test(name));
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname.replace(/^www\./, "")}`];

  for (const name of trackingCookies) {
    document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
    for (const domain of domains) {
      document.cookie = `${name}=; domain=${domain}; path=/; max-age=0; samesite=lax`;
    }
  }
}

export function CookieConsent({ privacyPolicyHref, text }: CookieConsentProps) {
  const choice = useSyncExternalStore(subscribeToConsent, readConsent, () => null);
  const [isEditing, setIsEditing] = useState(false);
  const isOpen = choice === null || isEditing;

  useEffect(() => {
    if (choice === "accepted") loadOptionalTracking();
  }, [choice]);

  function choose(nextChoice: ConsentChoice) {
    const previousChoice = choice;
    saveConsent(nextChoice);
    setIsEditing(false);

    if (nextChoice === "accepted") return;

    clearTrackingCookies();
    if (previousChoice === "accepted") window.location.reload();
  }

  return (
    <>
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="fixed bottom-4 right-4 z-40 rounded-full border border-forest-800 bg-paper px-4 py-2 text-sm font-semibold text-forest-800 shadow-lg transition-colors hover:bg-forest-100"
        >
          {text.settings}
        </button>
      ) : (
        <section
          aria-label={text.title}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-sand bg-paper shadow-[0_-8px_30px_rgba(16,33,26,0.16)]"
        >
          <div className="site-container max-w-5xl py-5">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-semibold text-charcoal">{text.title}</h2>
                <p className="mt-1 text-sm text-muted">{text.description}</p>
                <a
                  href={privacyPolicyHref}
                  className="mt-1 inline-flex min-h-9 items-center text-sm font-semibold text-forest-800 underline underline-offset-4 hover:text-forest-700"
                >
                  {text.privacyPolicy}
                </a>
              </div>

              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-lg border border-sand/80 px-3 py-2">
                  <p className="font-semibold text-charcoal">{text.essentialTitle}</p>
                  <p className="text-muted">{text.essentialDescription}</p>
                </div>
                <div className="rounded-lg border border-sand/80 px-3 py-2">
                  <p className="font-semibold text-charcoal">{text.optionalTitle}</p>
                  <p className="text-muted">{text.optionalDescription}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => choose("accepted")}
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-forest-800 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
                >
                  {text.accept}
                </button>
                <button
                  type="button"
                  onClick={() => choose("rejected")}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-forest-800 px-5 py-2 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100"
                >
                  {text.reject}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
