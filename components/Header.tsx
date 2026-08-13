"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/full-body-panels", label: "Panels" },
  { href: "/collections/face-masks", label: "Masks" },
  { href: "/collections/targeted-wraps", label: "Wraps" },
  { href: "/compare", label: "Compare" },
  { href: "/science", label: "Science" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <>
      <div className="announce">✓ HSA/FSA Eligible · Free shipping on qualifying orders</div>
      <header className="header-base">
        <div className="container header-inner">
          <Link href="/" className="brand-lockup">
            <Image
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              priority
            />
            <span className="brand-word">
              Lumen<span>red</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {links.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "is-active" : ""}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link href="/cart" className="cart-link">
              Cart<em>{count}</em>
            </Link>
            <Link href="/shop" className="btn-start">
              Get started
            </Link>
          </div>
        </div>
      </header>
      <div className="container">
        <nav className="mobile-nav" aria-label="Mobile">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "is-active" : ""}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
