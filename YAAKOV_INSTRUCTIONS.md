# Instructions Yaakov Renne - Keren Rabbi Yisrael
## Source: Réunion transcrite par Gemini (3 parties audio MP3)
## Client email: 4100510@gmail.com
## Sites:
- Current: https://haesh-sheli-new.vercel.app/
- Original: https://www.haesh-sheli.co.il/?page_id=44

---

## PRIORITÉ 1: Optimisation de la Boutique (Conversion)

### 1.1 Gestion des variantes de produits
- Implémenter une fenêtre de sélection rapide (Quick View modal) au clic sur "Ajouter au panier"
- L'utilisateur doit pouvoir choisir: Petit, Moyen, Grand
- Le prix se met à jour dynamiquement selon le format choisi
- Inspiré de Temu: quand on clique sur l'image, elle s'agrandit ou change

### 1.2 Correction des fiches produits
- Rétablir les descriptions détaillées et prix pour chaque ouvrage
- Descriptions manquantes pour les différents prix/variantes

### 1.3 Système de coupons
- Développer la fonctionnalité de codes promos personnalisés par mail

---

## PRIORITÉ 2: UX/UI & Navigation

### 2.1 Nettoyage de la Home Page
- Réduire la sensation de surcharge ("Oness")
- Épurer les éléments visuels sur la première page
- Fond blanc, lumineux, moderne et épuré (inspiré "Oz VeHadar")

### 2.2 Recherche Intuitive
- Barre de recherche avec auto-complétion (taper "L" → "Likutey Moharan")
- Inspiré du site "Mossad HaRav Kook"

### 2.3 Internationalisation
- Ajouter catégories de langues: Français, Anglais, Espagnol, Russe (en plus de l'Hébreu)
- Sélecteur de langue ne fonctionne PAS actuellement → RÉPARER
- Regrouper les versions linguistiques dans une seule fiche produit

### 2.4 Format des produits
- Cartes produits plus CARRÉES (cubes) et moins rectangulaires
- Inspiré de "Institutions Rabbi Cook"

### 2.5 Favoris
- Ajouter icône "Cœur" (Favoris) sur chaque produit

### 2.6 Pop-up
- Supprimer le pop-up cercle "Je fais aussi partie du feu"
- Remplacer par un bouton lumineux/blanc avec le même texte

---

## PRIORITÉ 3: Images et Médias

### 3.1 Effet de survol (Hover)
- L'image du produit change quand la souris passe dessus dans la boutique

### 3.2 Correspondance des tailles
- Images correspondent à la taille du livre sélectionné (grande/moyenne/petite)
- Vérification OCR inversé dans la base de données

### 3.3 Deux modèles visuels de référence
- **Modèle A**: Version améliorée (corrections lumière, sans stand)
- **Modèle B**: Style "plus propre" (Genspark), moins kitsch

### 3.4 Batch Processing via AI Drive
- Dézipper le fichier ZIP complet
- Appliquer styles (A et B) à toutes les photos de livres
- Créer variations de poses/angles pour éviter répétition

### 3.5 Arrière-plans
- Éléments de "maisons près du Kotel" à Jérusalem

### 3.6 Haute Résolution
- Upscaling 1080p ou 4K (Let's Enhance.io)
- Pour impression toile (Canvas) et grands murs

---

## PRIORITÉ 4: Technique et Backend

### 4.1 Sélecteur de langue fonctionnel
- Utiliser Reverse Image Recognition/OCR pour catégoriser les livres par langue

### 4.2 Port Local
- Configurer port local (5080) pour démonstration en temps réel

### 4.3 Collaboration AI
- Travailler avec Anti-Gravity et Manus AI audit
- Synchronisation avec Cloud Code

### 4.4 Handover Document
- Document Markdown récapitulant tout ce qui a été fait

---

## PRIORITÉ 5: Branding Visuel
- Concept: Orange, Bleu, Blanc
- Effet lumière type "LED" derrière le présentoir
- Style conservateur mais pas vieux
- L'image ne doit PAS sentir l'IA
- Vérifier que sur le site de la Keren, on ne voit pas que c'est de l'IA

---

## NOTES DAVID
- Domaine .com acheté (à vérifier)
- Mettre un agent spécialisé sur 100 points en background
- Peut déléguer à OpenClaw
- Dell écoute et peut aider
