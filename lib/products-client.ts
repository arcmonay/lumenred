import catalog from "@/data/catalog.json";
import type { Catalog, Product } from "@/lib/types";

const data = catalog as Catalog;

export function getProduct(handle: string): Product | undefined {
  return data.products.find((p) => p.handle === handle);
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
