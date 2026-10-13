/**
 * Frequently asked questions.
 *
 * Answers state only what is established elsewhere on the site. Where a
 * detail (price, payment terms, delivery time) is agreed per enquiry, the
 * answer says so rather than quoting a figure.
 */

export type FaqLink = { label: string; href: string };

export type FaqItem = {
  question: string;
  /** One paragraph per entry. */
  answer: string[];
  link?: FaqLink;
};

export type FaqCategory = { id: string; label: string; items: FaqItem[] };

export const faqCategories: FaqCategory[] = [
  {
    id: "prices",
    label: "Prices",
    items: [
      {
        question: "Why are there no prices on the website?",
        answer: [
          "Pellet and wood-fuel prices depend on the product, the quantity, the format and where the goods are going. Rather than publish a figure that would be wrong for most buyers, we quote for each enquiry.",
        ],
        link: { label: "Request a quote", href: "/contact#enquiry" },
      },
      {
        question: "What does a quote include?",
        answer: [
          "Your quote sets out the product, its specification, the quantity and format, the price and the delivery arrangements, so you can see exactly what you are ordering before you commit.",
        ],
      },
      {
        question: "Are there extra costs on top of the quoted price?",
        answer: [
          "Anything that affects the cost of your order, such as delivery or difficult site access, is addressed in the quote. If something about your site is unusual, tell us in your enquiry so it can be taken into account from the start.",
        ],
      },
      {
        question: "How long is a quote valid?",
        answer: [
          "Fuel prices move with the season and the market, so each quote states how long it applies. If yours has lapsed, ask us and we will confirm the current price.",
        ],
      },
    ],
  },
  {
    id: "ordering",
    label: "Ordering",
    items: [
      {
        question: "How do I order from 1heiz?",
        answer: [
          "Send us an enquiry with the product you want, an estimated quantity and your delivery location. We check availability and reply by email with a quote. Once you accept it, we arrange the order with you.",
          "There is no online checkout on this website.",
        ],
        link: { label: "Go to the enquiry form", href: "/contact#enquiry" },
      },
      {
        question: "Is there a minimum order quantity?",
        answer: [
          "It depends on the product and format. Bagged pellets can be supplied by the bag or by the pallet, while bulk and wholesale orders are sized to the delivery. We confirm what is possible for your enquiry.",
        ],
      },
      {
        question: "Can businesses and resellers order?",
        answer: [
          "Yes. We supply households, businesses that heat with biomass, and retailers and distributors buying for resale. Trade buyers can ask for wholesale pricing.",
        ],
        link: { label: "Wholesale supply", href: "/wholesale" },
      },
      {
        question: "What should I include in my enquiry?",
        answer: [
          "The product, roughly how much you need, the delivery town or postcode and country, and when you would like it. For bulk pellets, also tell us about your store and how a delivery vehicle can reach it.",
        ],
      },
      {
        question: "What if there is a problem with my order?",
        answer: [
          "Contact us as soon as you notice it, with your order details and, where it helps, photos. We will look into it with you.",
        ],
        link: { label: "Contact 1heiz", href: "/contact" },
      },
    ],
  },
  {
    id: "payment",
    label: "Payment",
    items: [
      {
        question: "How do I pay?",
        answer: [
          "Payment terms are set out in your quote. If you need a particular arrangement, mention it in your enquiry and we will tell you what we can offer.",
        ],
      },
      {
        question: "Can I pay on the website?",
        answer: [
          "No. The website takes enquiries only and does not process payments. We will never ask for card details through the enquiry form.",
        ],
      },
      {
        question: "Will I receive an invoice?",
        answer: [
          "Yes, every order is invoiced. If you need specific company or VAT details shown on the invoice, give them to us when you accept the quote.",
        ],
      },
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    items: [
      {
        question: "Where do you deliver?",
        answer: [
          "Delivery depends on the product, the quantity and the destination. Give us your location in the enquiry and we will confirm whether we can supply you and how.",
        ],
      },
      {
        question: "How long does delivery take?",
        answer: [
          "Lead times vary with the product, the season and your location, and demand is highest in cold periods. We give you the expected delivery arrangements with your quote, so it is worth enquiring ahead of the heating season.",
        ],
      },
      {
        question: "How are the pellets delivered?",
        answer: [
          "Bagged pellets are supplied in 15 kg bags, by the bag or on pallets. Bulk pellets are delivered loose for properties with a pellet store or silo.",
        ],
        link: { label: "Bagged versus bulk: how to decide", href: "/resources/bagged-pellets-versus-bulk-supply" },
      },
      {
        question: "What do you need to know for a bulk delivery?",
        answer: [
          "Your delivery location, the type and capacity of your pellet store, how a vehicle reaches the fill point, the pellet size your boiler needs and roughly how much you use.",
        ],
        link: { label: "Bulk supply", href: "/bulk-supply" },
      },
      {
        question: "Can I collect my order myself?",
        answer: [
          "Ask us in your enquiry. Whether collection is possible depends on the product and where it is held.",
        ],
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    items: [
      {
        question: "What products do you supply?",
        answer: [
          "Wood pellets in bagged and bulk formats are our main product. We also supply briquettes, firewood, round logs, hay pellets, and pallets and crates.",
        ],
        link: { label: "See all products", href: "/products" },
      },
      {
        question: "How much does a bag of pellets weigh?",
        answer: [
          "Our bagged wood pellets come in 15 kg bags. The number of bags on a pallet is confirmed in your quote.",
        ],
        link: { label: "Bagged wood pellets", href: "/products/bagged-wood-pellets" },
      },
      {
        question: "Which pellet quality will I receive?",
        answer: [
          "Your quote names the product and its specification, including the diameter and the quality class. Check these against what your stove or boiler manufacturer requires.",
        ],
        link: { label: "Understanding wood-pellet specifications", href: "/resources/understanding-wood-pellet-specifications" },
      },
      {
        question: "Can I see certificates for the pellets?",
        answer: [
          "Yes. Ask in your enquiry and we will send the quality and certification documents that apply to the product on offer, together with your quote.",
        ],
      },
      {
        question: "How should I store wood pellets?",
        answer: [
          "Keep them dry. Store bags indoors, off bare concrete and away from damp walls, and follow your store manufacturer's guidance for bulk pellets.",
        ],
        link: { label: "How to store wood pellets correctly", href: "/resources/how-to-store-wood-pellets-correctly" },
      },
      {
        question: "Is there a brochure I can download?",
        answer: [
          "Yes. Our product brochure summarises the supply options and our contact details.",
        ],
        link: { label: "Download the brochure (PDF)", href: "/1heiz_wood_pellets_print_brochure.pdf" },
      },
    ],
  },
];
