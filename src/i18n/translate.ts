import type { ReactNode } from "react";
import { Fragment, createElement } from "react";

export type Dictionary = Record<string, string>;
export type Vars = Record<string, string | number>;

/** Translates a source string. Falls back to the English source when missing. */
export type Translate = (text: string, vars?: Vars) => string;

export function interpolate(text: string, vars?: Vars) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function createTranslate(
  dictionary: Dictionary,
  onMiss?: (text: string) => void,
): Translate {
  return (text, vars) => {
    const translated = dictionary[text];
    if (translated === undefined) onMiss?.(text);
    return interpolate(translated ?? text, vars);
  };
}

/**
 * Renders a translated string containing simple tags, so that word order can
 * differ between languages:
 *
 *   rich(translated, {   // "Read the <link>privacy policy</link>."
 *     link: (text) => <a href="/privacy-policy">{text}</a>,
 *   })
 */
export function rich(
  text: string,
  tags: Record<string, (content: string) => ReactNode>,
): ReactNode {
  const parts: ReactNode[] = [];
  const pattern = /<(\w+)>(.*?)<\/\1>|<(\w+)\/>/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const name = match[1] ?? match[3];
    const render = tags[name];
    parts.push(
      createElement(Fragment, { key: key++ }, render ? render(match[2] ?? "") : match[0]),
    );
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
