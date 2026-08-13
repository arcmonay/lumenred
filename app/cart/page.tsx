import { CartView } from "@/components/CartView";

export const metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="page page--soft">
      <div className="container">
        <h1 className="page-title">Your cart</h1>
        <p className="page-lede">
          Cart state stays in this browser until Shopify Storefront credentials
          are connected.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <CartView />
        </div>
      </div>
    </div>
  );
}
