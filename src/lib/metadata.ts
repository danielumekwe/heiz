import type { Metadata } from "next";
import { site } from "@/data/site";
import { locales, localizePath, ogLocales } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";

// Served from public/opengraph-image.jpg.
const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
};

/** Canonical URL plus hreflang alternates for one page in every language. */
export function languageAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const item of locales) languages[item] = localizePath(item, path);
  languages["x-default"] = localizePath("en", path);

  return {
    canonical: localizePath(locale as (typeof locales)[number], path),
    languages,
  };
}

/**
 * Per-page metadata for the current language. `title` and `description` are
 * given in English and translated here.
 */
export async function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Promise<Metadata> {
  const t = await getT();
  const locale = await getLocale();
  const pageTitle = t(title);
  const pageDescription = t(description);
  const alternates = languageAlternates(locale, path);

  return {
    title: pageTitle,
    description: pageDescription,
    alternates,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocales[locale],
      title: `${pageTitle} | ${site.name}`,
      description: pageDescription,
      url: alternates.canonical,
      images: [{ ...shareImage, alt: t("1heiz Wood Pellets logo beside a close-up of wood pellets") }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${site.name}`,
      description: pageDescription,
      images: [shareImage.url],
    },
  };
}
