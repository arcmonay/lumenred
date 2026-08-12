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
  title: "Cabinet",
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
    <div className="chamber-page">
      <h1 className="font-display ritual__title" style={{ fontSize: "clamp(2.8rem, 7vw, 4.6rem)", textAlign: "left" }}>
        The cabinet
      </h1>
      <p className="mt-4 mb-10 max-w-md text-[var(--ink-muted)]">
        {products.length} systems
        {collection
          ? ` in ${collections.find((c) => c.handle === collection)?.title ?? collection}`
          : ""}
        {q ? ` matching “${q}”` : ""}. Specified, not merchandised.
      </p>
      <div className="mb-12">
        <Suspense fallback={<div className="h-12" />}>
          <ShopFilters collections={collections} />
        </Suspense>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
