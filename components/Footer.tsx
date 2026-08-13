import Link from "next/link";

export function Footer() {
  return (
    <footer className="lab-foot">
      <div className="lab-foot__row">
        <span>Lumenred · © 2025</span>
        <span>
          <Link href="/science">Wavelengths</Link>
          {" · "}
          <Link href="/about">Lab notes</Link>
          {" · "}
          <Link href="/shop">Full catalog</Link>
        </span>
      </div>
      <p className="lab-foot__note">
        Educational product information only. Lumenred equipment is not a medical
        device and is not intended to diagnose, treat, cure, or prevent any disease.
      </p>
    </footer>
  );
}
