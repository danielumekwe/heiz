"use client";

import { useMemo, useState } from "react";
import { CatalogCard } from "@/components/CatalogCard";
import { catalog, catalogCategories } from "@/data/catalog";

const ALL = "All";

export function ProductCategoryTabs() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const categories = [ALL, ...catalogCategories];
  const products = useMemo(() => {
    if (activeCategory === ALL) return catalog;
    return catalog.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="eyebrow">Product range</p>
        <div
          aria-label="Product categories"
          className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0"
        >
          {categories.map((category) => {
            const active = category === activeCategory;
            const count =
              category === ALL
                ? catalog.length
                : catalog.filter((product) => product.category === category).length;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category)}
                className={`flex min-h-12 w-max shrink-0 items-center justify-between gap-5 border px-4 text-left font-display text-sm font-semibold transition-colors lg:w-full ${
                  active
                    ? "border-forest-800 bg-forest-800 text-cream"
                    : "border-sand bg-white text-charcoal hover:border-forest-800 hover:text-forest-800"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`font-sans text-xs font-normal ${
                    active ? "text-cream/80" : "text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <div>
        <div className="flex flex-col gap-4 border-b border-sand pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-[1.55rem] font-semibold">
              {activeCategory === ALL ? "All products" : activeCategory}
            </h3>
            <p className="mt-2 text-[0.98rem] text-muted">
              {products.length} {products.length === 1 ? "product" : "products"} available
              for enquiry.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <CatalogCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
