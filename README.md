# NightFury - Brand and dealer website

nightfury.co.in. Next.js (App Router) + Tailwind CSS v4, deployed on Vercel.
There are no prices and no cart: retail goes to Flipkart, and the main
conversion is a dealer enquiry.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, sense tiles, Aroma scroll stages, Vision, Care, where to buy, dealer band |
| `/aroma` | 360 viewer, Core / Air / Essence with scent cards, comparison table |
| `/vision` | 4W LED with output and colour-mode selectors, 2W LED notify |
| `/care` | Microfiber and wet wipes (coming soon), notify form |
| `/dealers` | Dealer enquiry form (`?line=aroma&product=aroma-core` pre-fills it) |
| `/where-to-buy` | Every Flipkart listing, find-a-dealer form, notify form |
| `/about`, `/contact-us` | Company and support details |
| Legal (5) | Terms, Privacy, Shipping, Refund, Warranty |
| `/socials` | Link page with its own dark styling (optionally on `SOCIALS_HOST`) |

`/cart`, `/checkout`, `/order-confirmation` and `/aroma/{core,air,essence}`
are permanent redirects (`next.config.ts`).

## Where things live

- `src/data/products.ts`: every product, scent, colour, spec and Flipkart URL.
  Adding a Flipkart listing is a change to this file only.
- `src/app/globals.css`: design tokens (navy, fury orange, chalk) and shared classes.
- `src/components/`: Header, Footer, Marquee, ScrollStage, Viewer360, forms and so on.
- `src/app/api/leads/route.ts`: form intake. See `TODO.md` for destinations.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Open items and placeholders are listed in `TODO.md`.
