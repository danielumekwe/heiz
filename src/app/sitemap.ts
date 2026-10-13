import type { MetadataRoute } from "next";
import { catalog } from "@/data/catalog";
import { products } from "@/data/products";
import { articles } from "@/data/resources";
import { absoluteUrl } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { locales, localizePath } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/products",
    ...[...products, ...catalog].map((product) => `/products/${product.slug}`),
    "/bulk-supply",
    "/wholesale",
    "/sustainability",
    "/about",
    "/resources",
    ...articles.map((article) => `/resources/${article.slug}`),
    "/faq",
    ...(testimonials.length > 0 ? ["/testimonials"] : []),
    "/contact",
    "/privacy-policy",
    "/legal-notice",
    "/image-credits",
  ];

  // One entry per page and language, each listing its translations.
  return pages.flatMap((path) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(localizePath(locale, path))]),
    );

    return locales.map((locale) => ({
      url: languages[locale],
      changeFrequency: path.startsWith("/resources/")
        ? ("yearly" as const)
        : ("monthly" as const),
      priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
      alternates: { languages },
    }));
  });
}
