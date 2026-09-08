import type { NextConfig } from "next";

// Set SOCIALS_HOST (e.g. "links.nightfury.in") to serve the /socials page at
// that domain's root. Add the domain to the deployment, set the env var, done.
const socialsHost = process.env.SOCIALS_HOST;

const nextConfig: NextConfig = {
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
