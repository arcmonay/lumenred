"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const journey = [
  { href: "/collections/full-body-panels", label: "Panels", nm: "660" },
  { href: "/collections/face-masks", label: "Masks", nm: "630" },
  { href: "/collections/targeted-wraps", label: "Wraps", nm: "850" },
  { href: "/collections/beds-systems", label: "Studio", nm: "SYS" },
  { href: "/compare", label: "Compare", nm: "Δ" },
];

export function ControlDock() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="control-dock" aria-label="Chamber controls">
      <div className="control-dock__inner">
        <div className="wave-scale" aria-hidden>
          <span>
            <i />
            630
          </span>
          <span>
            <i />
            660
          </span>
          <span>
            <i />
            850
          </span>
        </div>

        <div className="dock-nav">
          {journey.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "is-active" : ""}
              >
                <small>{item.nm}</small>
                {item.label}
              </Link>
            );
          })}
          <Link href="/shop" className={pathname === "/shop" ? "is-active" : ""}>
            <small>ALL</small>
            Catalog
          </Link>
        </div>

        <Link href="/cart" className="dock-bag">
          Bay
          <em>{count}</em>
        </Link>
      </div>
    </nav>
  );
}
