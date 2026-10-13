import Link from "next/link";
import { absoluteUrl } from "@/data/site";
import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="bg-cream">
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
            item: absoluteUrl(crumb.href),
          })),
        }}
      />
    </nav>
  );
}
