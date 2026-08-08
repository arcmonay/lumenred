import catalog from "@/data/catalog.json";
import type { Catalog, Collection, Product } from "@/lib/types";

const data = catalog as Catalog;

export function getCollections(): Collection[] {
  return data.collections;
}

export function getCollection(handle: string): Collection | undefined {
  return data.collections.find((c) => c.handle === handle);
}

export function getProducts(): Product[] {
  return data.products;
}

export function getProduct(handle: string): Product | undefined {
  return data.products.find((p) => p.handle === handle);
}

export function getProductsByCollection(handle: string): Product[] {
  return data.products.filter((p) => p.collection === handle);
}

export function getFeaturedProducts(limit = 8): Product[] {
  const featured = data.products.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return data.products.slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return data.products;
  return data.products.filter((p) => {
    const hay = [
      p.title,
      p.description,
      p.collection,
      p.wavelength,
      p.finish,
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function collectionTitle(handle: string): string {
  return getCollection(handle)?.title ?? handle;
}
