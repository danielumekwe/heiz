// Lists every source string that has no translation yet.
//
//   npm run i18n:extract
//
// 1. Builds the site with I18N_EXTRACT=1 so each string passed to t() during
//    prerendering is logged to .i18n/strings.ndjson.
// 2. Adds string literals passed to t("…") in the source, which covers text
//    only used at request time (for example form error messages).
// 3. Writes .i18n/missing.<lang>.json: the strings each language still lacks.
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LANGS = ["de", "fr", "es"];
mkdirSync(".i18n", { recursive: true });
if (existsSync(".i18n/strings.ndjson")) rmSync(".i18n/strings.ndjson");

if (!process.argv.includes("--no-build")) {
  execSync("npx next build", { stdio: "inherit", env: { ...process.env, I18N_EXTRACT: "1" } });
}

const strings = new Set();
if (existsSync(".i18n/strings.ndjson")) {
  for (const line of readFileSync(".i18n/strings.ndjson", "utf8").split("\n")) {
    if (line) strings.add(JSON.parse(line));
  }
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

for (const file of walk("src").filter((path) => /\.tsx?$/.test(path))) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/\bt\(\s*"((?:[^"\\]|\\.)*)"/g)) {
    strings.add(JSON.parse(`"${match[1]}"`));
  }
}

const all = [...strings].filter((text) => text.trim()).sort();
writeFileSync(".i18n/all.json", JSON.stringify(all, null, 1));
console.log(`${all.length} source strings`);

for (const lang of LANGS) {
  const dictionary = JSON.parse(readFileSync(`src/i18n/dictionaries/${lang}.json`, "utf8"));
  const missing = all.filter((text) => !(text in dictionary));
  const unused = Object.keys(dictionary).filter((text) => !strings.has(text));
  writeFileSync(`.i18n/missing.${lang}.json`, JSON.stringify(missing, null, 1));
  console.log(`${lang}: ${missing.length} missing, ${unused.length} no longer used`);
}
