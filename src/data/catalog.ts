import type { ImageKey } from "./images";

/**
 * Product catalogue imported from the previous WooCommerce shop
 * (export of 13 October 2026, no prices or SKUs). Of the 20 exported products,
 * the five without photos were removed at the owner's request.
 *
 * Descriptions and specifications are carried over from the export.
 * Sales boilerplate that named other companies, quoted their sales volumes
 * or stated wood origins was left out. `id` is the original WooCommerce ID.
 */

export type CatalogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type CatalogImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type CatalogProduct = {
  id: number;
  slug: string;
  name: string;
  category: string;
  summary: string;
  /** Photos carried over from the old shop. May be empty. */
  images: CatalogImage[];
  /** Stand-in photo from the site library, shown as illustrative when there are no product photos. */
  illustration?: ImageKey;
  /** The photo shows a packaging design rather than photographed stock. */
  conceptPackaging?: boolean;
  /** Shows a note that quality documentation is supplied with the quote. */
  qualityNote?: boolean;
  body: CatalogBlock[];
};

export const catalogCategories = ["Wood Pellets","Briquettes","Firewood","Round Logs","Agri Pellets & Bedding","Pallets & Crates"] as const;

export const catalog: CatalogProduct[] = [
  {
    "id": 8528,
    "slug": "din-industrial-en-plus-a2",
    "name": "DIN industrial – EN plus-A2",
    "category": "Wood Pellets",
    "summary": "DIN industrial ( EN plus-A2 ) are great quality wood pellets for industrial use. Delivery can be by ship, train, truck or container.",
    "images": [
      {
        "src": "/images/catalog/din-industrial-en-plus-a2-1.webp",
        "width": 600,
        "height": 450,
        "alt": "Wrapped pallets of bagged wood pellets on a packing line"
      },
      {
        "src": "/images/catalog/din-industrial-en-plus-a2-2.webp",
        "width": 800,
        "height": 600,
        "alt": "Close-up of industrial wood pellets in an open bag"
      }
    ],
    "qualityNote": true,
    "body": [
      {
        "type": "paragraph",
        "text": "DIN industrial ( EN plus-A2 ) are great quality wood pellets for industrial use. Delivery can be by ship, train, truck or container."
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Quality: DIN industrial ( EN plus-A2 )",
          "Diameter (mm): 6mm – 8mm",
          "Ash (%): ≤ 1,5",
          "Moisture (%): ≤ 10",
          "Packaging: 15 kg, 16 kg, 25 kg, Big Bags, Loose",
          "Length (mm): 3,15 ≤ L ≤ 40",
          "The heat of combustion (MJ / kg): ≥ 16,0",
          "Abrasion / dust (%): ≤ 1",
          "Hardness (%): ≥ 97,7",
          "Bulk density (kg/m3): ≥ 600"
        ]
      }
    ]
  },
  {
    "id": 8530,
    "slug": "dinplus-premium",
    "name": "DINplus PREMIUM",
    "category": "Wood Pellets",
    "summary": "DINplus PREMIUM pellets are white pellets. Why we separate DINplus PREMIUM from DIN white?",
    "images": [
      {
        "src": "/images/catalog/dinplus-premium-1.webp",
        "width": 600,
        "height": 400,
        "alt": "DINplus PREMIUM"
      }
    ],
    "qualityNote": true,
    "body": [
      {
        "type": "paragraph",
        "text": "DINplus PREMIUM pellets are white pellets. Why we separate DINplus PREMIUM from DIN white? Because our customers separate them even there is no such classification in the scientific research. White pellet (PREMIUM) demand is really huge, however, there is not available such a lot white (PREMIUM) pellets in the market. Even DIN white = DINplus PREMIUM, the ONLY difference is the collor! Everyone should understand that. Within last 2 + years more and more clients understand that and there will be time when DIN white will be hard to get as it is with DINplus PREMIUM. As market for pellets grows exponential the same is with demand. That why white wood are not so easy to get for good price! DIN white is for domestic use. And don`t forget – It is NOT a color, it is how much heat You get..!"
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Quality: DIN PREMIUM",
          "Diameter (mm): 6mm – 8mm",
          "Ash (%): ≤ 0,5%",
          "Moisture (%): ≤ 10",
          "Packaging: 15 kg, 16 kg, 25 kg, Big Bags",
          "Length (mm): ≤ 5 x D",
          "The heat of combustion (MJ / kg): ≥ 18",
          "Abrasion / dust (%): ≤ 1",
          "Hardness (%): ≥ 97,7",
          "Bulk density (kg/m3): ≥ 600"
        ]
      }
    ]
  },
  {
    "id": 8531,
    "slug": "en-plus-a1",
    "name": "EN plus-A1",
    "category": "Wood Pellets",
    "summary": "EN plus-A1 are high quality wood pellets for domestic use. If You think about difference about DIN plus and EN plus-A1 You will not see big difference.",
    "images": [
      {
        "src": "/images/catalog/en-plus-a1-1.webp",
        "width": 434,
        "height": 560,
        "alt": "EN plus-A1 wood pellets in a clear bag"
      },
      {
        "src": "/images/catalog/en-plus-a1-2.webp",
        "width": 500,
        "height": 281,
        "alt": "Bags of EN plus-A1 wood pellets stacked on a pallet"
      }
    ],
    "qualityNote": true,
    "body": [
      {
        "type": "paragraph",
        "text": "EN plus-A1 are high quality wood pellets for domestic use. If You think about difference about DIN plus and EN plus-A1 You will not see big difference. Mostly what You will see is that You will have ~10 % less costs compared to DIN plus. Even the heat theoretically is less than in DIN plus, but we have seen that many sellers sell DIN plus with the heat the same as for this. So, be sure You get this material, because it is really good to heat Your home!"
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Quality: EN plus-A1",
          "Diameter (mm): 6mm – 8mm",
          "Ash (%): ≤ 0,7",
          "Moisture (%): ≤ 10",
          "Packaging: 15 kg, 16 kg, 25 kg, Big Bags",
          "Length (mm): 3,15 ≤ L ≤ 40",
          "The heat of combustion (MJ / kg): ≥ 16,5",
          "Abrasion / dust (%): ≤ 1",
          "Hardness (%): ≥ 97,7",
          "Bulk density (kg/m3): ≥ 600"
        ]
      }
    ]
  },
  {
    "id": 8514,
    "slug": "ruf-bark-briquettes",
    "name": "RUF Bark Briquettes",
    "category": "Briquettes",
    "summary": "RUF bark Briquettes have extremely long burning time up to 10-16 hours.",
    "images": [
      {
        "src": "/images/catalog/ruf-bark-briquettes-1.webp",
        "width": 600,
        "height": 400,
        "alt": "RUF Bark Briquettes"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "RUF bark Briquettes have extremely long burning time up to 10-16 hours. That is not to say you can come down next morning, give them a poke and they burst into flames, rather that there is still a good warmth in the stove and a glow from the ashes. Bark does produce extra ash, more ash creates a bigger heat store, but also more ash to dispose of the next day."
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Combusting temperature: 4200Kcal/kg",
          "Moisture: around 10%",
          "Ash content : around 4%",
          "Mechanical durability: 95%",
          "Partly destroyed briquettes:14%",
          "Size : 155 x 110 x 65 mm",
          "Packaging: 12 blocks weigths around 12 kg, 84 packs on pallet"
        ]
      }
    ]
  },
  {
    "id": 8518,
    "slug": "ash-firewood",
    "name": "Ash Firewood",
    "category": "Firewood",
    "summary": "Ash firewood is very dense, tough and strong, but also elastic – wood. Its density is 0.75 gr/m3 and heat capacity is 5,6MWh/t.",
    "images": [
      {
        "src": "/images/catalog/ash-firewood-1.webp",
        "width": 600,
        "height": 338,
        "alt": "Ash Firewood"
      },
      {
        "src": "/images/catalog/ash-firewood-2.webp",
        "width": 600,
        "height": 537,
        "alt": "Ash Firewood, view 2"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "Ash firewood is very dense, tough and strong, but also elastic – wood. Its density is 0.75 gr/m3 and heat capacity is 5,6MWh/t. This is because it is a hardwood, and has excellent burning properties, including:"
      },
      {
        "type": "list",
        "items": [
          "Ash logs last much longer than softwoods when burned in stoves or open fires",
          "When burned, it turns into a bright red glow, with high heat output",
          "It has few knots, so sparks less than other woods",
          "Burns completely, and leaves very little ash",
          "Less smoke emitted so chimneys are cleaner"
        ]
      },
      {
        "type": "paragraph",
        "text": "Our ash firewood has the best quality, because it is dried mechanically. Firewood is possible to get in different packaging’s: 1m3 and 2m3 boxes. Usually, we do not sell ash firewood in bags, but it is possible to arrange it as well according to your requirements."
      },
      {
        "type": "heading",
        "text": "Firewood in 1m3 crate"
      },
      {
        "type": "list",
        "items": [
          "Size: 25 -30cm (it is possible to get different sizes as well)",
          "Moisture : 18 % or fresh",
          "Weight: around 27 kg",
          "Split size: 8 cm"
        ]
      }
    ]
  },
  {
    "id": 8519,
    "slug": "birch-firewood",
    "name": "Birch Firewood",
    "category": "Firewood",
    "summary": "Birch firewood is fine-grained and pale in color, often with an attractive satin like sheen.",
    "images": [
      {
        "src": "/images/catalog/birch-firewood-1.webp",
        "width": 600,
        "height": 400,
        "alt": "Birch Firewood"
      },
      {
        "src": "/images/catalog/birch-firewood-2.webp",
        "width": 400,
        "height": 429,
        "alt": "Birch Firewood, view 2"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "Birch firewood is fine-grained and pale in color, often with an attractive satin like sheen."
      },
      {
        "type": "paragraph",
        "text": "The heat is good but it burns quickly with a bright flame, without popping, even when frozen and freshly hewn. The bark will burn very well even when wet because of the oils it contains. Firewood has a high calorific value- 8,33KJ."
      },
      {
        "type": "paragraph",
        "text": "In order to get this high caloric value firewood must be kiln dried either mechanically or in a natural way. Our produced Birch firewood moisture should be around 16- 18 %. When you dried it naturally it takes around two years and then moisture is around 20 %."
      },
      {
        "type": "paragraph",
        "text": "Birch firewood is possible to get in different packaging’s: 22l and 40 l bags, 1m3 and 2m3 boxes. The packaging is also adjustable according to your requirements."
      },
      {
        "type": "paragraph",
        "text": "We offer fresh and kiln dried birch firewood. Length usually is adjustable to each customer request, but usually we have two standard sizes 25- 27 cm and 28-30 cm. Our Birch firewood has the best quality, because it is kiln dried mechanically."
      },
      {
        "type": "heading",
        "text": "Firewood in 2 m3 crate"
      },
      {
        "type": "list",
        "items": [
          "Size: 25 -30cm (it is possible to get different sizes as well)",
          "Moisture : 18 % or fresh",
          "Weight: around 54 kg",
          "Split size: 8 cm"
        ]
      }
    ]
  },
  {
    "id": 8520,
    "slug": "kindling-firewood",
    "name": "Kindling Firewood",
    "category": "Firewood",
    "summary": "Kindling firewood that is easily recognized by its red color and has a specific smell. Alder firewood dry’s fast, if it is dried mechanically, if naturally it may rot.",
    "images": [
      {
        "src": "/images/catalog/kindling-firewood-1.webp",
        "width": 1400,
        "height": 933,
        "alt": "1heiz kindling firewood bag beside a pile of split kindling"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "Kindling firewood that is easily recognized by its red color and has a specific smell. Alder firewood dry’s fast, if it is dried mechanically, if naturally it may rot."
      },
      {
        "type": "paragraph",
        "text": "Kindling firewood is one of the cheapest firewood in the market because of its very fast population. Seasoned Alder burns warm, but fast. Wet alder puts out a lot of ash and very little heat. Firewood burns almost without a smoke. Max. Heating intensity is 4878 Kcal/kg."
      },
      {
        "type": "paragraph",
        "text": "Alder firewood is possible to get into different packaging’s: 22l and 40 l bags, 1m3 and 2m3 boxes. The packaging is also adjustable according to your requirements."
      },
      {
        "type": "paragraph",
        "text": "Natural kindling is split extra thin specifically for kindling sized wood. This wood is aged to allow for optimal drying. Natural kindling comes from hardwoods; it starts and holds a flame extremely well. Kindling usually is made from spruce and pine wood, but it is also possible to get different kind of kindling as well (birch)."
      },
      {
        "type": "list",
        "items": [
          "Size: 20 cm",
          "Moisture: 12%",
          "Weight: 3-4 kg",
          "Packaging: packed in bags (96 bags in pallet)"
        ]
      }
    ]
  },
  {
    "id": 8521,
    "slug": "mixed-firewood",
    "name": "Mixed Firewood",
    "category": "Firewood",
    "summary": "We offer different kinds of mixed firewood, to get the best result in heating.",
    "images": [
      {
        "src": "/images/catalog/mixed-firewood-1.webp",
        "width": 1400,
        "height": 1050,
        "alt": "Mixed Firewood"
      },
      {
        "src": "/images/catalog/mixed-firewood-2.webp",
        "width": 600,
        "height": 313,
        "alt": "Mixed Firewood, view 2"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "We offer different kinds of mixed firewood, to get the best result in heating. When different wood species are mixed it is possible to reach each customers individual requirements. It is possible to get fresh or kiln dried firewood in different kind of sizes and packaging."
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Size: 25 -30cm (it is possible to get different sizes as well)",
          "Moisture : 18 % – or fresh",
          "Weight: around 27- 54kg",
          "Split size: 8 cm",
          "Species: Ash- Oak",
          "Species: Alder- Birch",
          "Species: Apsen, Alder, Birch"
        ]
      }
    ]
  },
  {
    "id": 8523,
    "slug": "birch-round-logs-betula-pendula",
    "name": "Birch Round Logs (Betula Pendula)",
    "category": "Round Logs",
    "summary": "Our decorative Birch Round Logs are cut from Europe white birch trees and are sold in “large log sets” (containing logs between 3.5″ and 5″ in diameter) or as “standard sets” (containing…",
    "images": [
      {
        "src": "/images/catalog/birch-round-logs-betula-pendula-1.webp",
        "width": 600,
        "height": 337,
        "alt": "Birch Round Logs (Betula Pendula)"
      },
      {
        "src": "/images/catalog/birch-round-logs-betula-pendula-2.webp",
        "width": 600,
        "height": 450,
        "alt": "Birch Round Logs (Betula Pendula), view 2"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "Our decorative Birch Round Logs are cut from Europe white birch trees and are sold in “large log sets” (containing logs between 3.5″ and 5″ in diameter) or as “standard sets” (containing logs between 2″ and 3.5″ in diameter)."
      },
      {
        "type": "paragraph",
        "text": "Log bundles come in your choice of 16″ or 20″ lengths and the minimum order quantity for purchase is 100 units."
      },
      {
        "type": "paragraph",
        "text": "These decorative birch logs are usually stacked together for use as a fireplace decorations, roped together as yule log bundles, or added to floral/decorative designs that add an “woodsy” charm to holiday arrangements."
      },
      {
        "type": "paragraph",
        "text": "Please note that our decorative birch logs are natural products with color variations and unique surface characteristics that may not match our photo samples exactly. White birch logs are often paired with decorative birch poles and decorative birch twig for seasonal arrangements in addition to fireplace displays."
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Dia 16cm -18cm – 25%",
          "Dia 18cm + – 75%",
          "Lengths 2.7m – 65% min",
          "Lenghts 3m – 35% max",
          "Grade: AB (C – max 5%)"
        ]
      }
    ]
  },
  {
    "id": 8524,
    "slug": "pine-round-logs-pinus-silvestris",
    "name": "Pine Round Logs (Pinus Silvestris)",
    "category": "Round Logs",
    "summary": "Pine round logs in AB grades, supplied in the diameters and lengths listed below.",
    "images": [
      {
        "src": "/images/catalog/pine-round-logs-pinus-silvestris-1.webp",
        "width": 408,
        "height": 238,
        "alt": "Pine round logs stacked at the edge of a forest"
      },
      {
        "src": "/images/catalog/pine-round-logs-pinus-silvestris-2.webp",
        "width": 410,
        "height": 273,
        "alt": "Pine round logs piled in a timber yard"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "Pine round logs in AB grades, supplied in the diameters and lengths listed below."
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Dia 18cm – 24cm–25%",
          "Dia 26+cm-75%",
          "Lengths 4 m – 20%max",
          "Lenghts 5,7m-6m 80%min",
          "AB grades (C – 5%)"
        ]
      }
    ]
  },
  {
    "id": 8525,
    "slug": "pulpwood-logs",
    "name": "Pulpwood Logs",
    "category": "Round Logs",
    "summary": "Pulpwood logs are often among the widest logs found on old cabins.",
    "images": [
      {
        "src": "/images/catalog/pulpwood-logs-1.webp",
        "width": 600,
        "height": 399,
        "alt": "Birch pulpwood logs stacked beside woodland"
      },
      {
        "src": "/images/catalog/pulpwood-logs-2.webp",
        "width": 600,
        "height": 397,
        "alt": "Cut ends of stacked birch pulpwood logs"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "Pulpwood logs are often among the widest logs found on old cabins."
      },
      {
        "type": "paragraph",
        "text": "Pulp is an abundant species of wood, it grows straight and relatively knot-free, and it is a joy to hew and notch. These massive logs tend to “soften” in appearance as they age and are quite tempting to caress with the hand as they will not splinter. They are also among the best logs for insulation R-values."
      },
      {
        "type": "paragraph",
        "text": "Very easy to work in almost all regards, one of Poplar’s only downsides is its softness. Due to its low density, Poplar can sometimes leave fuzzy surfaces and edges: especially during shaping or sanding. Sanding to finer grits of sandpaper may be necessary to obtain a smooth surface."
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Dia 6cm – 60cm",
          "Lengths 3m; 4m; 6m;"
        ]
      }
    ]
  },
  {
    "id": 8526,
    "slug": "spruce-round-logs-picea-abies",
    "name": "Spruce Round Logs (Picea Abies)",
    "category": "Round Logs",
    "summary": "Spruce Logs is a tree of the genus Picea, a genus of about 35 species of coniferous evergreen trees in the Family Pinaceae, found in the northern temperate and boreal (taiga) regions of the earth.",
    "images": [
      {
        "src": "/images/catalog/spruce-round-logs-picea-abies-1.webp",
        "width": 600,
        "height": 450,
        "alt": "Spruce round logs stacked in a timber yard"
      },
      {
        "src": "/images/catalog/spruce-round-logs-picea-abies-2.webp",
        "width": 410,
        "height": 300,
        "alt": "Pile of spruce round logs with marked ends"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "Spruce Logs is a tree of the genus Picea, a genus of about 35 species of coniferous evergreen trees in the Family Pinaceae, found in the northern temperate and boreal (taiga) regions of the earth."
      },
      {
        "type": "paragraph",
        "text": "Spruces are large trees, from 20–60 metres tall when mature, and can be distinguished by their whorled branches and conical form."
      },
      {
        "type": "paragraph",
        "text": "Spruce wood is used for many purposes, ranging from general construction work and crates to highly specialized uses in wooden aircraft."
      },
      {
        "type": "paragraph",
        "text": "Because this species has no insect or decay resistance qualities after logging, it is generally recommended for construction purposes as indoor use only (ex. indoor drywall framing). Spruce wood, when left outside cannot be expected to last more than 12–18 months depending on the type of climate it is exposed to."
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Dia 18cm – 24cm–25%",
          "Dia 26+cm-75%",
          "Lengths 4 m – 20%max",
          "Lenghts 5,7m-6m 80%min",
          "AB grades (C – 5%)"
        ]
      }
    ]
  },
  {
    "id": 8527,
    "slug": "din-hay-pellets-for-heating",
    "name": "DIN Hay Pellets (for heating)",
    "category": "Agri Pellets & Bedding",
    "summary": "One of the greatest products today if we look what it possible with it and the price!",
    "images": [
      {
        "src": "/images/catalog/din-hay-pellets-for-heating-1.webp",
        "width": 600,
        "height": 400,
        "alt": "DIN Hay Pellets (for heating)"
      },
      {
        "src": "/images/catalog/din-hay-pellets-for-heating-2.webp",
        "width": 300,
        "height": 300,
        "alt": "DIN Hay Pellets (for heating), view 2"
      }
    ],
    "qualityNote": true,
    "body": [
      {
        "type": "paragraph",
        "text": "One of the greatest products today if we look what it possible with it and the price! Hay pellets are a relatively new idea in heating and are becoming increasingly popular. Reasons to this vary – increasing energy consumption, rising prices of traditional energy resources, lack of raw material for production of wood chips pellets, development of heating technologies."
      },
      {
        "type": "paragraph",
        "text": "Hay pellets burn just as well as wood pellets. The efficiency is calculated by the amount burned minus the ash content. So grass based pellets usually have a 1%-2% higher ash content, but after burning the ash can be used as ecological fertilizer in the farming. Not only are the Hay pellets environmentally friendly they’re wallet friendly too!"
      },
      {
        "type": "paragraph",
        "text": "Straw Pellets can be used as heating too but compared to Hay pellets they have formation of slag, hence the necessity to regularly clean the heating boiler. As long as wild natural grasses are grown, Hay will be available, unlike wood which is becoming increasingly expensive."
      },
      {
        "type": "heading",
        "text": "Specification"
      },
      {
        "type": "list",
        "items": [
          "Quality: DIN",
          "Diameter (mm): 6mm – 8mm",
          "Ash (%): ≤ 2-4%",
          "Moisture (%): ≤ 8-11",
          "Packaging: 15 kg, 16 kg, 25 kg, 40 kg, Big Bags, Loose",
          "Length (mm): 3,15 ≤ L ≤ 40",
          "The heat of combustion (MJ / kg): ≥ 16,0",
          "Sulphur (%): ≤ 0,15",
          "Hardness (%): ≥ 97,7",
          "Bulk density (kg/m3): ≥ 680"
        ]
      }
    ]
  },
  {
    "id": 8567,
    "slug": "bespoke-new-life-pallets",
    "name": "Bespoke New Life Pallets",
    "category": "Pallets & Crates",
    "summary": "Save a tree why not try a New Life Pallet and make savings too.",
    "images": [
      {
        "src": "/images/catalog/bespoke-new-life-pallets-1.webp",
        "width": 730,
        "height": 530,
        "alt": "Bespoke New Life Pallets"
      },
      {
        "src": "/images/catalog/bespoke-new-life-pallets-2.webp",
        "width": 600,
        "height": 436,
        "alt": "Bespoke New Life Pallets, view 2"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "Save a tree why not try a New Life Pallet and make savings too."
      },
      {
        "type": "paragraph",
        "text": "It’s a great way for your business to contribute to the environment. We specialize in pallet reconditioning, the most environmental and economical way to supply pallets."
      },
      {
        "type": "paragraph",
        "text": "We can offer you a consistent supply of reconditioned pallets, regardless of pallet grade, size & quantity. Our loads can be delivered in quantities starting from 50 to 825 pallets."
      }
    ]
  },
  {
    "id": 8568,
    "slug": "boxes-crates",
    "name": "Boxes & Crates",
    "category": "Pallets & Crates",
    "summary": "We can supply any size any spec to fit your packaging requirements.",
    "images": [
      {
        "src": "/images/catalog/boxes-crates-1.webp",
        "width": 600,
        "height": 436,
        "alt": "Boxes & Crates"
      },
      {
        "src": "/images/catalog/boxes-crates-2.webp",
        "width": 600,
        "height": 436,
        "alt": "Boxes & Crates, view 2"
      }
    ],
    "body": [
      {
        "type": "paragraph",
        "text": "We can supply any size any spec to fit your packaging requirements."
      },
      {
        "type": "paragraph",
        "text": "We can supply different types of boxes and crates."
      },
      {
        "type": "list",
        "items": [
          "New Boxes and Crates manufactured from New Timber.",
          "New Boxes manufactured from reclaimed timber.",
          "Reconditioned Boxes & Crates various sizes available."
        ]
      }
    ]
  }
];

export function getCatalogProduct(slug: string) {
  return catalog.find((product) => product.slug === slug);
}

export function categoryAnchor(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
