export const metadata = {
  title: "Studio",
  description: "About Lumenred red light therapy equipment.",
};

export default function AboutPage() {
  return (
    <article className="chamber-page">
      <p className="eyebrow">Studio</p>
      <h1 className="font-display ritual__title" style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)", textAlign: "left" }}>
        Built like equipment.
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--ink-muted)]">
        <p>
          Lumenred is a red and near-infrared product line designed for home
          recovery rooms and professional studios. The storefront is a custom
          Next.js experience with a full Shopify-importable catalog.
        </p>
        <p>
          This project ships with 120 SKUs across panels, masks, handhelds,
          wraps, accessories, and bundles—so the cabinet feels complete from
          day one.
        </p>
        <p>
          Connect your Shopify store when you&apos;re ready: import{" "}
          <code className="text-[var(--copper)]">data/shopify-products.csv</code>,
          add Storefront API credentials, and wire live checkout.
        </p>
      </div>
    </article>
  );
}
