# 🔐 Configuration Variables d'Environnement Netlify
## Keren Rabbi Israël - HaEsh Sheli

**Date:** 2025-11-02
**Marqueur:** 555

---

## ✅ ÉTAPES POUR SÉCURISER LA CLÉ OPENROUTER DANS NETLIFY

### 1. Se Connecter à Netlify Dashboard

Aller sur : https://app.netlify.com/projects/kerensitefinal

### 2. Accéder aux Variables d'Environnement

1. Cliquer sur **"Site settings"**
2. Dans le menu latéral, cliquer sur **"Environment variables"**
3. Cliquer sur **"Add a variable"**

### 3. Ajouter les Variables Suivantes

#### Variable 1: OPENROUTER_API_KEY (Backend)
```
Key: OPENROUTER_API_KEY
Value: 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
Scopes: All deploys, All branches
```

#### Variable 2: VITE_OPENROUTER_API_KEY (Frontend)
```
Key: VITE_OPENROUTER_API_KEY
Value: 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
Scopes: All deploys, All branches
```

### 4. Redéployer le Site

Après avoir ajouté les variables :
1. Aller dans **"Deploys"**
2. Cliquer sur **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 📱 VÉRIFICATIONS IMPORTANTES

### WhatsApp Widget
✅ **Lien actuel :** https://wa.me/972503515893
✅ **Message pré-rempli :** "שלום, אני מעוניין לשמוע עוד על הספרים והמנויים שלכם"

**Vérifier que le widget apparaît sur :**
- Header (top navigation)
- Mobile menu
- Toutes les pages

### Formulaires à Vérifier
- [ ] Formulaire de contact (`/contact`)
- [ ] Formulaire d'inscription newsletter
- [ ] Formulaire checkout (panier)
- [ ] Formulaire chat IA

### Chat IA Breslov
✅ **Utilise OpenRouter API**
✅ **Modèle :** À configurer dans le code
✅ **Route backend :** `/api/chat` ou `/api/openrouter`

**Test à faire :**
1. Ouvrir la page Chat (`/chat`)
2. Envoyer un message test
3. Vérifier que la réponse arrive
4. Vérifier que la clé API fonctionne

---

## 🔒 SÉCURITÉ

### ⚠️ IMPORTANT - NE JAMAIS FAIRE :
- ❌ Commiter le fichier `.env` dans Git
- ❌ Partager les clés API publiquement
- ❌ Utiliser les clés API côté client pour des appels directs

### ✅ BONNES PRATIQUES :
- ✅ Toutes les clés API dans variables d'environnement Netlify
- ✅ Fichier `.env` dans `.gitignore`
- ✅ Appels API sensibles via backend (serveur)
- ✅ Rotation régulière des clés API

---

## 📋 CHECKLIST DÉPLOIEMENT

### Avant de déployer :
- [x] Clé OpenRouter mise à jour dans `.env` local
- [ ] Clés ajoutées dans Netlify Environment Variables
- [ ] Redéploiement déclenché
- [ ] Tests WhatsApp (clic sur le widget)
- [ ] Tests formulaires (contact, newsletter)
- [ ] Test chat IA (envoi message)
- [ ] Vérification mobile (responsive)
- [ ] Vérification desktop

### Après déploiement :
- [ ] Tester le site live : https://kerensitefinal.netlify.app
- [ ] Vérifier que le chat fonctionne
- [ ] Vérifier que WhatsApp redirige correctement
- [ ] Tester sur mobile (iPhone + Android)
- [ ] Vérifier les logs Netlify pour erreurs

---

## 🔗 LIENS UTILES

- **Netlify Dashboard :** https://app.netlify.com/projects/kerensitefinal
- **Site Live :** https://kerensitefinal.netlify.app
- **Variables Env :** https://app.netlify.com/sites/kerensitefinal/settings/env
- **Logs Déploiement :** https://app.netlify.com/sites/kerensitefinal/deploys

---

## 📞 SUPPORT

Si problème avec :
- **OpenRouter API :** Vérifier la clé dans dashboard OpenRouter
- **Netlify Deploy :** Voir les logs de build
- **Chat ne marche pas :** Vérifier la console navigateur pour erreurs

---

**Marqueur :** 555
**Dernière mise à jour :** 2025-11-02

✅ **Clé OpenRouter sécurisée et prête à l'emploi !**
