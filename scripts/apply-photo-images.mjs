import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const libraryDir = join(root, "assets", "photo-library");
const outDir = join(root, "public", "products");
const catalogPath = join(root, "data", "catalog.json");

mkdirSync(outDir, { recursive: true });

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const library = readdirSync(libraryDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

if (!library.length) {
  throw new Error(`No photos found in ${libraryDir}`);
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const pools = {
  "full-body-panels": [
    "ref-full-body-panel",
    "ref-panel-white",
    "ref-panel-steel",
    "photo-panel-wall",
    "photo-panel-clinic",
    "photo-panel-loft",
    "photo-ceiling-panel",
    "photo-dual-panel",
    "photo-clinic-system",
    "photo-panel-door",
    "photo-panel-cyclo",
    "photo-panel-easel",
  ],
  "desktop-panels": [
    "ref-desktop-panel",
    "photo-desk-lamp",
    "photo-nightstand-panel",
    "ref-panel-white",
    "photo-panel-easel",
  ],
  "face-masks": [
    "ref-face-mask",
    "photo-mask-vanity",
    "photo-mask-white",
    "photo-mask-rose",
    "photo-mask-clear",
  ],
  "targeted-wraps": [
    "ref-wrap",
    "photo-shoulder-wrap",
    "photo-knee-wrap",
    "photo-back-belt",
    "photo-neck-wrap",
    "photo-foot-wrap",
    "photo-elbow-wrap",
    "photo-wrist-wrap",
    "photo-hip-belt",
    "photo-calf-wrap",
    "photo-abdomen-pad",
  ],
  handheld: [
    "ref-handheld",
    "photo-wand-marble",
    "photo-scalp-comb",
    "photo-wand-slate",
    "photo-wand-dock",
  ],
  "beds-systems": [
    "ref-bed",
    "photo-bed-spa",
    "photo-clinic-system",
    "photo-home-system",
  ],
  accessories: [
    "ref-accessory-stand",
    "photo-goggles",
    "photo-case",
    "photo-remote-goggles",
    "photo-mount-kit",
    "photo-ceiling-panel",
    "photo-dust-cover",
    "photo-dolly",
  ],
  bundles: [
    "ref-bundle",
    "photo-starter-kit",
    "photo-athlete-kit",
    "photo-dual-panel",
    "photo-clinic-system",
    "photo-couple-kit",
    "photo-home-system",
  ],
};

function resolveFile(stem) {
  return library.find((f) => f.replace(/\.[^.]+$/, "") === stem);
}

function pickBases(product) {
  const pool = (pools[product.collection] || library.map((f) => f.replace(/\.[^.]+$/, ""))).filter(
    (stem) => resolveFile(stem),
  );
  const finish = String(product.finish || "").toLowerCase();
  const title = product.title.toLowerCase();
  const ranked = [...pool].sort((a, b) => {
    let sa = 0;
    let sb = 0;
    if (finish.includes("white") && a.includes("white")) sa += 3;
    if (finish.includes("white") && b.includes("white")) sb += 3;
    if (finish.includes("steel") && a.includes("steel")) sa += 3;
    if (finish.includes("steel") && b.includes("steel")) sb += 3;
    if (title.includes("knee") && a.includes("knee")) sa += 4;
    if (title.includes("knee") && b.includes("knee")) sb += 4;
    if (title.includes("shoulder") && a.includes("shoulder")) sa += 4;
    if (title.includes("neck") && a.includes("neck")) sa += 4;
    if (title.includes("foot") && a.includes("foot")) sa += 4;
    if (title.includes("goggle") && a.includes("goggle")) sa += 5;
    if (title.includes("case") && a.includes("case")) sa += 5;
    if (title.includes("mount") && a.includes("mount")) sa += 5;
    if (title.includes("kit") && a.includes("kit")) sa += 3;
    if (title.includes("bed") && a.includes("bed")) sa += 4;
    return sb - sa;
  });
  return ranked.length ? ranked : library.map((f) => f.replace(/\.[^.]+$/, ""));
}

async function renderProduct(product, index) {
  const bases = pickBases(product);
  const h = hash(product.handle);
  const stem = bases[index % bases.length];
  const file = resolveFile(stem) || library[h % library.length];
  const input = join(libraryDir, file);

  const meta = await sharp(input).metadata();
  const width = meta.width || 1024;
  const height = meta.height || 1280;

  // Unique crop window so shared bases still look distinct per SKU
  const cropScale = 0.82 + ((h % 15) / 100);
  const cropW = Math.floor(width * cropScale);
  const cropH = Math.floor(height * cropScale);
  const left = Math.floor(((h >> 3) % 1000) / 1000 * (width - cropW));
  const top = Math.floor(((h >> 7) % 1000) / 1000 * (height - cropH));

  const finish = String(product.finish || "").toLowerCase();
  let brightness = 1 + (((h % 17) - 8) / 100);
  let saturation = 1 + (((h % 11) - 5) / 40);
  let hue = ((h % 21) - 10) * 2;
  if (finish.includes("white")) brightness += 0.06;
  if (finish.includes("black") || finish.includes("graphite") || finish.includes("soft black")) {
    brightness -= 0.04;
  }
  if (String(product.wavelength).includes("850")) hue -= 4;
  if (String(product.wavelength).includes("660") && !String(product.wavelength).includes("850")) {
    hue += 3;
    saturation += 0.08;
  }

  const outName = `${product.handle}.webp`;
  const outPath = join(outDir, outName);
  const tmpPath = join(outDir, `${product.handle}.tmp.webp`);

  await sharp(input)
    .extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: Math.max(32, cropW),
      height: Math.max(32, cropH),
    })
    .resize(1200, 1500, { fit: "cover", position: "centre" })
    .modulate({
      brightness: Math.max(0.85, Math.min(1.18, brightness)),
      saturation: Math.max(0.85, Math.min(1.25, saturation)),
      hue,
    })
    .sharpen({ sigma: 0.7 })
    .webp({ quality: 84 })
    .toFile(tmpPath);

  try {
    renameSync(tmpPath, outPath);
  } catch {
    copyFileSync(tmpPath, outPath);
    try {
      unlinkSync(tmpPath);
    } catch {
      /* ignore */
    }
  }

  product.image = `/products/${outName}`;
  product.imageSource = file;
}

async function main() {
  console.log(`Photo library: ${library.length} files`);
  console.log(`Applying photorealistic images to ${catalog.products.length} products…`);

  // Round-robin within collection so adjacent cards use different bases
  const counters = {};
  for (const product of catalog.products) {
    const key = product.collection;
    counters[key] = counters[key] || 0;
    await renderProduct(product, counters[key]);
    counters[key] += 1;
  }

  catalog.generatedAt = new Date().toISOString();
  catalog.imageStyle = "photorealistic";
  writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));

  // Keep a tidy copy of library listing
  writeFileSync(
    join(root, "assets", "photo-library", "INDEX.json"),
    JSON.stringify({ count: library.length, files: library }, null, 2),
  );

  console.log("Done. Product images now use photorealistic photo library.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
