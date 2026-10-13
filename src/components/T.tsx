import { getT } from "@/i18n/server";

/**
 * Translates its text content into the current language:
 *
 *   <p><T>Loose pellets for stores and silos.</T></p>
 *
 * Server Components only. For attributes and interpolated text use getT().
 */
export async function T({ children }: { children: string }) {
  const t = await getT();
  return t(children);
}
