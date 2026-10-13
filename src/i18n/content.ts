import { catalog, catalogCategories, type CatalogProduct } from "@/data/catalog";
import { faqCategories, type FaqCategory } from "@/data/faq";
import { products } from "@/data/products";
import { enquiryTypes } from "@/lib/enquiry";
import type { Translate } from "./translate";

/** A catalogue product with every visitor-facing string translated. */
export type LocalizedCatalogProduct = CatalogProduct & {
  /** Translated category name; `category` keeps the English id. */
  categoryLabel: string;
};

export function localizeCatalogProduct(
  t: Translate,
  product: CatalogProduct,
): LocalizedCatalogProduct {
  return {
    ...product,
    name: t(product.name),
    categoryLabel: t(product.category),
    summary: t(product.summary),
    images: product.images.map((image) => ({ ...image, alt: t(image.alt) })),
    body: product.body.map((block) =>
      block.type === "list"
        ? { ...block, items: block.items.map((item) => t(item)) }
        : { ...block, text: t(block.text) },
    ),
  };
}

export function localizeCatalog(t: Translate) {
  return catalog.map((product) => localizeCatalogProduct(t, product));
}

export function localizeCatalogCategories(t: Translate) {
  return catalogCategories.map((category) => ({ id: category, label: t(category) }));
}

export function localizeFaq(t: Translate): FaqCategory[] {
  return faqCategories.map((category) => ({
    ...category,
    label: t(category.label),
    items: category.items.map((item) => ({
      question: t(item.question),
      answer: item.answer.map((paragraph) => t(paragraph)),
      link: item.link ? { ...item.link, label: t(item.link.label) } : undefined,
    })),
  }));
}

/** Labels shared by every catalogue card. */
export function catalogCardLabels(t: Translate) {
  return { quote: t("Request a Quote"), photoOnRequest: t("Photo on request") };
}

/** Everything the enquiry form displays, translated. */
export function enquiryFormContent(t: Translate) {
  return {
    labels: {
      sentTitle: t("Enquiry sent"),
      tryLater: t("Please try again later. Your details are still in the form below."),
      emailInstead: t(
        "Please email us at <email/> instead. Your details are still in the form below.",
      ),
      requiredNote: t("Fields marked * are required."),
      name: t("Name"),
      company: t("Company"),
      ifApplicable: t("(if applicable)"),
      optional: t("(optional)"),
      email: t("Email"),
      phone: t("Phone"),
      enquiryType: t("Enquiry type"),
      quantity: t("Estimated quantity"),
      quantityPlaceholder: t("e.g. 2 pallets, or tonnes per year"),
      product: t("Product"),
      selectProduct: t("Select a product"),
      location: t("Delivery location"),
      locationPlaceholder: t("Town or postcode, and country"),
      message: t("Message"),
      website: t("Website"),
      consent: t(
        "I agree that 1heiz may use these details to respond to my enquiry, as described in the <link>privacy policy</link>.",
      ),
      sending: t("Sending…"),
      send: t("Send Enquiry"),
    },
    types: enquiryTypes.map((type) => ({ value: type.value, label: t(type.label) })),
    productGroups: [
      {
        label: t("Wood pellets and supply formats"),
        // The submitted value stays in English so enquiries read the same in every language.
        items: products.map((product) => ({ value: product.name, label: t(product.name) })),
      },
      {
        label: t("Full product range"),
        items: catalog.map((product) => ({ value: product.name, label: t(product.name) })),
      },
    ],
  };
}

export type EnquiryFormContent = ReturnType<typeof enquiryFormContent>;
