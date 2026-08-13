export const metadata = {
  title: "Lab notes",
  description: "About Lumenred red light therapy equipment.",
};

export default function AboutPage() {
  return (
    <article className="frame">
      <p className="page-kicker">About the chamber</p>
      <h1 className="page-title">Built like equipment</h1>
      <div className="page-lede space-y-5" style={{ display: "grid" }}>
        <p>
          Lumenred is a red and near-infrared product line for home recovery rooms
          and professional studios. The storefront is a custom Next.js chamber
          experience with a full Shopify-importable catalog.
        </p>
        <p>
          One hundred twenty SKUs span panels, masks, handhelds, wraps,
          accessories, and bundles—so the bay feels complete from day one.
        </p>
        <p>
          Connect Shopify when ready: import{" "}
          <code className="text-[var(--ember)]">data/shopify-products.csv</code>,
          add Storefront API credentials, and wire live checkout.
        </p>
      </div>
    </article>
  );
}
