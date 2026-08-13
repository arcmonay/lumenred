import { CartView } from "@/components/CartView";

export const metadata = { title: "Bay" };

export default function CartPage() {
  return (
    <div className="frame">
      <p className="page-kicker">Checkout staging</p>
      <h1 className="page-title">Equipment bay</h1>
      <p className="page-lede">
        Items stay in this browser until Shopify Storefront credentials are
        connected.
      </p>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
