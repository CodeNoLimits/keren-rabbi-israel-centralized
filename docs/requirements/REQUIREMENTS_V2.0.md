# 📋 REQUIREMENTS V2.0 - KEREN RABBI ISRAEL

> Spécifications complètes basées sur PDF requirements + meetings + contraintes 1 semaine

---

## 🎯 VISION & MISSION

### Vision
Créer **LA plateforme de référence mondiale** pour diffuser les enseignements de Rabbi Nachman de Breslov et soutenir la Keren Rabbi Israel Dov Odesser.

### Mission (1 semaine)
Site trilingue (FR/HE/EN) permettant de:
1. **Découvrir** les livres et enseignements de Rabbi Nachman
2. **Écouter** des Shiurim audio en hébreu/français
3. **Soutenir** la Keren via dons et achats de livres
4. **Connecter** la communauté Breslov mondiale

---

## 👥 PERSONAS & AUDIENCE

### Persona 1: Le Chercheur Spirituel (20%)
- **Profil**: Nouveau dans Breslov, recherche sens/spiritualité
- **Âge**: 25-45 ans
- **Langues**: Français, Anglais
- **Besoins**:
  - Contenu accessible (pas trop technique)
  - Histoire Rabbi Nachman inspirante
  - Introduction progressive
- **Craintes**: Se sentir perdu, jargon incompréhensible

### Persona 2: L'Étudiant Intéressé (50%)
- **Profil**: Connait Rabbi Nachman, veut approfondir
- **Âge**: 30-60 ans
- **Langues**: Hébreu, Français
- **Besoins**:
  - Accès aux textes originaux (hébreu)
  - Shiurim de qualité
  - Ressources approfondies
- **Craintes**: Informations superficielles

### Persona 3: Le Breslov Avancé (30%)
- **Profil**: Pratiquant régulier, soutien actif Keren
- **Âge**: 35-70 ans
- **Langues**: Hébreu principalement
- **Besoins**:
  - Nouveaux Shiurim réguliers
  - Achats livres rares
  - Dons faciles
- **Craintes**: Site pas assez sérieux/profond

---

## 🌍 LANGUES & LOCALISATION

### 3 Langues Complètes
1. **Français** (langue par défaut)
   - URL: `/fr/*`
   - Audience: France, Belgique, Suisse, Québec, Afrique francophone

2. **Hébreu** (priorité RTL)
   - URL: `/he/*`
   - Audience: Israël, communautés orthodoxes mondiales
   - **CRITIQUE**: Support RTL parfait obligatoire

3. **Anglais** (international)
   - URL: `/en/*`
   - Audience: USA, UK, International

### Contenus à Traduire
- ✅ Navigation (header/footer)
- ✅ Pages principales (accueil, à propos, contact)
- ✅ Catalogue produits (titres + descriptions livres)
- ✅ Formulaires (labels, placeholders, erreurs)
- ⚠️ Shiurim audio: Titres traduits, contenu audio original (hébreu/français)

### Détection Langue
- Langue navigateur par défaut
- Switch manuel visible (drapeaux)
- Persistance choix (localStorage)

---

## 📄 PAGES ESSENTIELLES (MVP)

### 1. Page Accueil (`/`)
**Sections:**
- Hero avec citation Rabbi Nachman + CTA
- Introduction Keren Rabbi Israel (100-150 mots)
- Grid 3 piliers: Livres | Shiurim | Dons
- Témoignages/Photos Hafatza (2-3)
- Newsletter signup (optionnel)

**CTA Principaux:**
- "Découvrir les livres" → `/livres`
- "Écouter des Shiurim" → `/audio`
- "Soutenir la Keren" → `/dons`

### 2. Page À Propos (`/a-propos`)
**Contenu:**
- Histoire Rabbi Nachman (1772-1810)
- Histoire Rabbi Israel Dov Odesser (1888-1994)
- Mission Keren Rabbi Israel
- Projets en cours (distribution livres, etc.)
- Photos historiques

