import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { formatMoney } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <Link href={`/shop/${product.handle}`}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <ProductVisual product={product} className="!aspect-square" />
      <div>
        <p className="font-display">{product.title.replace("Lumenred ", "")}</p>
        <em>{formatMoney(product.price)}</em>
      </div>
    </Link>
  );
}
