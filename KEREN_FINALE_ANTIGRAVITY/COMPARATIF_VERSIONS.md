# Comparatif versions — Keren Rabbi Yisrael

## VERDICT: keren-rabbi-israel-centralized EST LA BONNE VERSION

## Clarification importante pour David

**David se souvenait de Keren555 comme version principale** — explication:
- Keren555 = prototype Replit (Nov 2025), 22 commits, développement ARRÊTÉ
- keren-rabbi-israel-centralized = version professionnelle lancée après, 58 commits, 100/100 tâches, EN PRODUCTION depuis Feb 12 2026
- La version 555 avait des features uniques (lottery, AI chat) mais elles ont été déprioritisées

## Tableau comparatif complet

| Version | URL Live | Commits | Features | État | Décision |
|---------|----------|---------|----------|------|----------|
| **keren-rabbi-israel-centralized** | haesh-sheli-new.vercel.app | 58 | PayPal+Stripe+i18n+Search | ✅ PROD | **TRAVAILLER ICI** |
| KEREN-Z (Anti-Gravity) | candid-kashata-1ff99a.netlify.app | — | Vite+Render+API | 🟡 Figé Feb 12 | Archive |
| kerensitefinal | kerensitefinal.netlify.app | — | Snapshot prod | 🟡 Snapshot | Archive |
| keren-claude-code | keren-claude-code.netlify.app | — | Keren555 base | 🟠 Archive | Archive |
| Keren555 | keren555.netlify.app | 22 | Lottery+AI chat | 🟠 Nov 2025 | Archive |
| KEREN-DAVID-REPLIT-555 | effulgent-donut-79e148.netlify.app | — | Replit | 🟠 Nov 2025 | Archive |

## Ce que keren-rabbi-israel-centralized a (et pas Keren555)
- ✅ PayPal ILS (paypal/react-paypal-js)
- ✅ Stripe avec installments israéliens
- ✅ 100 tâches complètes (commit c732bc2)
- ✅ Lighthouse 89/100 (FCP 1.2s, LCP 2.1s — était 56/100 et 10-15s)
- ✅ 43 livres Breslev avec variantes
- ✅ 6 langues (HE/EN/FR/ES/RU/AR) + RTL
- ✅ Recherche fuzzy + autocomplete
- ✅ Favoris + wishlist
- ✅ Tracking commandes
- ✅ Pages légales complètes
- ✅ Analytics GA4 + Facebook Pixel
- ✅ Service Worker offline

## Ce que Keren555 avait (et pas centralized — features déprioritisées)
- 🎰 Système loterie/tirage au sort
- 🤖 Chat IA flottant (OpenAI)
- 📊 Supabase intégration
- 🖱️ Builder.io CMS drag-and-drop

## Mission actuelle (Feb 22 — Redesign "Oz VeHadar")
Yaakov a demandé lors d'une réunion (audio transcrit):
- Fond blanc pur (changer le fond sombre/navy actuel)
- Navbar sticky avec backdrop-blur
- Cards produit avec hover effet (zoom + bouton Quick Add)
- Checkout complet (tous les champs d'adresse)
- Sélecteur paiement visible: Carte | ביט | PayPal

Instructions complètes dans CLAUDE.md de ce dossier.

## Fichier instructions Yaakov (LIRE EN PRIORITÉ)
```
~/Desktop/_CLIENTS_ACTIFS/09_KEREN_RABBI_YISRAEL/YAAKOV_INSTRUCTIONS.md
```
