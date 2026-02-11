#!/bin/bash
# Setup Image Enhancement Workflow - Keren Rabbi Yisrael
# Tasks 51-54: Prepare folder structure and install tools
# Date: 2026-02-12

set -e

PROJECT_ROOT="/Users/codenolimits-dreamai-nanach/keren-rabbi-israel-centralized"
ASSETS_DIR="$PROJECT_ROOT/attached_assets"

echo "========================================="
echo "Keren Rabbi Yisrael - Image Enhancement Setup"
echo "Tasks 51-54: AI Image Processing"
echo "========================================="
echo ""

# Step 1: Create folder structure
echo "📁 Creating folder structure..."
mkdir -p "$ASSETS_DIR/original_images"
mkdir -p "$ASSETS_DIR/upscaled/2x"
mkdir -p "$ASSETS_DIR/upscaled/4x"
mkdir -p "$ASSETS_DIR/upscaled/8x"
mkdir -p "$ASSETS_DIR/enhanced/model_a"
mkdir -p "$ASSETS_DIR/enhanced/model_b"
mkdir -p "$ASSETS_DIR/backgrounds/jerusalem"
mkdir -p "$ASSETS_DIR/backgrounds/optimized"
mkdir -p "$ASSETS_DIR/test_batch"

echo "✅ Folder structure created!"
echo ""

# Step 2: Check for Homebrew
echo "🍺 Checking for Homebrew..."
if ! command -v brew &> /dev/null; then
    echo "⚠️  Homebrew not found. Installing..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "✅ Homebrew already installed"
fi
echo ""

# Step 3: Install Upscayl (for upscaling)
echo "🆙 Checking for Upscayl..."
if ! command -v upscayl &> /dev/null; then
    echo "📥 Installing Upscayl (AI image upscaler)..."
    brew install --cask upscayl
    echo "✅ Upscayl installed!"
else
    echo "✅ Upscayl already installed"
fi
echo ""

# Step 4: Install WebP tools (for image optimization)
echo "🌐 Checking for WebP tools..."
if ! command -v cwebp &> /dev/null; then
    echo "📥 Installing WebP conversion tools..."
    brew install webp
    echo "✅ WebP tools installed!"
else
    echo "✅ WebP tools already installed"
fi
echo ""

# Step 5: Install ImageMagick (optional, for advanced processing)
echo "🎨 Checking for ImageMagick..."
if ! command -v magick &> /dev/null; then
    echo "📥 Installing ImageMagick..."
    brew install imagemagick
    echo "✅ ImageMagick installed!"
else
    echo "✅ ImageMagick already installed"
fi
echo ""

# Step 6: Create README in assets folder
echo "📄 Creating README in assets folder..."
cat > "$ASSETS_DIR/README.md" << 'EOF'
# Product Image Assets - Keren Rabbi Yisrael

## Folder Structure

```
attached_assets/
├── original_images/         # Original product photos (backup)
├── upscaled/
│   ├── 2x/                 # 2x upscaled (quick processing)
│   ├── 4x/                 # 4x upscaled (standard quality)
│   └── 8x/                 # 8x upscaled (print-ready)
├── enhanced/
│   ├── model_a/            # Model A: Better lighting, clean background
│   └── model_b/            # Model B: Genspark clean style (white bg)
├── backgrounds/
│   ├── jerusalem/          # Jerusalem/Kotel background images
│   └── optimized/          # WebP optimized backgrounds
└── test_batch/             # Test images (5-10 products)
```

## Workflows

### Task 51: Model A - Improved Lighting
1. Use Pica AI or PhotoGrid
2. Enhance lighting, remove shadows
3. Save to `enhanced/model_a/`

### Task 52: Model B - Clean Genspark Style
1. Remove background (remove.bg)
2. Add white/neutral background (Canva/Photopea)
3. Save to `enhanced/model_b/`

