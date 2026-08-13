# Lumenred

Infrared chamber storefront for red / near-infrared therapy equipment — Next.js + Shopify-ready catalog.

**Live:** https://lumenred.vercel.app · **Repo:** https://github.com/arcmonay/lumenred

## Identity

**Chamber Control** — top ember slit, bottom wavelength dock, full-bleed panel gallery with floating purchase HUD. Journey: Panels → Masks → Wraps → Studio → Compare.

## What’s included

- Brand storefront (home, shop, collections, PDP, cart, compare, science, about)
- **120 product listings** across 8 collections
- Unique product image for every listing in `public/products/`
- Shopify Admin import CSV at `data/shopify-products.csv`
- Local catalog at `data/catalog.json`
- Storefront API helper at `lib/shopify.ts`

## Quick start

```bash
npm install
npm run dev
```

## Catalog scripts

```bash
npm run images
npm run catalog:csv
```

## Shopify setup

1. **Products → Import** `data/shopify-products.csv`
2. Create a Storefront API token
3. Copy `.env.example` → `.env.local`:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=...
```

Until credentials are connected, the site runs on the local catalog and browser cart.

© 2025 Lumenred. Not a medical device.
