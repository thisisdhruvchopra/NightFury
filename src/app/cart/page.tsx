"use client";

import Link from "next/link";
import { useCart, formatPrice } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";
import PriceDisplay from "@/components/PriceDisplay";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

export default function CartPage() {
  const cart = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-5 py-24 text-center md:px-10">
        <h1
          className="text-[36px] font-extrabold italic uppercase leading-[.92] tracking-tight md:text-[48px]"
          style={{ transform: "skewX(-4deg)" }}
        >
          Your Cart
        </h1>
        <p className="mt-4 text-muted" style={mono}>Your cart is empty.</p>
        <Link
          href="/vision"
          className="nf-btn nf-btn-primary mt-8 inline-flex"
          style={{ padding: "14px 28px", fontSize: "15px" }}
        >
          <span>Start Shopping &rarr;</span>
        </Link>
      </div>
    );
  }

  const freeShippingGap = FREE_SHIPPING_THRESHOLD - cart.subtotal;

  return (
    <>
      <div className="mx-auto max-w-[1280px] px-5 pt-8 pb-4 md:px-10">
        <nav
          aria-label="Breadcrumb"
          className="text-[11px] tracking-[.14em] text-dim uppercase"
          style={mono}
        >
          <Link href="/" className="nf-link">Home</Link>
          <span className="mx-2 text-border-strong">/</span>
          <span className="text-muted">Cart</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 pb-20 md:px-10">
        <h1
          className="text-[36px] font-extrabold italic uppercase leading-[.92] tracking-tight md:text-[48px]"
          style={{ transform: "skewX(-4deg)" }}
        >
          Your Cart
        </h1>
        <p className="mt-2 text-[11px] text-dim" style={mono}>
          {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
        </p>

        {freeShippingGap > 0 && (
          <div
            className="mt-4 border border-border-strong px-4 py-3 text-[12px] text-muted"
            style={{ ...mono, borderRadius: "3px", background: "var(--color-raised)" }}
          >
            Add <span className="font-bold text-accent">{formatPrice(freeShippingGap)}</span> more for free shipping!
          </div>
        )}

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.items.map((item) => {
              const key = `${item.productSlug}|${item.variant ?? ""}|${item.fragrance ?? ""}|${item.pack ?? ""}`;
              return (
                <div key={key} className="nf-card flex gap-5 p-5">
                  <div className="flex-1">
                    <div className="text-[17px] font-bold italic uppercase text-chalk" style={{ transform: "skewX(-3deg)" }}>
                      {item.productName}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-dim" style={mono}>
                      {item.variant && <span>Output: <span className="text-muted">{item.variant}</span></span>}
                      {item.fragrance && <span>Fragrance: <span className="text-muted">{item.fragrance}</span></span>}
                      {item.pack && <span>Size: <span className="text-muted">{item.pack}</span></span>}
                    </div>

                    <div className="mt-3">
                      <PriceDisplay mrp={item.mrp} price={item.price} size="sm" />
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center border border-border-strong" style={{ borderRadius: "2px" }}>
                        <button
                          type="button"
                          onClick={() => cart.updateQuantity(item.productSlug, item.quantity - 1, item.variant, item.fragrance, item.pack)}
                          className="px-3 py-1.5 text-sm text-chalk transition-colors hover:bg-accent hover:text-carbon"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-[32px] text-center text-sm font-bold text-chalk" style={mono}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => cart.updateQuantity(item.productSlug, item.quantity + 1, item.variant, item.fragrance, item.pack)}
                          className="px-3 py-1.5 text-sm text-chalk transition-colors hover:bg-accent hover:text-carbon"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.removeItem(item.productSlug, item.variant, item.fragrance, item.pack)}
                        className="text-[11px] font-bold tracking-[.1em] text-redline uppercase transition-colors hover:text-chalk"
                        style={mono}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[18px] font-extrabold text-chalk">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={cart.clearCart}
              className="text-[11px] font-bold tracking-[.1em] text-dim uppercase transition-colors hover:text-redline"
              style={mono}
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div>
            <div className="nf-card sticky top-24 p-6">
              <h2
                className="text-[18px] font-bold italic uppercase tracking-tight"
                style={{ transform: "skewX(-3deg)" }}
              >
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-[13px]" style={mono}>
                <div className="flex justify-between text-muted">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span className="text-chalk">{formatPrice(cart.subtotal)}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>Discount</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span className={cart.shipping === 0 ? "text-accent" : "text-chalk"}>
                    {cart.shipping === 0 ? "FREE" : formatPrice(cart.shipping)}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-[16px] font-extrabold text-chalk">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>

              {cart.totalMrp > cart.subtotal && (
                <div
                  className="mt-4 px-3 py-2 text-center text-[11px] font-bold tracking-[.08em] text-accent"
                  style={{ ...mono, background: "rgba(255,85,0,.08)", borderRadius: "2px" }}
                >
                  You save {formatPrice(cart.discount)} on this order!
                </div>
              )}

              <Link
                href="/checkout"
                className="nf-btn nf-btn-primary mt-5 w-full justify-center"
                style={{ padding: "14px 24px", fontSize: "15px" }}
              >
                <span>Proceed to Checkout &rarr;</span>
              </Link>

              <Link
                href="/vision"
                className="mt-3 block text-center text-[11px] tracking-[.1em] text-dim uppercase transition-colors hover:text-accent"
                style={mono}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
