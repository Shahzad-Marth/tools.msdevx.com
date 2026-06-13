const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const PNG_PATH = path.join(__dirname, "..", "public", "favicon.png");
const OUT_DIR = path.join(__dirname, "..", "public", "icons");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function generate() {
  const pngBuffer = fs.readFileSync(PNG_PATH);

  for (const size of SIZES) {
    const outPath = path.join(OUT_DIR, `icon-${size}x${size}.png`);
    await sharp(pngBuffer)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`Generated ${outPath}`);
  }

  // Also generate apple-touch-icon (180x180)
  await sharp(pngBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, "..", "public", "icons", "apple-touch-icon.png"));
  console.log("Generated icons/apple-touch-icon.png (180x180)");

  // Generate android-chrome-192x192.png
  await sharp(pngBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, "..", "public", "icons", "android-chrome-192x192.png"));
  console.log("Generated icons/android-chrome-192x192.png");

  // Generate android-chrome-512x512.png
  await sharp(pngBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, "..", "public", "icons", "android-chrome-512x512.png"));
  console.log("Generated icons/android-chrome-512x512.png");

  // Copy 192 as web-app-manifest-192x192.png
  await sharp(pngBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, "..", "public", "web-app-manifest-192x192.png"));
  console.log("Generated web-app-manifest-192x192.png");

  // Copy 512 as web-app-manifest-512x512.png
  await sharp(pngBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, "..", "public", "web-app-manifest-512x512.png"));
  console.log("Generated web-app-manifest-512x512.png");
}

generate().catch(console.error);
