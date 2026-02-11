#!/bin/bash
echo "🔍 Analyse du bundle après optimisations..."
echo ""
echo "📦 Taille des principaux chunks (gzip):"
echo "----------------------------------------"
du -h dist/public/assets/*.js.gz 2>/dev/null | sort -hr | head -10
echo ""
echo "🎨 Taille du CSS (gzip):"
echo "----------------------------------------"
du -h dist/public/assets/*.css.gz 2>/dev/null
echo ""
echo "📊 Total bundle size:"
echo "----------------------------------------"
du -sh dist/public/assets/
echo ""
echo "✅ Optimizations applied:"
echo "  - Code splitting (React.lazy + Suspense)"
echo "  - Lazy loading images (34 images)"
echo "  - Manual chunks (Radix UI, React, vendors)"
echo "  - Gzip + Brotli compression"
echo "  - Terser minification"
echo "  - Font loading optimized"
echo ""
