import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Premium Wood Pellets for Biomass Heating`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    title: `${site.name} | Premium Wood Pellets for Biomass Heating`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1f4a36",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { email, phone } = site.contact;

  return (
    <html
      lang={site.locale}
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
            url: site.url,
            description: site.description,
            ...(email ? { email } : {}),
            ...(phone ? { telephone: phone } : {}),
            address: { "@type": "PostalAddress", ...site.postalAddress },
          }}
        />
      </body>
    </html>
  );
}
