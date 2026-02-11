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
4. [ ] Configurer `robots.txt` pour indexation
5. [ ] Installer dépendances i18n (`next-i18next` ou similaire)
6. [x] Configurer Tailwind CSS design system
7. [ ] Mettre en place ESLint strict
8. [ ] Créer branche `dev-redesign`
9. [ ] Variables d'environnement pour clés API chatbot
10. [x] Compatibilité déploiement Vercel

### Design & UI - Identité Visuelle (11-20)
11. [~] Style Clean minimaliste "Oz VeHadar" - EN COURS
12. [ ] Supprimer aspect encombré homepage
13. [x] Palette: Orange, Bleu, Blanc (Keren Rabbi Yisrael)
14. [ ] Blanc fond dominante - aérer contenu
15. [ ] Orange pour CTA ("Ajouter au panier")
16. [ ] Bleu pour liens et navigation
17. [ ] Typo: "Assistant" ou "Rubik" (hébreu) + sans-serif (latin)
18. [ ] Augmenter padding/margin entre sections (whitespace)
19. [ ] Moderniser logo header (retirer flammes chargées)
20. [ ] Footer épuré (Contact, À propos, Livraisons)

### Header & Navigation (21-29)
21. [ ] Navbar sticky (fixe au défilement)
22. [ ] Logo à droite (RTL)
23. [~] Sélecteur langue clair (drapeaux/codes FR, EN, HE, ES, RU) - FIX EN COURS
24. [~] BUGFIX: Sélecteur langue change TOUTE l'interface - FIX EN COURS
25. [ ] Sélecteur devise (NIS ₪, USD $, EUR €)
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
35. [ ] Hover Effect: image change au survol (dos/intérieur livre)
36. [x] Prix clair en gras
37. [ ] Bouton "Ajout rapide au panier" au survol
38. [ ] Section "Keren Rabbi Yisrael" + bouton "Donner"
39. [ ] Témoignages clients (Social Proof)

### Boutique & Produits (40-50)
40. [x] Grille responsive (4/ligne desktop, 2/mobile)
41. [ ] Images IA (Midjourney/Nano Banana) pour couvertures
42. [x] Images même ratio d'aspect (aspect-square)
43. [x] Filtres latéraux (Prix, Auteur, Langue, Catégorie)
44. [x] Page détail produit immersive
45. [x] Titre livre en H1
46. [ ] Description courte + longue (onglets/accordéons)
47. [ ] Bouton "Ajouter au panier" Sticky sur mobile
48. [ ] Avis/étoiles sous titre
49. [ ] Section "Produits similaires"
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
58. [~] Traduire boutons statiques - EN COURS
59. [ ] Polices dynamiques selon langue
60. [ ] Format prix selon devise (symbole droite/gauche)

### Panier & Checkout (61-67)
61. [ ] Side Cart (panier latéral sans reload)
62. [ ] Total provisoire dans panier latéral
63. [ ] Barre progression "Livraison gratuite dans X₪"
64. [ ] Guest Checkout possible
65. [ ] Autocomplétion formulaires (adresse, nom)
66. [ ] Paiement: Bit, CB, PayPal
67. [ ] Page merci avec message Breslev inspirant

### Performance & SEO (68-74)
68. [ ] Images WebP
69. [x] Lazy Loading images
70. [ ] Score Lighthouse > 90
71. [ ] Balises Meta dynamiques par livre
72. [ ] Sitemap.xml dynamique
73. [ ] Balises canoniques (multi-langues)
74. [ ] Minification CSS/JS

### Admin & Gestion (75-78)
75. [ ] Dashboard gestion stocks
76. [ ] Ajout facile nouveaux livres
77. [ ] Modification prix en masse
78. [ ] Gestion commandes (statut)

### Corrections Spécifiques (79-84)
79. [ ] Fix: Retirer/renommer catégorie "Sum Sefer"
80. [~] Fix: Textes anglais en mode Hébreu - FIX EN COURS
81. [ ] Fix: Aligner footer
82. [ ] Fix: Bug bouton recherche mobile
83. [ ] Design: Retirer bordures noires → ombres douces
84. [ ] Design: Fond blanc pur #FFFFFF

### Claude Code Prompts (85-90)
85. [ ] Nettoyer classes CSS inutiles dans layout.tsx
86. [x] Composant ProductCard avec hover (ProductVariantModal)
87. [ ] Hook useCurrency pour conversion temps réel
88. [ ] Refactoriser Navbar responsive RTL-friendly
89. [ ] Supprimer console.log oubliés
90. [ ] Tests unitaires panier

### Contenu & Marketing (91-94)
91. [ ] Section Blog / Articles (Torah du jour)
92. [ ] Boutons partage social (WhatsApp, Facebook)
93. [ ] Pop-up newsletter discrète
94. [ ] Lien WhatsApp service client

### Finalisation (95-100)
95. [ ] QA mobile (iPhone + Android)
96. [ ] Vitesse chargement 4G
97. [ ] Favicon à jour
98. [ ] Liens cassés (404)
99. [ ] Sauvegarde complète avant MEL
100. [ ] Déploiement Vercel + vérification production

---

## Progrès: ~25/100 complétés
## Priorité immédiate: #24 (langue), #12 (homepage), #42 (images carrées ✅), #35 (hover)
