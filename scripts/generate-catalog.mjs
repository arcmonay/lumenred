import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const collections = [
  {
    slug: "full-body-panels",
    title: "Full Body Panels",
    description: "Floor-standing and wall-mount panels for whole-body sessions.",
  },
  {
    slug: "desktop-panels",
    title: "Desktop Panels",
    description: "Compact panels for desks, nightstands, and focused zones.",
  },
  {
    slug: "face-masks",
    title: "Face Masks",
    description: "Hands-free facial systems for skin-focused routines.",
  },
  {
    slug: "handheld",
    title: "Handheld Devices",
    description: "Targeted wands and pads for joints, scalp, and travel.",
  },
  {
    slug: "wraps-belts",
    title: "Wraps & Belts",
    description: "Flexible wraps that stay in place during recovery work.",
  },
  {
    slug: "accessories",
    title: "Accessories",
    description: "Stands, goggles, controllers, and spare parts.",
  },
  {
    slug: "bundles",
    title: "Bundles",
    description: "Paired kits for home setups and multi-user routines.",
  },
];

const series = [
  { code: "Aether", tier: "Core", multiplier: 1 },
  { code: "Helio", tier: "Pro", multiplier: 1.35 },
  { code: "Nova", tier: "Studio", multiplier: 1.75 },
  { code: "Pulse", tier: "Travel", multiplier: 0.85 },
];

const wavelengths = [
  "660nm",
  "850nm",
  "660/850nm",
  "630/660/850nm",
  "660/810/850nm",
];

const sizes = {
  "full-body-panels": [
    { label: "60cm", leds: 300, base: 499 },
    { label: "90cm", leds: 500, base: 799 },
    { label: "120cm", leds: 750, base: 1199 },
    { label: "150cm", leds: 1000, base: 1599 },
    { label: "180cm", leds: 1400, base: 2199 },
  ],
  "desktop-panels": [
    { label: "Mini", leds: 60, base: 149 },
    { label: "Desk", leds: 120, base: 229 },
    { label: "Wide", leds: 200, base: 329 },
    { label: "Tower", leds: 280, base: 419 },
  ],
  "face-masks": [
    { label: "Soft", leds: 80, base: 189 },
    { label: "Rigid", leds: 120, base: 259 },
    { label: "Pro Contour", leds: 160, base: 349 },
  ],
  handheld: [
    { label: "Wand", leds: 24, base: 99 },
    { label: "Pad", leds: 48, base: 139 },
    { label: "Comb", leds: 36, base: 119 },
    { label: "Spot", leds: 18, base: 89 },
  ],
  "wraps-belts": [
    { label: "Knee", leds: 72, base: 169 },
    { label: "Back", leds: 120, base: 249 },
    { label: "Neck", leds: 48, base: 149 },
    { label: "Abdomen", leds: 96, base: 219 },
  ],
  accessories: [
    { label: "Floor Stand", leds: 0, base: 129 },
    { label: "Wall Mount", leds: 0, base: 79 },
    { label: "Protective Goggles", leds: 0, base: 29 },
    { label: "Timer Remote", leds: 0, base: 49 },
    { label: "Door Hook", leds: 0, base: 39 },
    { label: "Power Brick", leds: 0, base: 59 },
    { label: "Carry Case", leds: 0, base: 69 },
    { label: "Extension Arm", leds: 0, base: 89 },
  ],
  bundles: [
    { label: "Home Starter", leds: 380, base: 449 },
    { label: "Recovery Duo", leds: 620, base: 699 },
    { label: "Studio Pair", leds: 1500, base: 1899 },
    { label: "Travel Kit", leds: 120, base: 279 },
  ],
};

const finishes = ["Matte Black", "Graphite", "Bone White", "Crimson Trim"];
const irradiance = ["80 mW/cm²", "100 mW/cm²", "120 mW/cm²", "140 mW/cm²"];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function money(n) {
  return Math.round(n);
}

const products = [];
let index = 1;

