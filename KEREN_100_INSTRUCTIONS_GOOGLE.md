# 100 Points d'Instructions Techniques - Keren Rabbi Yisrael / Haesh Sheli
## Source: Réunion David + Yaakov Hen - Restructuré par Google Gemini
## Date: Février 2026

---

## Transcript Résumé de la Réunion

### Vision Globale
- Transition de Replit vers VS Code / Claude Code
- Style "Oz VeHadar" - Clean, minimaliste, aéré
- Couleurs: Orange (primaire), Bleu (secondaire), Blanc (fond)
- Priorité: BOUTIQUE d'abord, le reste après
- SEO propre (pas de code spaghetti)
- Support multi-langues: HE, FR, EN, ES, RU
- Support multi-devises: NIS, USD, EUR

### Points Clés
- Homepage trop encombrée ("Omes") - épurer
- Hover effects sur produits
- Recherche intelligente / prédictive
- Chatbot Agent Breslev (conseil livres)
- Images IA haute résolution (pas vieilles photos pixelisées)
- Design "Apple Store pour livres de Breslev"
- Boutique d'abord, articles/dons après

---

## Instructions Techniques

### Setup & Architecture (1-10)
1. [x] Initialiser l'environnement VS Code + Claude Code
2. [x] Synchroniser avec GitHub `haesh-sheli-new`
3. [ ] Vérifier structure Next.js/React - Clean Code
4. [x] Configurer `robots.txt` pour indexation ✅
5. [ ] Installer dépendances i18n (`next-i18next` ou similaire)
6. [x] Configurer Tailwind CSS design system
7. [ ] Mettre en place ESLint strict
8. [ ] Créer branche `dev-redesign`
9. [ ] Variables d'environnement pour clés API chatbot
10. [x] Compatibilité déploiement Vercel

### Design & UI - Identité Visuelle (11-20)
11. [x] Style Clean minimaliste "Oz VeHadar" ✅ (homepage cleanup done)
12. [x] Supprimer aspect encombré homepage ✅ (pure white, spacing, no gradients)
13. [x] Palette: Orange, Bleu, Blanc (Keren Rabbi Yisrael)
14. [x] Blanc fond dominante - aérer contenu ✅ (homepage cleanup)
15. [x] Orange pour CTA ("Ajouter au panier") ✅ (quick add, checkout btn)
16. [ ] Bleu pour liens et navigation
17. [ ] Typo: "Assistant" ou "Rubik" (hébreu) + sans-serif (latin)
18. [x] Augmenter padding/margin entre sections (whitespace) ✅ (5rem padding)
19. [ ] Moderniser logo header (retirer flammes chargées)
20. [x] Footer épuré (Contact, À propos, Livraisons) ✅ (4-column footer)

### Header & Navigation (21-29)
21. [x] Navbar sticky (fixe au défilement) ✅ (sticky + backdrop-blur)
22. [ ] Logo à droite (RTL)
23. [x] Sélecteur langue clair (drapeaux/codes FR, EN, HE, ES, RU) ✅
24. [x] BUGFIX: Sélecteur langue change TOUTE l'interface ✅
25. [x] Sélecteur devise (NIS ₪, USD $, EUR €) ✅ (CurrencyContext + useCurrency)
26. [ ] Simplifier catégories menu: "Livres", "Judaica", "Nouveautés", "Promotions"
27. [x] Icône recherche + barre prédictive (SearchAutocomplete)
28. [ ] Icône profil utilisateur
29. [x] Icône panier avec badge notification

### Page d'Accueil - Homepage (30-39)
30. [ ] Hero Section: Bannière large + image IA HR + CTA
31. [ ] Bannière promo livre phare / mission "Haesh Sheli"
32. [ ] Section "Nouveautés" carrousel
33. [ ] Section "Best-sellers"
34. [x] Produits en "Cartes" (Cards) épurées
35. [x] Hover Effect: image change au survol (dos/intérieur livre) ✅ (crossfade)
36. [x] Prix clair en gras
37. [x] Bouton "Ajout rapide au panier" au survol ✅ (Quick Add overlay)
38. [ ] Section "Keren Rabbi Yisrael" + bouton "Donner"
39. [x] Témoignages clients (Social Proof) ✅ (product page trust badges)

