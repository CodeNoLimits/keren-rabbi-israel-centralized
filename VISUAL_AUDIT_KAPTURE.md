# VISUAL AUDIT - Site Comparisons via Kapture
**Date:** 2026-02-11
**Captured via:** Kapture MCP (Chrome)

## 1. haesh-sheli.co.il (Site Original)

**URL:** https://www.haesh-sheli.co.il/
**Status:** Production (ancien site)

### Observations:
❌ **Problèmes identifiés par Yaakov:**
- Fond beige texturé très chargé
- Palette rouge/or dominant (pas orange/bleu/blanc)
- Design "kitsch" avec trop de détails
- Sensation de "oness" (surcharge visuelle)

### Screenshots:
- Hero: Livres physiques + texte hébreu sur fond beige
- Navigation: Barre rouge en haut
- Logo: Flamme en haut à droite

---

## 2. tikoun-aolam.com (Site Concurrent - Ben Sousan)

**URL:** https://tikoun-aolam.com/
**Stack:** WordPress + WooCommerce + Divi
**Langue:** Français

### Observations:
✅ **Points forts à reprendre:**
- Fond NOIR luxueux et épuré
- Or/rouge élégant (pas kitsch)
- Navigation claire et professionnelle
- Hero fort: Chaise royale ornée (image puissante)
- Bouton WhatsApp bien visible (rouge)
- Texte "Bienvenue sur le site Tikoun Aolam"
- Livraison gratuite France dès 59€

### Usage:
- Social media management (Michael Ben Sousan meeting)
- **PAS pour traductions** (task séparée sur Claude.ai)

---

## 3. haesh-sheli-new.vercel.app (Notre Version)

**URL:** https://haesh-sheli-new.vercel.app/
**Stack:** React 18 + Vite + Express
**Status:** 78/100 tasks complétés

### Homepage Observations:
✅ **Améliorations réalisées:**
- Fond bleu marine (plus propre que beige)
- Orange accent (conforme Yaakov) ✓
- Navigation structurée
- Hero avec overlay de livres
- WhatsApp + chat widgets

❌ **Gap vs demande Yaakov:**
- **Devrait être fond BLANC** (pas bleu marine)
- Style référence: Oz VeHadar + Mossad HaRav Kook = blanc épuré
- Encore trop de gradients
- Pas assez "lumineux"

### Store Page (/store) Observations:
✅ **Features implémentées:**
- Cartes produits carrées (aspect 1:1) ✓ Task 2
- Badges "PROMO" bleus ✓ Task 8
- Sidebar filtres complète
- Grid responsive 1-2-3-4 colonnes
- Coeur favoris visible sur cartes
- 43 produits affichés

❌ **Reste à faire:**
- Fond sidebar trop sombre
- Cartes produits sur fond blanc OK mais entourées de bleu marine
- Besoin plus de contraste blanc/orange/bleu

---

## RECOMMANDATIONS VISUELLES (Tasks 33-36)

### Priority 1: Fond Blanc (Task 34)
```css
/* Changer de: */
background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8f 100%);

/* Vers: */
background: #ffffff;
/* ou */
background: linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%);
```

### Priority 2: Simplifier Hero (Task 36)
- Enlever parallax (janky sur mobile)
- Un seul CTA clair (pas 2)
- Moins d'overlay, plus de blanc

### Priority 3: Réduire Sections (Task 33)
- Homepage: 7 sections → 4-5 max
- Fusionner sections redondantes

---

## NEXT ACTIONS

1. **Immediately:** Change homepage/store background to WHITE
2. **Session 6:** Implement Tasks 33-36 (homepage cleanup)
3. **Content:** Add 123 translations (41 products × 3 langues FR/ES/RU)
4. **Social Media:** Setup tikoun-aolam.com strategy with Ben Sousan

---

## SCREENSHOTS SAVED

All screenshots captured at 0.5x scale, WebP format, 90% quality via Kapture:
- `haesh-sheli.co.il/` - Original site hero
- `tikoun-aolam.com/` - Concurrent site (black/gold)
- `haesh-sheli-new.vercel.app/` - Our homepage (blue/orange)
- `haesh-sheli-new.vercel.app/store` - Store page with cards

**Preview URLs:** Available via Kapture localhost:61822 (session-based)

---

*Generated automatically via Kapture MCP integration*
