import Link from "@/components/LocaleLink";
import type { ImageKey } from "@/data/images";
import { getT } from "@/i18n/server";
import { Photo } from "./Photo";
import { T } from "./T";

export type ProductCardProps = {
  href: string;
  title: string;
  description: string;
  image: ImageKey;
  cta: string;
  quoteHref?: string;
  label?: string;
  note?: string;
};

/** Product teaser. Text props are given in English and translated here. */
export async function ProductCard({
  href,
  title,
  description,
  image,
  cta,
  quoteHref,
  label,
  note,
}: ProductCardProps) {
  const t = await getT();

  return (
    <article className="group flex flex-col">
      <Link href={href} className="block">
        <Photo
          image={image}
          frame="aspect-[4/5]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        {label ? <p className="eyebrow">{t(label)}</p> : null}
        <h3 className="mt-2 text-[1.35rem] font-semibold">
          <Link href={href} className="group-hover:text-forest-800">
            {t(title)}
          </Link>
        </h3>
        <p className="mt-2 text-[0.97rem] text-muted">{t(description)}</p>
        {note ? <p className="mt-2 text-sm text-muted/90">{t(note)}</p> : null}
        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          <Link
            href={href}
            className="inline-flex min-h-11 items-center gap-2 font-display text-[0.95rem] font-semibold text-forest-800 underline decoration-forest-800/30 underline-offset-[6px] hover:decoration-forest-800"
          >
            {t(cta)}
            <svg
              viewBox="0 0 20 20"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          {quoteHref ? (
            <Link
              href={quoteHref}
              className="inline-flex min-h-11 items-center justify-center border border-forest-800 px-4 py-2 font-display text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-800 hover:text-cream"
            >
              <T>Request a Quote</T>
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
