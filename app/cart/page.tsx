import { CartView } from "@/components/CartView";

export const metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10">
        <p className="eyebrow">Cart</p>
        <h1 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
          Your bag
        </h1>
      </div>
      <CartView />
    </div>
  );
}
