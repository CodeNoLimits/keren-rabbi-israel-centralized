# 🚀 Guide Déploiement - Keren Cursor (555)

## 🌐 Site Netlify

**Nom:** `Keren Cursor`

**URL Production:** https://keren-cursor.netlify.app

**URL Preview (Keren5.5.5):** https://keren-cursor-5-5-5.netlify.app

**Dashboard:** https://app.netlify.com/sites/keren-cursor

---

## 📋 Workflow Déploiement

### Branche Main (Production)

```bash
git checkout main
git merge Keren5.5.5
npm run build
git add .
git commit -m "chore: deploy to production - Keren Cursor"
git push origin main
```

→ Auto-deploy sur Netlify "Keren Cursor"

---

### Branche Keren5.5.5 (Preview)

```bash
git checkout Keren5.5.5
# Faire tes modifications
npm run build
git add .
git commit -m "feat: [description] - 555"
git push origin Keren5.5.5

# Déployer preview
netlify deploy --dir=dist/public --site=keren-cursor --alias keren-cursor-5-5-5
```

---

## 🔗 Liens GitHub

- **Repo:** https://github.com/CodeNoLimits/keren-rabbi-israel-centralized
- **Branche Main:** https://github.com/CodeNoLimits/keren-rabbi-israel-centralized/tree/main
- **Branche Keren5.5.5:** https://github.com/CodeNoLimits/keren-rabbi-israel-centralized/tree/Keren5.5.5

---

**Marqueur: 555**