for (const collection of collections) {
  const options = sizes[collection.slug];
  for (const seriesItem of series) {
    for (const size of options) {
      if (products.length >= 120) break;
      const wavelength =
        wavelengths[(index + size.leds) % wavelengths.length];
      const finish = finishes[index % finishes.length];
      const irr = irradiance[index % irradiance.length];
      const price = money(size.base * seriesItem.multiplier);
      const compareAt =
        index % 4 === 0 ? money(price * 1.18) : null;
      const title = `Lumenred ${seriesItem.code} ${size.label} ${collection.title.replace(/s$/, "").replace("Wraps & Belt", "Wrap").replace("Accessorie", "Accessory").replace("Bundle", "Bundle")}`;
      const cleanTitle =
        collection.slug === "accessories"
          ? `Lumenred ${seriesItem.code} ${size.label}`
          : collection.slug === "bundles"
            ? `Lumenred ${seriesItem.code} ${size.label}`
            : `Lumenred ${seriesItem.code} ${size.label}`;
      const handle = slugify(
        `${seriesItem.code}-${size.label}-${collection.slug}-${index}`,
      );
      const tags = [
        collection.slug,
        seriesItem.tier.toLowerCase(),
        wavelength.replace(/\//g, "-"),
        finish.toLowerCase().replace(/\s+/g, "-"),
      ];

      products.push({
        id: `lr-${String(index).padStart(4, "0")}`,
        handle,
        title: cleanTitle,
        description: `Clinical-grade red and near-infrared device from the ${seriesItem.code} ${seriesItem.tier} line. Tuned for ${wavelength} output with a ${finish.toLowerCase()} chassis, ${size.leds ? `${size.leds} dual-chip LEDs,` : "modular hardware,"} and session-ready irradiance around ${irr}. Built for home recovery setups that feel like studio equipment.`,
        price,
        compareAtPrice: compareAt,
        currency: "USD",
        collection: collection.slug,
        series: seriesItem.code,
        tier: seriesItem.tier,
        size: size.label,
        leds: size.leds,
        wavelength,
        finish,
        irradiance: irr,
        sku: `LR-${seriesItem.code.slice(0, 2).toUpperCase()}-${String(index).padStart(4, "0")}`,
        tags,
        featured: index <= 8,
        inStock: index % 17 !== 0,
        accent: index % 3,
      });
      index += 1;
    }
  }
}

while (products.length < 120) {
  const collection = collections[products.length % collections.length];
  const size = sizes[collection.slug][products.length % sizes[collection.slug].length];
  const seriesItem = series[products.length % series.length];
  const wavelength = wavelengths[products.length % wavelengths.length];
  const finish = finishes[products.length % finishes.length];
  const irr = irradiance[products.length % irradiance.length];
  const price = money(size.base * seriesItem.multiplier + (products.length % 5) * 10);
  const handle = slugify(
    `${seriesItem.code}-${size.label}-${collection.slug}-x${products.length + 1}`,
  );
  products.push({
    id: `lr-${String(products.length + 1).padStart(4, "0")}`,
    handle,
    title: `Lumenred ${seriesItem.code} ${size.label} Edition`,
    description: `Expanded ${collection.title.toLowerCase()} configuration with ${wavelength} diodes, ${finish.toLowerCase()} finish, and ${irr} peak irradiance for daily protocols.`,
    price,
    compareAtPrice: null,
    currency: "USD",
    collection: collection.slug,
    series: seriesItem.code,
    tier: seriesItem.tier,
    size: size.label,
    leds: size.leds,
    wavelength,
    finish,
    irradiance: irr,
    sku: `LR-X-${String(products.length + 1).padStart(4, "0")}`,
    tags: [collection.slug, seriesItem.tier.toLowerCase()],
    featured: false,
    inStock: true,
    accent: products.length % 3,
  });
}

mkdirSync(join(root, "data"), { recursive: true });
writeFileSync(
  join(root, "data", "collections.json"),
  JSON.stringify(collections, null, 2),
);
writeFileSync(
  join(root, "data", "products.json"),
  JSON.stringify(products, null, 2),
);

const csvEscape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
const csvHeader = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Product Category",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Status",
].join(",");

const csvRows = products.map((p) =>
  [
    p.handle,
    p.title,
    `<p>${p.description}</p><ul><li>Wavelength: ${p.wavelength}</li><li>LEDs: ${p.leds || "n/a"}</li><li>Irradiance: ${p.irradiance}</li><li>Finish: ${p.finish}</li></ul>`,
    "Lumenred",
    "Health > Fitness & Sport",
    collections.find((c) => c.slug === p.collection)?.title ?? "Red Light Therapy",
    p.tags.join(", "),
    "TRUE",
    "Finish",
    p.finish,
    p.sku,
    "2500",
    "shopify",
    p.inStock ? "25" : "0",
    "deny",
    "manual",
    p.price.toFixed(2),
    p.compareAtPrice ? p.compareAtPrice.toFixed(2) : "",
    "TRUE",
    "TRUE",
    "active",
  ]
    .map(csvEscape)
    .join(","),
);

writeFileSync(
  join(root, "data", "shopify-products.csv"),
  [csvHeader, ...csvRows].join("\n"),
);

console.log(`Generated ${products.length} products across ${collections.length} collections.`);
