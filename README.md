# Lumenred

Custom red light therapy equipment storefront — Next.js + Shopify-ready catalog.

**Repo:** https://github.com/arcmonay/lumenred

## What’s included

- Brand storefront (home, shop, collections, product pages, cart, science, about)
- **120 product listings** across 8 collections
- Unique product image for every listing in `public/products/`
- Shopify Admin import CSV at `data/shopify-products.csv` (includes Image Src URLs)
- Local catalog at `data/catalog.json`
- Storefront API helper at `lib/shopify.ts`

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Catalog scripts

```bash
npm run images        # generate/update all 120 product images
npm run catalog:csv   # export CSV (includes image URLs for Shopify)
```

## Shopify setup

1. Create a Shopify store (or use an existing one).
2. **Products → Import** and upload `data/shopify-products.csv` (images pull from GitHub raw URLs after push).
3. Create a **Storefront API** token.
5. Copy `.env.example` → `.env.local` and fill:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=...
```

6. Deploy this app as a **new** Vercel project pointed at `arcmonay/lumenred`.

Until Shopify credentials are connected, the site runs on the local catalog and browser cart.

## Collections

Full body panels · Desktop panels · Face masks · Targeted wraps · Handheld · Beds & systems · Accessories · Bundles
