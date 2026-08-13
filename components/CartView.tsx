"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/products-client";

export function CartView() {
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();

  if (!items.length) {
    return (
      <div>
        <p className="page-lede">Your cart is empty.</p>
        <Link href="/shop" className="btn btn-primary" style={{ marginTop: "1.25rem" }}>
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div style={{ display: "grid", gap: "0.85rem" }}>
        {items.map(({ product, quantity }) => (
          <div key={product.handle} className="cart-line">
            <ProductVisual product={product} />
            <div>
              <Link href={`/shop/${product.handle}`}>
                <strong style={{ fontWeight: 500 }}>{product.title}</strong>
              </Link>
              <p style={{ margin: "0.35rem 0 0", color: "var(--muted)" }}>
                {formatMoney(product.price)}
              </p>
              <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
                  Qty
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(product.handle, Number(e.target.value))
                    }
                    style={{
                      marginLeft: "0.5rem",
                      width: "3.5rem",
                      border: "1px solid var(--line)",
                      borderRadius: 4,
                      padding: "0.35rem 0.4rem",
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeItem(product.handle)}
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--muted)",
                    background: "none",
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
            <p style={{ fontWeight: 600, textAlign: "right" }} className="hidden sm:block">
              {formatMoney(product.price * quantity)}
            </p>
          </div>
        ))}
      </div>

      <aside className="cart-summary">
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 500 }}>Order summary</h2>
        <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--muted)" }}>Subtotal</span>
          <strong>{formatMoney(subtotal)}</strong>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.45 }}>
          Checkout connects to Shopify once Storefront credentials are set.
        </p>
        <button type="button" className="btn btn-primary" style={{ width: "100%", marginTop: "1.25rem" }} disabled>
          Checkout via Shopify
        </button>
        <button type="button" onClick={clear} className="btn btn-secondary" style={{ width: "100%", marginTop: "0.65rem" }}>
          Clear cart
        </button>
        <Link href="/shop" style={{ display: "block", textAlign: "center", marginTop: "1rem", fontSize: "0.85rem", color: "var(--ultra)" }}>
          Keep shopping
        </Link>
      </aside>
    </div>
  );
}
