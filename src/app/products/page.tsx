import { ButtonLink } from "@/components/ButtonLink";
import { BrochureBand, BrochureButton } from "@/components/Brochure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { NumberedList } from "@/components/NumberedList";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { ProductCategoryTabs } from "@/components/ProductCategoryTabs";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/data/products";
import { quoteHref } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Wood Pellet Products",
  description:
    "Wood pellets in bagged and bulk formats, plus briquettes, firewood, round logs, agricultural pellets and pallets from 1heiz. Request a quote.",
  path: "/products",
});

const steps = [
  {
    title: "Tell us what you heat",
    body: "A stove, a boiler or a commercial system, and the pellet size its manufacturer specifies.",
  },
  {
    title: "Choose a format",
    body: "Bagged for hand-filled appliances and limited storage, bulk for automated systems with a pellet store.",
  },
  {
    title: "Receive your quote",
    body: "We confirm availability, product specification, price and delivery arrangements in writing.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Products", href: "/products" }]} />
      <PageHero
        eyebrow="Products"
        title="Wood pellets and the wider range"
        intro="Wood pellets in bagged and bulk formats, plus briquettes, firewood, round logs and more. Pick the product closest to your needs and we will confirm the details in a quote."
        image="pelletsCloseup"
      >
        <ButtonLink href={quoteHref}>Request a Quote</ButtonLink>
        <BrochureButton />
      </PageHero>

      <section className="bg-paper">
        <div className="site-container py-16 lg:py-24">
          <SectionHeading eyebrow="Wood pellets" title="Pellets and supply formats" />
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                href={`/products/${product.slug}`}
                title={product.name}
                description={product.summary}
                image={product.image}
                cta="View details"
                quoteHref={`/contact?type=${product.enquiryType}&product=${product.slug}#enquiry`}
                label={product.category}
                note={
                  product.conceptPackaging
                    ? "Packaging shown is a design concept."
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section id="range" className="scroll-mt-24 border-t border-sand/70 bg-paper">
        <div className="site-container py-16 lg:py-24">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <SectionHeading eyebrow="Full range" title="Browse by category">
              <p>
                Use All to see the complete range, or choose a category to
                narrow the list.
              </p>
            </SectionHeading>
            <p>
              Alongside wood pellets we supply briquettes, firewood, round
              logs, agricultural pellets and bedding, and pallets and crates.
            </p>
          </div>
          <ProductCategoryTabs />
        </div>
      </section>

      <section className="bg-cream">
        <div className="site-container grid gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <SectionHeading eyebrow="How ordering works" title="An enquiry-led service">
            <p>
              We do not sell through an online checkout. Prices and availability
              are confirmed for each enquiry, so the quote you receive reflects
              your quantity and delivery location.
            </p>
          </SectionHeading>
          <NumberedList items={steps} />
        </div>
      </section>

      <BrochureBand background="bg-paper" />

      <CtaBand
        title="Not sure which format you need?"
        body="Describe your heating system and storage, and we will point you to the right option."
        cta="Ask 1heiz"
      />
    </>
  );
}
