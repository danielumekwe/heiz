import Image from "next/image";
import { images, type ImageKey } from "@/data/images";
import { getT } from "@/i18n/server";
import type { Vars } from "@/i18n/translate";
import { ButtonLink } from "./ButtonLink";

export async function CtaBand({
  title = "Looking for a Reliable Wood Pellet Supplier?",
  titleVars,
  body = "Tell us about your wood-pellet requirements and explore the supply options available from 1heiz.",
  cta = "Contact 1heiz",
  href = "/contact",
  image = "pelletsLoose",
}: {
  /** English text; may contain {placeholders} filled from `titleVars`. */
  title?: string;
  titleVars?: Vars;
  body?: string;
  cta?: string;
  href?: string;
  image?: ImageKey;
}) {
  const t = await getT();

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
          {t(title, titleVars)}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/85">{t(body)}</p>
        <ButtonLink href={href} variant="light" className="mt-9">
          {t(cta)}
        </ButtonLink>
      </div>
    </section>
  );
}