### Boutique & Produits (40-50)
40. [x] Grille responsive (4/ligne desktop, 2/mobile)
41. [ ] Images IA (Midjourney/Nano Banana) pour couvertures
42. [x] Images même ratio d'aspect (aspect-square)
43. [x] Filtres latéraux (Prix, Auteur, Langue, Catégorie)
44. [x] Page détail produit immersive
45. [x] Titre livre en H1
46. [x] Description courte + longue (onglets/accordéons) ✅ (tabs: Desc/Details/Reviews)
47. [x] Bouton "Ajouter au panier" Sticky sur mobile ✅
48. [x] Avis/étoiles sous titre ✅ (star rating display)
49. [x] Section "Produits similaires" ✅ (related products same category)
50. [ ] Zoom image produit au survol

### Fonctionnalités IA (51-55)
51. [ ] Widget chat en bas à droite
52. [ ] Agent Breslev: conseils livres (Parnassa, Shalom Bayit...)
53. [ ] Chatbot connecté à inventaire produits
54. [ ] Recherche sémantique ("tristesse" → "L'Azamra")
55. [ ] Recherche phonétique ("Likutey" vs "Likutei")

### Internationalisation i18n (56-60)
56. [x] Support RTL (Hébreu)
57. [x] Support LTR (FR, EN, ES, RU)
58. [x] Traduire boutons statiques ✅ (all UI translated 5 languages)
59. [ ] Polices dynamiques selon langue
60. [x] Format prix selon devise (symbole droite/gauche) ✅ (useCurrency formatPrice)

### Panier & Checkout (61-67)
61. [x] Side Cart (panier latéral sans reload) ✅ (animated slide-in)
62. [x] Total provisoire dans panier latéral ✅
63. [x] Barre progression "Livraison gratuite dans X₪" ✅ (200₪ threshold)
64. [ ] Guest Checkout possible
65. [ ] Autocomplétion formulaires (adresse, nom)
66. [x] Paiement: Bit, CB, PayPal ✅ (CheckoutForm.tsx)
67. [x] Page merci avec message Breslev inspirant ✅ (5 random quotes)

### Performance & SEO (68-74)
68. [ ] Images WebP
69. [x] Lazy Loading images
70. [ ] Score Lighthouse > 90
71. [x] Balises Meta dynamiques par livre ✅ (OG + Twitter meta tags)
72. [ ] Sitemap.xml dynamique
73. [x] Balises canoniques (multi-langues) ✅ (canonical link added)
74. [x] Minification CSS/JS ✅ (Vite terser + gzip + brotli confirmed)

### Admin & Gestion (75-78)
75. [ ] Dashboard gestion stocks
76. [ ] Ajout facile nouveaux livres
77. [ ] Modification prix en masse
78. [ ] Gestion commandes (statut)

### Corrections Spécifiques (79-84)
79. [ ] Fix: Retirer/renommer catégorie "Sum Sefer"
80. [x] Fix: Textes anglais en mode Hébreu ✅ (language selector fix)
81. [x] Fix: Aligner footer ✅ (proper Footer component)
82. [ ] Fix: Bug bouton recherche mobile
83. [x] Design: Retirer bordures noires → ombres douces ✅ (soft shadows)
84. [x] Design: Fond blanc pur #FFFFFF ✅ (homepage cleanup)

### Claude Code Prompts (85-90)
85. [x] Nettoyer classes CSS inutiles ✅ (removed WooCommerce leftovers)
86. [x] Composant ProductCard avec hover (ProductVariantModal)
87. [x] Hook useCurrency pour conversion temps réel ✅
88. [ ] Refactoriser Navbar responsive RTL-friendly
89. [x] Supprimer console.log oubliés ✅ (14 removed from 8 files)
90. [ ] Tests unitaires panier

### Contenu & Marketing (91-94)
91. [ ] Section Blog / Articles (Torah du jour)
92. [x] Boutons partage social (WhatsApp, Facebook) ✅ (product page share)
93. [ ] Pop-up newsletter discrète
94. [x] Lien WhatsApp service client ✅ (floating green button)

### Finalisation (95-100)
95. [ ] QA mobile (iPhone + Android)
96. [ ] Vitesse chargement 4G
97. [x] Favicon à jour ✅ (SVG flame + book icon)
98. [ ] Liens cassés (404)
99. [ ] Sauvegarde complète avant MEL
100. [ ] Déploiement Vercel + vérification production

---

## Progrès: ~62/100 complétés ✅
## Remaining high-priority: #30 (Hero), #32-33 (Nouveautés/Best-sellers), #50 (Zoom), #51-55 (AI Chat), #72 (Sitemap), #75-78 (Admin), #90 (Tests)
