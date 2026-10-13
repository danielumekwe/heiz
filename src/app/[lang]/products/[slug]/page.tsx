import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrochureButton } from "@/components/Brochure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { CatalogProductView } from "@/components/CatalogProductView";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { catalog, getCatalogProduct } from "@/data/catalog";
import { getProduct, products } from "@/data/products";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { T } from "@/components/T";

export function generateStaticParams() {
  return [...products, ...catalog].map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug) ?? getCatalogProduct(slug);
  if (!product) return {};

  return pageMetadata({
    title: product.name,
    description: product.summary,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    const catalogProduct = getCatalogProduct(slug);
    if (!catalogProduct) notFound();
    return <CatalogProductView product={catalogProduct} />;
  }

  const t = await getT();
  const [mainImage, ...moreImages] = product.gallery;
  const related = product.related
    .map((relatedSlug) => getProduct(relatedSlug))
    .filter((item) => item !== undefined);
  const enquiryHref = `/contact?type=${product.enquiryType}#enquiry`;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
      />

      <section className="border-b border-sand/70 bg-cream">
        <div className="site-container grid gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <Photo
              image={mainImage}
              frame={product.conceptPackaging ? "aspect-[4/5]" : "aspect-[4/3]"}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            {moreImages.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {moreImages.map((image) => (
                  <Photo
                    key={image}
                    image={image}
                    frame="aspect-[3/2]"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                ))}
              </div>
            ) : null}
            {product.conceptPackaging ? (
              <p className="mt-3 text-sm text-muted">
                <T>The 1heiz bag shown is a packaging design concept. Final
                packaging may differ.</T>
              </p>
            ) : null}
          </div>

          <div className="lg:py-4">
            <p className="eyebrow">{t(product.category)}</p>
            <h1 className="mt-4 text-[2.4rem] font-semibold sm:text-5xl">
              {t(product.name)}
            </h1>
            <div className="mt-6 space-y-4 text-[1.05rem] text-muted">
              {product.overview.map((paragraph) => (
                <p key={paragraph}>{t(paragraph)}</p>
              ))}
            </div>

            <h2 className="mt-10 font-display text-sm font-semibold uppercase tracking-[0.16em] text-wood-700">
              <T>Suited to</T>
            </h2>
            <ul className="mt-3">
              {product.suitedTo.map((use) => (
                <li
                  key={use}
                  className="flex items-center gap-3 border-t border-sand py-3 text-charcoal last:border-b"
                >
                  <span aria-hidden="true" className="size-1.5 shrink-0 bg-forest-800" />
                  {t(use)}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={enquiryHref}><T>Request a Quote</T></ButtonLink>
              <BrochureButton />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-container grid gap-14 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div>
            <SectionHeading eyebrow="Specification" title="Technical details">
              <p>
                <T>We publish specification figures only once they are confirmed
                for the product on offer. The current values are included with
                every quote.</T>
              </p>
            </SectionHeading>
            <dl className="mt-8">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-2 gap-4 border-t border-sand py-4 last:border-b"
                >
                  <dt className="font-display font-semibold text-charcoal">
                    {t(spec.label)}
                  </dt>
                  <dd className={spec.value ? "text-charcoal" : "text-muted"}>
                    {spec.value ? t(spec.value) : t("Confirmed with your quote")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionHeading eyebrow="Supply" title="How it is supplied">
              <p>
                <T>Delivery areas, lead times and minimum quantities are confirmed
                for each enquiry based on your location.</T>
              </p>
            </SectionHeading>
            <div className="mt-8">
              {product.supply.map((option) => (
                <div key={option.title} className="border-t border-sand py-5 last:border-b">
                  <h3 className="text-[1.15rem] font-semibold">{t(option.title)}</h3>
                  <p className="mt-1.5 text-[0.97rem] text-muted">{t(option.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-cream">
          <div className="site-container py-16 lg:py-24">
            <SectionHeading eyebrow="Related" title="Other supply options" />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  title={item.name}
                  description={item.summary}
                  image={item.image}
                  cta="View details"
                  quoteHref={`/contact?type=${item.enquiryType}&product=${item.slug}#enquiry`}
                  label={item.category}
                />
              ))}
              <ProductCard
                href="/wholesale"
                title="Wholesale Supply"
                description="Palletised and bulk volumes for retailers, distributors and businesses buying at scale."
                image="warehouse"
                cta="Request Wholesale Pricing"
                quoteHref="/contact?type=wholesale#enquiry"
                label="Trade"
              />
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Enquire about {product}"
        titleVars={{ product: t(product.name) }}
        body="Send us your quantity and delivery location and we will confirm availability and pricing."
        cta="Request a Quote"
        href={enquiryHref}
      />
    </>
  );
}
