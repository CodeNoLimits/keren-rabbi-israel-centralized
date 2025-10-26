# 📚 SYNTHÈSE INVENTAIRE - LIVRES BRESLOV

> Inventaire complet des livres disponibles pour le site Keren Rabbi Israel

## 📊 STATISTIQUES GLOBALES

- **Total livres**: 49 livres
- **Source fichiers**:
  - Excel: `INVENTORY_BOOKS.xlsx` (36KB, liens vérifiés)
  - CSV: `INVENTORY_BOOKS.csv` (8.4KB, format Replit)
- **Provider principal**: BreslovBooks.com
- **Langues**: Hébreu (primaire), Anglais, Français

---

## 📖 CATÉGORIES PRINCIPALES

### 1. **Likutey Moharan** (Œuvre majeure)
- Likutey Moharan I & II
- Kitzur Likutey Moharan (résumés)
- Plusieurs éditions et formats

### 2. **Livres de Prières**
- Likutey Tefilot (Prières de Rabbi Nathan)
- Tikkun Chatzos (Prière de Minuit)
- Tikkun HaKlali (10 Psaumes)

### 3. **Enseignements Pratiques**
- Sefer HaMiddot (Livre des Traits de Caractère)
- Likutey Eitzos (Conseils)
- Eitzos Mevu'aros (Conseils détaillés)
- Eitzos Yesharos (Conseils droits)

### 4. **Biographies**
- Chayei Moharan (Vie de Rabbi Nachman)
- Shivchei HaRan (Louanges)
- Sichot HaRan (Conversations)

### 5. **Contes & Histoires**
- Sippurei Maasiyot (Les Contes de Rabbi Nachman)

### 6. **Brochures Thématiques** (18 brochures, 64-80 pages chacune)
- Simcha (Joie)
- Emuna (Foi)
- Teshuva (Repentance)
- Shalom (Paix)
- Emes (Vérité)
- Azamra (Ne jamais désespérer)
- Et 12 autres sujets...

### 7. **Ouvrages Avancés**
- Likutey Halachos (Lois de Rabbi Nathan)
- Kochvei Ohr (Étoiles de Lumière)
- Ohr Ha'oros (Lumière des Lumières)
- Alim Letrufah (1,088 pages!)

---

## 🔗 FORMAT DES DONNÉES

Chaque livre contient:
```csv
Nom du livre (Hébreu), Nom du livre (Anglais), Lien de téléchargement vérifié, Catégorie, Auteur, Nombre de pages, Langue
```

**Exemple:**
```csv
חיי מהר"ן, Chayei Moharan, https://breslovbooks.com/uploads/files/hebrew-chayi-maharan-version2.pdf, Chayei Moharan, Rabbi Nathan de Breslov, 640, Hébreu
```

---

## 🎯 LIVRES PRIORITAIRES POUR MVP (20+)

### Must-Have (Top 10):
1. **Likutey Moharan I** - Œuvre principale
2. **Likutey Moharan II** - Suite
3. **Sippurei Maasiyot** - Les Contes (populaire)
4. **Sefer HaMiddot** - Pratique quotidienne
5. **Likutey Tefilot** - Prières
6. **Chayei Moharan** - Biographie
7. **Sichot HaRan** - Enseignements courts
8. **Tikkun HaKlali** - 10 Psaumes (très demandé)
9. **Likutey Eitzos** - Conseils pratiques
10. **Hishtapchus HaNefesh** - Épanchement de l'âme

### Should-Have (Top 11-20):
11. Shivchei HaRan
12. Azamra (brochure populaire)
13. Simcha (Joie)
14. Emuna (Foi)
15. Teshuva (Repentance)
16. Eitzos Mevu'aros
17. Kochvei Ohr
18. Kitzur Likutey Moharan
19. Alim Letrufah
20. Ohr Ha'oros

---

## 💾 UTILISATION TECHNIQUE

### Import dans Next.js
```javascript
// /data/books.json
import booksData from '../docs/INVENTORY_BOOKS.csv'

// Parser le CSV et générer les composants
const books = parseCSV(booksData)
```

