"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/full-body-panels", label: "Panels" },
  { href: "/collections/face-masks", label: "Masks" },
  { href: "/science", label: "Science" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight md:text-[1.7rem]">
            Lumen<span className="text-[var(--ember)]">red</span>
          </span>
          <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-faint)] sm:inline">
            Infrared Systems
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  active
                    ? "text-[var(--ink)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/shop" className="btn btn-ghost !min-h-10 !px-3 md:hidden">
            Shop
          </Link>
          <Link href="/cart" className="btn btn-ghost !min-h-10 relative !px-4">
            Cart
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--ember)] px-1 text-[0.7rem] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
