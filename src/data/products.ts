import type { ImageKey } from "./images";

/**
 * Product catalogue.
 *
 * Specification values are optional on purpose: nothing is published until
 * 1heiz confirms it. Leave a value undefined and the page shows
 * "Confirmed with your quote" instead of an invented figure.
 */

export type ProductSpec = { label: string; value?: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  cardCta: string;
  image: ImageKey;
  gallery: ImageKey[];
  /** Marks the gallery as containing a packaging concept rather than real packaging. */
  conceptPackaging?: boolean;
  overview: string[];
  suitedTo: string[];
  specs: ProductSpec[];
  supply: { title: string; body: string }[];
  enquiryType: string;
  related: string[];
};

const commonSpecs: ProductSpec[] = [
  { label: "Raw material" },
  { label: "Pellet diameter" },
  { label: "Quality class" },
  { label: "Moisture content" },
  { label: "Ash content" },
];

export const products: Product[] = [
  {
    slug: "premium-wood-pellets",
    name: "Premium Wood Pellets",
    category: "Wood pellets",
    summary:
      "Compressed wood pellets for pellet stoves and biomass boilers, available bagged or in bulk.",
    cardCta: "View Products",
    image: "pelletsCloseup",
    gallery: ["pelletsCloseup", "pelletsLoose", "hands"],
    overview: [
      "Wood pellets are small cylinders of compressed wood fibre, made to feed cleanly and burn steadily in pellet stoves and automated biomass boilers.",
      "1heiz supplies wood pellets for household heating, commercial heating systems and resale. Tell us the appliance or system you are buying for and the quantity you have in mind, and we will come back with the product details and a quote.",
    ],
    suitedTo: [
      "Pellet stoves and room heaters",
      "Automated pellet boilers",
      "Commercial biomass heating systems",
    ],
    specs: commonSpecs,
    supply: [
      {
        title: "Bagged",
        body: "Sealed bags that are easy to carry, stack and store. A practical choice for stoves and smaller storage spaces.",
      },
      {
        title: "Bulk",
        body: "Loose pellets for sites with a dedicated pellet store or silo and higher annual consumption.",
      },
    ],
    enquiryType: "general",
    related: ["bagged-wood-pellets", "bulk-wood-pellets"],
  },
  {
    slug: "bagged-wood-pellets",
    name: "Bagged Wood Pellets",
    category: "Supply format",
    summary:
      "Wood pellets in sealed 15 kg bags, supplied by the bag or by the pallet for easy handling and storage.",
    cardCta: "Enquire About Availability",
    image: "bag",
    gallery: ["bag", "pelletsCloseup", "stove"],
    conceptPackaging: true,
    overview: [
      "Bagged pellets suit households with a pellet stove and anyone without a bulk store. Bags keep pellets protected in transit and let you bring in only what you need.",
      "Ask us about current availability and pallet quantities. Bags hold 15 kg; we will confirm pallet configuration and price in your quote.",
    ],
    suitedTo: [
      "Homes heated with a pellet stove",
      "Sites without a bulk pellet store",
      "Retailers stocking pellets for resale",
    ],
    specs: [
      { label: "Bag size", value: "15 kg" },
      { label: "Bags per pallet" },
      ...commonSpecs,
    ],
    supply: [
      {
        title: "Single pallets",
        body: "Order by the pallet for a season's supply that stores neatly in a dry garage, shed or utility room.",
      },
      {
        title: "Multiple pallets",
        body: "Larger bagged orders for businesses and resellers are handled through our wholesale team.",
      },
    ],
    enquiryType: "bagged",
    related: ["premium-wood-pellets", "bulk-wood-pellets"],
  },
  {
    slug: "bulk-wood-pellets",
    name: "Bulk Wood Pellets",
    category: "Supply format",
    summary:
      "Loose wood pellets for properties and businesses with a pellet store or silo.",
    cardCta: "Explore Bulk Supply",
    image: "bulkHall",
    gallery: ["bulkHall", "bulkInStore", "pelletsLoose"],
    overview: [
      "Bulk supply is the usual choice for automated boilers with a dedicated pellet store. Pellets are delivered loose, which removes packaging and manual handling.",
      "Bulk deliveries depend on your location, store type and access. Share those details in your enquiry and we will confirm what we can offer.",
    ],
    suitedTo: [
      "Homes with a pellet boiler and bulk store",
      "Commercial and public buildings",
      "Agricultural and industrial heating",
    ],
    specs: [{ label: "Minimum order quantity" }, ...commonSpecs],
    supply: [
      {
        title: "What we need to know",
        body: "Your delivery location, the type and capacity of your store, and how a delivery vehicle can reach the fill point.",
      },
      {
        title: "Regular supply",
        body: "If you use pellets year-round, ask about arranging repeat deliveries through the heating season.",
      },
    ],
    enquiryType: "bulk",
    related: ["premium-wood-pellets", "bagged-wood-pellets"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
