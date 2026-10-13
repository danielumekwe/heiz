import Link from "next/link";
import type { CatalogProduct } from "@/data/catalog";
import { CatalogVisual } from "./CatalogVisual";

export function CatalogCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="group relative flex flex-col">
      <CatalogVisual
        product={product}
        frame="aspect-[4/3]"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col border-b border-sand pb-5 pt-4">
        <h3 className="text-[1.15rem] font-semibold">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 group-hover:text-forest-800"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.93rem] text-muted">
          {product.summary}
        </p>
      </div>
    </article>
  );
}
