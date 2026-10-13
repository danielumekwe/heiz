import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowLink, ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { NumberedList } from "@/components/NumberedList";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitSection } from "@/components/SplitSection";
import { quoteHref } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About 1heiz",
  description:
    "1heiz supplies wood pellets for biomass heating to households, businesses and wholesale buyers. Learn how we work and how to enquire.",
  path: "/about",
});

const customers = [
  {
    title: "Households",
    body: "People heating with a pellet stove or a pellet boiler who want a reliable source of fuel.",
  },
  {
    title: "Businesses",
    body: "Organisations running biomass heating in commercial, public, agricultural or industrial buildings.",
  },
  {
    title: "Wholesale buyers",
    body: "Retailers, merchants and distributors who supply pellets to their own customers.",
  },
];

const principles = [
  {
    title: "Be specific",
    body: "We describe the product on offer, its specification and its format, and we put the details in writing.",
  },
  {
    title: "Claim only what we can show",
    body: "We do not display certification marks or quote figures unless they apply to the product you are buying.",
  },
  {
    title: "Make enquiring easy",
    body: "One form, a short list of questions and a direct reply about availability and price.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About Us", href: "/about" }]} />
      <PageHero
        eyebrow="About 1heiz"
        title="Wood Pellets. Quality Supply. Trusted Service."
        intro="1heiz is a wood-pellet supplier. We provide pellets for biomass heating in bagged and bulk formats, offer a wider range of wood fuels and timber products, and work with trade buyers on wholesale volumes."
        image="pelletsLoose"
      >
        <ButtonLink href={quoteHref}>Request a Quote</ButtonLink>
        <ButtonLink href="/products" variant="outline">
          Our Products
        </ButtonLink>
      </PageHero>

      <section className="bg-paper">
        <div className="site-container grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
          <SectionHeading eyebrow="Who we serve" title="Fuel for homes, businesses and the trade">
            <p>
              The same product reaches very different customers. What changes
              is the format, the volume and the way it is delivered.
            </p>
          </SectionHeading>
          <NumberedList items={customers} />
        </div>
      </section>

      <SplitSection
        image="production"
        background="bg-cream"
        caption="Wood pellets in production. Illustrative image; not a 1heiz facility."
      >
        <SectionHeading eyebrow="What we do" title="A supplier built around wood fuels">
          <p>
            Wood pellets are the centre of what we do, alongside briquettes,
            firewood, round logs and related products. We concentrate on the
            things buyers ask about most: what the product is, which format
            suits them and when it can be delivered.
          </p>
          <p>
            We sell through enquiries rather than an online checkout, because
            price and delivery depend on quantity and location. You tell us
            what you need and we respond with a quote.
          </p>
        </SectionHeading>
        <ArrowLink href="/products" className="mt-6">
          See products and supply formats
        </ArrowLink>
      </SplitSection>

      <section className="bg-paper">
        <div className="site-container grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
          <SectionHeading eyebrow="How we work" title="Three principles" />
          <NumberedList items={principles} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
