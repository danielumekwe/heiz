import Link from "next/link";
import type { ImageKey } from "@/data/images";
import { Photo } from "./Photo";

export type ProductCardProps = {
  href: string;
  title: string;
  description: string;
  image: ImageKey;
  cta: string;
  label?: string;
  note?: string;
};

export function ProductCard({
  href,
  title,
  description,
  image,
  cta,
  label,
  note,
}: ProductCardProps) {
  return (
    <article className="group relative flex flex-col">
      <Photo
        image={image}
        frame="aspect-[4/5]"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col pt-5">
        {label ? <p className="eyebrow">{label}</p> : null}
        <h3 className="mt-2 text-[1.35rem] font-semibold">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.97rem] text-muted">{description}</p>
        {note ? <p className="mt-2 text-sm text-muted/90">{note}</p> : null}
        <p
          aria-hidden="true"
          className="mt-4 inline-flex items-center gap-2 font-display text-[0.95rem] font-semibold text-forest-800 underline decoration-forest-800/30 underline-offset-[6px] group-hover:decoration-forest-800"
        >
          {cta}
          <svg
            viewBox="0 0 20 20"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>
    </article>
  );
}
