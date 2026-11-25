/* Flipkart brand marks, used to signpost the official Nightfury listings.
   Originals live in assets/brand/flipkart/; the served copies are in
   public/brand/. */

/** The yellow "f" app icon, sized to sit inside a button label. */
export function FlipkartIcon({ size = 22, className = "" }: Readonly<{ size?: number; className?: string }>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size brand icon
    <img
      src="/brand/flipkart/icon.webp"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`inline-block shrink-0 rounded-[4px] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** The full "Flipkart" wordmark with the shopping bag. */
export function FlipkartWordmark({ height = 32, className = "" }: Readonly<{ height?: number; className?: string }>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size brand mark
    <img
      src="/brand/flipkart/wordmark.webp"
      alt="Flipkart"
      width={Math.round((height * 560) / 148)}
      height={height}
      className={`inline-block ${className}`}
      style={{ height, width: "auto" }}
    />
  );
}

/** Button label with the Flipkart icon in front and the text in italics, e.g. "Buy on Flipkart". */
export function FlipkartLabel({ children, size }: Readonly<{ children: React.ReactNode; size?: number }>) {
  return (
    <span className="inline-flex items-center justify-center gap-[10px]">
      <FlipkartIcon size={size} />
      <span className="italic">{children}</span>
    </span>
  );
}
