/** Icons for the official Nightfury channels, keyed like SOCIAL_LINKS.
    Instagram, WhatsApp and email use the real brand logos from
    public/brand/<name>/logo.webp (originals in assets/brand/); the rest are
    line icons that follow the text colour. */

function BrandLogo({ name }: Readonly<{ name: "instagram" | "whatsapp" | "gmail" }>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size brand logo
    <img src={`/brand/${name}/logo.webp`} alt="" aria-hidden="true" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain" }} />
  );
}

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  website: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
  ),
  instagram: <BrandLogo name="instagram" />,
  whatsapp: <BrandLogo name="whatsapp" />,
  email: <BrandLogo name="gmail" />,
  dealer: (
    <svg {...iconProps}>
      <path d="M3 9.5L5 5h14l2 4.5" />
      <path d="M3 9.5h18V17a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <circle cx="7" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
};
