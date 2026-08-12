"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/products-client";

export function CartView() {
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();

  if (!items.length) {
    return (
      <div className="max-w-md">
        <p className="text-lg text-[var(--ink-muted)]">
          No systems on this session yet. Open the cabinet.
        </p>
        <Link href="/shop" className="ignite">
          Begin a session →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div
            key={product.handle}
            className="grid grid-cols-[96px_1fr] gap-4 border border-[var(--line)] bg-white/40 p-3 sm:grid-cols-[120px_1fr_auto]"
          >
            <ProductVisual
              product={product}
              className="!aspect-square"
            />
            <div className="min-w-0">
              <Link
                href={`/shop/${product.handle}`}
                className="font-display text-xl tracking-tight hover:text-[var(--ember)]"
              >
                {product.title}
              </Link>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">
                {formatMoney(product.price)}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <label className="text-xs uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                  Qty
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(product.handle, Number(e.target.value))
                    }
                    className="ml-2 w-16 border border-[var(--line)] bg-white px-2 py-1 text-sm"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeItem(product.handle)}
                  className="text-xs text-[var(--ink-faint)] hover:text-[var(--ember)]"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="hidden text-right font-semibold sm:block">
              {formatMoney(product.price * quantity)}
            </p>
          </div>
        ))}
      </div>

      <aside className="h-fit border border-[var(--line)] bg-white/50 p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-2xl tracking-tight">Order summary</h2>
        <div className="mt-6 flex justify-between text-sm">
          <span className="text-[var(--ink-muted)]">Subtotal</span>
          <span className="font-semibold">{formatMoney(subtotal)}</span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[var(--ink-faint)]">
          Checkout connects to Shopify once your store credentials are set. Until
          then, cart state is saved locally in this browser.
        </p>
        <button type="button" className="btn btn-primary mt-6 w-full" disabled>
          Checkout via Shopify
        </button>
        <button type="button" onClick={clear} className="btn btn-ghost mt-3 w-full">
          Clear cart
        </button>
        <Link
          href="/shop"
          className="mt-4 block text-center text-sm text-[var(--ember)]"
        >
          Keep shopping
        </Link>
      </aside>
    </div>
  );
}
