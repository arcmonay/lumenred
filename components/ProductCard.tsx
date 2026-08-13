import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { formatMoney } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product; index?: number }) {
  return (
    <Link href={`/shop/${product.handle}`} className="product-card">
      <div className="product-card__media">
        <ProductVisual product={product} className="!aspect-square" />
      </div>
      <div className="product-card__body">
        <h3>{product.title.replace("Lumenred ", "")}</h3>
        <p className="product-card__meta">
          {product.wavelength} · {product.leds} LEDs
          {product.watts ? ` · ${product.watts}W` : ""}
        </p>
        <p className="product-card__price">{formatMoney(product.price)}</p>
      </div>
    </Link>
  );
}
