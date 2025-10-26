# 🎯 CURSOR - STATUS ACTUEL

**Dernière mise à jour :** [À remplir par Cursor]
**Branche :** [branch name]
**Status :** ⏸️ **EN ATTENTE**

---

## 📝 INSTRUCTIONS POUR CURSOR

**Avant de commencer à travailler :**

1. **Lire les changements de Claude :**
   - `.cursor/claude-changes.md` - Liste détaillée
   - `.ai-coordination/claude-working.md` - Status actuel
   - `TRAVAIL_EFFECTUE_CLAUDE.md` - Documentation complète

2. **Vérifier git status :**
   ```bash
   git status
   git log -3 --oneline
   ```

3. **Mettre à jour ce fichier avec :**
   - [ ] Date/heure actuelle
   - [ ] Branche de travail
   - [ ] Fichiers que tu vas modifier
   - [ ] Status : ⏳ En cours

4. **Avant commit :**
   - [ ] Changer status : ✅ Terminé
   - [ ] Vérifier aucun conflit avec Claude
   - [ ] Commit avec message `🎯 [CURSOR] ...`

---

## 🤖 MESSAGE DE CLAUDE

Claude a terminé son travail aujourd'hui.
**Nouveaux fichiers disponibles pour toi :**

### Composants React prêts à intégrer :
- `AudioPlayer.tsx` - Lecteur audio/vidéo
- `ProductRecommendations.tsx` - Grid de produits recommandés
- `NewsletterSignup.tsx` - Formulaire newsletter

### Endpoints API disponibles :
- `/api/newsletter` (POST, DELETE)
- `/api/reviews/:productId` (GET, POST)
- `/api/shiurim` (GET list, GET detail)
- `/api/wishlist/:userId` (GET, POST, DELETE)

### Nouvelles tables DB (à push) :
- newsletter_subscribers
- product_reviews
- shiurim
- user_wishlist

**Lis `.cursor/claude-changes.md` pour tous les détails ! 📚**

---

## ✅ CE QUE TU PEUX FAIRE

### Safe (pas de conflit) :
- Intégrer composants de Claude dans pages
- Créer nouvelles pages frontend
- Ajouter styles/animations
- Tester endpoints API
- Créer tests E2E

### Attention (demander avant) :
- Modifier `shared/schema.ts` (Claude a ajouté 4 tables)
- Modifier `server/routes.ts` (Claude a ajouté 2 lignes)
- Renommer fichiers de Claude
- Changer structure API de Claude

---

## 📋 TEMPLATE À REMPLIR QUAND TU TRAVAILLES

```markdown
## 🎯 CURSOR TRAVAILLE SUR :

**Date/Heure :** [timestamp]
**Branche :** feature/complete-app-v2
**Status :** ⏳ En cours

### Fichiers en modification :
- [ ] client/src/pages/home.tsx (intégration NewsletterSignup)
- [ ] client/src/pages/product.tsx (intégration ProductRecommendations)

### Actions :
1. Ajouter NewsletterSignup dans footer
2. Ajouter ProductRecommendations dans ProductPage
3. Créer page /shiurim

**⚠️ CLAUDE : Attends que status = "Terminé"**
```

---

## 🔄 QUAND TU AS FINI

1. Change status : ✅ Terminé
2. Commit avec : `🎯 [CURSOR] Description`
3. Update ce fichier
4. Claude peut reprendre le travail

---

**Pas de conflit avec Claude actuellement. Tu es libre de travailler ! ✅**
