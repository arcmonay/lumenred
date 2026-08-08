# Lumenred

Red light therapy equipment storefront on Next.js with a **120-product** catalog, local cart, and Shopify import/connect path.

## What’s included

- Branded storefront (home, shop, collections, product pages, cart, science, about)
- `data/catalog.json` — 120 devices across 8 collections
- `data/shopify-products.csv` — Shopify Admin product import
- `lib/shopify.ts` — Storefront API helper (activate with env vars)
- Local cart (browser storage) until Shopify checkout is connected

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connect Shopify

1. Create / open a Shopify store.
2. Admin → **Products** → **Import** → upload `data/shopify-products.csv`.
3. Create a custom app with Storefront API access.
4. Copy `.env.example` → `.env.local`:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_storefront_token
```

5. Deploy this repo as a **new** Vercel project (do not reuse an old deployment).

## Repo

https://github.com/arcmonay/lumenred
