import { getT } from "@/i18n/server";
import { HeroSlider, type Slide } from "./HeroSlider";

const slides: Slide[] = [
  {
    id: "brand",
    eyebrow: "Wood pellets & biomass fuel",
    title: "Premium Wood Pellets for a Cleaner Energy Future",
    body: "Discover wood-pellet supply options for homes, businesses, and wholesale buyers.",
    primary: { label: "Explore Our Products", href: "/products" },
    secondary: { label: "Request a Quote", href: "/contact#enquiry" },
    background: {
      src: "/images/hero/1heiz-wood-pellets-hero.webp",
      alt: "Light-brown wood pellets heaped in warm daylight",
    },
  },
  {
    id: "bulk",
    eyebrow: "Packaging option 1",
    title: "In Bulk, for Pellet Stores and Silos",
    body: "Loose pellets for automated boilers that draw from a dedicated store, with no bags to carry, open or dispose of.",
    primary: { label: "Explore Bulk Supply", href: "/bulk-supply" },
    secondary: { label: "Request a Bulk Quote", href: "/contact?type=bulk#enquiry" },
    product: {
      src: "/images/brand/1heiz-bulk-pellet-truck.webp",
      width: 819,
      height: 1100,
      alt: "Rear view of a bulk pellet delivery truck in 1heiz Wood Pellets livery",
    },
  },
  {
    id: "bagged",
    eyebrow: "Packaging option 2",
    title: "In 15 kg Bags, Easy to Carry and Store",
    body: "Sealed bags for pellet stoves and anyone without a bulk store, supplied by the bag or by the pallet.",
    primary: { label: "View Bagged Pellets", href: "/products/bagged-wood-pellets" },
    secondary: { label: "Enquire About Availability", href: "/contact?type=bagged#enquiry" },
    product: {
      src: "/images/brand/1heiz-premium-wood-pellets-bag.webp",
      width: 615,
      height: 1100,
      alt: "Paper bag of 1heiz Premium Wood Pellets",
    },
  },
];

/** Home page hero. Translates the slides, then hands them to the carousel. */
export async function Hero() {
  const t = await getT();

  return (
    <HeroSlider
      slides={slides.map((slide) => ({
        ...slide,
        eyebrow: t(slide.eyebrow),
        title: t(slide.title),
        body: t(slide.body),
        primary: { ...slide.primary, label: t(slide.primary.label) },
        secondary: { ...slide.secondary, label: t(slide.secondary.label) },
        background: slide.background
          ? { ...slide.background, alt: t(slide.background.alt) }
          : undefined,
        product: slide.product
          ? { ...slide.product, alt: t(slide.product.alt) }
          : undefined,
      }))}
      labels={{
        region: t("Highlights"),
        position: t("{current} of {total}"),
        showSlide: t("Show slide {number}: {title}"),
        pause: t("Pause slideshow"),
        play: t("Play slideshow"),
        previous: t("Previous slide"),
        next: t("Next slide"),
      }}
    />
  );
}
