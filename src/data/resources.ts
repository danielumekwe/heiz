import type { ImageKey } from "./images";

/**
 * Educational articles. These are general guidance about wood pellets and
 * make no claims about specific 1heiz products. Articles are undated until
 * a real publishing workflow exists.
 */

export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type Article = {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  image: ImageKey;
  readingMinutes: number;
  intro: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "how-to-choose-quality-wood-pellets",
    title: "How to Choose Quality Wood Pellets",
    topic: "Buying guide",
    excerpt:
      "What to look at before you buy: appearance, dust, documentation and how the pellets match your appliance.",
    image: "hands",
    readingMinutes: 4,
    intro:
      "Pellets can look alike in a photo and behave very differently in a stove or boiler. A few simple checks will tell you a lot before you commit to a full order.",
    sections: [
      {
        heading: "Start with your appliance",
        paragraphs: [
          "Your stove or boiler manual states which pellet diameter and quality class the manufacturer expects. Most domestic appliances in Europe are designed around 6 mm pellets, while some larger systems use 8 mm. Buying to that requirement matters more than any other single factor.",
        ],
      },
      {
        heading: "Look at the pellets themselves",
        list: [
          "Pellets should be firm, with a smooth, slightly glossy surface and few lengthwise cracks.",
          "Lengths should be reasonably consistent, without many very long or crumbled pieces.",
          "There should be little loose dust at the bottom of the bag or in the delivery.",
          "Colour varies with the wood used and is not a reliable guide to quality on its own.",
        ],
      },
      {
        heading: "Ask for the specification",
        paragraphs: [
          "A supplier should be able to tell you the raw material, diameter, moisture content, ash content and any quality scheme the product is certified under. Certification schemes such as ENplus and DINplus define classes with measurable limits, so a named class is more useful than a general promise of quality.",
          "If a certification is claimed, the certificate holder's details can normally be checked with the scheme operator.",
        ],
      },
      {
        heading: "Try before you scale up",
        paragraphs: [
          "If you are switching supplier, a small first order lets you see how the pellets feed, how much ash is left and whether the glass and burn pot stay clean under your normal settings.",
        ],
      },
    ],
  },
  {
    slug: "bagged-pellets-versus-bulk-supply",
    title: "Bagged Pellets Versus Bulk Supply",
    topic: "Supply formats",
    excerpt:
      "Bags or loose delivery? How storage, consumption and site access point to the right format.",
    image: "bulkInStore",
    readingMinutes: 3,
    intro:
      "The pellets are the same kind of fuel either way. What changes is how they are delivered, where they are stored and how much handling is involved.",
    sections: [
      {
        heading: "When bagged pellets make sense",
        list: [
          "You heat with a pellet stove that is filled by hand.",
          "You have no dedicated pellet store or silo.",
          "You prefer to buy a pallet or a few bags at a time.",
          "Vehicle access to the property is limited.",
        ],
      },
      {
        heading: "When bulk supply makes sense",
        list: [
          "You run an automated boiler fed from a pellet store.",
          "Your annual consumption is high enough to justify a store.",
          "A delivery vehicle can reach the fill connection safely.",
          "You want to avoid packaging and manual handling.",
        ],
      },
      {
        heading: "Questions to settle first",
        paragraphs: [
          "Work out roughly how much fuel you use in a heating season, how much dry storage you have and how a delivery would reach it. With those three answers a supplier can tell you quickly which format fits and what a sensible order size looks like.",
        ],
      },
    ],
  },
  {
    slug: "how-to-store-wood-pellets-correctly",
    title: "How to Store Wood Pellets Correctly",
    topic: "Storage",
    excerpt:
      "Pellets are easy to store when they stay dry. Practical guidance for bags, pallets and bulk stores.",
    image: "storage",
    readingMinutes: 4,
    intro:
      "Wood pellets absorb moisture readily. Once damp they swell, crumble and stop feeding properly, so good storage is mostly about keeping water and humidity away.",
    sections: [
      {
        heading: "Storing bagged pellets",
        list: [
          "Keep bags indoors in a dry, ventilated space such as a garage, shed or utility room.",
          "Leave pallets on their base or raise bags off concrete floors, which can transfer damp.",
          "Keep stacks away from walls that suffer from condensation.",
          "Handle bags with care; rough handling breaks pellets into dust.",
          "Use older stock first.",
        ],
      },
      {
        heading: "Bulk pellet stores",
        paragraphs: [
          "A bulk store should be dry, dust-tight and built for the purpose, following the guidance of the boiler and store manufacturers. Have it emptied and cleaned periodically so that fine material does not build up at the bottom.",
        ],
      },
      {
        heading: "Safety in enclosed stores",
        paragraphs: [
          "Stored pellets can release carbon monoxide and reduce oxygen levels in enclosed spaces. Bulk stores should be ventilated as their manufacturer specifies, and nobody should enter one without following the safety instructions provided for that store. Keep ignition sources away from pellet dust.",
        ],
      },
    ],
  },
  {
    slug: "understanding-wood-pellet-specifications",
    title: "Understanding Wood-Pellet Specifications",
    topic: "Specifications",
    excerpt:
      "Diameter, moisture, ash, durability and fines: what the figures on a specification sheet mean.",
    image: "pelletsCloseup",
    readingMinutes: 5,
    intro:
      "A specification sheet describes how a pellet has been measured against a standard. Knowing what each line means makes it easier to compare offers on the same basis.",
    sections: [
      {
        heading: "The main parameters",
        list: [
          "Diameter and length: must match what your appliance's feed system is designed for.",
          "Moisture content: lower moisture means more of the pellet's weight is usable fuel.",
          "Ash content: the mineral residue left after burning, which affects how often you clean.",
          "Mechanical durability: how well pellets resist breaking up during transport and handling.",
          "Fines: the proportion of dust and small fragments in the delivery.",
          "Net calorific value: the heat energy available per unit of weight.",
          "Bulk density: the weight of pellets per unit of volume, useful for sizing storage.",
        ],
      },
      {
        heading: "Standards and quality classes",
        paragraphs: [
          "In Europe, wood pellets are commonly graded against the international standard ISO 17225-2, which defines property classes for different uses. Certification schemes such as ENplus and DINplus build on that standard and add requirements for production and handling.",
          "A quality class only has meaning if it is backed by a valid certificate or test report for the product you are actually buying, so ask to see it.",
        ],
      },
      {
        heading: "Comparing offers",
        paragraphs: [
          "Compare like with like: the same diameter, the same quality class and the same delivery format. Price per tonne is only a fair comparison once those are equal.",
        ],
      },
    ],
  },
  {
    slug: "wood-pellets-for-biomass-heating",
    title: "Wood Pellets for Biomass Heating",
    topic: "Heating",
    excerpt:
      "How pellet stoves and boilers use pellets, and what running a pellet system involves day to day.",
    image: "stove",
    readingMinutes: 4,
    intro:
      "Pellet heating burns compressed wood in an appliance that meters the fuel automatically. That makes it more controllable than log burning, while still using a solid wood fuel.",
    sections: [
      {
        heading: "Stoves and boilers",
        paragraphs: [
          "A pellet stove heats the room it stands in, and some models also feed hot water to radiators. Pellets are tipped into an integrated hopper by hand, usually from bags.",
          "A pellet boiler replaces or supplements a central-heating boiler. It draws pellets automatically from a separate store, which is typically filled by bulk delivery.",
        ],
      },
      {
        heading: "What to expect in use",
        list: [
          "Refilling the hopper or arranging deliveries to the store.",
          "Emptying the ash pan at the interval the manufacturer recommends.",
          "Routine cleaning and an annual service by a qualified engineer.",
          "A dry place to keep your fuel.",
        ],
      },
      {
        heading: "Fuel quality and the appliance",
        paragraphs: [
          "Appliances are set up for a particular pellet size and quality. Using fuel outside the manufacturer's requirement can cause poor combustion, extra ash and feed problems, and may affect the warranty.",
        ],
      },
    ],
  },
  {
    slug: "considerations-for-wholesale-buyers",
    title: "Considerations for Wholesale Buyers",
    topic: "Wholesale",
    excerpt:
      "Volume, packaging, documentation and seasonality: the points worth agreeing before a wholesale order.",
    image: "warehouse",
    readingMinutes: 4,
    intro:
      "Buying pellets for resale or for a portfolio of sites raises different questions from a household order. Agreeing the essentials early avoids surprises in the heating season.",
    sections: [
      {
        heading: "Define the requirement",
        list: [
          "Format: bagged on pallets, loose in bulk, or both.",
          "Volume per delivery and across the season.",
          "Delivery points and the access and unloading equipment at each.",
          "The specification and quality class your customers or appliances need.",
        ],
      },
      {
        heading: "Documentation",
        paragraphs: [
          "Ask for the product specification and, where a certification is claimed, evidence of it. If you resell under a certification scheme, check what that scheme requires of traders as well as producers.",
        ],
      },
      {
        heading: "Plan for the season",
        paragraphs: [
          "Demand for pellets is seasonal, and availability and lead times can tighten in cold periods. Discussing expected volumes ahead of winter gives both sides more room to plan stock and transport.",
        ],
      },
      {
        heading: "Storage and handling",
        paragraphs: [
          "Palletised pellets need dry, covered storage and careful forklift handling to keep bags intact and fines low. Rotate stock so the oldest pallets leave first.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
