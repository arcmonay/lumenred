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
        <p className="page-lede">Bay is empty. Load a panel, mask, or wrap.</p>
        <Link href="/shop" className="act act-ember mt-6 inline-flex">
          Open catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-3">
        {items.map(({ product, quantity }) => (
          <div
            key={product.handle}
            className="grid grid-cols-[88px_1fr] gap-4 border border-[var(--line)] bg-[var(--steel)] p-3 sm:grid-cols-[110px_1fr_auto]"
          >
            <ProductVisual product={product} className="!aspect-square" />
            <div className="min-w-0">
              <Link
                href={`/shop/${product.handle}`}
                className="font-display text-base uppercase tracking-tight hover:text-[var(--ember)]"
              >
                {product.title}
              </Link>
              <p className="mt-1 text-sm text-[var(--ash-dim)]">
                {formatMoney(product.price)}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <label className="text-[0.62rem] uppercase tracking-[0.14em] text-[var(--ash-faint)]">
                  Qty
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(product.handle, Number(e.target.value))
                    }
                    className="ml-2 w-16 border border-[var(--line)] bg-[var(--void)] px-2 py-1 text-sm text-[var(--ash)]"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeItem(product.handle)}
                  className="text-xs uppercase tracking-[0.12em] text-[var(--ash-faint)] hover:text-[var(--ember)]"
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

      <aside
        className="h-fit border border-[var(--line)] bg-[var(--steel)] p-6 lg:sticky lg:top-6"
        style={{ borderTopColor: "var(--line-hot)" }}
      >
        <h2 className="font-display text-xl uppercase tracking-tight">
          Bay summary
        </h2>
        <div className="mt-6 flex justify-between text-sm">
          <span className="text-[var(--ash-dim)]">Subtotal</span>
          <span className="font-semibold">{formatMoney(subtotal)}</span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[var(--ash-faint)]">
          Checkout connects to Shopify once Storefront credentials are set. Until
          then, bay state is saved locally.
        </p>
        <button type="button" className="act act-ember mt-6 w-full" disabled>
          Checkout via Shopify
        </button>
        <button type="button" onClick={clear} className="act act-ghost mt-3 w-full">
          Clear bay
        </button>
        <Link
          href="/shop"
          className="mt-4 block text-center text-sm uppercase tracking-[0.12em] text-[var(--ember)]"
        >
          Keep browsing
        </Link>
      </aside>
    </div>
  );
}
