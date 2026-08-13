import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGrid } from "@/components/ProductGrid";
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
  const src = product.image || `/products/${product.handle}.webp`;

  return (
    <div className="page page--soft">
      <article className="container">
        <div className="pdp">
          <div className="pdp-gallery">
            <Image
              src={src}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          <div className="pdp-buy">
            {collection ? (
              <p className="section__eyebrow">
                <Link href={`/collections/${collection.handle}`}>
                  {collection.title}
                </Link>
              </p>
            ) : null}
            <h1>{product.title}</h1>
            <p className="pdp-price">
              {formatMoney(product.price)}
              {product.compareAtPrice ? (
                <s>{formatMoney(product.compareAtPrice)}</s>
              ) : null}
            </p>
            <p className="pdp-desc">{product.description}</p>

            <ul className="spec-list">
              {[
                ["Wavelength", product.wavelength],
                ["LEDs", String(product.leds || "—")],
                ["Power class", product.watts ? `${product.watts}W` : "—"],
                ["Size", product.size],
                ["Finish", product.finish],
                ["SKU", product.sku],
              ].map(([label, value]) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>

            <div className="pdp-actions">
              <AddToCartButton handle={product.handle} />
              <Link href="/compare" className="btn btn-secondary">
                Compare
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="container" style={{ marginTop: "3rem" }}>
          <h2 className="section__title" style={{ maxWidth: "none" }}>
            You may also like
          </h2>
          <div style={{ marginTop: "1.5rem" }}>
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
