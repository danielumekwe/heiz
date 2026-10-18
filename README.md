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
- `ZEPTOMAIL_TOKEN`, `ENQUIRY_FROM` – server-only ZeptoMail settings (the Mail Agent's Send Mail token, and a sender on a domain verified in ZeptoMail). The enquiry form emails each submission to `ENQUIRY_TO` (default `info@1heizwoodpellets.com`) with the customer as Reply-To, and sends the customer a confirmation in the page language. Until both are set, the form tells visitors their message was not sent. If the ZeptoMail dashboard shows a host other than `cpaas.zoho.com`, also set `ZEPTOMAIL_API_URL` (`https://<host>/v1.1/email`).
- `ENQUIRY_WEBHOOK_URL` – optional server-only endpoint that also receives each enquiry as JSON.

## Deploying to Cloudflare

The site runs on Cloudflare Workers through the OpenNext adapter (`wrangler.jsonc`, `open-next.config.ts`).

```bash
npm run cf:preview   # build and run in the Cloudflare runtime locally (http://localhost:8787)
npm run cf:deploy    # build and deploy from this computer (asks you to log in to Cloudflare)
```

To deploy from GitHub instead, create a Worker in the Cloudflare dashboard, connect this repository, and set:

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx wrangler deploy`

Then add the mail settings under the Worker's Settings → Variables and Secrets: `ENQUIRY_FROM` and `ENQUIRY_TO` (and `ZEPTOMAIL_API_URL` if needed) as variables and `ZEPTOMAIL_TOKEN` as a secret. For the local preview, put the same names in `.dev.vars`.

Notes:

- `cacheComponents` is off in `next.config.ts` because it hangs in the Workers runtime.
- `scripts/patch-opennext.mjs` runs after `npm install` and fixes an adapter incompatibility with Next.js 16.4. Remove it once the adapter supports `preview-props.json`.
- Images are served at their stored size on Cloudflare unless Cloudflare Images is enabled; the files in `public/images` are already web-sized.

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
