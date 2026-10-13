import Image from "next/image";
import { images, type ImageKey } from "@/data/images";

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
export function Photo({
  image,
  frame = "aspect-[4/3]",
  sizes,
  priority = false,
  alt,
  className = "",
  imageClassName = "",
}: PhotoProps) {
  const data = images[image];

  return (
    <div className={`relative overflow-hidden bg-beige ${frame} ${className}`}>
      <Image
        src={data.src}
        alt={alt ?? data.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