### Structure Composant BookCard
```jsx
<BookCard
  titleHe="חיי מהר"ן"
  titleEn="Chayei Moharan"
  titleFr="Vie de Rabbi Nachman"
  author="Rabbi Nathan de Breslov"
  pages={640}
  pdfUrl="https://breslovbooks.com/uploads/..."
  category="Chayei Moharan"
  language="Hébreu"
/>
```

---

## 🌐 LIENS EXTERNES

Tous les liens pointent vers **BreslovBooks.com**:
- Format: `https://breslovbooks.com/uploads/files/{filename}.pdf`
- Exemple: `https://breslovbooks.com/uploads/files/hebrew-chayi-maharan-version2.pdf`

**Alternative** (si besoin de diversifier):
- Breslov.org
- Azamra.org
- Breslev.co.il
- Amazon (certains livres imprimés)

---

## 📦 STRUCTURE CATALOGAGE RECOMMANDÉE

### Par Langue
```
/livres/hebreu     - 42 livres
/livres/anglais    - 7 livres
/livres/francais   - (à ajouter si disponibles)
```

### Par Catégorie
```
/livres/enseignements-principaux  - Likutey Moharan
/livres/prieres                   - Likutey Tefilot, Tikkun
/livres/pratique                  - Sefer HaMiddot, Eitzos
/livres/biographies              - Chayei, Shivchei, Sichot
/livres/contes                   - Sippurei Maasiyot
/livres/brochures                - 18 brochures thématiques
```

---

## 🎨 IMAGES COUVERTURES

**Note importante**: Le CSV contient les liens PDF mais **PAS les images de couvertures**.

**TODO urgent**:
1. Scanner `/attached_assets/` pour images couvertures existantes
2. Générer couvertures manquantes (screenshot 1ère page PDF)
3. Optimiser en WebP (next/image)
4. Nommer: `{nom-livre}-cover.webp`

**Commande pour trouver images existantes**:
```bash
find ~/01_PROJETS_ACTIFS/BUSINESS/haesh-sheli/attached_assets \
  -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \)
```

---

## 💰 STRATÉGIE E-COMMERCE (Phase 1)

### Option 1: Liens Directs BreslovBooks
- **Avantage**: Gratuit, pas de gestion stock
- **Inconvénient**: Pas de revenu direct

### Option 2: Programme Affiliation
- Négocier affiliation avec BreslovBooks.com (si possible)
- Commission sur ventes référées (5-10%)

### Option 3: Vente Directe (Phase 2)
- Acheter stock livres imprimés
- Stocker à Jerusalem (Keren)
- Expédition manuelle
- Payment processor existant du client

---

## 📊 ANALYTICS RECOMMANDÉES

Tracker pour chaque livre:
- Vues page produit
- Clics téléchargement PDF
- Clics "Acheter" (vers boutique externe)
- Temps sur page
- Livres les plus populaires

**Objectif Mois 1**:
- 500+ vues catalogue total
- 100+ téléchargements PDF
- 20+ clics achat (vers boutiques partenaires)

---

## 🔄 MISE À JOUR INVENTAIRE

**Fréquence recommandée**: Mensuelle

**Process**:
1. Vérifier nouveaux livres BreslovBooks.com
2. Mettre à jour CSV/Excel
3. Re-générer data JSON Next.js
4. Re-deploy Netlify (automatique)

---

## ✅ CHECKLIST UTILISATION MVP

- [x] Inventaire CSV/Excel copié dans `/docs`
- [ ] Parser CSV → JSON pour Next.js
- [ ] Sélectionner 20 livres prioritaires
- [ ] Récupérer/générer images couvertures
- [ ] Créer traductions FR/EN des titres
- [ ] Implémenter composant `<BookCard />`
- [ ] Créer page `/livres` avec grid
- [ ] Tester liens téléchargement
- [ ] Ajouter analytics tracking

---

**🔥 Inventaire complet et prêt à l'emploi! 🔥**

> 49 livres = Largement suffisant pour MVP 1 semaine
> Focus sur Top 20 pour lancement rapide
