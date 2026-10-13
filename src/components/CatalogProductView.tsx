import Image from "next/image";
import type { CatalogProduct } from "@/data/catalog";
import { catalog, categoryAnchor } from "@/data/catalog";
import { BrochureButton } from "./Brochure";
import { Breadcrumbs } from "./Breadcrumbs";
import { ButtonLink } from "./ButtonLink";
import { CatalogCard } from "./CatalogCard";
import { CatalogVisual } from "./CatalogVisual";
import { CtaBand } from "./CtaBand";
import { SectionHeading } from "./SectionHeading";

/** Detail page for a product imported from the previous shop. */
export function CatalogProductView({ product }: { product: CatalogProduct }) {
  const enquiryHref = `/contact?type=range&product=${product.slug}#enquiry`;
  const [, ...morePhotos] = product.images;
  const related = catalog
    .filter(
      (item) => item.category === product.category && item.slug !== product.slug,
    )
    .slice(0, 4);
  const illustrative = product.images.length === 0 && product.illustration;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          {
            label: product.category,
            href: `/products#${categoryAnchor(product.category)}`,
          },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
      />

      <section className="border-b border-sand/70 bg-cream">
        <div className="site-container grid gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <CatalogVisual
              product={product}
              frame="aspect-[4/3]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            {morePhotos.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {morePhotos.map((photo) => (
                  <div
                    key={photo.src}
                    className="relative aspect-[3/2] overflow-hidden bg-beige"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            {product.conceptPackaging ? (
              <p className="mt-3 text-sm text-muted">
                Packaging shown is a design concept. Final packaging may differ.
              </p>
            ) : null}
            {illustrative ? (
              <p className="mt-3 text-sm text-muted">
                Illustrative image. Ask us for photos of the current product.
              </p>
            ) : null}
          </div>

          <div className="lg:py-4">
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-4 text-[2.2rem] font-semibold sm:text-[2.75rem]">
              {product.name}
            </h1>
            <p className="mt-6 text-[1.1rem] text-muted">{product.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={enquiryHref}>Request a Quote</ButtonLink>
              <BrochureButton />
            </div>
            <p className="mt-6 border-t border-sand pt-5 text-sm text-muted">
              Price, availability and delivery are confirmed for each enquiry.
              {product.qualityNote
                ? " Quality and certification documents for the product on offer are provided with your quote."
                : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-container max-w-3xl py-14 lg:py-20">
          <h2 className="sr-only">Product details</h2>
          <div className="prose-1heiz text-[1.05rem]">
            {product.body.map((block, index) => {
              if (block.type === "heading")
                return <h3 key={index}>{block.text}</h3>;
              if (block.type === "list")
                return (
                  <ul key={index}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              return <p key={index}>{block.text}</p>;
            })}
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-cream">
          <div className="site-container py-16 lg:py-20">
            <SectionHeading
              eyebrow="Related"
              title={`More in ${product.category}`}
            />
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <CatalogCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        title={`Enquire about ${product.name}`}
        body="Send us your quantity and delivery location and we will confirm availability and pricing."
        cta="Request a Quote"
        href={enquiryHref}
      />
    </>
  );
}
