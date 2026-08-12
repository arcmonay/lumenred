import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { getCollections, getFeaturedProducts, getProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts(5);
  const hero = featured[0];
  const rest = featured.slice(1);
  const collections = getCollections();
  const total = getProducts().length;

  return (
    <>
      <section className="ritual">
        <p className="eyebrow">Red · 660nm · 850nm</p>
        <h1 className="font-display ritual__title">
          Sit in
          <br />
          the light.
        </h1>
        <p className="ritual__lede">
          Panels, masks, and studio systems specified the way a clinic would:
          wavelength, LED count, irradiance.
        </p>
        <Link href="/shop" className="ignite">
          Begin a session →
        </Link>
        {hero ? (
          <Link href={`/shop/${hero.handle}`} className="ritual__hero">
            <ProductVisual product={hero} priority className="!aspect-[4/5]" />
            <span>{hero.title.replace("Lumenred ", "")}</span>
          </Link>
        ) : null}
      </section>

      <section className="steps">
        <div className="steps__head">
          <h2 className="font-display">Protocol</h2>
          <Link href="/shop">{total} systems</Link>
        </div>
        <ol>
          {collections.map((c, i) => (
            <li key={c.handle}>
              <Link href={`/collections/${c.handle}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong className="font-display">{c.title}</strong>
                <em>{c.description}</em>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="cabinet">
        <h2 className="font-display">On the floor</h2>
        <div className="cabinet__list">
          {rest.map((product, i) => (
            <Link key={product.id} href={`/shop/${product.handle}`}>
              <span>{String(i + 2).padStart(2, "0")}</span>
              <ProductVisual product={product} />
              <div>
                <p className="font-display">{product.title.replace("Lumenred ", "")}</p>
                <em>${product.price}</em>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
