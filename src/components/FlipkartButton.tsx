import Link from "next/link";
import { SkewButton } from "./ui";
import { FlipkartLabel } from "./FlipkartMark";

/**
 * The one place the retail rule lives: a URL means "Buy on Flipkart" (new
 * tab), no URL means "Coming to Flipkart soon" pointing at the notify form.
 */
export default function FlipkartButton({
  url,
  notifyHref,
  name,
  look = "skew",
  buyLabel = "Buy on Flipkart",
}: Readonly<{
  url?: string;
  notifyHref: string;
  name: string;
  look?: "skew" | "block" | "card";
  buyLabel?: string;
}>) {
  if (look === "skew") {
    return url ? (
      <SkewButton href={url} external ariaLabel={`${buyLabel}: ${name} (opens in a new tab)`}>
        <FlipkartLabel>{buyLabel} &#8594;</FlipkartLabel>
      </SkewButton>
    ) : (
      <SkewButton href={notifyHref} ariaLabel={`${name} is coming to Flipkart soon. Get notified`}>
        Coming to Flipkart soon
      </SkewButton>
    );
  }

  const base =
    "block text-center font-display font-bold uppercase no-underline";
  if (look === "block") {
    const cls = `${base} bg-navy px-5 py-[15px] text-[19px] tracking-[0.04em] text-chalk hover:text-chalk`;
    return url ? (
      <a href={url} target="_blank" rel="noopener" className={cls} aria-label={`${buyLabel}: ${name} (opens in a new tab)`}>
        <FlipkartLabel>{buyLabel} &#8594;</FlipkartLabel>
      </a>
    ) : (
      <Link href={notifyHref} className={cls}>Coming to Flipkart soon</Link>
    );
  }

  // Compact card button (scent cards).
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className={`${base} whitespace-nowrap rounded-[2px] bg-navy px-3 py-[11px] text-[15px] text-chalk hover:bg-[#0B2047] hover:text-chalk`}
      aria-label={`Buy ${name} on Flipkart (opens in a new tab)`}
    >
      <FlipkartLabel size={20}>Buy on Flipkart</FlipkartLabel>
    </a>
  ) : (
    <Link
      href={notifyHref}
      className={`${base} rounded-[2px] border border-navy/20 bg-chalk px-3 py-[10px] text-[14px] text-navy hover:border-navy hover:text-navy`}
      aria-label={`${name} is coming to Flipkart soon. Get notified`}
    >
      Coming to Flipkart soon
    </Link>
  );
}
