/**
 * Task 66: Image Optimization Pipeline
 * Converts product images to WebP format with multiple sizes
 * Usage: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'attached_assets');
const OUTPUT_DIR = path.join(__dirname, '..', 'attached_assets', 'optimized');

// Image size configurations
const SIZES = {
  thumbnail: { width: 200, height: 200 },
  card: { width: 400, height: 400 },
  full: { width: 800, height: 800 },
  large: { width: 1200, height: 1200 },
};

// WebP quality setting (0-100)
const WEBP_QUALITY = 85;

/**
 * Convert a single image to WebP in multiple sizes
 */
async function convertImage(inputPath, filename) {
  const baseName = path.parse(filename).name;
  const outputDir = path.join(OUTPUT_DIR, baseName);

  // Create output directory for this image
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Processing: ${filename}`);

  try {
    // Generate each size
    for (const [sizeName, { width, height }] of Object.entries(SIZES)) {
      const outputPath = path.join(outputDir, `${baseName}-${sizeName}.webp`);

      await sharp(inputPath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`  ✓ ${sizeName}: ${(stats.size / 1024).toFixed(2)} KB`);
    }

    // Also create an original-size WebP
    const originalOutputPath = path.join(outputDir, `${baseName}-original.webp`);
    await sharp(inputPath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(originalOutputPath);

    const stats = fs.statSync(originalOutputPath);
    console.log(`  ✓ original: ${(stats.size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error.message);
  }
}

/**
 * Process all images in the assets directory
 */
async function processAllImages() {
  console.log('Starting image optimization...\n');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all image files
  const files = fs.readdirSync(ASSETS_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('No images found to process.');
    return;
  }

  console.log(`Found ${imageFiles.length} images to process.\n`);

  // Process each image
  for (const file of imageFiles) {
    const inputPath = path.join(ASSETS_DIR, file);
    await convertImage(inputPath, file);
    console.log('');
  }

  console.log(`\nOptimization complete!`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

/**
 * Generate HTML <picture> element for responsive images
 */
function generatePictureElement(baseName, alt) {
  const outputDir = `/attached_assets/optimized/${baseName}`;

  return `
<picture>
  <source
    media="(max-width: 400px)"
    srcset="${outputDir}/${baseName}-thumbnail.webp"
    type="image/webp"
  />
  <source
    media="(max-width: 800px)"
    srcset="${outputDir}/${baseName}-card.webp"
    type="image/webp"
  />
  <source
    media="(max-width: 1200px)"
    srcset="${outputDir}/${baseName}-full.webp"
    type="image/webp"
  />
  <img
    src="${outputDir}/${baseName}-large.webp"
    alt="${alt}"
    loading="lazy"
    decoding="async"
  />
</picture>
  `.trim();
}

// Run the script
processAllImages().catch(console.error);

// Export helper for use in components
export { generatePictureElement };
