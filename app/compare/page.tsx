import Image from "next/image";
import Link from "next/link";
import { formatMoney, getFeaturedProducts } from "@/lib/products";

export const metadata = {
  title: "Compare",
  description:
    "Compare Lumenred panel specs: wavelength, LED count, power class, and size.",
};

export default function ComparePage() {
  const panels = getFeaturedProducts(6).filter(
    (p) => p.collection === "full-body-panels" || p.tags.includes("panel"),
  );
  const rows = panels.length >= 3 ? panels.slice(0, 3) : getFeaturedProducts(3);

  return (
    <div className="frame-wide">
      <p className="page-kicker">Spec match</p>
      <h1 className="page-title">Compare systems</h1>
      <p className="page-lede">
        Line up featured panels by the numbers that matter in a chamber: wavelength,
        LED density, power class, and footprint.
      </p>

      <div className="compare-grid mt-10">
        {rows.map((product) => (
          <article key={product.id} className="compare-card">
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--line)] bg-[var(--void)]">
              <Image
                src={product.image || `/products/${product.handle}.webp`}
                alt={product.title}
                fill
                sizes="(max-width: 720px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <h3>{product.title.replace("Lumenred ", "")}</h3>
            <p className="mt-2 text-lg font-semibold">{formatMoney(product.price)}</p>
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
              <div>
                <dt>Finish</dt>
                <dd>{product.finish}</dd>
              </div>
            </dl>
            <Link href={`/shop/${product.handle}`} className="act act-ghost mt-5 w-full">
              Open console
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/collections/full-body-panels" className="act act-ember">
          Browse all panels
        </Link>
      </div>
    </div>
  );
}
