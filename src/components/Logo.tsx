/**
 * NightFury lockup rendered as live HTML text (HANDOFF section 4, Logo).
 * The supplied SVG uses <text> and falls back to a system font, so the site
 * draws the wordmark itself with Saira Condensed.
 */
export default function Logo({
  variant = "header",
}: Readonly<{ variant?: "header" | "footer" }>) {
  const footer = variant === "footer";
  return (
    <span className="inline-flex flex-col items-center leading-none">
      <span
        className="font-display italic"
        style={{
          fontWeight: 800,
          fontSize: footer ? 44 : 34,
          letterSpacing: "-0.01em",
          lineHeight: 0.95,
          transform: "skewX(-4deg)",
        }}
      >
        <span style={{ color: footer ? "#F4F5F7" : "#0A0A0B" }}>NIGHT</span>
        <span style={{ color: "#FF5500" }}>FURY</span>
      </span>
      <span
        className="font-mono"
        style={{
          marginTop: footer ? 8 : 4,
          fontWeight: 600,
          fontSize: footer ? 9 : 8,
          letterSpacing: "0.42em",
          marginRight: "-0.42em",
          color: footer ? "rgba(244,245,247,0.82)" : "#3A3D46",
        }}
      >
        DRIVE THE DIFFERENCE
      </span>
    </span>
  );
}
