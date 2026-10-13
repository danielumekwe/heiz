import Image from "next/image";
import { brochure } from "@/data/site";
import { buttonClass } from "./ButtonLink";

type Variant = Parameters<typeof buttonClass>[0];

/** Button that downloads the product brochure PDF. */
export function BrochureButton({
  variant = "outline",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={brochure.href}
      download={brochure.downloadName}
      type="application/pdf"
      className={`${buttonClass(variant)} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="size-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 3v10M5.5 9 10 13.5 14.5 9M4 16.5h12" />
      </svg>
      Download Brochure
      <span className="sr-only"> ({brochure.meta})</span>
    </a>
  );
}

/** Section presenting the brochure with its cover and a download button. */
export function BrochureBand({ background = "bg-beige" }: { background?: string }) {
  return (
    <section className={background}>
      <div className="site-container grid items-center gap-10 py-16 sm:grid-cols-[auto_1fr] sm:gap-14 lg:py-20">
        <div className="relative mx-auto w-44 shrink-0 shadow-[0_18px_40px_-18px_rgba(16,33,26,0.55)] sm:mx-0 sm:w-52 lg:w-60">
          <Image
            src={brochure.cover.src}
            alt="Cover of the 1heiz Wood Pellets product brochure"
            width={brochure.cover.width}
            height={brochure.cover.height}
            sizes="(min-width: 1024px) 15rem, 13rem"
            className="h-auto w-full"
          />
        </div>
        <div className="max-w-xl">
          <p className="eyebrow">Product brochure</p>
          <h2 className="mt-3 text-[1.9rem] font-semibold sm:text-[2.3rem]">
            Take the details with you
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted">
            Our brochure summarises the bagged and bulk supply options, product
            information and how to reach us, in a format you can save, print or
            pass on.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <BrochureButton variant="primary" />
            <p className="text-sm text-muted">{brochure.meta}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
