# 🚀 ROADMAP 1 SEMAINE - KEREN RABBI ISRAEL

> **DEADLINE CRITIQUE**: Site live trilingue fonctionnel en 7 jours

## 🎯 Objectif Final (Jour 7)

Site Next.js multilingue (FR/HE/EN) déployé sur Netlify avec:
- ✅ Navigation parfaite RTL hébreu
- ✅ E-commerce minimaliste (liens externes)
- ✅ Lecteur audio Shiurim basique
- ✅ Design responsive mobile-first
- ✅ Performance >85 PageSpeed mobile

---

## 📅 JOUR 1-2: FOUNDATION (16h)

### Jour 1 - Matin (4h): Architecture
- [x] Créer repo GitHub centralisé
- [x] Structure dossiers Next.js optimisée
- [x] Documentation complète `/docs`
- [ ] Setup package.json + dépendances critiques
  ```bash
  npm install next@14 react@18 react-dom@18
  npm install next-i18next tailwindcss@3
  npm install -D @tailwindcss/rtl
  ```

### Jour 1 - Après-midi (4h): Configuration i18n
- [ ] Configuration `next.config.js` trilingue
- [ ] Structure `/public/locales/` (fr/he/en)
- [ ] Plugin RTL Tailwind activé
- [ ] Test basic routing `/fr`, `/he`, `/en`

### Jour 2 - Matin (4h): Migration Code Critique
- [ ] Extraire layout principal de haesh-sheli.netlify.app
- [ ] Migrer navigation header (avec switch langue)
- [ ] Migrer footer + liens sociaux
- [ ] Composant `<LanguageSwitcher />` RTL-aware

### Jour 2 - Après-midi (4h): Pages Essentielles
- [ ] Page d'accueil trilingue (`/pages/index.js`)
- [ ] Page "À propos" (histoire Rabbi Nachman)
- [ ] Page "Contact"
- [ ] Fichiers traduction de base (50 clés minimum)

**LIVRABLE JOUR 2**: Site navigable en 3 langues avec RTL fonctionnel

---

## 📅 JOUR 3-4: FEATURES (16h)

### Jour 3 - Matin (4h): E-commerce Minimaliste
- [ ] Page catalogue produits (`/pages/livres.js`)
- [ ] Composant `<BookCard />` avec image + description
- [ ] Liens externes vers boutiques partenaires
- [ ] Grid responsive (1 col mobile, 3 cols desktop)

### Jour 3 - Après-midi (4h): Contenu Produits
- [ ] Intégrer 20+ produits minimum:
  - Likutei Moharan I & II
  - Sippurei Maasiyot
  - Sefer HaMiddot
  - Likutei Tefilot
  - etc.
- [ ] Images optimisées (WebP, lazy loading)
- [ ] Descriptions trilingues (via `locales/`)

### Jour 4 - Matin (4h): Lecteur Audio Shiurim
- [ ] Composant `<AudioPlayer />` HTML5 custom
- [ ] Playlist basique (liste déroulante)
- [ ] Intégration 10+ Shiurim MP3:
  - Liens Torahcasts.com
  - Ou upload direct `/public/audio/`
- [ ] Player controls: play/pause, volume, progress bar

### Jour 4 - Après-midi (4h): Design & Style
- [ ] Thème Breslov (couleurs feu 🔥)
- [ ] Typography responsive (Heebo pour hébreu)
- [ ] Animations subtiles (fade-in, hover effects)
- [ ] Mode sombre optionnel (si temps)

**LIVRABLE JOUR 4**: E-commerce + Audio fonctionnels, design cohérent

---

## 📅 JOUR 5-6: POLISH (16h)

### Jour 5 - Matin (4h): Optimisation Performance
- [ ] Images next/image optimisées
- [ ] Code splitting automatique Next.js
- [ ] Lazy loading composants lourds
- [ ] Préchargement pages critiques
- [ ] Test PageSpeed Insights (target: >85 mobile)

### Jour 5 - Après-midi (4h): Testing Multilingue
- [ ] Test complet navigation FR/HE/EN
- [ ] Vérification alignement RTL hébreu
- [ ] Corrections bugs layout RTL
- [ ] Test sur iPhone + Android (responsive)

