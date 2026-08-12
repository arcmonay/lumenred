import { CartView } from "@/components/CartView";

export const metadata = { title: "Session" };

export default function CartPage() {
  return (
    <div className="chamber-page">
      <h1 className="font-display ritual__title" style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)", textAlign: "left" }}>
        The session
      </h1>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
