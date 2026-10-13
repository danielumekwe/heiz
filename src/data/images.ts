/**
 * Image registry. Every photograph used on the site is declared here once,
 * together with its intrinsic size, alt text and licence details. The
 * /image-credits page is generated from this file.
 */

export type ImageCredit = {
  author: string;
  license: string;
  licenseUrl?: string;
  sourceUrl?: string;
  /** True when the licence requires attribution. */
  attributionRequired: boolean;
  note?: string;
};

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: ImageCredit;
};

const CC_BY_2 = {
  license: "CC BY 2.0",
  licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  attributionRequired: true,
} as const;

const PUBLIC_DOMAIN = {
  license: "Public domain",
  licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  attributionRequired: false,
} as const;

const CC0 = {
  license: "CC0 1.0",
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  attributionRequired: false,
} as const;

const CROPPED = "Cropped and resized.";

export const images = {
  hero: {
    src: "/images/hero/1heiz-wood-pellets-hero.webp",
    width: 2400,
    height: 1350,
    alt: "Light-brown wood pellets heaped in warm daylight",
    credit: {
      author: "ccnull.de Bilddatenbank",
      sourceUrl: "https://www.flickr.com/photos/foto_db/54382470154/",
      note: CROPPED,
      ...CC_BY_2,
    },
  },
  pelletsCloseup: {
    src: "/images/products/premium-wood-pellets-closeup.webp",
    width: 1600,
    height: 1200,
    alt: "Close-up of uniform cylindrical wood pellets",
    credit: {
      author: "Oregon Department of Forestry",
      sourceUrl:
        "https://www.flickr.com/photos/oregondepartmentofforestry/10349420696/",
      note: CROPPED,
      ...CC_BY_2,
    },
  },
  pelletsLoose: {
    src: "/images/products/wood-pellets-loose.webp",
    width: 1800,
    height: 1200,
    alt: "Loose wood pellets falling onto a pile",
    credit: {
      author: "ccnull.de Bilddatenbank",
      sourceUrl: "https://www.flickr.com/photos/foto_db/54350090555/",
      note: CROPPED,
      ...CC_BY_2,
    },
  },
  production: {
    src: "/images/products/wood-pellet-production.webp",
    width: 1800,
    height: 1200,
    alt: "Wood pellets moving along a conveyor in a pellet plant",
    credit: {
      author: "ccnull.de Bilddatenbank",
      sourceUrl: "https://www.flickr.com/photos/foto_db/54350597018/",
      note: `${CROPPED} Illustrative image; not a 1heiz facility.`,
      ...CC_BY_2,
    },
  },
  bulkHall: {
    src: "/images/bulk-supply/bulk-wood-pellet-supply.webp",
    width: 1800,
    height: 943,
    alt: "Bulk wood pellets stored in a large covered hall",
    credit: {
      author: "Jonn Leffmann",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Pellets_-_Ystad-2021.jpg",
      attributionRequired: true,
      note: "Resized. Illustrative image; not a 1heiz facility.",
    },
  },
  bulkInStore: {
    src: "/images/bulk-supply/bulk-wood-pellets-in-store.webp",
    width: 1600,
    height: 1200,
    alt: "Hands holding wood pellets above a bulk pellet store",
    credit: {
      author: "Oregon Department of Forestry",
      sourceUrl:
        "https://www.flickr.com/photos/oregondepartmentofforestry/10215998383/",
      note: CROPPED,
      ...CC_BY_2,
    },
  },
  warehouse: {
    src: "/images/wholesale/wholesale-warehouse-pallets.webp",
    width: 2000,
    height: 1125,
    alt: "Palletised goods staged in a spacious warehouse",
    credit: {
      author: "U.S. Department of Agriculture",
      sourceUrl: "https://www.flickr.com/photos/usdagov/30293794810/",
      note: `${CROPPED} Illustrative image; not a 1heiz facility.`,
      ...PUBLIC_DOMAIN,
    },
  },
  forklift: {
    src: "/images/wholesale/warehouse-forklift-pallets.webp",
    width: 1800,
    height: 1200,
    alt: "Forklift moving stacked pallets in a distribution warehouse",
    credit: {
      author: "U.S. Customs and Border Protection",
      license: "Public domain (U.S. Government work)",
      sourceUrl: "https://www.flickr.com/photos/cbpphotos/49716835622/",
      attributionRequired: false,
      note: `${CROPPED} Illustrative image; not a 1heiz facility.`,
    },
  },
  forest: {
    src: "/images/sustainability/woodland-spruce-forest.webp",
    width: 2000,
    height: 1500,
    alt: "Tall spruce trunks in a quiet woodland",
    credit: {
      author: "W.carter",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Spruce_forest_at_Holma.jpg",
      note: CROPPED,
      ...CC0,
    },
  },
  timberRoad: {
    src: "/images/sustainability/woodland-timber-resources.webp",
    width: 2000,
    height: 1500,
    alt: "Stacked spruce logs beside a forest track",
    credit: {
      author: "Profpcde",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Stacked_spruce_logs_beside_a_forest_road_near_Wernigerode,_Harz,_Germany_%E2%80%93_view_along_the_track.jpg",
      note: CROPPED,
      ...CC0,
    },
  },
  logs: {
    src: "/images/sustainability/harvested-timber-logs.webp",
    width: 2000,
    height: 1333,
    alt: "Stacked small-diameter timber logs",
    credit: {
      author: "U.S. Department of Agriculture",
      sourceUrl: "https://www.flickr.com/photos/usdagov/49209755228/",
      note: CROPPED,
      ...PUBLIC_DOMAIN,
    },
  },
  stove: {
    src: "/images/lifestyle/wood-pellet-stove-lifestyle.webp",
    width: 1800,
    height: 900,
    alt: "Pellet stove burning in a bright living room",
    credit: {
      author: "Ken Mayer",
      sourceUrl: "https://www.flickr.com/photos/ken_mayer/8381578539/",
      note: CROPPED,
      ...CC_BY_2,
    },
  },
  storage: {
    src: "/images/resources/wood-pellet-storage.webp",
    width: 1800,
    height: 1200,
    alt: "Bagged wood pellets stacked on a pallet indoors",
    credit: {
      author: "U.S. Forest Service, Intermountain Region",
      sourceUrl: "https://www.flickr.com/photos/107640324@N05/26312446713/",
      note: `${CROPPED} Shows third-party packaging, not a 1heiz product.`,
      ...PUBLIC_DOMAIN,
    },
  },
  hands: {
    src: "/images/resources/wood-pellets-in-hands.webp",
    width: 1800,
    height: 1200,
    alt: "Several cupped hands holding wood pellets",
    credit: {
      author: "Oregon Department of Forestry",
      sourceUrl:
        "https://www.flickr.com/photos/oregondepartmentofforestry/17259670275/",
      note: CROPPED,
      ...CC_BY_2,
    },
  },
  bag: {
    src: "/images/brand/1heiz-branded-pellet-bag.webp",
    width: 1200,
    height: 1500,
    alt: "Concept mockup of a pellet bag carrying the 1heiz Wood Pellets logo",
    credit: {
      author: "1heiz (concept mockup)",
      license: "Original artwork",
      attributionRequired: false,
      note: "Packaging concept, not approved packaging artwork. Pellet window uses a photo by Oregon Department of Forestry (CC BY 2.0).",
      sourceUrl:
        "https://www.flickr.com/photos/oregondepartmentofforestry/10349420696/",
    },
  },
  campaign: {
    src: "/images/brand/1heiz-wood-pellets-campaign.webp",
    width: 2400,
    height: 1350,
    alt: "Concept mockup of a 1heiz Wood Pellets bag on a warm cream backdrop",
    credit: {
      author: "1heiz (concept mockup)",
      license: "Original artwork",
      attributionRequired: false,
      note: "Packaging concept, not approved packaging artwork. Pellet window uses a photo by Oregon Department of Forestry (CC BY 2.0).",
      sourceUrl:
        "https://www.flickr.com/photos/oregondepartmentofforestry/10349420696/",
    },
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
