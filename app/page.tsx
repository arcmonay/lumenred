import Image from "next/image";
import Link from "next/link";
import {
  formatMoney,
  getFeaturedProducts,
  getProducts,
} from "@/lib/products";

const journey = [
  {
    href: "/collections/full-body-panels",
    nm: "660nm",
    title: "Panels",
    blurb: "Floor and wall emitters for whole-body coverage.",
    cue: "Start here",
  },
  {
    href: "/collections/face-masks",
    nm: "630nm",
    title: "Masks",
    blurb: "Hands-free facial arrays for skin-facing routines.",
    cue: "Face bay",
  },
  {
    href: "/collections/targeted-wraps",
    nm: "850nm",
    title: "Wraps",
    blurb: "Flexible pads for joints, back, and soft tissue.",
    cue: "Targeted",
  },
  {
    href: "/collections/beds-systems",
    nm: "SYS",
    title: "Studio",
    blurb: "Beds and multi-panel systems for dedicated rooms.",
    cue: "Full room",
  },
  {
    href: "/compare",
    nm: "Δ",
    title: "Compare",
    blurb: "Line up wavelength, LEDs, and power class side by side.",
    cue: "Spec match",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(5);
  const hero = featured[0];
  const bays = featured.slice(0, 4);
  const total = getProducts().length;

  return (
    <>
      <section className="gallery-hero">
        {hero ? (
          <Link
            href={`/shop/${hero.handle}`}
            className="gallery-hero__media"
            aria-label={hero.title}
          >
            <Image
              src={hero.image || `/products/${hero.handle}.webp`}
              alt={hero.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </Link>
        ) : (
          <div className="gallery-hero__media" style={{ background: "#141518" }} />
        )}
        <div className="gallery-hero__veil" aria-hidden />

        <div className="edge-scale" aria-hidden>
          <span>630</span>
          <span>660</span>
          <span>850</span>
          <span>NIR</span>
        </div>

        <aside className="purchase-hud">
          <h1 className="purchase-hud__brand">
            Lumen<span>red</span>
          </h1>
          <p className="purchase-hud__line">
            Clinical-warm red and near-infrared equipment—specified like lab gear,
            built for home and studio chambers.
          </p>
          <div className="purchase-hud__actions">
            <Link href="/shop" className="act act-ember">
              Open catalog
            </Link>
            <Link href="/collections/full-body-panels" className="act act-ghost">
              View panels
            </Link>
          </div>
          {hero ? (
            <Link href={`/shop/${hero.handle}`} className="purchase-hud__sku">
              <Image
                src={hero.image || `/products/${hero.handle}.webp`}
                alt=""
                width={52}
                height={64}
                className="thumb"
              />
              <span>
                <strong>{hero.title.replace("Lumenred ", "")}</strong>
                <em>
                  {hero.wavelength} · {formatMoney(hero.price)}
                </em>
              </span>
            </Link>
          ) : null}
        </aside>
      </section>

      <section className="spectrum">
        <div className="spectrum__head">
          <h2>Chamber path</h2>
          <p>
            Move through the bay in order—or jump by form factor. {total} SKUs
            ready for Shopify import.
          </p>
        </div>
        <div className="spectrum__track">
          {journey.map((step) => (
            <Link key={step.href} href={step.href} className="spectrum__step">
              <span className="spectrum__nm">{step.nm}</span>
              <div>
                <strong>{step.title}</strong>
                <span>{step.blurb}</span>
              </div>
              <b>{step.cue}</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="bays">
        <div className="bays__head">
          <h2>On the floor</h2>
        </div>
        {bays.map((product, i) => (
          <Link
            key={product.id}
            href={`/shop/${product.handle}`}
            className={`bay${i % 2 === 1 ? " bay--flip" : ""}`}
          >
            <div className="bay__media">
              <Image
                src={product.image || `/products/${product.handle}.webp`}
                alt={product.title}
                fill
                sizes="(max-width: 720px) 100vw, 55vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
            <div className="bay__copy">
              <h3>{product.title.replace("Lumenred ", "")}</h3>
              <div className="bay__meta">
                <span>
                  <i>{product.wavelength}</i>
                </span>
                <span>{product.leds} LEDs</span>
                <span>{product.watts}W class</span>
                <span>{formatMoney(product.price)}</span>
              </div>
              <p className="page-lede" style={{ marginTop: "0.35rem" }}>
                {product.size} · {product.finish}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
