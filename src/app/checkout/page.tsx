"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, formatPrice, type ShippingAddress } from "@/lib/cart";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

const inputCls =
  "w-full border border-border-strong bg-carbon px-3.5 py-2.5 text-sm text-chalk placeholder-dim outline-none transition-colors focus:border-accent";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep", "Puducherry",
];

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [step, setStep] = useState<"address" | "payment">("address");
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "", phone: "", email: "",
    line1: "", line2: "", city: "", state: "", pincode: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [processing, setProcessing] = useState(false);

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-5 py-24 text-center md:px-10">
        <h1
          className="text-[36px] font-extrabold italic uppercase leading-[.92] tracking-tight"
          style={{ transform: "skewX(-4deg)" }}
        >
          Checkout
        </h1>
        <p className="mt-4 text-muted" style={mono}>Your cart is empty. Add some products first.</p>
        <Link
          href="/vision"
          className="nf-btn nf-btn-primary mt-8 inline-flex"
          style={{ padding: "14px 28px", fontSize: "15px" }}
        >
          <span>Browse Products &rarr;</span>
        </Link>
      </div>
    );
  }

  function validateAddress(): boolean {
    const e: typeof errors = {};
    if (!address.fullName.trim()) e.fullName = "Name is required";
    if (!address.phone.trim() || !/^\d{10}$/.test(address.phone.replace(/\D/g, ""))) e.phone = "Valid 10-digit phone required";
    if (!address.email.trim() || !address.email.includes("@")) e.email = "Valid email required";
    if (!address.line1.trim()) e.line1 = "Address is required";
    if (!address.city.trim()) e.city = "City is required";
    if (!address.state) e.state = "State is required";
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode)) e.pincode = "Valid 6-digit PIN required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleAddressContinue() {
    if (validateAddress()) setStep("payment");
  }

  async function handlePlaceOrder() {
    setProcessing(true);
    try {
      if (paymentMethod === "online") {
        // TODO: Razorpay integration
        // 1. Call createRazorpayOrder(cart.total * 100, `order_${Date.now()}`)
        // 2. Open Razorpay checkout modal
        // 3. On success, call verifyRazorpayPayment
        // 4. Create order in Supabase
        // 5. Create Shiprocket order
        // 6. Redirect to confirmation
        alert("Razorpay payment gateway is not yet configured. This will be connected before launch.");
      } else {
        // TODO: COD order
        // 1. Create order in Supabase with paymentMethod: "COD"
        // 2. Create Shiprocket order with paymentMethod: "COD"
        // 3. Redirect to confirmation
        alert("COD order placement is not yet configured. This will be connected before launch.");
      }

      // After real integration, this would be:
      // cart.clearCart();
      // router.push(`/order-confirmation?id=${orderId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }

  function updateField(field: keyof ShippingAddress, value: string) {
    setAddress((a) => ({ ...a, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  return (
    <>
      <div className="mx-auto max-w-[1280px] px-5 pt-8 pb-4 md:px-10">
        <nav aria-label="Breadcrumb" className="text-[11px] tracking-[.14em] text-dim uppercase" style={mono}>
          <Link href="/" className="nf-link">Home</Link>
          <span className="mx-2 text-border-strong">/</span>
          <Link href="/cart" className="nf-link">Cart</Link>
          <span className="mx-2 text-border-strong">/</span>
          <span className="text-muted">Checkout</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 pb-20 md:px-10">
        <h1
          className="text-[36px] font-extrabold italic uppercase leading-[.92] tracking-tight md:text-[48px]"
          style={{ transform: "skewX(-4deg)" }}
        >
          Checkout
        </h1>

        {/* Steps indicator */}
        <div className="mt-6 flex items-center gap-4" style={mono}>
          <button
            type="button"
            onClick={() => setStep("address")}
            className={`text-[12px] font-bold tracking-[.12em] uppercase ${step === "address" ? "text-accent" : "text-dim"}`}
          >
            1. Shipping
          </button>
          <div className="h-px w-8 bg-border-strong" />
          <span className={`text-[12px] font-bold tracking-[.12em] uppercase ${step === "payment" ? "text-accent" : "text-dim"}`}>
            2. Payment
          </span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === "address" && (
              <div className="nf-card p-6">
                <h2
                  className="text-[18px] font-bold italic uppercase tracking-tight"
                  style={{ transform: "skewX(-3deg)" }}
                >
                  Shipping Address
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <input
                      className={inputCls}
                      style={{ ...mono, borderRadius: "2px" }}
                      placeholder="Full Name *"
                      value={address.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                    />
                    {errors.fullName && <p className="mt-1 text-[11px] text-redline" style={mono}>{errors.fullName}</p>}
                  </div>
                  <div>
                    <input
                      className={inputCls}
                      style={{ ...mono, borderRadius: "2px" }}
                      placeholder="Phone Number *"
                      value={address.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                    {errors.phone && <p className="mt-1 text-[11px] text-redline" style={mono}>{errors.phone}</p>}
                  </div>
                  <div>
                    <input
                      className={inputCls}
                      style={{ ...mono, borderRadius: "2px" }}
                      placeholder="Email Address *"
                      type="email"
                      value={address.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-redline" style={mono}>{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      className={inputCls}
                      style={{ ...mono, borderRadius: "2px" }}
                      placeholder="Address Line 1 *"
                      value={address.line1}
                      onChange={(e) => updateField("line1", e.target.value)}
                    />
                    {errors.line1 && <p className="mt-1 text-[11px] text-redline" style={mono}>{errors.line1}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      className={inputCls}
                      style={{ ...mono, borderRadius: "2px" }}
                      placeholder="Address Line 2 (Landmark, etc.)"
                      value={address.line2}
                      onChange={(e) => updateField("line2", e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      className={inputCls}
                      style={{ ...mono, borderRadius: "2px" }}
                      placeholder="City *"
                      value={address.city}
                      onChange={(e) => updateField("city", e.target.value)}
                    />
                    {errors.city && <p className="mt-1 text-[11px] text-redline" style={mono}>{errors.city}</p>}
                  </div>
                  <div>
                    <select
                      className={inputCls}
                      style={{ ...mono, borderRadius: "2px" }}
                      value={address.state}
                      onChange={(e) => updateField("state", e.target.value)}
                    >
                      <option value="" className="bg-carbon">Select State *</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s} className="bg-carbon">{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className="mt-1 text-[11px] text-redline" style={mono}>{errors.state}</p>}
                  </div>
                  <div>
                    <input
                      className={inputCls}
                      style={{ ...mono, borderRadius: "2px" }}
                      placeholder="PIN Code *"
                      value={address.pincode}
                      onChange={(e) => updateField("pincode", e.target.value)}
                    />
                    {errors.pincode && <p className="mt-1 text-[11px] text-redline" style={mono}>{errors.pincode}</p>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddressContinue}
                  className="nf-btn nf-btn-primary mt-6"
                  style={{ padding: "12px 26px", fontSize: "14px" }}
                >
                  <span>Continue to Payment &rarr;</span>
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="nf-card p-6">
                <h2
                  className="text-[18px] font-bold italic uppercase tracking-tight"
                  style={{ transform: "skewX(-3deg)" }}
                >
                  Payment Method
                </h2>

                {/* Address summary */}
                <div className="mt-4 border border-border px-4 py-3 text-[12px] text-muted" style={{ ...mono, borderRadius: "3px" }}>
                  <div className="flex justify-between">
                    <span className="font-bold text-chalk">{address.fullName}</span>
                    <button
                      type="button"
                      onClick={() => setStep("address")}
                      className="text-[10px] font-bold tracking-[.1em] text-accent uppercase"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="mt-1">{address.line1}{address.line2 ? `, ${address.line2}` : ""}</p>
                  <p>{address.city}, {address.state} - {address.pincode}</p>
                  <p>{address.phone} &middot; {address.email}</p>
                </div>

                {/* Payment options */}
                <div className="mt-6 space-y-3">
                  <label
                    className="flex cursor-pointer items-center gap-4 border px-4 py-4 transition-colors"
                    style={{
                      borderColor: paymentMethod === "online" ? "var(--color-accent)" : "var(--color-border-strong)",
                      background: paymentMethod === "online" ? "rgba(255,85,0,.06)" : "transparent",
                      borderRadius: "3px",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="accent-[#FF5500]"
                    />
                    <div>
                      <div className="text-sm font-bold text-chalk">Pay Online</div>
                      <div className="text-[11px] text-dim" style={mono}>
                        UPI, Credit/Debit Card, Net Banking, Wallets via Razorpay
                      </div>
                    </div>
                  </label>

                  <label
                    className="flex cursor-pointer items-center gap-4 border px-4 py-4 transition-colors"
                    style={{
                      borderColor: paymentMethod === "cod" ? "var(--color-accent)" : "var(--color-border-strong)",
                      background: paymentMethod === "cod" ? "rgba(255,85,0,.06)" : "transparent",
                      borderRadius: "3px",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-[#FF5500]"
                    />
                    <div>
                      <div className="text-sm font-bold text-chalk">Cash on Delivery</div>
                      <div className="text-[11px] text-dim" style={mono}>
                        Pay when your order arrives (eligible locations only)
                      </div>
                    </div>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="nf-btn nf-btn-primary mt-6 disabled:opacity-50"
                  style={{ padding: "14px 28px", fontSize: "15px" }}
                >
                  <span>{processing ? "Processing..." : `Place Order - ${formatPrice(cart.total)}`}</span>
                </button>

                <p className="mt-3 text-[10px] text-dim leading-[1.6]" style={mono}>
                  By placing this order you agree to our{" "}
                  <Link href="/terms-and-conditions" className="text-accent underline underline-offset-2">Terms & Conditions</Link>{" "}
                  and{" "}
                  <Link href="/refund-return-policy" className="text-accent underline underline-offset-2">Return Policy</Link>.
                </p>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="nf-card sticky top-24 p-6">
              <h2
                className="text-[16px] font-bold italic uppercase tracking-tight"
                style={{ transform: "skewX(-3deg)" }}
              >
                Order Summary
              </h2>

              <div className="mt-4 space-y-3">
                {cart.items.map((item) => (
                  <div
                    key={`${item.productSlug}|${item.variant ?? ""}|${item.fragrance ?? ""}|${item.pack ?? ""}`}
                    className="flex justify-between text-[12px]"
                    style={mono}
                  >
                    <div className="text-muted">
                      <span className="text-chalk">{item.productName}</span>
                      {item.variant && <span className="text-dim"> ({item.variant})</span>}
                      {item.fragrance && <span className="text-dim"> ({item.fragrance})</span>}
                      {item.pack && <span className="text-dim"> ({item.pack})</span>}
                      <span className="text-dim"> x{item.quantity}</span>
                    </div>
                    <span className="text-chalk">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-border pt-4 text-[12px]" style={mono}>
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
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
                <div className="flex justify-between border-t border-border pt-2 text-[15px] font-extrabold text-chalk">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
