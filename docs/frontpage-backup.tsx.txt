import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { BrochureBand } from "@/components/Brochure";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { HeroSlider } from "@/components/HeroSlider";
import { NumberedList } from "@/components/NumberedList";
import { Photo } from "@/components/Photo";
import { ProductCard, type ProductCardProps } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitSection } from "@/components/SplitSection";
import { images } from "@/data/images";
import { catalog, catalogCategories, categoryAnchor } from "@/data/catalog";
import { products } from "@/data/products";
import { articles } from "@/data/resources";
import { quoteHref } from "@/data/site";

const offerings: ProductCardProps[] = [
  ...products.map((product) => ({
    href: `/products/${product.slug}`,
    title: product.name,
    description: product.summary,
    image: product.image,
    cta: product.cardCta,
    label: product.category,
    note: product.conceptPackaging ? "Packaging shown is a design concept." : undefined,
  })),
  {
    href: "/wholesale",
    title: "Wholesale Supply",
    description:
      "Palletised and bulk volumes for retailers, distributors and businesses buying at scale.",
    image: "warehouse",
    cta: "Request Wholesale Pricing",
    label: "Trade",
  },
];

const strengths = [
  {
    title: "Product details up front",
    body: "Every quote sets out the product on offer, its specification and the supply format, so you know what you are ordering.",
  },
  {
    title: "Formats to suit how you heat",
    body: "Bagged pellets for stoves and smaller stores, bulk supply for automated systems, and wholesale volumes for the trade.",
  },
  {
    title: "A straightforward enquiry",
    body: "Tell us the quantity and delivery location. We reply with availability and pricing rather than a generic price list.",
  },
  {
    title: "Support for trade buyers",
    body: "Retailers and distributors can discuss volumes, packaging and seasonal planning directly with us.",
  },
];