### Task 53: Jerusalem Backgrounds
1. Download from Unsplash/Freepik
2. Optimize with Squoosh
3. Save to `backgrounds/jerusalem/`

### Task 54: High-Resolution Upscaling
1. Open Upscayl app
2. Batch upscale to 4x
3. Save to `upscaled/4x/`

## See Full Guide
📖 Read IMAGE_ENHANCEMENT_GUIDE.md for complete instructions
EOF

echo "✅ README created!"
echo ""

# Step 7: Create test image list
echo "📋 Creating test image list..."
cat > "$PROJECT_ROOT/scripts/test-products.txt" << 'EOF'
# Test Products for Image Enhancement (5-10 best-sellers)
# Priority order - process these first

1. ליקוטי מוהר"ן (Likutei Moharan)
2. ליקוטי עצות (Likutei Etzot)
3. ליקוטי תפילות (Likutei Tefilot)
4. ספר המידות (Sefer HaMidot)
5. סיפורי מעשיות (Sipurei Maasiot)
6. שבחי הר"ן (Shivchei HaRan)
7. חיי מוהר"ן (Chayei Moharan)
8. שיחות הר"ן (Sichot HaRan)
9. קיצור ליקוטי מוהר"ן (Kitzur Likutei Moharan)
10. ספר מדות (Sefer Midot)

# Next batch: All remaining 33 products
EOF

echo "✅ Test product list created!"
echo ""

# Step 8: Create quick-start guide
cat > "$PROJECT_ROOT/QUICK_START_IMAGE_ENHANCEMENT.md" << 'EOF'
# Quick Start - Image Enhancement (30 min)

## For David's ADHD Workflow: One Task at a Time

### ⏱️ Task 1: Install Upscayl (5 min)
```bash
cd ~/keren-rabbi-israel-centralized
bash scripts/setup-image-enhancement.sh
```
**Result:** All tools installed, folders ready

---

### ⏱️ Task 2: Download Test Images (10 min)
1. Go to Unsplash: https://unsplash.com/s/photos/western-wall
2. Download 3 Jerusalem images:
   - Jerusalem skyline sunset (hero background)
   - Kotel stone close-up (texture)
   - Old City panorama (category header)
3. Save to: `attached_assets/backgrounds/jerusalem/`

---

### ⏱️ Task 3: Test Upscaling (10 min)
1. Open Upscayl app (in Applications)
2. Select one test image
3. Choose "General Photo" model
4. Upscale to 4x
5. Compare before/after
6. Save to: `attached_assets/upscaled/4x/`

---

### ⏱️ Task 4: Test Pica AI Enhancement (5 min)
1. Go to: https://pica-ai.com
2. Upload same test image
3. Click "Enhance Lighting"
4. Download result
5. Save to: `attached_assets/enhanced/model_a/`

---

## Next Session: Full Batch Processing
See IMAGE_ENHANCEMENT_GUIDE.md for complete workflow

**Estimated total time for all 43 products: 3-4 hours**
EOF

echo "✅ Quick start guide created!"
echo ""

# Step 9: Create conversion script for WebP
cat > "$PROJECT_ROOT/scripts/convert-to-webp.sh" << 'WEBPEOF'
#!/bin/bash
# Convert JPG/PNG images to WebP format
# Usage: ./convert-to-webp.sh <input_folder>

INPUT_DIR="${1:-../attached_assets/upscaled/4x}"
QUALITY="${2:-85}"

if [ ! -d "$INPUT_DIR" ]; then
    echo "❌ Directory not found: $INPUT_DIR"
    exit 1
fi

cd "$INPUT_DIR" || exit

echo "🌐 Converting images to WebP (quality: $QUALITY%)..."
echo "📁 Input folder: $INPUT_DIR"
echo ""

