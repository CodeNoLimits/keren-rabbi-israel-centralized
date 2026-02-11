# 🚀 Guide de Test Lighthouse

## Quick Start

### 1. Build Optimisé
```bash
npm run build:client
```

### 2. Lancer le serveur de production
```bash
npm run start:prod
```

### 3. Tester avec Lighthouse

#### Option A: Chrome DevTools (Recommandé)
1. Ouvrir Chrome
2. Aller sur `http://localhost:5000` (ou le port configuré)
3. F12 → Onglet "Lighthouse"
4. Sélectionner:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
5. Device: **Mobile** (plus strict)
6. Throttling: **Simulated throttling**
7. Cliquer "Analyze page load"

#### Option B: CLI (automatisé)
```bash
npm install -g lighthouse
lighthouse http://localhost:5000 --view
```

#### Option C: CI/CD
```bash
lighthouse http://localhost:5000 \
  --output json \
  --output html \
  --output-path ./lighthouse-report
```

## 📊 Scores Attendus

| Métrique | Avant | Objectif | Estimation |
|----------|-------|----------|------------|
| **Performance** | 58 | 85+ | **88-92** |
| **Accessibility** | ? | 90+ | **92-95** |
| **Best Practices** | ? | 90+ | **95** |
| **SEO** | ? | 90+ | **95+** |

## 🎯 Métriques Clés à Surveiller

### Performance
- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TBT** (Total Blocking Time): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Speed Index**: < 3.4s

### Vérifications
```bash
# Vérifier que la compression fonctionne
curl -I -H "Accept-Encoding: gzip" http://localhost:5000

# Doit retourner: Content-Encoding: gzip
```

## ✅ Checklist Pre-Test

- [ ] `npm run build:client` sans erreurs
- [ ] Server en mode production (`NODE_ENV=production`)
- [ ] Compression gzip/brotli activée
- [ ] Cache headers configurés (si possible)
- [ ] HTTPS activé (si en production)

## 🔧 Si le score est < 85

### Performance
1. **Vérifier le bundle size:**
   ```bash
   ./check-bundle.sh
   ```

2. **Identifier les gros chunks:**
   - React vendor: OK si < 50KB gzip
   - UI vendor: OK si < 45KB gzip
   - Radix UI: OK si < 25KB gzip

3. **Images non optimisées:**
   ```bash
   # Convertir en WebP
   find public -name "*.png" -exec cwebp {} -o {}.webp \;
   ```

### Best Practices
- Console warnings en production → vérifier terser config
- HTTP/2 non activé → configurer le serveur

### Accessibility
- Alt text manquant → vérifier toutes les images
- Contrast ratio → vérifier les couleurs

## 📈 Optimisations Avancées (95+)

### 1. Service Worker
```javascript
// public/sw.js déjà présent
// Vérifier qu'il cache correctement
```

### 2. Critical CSS Inline
```bash
npm install --save-dev critical
```

### 3. Image Optimization
```bash
# Installer imagemin
npm install --save-dev imagemin imagemin-webp

# Automatiser la conversion
npm run optimize:images
```

### 4. Preload Critical Resources
```html
<!-- Dans client/index.html -->
<link rel="preload" as="font" href="/fonts/main.woff2" crossorigin>
<link rel="preload" as="image" href="/hero.webp">
```

### 5. HTTP/2 Server Push
```javascript
// Dans server/index.ts
app.use((req, res, next) => {
  res.setHeader('Link', '</assets/main.js>; rel=preload; as=script');
  next();
});
```

## 🐛 Debugging

### Build Warnings
```bash
# Voir les warnings détaillés
npm run build:client -- --mode development
```

### Bundle Analysis
```bash
# Installer rollup-plugin-visualizer
npm install --save-dev rollup-plugin-visualizer

# Ajouter dans vite.config.ts:
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  visualizer({ open: true })
]
```

### Network Throttling
Chrome DevTools → Network → Throttling → "Slow 3G"

## 📸 Screenshot des Résultats

Après le test, sauvegarder:
```bash
lighthouse http://localhost:5000 \
  --output html \
  --output-path ./lighthouse-report-$(date +%Y%m%d).html
```

## 🎉 Success Criteria

- ✅ Performance: **85+**
- ✅ FCP: **< 2s**
- ✅ LCP: **< 3s**
- ✅ TBT: **< 300ms**
- ✅ Bundle gzip: **< 200KB** (main chunks)
- ✅ Images: **lazy loaded**
- ✅ Fonts: **async loaded**

---

**Happy Optimizing! 🚀**
