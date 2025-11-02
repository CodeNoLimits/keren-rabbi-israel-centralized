#!/usr/bin/env node
/**
 * Script d'audit visuel et de vérification d'inventaire
 * Vérifie la cohérence entre realProducts.ts et les descriptions officielles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lire le fichier realProducts.ts
const realProductsPath = path.join(__dirname, '../client/src/data/realProducts.ts');
const realProductsContent = fs.readFileSync(realProductsPath, 'utf-8');

// Lire le CSV d'inventaire
const inventoryCsvPath = path.join(__dirname, '../docs/INVENTORY_BOOKS.csv');
const inventoryContent = fs.readFileSync(inventoryCsvPath, 'utf-8');

// Parser le CSV
const csvLines = inventoryContent.split('\n').filter(line => line.trim());
const headers = csvLines[0].split(',');
const inventoryBooks = csvLines.slice(1).map(line => {
  const values = line.split(',');
  return {
    nameHeb: values[0]?.replace(/^"|"$/g, '') || '',
    nameEng: values[1]?.replace(/^"|"$/g, '') || '',
    category: values[3]?.replace(/^"|"$/g, '') || '',
    author: values[4]?.replace(/^"|"$/g, '') || '',
    pages: values[5]?.replace(/^"|"$/g, '') || '',
    language: values[6]?.replace(/^"|"$/g, '') || ''
  };
}).filter(book => book.nameHeb);

// Extraire les produits de realProducts.ts
const productMatches = realProductsContent.matchAll(/  '([^']+)':\s*\{[\s\S]*?name:\s*'([^']+)'[\s\S]*?nameEnglish:\s*'?([^']*)'?[\s\S]*?language:\s*'([^']+)'/g);
const products = [];

for (const match of productMatches) {
  const [, id, nameHeb, nameEng, language] = match;
  products.push({
    id,
    nameHeb,
    nameEng: nameEng || '',
    language
  });
}

// Analyses
console.log('🔍 AUDIT VISUEL - INVENTAIRE KEREN\n');
console.log('='.repeat(80));
console.log(`\n📊 STATISTIQUES:\n`);
console.log(`- Produits dans realProducts.ts: ${products.length}`);
console.log(`- Livres dans INVENTORY_BOOKS.csv: ${inventoryBooks.length}\n`);

// Compter les langues
const langCount = {};
products.forEach(p => {
  langCount[p.language] = (langCount[p.language] || 0) + 1;
});
console.log('🌐 RÉPARTITION PAR LANGUE:');
Object.entries(langCount).forEach(([lang, count]) => {
  console.log(`   ${lang}: ${count} livres`);
});

// Livres manquants (dans CSV mais pas dans realProducts)
console.log('\n\n❌ LIVRES MANQUANTS (dans CSV mais pas dans realProducts.ts):\n');
let missingCount = 0;
inventoryBooks.forEach(invBook => {
  const found = products.find(p => 
    p.nameHeb === invBook.nameHeb || 
    p.nameHeb.includes(invBook.nameHeb.substring(0, 10)) ||
    invBook.nameHeb.includes(p.nameHeb.substring(0, 10))
  );
  if (!found) {
    console.log(`   - "${invBook.nameHeb}" (${invBook.nameEng}) - Langue: ${invBook.language}`);
    missingCount++;
  }
});

if (missingCount === 0) {
  console.log('   ✅ Tous les livres du CSV sont présents dans realProducts.ts');
}

// Livres avec langues différentes
console.log('\n\n🔤 VÉRIFICATION DES LANGUES:\n');
const csvLangCount = {};
inventoryBooks.forEach(book => {
  csvLangCount[book.language] = (csvLangCount[book.language] || 0) + 1;
});
console.log('Langues dans le CSV:');
Object.entries(csvLangCount).forEach(([lang, count]) => {
  console.log(`   ${lang}: ${count} livres`);
});

// Livres anglais/français dans le CSV
console.log('\n📚 LIVRES EN ANGLAIS/FRANÇAIS (à identifier):\n');
const foreignBooks = inventoryBooks.filter(book => 
  book.language && (
    book.language.toLowerCase().includes('anglais') ||
    book.language.toLowerCase().includes('english') ||
    book.language.toLowerCase().includes('français') ||
    book.language.toLowerCase().includes('french')
  )
);
if (foreignBooks.length === 0) {
  console.log('   ℹ️  Aucun livre en anglais/français trouvé dans le CSV');
} else {
  foreignBooks.forEach(book => {
    console.log(`   - "${book.nameHeb}" / "${book.nameEng}" - ${book.language}`);
  });
}

// Problèmes de noms
console.log('\n\n⚠️  PROBLÈMES POTENTIELS DE NOMS:\n');
let issuesCount = 0;
products.forEach(product => {
  // Chercher correspondance dans CSV
  const csvMatch = inventoryBooks.find(inv => 
    inv.nameHeb === product.nameHeb ||
    inv.nameEng === product.nameEng ||
    inv.nameHeb.includes(product.nameHeb.substring(0, 5)) ||
    product.nameHeb.includes(inv.nameHeb.substring(0, 5))
  );
  
  if (csvMatch) {
    // Vérifier si les noms correspondent
    if (csvMatch.nameEng && product.nameEng && 
        csvMatch.nameEng.toLowerCase() !== product.nameEng.toLowerCase()) {
      console.log(`   ⚠️  "${product.nameHeb}":`);
      console.log(`      - realProducts: "${product.nameEng}"`);
      console.log(`      - CSV: "${csvMatch.nameEng}"`);
      issuesCount++;
    }
  }
});

if (issuesCount === 0) {
  console.log('   ✅ Pas de problèmes de noms détectés');
}

// Résumé
console.log('\n\n' + '='.repeat(80));
console.log('\n📋 RÉSUMÉ:\n');
console.log(`   ✅ Produits vérifiés: ${products.length}`);
console.log(`   ${missingCount === 0 ? '✅' : '❌'} Livres manquants: ${missingCount}`);
console.log(`   ${issuesCount === 0 ? '✅' : '⚠️'} Problèmes de noms: ${issuesCount}`);
console.log(`   📚 Livres en anglais/français dans CSV: ${foreignBooks.length}`);
console.log('\n' + '='.repeat(80));

// Générer un rapport markdown
const reportPath = path.join(__dirname, '../docs/AUDIT_VISUEL_RAPPORT.md');
const report = `# 🔍 Rapport d'Audit Visuel - Inventaire Keren

**Date:** ${new Date().toLocaleDateString('fr-FR')}

## 📊 Statistiques

- **Produits dans realProducts.ts:** ${products.length}
- **Livres dans INVENTORY_BOOKS.csv:** ${inventoryBooks.length}

## 🌐 Répartition par Langue

${Object.entries(langCount).map(([lang, count]) => `- **${lang}:** ${count} livres`).join('\n')}

## ❌ Livres Manquants

${missingCount === 0 ? '✅ Tous les livres du CSV sont présents dans realProducts.ts' : `${missingCount} livres manquants - Voir le rapport complet ci-dessus`}

## 📚 Livres en Anglais/Français

${foreignBooks.length === 0 ? 'Aucun livre en anglais/français trouvé dans le CSV' : `**${foreignBooks.length} livres trouvés:**\n\n${foreignBooks.map(b => `- "${b.nameHeb}" / "${b.nameEng}" - ${b.language}`).join('\n')}`}

## ⚠️ Problèmes Détectés

- Livres manquants: ${missingCount}
- Problèmes de noms: ${issuesCount}

## ✅ Actions Recommandées

1. ${missingCount > 0 ? 'Ajouter les livres manquants à realProducts.ts' : '✅ Tous les livres sont présents'}
2. ${foreignBooks.length > 0 ? 'Vérifier et catégoriser les livres en anglais/français' : '✅ Aucun livre étranger à traiter'}
3. ${issuesCount > 0 ? 'Corriger les incohérences de noms' : '✅ Noms cohérents'}
4. Vérifier les images associées à chaque produit
5. S\'assurer que toutes les descriptions correspondent
`;

fs.writeFileSync(reportPath, report, 'utf-8');
console.log(`\n📄 Rapport généré: ${reportPath}\n`);