count=0
for img in *.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
    if [ -f "$img" ]; then
        output="${img%.*}.webp"
        cwebp -q "$QUALITY" "$img" -o "$output" 2>/dev/null
        if [ $? -eq 0 ]; then
            original_size=$(stat -f%z "$img")
            webp_size=$(stat -f%z "$output")
            reduction=$(( (original_size - webp_size) * 100 / original_size ))
            echo "✅ $img → $output (${reduction}% smaller)"
            ((count++))
        fi
    fi
done

echo ""
echo "✅ Converted $count images to WebP!"
WEBPEOF

chmod +x "$PROJECT_ROOT/scripts/convert-to-webp.sh"
echo "✅ WebP conversion script created!"
echo ""

# Step 10: Create batch processing summary
cat > "$PROJECT_ROOT/scripts/batch-processing-checklist.md" << 'EOF'
# Batch Processing Checklist - All 43 Products

## Phase 1: Preparation ✓
- [x] Folders created
- [x] Tools installed (Upscayl, WebP, ImageMagick)
- [ ] Original images collected
- [ ] Test batch processed (5 products)
- [ ] Settings documented

## Phase 2: Upscaling (60 min)
- [ ] All 43 images loaded into Upscayl
- [ ] Batch upscale to 4x
- [ ] Quality check each output
- [ ] Re-process any with artifacts
- [ ] Convert to WebP format

## Phase 3: Model A Enhancement (60 min)
- [ ] Process with Pica AI (5-10 at a time)
- [ ] Adjust lighting for each image
- [ ] Remove shadows and props
- [ ] Save as MODEL_A variants
- [ ] Verify Hebrew text readability

## Phase 4: Model B Clean Versions (90 min)
- [ ] Remove backgrounds (remove.bg)
- [ ] Create Canva template
- [ ] Batch process all 43 products
- [ ] Add subtle drop shadows
- [ ] Export as MODEL_B variants

## Phase 5: Jerusalem Backgrounds (30 min)
- [ ] Download 5-10 images from Unsplash
- [ ] Optimize with Squoosh (WebP)
- [ ] Save to backgrounds folder
- [ ] Create CSS classes

## Phase 6: Integration (30 min)
- [ ] Update product data files
- [ ] Test on local dev server
- [ ] Verify hover effects
- [ ] Test zoom/lightbox
- [ ] Deploy to staging

## Total Estimated Time: 4.5 hours

## Best-Selling Products (Priority First)
1. ליקוטי מוהר"ן
2. ליקוטי עצות
3. ליקוטי תפילות
4. ספר המידות
5. סיפורי מעשיות

Process these 5 first, get Yaakov's approval, then continue with remaining 38.
EOF

echo "✅ Batch processing checklist created!"
echo ""

# Step 11: Summary
echo "========================================="
echo "✅ Setup Complete!"
echo "========================================="
echo ""
echo "📂 Folders created in: $ASSETS_DIR"
echo "🛠️  Tools installed:"
echo "   - Upscayl (AI upscaler)"
echo "   - WebP tools (image optimization)"
echo "   - ImageMagick (advanced processing)"
echo ""
echo "📚 Documentation created:"
echo "   - IMAGE_ENHANCEMENT_GUIDE.md (full guide)"
echo "   - QUICK_START_IMAGE_ENHANCEMENT.md (30 min start)"
echo "   - attached_assets/README.md (folder structure)"
echo "   - scripts/convert-to-webp.sh (automation)"
echo "   - scripts/batch-processing-checklist.md (progress tracking)"
echo ""
echo "🚀 Next Steps:"
echo "   1. Read QUICK_START_IMAGE_ENHANCEMENT.md"
echo "   2. Download Jerusalem backgrounds from Unsplash"
echo "   3. Process 5 test products"
echo "   4. Get Yaakov's approval"
echo "   5. Batch process all 43 products"
echo ""
echo "⏱️  Estimated time for full batch: 3-4 hours"
echo ""
echo "========================================="
echo "Happy enhancing! 📸✨"
echo "========================================="
