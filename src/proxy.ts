import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";

/** Picks the best supported language from the browser's Accept-Language header. */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { tag: tag.toLowerCase().split("-")[0], q: quality ? Number(quality) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (hasLocale(tag)) return tag;
  }
  return defaultLocale;
}

/** Sends any address without a language prefix to the visitor's language. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocale(pathname.split("/")[1])) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and anything that looks like a file (images, PDFs, sitemap.xml…).
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
