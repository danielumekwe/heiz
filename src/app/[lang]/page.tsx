import Image from "next/image";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { Hero } from "@/components/Hero";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { quoteHref } from "@/data/site";
import { getT } from "@/i18n/server";
import { T } from "@/components/T";

const certificationLogos = [
  {
    src: "/bsl-certified (1).jpg",
    alt: "BSL authorised certification mark",
  },
  {
    src: "/FSC-Certified (1).jpg",
    alt: "FSC responsible forestry certification mark",
  },
  {
    src: "/uk-325-1 (1).jpg",
    alt: "ENplus certification mark",
  },
  {
    src: "/uk-325-A2 (1).jpg",
    alt: "ENplus A2 certification mark",
  },
];

const quoteDetails = [
  "Delivery postcode and access",
  "Bagged, bulk or wholesale format",
  "Quantity required",
  "Product specification and availability",
];

export default async function HomePage() {
  const t = await getT();

  return (
    <>
      <Hero />

      <section className="bg-white" aria-label={t("Certification marks")}>
        <div className="site-container py-7 sm:py-8">
          <div className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-items-center gap-x-8 gap-y-5 sm:grid-cols-4 lg:gap-x-14">
            {certificationLogos.map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt={t(logo.alt)}
                width={626}
                height={454}
                sizes="(min-width: 1024px) 10rem, (min-width: 640px) 8rem, 7rem"
                className="h-16 w-auto object-contain sm:h-20 lg:h-24"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-container py-14 lg:py-20">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <SectionHeading
              eyebrow="Products"
              title="Browse the range by category"
            >
              <p>
                <T>Use All to see every product, or choose a category to narrow the
                list without leaving the front page.</T>
              </p>
            </SectionHeading>
            <div className="grid gap-3 text-sm text-muted sm:grid-cols-2">
              <p className="border-l border-sand pl-4">
                <T>Wood pellets, briquettes, firewood, logs, agri pellets, bedding,
                pallets and crates.</T>
              </p>
              <p className="border-l border-sand pl-4">
                <T>Quotes are based on availability, quantity and delivery location.</T>
              </p>
            </div>
          </div>
          <CatalogBrowser />
        </div>
      </section>

      <section className="bg-cream">
        <div className="site-container grid gap-10 py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow"><T>What we sell</T></p>
            <h2 className="mt-3 text-[2rem] font-semibold sm:text-[2.45rem]">
              <T>Premium wood pellets for steady biomass heating</T>
            </h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] text-muted">
              <T>1heiz supplies compressed wood pellets for pellet stoves,
              automated boilers, businesses and trade buyers. If you need a
              specific product class or delivery format, tell us at enquiry and
              we will confirm what is available.</T>
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quoteHref}><T>Request a Quote</T></ButtonLink>
              <ButtonLink href="/products" variant="outline">
                <T>View Products</T>
              </ButtonLink>
            </div>
          </div>
          <Photo
            image="bag"
            frame="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-container grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-20">
          <Photo
            image="forklift"
            frame="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div>
            <SectionHeading
              eyebrow="Straightforward quotes"
              title="Tell us the job. We confirm the supply."
            >
              <p>
                <T>No vague price list and no invented promises. A useful quote
                needs the delivery details, the volume and the right format.</T>
              </p>
            </SectionHeading>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {quoteDetails.map((item) => (
                <li
                  key={item}
                  className="border-t border-sand pt-3 font-display text-[1.02rem] font-semibold text-charcoal"
                >
                  {t(item)}
                </li>
              ))}
            </ul>
            <ArrowLink href="/contact#enquiry" className="mt-7">
              <T>Send an enquiry</T>
            </ArrowLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
