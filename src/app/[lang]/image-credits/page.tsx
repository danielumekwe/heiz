import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { images } from "@/data/images";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { T } from "@/components/T";

export function generateMetadata() {
  return pageMetadata({
    title: "Image Credits",
    description:
      "Sources, authors and licences for the photographs used on the 1heiz Wood Pellets website.",
    path: "/image-credits",
  });
}

export default async function ImageCreditsPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumbs items={[{ label: "Image Credits", href: "/image-credits" }]} />
      <section className="bg-cream">
        <div className="site-container max-w-3xl pb-12 pt-8">
          <h1 className="text-[2.4rem] font-semibold sm:text-5xl"><T>Image Credits</T></h1>
          <p className="mt-5 text-lg text-muted">
            <T>Photographs on this website are used under open licences or are in
            the public domain. Thank you to the photographers and organisations
            who made them available.</T>
          </p>
        </div>
      </section>
      <section className="bg-paper">
        <ul className="site-container max-w-4xl py-10 lg:py-14">
          {Object.entries(images).map(([key, image]) => (
            <li
              key={key}
              className="grid grid-cols-[6rem_1fr] items-start gap-5 border-t border-sand py-5 sm:grid-cols-[9rem_1fr]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-beige">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="9rem"
                  className="object-cover"
                />
              </div>
              <div className="text-[0.95rem]">
                <p className="font-display font-semibold text-charcoal">
                  {t(image.alt)}
                </p>
                <p className="mt-1 text-muted">
                  {image.credit.sourceUrl ? (
                    <a
                      href={image.credit.sourceUrl}
                      rel="noopener noreferrer"
                      className="text-forest-800 underline underline-offset-4"
                    >
                      {image.credit.author}
                    </a>
                  ) : (
                    image.credit.author
                  )}
                  {" · "}
                  {"licenseUrl" in image.credit && image.credit.licenseUrl ? (
                    <a
                      href={image.credit.licenseUrl}
                      rel="noopener noreferrer license"
                      className="text-forest-800 underline underline-offset-4"
                    >
                      {image.credit.license}
                    </a>
                  ) : (
                    image.credit.license
                  )}
                </p>
                {image.credit.note ? (
                  <p className="mt-1 text-sm text-muted">{t(image.credit.note)}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
