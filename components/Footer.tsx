import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)]">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo size={52} />
            <p className="font-display text-3xl font-semibold tracking-tight">
              Lumen<span className="text-[var(--ember)]">red</span>
            </p>
          </div>
          <p className="mt-3 max-w-sm text-[var(--ink-muted)] leading-relaxed">
            Clinical-grade red and near-infrared systems for home recovery rooms
            and professional studios.
          </p>
        </div>
        <div>
          <p className="eyebrow">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--ink-muted)]">
            <li>
              <Link href="/shop" className="hover:text-[var(--ink)]">
                All products
              </Link>
            </li>
            <li>
              <Link
                href="/collections/full-body-panels"
                className="hover:text-[var(--ink)]"
              >
                Full body panels
              </Link>
            </li>
            <li>
              <Link href="/collections/bundles" className="hover:text-[var(--ink)]">
                Bundles
              </Link>
            </li>
            <li>
              <Link
                href="/collections/accessories"
                className="hover:text-[var(--ink)]"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--ink-muted)]">
            <li>
              <Link href="/science" className="hover:text-[var(--ink)]">
                Science
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[var(--ink)]">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="container flex flex-col gap-2 py-5 text-xs text-[var(--ink-faint)] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Lumenred. Built for Shopify catalog import.</p>
          <p>Not a medical device. Follow professional guidance for therapeutic use.</p>
        </div>
      </div>
    </footer>
  );
}
