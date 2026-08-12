"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/shop", label: "Cabinet" },
  { href: "/collections/full-body-panels", label: "Panels" },
  { href: "/collections/face-masks", label: "Masks" },
  { href: "/science", label: "Science" },
  { href: "/about", label: "Studio" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="mast">
      <Link href="/" className="mast-brand">
        <BrandLogo size={88} priority />
        <span className="font-display">
          Lumen<span>red</span>
        </span>
      </Link>
      <nav className="orbit">
        {links.map((link, i) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <span key={link.href}>
              {i > 0 ? <span className="dot" aria-hidden>·</span> : null}
              <Link href={link.href} className={active ? "is-active" : ""}>
                {link.label}
              </Link>
            </span>
          );
        })}
        <span className="dot" aria-hidden>·</span>
        <Link href="/cart" className={pathname === "/cart" ? "is-active" : ""}>
          Session{count > 0 ? ` ${count}` : ""}
        </Link>
      </nav>
    </header>
  );
}
