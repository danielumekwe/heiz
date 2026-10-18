import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, site } from "@/data/site";
import { locales, localizePath, ogLocales } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { languageAlternates } from "@/lib/metadata";
import "../globals.css";

const heading = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/** One prerendered version of the site per language. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  const locale = await getLocale();
  const title = `${site.name} | ${t("Premium Wood Pellets for Biomass Heating")}`;
  const description = t(site.description);
  const alternates = languageAlternates(locale, "/");

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description,
    applicationName: site.name,
    alternates,
    icons: { icon: "/icon.png" },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocales[locale],
      title,
      description,
      url: alternates.canonical,
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: ["/opengraph-image.jpg"] },
  };
}

export const viewport: Viewport = {
  themeColor: "#1f4a36",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const t = await getT();
  const locale = await getLocale();
  const { email, phone } = site.contact;

  return (
    <html
      lang={locale}
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: absoluteUrl(localizePath(locale, "/")),
            description: t(site.description),
            ...(email ? { email } : {}),
            ...(phone ? { telephone: phone } : {}),
            address: { "@type": "PostalAddress", ...site.postalAddress },
          }}
        />
        {/* Shown: measures our online advertising (see the privacy policy, section 3.3). */}
        <Script src="https://shown.io/metrics/5M0ZDWmB8P" strategy="afterInteractive" />
      </body>
    </html>
  );
}
