# NightFury site: open items

## Lead form destinations (decide later)

The dealer, notify and find-a-dealer forms all post to `/api/leads`
(`src/app/api/leads/route.ts`). The route validates the data on the server,
rate-limits each IP, and then:

- [ ] **Pick where leads go.** Until this is done, leads are only written to
      the server log (Vercel > Project > Logs, search `[leads]`).
- [ ] Google Sheet: create an Apps Script web app that appends the posted
      JSON as a row, then set `GOOGLE_SHEETS_WEBHOOK_URL` in Vercel. This
      already works once the variable is set; no code change needed.
- [ ] Email: choose a sender (for example Resend, SES or Gmail SMTP), add it,
      and set `LEADS_EMAIL_TO`. The route has a `TODO(leads)` marker where
      sending goes. This needs a new dependency or service, so it needs
      approval first.
- [ ] Optional: replace the in-memory rate limiter with a shared store if
      spam becomes a problem (each serverless instance keeps its own count).

## Content placeholders still visible on the site

- [ ] Aroma Air (Azure, Bonfire, Impulsive): character line and top / heart /
      base notes, now `[Character line]` / `[To be confirmed]` in
      `src/data/products.ts`.
- [ ] Aroma Essence (Blue Ocean, Romance, Fresh Jasmine): same as above.
- [ ] Product photography: 4W LED (beam on, and pack shot), 2W LED,
      microfiber cloth, wet wipes. These are the striped `[Product photo: ...]`
      slots.
- [ ] 360 turntable frames for each scent: 36 images at
      `public/aroma/360/{product}/{scent}/01.webp` to `36.webp`, about 1200px.
      After uploading, add `spin360: { frames: 36, basePath: "/aroma/360/core/citrus-zest" }`
      to that scent in `src/data/products.ts`.
- [ ] 4W LED bulb fitments (H4 / H7 / H11 and so on), now
      `[Confirm bulb types ...]` on /vision.
- [ ] Microfiber pack sizes: the selector offers 1 / 2 / 3, marked
      `[Pack sizes to be confirmed]`.

## Flipkart listings

- [ ] Aroma Air, Aroma Essence and 4W LED (240W, 300W) go live on Flipkart:
      paste each URL into `flipkartUrl` in `src/data/products.ts`. The buttons
      switch from "Coming to Flipkart soon" to "Buy on Flipkart" by
      themselves.

## Owner confirmations

- [ ] Trademark registration status (no ® is shown anywhere until confirmed).
- [ ] Outlined logo SVG (text converted to paths) for favicon, OG image and
      use outside the site. The header and footer draw the logo as HTML text.
- [ ] Brightness claim ("250%") stays off until there is a footnote giving
      the test basis.
- [ ] Legal review: Shipping and Refund policies still describe delivery and
      refunds for direct orders. Website ordering is gone, so a lawyer should
      confirm what these pages need to say now.
- [ ] Vision warranty band: the design's "Register warranty" button has no
      registration flow behind it, so it currently links to the Warranty
      Policy.
- [ ] DNS: confirm `www.nightfury.co.in` is the primary domain on Vercel. The
      canonical tags, og:url and the sitemap all point there.
