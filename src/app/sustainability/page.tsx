import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { NumberedList } from "@/components/NumberedList";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitSection } from "@/components/SplitSection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Sustainability and Responsible Sourcing",
  description:
    "How wood pellets fit into biomass heating, why responsible sourcing matters, and the questions worth asking any pellet supplier.",
  path: "/sustainability",
});

const questions = [
  {
    title: "Where does the wood come from?",
    body: "Ask about the origin of the raw material and whether it is residue from sawmilling or wood harvested for fuel.",
  },
  {
    title: "Is the supply chain certified?",
    body: "Forest certification schemes such as PEFC and FSC cover how forests are managed. A supplier claiming one should be able to show the certificate.",
  },
  {
    title: "How far has it travelled?",
    body: "Transport adds to the footprint of any fuel, so the distance between production and your store is worth knowing.",
  },
  {
    title: "Is the product quality certified?",
    body: "Quality schemes set limits on moisture, ash and fines, which influence how cleanly and efficiently pellets burn.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Sustainability", href: "/sustainability" }]} />
      <PageHero
        eyebrow="Sustainability"
        title="Wood fuel and the forests behind it"
        intro="Wood pellets are a biomass fuel made from compressed wood fibre. Whether they are a responsible choice depends on how the wood is sourced, made and used."
        image="forest"
      />

      <SplitSection image="timberRoad" imageSide="right">
        <SectionHeading eyebrow="The fuel" title="What wood pellets are made from">
          <p>
            Most wood pellets are produced from sawdust, shavings and other
            by-products of sawmilling and wood processing. The material is
            dried, milled and pressed through a die, where heat and pressure
            bind it into dense pellets.
          </p>
          <p>
            Because the wood is compressed and dry, pellets store a lot of
            energy in a small volume and can be fed automatically, which is
            what makes them practical for modern stoves and boilers.
          </p>
        </SectionHeading>
      </SplitSection>

      <section className="bg-cream">
        <div className="site-container grid gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div>
            <SectionHeading eyebrow="Responsible sourcing" title="Why origin matters">
              <p>
                Wood is a renewable resource when forests are managed so that
                growth keeps pace with harvesting and biodiversity is
                protected. The climate impact of burning wood is the subject
                of ongoing scientific and policy discussion, and it varies
                with the type of wood used, how forests are managed and how
                far the fuel travels.
              </p>
              <p>
                For that reason we think it is more honest to talk about
                sourcing than to make blanket environmental claims. We do not
                describe our pellets as carbon-neutral, and we will only refer
                to a certification where we can provide the evidence for the
                product you are buying.
              </p>
            </SectionHeading>
          </div>
          <Photo
            image="logs"
            frame="aspect-[3/2]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="self-start"
          />
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-container py-16 lg:py-24">
          <SectionHeading eyebrow="For buyers" title="Questions worth asking any supplier">
            <p>
              These apply to us as much as to anyone else. Ask them when you
              enquire and we will answer for the product on offer.
            </p>
          </SectionHeading>
          <div className="mt-10">
            <NumberedList items={questions} columns={2} />
          </div>
          <ArrowLink href="/resources/understanding-wood-pellet-specifications" className="mt-8">
            Understanding wood-pellet specifications
          </ArrowLink>
        </div>
      </section>

      <SplitSection image="stove" frame="aspect-[2/1]" background="bg-beige">
        <SectionHeading eyebrow="In use" title="Using pellets well">
          <p>
            How a fuel is burned matters too. A correctly installed and
            serviced appliance, run on the pellet size and quality its
            manufacturer specifies and fed with dry fuel, will burn more
            completely and leave less ash.
          </p>
        </SectionHeading>
        <ArrowLink href="/resources/how-to-store-wood-pellets-correctly" className="mt-6">
          How to store wood pellets correctly
        </ArrowLink>
      </SplitSection>

      <CtaBand
        title="Ask us about sourcing"
        body="If the origin or certification of your fuel matters to you, tell us in your enquiry and we will address it directly."
        cta="Contact 1heiz"
        image="forest"
      />
    </>
  );
}
