import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

/** The browser's most preferred language that the site is published in, if any. */
function browserLocale(request: NextRequest): Locale | null {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { tag: tag.toLowerCase().split("-")[0], q: quality ? Number(quality) : 1 };
    })
    .filter(({ q }) => q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (hasLocale(tag)) return tag;
  }
  return null;
}

function withLocale(request: NextRequest, locale: Locale, rest: string) {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${rest === "/" ? "" : rest}`;
  return url;
}

function remember(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
  });
  return response;
}

/**
 * Shows each visitor the site in their language:
 *
 * - An address without a language prefix goes to the language the visitor
 *   last used on the site, otherwise their browser language, otherwise English.
 * - On a visitor's first page, a link in another language (for example a
 *   shared /en/ link opened in a German browser) switches to the browser
 *   language when the site is published in it.
 *
 * The language in use is remembered in a cookie, which the language menu also
 * sets, so after the first page the site never overrides the visitor's choice.
 * Browsers that send no matching language (such as search engine crawlers)
 * are never redirected away from a language-prefixed address.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const remembered = hasLocale(cookie) ? cookie : null;

  if (!hasLocale(first)) {
    return NextResponse.redirect(
      withLocale(request, remembered ?? browserLocale(request) ?? defaultLocale, pathname),
    );
  }

  // Only full page loads on a first visit; never form posts or in-app navigation
  // (browsers mark those requests with a Sec-Fetch-Dest other than "document").
  const destination = request.headers.get("sec-fetch-dest");
  const isPageLoad =
    (request.method === "GET" || request.method === "HEAD") &&
    (!destination || destination === "document");
  if (remembered || !isPageLoad) return;

  const preferred = browserLocale(request);
  if (preferred && preferred !== first) {
    const rest = pathname.slice(first.length + 1) || "/";
    return remember(NextResponse.redirect(withLocale(request, preferred, rest)), preferred);
  }
  return remember(NextResponse.next(), first);
}

export const config = {
  // Skip Next.js internals and anything that looks like a file (images, PDFs, sitemap.xml…).
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
