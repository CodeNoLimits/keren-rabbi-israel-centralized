# 🖥️ Configuration Serveur Production - Clé OpenRouter

## 📋 Instructions pour votre Serveur de Production

Pour que le chat AI fonctionne sur votre serveur de production (VPS, hébergement, etc.), vous devez configurer la clé OpenRouter.

---

## 🔧 **Configuration**

### Option 1 : Fichier .env sur le Serveur

1. **Connectez-vous à votre serveur** (SSH ou accès direct)

2. **Créez/modifiez le fichier `.env`** dans le dossier racine du projet :
   ```bash
   nano .env
   # ou
   vi .env
   ```

3. **Ajoutez la clé OpenRouter** :
   ```bash
   OPENROUTER_API_KEY=[CLÉ_API_MASQUÉE]
   ```

4. **Sauvegardez** le fichier (Ctrl+X, puis Y, puis Enter pour nano)

5. **Redémarrez votre serveur** :
   ```bash
   # Si vous utilisez PM2
   pm2 restart all
   
   # Ou si vous utilisez systemd
   sudo systemctl restart votre-service
   
   # Ou simplement redémarrer le processus Node.js
   ```

### Option 2 : Variables d'Environnement Système

Si vous ne voulez pas utiliser `.env`, configurez les variables directement dans votre système :

#### Linux (systemd)
Dans votre fichier service (ex: `/etc/systemd/system/haesh-sheli.service`) :

```ini
[Service]
Environment="OPENROUTER_API_KEY=[CLÉ_API_MASQUÉE]"
```

Puis :
```bash
sudo systemctl daemon-reload
sudo systemctl restart votre-service
```

#### PM2
```bash
pm2 start ecosystem.config.js --update-env
```

Ou dans `ecosystem.config.js` :
```js
module.exports = {
  apps: [{
    name: 'haesh-sheli',
    env: {
      OPENROUTER_API_KEY: '[CLÉ_API_MASQUÉE]'
    }
  }]
}
```

---

## ✅ **Vérification**

1. **Vérifier que la variable est chargée** :
   ```bash
   # Dans votre terminal serveur
   node -e "require('dotenv').config(); console.log(process.env.OPENROUTER_API_KEY ? '✅ Clé chargée' : '❌ Clé manquante')"
   ```

2. **Vérifier les logs du serveur** :
   - Si vous voyez des erreurs comme "API_KEY not configured" → La clé n'est pas chargée
   - Si le chat fonctionne → ✅ Configuration réussie

3. **Tester le chat** :
   - Allez sur votre site : `https://votre-site.com/chat`
   - Testez une question
   - Si ça fonctionne → ✅ Tout est bon !

---

## 🔄 **Redémarrage Après Configuration**

**IMPORTANT :** Le serveur doit être redémarré pour charger la nouvelle variable :

```bash
# Option 1 : PM2
pm2 restart all

# Option 2 : systemd
sudo systemctl restart votre-service

# Option 3 : Manuel
# Arrêtez le processus Node.js (Ctrl+C) et relancez :
npm start
# ou
node dist/index.js
```

---

## 🛡️ **Sécurité**

- ✅ Ne jamais exposer `.env` publiquement
- ✅ Ne jamais commiter `.env` sur Git
- ✅ Utiliser des permissions restrictives : `chmod 600 .env`
- ✅ Ne jamais partager la clé publiquement

### Sécuriser le fichier .env
```bash
chmod 600 .env
chown votre-user:votre-user .env
```

---

## 📝 **Autres Variables Utiles**

Si vous utilisez d'autres services, ajoutez aussi dans `.env` :

```bash
OPENROUTER_API_KEY=[CLÉ_API_MASQUÉE]
STRIPE_SECRET_KEY=votre-cle-stripe
VITE_STRIPE_PUBLIC_KEY=votre-cle-stripe-publique
DATABASE_URL=votre-url-database
PORT=5000
NODE_ENV=production
```

---

## 🐛 **Dépannage**

### Le chat ne fonctionne pas ?

1. **Vérifier que .env existe** :
   ```bash
   ls -la .env
   ```

2. **Vérifier le contenu** (sans afficher la clé) :
   ```bash
   grep -q "OPENROUTER_API_KEY" .env && echo "✅ Variable présente" || echo "❌ Variable manquante"
   ```

3. **Vérifier les logs serveur** :
   ```bash
   # PM2
   pm2 logs
   
   # systemd
   sudo journalctl -u votre-service -f
   ```

4. **Vérifier que dotenv charge bien .env** :
   Le fichier `server/index.ts` doit commencer par :
   ```typescript
   import dotenv from 'dotenv';
   dotenv.config();
   ```

---

## ✅ **Checklist**

- [ ] Fichier `.env` créé sur le serveur
- [ ] Clé `OPENROUTER_API_KEY` ajoutée dans `.env`
- [ ] Permissions `.env` sécurisées (`chmod 600`)
- [ ] Serveur redémarré
- [ ] Chat testé et fonctionnel
- [ ] Logs vérifiés (pas d'erreurs API_KEY)

---

**Une fois tout configuré, le chat AI fonctionnera sur votre serveur !** 🚀

---

**Marqueur :** 555

