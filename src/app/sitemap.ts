import type { MetadataRoute } from "next";
import { catalog } from "@/data/catalog";
import { products } from "@/data/products";
import { articles } from "@/data/resources";
import { absoluteUrl } from "@/data/site";

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
    "/contact",
    "/privacy-policy",
    "/legal-notice",
    "/image-credits",
  ];

  return pages.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path.startsWith("/resources/") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
