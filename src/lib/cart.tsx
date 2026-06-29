"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductPrice, calculateShipping, formatPrice } from "./pricing";

export type CartItem = {
  productSlug: string;
  productName: string;
  variant?: string;
  fragrance?: string;
  pack?: string;
  quantity: number;
  mrp: number;
  price: number;
};

export type ShippingAddress = {
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

export type OrderSummary = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  totalMrp: number;
  discount: number;
  shipping: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity" | "mrp" | "price"> & { quantity?: number }) => void;
  removeItem: (productSlug: string, variant?: string, fragrance?: string, pack?: string) => void;
  updateQuantity: (productSlug: string, quantity: number, variant?: string, fragrance?: string, pack?: string) => void;
  clearCart: () => void;
  getOrderSummary: () => OrderSummary;
};

const CartContext = createContext<CartContextType | null>(null);

function itemKey(item: { productSlug: string; variant?: string; fragrance?: string; pack?: string }) {
  return `${item.productSlug}|${item.variant ?? ""}|${item.fragrance ?? ""}|${item.pack ?? ""}`;
}

const STORAGE_KEY = "nightfury_cart";

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const addItem = useCallback(
    (input: Omit<CartItem, "quantity" | "mrp" | "price"> & { quantity?: number }) => {
      const priceVariant = input.variant ?? input.pack ?? undefined;
      const { mrp, price } = getProductPrice(input.productSlug, priceVariant);
      const qty = input.quantity ?? 1;

      setItems((prev) => {
        const key = itemKey(input);
        const idx = prev.findIndex((i) => itemKey(i) === key);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + qty, mrp, price };
          return updated;
        }
        return [...prev, { ...input, quantity: qty, mrp, price }];
      });
    },
    []
  );

  const removeItem = useCallback(
    (productSlug: string, variant?: string, fragrance?: string, pack?: string) => {
      const key = itemKey({ productSlug, variant, fragrance, pack });
      setItems((prev) => prev.filter((i) => itemKey(i) !== key));
    },
    []
  );

  const updateQuantity = useCallback(
    (productSlug: string, quantity: number, variant?: string, fragrance?: string, pack?: string) => {
      if (quantity <= 0) {
        removeItem(productSlug, variant, fragrance, pack);
        return;
      }
      const key = itemKey({ productSlug, variant, fragrance, pack });
      setItems((prev) =>
        prev.map((i) => (itemKey(i) === key ? { ...i, quantity } : i))
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);
  const totalMrp = useMemo(() => items.reduce((s, i) => s + i.mrp * i.quantity, 0), [items]);
  const discount = totalMrp - subtotal;
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  const itemCount = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);

  const getOrderSummary = useCallback(
    (): OrderSummary => ({ items, subtotal, shipping, discount, total }),
    [items, subtotal, shipping, discount, total]
  );

  const value = useMemo(
    () => ({
      items, itemCount, subtotal, totalMrp, discount, shipping, total,
      addItem, removeItem, updateQuantity, clearCart, getOrderSummary,
    }),
    [items, itemCount, subtotal, totalMrp, discount, shipping, total, addItem, removeItem, updateQuantity, clearCart, getOrderSummary]
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { formatPrice };
