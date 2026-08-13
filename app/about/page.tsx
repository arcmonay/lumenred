export const metadata = {
  title: "About",
  description: "About Lumenred red light therapy equipment.",
};

export default function AboutPage() {
  return (
    <div className="page">
      <article className="container">
        <p className="section__eyebrow">About</p>
        <h1 className="page-title">Built for home and studio</h1>
        <p className="page-lede">
          Lumenred is a red and near-infrared product line for recovery rooms and
          professional studios. The storefront is a custom Next.js experience with a
          full Shopify-importable catalog.
        </p>
        <p className="page-lede">
          One hundred twenty SKUs span panels, masks, handhelds, wraps, accessories,
          and bundles. Connect Shopify when ready: import{" "}
          <code style={{ color: "var(--ultra)" }}>data/shopify-products.csv</code>,
          add Storefront API credentials, and wire live checkout.
        </p>
      </article>
    </div>
  );
}
