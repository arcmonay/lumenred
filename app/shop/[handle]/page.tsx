import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductVisual } from "@/components/ProductVisual";
import {
  formatMoney,
  getCollection,
  getProduct,
  getProducts,
  getProductsByCollection,
} from "@/lib/products";

type Params = Promise<{ handle: string }>;

export function generateStaticParams() {
  return getProducts().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: "Product" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const collection = getCollection(product.collection);
  const related = getProductsByCollection(product.collection)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <article className="container grid gap-10 py-10 md:grid-cols-2 md:py-16">
        <ProductVisual
          tone={product.imageTone}
          title={product.title}
          collection={product.collection}
          className="!aspect-square"
        />
        <div>
          {collection ? (
            <p className="text-sm text-[var(--ink-faint)]">
              <Link
                href={`/collections/${collection.handle}`}
                className="hover:text-[var(--ink)]"
              >
                {collection.title}
              </Link>
            </p>
          ) : null}
          <h1 className="font-display mt-2 text-4xl tracking-tight md:text-5xl">
            {product.title}
          </h1>
          <p className="mt-4 text-2xl font-semibold">
            {formatMoney(product.price)}
            {product.compareAtPrice ? (
              <span className="ml-3 text-base font-normal text-[var(--ink-faint)] line-through">
                {formatMoney(product.compareAtPrice)}
              </span>
            ) : null}
          </p>
          <p className="mt-5 max-w-xl text-[var(--ink-muted)] leading-relaxed">
            {product.description}
          </p>
          <ul className="mt-8 space-y-3 border-t border-[var(--line)] pt-6 text-sm">
            {[
              ["Wavelength", product.wavelength],
              ["LEDs", String(product.leds || "—")],
              ["Power class", product.watts ? `${product.watts}W` : "—"],
              ["Size", product.size],
              ["Finish", product.finish],
              ["SKU", product.sku],
            ].map(([label, value]) => (
              <li key={label} className="flex justify-between gap-4">
                <span className="text-[var(--ink-faint)]">{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AddToCartButton handle={product.handle} />
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="container pb-16">
          <div className="mb-8 max-w-xl">
            <h2 className="font-display text-3xl tracking-tight">
              Related in {collection?.title ?? "this collection"}
            </h2>
            <p className="mt-2 text-[var(--ink-muted)]">
              More options with a similar form factor.
            </p>
          </div>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </>
  );
}
