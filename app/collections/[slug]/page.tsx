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
    <div className="container py-12 md:py-16">
      <p className="mb-6 text-sm text-[var(--ink-faint)]">
        <Link href="/shop" className="hover:text-[var(--ink)]">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{collection.title}</span>
      </p>
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Collection</p>
        <h1 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
          {collection.title}
        </h1>
        <p className="mt-3 text-[var(--ink-muted)]">{collection.description}</p>
        <p className="mt-2 text-sm text-[var(--ink-faint)]">
          {products.length} products
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
