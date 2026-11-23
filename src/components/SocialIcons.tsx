/** Line icons for the official NightFury channels, keyed like SOCIAL_LINKS. */
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
  instagram: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  whatsapp: (
    <svg {...iconProps}>
      <path d="M3.5 20.5l1.3-4.2A8 8 0 1 1 8 19.4l-4.5 1.1z" />
      <path d="M9 9.2c.2 1 .8 2.1 1.6 2.9.8.8 1.9 1.4 2.9 1.6l.9-1.1 1.8.9c-.2 1-1.2 1.6-2.2 1.4a8 8 0 0 1-6.1-6.1c-.2-1 .4-2 1.4-2.2l.9 1.8-1.2.8z" />
    </svg>
  ),
  email: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  ),
  dealer: (
    <svg {...iconProps}>
      <path d="M3 9.5L5 5h14l2 4.5" />
      <path d="M3 9.5h18V17a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <circle cx="7" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
};
