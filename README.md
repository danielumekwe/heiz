# 1heiz Wood Pellets

Marketing and enquiry website for 1heiz Wood Pellets, built with Next.js (App Router), TypeScript and Tailwind CSS.

## Commands

```bash
npm run dev     # local development
npm run lint    # ESLint
npx tsc --noEmit
npm run build   # production build
npm run start   # serve the production build
npm run i18n:extract   # list text that still needs translating
```

## Configuration

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL` – the public URL, used for canonical links, the sitemap and social metadata. Defaults to `https://1heizwoodpellets.com`.
- `ENQUIRY_WEBHOOK_URL` – server-only endpoint that receives enquiry form submissions as JSON. Until it is set, the form tells visitors their message was not sent.

## Languages

The site is published in English, German, French and Spanish at `/en`, `/de`, `/fr` and `/es`. Addresses without a language prefix redirect to the visitor's browser language (English if none matches); see `src/proxy.ts`.

- English is the source language and lives in the pages, components and `src/data/`.
- Translations are in `src/i18n/dictionaries/{de,fr,es}.json`, keyed by the English text. A string with no entry falls back to English.
- In Server Components, wrap text in `<T>…</T>` or call `const t = await getT()`. Interactive (client) components receive their text already translated through props.
- Use `Link` from `@/components/LocaleLink` for internal links so visitors stay in their language.
- After changing or adding English text, run `npm run i18n:extract`. It builds the site and writes the strings each language still lacks to `.i18n/missing.<lang>.json`; add those to the dictionaries.

## Where content lives

| File | Contents |
| --- | --- |
| `src/data/site.ts` | Brand name, navigation, company and contact details (contact details from the brochure; legal name, registration and VAT ID still empty) |
| `src/data/products.ts` | Products, supply formats and specifications (unset values show "Confirmed with your quote") |
| `src/data/catalog.ts` | 15 products imported from the old WooCommerce shop (5 without photos were removed); photos in `public/images/catalog/` |
| `src/data/resources.ts` | Guide articles |
| `src/data/images.ts` | Every image with alt text, author and licence; drives `/image-credits` |

The logo is rendered by `src/components/Wordmark.tsx` from `public/images/brand/1heiz-wood-pellets-logo.webp`, a trimmed copy of the supplied `public/1heiz Wood Pellets Eco Logo.png`. The browser icon (`src/app/icon.png`) is cropped from the same file.

## Images

Photographs are openly licensed or public domain; several require attribution, which the `/image-credits` page provides. Keep that page linked if those images stay in use. The 1heiz bag images in `public/images/brand/` are packaging concepts, not approved artwork.
