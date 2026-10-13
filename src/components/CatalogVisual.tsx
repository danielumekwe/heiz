import Image from "next/image";
import type { CatalogProduct } from "@/data/catalog";

/**
 * Main visual for a catalogue product: its first photo, or a neutral tile
 * when it has none. `emptyLabel` arrives translated.
 */
export function CatalogVisual({
  product,
  frame,
  sizes,
  emptyLabel,
  priority = false,
  imageClassName = "",
}: {
  product: Pick<CatalogProduct, "images">;
  frame: string;
  sizes: string;
  emptyLabel: string;
  priority?: boolean;
  imageClassName?: string;
}) {
  const [photo] = product.images;

  if (photo) {
    return (
      <div className={`relative overflow-hidden bg-beige ${frame}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${
            photo.height > photo.width ? "object-contain" : "object-cover"
          } ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 bg-beige ${frame}`}
    >
      <Image
        src="/images/brand/1heiz-wood-pellets-logo.webp"
        alt=""
        width={800}
        height={283}
        sizes="160px"
        className="h-auto w-36 opacity-60"
      />
      <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-wood-700">
        {emptyLabel}
      </p>
    </div>
  );
}