const supplyRoutes = [
  {
    title: "Bagged orders",
    body: "By the bag or by the pallet, for households and sites without a bulk store.",
    href: "/products/bagged-wood-pellets",
    cta: "Bagged pellets",
  },
  {
    title: "Bulk supply",
    body: "Loose pellets for properties and businesses with a pellet store or silo.",
    href: "/bulk-supply",
    cta: "Explore bulk supply",
  },
  {
    title: "Wholesale and commercial",
    body: "Volume supply for resellers, distributors and commercial heating operators.",
    href: "/wholesale",
    cta: "Wholesale enquiries",
  },
];

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

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Certification marks */}
      <section className="bg-white" aria-label="Certification marks">
        <div className="site-container py-8 sm:py-10 lg:py-12">
          <div className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-4 lg:gap-x-14">
            {certificationLogos.map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                width={626}
                height={454}
                sizes="(min-width: 1024px) 11rem, (min-width: 640px) 9rem, 8rem"
                className="h-20 w-auto object-contain sm:h-24 lg:h-28"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products and supply options */}
      <section className="bg-paper">
        <div className="site-container py-16 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Products & supply" title="One fuel, supplied the way you need it">
              <p>
                Choose the format that fits your appliance, your storage and the
                volume you use.
              </p>
            </SectionHeading>
            <ArrowLink href="/products">View all products</ArrowLink>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map((offering) => (
              <ProductCard key={offering.href} {...offering} />
            ))}
          </div>

          <div className="mt-16 border-t border-sand pt-8">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-wood-700">
              Also in our range
            </h3>
            <ul className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
              {catalogCategories.map((category) => (
                <li key={category} className="border-b border-sand">
                  <Link
                    href={`/products#${categoryAnchor(category)}`}
                    className="group flex min-h-14 items-center justify-between gap-4 font-display text-[1.1rem] font-semibold text-charcoal hover:text-forest-800"
                  >
                    {category}
                    <span className="font-sans text-sm font-normal text-muted">
                      {catalog.filter((item) => item.category === category).length}{" "}
                      products
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quality and trust */}
      <section className="bg-cream">
        <div className="site-container grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28">
          <div>
            <SectionHeading eyebrow="How we work" title="Clear information before you order">
              <p>
                Buying fuel should not involve guesswork. Our approach is to be
                specific about the product, the format and the price.
              </p>
            </SectionHeading>
            <Photo
              image="hands"
              frame="aspect-[3/2]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-10"
            />
          </div>
          <div className="lg:pt-4">
            <NumberedList items={strengths} />
          </div>
        </div>
      </section>

      {/* About */}
      <SplitSection image="production" imageSide="right">
        <SectionHeading
          eyebrow="About 1heiz"
          title="Wood Pellets. Quality Supply. Trusted Service."
        >
          <p>
            1heiz supplies wood pellets for biomass heating. We work with
            households running pellet stoves and boilers, with businesses that
            heat with biomass, and with wholesale buyers who need dependable
            volumes.
          </p>
          <p>
            Every order starts with a conversation: what you heat, how much you
            use and where it needs to go. From there we confirm the product and
            the terms in a written quote.
          </p>
        </SectionHeading>
        <ArrowLink href="/about" className="mt-7">
          More about 1heiz
        </ArrowLink>
      </SplitSection>

      {/* Sustainability */}
      <section className="on-dark relative isolate overflow-hidden bg-forest-950">
        <Image
          src={images.forest.src}
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-forest-950/70" />
        <div className="site-container grid gap-10 py-20 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <div>
            <p className="eyebrow">Sustainability</p>
            <h2 className="mt-3 text-[2rem] font-semibold text-cream sm:text-[2.5rem] lg:text-[2.85rem]">
              A wood fuel that depends on responsible sourcing
            </h2>
          </div>
          <div className="space-y-4 text-[1.05rem] text-cream/85">
            <p>
              Wood pellets are typically made from sawdust and other residues of
              the timber industry, compressed into a dense, dry fuel for biomass
              heating.
            </p>
            <p>
              How sustainable that fuel is depends on where the wood comes from
              and how the forests behind it are managed. That is why the origin
              of the raw material matters as much as the pellet itself.
            </p>
            <ArrowLink href="/sustainability" tone="light" className="mt-3">
              Read our approach
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Supply and distribution */}
      <section className="bg-paper">
        <div className="site-container py-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading eyebrow="Supply & distribution" title="From a single pallet to regular bulk deliveries">
                <p>
                  Availability and delivery depend on your location and the
                  quantity you need, so we confirm both for each enquiry.
                </p>
              </SectionHeading>
              <ul className="mt-8">
                {supplyRoutes.map((route) => (
                  <li
                    key={route.href}
                    className="flex flex-col gap-2 border-t border-sand py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                  >
                    <div>
                      <h3 className="text-[1.15rem] font-semibold">{route.title}</h3>
                      <p className="mt-1 text-[0.97rem] text-muted">{route.body}</p>
                    </div>
                    <ArrowLink href={route.href} className="shrink-0">
                      {route.cta}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
              <ButtonLink href={quoteHref} className="mt-6">
                Request a Quote
              </ButtonLink>
            </div>
            <div className="grid grid-cols-5 gap-4 self-start">
              <Photo
                image="forklift"
                frame="aspect-[3/4]"
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="col-span-3"
              />
              <Photo
                image="bulkHall"
                frame="aspect-[1/2]"
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="col-span-2 mt-10"
              />
            </div>
          </div>
        </div>
      </section>

      <BrochureBand background="bg-cream" />

      {/* Heating at home */}
      <section className="bg-beige">
        <div className="site-container grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-24">
          <Photo
            image="stove"
            frame="aspect-[2/1]"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <div>
            <p className="eyebrow">Heating with pellets</p>
            <h2 className="mt-3 text-[1.9rem] font-semibold sm:text-[2.3rem]">
              Steady warmth from a stove or boiler
            </h2>
            <p className="mt-4 text-[1.05rem] text-muted">
              Pellet appliances meter their own fuel, which makes wood heating
              simple to live with. Our guide covers what running one involves.
            </p>
            <ArrowLink href="/resources/wood-pellets-for-biomass-heating" className="mt-5">
              Wood pellets for biomass heating
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-paper">
        <div className="site-container py-16 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Resources" title="Practical guidance on buying and using pellets" />
            <ArrowLink href="/resources">All resources</ArrowLink>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
