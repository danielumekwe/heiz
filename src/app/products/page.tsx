import { ButtonLink } from "@/components/ButtonLink";
import { BrochureBand, BrochureButton } from "@/components/Brochure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CatalogCard } from "@/components/CatalogCard";
import { CtaBand } from "@/components/CtaBand";
import { NumberedList } from "@/components/NumberedList";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { catalog, catalogCategories, categoryAnchor } from "@/data/catalog";
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
          <SectionHeading eyebrow="Full range" title="Wood fuels, timber and packaging">
            <p>
              Alongside wood pellets we supply briquettes, firewood, round
              logs, agricultural pellets and bedding, and pallets and crates.
            </p>
          </SectionHeading>
          <nav aria-label="Product categories" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {catalogCategories.map((category) => (
                <li key={category}>
                  <a
                    href={`#${categoryAnchor(category)}`}
                    className="inline-flex min-h-11 items-center border border-sand px-4 font-display text-sm font-semibold text-charcoal transition-colors hover:border-forest-800 hover:text-forest-800"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {catalogCategories.map((category) => {
            const items = catalog.filter((item) => item.category === category);
            if (items.length === 0) return null;
            return (
              <div
                key={category}
                id={categoryAnchor(category)}
                className="mt-14 scroll-mt-28"
              >
                <h3 className="flex items-baseline gap-3 border-b border-charcoal/80 pb-3 text-[1.5rem] font-semibold">
                  {category}
                  <span className="font-sans text-sm font-normal text-muted">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </span>
                </h3>
                <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((item) => (
                    <CatalogCard key={item.slug} product={item} />
                  ))}
                </div>
              </div>
            );
          })}
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
