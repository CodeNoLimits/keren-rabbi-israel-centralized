# ✅ PLAN DE VÉRIFICATION EXHAUSTIF - 100 POINTS

**Date:** 2 novembre 2025  
**Objectif:** Vérification complète de la cohérence visuelle, inventaire, et qualité du site Keren

---

## 🎨 CATÉGORIE 1: SIDEBAR & FILTRES (20 points)

### Section Header Sidebar
- [ ] **1.** Header sidebar - Titre "סינון" visible et lisible
- [ ] **2.** Bouton "נקה הכל" (Clear All) fonctionne correctement
- [ ] **3.** Icône X visible sur bouton Clear All
- [ ] **4.** Champ de recherche visible et fonctionnel
- [ ] **5.** Icône Search visible dans le champ de recherche

### Filtre Prix
- [ ] **6.** Section "טווח מחירים" avec fond bleu/orange visible
- [ ] **7.** Titre "טווח מחירים" en blanc et lisible
- [ ] **8.** Slider de prix fonctionne (drag)
- [ ] **9.** Prix min affiché en blanc et lisible (pas gris)
- [ ] **10.** Prix max affiché en blanc et lisible (pas gris)
- [ ] **11.** Chevron up/down fonctionne pour replier/déplier
- [ ] **12.** Bordure orange (#f97316) visible autour du filtre

### Filtre Auteurs
- [ ] **13.** Section "מחברים" avec fond bleu/orange visible
- [ ] **14.** Titre "מחברים" en blanc et lisible
- [ ] **15.** Sous-sections (רבי נחמן, רבי נתן, אחרים) visibles
- [ ] **16.** Textes des auteurs en blanc et lisibles
- [ ] **17.** Checkboxes fonctionnelles
- [ ] **18.** Texte orange (#f97316) pour les sous-titres de groupes

### Filtre Langues
- [ ] **19.** Section "שפות" avec fond bleu/orange visible
- [ ] **20.** Les 3 langues (עברית, Français, English) toujours affichées
- [ ] **21.** Textes des langues en blanc et lisibles
- [ ] **22.** Checkboxes fonctionnelles

### Filtre Catégories
- [ ] **23.** Section "קטגוריות" avec fond bleu/orange visible
- [ ] **24.** Titre "קטגוריות" en blanc et lisible
- [ ] **25.** Liste des catégories en blanc (PAS en gris)
- [ ] **26.** Scroll vertical fonctionne si plus de 48px de hauteur
- [ ] **27.** Checkboxes fonctionnelles

### Filtre Tailles
- [ ] **28.** Section "גדלים" avec fond bleu/orange visible
- [ ] **29.** Titre "גדלים" en blanc et lisible
- [ ] **30.** Liste des tailles en blanc (PAS en gris)
- [ ] **31.** Checkboxes fonctionnelles

### Filtre Formats
- [ ] **32.** Section "כריכות" avec fond bleu/orange visible
- [ ] **33.** Titre "כריכות" en blanc et lisible
- [ ] **34.** Liste des formats en blanc (PAS en gris)
- [ ] **35.** Message "ועוד X אפשרויות" en blanc/transparent (pas gris)
- [ ] **36.** Scroll vertical fonctionne
- [ ] **37.** Maximum 12 formats affichés avec message "ועוד"

### Cohérence Visuelle Sidebar
- [ ] **38.** Tous les filtres utilisent le même style (bleu #1e40af + orange #f97316)
- [ ] **39.** Pas de texte gris sur fond bleu nulle part
- [ ] **40.** Toutes les bordures orange sont visibles et cohérentes

---

## 📦 CATÉGORIE 2: GRILLE PRODUITS (15 points)

### Affichage
- [ ] **41.** Grille responsive (1 col mobile, 2 tablette, 3-4 desktop)
- [ ] **42.** Cards produits avec ombre et bordure grise
- [ ] **43.** Hover effect: bordure orange + translation vers le haut
- [ ] **44.** Effet 3D (rotation légère) appliqué aux cards

### Card Produit
- [ ] **45.** Image produit visible (ou placeholder 📖 si manquante)
- [ ] **46.** Titre produit en hébreu lisible
- [ ] **47.** Prix affiché correctement (min-max ou prix unique)
- [ ] **48.** Catégorie affichée sous le prix
- [ ] **49.** Bouton "צפייה בפרטים" visible et stylé (bleu)
- [ ] **50.** Bouton hover avec effet (shadow-lg)

### Étagères Décoratives
- [ ] **51.** Étagère supérieure (bois) visible au-dessus des produits
- [ ] **52.** Étagère inférieure (bois) visible en dessous
- [ ] **53.** Support étagère sous chaque livre visible

### Résultats
- [ ] **54.** Compteur "נמצאו X מתוך Y ספרים" visible en haut
- [ ] **55.** Message "לא נמצאו תוצאות" affiché si aucun résultat

---

## 🔍 CATÉGORIE 3: INVENTAIRE PRODUITS (25 points)

### Vérification Données
- [ ] **56.** Tous les produits ont un ID unique
- [ ] **57.** Tous les produits ont un nom en hébreu
- [ ] **58.** Tous les produits ont un nameEnglish (ou null explicite)
- [ ] **59.** Tous les produits ont une catégorie définie
- [ ] **60.** Tous les produits ont un auteur défini

### Noms et Descriptions
- [ ] **61.** Comparer chaque nom hébreu avec CSV d'inventaire
- [ ] **62.** Comparer chaque nameEnglish avec CSV d'inventaire
- [ ] **63.** Vérifier orthographe cohérente (Likutei vs Likutey)
- [ ] **64.** Descriptions hébreu complètes et cohérentes
- [ ] **65.** Descriptions anglais complètes (si disponibles)

### Langues
- [ ] **66.** Champ `language` défini pour chaque produit
- [ ] **67.** Identifier produits en anglais (si présents)
- [ ] **68.** Identifier produits en français (si présents)
- [ ] **69.** Langue cohérente entre language et contenu réel
- [ ] **70.** Trier produits par langue si nécessaire

### Images
- [ ] **71.** Toutes les images ont un chemin valide
- [ ] **72.** Vérifier que les images existent dans /attached_assets/
- [ ] **73.** Images en format correct (.jpg, .png)
- [ ] **74.** Pas d'images manquantes (404)
- [ ] **75.** Au moins une image par produit

### Variantes
- [ ] **76.** Chaque produit a au moins une variante
- [ ] **77.** Chaque variante a un prix défini
- [ ] **78.** Chaque variante a un format défini (ou null)
- [ ] **79.** Chaque variante a une taille définie (ou null)
- [ ] **80.** Prix cohérents (pas de prix négatifs ou nuls)

---

## 📱 CATÉGORIE 4: RESPONSIVE DESIGN (10 points)

### Mobile (< 768px)
- [ ] **81.** Sidebar repliable fonctionne
- [ ] **82.** Bouton Filter visible et fonctionnel
- [ ] **83.** Grille 1 colonne sur mobile
- [ ] **84.** Texte lisible (pas trop petit)
- [ ] **85.** Images produits responsives

### Tablette (768px - 1024px)
- [ ] **86.** Grille 2-3 colonnes selon largeur
- [ ] **87.** Sidebar adaptée à la largeur

### Desktop (> 1024px)
- [ ] **88.** Grille 3-4 colonnes
- [ ] **89.** Sidebar 320px (w-80) visible par défaut
- [ ] **90.** Espacement cohérent partout

---

## 🧭 CATÉGORIE 5: NAVIGATION & HEADER (10 points)

### Header
- [ ] **91.** Header visible en haut de toutes les pages
- [ ] **92.** Navigation principale fonctionnelle (דף הבית, חנות, etc.)
- [ ] **93.** Changement de langue fonctionne
- [ ] **94.** Panier visible et fonctionnel
- [ ] **95.** Logo/icône visible

### Breadcrumbs & Navigation
- [ ] **96.** Lien vers produit depuis card fonctionne
- [ ] **97.** Lien vers store depuis autres pages fonctionne
- [ ] **98.** Navigation RTL correcte en hébreu
- [ ] **99.** Navigation LTR correcte en français/anglais
- [ ] **100.** Pas de liens cassés (404)

---

## 📊 RÉSUMÉ STATISTIQUES

- **Total points:** 100
- **Points vérifiés:** ___ / 100
- **Points OK:** ___ / 100
- **Points à corriger:** ___ / 100
- **Taux de réussite:** ___%

---

## 🔧 ACTIONS CORRECTIVES

Liste des problèmes détectés et actions à prendre:

```
[À remplir lors de la vérification]
```

---

## 📝 NOTES

```
[Espace pour notes et observations]
```

---

## ✅ VALIDATION FINALE

- [ ] **Validation visuelle complète** - Tous les points vérifiés
- [ ] **Inventaire vérifié** - Tous les produits cohérents
- [ ] **Tests responsive** - Mobile/Tablette/Desktop OK
- [ ] **Navigation testée** - Tous les liens fonctionnent
- [ ] **Prêt pour production** - Site 100% cohérent

---

**Date de validation:** ___ / ___ / 2025  
**Validé par:** ___

