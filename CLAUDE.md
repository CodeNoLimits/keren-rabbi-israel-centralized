# KEREN RABBI YISRAEL (האש שלי) — Agent Antigravity

## [NOVA:20260222-KEREN-FINALE] — Production-ready

## TL;DR pour l'agent

Tu travailles sur la boutique de livres Breslev de Keren Rabbi Yisrael pour Yaakov Renne.

- **CODE**: `~/keren-rabbi-israel-centralized/` (= `~/Desktop/_CLIENTS_ACTIFS/09_KEREN_RABBI_YISRAEL/`)
- **LIVE**: https://haesh-sheli-new.vercel.app
- **GITHUB**: CodeNoLimits/keren-rabbi-israel-centralized
- **STACK**: React 18 + Vite + Express + Tailwind CSS + Stripe + PayPal

## Démarrer immédiatement

```bash
cd ~/keren-rabbi-israel-centralized
npm install
npm run dev  # → http://localhost:5000
```

## Contexte projet

100/100 tâches complétées (commit c732bc2 Feb 12 2026). Site en production avec:

- 43+ livres Breslev avec variantes (כרוך/דיגיטלי)
- 6 langues (HE/EN/FR/ES/RU/AR) + RTL
- Stripe + PayPal en ILS intégrés
- Lighthouse 89/100 (FCP 1.2s, LCP 2.1s)
- Favoris, recherche fuzzy, tracking commandes

## Mission Feb 22 — Redesign "Oz VeHadar"

Yaakov veut un look **propre, blanc, Apple Store des livres Breslev**.

### Design System à implémenter

```typescript
// tailwind.config.ts
primary: { DEFAULT: "#FF6B00", hover: "#E65A00" }, // Orange Keren
keren: {
  blue: "#0F172A",     // textes/header
  white: "#FFFFFF",    // fond OBLIGATOIRE (changer le fond sombre actuel)
  surface: "#F8FAFC",  // sections alternées
}
```

```css
/* index.css */
body {
  background: #ffffff !important;
  font-family: "Assistant", sans-serif;
}
@import url("https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700;800&display=swap");
```

### Composants à modifier (dans l'ordre)

1. **Header/Navbar** → sticky + `backdrop-blur-md` au scroll + bg-white/95
2. **ProductCard** → `hover:shadow-[0_20px_25px...]` + bouton "Quick Add" animé (translate-y-10 → 0)
3. **store.tsx** → grid 4 colonnes, fond blanc, pas de fond sombre
4. **product.tsx** → layout 2 col RTL, bouton orange `w-full py-4 rounded-xl`
5. **checkout.tsx** → form complet (שם פרטי, שם משפחה, אימייל, טלפון, כתובת, עיר) + sélecteur Carte/Bit/PayPal

### Bugs à corriger (Yaakov feedback)

- Fonds de cartes produit sombres → forcer `bg-white` partout
- Clés de traduction brutes ("discoverCollection", "booksAvailable") → vérifier i18n init
- Prix ne se met pas à jour au changement variante → vérifier ProductVariantModal
- RTL manquant pour hébreu → `document.dir = i18n.language === 'he' ? 'rtl' : 'ltr'`

## Instructions vocales de Yaakov

Fichier complet: `~/Desktop/_CLIENTS_ACTIFS/09_KEREN_RABBI_YISRAEL/YAAKOV_INSTRUCTIONS.md`
Résumé des demandes:

- Fond blanc pur sur toutes les pages
- Navbar sticky avec blur
- Cards avec hover effect (zoom image + bouton panier)
- Checkout avec TOUS les champs (adresse complète)
- Sélecteur de paiement visible: Carte | ביט (Bit) | PayPal

## Déploiement

```bash
npm run build   # DOIT finir sans erreur TypeScript
vercel --prod
```

## Architecture

```
keren-rabbi-israel-centralized/
  client/src/
    components/
      Header.tsx         — à modifier: sticky + scroll effect
      ProductVariantModal.tsx — quick view
      CheckoutForm.tsx   — à compléter: tous les champs
      BottomNav.tsx      — mobile nav
    pages/
      home.tsx           — page accueil
      store.tsx / shop.tsx — boutique (chercher le bon fichier)
      product.tsx        — page produit
      checkout.tsx       — paiement
    i18n/                — fichiers de traduction
  server/
    routes/payments.ts   — Stripe + PayPal
```

## Règles

1. LIRE le fichier avant de modifier (Azamra: isoler ce qui marche)
2. Un commit par feature: `feat: sticky navbar`, `feat: product card hover`, etc.
3. Tester mobile Chrome DevTools après chaque composant majeur
4. JAMAIS contacter Yaakov (4100510@gmail.com) sans David
5. Design: Orange #FF6B00 | Bleu #0F172A | Blanc #FFFFFF — NE PAS CHANGER

## Compte Stripe

- admin@holyrentals.com (David)
- Mode test uniquement avant GO David

## Comparaison versions (pour info uniquement — NE PAS TRAVAILLER SUR LES AUTRES)

| Version                            | URL                               | Statut                         |
| ---------------------------------- | --------------------------------- | ------------------------------ |
| **keren-rabbi-israel-centralized** | haesh-sheli-new.vercel.app        | ✅ PRODUCTION — travailler ici |
| KEREN-Z                            | candid-kashata-1ff99a.netlify.app | Archive Anti-Gravity Feb 12    |
| Keren555                           | keren555.netlify.app              | Archive Replit Nov 2025        |
| kerensitefinal                     | kerensitefinal.netlify.app        | Snapshot prod ancienne         |
