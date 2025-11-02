# 🚀 Configuration Netlify - Clé OpenRouter

## 📋 Instructions pour Netlify

Pour que le chat AI fonctionne sur Netlify, vous devez configurer la clé OpenRouter dans les **Variables d'Environnement** de Netlify.

---

## 🔧 **Configuration dans Netlify Dashboard**

### 1. Accéder aux Variables d'Environnement

1. Allez sur https://app.netlify.com
2. Sélectionnez votre site (probablement "Keren Cursor" ou "Keren Site")
3. Allez dans **Site settings** → **Environment variables**

### 2. Ajouter la Clé OpenRouter

Cliquez sur **Add variable** et ajoutez :

```
Variable name: OPENROUTER_API_KEY
Value: [CLÉ_API_MASQUÉE]
Scope: All scopes (ou Production, Staging, Deploy previews selon vos besoins)
```

**⚠️ IMPORTANT :**
- ✅ Cocher "Deploy" pour que la variable soit disponible après le prochain déploiement
- ✅ Ne jamais partager cette clé publiquement
- ✅ Ne jamais commiter cette clé dans le code source

### 3. Redéployer le Site

Après avoir ajouté la variable :
1. Allez dans **Deploys**
2. Cliquez sur **Trigger deploy** → **Deploy site**
3. Le site sera redéployé avec la nouvelle variable d'environnement

---

## 🔍 **Vérification**

Pour vérifier que la clé est bien configurée :

1. Allez sur votre site Netlify
2. Testez le chat AI (`/chat`)
3. Si le chat fonctionne → ✅ Configuration réussie
4. Si erreur → Vérifier les logs Netlify dans **Functions logs**

---

## 📝 **Autres Variables Optionnelles**

Si vous utilisez d'autres services, ajoutez aussi :

```
STRIPE_SECRET_KEY=votre-cle-stripe-secrete
VITE_STRIPE_PUBLIC_KEY=votre-cle-stripe-publique
```

---

## 🛡️ **Sécurité**

- ✅ Les variables d'environnement Netlify sont **cryptées**
- ✅ Elles ne sont **jamais exposées** dans le code source
- ✅ Elles ne sont **jamais commitées** sur GitHub
- ✅ Elles sont **privées** et sécurisées par Netlify

---

## 📞 **Support**

Si le chat ne fonctionne pas après configuration :
1. Vérifier les logs Netlify (Functions logs)
2. Vérifier que la variable est bien nommée : `OPENROUTER_API_KEY`
3. Vérifier que le scope est correct (All scopes ou Production)

---

**Marqueur :** 555

