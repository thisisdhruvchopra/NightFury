import { formatPrice, getDiscount } from "@/lib/pricing";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

export default function PriceDisplay({
  mrp,
  price,
  size = "md",
}: Readonly<{
  mrp: number;
  price: number;
  size?: "sm" | "md" | "lg";
}>) {
  const discount = getDiscount(mrp, price);
  const sizes = {
    sm: { price: "text-[16px]", mrp: "text-[11px]", badge: "text-[9px] px-1.5 py-0.5" },
    md: { price: "text-[22px]", mrp: "text-[13px]", badge: "text-[10px] px-2 py-0.5" },
    lg: { price: "text-[28px]", mrp: "text-[14px]", badge: "text-[11px] px-2 py-1" },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <span className={`${s.price} font-extrabold text-chalk`}>
        {formatPrice(price)}
      </span>
      {discount > 0 && (
        <>
          <span
            className={`${s.mrp} text-dim line-through`}
            style={mono}
          >
            {formatPrice(mrp)}
          </span>
          <span
            className={`${s.badge} font-bold tracking-[.08em] text-accent uppercase`}
            style={{
              ...mono,
              background: "rgba(255,85,0,.12)",
              border: "1px solid rgba(255,85,0,.25)",
              borderRadius: "2px",
            }}
          >
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  );
}