### Jour 6 - Matin (4h): Contenu Final
- [ ] Rédaction/traduction textes manquants
- [ ] Vérification orthographe hébreu (Ghezi)
- [ ] SEO meta tags trilingues
- [ ] Open Graph images (social sharing)

### Jour 6 - Après-midi (4h): Features Optionnelles (si temps)
- [ ] Formulaire dons Stripe basique
- [ ] Newsletter signup (Mailchimp/ConvertKit)
- [ ] Section blog/actualités (3 articles)
- [ ] Galerie photos Hafatza

**LIVRABLE JOUR 6**: Site prêt à déployer, tous tests passés

---

## 📅 JOUR 7: LAUNCH (8h)

### Jour 7 - Matin (4h): Déploiement Production
- [ ] Configuration `netlify.toml` finale
- [ ] Variables environnement Netlify dashboard
- [ ] Build production local test:
  ```bash
  npm run build
  npm start
  ```
- [ ] Déploiement Netlify:
  ```bash
  npm run deploy
  # ou push vers main (auto-deploy)
  ```
- [ ] Vérification DNS/domaine www.haesh-sheli.co.il
- [ ] Test site live complet (toutes langues)

### Jour 7 - Après-midi (4h): Formation & Monitoring
- [ ] Session formation Jacob (1h):
  - Ajouter contenu via Builder.io
  - Modifier traductions
  - Uploader nouveaux Shiurim
- [ ] Documentation utilisateur (`/docs/USER_GUIDE.md`)
- [ ] Setup Google Analytics
- [ ] Setup monitoring uptime (UptimeRobot gratuit)
- [ ] Checklist post-lancement
- [ ] Backup complet repo

**LIVRABLE JOUR 7**: Site LIVE ✅ + Jacob autonome

---

## 🚨 RÈGLES CRITIQUES 1 SEMAINE

### ⚡ Priorités Absolues
1. **RTL hébreu PARFAIT** - Non-négociable
2. **Mobile-first** - 70% trafic sur mobile
3. **Performance** - PageSpeed >85
4. **Multilingue** - 3 langues complètes

### ⏱️ Time Boxing Strict
- Chaque tâche = durée max définie
- Si bloqué >30min → passer à suivant, revenir plus tard
- Utiliser code existant haesh-sheli.netlify.app au maximum

### 🔥 Features Reportées (Phase 3)
- ❌ Avatars IA (ElevenLabs + HeyGen)
- ❌ Chat contextuel OpenAI
- ❌ Système dons Stripe complet
- ❌ Plateforme communautaire
- ❌ Application mobile

### 🛠️ Workflow Optimisé
- **Claude Code**: Architecture + logique
- **Cursor**: Édition rapide
- **Builder.io**: Édition contenu visuel (post-lancement)
- **GenSpark**: Génération composants (si besoin)

---

## 📊 Métriques Succès (Fin Semaine 1)

| Métrique | Target | Vérification |
|----------|--------|--------------|
| Site live trilingue | ✅ | URL production accessible |
| Pages essentielles | 8+ | Accueil, À propos, Livres, Audio, Contact, etc. |
| Produits catalogués | 20+ | Grid e-commerce complet |
| Shiurim audio | 10+ | Player fonctionnel |
| PageSpeed mobile | >85 | Test PageSpeed Insights |
| RTL hébreu | Parfait | Test natif hébréophone |
| Responsive | 100% | Test iPhone + Android |

---

## 🔄 Contingency Plan

**Si retard détecté Jour 3:**
- Réduire produits à 15 (au lieu de 20+)
- Réduire Shiurim à 5 (au lieu de 10+)
- Reporter mode sombre

**Si retard détecté Jour 5:**
- Sauter features optionnelles
- Déployer MVP strict (accueil + livres + audio)
- Itérer post-lancement

**Si bloqueur technique majeur:**
- Utiliser templates Next.js existants
- Simplifier player audio (iframe YouTube/SoundCloud)
- Demander aide externe (freelance urgence)

---

**🔥 Na Nach Nachma Nachman Meuman! 🔥**

> *"האש שלי תבער עד ביאת המשיח"* - Rabbi Nachman de Breslov
