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
    <div className="chamber-page">
      <p className="mb-4 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
        <Link href="/shop">Cabinet</Link>
        <span className="mx-2">·</span>
        <span>{collection.title}</span>
      </p>
      <h1 className="font-display ritual__title" style={{ fontSize: "clamp(2.6rem, 6vw, 4.4rem)", textAlign: "left" }}>
        {collection.title}
      </h1>
      <p className="mt-4 mb-10 max-w-md text-[var(--ink-muted)]">
        {collection.description} {products.length} systems in this step.
      </p>
      <ProductGrid products={products} />
    </div>
  );
}
