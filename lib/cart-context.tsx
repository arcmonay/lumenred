"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Product } from "@/lib/types";
import { getProduct } from "@/lib/products-client";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (handle: string, quantity?: number) => void;
  removeItem: (handle: string) => void;
  setQuantity: (handle: string, quantity: number) => void;
  clear: () => void;
  items: { product: Product; quantity: number }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lumenred-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const addItem = useCallback((handle: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.handle === handle);
      if (existing) {
        return prev.map((l) =>
          l.handle === handle ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { handle, quantity }];
    });
  }, []);

  const removeItem = useCallback((handle: string) => {
    setLines((prev) => prev.filter((l) => l.handle !== handle));
  }, []);

  const setQuantity = useCallback((handle: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => l.handle !== handle));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.handle === handle ? { ...l, quantity } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const product = getProduct(l.handle);
          return product ? { product, quantity: l.quantity } : null;
        })
        .filter((x): x is { product: Product; quantity: number } => Boolean(x)),
    [lines],
  );

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clear,
      items,
    }),
    [lines, count, subtotal, addItem, removeItem, setQuantity, clear, items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
