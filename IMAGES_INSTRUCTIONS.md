# Instructions pour les images des Rabbis

## Images requises au format WebP

Pour que le site fonctionne parfaitement avec les nouvelles images des rabbis, vous devez télécharger et placer les images suivantes dans le dossier `client/public/images/` :

### Images à télécharger et convertir en WebP

1. **Rabbi Israel Dov Odesser** (3 images minimum)
   - `rabbi-israel-odesser-1.webp` - Photo portrait principale
   - `rabbi-israel-odesser-2.webp` - Photo en train d'enseigner
   - `rabbi-israel-odesser-3.webp` - Photo en prière

2. **Rabbi Nachman de Breslov**
   - `rabbi-nachman-breslov.webp` - Portrait classique

### Sources recommandées pour les images

- **Google Images** : https://www.google.com/search?q=rabbi+israel+dov+odesser&tbm=isch
- **Site Breslev** : https://breslev.com/
- **Site Breslev.co.il** : https://breslev.co.il/
- **YouTube Keren Rabbi Israel** : https://www.youtube.com/@קרןרבייישראלהקרן

### Comment convertir les images en WebP

#### Méthode 1 : Utiliser un convertisseur en ligne
1. Allez sur https://cloudconvert.com/jpg-to-webp
2. Uploadez vos images JPEG/PNG
3. Convertissez en WebP avec qualité 85%
4. Téléchargez et renommez selon les noms ci-dessus

#### Méthode 2 : Utiliser ImageMagick (ligne de commande)
```bash
# Installer ImageMagick
sudo apt-get install imagemagick  # Ubuntu/Debian
brew install imagemagick           # macOS

# Convertir une image
convert input.jpg -quality 85 output.webp
```

#### Méthode 3 : Utiliser cwebp (outil Google)
```bash
# Installer cwebp
sudo apt-get install webp  # Ubuntu/Debian

# Convertir une image
cwebp -q 85 input.jpg -o output.webp
```

### Optimisation recommandée

- **Format** : WebP
- **Qualité** : 85% (bon compromis entre qualité et taille)
- **Taille recommandée** :
  - Images principales : 1200x1600 pixels
  - Images secondaires : 800x600 pixels
- **Poids maximum** : 300 KB par image

### Après avoir ajouté les images

1. Placez toutes les images dans `/client/public/images/`
2. Vérifiez que les noms correspondent exactement
3. Redémarrez le serveur de développement si nécessaire
4. Les images s'afficheront automatiquement sur la page d'accueil

### Images de fallback

Si vous ne trouvez pas certaines images, le site affichera automatiquement des placeholders SVG avec du texte. Pour remplacer ces placeholders :

1. Téléchargez des images de bonne qualité
2. Convertissez-les en WebP
3. Renommez-les selon la nomenclature ci-dessus
4. Placez-les dans le bon dossier

### Droits d'auteur

⚠️ **Important** : Assurez-vous d'avoir le droit d'utiliser les images que vous téléchargez. Privilégiez :
- Images du domaine public
- Images sous licence Creative Commons
- Images fournies par les organisations officielles Breslov
- Photos prises par vous-même lors d'événements

### Support

Pour toute question concernant les images :
- Email : support@keren-rabbi-israel.org
- Téléphone : +972-XX-XXX-XXXX

---

**Note** : Les images actuelles sur le site sont des placeholders temporaires. Remplacez-les dès que possible pour une meilleure présentation.
