import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { collectionTitle, formatMoney } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.handle}`}
      className="group block transition-transform duration-300 hover:-translate-y-1"
    >
      <ProductVisual product={product} />
      <div className="mt-3 space-y-1 px-0.5">
        <p className="text-[0.7rem] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
          {collectionTitle(product.collection)}
        </p>
        <h3 className="font-display text-xl leading-snug tracking-tight group-hover:text-[var(--ember)]">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-semibold">{formatMoney(product.price)}</p>
          {product.compareAtPrice ? (
            <p className="text-sm text-[var(--ink-faint)] line-through">
              {formatMoney(product.compareAtPrice)}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
