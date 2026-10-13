"use client";

import { useMemo, useState } from "react";
import type { LocalizedCatalogProduct } from "@/i18n/content";
import { interpolate } from "@/i18n/translate";
import { CatalogCard, type CatalogCardLabels } from "./CatalogCard";

const ALL = "__all";

export type ProductCategoryTabsLabels = {
  eyebrow: string;
  groupLabel: string;
  all: string;
  allProducts: string;
  /** e.g. "{count} product available for enquiry." */
  countOne: string;
  countMany: string;
  card: CatalogCardLabels;
};

/** Category filter and product grid. Products, categories and labels arrive translated. */
export function ProductCategoryTabs({
  products: allProducts,
  categories,
  labels,
}: {
  products: LocalizedCatalogProduct[];
  categories: { id: string; label: string }[];
  labels: ProductCategoryTabsLabels;
}) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const tabs = [{ id: ALL, label: labels.all }, ...categories];
  const products = useMemo(() => {
    if (activeCategory === ALL) return allProducts;
    return allProducts.filter((product) => product.category === activeCategory);
  }, [activeCategory, allProducts]);
  const activeLabel =
    activeCategory === ALL
      ? labels.allProducts
      : (categories.find((category) => category.id === activeCategory)?.label ?? "");

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12">
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <p className="eyebrow">{labels.eyebrow}</p>
        <div
          role="group"
          aria-label={labels.groupLabel}
          className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0"
        >
          {tabs.map((tab) => {
            const active = tab.id === activeCategory;
            const count =
              tab.id === ALL
                ? allProducts.length
                : allProducts.filter((product) => product.category === tab.id).length;

            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex min-h-12 w-max shrink-0 items-center justify-between gap-5 border px-4 text-left font-display text-sm font-semibold transition-colors lg:w-full ${
                  active
                    ? "border-forest-800 bg-forest-800 text-cream"
                    : "border-sand bg-white text-charcoal hover:border-forest-800 hover:text-forest-800"
                }`}
              >
                <span>{tab.label}</span>
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

      <div className="min-w-0">
        <div className="flex flex-col gap-4 border-b border-sand pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-[1.55rem] font-semibold">{activeLabel}</h3>
            <p className="mt-2 text-[0.98rem] text-muted">
              {interpolate(products.length === 1 ? labels.countOne : labels.countMany, {
                count: products.length,
              })}
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <CatalogCard key={product.slug} product={product} labels={labels.card} />
          ))}
        </div>
      </div>
    </div>
  );
}
