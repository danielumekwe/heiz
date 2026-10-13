import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { NumberedList } from "@/components/NumberedList";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { T } from "@/components/T";

const feedbackHref = "/contact?type=feedback#enquiry";
const hasTestimonials = testimonials.length > 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...(await pageMetadata({
      title: "Customer Testimonials",
      description:
        "What customers say about ordering wood pellets and wood fuels from 1heiz.",
      path: "/testimonials",
    })),
    // Keep the page out of search results until there is real feedback on it.
    ...(hasTestimonials ? {} : { robots: { index: false, follow: true } }),
  };
}

const rated = testimonials.filter((item) => item.rating !== undefined);
const averageRating =
  rated.length > 0
    ? rated.reduce((sum, item) => sum + (item.rating ?? 0), 0) / rated.length
    : null;

/** Five stars with the first `value` filled; fractional values fill partially. */
function Stars({
  value,
  label,
  size = "size-5",
}: {
  value: number;
  /** Accessible description, already translated. */
  label: string;
  size?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex gap-0.5"
    >
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, value - index));
        return (
          <span key={index} aria-hidden="true" className={`relative ${size}`}>
            <Star className="absolute inset-0 text-sand" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={`${size} max-w-none text-wood-500`} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Star({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6Z" />
    </svg>
  );
}

const feedbackSteps = [
  {
    title: "Tell us how it went",
    body: "A few sentences on the product, the delivery or the service are enough, with a score out of five if you like. Critical feedback is as welcome as praise.",
  },
  {
    title: "Choose how you are named",
    body: "We publish feedback only with your permission, and under the name you choose, such as a first name and initial.",
  },
  {
    title: "We publish it unedited",
    body: "Your words appear as you wrote them. We may shorten a long comment, and we will not change its meaning.",
  },
];

export default async function TestimonialsPage() {
  const t = await getT();
  const ratedLabel = (value: number) =>
    t("Rated {value} out of 5", {
      value: Number.isInteger(value) ? value : value.toFixed(1),
    });

  return (
    <>
      <Breadcrumbs items={[{ label: "Testimonials", href: "/testimonials" }]} />
      <section className="border-b border-sand/70 bg-cream">
        <div className="site-container max-w-4xl pb-14 pt-8 lg:pb-20">
          <p className="eyebrow"><T>Testimonials</T></p>
          <h1 className="mt-4 text-[2.4rem] font-semibold sm:text-5xl lg:text-[3.5rem]">
            <T>What our customers say</T>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            {t(
              hasTestimonials
                ? "Feedback from households, businesses and trade buyers who have ordered from 1heiz, published with their permission."
                : "We publish only genuine feedback from customers who have ordered from us. This page is new, and we would like yours to be among the first.",
            )}
          </p>
          {averageRating !== null ? (
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Stars
                value={averageRating}
                label={ratedLabel(averageRating)}
                size="size-7"
              />
              <p className="text-charcoal">
                <span className="font-display text-2xl font-semibold">
                  {averageRating.toFixed(1)}
                </span>{" "}
                <span className="text-muted">
                  {t(
                    rated.length === 1
                      ? "out of 5, from {count} rating on this page"
                      : "out of 5, from {count} ratings on this page",
                    { count: rated.length },
                  )}
                </span>
              </p>
            </div>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={feedbackHref}><T>Share Your Feedback</T></ButtonLink>
            <ButtonLink href="/contact#enquiry" variant="outline">
              <T>Request a Quote</T>
            </ButtonLink>
          </div>
        </div>
      </section>

      {hasTestimonials ? (
        <section className="bg-paper">
          <div className="site-container py-14 lg:py-20">
            <h2 className="sr-only"><T>Customer feedback</T></h2>
            <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {testimonials.map((item) => (
                <li
                  key={`${item.name}-${item.quote.slice(0, 24)}`}
                  className="mb-6 break-inside-avoid border border-sand bg-white p-7"
                >
                  <figure>
                    {item.rating ? (
                      <div className="mb-5">
                        <Stars value={item.rating} label={ratedLabel(item.rating)} />
                      </div>
                    ) : null}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 32 24"
                      className="h-6 w-8 text-wood-500"
                      fill="currentColor"
                    >
                      <path d="M0 24V13.6C0 5.7 4.5 1 12.4 0l1.2 3.4C9.3 4.5 7.2 6.9 7 10h6v14H0Zm18 0V13.6C18 5.7 22.5 1 30.4 0l1.2 3.4c-4.3 1.1-6.4 3.5-6.6 6.6h6v14H18Z" />
                    </svg>
                    <blockquote className="mt-5 text-[1.05rem] leading-relaxed text-charcoal">
                      <p>{item.quote}</p>
                    </blockquote>
                    <figcaption className="mt-6 border-t border-sand pt-4">
                      <p className="font-display font-semibold text-charcoal">
                        {item.name}
                      </p>
                      {item.role || item.product || item.date ? (
                        <p className="mt-0.5 text-sm text-muted">
                          {[item.role && t(item.role), item.product && t(item.product), item.date]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      ) : null}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className={hasTestimonials ? "bg-cream" : "bg-paper"}>
        <div className="site-container grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
          <div>
            <SectionHeading
              eyebrow="Your feedback"
              title={
                hasTestimonials
                  ? "Ordered from us? Tell us how it went"
                  : "Be among the first to leave feedback"
              }
            >
              <p>
                <T>If you have ordered from 1heiz, we would like to hear about
                it. Your comments help other buyers decide and help us
                improve.</T>
              </p>
            </SectionHeading>
            <ButtonLink href={feedbackHref} className="mt-8">
              <T>Share Your Feedback</T>
            </ButtonLink>
          </div>
          <NumberedList items={feedbackSteps} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
