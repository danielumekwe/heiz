"use client";

import { useId } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LOCALE_COOKIE,
  localeNames,
  locales,
  stripLocale,
  type Locale,
} from "@/i18n/config";
import { useLocale } from "./LocaleLink";

const flagMap: Record<Locale, string> = {
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  nl: "🇳🇱",
};

export function LanguageSwitcher({
  label,
  className = "",
}: {
  /** Accessible name for the group, already translated. */
  label: string;
  className?: string;
}) {
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const rest = stripLocale(pathname);
  const id = useId();

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={current}
        aria-label={label}
        onChange={(event) => {
          const locale = event.target.value as Locale;
          // Remember the choice so the site does not switch back to the browser language.
          document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
          router.push(
            `/${locale}${rest === "/" ? "" : rest}${search ? `?${search}` : ""}`,
            { scroll: false },
          );
        }}
        className="appearance-none rounded-full border border-sand bg-paper px-2 py-2 pr-8 text-xl shadow-sm transition-colors hover:border-forest-700 focus:border-forest-800 focus:outline-none"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale} aria-label={localeNames[locale]}>
            {flagMap[locale]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute inset-y-0 right-2 my-auto size-4 text-charcoal"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 7.5l5 5 5-5" />
      </svg>
    </div>
  );
}
