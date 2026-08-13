import Image from "next/image";
import Link from "next/link";
import {
  formatMoney,
  getFeaturedProducts,
  getProducts,
} from "@/lib/products";

const shopCards = [
  {
    href: "/collections/handheld",
    title: "Handheld",
    blurb: "Portable emitters for targeted sessions at home or on the go.",
    learn: "/collections/handheld",
  },
  {
    href: "/collections/full-body-panels",
    title: "Modular panels",
    blurb: "Floor and wall panels that scale from targeted to full-body coverage.",
    learn: "/collections/full-body-panels",
  },
  {
    href: "/collections/beds-systems",
    title: "Studio systems",
    blurb: "Beds and multi-panel setups for dedicated recovery rooms.",
    learn: "/collections/beds-systems",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const hero = featured[0];
  const total = getProducts().length;

  return (
    <>
      <section className="hero">
        {hero ? (
          <div className="hero__media">
            <Image
              src={hero.image || `/products/${hero.handle}.webp`}
              alt={hero.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="hero__veil" aria-hidden />
        <div className="container hero__body">
          <p className="hero__eyebrow">Red & near-infrared equipment</p>
          <h1 className="hero__title">Red Light Therapy Devices</h1>
          <p className="hero__sub">
            Panels, masks, wraps, and studio systems specified by wavelength, LED
            count, and power class — built for consistent home and studio sessions.
          </p>
          <div className="hero__actions">
            <Link href="/shop" className="btn btn-primary">
              Shop devices
            </Link>
            <Link href="/science" className="btn btn-secondary">
              Learn the science
            </Link>
          </div>
        </div>
      </section>

      <section className="shop-cards">
        <div className="container">
          <div className="shop-cards__head">
            <h2>Shop red light therapy devices</h2>
          </div>
          <div className="shop-grid">
            {shopCards.map((card, i) => {
              const img = featured[i + 1] ?? featured[0];
              return (
                <article key={card.href} className="shop-card">
                  <Link href={card.href} className="shop-card__media">
                    {img ? (
                      <Image
                        src={img.image || `/products/${img.handle}.webp`}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : null}
                  </Link>
                  <div className="shop-card__body">
                    <h3>{card.title}</h3>
                    <p>{card.blurb}</p>
                    <div className="shop-card__links">
                      <Link href={card.learn}>Learn more</Link>
                      <Link href={card.href}>Shop now</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="guide-band">
        <div className="container">
          <h2>Buyer&apos;s guide</h2>
          <p>
            Need help finding the right setup? Compare coverage, wavelength, and
            power class across {total} Lumenred systems.
          </p>
          <Link href="/compare" className="btn btn-secondary">
            Compare devices
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section__eyebrow">Science</p>
          <h2 className="section__title">What is red light therapy?</h2>
          <p className="section__lede">
            Red light therapy uses specific wavelengths of red and near-infrared
            light as part of wellness and recovery routines. Lumenred devices list
            wavelength mix, LED count, and power class so you can compare equipment
            clearly — without cure claims or medical advice.
          </p>
          <Link href="/science" className="btn btn-secondary" style={{ marginTop: "1.5rem" }}>
            Explore wavelengths
          </Link>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <p className="section__eyebrow">The Lumenred difference</p>
          <h2 className="section__title">Specified like equipment</h2>
          <div className="diff-grid">
            <article className="diff-card">
              <h3>Clear specifications</h3>
              <p>
                Every listing shows wavelength, LED count, power class, size, and
                finish — so comparisons stay factual.
              </p>
            </article>
            <article className="diff-card">
              <h3>Full catalog depth</h3>
              <p>
                One hundred twenty SKUs across panels, masks, wraps, handhelds,
                accessories, and studio systems.
              </p>
            </article>
            <article className="diff-card">
              <h3>Shopify-ready</h3>
              <p>
                Import-ready CSV and Storefront API helpers ship with the project
                for live checkout when you connect a store.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="featured-strip">
        <div className="container">
          <div className="featured-strip__head">
            <h2>Featured devices</h2>
            <Link href="/shop" className="btn btn-secondary">
              View all
            </Link>
          </div>
          <div className="product-grid">
            {featured.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.handle}`}
                className="product-card"
              >
                <div className="product-card__media">
                  <Image
                    src={product.image || `/products/${product.handle}.webp`}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="product-card__body">
                  <h3>{product.title.replace("Lumenred ", "")}</h3>
                  <p className="product-card__meta">
                    {product.wavelength} · {product.leds} LEDs
                  </p>
                  <p className="product-card__price">{formatMoney(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
