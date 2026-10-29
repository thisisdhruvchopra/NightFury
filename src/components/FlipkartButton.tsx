import Link from "next/link";
import { SkewButton } from "./ui";

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
        {buyLabel} &#8594;
      </SkewButton>
    ) : (
      <SkewButton href={notifyHref} ariaLabel={`${name} is coming to Flipkart soon. Get notified`}>
        Coming to Flipkart soon
      </SkewButton>
    );
  }

  const base =
    "block text-center font-display font-extrabold italic uppercase no-underline";
  if (look === "block") {
    const cls = `${base} bg-navy px-5 py-[15px] text-[19px] tracking-[0.04em] text-chalk shadow-[5px_5px_0_#FF5500] hover:text-chalk`;
    return url ? (
      <a href={url} target="_blank" rel="noopener" className={cls} aria-label={`${buyLabel}: ${name} (opens in a new tab)`}>
        {buyLabel} &#8594;
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
      className={`${base} bg-navy px-3 py-[11px] text-[16px] text-chalk hover:text-chalk`}
      aria-label={`Buy ${name} on Flipkart (opens in a new tab)`}
    >
      Buy on Flipkart &#8594;
    </a>
  ) : (
    <Link
      href={notifyHref}
      className={`${base} border-2 border-navy bg-white px-3 py-[9px] text-[16px] text-carbon`}
      aria-label={`${name} is coming to Flipkart soon. Get notified`}
    >
      Coming to Flipkart soon
    </Link>
  );
}
