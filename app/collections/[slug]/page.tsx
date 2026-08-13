import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import {
  getCollection,
  getCollections,
  getProductsByCollection,
} from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.handle }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection" };
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);

  return (
    <div className="page">
      <div className="container">
        <p className="section__eyebrow">
          <Link href="/shop">Shop</Link>
          {" / "}
          {collection.title}
        </p>
        <h1 className="page-title">{collection.title}</h1>
        <p className="page-lede">
          {collection.description} {products.length} products.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
