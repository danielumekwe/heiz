/**
 * Customer testimonials.
 *
 * Add only genuine statements from real customers, used with their
 * permission. Never add invented or paraphrased-to-flatter entries, and
 * record a rating only when the customer actually gave one.
 * While this list is empty the page invites feedback instead, stays out of
 * the footer and sitemap, and asks search engines not to index it.
 */

export type Testimonial = {
  /** The customer's own words. */
  quote: string;
  /** Name as the customer agreed to be shown, e.g. "Anna M." */
  name: string;
  /** Optional context, e.g. "Homeowner, Leipzig" or "Fuel merchant". */
  role?: string;
  /** Optional product the feedback relates to. */
  product?: string;
  /** Optional month and year, e.g. "March 2026". */
  date?: string;
  /** Optional score from 1 to 5, as given by the customer. Leave out if they gave none. */
  rating?: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [];
