"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { defaultLocale, hasLocale, localizePath } from "@/i18n/config";

/** Reads the current locale from the /[lang] route segment. */
export function useLocale() {
  const params = useParams<{ lang?: string }>();
  return hasLocale(params.lang) ? params.lang : defaultLocale;
}

/**
 * Drop-in replacement for next/link that keeps visitors in their language by
 * prefixing internal paths with the current locale.
 */
export default function LocaleLink({
  href,
  ...props
}: Omit<ComponentProps<typeof NextLink>, "href"> & { href: string }) {
  const locale = useLocale();
  return <NextLink href={localizePath(locale, href)} {...props} />;
}
