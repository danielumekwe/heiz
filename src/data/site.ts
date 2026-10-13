/**
 * Central site configuration.
 *
 * Contact details come from the 1heiz product brochure. The remaining company
 * fields (legal name, registration, VAT ID) stay empty until 1heiz supplies
 * them; components render each field only when it is present, so nothing here
 * should be filled with placeholder or invented values.
 */

type SiteConfig = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  copyrightYear: number;
  company: { legalName: string; registration: string; vatId: string; address: string };
  contact: { email: string; phone: string };
  postalAddress: {
    streetAddress: string;
    postalCode: string;
    addressLocality: string;
    addressCountry: string;
  };
};

export const site: SiteConfig = {
  name: "1heiz Wood Pellets",
  shortName: "1heiz",
  tagline: "Premium wood pellets for homes, businesses and wholesale buyers.",
  description:
    "1heiz supplies wood pellets in bagged, bulk and wholesale formats, along with briquettes, firewood and round logs. Tell us what you need and request a quote.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://1heizwoodpellets.com",
  locale: "en",
  copyrightYear: 2026,
  company: {
    legalName: "",
    registration: "",
    vatId: "",
    address: "Diezmannstraße 12\n04207 Leipzig\nGermany",
  },
  contact: {
    email: "info@1heizwoodpellets.com",
    phone: "+49 163 6468934",
  },
  postalAddress: {
    streetAddress: "Diezmannstraße 12",
    postalCode: "04207",
    addressLocality: "Leipzig",
    addressCountry: "DE",
  },
};

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Bulk Supply", href: "/bulk-supply" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "About Us", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const supplyNav: NavItem[] = [
  { label: "Premium Wood Pellets", href: "/products/premium-wood-pellets" },
  { label: "Bagged Wood Pellets", href: "/products/bagged-wood-pellets" },
  { label: "Bulk Wood Pellets", href: "/products/bulk-wood-pellets" },
  { label: "Wholesale Supply", href: "/wholesale" },
  { label: "Full Product Range", href: "/products#range" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Legal Notice", href: "/legal-notice" },
  { label: "Image Credits", href: "/image-credits" },
];

export const brochure = {
  href: "/1heiz_wood_pellets_print_brochure.pdf",
  downloadName: "1heiz-wood-pellets-brochure.pdf",
  meta: "PDF, 4 pages, 0.7 MB",
  cover: {
    src: "/images/brand/1heiz-brochure-cover.webp",
    width: 900,
    height: 1274,
  },
};

export const quoteHref = "/contact#enquiry";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
