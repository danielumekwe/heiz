import { Suspense } from "react";
import { BrochureButton } from "@/components/Brochure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { NumberedList } from "@/components/NumberedList";
import { getCatalogProduct } from "@/data/catalog";
import { getProduct } from "@/data/products";
import { enquiryFormContent } from "@/i18n/content";
import { getT } from "@/i18n/server";
import { enquiryTypes } from "@/lib/enquiry";
import { brochure, site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { T } from "@/components/T";

export function generateMetadata() {
  return pageMetadata({
    title: "Contact and Request a Quote",
    description:
      "Contact 1heiz Wood Pellets or request a quote for bagged, bulk or wholesale wood-pellet supply.",
    path: "/contact",
  });
}

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
  searchParams: PageProps<"/[lang]/contact">["searchParams"];
}) {
  const t = await getT();
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
      content={enquiryFormContent(t)}
      defaultType={defaultType}
      defaultProduct={named?.name}
      defaultMessage={
        named
          ? `${t("I would like a quote for: {product}", { product: t(named.name) })}\n\n`
          : undefined
      }
      contactEmail={site.contact.email}
    />
  );
}

export default async function ContactPage({
  searchParams,
}: PageProps<"/[lang]/contact">) {
  const t = await getT();
  const formContent = enquiryFormContent(t);
  const { email, phone } = site.contact;
  const { address } = site.company;

  return (
    <>
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      <section className="border-b border-sand/70 bg-cream">
        <div className="site-container max-w-4xl pb-14 pt-8 lg:pb-20">
          <p className="eyebrow"><T>Contact</T></p>
          <h1 className="mt-4 text-[2.4rem] font-semibold sm:text-5xl lg:text-[3.5rem]">
            <T>Tell us what you need</T>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            <T>Use the form to request a quote or ask a question about bagged,
            bulk or wholesale wood-pellet supply.</T>
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-container grid gap-14 py-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:py-20">
          <div id="enquiry" className="scroll-mt-28">
            <h2 className="text-[1.9rem] font-semibold sm:text-[2.2rem]">
              <T>Enquiry form</T>
            </h2>
            <div className="mt-8">
              <Suspense
                fallback={
                  <EnquiryForm content={formContent} contactEmail={site.contact.email} />
                }
              >
                <PrefilledForm searchParams={searchParams} />
              </Suspense>
            </div>
          </div>

          <aside className="lg:pt-2">
            <h2 className="text-[1.4rem] font-semibold"><T>What happens next</T></h2>
            <div className="mt-5">
              <NumberedList items={nextSteps} />
            </div>

            <div className="mt-8 border-t border-sand pt-6">
              <h2 className="text-[1.4rem] font-semibold"><T>Product brochure</T></h2>
              <p className="mt-2 text-[0.97rem] text-muted">
                {t("Prefer to read first? Download our brochure ({details}).", {
                  details: t(brochure.meta),
                })}
              </p>
              <BrochureButton className="mt-4" />
            </div>

            {email || phone || address ? (
              <div className="mt-8 border-t border-sand pt-6">
                <h2 className="text-[1.4rem] font-semibold"><T>Contact details</T></h2>
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
