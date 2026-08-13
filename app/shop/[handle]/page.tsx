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
    .slice(0, 5);
  const src = product.image || `/products/${product.handle}.webp`;

  return (
    <>
      <article className="frame-wide">
        <div className="pdp">
          <div className="optics">
            <Image
              src={src}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 720px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="optics-hud" aria-label="Instrument readouts">
              <div>
                <small>Wavelength</small>
                <strong>{product.wavelength}</strong>
              </div>
              <div>
                <small>LED array</small>
                <strong>{product.leds || "—"}</strong>
              </div>
              <div>
                <small>Power class</small>
                <strong>{product.watts ? `${product.watts}W` : "—"}</strong>
              </div>
            </div>
          </div>

          <div className="console">
            {collection ? (
              <p className="page-kicker">
                <Link href={`/collections/${collection.handle}`}>
                  {collection.title}
                </Link>
              </p>
            ) : (
              <p className="page-kicker">Equipment bay</p>
            )}
            <h1>{product.title}</h1>
            <p className="console__price">
              {formatMoney(product.price)}
              {product.compareAtPrice ? (
                <s>{formatMoney(product.compareAtPrice)}</s>
              ) : null}
            </p>
            <p className="page-lede">{product.description}</p>

            <ul className="instrument-sheet">
              {[
                ["Size", product.size],
                ["Finish", product.finish],
                ["Weight", `${product.weightLbs} lb`],
                ["SKU", product.sku],
                ["Stock", product.inStock ? "In chamber" : "Backordered"],
              ].map(([label, value]) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap gap-3">
              <AddToCartButton handle={product.handle} />
              <Link href="/compare" className="act act-ghost">
                Compare specs
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="frame">
          <p className="page-kicker">Same bay</p>
          <h2 className="page-title" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
            Adjacent systems
          </h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </>
  );
}
