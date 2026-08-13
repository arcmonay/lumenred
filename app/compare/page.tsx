import Image from "next/image";
import Link from "next/link";
import { formatMoney, getFeaturedProducts, getProducts } from "@/lib/products";

export const metadata = {
  title: "Compare",
  description: "Compare Lumenred panel specs side by side.",
};

export default function ComparePage() {
  const panels = getProducts()
    .filter((p) => p.collection === "full-body-panels")
    .slice(0, 3);
  const rows = panels.length ? panels : getFeaturedProducts(3);

  return (
    <div className="page page--soft">
      <div className="container">
        <p className="section__eyebrow">Buyer&apos;s guide</p>
        <h1 className="page-title">Compare devices</h1>
        <p className="page-lede">
          Line up wavelength, LED count, power class, and size — then open the
          product page that fits your setup.
        </p>

        <div className="compare-grid">
          {rows.map((product) => (
            <article key={product.id} className="compare-card">
              <div className="compare-card__media">
                <Image
                  src={product.image || `/products/${product.handle}.webp`}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="compare-card__body">
                <h3>{product.title.replace("Lumenred ", "")}</h3>
                <p style={{ margin: "0.5rem 0 0", fontWeight: 600 }}>
                  {formatMoney(product.price)}
                </p>
                <dl>
                  <div>
                    <dt>Wavelength</dt>
                    <dd>{product.wavelength}</dd>
                  </div>
                  <div>
                    <dt>LEDs</dt>
                    <dd>{product.leds}</dd>
                  </div>
                  <div>
                    <dt>Power class</dt>
                    <dd>{product.watts}W</dd>
                  </div>
                  <div>
                    <dt>Size</dt>
                    <dd>{product.size}</dd>
                  </div>
                </dl>
                <Link
                  href={`/shop/${product.handle}`}
                  className="btn btn-secondary"
                  style={{ width: "100%", marginTop: "1rem" }}
                >
                  View device
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <Link href="/collections/full-body-panels" className="btn btn-primary">
            Browse all panels
          </Link>
        </div>
      </div>
    </div>
  );
}
