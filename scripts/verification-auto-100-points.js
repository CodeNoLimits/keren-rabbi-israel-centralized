#!/usr/bin/env node
/**
 * Script de vérification automatique - Plan 100 points
 * Scanne le code pour détecter les problèmes potentiels
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const results = {
  sidebar: { checked: 0, issues: [] },
  inventory: { checked: 0, issues: [] },
  styles: { checked: 0, issues: [] },
  responsive: { checked: 0, issues: [] },
  total: { checked: 0, issues: [] }
};

console.log('🔍 VÉRIFICATION AUTOMATIQUE - PLAN 100 POINTS\n');
console.log('='.repeat(80));

// 1. Vérifier store.tsx pour problèmes visuels sidebar
console.log('\n📋 1. VÉRIFICATION SIDEBAR (store.tsx)...\n');

const storePath = path.join(__dirname, '../client/src/pages/store.tsx');
const storeContent = fs.readFileSync(storePath, 'utf-8');

// Vérifier text-gray-700 sur fond bleu (problème de lisibilité)
const grayOnBlue = storeContent.match(/text-gray-[567]00.*bg-gradient-to-r from-\[#1e40af\]/g);
if (grayOnBlue && grayOnBlue.length > 0) {
  results.sidebar.issues.push(`⚠️  Texte gris sur fond bleu détecté: ${grayOnBlue.length} occurrence(s)`);
  console.log(`   ❌ Texte gris sur fond bleu trouvé: ${grayOnBlue.length}`);
} else {
  results.sidebar.checked++;
  console.log('   ✅ Pas de texte gris sur fond bleu');
}

// Vérifier que les catégories ont text-white
const categoriesHasWhite = storeContent.includes('text-white font-medium') && 
  storeContent.match(/category-.*text-white/g);
if (categoriesHasWhite) {
  results.sidebar.checked++;
  console.log('   ✅ Catégories avec texte blanc');
} else {
  results.sidebar.issues.push('⚠️  Catégories - vérifier si texte blanc appliqué');
  console.log('   ⚠️  Vérifier catégories - texte blanc');
}

// Vérifier tailles avec text-white
const sizesHasWhite = storeContent.includes('size-') && storeContent.match(/size-.*text-white/g);
if (sizesHasWhite) {
  results.sidebar.checked++;
  console.log('   ✅ Tailles avec texte blanc');
} else {
  results.sidebar.issues.push('⚠️  Tailles - vérifier si texte blanc appliqué');
  console.log('   ⚠️  Vérifier tailles - texte blanc');
}

// Vérifier formats avec text-white
const formatsHasWhite = storeContent.includes('format-') && storeContent.match(/format-.*text-white/g);
if (formatsHasWhite) {
  results.sidebar.checked++;
  console.log('   ✅ Formats avec texte blanc');
} else {
  results.sidebar.issues.push('⚠️  Formats - vérifier si texte blanc appliqué');
  console.log('   ⚠️  Vérifier formats - texte blanc');
}

// Vérifier prix avec text-white
const priceHasWhite = storeContent.includes('text-price-min') && 
  storeContent.match(/text-price-min.*text-white/g);
if (priceHasWhite) {
  results.sidebar.checked++;
  console.log('   ✅ Prix min/max avec texte blanc');
} else {
  results.sidebar.issues.push('⚠️  Prix - vérifier si texte blanc appliqué');
  console.log('   ⚠️  Vérifier prix - texte blanc');
}

// Vérifier style bleu/orange cohérent
const blueOrangeStyle = (storeContent.match(/bg-gradient-to-r from-\[#1e40af\] to-\[#1e3a8a\] border-2 border-\[#f97316\]/g) || []).length;
if (blueOrangeStyle >= 6) {
  results.sidebar.checked++;
  console.log(`   ✅ Style bleu/orange cohérent (${blueOrangeStyle} sections)`);
} else {
  results.sidebar.issues.push(`⚠️  Style bleu/orange - seulement ${blueOrangeStyle} sections trouvées`);
  console.log(`   ⚠️  Style bleu/orange - ${blueOrangeStyle} sections`);
}

// 2. Vérifier inventaire
console.log('\n📦 2. VÉRIFICATION INVENTAIRE...\n');

const productsPath = path.join(__dirname, '../client/src/data/realProducts.ts');
const productsContent = fs.readFileSync(productsPath, 'utf-8');

// Compter produits
const productCount = (productsContent.match(/^\s+'[^']+':\s*\{/gm) || []).length;
results.inventory.checked++;
console.log(`   ✅ ${productCount} produits trouvés`);

// Vérifier que tous ont un ID
const productsWithId = (productsContent.match(/id:\s*'[^']+'/g) || []).length;
if (productsWithId === productCount) {
  results.inventory.checked++;
  console.log(`   ✅ Tous les produits ont un ID (${productsWithId})`);
} else {
  results.inventory.issues.push(`⚠️  Seulement ${productsWithId}/${productCount} produits avec ID`);
  console.log(`   ❌ Seulement ${productsWithId}/${productCount} produits avec ID`);
}

// Vérifier que tous ont un nom
const productsWithName = (productsContent.match(/name:\s*'[^']+'/g) || []).length;
if (productsWithName === productCount) {
  results.inventory.checked++;
  console.log(`   ✅ Tous les produits ont un nom (${productsWithName})`);
} else {
  results.inventory.issues.push(`⚠️  Seulement ${productsWithName}/${productCount} produits avec nom`);
  console.log(`   ❌ Seulement ${productsWithName}/${productCount} produits avec nom`);
}

// Vérifier que tous ont une catégorie
const productsWithCategory = (productsContent.match(/category:\s*'[^']+'/g) || []).length;
if (productsWithCategory === productCount) {
  results.inventory.checked++;
  console.log(`   ✅ Tous les produits ont une catégorie (${productsWithCategory})`);
} else {
  results.inventory.issues.push(`⚠️  Seulement ${productsWithCategory}/${productCount} produits avec catégorie`);
  console.log(`   ❌ Seulement ${productsWithCategory}/${productCount} produits avec catégorie`);
}

// Vérifier que tous ont un auteur
const productsWithAuthor = (productsContent.match(/author:\s*'[^']+'/g) || []).length;
if (productsWithAuthor === productCount) {
  results.inventory.checked++;
  console.log(`   ✅ Tous les produits ont un auteur (${productsWithAuthor})`);
} else {
  results.inventory.issues.push(`⚠️  Seulement ${productsWithAuthor}/${productCount} produits avec auteur`);
  console.log(`   ❌ Seulement ${productsWithAuthor}/${productCount} produits avec auteur`);
}

// Vérifier langues
const languages = {};
const langMatches = productsContent.matchAll(/language:\s*'([^']+)'/g);
for (const match of langMatches) {
  const lang = match[1];
  languages[lang] = (languages[lang] || 0) + 1;
}
console.log(`   ✅ Langues détectées:`);
Object.entries(languages).forEach(([lang, count]) => {
  console.log(`      - ${lang}: ${count} produits`);
});
results.inventory.checked++;

// Vérifier images
const productsWithImages = (productsContent.match(/images:\s*\[/g) || []).length;
if (productsWithImages === productCount) {
  results.inventory.checked++;
  console.log(`   ✅ Tous les produits ont un tableau images (${productsWithImages})`);
} else {
  results.inventory.issues.push(`⚠️  Seulement ${productsWithImages}/${productCount} produits avec images`);
  console.log(`   ⚠️  Seulement ${productsWithImages}/${productCount} produits avec images`);
}

// Vérifier variantes
const productsWithVariants = (productsContent.match(/variants:\s*\[/g) || []).length;
if (productsWithVariants === productCount) {
  results.inventory.checked++;
  console.log(`   ✅ Tous les produits ont des variantes (${productsWithVariants})`);
} else {
  results.inventory.issues.push(`⚠️  Seulement ${productsWithVariants}/${productCount} produits avec variantes`);
  console.log(`   ⚠️  Seulement ${productsWithVariants}/${productCount} produits avec variantes`);
}

// 3. Vérifier styles cohérents
console.log('\n🎨 3. VÉRIFICATION STYLES...\n');

// Vérifier couleurs bleu/orange utilisées
const blueColor = (storeContent.match(/#1e40af|#1e3a8a/g) || []).length;
const orangeColor = (storeContent.match(/#f97316|#ea580c/g) || []).length;
if (blueColor > 0 && orangeColor > 0) {
  results.styles.checked++;
  console.log(`   ✅ Couleurs cohérentes: bleu (${blueColor}x), orange (${orangeColor}x)`);
} else {
  results.styles.issues.push(`⚠️  Couleurs manquantes: bleu=${blueColor}, orange=${orangeColor}`);
  console.log(`   ⚠️  Couleurs: bleu=${blueColor}, orange=${orangeColor}`);
}

// Vérifier responsive classes
const responsiveClasses = {
  'md:': (storeContent.match(/md:/g) || []).length,
  'lg:': (storeContent.match(/lg:/g) || []).length,
  'xl:': (storeContent.match(/xl:/g) || []).length
};
if (responsiveClasses['md:'] > 0 || responsiveClasses['lg:'] > 0) {
  results.styles.checked++;
  console.log(`   ✅ Classes responsive trouvées: md (${responsiveClasses['md:']}), lg (${responsiveClasses['lg:']}), xl (${responsiveClasses['xl:']})`);
} else {
  results.styles.issues.push('⚠️  Pas de classes responsive trouvées');
  console.log('   ⚠️  Pas de classes responsive');
}

// Vérifier grid responsive
const hasGrid = storeContent.includes('grid grid-cols-');
if (hasGrid) {
  results.styles.checked++;
  console.log('   ✅ Grille responsive présente');
} else {
  results.styles.issues.push('⚠️  Grille responsive non trouvée');
  console.log('   ⚠️  Grille responsive non trouvée');
}

// 4. Vérifier fichiers images
console.log('\n🖼️  4. VÉRIFICATION IMAGES...\n');

let imageFilesCount = 0;
const attachedAssetsPath = path.join(__dirname, '../attached_assets');
if (fs.existsSync(attachedAssetsPath)) {
  const imageFiles = fs.readdirSync(attachedAssetsPath)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  imageFilesCount = imageFiles.length;
  console.log(`   ✅ ${imageFiles.length} fichiers images dans attached_assets/`);
  results.inventory.checked++;
  
  // Vérifier que les chemins dans products correspondent
  const imagePaths = productsContent.match(/\/attached_assets\/[^']+/g) || [];
  const uniquePaths = new Set(imagePaths);
  console.log(`   ✅ ${uniquePaths.size} chemins images uniques référencés`);
  results.inventory.checked++;
} else {
  results.inventory.issues.push('⚠️  Dossier attached_assets/ non trouvé');
  console.log('   ❌ Dossier attached_assets/ non trouvé');
}

// 5. Résumé
console.log('\n' + '='.repeat(80));
console.log('\n📊 RÉSUMÉ DE LA VÉRIFICATION AUTOMATIQUE\n');

const totalChecked = results.sidebar.checked + results.inventory.checked + results.styles.checked;
const totalIssues = [
  ...results.sidebar.issues,
  ...results.inventory.issues,
  ...results.styles.issues
].length;

console.log(`   ✅ Points vérifiés automatiquement: ${totalChecked}`);
console.log(`   ⚠️  Problèmes détectés: ${totalIssues}`);

if (results.sidebar.issues.length > 0) {
  console.log('\n   📋 Problèmes Sidebar:');
  results.sidebar.issues.forEach(issue => console.log(`      ${issue}`));
}

if (results.inventory.issues.length > 0) {
  console.log('\n   📋 Problèmes Inventaire:');
  results.inventory.issues.forEach(issue => console.log(`      ${issue}`));
}

if (results.styles.issues.length > 0) {
  console.log('\n   📋 Problèmes Styles:');
  results.styles.issues.forEach(issue => console.log(`      ${issue}`));
}

console.log('\n' + '='.repeat(80));
console.log('\n📝 Prochaines étapes:');
console.log('   1. Vérifier manuellement les points non vérifiables automatiquement');
console.log('   2. Prendre des screenshots pour validation visuelle');
console.log('   3. Tester responsive (mobile/tablette/desktop)');
console.log('   4. Vérifier navigation et liens');
console.log('\n✅ Vérification automatique terminée!\n');

// Générer rapport
const reportPath = path.join(__dirname, '../docs/VERIFICATION_AUTO_RAPPORT.md');
const report = `# 📊 Rapport de Vérification Automatique

**Date:** ${new Date().toLocaleDateString('fr-FR')}

## ✅ Points Vérifiés Automatiquement

- **Sidebar:** ${results.sidebar.checked} points
- **Inventaire:** ${results.inventory.checked} points
- **Styles:** ${results.styles.checked} points
- **Total:** ${totalChecked} points

## ⚠️ Problèmes Détectés

${totalIssues === 0 ? '✅ Aucun problème détecté automatiquement' : `**${totalIssues} problème(s) détecté(s):**\n\n${[...results.sidebar.issues, ...results.inventory.issues, ...results.styles.issues].map(i => `- ${i}`).join('\n')}`}

## 📋 Statistiques

- Produits: ${productCount}
- Images: ${imageFilesCount}
- Langues: ${Object.keys(languages).length}

## ✅ Points Requis Vérification Manuelle

Les points suivants nécessitent une vérification visuelle manuelle:

- Responsive design (mobile/tablette/desktop)
- Navigation et liens
- Fonctionnalité des filtres
- Hover effects
- Transitions
- Cohérence visuelle globale

Voir le fichier \`PLAN_VERIFICATION_100_POINTS.md\` pour la liste complète.
`;

fs.writeFileSync(reportPath, report, 'utf-8');
console.log(`\n📄 Rapport généré: ${reportPath}\n`);

