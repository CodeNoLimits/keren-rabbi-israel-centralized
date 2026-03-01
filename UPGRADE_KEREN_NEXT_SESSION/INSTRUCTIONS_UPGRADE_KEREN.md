# UPGRADE KEREN RABBI YISRAEL — Instructions Session Suivante
> Objectif : Amener le site Keren au niveau visuel et fonctionnel de Tikoun Aolam
> Ref: tikoun-aolam-web (~/Desktop/TIKOUN AOLAM/tikoun-aolam-web/)

## CONTEXTE RAPIDE
- **Code**: `~/Desktop/_CLIENTS_ACTIFS/09_KEREN_RABBI_YISRAEL/`
- **Live**: https://haesh-sheli-new.vercel.app
- **Stack**: React 18 + Vite + Express + Tailwind CSS 3 + Stripe + PayPal
- **43+ livres** Breslev avec variantes (bound/digital)
- **6 langues** (HE/EN/FR/ES/RU/AR) + RTL
- **Status**: 100/100 taches completes MAIS design pas fini (Yaakov veut "Oz VeHadar")

## CE QUI MARCHE DEJA
- Cart context avec localStorage persistence
- Currency context (NIS/USD/EUR) avec conversion
- Stripe + PayPal + Bit (3 methodes de paiement)
- Checkout form complet (prenom, nom, email, tel, adresse, ville, code postal)
- Recherche fuzzy avec tolerance fautes de frappe
- 6 langues + RTL automatique
- Code splitting + compression Gzip/Brotli

## CE QU'IL FAUT FAIRE (par ordre de priorite)

### 1. FOND BLANC PARTOUT (30 min)
Le client Yaakov veut un fond BLANC pur style Apple Store.
```
- Forcer bg-white sur TOUTES les pages (store, product, checkout, home)
- Supprimer tout fond sombre restant sur les cartes produit
- Verifier que le body a: background: #FFFFFF !important
```

### 2. HEADER STICKY + BLUR (20 min)
```tsx
// Header.tsx — ajouter:
className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all"
// Au scroll: shadow-sm apparait
```

### 3. PRODUCT CARDS HOVER EFFECT (30 min)
```tsx
// Chaque ProductCard doit avoir:
- hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]
- Image avec transition-transform duration-500 group-hover:scale-105
- Bouton "Quick Add" qui slide de en bas (translate-y-10 → translate-y-0)
- Prix en orange #FF6B00 bold
```

### 4. STORE PAGE — GRILLE 4 COLONNES (20 min)
```tsx
// store.tsx:
- grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
- Fond blanc, pas de fond sombre
- Filtres en sidebar ou en haut (deja existants, juste styler)
```

### 5. PRODUCT PAGE — LAYOUT 2 COL RTL (30 min)
```tsx
// product.tsx:
- Grid 2 colonnes: image gauche (ou droite en RTL), info droite
- Bouton "Ajouter au panier" orange w-full py-4 rounded-xl
- Galerie thumbnails comme Tikoun Aolam (vertical sidebar)
- Accordeon pour description + caracteristiques (comme Tikoun)
```

### 6. SHIPPING ZONES (copier de Tikoun) (20 min)
Copier `~/Desktop/TIKOUN AOLAM/tikoun-aolam-web/src/lib/currency-context.tsx`
et adapter:
- Les zones shipping sont les memes (IL/EU/NA/INTL)
- Les tarifs sont les memes ou similaires
- TVA 17% Israel, 0% export
- Integrer dans le checkout existant

### 7. FIX BUGS CONNUS (30 min)
- Cles de traduction brutes visibles ("discoverCollection") → verifier i18n init dans main.tsx
- Prix ne se met pas a jour au changement variante → verifier ProductVariantModal
- RTL manquant → `document.dir = i18n.language === 'he' ? 'rtl' : 'ltr'` dans un useEffect global

### 8. TEST + DEPLOY (15 min)
```bash
npm run build   # DOIT finir sans erreur
vercel --token=VERCEL_TOKEN_REDACTED --prod
```

## FICHIERS A COPIER DE TIKOUN AOLAM
| Fichier Tikoun | Adapter pour Keren |
|---|---|
| `src/lib/currency-context.tsx` | Shipping zones + TVA logic |
| `src/app/checkout/page.tsx` | Country selector + shipping display |
| `src/app/api/stripe-checkout/route.ts` | Multi-currency Stripe |

## DESIGN SYSTEM KEREN (NE PAS CHANGER)
```
Primary Orange: #FF6B00 (hover: #E65A00)
Dark Blue: #0F172A (textes)
Pure White: #FFFFFF (fond)
Light Surface: #F8FAFC (sections alternees)
Font: Assistant (Google Fonts, 300-800)
```

## CONTACT CLIENT
- **Yaakov Renne**: 4100510@gmail.com
- **JAMAIS contacter sans David**
- **Stripe**: admin@holyrentals.com (mode test)

---
*Cree le 2026-02-27 par Claude Opus — Session Tikoun Aolam*
*Na Nach Nachma Nachman MeUman*
