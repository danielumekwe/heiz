// Merges translated batches from .i18n/tr/<lang>-<batch>.json into the
// dictionaries. Each batch file maps a string's index in .i18n/all.json to
// its translation, which keeps long English keys out of the batch files.
//
//   node scripts/i18n-merge.mjs
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const all = JSON.parse(readFileSync(".i18n/all.json", "utf8"));
const batches = JSON.parse(readFileSync(".i18n/tr/batches.json", "utf8"));
const placeholders = (text) => (text.match(/\{\w+\}|<\/?\w+\/?>/g) ?? []).sort().join(" ");
let problems = 0;

for (const lang of ["de", "fr", "es", "nl"]) {
  const path = `src/i18n/dictionaries/${lang}.json`;
  const dictionary = JSON.parse(readFileSync(path, "utf8"));
  let merged = 0;

  batches.forEach((indices, batch) => {
    const file = `.i18n/tr/${lang}-${String(batch).padStart(2, "0")}.json`;
    if (!existsSync(file)) return;
    const translations = JSON.parse(readFileSync(file, "utf8"));
    for (const index of indices) {
      const translated = translations[index];
      // "=" marks a string that needs no translation (already built from translated parts).
      if (translated === "=") continue;
      if (typeof translated !== "string" || !translated.trim()) {
        console.log(`${file}: missing index ${index}: ${all[index].slice(0, 60)}`);
        problems++;
        continue;
      }
      if (placeholders(all[index]) !== placeholders(translated)) {
        console.log(`${file}: placeholder mismatch at ${index}: ${all[index].slice(0, 60)}`);
        problems++;
      }
      dictionary[all[index]] = translated;
      merged++;
    }
    for (const key of Object.keys(translations)) {
      if (!indices.includes(Number(key))) {
        console.log(`${file}: unexpected index ${key}`);
        problems++;
      }
    }
  });

  const sorted = Object.fromEntries(Object.entries(dictionary).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(path, `${JSON.stringify(sorted, null, 2)}\n`);
  const missing = all.filter((text) => !(text in sorted)).length;
  console.log(`${lang}: merged ${merged}, ${Object.keys(sorted).length} entries, ${missing} still missing`);
}

process.exitCode = problems ? 1 : 0;
