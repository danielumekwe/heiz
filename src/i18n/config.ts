/** Languages the site is published in. English is the source language. */
export const locales = ["en", "de", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie holding the language the visitor last used (see src/proxy.ts). */
export const LOCALE_COOKIE = "lang";

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
};

/** Open Graph locale codes. */
export const ogLocales: Record<Locale, string> = {
  en: "en_GB",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
};

export function hasLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Prefixes an internal path with a locale: ("de", "/products") -> "/de/products".
 * External URLs, anchors, mailto/tel links and file downloads are returned unchanged.
 */
export function localizePath(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const path = href.split(/[?#]/)[0];
  if (/\.[a-z0-9]+$/i.test(path)) return href;
  const first = path.split("/")[1];
  if (hasLocale(first)) return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

/** Removes a leading locale segment: "/de/products" -> "/products". */
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split("/");
  return hasLocale(first) ? `/${rest.join("/")}` : pathname;
}
