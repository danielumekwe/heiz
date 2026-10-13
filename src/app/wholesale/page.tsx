import { BrochureButton } from "@/components/Brochure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { NumberedList } from "@/components/NumberedList";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Wholesale Wood Pellet Supply",
  description:
    "Wholesale wood pellets for retailers, distributors and commercial buyers. Discuss volumes, formats and pricing with 1heiz.",
  path: "/wholesale",
});

const enquiryHref = "/contact?type=wholesale#enquiry";

const buyers = [
  {
    title: "Retailers and merchants",
    body: "Fuel merchants, builders' merchants, garden centres and stove retailers stocking bagged pellets for their customers.",
  },
  {
    title: "Distributors",
    body: "Businesses supplying pellets onward in their own region, in bagged or bulk form.",
  },
  {
    title: "Commercial heat users",
    body: "Operators of biomass heating across one or several sites who buy in volume.",
  },
];

const process = [
  {
    title: "Share your requirement",
    body: "Format, volume per delivery, expected seasonal volume and delivery points.",
  },
  {
    title: "Review the product",
    body: "We provide the specification for the product on offer, with supporting documentation where it applies.",
  },
  {
    title: "Agree pricing and terms",
    body: "You receive a written wholesale quote covering price, quantities and delivery arrangements.",
  },
  {
    title: "Plan the season",
    body: "For ongoing supply we discuss timing ahead of the heating season so stock can be planned.",
  },
];

export default function WholesalePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Wholesale", href: "/wholesale" }]} />
      <PageHero
        eyebrow="Wholesale"
        title="Wood pellets for trade and volume buyers"
        intro="1heiz works with businesses that resell pellets or use them at scale. Tell us about your volumes and we will prepare wholesale pricing."
        image="warehouse"
      >
        <ButtonLink href={enquiryHref}>Request Wholesale Pricing</ButtonLink>
        <BrochureButton />
      </PageHero>

      <section className="bg-paper">
        <div className="site-container grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
          <SectionHeading eyebrow="Who we supply" title="Built around business buyers">
            <p>
              Wholesale orders are quoted individually. Volumes, packaging and
              delivery are agreed with you rather than taken from a fixed list.
            </p>
          </SectionHeading>
          <NumberedList items={buyers} />
        </div>
      </section>

      <section className="on-dark bg-forest-900">
        <div className="site-container grid gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-[2rem] font-semibold text-cream sm:text-[2.5rem]">
              From first enquiry to regular supply
            </h2>
            <Photo
              image="forklift"
              frame="aspect-[3/2]"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="mt-10"
            />
            <p className="mt-3 text-sm text-cream/60">
              Illustrative image of palletised goods handling.
            </p>
          </div>
          <NumberedList items={process} tone="light" />
        </div>
      </section>

      <section className="bg-cream">
        <div className="site-container grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <Photo
            image="campaign"
            frame="aspect-[16/9]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            imageClassName="object-right"
          />
          <div>
            <SectionHeading eyebrow="Formats" title="Bagged on pallets, or loose in bulk">
              <p>
                Trade buyers can enquire about palletised bagged pellets, bulk
                pellets, or a mix of both. Bags hold 15 kg, and pallet configuration is
                confirmed in your quote.
              </p>
            </SectionHeading>
            <p className="mt-4 text-sm text-muted">
              The 1heiz bag shown is a packaging design concept.
            </p>
            <ArrowLink
              href="/resources/considerations-for-wholesale-buyers"
              className="mt-5"
            >
              Considerations for wholesale buyers
            </ArrowLink>
          </div>
        </div>
      </section>

      <CtaBand
        title="Talk to us about wholesale supply"
        body="Share your volumes and delivery points and we will come back with pricing."
        cta="Request Wholesale Pricing"
        href={enquiryHref}
      />
    </>
  );
}
