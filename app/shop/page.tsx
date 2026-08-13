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
  description: "Shop Lumenred red light therapy panels, masks, wraps, and systems.",
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
    <div className="page">
      <div className="container">
        <h1 className="page-title">Shop devices</h1>
        <p className="page-lede">
          {products.length} products
          {collection
            ? ` in ${collections.find((c) => c.handle === collection)?.title ?? collection}`
            : ""}
          {q ? ` matching “${q}”` : ""}.
        </p>
        <Suspense fallback={<div className="h-12" />}>
          <ShopFilters collections={collections} />
        </Suspense>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
