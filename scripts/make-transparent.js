const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processImage(inputPath, outputPath, darkThreshold = 14, featherThreshold = 40) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const inIdx = i * channels;
    const outIdx = i * 4;
    const r = data[inIdx], g = data[inIdx + 1], b = data[inIdx + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    out[outIdx] = r;
    out[outIdx + 1] = g;
    out[outIdx + 2] = b;

    if (lum < darkThreshold) {
      out[outIdx + 3] = 0;
    } else if (lum < featherThreshold) {
      out[outIdx + 3] = Math.round(((lum - darkThreshold) / (featherThreshold - darkThreshold)) * 255);
    } else {
      out[outIdx + 3] = 255;
    }
  }

  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outputPath);
  console.log(`Saved transparent PNG: ${outputPath}`);
}

const args = process.argv.slice(2);
if (args.length >= 2) {
  processImage(args[0], args[1], args[2] ? Number(args[2]) : 14, args[3] ? Number(args[3]) : 40)
    .catch(console.error);
} else {
  console.log('Usage: node make-transparent.js <input> <output> [darkThreshold] [featherThreshold]');
}
