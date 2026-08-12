import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <p className="max-w-md text-[var(--ink-muted)]">
        Nothing in this cabinet. Try another step of the protocol.
      </p>
    );
  }

  return (
    <div className="cabinet__list">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
