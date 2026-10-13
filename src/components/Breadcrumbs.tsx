import Link from "@/components/LocaleLink";
import { absoluteUrl } from "@/data/site";
import { localizePath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href: string };

/** Breadcrumb trail. Labels are given in English and translated here. */
export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = await getT();
  const locale = await getLocale();
  const trail = [{ label: "Home", href: "/" }, ...items].map((crumb) => ({
    ...crumb,
    label: t(crumb.label),
  }));

  return (
    <nav aria-label={t("Breadcrumb")} className="bg-cream">
      <ol className="site-container flex flex-wrap items-center gap-x-2 pt-6 text-sm text-muted">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-x-2">
              {last ? (
                <span aria-current="page" className="py-2 text-charcoal">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="py-2 hover:text-forest-800 hover:underline hover:underline-offset-4"
                  >
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-sand">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: absoluteUrl(localizePath(locale, crumb.href)),
          })),
        }}
      />
    </nav>
  );
}
