# Lumenred

Red light therapy equipment storefront — Next.js + Shopify-ready catalog.

**Live:** https://lumenred.vercel.app · **Repo:** https://github.com/arcmonay/lumenred

## Visual reference

Storefront styling mirrors **[Joovv](https://joovv.com/)** (white shell, charcoal announcement bar, uppercase nav, `#ff4d26` accent, product hero, 3-up shop cards, multi-column dark footer). Catalog, copy, and logo remain Lumenred’s.

## What’s included

- Home, shop, collections, PDP, cart, compare, science, about
- **120 product listings** across 8 collections
- Product images in `public/products/`
- Shopify CSV at `data/shopify-products.csv`
- Storefront helper at `lib/shopify.ts`

## Quick start

```bash
npm install
npm run dev
```

## Shopify

1. Import `data/shopify-products.csv`
2. Copy `.env.example` → `.env.local` with Storefront credentials

© 2025 Lumenred. Not a medical device.
