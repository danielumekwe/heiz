import {
  catalogCardLabels,
  localizeCatalog,
  localizeCatalogCategories,
} from "@/i18n/content";
import { getT } from "@/i18n/server";
import { ProductCategoryTabs } from "./ProductCategoryTabs";

/** Server wrapper that hands the translated catalogue to the category tabs. */
export async function CatalogBrowser() {
  const t = await getT();

  return (
    <ProductCategoryTabs
      products={localizeCatalog(t)}
      categories={localizeCatalogCategories(t)}
      labels={{
        eyebrow: t("Product range"),
        groupLabel: t("Product categories"),
        all: t("All"),
        allProducts: t("All products"),
        countOne: t("{count} product available for enquiry."),
        countMany: t("{count} products available for enquiry."),
        card: catalogCardLabels(t),
      }}
    />
  );
}
