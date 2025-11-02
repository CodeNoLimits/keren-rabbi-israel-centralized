# 🔐 Protection des Clés API - IMPORTANT

## ⚠️ **NE JAMAIS COMMITER LA CLÉ OPENROUTER !**

Votre clé OpenRouter est maintenant dans le fichier `.env` qui est **ignoré par Git** (dans `.gitignore`).

---

## ✅ **Vérifications de Sécurité**

### 1. Vérifier que .env est ignoré

```bash
# Vérifier que .env est bien ignoré
git check-ignore .env
# Doit retourner: .env

# Si vous voyez ".env" dans git status, faites:
git rm --cached .env  # Retirer du tracking (mais garder le fichier)
```

### 2. Liste des fichiers à NE JAMAIS COMMITER :

- ❌ `.env` (contient votre clé OpenRouter)
- ❌ `.env.local`
- ❌ `.env.*.local`
- ✅ `.env.example` (template sans clés réelles - OK à commiter)

---

## 🔑 **Votre Clé OpenRouter**

La clé est configurée dans `.env` :
```
OPENROUTER_API_KEY=[CLÉ_API_MASQUÉE]
```

**Cette clé est utilisée par le serveur pour le chat AI.**

---

## 🛡️ **Comment Protéger la Clé**

### Si vous créez un nouveau repo :

1. **Toujours vérifier .gitignore** :
   ```bash
   echo ".env" >> .gitignore
   echo ".env.local" >> .gitignore
   ```

2. **Avant le premier commit** :
   ```bash
   # Vérifier ce qui sera commité
   git status
   
   # Si .env apparaît, retirer du tracking
   git rm --cached .env
   ```

3. **Ne JAMAIS** :
   - ❌ Commit .env dans Git
   - ❌ Partager .env dans Slack/Discord/Email
   - ❌ Mettre la clé directement dans le code source
   - ❌ Publier la clé sur GitHub/GitLab publiquement

---

## 🔄 **Si la Clé est Révoquée**

Si OpenRouter révoque la clé, c'est probablement parce que :
1. ❌ Elle a été commitée publiquement sur GitHub
2. ❌ Elle a été exposée dans des logs
3. ❌ Elle a été partagée publiquement

**Solution** : Générer une nouvelle clé sur https://openrouter.ai/keys

---

## ✅ **Configuration Actuelle**

- ✅ `.env` est dans `.gitignore`
- ✅ Clé configurée dans `.env`
- ✅ Serveur utilise `process.env.OPENROUTER_API_KEY`
- ✅ Fallback sur `OPENAI_API_KEY` si OpenRouter non disponible

**Votre clé est maintenant protégée !** 🔒

---

**Marqueur :** 555

