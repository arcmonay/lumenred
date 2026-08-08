import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "products");
mkdirSync(outDir, { recursive: true });

const catalogPath = join(root, "data", "catalog.json");
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));

const W = 1200;
const H = 1500;

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function deviceSvg(product) {
  const seed = hash(product.handle);
  const tone = product.imageTone ?? seed % 360;
  const red = 200 + (seed % 40);
  const glow = `rgb(${red}, ${30 + (seed % 40)}, ${40 + (seed % 30)})`;
  const glowSoft = `rgba(${red}, 40, 50, 0.45)`;
  const finish = String(product.finish || "").toLowerCase();
  const chassis =
    finish.includes("white") || finish.includes("arctic")
      ? "#d8d5cf"
      : finish.includes("steel")
        ? "#8a9099"
        : "#1a1f26";
  const chassis2 =
    finish.includes("white") || finish.includes("arctic") ? "#bdb8ae" : "#0e1218";

  const cols = clamp(4 + Math.floor((product.leds || 40) / 80), 4, 12);
  const rows = clamp(6 + Math.floor((product.leds || 40) / 60), 6, 18);
  const label = product.title
    .replace(/Lumenred\s+/i, "")
    .slice(0, 28)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;");

  let device = "";

  switch (product.collection) {
    case "full-body-panels":
    case "desktop-panels": {
      const pw = product.collection === "desktop-panels" ? 340 : 300;
      const ph = product.collection === "desktop-panels" ? 420 : 780;
      const x = (W - pw) / 2;
      const y = (H - ph) / 2 - 40;
      const cellW = (pw - 48) / cols;
      const cellH = (ph - 48) / rows;
      let leds = "";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitter = ((seed + r * 17 + c * 31) % 5) - 2;
          const lx = x + 24 + c * cellW + cellW / 2;
          const ly = y + 24 + r * cellH + cellH / 2;
          const rad = Math.min(cellW, cellH) * 0.28;
          leds += `<circle cx="${lx}" cy="${ly + jitter}" r="${rad}" fill="${glow}" opacity="0.95"/>`;
        }
      }
      device = `
        <rect x="${x}" y="${y}" width="${pw}" height="${ph}" rx="10" fill="url(#chassis)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
        <rect x="${x + 16}" y="${y + 16}" width="${pw - 32}" height="${ph - 32}" rx="6" fill="#0a0d12"/>
        ${leds}
        <rect x="${x + pw * 0.35}" y="${y + ph - 10}" width="${pw * 0.3}" height="18" rx="3" fill="${chassis2}"/>
      `;
      break;
    }
    case "face-masks": {
      device = `
        <ellipse cx="600" cy="700" rx="260" ry="300" fill="url(#chassis)" stroke="rgba(255,255,255,0.14)" stroke-width="3"/>
        <ellipse cx="600" cy="700" rx="210" ry="250" fill="#12161c"/>
        <ellipse cx="520" cy="660" rx="38" ry="28" fill="#05070a"/>
        <ellipse cx="680" cy="660" rx="38" ry="28" fill="#05070a"/>
        <ellipse cx="600" cy="780" rx="50" ry="18" fill="#05070a" opacity="0.7"/>
        ${Array.from({ length: 36 }, (_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const rx = 170 + (i % 3) * 18;
          const ry = 200 + (i % 2) * 16;
          const cx = 600 + Math.cos(a) * rx;
          const cy = 700 + Math.sin(a) * ry;
          return `<circle cx="${cx}" cy="${cy}" r="7" fill="${glow}"/>`;
        }).join("")}
        <path d="M340 520 Q600 420 860 520" fill="none" stroke="${chassis}" stroke-width="18" stroke-linecap="round"/>
      `;
      break;
    }
    case "targeted-wraps": {
      device = `
        <rect x="220" y="620" width="760" height="220" rx="110" fill="url(#chassis)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
        <rect x="270" y="670" width="660" height="120" rx="60" fill="#10141a"/>
        ${Array.from({ length: 18 }, (_, i) => {
          const x = 300 + i * 36;
          return `<circle cx="${x}" cy="730" r="10" fill="${glow}"/><circle cx="${x}" cy="700" r="8" fill="${glow}" opacity="0.75"/>`;
        }).join("")}
        <rect x="200" y="690" width="40" height="80" rx="12" fill="${chassis2}"/>
        <rect x="960" y="690" width="40" height="80" rx="12" fill="${chassis2}"/>
      `;
      break;
    }
    case "handheld": {
      device = `
        <rect x="540" y="380" width="120" height="680" rx="60" fill="url(#chassis)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
        <rect x="560" y="410" width="80" height="140" rx="28" fill="${glow}" opacity="0.95"/>
        <circle cx="600" cy="480" r="26" fill="#fff" opacity="0.2"/>
        <rect x="575" y="600" width="50" height="20" rx="6" fill="#2a313b"/>
        <rect x="575" y="640" width="50" height="20" rx="6" fill="#2a313b"/>
        <rect x="570" y="900" width="60" height="100" rx="20" fill="${chassis2}"/>
      `;
      break;
    }
    case "beds-systems": {
      device = `
        <rect x="180" y="520" width="840" height="420" rx="28" fill="url(#chassis)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
        <rect x="220" y="560" width="760" height="280" rx="18" fill="#0b0e13"/>
        ${Array.from({ length: 10 }, (_, r) =>
          Array.from({ length: 20 }, (_, c) => {
            const x = 250 + c * 36;
            const y = 590 + r * 24;
            return `<circle cx="${x}" cy="${y}" r="5" fill="${glow}" opacity="${0.7 + ((c + r) % 3) * 0.1}"/>`;
          }).join(""),
        ).join("")}
        <rect x="240" y="870" width="720" height="40" rx="10" fill="${chassis2}"/>
      `;
      break;
    }
    case "bundles": {
      device = `
        <rect x="300" y="480" width="260" height="520" rx="12" fill="url(#chassis)" transform="rotate(-8 430 740)"/>
        <rect x="620" y="520" width="220" height="420" rx="12" fill="url(#chassis)" transform="rotate(7 730 730)"/>
        <rect x="330" y="520" width="200" height="420" rx="8" fill="#0b0e13" transform="rotate(-8 430 740)"/>
        <rect x="645" y="555" width="170" height="330" rx="8" fill="#0b0e13" transform="rotate(7 730 730)"/>
        ${Array.from({ length: 40 }, (_, i) => {
          const x = 360 + (i % 5) * 32;
          const y = 560 + Math.floor(i / 5) * 40;
          return `<circle cx="${x}" cy="${y}" r="6" fill="${glow}" transform="rotate(-8 430 740)"/>`;
        }).join("")}
        <rect x="420" y="980" width="360" height="70" rx="12" fill="${chassis2}"/>
        <text x="600" y="1024" text-anchor="middle" fill="#d7d2c8" font-family="Arial, sans-serif" font-size="28" font-weight="700">KIT</text>
      `;
      break;
    }
    default: {
      // accessories
      const kind = seed % 4;
      if (kind === 0) {
        device = `
          <rect x="470" y="420" width="40" height="560" rx="8" fill="url(#chassis)"/>
          <circle cx="490" cy="1000" r="90" fill="${chassis2}" stroke="rgba(255,255,255,0.1)" stroke-width="3"/>
          <circle cx="490" cy="1000" r="40" fill="#0b0e13"/>
          <rect x="560" y="500" width="220" height="300" rx="10" fill="url(#chassis)"/>
          <rect x="580" y="520" width="180" height="240" rx="6" fill="#0b0e13"/>
          ${Array.from({ length: 24 }, (_, i) => {
            const x = 600 + (i % 4) * 36;
            const y = 545 + Math.floor(i / 4) * 36;
            return `<circle cx="${x}" cy="${y}" r="7" fill="${glow}"/>`;
          }).join("")}
        `;
      } else if (kind === 1) {
        device = `
          <ellipse cx="600" cy="720" rx="220" ry="90" fill="url(#chassis)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
          <ellipse cx="600" cy="720" rx="150" ry="50" fill="#0b0e13"/>
          <path d="M420 700 Q600 640 780 700" fill="none" stroke="${glow}" stroke-width="8"/>
          <path d="M430 740 Q600 800 770 740" fill="none" stroke="${glow}" stroke-width="8"/>
        `;
      } else if (kind === 2) {
        device = `
          <rect x="360" y="560" width="480" height="320" rx="24" fill="url(#chassis)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
          <rect x="390" y="595" width="420" height="200" rx="12" fill="#10141a"/>
          <circle cx="600" cy="695" r="54" fill="${glow}" opacity="0.85"/>
          <circle cx="600" cy="695" r="24" fill="#fff" opacity="0.25"/>
          <rect x="430" y="830" width="340" height="24" rx="8" fill="${chassis2}"/>
        `;
      } else {
        device = `
          <rect x="410" y="500" width="380" height="480" rx="28" fill="url(#chassis)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
          <rect x="450" y="560" width="300" height="320" rx="16" fill="#10141a"/>
          <text x="600" y="730" text-anchor="middle" fill="${glow}" font-family="Arial, sans-serif" font-size="64" font-weight="700">LR</text>
          <rect x="480" y="920" width="240" height="28" rx="8" fill="${chassis2}"/>
        `;
      }
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c2129"/>
      <stop offset="55%" stop-color="#12151c"/>
      <stop offset="100%" stop-color="#0a0c10"/>
    </linearGradient>
    <linearGradient id="chassis" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${chassis}"/>
      <stop offset="100%" stop-color="${chassis2}"/>
    </linearGradient>
    <radialGradient id="bloom" cx="50%" cy="42%" r="45%">
      <stop offset="0%" stop-color="${glowSoft}"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#bloom)"/>
  <circle cx="900" cy="280" r="220" fill="${glow}" opacity="0.08"/>
  ${device}
  <rect x="60" y="${H - 150}" width="${W - 120}" height="70" rx="0" fill="rgba(0,0,0,0.25)"/>
  <text x="80" y="${H - 105}" fill="#f3f1ec" font-family="Georgia, serif" font-size="34">${label}</text>
  <text x="80" y="${H - 72}" fill="#9aa1ab" font-family="Arial, sans-serif" font-size="20">${product.wavelength} · ${product.sku}</text>
</svg>`;
}

async function main() {
  console.log(`Generating images for ${catalog.products.length} products…`);
  let done = 0;

  for (const product of catalog.products) {
    const svg = deviceSvg(product);
    const file = `${product.handle}.webp`;
    const abs = join(outDir, file);
    await sharp(Buffer.from(svg))
      .webp({ quality: 82 })
      .toFile(abs);
    product.image = `/products/${file}`;
    done += 1;
    if (done % 20 === 0 || done === catalog.products.length) {
      console.log(`  ${done}/${catalog.products.length}`);
    }
  }

  catalog.generatedAt = new Date().toISOString();
  writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
  console.log(`Updated ${catalogPath}`);
  console.log(`Images written to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
