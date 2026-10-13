import Link from "next/link";
import type { CatalogProduct } from "@/data/catalog";
import { CatalogVisual } from "./CatalogVisual";

export function CatalogCard({ product }: { product: CatalogProduct }) {
  const enquiryHref = `/contact?type=range&product=${product.slug}#enquiry`;

  return (
    <article className="group flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <CatalogVisual
          product={product}
          frame="aspect-[4/3]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col border-b border-sand pb-5 pt-4">
        <h3 className="text-[1.15rem] font-semibold">
          <Link
            href={`/products/${product.slug}`}
            className="group-hover:text-forest-800"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.93rem] text-muted">
          {product.summary}
        </p>
        <div className="mt-auto pt-5">
          <Link
            href={enquiryHref}
            className="inline-flex min-h-11 items-center justify-center border border-forest-800 px-4 py-2 font-display text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-800 hover:text-cream"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
