import type { NextConfig } from "next";

// Set SOCIALS_HOST (e.g. "links.nightfury.in") to serve the /socials page at
// that domain's root. Add the domain to the deployment, set the env var, done.
const socialsHost = process.env.SOCIALS_HOST;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // No website orders: the cart and checkout flow is gone.
      { source: "/cart", destination: "/", permanent: true },
      { source: "/checkout", destination: "/", permanent: true },
      { source: "/order-confirmation", destination: "/", permanent: true },
      // Aroma formats now live as sections of /aroma.
      { source: "/aroma/core", destination: "/aroma#core", permanent: true },
      { source: "/aroma/air", destination: "/aroma#air", permanent: true },
      { source: "/aroma/essence", destination: "/aroma#essence", permanent: true },
    ];
  },
  async rewrites() {
    if (!socialsHost) return [];
    return {
      // beforeFiles so this wins over the app's own home page for that host.
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: socialsHost }],
          destination: "/socials",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
