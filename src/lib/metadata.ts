import type { Metadata } from "next";
import { site } from "@/data/site";

// Served by src/app/opengraph-image.jpg.
const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Wood pellets with the 1heiz Wood Pellets wordmark",
};

/** Per-page metadata with a canonical URL and matching Open Graph fields. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      title: `${title} | ${site.name}`,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [shareImage.url],
    },
  };
}
