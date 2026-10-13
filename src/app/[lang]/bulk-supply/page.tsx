import { BrochureButton } from "@/components/Brochure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { NumberedList } from "@/components/NumberedList";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitSection } from "@/components/SplitSection";
import { pageMetadata } from "@/lib/metadata";
import { T } from "@/components/T";

export function generateMetadata() {
  return pageMetadata({
    title: "Bulk Wood Pellet Supply",
    description:
      "Loose wood pellets for homes and businesses with a pellet store or silo. Tell 1heiz about your site and request a bulk supply quote.",
    path: "/bulk-supply",
  });
}

const enquiryHref = "/contact?type=bulk#enquiry";

const checklist = [
  {
    title: "Delivery location",
    body: "The address or postcode, so we can confirm whether we can supply bulk pellets to you.",
  },
  {
    title: "Store type and capacity",
    body: "Whether you have a purpose-built pellet room, a fabric silo or a tank, and roughly how much it holds.",
  },
  {
    title: "Access to the fill point",
    body: "How a delivery vehicle reaches the property and how far the fill connection is from where it can park.",
  },
  {
    title: "Pellet requirement",
    body: "The pellet diameter and quality class your boiler manufacturer specifies.",
  },
  {
    title: "Expected consumption",
    body: "Your approximate annual use, or the size of the delivery you have in mind.",
  },
  {
    title: "Timing",
    body: "When you would like the delivery, and whether you want regular supply through the season.",
  },
];

export default function BulkSupplyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Bulk Supply", href: "/bulk-supply" }]} />
      <PageHero
        eyebrow="Bulk supply"
        title="Loose pellets for stores and silos"
        intro="Bulk supply suits automated heating systems that draw fuel from a dedicated pellet store. No bags, no manual handling, and deliveries sized to your storage."
        image="bulkHall"
      >
        <ButtonLink href={enquiryHref}><T>Request a Bulk Quote</T></ButtonLink>
        <BrochureButton />
      </PageHero>

      <SplitSection
        image="bulkInStore"
        caption="Pellets held in a bulk store. Illustrative image."
      >
        <SectionHeading eyebrow="Who it is for" title="When bulk is the better choice">
          <p>
            <T>If your boiler feeds itself from a pellet store, bulk delivery is
            usually the most practical way to keep it supplied. It is common in
            homes with central pellet heating, in commercial and public
            buildings, and on farms and industrial sites.</T>
          </p>
          <p>
            <T>If you fill a stove by hand or have no dedicated store, bagged
            pellets will suit you better.</T>
          </p>
        </SectionHeading>
        <ArrowLink href="/resources/bagged-pellets-versus-bulk-supply" className="mt-6">
          <T>Bagged versus bulk: how to decide</T>
        </ArrowLink>
      </SplitSection>

      <section className="bg-cream">
        <div className="site-container py-16 lg:py-24">
          <SectionHeading eyebrow="Your enquiry" title="What we need to quote for bulk supply">
            <p>
              <T>Bulk deliveries depend on the site. Including these details lets us
              confirm what we can offer without a lot of back and forth.</T>
            </p>
          </SectionHeading>
          <div className="mt-10">
            <NumberedList items={checklist} columns={2} />
          </div>
          <p className="mt-8 max-w-2xl text-sm text-muted">
            <T>Delivery areas, vehicle types, minimum quantities and lead times are
            confirmed individually. Please do not rely on bulk supply being
            available at your location until we have confirmed it.</T>
          </p>
        </div>
      </section>

      <CtaBand
        title="Discuss your bulk requirements"
        body="Send us your site details and we will let you know what we can supply and when."
        cta="Request a Bulk Quote"
        href={enquiryHref}
        image="hero"
      />
    </>
  );
}
