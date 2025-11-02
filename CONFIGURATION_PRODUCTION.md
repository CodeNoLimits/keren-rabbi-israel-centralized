# 🚀 Configuration Production - Guide Complet

## 📋 **Pour Netlify ET votre Serveur de Production**

Ce guide explique comment configurer la clé OpenRouter pour que le chat AI fonctionne.

---

## 🔑 **Clé OpenRouter à Configurer**

```
OPENROUTER_API_KEY=[CLÉ_API_MASQUÉE]
```

**⚠️ IMPORTANT :** Cette clé doit rester **SECRÈTE**. Ne jamais la partager publiquement.

---

## 🌐 **NETLIFY - Configuration**

### Étapes :

1. **Aller sur Netlify Dashboard** : https://app.netlify.com
2. **Sélectionner votre site** : "Keren Cursor" ou "Keren Site"
3. **Site settings** → **Environment variables**
4. **Add variable** :
   - **Name** : `OPENROUTER_API_KEY`
   - **Value** : `[CLÉ_API_MASQUÉE]`
   - **Scope** : All scopes (ou Production)
5. **Cliquer "Deploy"** → **Trigger deploy** → **Deploy site**

✅ **C'est tout !** Le chat fonctionnera après le déploiement.

---

## 🖥️ **SERVEUR PRODUCTION - Configuration**

### Option 1 : Fichier .env (Recommandé)

1. **Se connecter au serveur** (SSH)
2. **Aller dans le dossier du projet**
3. **Créer/éditer `.env`** :
   ```bash
   nano .env
   ```
4. **Ajouter** :
   ```
   OPENROUTER_API_KEY=[CLÉ_API_MASQUÉE]
   ```
5. **Sauvegarder** (Ctrl+X, Y, Enter)
6. **Sécuriser** :
   ```bash
   chmod 600 .env
   ```
7. **Redémarrer le serveur** :
   ```bash
   pm2 restart all
   # ou
   sudo systemctl restart votre-service
   ```

### Option 2 : Variables Système

Dans votre fichier de configuration PM2 ou systemd, ajouter :

```env
OPENROUTER_API_KEY=[CLÉ_API_MASQUÉE]
```

---

## ✅ **Vérification**

### Netlify :
1. Attendre le déploiement
2. Aller sur votre site
3. Tester `/chat`
4. Si ça fonctionne → ✅ Succès !

### Serveur :
1. Vérifier les logs :
   ```bash
   pm2 logs
   ```
2. Tester le chat sur `https://votre-site.com/chat`
3. Si ça fonctionne → ✅ Succès !

---

## 🐛 **Problèmes Courants**

### Chat ne fonctionne pas :

1. **Vérifier que la variable est bien nommée** : `OPENROUTER_API_KEY` (exactement)
2. **Vérifier les logs** : Erreurs comme "API_KEY not configured" ?
3. **Redémarrer** : Serveur/Netlify déployé après configuration ?
4. **Vérifier le code** : `server/index.ts` doit charger dotenv

---

## 🛡️ **Sécurité - À NE JAMAIS FAIRE**

- ❌ **NE JAMAIS** commiter `.env` sur GitHub
- ❌ **NE JAMAIS** partager la clé publiquement
- ❌ **NE JAMAIS** mettre la clé directement dans le code
- ❌ **NE JAMAIS** exposer la clé dans les logs

### ✅ À FAIRE :

- ✅ Utiliser des variables d'environnement
- ✅ Protéger `.env` avec `chmod 600`
- ✅ Utiliser les variables Netlify (sécurisées)
- ✅ Vérifier `.gitignore` contient `.env`

---

## 📞 **Support**

Si le chat ne fonctionne toujours pas :

1. Vérifier les logs (Netlify Functions logs ou serveur logs)
2. Vérifier que `server/index.ts` charge dotenv
3. Vérifier que la variable est bien nommée
4. Redémarrer/déployer après configuration

---

## ✅ **Checklist Finale**

**Netlify :**
- [ ] Variable `OPENROUTER_API_KEY` ajoutée dans Netlify Dashboard
- [ ] Site redéployé
- [ ] Chat testé et fonctionnel

**Serveur :**
- [ ] Fichier `.env` créé avec la clé
- [ ] Permissions sécurisées (`chmod 600 .env`)
- [ ] Serveur redémarré
- [ ] Chat testé et fonctionnel

---

**Une fois configuré, le chat AI fonctionnera sur Netlify ET votre serveur !** 🚀

---

**Marqueur :** 555

