import Image from "next/image";
import { images, type ImageKey } from "@/data/images";
import { getT } from "@/i18n/server";

type PhotoProps = {
  image: ImageKey;
  /** Tailwind aspect-ratio (or fixed height) classes for the frame. */
  frame?: string;
  sizes: string;
  priority?: boolean;
  /** Override the registry alt text; pass "" for decorative use. */
  alt?: string;
  className?: string;
  imageClassName?: string;
};

/** Registry-backed image inside a fixed-ratio frame, so layout never shifts. */
export async function Photo({
  image,
  frame = "aspect-[4/3]",
  sizes,
  priority = false,
  alt,
  className = "",
  imageClassName = "",
}: PhotoProps) {
  const data = images[image];
  const t = await getT();
  const altText = alt ?? data.alt;

  return (
    <div className={`relative overflow-hidden bg-beige ${frame} ${className}`}>
      <Image
        src={data.src}
        alt={altText ? t(altText) : ""}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
