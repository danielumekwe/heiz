import Image from "next/image";
import { images, type ImageKey } from "@/data/images";
import { ButtonLink } from "./ButtonLink";

export function CtaBand({
  title = "Looking for a Reliable Wood Pellet Supplier?",
  body = "Tell us about your wood-pellet requirements and explore the supply options available from 1heiz.",
  cta = "Contact 1heiz",
  href = "/contact",
  image = "pelletsLoose",
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
  image?: ImageKey;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-forest-950">
      <Image
        src={images[image].src}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-35"
      />
      <div className="absolute inset-0 -z-10 bg-forest-950/55" aria-hidden="true" />
      <div className="site-container py-20 text-center lg:py-28">
        <h2 className="mx-auto max-w-3xl text-[2.1rem] font-semibold text-cream sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/85">{body}</p>
        <ButtonLink href={href} variant="light" className="mt-9">
          {cta}
        </ButtonLink>
      </div>
    </section>
  );
}
