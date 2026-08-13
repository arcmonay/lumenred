import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">
            Lumen<span>red</span>
          </p>
          <p className="footer-note">
            Red and near-infrared therapy equipment for home recovery rooms and
            studios. Educational product information only — not a medical device.
          </p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <Link href="/shop">All devices</Link>
          <Link href="/collections/full-body-panels">Panels</Link>
          <Link href="/collections/face-masks">Masks</Link>
          <Link href="/collections/targeted-wraps">Wraps</Link>
          <Link href="/collections/beds-systems">Studio systems</Link>
        </div>
        <div className="footer-col">
          <h4>Learn</h4>
          <Link href="/science">Science</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <Link href="/cart">Cart</Link>
          <Link href="/shop">Catalog</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 Lumenred. All rights reserved.</span>
        <span>Not intended to diagnose, treat, cure, or prevent any disease.</span>
      </div>
    </footer>
  );
}
