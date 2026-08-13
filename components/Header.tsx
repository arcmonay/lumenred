import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export function Header() {
  return (
    <header className="brand-rail">
      <Link href="/" className="brand-lockup">
        <BrandLogo size={46} priority />
        <span className="brand-lockup__word">
          Lumen<span>red</span>
        </span>
      </Link>
      <p className="brand-rail__meta">Infrared chamber equipment</p>
    </header>
  );
}
