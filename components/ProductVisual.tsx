import Image from "next/image";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  className?: string;
  priority?: boolean;
};

export function ProductVisual({
  product,
  className = "",
  priority = false,
}: Props) {
  const src = product.image || `/products/${product.handle}.webp`;

  return (
    <div
      className={`relative aspect-square overflow-hidden bg-[#ececec] ${className}`}
    >
      <Image
        src={src}
        alt={product.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
