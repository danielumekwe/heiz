import Image from "next/image";
import type { CatalogProduct } from "@/data/catalog";
import { Photo } from "./Photo";

/**
 * Main visual for a catalogue product: its own photo when one exists, an
 * illustrative library photo when one is assigned, otherwise a neutral tile.
 */
export function CatalogVisual({
  product,
  frame,
  sizes,
  priority = false,
  imageClassName = "",
}: {
  product: CatalogProduct;
  frame: string;
  sizes: string;
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

  if (product.illustration) {
    return (
      <Photo
        image={product.illustration}
        frame={frame}
        sizes={sizes}
        priority={priority}
        imageClassName={imageClassName}
      />
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
        Photo on request
      </p>
    </div>
  );
}
