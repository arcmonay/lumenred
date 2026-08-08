import { Suspense } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { ShopFilters } from "@/components/ShopFilters";
import {
  getCollections,
  getProducts,
  getProductsByCollection,
  searchProducts,
} from "@/lib/products";

export const metadata = {
  title: "Shop",
  description: "Browse 120+ Lumenred red light therapy systems and accessories.",
};

type Props = {
  searchParams: Promise<{ collection?: string; q?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { collection, q } = await searchParams;
  const collections = getCollections();

  let products = q ? searchProducts(q) : getProducts();
  if (collection && collection !== "all") {
    const inCollection = new Set(
      getProductsByCollection(collection).map((p) => p.id),
    );
    products = products.filter((p) => inCollection.has(p.id));
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Shop</p>
        <h1 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
          Equipment catalog
        </h1>
        <p className="mt-3 text-[var(--ink-muted)]">
          {products.length} listings
          {collection
            ? ` in ${collections.find((c) => c.handle === collection)?.title ?? collection}`
            : ""}
          {q ? ` matching “${q}”` : ""}.
        </p>
      </div>

      <div className="mb-10">
        <Suspense fallback={<div className="h-12" />}>
          <ShopFilters collections={collections} />
        </Suspense>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
