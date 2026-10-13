# 1heiz Wood Pellets

Marketing and enquiry website for 1heiz Wood Pellets, built with Next.js (App Router), TypeScript and Tailwind CSS.

## Commands

```bash
npm run dev     # local development
npm run lint    # ESLint
npx tsc --noEmit
npm run build   # production build
npm run start   # serve the production build
```

## Configuration

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL` – the public URL, used for canonical links, the sitemap and social metadata. Defaults to `https://1heizwoodpellets.com`.
- `ENQUIRY_WEBHOOK_URL` – server-only endpoint that receives enquiry form submissions as JSON. Until it is set, the form tells visitors their message was not sent.

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
