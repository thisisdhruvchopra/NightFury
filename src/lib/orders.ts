import type { CartItem, ShippingAddress, OrderSummary } from "./cart";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refund_initiated"
  | "refunded";

export type Order = {
  id: string;
  items: CartItem[];
  address: ShippingAddress;
  summary: OrderSummary;
  status: OrderStatus;
  paymentId?: string;
  paymentMethod?: string;
  shiprocketOrderId?: string;
  shiprocketShipmentId?: string;
  trackingNumber?: string;
  courierName?: string;
  createdAt: string;
  updatedAt: string;
};

// ---------------------------------------------------------------------------
// Razorpay integration stub
// Replace with real Razorpay SDK calls when key is ready.
// ---------------------------------------------------------------------------

export type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
};

export async function createRazorpayOrder(
  _amountInPaise: number,
  _receipt: string
): Promise<RazorpayOrderResponse> {
  // TODO: POST to /api/razorpay/create-order
  // const res = await fetch("/api/razorpay/create-order", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ amount: amountInPaise, receipt }),
  // });
  // return res.json();
  throw new Error("Razorpay integration not yet configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.");
}

export async function verifyRazorpayPayment(
  _paymentId: string,
  _orderId: string,
  _signature: string
): Promise<boolean> {
  // TODO: POST to /api/razorpay/verify
  // const res = await fetch("/api/razorpay/verify", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ paymentId, orderId, signature }),
  // });
  // return (await res.json()).verified;
  throw new Error("Razorpay verification not yet configured.");
}

// ---------------------------------------------------------------------------
// Shiprocket integration stub
// Replace with real Shiprocket API calls when token is ready.
// ---------------------------------------------------------------------------

export type ShiprocketOrderPayload = {
  orderId: string;
  orderDate: string;
  billingAddress: ShippingAddress;
  shippingAddress: ShippingAddress;
  items: {
    name: string;
    sku: string;
    units: number;
    sellingPrice: number;
  }[];
  subTotal: number;
  paymentMethod: "Prepaid" | "COD";
  shippingCharges: number;
};

export async function createShiprocketOrder(
  _payload: ShiprocketOrderPayload
): Promise<{ shiprocketOrderId: string; shipmentId: string }> {
  // TODO: POST to /api/shiprocket/create-order
  // const res = await fetch("/api/shiprocket/create-order", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // return res.json();
  throw new Error("Shiprocket integration not yet configured. Set SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD.");
}

export async function getShiprocketTracking(
  _shipmentId: string
): Promise<{ status: string; trackingUrl: string }> {
  // TODO: GET /api/shiprocket/track/:shipmentId
  throw new Error("Shiprocket tracking not yet configured.");
}

// ---------------------------------------------------------------------------
// Order persistence stub
// Replace with Supabase insert when table is created.
// ---------------------------------------------------------------------------

export async function saveOrder(_order: Order): Promise<void> {
  // TODO: Insert into supabase "orders" table
  // const { error } = await supabase.from("orders").insert(order);
  // if (error) throw new Error(error.message);
  console.log("Order save stub - implement with Supabase");
}

export async function getOrder(_orderId: string): Promise<Order | null> {
  // TODO: Fetch from supabase "orders" table
  // const { data } = await supabase.from("orders").select("*").eq("id", orderId).single();
  // return data;
  return null;
}
