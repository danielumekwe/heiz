import { Suspense } from "react";
import { BrochureButton } from "@/components/Brochure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { NumberedList } from "@/components/NumberedList";
import { getCatalogProduct } from "@/data/catalog";
import { getProduct } from "@/data/products";
import { enquiryTypes } from "@/lib/enquiry";
import { brochure, site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact and Request a Quote",
  description:
    "Contact 1heiz Wood Pellets or request a quote for bagged, bulk or wholesale wood-pellet supply.",
  path: "/contact",
});

const nextSteps = [
  {
    title: "Send your enquiry",
    body: "Include the format, an estimated quantity and your delivery location if you have them.",
  },
  {
    title: "We review it",
    body: "We check availability for the product and format you asked about.",
  },
  {
    title: "You receive a quote",
    body: "We reply by email with product details, pricing and delivery arrangements.",
  },
];

/** Pre-selects the enquiry type from ?type=… links on product pages. */
async function PrefilledForm({
  searchParams,
}: {
  searchParams: PageProps<"/contact">["searchParams"];
}) {
  const { type, product } = await searchParams;
  const requestedProduct = Array.isArray(product) ? product[0] : product ?? "";
  const named =
    getProduct(requestedProduct) ?? getCatalogProduct(requestedProduct);
  const requested = Array.isArray(type) ? type[0] : type;
  const defaultType = enquiryTypes.some((item) => item.value === requested)
    ? requested
    : undefined;

  return (
    <EnquiryForm
      defaultType={defaultType}
      defaultProduct={named?.name}
      defaultMessage={
        named ? `I would like a quote for: ${named.name}\n\n` : undefined
      }
      contactEmail={site.contact.email}
    />
  );
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { email, phone } = site.contact;
  const { address } = site.company;

  return (
    <>
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      <section className="border-b border-sand/70 bg-cream">
        <div className="site-container max-w-4xl pb-14 pt-8 lg:pb-20">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-[2.4rem] font-semibold sm:text-5xl lg:text-[3.5rem]">
            Tell us what you need
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Use the form to request a quote or ask a question about bagged,
            bulk or wholesale wood-pellet supply.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-container grid gap-14 py-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:py-20">
          <div id="enquiry" className="scroll-mt-28">
            <h2 className="text-[1.9rem] font-semibold sm:text-[2.2rem]">
              Enquiry form
            </h2>
            <div className="mt-8">
              <Suspense
                fallback={<EnquiryForm contactEmail={site.contact.email} />}
              >
                <PrefilledForm searchParams={searchParams} />
              </Suspense>
            </div>
          </div>

          <aside className="lg:pt-2">
            <h2 className="text-[1.4rem] font-semibold">What happens next</h2>
            <div className="mt-5">
              <NumberedList items={nextSteps} />
            </div>

            <div className="mt-8 border-t border-sand pt-6">
              <h2 className="text-[1.4rem] font-semibold">Product brochure</h2>
              <p className="mt-2 text-[0.97rem] text-muted">
                Prefer to read first? Download our brochure ({brochure.meta}).
              </p>
              <BrochureButton className="mt-4" />
            </div>

            {email || phone || address ? (
              <div className="mt-8 border-t border-sand pt-6">
                <h2 className="text-[1.4rem] font-semibold">Contact details</h2>
                <ul className="mt-4 space-y-2 text-charcoal">
                  {email ? (
                    <li>
                      <a
                        href={`mailto:${email}`}
                        className="text-forest-800 underline underline-offset-4"
                      >
                        {email}
                      </a>
                    </li>
                  ) : null}
                  {phone ? (
                    <li>
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="text-forest-800 underline underline-offset-4"
                      >
                        {phone}
                      </a>
                    </li>
                  ) : null}
                  {address ? <li className="whitespace-pre-line">{address}</li> : null}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}
