import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import { translatorFor } from "./dictionaries";
import type { Translate } from "./translate";

/** The locale of the current request, from the /[lang] route segment. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Translation function for the current request's locale. Server Components only. */
export async function getT(): Promise<Translate> {
  return translatorFor(await getLocale());
}
