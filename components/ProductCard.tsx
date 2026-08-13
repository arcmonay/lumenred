import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { formatMoney } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product; index?: number }) {
  return (
    <Link href={`/shop/${product.handle}`} className="equip-row">
      <div className="equip-row__visual">
        <ProductVisual product={product} className="!aspect-square !border-0" />
      </div>
      <div>
        <p className="equip-row__title">
          {product.title.replace("Lumenred ", "")}
        </p>
        <div className="equip-row__specs">
          <span>{product.wavelength}</span>
          <span>{product.leds} LEDs</span>
          <span>{product.watts ? `${product.watts}W` : "—"}</span>
        </div>
        <p className="equip-row__price sm:hidden">{formatMoney(product.price)}</p>
      </div>
      <p className="equip-row__price hidden sm:block">{formatMoney(product.price)}</p>
    </Link>
  );
}
