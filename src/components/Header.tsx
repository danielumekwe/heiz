import { Suspense } from "react";
import { catalog, catalogCategories } from "@/data/catalog";
import { products } from "@/data/products";
import { mainNav, quoteHref } from "@/data/site";
import { getT } from "@/i18n/server";
import { ButtonLink } from "./ButtonLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DesktopLinks, SiteNav } from "./SiteNav";
import { Wordmark } from "./Wordmark";

export async function Header() {
  const t = await getT();
  // Products grouped by category for the dropdown under "Products".
  const productGroups = catalogCategories
    .map((category) => ({
      label: t(category),
      items: [
        ...(category === "Wood Pellets"
          ? products.map((product) => ({
              label: t(product.name),
              href: `/products/${product.slug}`,
            }))
          : []),
        ...catalog
          .filter((product) => product.category === category)
          .map((product) => ({
            label: t(product.name),
            href: `/products/${product.slug}`,
          })),
      ],
    }))
    .filter((group) => group.items.length > 0);

  const items = mainNav.map((item) => ({
    ...item,
    label: t(item.label),
    ...(item.href === "/products" ? { groups: productGroups } : {}),
  }));
  const quoteLabel = t("Request a Quote");
  const languageLabel = t("Language");

  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-paper/95 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-cream"
      >
        {t("Skip to content")}
      </a>
      <div className="site-container relative flex h-[4.5rem] items-center justify-between gap-4 2xl:gap-6">
        <Wordmark />
        <nav aria-label={t("Main")} className="flex items-center gap-4">
          <Suspense
            fallback={
              <DesktopLinks items={items} pathname={null} viewAllLabel={t("See all products")} />
            }
          >
            <SiteNav
              items={items}
              quoteHref={quoteHref}
              labels={{
                quote: quoteLabel,
                openMenu: t("Open menu"),
                closeMenu: t("Close menu"),
                mobile: t("Mobile"),
                viewAll: t("See all products"),
                showSubmenu: t("Show {name} menu"),
                hideSubmenu: t("Hide {name} menu"),
                language: languageLabel,
              }}
            />
          </Suspense>
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <Suspense fallback={null}>
            <LanguageSwitcher label={languageLabel} />
          </Suspense>
          <ButtonLink href={quoteHref}>{quoteLabel}</ButtonLink>
        </div>
      </div>
    </header>
  );
}
