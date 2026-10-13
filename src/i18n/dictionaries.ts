import { appendFileSync, mkdirSync } from "node:fs";
import type { Locale } from "./config";
import de from "./dictionaries/de.json";
import es from "./dictionaries/es.json";
import fr from "./dictionaries/fr.json";
import { createTranslate, type Dictionary, type Translate } from "./translate";

const dictionaries: Record<Locale, Dictionary> = { en: {}, de, fr, es };

/**
 * With I18N_EXTRACT=1, every source string that passes through t() is appended
 * to .i18n/strings.ndjson. `npm run i18n:extract` uses this to list the text
 * that needs translating.
 */
const extracting = process.env.I18N_EXTRACT === "1";
const seen = new Set<string>();

function record(text: string) {
  if (seen.has(text)) return;
  seen.add(text);
  try {
    mkdirSync(".i18n", { recursive: true });
    appendFileSync(".i18n/strings.ndjson", `${JSON.stringify(text)}\n`);
  } catch {
    // Extraction is a development aid; never fail a render because of it.
  }
}

/** Translation function for a given locale. Server-side only. */
export function translatorFor(locale: Locale): Translate {
  const translate = createTranslate(dictionaries[locale]);
  if (!extracting) return translate;
  return (text, vars) => {
    record(text);
    return translate(text, vars);
  };
}
