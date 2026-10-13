import type { ReactNode } from "react";
import type { ImageKey } from "@/data/images";
import { Photo } from "./Photo";

/** Image-led editorial section with copy on one side and a photograph on the other. */
export function SplitSection({
  image,
  imageSide = "left",
  frame = "aspect-[4/3] lg:aspect-[5/4]",
  background = "bg-paper",
  caption,
  children,
}: {
  image: ImageKey;
  imageSide?: "left" | "right";
  frame?: string;
  background?: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <section className={background}>
      <div className="site-container grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <figure className={imageSide === "right" ? "lg:order-2" : ""}>
          <Photo
            image={image}
            frame={frame}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          {caption ? (
            <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
          ) : null}
        </figure>
        <div>{children}</div>
      </div>
    </section>
  );
}
