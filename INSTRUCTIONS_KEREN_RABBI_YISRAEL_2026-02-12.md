# INSTRUCTIONS CLAUDE CODE 4.6 - KEREN RABBI YISRAEL
## Date: 12 Février 2026 | Priorité: CRITIQUE

---

## CONTEXTE
- **Repo**: CodeNoLimits/keren-rabbi-israel-centralized
- **Stack**: React 18 / Vite / Express
- **Vercel**: keren-rabbi-israel-centralized (READY, production)
- **Supabase ID**: Non spécifié
- **Status revendiqué**: 100/100 tasks (par Claude Sonnet 4.5)
- **MAIS**: Yaakov (client) a signalé des problèmes visuels AUJOURD'HUI

---

## FEEDBACK YAAKOV (12/02/2026) - À TRAITER EN PRIORITÉ

Le client Yaakov (יעקב חן - 4100510@gmail.com) a répondu avec ces problèmes:
1. **Design des livres** - Les livres n'ont pas le bon fond/background comme convenu
2. **Bouton ajout au panier** - Quand on clique sur "ajouter", il faut ouvrir une sélection rapide du type de livre
3. **Page produit** - Le prix ne s'affiche pas correctement lors de la sélection

---

## 50 ÉTAPES D'OPTIMISATION POST-LANCEMENT

### PHASE 1: CORRECTIONS URGENTES YAAKOV (Étapes 1-10)
1. [ ] Vérifier visuellement le site sur https://keren-rabbi-israel-centralized.vercel.app
2. [ ] Corriger le background/design des cartes livres (fond blanc lumineux style Oz VeHadar)
3. [ ] Implémenter le modal Quick View pour sélection de variantes au clic "Ajouter"
4. [ ] Corriger l'affichage des prix dans la page produit (toutes les variantes)
5. [ ] Tester le flux complet: accueil → produit → panier → checkout
6. [ ] Vérifier que les 5 langues fonctionnent (HE, EN, FR, ES, RU)
7. [ ] Tester le sélecteur RTL/LTR sur toutes les pages
8. [ ] Corriger les erreurs console (ReferenceError hooks manquants déjà fixé?)
9. [ ] Vérifier que le fix "API resilience for Vercel static hosting" fonctionne
10. [ ] Faire un screenshot de chaque page et envoyer à David pour validation

### PHASE 2: PAIEMENTS & MONÉTISATION (Étapes 11-20)
11. [ ] Configurer Stripe en mode LIVE (pas test) avec clés production
12. [ ] Tester un paiement Stripe end-to-end
13. [ ] Configurer PayPal en mode LIVE
14. [ ] Implémenter les paiements israéliens: Bit, PayBox
15. [ ] Configurer les Tashlumim (paiements en plusieurs fois)
16. [ ] Ajouter les emails de confirmation de commande (template hébreu)
17. [ ] Configurer les webhooks Stripe pour mise à jour commandes
18. [ ] Implémenter le système de coupons/codes promo
19. [ ] Tester le checkout mobile complet
20. [ ] Vérifier la conformité PCI DSS

### PHASE 3: SEO & ANALYTICS (Étapes 21-30)
21. [ ] Configurer Google Analytics 4 (GA4) en production
22. [ ] Installer Facebook Pixel
23. [ ] Vérifier toutes les balises meta (title, description, OG)
24. [ ] Soumettre le sitemap à Google Search Console
25. [ ] Configurer les données structurées JSON-LD (vérifier avec Rich Results Test)
26. [ ] Optimiser les Core Web Vitals (LCP < 2.5s, CLS < 0.1)
27. [ ] Configurer les redirections 301 si nécessaire
28. [ ] Ajouter le Schema.org pour les reviews
29. [ ] Configurer Google Merchant Center pour Shopping
30. [ ] Créer une campagne Google Ads de base

### PHASE 4: UX & DESIGN WORLD-CLASS (Étapes 31-40)
31. [ ] Comparer le design avec les meilleurs sites de livres judaïques (Mossad HaRav Kook, Oz VeHadar, Feldheim)
32. [ ] Optimiser la hero section avec les éléments Jérusalem/Kotel
33. [ ] Améliorer les animations de transition de page
34. [ ] Ajouter des micro-interactions (hover effects, loading states)
35. [ ] Optimiser le branding final Orange/Bleu/Blanc
36. [ ] Améliorer la recherche floue (tolérance fautes de frappe en hébreu)
37. [ ] Regrouper les versions linguistiques dans une seule fiche produit
38. [ ] Ajouter un carousel "Produits similaires" sur chaque page produit
39. [ ] Améliorer les images IA (Modèle A et B)
40. [ ] Tester l'accessibilité WCAG 2.1 AA avec un outil automatique

### PHASE 5: ADMIN & MAINTENANCE (Étapes 41-50)
41. [ ] Vérifier le dashboard admin (/admin) - gestion produits, commandes
42. [ ] Ajouter un système de notifications admin (nouvelles commandes)
43. [ ] Configurer les sauvegardes automatiques de la base de données
44. [ ] Documenter le processus d'ajout de nouveaux produits
45. [ ] Configurer un monitoring uptime (UptimeRobot ou similaire)
46. [ ] Ajouter un système de logs d'erreurs (Sentry)
47. [ ] Configurer le CDN pour les images (Cloudflare ou Vercel Edge)
48. [ ] Préparer le support RTL/LTR automatique (dernier item de Yaakov)
49. [ ] Créer une documentation technique pour maintenance future
50. [ ] VALIDATION FINALE: Screenshotter toutes les pages, tester tous les flux, confirmer 100% production-ready

---

## COMMANDES UTILES
```bash
# Cloner le repo
git clone https://github.com/CodeNoLimits/keren-rabbi-israel-centralized.git

# Installer les dépendances
npm install

# Lancer en dev
npm run dev

# Build pour production
npm run build

# Déployer sur Vercel
vercel --prod
```

---

*Instruction Claude Code 4.6 - Les plus récentes - 12/02/2026*