### 3. Page Livres (`/livres`)
**Fonctionnalités:**
- Grid responsive produits (BookCard)
- Filtres: Langue, Catégorie, Prix (si applicable)
- Chaque livre:
  - Image couverture (optimisée)
  - Titre (trilingue)
  - Description courte (100 mots)
  - Prix (si vente directe) ou "Voir boutique"
  - Bouton CTA → lien externe boutique partenaire

**Livres Prioritaires (minimum 20):**
- Likutei Moharan I (תורה א)
- Likutei Moharan II (תורה ב)
- Sippurei Maasiyot (סיפורי מעשיות)
- Sefer HaMiddot (ספר המידות)
- Likutei Tefilot (ליקוטי תפילות)
- Chayei Moharan (חיי מוהר"ן)
- Sichot HaRan (שיחות הר"ן)
- Shivchei HaRan (שבחי הר"ן)
- Etc.

### 4. Page Audio/Shiurim (`/audio`)
**Fonctionnalités:**
- Player audio custom (HTML5)
- Liste/grid Shiurim (titre, durée, speaker)
- Filtres: Langue, Série, Durée
- Favoris (localStorage, pas de compte requis Phase 1)

**Shiurim Minimum (10+):**
- Likutei Moharan Torah 1-10 (hébreu)
- Sippurei Maasiyot (français si disponible)
- Hitbodedout (méditation) guidées

### 5. Page Dons (`/dons`)
**Phase 1 (Minimaliste):**
- Explication mission Keren
- Montants suggérés (€18, €36, €72, €180, custom)
- Formulaire simple (nom, email, montant)
- Lien externe PayPal/Stripe (si pas d'intégration)

**Phase 2 (Stripe Integration):**
- Checkout Stripe embedded
- Récurrence (mensuel/annuel)
- Reçu fiscal automatique

### 6. Page Contact (`/contact`)
**Formulaire:**
- Nom
- Email
- Téléphone (optionnel)
- Sujet (dropdown: Question, Don, Autre)
- Message
- Submit → Netlify Forms (gratuit)

**Informations:**
- Email: contact@keren-rabbi-israel.org (ou similaire)
- Adresse physique (Israël)
- Téléphone
- Réseaux sociaux (Facebook, Instagram, YouTube)

### 7. Pages Légales
- **Mentions légales** (`/mentions-legales`)
- **Politique confidentialité** (`/confidentialite`)
- **CGV** (si vente directe)

---

## 🎨 DESIGN & UX

### Identité Visuelle
**Couleurs Primaires:**
- 🔥 Orange/Rouge feu (thème "האש שלי תבער")
- ⚪ Blanc cassé (fond)
- ⚫ Gris foncé (textes)

**Couleurs Secondaires:**
- 🟡 Or (accents)
- 🔵 Bleu profond (liens)

### Typographie
**Hébreu:**
- Font: Heebo (Google Fonts)
- Weights: 400 (regular), 700 (bold)

**Français/Anglais:**
- Font: Inter ou Open Sans
- Weights: 400, 600, 700

### Composants Clés
1. **Header/Navigation**
   - Logo Keren
   - Menu principal: Accueil | Livres | Audio | Dons | À propos | Contact
   - Language switcher (drapeaux)
   - Responsive: burger menu mobile

2. **Footer**
   - Liens rapides (sitemap)
   - Réseaux sociaux
   - Newsletter signup
   - Copyright

3. **BookCard Component**
   ```jsx
   <BookCard
     image="/images/books/likutei-moharan-1.jpg"
     title={t('books.likutei_moharan_1')}
     description={t('books.likutei_moharan_1_desc')}
     price="25€"
     ctaUrl="https://breslov.co.il/product/..."
   />
   ```

4. **AudioPlayer Component**
   - Play/pause button
   - Progress bar (seekable)
   - Volume control
   - Playlist dropdown

### Mobile-First
- **70% du trafic = mobile**
- Design mobile d'abord, puis desktop
- Touch-friendly (boutons min 44x44px)
- Fast loading (<3s mobile)

---

## ⚙️ FONCTIONNALITÉS TECHNIQUES

### Performance
- **PageSpeed Score**: >85 mobile, >90 desktop
- **Techniques:**
  - Image optimization (next/image, WebP)
  - Lazy loading
  - Code splitting
  - CDN (Cloudflare via Netlify)
  - Minification CSS/JS

### SEO
- Meta tags trilingues (title, description)
- Open Graph (social sharing)
- Sitemap.xml automatique
- Robots.txt
- Structured Data (JSON-LD):
  - Organization (Keren)
  - Books (Product schema)

### Accessibilité (A11y)
- Sémantique HTML5
- ARIA labels (lecteurs écran)
- Contraste couleurs (WCAG AA minimum)
- Navigation clavier
- Alt texts images

### RTL (Right-to-Left)
- Direction automatique: `<html dir="rtl">` pour hébreu
- Layouts miroirs (navigation à droite)
- Tailwind utilities: `rtl:mr-4` vs `ltr:ml-4`
- Test sur Chrome/Safari (support RTL natif)

---

## 🔌 INTÉGRATIONS

### Phase 1 (Semaine 1)
1. **Netlify Forms** (contact)
2. **Google Analytics 4** (tracking)
3. **Torahcasts.com** (audio embedding)

### Phase 2 (Optionnel)
4. **Stripe** (dons/paiements)
5. **Mailchimp/ConvertKit** (newsletter)
6. **Builder.io** (édition visuelle)

### Phase 3 (Post-lancement)
7. **ElevenLabs** (TTS hébreu)
8. **HeyGen** (avatars vidéo)
9. **OpenAI** (chat contextuel)
10. **Supabase** (base données utilisateurs)

---

## 📊 ANALYTICS & KPIs

### Métriques Semaine 1 (Post-lancement)
- Site live ✅
- 0 erreurs critiques
- PageSpeed >85
- 3 langues fonctionnelles

### Métriques Mois 1
- **Trafic**: 500-1,000 visiteurs
- **Engagement**: 2+ pages/session
- **Conversions**:
  - 20+ clics livres (vers boutiques)
  - 10+ écoutes Shiurim
  - 5+ dons

### Métriques Mois 3
- **Trafic**: 2,000-5,000 visiteurs
- **Conversions**:
  - 50+ achats livres (via partenaires)
  - 30+ dons (total >1,000€)
- **Réseaux sociaux**: 1,000+ followers combinés

---

## 🚨 CONTRAINTES & EXCLUSIONS

### Contraintes Critiques
1. **Timeline**: 1 SEMAINE maximum (Jour 7 = site live)
2. **Budget**: 3,000-5,000€ total (dev + 1er mois)
3. **Workflow**: Claude Code + Cursor + Builder.io (PAS WordPress/Replit)
4. **Hébergement**: Netlify obligatoire (centaines heures déjà investies)

### Technologies Exclues
- ❌ WordPress (décision client ferme)
- ❌ Shopify (pas besoin e-commerce complet)
- ❌ Replit (trop cher selon client)
- ❌ Backend Node/Express custom (SSG suffit Phase 1)

### Features Exclues Phase 1
- ❌ Comptes utilisateurs/authentification
- ❌ Panier d'achat complet
- ❌ Gestion stock/inventaire
- ❌ Forum/communauté
- ❌ Chat en direct
- ❌ Application mobile
- ❌ Mode hors-ligne/PWA avancé

---

## 📝 CONTENU REQUIS (Fourni par Jacob)

### Textes
- [x] Citations Rabbi Nachman (5-10)
- [ ] Histoire Keren (500 mots, FR/HE/EN)
- [ ] Descriptions livres (20+ produits, 100 mots chacun)
- [ ] Témoignages (3-5)

### Images
- [ ] Logo Keren (SVG haute résolution)
- [ ] Photos Rabbi Nachman (domaine public)
- [ ] Photos Rabbi Israel Dov Odesser
- [ ] Couvertures livres (20+ images, min 500x700px)
- [ ] Photos Hafatza/événements (5-10)

### Audio
- [ ] Shiurim MP3 (10+ fichiers)
  - Titres (FR/HE/EN)
  - Durées
  - Speakers
  - URLs Torahcasts.com ou fichiers directs

### Traductions
- [ ] Fichiers JSON trilingues (Ghezi: traducteur EN/HE)
  - `common.json` (~50 clés)
  - `books.json` (20+ descriptions)
  - `audio.json` (10+ titres)

---

## 🛡️ SÉCURITÉ & CONFORMITÉ

### RGPD (EU)
- Bannière cookies (si analytics/tracking)
- Politique confidentialité claire
- Consentement explicite newsletter
- Droit à l'oubli (contact email)

### PCI DSS (Paiements)
- Délégué à Stripe (certification native)
- Jamais de données carte stockées
- HTTPS obligatoire (Netlify automatique)

### Spam Protection
- Honeypot fields (formulaires)
- reCAPTCHA v3 (si spam détecté)
- Rate limiting Netlify

---

## 📅 TIMELINE DÉTAILLÉE

### Jour 1-2: Foundation
- Setup repo GitHub
- Configuration Next.js + i18n
- Migration code critique haesh-sheli.netlify.app
- Pages essentielles (accueil, à propos, contact)

### Jour 3-4: Features
- Catalogue livres (20+ produits)
- Player audio (10+ Shiurim)
- Design & styling (Tailwind)
- RTL testing

### Jour 5-6: Polish
- Optimisation performance
- Testing multilingue complet
- SEO meta tags
- Bug fixes

### Jour 7: Launch
- Deploy production Netlify
- Formation Jacob (Builder.io)
- Monitoring setup
- Documentation utilisateur

---

## ✅ CRITÈRES D'ACCEPTATION

### Must-Have (Obligatoire Jour 7)
- [x] Site accessible en 3 langues (FR/HE/EN)
- [ ] RTL hébreu parfait (0 bug alignement)
- [ ] 8+ pages fonctionnelles
- [ ] 20+ produits catalogue livres
- [ ] 10+ Shiurim audio avec player
- [ ] Formulaire contact opérationnel
- [ ] Responsive mobile/tablet/desktop
- [ ] PageSpeed >85 mobile
- [ ] HTTPS actif
- [ ] Deployed sur Netlify

### Should-Have (Si temps permet)
- [ ] Stripe donations intégré
- [ ] Newsletter signup fonctionnel
- [ ] Blog (3 articles minimum)
- [ ] Galerie photos Hafatza
- [ ] Mode sombre

### Nice-to-Have (Phase 3)
- [ ] Avatars IA (ElevenLabs + HeyGen)
- [ ] Chat contextuel OpenAI
- [ ] Comptes utilisateurs
- [ ] Application mobile
- [ ] PWA offline-first

---

## 📞 CONTACTS & STAKEHOLDERS

### Client Principal
- **Nom**: Jacob Henne
- **Rôle**: Responsable Keren Rabbi Israel
- **Email**: [à définir]
- **Tél**: [à définir]

### Équipe Dev
- **Dev Lead**: David
- **Outils**: Claude Code, Cursor
- **Traducteur**: Ghezi (EN/HE)

### Partenaires
- **Boutique livres**: Breslov.co.il (à confirmer)
- **Audio hosting**: Torahcasts.com
- **Paiements**: Stripe

---

## 📚 RÉFÉRENCES

### Documents Clés
- [x] `rapport_complet_haesh_shelli_hebreu.md.pdf` (13 pages)
- [x] Transcriptions meetings (French audio)
- [x] Repo existants: haesh-sheli, HaeshSheliOriginal, haesh-sheli-store

### Inspiration Sites
- www.haesh-sheli.co.il (site actuel - à améliorer)
- haesh-sheli.netlify.app (dev actuel - base de travail)
- breslov.co.il
- breslev.co.il

### Resources Breslov
- Sefaria.org (textes originaux hébreu)
- Breslov Research Institute (anglais)
- Azamra.org (multilingue)

---

**🔥 Requirements validés - Ready to build! 🔥**

> *"האש שלי תבער עד ביאת המשיח"* - Rabbi Nachman de Breslov
