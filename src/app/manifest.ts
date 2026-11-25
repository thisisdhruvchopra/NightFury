import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nightfury",
    short_name: "Nightfury",
    description: "Nightfury Vision LED headlights, Aroma car perfumes and Care detailing products.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#020F26",
    icons: [
      { src: "/brand/nightfury/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/nightfury/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
