import { Suspense } from "react";
import { quoteHref } from "@/data/site";
import { ButtonLink } from "./ButtonLink";
import { DesktopLinks, SiteNav } from "./SiteNav";
import { Wordmark } from "./Wordmark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-paper/95 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <div className="site-container relative flex h-[4.5rem] items-center justify-between gap-6">
        <Wordmark />
        <nav aria-label="Main" className="flex items-center gap-7">
          <Suspense fallback={<DesktopLinks pathname={null} />}>
            <SiteNav />
          </Suspense>
        </nav>
        <div className="hidden xl:block">
          <ButtonLink href={quoteHref}>Request a Quote</ButtonLink>
        </div>
      </div>
    </header>
  );
}
