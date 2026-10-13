import type { ReactNode } from "react";
import type { ImageKey } from "@/data/images";
import { Photo } from "./Photo";

/** Intro block for inner pages: copy on the left, a tall photograph on the right. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: ImageKey;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-sand/70 bg-cream">
      <div className="site-container grid items-center gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-20">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-[2.4rem] font-semibold sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{intro}</p>
          {children ? (
            <div className="mt-8 flex flex-wrap gap-3">{children}</div>
          ) : null}
        </div>
        <Photo
          image={image}
          frame="aspect-[4/3] lg:aspect-[5/4]"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
    </section>
  );
}
